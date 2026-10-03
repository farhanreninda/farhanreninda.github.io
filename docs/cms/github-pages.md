# CMS pada GitHub Pages

## Hasil dan alur

Portfolio tetap di https://farhanreninda.my.id/ dan admin di https://farhanreninda.my.id/admin/.
Build menyalin entry HTML ke admin/index.html, 404.html, CNAME, dan .nojekyll.
Konten publik dibaca dari /cms/content.json; tidak membutuhkan Node/SQLite di hosting.
Desain editor CMS tetap dipakai. Simpan membuat commit ke branch yang dikonfigurasi, lalu workflow Pages menerbitkan perubahan. Publikasi tidak langsung: tunggu Actions sukses.

Data dua bahasa/settings/tema ada pada public/cms/content.json; manifest aset di public/cms/media.json. Ekspor awal sama dengan database lokal revisi 3, 33 aset existing. src/data/cv.ts tetap seed lokal; perubahan CMS GitHub memakai JSON ini.

## Komponen autentikasi

GitHub Pages menjalankan frontend. Worker Cloudflare di oauth/worker.mjs hanya menukar kode login GitHub; penyimpanan dan upload langsung melalui GitHub API.
Gunakan GitHub App pribadi, bukan token yang ditanam di frontend. App cukup dipasang pada repository farhanreninda/farhanreninda.github.io dengan Contents: Read and write, Metadata: Read-only. Tidak memerlukan private key karena login memakai user access token.
Token hanya berada di memori tab, tidak localStorage/sessionStorage, URL, atau repository. Reload/keluar meminta login ulang. Masa berlaku default GitHub App 8 jam; refresh token tidak disimpan.
Worker memakai state, PKCE S256, cookie HttpOnly/Secure/SameSite=Lax, target origin pasti, CSP dan no-store. Frontend memeriksa origin/source/state pesan, identitas pengguna dan izin push. Secret hanya di Worker.

## Setup satu kali oleh pemilik akun

### 1. Buat Worker Cloudflare

1. Masuk dashboard Cloudflare → Workers & Pages → buat Worker bernama portfolio-github-auth.
2. Salin isi oauth/worker.mjs melalui Edit code, lalu deploy.
3. Catat URL HTTPS Worker yang sebenarnya, misalnya https://portfolio-github-auth.NAMA-AKUN.workers.dev.
4. Worker belum bisa login sebelum environment diisi; respons 503 pada tahap ini wajar. Tidak perlu memindahkan DNS domain portfolio ke Cloudflare untuk memakai workers.dev.

### 2. Buat GitHub App

1. GitHub akun → Settings → Developer settings → GitHub Apps → New GitHub App.
2. Nama: nama unik pilihan Anda. Homepage URL: https://farhanreninda.my.id.
3. Callback URL: URL Worker sebenarnya + /callback. Jangan menambahkan parameter.
4. Pertahankan expiration user access token aktif. Webhook: nonaktifkan Active. Setup URL dan private key tidak diperlukan.
5. Repository permissions: Contents = Read and write; Metadata = Read-only. Account permissions tidak diperlukan.
6. Who can install: Only on this account.
7. Buat App, catat Client ID (bukan App ID), dan buat client secret. Jangan kirim secret ke chat atau commit.
8. Install App → pilih Only select repositories → farhanreninda.github.io.

### 3. Isi environment Worker

Worker → Settings → Variables and Secrets:

| Nama | Tipe | Nilai |
| --- | --- | --- |
| GITHUB_CLIENT_ID | Variable | Client ID GitHub App |
| GITHUB_CLIENT_SECRET | Secret | Client secret GitHub App |
| GITHUB_REPOSITORY_ID | Variable | 1269938498 |
| ADMIN_ORIGINS | Variable | https://farhanreninda.my.id |

