# Memory � farhanreninda-portfolio

> **File ini adalah memori persisten antar-session untuk AI agent.**
> Agent WAJIB membaca file ini di awal setiap session baru.
> Agent WAJIB menulis ke file ini sesuai protokol yang berlaku.


## Protokol Memory

### Auto-Load (Awal Session)
Setiap kali session baru dimulai, agent **WAJIB** membaca file `memory.md` ini terlebih dahulu sebelum membaca steering files atau mengerjakan task apapun. Ini memastikan agent memiliki konteks dari session-session sebelumnya.

### Auto-Write (Setelah Task Penting)
Setiap kali agent menyelesaikan task penting (implementasi fitur, refactor, fix bug, perubahan konfigurasi, keputusan arsitektur), agent **WAJIB** menuliskan ringkasan keputusan ke section **Decision Log** di bawah dengan format:

``
| YYYY-MM-DD | [task singkat] | [keputusan yang diambil] | [alasan/justifikasi] |
``

### Session Summary (Akhir Session)
Sebelum session berakhir, agent **WAJIB** menulis summary lengkap ke section **Session History** dengan format:

``
### Session YYYY-MM-DD � [judul session]
**Dikerjakan:**
- [daftar pekerjaan yang diselesaikan]

**Keputusan Penting:**
- [keputusan arsitektur/teknis yang diambil]

**Technical Debt:**
- [hal yang perlu diperbaiki di masa depan]

**Pending Tasks:**
- [task yang belum selesai atau ditunda]
``

### Close Session Trigger
Ketika user mengetik **"Close Session"**, agent **WAJIB** segera menulis final summary ke section **Session History** sebelum menutup session. Tidak ada task lain yang boleh dikerjakan setelah trigger ini.


## Decision Log

| Tanggal | Task | Keputusan | Alasan |
|---------|------|-----------|--------|
| 2026-06-18 | Inisialisasi mekanisme Memory | Membuat file `memory.md` dan protokol auto-load/auto-write di AGENTS.md | Agar konteks antar-session tidak hilang dan agent selalu aware keputusan sebelumnya |
| 2026-06-18 | Auto-hide Header | Menambahkan perilaku hide-on-scroll-down pada AppHeader.vue | Membuat tampilan lebih rapih dan memberi ruang baca lebih luas |

| 2026-06-19 | Hapus teks pendahuluan | Menghapus paragraf intro di HelloSection.vue | Agar tampilan lebih ringkas dan tidak redundan |

## Session History

### Session 2026-06-18 � Inisialisasi Memory System
**Dikerjakan:**
- Membuat file `memory.md` sebagai memori persisten project
- Menambahkan section Memory Protocol ke AGENTS.md
- Mendefinisikan format Decision Log dan Session Summary

**Keputusan Penting:**
- `memory.md` di-track oleh git (tidak masuk .gitignore) agar persisten dan bisa di-share antar-collaborator
- Format log menggunakan tabel Markdown untuk kemudahan baca dan parse
- Protokol memory diintegrasikan ke AGENTS.md (entry point agent) bukan file terpisah

**Technical Debt:**
- Belum ada mekanisme otomatis (script/hook) untuk reminder auto-write � masih bergantung pada disiplin agent mengikuti instruksi di AGENTS.md

**Pending Tasks:**
- Tidak ada pending task saat ini


## Known Context (Persisten)

> Bagian ini berisi konteks penting yang harus selalu diingat agent, terlepas dari session.

### Arsitektur
- Vue 3 SPA, single-page, hash-based navigation
- Semua konten di `src/data/cv.ts` � single source of truth
- Tidak ada backend, API, atau database
- Deploy otomatis via GitHub Actions ke GitHub Pages

### Konvensi Krusial
- Bahasa Indonesia untuk semua konten user-facing
- Pure CSS custom properties, TIDAK ada CSS framework
- `<script setup lang="ts">` + `<style scoped>` untuk semua komponen
- Theme hydration via inline script di `index.html` (jangan dihapus)

### Larangan Keras (dari AGENTS.md)
- Jangan tambahkan CSS framework
- Jangan convert ke Nuxt/SSR
- Jangan pakai router-links untuk navigasi section
- Jangan pindahkan konten dari `cv.ts` ke komponen
- Jangan hapus `<style scoped>`
- Jangan ubah `base: "/"` di vite.config.ts

### Session 2026-06-19 � Penyederhanaan Intro
**Dikerjakan:**
- Menghapus paragraf intro/tagline di `HelloSection.vue` agar lebih ringkas dan tidak redundan
- Membersihkan style CSS `.hello-quote` yang tidak terpakai
- Menyesuaikan delay animasi reveal setelah penghapusan

**Keputusan Penting:**
- Paragraf pembuka yang bertele-tele dihilangkan; hanya retain lead singkat tentang lulusan dan pengalaman

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Tidak ada pending task saat ini
---
# Memory � farhanreninda-portfolio

> **File ini adalah memori persisten antar-session untuk AI agent.**
> Agent WAJIB membaca file ini di awal setiap session baru.
> Agent WAJIB menulis ke file ini sesuai protokol yang berlaku.


## Protokol Memory

### Auto-Load (Awal Session)
Setiap kali session baru dimulai, agent **WAJIB** membaca file `memory.md` ini terlebih dahulu sebelum membaca steering files atau mengerjakan task apapun. Ini memastikan agent memiliki konteks dari session-session sebelumnya.

### Auto-Write (Setelah Task Penting)
Setiap kali agent menyelesaikan task penting (implementasi fitur, refactor, fix bug, perubahan konfigurasi, keputusan arsitektur), agent **WAJIB** menuliskan ringkasan keputusan ke section **Decision Log** di bawah dengan format:

``
| YYYY-MM-DD | [task singkat] | [keputusan yang diambil] | [alasan/justifikasi] |
``

### Session Summary (Akhir Session)
Sebelum session berakhir, agent **WAJIB** menulis summary lengkap ke section **Session History** dengan format:

``
### Session YYYY-MM-DD � [judul session]
**Dikerjakan:**
- [daftar pekerjaan yang diselesaikan]

**Keputusan Penting:**
- [keputusan arsitektur/teknis yang diambil]

**Technical Debt:**
- [hal yang perlu diperbaiki di masa depan]

**Pending Tasks:**
- [task yang belum selesai atau ditunda]
``

### Close Session Trigger
Ketika user mengetik **"Close Session"**, agent **WAJIB** segera menulis final summary ke section **Session History** sebelum menutup session. Tidak ada task lain yang boleh dikerjakan setelah trigger ini.


## Decision Log

| Tanggal | Task | Keputusan | Alasan |
|---------|------|-----------|--------|
| 2026-06-18 | Inisialisasi mekanisme Memory | Membuat file `memory.md` dan protokol auto-load/auto-write di AGENTS.md | Agar konteks antar-session tidak hilang dan agent selalu aware keputusan sebelumnya |
| 2026-06-18 | Auto-hide Header | Menambahkan perilaku hide-on-scroll-down pada AppHeader.vue | Membuat tampilan lebih rapih dan memberi ruang baca lebih luas |

| 2026-06-19 | Hapus teks pendahuluan | Menghapus paragraf intro di HelloSection.vue | Agar tampilan lebih ringkas dan tidak redundan |

## Session History

### Session 2026-06-18 � Inisialisasi Memory System
**Dikerjakan:**
- Membuat file `memory.md` sebagai memori persisten project
- Menambahkan section Memory Protocol ke AGENTS.md
- Mendefinisikan format Decision Log dan Session Summary

**Keputusan Penting:**
- `memory.md` di-track oleh git (tidak masuk .gitignore) agar persisten dan bisa di-share antar-collaborator
- Format log menggunakan tabel Markdown untuk kemudahan baca dan parse
- Protokol memory diintegrasikan ke AGENTS.md (entry point agent) bukan file terpisah

**Technical Debt:**
- Belum ada mekanisme otomatis (script/hook) untuk reminder auto-write � masih bergantung pada disiplin agent mengikuti instruksi di AGENTS.md

**Pending Tasks:**
- Tidak ada pending task saat ini


## Known Context (Persisten)

> Bagian ini berisi konteks penting yang harus selalu diingat agent, terlepas dari session.

### Arsitektur
- Vue 3 SPA, single-page, hash-based navigation
- Semua konten di `src/data/cv.ts` � single source of truth
- Tidak ada backend, API, atau database
- Deploy otomatis via GitHub Actions ke GitHub Pages

### Konvensi Krusial
- Bahasa Indonesia untuk semua konten user-facing
- Pure CSS custom properties, TIDAK ada CSS framework
- `<script setup lang="ts">` + `<style scoped>` untuk semua komponen
- Theme hydration via inline script di `index.html` (jangan dihapus)

### Larangan Keras (dari AGENTS.md)
- Jangan tambahkan CSS framework
- Jangan convert ke Nuxt/SSR
- Jangan pakai router-links untuk navigasi section
- Jangan pindahkan konten dari `cv.ts` ke komponen
- Jangan hapus `<style scoped>`
- Jangan ubah `base: "/"` di vite.config.ts

### Session 2026-06-19 � Penyederhanaan Intro
**Dikerjakan:**
- Menghapus paragraf intro/tagline di `HelloSection.vue` agar lebih ringkas dan tidak redundan
- Membersihkan style CSS `.hello-quote` yang tidak terpakai
- Menyesuaikan delay animasi reveal setelah penghapusan

**Keputusan Penting:**
- Paragraf pembuka yang bertele-tele dihilangkan; hanya retain lead singkat tentang lulusan dan pengalaman

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Tidak ada pending task saat ini
| 2026-06-19 | Redesign HelloSection | Mengurangi spasi, mengecilkan ukuran foto, dan merapikan layout | Membuat tampilan lebih proporsional dan tidak berlebihan |
| 2026-06-22 | Fix binding parse error | Memperbaiki :aria-label di AppHeader.vue dan :href mailto di AboutSection.vue yang ekspresi JS-nya rusak | Error ite:vue Error parsing JavaScript expression saat build; ekspresi binding Vue tidak valid |
| 2026-06-22 | HeroSection full viewport | Ubah min-height: 85vh jadi 100vh di HeroSection.vue | Section About mengintip di bawah layar pertama; perlu satu layar penuh agar tampilan rapi |

