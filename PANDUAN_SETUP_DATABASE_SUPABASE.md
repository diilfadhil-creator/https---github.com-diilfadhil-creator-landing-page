# 🚀 PANDUAN LENGKAP: MENGHUBUNGKAN CLOUD DATABASE SUPABASE (100% GRATIS)

Panduan ini menjelaskan langkah demi langkah cara mengaktifkan **Cloud Database Supabase** agar **siapa saja di internet bisa mengunggah produk dan langsung muncul di layar semua pengunjung secara realtime**.

---

## ⚡ LANGKAH 1: Buat Akun & Project Supabase (Gratis)

1. Buka website resmi Supabase: **[https://supabase.com](https://supabase.com)**
2. Klik tombol **"Start your project"** atau **"Sign In"** (bisa login menggunakan akun GitHub / Email).
3. Klik **"New project"**.
4. Isi data:
   - **Name**: `nusantara-marketplace` (atau nama pilihan Anda)
   - **Database Password**: Buat password yang kuat (simpan di catatan Anda)
   - **Region**: Pilih yang terdekat, contoh: `Singapore (ap-southeast-1)`
   - **Pricing Plan**: Pilih **Free Plan ($0/month)**
5. Klik **"Create new project"** dan tunggu sekitar 1-2 menit hingga proses inisialisasi selesai.

---

## 💾 LANGKAH 2: Buat Tabel Produk (1x Klik Script SQL)

1. Di dashboard project Supabase Anda, klik menu **"SQL Editor"** (ikon `>_` di sidebar kiri).
2. Klik tombol **"New query"**.
3. Buka file **[`supabase-schema.sql`](./supabase-schema.sql)** yang ada di folder proyek ini.
4. Salin (*copy*) seluruh isi file tersebut, lalu tempel (*paste*) ke dalam kotak SQL Editor Supabase.
5. Klik tombol hijau **"Run"** (atau tekan `Ctrl + Enter` / `Cmd + Enter`).
6. Tunggu hingga muncul pesan **"Success. No rows returned"**.
   *(Tabel `products`, hak akses publik, dan produk default sudah otomatis terbuat!)*

---

## 🔑 LANGKAH 3: Ambil Kunci API (Project URL & Anon Key)

1. Di dashboard Supabase Anda, klik ikon **"Project Settings"** (ikon gerigi ⚙️ di pojok kiri bawah).
2. Pilih submenu **"API"** (atau "Data API").
3. Cari 2 informasi berikut:
   - **Project URL**: Contoh: `https://xyzcompany.supabase.co`
   - **Project API Keys (anon / public)**: Contoh string panjang `eyJhbGciOi...`

---

## ⚙️ LANGKAH 4: Masukkan Kunci ke Website

1. Di folder proyek ini, buat/buka file bernama **`.env`** (atau salin dari `.env.example`).
2. Masukkan URL dan Anon Key Anda seperti berikut:
   ```env
   VITE_SUPABASE_URL=https://proyek-anda.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbgciOi...kunci-anon-anda...
   ```
3. Simpan file `.env`.
4. Restart dev server (jika sedang berjalan) dengan menjalankan kembali:
   ```bash
   npm run dev
   ```

---

## ✨ Fitur yang Otomatis Aktif Setelah Terhubung:
1. **Multi-Seller Live**: Siapapun yang mengunggah produk dari HP/komputer di manapun akan langsung tersimpan di Cloud Database Supabase.
2. **Realtime Catalog**: Jika ada orang lain mengunggah produk, produk tersebut langsung muncul di etalase Anda tanpa perlu me-refresh halaman!
3. **Pemesanan WhatsApp Langsung**: Pembeli dapat langsung memesan ke nomor WhatsApp yang dimasukkan oleh penjual tersebut.
4. **Resilient Offline Fallback**: Jika internet mati atau database belum dikonfigurasi, website tetap aman dan berjalan normal menggunakan mode penyimpanan lokal.
