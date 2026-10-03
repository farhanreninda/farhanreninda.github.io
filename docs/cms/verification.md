# Verifikasi CMS, 2026-10-03

## Redesign admin dari referensi Stitch

- PASS: `npm.cmd run build` (TypeScript strict + Vite) dan `npm.cmd test` (integration HTTP).
- PASS: desktop 1440×1000, mobile 390×844, serta layout 320×720 dan 768×1024 tanpa overflow horizontal.
- PASS: mode terang/gelap, seluruh 11 menu, enam pintasan koleksi/teks, tiga pintasan editor, edit profil, bahasa ID/EN, muat ulang, unlock/keluar, dan preview tema.
- PASS: perubahan nama sementara memunculkan status draft dan mengaktifkan simpan; Escape membatalkan konfirmasi, Lanjutkan memuat ulang nama asli. Data user tetap revisi 3; tidak mempublikasikan perubahan pengujian.
- PASS: Tab menghasilkan focus outline; Escape menutup preview; input magic word kosong invalid; console error/warning kosong.
- PASS: perhitungan WCAG pasangan warna aktif. Teks muted minimal 5.71:1, teks primary minimal 6.35:1, border input minimal 3.34:1.
- PASS: `git diff --check`. Perubahan desain berada di `AdminView.vue`, `AdminIcon.vue`, dan CSS scoped `admin.css`.

Screenshot: `verification/admin-redesign-desktop-dark.jpg`, `admin-redesign-desktop-light.jpg`, `admin-redesign-mobile-dark.jpg`, `admin-redesign-mobile-light.jpg`, `admin-redesign-access-mobile.jpg`. Arah desain dan delivery gate lengkap: [admin-design.md](admin-design.md).

## Pembaruan akses magic word (implementasi aktif)

PASS: akun/username/setup akun diganti satu `CMS_ACCESS_WORD` backend. Build dan integration HTTP lulus. Uji meliputi kata salah/benar, input kosong/terlalu panjang, unauthorized GET/PUT/media/deep endpoint, Origin/CSRF, rate limit serentak, sesi kedaluwarsa, keluar, restart/rotasi secret, serta server tanpa konfigurasi (unlock 503, admin 401, publik 200). Secret tidak berada pada respons konten publik. Schema v3 membatalkan sesi akun lama dan mempertahankan dokumen/media. Akun legacy tidak digunakan untuk akses.

Browser membuka `/admin/settings` langsung dan melihat gerbang satu field; kata salah menampilkan error, kata benar membuka dashboard, reload mempertahankan sesi, keluar/reload kembali terkunci. Tampilan 390×844 memiliki scroll width 390, satu input password berlabel Magic word, dan console tanpa error/warning. Screenshot `verification/admin-magic-word.jpg` memakai fixture lokal yang sudah dihentikan. `.env` lokal disiapkan dengan nilai kosong untuk diisi sendiri oleh user; tidak ada kata rahasia bawaan.

Gate antislop perubahan ini PASS: copy/tombol sesuai aksi nyata, satu field berlabel dan state error/loading; tampilan mobile muat; kontrol unlock/keluar benar-benar diuji; CSS publik dipertahankan. Catatan akun/username dan screenshot login di bawah merupakan riwayat implementasi sebelumnya.

## Pembaruan login username

Login/API/session/setup kini memakai username. SQLite v2 memigrasikan kolom email lama tanpa mengganti nilai login atau hash. `npm.cmd test` dan build lulus setelah perubahan: akun legacy tetap login, akun username biasa menerima password satu karakter, username duplikat/spasi dan password kosong/lebih dari 128 karakter ditolak. Batas minimal 12 karakter dihapus sesuai permintaan user. Screenshot akun email dan uraian pengujian di bawah merekam implementasi sebelumnya; proteksi sesi/CSRF/rate limit tetap berlaku.

Gate perubahan ini PASS: label Username terkait input text dengan autocomplete username; layout/CSS tetap sama, API dan CLI memakai kontrak yang sama, migrasi akun lama serta login password pendek diuji melalui HTTP, build strict lulus.

## Hasil