---
| 2026-06-22 | Gap Skills-Experience | Mengurangi padding bawah .skills-section dari 6rem ke 2rem | Agar section Skills dan Experience lebih compact dan tidak ada whitespace kosong |
| 2026-07-07 | Redesign konten portfolio CV | Memoles konten CV, hero, headline section, dan nav agar lebih profesional dan konsisten Bahasa Indonesia | Halaman sebelumnya masih memakai copy bilingual/placeholder dan belum terasa seperti CV portfolio yang matang |
| 2026-07-07 | Redesign visual portfolio referensi | Mengubah desain menjadi dark editorial portfolio dengan aksen amber, hero nama besar, showcase proyek, section skills/experience yang lebih modern | User tidak cocok dengan hasil hero sebelumnya dan memberi referensi Dribbble Carlos serta azmirf.my.id |
| 2026-07-07 | Refinement desain portfolio | Mengurangi skala font, mengembalikan aksen kuning ke biru/teal, merapikan frame foto, menambahkan smooth scroll navbar, dan membuat section minimal satu viewport | Feedback user: font terlalu besar, foto terlihat tempelan, warna harus biru seperti sebelumnya, dan navigasi harus terasa per halaman |
| 2026-07-07 | Refinement hero, nama, radius, proyek | Menghapus IPK dan link Tentang Saya dari hero, menampilkan nama lengkap, mengembalikan rounded corner, dan menyamakan semua card proyek | Feedback user: informasi IPK jangan muncul di awal, nama harus lengkap, layout kotak kurang bagus, dan proyek tidak boleh ada highlight khusus |
| 2026-07-07 | Bersihkan first viewport hero | Menghapus social link, statistik, dan service-card dari hero serta mengubah foto menjadi portrait card yang lebih natural | Feedback user: foto masih kurang bagus, konten bawah terlihat kepotong, dan info kontak/statistik tidak perlu muncul di halaman awal |
| 2026-07-07 | Hero dua kolom foto kecil | Mengubah hero menjadi teks kiri dan foto bulat kecil di kanan, tanpa elemen tengah besar | User ingin fokus ke teks, foto tidak terlalu dominan, dan tidak ada space kosong berlebihan |
| 2026-07-07 | Kompakkan hero typography | Mengecilkan font nama, merapatkan spacing hero, mengecilkan foto, dan menghapus pengulangan teks Android Developer | Feedback user: nama masih terlalu besar, space kosong terlalu banyak, dan label Android Developer berulang |
| 2026-07-07 | Rounded corner refinement | Menaikkan token radius global dan mengubah header/nav/button kembali ke bentuk lebih rounded/pill | Feedback user: beberapa layout masih terasa kotak dan ingin rounded seperti implementasi awal |
| 2026-07-07 | Padatkan hero kanan | Menambahkan visual card minimal dengan foto bulat dan skill chips dari `cv.ts` di area kanan hero | Feedback user: sekitar foto masih terlalu kosong dan perlu desain sederhana yang lebih padat |
| 2026-07-07 | Ganti hero right panel | Mengganti skill chips bertumpuk menjadi panel Core Stack list yang rapi di bawah foto | Feedback user: chip di bawah foto terlihat ditempel berulang dan kurang bagus |
| 2026-07-07 | Hero foto tanpa teks sekitar | Menghapus teks/list di sekitar foto dan memakai dekorasi orbit/ring sederhana | Feedback user: area sekitar foto tidak perlu teks, cukup desain visual sederhana |
| 2026-07-07 | Update about, pendidikan, domisili | Memperbarui copy Tentang Saya, domisili Bekasi, pendidikan berjalan Universitas Terbuka, dan redesign AboutSection | User ingin tampilan About lebih rapi/menjual serta data pendidikan dan lokasi terbaru |
| 2026-07-07 | Kompakkan About section | Mengecilkan heading About, memadatkan story card, menghapus tombol Email/Telepon, dan mengganti narasi backend Laravel menjadi Node.js/PHP basic | Feedback user: About masih terpotong, ada space kosong besar, kontak sebaiknya hanya di section Kontak, dan backend Laravel terlalu overclaim |
| 2026-07-07 | Padatkan About story card | Mengubah story card menjadi grid copy + visual mark kecil, mengurangi gap/padding, dan menghapus min-height About | Feedback user: space kosong dalam deskripsi dan bawah section masih terlalu besar serta section berikutnya terlihat |
| 2026-07-07 | Full-screen About dengan workflow tiles | Mengembalikan About menjadi full-screen, menghapus visual mark tinggi yang aneh, dan menambahkan tile fokus kerja dari `cv.profile.aboutFocus` | Feedback user: layout About terlihat aneh, ada ruang kosong besar, dan section berikutnya masih terlihat |
| 2026-07-07 | Redesign Skills section | Mengubah data skills dan redesign section Keahlian menjadi bento dashboard | User ingin tampilan Keahlian lebih menarik, tidak kosong, PHP tanpa Laravel, Jetpack dihapus, Android SDK/Retrofit/Room dipisah, dan tools database ditambahkan |
| 2026-07-07 | Hero visual tanpa teks | Menghapus teks/list di sekitar foto dan menggantinya dengan orbit/shape dekoratif halus | Feedback user: area foto tidak perlu teks, cukup desain visual lain |
| 2026-07-07 | Refinement Skills section | Mengubah section Keahlian menjadi stack board 2x2, mengecilkan headline, menghapus status level skill, dan membuat skill map menjadi summary compact | Feedback user: header terasa janggal, font terlalu besar, skill map terlalu dominan, dan status Dasar/Terbiasa/Utama tidak perlu ditampilkan |
| 2026-07-07 | Redesign ulang Skills section | Menghapus summary total, item count, dekorasi lingkaran, dan membuat section Keahlian menjadi panel stack satu viewport | Feedback user masih kurang sreg dengan layout sebelumnya dan ingin section terlihat utuh dalam satu layar |
| 2026-07-07 | Padatkan Skills section | Mengganti copy `Stack`, menambahkan deskripsi tiap kategori dari `cv.ts`, mengganti kategori Bahasa & Web, dan mengatur tinggi section agar tidak mengintip ke section berikutnya | Feedback user: kata Stack kurang cocok, card masih kosong, bottom section masih menyisakan ruang, dan nama kategori perlu lebih profesional |
| 2026-07-07 | Rapikan pengelompokan skill | Menambahkan Vue.js dan GreenDAO, mengganti kategori menjadi Bahasa & Framework serta Database & Integrasi API, dan memindahkan Android Studio ke Tools Pengembangan | Agar item skill lebih sesuai dengan kelompoknya dan tidak mencampur IDE dengan library mobile |
| 2026-07-07 | Redesign Experience section | Mengubah ExperienceSection menjadi tiga panel Pengalaman Kerja, Pengalaman Proyek, dan Pengalaman Organisasi dalam satu viewport | Feedback user: layout lama terlalu besar di tengah, headline kiri terlalu besar, dan pengalaman tidak boleh disatukan dalam satu timeline |
| 2026-07-07 | Refinement Experience section | Mengubah headline menjadi lebih profesional, menambahkan durasi tiap pengalaman, men-highlight pekerjaan saat ini, dan menempatkan kerja di atas organisasi | Feedback user: copy perlu lebih profesional, durasi perlu terlihat, pekerjaan saat ini perlu sedikit di-highlight, dan organisasi hanya pelengkap |
| 2026-07-07 | Sinkronisasi Experience dari CV PDF | Menyesuaikan bullet pengalaman kerja/magang/organisasi dari `D:\Pekerjaan\CV.pdf`, menambah pengalaman organisasi yang belum tampil, dan membuat layout experience lebih lega | User meminta isi dan waktu pengalaman mengikuti CV PDF serta tampilan tidak terlalu padat |
| 2026-07-07 | Rapikan spacing Experience | Menghapus tinggi paksa pada board Experience dan mengubah organisasi dari card dua kolom menjadi list satu kolom yang lebih lega | Feedback user: panel kerja menyisakan banyak ruang kosong dan organisasi terlihat terlalu padat |
| 2026-07-08 | Legakan Experience section | Memisahkan durasi dan status saat ini menjadi pill/badge terpisah, menyusun panel secara vertikal, dan memberi organisasi ruang lebih lega | Feedback user: durasi/status terlalu padat, organisasi terlalu padat, dan overall section perlu lebih lega meski harus scroll |
| 2026-07-08 | Koreksi durasi Experience | Mengubah perhitungan durasi menjadi berbasis bulan CV yang inklusif dengan pengecualian anniversary tahunan | Feedback user: beberapa durasi pengalaman berbeda dari periode yang terbaca di CV |
| 2026-07-08 | Koreksi periode kerja Mitra | Mengubah pengalaman PT. Mitra Karsa Utama menjadi November 2021 - Februari 2023 dan memakai hitungan durasi elapsed month | Screenshot CV menunjukkan periode kerja Mitra sampai Februari 2023 dan durasi perlu sesuai pengalaman kerja |
| 2026-07-08 | Sinkronisasi internship Experience | Mengubah label menjadi Pengalaman Magang & Proyek dan merapikan bullet internship sesuai screenshot CV | User melanjutkan validasi bagian internship/proyek dan meminta data mengikuti CV |
| 2026-07-08 | Sinkronisasi organizational Experience | Menyesuaikan role, company, periode, dan bullet organisasi sesuai screenshot CV serta menampilkan seluruh bullet organisasi sebagai ringkasan | User melanjutkan validasi bagian organizational experience dari CV |
| 2026-07-08 | Simetrikan card Experience | Mengubah meta periode/durasi/status menjadi grid konsisten dan menyamakan tinggi baris card sampai organisasi | Feedback user: spacing periode, durasi, dan card experience terlihat tidak simetris |
| 2026-07-08 | Samakan deskripsi Experience dengan CV | Mengubah card experience agar menampilkan seluruh bullet dari `cv.ts` sebagai daftar poin dan merapikan copy mengikuti CV | User meminta deskripsi pengalaman disamakan dengan CV yang dikirim |
| 2026-07-08 | Redesign Projects section | Menghapus periode dari card proyek, memperbaiki heading/copy, dan menambahkan modal detail proyek dengan link demo jika tersedia | User meminta proyek tidak memakai bulan/tahun dan bisa diklik untuk melihat detail |
| 2026-07-08 | Refinement copy Projects | Mengganti heading dan lead section proyek agar lebih natural dan profesional | Feedback user: text bagian atas proyek perlu dibuat lebih oke |
| 2026-07-08 | Smooth modal Projects | Menambahkan transition modal, membuat media detail memakai `object-fit: contain`, dan memperhalus rounded container detail | Feedback user: modal detail terasa kepotong kotak dan animasinya kurang smooth |
| 2026-07-08 | Rapikan media modal Projects | Mengubah area gambar modal mengikuti rasio 16:9 agar tidak menyisakan ruang hitam atas-bawah | Feedback user: detail proyek masih menyisakan area hitam pada gambar |
| 2026-07-08 | Sejajarkan footer card Projects | Memisahkan tech chip dan `Lihat detail` ke area footer card dengan `margin-top: auto` | Feedback user: posisi bawah card proyek tidak setara |
| 2026-07-08 | Update link Projects | Memperbarui link video Redmimo dan membuat label tombol Play Store khusus untuk project dengan `playUrl` | User memberikan URL demo Redmimo baru dan meminta Nyatet App tidak memakai label tautan umum |
| 2026-07-08 | Rapikan card organisasi Experience | Override grid organisasi menjadi `grid-auto-rows: auto` agar card terakhir tidak menyisakan ruang kosong | Feedback user: card organisasi paling bawah masih memiliki space kosong |
| 2026-07-08 | Redesign Education section | Menambahkan nav `Pendidikan`, memberi section id `education`, memperbarui data kampus, dan merombak layout pendidikan/sertifikasi menjadi board compact | User meminta pendidikan masuk navbar, data jurusan/lulus diperbarui, dan section pendidikan dibuat lebih menarik |
| 2026-07-08 | Compact Education section | Menghapus lead text, nomor item, dan counter panel; mengubah card pendidikan menjadi layout sekolah kiri dan status/IPK kanan | Feedback user: teks atas tidak perlu, nomor tidak perlu, dan status kurang lurus dengan konten |
| 2026-07-08 | Rapikan detail Education | Menghapus tampilan status lulus dari UI pendidikan dan menghapus note cumlaude yang duplikat | Feedback user: tidak perlu status lulus dan text cumlaude cukup sekali |
| 2026-07-08 | Haluskan Education section | Mengubah IPK menjadi teks biasa di bawah jurusan dan memusatkan section dengan accent chips untuk mengurangi space kosong bawah | Feedback user: IPK tidak perlu terlalu highlight dan section bawah masih kosong |
| 2026-07-08 | Minimalisir Education section | Menghapus accent chips dekoratif dan menggeser layout pendidikan sedikit ke bawah dengan padding section | User tidak ingin chips dekoratif dan meminta layout dibuat lebih pas tanpa space kosong berlebih |
| 2026-07-08 | Redesign Contact section | Merombak contact card, memperbarui WhatsApp/LinkedIn, menambahkan tombol LinkedIn, dan memakai `public/CV.pdf` untuk download CV | User meminta chat WhatsApp langsung ke nomor baru, tombol unduh CV dari PDF lampiran, dan tombol LinkedIn |

