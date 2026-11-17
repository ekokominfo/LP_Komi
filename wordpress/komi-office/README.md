# Komi Office 1.0.0

Tema WordPress untuk portal Diskominfostandi Kabupaten Pulang Pisau.

## Instalasi
1. Cadangkan situs/database melalui UpdraftPlus atau hosting, lalu uji di staging terlebih dahulu.
2. Tampilan → Tema → Tambah Tema → Unggah Tema. Pilih `komi-office-wordpress.zip`, instal, aktifkan.
3. Beranda memakai landing page kantor 3D otomatis. Pos, halaman, media, dan formulir yang sudah ada tetap tersimpan.
4. Tampilan → Sesuaikan → **Komi: Konten beranda**: pilih halaman sambutan, profil, layanan, dokumen, survei/buku tamu, kontak, dan masing-masing bidang. Pilih kategori berita dan agenda, serta foto Kadis.
5. Tampilan → Menu: tetapkan menu ke **Navigasi utama**. Gunakan tautan beranda `/#profil`, `/#bidang`, `/#layanan`, `/#informasi`, `/#kontak` (tambahkan subfolder bila WordPress dipasang di subfolder). Menu default sudah menyesuaikan alamat instalasi.

## Menggunakan database yang sudah ada
- Halaman dengan slug `sambutan-kepala-dinas`, `tentang-kami`, `bidang-aplikasi-informatika`, `bidang-pengelolaan-informasi-publik`, `bidang-layanan-komunikasi-publik`, `bidang-statistik-dan-persandian`, `bagian-sekretariat` otomatis dikenali. Pilihan Customizer mengalahkan deteksi slug.
- Isi bidang (tugas/fungsi, pimpinan, program kerja, layanan) dikelola di halaman bidang masing-masing, melalui editor blok atau Elementor.
- Berita mengambil pos WordPress terbaru. Agenda mengambil pos dari kategori yang dipilih; gunakan judul/isi pos untuk tanggal kegiatan (tanggal kecil kartu adalah tanggal publikasi).
- Forminator/Bit Form: masukkan shortcode formulir yang sudah ada ke halaman survei/buku tamu, lalu pilih halaman tersebut di Customizer. Pengiriman dan penyimpanan data ditangani plugin formulir.
- Peta: masukkan blok sematan peta dan alamat ke halaman kontak.
- Tidak ada impor, penghapusan, atau migrasi otomatis pada database. Bila halaman belum dipilih/ditemukan, tampil contoh arsip prototype. Periksa tautan default sebelum dipakai publik.
- Foto default adalah arsip Moh. Insyafi dari situs lama; ganti jika kepemimpinan sudah berubah.

## Elementor
Tema ini adalah tema WordPress PHP, bukan Elementor Template Kit. Halaman biasa memakai `the_content()` sehingga dapat diedit dengan Elementor. Isi halaman yang dipilih untuk beranda ditampilkan melalui filter konten WordPress. Animasi kantor dan tata letak luar beranda dikelola tema, bukan widget drag-and-drop. Hindari template Elementor Canvas untuk halaman yang membutuhkan header/footer tema. Kompatibilitas dengan setiap versi/plugin Elementor perlu diuji di situs staging.

## Animasi dan aksesibilitas
Kantor 3D mengikuti scroll, mode malam menyalakan kunang-kunang. Tanpa WebGL atau dengan reduced motion, gambar pengganti digunakan. Konten halaman tersedia dari PHP bahkan tanpa JavaScript. Loading screen memiliki batas waktu agar tidak memblokir isi selamanya.

## Pengembangan
Di root repo: `npm ci` lalu `bash scripts/build-wordpress.sh`. Paket ZIP ada di `downloads/`. Ubah sumber `wordpress/office.js`, PHP/CSS tema, atau `src/scene.js`; jangan mengedit bundle `assets/office.js` langsung. Tema tidak membutuhkan Node.js di hosting. Kebutuhan: WordPress 6.2+, PHP 7.4+; disarankan versi WordPress/PHP yang masih didukung.

Three.js disertakan di bundle, lisensi MIT ada di THREE-LICENSE.txt. Foto/logo milik sumber dan pemilik masing-masing.