- PASS build: `npm.cmd run build`, TypeScript strict dan Vite selesai.
- PASS integrasi: `npm.cmd test`, satu skenario HTTP dengan 53 pernyataan assertion, termasuk loop kedua bahasa dan request serentak.
- PASS migrasi: deep equality seluruh `localizedCv` dan `siteCopy` terhadap ekspor existing; reopen database mempertahankan edit, akun, media, dan revisi.
- PASS data real lokal: database `data/cms.sqlite` revisi 1, sama persis seed, nol akun admin. Seluruh edit uji memakai database `.cache` terpisah yang diabaikan Git.
- PASS sumber visual: semua scoped CSS komponen publik, `main.css`, `cv.ts`, serta `index.html` dibandingkan dengan HEAD dan sama setelah normalisasi CRLF. Aset `public/` tidak diubah.
- PASS kebersihan diff: `git diff --check`.

## Cakupan uji HTTP

Autentikasi valid/salah; password lemah; anonymous read/write admin ditolak; cookie HttpOnly/SameSite; Origin dan CSRF ditolak; logout serta sesi kedaluwarsa; rate limit berurutan dan delapan percobaan serentak (lima 401, tiga 429). CRUD/reorder profile, skills, experiences, projects, educations, certificates, serta siteCopy pada ID/EN; public GET membaca hasil; revisi lama 409. URL berbahaya, field hilang, tanggal salah, default theme override, dan media hilang ditolak. Upload JPEG dibaca kembali byte-identik; format salah 415, ukuran lebih dari 10 MB 413; referensi media mencegah hapus 409; media dilepas/dihapus menghasilkan 404. Konfigurasi tema tersimpan dan tetap tersedia setelah database dibuka ulang.

## Cakupan browser

Pengujian melalui browser in-app terhadap build dengan server lokal/database disposable, tanpa edit database real:

- Login/logout dan pemuatan dashboard dengan jumlah aktual 9 proyek, 19 skill, 10 pengalaman, 3 pendidikan, 2 sertifikat.
- Edit deskripsi SIP, simpan, lalu verifikasi teks terbaru pada halaman publik; tambah proyek sementara, validasi field kosong, reorder, dan hapus melalui dialog.
- Dialog hapus: Batal/Escape mempertahankan data, Lanjutkan mengubah draft, Simpan mengubah database.
- Semua menu editor, pemilih bahasa Indonesia/English, nested form, field opsional, tombol add/reorder/delete, reload, dan save memakai handler nyata.
- Upload portrait, preview blob termuat, gambar library termuat, URL dipakai pada settings, gambar API termuat pada publik; kembalikan URL existing lalu hapus upload.
- Tambah konfigurasi tema sementara dengan `--color-bg:#eeeeee`, iframe preview memakai token tersebut, aktivasi/simpan terlihat pada publik. Hapus tema aktif mengembalikan default. Database fixture akhirnya sama persis seed.
- Semua halaman admin diperiksa pada viewport 390×844; document width 375 (scrollbar), tanpa overflow. Form proyek terbuka juga muat. Tablet 768×1024: document width 753. Desktop 1440×900: document width 1425. Mode terang/gelap diperiksa.
- Fokus keyboard admin memiliki outline solid; dialog native menerima Escape. Public ID/EN, hash navigation proyek, sembilan modal proyek, carousel next/previous/dot 13, Escape, dan kembali ke atas berhasil.
- Console pada halaman build publik/admin final tidak memiliki error/warning dalam pengujian tersebut. Error API pada skenario negatif memang diharapkan.
- CLI setup diuji pada database sementara: prompt password disamarkan, akun dibuat, hash diverifikasi melalui `verifyPassword`.

## Perbandingan visual

[Screenshot](verification/) mencakup baseline dan setelah integrasi: desktop 1440×900 serta mobile 390×844, mode terang/gelap. Dimensi full-page tetap sama: desktop 1424×8042, mobile 375×14024. Gambar after diambil setelah sembilan thumbnail termuat.

