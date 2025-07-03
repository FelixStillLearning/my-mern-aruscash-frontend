# Desain dan Rencana Proyek: Aplikasi Arus Kas (MERN Stack)

Dokumen ini berisi desain fungsional, rencana teknis, dan daftar persiapan untuk membangun aplikasi pencatatan keuangan pribadi.

---

## 1. Desain Fungsional

### 1.1. Konsep Utama & Tujuan
- **Nama Proyek:** ArusKasApp (Sementara)
- **Tujuan Utama:** Memberikan pengguna alat yang sederhana dan intuitif untuk mencatat, mengkategorikan, dan menganalisis pemasukan serta pengeluaran.
- **Value Proposition:** Membantu pengguna memahami kesehatan finansial mereka melalui visualisasi data yang mudah dipahami.

### 1.2. Persona Pengguna
- **Nama:** Pengguna Umum
- **Deskripsi:** Individu (pelajar, pekerja, freelancer) yang ingin lebih sadar akan pengeluarannya.
- **Kebutuhan:**
    - Mencatat transaksi dengan cepat.
    - Melihat ringkasan keuangan (pemasukan, pengeluaran, saldo).
    - Mengetahui kategori pengeluaran terbesar.
    - Menjaga keamanan dan privasi data.

### 1.3. Fitur Utama (Minimum Viable Product)
1.  **Autentikasi Pengguna:**
    - Registrasi (Nama, Email, Password).
    - Login & Logout.
    - Proteksi sesi menggunakan JSON Web Token (JWT).

2.  **Manajemen Transaksi (CRUD):**
    - **Create:** Menambah catatan transaksi (Jenis, Jumlah, Kategori, Tanggal, Deskripsi).
    - **Read:** Melihat daftar semua transaksi dengan filter.
    - **Update:** Mengedit transaksi yang ada.
    - **Delete:** Menghapus transaksi.

3.  **Dashboard & Analitik:**
    - **Ringkasan:** Total pemasukan, pengeluaran, dan saldo bulan ini.
    - **Visualisasi:** Pie chart untuk persentase pengeluaran per kategori.
    - **Daftar Transaksi Terkini:** Menampilkan 5-10 transaksi terakhir.

### 1.4. Stack Teknologi
- **Database:** **MongoDB**
- **Backend:** **Express.js**
- **Frontend:** **React.js**
- **Runtime:** **Node.js**

---

## 2. Persiapan dan Instalasi

Berikut adalah semua yang perlu Anda siapkan sebelum kita mulai coding.

### 2.1. Prasyarat (Software yang Harus Terinstall)
1.  **Node.js dan npm:**
    - Pastikan Node.js (versi 16 atau lebih baru) dan npm sudah terinstall.
    - Cek dengan perintah: `node -v` dan `npm -v`.
2.  **MongoDB:**
    - Anda bisa menginstal MongoDB Community Server di komputer lokal Anda.
    - Alternatif: Gunakan layanan cloud seperti **MongoDB Atlas** (gratis untuk memulai). Ini lebih direkomendasikan agar kita tidak perlu pusing dengan manajemen database.
3.  **Code Editor:**
    - **Visual Studio Code** (sangat direkomendasikan).
4.  **API Client (Opsional, tapi sangat membantu):**
    - **Postman** atau **Insomnia** untuk menguji API yang akan kita buat nanti.

### 2.2. Dependensi Proyek (Paket npm)

Kita akan memiliki dua bagian proyek: `backend` dan `frontend`.

#### **Untuk Backend (Server):**
Paket-paket ini akan diinstal di dalam folder `backend`.
- `express`: Framework utama untuk membangun server.
- `mongoose`: Object Data Modeling (ODM) untuk berinteraksi dengan MongoDB.
- `cors`: Middleware untuk mengizinkan request dari domain lain (frontend kita).
- `dotenv`: Untuk mengelola variabel lingkungan (seperti koneksi database dan secret key).
- `bcryptjs`: Untuk mengenkripsi (hashing) password pengguna.
- `jsonwebtoken`: Untuk membuat dan memverifikasi token sesi (JWT).
- `nodemon` (dev dependency): Untuk me-restart server secara otomatis saat ada perubahan kode.

#### **Untuk Frontend (Client):**
Paket-paket ini akan diinstal di dalam folder `frontend`.
- `axios`: Untuk membuat request HTTP ke API backend.
- `react-router-dom`: Untuk mengatur navigasi dan routing antar halaman.
- `bootstrap` atau `@mui/material`: Untuk styling komponen UI agar terlihat modern dan rapi. Kita bisa pilih salah satu nanti.
- `recharts` atau `chart.js`: Untuk membuat grafik/chart visualisasi data.
