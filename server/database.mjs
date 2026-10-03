import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { seed } from './seed.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const mimeTypes = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.pdf': 'application/pdf',
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
};

export function openDatabase(path = process.env.CMS_DB_PATH || join(root, 'data/cms.sqlite')) {
  const absolute = resolve(path);
  mkdirSync(dirname(absolute), { recursive: true });
  const db = new DatabaseSync(absolute, { timeout: 5000 });
  db.exec(`
    PRAGMA journal_mode=WAL;
    PRAGMA foreign_keys=ON;
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY, data TEXT NOT NULL CHECK(json_valid(data)), revision INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY, csrf TEXT NOT NULL, expires INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS login_attempts (
      address TEXT PRIMARY KEY, attempts INTEGER NOT NULL, reset_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, url TEXT UNIQUE NOT NULL, mime TEXT NOT NULL,
      size INTEGER NOT NULL, source TEXT NOT NULL CHECK(source IN ('existing','upload')), bytes BLOB
    );
  `);
  db.exec('BEGIN IMMEDIATE');
  try {
    if (db.prepare('PRAGMA table_info(sessions)').all().some(column => column.name === 'admin_id')) {
      db.exec('DROP TABLE sessions; CREATE TABLE sessions (token_hash TEXT PRIMARY KEY, csrf TEXT NOT NULL, expires INTEGER NOT NULL)');
    }
    db.exec('PRAGMA user_version=3');
    const inserted = db.prepare('INSERT OR IGNORE INTO documents(id,data) VALUES (?,?)').run('portfolio', JSON.stringify(seed));
    if (inserted.changes) {
      const insert = db.prepare('INSERT OR IGNORE INTO media(id,name,url,mime,size,source) VALUES (?,?,?,?,?,?)');
      const scan = (directory, prefix = '') => {
        for (const entry of readdirSync(directory, { withFileTypes: true })) {
          const relative = `${prefix}/${entry.name}`;
          const file = join(directory, entry.name);
          if (entry.isDirectory()) scan(file, relative);
          else if (mimeTypes[extname(entry.name).toLowerCase()]?.match(/^(image\/|application\/pdf)/)) {
            insert.run(relative, entry.name, relative, mimeTypes[extname(entry.name).toLowerCase()], statSync(file).size, 'existing');
          }
        }
      };
      scan(join(root, 'public'));
    }
    db.exec('COMMIT');
  } catch (error) { db.exec('ROLLBACK'); db.close(); throw error; }
  return db;
}

export function readContent(db) {
  const row = db.prepare('SELECT data,revision FROM documents WHERE id=?').get('portfolio');
  return { data: JSON.parse(row.data), revision: row.revision };
}
