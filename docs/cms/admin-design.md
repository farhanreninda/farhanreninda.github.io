# Redesign CMS dari Stitch Blue Edition

Referensi terbaru user: folder Downloads/stitch_comprehensive_ui_redesign/stitch_comprehensive_ui_redesign, empat pasangan code.html/screen.png: ringkasan, profil/kontak, proyek, keahlian/pengalaman. Folder ini berisi desain CMS admin. Desain portfolio publik dan seluruh data tersimpan tetap dipertahankan.

## Arah visual dan keputusan

Antislop during; ENERGY 1 / RHYTHM 2 / MOTION 1. Arahan eksplisit user menjadi acuan visual, termasuk badge, warna biru, dan bayangan tombol pada referensi.

- Sidebar 256 px dan topbar 64 px mengikuti workspace Stitch; area konten dan navigasi memiliki scroll sendiri pada desktop. Di bawah 900 px navigasi menjadi menu lipat.
- Warna biru #2563eb mengikuti referensi untuk menu aktif dan aksi; permukaan gelap #0b0f19/#121722 memisahkan latar dan panel. Tema terang tetap tersedia.
- Plus Jakarta Sans untuk heading/tombol, Inter untuk isi/form, Material Symbols Outlined untuk ikon mengikuti HTML sumber. Font disimpan lokal dengan lisensi, memakai nama keluarga CMS agar tidak mengubah font portfolio publik.
- Dashboard memakai profil, jumlah koleksi, bahasa, revisi, dan media aktual. Profil memakai panel biodata/kontak, widget preview, validasi, serta perbandingan draft dengan data tersimpan.
- Proyek memakai pencarian, filter kategori, editor dua kolom, teknologi berupa tag editable, dan tombol tambah. Keahlian/pengalaman memakai dua bagian dalam satu halaman sesuai referensi.
- Field, URL, gallery, dan koleksi asli tetap dapat diedit. Grip mengubah urutan melalui pointer atau keyboard; ikon hapus tetap meminta konfirmasi draft.
- Copy/sample data Stitch disesuaikan dengan portfolio aktual. Klaim 2FA, penggunaan storage 64%, pipeline/Git head, dan status contoh tidak ditampilkan sebagai fakta. Kontrol penyimpanan memakai kemampuan CMS yang tersedia.
- Ini implementasi desain dengan data nyata dan layout responsif; bukan klaim kesamaan pixel untuk teks contoh, status contoh, atau ukuran layar yang berbeda.

## Delivery gate antislop

Bukti: docs/cms/verification.md, screenshot stitch-blue-*.png, build strict, integration HTTP, dan deep equality seluruh respons konten sebelum/sesudah.

- R-01 PASS: permukaan solid; aksen dan bayangan tombol terbatas mengikuti referensi eksplisit user.
- R-02 PASS: copy CMS operasional; teks portfolio asli tidak diedit.
- R-03 PASS: viewport 320/390/768/1600 diperiksa; tidak ada overflow horizontal pada empat halaman utama.
- R-04 PASS: ikon lokal menggambarkan fungsi nyata, termasuk edit, hapus, drag, pencarian, dan simpan.
- R-05 PASS: susunan workspace mengikuti empat desain user dan struktur CMS.
- R-06 PASS: pasangan font dan bobot mengikuti HTML Stitch; font publik tetap terpisah.
- R-07 PASS: tidak menambah pola dekoratif pada latar.
- R-08 PASS: panah dipakai untuk link dan perpindahan editor.
- R-09 PASS: badge akses/bahasa/revisi memiliki fungsi operasional dan mengikuti referensi.
- R-10 PASS: panel solid tanpa backdrop blur.
- R-11 PASS: radius berbeda untuk panel, input, tag, dan status sesuai referensi.
- R-12 PASS: bayangan biru terbatas pada tindakan utama sesuai permintaan desain.
- R-13 PASS: tidak menambah glow dekoratif.
- R-14 PASS: kartu jumlah seragam; profil, editor, dan pintasan memiliki susunan sesuai fungsi.
- R-15 PASS: CTA menyebut aksi nyata seperti Tambah Proyek Baru dan Simpan dan publikasikan.
- R-16 PASS: tidak menambah slogan pemasaran.
- R-17 PASS: angka koleksi 9/19/10/3/2 dan total 43 berasal dari database.
- R-18 PASS: tidak menambah testimonial atau identitas rekaan.
- R-19 PASS: motion berupa hover/focus; scroll bagian menghormati reduced motion.
- R-20 PASS: profil dan koleksi mengikuti data bilingual Farhan.
- R-21 PASS: terang/gelap diperiksa secara visual.
- R-22 PASS: foto memakai aset portfolio yang tersedia; tidak menambah ilustrasi.
- R-23 PASS: aset desain berasal dari folder user, font resmi, dan portfolio existing.
- R-24 PASS: menu utama, pencarian/filter, tambah, edit, dan pemulihan draft diperiksa di browser.
- R-25 PASS: kontras muted/surface 6.99 gelap dan 6.50 terang; putih/biru 5.17; border/input 6.15 gelap dan 3.49 terang.
- R-26 PASS: kontrol baru terhubung ke state/form/handler; build dan tes HTTP lulus.
- R-27 PASS: pencarian kosong, draft, validasi, disabled save, reload, dan konfirmasi tersedia.
- R-28 PASS: tidak ada FAQ CMS.
- R-29 PASS: biru aksi, netral permukaan, merah hapus/error memakai token bersama.
- R-30 PASS: referensi user menjadi acuan dengan identitas dan data portfolio aktual.
- R-31 PASS: alasan layout/font/ikon/warna/form dicatat di atas.
- R-32 PASS: label, focus-visible, grip keyboard, live status, dialog Escape dan kontrol mobile tersedia.
- R-33 PASS: perubahan ditulis pada Vue/CSS; browser hanya menguji UI.
- R-34 PASS: desktop gelap, mobile gelap, serta tablet/mobile terang diperiksa; screenshot disimpan.
- R-35 PASS: build strict dan integration HTTP lulus; log warning/error browser kosong.
- R-36 PASS: dashboard tidak mengarang trafik, storage, 2FA, atau uptime.
- R-37 PASS: arah visual dan dial ditetapkan dari brief/source sebelum pengerjaan.
- R-38 PASS: deep equality respons API sebelum/sesudah lulus; data tetap revisi 3.
- Liveliness/dials PASS: ENERGY 1 / RHYTHM 2 / MOTION 1 sesuai workspace CMS.
- Liveliness/focal point PASS: judul halaman, identitas pemilik, dan aksi utama mengarahkan perhatian.
- Liveliness/spacing PASS: panel dan form memiliki jarak baca; kolom menumpuk pada layar kecil.
- Liveliness/accent PASS: biru menghubungkan navigasi, ikon, dan tindakan utama.
- Liveliness/identity PASS: foto/nama/skill/proyek aktual membentuk identitas portfolio.
- Liveliness/design read PASS: arah, alasan, dan adaptasi desain tercatat di atas.
- C-1 PASS: keputusan visual memiliki alasan yang dapat ditinjau.
- C-2 PASS: kontrol diuji dengan draft lalu dipulihkan.
- C-3 PASS: fitur dan data contoh disesuaikan dengan kemampuan CMS nyata.
- C-4 PASS: responsif, tema, validasi, dialog, dan keyboard diperiksa.
- C-5 PASS: data identik sebelum/sesudah; tidak membuat metrik tanpa sumber.

