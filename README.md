# 📋 DailyBoard

DailyBoard adalah web sederhana untuk membantu mengatur tugas, membuat catatan, melihat quotes harian, dan mengetahui cuaca. Project ini dibuat menggunakan HTML, CSS, dan JavaScript dengan konsep modular menggunakan ES Module.

---

## ✨ Fitur

### 📝 Manajemen Tugas

DailyBoard memiliki fitur untuk mengelola tugas sehari-hari.

Fitur yang tersedia:

- Menambahkan tugas baru
- Menghapus tugas
- Mengedit tugas
- Menandai tugas sebagai selesai
- Menampilkan tugas yang sudah selesai
- Menampilkan tugas yang belum selesai
- Menampilkan semua tugas
- Mencari tugas menggunakan search bar
- Drag and drop untuk mengatur posisi tugas
- Penyimpanan tugas menggunakan `localStorage`
- Tugas tetap tersimpan setelah halaman di-refresh

### 📒 Catatan

Digunakan untuk menyimpan catatan singkat.

Fitur:

- Menambahkan catatan
- Menghapus catatan
- Mengedit catatan dengan double click
- Menampilkan tanggal pembuatan catatan
- Penyimpanan menggunakan `localStorage`
- Catatan tetap tersedia setelah halaman di-refresh
- Tampilan catatan menggunakan beberapa kolom

### 💬 Quotes Harian

DailyBoard dapat mengambil quotes secara otomatis dari API.

Fitur:

- Mengambil quotes secara online
- Menampilkan quotes secara otomatis ketika halaman dimuat
- Tombol untuk mendapatkan quotes baru
- Menampilkan pesan ketika API gagal digunakan

### 🌤️ Cuaca

DailyBoard dapat menampilkan informasi cuaca menggunakan OpenWeatherMap API.

Fitur:

- Memilih kota secara manual
- Menampilkan temperatur
- Menampilkan kondisi cuaca
- Cuaca default dapat dimuat ketika halaman dibuka
- Data diambil secara langsung dari API

### 🌙 Dark Mode

DailyBoard memiliki mode gelap.

Fitur:

- Mengubah tampilan dari Light Mode ke Dark Mode
- Pengaturan tema disimpan di `localStorage`
- Tema tetap digunakan setelah halaman di-refresh

### 💾 Local Storage

Data penting disimpan menggunakan browser `localStorage`.

Data yang disimpan:

- Daftar tugas
- Daftar catatan
- Tema website

Dengan demikian, data tidak langsung hilang ketika browser di-refresh.

---

# 📁 Struktur Project

Contoh struktur file DailyBoard:

```text
DailyBoard/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── script.js
│   ├── tugas.js
│   ├── catatan.js
│   ├── api.js
│   └── storage.js
│
└── README.md