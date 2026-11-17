# LP Komi — prototipe portal Diskominfostandi

[Unduh preview ZIP](downloads/Preview-Diskominfostandi.zip?raw=true) — ekstrak lalu buka `Preview-Diskominfostandi.html` di Chrome/Edge. Di GitHub, gunakan tombol **Download raw file** jika unduhan tidak langsung dimulai.

Prototipe dengan kantor Three.js yang mengikuti scroll, sambutan Kadis arsip, profil, lima halaman bidang, layanan, pencarian, agenda kosong, unduhan, survei/buku tamu dan lokasi. Belum berupa tema WordPress.

## Jalankan
Node.js 22.12+ (divalidasi pada 24.22.1), npm.

```sh
cd /workspace/LP_Komi
npm ci
npm run dev -- --port 5173
```

```sh
npm run build
npm run preview
```

`npm ci` menggunakan lockfile. Jika cache home tidak writable, tambahkan `--cache /tmp/komi-npm-cache`.
Tidak memerlukan API key atau koneksi WordPress. Aset renderer dilayani lokal. Tautan eksternal memerlukan internet.

## Struktur
- `docs/PRD.md`: persyaratan dan keputusan pengguna.
- `src/main.js`: UI, routing hash, pencarian dan navigasi.
- `src/data.js`: daftar bidang dan layanan.
- `src/field-content.json`: tupoksi dari REST API publik situs resmi.
- `src/scene.js`: model kantor ilustratif serta kamera scroll.
- `src/style.css`: desktop/mobile, dialog, reduced motion.
- `public/assets`: aset sumber dan render fallback.

Bidang dapat dibuka melalui `#bidang/aplikasi-informatika`, `#bidang/informasi-publik`, `#bidang/komunikasi-publik`, `#bidang/statistik-persandian`, `#bidang/sekretariat`.
`?no3d=1` menonaktifkan WebGL untuk pengujian fallback. Preferensi reduced motion juga memakai fallback. Model hanya dirender saat scroll/resize/perubahan visibilitas, bukan animasi tanpa henti.

## Batas prototipe
Model memakai estimasi dari foto, bukan hasil pemindaian 3D. Tidak ada formulir lokal yang menyimpan data. Berita/formulir/dokumen ditautkan ke layanan lama. Program kerja dan nama pimpinan bidang yang belum terverifikasi tidak diisi secara spekulatif. Foto Kadis dan sambutan berasal dari arsip; bukan bukti pejabat terkini. Screenshot unggahan pengguna belum tersedia sebagai berkas lokal, sehingga logo Kominfo dan ikon Pulpis unggahan belum dipasang. Header memakai logo gabungan situs resmi.

## WordPress tahap berikutnya
Pisahkan konten dari renderer; muat script melalui enqueue tema. Pindahkan hero ke template front-page dan konten lainnya ke template WordPress yang memakai the_content agar Elementor tetap bekerja. Uji Forminator dan formulir lain pada salinan situs. Jangan mengimpor atau mengganti database produksi dari prototipe ini. Lingkungan kerja cloud sudah terisolasi: gunakan checkout yang ada, tidak perlu worktree baru.

## Preview HTML mandiri
Jalankan `npm run build` lalu `python scripts/standalone.py`. Hasil `Preview-Diskominfostandi.html` memuat JavaScript, CSS dan gambar secara inline sehingga dapat diunduh untuk peninjauan tanpa instalasi npm. Tautan layanan eksternal tetap membutuhkan internet. Logo gabungan web lama telah dilepas dari UI; identitas sementara berupa teks sampai PNG asli pengguna tersedia.
