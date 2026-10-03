> **Mode default: GitHub Pages.** Lihat [github-pages.md](github-pages.md) untuk login GitHub, JSON konten, upload ke repo, dan setup Worker. Penjelasan Node/SQLite di bawah berlaku untuk mode lokal legacy VITE_CMS_MODE=local.

# CMS portfolio

## Arsitektur dan database

Frontend tetap Vue 3 SPA. `main.ts` mengambil `/api/content`, menunggu router siap, lalu memasang aplikasi. `usePortfolio` menyimpan respons reaktif; `useLocale` memilih data Indonesia/English. Revisi baru menyegarkan observer reveal. Halaman publik mengambil revisi terbaru saat mendapat fokus atau setiap 60 detik ketika tab terlihat. Kegagalan refresh mempertahankan data yang sudah tampil; kegagalan awal memiliki pesan dan tombol retry.

Admin lazy-loaded pada `/admin` dengan shell tersendiri. Form mengikuti schema bersama di `src/cms/schema.ts`, termasuk array bersarang dan field opsional. Node HTTP, crypto, SQLite, dan test runner memakai modul bawaan, tanpa paket runtime backend tambahan. Node 24 diperlukan untuk SQLite dan membaca TypeScript pada seed/schema.

Lokasi database default `data/cms.sqlite`, dapat diganti melalui `CMS_DB_PATH`. Schema versi 3 memakai WAL. Migrasi mengganti tabel sesi yang sebelumnya merujuk akun; sesi lama dibatalkan. Tabel akun lama jika ada tetap disimpan tetapi tidak digunakan untuk akses admin. Konten/media tidak diubah:

| Tabel | Isi |
| --- | --- |
| documents | ID `portfolio`, JSON seluruh konten, revision |
| sessions | Hash token sesi, token CSRF, waktu kedaluwarsa |
| login_attempts | Jumlah percobaan login per IP dan batas waktu |
| media | Nama, URL, MIME, ukuran, asal existing/upload, bytes unggahan |

Dokumen menyimpan `localizedCv.id/en`, `siteCopy.id/en`, `settings`, `themes`, dan `activeThemeId`. Struktur CV, field opsional, nilai, serta urutan mengikuti ekspor existing. Tema default `existing` menyimpan override kosong. Pemetaan lengkap ada pada [audit.md](audit.md).

`src/data/cv.ts` dipertahankan sebagai seed. Saat database pertama dibuat, migrasi membaca langsung ekspor konten kedua bahasa dan mendaftarkan gambar/PDF pada `public/` dengan URL semula dalam satu transaksi. `npm.cmd run cms:migrate` dapat dijalankan ulang tanpa menggandakan konten atau menimpa edit. API gagal tidak memakai fallback seed yang berpotensi menampilkan konten lama. Unggahan baru disimpan sebagai BLOB dalam SQLite.

## Lokal dan magic word

Di folder project dengan Node.js 24 atau lebih baru:

```powershell
npm.cmd install
npm.cmd run dev
```

Sebelum menjalankan `dev`, salin `.env.example` menjadi `.env` dan isi `CMS_ACCESS_WORD` dengan kata/frasa pribadi (tidak kosong, maksimal 128 karakter). Tidak ada batas minimal 12 karakter, akun, atau pendaftaran. Huruf besar/kecil dan spasi dalam magic word harus cocok persis. Magic word tidak boleh memakai prefix `VITE_`, karena variabel Vite dapat masuk bundle frontend. `.env` sudah diabaikan Git.

Magic word hanya dibaca backend dan dibandingkan dengan hash scrypt dalam memori. Jika belum dikonfigurasi, halaman admin menampilkan gerbang akses dan endpoint unlock menghasilkan 503; konten publik tetap tersedia. Akun/password lama tidak dapat membuka admin. Perintah `cms:admin` telah dihapus karena pendaftaran akun tidak diperlukan.

Portfolio: `http://localhost:5173`. Admin: `http://localhost:5173/admin`. API: `http://127.0.0.1:3001/api/content`. `dev` menjalankan API dan Vite bersama. Hentikan server sebelumnya jika port sudah digunakan.

Production lokal:

```powershell
npm.cmd run build
npm.cmd start
```

Seluruh aplikasi tersedia di `http://127.0.0.1:3001`. Hentikan `dev` dahulu karena keduanya memakai port 3001. `npm.cmd run preview` menyediakan Vite port 4173 melalui proxy; API harus berjalan dengan `npm.cmd start` pada terminal lain.

## Mengelola konten

1. Buka `/admin`, masukkan magic word, lalu pilih Buka admin. Direct link `/admin/...` tetap menggunakan gerbang akses yang sama.
2. Pilih Profil & kontak, Keahlian, Pengalaman, Proyek, Pendidikan, Sertifikasi, atau Teks website.
3. Pilih bahasa konten Indonesia/English. Masing-masing memiliki data tersendiri; edit tidak diterjemahkan otomatis.
4. Buka detail item. Gunakan Tambah, Hapus, Naik, atau Turun pada daftar. Checkbox field opsional menentukan apakah field tersebut ada.
5. Pilih **Simpan dan publikasikan**. Seluruh draft disimpan atomik. Navigasi antarmenu mempertahankan draft; muat ulang/keluar meminta konfirmasi jika ada edit yang belum disimpan.

