# Landing page GarasiKu

Alamat tujuan: https://farhanreninda.my.id/garasiku/ (akses /garasiku akan mengikuti redirect folder GitHub Pages).

## Integrasi

Halaman HTML mandiri berada di public/garasiku/index.html. Vite menyalinnya ke dist/garasiku/index.html beserta CSS, JavaScript, dan aset. Tidak perlu mengubah DNS, CNAME, Vue Router, CMS, atau konfigurasi hosting. Portfolio dan CMS tetap memakai entry existing.

Pengembangan: npm run dev kemudian buka /garasiku/. Pemeriksaan produksi: npm run build lalu npm run preview dan buka /garasiku/. Publikasi mengikuti workflow .github/workflows/deploy.yml setelah perubahan masuk ke main. Publikasi dilakukan setelah persetujuan pengguna dengan push ke main.

## Isi dan aset

Konten khusus produk berada di index.html; belum dikelola oleh CMS portfolio. Data dan media portfolio existing tidak diubah. app.js menangani pilihan lima fitur serta tema yang disimpan dengan key garasiku-theme. Tanpa JavaScript, seluruh panel tetap dapat dibaca berurutan melalui tautan anchor. Native details menyediakan tanya jawab.

Screenshot WebP berasal dari rekaman aplikasi GarasiKu tanggal 8 Oktober 2026 dengan data demo dan plat DEMO 01. Frame beranda, garasi, servis, biaya, profil dan pengingat diperiksa agar bukan frame loading/transisi. Tidak memakai poster portfolio. Ikon SVG dikonversi langsung dari vector drawable launcher GarasiKu. Font Geist dipakai ulang dari aset portfolio.

Video demo.mp4 memakai video promosi sebelumnya: H.264/AAC, 1920x1080, sekitar 3 menit 26 detik, 4,35 MB, narasi sintetis Indonesia. preload=none mencegah pengunduhan video penuh saat halaman dibuka. Subtitle VTT mengikuti teks narasi dengan pembagian waktu per kalimat secara perkiraan; bukan transkripsi berpenanda kata. Poster berasal dari frame video tersebut.

CTA utama membuka demo. CTA penutup membuka repository GitHub GarasiKu sesuai instruksi terbaru pengguna; tautan email telah diganti. Tidak ada tautan Play Store atau APK QC karena tautan distribusi rilis belum tersedia. Setelah tersedia, tambahkan tautan rilis yang benar dan sesuaikan jawaban ketersediaan aplikasi.

## Arah desain dan pemeriksaan

Design Read: landing page pemilik mobil/motor, mengikuti identitas biru/navy dan screenshot GarasiKu. ENERGY 2 / RHYTHM 3 / MOTION 1. Fokus pembuka pada aplikasi; dua layar memperlihatkan ringkasan kendaraan serta servis. Bentuk latar memberi area penempatan screenshot; shadow hanya membedakan lapisan ponsel. Susunan selanjutnya berganti antara pilihan fitur, rincian pengingat, video, backup, dan tanya jawab sesuai kebutuhan informasi produk. Tema terang mengikuti preferensi sistem dan tersedia pilihan gelap.

Delivery Gate:
- Hard Gate PASS: tidak ada klaim pengguna/statistik/testimoni/fitur rekaan. Semua link lokal dan aset terverifikasi. Kontras teks muted terang 5,80:1, tombol putih/biru 6,07:1, muted gelap 9,08:1. Focus ring, skip link, reduced motion, native video controls dan caption tersedia.
- Purpose-Gate PASS: screenshot asli menjadi bukti fitur, tanpa dekorasi stok, grafik palsu atau tombol unduh tanpa tujuan. Catatan menyebut batas notifikasi berkala, odometer manual, acuan khusus PCX, dan belum adanya sinkronisasi cloud.
- Liveliness PASS: heading besar, aksen biru, area screenshot dan perubahan ritme membantu membedakan informasi. Pergantian fitur dan tema berfungsi tanpa animasi yang menyembunyikan konten.
- Craftsmanship PASS: build/type-check dan 10 tes lulus. Chrome headless memeriksa viewport 320/390/768/1024/1440 tanpa overflow, kelima panel, deep-link panel, tema tersimpan, FAQ, video 1920x1080 dengan audio/caption track, serta fallback tanpa JavaScript. Console bersih. Screenshot terang dan gelap diperiksa.

Bukti lokal: .cache/garasiku/desktop.png, mobile.png, mobile-dark.png dan results.json. Kode tes tautan/aset/caption: server/garasiku.test.mjs. Browser QA bersifat lokal; belum diuji pada perangkat fisik, Safari, atau Firefox. Produksi belum diverifikasi sesudah deployment.

Tindak lanjut: tombol kanan atas GitHub GarasiKu mengarah langsung ke repository aplikasi; CTA demo dan GitHub di bagian bawah tersedia.

Revisi shell: header inset dengan navigasi mobile collapse dan GitHub tetap terlihat. Footer navy memberi identitas produk, tautan fitur, repository dan portfolio. Escape menutup menu dan mengembalikan fokus. Semua navigasi tetap tersedia tanpa JavaScript; target aksi mobile44px. Pemeriksaan visual dan browser lintas ukuran diulang.