Untuk uji localhost, tambahkan origin tepat pada ADMIN_ORIGINS, dipisahkan koma. Jangan memakai wildcard. Redeploy setelah konfigurasi.
Alternatif CLI dari direktori oauth: npx wrangler deploy; simpan client secret dengan npx wrangler secret put GITHUB_CLIENT_SECRET. File wrangler.toml sudah berisi origin dan repository ID.

### 4. Atur GitHub Pages dan variable build

Repository → Settings → Pages → Build and deployment → Source = GitHub Actions. Ini menggantikan build dinamis Jekyll dari branch. Domain tetap farhanreninda.my.id dan Enforce HTTPS aktif.
Repository → Settings → Secrets and variables → Actions → Variables:

- VITE_GITHUB_AUTH_URL = URL HTTPS Worker yang sebenarnya, tanpa /auth atau /callback.
- VITE_GITHUB_BRANCH = main (opsional; default main).
- VITE_GITHUB_REPO otomatis diisi github.repository oleh workflow.

VITE_API_URL dan VITE_ADMIN_URL tidak dipakai pada mode GitHub. CMS_ACCESS_WORD tidak dipakai di Pages. Jangan mengisi secret OAuth dengan prefix VITE_.

Kode ada pada feature/admin-cms. Commit/push branch, review lalu merge ke main agar workflow menerbitkan versi baru. Jangan arahkan CMS ke feature/admin-cms untuk publikasi situs; Pages workflow berjalan pada main.
Setelah variable auth berubah, rerun workflow agar URL Worker masuk build.

### 5. Verifikasi online

1. Actions → Deploy to GitHub Pages harus sukses.
2. Buka /admin/ pada domain, pilih Masuk dengan GitHub; izinkan popup.
3. Login dan setujui App milik Anda. Repository harus sudah dipasang pada App.
4. Edit field, simpan; periksa commit content: perbarui portfolio melalui CMS di main.
5. Tunggu deploy selesai, cek portfolio pada tab lain. Unggah gambar membuat commit aset dan manifest; simpan konten untuk menggunakan URL gambar.

## Lokal

Default mode GitHub tidak memerlukan API lokal. npm run dev menjalankan Vite dan frontend membaca public/cms/*.json. Login lokal perlu Worker yang mengizinkan http://localhost:5173.
Untuk memakai CMS Node/SQLite lama, isi VITE_CMS_MODE=local dan CMS_ACCESS_WORD pada .env, lalu jalankan npm run dev:local. Database lama tidak dihapus atau dimigrasikan.

## Batas dan perilaku

- Konten maksimal 2 MB; gambar/PDF/MP4/WebM maksimal 10 MB. SVG baru tidak diterima. Video besar sebaiknya memakai link.
- Penyimpanan memakai SHA file terbaru dari saat editor dimuat. Jika berubah di GitHub/tab lain, konflik ditampilkan; muat ulang sebelum mengulang edit. Tidak menimpa perubahan diam-diam.
- Upload membuat dua commit (file, lalu manifest). Jika manifest gagal, file yang sudah diunggah tetap ada di repository; ulangi upload atau rapikan melalui GitHub. Preview file baru memakai URL blob selama tab aktif.
- Repo harus mengizinkan commit langsung ke branch target. Branch protection yang mewajibkan PR memerlukan alur PR berikutnya; versi ini menampilkan penolakan API.
- GitHub App tidak dapat menyembunyikan HTML admin di hosting statis; data editor hanya dimuat setelah autentikasi. Menulis konten memerlukan izin GitHub. Konten portfolio dan aset bersifat publik.
- Uji otomatis memakai respons GitHub tiruan; OAuth dan deploy live perlu setup akun di atas. Tidak membuat commit percobaan ke repository production.

## Referensi

- [GitHub App user access token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub Contents API](https://docs.github.com/en/rest/repos/contents)
- [Source GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Cloudflare Worker pricing](https://developers.cloudflare.com/workers/platform/pricing/)