Mobile mean absolute RGB difference terhadap baseline hanya 0,081/255 (gelap) dan 0,071/255 (terang). Selisih terpusat pada animasi orbit hero dan kompresi JPEG; band section di bawahnya mendekati nol. Desktop mean difference 9,538 (gelap) dan 1,691 (terang), karena screenshot baseline desktop menangkap thumbnail lazy sebelum termuat. Band 900–4500 dan 6300–8042 memiliki mean difference 0–0,001 pada mode gelap. Struktur, typography, warna section, ukuran halaman, urutan, dan CSS sama. Ini bukan klaim pixel-identik setiap frame animasi; state lazy-image baseline dicatat agar hasil tidak disalahartikan.

Screenshot admin memakai akun **fixture lokal**, bukan akun yang dapat dipakai user. File: `admin-desktop.jpg`, `admin-mobile-light.jpg`, `admin-mobile-dark.jpg`.

`admin-login.jpg` menunjukkan login database real melalui Vite 5173. API real 3001 dan server Vite existing tetap berjalan untuk preview. Server fixture 3002 sudah dihentikan. Cleanup file fixture/setup di `.cache` ditolak automatic approval review dengan alasan `blocked by policy`; file tetap ignored dan tidak dipakai server real.

## Gate antislop

Scope gate adalah UI admin baru. Desain/konten publik existing dipertahankan sesuai instruksi eksplisit user, termasuk gaya dan teks lama. Arah admin pada audit: ENERGY 1 / RHYTHM 2 / MOTION 1.

- R-02 PASS: copy admin tidak menambah em dash; teks portfolio existing dipertahankan.
- R-03 PASS: pengukuran browser 390/768/1440 tidak menunjukkan overflow horizontal.
- R-17 PASS: dashboard dihitung dari database, nilai seed 9/19/10/3/2.
- R-18 PASS: tidak ada testimonial pada admin.
- R-23 PASS: aset library berasal dari public existing; upload uji memakai portrait existing dan database disposable.
- R-24 PASS: seluruh menu menuju editor/koleksi yang tersedia; hash proyek diuji.
- R-25 PASS: kontras admin terang text 12,71, muted 5,63, accent 8,14, danger 7,72; gelap text 13,66, muted 9,72, accent 8,25, danger 8,37. Border terang 3,34, gelap 4,42.
- R-26 PASS: kontrol memakai handler/API; save, logout, navigasi, upload, tema, serta dialog diuji.
- R-27 PASS: loading, login, error validasi/API, empty collection, dan pesan save tersedia.
- R-28 PASS: tidak ada FAQ admin.
- R-32 PASS: label form, focus-visible solid, target 44 px, dialog native dan Escape diuji.
- R-33 PASS: implementasi ditulis pada source Vue/Node/schema, bukan script patch visual.
- R-34 PASS: screenshot serta pengukuran admin terang/gelap dan publik kedua mode tersedia.
- R-35 PASS: build, server lokal, integration HTTP, dan click-through jenis kontrol utama dicatat di atas.
- R-36 PASS: hanya mekanisme auth dan hasil uji aktual yang diklaim; tidak ada klaim sertifikasi/keamanan mutlak.
- R-37 PASS: Design Read dan dial dicatat sebelum implementasi pada audit.
- R-38 PASS: konten awal diambil dari ekspor existing dan deep equality lulus; data uji terpisah.
- R-01 PASS: admin memakai warna solid agar form mudah dibaca, tanpa gradient/glow baru.
- R-04 PASS: tombol admin memakai teks fungsi, tanpa ikon generik tambahan.
- R-06 PASS: font sistem mengikuti portfolio; label form normal tanpa tracking dekoratif.
- R-07 PASS: admin tidak menambah grid latar/dot dekoratif.
- R-08 PASS: tombol tindakan menggunakan kata fungsi tanpa panah dekoratif.
- R-09 PASS: status tersimpan/draft berupa teks dengan fungsi operasional.
- R-10 PASS: permukaan admin solid, tanpa glassmorphism.
- R-12 PASS: pemisahan panel memakai border, tanpa shadow menyeluruh.
- R-13 PASS: tidak ada glow admin.
- R-14 PASS: jumlah dashboard memakai bentuk konsisten karena semua merupakan jumlah koleksi sejenis; form memakai baris/detail.
- R-19 PASS: admin hanya hover/focus dan dialog, sesuai MOTION 1; animasi publik existing dipertahankan.
- R-22 PASS: admin tidak menambah ilustrasi.
- Liveliness/dials PASS: ENERGY 1, RHYTHM 2, MOTION 1 eksplisit di audit.
- Liveliness/consistency PASS: tampilan form tenang, dashboard ringkasan dan editor berbeda sesuai fungsi.
- Liveliness/focal point PASS: heading halaman dan aksi simpan menjadi acuan tiap layar; login berpusat pada form.
- Liveliness/spacing PASS: border/spasi memisahkan save bar, fieldset, dan item daftar.
- Liveliness/accent PASS: teal menandai tindakan simpan serta menu aktif.
- Liveliness/identity PASS: sidebar mengikuti koleksi portfolio nyata dan tipografi/teal existing.
- Liveliness/Design Read PASS: arah panel pemilik portfolio tercatat di audit.
- C-1 PASS: pemilihan layout/color/type memiliki alasan pada audit.
- C-2 PASS: tindakan tersambung ke form, router, dialog, atau backend.
- C-3 PASS: menu hanya mengikuti konten/settings/media/tema yang diminta.
- C-4 PASS: state login, validasi, save, modal, dua mode, dan breakpoint diuji.
- C-5 PASS: angka berasal dari data aktual; tidak ada testimonial.
- R-05 PASS: susunan mengikuti pekerjaan edit koleksi, bukan template marketing.
- R-11 PASS: input/tombol radius 6 px, panel 8–10 px; tidak semua berbentuk pill.
- R-15 PASS: CTA spesifik Simpan dan publikasikan, Unggah file, serta Preview tema.
- R-16 PASS: copy admin memakai bahasa operasional tanpa klaim marketing.
- R-20 PASS: menu/nilai dashboard berasal dari struktur bilingual portfolio Farhan.
- R-21 PASS: toggle terang/gelap menggunakan preferensi tema existing.
- R-29 PASS: permukaan netral, teal aksi, merah error; token terpusat.
- R-30 PASS: tidak menyalin layout produk referensi; susunan mengikuti koleksi project.
- R-31 PASS: alasan layout, spacing, typography, warna, dan form tercatat di audit.

