# Audit dan keputusan CMS

Audit dilakukan pada branch `feature/admin-cms`, sebelum integrasi API.

## Sumber data dan pemetaan

| Sumber existing | Pemakai | Penyimpanan CMS |
| --- | --- | --- |
| `cv.ts`: profile ID/EN | Hero, About, Header, Footer, Contact, Hello (komponen belum dipakai Home) | `localizedCv.id/en.profile` |
| skills: 4 grup, 19 skill per bahasa | SkillsSection | `localizedCv.id/en.skills`, urutan array dipertahankan |
| experiences: 10 per bahasa (2 kerja, 3 magang, 5 organisasi) | ExperienceSection, posisi aktif About | `localizedCv.id/en.experiences` |
| projects: 9 per bahasa | ProjectsSection dan carousel | `localizedCv.id/en.projects` |
| certificates: 2 per bahasa | CertificatesSection | `localizedCv.id/en.certificates` |
| educations: 3 per bahasa | CertificatesSection, pendidikan pertama About | `localizedCv.id/en.educations` |
| siteCopy ID/EN: navigasi, heading, CTA, metadata, aria-label | Semua komponen melalui useLocale | `siteCopy.id/en` |
| portrait.jpg, FR, nama unduhan CV, favicon, theme-color | Hero, Hello, Header, Footer, Contact, index.html | `settings` dengan nilai existing |
| public/projects, public/profile, CV.pdf, favicon.svg | Foto, thumbnail, carousel, tautan CV | Media library; URL existing dipertahankan |
| main.css :root dan [data-theme=dark] | Seluruh halaman publik | Tema existing tetap di CSS; tema default menyimpan override kosong |

Data period/GPA/label yang belum terlihat di beberapa komponen tetap disimpan. Durasi pengalaman dan tahun footer merupakan nilai hitungan, bukan konten baru. ID bagian, struktur carousel, ikon toggle, animasi, dan SVG dekoratif tetap menjadi implementasi UI. Pemetaan navigasi tetap memakai hash anchor.

## Implementasi existing

Vue 3, TypeScript strict, Vite 5, Vue Router history, Unhead. Pinia terpasang tetapi tidak dipakai. Home menampilkan tujuh section; HelloSection masih ada tetapi tidak dirender. Bahasa ID/EN sudah tersedia melalui useLocale. Seluruh komponen memakai scoped CSS, breakpoint serta reveal existing. Steering lama menyebut delapan section dan satu bahasa; implementasi aktual menjadi acuan audit.

Belum ada API, database, autentikasi, pengelolaan media, atau pengujian otomatis. GitHub Actions membangun frontend dan mengunggah artifact GitHub Pages. GitHub Pages merupakan hosting statis, sehingga API/auth/database harus dijalankan pada host Node terpisah atau seluruh website dijalankan pada host Node.

## Keputusan teknis

- Node.js 24 dengan HTTP, crypto, dan SQLite bawaan: tidak menambah framework atau paket runtime.
- Satu dokumen portfolio di SQLite menyimpan struktur JSON existing, dua bahasa, array berurutan, dan field opsional. Ini menghindari perubahan relasi/ID yang tidak diperlukan oleh portfolio.
- Seed membaca ekspor existing `src/data/cv.ts` tanpa menulis ulang teks. Migrasi hanya memasukkan data jika dokumen belum ada, sehingga restart tidak menimpa edit admin.
- PUT dokumen berversi mengelola CRUD semua koleksi secara atomik. Konflik revisi ditolak agar dua admin/tab tidak menimpa perubahan satu sama lain.
- API publik hanya menyediakan data baca. Mutasi memerlukan sesi server, cookie HttpOnly, token CSRF, pemeriksaan Origin, validasi struktur dan URL.
- Admin memakai URL `/admin`; shell publik tidak muncul pada halaman admin. Public stylesheet dan styling komponen dipertahankan.
- Tema default terkunci, override kosong. Tema tambahan berupa konfigurasi token warna/font terpisah, dengan preview sebelum aktivasi.

## Arah desain admin

Panel untuk pemilik portfolio, sederhana dan profesional sesuai brief. ENERGY 1 / RHYTHM 2 / MOTION 1. Teal existing dipakai hanya untuk aksi simpan/aktif agar CMS terasa bagian dari portfolio. Tipografi memakai font sistem existing agar form mudah dibaca. Sidebar mengikuti koleksi nyata dan menjadi menu lipat pada HP. Daftar memakai baris/detail editor; dashboard menampilkan jumlah dari database. Spasi memisahkan kelompok form, tanpa ilustrasi, aset baru, atau statistik buatan.

Screenshot baseline desktop 1440×900 dan mobile 390×844, light/dark, disimpan di `verification/` sebelum perubahan.