### Session 2026-07-07 - Poles Portfolio Sesuai CV
**Dikerjakan:**
- Memperbarui narasi profil, about, skill, pengalaman, proyek, sertifikat, dan pendidikan di `src/data/cv.ts`
- Mengubah hero menjadi profil profesional dengan headline Android Developer, tagline dari CV, statistik pengalaman/proyek, CTA ke proyek dan pengalaman, serta kartu ringkas profil
- Menyesuaikan label navigasi dan headline section agar lebih formal dan konsisten
- Membersihkan teks lama di `HelloSection.vue` walaupun komponen tersebut tidak aktif di `HomeView.vue`
- Menjalankan `npm run build` dan memastikan build sukses

**Keputusan Penting:**
- Semua copy user-facing tetap Bahasa Indonesia dan tetap bersumber dari `src/data/cv.ts` untuk konten utama
- Hero tidak lagi memakai teks "Hello everyone" agar first screen langsung menampilkan positioning profesional

**Technical Debt:**
- Tombol/link `Unduh CV` masih mengarah ke `/CV.pdf`, tetapi file tersebut belum ada di folder `public`
- Verifikasi screenshot otomatis belum bisa dilakukan karena browser backend tidak tersedia di session ini

**Pending Tasks:**
- Tambahkan file `public/CV.pdf` jika tombol unduh CV ingin diaktifkan
- Lakukan review visual manual di `http://127.0.0.1:5173/`

### Session 2026-07-07 - Redesign Visual Referensi Portfolio
**Dikerjakan:**
- Merombak `HeroSection.vue` menjadi layout nama besar, foto sebagai visual utama, intro pendek, statistik, dan kartu kompetensi first-fold
- Mengubah palette global di `src/styles/main.css` menjadi dark/editorial dengan aksen amber dan radius card yang lebih tegas
- Menyesuaikan `AppHeader.vue` agar tidak lagi terasa seperti pill/glass teal lama
- Merombak `AboutSection.vue`, `SkillsSection.vue`, `ExperienceSection.vue`, `ProjectsSection.vue`, `CertificatesSection.vue`, dan `ContactSection.vue` agar lebih showcase-oriented
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Data yang ditampilkan tetap berasal dari `src/data/cv.ts`; komponen hanya membuat turunan via `computed` atau slicing data
- Inspirasi desain diambil dari pola editorial Dribbble Carlos dan portfolio showcase modern, tanpa menyalin aset eksternal

**Technical Debt:**
- File `public/CV.pdf` masih belum tersedia sehingga tombol unduh CV belum berfungsi penuh
- Screenshot otomatis belum bisa dilakukan karena browser backend tidak tersedia di session ini

**Pending Tasks:**
- Review visual manual pada `http://127.0.0.1:5173/`, terutama spacing hero dan tampilan mobile
- Tambahkan `public/CV.pdf` untuk mengaktifkan download CV

### Session 2026-07-07 - Refinement Layout Per Halaman
**Dikerjakan:**
- Mengecilkan typography besar pada hero, section title, featured project, experience, dan contact CTA
- Mengganti seluruh aksen kuning/amber menjadi biru/teal melalui token global
- Merapikan foto hero menjadi framed portrait dengan arch/card agar tidak terlihat menempel di atas shape
- Menambahkan handler smooth scroll di `AppHeader.vue` untuk klik navbar dan brand
- Mengatur section utama minimal `100svh` dengan padding atas agar klik navigasi masuk ke awal halaman section tanpa memotong konten oleh header
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Nama token `--color-accent-warm` dipertahankan untuk mengurangi perubahan besar, tetapi nilainya sekarang biru/teal sesuai permintaan
- Scroll navbar memakai `window.scrollTo({ behavior: "smooth" })` agar transisi antar-section lebih konsisten dibanding native anchor saja

**Technical Debt:**
- Perlu review visual manual pada ukuran layar user karena screenshot otomatis belum tersedia
- `public/CV.pdf` masih belum ada

**Pending Tasks:**
- Review langsung di browser untuk memastikan tiap section terasa satu halaman penuh pada viewport utama

### Session 2026-07-07 - Refinement Hero dan Project Cards
**Dikerjakan:**
- Menghapus tampilan link "Tentang saya" dari sisi kanan hero dan menghilangkan IPK dari tagline hero
- Mengubah hero dan header agar menampilkan nama lengkap `Farhan Reninda Budiansyah`
- Mengembalikan token radius global ke rounded corner yang lebih halus
- Menambahkan rounded corner pada panel about, skill tag, experience highlight, credential card, contact panel, dan project card
- Merombak `ProjectsSection.vue` agar semua project tampil sebagai card seragam tanpa featured/highlight card
- Mengecilkan lagi beberapa heading yang masih terasa terlalu besar
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- IPK tetap tersedia di section bawah melalui data pendidikan, tetapi tidak dipakai lagi di hero/halaman awal
- Semua proyek dirender langsung dari `cv.projects` dengan layout grid seragam

**Technical Debt:**
- Perlu review visual manual di browser karena screenshot otomatis masih tidak tersedia
- `public/CV.pdf` masih belum ada

**Pending Tasks:**
- Review langsung di `http://127.0.0.1:5173/` untuk mengecek proporsi hero dan grid proyek pada viewport utama

### Session 2026-07-07 - Bersihkan Hero First Viewport
**Dikerjakan:**
- Menghapus link LinkedIn, Email, dan Kontak dari hero karena sudah tersedia di navbar/contact section
- Menghapus statistik `Pengalaman kerja`, `Proyek selesai`, dan `Proyek Android` dari hero
- Menghapus service-card 01/02/03 dari hero agar first viewport tidak memperlihatkan potongan konten bawah
- Mengubah framing foto hero dari arch besar menjadi portrait card rounded dengan background lembut
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Hero sekarang hanya berisi identitas, foto, dan ringkasan singkat agar first screen lebih bersih
- Detail kompetensi dan kontak tetap ditampilkan pada section khusus, bukan di halaman awal

**Technical Debt:**
- Perlu review visual manual di browser karena screenshot otomatis tidak tersedia
- `public/CV.pdf` masih belum ada

**Pending Tasks:**
- Review langsung di `http://127.0.0.1:5173/` untuk memastikan foto hero sudah terasa menyatu dan first viewport tidak memotong konten bawah