## Batas pengujian dan pekerjaan berikutnya

Backend production belum dihosting, sehingga HTTPS/reverse proxy, backup host, dan koneksi GitHub Pages production belum diuji. Workflow hanya disiapkan, tidak dipush/deploy. Uji responsive memakai emulasi viewport, bukan perangkat fisik. Tidak ada reset password email, role bertingkat, atau layout tema baru karena brief hanya meminta login admin dan fondasi konfigurasi tema.

`npm audit` menemukan 12 advisory dependency existing: 1 low, 2 moderate, 9 high, terutama tooling/deploy dan Unhead. Perbaikan otomatis sebagian meminta upgrade major Vite/Unhead atau perubahan dependency gh-pages. Paket backend baru tidak ditambahkan. Upgrade tersebut belum dilakukan dan perlu pekerjaan terpisah sebelum memperluas deployment. Jangan menyebut hasil ini sebagai audit keamanan menyeluruh.

## File

Ditambahkan: `.env.example`; `server/{app,auth,database,seed,index,dev,migrate,create-admin,cms.test}.mjs`; `src/cms/{AdminView.vue,FieldEditor.vue,api.ts,confirmation.ts,schema.ts,types.ts}`; `src/composables/usePortfolio.ts`; `docs/cms/{README,audit,verification}.md` dan screenshot `docs/cms/verification/`.

Diubah: `package.json`, lockfile, `.gitignore`, `vite.config.ts`, workflow deploy, README; `src/app/{App.vue,main.ts,router.ts}`; `useLocale.ts`; Hero/Hello/Header/Footer/Contact/HomeView untuk binding data/settings atau refresh; lima steering docs dan memory. CSS publik serta isi seed tidak berubah.

## 2026-10-03: Stitch Comprehensive Blue Edition