Panel tetap berbahasa Indonesia. Tidak ditambahkan status publikasi karena struktur existing tidak memilikinya. Semua item tersimpan mengikuti perilaku komponen existing. Pengaturan umum mengelola foto profil, inisial merek, nama unduhan CV, favicon, dan warna browser. Heading, CTA, label aksesibilitas, metadata, serta pesan kontak berada pada Teks website.

Validasi frontend/backend mencakup bentuk dokumen, field wajib, URL http(s)/lokal, email, jenis pengalaman, format bulan/tahun, warna hex, token tema, dan media tersedia. Batasnya 200 item per daftar, 20.000 karakter per field, serta 2 MB per dokumen. Error menyebut path field. Konflik revisi menghasilkan 409: salin edit yang ingin dipertahankan, muat ulang, lalu ulangi edit pada revisi terbaru. Tidak ada penimpaan otomatis.

## Media dan tema

Media menerima PNG, JPEG, WebP, GIF, dan PDF maksimal 10 MB. Server memeriksa signature dan MIME. SVG existing tersedia; SVG baru tidak diterima. Preview tampil sebelum/sesudah unggah. Pilih URL dari saran field gambar/CV atau salin dari library, lalu simpan konten. Upload langsung tersimpan terpisah dari draft konten.

Media yang dipakai konten tersimpan tidak bisa dihapus. Panel juga memeriksa pemakaian dalam draft. Ganti/hapus tautan dan simpan dahulu. Menghapus unggahan menghapus bytes database. Menghapus entri aset existing hanya menghapusnya dari library; file asli `public/` tetap dipertahankan.

Tema existing selalu tersedia dan tokennya terkunci kosong, sehingga CSS asli menjadi default. Data awal tidak memiliki variasi tema baru. Untuk menambah konfigurasi: isi nama, aktifkan token warna/font yang diperlukan untuk mode terang/gelap, lalu preview. Token kosong mewarisi CSS existing. Warna menerima hex 6/8 digit; font memakai pilihan sistem tanpa unduhan tambahan.

Preview membuka portfolio dalam dialog iframe dan menerapkan draft melalui pesan same-origin tanpa mengaktifkannya pada publik. Pilih Jadikan tema aktif lalu Simpan dan publikasikan untuk aktivasi. Menghapus tema aktif mengembalikan default saat disimpan. Fondasi ini mendukung token warna/font; layout dengan komponen berbeda memerlukan pengembangan berikutnya. Periksa kontras serta responsivitas konfigurasi baru sebelum aktivasi.

## Autentikasi dan API

Magic word memakai hash scrypt dengan salt acak di memori server. Sesi SQLite menyimpan hash token. Cookie HttpOnly, SameSite=Strict, path `/api`, usia maksimal 8 jam, dan Secure di production. Semua endpoint admin memerlukan sesi, kecuali unlock yang memeriksa magic word. Mutasi memerlukan `X-CSRF-Token` serta Origin admin yang diizinkan. Keluar menghapus sesi. Maksimal lima percobaan per IP dalam 15 menit; unlock berhasil menghapus hitungan. IP memakai alamat koneksi langsung, sehingga reverse proxy berbagi hitungan; X-Forwarded-For tidak dipercaya otomatis.

Saat server dimulai ulang, seluruh sesi akses dibatalkan; pengguna harus memasukkan magic word lagi. Untuk menggantinya, ubah `CMS_ACCESS_WORD` pada environment host lalu restart backend. Jalankan satu instance backend untuk database ini karena startup menghapus sesi. Semua orang yang mengetahui magic word memiliki akses admin penuh; tidak ada identitas/role per pengguna. File database dapat mencakup hash akun legacy dan sesi; jangan membagikannya.

| Metode / endpoint | Akses dan isi |
| --- | --- |
| GET /api/content | Publik, `{ data, revision }` |
| GET /api/media/:id | Publik, bytes unggahan |
| POST /api/admin/unlock | Origin admin, `{ magicWord }`; cookie dan `{ csrfToken }` |
| GET /api/admin/session | Sesi, `{ csrfToken }` |
| POST /api/admin/logout | Sesi + CSRF |
| GET /api/admin/content | Sesi, `{ data, revision }` |
| PUT /api/admin/content | Sesi + CSRF, `{ data, revision }`; CRUD semua koleksi/settings/tema atomik |
| GET /api/admin/media | Sesi, metadata tanpa bytes |
| POST /api/admin/media | Sesi + CSRF, body bytes, Content-Type sesuai MIME, X-File-Name di-encodeURIComponent |
| DELETE /api/admin/media/:id | Sesi + CSRF, menolak media yang digunakan |