### Session 2026-07-07 - Hero Dua Kolom Ringkas
**Dikerjakan:**
- Mengubah `HeroSection.vue` menjadi layout dua kolom: teks utama di kiri dan foto bulat kecil di kanan
- Menggabungkan intro Android Developer ke area teks kiri agar tidak ada kolom kanan yang terasa kosong
- Menghapus framing foto besar berbentuk card dan menggantinya dengan portrait bulat sederhana
- Menjaga hero tetap bersih tanpa social link, statistik, atau service card
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Foto tidak lagi menjadi visual dominan; hero kembali fokus pada teks dan nama lengkap
- Layout mobile menempatkan foto di atas dalam ukuran kecil agar tetap rapi

**Technical Debt:**
- Perlu review visual manual di browser karena screenshot otomatis tidak tersedia
- `public/CV.pdf` masih belum ada

**Pending Tasks:**
- Review langsung di `http://127.0.0.1:5173/` untuk memastikan spacing hero sudah pas dan tidak terlalu kosong

### Session 2026-07-07 - Kompakkan Typography Hero
**Dikerjakan:**
- Mengecilkan ukuran nama utama di hero
- Merapatkan padding dan jarak antar kolom hero
- Mengecilkan ukuran foto bulat di sisi kanan
- Mengubah heading intro agar tidak mengulang teks `Android Developer`
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- `Android Developer` hanya dipakai sebagai label dari `cv.profile.title`; heading intro memakai deskripsi stack singkat

**Technical Debt:**
- Review visual manual tetap diperlukan karena screenshot otomatis tidak tersedia
- `public/CV.pdf` masih belum ada

**Pending Tasks:**
- Review langsung hero terbaru di browser untuk memastikan proporsi sudah nyaman

### Session 2026-07-07 - Rounded Corner Refinement
**Dikerjakan:**
- Menaikkan token radius global `--radius-sm`, `--radius-md`, dan `--radius-lg`
- Mengubah button global kembali ke pill shape
- Mengubah header dan nav menjadi rounded/pill seperti gaya awal
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Radius diperbaiki melalui token global agar card/panel lintas section ikut konsisten

**Technical Debt:**
- Review visual manual tetap diperlukan untuk melihat apakah masih ada elemen yang terasa terlalu kotak

**Pending Tasks:**
- Cek ulang tampilan di browser dan beri tahu elemen spesifik jika masih perlu dibuat lebih bulat

### Session 2026-07-07 - Padatkan Hero Kanan
**Dikerjakan:**
- Mengecek referensi portfolio di Dribbble search
- Menambahkan `visual-card` di sisi kanan hero untuk mengisi area foto secara sederhana
- Menampilkan skill chips dari `cv.skills` untuk Kotlin, Android, REST API, dan MySQL
- Mempertahankan foto bulat kecil agar tidak terlalu dominan
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Area kanan hero dibuat lebih padat dengan metadata skill, bukan social link/statistik, agar tetap sesuai feedback sebelumnya

**Technical Debt:**
- Perlu review visual manual karena screenshot otomatis tidak tersedia

**Pending Tasks:**
- Review langsung di browser apakah visual card kanan sudah cukup padat tanpa terasa berlebihan

### Session 2026-07-07 - Ganti Hero Right Panel
**Dikerjakan:**
- Menghapus chip skill bertumpuk di bawah foto hero
- Mengganti area bawah foto dengan panel `Core Stack` berbentuk list kecil
- Membatasi skill hero menjadi 3 item agar tidak berulang/berdesakan
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Area kanan tetap diisi desain sederhana, tetapi tidak lagi memakai chip floating yang saling menempel

**Technical Debt:**
- Perlu review manual apakah panel baru sudah sesuai selera visual

**Pending Tasks:**
- Review di browser dan beri detail jika ingin panel kanan dibuat lebih minimal lagi

### Session 2026-07-07 - Hero Foto Tanpa Teks Sekitar
**Dikerjakan:**
- Menghapus elemen teks/list di sekitar foto hero
- Mengganti panel kanan menjadi dekorasi orbit/ring dan titik sederhana tanpa copy tambahan
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Area kanan hero sekarang murni visual/dekoratif agar tidak terasa ditempeli teks berulang

**Technical Debt:**
- Perlu review manual untuk memastikan dekorasi orbit tidak terlalu ramai

**Pending Tasks:**
- Review tampilan terbaru di browser

### Session 2026-07-07 - Update About, Pendidikan, Domisili
**Dikerjakan:**
- Memperbarui domisili di `src/data/cv.ts` menjadi Bekasi, Jawa Barat, Indonesia
- Memperbarui narasi `profile.about` agar lebih menjual tetapi tetap natural
- Menambahkan pendidikan berjalan di Universitas Terbuka jurusan Sistem Informasi
- Mempertahankan Telkom University sebagai pendidikan sebelumnya dan SMK Negeri 3 Purwakarta sebagai riwayat pendidikan
- Merombak `AboutSection.vue` menjadi layout heading + story card + panel ringkasan yang lebih rapi
- Menyesuaikan `CertificatesSection.vue` agar catatan pendidikan tampil dari data CV
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- `AboutSection` menampilkan pendidikan saat ini dari item `period: "Sedang Berjalan"` agar Universitas Terbuka muncul sebagai informasi utama
- IPK Telkom tetap tersimpan dan tampil di section kredensial bawah, bukan sebagai pendidikan utama di About panel

**Technical Debt:**
- Perlu review visual manual di browser karena screenshot otomatis tidak tersedia

**Pending Tasks:**
- Review About section terbaru dan beri feedback jika wording masih ingin dibuat lebih formal atau lebih santai

### Session 2026-07-07 - Kompakkan About Section
**Dikerjakan:**
- Mengecilkan heading `AboutSection.vue` agar lebih mudah muat satu viewport
- Mengurangi padding dan gap di story card dan panel kanan
- Menghapus tombol Email dan Telepon dari About panel
- Mengubah narasi backend di `profile.about` menjadi pemahaman dasar Node.js dan PHP
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Kontak hanya diarahkan tampil di section Kontak, bukan di About
- Laravel tetap ada di data historis pengalaman/proyek, tetapi bukan lagi klaim utama di narasi About

**Technical Debt:**
- Perlu review manual apakah About sudah muat satu viewport pada layar target

**Pending Tasks:**
- Review visual About terbaru di browser

### Session 2026-07-07 - Padatkan About Story Card
**Dikerjakan:**
- Mengubah story card About menjadi dua kolom: visual mark `Android/Kotlin` dan copy
- Mengurangi gap antar paragraf, line-height, padding story card, dan padding panel kanan
- Menghapus `min-height: 100svh` dari About agar section tidak menyisakan ruang kosong besar
- Mengurangi padding bawah About
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Jika ada ruang kosong di story card, diisi elemen desain kecil alih-alih menambah teks

**Technical Debt:**
- Perlu review manual apakah section berikutnya masih terlihat pada viewport user

**Pending Tasks:**
- Review tampilan About terbaru di browser

### Session 2026-07-07 - Full-screen About Dengan Workflow Tiles
**Dikerjakan:**
- Mengembalikan `AboutSection.vue` ke `min-height: 100svh`
- Menghapus blok visual `Android/Kotlin` yang terlalu tinggi dan membuat layout terlihat aneh
- Menambahkan workflow tiles `Requirement`, `Integrasi`, dan `Maintenance` untuk mengisi ruang story card secara relevan
- Memindahkan teks workflow ke `cv.profile.aboutFocus` dan menambahkan tipe di `src/types/cv.ts`
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- About dibuat full-screen lagi, tetapi ruang kosong diisi elemen konten kecil yang tetap berasal dari `cv.ts`

**Technical Debt:**
- Perlu review manual apakah section berikutnya masih terlihat pada viewport target

**Pending Tasks:**
- Review About section terbaru di browser

### Session 2026-07-07 - Redesign Skills Section
**Dikerjakan:**
- Mengubah `PHP Laravel` menjadi `PHP`
- Menghapus `Jetpack` dari daftar skill
- Memisahkan `Android SDK`, `Retrofit`, dan `Room`
- Menambahkan `phpMyAdmin`, `DBeaver`, dan `DataGrip`
- Menambahkan `Node.js` sebagai skill dasar sesuai konteks About
- Mengubah kategori skill menjadi `Bahasa & Dasar Web`, `Mobile Development`, `Backend & Database`, dan `Tools & Kolaborasi`
- Merombak `SkillsSection.vue` menjadi layout bento/dashboard dengan summary card dan skill cards
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Tampilan skill dibuat lebih penuh satu viewport tanpa blank area besar dengan tetap mengambil data dari `cv.skills`

**Technical Debt:**
- Perlu review visual manual untuk memastikan bento grid tidak terlalu padat di viewport kecil

**Pending Tasks:**
- Review section Keahlian terbaru di browser

### Session 2026-07-07 - Hero Visual Tanpa Teks
**Dikerjakan:**
- Menghapus panel `Core Stack` dan semua list/chip dari area foto hero
- Mengganti area kanan hero dengan orbit/shape dekoratif tanpa teks
- Menjaga foto tetap bulat kecil sebagai elemen visual pendukung
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Area sekitar foto hero sekarang murni dekoratif dan tidak mengambil konten teks dari CV

**Technical Debt:**
- Perlu review visual manual apakah dekorasi orbit sudah sesuai selera

**Pending Tasks:**
- Review langsung di browser dan tentukan apakah dekorasi perlu lebih tipis atau lebih padat

### Session 2026-07-07 - Refinement Skills Section
**Dikerjakan:**
- Mengubah `SkillsSection.vue` dari bento dengan skill map besar menjadi stack board 2x2 yang lebih padat
- Mengecilkan headline section dan merapikan posisi eyebrow, judul, lead, serta summary agar tidak terasa terpisah
- Menghapus tampilan status kemampuan seperti `Utama`, `Terbiasa`, dan `Dasar`
- Menghapus properti `level` dari data/tanpa menampilkan status skill
- Mengubah kategori `Bahasa & Dasar Web` menjadi `Bahasa & Web`
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Data skill tetap bersumber dari `src/data/cv.ts`, tetapi UI hanya menampilkan nama skill dan jumlah item per kategori
- Section Keahlian dibuat lebih seimbang secara visual dengan card seragam, bukan satu card highlight besar