- Empat HTML/screenshot sumber diimplementasikan pada Ringkasan, Profil & Kontak, Proyek, serta Keahlian & Pengalaman. Font lokal Jakarta/Inter/Material Symbols berhasil dimuat di browser; lisensi tersedia di public/fonts/cms.
- Build final npm.cmd run build lulus; npm.cmd test lulus untuk auth magic word, session/CSRF/origin, seed/CRUD bilingual, media, tema, serta persistensi.
- Browser menguji pencarian Redmimo (1 hasil), kategori Web Application (1 hasil), pencarian tanpa hasil, edit nama/teknologi, tambah proyek dari kedua CTA, editable chip skill, penambahan skill, edit grup, urutan keyboard, profil live preview, field GitHub opsional, dan dialog perbandingan/Escape. Draft dibuang dengan reload dan konfirmasi; simpan kembali disabled.
- Empat halaman utama diperiksa pada 390 dan 320 px, keahlian/tablet pada 768 px, serta desktop 1600 px. Menu mobile dan kedua mode berfungsi; badge skill tablet tidak terpotong. Console warning/error kosong.
- Deep equality seluruh respons GET /api/content terhadap snapshot sebelum redesign lulus. SHA256 respons: 6b5f1f8bc1cac2d0b1a10d048f82000ed8ecbb94bdfbd5080121ee9b09deb6a0. Revisi tetap 3; tidak ada simpan/publish data nyata.
- Bukti: verification/stitch-blue-overview-desktop.png, stitch-blue-profile-desktop.png, stitch-blue-projects-desktop.png, stitch-blue-skills-desktop.png, stitch-blue-overview-mobile.png, stitch-blue-skills-mobile.png.
- Desain ini menggantikan arah turquoise/serif pada laporan historis. Gate terkini berada di admin-design.md. Ukuran/teks disesuaikan dengan data aktual; fitur contoh tanpa sumber tidak diperlakukan sebagai fakta.
- Batas: uji viewport emulasi; deployment production tidak dilakukan. Font lokal menambah sekitar 2.5 MB aset pada admin tanpa dependency npm baru.

## 2026-10-03: QC layout, navigasi, Website, dan pilihan media

- Memperbaiki crash Teks Website: schema kelompok copy Proyek memiliki label yang sama dengan data Proyek, sehingga sebelumnya masuk renderer khusus yang mengakses field tidak tersedia. Renderer kini memeriksa struktur field, bukan nama label. Seluruh 81 kontrol Teks Website tampil; ID/EN diperiksa.
- Keahlian/Pengalaman memiliki halaman dan judul sendiri. Tab memakai navigasi route, serta scroll main kembali ke atas setelah berpindah halaman. Semua 11 menu diperiksa ulang pada 1600, 390, dan 768 px tanpa overflow horizontal.
- Toolbar atas memakai dua kolom dan tombol simpan selebar baris; margin/celah narasi diperkecil, field kontak opsional tetap sejajar, grip/edit/hapus berada di kanan dengan alignment sama. Kategori/deskripsi skill ditumpuk agar tidak menyisakan kolom kosong.
- Root scrollbar ganda diperbaiki dengan main sebagai containing block untuk elemen status absolute. Pada profil desktop document.scrollHeight sama dengan innerHeight (1000), main tetap dapat scroll sendiri.
- AssetPicker menyediakan Galeri, File perangkat, dan Link pada field gambar/video/CV serta media library. Galeri difilter menurut tipe; pilihan foto diuji mengaktifkan draft lalu reload memulihkan portrait asli. Link tetap bagian dari data field, tanpa mengunduh file eksternal ke server. Unggahan menambah aset library; pemilihan URL ke konten diterapkan setelah simpan.
- Backend menerima PNG/JPG/WebP/GIF/PDF/MP4/WebM sampai 10 MB. Signature file dan MIME diperiksa; integration HTTP menambah kasus upload/download dua format video, penghapusan fixture, dan penolakan video palsu. Upload file diuji pada database disposable, bukan media user. Tidak memeriksa decoding seluruh frame video.
- TypeScript strict, Vite production build, integration HTTP, dan git diff --check lulus. Tidak ada error runtime baru setelah perbaikan/reload; log lama reproduksi crash dan HMR saat file baru dibuat tetap tercatat.
- Preview lokal dimuat ulang agar format video aktif. Deep equality seluruh konten API terhadap snapshot sebelum redesign lulus; revision 3, seluruh data ID/EN identik. Tidak ada publish, commit, atau push.
- Bukti: verification/cms-qc-overview-desktop.png, cms-qc-profile-desktop.png, cms-qc-skills-desktop.png, cms-qc-skill-editor-desktop.png, cms-qc-skills-mobile.png, cms-qc-website-desktop.png, cms-qc-media-light.png.
- Batas: pilihan file membuka dialog perangkat; browser menentukan apakah galeri/dokumen dapat dipilih melalui dialog sistem. Dokumen upload didukung PDF, video MP4/WebM. Responsive memakai viewport emulasi.