Batas: pemeriksaan responsive memakai viewport browser, bukan perangkat fisik. Tidak ada commit, push, atau deployment dalam task ini. Snapshot pengujian tetap lokal di .cache dan tidak ditambahkan ke git.

## Koreksi QC setelah review user

Keahlian/Pengalaman kini dipisahkan sesuai arahan terbaru user. Toolbar menggunakan grid yang rata; kategori/deskripsi skill satu kolom; grip/edit/hapus sejajar di kanan. Kontak tidak memakai inset yang berbeda untuk field opsional. AssetPicker menambah sumber galeri/file/link. Galeri difilter berdasarkan tipe. Elemen status tersembunyi dibatasi main untuk mencegah scrollbar luar ganda.

- R-03/C-4 PASS: seluruh 11 menu pada desktop 1600, mobile 390, tablet 768; profil tidak memiliki scrollbar luar tambahan.
- R-24/R-26/C-2 PASS: tab berpindah route, field Website ID/EN muncul, pilihan galeri mengubah draft dan reload memulihkan data asli.
- R-27/R-32 PASS: picker memiliki label, fokus, busy/disabled, pesan upload gagal, validasi link, dan batas ukuran.
- R-35 PASS: strict/build/HTTP/diff check lulus; video diuji pada database disposable; screenshot QC tersedia.
- R-38/C-5 PASS: data portfolio API tetap identik/revisi 3. Angka dan isi tidak diubah.

Gate lain tetap berlaku untuk arah visual. Catatan pengujian lama hanya bukti versi sebelumnya; hasil QC terkini ada di verification.md.


## Revisi navigasi dan editor setelah review lanjutan

Menu hanya Konten serta Identitas Website/Tema & Tampilan. Media dipilih pada field yang membutuhkannya; copy website tetap tersimpan tanpa menu tersendiri. Tab koleksi berulang dihapus. Panah disclosure memakai Material Symbols, sementara badge/aksi berada dalam summary pada satu alignment flex. Identitas dipisah menurut fungsi foto, browser, dan dokumen. Tema memakai contoh palet, toolbar rata bawah, dan aksi terpisah agar label/panel tidak mendorong tombol ke ketinggian berbeda. ENERGY 1 / RHYTHM 2 / MOTION 1 tetap.

- R-03/C-4 PASS: sembilan menu mobile 390, editor baru tablet 768, dan desktop 1600 diperiksa tanpa overflow.
- R-04/R-31 PASS: panah menandai disclosure; grip/edit/hapus sejajar satu header, alasan layout dicatat di atas.
- R-24/R-26/C-2 PASS: Requirement, edit grup, urutan keyboard, tambah tema, warna, preview, dan reload diuji.
- R-27/R-32 PASS: status aktif/draft, disabled save, label warna/font, panah terbuka, focus dan kontrol native tersedia.
- R-33/R-35 PASS: source Vue/CSS diubah, strict/build/HTTP lulus; screenshot hasil tersedia.
- R-38/C-5 PASS: data API tetap identik/revisi 3; menu yang dihapus tidak menghapus data user.

## Dropdown dan pengalaman — 2026-10-03

Select native tetap mendukung keyboard, dengan chevron SVG 20px pada inset kanan 12px dan padding kanan 44px. Field dan dropdown setinggi 44px; selector bahasa 42px di dalam kontrol berborder 44px. Pengalaman dipisahkan ke Pekerjaan, Magang, Organisasi; ikon work, school, groups tampil pada judul dan kartu termasuk layar ponsel. Tambah mengikuti jenis section; ubah jenis memindahkan tampilan kartu. Pengurutan mempertahankan slot jenis lain dalam array asli.