**Technical Debt:**
- Verifikasi screenshot otomatis tidak tersedia karena browser runtime session ini tidak menemukan browser aktif

**Pending Tasks:**
- Review visual manual di `http://localhost:5173/#skills` untuk memastikan komposisi sudah sesuai selera

### Session 2026-07-07 - Redesign Ulang Skills Section
**Dikerjakan:**
- Menghapus panel kanan berisi total teknologi dan gabungan teks stack
- Menghapus label jumlah item pada setiap card skill
- Menghapus dekorasi lingkaran pada card
- Mengubah section Keahlian menjadi satu panel besar dengan empat card kategori seragam
- Mengatur grid agar card mengisi tinggi section dan terasa sebagai satu layar penuh
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Section Keahlian sekarang hanya menampilkan heading singkat, lead, kategori skill, dan chip skill dari `cv.skills`
- Ornamen visual dibatasi pada aksen garis vertikal tipis di card agar tetap bersih tanpa elemen dekoratif membingungkan

**Technical Debt:**
- Verifikasi screenshot otomatis tidak tersedia di session ini karena browser runtime tidak menemukan browser aktif

**Pending Tasks:**
- Review manual di browser lokal untuk memastikan style terbaru sudah sesuai selera user

### Session 2026-07-07 - Padatkan Skills Section
**Dikerjakan:**
- Mengganti headline `Stack teknis yang saya gunakan` menjadi copy yang lebih natural
- Menambahkan `description` pada setiap `SkillGroup` di `src/data/cv.ts`
- Mengganti kategori `Bahasa & Web` menjadi `Bahasa Pemrograman`
- Mengganti `Backend & Database` menjadi `API & Database` dan `Tools & Kolaborasi` menjadi `Tools Pengembangan`
- Mengisi card skill dengan deskripsi kategori agar tidak terasa kosong
- Mengatur `SkillsSection.vue` memakai `height: 100svh` pada desktop agar section tidak memperlihatkan section berikutnya
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Informasi tambahan di card skill tetap berasal dari `cv.ts`, bukan hardcoded di komponen
- Pada viewport pendek/mobile, section kembali auto-height agar konten tidak terpotong

**Technical Debt:**
- Verifikasi visual tetap perlu dilakukan manual karena browser runtime tidak tersedia di session ini

**Pending Tasks:**
- Review tampilan terbaru di browser lokal dan sesuaikan lagi jika spacing masih kurang sesuai

### Session 2026-07-07 - Rapikan Pengelompokan Skill
**Dikerjakan:**
- Menambahkan `Vue.js` ke kategori skill web/framework
- Menambahkan `GreenDAO` ke kategori Mobile Development
- Mengganti kategori `Bahasa Pemrograman` menjadi `Bahasa & Framework`
- Mengganti kategori `API & Database` menjadi `Database & Integrasi API`
- Memindahkan `Android Studio` dari Mobile Development ke Tools Pengembangan
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- `DBeaver` dan `DataGrip` tetap berada di kategori database karena keduanya adalah database client/tools
- `Android Studio` lebih tepat di Tools Pengembangan karena merupakan IDE, bukan library/komponen mobile

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review visual manual jika penambahan item membuat chip terlalu rapat pada viewport tertentu

### Session 2026-07-07 - Redesign Experience Section
**Dikerjakan:**
- Merombak `ExperienceSection.vue` dari layout featured card + timeline menjadi tiga panel kategori
- Memisahkan data menjadi `Pengalaman Kerja`, `Pengalaman Proyek`, dan `Pengalaman Organisasi`
- Mengecilkan headline section agar tidak terlalu dominan di sisi kiri
- Menghapus featured card besar di tengah
- Membuat section desktop `100svh` dengan panel ringkas agar terasa satu halaman penuh
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- `Pengalaman Proyek` memakai data experience bertipe `internship`, karena berisi pengalaman project/magang dari CV
- Setiap item hanya menampilkan ringkasan bullet pertama agar panel tetap padat dan mudah dipindai

**Technical Debt:**
- Verifikasi visual otomatis belum tersedia karena browser runtime tidak menemukan browser aktif

**Pending Tasks:**
- Review manual di browser lokal untuk memastikan tiga panel pengalaman sudah sesuai selera visual user

### Session 2026-07-07 - Refinement Experience Section
**Dikerjakan:**
- Mengubah headline menjadi `Rekam jejak profesional dan kontribusi proyek`
- Menambahkan helper durasi dari periode `start` dan `end`, termasuk dukungan `Sekarang`
- Menampilkan durasi pada setiap item pengalaman
- Memberi badge `Saat ini` dan highlight halus pada pekerjaan aktif
- Mengubah layout agar `Pengalaman Kerja` berada di baris atas, sementara `Pengalaman Proyek` dan `Pengalaman Organisasi` berada di bawah
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Durasi dihitung dari data periode di `cv.experiences`, sehingga tidak perlu menambah field baru di `cv.ts`
- Organisasi tetap tampil, tetapi posisinya lebih sebagai pelengkap dibanding pengalaman kerja utama

**Technical Debt:**
- Durasi memakai perhitungan bulan berdasarkan nama bulan dan tahun; belum memakai tanggal harian detail karena CV hanya punya bulan/tahun

**Pending Tasks:**
- Review manual di browser lokal untuk memastikan highlight pekerjaan aktif dan layout baris atas/bawah sudah sesuai preferensi

### Session 2026-07-07 - Sinkronisasi Experience Dari CV PDF
**Dikerjakan:**
- Membaca teks dari `D:\Pekerjaan\CV.pdf` menggunakan parser PDF sementara di folder temp
- Menyesuaikan bullet pengalaman kerja PT. Pitjarus Teknologi dan PT. Mitra Karsa Utama sesuai CV
- Menyesuaikan bullet pengalaman magang Pustaka Rifqi Group, LKM FIT, dan Baker's Corner sesuai CV
- Menyesuaikan bullet pengalaman organisasi sesuai CV
- Menambahkan `Asisten Praktikum Sistem Basis Data` dan `Equipment and Decoration Division` yang ada di CV tetapi belum tampil di `cv.ts`
- Mengubah headline Experience menjadi lebih profesional
- Membuat panel organisasi lebih compact dua kolom pada desktop agar tidak terlalu padat/terpotong
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Periode pengalaman tetap memakai format Indonesia di `cv.ts`, tetapi mengikuti rentang waktu dari CV PDF
- Pengalaman organisasi ditampilkan sebagai pelengkap dengan summary disembunyikan agar section tetap rapi

**Technical Debt:**
- Ekstraksi PDF menghasilkan beberapa karakter rusak, sehingga interpretasi tetap mengacu pada konteks teks yang terbaca

**Pending Tasks:**
- Review visual manual di browser lokal untuk memastikan section Experience terbaru sudah cukup lega

### Session 2026-07-07 - Rapikan Spacing Experience
**Dikerjakan:**
- Menghapus `height: 100svh` dan row tinggi paksa pada `ExperienceSection.vue`
- Mengubah board Experience agar mengikuti tinggi isi sehingga panel kerja tidak menyisakan ruang kosong besar
- Mengubah panel organisasi dari grid dua kolom kecil menjadi list satu kolom yang lebih lega
- Menambah ruang baca dan ukuran teks organisasi agar tidak terasa padat
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Section Experience memakai `min-height: 100svh`, bukan tinggi tetap, agar tetap terasa satu area besar tanpa memaksa konten masuk viewport jika datanya panjang

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual di browser lokal untuk memastikan organisasi sudah lebih nyaman dibaca

### Session 2026-07-08 - Legakan Experience Section
**Dikerjakan:**
- Memisahkan durasi menjadi `duration-pill` agar tidak padat di kanan
- Mengubah badge `Saat ini` menjadi `Posisi saat ini` dan menaruhnya sebagai badge terpisah di bawah periode
- Mengubah board Experience menjadi susunan vertikal full-width agar kerja, proyek, dan organisasi tidak saling berdempetan
- Membuat project card tiga kolom full-width dan organisasi dua kolom full-width agar lebih lega
- Menaikkan padding, gap, dan line-height pada card experience
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Section Experience boleh lebih panjang dan scroll sedikit demi kualitas baca yang lebih baik

**Technical Debt:**
- Verifikasi visual otomatis belum tersedia di session ini

**Pending Tasks:**
- Review manual di browser lokal untuk memastikan kepadatan visual sudah sesuai

### Session 2026-07-08 - Koreksi Durasi Experience
**Dikerjakan:**
- Mengubah helper `formatDuration` di `ExperienceSection.vue`
- Menghitung periode bulan awal dan bulan akhir sebagai bagian dari durasi, sesuai pembacaan umum di CV
- Menambahkan pengecualian untuk anniversary tahunan seperti `Januari 2020 - Januari 2021` agar tetap tampil `1 thn`
- Memverifikasi hasil hitung durasi untuk seluruh pengalaman
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Durasi tetap dihitung dari `start` dan `end` di `cv.ts`, bukan ditulis manual, agar data periode tetap menjadi sumber utama

**Technical Debt:**
- Untuk `Sekarang`, durasi mengikuti bulan/tahun runtime browser sehingga akan otomatis berubah seiring waktu

**Pending Tasks:**
- Review manual di browser lokal untuk memastikan durasi yang tampil sudah sesuai ekspektasi CV