## 2026-10-03: Penyederhanaan menu dan redesign identitas/tema

- Menu Teks Website dan Media & Berkas, beserta pintasan dashboard terkait, dihapus dari UI. Sembilan menu tersisa; route section copy/media yang lama jatuh ke Ringkasan. Konten bilingual, copy website, media tersimpan, dan API tetap dipertahankan. Upload galeri/file/link tetap tersedia pada field gambar/video/CV.
- Tab berulang Grup Keahlian/Pengalaman Profesional dihapus. Header item memakai layout flex bersama untuk caption, badge, panah, grip/edit/hapus. Pengukuran dua baris skill menunjukkan titik tengah badge/panah/aksi identik, sekitar 358.5 dan 527.9 px. Pada mobile kontrol dirapatkan dalam satu kelompok kanan.
- Semua summary daftar memiliki ikon expand_more yang berputar saat terbuka, termasuk Fokus Kerja. Buka/tutup Requirement serta edit grup diuji. Grip ArrowDown tetap mengubah urutan dan memberi live status; reload membuang draft uji.
- Pengaturan Umum diganti Identitas Website. IdentityEditor mengelompokkan foto profil, inisial/favicon/warna browser, serta nama dokumen CV. Preview favicon 64 px; foto memakai preview lebih besar.
- Tema & Tampilan memiliki toolbar dengan kontrol sejajar bawah, kartu tema/status, contoh palet terang/gelap memakai token tema dan fallback warna asli portfolio, baris aksi terpisah, dan panel warna/font dengan panah. Label token memakai bahasa yang dapat dibaca; pemilih warna native dan input hex tersedia.
- Browser menguji tambah tema, nama, Latar utama #ffffff, preview iframe, dan pemulihan draft. Status save kembali disabled setelah reload. Sembilan menu pada mobile 390 px, serta Identitas/Tema pada tablet 768 px tidak overflow. Mode terang tema diperiksa.
- TypeScript strict, Vite build, integration HTTP, dan diff check lulus. Deep equality seluruh respons konten terhadap snapshot awal lulus; revisi 3 tetap. Tidak ada save/publish konten user.
- Bukti: verification/cms-refine-skills-desktop.png, cms-refine-skills-mobile.png, cms-refine-identity-desktop.png, cms-refine-themes-desktop.png, cms-refine-themes-tablet-light.png.
- Batas: contoh palet merupakan ringkasan warna, sedangkan Preview tema membuka portfolio nyata. Uji responsive memakai viewport. Commit/push/deploy belum dilakukan.

## QC dropdown dan jenis pengalaman — 2026-10-03

- Desktop 1600×1000 dan ponsel 390×844: tidak ada overflow horizontal; ikon jenis tampil di ponsel.
- Panah bahasa, Jenis, kategori proyek dan tema berada pada right 12px center; select formulir dan input terkait setinggi 44px. Warna chevron mengikuti mode terang/gelap.
- ID/EN: Pekerjaan 2, Magang 3, Organisasi 5. Tambah Magang menaikkan jumlah Magang; pindah Jenis ke Organisasi memindahkan kartu; ArrowDown pada pegangan Pekerjaan menukar dua pekerjaan tanpa mengubah daftar Magang/Organisasi. Draft pengujian dibuang.
- TypeScript, Vite build, tes HTTP CMS dan git diff --check lulus. Deep comparison API content terhadap snapshot sebelum redesign lulus.
- Bukti: verification/cms-dropdown-experience-desktop.png dan verification/cms-dropdown-experience-mobile.png.

