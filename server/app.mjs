import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { openDatabase, readContent, mimeTypes, root } from './database.mjs';
import { copySchema } from './seed.mjs';
import { validateDocument } from '../src/cms/schema.ts';
import { hashPassword, verifyPassword, randomToken, tokenHash } from './auth.mjs';

const fail = (status, message, details) => { throw Object.assign(new Error(message), { status, details }); };
const send = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
};
const readBody = (req, limit) => new Promise((accept, reject) => {
  let size = 0;
  const chunks = [];
  req.on('data', chunk => {
    size += chunk.length;
    if (size > limit) { chunks.length = 0; reject(Object.assign(new Error('Ukuran data terlalu besar'), { status: 413 })); }
    else chunks.push(chunk);
  });
  req.on('end', () => accept(Buffer.concat(chunks)));
  req.on('error', reject);
  req.on('aborted', () => reject(Object.assign(new Error('Permintaan dibatalkan'), { status: 400 })));
});
async function readJson(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) fail(415, 'Gunakan application/json');
  const body = await readBody(req, 2 * 1024 * 1024);
  try { return JSON.parse(body.toString('utf8')); }
  catch { fail(400, 'JSON tidak valid'); }
}
function fileMime(bytes) {
  if (bytes.length >= 24 && bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) return 'image/png';
  if (bytes.length >= 4 && bytes.subarray(0, 3).equals(Buffer.from('ffd8ff', 'hex'))) return 'image/jpeg';
  if (bytes.length >= 13 && /GIF8[79]a/.test(bytes.subarray(0, 6).toString())) return 'image/gif';
  if (bytes.length >= 12 && bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP') return 'image/webp';
  if (bytes.length >= 5 && bytes.subarray(0, 5).toString() === '%PDF-') return 'application/pdf';
  if (bytes.length >= 16 && bytes.subarray(4, 8).toString() === 'ftyp' && /^(isom|iso[2-6]|mp4[12]|avc1|M4V )$/.test(bytes.subarray(8, 12).toString())) return 'video/mp4';
  if (bytes.length >= 16 && bytes.subarray(0, 4).equals(Buffer.from('1a45dfa3', 'hex')) && bytes.subarray(0, 4096).includes(Buffer.from('webm'))) return 'video/webm';
  fail(415, 'Format file tidak valid. Gunakan PNG, JPG, WebP, GIF, PDF, MP4, atau WebM');
}
function containsUrl(value, url) {
  if (typeof value === 'string') return value === url || value.endsWith(url);
  if (!value || typeof value !== 'object') return false;
  return Object.values(value).some(child => containsUrl(child, url));
}

export async function createCmsServer(options = {}) {
  const db = options.db ?? openDatabase();
  const production = options.production ?? process.env.NODE_ENV === 'production';
  const adminOrigin = options.adminOrigin ?? process.env.CMS_ADMIN_ORIGIN;
  if (production && !adminOrigin?.startsWith('https://')) throw new Error('CMS_ADMIN_ORIGIN wajib berupa origin HTTPS pada production');
  const origins = production ? [adminOrigin] : [adminOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:4173', 'http://127.0.0.1:4173', 'http://localhost:3001', 'http://127.0.0.1:3001'].filter(Boolean);
  const publicOrigin = options.publicOrigin ?? process.env.CMS_PUBLIC_ORIGIN ?? '*';
  const accessWord = options.accessWord ?? process.env.CMS_ACCESS_WORD ?? '';
  if (accessWord.length > 128) throw new Error('CMS_ACCESS_WORD maksimal 128 karakter');
  const accessHash = accessWord.trim() ? await hashPassword(accessWord) : null;
  db.prepare('DELETE FROM sessions').run();
  const cookie = (token, age = 28800) => `cms_session=${token}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=${age}${production ? '; Secure' : ''}`;
  const getSession = req => {
    db.prepare('DELETE FROM sessions WHERE expires <= ?').run(Date.now());
    const token = /(?:^|;\s*)cms_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie ?? '')?.[1] ?? '';
    if (!token) return null;
    if (!accessHash) return null;
    return db.prepare('SELECT * FROM sessions WHERE token_hash=? AND expires>?').get(tokenHash(token), Date.now());
  };

  const server = createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    try {
      const url = new URL(req.url, 'http://localhost');
      const path = decodeURIComponent(url.pathname);
      const method = req.method;
      if (path === '/api/content' && method === 'GET') {
        if (publicOrigin === '*' || req.headers.origin === publicOrigin) res.setHeader('Access-Control-Allow-Origin', publicOrigin);
        res.setHeader('Vary', 'Origin');
        return send(res, 200, readContent(db));
      }
      if (path.startsWith('/api/media/') && method === 'GET') {
        const media = db.prepare('SELECT * FROM media WHERE id=? AND source=?').get(path.slice('/api/media/'.length), 'upload');
        if (!media) fail(404, 'Media tidak ditemukan');
        res.setHeader('Access-Control-Allow-Origin', publicOrigin);
        res.writeHead(200, {
          'Content-Type': media.mime, 'Content-Length': media.size,
          'Content-Disposition': `${media.mime === 'application/pdf' ? 'attachment' : 'inline'}; filename="${media.id}"`,
          'Cache-Control': 'public, max-age=31536000, immutable',
        });
        return res.end(Buffer.from(media.bytes));
      }
      if (path.startsWith('/api/')) {
        if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method)) fail(405, 'Metode tidak didukung');
        if (method !== 'GET' && !origins.includes(req.headers.origin)) fail(403, 'Origin permintaan tidak diizinkan');
        if (path === '/api/admin/unlock' && method === 'POST') {
          if (!accessHash) fail(503, 'Akses admin belum dikonfigurasi. Isi CMS_ACCESS_WORD pada server');
          const body = await readJson(req);
          if (!body || typeof body.magicWord !== 'string' || !body.magicWord.length || body.magicWord.length > 128) fail(400, 'Magic word wajib diisi, maksimal 128 karakter');
          const address = req.socket.remoteAddress ?? 'unknown';
          const now = Date.now();
          db.prepare('DELETE FROM login_attempts WHERE reset_at<=?').run(now);
          const attempt = db.prepare('SELECT * FROM login_attempts WHERE address=?').get(address);
          if ((attempt?.attempts ?? 0) >= 5) { res.setHeader('Retry-After', Math.ceil((attempt.reset_at - now) / 1000)); fail(429, 'Terlalu banyak percobaan. Coba lagi dalam 15 menit'); }
          db.prepare('INSERT INTO login_attempts VALUES (?,?,?) ON CONFLICT(address) DO UPDATE SET attempts=attempts+1').run(address, 1, now + 900000);
          const correct = await verifyPassword(body.magicWord, accessHash);
          if (!correct) {
            fail(401, 'Magic word salah');
          }
          db.prepare('DELETE FROM login_attempts WHERE address=?').run(address);
          const token = randomToken();
          const csrfToken = randomToken();
          db.prepare('INSERT INTO sessions VALUES (?,?,?)').run(tokenHash(token), csrfToken, now + 28800000);
          res.setHeader('Set-Cookie', cookie(token));
          return send(res, 200, { csrfToken });
        }
        const session = getSession(req);
        if (!session) fail(401, 'Masukkan magic word untuk membuka akses admin');
        if (method !== 'GET' && req.headers['x-csrf-token'] !== session.csrf) fail(403, 'Token CSRF tidak valid');
        if (path === '/api/admin/session' && method === 'GET') return send(res, 200, { csrfToken: session.csrf });
        if (path === '/api/admin/logout' && method === 'POST') {
          db.prepare('DELETE FROM sessions WHERE token_hash=?').run(session.token_hash);
          res.setHeader('Set-Cookie', cookie('', 0));
          return send(res, 200, { ok: true });
        }
        if (path === '/api/admin/content' && method === 'GET') return send(res, 200, readContent(db));
        if (path === '/api/admin/content' && method === 'PUT') {
          const body = await readJson(req);
          if (!body || !Number.isSafeInteger(body.revision) || body.revision < 1) fail(400, 'Revisi tidak valid');
          const errors = validateDocument(body.data, copySchema);
          if (errors.length) fail(422, 'Periksa data yang diisi', errors);
          const checkMedia = value => {
            if (typeof value === 'string' && value.startsWith('/api/media/') && !db.prepare('SELECT id FROM media WHERE url=?').get(value)) fail(422, 'Konten memakai media unggahan yang tidak tersedia');
            if (value && typeof value === 'object') Object.values(value).forEach(checkMedia);
          };
          checkMedia(body.data);
          const updated = db.prepare('UPDATE documents SET data=?,revision=revision+1 WHERE id=? AND revision=?').run(JSON.stringify(body.data), 'portfolio', body.revision);
          if (!updated.changes) fail(409, 'Data sudah berubah di tab/perangkat lain. Muat ulang data sebelum menyimpan');
          return send(res, 200, readContent(db));
        }
        if (path === '/api/admin/media' && method === 'GET') {
          return send(res, 200, db.prepare('SELECT id,name,url,mime,size,source FROM media ORDER BY rowid DESC').all());
        }
        if (path === '/api/admin/media' && method === 'POST') {
          let name;
          try { name = decodeURIComponent(req.headers['x-file-name'] ?? ''); } catch { fail(400, 'Nama file tidak valid'); }
          if (!name || name.length > 200 || /[\x00-\x1f/\\]/.test(name)) fail(400, 'Nama file tidak valid');
          const bytes = await readBody(req, 10 * 1024 * 1024);
          const mime = fileMime(bytes);
          if (req.headers['content-type'] !== mime) fail(415, 'Format file tidak sesuai tipe konten');
          const id = randomUUID();
          const media = { id, name, url: `/api/media/${id}`, mime, size: bytes.length, source: 'upload' };
          db.prepare('INSERT INTO media VALUES (?,?,?,?,?,?,?)').run(id, name, media.url, mime, bytes.length, 'upload', bytes);
          return send(res, 201, media);
        }
        if (path.startsWith('/api/admin/media/') && method === 'DELETE') {
          const id = path.slice('/api/admin/media/'.length);
          const media = db.prepare('SELECT * FROM media WHERE id=?').get(id);
          if (!media) fail(404, 'Media tidak ditemukan');
          if (containsUrl(readContent(db).data, media.url)) fail(409, 'Media masih digunakan. Ganti tautannya di konten dan simpan dahulu');
          db.prepare('DELETE FROM media WHERE id=?').run(id);
          return send(res, 200, { ok: true });
        }
        fail(404, 'Endpoint tidak ditemukan');
      }
      if (!['GET', 'HEAD'].includes(method)) fail(405, 'Metode tidak didukung');
      const dist = resolve(root, 'dist');
      let file = resolve(dist, `.${path}`);
      if (!file.startsWith(`${dist}${sep}`) && file !== dist) fail(404, 'File tidak ditemukan');
      if (path.split('/').some(part => part.startsWith('.'))) fail(404, 'File tidak ditemukan');
      const info = await stat(file).catch(() => null);
      if (!info?.isFile()) {
        if (extname(path)) fail(404, 'File tidak ditemukan');
        file = resolve(dist, 'index.html');
      }
      const bytes = await readFile(file).catch(() => { fail(404, 'Frontend belum dibangun. Jalankan npm run build atau npm run dev'); });
      res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https: http:; connect-src 'self'; frame-src 'self'; frame-ancestors 'self'; base-uri 'self'; object-src 'none'");
      res.writeHead(200, { 'Content-Type': mimeTypes[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' });
      res.end(method === 'HEAD' ? undefined : bytes);
    } catch (error) {
      if (res.headersSent) { res.end(); return; }
      if (!error.status && !(error instanceof URIError)) console.error(error.message);
      send(res, error.status ?? (error instanceof URIError ? 400 : 500), { error: error.status ? error.message : 'Permintaan tidak dapat diproses', details: error.details });
    }
  });
  server.requestTimeout = 30000;
  server.headersTimeout = 15000;
  server.on('close', () => { if (!options.db) db.close(); });
  return server;
}
