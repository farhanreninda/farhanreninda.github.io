import { ApiError } from './errors';
import { copySchema, validateDocument } from './schema';
import type { AdminSession, ContentResponse, MediaItem } from './types';

export const githubMode = import.meta.env.VITE_CMS_MODE !== 'local';
export const githubRepo = import.meta.env.VITE_GITHUB_REPO || 'farhanreninda/farhanreninda.github.io';
export const githubBranch = import.meta.env.VITE_GITHUB_BRANCH || 'main';
export const oauthUrl = import.meta.env.VITE_GITHUB_AUTH_URL || '';
let token = '';
let contentSha = '';
const previews = new Map<string, string>();
export const githubMediaPreview = (url: string) => previews.get(url) || url;
const contentPath = 'public/cms/content.json';
const mediaPath = 'public/cms/media.json';
const encode = (bytes: Uint8Array) => { let text = ''; for (const byte of bytes) text += String.fromCharCode(byte); return btoa(text); };
const jsonBytes = (value: unknown) => new TextEncoder().encode(JSON.stringify(value, null, 2) + '\n');

async function github<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!token) throw new ApiError(401, 'Masuk dengan GitHub untuk mengelola portfolio.');
  const response = await fetch('https://api.github.com' + path, { ...options,
    headers: { Accept: 'application/vnd.github+json', Authorization: 'Bearer ' + token,
      'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) {
    if (response.status === 401) token = '';
    throw new ApiError(response.status, response.status === 409 || response.status === 422
      ? 'Repository berubah. Muat ulang data sebelum menyimpan kembali.'
      : response.status === 403 ? 'Akses GitHub ditolak. Periksa izin repository atau batas API.' : 'Permintaan GitHub gagal (' + response.status + ').');
  }
  return response.status === 204 ? undefined as T : await response.json() as T;
}
const repoPath = '/repos/' + githubRepo;
async function readFile<T>(path: string): Promise<{ value: T; sha: string }> {
  let file = await github<{ content: string; sha: string; encoding?: string }>(repoPath + '/contents/' + path + '?ref=' + encodeURIComponent(githubBranch));
  if (file.encoding === 'none') file = await github<{ content: string; sha: string }>(repoPath + '/git/blobs/' + file.sha);
  const value = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(file.content.replace(/\s/g, '')), char => char.charCodeAt(0)))) as T;
  return { value, sha: file.sha };
}
async function putFile(path: string, bytes: Uint8Array, message: string, sha?: string) {
  return github(repoPath + '/contents/' + path, { method: 'PUT', body: JSON.stringify({
    branch: githubBranch, message, content: encode(bytes), ...(sha ? { sha } : {}),
  }) });
}
export async function acceptGithubToken(value: string): Promise<AdminSession> {
  token = value;
  try {
    const user = await github<{ login: string }>('/user');
    const repo = await github<{ permissions?: { push?: boolean } }>(repoPath);
    if (!repo.permissions?.push) throw new ApiError(403, 'Akun ini tidak memiliki izin menulis ke repository portfolio.');
    return { csrfToken: '', login: user.login };
  } catch (error) { token = ''; throw error; }
}
export function loginGithub(): Promise<AdminSession> {
  if (!oauthUrl) return Promise.reject(new ApiError(503, 'Login GitHub belum dikonfigurasi. Isi VITE_GITHUB_AUTH_URL sesuai panduan deployment.'));
  const auth = new URL(oauthUrl);
  if (auth.protocol !== 'https:') return Promise.reject(new ApiError(503, 'Alamat autentikasi harus memakai HTTPS.'));
  const state = crypto.randomUUID();
  auth.pathname = '/auth'; auth.search = new URLSearchParams({ origin: location.origin, state }).toString();
  const popup = window.open(auth.href, 'portfolio-github-login', 'popup,width=640,height=720');
  if (!popup) return Promise.reject(new ApiError(400, 'Izinkan popup untuk masuk dengan GitHub.'));
  return new Promise((resolve, reject) => {
    const cleanup = () => { window.removeEventListener('message', receive); clearInterval(closed); clearTimeout(timeout); popup.close(); };
    const receive = (event: MessageEvent) => {
      if (event.origin !== auth.origin || event.source !== popup || event.data?.type !== 'portfolio-github-auth' || event.data?.state !== state) return;
      cleanup();
      if (typeof event.data.token !== 'string' || !event.data.token) reject(new ApiError(401, 'Login GitHub dibatalkan atau gagal.'));
      else acceptGithubToken(event.data.token).then(resolve, reject);
    };
    const closed = window.setInterval(() => { if (popup.closed) { cleanup(); reject(new ApiError(401, 'Jendela login GitHub ditutup.')); } }, 1000);
    const timeout = window.setTimeout(() => { cleanup(); reject(new ApiError(408, 'Login kedaluwarsa. Coba lagi.')); }, 600000);
    window.addEventListener('message', receive);
  });
}
export async function githubRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = options.method || 'GET';
  if (path === '/content') {
    const response = await fetch('/cms/content.json', { cache: 'no-store', signal: options.signal ?? AbortSignal.timeout(15000) });
    if (!response.ok) throw new ApiError(response.status, 'Konten portfolio belum tersedia pada deployment ini.');
    return await response.json() as T;
  }
  if (path === '/admin/session') throw new ApiError(401, 'Masuk dengan GitHub.');
  if (path === '/admin/logout') { token = ''; contentSha = ''; for (const url of previews.values()) URL.revokeObjectURL(url); previews.clear(); return undefined as T; }
  if (path === '/admin/content' && method === 'GET') {
    const file = await readFile<ContentResponse>(contentPath); contentSha = file.sha; return file.value as T;
  }
  if (path === '/admin/content' && method === 'PUT') {
    const draft = JSON.parse(String(options.body)) as ContentResponse;
    const errors = validateDocument(draft.data, copySchema);
    if (errors.length) throw new ApiError(422, 'Periksa data yang diisi.', errors);
    if (!contentSha) throw new ApiError(409, 'Muat ulang data sebelum menyimpan.');
    const next = { ...draft, revision: draft.revision + 1 };
    if (jsonBytes(next).byteLength > 2 * 1024 * 1024) throw new ApiError(413, 'Konten maksimal 2 MB.');
    const result = await putFile(contentPath, jsonBytes(next), 'content: perbarui portfolio melalui CMS', contentSha) as { content: { sha: string } };
    contentSha = result.content.sha;
    return next as T;
  }
  if (path === '/admin/media' && method === 'GET') return (await readFile<MediaItem[]>(mediaPath)).value as T;
  if (path === '/admin/media' && method === 'POST') {
    const file = options.body;
    if (!(file instanceof File)) throw new ApiError(400, 'Pilih file dari perangkat.');
    const types: Record<string, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'application/pdf': 'pdf', 'video/mp4': 'mp4', 'video/webm': 'webm' };
    if (!types[file.type] || file.size > 10 * 1024 * 1024 || !file.size) throw new ApiError(415, 'Gunakan gambar, PDF, MP4 atau WebM maksimal 10 MB.');
    const id = crypto.randomUUID();
    const url = '/media/' + id + '.' + types[file.type];
    const item: MediaItem = { id, name: file.name, url, mime: file.type, size: file.size, source: 'upload' };
    await putFile('public' + url, new Uint8Array(await file.arrayBuffer()), 'media: unggah aset portfolio');
    const manifest = await readFile<MediaItem[]>(mediaPath);
    await putFile(mediaPath, jsonBytes([item, ...manifest.value]), 'media: daftarkan aset portfolio', manifest.sha);
    previews.set(url, URL.createObjectURL(file));
    return item as T;
  }
  throw new ApiError(404, 'Operasi CMS tidak tersedia.');
}
