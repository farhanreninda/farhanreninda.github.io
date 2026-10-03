import type { AdminSession } from "./types";

const origin = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";
export const mediaUrl = (url: string) => url.startsWith("/api/media/") ? `${origin}${url}` : url;
export class ApiError extends Error {
  status: number;
  details: string[];
  constructor(status: number, message: string, details: string[] = []) {
    super(message); this.status = status; this.details = details;
  }
}
export async function request<T>(path: string, options: RequestInit = {}, session?: AdminSession): Promise<T> {
  const headers = new Headers(options.headers);
  if (typeof options.body === "string") headers.set("Content-Type", "application/json");
  if (session) headers.set("X-CSRF-Token", session.csrfToken);
  const response = await fetch(`${origin}/api${path}`, {
    ...options, headers, credentials: path.startsWith("/admin/") ? "include" : "omit",
    signal: options.signal ?? AbortSignal.timeout(15000),
  });
  const value = await response.json().catch(() => { throw new ApiError(response.status, "API tidak mengembalikan data JSON. Periksa alamat backend dan konfigurasi hosting"); });
  if (!response.ok) throw new ApiError(response.status, value.error ?? "Permintaan gagal", value.details);
  return value as T;
}
