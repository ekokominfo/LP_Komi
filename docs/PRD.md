# PRD — Diskominfostandi Pulang Pisau
Versi 0.1 · 17 November 2026 · Prototipe sebelum integrasi WordPress

## 1. Tujuan dan pengguna
Website memperkenalkan dinas, menyediakan informasi dan berita, serta memudahkan akses layanan. Pengguna: masyarakat dan ASN/perangkat daerah. Semua tujuan masuk ruang lingkup; prioritas kuantitatif dan indikator keberhasilan belum ditentukan.

## 2. Keputusan yang disepakati
- Prototipe visual terlebih dahulu; integrasi tema WordPress setelah desain disepakati.
- Kantor 3D semi-realistis, bentuk mengacu pada foto depan/samping/belakang dan screenshot udara dari pengguna. Ukuran merupakan perkiraan, bukan rekonstruksi arsitektural terukur.
- Scroll: halaman depan → mendekati teras → melewati pintu → sambutan Kadis → profil → bidang → layanan → informasi.
- Menu dapat langsung diakses tanpa menyelesaikan animasi. Scroll tidak dikunci.
- Elementor kelak mengedit teks, gambar, tombol dan isi halaman; bentuk 3D dan lintasan kamera tetap pada versi pertama.
- Tidak ada halaman Galeri.
- Data lama digunakan untuk prototipe; pejabat dan data bertanggal harus diverifikasi sebelum publikasi.
- Deployment, domain/hosting, jadwal peluncuran dan KPI ditunda.

## 3. Navigasi dan konten
Beranda, Profil, Bidang, Layanan, Berita & Pengumuman, Informasi Publik, Kontak.
Halaman bidang, berurutan:
1. Aplikasi Informatika
2. Pengelolaan Informasi Publik
3. Layanan Komunikasi Publik
4. Statistik dan Persandian
5. Sekretariat (terakhir)
Setiap halaman menyediakan tugas dan fungsi, kepala/pimpinan bidang, program kerja, dan layanan. Jangan mengarang nama pejabat, program, atau tupoksi yang belum tersedia. Tautkan sumber atau tampilkan status belum tersedia.

## 4. Fitur
| Fitur | Prototipe | Integrasi WordPress berikutnya |
|---|---|---|
| Kantor 3D | Three.js lokal, kamera dipandu scroll, tombol lewati | Aset tema dimuat hanya pada halaman yang membutuhkan |
| Sambutan | Ringkasan arsip Juli 2023 + foto sumber | Konten dapat diedit |
| Bidang | Halaman detail dengan routing hash, sumber dan status data | Templat halaman + field terstruktur |
| Pencarian | Konten lokal, hasil dapat dinavigasi, keadaan kosong | Pencarian konten publik WordPress |
| Agenda | Keadaan kosong yang jujur | Entri agenda, tanggal dan lokasi |
| Unduhan | Tautan halaman dokumen sumber | Media Library, kategori dokumen |
| Survei & buku tamu | Tautan situs lama | Pakai formulir yang ada setelah audit; Forminator aktif |
| Peta | Tautan pencarian lokasi dengan alamat kantor | Titik lokasi dikonfirmasi sebelum embed |
| Berita | Tautan berita sumber, tanpa artikel fiktif | Post WordPress dan kategori |

## 5. Visual dan aksesibilitas
Palet biru tua/biru muda, putih hangat, aksen kuning. Logo resmi tidak diubah proporsi atau warnanya. Motif Pulpis sebagai aksen ketika berkas asli tersedia. Model kantor bersifat ilustrasi, bukan foto kondisi aktual. Tipografi jelas, kontras memadai, fokus keyboard terlihat, label tombol, skip link, menu mobile dan pencarian bisa ditutup dengan Escape. Hormati prefers-reduced-motion; sediakan fallback gambar jika WebGL gagal atau dinonaktifkan. Di mobile kurangi pixel ratio dan bayangan. Navigasi tidak tergantung pada canvas.

