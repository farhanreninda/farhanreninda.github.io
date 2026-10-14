# Pemeriksaan PageSpeed 2026-10-14

Branch: `bugfix/fix-pagespeed`, sesuai persetujuan pengguna mengganti prefix `codex/` menjadi `bugfix/`.

## Hasil

| Pengukuran | Performa | Aksesibilitas | Praktik terbaik | SEO |
| --- | ---: | ---: | ---: | ---: |
| PageSpeed produksi, mobile, 16:40 GMT+7 | 58 | 100 | 100 | 100 |
| PageSpeed produksi, desktop, 16:40 GMT+7 | 94 | 100 | 100 | 100 |
| Lighthouse lokal, mobile, 17:54 GMT+7 | 99 | 100 | 100 | 100 |
| Lighthouse lokal, desktop, 17:46 GMT+7 | 100 | 100 | 100 | 100 |

Lokal menggunakan build production, Lighthouse 13.5.0, Chrome 155, profil mobile bawaan dan preset desktop, serta server statis gzip. Produksi pada laporan pengguna menggunakan Chrome 153 dan infrastruktur Google. Angka lokal bukan hasil PageSpeed produksi setelah deployment.

Mobile lokal: FCP 1,36 detik, LCP 1,89 detik, TBT 34,5 ms, CLS 0. Desktop lokal: FCP 0,34 detik, LCP 0,44 detik, TBT 0, CLS 0. Target performa mobile 100 belum tercapai; pengujian berulang pada perubahan akhir menghasilkan 99.

## Perbaikan

- Loading menjadi overlay tetap, sehingga penggantian dengan halaman portfolio tidak menggeser layout. State error dan tombol retry dipertahankan.
- Pengambilan konten dan pemuatan route berjalan bersamaan; data tetap divalidasi sebelum mount.
- Font ikon Natural dipisahkan dari font lengkap CMS: 970.196 byte menjadi 8.500 byte. Glyph yang digunakan diuji tetap tampil; font CMS lengkap tetap tersedia untuk admin.
- Font teks menjadi WOFF2/subset yang di-preload dan memiliki nama file hash saat build. Geist 14.704 byte, Jakarta 7.360 byte. Font opsional menggunakan fallback apabila lambat, tanpa memaksa pergantian font terlambat.
- Foto asli 225.630 byte dipertahankan. Natural memakai WebP 128/256 piksel (1.358/3.290 byte), hanya ketika URL masih foto bawaan. Foto CMS lain tetap memakai URL asli.
- Bagian di bawah hero memakai `content-visibility: auto`. Sebelum navigasi anchor, seluruh bagian diaktifkan untuk pengukuran posisi yang tepat. App juga mengaktifkan layout sebelum melakukan scroll deep link saat mount.
- Scroll-spy mengukur setelah layout awal. Transisi warna global pada pemuatan halaman dihapus.
- Bundle OAuth/API admin dimuat saat diperlukan; fetch publik, autentikasi, SHA conflict dan preview media dipertahankan. Pinia yang tidak digunakan tidak lagi diinisialisasi.
- Build menambahkan preload JavaScript dan CSS HomeView; source route tetap lazy. Tidak menambah dependency runtime, mengubah data CMS, atau mengganti desain.
- Metadata memakai watchEffect dan API DOM untuk empat tag yang dibutuhkan, dengan title admin/404 mengikuti route dan locale. Dukungan Vue Options API yang tidak dipakai dinonaktifkan setelah audit semua SFC. Bundle awal turun dari 148,42 KB (gzip 57,19 KB) menjadi 123,10 KB (gzip 47,91 KB). Paket Unhead/Pinia tetap terpasang tetapi tidak dimuat saat bootstrap.

## Validasi dan gate antislop dalam scope perubahan

- Build/type-check PASS: `npm run build`.
- Regresi PASS: 8 tes melalui `npm test`, termasuk metadata reaktif tanpa tag duplikat, transport publik GitHub/lokal, error HTTP, admin tanpa sesi, bootstrap paralel/retry, serta anchor setelah layout ditunda.
- Layout PASS: lebar 320/390/768/1280 piksel, ID/EN, light/dark, tanpa overflow horizontal; foto 64 piksel dan ikon kembali berukuran glyph.
- Interaksi PASS: Menu membuka/menutup setelah navigasi; proyek Semua 9/Android 5; dialog SIP membuka 13 gambar, gambar 13 bisa dipilih; Escape menutup dan mengembalikan fokus ke kartu; Salin menampilkan Email disalin; bahasa dan mode memperbarui konten/metadata/palet.
- Route PASS: preview Original memiliki tujuh section dan tidak overflow; deep link Natural mengaktifkan seluruh layout; /admin menampilkan gerbang login; judul 404 mengikuti locale; tidak ada console error/warning pada pemeriksaan terakhir.
- Konten/identitas PASS: font dan foto berasal dari aset asli; konten CMS tidak berubah; tidak menambah klaim performa ke website. ENERGY/RHYTHM/MOTION mengikuti desain Natural existing (2/2/2), tanpa redesign.
- Komentar PASS: hanya catatan batas subset dan alasan pengukuran layout.

Laporan lengkap tersimpan di `.cache/pagespeed/final-mobile.report.html` dan `final-desktop.report.html` (artefak lokal, tidak masuk Git). Gambar bukti UI ada pada folder ini.

## Batasan dan tindak lanjut

Publikasi melalui commit/push `bugfix/fix-pagespeed`, kemudian merge/push `main`, sesuai permintaan pengguna pada 2026-10-14. Domain produksi belum diuji dengan perubahan ini. Target semua kategori 100 pada Google PageSpeed membutuhkan deployment dan audit ulang; skor dapat berubah antar-run. Kebijakan cache GitHub Pages tetap diatur hosting. Tidak mengganti hosting, membuat service worker, atau menjalankan audit perangkat fisik/Safari/Firefox.

Font subset harus diperbarui ketika menambah glyph; karakter yang tidak tercakup tetap menggunakan fallback. Panduan regenerasi: `src/assets/fonts/README.md`. Jika dependency baru memakai Options API, evaluasi kembali flag build; semua SFC saat ini memakai script setup.

Rujukan teknik: [content-visibility](https://web.dev/articles/content-visibility), [preload font opsional](https://web.dev/articles/preload-optional-fonts), dan [compile-time flags Vue](https://vuejs.org/api/compile-time-flags.html).
