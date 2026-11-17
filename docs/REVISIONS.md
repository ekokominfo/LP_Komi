# Daftar revisi pengguna

## Diterapkan
- Tema disesuaikan dengan logo Kominfo: biru #2c6baa, biru muda #4ca9d7, kuning #e7bd42 dan marun #842921. Nilai warna perkiraan visual dari gambar chat.
- Latar hijau/olive UI diganti putih-biru. Warna bangunan, atap dan pepohonan tetap mengikuti foto kantor.
- Logo web lama tidak dipakai oleh UI.

## Menunggu berkas aset asli
- Logo Kominfo + lambang Kabupaten Pulang Pisau untuk header.
- Ikon Pulpis untuk elemen visual beranda.
- Gambar chat terlihat, tetapi tidak memiliki path/ID unduhan yang tersedia untuk tools. Jangan mengganti dengan gambar dari web lama atau menggambar ulang lambang seolah asli.
- Berkas dapat ditambahkan melalui GitHub ke public/assets/kominfo.png, public/assets/pulang-pisau.png, public/assets/ikon-pulpis.png. Integrasi UI dilakukan setelah file tersedia dan diperiksa.

## Revisi lain yang masih terbuka
- Menu tersembunyi pada awal masuk; waktu kemunculannya belum diputuskan pengguna.
- Efek 3D dilaporkan tidak berjalan oleh pengguna. Belum diketahui perangkat/browser dan apakah objek tampil statis atau tidak muncul. Tes Chromium lingkungan sebelumnya lolos; itu tidak membuktikan perangkat pengguna bekerja. Masih perlu diagnosis, bukan dianggap selesai.

## Implementasi lanjutan
- Header tersembunyi pada awal perjalanan dan tampil ketika sambutan masuk viewport.
- Kamera maju/mundur mengikuti scroll; uji browser lulus. Masalah khusus perangkat pengguna belum direproduksi.
- Cahaya teras hangat dengan denyut halus, cahaya biru, halo sprite ringan. Bukan salinan renderer Kage atau bloom postprocessing penuh.
- Perbaikan teardown material array agar perubahan reduced-motion tidak memicu error.
- Ikon panah utama menggunakan SVG.
- Workflow GitHub Pages disiapkan. Aktivasi melalui API ditolak 403 Resource not accessible by integration. Pengguna perlu memilih Settings → Pages → Source: GitHub Actions.
- PNG asli Kominfo/Pulpis belum tersedia sebagai file; integrasi aset tertunda.

## Mode malam dan loading
- Bangunan tambahan kanan-kiri dihapus dari model.
- Header tanpa kotak biru, nama dinas tetap tampil; pemasangan logo asli masih terblokir ketiadaan file unggahan.
- Tombol mode malam/siang tersedia sejak beranda. Lampu dan jendela menghangat, kunang-kunang bergerak hanya saat malam. Desktop 55 sprite, mobile 24.
- Cahaya biru bergerak di halaman, kamera tetap ditentukan scroll.
- Loading mengikuti tahap modul/scene/frame siap (indikator tahap, bukan ukuran unduhan byte), lalu fade out. Fallback juga menutup loader.
- Logo papan kantor dan ikon Pulpis belum terpasang: file yang tersedia masih hanya logo lama yang tidak boleh dipakai pengguna.