Semua respons JSON kecuali media. Error `{ error, details? }`: 400 input, 401 sesi, 403 origin/CSRF, 404 tidak ditemukan, 409 konflik/referensi, 413 ukuran, 415 format, 422 validasi, 429 rate limit. Konten/admin tidak di-cache. URL unggahan UUID immutable; gambar pengganti memakai URL baru.

## Environment dan hosting

Salin `.env.example` menjadi `.env` jika diperlukan.

| Variabel | Fungsi |
| --- | --- |
| CMS_DB_PATH | SQLite; gunakan disk permanen pada production |
| CMS_ACCESS_WORD | Kata/frasa rahasia untuk akses admin; hanya pada backend, wajib diisi untuk membuka admin |
| PORT / HOST | Default 3001 / 127.0.0.1; production dapat memakai 0.0.0.0 di balik reverse proxy HTTPS |
| NODE_ENV | `production` mengaktifkan Secure cookie dan mewajibkan origin admin HTTPS |
| CMS_ADMIN_ORIGIN | Origin HTTPS backend/admin tanpa path/slash akhir |
| CMS_PUBLIC_ORIGIN | Origin frontend untuk CORS GET publik, misalnya `https://farhanreninda.github.io` |
| VITE_API_URL | Origin backend tanpa `/api`, dikompilasi saat build frontend |
| VITE_ADMIN_URL | URL backend `/admin` untuk redirect admin dari frontend Pages |

Dua pilihan hosting:

1. Satu host Node: build dengan variabel Vite kosong, jalankan `npm.cmd start`, tempatkan reverse proxy HTTPS di depan server. Frontend/API/admin memakai origin yang sama.
2. GitHub Pages + backend Node: backend menyajikan build admin dengan variabel Vite kosong. Gunakan `CMS_ADMIN_ORIGIN=https://alamat-backend`, `CMS_PUBLIC_ORIGIN=https://farhanreninda.github.io`, dan `CMS_ACCESS_WORD` pada environment backend. Isi GitHub repository variables `VITE_API_URL=https://alamat-backend` dan `VITE_ADMIN_URL=https://alamat-backend/admin` untuk build Pages.

Untuk domain sendiri pada satu host Node, arahkan domain/reverse proxy HTTPS ke backend, isi `CMS_ADMIN_ORIGIN=https://domain-anda` dan `CMS_ACCESS_WORD`, serta `NODE_ENV=production`. Akses admin melalui `https://domain-anda/admin`. Pengunjung dari browser/perangkat lain tetap perlu memasukkan magic word untuk memperoleh sesi mereka sendiri. Jangan memasukkan magic word dalam URL atau repository variables Vite.

Bundle admin backend harus memakai API same-origin karena cookie/CSRF sengaja tidak mendukung admin lintas origin. Aset existing disertakan pada kedua build; upload baru memakai origin API. GitHub Pages tidak menjalankan backend/database. Workflow berhenti jika repository variables kosong agar build tanpa backend tidak menggantikan website aktif. Backend production belum dikonfigurasi atau dideploy dalam pekerjaan ini.

GitHub Pages tidak menyediakan rewrite deep link SPA. Bookmark admin memakai URL backend `/admin` langsung; server Node menyediakan fallback SPA. Redirect `VITE_ADMIN_URL` bekerja jika aplikasi frontend sudah termuat pada rute admin.

## Backup dan pemeriksaan

Hentikan server sebelum menyalin/memulihkan database. Salin file SQLite beserta `-wal`/`-shm` jika masih ada sebagai satu set, dan pertahankan repository/aset `public/`. Jangan menyalin hanya file utama ketika server masih menulis. Simpan backup di luar repo. Restore dilakukan saat server berhenti. Konten, akun, unggahan, dan tema termasuk dalam database.

Magic word berasal dari environment, sehingga tidak termasuk backup database. Simpan konfigurasi environment host secara terpisah dan privat. Pada database baru tidak ada tabel akun; hanya tabel legacy yang mungkin tersisa dari versi sebelumnya.

Jalankan `npm.cmd test` dan `npm.cmd run build` sebelum mengirim perubahan. Hasil serta batas verifikasi ada pada [verification.md](verification.md). Advisory dependency existing dicatat; upgrade major tooling/head library memerlukan pekerjaan terpisah.


### Pilihan gambar, video, dan dokumen

Field media menyediakan Galeri (aset tersimpan), File perangkat (unggah lalu pilih), dan Link (URL/path lokal). Format upload: PNG, JPG, WebP, GIF, PDF, MP4, WebM; maksimum 10 MB per file. Pemilihan file memakai dialog browser/perangkat. Unggahan langsung ditambahkan ke library; penempatan URL pada portfolio baru diterapkan ketika konten disimpan. Link eksternal tidak diunduh ke database. Setelah update backend, restart server agar daftar format baru dimuat.