### Session 2026-07-08 - Koreksi Periode Kerja Mitra
**Dikerjakan:**
- Mengubah periode `PT. Mitra Karsa Utama` di `src/data/cv.ts` dari `Februari 2022` menjadi `Februari 2023`
- Mengubah helper durasi di `ExperienceSection.vue` kembali memakai elapsed month agar durasi kerja mengikuti cara hitung umum dari periode CV
- Memverifikasi hasil durasi kerja: `PT. Pitjarus Teknologi` menjadi `3 thn 5 bln` per Juli 2026 dan `PT. Mitra Karsa Utama` menjadi `1 thn 3 bln`
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Periode kerja mengikuti screenshot CV terbaru yang diberikan user
- Hitungan durasi ditampilkan sebagai durasi berjalan, bukan hitungan bulan inklusif kalender

**Technical Debt:**
- Durasi `Sekarang` tetap dinamis mengikuti bulan/tahun runtime browser

**Pending Tasks:**
- Review manual di browser lokal untuk memastikan tampilan durasi sudah sesuai ekspektasi

### Session 2026-07-08 - Sinkronisasi Internship Experience
**Dikerjakan:**
- Mengubah label grup `Pengalaman Proyek` menjadi `Pengalaman Magang & Proyek`
- Merapikan deskripsi grup agar lebih sesuai dengan konteks internship/proyek dari CV
- Menyederhanakan bullet internship Pustaka Rifqi Group, LKM FIT, dan Baker's Corner agar mengikuti isi CV
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Periode internship tetap mengikuti data CV: Januari 2021 - Juli 2021, November 2020 - Mei 2021, dan Juli 2020 - Agustus 2020
- Durasi tetap dihitung otomatis dari `start` dan `end` di `cv.ts`

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual di browser lokal untuk memastikan copy internship sudah terasa pas secara visual

### Session 2026-07-08 - Sinkronisasi Organizational Experience
**Dikerjakan:**
- Menyesuaikan data organisasi di `src/data/cv.ts` berdasarkan screenshot CV
- Mengubah company Koordinator II Internal Governance menjadi `Students Association`
- Mengubah role laboratorium menjadi `Android Development Laboratory`
- Merapikan bullet organisasi agar tetap Bahasa Indonesia tetapi selaras dengan isi CV
- Mengubah `ExperienceSection.vue` agar ringkasan organisasi menampilkan seluruh bullet organisasi
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Data organisasi tetap disimpan di `cv.ts` sebagai single source of truth
- Kerja dan internship tetap menampilkan bullet pertama, sedangkan organisasi menampilkan semua bullet agar kontribusi pelengkap tidak hilang

**Technical Debt:**
- Review visual manual tetap diperlukan karena penambahan ringkasan organisasi bisa mengubah tinggi card pada viewport tertentu

**Pending Tasks:**
- Review section Experience di browser untuk memastikan organisasi tidak kembali terasa terlalu padat

### Session 2026-07-08 - Simetrikan Card Experience
**Dikerjakan:**
- Mengubah struktur meta item experience agar periode berada di kiri dan badge durasi/status berada di kanan
- Menjadikan durasi dan `Posisi saat ini` sebagai grup badge yang rapi dalam satu area
- Menambahkan `grid-auto-rows: 1fr` agar card dalam panel kerja, magang, dan organisasi lebih simetris
- Menambahkan aturan responsive agar meta card tidak saling dorong pada layar kecil
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Pola meta card dibuat sama untuk semua tipe experience agar spacing konsisten dari kerja sampai organisasi

**Technical Debt:**
- Browser plugin tidak menemukan browser aktif di session ini, sehingga verifikasi visual dilakukan lewat build dan inspeksi CSS

**Pending Tasks:**
- Review manual di `http://localhost:5173/#experience` untuk memastikan alignment visual sudah sesuai preferensi

### Session 2026-07-08 - Samakan Deskripsi Experience Dengan CV
**Dikerjakan:**
- Mengubah tampilan deskripsi card experience dari satu ringkasan menjadi daftar bullet lengkap
- Menyesuaikan bullet kerja, magang, dan organisasi agar lebih dekat dengan isi CV yang dikirim user
- Memperbaiki selector CSS list agar bullet deskripsi tidak ikut terkena style card experience
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Semua bullet experience tetap berasal dari `src/data/cv.ts`
- Card experience memakai `<ul>` nested untuk menjaga isi CV tetap terbaca sebagai poin-poin ringkas

**Technical Debt:**
- Review visual manual tetap diperlukan karena jumlah bullet membuat tinggi card bertambah

**Pending Tasks:**
- Cek tampilan Experience di browser dan sesuaikan kepadatan jika card terasa terlalu panjang

### Session 2026-07-08 - Redesign Projects Section
**Dikerjakan:**
- Mengubah headline dan lead section proyek agar lebih profesional
- Menghapus tampilan periode bulan/tahun dari card proyek
- Mengubah card proyek menjadi tombol yang membuka modal detail
- Menambahkan modal detail berisi thumbnail, kategori, deskripsi, teknologi, video demo jika tersedia, dan tautan proyek lain jika ada
- Menambahkan styling modal responsive dan state focus untuk card proyek
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Field `period` di `cv.ts` tetap dipertahankan untuk kompatibilitas tipe data, tetapi tidak ditampilkan di UI proyek
- Link demo/video dipindahkan ke modal detail agar card utama lebih bersih

**Technical Debt:**
- Modal belum memakai focus trap penuh; tombol close diberi autofocus dan Escape handler sebagai dukungan dasar

**Pending Tasks:**
- Review manual di `http://localhost:5173/#projects` untuk memastikan modal detail dan spacing card sudah sesuai preferensi visual

### Session 2026-07-08 - Refinement Copy Projects
**Dikerjakan:**
- Mengganti heading section proyek menjadi `Pilihan aplikasi yang pernah saya kerjakan`
- Mengubah lead section proyek agar lebih natural, profesional, dan tidak terasa seperti instruksi teknis
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Copy section proyek menonjolkan pengalaman membangun fitur, mengelola data, dan kebutuhan operasional

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual apakah wording terbaru sudah sesuai tone portfolio

### Session 2026-07-08 - Smooth Modal Projects
**Dikerjakan:**
- Membungkus modal proyek dengan Vue `<Transition>` untuk animasi fade, slide, dan scale yang lebih smooth
- Mengubah detail image dari `object-fit: cover` menjadi `object-fit: contain` agar thumbnail tidak tampak terpotong
- Menambahkan padding, rounded image, shadow, dan background panel agar detail tidak terlihat seperti kotak terpotong
- Memperhalus container modal, overlay blur, tombol close, dan responsive media
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Gambar di modal detail diprioritaskan tampil utuh, sementara card utama tetap memakai crop ringan agar grid tetap rapi

**Technical Debt:**
- Verifikasi visual manual tetap diperlukan karena browser plugin tidak tersedia aktif

**Pending Tasks:**
- Refresh `http://localhost:5173/#projects` dan cek animasi modal pada beberapa proyek

### Session 2026-07-08 - Rapikan Media Modal Projects
**Dikerjakan:**
- Mengubah `.detail-media` pada modal proyek menjadi area rasio 16:9
- Menghapus tinggi paksa dan padding besar yang menyebabkan sisa ruang hitam atas-bawah
- Menjaga gambar detail tetap `contain` agar thumbnail tidak terpotong
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Modal detail memprioritaskan gambar proyek tampil utuh tanpa ruang hitam tambahan dari container

**Technical Debt:**
- Jika aset thumbnail memiliki rasio berbeda dari 16:9, masih perlu review manual per gambar

**Pending Tasks:**
- Refresh modal proyek di browser untuk memastikan semua thumbnail terlihat pas

### Session 2026-07-08 - Sejajarkan Footer Card Projects
**Dikerjakan:**
- Membungkus tech chip dan `Lihat detail` dalam `.project-footer`
- Mengubah `.project-body` menjadi flex column dan mendorong footer ke bawah dengan `margin-top: auto`
- Menambahkan tinggi minimum footer agar chip dan aksi antar card lebih sejajar
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Card proyek memakai footer konsisten agar posisi `Lihat detail` tidak bergantung pada panjang deskripsi

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual apakah alignment bawah card sudah sesuai pada semua baris proyek

### Session 2026-07-08 - Update Link Projects
**Dikerjakan:**
- Memperbarui `demoUrl` Redmimo Application ke link YouTube terbaru dari user
- Menambahkan helper label link eksternal di `ProjectsSection.vue`
- Mengubah label tombol eksternal menjadi `Buka Play Store` untuk project yang memiliki `playUrl`
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Label tombol detail proyek sekarang mengikuti jenis link: Play Store untuk `playUrl`, label umum untuk `link`

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual modal Nyatet App dan Redmimo setelah refresh browser

### Session 2026-07-08 - Rapikan Card Organisasi Experience
**Dikerjakan:**
- Mengubah grid khusus `Pengalaman Organisasi` agar memakai `grid-auto-rows: auto`
- Menambahkan `align-items: start` agar card organisasi mengikuti tinggi kontennya
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Equal-height row tetap dipakai secara umum, tetapi organisasi dioverride karena jumlah dan panjang item berbeda-beda

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Refresh section Experience dan cek card organisasi paling bawah

### Session 2026-07-08 - Redesign Education Section
**Dikerjakan:**
- Menambahkan menu `Pendidikan` di `AppHeader.vue`
- Menambahkan `id="education"` pada section pendidikan agar bisa dinavigasi dari navbar
- Merombak `CertificatesSection.vue` menjadi board pendidikan formal dan sertifikasi yang lebih padat
- Memperbarui data Universitas Terbuka menjadi `Sistem Informasi` dengan status `Lulus 2026`
- Memperbarui jurusan Telkom University menjadi `Rekayasa Perangkat Lunak Aplikasi`
- Menambahkan penyesuaian responsive navbar agar item tambahan tidak merusak layout kecil
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Section tetap memakai komponen `CertificatesSection.vue`, tetapi id dan label navigasi menggunakan `education`/`Pendidikan`
- Data pendidikan tetap bersumber dari `src/data/cv.ts`

**Technical Debt:**
- Nama komponen `CertificatesSection.vue` belum di-rename meski sekarang memuat pendidikan dan sertifikasi

