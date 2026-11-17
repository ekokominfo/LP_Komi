# Validasi prototipe — 17 November 2026

- `npm run build`: lulus, Vite 7.1.12. Peringatan: bundle renderer sekitar 533 kB (140 kB gzip); pemisahan/lazy loading Three.js menjadi optimasi fase berikutnya.
- Chromium headless, Playwright, viewport 1440×1000 dan 390×844.
- Scene WebGL aktif, nilai progress kamera berubah setelah scroll: lulus.
- Pencarian email, keadaan tanpa hasil, penutupan dialog dengan Escape: lulus. Bug Escape pada input search ditemukan dan diperbaiki.
- Lima route detail bidang, masing-masing memuat tugas dan fungsi sumber: lulus.
- Fallback `?no3d=1`, preferensi reduced motion: lulus.
- Menu mobile buka/tutup dan tautan layanan: lulus; tidak ada overflow horizontal.
- Tidak ada error JavaScript pada alur yang diuji.
- Screenshot desktop, pintu masuk, sambutan dan mobile ada di `artifacts/` (diabaikan Git).

Belum diuji: WordPress/Elementor, database lama, pengiriman formulir eksternal, perangkat mobile fisik, performa GPU perangkat rendah, ketepatan titik peta, dan semua tujuan eksternal. Peta adalah tautan pencarian alamat, bukan koordinat terverifikasi. Tidak ada formulir yang dikirim selama pengujian.
