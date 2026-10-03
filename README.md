# Portfolio Farhan Reninda dengan CMS

CMS memakai backend Node.js 24 + SQLite. Halaman publik mengambil data Indonesia/English dari API. Panduan lengkap: [docs/cms/README.md](docs/cms/README.md). Hasil pengujian: [docs/cms/verification.md](docs/cms/verification.md).

Personal portfolio built with **Vue 3 + Vite + TypeScript**. Dideploy ke GitHub Pages lewat GitHub Actions.

## Stack

- Vue 3 (`<script setup>`, Composition API)
- Vite 5
- TypeScript (strict)
- Vue Router 4 (SPA, `createWebHistory`)
- Pinia (disiapkan; belum dipakai)
- `@unhead/vue` untuk SEO meta
- `@vueuse/core`

## Pengembangan Lokal

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy ke GitHub Pages

Workflow `.github/workflows/deploy.yml` membangun dan mempublikasikan artifact `dist/` ke GitHub Pages setiap push ke `main`. Backend membutuhkan host Node dengan disk permanen dan HTTPS. Isi repository variables `VITE_API_URL` dan `VITE_ADMIN_URL` sebelum deploy. Workflow berhenti jika konfigurasi ini kosong.

Karena domain custom `farhanreninda.github.io` (User/Organization Pages), file di-root di-serve di root — sehingga `base: "/"` di `vite.config.ts`.

## Struktur

```
src/
  app/         bootstrap (main.ts, router, App.vue)
  components/  komponen UI (section, layout)
  composables/ composable (useTheme)
  data/        data CV (cv.ts)
  types/       tipe data (cv.ts)
  styles/      stylesheet global
public/        aset statis (CV.pdf, favicon)
```

## Konten

Salin `.env.example` menjadi `.env`, lalu isi `CMS_ACCESS_WORD` dengan magic word pribadi. Kelola konten di `http://localhost:5173/admin` dengan satu magic word, tanpa pendaftaran akun atau username. Jika konfigurasi kosong, akses admin tetap terkunci. Di PowerShell gunakan `npm.cmd` jika `npm.ps1` diblokir.

`src/data/cv.ts` dipertahankan sebagai seed migrasi. Data aktif dan unggahan berada di `data/cms.sqlite` yang tidak masuk Git. Migrasi otomatis hanya memasukkan data awal sekali.

`npm run dev` menjalankan API port 3001 dan Vite port 5173. Untuk production lokal, hentikan dev, jalankan `npm run build`, lalu `npm start`; seluruh aplikasi tersedia pada port 3001. `npm run preview` memakai port 4173 dan memerlukan API `npm start` pada terminal lain. Jalankan `npm test` untuk uji integrasi.
