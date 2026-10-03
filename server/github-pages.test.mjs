import test from 'node:test';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import worker from '../oauth/worker.mjs';
const content = JSON.parse(await readFile(new URL('../public/cms/content.json', import.meta.url), 'utf8'));
const response = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

test('Worker OAuth rejects unknown origins and invalid state, and exchanges PKCE for the selected repository', async () => {
  const env = { GITHUB_CLIENT_ID: 'test-client', GITHUB_CLIENT_SECRET: 'test-secret', ADMIN_ORIGINS: 'https://farhanreninda.my.id', GITHUB_REPOSITORY_ID: '1269938498' };
  assert.equal((await worker.fetch(new Request('https://auth.example/auth?origin=https://evil.example&state=abcdefghijklmnop'), env)).status, 403);
  assert.equal((await worker.fetch(new Request('https://auth.example/auth'), {})).status, 503);
  const start = await worker.fetch(new Request('https://auth.example/auth?origin=https://farhanreninda.my.id&state=abcdefghijklmnop'), env);
  const target = new URL(start.headers.get('Location'));
  assert.equal(target.origin, 'https://github.com');
  assert.equal(target.searchParams.get('code_challenge_method'), 'S256');
  assert.equal(target.searchParams.has('scope'), false);
  const cookies = start.headers.get('Set-Cookie');
  assert.match(cookies, /HttpOnly; Secure; SameSite=Lax/);
  assert.equal((await worker.fetch(new Request('https://auth.example/callback?code=sample&state=wrong', { headers: { Cookie: cookies.split(';')[0] } }), env)).status, 403);
  const actualFetch = globalThis.fetch;
  let exchange;
  globalThis.fetch = async (url, options) => { assert.equal(url, 'https://github.com/login/oauth/access_token'); exchange = JSON.parse(options.body); return response({ access_token: 'test-token' }); };
  try {
    const end = await worker.fetch(new Request('https://auth.example/callback?code=sample&state=' + target.searchParams.get('state'), { headers: { Cookie: cookies.split(';')[0] } }), env);
    assert.equal(end.status, 200);
    assert.equal(exchange.repository_id, env.GITHUB_REPOSITORY_ID);
    assert.equal(exchange.client_secret, env.GITHUB_CLIENT_SECRET);
    assert.equal(exchange.code_verifier.length, 43);
    assert.equal(exchange.redirect_uri, 'https://auth.example/callback');
    assert.match(end.headers.get('Content-Security-Policy'), /frame-ancestors 'none'/);
    assert.match(end.headers.get('Set-Cookie'), /Max-Age=0/);
    const html = await end.text();
    assert.match(html, /portfolio-github-auth/);
    assert.match(html, /https:\/\/farhanreninda.my.id/);
    assert.doesNotMatch(html, /test-secret/);
  } finally { globalThis.fetch = actualFetch; }
});

test('GitHub content saves use the loaded SHA, retain both languages and surface concurrent edits', async () => {
  const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/cms/github.ts', import.meta.url))], bundle: true, format: 'esm', platform: 'browser', write: false, define: { 'import.meta.env': JSON.stringify({ VITE_CMS_MODE: 'github' }) } });
  const client = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
  const actualFetch = globalThis.fetch;
  const writes = [];
  let conflict = false;
  let mediaValue = [];
  globalThis.fetch = async (url, options = {}) => {
    if (url === '/cms/content.json') return response(content);
    if (url.endsWith('/user')) return response({ login: 'farhanreninda' });
    if (url.endsWith('/farhanreninda.github.io')) return response({ permissions: { push: true } });
    if (options.method === 'PUT') {
      if (conflict) return response({}, 409);
      const body = JSON.parse(options.body);
      writes.push(body);
      if (url.endsWith('/public/cms/media.json')) mediaValue = JSON.parse(Buffer.from(body.content, 'base64').toString());
      return response({ content: { sha: 'new-sha' } });
    }
    if (url.includes('/public/cms/media.json?')) return response({ sha: 'media-sha', content: Buffer.from(JSON.stringify(mediaValue)).toString('base64') });
    return response({ sha: 'loaded-sha', content: Buffer.from(JSON.stringify(content)).toString('base64') });
  };
  try {
    await assert.rejects(client.githubRequest('/admin/content'), error => error.status === 401);
    assert.deepEqual(await client.githubRequest('/content'), content);
    assert.equal((await client.acceptGithubToken('test-token')).login, 'farhanreninda');
    assert.deepEqual(await client.githubRequest('/admin/content'), content);
    const saved = await client.githubRequest('/admin/content', { method: 'PUT', body: JSON.stringify(content) });
    assert.equal(saved.revision, content.revision + 1);
    assert.deepEqual(saved.data, content.data);
    assert.equal(writes[0].sha, 'loaded-sha');
    assert.equal(writes[0].branch, 'main');
    assert.deepEqual(JSON.parse(Buffer.from(writes[0].content, 'base64').toString()), saved);
    const upload = new File([Uint8Array.from([137,80,78,71,13,10,26,10])], 'contoh.png', { type: 'image/png' });
    const item = await client.githubRequest('/admin/media', { method: 'POST', body: upload });
    assert.match(item.url, /^\/media\/[a-z0-9-]+\.png$/);
    assert.equal(item.name, 'contoh.png');
    assert.equal(writes[2].sha, 'media-sha');
    assert.equal(mediaValue[0].url, item.url);
    assert.match(client.githubMediaPreview(item.url), /^blob:/);
    await assert.rejects(client.githubRequest('/admin/media', { method: 'POST', body: new File(['<svg/>'], 'bad.svg', { type: 'image/svg+xml' }) }), error => error.status === 415);
    conflict = true;
    await assert.rejects(client.githubRequest('/admin/content', { method: 'PUT', body: JSON.stringify(saved) }), error => error.status === 409);
    await client.githubRequest('/admin/logout', { method: 'POST' });
    await assert.rejects(client.githubRequest('/admin/content'), error => error.status === 401);
    globalThis.fetch = async url => response(url.endsWith('/user') ? { login: 'reader' } : { permissions: { push: false } });
    await assert.rejects(client.acceptGithubToken('reader-token'), error => error.status === 403);
    await assert.rejects(client.githubRequest('/admin/content'), error => error.status === 401);
  } finally { globalThis.fetch = actualFetch; }
});