**Pending Tasks:**
- Review manual tampilan section Pendidikan di browser dan pertimbangkan rename komponen jika ingin lebih konsisten

### Session 2026-07-08 - Compact Education Section
**Dikerjakan:**
- Menghapus lead paragraph di header section Pendidikan
- Menghapus nomor dekoratif pada item pendidikan
- Menghapus counter jumlah pada header panel pendidikan dan sertifikasi
- Mengubah item pendidikan menjadi layout compact: sekolah/jurusan/catatan di kiri, status/IPK di kanan
- Menyesuaikan gap dan proporsi grid agar pendidikan dan sertifikasi lebih padat
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Informasi pendidikan tetap lengkap, tetapi dekorasi numerik dihilangkan agar layout lebih profesional dan rapi

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual apakah alignment status `Lulus` dan konten pendidikan sudah sesuai visual yang diinginkan

### Session 2026-07-08 - Rapikan Detail Education
**Dikerjakan:**
- Menghapus badge status `Lulus` / `Lulus 2026` dari tampilan card pendidikan
- Menghapus note `Predikat cumlaude` pada Telkom University agar `Cumlaude` hanya tampil di IPK
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Field `period` tetap disimpan di `cv.ts`, tetapi tidak ditampilkan pada UI pendidikan saat ini

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual section Pendidikan setelah refresh browser

### Session 2026-07-08 - Haluskan Education Section
**Dikerjakan:**
- Memindahkan IPK Telkom University menjadi teks biasa di bawah jurusan
- Menghapus layout badge IPK kanan dari card pendidikan
- Memusatkan konten section pendidikan secara vertikal
- Menambahkan accent chips ringan di bawah board agar space bawah tidak terasa kosong
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- IPK tetap ditampilkan, tetapi tidak lagi menjadi elemen highlight utama

**Technical Debt:**
- Accent chips bersifat dekoratif dan bisa dihapus jika user ingin tampilan lebih minimal

**Pending Tasks:**
- Review manual apakah space bawah section Pendidikan sudah terasa lebih seimbang

### Session 2026-07-08 - Minimalisir Education Section
**Dikerjakan:**
- Menghapus accent chips dekoratif di bawah board pendidikan
- Mengubah padding section Pendidikan menjadi lebih besar di atas agar layout turun sedikit
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Section Pendidikan kembali dibuat clean tanpa dekorasi tambahan; pengurangan space kosong dilakukan lewat posisi layout

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual apakah posisi section sudah cukup turun dan tidak terasa kosong

### Session 2026-07-08 - Redesign Contact Section
**Dikerjakan:**
- Menyalin `D:\Pekerjaan\CV.pdf` ke `public/CV.pdf`
- Memperbarui nomor WhatsApp menjadi `62895332536530`
- Memperbarui LinkedIn ke `https://www.linkedin.com/in/farhan-reninda-budiansyah-543b05197/`
- Menambahkan field `cvUrl` pada tipe/data social
- Merombak `ContactSection.vue` menjadi layout kontak baru dengan card, list email/WhatsApp, dan tiga tombol aksi
- Menghapus tampilan LinkedIn sebagai teks nama di list kontak
- Menambahkan tombol `LinkedIn` dan tombol `Unduh CV` yang mendownload `CV-Farhan-Reninda-Budiansyah.pdf`
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- File CV diletakkan di `public/CV.pdf` agar bisa diakses langsung oleh static site dan dipakai dengan atribut `download`
- Lokasi ditampilkan di header card, bukan diduplikasi di list kontak

**Technical Debt:**
- Jika CV diperbarui, file `public/CV.pdf` perlu diganti ulang dari sumber terbaru

**Pending Tasks:**
- Review manual tombol WhatsApp, LinkedIn, dan Unduh CV di browser

| 2026-07-08 | Refinement Contact actions | Mengubah section kontak menjadi kumpulan tombol aksi Email, WhatsApp, LinkedIn, GitHub, dan Unduh CV | User ingin semua kontak langsung menuju tujuan tanpa daftar kontak pasif dan copy yang berulang |

### Session 2026-07-08 - Refinement Contact Actions
**Dikerjakan:**
- Memoles headline dan deskripsi section Kontak agar mencakup diskusi project, kolaborasi, dan peluang kerja tanpa mengulang daftar channel
- Menambahkan URL GitHub ke `src/data/cv.ts`
- Mengubah `ContactSection.vue` menjadi action-card untuk Email, WhatsApp, LinkedIn, GitHub, dan Unduh CV
- Membuat email memakai `mailto:` dengan subject, WhatsApp memakai `wa.me`, dan CV tetap memakai file `public/CV.pdf`
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Kontak dibuat action-first agar pengunjung langsung menuju channel yang dipilih tanpa membaca daftar kontak pasif

**Technical Debt:**
- Verifikasi visual via browser bawaan belum bisa dilakukan karena browser runtime tidak tersedia

**Pending Tasks:**
- Review manual di browser untuk memastikan layout tombol kontak sudah sesuai preferensi visual

| 2026-07-08 | Rapikan detail tombol Contact | Membuat detail kontak pada tombol tetap satu baris dengan ellipsis dan font adaptif | Feedback user: email di tombol kontak turun ke baris bawah dan terlihat tidak sejajar |

### Session 2026-07-08 - Rapikan Detail Tombol Contact
**Dikerjakan:**
- Mengubah style detail tombol kontak agar tidak pecah baris di tengah email
- Menambahkan `white-space: nowrap`, `text-overflow: ellipsis`, dan font adaptif pada detail tombol
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Detail kontak diprioritaskan sejajar dalam satu baris agar card tombol terlihat lebih rapi

**Technical Debt:**
- Pada layar sangat kecil, teks email panjang akan dipotong dengan ellipsis agar layout tetap stabil

**Pending Tasks:**
- Review manual di browser untuk memastikan email dan nomor WhatsApp sudah sejajar sesuai ekspektasi

| 2026-07-08 | Tampilkan email penuh di Contact | Membuat tombol Email melebar satu baris penuh dan menghapus ellipsis pada detail kontak | Feedback user: alamat email tidak boleh dipotong karena ruang card masih cukup |

### Session 2026-07-08 - Tampilkan Email Penuh Contact
**Dikerjakan:**
- Menambahkan variant `wide` untuk tombol Email di `ContactSection.vue`
- Membuat tombol Email mengambil lebar penuh pada grid kontak
- Menghapus ellipsis pada detail kontak agar alamat email tampil lengkap
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Email diberi ruang lebih besar daripada tombol lain karena panjang teksnya berbeda dan harus tetap terbaca penuh

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual section Kontak untuk memastikan komposisi tombol tetap sesuai preferensi visual

| 2026-07-08 | Hilangkan slot kosong Contact | Mengubah tombol Unduh CV dari full-width menjadi card normal agar mengisi slot kanan di samping GitHub | Feedback user: grid kontak menyisakan ruang kosong pada baris GitHub |

### Session 2026-07-08 - Hilangkan Slot Kosong Contact
**Dikerjakan:**
- Menghapus aturan full-width pada variant `ghost` tombol Unduh CV
- Menjadikan tombol GitHub dan Unduh CV berada dalam satu baris grid
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Hanya tombol Email yang tetap full-width karena membutuhkan ruang teks lebih panjang

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual section Kontak setelah refresh browser

| 2026-07-08 | Redesign minimal footer | Menghapus link kontak dan teks teknis dari footer, lalu menggantinya dengan brand strip ringkas | Feedback user: footer mengulang kontak dan teks `Dibuat dengan Vue 3 + Vite` kurang cocok ditampilkan |

### Session 2026-07-08 - Redesign Minimal Footer
**Dikerjakan:**
- Menghapus link LinkedIn, Email, dan Unduh CV dari `AppFooter.vue`
- Menghapus teks `Dibuat dengan Vue 3 + Vite`
- Mendesain ulang footer menjadi strip identitas ringkas berisi mark FR, nama, role, lokasi, dan tahun
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Footer tidak lagi dipakai sebagai area kontak agar tidak redundan dengan section Kontak

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual footer pada desktop dan mobile setelah refresh browser

| 2026-07-08 | Geser nav header ke kanan | Membungkus navbar dan theme toggle dalam satu grup kontrol di sisi kanan header | Feedback user: navbar lebih bagus jika menyatu dengan toggle dark/light mode |

### Session 2026-07-08 - Geser Nav Header Ke Kanan
**Dikerjakan:**
- Mengubah struktur `AppHeader.vue` agar nav dan `ThemeToggle` berada dalam `.header-controls`
- Menjaga brand tetap di kiri dan semua kontrol header berada di kanan
- Menambahkan style responsive agar nav tetap scrollable di layar kecil
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Header memakai pola brand kiri dan control group kanan agar nav tidak terasa terpisah dari toggle theme

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual header pada desktop dan mobile setelah refresh browser

| 2026-07-08 | Tambah proyek SIP dan galeri detail | Menambahkan proyek Sistem Informasi Penjualan di urutan pertama, field `images`, asset cover/detail, dan carousel modal proyek | User ingin proyek SIP tampil paling awal dengan cover seragam dan detail bisa geser beberapa gambar |

### Session 2026-07-08 - Tambah Proyek SIP
**Dikerjakan:**
- Menambahkan field opsional `images` pada tipe `Project`
- Menambahkan proyek `Sistem Informasi Penjualan` di urutan pertama `cv.projects`
- Menambahkan link akses `https://farhanreninda.github.io/SIP/`
- Membuat asset SVG 16:9 untuk cover dan galeri SIP di `public/projects/sip`
- Mengubah modal detail proyek agar mendukung carousel gambar dengan tombol prev/next, counter, dots, dan animasi fade
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Cover SIP dibuat seragam 16:9 seperti project lain, sedangkan gambar detail disimpan di field `images` agar card utama tetap bersih
- Gambar dibuat dari desain/screenshot yang diberikan user dan tidak mengambil screenshot dari link web

**Technical Debt:**
- Asset SIP saat ini berupa SVG representasi visual dari screenshot lampiran, bukan file raster asli dari attachment chat

