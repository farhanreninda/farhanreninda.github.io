# Farhan Reninda — Portfolio

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

Workflow `.github/workflows/deploy.yml` otomatis membangun dan mempublikasikan `dist/` ke branch `gh-pages` setiap push ke `main`.

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

Edit data portfolio di `src/data/cv.ts`.
