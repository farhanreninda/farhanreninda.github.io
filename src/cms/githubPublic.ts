import { ApiError } from './errors';

export const githubMode = import.meta.env.VITE_CMS_MODE !== 'local';
export const previews = new Map<string, string>();
export const githubMediaPreview = (url: string) => previews.get(url) || url;

export async function readPublicContent<T>(options: RequestInit = {}): Promise<T> {
  const response = await fetch('/cms/content.json', { cache: 'no-store', signal: options.signal ?? AbortSignal.timeout(15000) });
  if (!response.ok) throw new ApiError(response.status, 'Konten portfolio belum tersedia pada deployment ini.');
  return await response.json() as T;
}
