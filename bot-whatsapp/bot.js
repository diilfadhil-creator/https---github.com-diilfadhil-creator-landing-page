/**
 * SCRIPT MESIN BOT PENJAWAB OTOMATIS WHATSAPP (DELICIO BOT)
 * Nomor WhatsApp: 085150962928
 * 
 * Cara Menjalankan:
 * 1. Buka terminal di folder: c:\landing page\bot-whatsapp
 * 2. Jalankan perintah: npm install @whiskeysockets/baileys qrcode-terminal
 * 3. Jalankan: node bot.js
 * 4. Scan QR Code yang muncul di layar menggunakan WhatsApp di HP Anda (Perangkat Tertaut).
 */

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');

async function startWhatsAppBot() {
  console.log('🤖 Menginisialisasi Mesin Bot Penjawab WhatsApp Dapur Delicio...');
  const { state, saveCreds } = await useMultiFileAuthState('session_auth_delicio');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      console.log('📷 Silakan Scan QR Code berikut dengan WhatsApp di HP Anda:');
      qrcode.generate(qr, { small: true });
    }
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('Koneksi terputus. Mencoba menghubungkan kembali...', shouldReconnect);
      if (shouldReconnect) startWhatsAppBot();
    } else if (connection === 'open') {
      console.log('✅ MESIN BOT WHATSAPP AKTIF! Siap menjawab seluruh pesanan secara otomatis 24/7.');
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const incomingText = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').trim();
    const senderName = msg.pushName || 'Pelanggan Setia';

    console.log(`📩 Pesan masuk dari ${senderName} (${from}): ${incomingText}`);

    // 1. DETEKSI PESANAN DARI WEBSITE (BOT_ORDER_PAKET / BOT_PESAN_MENU / BOT_ORDER_CUSTOM)
    if (incomingText.includes('BOT_ORDER_PAKET') || incomingText.includes('BOT_PESAN_MENU') || incomingText.includes('BOT_ORDER_CUSTOM')) {
      const orderReply = `Halo Kak *${senderName}*! 👋🤖\n` +
        `Terima kasih sudah memesan melalui website *Dapur Delicio*!\n\n` +
        `✅ *PESANAN ANDA TELAH DIVERIFIKASI SISTEM:*\n` +
        `• Status Dapur: *Sedang Dimasak (Fresh-to-Order)*\n` +
        `• Estimasi Matang: *12 - 15 Menit*\n` +
        `• Estimasi Sampai: *25 - 30 Menit (Kurir Instan)*\n\n` +
        `💳 *METODE PEMBAYARAN:*\n` +
        `1. *QRIS All Payment* (GoPay, OVO, ShopeePay, Dana, BCA)\n` +
        `2. *Transfer Bank BCA*: \`1234567890\` a/n Dapur Delicio\n\n` +
        `Silakan transfer sesuai total tagihan dan kirimkan bukti transfer ke sini ya. Dapur kami langsung menyiapkan hidangan Anda! 🍗🛵💨`;

      await sock.sendMessage(from, { text: orderReply });
      return;
    }

    // 2. DETEKSI PERMINTAAN MENU
    if (incomingText.toLowerCase().includes('menu') || incomingText === '1') {
      const menuReply = `📋 *DAFTAR MENU FAVORIT DAPUR DELICIO:*\n\n` +
        `🍗 *HIDANGAN UTAMA:*\n` +
        `1. Nasi Rempah Ayam Bakar Madu - Rp 38.000\n` +
        `2. Gourmet Double Smoked Cheeseburger - Rp 45.000\n` +
        `3. Nasi Sambal Cumi Rempah Nusantara - Rp 35.000\n\n` +
        `📦 *PAKET PROMO HEMAT:*\n` +
        `• *Solo Feast (1 Orang)*: Rp 35.000\n` +
        `• *Couple Combo (2 Orang)*: Rp 68.000 🔥\n` +
        `• *Family Feast (4-5 Orang)*: Rp 125.000 (Free Ongkir)\n\n` +
        `🍹 *MINUMAN SEGAR:*\n` +
        `• Red Velvet Cream Cheese - Rp 24.000\n` +
        `• Es Teh Manis Segar - Rp 8.000\n\n` +
        `Ketik format: *PESAN [Nama Menu] [Jumlah Porsi]* untuk order! 😋`;

      await sock.sendMessage(from, { text: menuReply });
      return;
    }

    // 3. DETEKSI KLAIM PROMO VOUCHER
    if (incomingText.toLowerCase().includes('promo') || incomingText.toLowerCase().includes('voucher') || incomingText === '2') {
      const promoReply = `🎉 *SELAMAT! KODE VOUCHER ANDA:*\n\n` +
        `🏷️ Kode: *LAPAR10K*\n` +
        `💰 Potongan: *Rp 10.000*\n` +
        `🚚 Bonus: *Gratis Ongkir s/d 5 KM*\n\n` +
        `Gunakan kode ini saat melakukan pemesanan untuk langsung mendapatkan potongan harga! 🥳`;

      await sock.sendMessage(from, { text: promoReply });
      return;
    }

    // 4. BALASAN DEFAULT (GREETING UMUM)
    const defaultReply = `Halo Kak *${senderName}*! 👋🤖\n` +
      `Selamat datang di layanan WhatsApp Otomatis *Dapur Delicio* (085150962928).\n\n` +
      `Silakan ketik pilihan Anda:\n` +
      `1️⃣ Ketik *MENU* untuk melihat daftar menu & harga\n` +
      `2️⃣ Ketik *PROMO* untuk klaim diskon Rp 10.000\n` +
      `3️⃣ Ketik *PESAN* untuk memesan makanan\n` +
      `4️⃣ Ketik *ADMIN* untuk berbicara dengan tim dapur\n\n` +
      `Dapur kami buka setiap hari: 09:00 - 22:00 WIB. 🍗😋`;

    await sock.sendMessage(from, { text: defaultReply });
  });
}

startWhatsAppBot();
