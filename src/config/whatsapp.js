// Konfigurasi WhatsApp dan Generator Pesan Transaksi Jual Beli Marketplace
export const DEFAULT_ADMIN_PHONE = '6285150962928';

// Format nomor HP Indonesia ke format internasional (misal 0812 -> 62812)
export function formatPhoneNumber(phone) {
  if (!phone) return DEFAULT_ADMIN_PHONE;
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  }
  return cleaned.length >= 10 ? cleaned : DEFAULT_ADMIN_PHONE;
}

// Buka WhatsApp URL umum
export function getWhatsAppUrl(customMessage, targetPhone = DEFAULT_ADMIN_PHONE) {
  const phone = formatPhoneNumber(targetPhone);
  const defaultMsg = `Halo Tim Marketplace! Saya tertarik untuk bertanya seputar produk dan transaksi jual beli di platform ini.`;
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${phone}?text=${text}`;
}

// WhatsApp URL untuk beli / tanya 1 produk langsung ke penjual
export function getProductWhatsAppUrl(product, buyerInfo = null) {
  const targetPhone = formatPhoneNumber(product.sellerPhone || DEFAULT_ADMIN_PHONE);
  let msg = `Halo Kak *${product.sellerName || 'Penjual'}*! 👋\n` +
    `Saya melihat produk Anda di *Marketplace Nusantara*:\n\n` +
    `🛍️ *Nama Produk*: ${product.name}\n` +
    `🏷️ *Kategori*: ${product.category?.toUpperCase() || 'UMUM'}\n` +
    `✨ *Kondisi*: ${product.condition || 'Baru'}\n` +
    `💰 *Harga*: Rp ${Number(product.price).toLocaleString('id-ID')}\n` +
    `📍 *Lokasi*: ${product.location || 'Indonesia'}\n\n`;

  if (buyerInfo && buyerInfo.name) {
    msg += `👤 *Data Calon Pembeli*:\n` +
      `- Nama: ${buyerInfo.name}\n` +
      `- Alamat Pengiriman: ${buyerInfo.address || '-'}\n` +
      `- Catatan: ${buyerInfo.notes || '-'}\n\n`;
  }

  msg += `Apakah produk ini masih tersedia (ready stock)? Mohon info detail pembayaran & pengirimannya ya kak. Terima kasih! 🙏`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
}

// WhatsApp URL untuk checkout seluruh isi keranjang belanja
export function getCartCheckoutWhatsAppUrl(cartItems, totalPrice, buyerInfo = {}) {
  const targetPhone = DEFAULT_ADMIN_PHONE;
  
  let msg = `🛒 *PESANAN BARU DARI KERANJANG MARKETPLACE*\n` +
    `========================================\n\n`;

  if (buyerInfo.name) {
    msg += `👤 *Data Pembeli*:\n` +
      `• *Nama*: ${buyerInfo.name}\n` +
      `• *No. HP/WA*: ${buyerInfo.phone || '-'}\n` +
      `• *Alamat Pengiriman*: ${buyerInfo.address || '-'}\n` +
      `• *Catatan Tambahan*: ${buyerInfo.notes || '-'}\n\n` +
      `----------------------------------------\n`;
  }

  msg += `📦 *Daftar Produk Pesanan*:\n`;
  
  cartItems.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    msg += `${index + 1}. *${item.name}*\n` +
      `   └ Jumlah: ${item.quantity} pcs x Rp ${Number(item.price).toLocaleString('id-ID')}\n` +
      `   └ Penjual: ${item.sellerName || 'Official'} (${item.location || '-'})\n` +
      `   └ Subtotal: Rp ${itemSubtotal.toLocaleString('id-ID')}\n\n`;
  });

  msg += `----------------------------------------\n` +
    `💰 *TOTAL KESELURUHAN*: *Rp ${Number(totalPrice).toLocaleString('id-ID')}*\n\n` +
    `Mohon sistem / admin segera memproses ketersediaan barang dan mengirimkan rincian pembayaran (QRIS/Transfer Bank). Terima kasih! 🙏✨`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
}
