import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, readFile } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { once } from 'node:events';
import { DatabaseSync } from 'node:sqlite';
import { openDatabase, readContent, root } from './database.mjs';
import { hashPassword, tokenHash } from './auth.mjs';
import { createCmsServer } from './app.mjs';
import { seed, copySchema } from './seed.mjs';
import { validateDocument } from '../src/cms/schema.ts';
import { localizedCv, siteCopy } from '../src/data/cv.ts';

test('Migrasi, autentikasi, CRUD, media, tema dan persistensi melalui HTTP', async () => {
  const cacheRoot = resolve(root, '.cache');
  await mkdir(cacheRoot, { recursive: true });
  const directory = await mkdtemp(join(cacheRoot, 'cms-test-'));
  const path = join(directory, 'cms.sqlite');
  const legacy = new DatabaseSync(path);
  legacy.exec('CREATE TABLE admins (id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL)');
  const legacyHash = await hashPassword('old');
  legacy.prepare('INSERT INTO admins(email,password_hash) VALUES (?,?)').run('legacy@example.test', legacyHash);
  legacy.exec("CREATE TABLE sessions (token_hash TEXT PRIMARY KEY, admin_id INTEGER NOT NULL REFERENCES admins(id), csrf TEXT NOT NULL, expires INTEGER NOT NULL); INSERT INTO sessions VALUES ('legacy-session', 1, 'legacy-csrf', 9999999999999)");
  legacy.close();
  let db = openDatabase(path);
  let server;
  try {
    const initial = readContent(db);
    assert.deepEqual(initial.data.localizedCv, JSON.parse(JSON.stringify(localizedCv)));
    assert.deepEqual(initial.data.siteCopy, siteCopy);
    assert.equal(initial.revision, 1);
    assert.equal(validateDocument(initial.data, copySchema).length, 0);
    assert.equal(db.prepare('PRAGMA user_version').get().user_version, 3);
    assert.equal(db.prepare('SELECT password_hash FROM admins WHERE email=?').get('legacy@example.test').password_hash, legacyHash);
    assert.equal(db.prepare('SELECT count(*) AS n FROM sessions').get().n, 0);
    assert.equal(initial.data.localizedCv.id.projects.length, 9);
    assert.equal(initial.data.localizedCv.id.skills.flatMap(group => group.items).length, 19);
    const mimeCount = db.prepare('SELECT count(*) AS n FROM media').get().n;
    assert.ok(mimeCount > 20);
    server = await createCmsServer({ db, accessWord: 'temporary-magic-word' });
    server.listen(0, '127.0.0.1'); await once(server, 'listening');
    let base = `http://127.0.0.1:${server.address().port}`;
    const origin = 'http://localhost:5173';
    let cookie = '';
    let csrf = '';
    async function api(endpoint, method = 'GET', body, overrides = {}) {
      const response = await fetch(base + endpoint, {
        method,
        headers: { Origin: origin, Cookie: cookie, 'X-CSRF-Token': csrf, ...(body === undefined ? {} : { 'Content-Type': 'application/json' }), ...overrides },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      return { status: response.status, headers: response.headers, body: await response.json() };
    }
    assert.equal((await api('/api/content')).status, 200);
    assert.equal((await api('/api/admin/content')).status, 401);
    assert.equal((await api('/api/admin/content', 'PUT', initial)).status, 401);
    assert.equal((await api('/api/admin/media', 'POST', {})).status, 401);
    assert.equal((await api('/api/admin/login', 'POST', { username: 'legacy@example.test', password: 'old' })).status, 401);
    assert.equal((await api('/api/admin/unlock', 'POST', { magicWord: 'bad' })).status, 401);
    assert.equal((await api('/api/admin/unlock', 'POST', { magicWord: '' })).status, 400);
    assert.equal((await api('/api/admin/unlock', 'POST', { magicWord: 'x'.repeat(129) })).status, 400);
    assert.equal((await api('/api/admin/session')).status, 401);
    assert.equal((await api('/api/admin/media')).status, 401);
    assert.equal((await api('/api/admin/settings')).status, 401);
    assert.equal((await api('/api/admin/unlock', 'POST', { magicWord: 'temporary-magic-word' }, { Origin: 'https://evil.example' })).status, 403);
    assert.ok(!JSON.stringify((await api('/api/content')).body).includes('temporary-magic-word'));
    const login = await api('/api/admin/unlock', 'POST', { magicWord: 'temporary-magic-word' });
    assert.equal(login.status, 200);
    cookie = login.headers.get('set-cookie').split(';')[0];
    csrf = login.body.csrfToken;
    assert.match(login.headers.get('set-cookie'), /HttpOnly/);
    assert.match(login.headers.get('set-cookie'), /SameSite=Strict/);
    assert.deepEqual((await api('/api/admin/session')).body, { csrfToken: csrf });
    assert.equal((await api('/api/admin/content', 'PUT', initial, { 'X-CSRF-Token': '' })).status, 403);
    assert.equal((await api('/api/admin/content', 'PUT', initial, { Origin: 'https://evil.example' })).status, 403);
    let draft = structuredClone(initial);
    draft.data.localizedCv.id.projects[0].link = 'javascript:alert(1)';
    assert.equal((await api('/api/admin/content', 'PUT', draft)).status, 422);
    draft = structuredClone(initial); draft.data.localizedCv.en.experiences[0].start = 'bad date';
    assert.equal((await api('/api/admin/content', 'PUT', draft)).status, 422);
    draft = structuredClone(initial); delete draft.data.siteCopy.en.projects;
    assert.equal((await api('/api/admin/content', 'PUT', draft)).status, 422);
    draft = structuredClone(initial); draft.data.themes[0].light['--color-bg'] = '#ffffff';
    assert.equal((await api('/api/admin/content', 'PUT', draft)).status, 422);
    draft = structuredClone(initial); draft.data.settings.faviconUrl = '//evil.example/a.svg';
    assert.equal((await api('/api/admin/content', 'PUT', draft)).status, 422);
    draft = structuredClone(initial); draft.data.localizedCv.id.projects[0].thumbnail = '/api/media/missing';
    assert.equal((await api('/api/admin/content', 'PUT', draft)).status, 422);

    draft = structuredClone(initial);
    for (const language of ['id', 'en']) {
      const cv = draft.data.localizedCv[language];
      cv.profile.tagline += ' [test update]';
      for (const key of ['skills', 'experiences', 'projects', 'educations', 'certificates']) {
        cv[key].push(structuredClone(cv[key][0]));
        cv[key].reverse();
        cv[key].splice(1, 1);
      }
      draft.data.siteCopy[language].hero.kicker += ' [test update]';
    }
    draft.data.themes.push({ id: 'test-theme', name: 'Temporary test theme', light: { '--color-bg': '#ffffff' }, dark: { '--font-sans': 'system-ui, sans-serif' } });
    draft.data.activeThemeId = 'test-theme';
    const changed = await api('/api/admin/content', 'PUT', draft);
    assert.equal(changed.status, 200);
    assert.equal(changed.body.revision, 2);
    assert.deepEqual(changed.body.data, draft.data);
    assert.deepEqual((await api('/api/content')).body.data, draft.data);
    assert.equal((await api('/api/admin/content', 'PUT', initial)).status, 409);

    const asset = await readFile(join(root, 'public/profile/portrait.jpg'));
    const uploadResponse = await fetch(base + '/api/admin/media', { method: 'POST', headers: { Origin: origin, Cookie: cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'image/jpeg', 'X-File-Name': 'temporary-test.jpg' }, body: asset });
    assert.equal(uploadResponse.status, 201);
    const uploaded = await uploadResponse.json();
    const download = await fetch(base + uploaded.url);
    assert.equal(download.headers.get('content-type'), 'image/jpeg');
    assert.deepEqual(Buffer.from(await download.arrayBuffer()), asset);
    const invalidUpload = await fetch(base + '/api/admin/media', { method: 'POST', headers: { Origin: origin, Cookie: cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'image/png', 'X-File-Name': 'bad.png' }, body: 'not an image' });
    assert.equal(invalidUpload.status, 415);
    const largeUpload = await fetch(base + '/api/admin/media', { method: 'POST', headers: { Origin: origin, Cookie: cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'image/png', 'X-File-Name': 'too-large.png' }, body: Buffer.alloc(10 * 1024 * 1024 + 1) });
    assert.equal(largeUpload.status, 413);
    for (const [mime, bytes] of [
      ['video/mp4', Buffer.from('000000186674797069736f6d0000020069736f6d6d703432', 'hex')],
      ['video/webm', Buffer.from('1a45dfa39f4286810142f781014282847765626d', 'hex')],
    ]) {
      const response = await fetch(base + '/api/admin/media', { method: 'POST', headers: { Origin: origin, Cookie: cookie, 'X-CSRF-Token': csrf, 'Content-Type': mime, 'X-File-Name': 'temporary-video' }, body: bytes });
      assert.equal(response.status, 201);
      const item = await response.json();
      const downloaded = await fetch(base + item.url);
      assert.equal(downloaded.headers.get('content-type'), mime);
      assert.deepEqual(Buffer.from(await downloaded.arrayBuffer()), bytes);
      assert.equal((await api('/api/admin/media/' + item.id, 'DELETE')).status, 200);
    }
    const wrongVideo = await fetch(base + '/api/admin/media', { method: 'POST', headers: { Origin: origin, Cookie: cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'video/mp4', 'X-File-Name': 'bad.mp4' }, body: 'not a video' });
    assert.equal(wrongVideo.status, 415);
    const withMedia = changed.body;
    withMedia.data.settings.portraitUrl = uploaded.url;
    const mediaSaved = await api('/api/admin/content', 'PUT', withMedia);
    assert.equal(mediaSaved.status, 200);
    assert.equal((await api('/api/admin/media/' + uploaded.id, 'DELETE')).status, 409);
    const restored = await api('/api/admin/content', 'PUT', { data: seed, revision: mediaSaved.body.revision });
    assert.equal(restored.status, 200);
    assert.equal((await api('/api/admin/media/' + uploaded.id, 'DELETE')).status, 200);
    assert.equal((await fetch(base + uploaded.url)).status, 404);
    assert.equal((await api('/api/admin/media')).body.length, mimeCount);
    assert.equal((await api('/api/admin/logout', 'POST')).status, 200);
    assert.equal((await api('/api/admin/session')).status, 401);
    assert.equal((await api('/api/admin/content', 'PUT', restored.body)).status, 401);

    cookie = ''; csrf = '';
    for (let i = 0; i < 5; i++) assert.equal((await api('/api/admin/unlock', 'POST', { magicWord: 'incorrect' })).status, 401);
    assert.equal((await api('/api/admin/unlock', 'POST', { magicWord: 'temporary-magic-word' })).status, 429);
    db.prepare('DELETE FROM login_attempts').run();
    const concurrent = await Promise.all(Array.from({ length: 8 }, () => api('/api/admin/unlock', 'POST', { magicWord: 'incorrect' })));
    assert.equal(concurrent.filter(result => result.status === 401).length, 5);
    assert.equal(concurrent.filter(result => result.status === 429).length, 3);
    db.prepare('DELETE FROM login_attempts').run();
    const newLogin = await api('/api/admin/unlock', 'POST', { magicWord: 'temporary-magic-word' });
    cookie = newLogin.headers.get('set-cookie').split(';')[0]; csrf = newLogin.body.csrfToken;
    const token = cookie.split('=')[1];
    db.prepare('UPDATE sessions SET expires=? WHERE token_hash=?').run(0, tokenHash(token));
    assert.equal((await api('/api/admin/session')).status, 401);
    const activeLogin = await api('/api/admin/unlock', 'POST', { magicWord: 'temporary-magic-word' });
    cookie = activeLogin.headers.get('set-cookie').split(';')[0]; csrf = activeLogin.body.csrfToken;
    await new Promise(accept => server.close(accept)); server = undefined;
    server = await createCmsServer({ db, accessWord: 'changed-magic-word' });
    server.listen(0, '127.0.0.1'); await once(server, 'listening');
    base = `http://127.0.0.1:${server.address().port}`;
    assert.equal((await api('/api/admin/session')).status, 401);
    assert.equal((await api('/api/admin/unlock', 'POST', { magicWord: 'temporary-magic-word' })).status, 401);
    assert.equal((await api('/api/admin/unlock', 'POST', { magicWord: 'changed-magic-word' })).status, 200);
    await new Promise(accept => server.close(accept)); server = undefined;
    server = await createCmsServer({ db, accessWord: '' });
    server.listen(0, '127.0.0.1'); await once(server, 'listening');
    base = `http://127.0.0.1:${server.address().port}`;
    assert.equal((await api('/api/admin/unlock', 'POST', { magicWord: 'anything' })).status, 503);
    assert.equal((await api('/api/admin/content')).status, 401);
    assert.equal((await api('/api/content')).status, 200);
    await new Promise(accept => server.close(accept)); server = undefined;
    db.close();
    db = openDatabase(path);
    assert.deepEqual(readContent(db), restored.body);
    assert.equal(db.prepare('SELECT count(*) AS n FROM admins').get().n, 1);
    assert.equal(db.prepare('SELECT count(*) AS n FROM media').get().n, mimeCount);
    console.log('PASS: magic word tanpa akun; akses terkunci tanpa konfigurasi/sesi; migrasi sesi lama; rotasi secret; auth, CSRF, origin, rate limit, kedaluwarsa; seed dan CRUD dua bahasa; media; tema; persistensi.');
  } finally {
    if (server) await new Promise(accept => server.close(accept));
    db.close();
    if (!resolve(directory).startsWith(cacheRoot + sep)) throw new Error('Lokasi cleanup test tidak aman');
    await rm(directory, { recursive: true, force: true });
  }
});
