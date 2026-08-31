# 🤖 PANDUAN LENGKAP: AKTIVASI MESIN BOT PENJAWAB OTOMATIS WHATSAPP (085150962928)

Panduan ini berisi cara agar **setiap orang yang memesan lewat WhatsApp langsung dijawab oleh mesin/bot otomatis secara instan**.

---

## 🎯 METODE 1: PALING MUDAH & GRATIS (Aplikasi WhatsApp Business di HP)
*Sangat disarankan karena tidak perlu coding, gratis resmi dari WhatsApp, dan berjalan 24 jam di HP Anda.*

### Langkah-langkah:
1. Pasang aplikasi **WhatsApp Business** di HP Anda (download gratis di Play Store / App Store).
2. Daftarkan nomor Anda: **085150962928**.
3. Buka **Setelan (Settings)** -> **Fitur Bisnis (Business Tools)**.
4. **Aktifkan "Pesan Salam" (Greeting Message)**:
   - Nyalakan *Kirim pesan salam*.
   - Salin dan tempel (copy-paste) teks dari file `template-autoreply-wa-business.txt` bagian **1. PESAN SALAM OTOMATIS**.
   - Klik **Simpan**.
5. **Aktifkan "Balas Cepat" (Quick Replies)**:
   - Tambahkan shortcut `/menu` untuk daftar menu.
   - Tambahkan shortcut `/pesan` untuk konfirmasi pesanan & rekening pembayaran.
   - Tambahkan shortcut `/voucher` untuk kode promo LAPAR10K.

Setiap kali ada customer yang mengklik tombol WhatsApp dari website landing page, **WhatsApp Business Anda akan langsung membalas otomatis dalam hitungan detik!**

---

## 🚀 METODE 2: APLIKASI AUTORESPONDER BOT (Android)
Jika Anda ingin bot membalas secara otomatis berdasarkan kata kunci (contoh: jika chat berisi kata `BOT_ORDER_PAKET`, `menu`, `promo`, maka bot otomatis membalas sesuai data pesanan):

1. Download aplikasi **AutoResponder for WA** di Google Play Store.
2. Berikan izin notifikasi.
3. Buat Aturan Baru (*Rule*):
   - **Pesan yang diterima**: Berisi kata kunci `BOT_ORDER_PAKET` atau `BOT_PESAN_MENU` atau `*` (semua pesan).
   - **Pesan balasan**: Masukkan template balasan pesanan otomatis & rekening pembayaran.
4. Klik Simpan. Bot akan berjalan otomatis di background HP Anda.

---

## 💻 METODE 3: SCRIPT SERVER NODE.JS BOT OTOMATIS (`bot.js`)
Jika Anda ingin menjalankan mesin bot berbasis server/komputer menggunakan script `bot.js` yang telah kami sediakan:

1. Buka Command Prompt / PowerShell di komputer.
2. Masuk ke folder bot:
   ```bash
   cd "c:\landing page\bot-whatsapp"
   ```
3. Install modul pendukung:
   ```bash
   npm install @whiskeysockets/baileys qrcode-terminal
   ```
4. Jalankan script mesin bot:
   ```bash
   node bot.js
   ```
5. Scan QR Code yang muncul di layar terminal menggunakan fitur **Perangkat Tertaut (Linked Devices)** di WhatsApp HP Anda.
6. Mesin bot sekarang aktif 100% dan akan otomatis membalas semua chat dan pesanan masuk tanpa perlu Anda sentuh!

---

## 🌐 ASISTEN BOT VIRTUAL DI WEBSITE (SUDAH AKTIF LIVE)
Website Anda juga telah dilengkapi dengan **Mesin Bot Penjawab Virtual (Delicio Bot 🤖)** di pojok kanan bawah:
- Pengunjung dapat menanyakan menu, harga, status waktu kirim, dan klaim diskon secara instan.
- Dapat diuji coba sekarang di: **[http://localhost:5173/](http://localhost:5173/)**
