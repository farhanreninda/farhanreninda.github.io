const cookieName = '__Host-portfolio-oauth';
const cookie = (value, age = 600) => cookieName + '=' + value + '; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=' + age;
const b64 = bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
function allowed(env, origin) { return (env.ADMIN_ORIGINS || '').split(',').map(value => value.trim()).includes(origin); }
function reply(status, message, headers = {}) { return new Response(message, { status, headers: { 'Cache-Control': 'no-store', ...headers } }); }
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== 'GET') return reply(405, 'Method not allowed');
    if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.ADMIN_ORIGINS || !env.GITHUB_REPOSITORY_ID) return reply(503, 'Configure GitHub OAuth and ADMIN_ORIGINS first.');
    if (url.pathname === '/auth') {
      const origin = url.searchParams.get('origin');
      const clientState = url.searchParams.get('state');
      if (!allowed(env, origin) || !/^[a-zA-Z0-9-]{16,128}$/.test(clientState || '')) return reply(403, 'Origin or state rejected.');
      const state = crypto.randomUUID();
      const verifier = b64(crypto.getRandomValues(new Uint8Array(32)));
      const challenge = b64(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))));
      const target = new URL('https://github.com/login/oauth/authorize');
      target.search = new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, redirect_uri: url.origin + '/callback', state, code_challenge: challenge, code_challenge_method: 'S256', allow_signup: 'false' }).toString();
      const saved = encodeURIComponent(JSON.stringify({ state, verifier, origin, clientState, created: Date.now() }));
      return reply(302, '', { Location: target.href, 'Set-Cookie': cookie(saved) });
    }
    if (url.pathname !== '/callback') return reply(404, 'Not found');
    const clear = { 'Set-Cookie': cookie('', 0) };
    let saved;
    try { saved = JSON.parse(decodeURIComponent((request.headers.get('Cookie') || '').split('; ').find(item => item.startsWith(cookieName + '='))?.slice(cookieName.length + 1) || '')); }
    catch { return reply(403, 'OAuth session missing. Start login again.', clear); }
    if (!allowed(env, saved.origin) || saved.state !== url.searchParams.get('state') || Date.now() - saved.created > 600000 || !url.searchParams.get('code')) return reply(403, 'OAuth state invalid or expired. Start login again.', clear);
    let result;
    try {
      const response = await fetch('https://github.com/login/oauth/access_token', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code: url.searchParams.get('code'), redirect_uri: url.origin + '/callback', code_verifier: saved.verifier, repository_id: env.GITHUB_REPOSITORY_ID }) });
      result = await response.json();
      if (!response.ok || !result.access_token) return reply(502, 'GitHub authentication failed. Start login again.', clear);
    } catch { return reply(502, 'GitHub is unavailable. Start login again.', clear); }
    const nonce = crypto.randomUUID();
    const payload = JSON.stringify({ type: 'portfolio-github-auth', state: saved.clientState, token: result.access_token }).replace(/</g, '\u003c');
    const targetOrigin = JSON.stringify(saved.origin).replace(/</g, '\u003c');
    return reply(200, '<!doctype html><html lang="id"><meta charset="utf-8"><title>Login GitHub</title><p>Login berhasil. Jendela ini dapat ditutup.</p><script nonce="' + nonce + '">if(window.opener){window.opener.postMessage(' + payload + ',' + targetOrigin + ');window.close();}</script></html>', {
      ...clear, 'Content-Type': 'text/html; charset=utf-8', 'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'none'; script-src 'nonce-" + nonce + "'; frame-ancestors 'none'; base-uri 'none'",
    });
  },
};
