import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Bagaimana cara saya mengunggah dan menjual produk di Marketplace?',
      a: 'Sangat mudah! Cukup klik tombol "+ Jual Produk" di navigasi atas atau banner, unggah foto barang dari HP/komputer Anda, lengkapi nama produk, kategori, harga jual, dan nomor WhatsApp Anda. Setelah klik "Publikasikan", produk Anda langsung tayang di katalog seketika.'
    },
    {
      q: 'Apakah ada biaya pendaftaran atau potongan komisi admin saat barang laku?',
      a: 'Sama sekali TIDAK ADA (100% GRATIS & 0% Potongan Komisi). Seluruh uang hasil penjualan masuk utuh langsung ke rekening atau e-wallet Anda tanpa potongan sepeser pun.'
    },
    {
      q: 'Bagaimana cara pembeli memesan dan menghubungi saya?',
      a: 'Ketika calon pembeli tertarik dengan produk Anda di katalog, mereka cukup menekan tombol "Beli via WhatsApp". Sistem kami akan secara otomatis membuatkan template format pesan berisi nama produk, harga, dan rincian yang langsung terkirim ke nomor WhatsApp Anda.'
    },
    {
      q: 'Jenis produk apa saja yang diperbolehkan untuk dijual?',
      a: 'Anda bebas menjual segala jenis produk yang legal di Indonesia, baik kondisi baru (BNIB/produksi sendiri) maupun bekas berkualitas. Mulai dari gadget & komputer, busana & sneakers, kuliner & makanan siap antar, perlengkapan otomotif, kamera, buku hobi, hingga perabotan rumah tangga.'
    },
    {
      q: 'Bagaimana metode pembayaran dan pengiriman barang disepakati?',
      a: 'Karena Anda terhubung langsung dengan pembeli melalui WhatsApp, Anda bebas menentukan metode transaksi yang paling nyaman, seperti COD (Cash On Delivery / Ketemuan langsung), transfer bank langsung, QRIS, atau kirim lewat kurir ekspedisi (JNE, J&T, SiCepat, Gosend).'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        
        <div className="section-header">
          <span className="tag tag-amber">
            <Sparkles size={14} className="inline mr-1" /> Pusat Bantuan & FAQ
          </span>
          <h2>Pertanyaan Seputar <span className="gradient-text-food">Marketplace</span></h2>
          <p>Jawaban atas pertanyaan yang paling sering diajukan seputar upload produk, transaksi aman, dan sistem WhatsApp.</p>
        </div>

        <div className="faq-accordion-wrapper">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item glass-panel gradient-border-food ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <span className="q-text">{faq.q}</span>
                  <div className="faq-icon-wrapper">
                    <ChevronDown size={20} className={`chevron ${isOpen ? 'rotate' : ''}`} />
                  </div>
                </div>

                {isOpen && (
                  <div className="faq-answer animated-fade-in">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
