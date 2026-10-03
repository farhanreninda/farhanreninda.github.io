# Tema portfolio

CMS menyediakan dua tema bawaan:

- **Portfolio Original** (`existing`): desain awal dengan seluruh section dan CSS asli.
- **Portfolio Natural** (`natural`): layout dari lampiran Stitch, font Geist dan Plus Jakarta Sans, kartu profil editor, grid keahlian/proyek, serta pengalaman menurut jenisnya.

Keduanya menggunakan `localizedCv`, `siteCopy`, dan `settings` yang sama. Tema hanya mengubah susunan, warna, dan font. Tema awal tetap Original. Tema bawaan tidak dapat dihapus atau diedit melalui CMS; tema warna khusus yang sudah ada tetap tersedia.

## Mengganti tema

1. Buka `/admin/` dan masuk dengan GitHub.
2. Pilih **Tema & Tampilan**, lalu pilih tema portfolio.
3. Gunakan **Preview tema** untuk memeriksa tampilannya.
4. Pilih **Jadikan tema aktif**, lalu **Simpan dan publikasikan**.
5. Pada GitHub Pages, tunggu workflow deployment selesai.

Untuk kembali ke tampilan awal, lakukan langkah yang sama dengan Portfolio Original. Preview tidak mengubah tema tersimpan. Mode terang/gelap dan bahasa tetap bekerja pada kedua tema.

## Implementasi

- `src/cms/themes.ts` menyimpan definisi Natural dan menambahkan pilihan bawaan ke dokumen CMS lama tanpa mengubah konten atau tema aktif.
- ID `natural` memilih `NaturalHome` dan `NaturalHeader`. ID `existing` dan tema warna khusus memakai komponen Original.
- `usePortfolio` menerapkan warna dan layout saat memuat dokumen atau menerima pesan preview dari iframe dengan origin yang sama.
- Filter proyek memakai kategori yang tersedia di CMS. Semua proyek, pengalaman, pendidikan, dan sertifikasi tetap ditampilkan; angka ringkasan dihitung dari data.
- Galeri detail proyek menggunakan komponen yang sama dengan Original.
- Font disimpan lokal beserta lisensi, sehingga tidak perlu mengambil font dari Google saat membuka website.

## Verifikasi

Type-check, build produksi, dan empat pengujian otomatis lulus. Browser diperiksa pada lebar 320, 390, 768, dan 1440 piksel, mode terang/gelap, bahasa Indonesia/Inggris, navigasi, filter, serta galeri gambar. Tidak ditemukan konten meluber horizontal.

CMS diuji dengan database terpisah di `.cache`: preview Natural, aktivasi/simpan/reload, lalu kembali ke Original. Data Indonesia/Inggris, teks website, dan identitas dibandingkan dengan versi sebelum perubahan dan tetap identik.

Perubahan ini belum dipublikasikan. Login GitHub dan deployment produksi tetap mengikuti konfigurasi yang sudah ada.