**Pending Tasks:**
- Review manual carousel proyek SIP di browser dan ganti asset jika user menyediakan file gambar asli

| 2026-07-09 | Update link proyek SIP | Mengganti link akses Sistem Informasi Penjualan menjadi `https://farhanreninda.my.id/SIP/` | User meminta link project SIP diarahkan ke domain personal terbaru |

### Session 2026-07-09 - Update Link Proyek SIP
**Dikerjakan:**
- Mengubah link project `Sistem Informasi Penjualan` di `src/data/cv.ts`
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Data link tetap disimpan di `cv.ts` sebagai single source of truth untuk project portfolio

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Tidak ada

| 2026-07-09 | Ringkas teknologi proyek SIP | Menghapus `Express` dari tag teknologi proyek SIP | User ingin tag teknologi SIP lebih ringkas tanpa menampilkan Express |

### Session 2026-07-09 - Ringkas Teknologi SIP
**Dikerjakan:**
- Menghapus tag `Express` dari proyek Sistem Informasi Penjualan di `src/data/cv.ts`
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Tag SIP dibuat lebih ringkas dengan tetap menampilkan teknologi inti: JavaScript, HTML, CSS, Node.js, dan MySQL

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Tidak ada

| 2026-07-09 | Sesuaikan teknologi proyek SIP | Mengganti tag teknologi SIP menjadi `JavaScript`, `HTML`, `CSS`, `Node.js`, `Express`, dan `MySQL` | Repo SIP menunjukkan stack web/Node/MySQL dan user meminta menghapus `Dashboard` karena bukan teknologi |

### Session 2026-07-09 - Sesuaikan Teknologi SIP
**Dikerjakan:**
- Mengecek referensi repo `farhanreninda/SIP`
- Menghapus tag `Dashboard` dari proyek Sistem Informasi Penjualan
- Mengganti tag proyek SIP menjadi teknologi yang relevan dengan repo
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Tag proyek SIP menampilkan stack teknis, bukan tipe fitur atau label halaman

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review visual tag teknologi SIP pada card dan modal proyek

| 2026-07-09 | Atur tombol navigasi galeri proyek | Tombol gambar sebelumnya hanya tampil setelah slide pertama dan tombol berikutnya hanya tampil sebelum slide terakhir | User ingin tombol carousel tidak muncul pada halaman awal dan akhir |

### Session 2026-07-09 - Atur Navigasi Galeri Proyek
**Dikerjakan:**
- Menambahkan computed `hasPreviousProjectImage` dan `hasNextProjectImage`
- Mengubah navigasi galeri proyek agar tidak lagi looping dari slide pertama ke terakhir atau sebaliknya
- Menyembunyikan tombol kiri pada slide pertama dan tombol kanan pada slide terakhir
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Carousel detail proyek dibuat linear agar arah navigasinya lebih jelas untuk user

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual slide pertama dan terakhir pada modal proyek

| 2026-07-09 | Perbaiki tampilan screenshot mobile SIP | Menambahkan mode media khusus untuk screenshot mobile SIP agar gambar portrait ditampilkan penuh tanpa crop | User melihat screenshot mobile pada modal detail proyek masih terpotong |

### Session 2026-07-09 - Perbaiki Screenshot Mobile SIP
**Dikerjakan:**
- Menambahkan deteksi gambar mobile SIP pada `ProjectsSection.vue`
- Mengatur frame modal khusus screenshot portrait agar lebih tinggi dan dapat menampilkan gambar secara utuh
- Membatasi lebar screenshot mobile agar tidak membesar berlebihan dan tidak terpotong
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Screenshot mobile SIP memakai perlakuan khusus karena rasio gambarnya portrait dan berbeda dari screenshot web/cover

**Technical Debt:**
- Browser bawaan session tidak tersedia, sehingga verifikasi visual langsung di browser perlu dicek manual setelah refresh halaman

**Pending Tasks:**
- Review manual slide mobile SIP pada modal proyek

| 2026-07-09 | Ganti galeri detail SIP | Menggunakan screenshot asli `detail-01.png` sampai `detail-12.png` untuk slide detail proyek Sistem Informasi Penjualan | User ingin slide ke-2 dan seterusnya memakai foto lampiran sesuai urutan nomor |

### Session 2026-07-09 - Ganti Galeri Detail SIP
**Dikerjakan:**
- Menyalin 12 screenshot asli dari folder Capstone Project ke `public/projects/sip/detail-01.png` sampai `detail-12.png`
- Mengubah `cv.projects` untuk proyek `Sistem Informasi Penjualan` agar memakai 12 screenshot tersebut pada field `images`
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Cover SIP tetap menjadi slide pertama karena `ProjectsSection.vue` sudah menambahkan thumbnail sebelum daftar `images`
- Slide detail memakai urutan angka asli dari file lampiran user

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual modal proyek SIP untuk memastikan urutan visual sudah sesuai

| 2026-07-09 | Cegah crop gambar modal proyek | Mengubah frame media detail proyek agar gambar memakai ukuran `auto` dengan `max-width` dan `max-height`, bukan dipaksa memenuhi frame 16:9 | User melihat beberapa screenshot SIP terpotong pada modal detail |

### Session 2026-07-09 - Cegah Crop Gambar Modal Proyek
**Dikerjakan:**
- Menghapus paksaan rasio 16:9 pada area gambar detail proyek
- Mengatur gambar detail proyek agar selalu tampil utuh dengan `max-width: 100%` dan `max-height: 100%`
- Menyesuaikan tinggi frame modal pada desktop dan mobile agar screenshot portrait maupun landscape tetap terbaca
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Modal proyek memprioritaskan gambar tampil utuh daripada memenuhi seluruh area frame

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual slide SIP yang portrait dan landscape setelah refresh browser

| 2026-07-09 | Perbarui cover proyek SIP | Mengganti mockup web dan mobile di `public/projects/sip/cover.svg` dengan screenshot asli yang ditanam sebagai data image | User ingin desain cover tetap sama, tetapi tampilan web dan mobile memakai gambar asli dari lampiran |

### Session 2026-07-09 - Perbarui Cover SIP
**Dikerjakan:**
- Mengambil screenshot asli dari `D:\han\web sip.png` dan `D:\han\mobile sip.png`
- Menanam screenshot web dan mobile langsung ke `public/projects/sip/cover.svg`
- Menghapus copy PNG sementara agar aset public tidak redundant
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Screenshot ditanam langsung dalam SVG supaya cover tetap aman saat dirender sebagai gambar di card proyek

**Technical Debt:**
- Browser bawaan session tidak tersedia, sehingga verifikasi visual langsung dilakukan terbatas lewat struktur file dan build

**Pending Tasks:**
- Review manual tampilan cover SIP di browser lokal

| 2026-07-09 | Refinement cover dan galeri proyek SIP | Mengganti thumbnail SIP ke `cover.png`, menghapus `cover.svg` lama, dan membuat modal proyek selalu membuka thumbnail sebagai slide pertama | User ingin font cover SIP lebih natural seperti proyek lain dan detail proyek menampilkan gambar cover terlebih dahulu sebelum carousel |

### Session 2026-07-09 - Refinement Cover dan Galeri SIP
**Dikerjakan:**
- Membuat `public/projects/sip/cover.png` dari screenshot asli web dan mobile SIP dengan komposisi cover yang lebih natural
- Mengubah thumbnail proyek SIP di `src/data/cv.ts` dari `cover.svg` ke `cover.png`
- Mengubah `ProjectsSection.vue` agar galeri detail selalu dimulai dari thumbnail/cover, lalu gambar detail berikutnya
- Menghapus `public/projects/sip/cover.svg` lama yang sudah tidak dipakai
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Cover SIP memakai PNG final agar font dan screenshot stabil seperti asset proyek lain
- Carousel proyek memakai thumbnail sebagai slide pertama untuk menjaga konteks visual antara card dan modal

**Technical Debt:**
- Verifikasi visual browser manual masih perlu dilakukan oleh user karena browser bawaan session tidak tersedia

**Pending Tasks:**
- Review manual card SIP dan modal detail di `http://localhost:5173/#projects`

| 2026-07-09 | Center label cover SIP | Meregenerasi `public/projects/sip/cover.png` agar teks label `Web Application` berada tepat di tengah pill | User melihat label cover SIP belum center dibanding cover proyek lain |

### Session 2026-07-09 - Center Label Cover SIP
**Dikerjakan:**
- Meregenerasi cover SIP PNG dengan alignment label yang dihitung center di dalam pill
- Menjalankan `npm run build` dan build sukses

**Keputusan Penting:**
- Perbaikan dilakukan di asset cover PNG agar tampilan card proyek langsung ikut rapi tanpa mengubah layout komponen

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Review manual refresh halaman proyek untuk memastikan cache browser tidak menampilkan cover lama

**Commit Message Terakhir:**
```text
Feature
Redesign section portfolio dan tambah showcase proyek SIP
```

| 2026-07-09 | Simpan format commit message | Setiap selesai perubahan, agent harus menyertakan commit message dengan format dua baris: tipe seperti `Feature`, lalu ringkasan perubahan di bawahnya | User meminta commit message selalu dibuat dan disimpan sebagai kebiasaan kerja |

### Known Context Update - Commit Message
- Setelah setiap perubahan kode/konten, sertakan rekomendasi commit message di final response.
- Commit message dibuat dalam Bahasa Indonesia.
- Format commit message yang diminta user:

```text
Feature
Ringkasan perubahan
```

### Session 2026-07-09 - Simpan Preferensi Commit Message
**Dikerjakan:**
- Menyimpan preferensi format commit message ke `memory.md`
- Menyiapkan commit message untuk perubahan portfolio saat ini

**Keputusan Penting:**
- Final response setelah perubahan berikutnya harus menyertakan commit message format `Feature` di baris pertama dan ringkasan di baris kedua

**Technical Debt:**
- Tidak ada

**Pending Tasks:**
- Tidak ada