## 6. Sumber dan kualitas data
Sumber: https://diskominfostandi.pulangpisaukab.go.id/ . Hasil pembacaan sembilan halaman ada di /workspace/kominfo-reference.
Nama: Dinas Komunikasi dan Informatika, Statistik dan Persandian Kabupaten Pulang Pisau.
Alamat: Jl. Trans Kalimantan Km. 88, Kelurahan Bereng, Kecamatan Kahayan Hilir, Kabupaten Pulang Pisau.
Email: diskominfostandi@pulangpisaukab.go.id.
Sambutan Moh. Insyafi, SE., MAP bertanggal Juli 2023: tandai sebagai arsip, tidak menjamin pejabat terkini.
Nomor telepon sumber placeholder: jangan tampilkan. Tahun statistik BTS tidak tersedia: tidak ditampilkan sebagai statistik terkini. Menu bidang dan jabatan pegawai tidak sepenuhnya cocok: konfirmasi sebelum publikasi. Halaman berita tidak menghasilkan artikel dalam ekstraksi awal: jangan membuat berita contoh yang tampak nyata.
Foto dan logo dari pengguna tersedia sebagai referensi percakapan, tetapi berkas asli belum ditemukan di filesystem prototipe. Gunakan aset publik situs resmi yang dapat diunduh, catat asalnya. Jangan menggambar ulang lambang sebagai pengganti yang seolah resmi.

## 7. Arsitektur
Prototipe Vite + JavaScript modular + Three.js. Pisahkan data, antarmuka dan scene agar dapat dipindah ke tema. Build tidak membutuhkan API key. Konten situs publik tetap bisa diakses jika WebGL gagal.
WordPress fase berikutnya: tema ZIP, template front-page/single/page/archive/search; wp_enqueue_script/style; the_content untuk Elementor; nav menu, custom logo, thumbnail. Hindari memindahkan HTML lama secara buta. Jika agenda/bidang memerlukan custom post type, registrasi dalam plugin pendamping agar data tidak bergantung tema. Forminator/Bit Form dan plugin lain perlu diinventarisasi, tidak diasumsikan semua formulir memakai satu plugin. Tidak mengubah database produksi.

## 8. Kriteria penerimaan prototipe
- Build berhasil; semua navigasi lokal dan lima halaman bidang dapat dibuka.
- Kamera berubah saat scroll, masuk melalui teras/pintu, lalu sambutan tampil pertama.
- Pencarian menemukan layanan/bidang dan menampilkan keadaan tanpa hasil.
- Mobile tidak overflow horizontal; menu dapat digunakan lewat keyboard.
- Reduced motion dan kegagalan WebGL menampilkan fallback; konten tetap tersedia.
- Tautan layanan, dokumen, survei, buku tamu dan peta memiliki tujuan nyata.
- Tidak ada tanggal agenda, artikel, nama pimpinan atau program fiktif.
- Source WordPress dan form tidak dimutasi oleh pengujian.

## 9. Tahapan dan hal yang masih terbuka
A: PRD dan prototipe (saat ini). B: revisi visual pengguna. C: audit salinan WordPress/PHP/plugin, impor konten dan integrasi tema. D: pengujian staging, validasi pejabat/kontak/tupoksi, kinerja perangkat nyata dan publikasi terpisah.
Belum ditentukan: hosting, domain, target waktu, KPI, titik peta pasti, versi WordPress/PHP, workflow persetujuan konten, plugin formulir per halaman, berkas asli lambang/ikon Pulpis dan foto unggahan, detail program kerja terbaru.

## Catatan implementasi v0.1
Tupoksi kelima bidang berhasil diambil dari endpoint publik WordPress dan disimpan di src/field-content.json. Fallback menggunakan render statis model kantor karena foto bangunan unggahan belum tersedia sebagai file lokal. Program kerja serta pimpinan bidang masih perlu verifikasi. Beranda menggunakan logo gabungan dan potret Kadis dari situs sumber.