## Redesign opsi proyek — 2026-10-03

Teknologi, video demo, Play Store, tautan, thumbnail dan galeri memakai kartu berikon/switch. Header desktop 76px, posisi kanan switch sama pada setiap kolom. Reflow 390px satu kolom tanpa overflow; mode light/dark diperiksa. Switch video memunculkan sumber galeri/file/link; Space pada Play Store memunculkan input URL. Draft dibuang melalui reload. TypeScript, Vite build, diff check serta deep comparison konten API lulus. Bukti: verification/cms-project-options-desktop.png dan cms-project-options-mobile.png.

## CMS GitHub Pages — 2026-10-03

- Branch feature/admin-cms; JSON hasil ekspor identik snapshot API revisi 3, manifest 33 aset existing.
- TypeScript/Vite build lulus. dist/admin/index.html, 404.html, CNAME, .nojekyll dan cms JSON tersedia.
- Tes HTTP legacy lulus. Tes GitHub tiruan: state/origin/PKCE, client secret tidak masuk callback HTML, repository ID, izin push, read/save SHA/revision, konflik 409, logout, upload/manifest/blob preview dan SVG ditolak.
- Preview build statis 4173: admin login GitHub tersedia dengan tombol disabled saat auth URL belum diisi; portfolio ID/EN tampil tanpa API Node. Mobile 390 tanpa overflow dan light/dark diperiksa. Screenshot github-pages-admin-login.png dan github-pages-admin-mobile.png.
- Login GitHub real, deployment Worker, pengaturan App/Pages dan commit online belum diuji karena akun/konfigurasi belum tersedia. User belum punya Cloudflare. Panduan setup: github-pages.md.


## Redesign akses admin Stitch (2026-10-03)

- Brand Portfolio CMS pada header dan tema berupa ikon berlabel; ikon akses dipusatkan (offset browser 0px).
- Inter existing, kotak repository/branch, tombol GitHub, tautan kembali sesuai referensi; otorisasi dan konten tetap.
- TypeScript, build, diff check lulus. Browser desktop memeriksa light/dark, Enter pada tema, kedua tautan kembali.
- Override viewport tidak efektif (tetap 1280px); visual ponsel belum diuji ulang. CSS fluid dan wrapping digunakan agar tidak memotong nama repository.
- Antislop: hard gate PASS untuk perubahan yang diperiksa: kontrol berlabel, focus-visible, tautan nyata, data dan auth tetap; purpose gate PASS: gradien hanya menekankan login sesuai referensi; liveliness PASS: ENERGY/RHYTHM/MOTION 1, satu kartu akses; craftsmanship PASS: icon offset 0, tema dan link diuji, build lulus. Batas verifikasi mobile dicatat di atas.
- Screenshot: verification/admin-access-redesign.png.


## Akses admin mengikuti screenshot final (2026-10-03)

- Referensi terbaru menggantikan posisi logo tengah/brand CMS: badge Portfolio / Admin, gembok kiri, footer OAuth dan 2025 sesuai gambar.
- Grid minmax(0,1fr) dan form min-width:0 mengatasi min-content repository; repository ellipsis/title lengkap.
- Browser 390x600 dan 390x844: form x20..370, tidak overflow. Tema light/dark dan Enter pada tombol tema lulus. TypeScript/build/diff check lulus.
- Hard gate PASS: ukuran/fokus/label dan batas mobile diperiksa; data/auth tetap. Purpose gate PASS: aksen/glow hanya mengikuti referensi akses. Liveliness PASS: ENERGY 1/RHYTHM 1/MOTION 1, satu kartu/aksi utama. Craftsmanship PASS: screenshot mobile dibandingkan, overflow diperbaiki dan build lulus.
- Screenshot: verification/admin-access-reference-mobile.png.
