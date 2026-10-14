# Font portfolio

Turunan dari font asli yang tetap disimpan di `public/fonts`. Lisensi Geist: `public/fonts/natural/OFL.txt`; Jakarta: `public/fonts/cms/Plus-Jakarta-Sans-OFL.txt`; Material Symbols: `public/fonts/cms/Material-Symbols-LICENSE.txt`.

`geist-latin.woff2` mempertahankan bobot 400-900 yang digunakan UI. Font teks mencakup ASCII, spasi non-breaking, copyright, titik tengah, dan tanda baca U+2000-206F. Karakter lain memakai fallback browser. Semua karakter konten CMS ID/EN saat pengujian tetap tersedia.

`symbols.woff2` berisi glyph pada `docs/performance/symbols.txt`. Tambahkan glyph ke manifest dan buat ulang subset ketika menambahkan ikon baru.

Regenerasi dengan FontTools + Brotli (alat pengolahan aset saja, bukan dependency aplikasi):

```powershell
python -m fontTools.subset public/fonts/cms/stitch-9.ttf --glyphs-file=docs/performance/symbols.txt --unicodes=U+0020-007F --no-layout-closure --flavor=woff2 --output-file=src/assets/fonts/symbols.woff2
python -m fontTools.subset public/fonts/cms/stitch-8.ttf --unicodes=U+0020-007F,U+00A0,U+00A9,U+00B7,U+2000-206F --flavor=woff2 --output-file=src/assets/fonts/jakarta-700.woff2
python -m fontTools.subset public/fonts/natural/Geist-latin.woff2 --unicodes=U+0020-007F,U+00A0,U+00A9,U+00B7,U+2000-206F --flavor=woff2 --output-file=src/assets/fonts/geist-latin.woff2
python -m fontTools.varLib.instancer src/assets/fonts/geist-latin.woff2 wght=400:900 --output=src/assets/fonts/geist-latin.woff2
```
