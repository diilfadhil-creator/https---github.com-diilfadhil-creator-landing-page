import React, { useState } from 'react';
import { Star, Quote, Store, ShoppingBag } from 'lucide-react';

export default function Testimonials() {
  const [filterCategory, setFilterCategory] = useState('all');

  const testimonials = [
    {
      name: 'Dimas Prasetyo',
      role: 'Penjual Gadget & Komputer @ Jakarta',
      category: 'seller',
      rating: 5,
      avatarBg: 'bg-gradient-amber',
      initials: 'DP',
      quote: 'Enak banget jualan di PasarHub! Upload produknya nggak sampai 1 menit, dan yang paling mantap 0% potongan admin. Pas ada buyer cocok langsung transaksi via WA.'
    },
    {
      name: 'Amanda Stephanie',
      role: 'Pembeli Thrift & Sneaker @ Bandung',
      category: 'buyer',
      rating: 5,
      avatarBg: 'bg-gradient-orange',
      initials: 'AS',
      quote: 'Bisa nemu sepatu langka dengan harga miring dan kondisi mulus banget. Langsung chat sellernya di WhatsApp buat minta video detail barang sebelum COD. Recommended!'
    },
    {
      name: 'Hendra Roaster',
      role: 'UMKM Kopi Arabika Gayo @ Medan',
      category: 'seller',
      rating: 5,
      avatarBg: 'bg-gradient-red',
      initials: 'HR',
      quote: 'Produk biji kopi roastery saya jadi dikenal lebih banyak orang. Pembeli langsung kirim pesan ke WA dan pembayaran langsung masuk ke rekening tanpa nunggu berhari-hari.'
    }
  ];

  const filtered = filterCategory === 'all' 
    ? testimonials 
    : testimonials.filter((t) => t.category === filterCategory);

  return (
    <section className="section testimonials-section">
      <div className="container">
        
        {/* Trust Stats Bar */}
        <div className="companies-trust-bar">
          <span className="trust-label">Mendukung Transaksi Cepat & Berbagai Metode Pembayaran Terpercaya</span>
          <div className="companies-logos">
            <span className="c-logo text-amber">QRIS ALL PAYMENT</span>
            <span className="c-logo text-green">BCA / MANDIRI / BRI</span>
            <span className="c-logo text-orange">GOPAY / SHOPEEPAY</span>
            <span className="c-logo text-amber">COD CASH ON DELIVERY</span>
          </div>
        </div>

        <div className="section-header">
          <span className="tag tag-amber">Cerita Sukses & Ulasan</span>
          <h2>Dipercaya Ribuan <span className="gradient-text-food">Penjual & Pembeli</span></h2>
          <p>Pengalaman nyata dari para pelaku UMKM dan konsumen di seluruh penjuru Indonesia.</p>
        </div>

        {/* Category Filters */}
        <div className="testimonials-filters">
          <button 
            className={`t-filter-btn ${filterCategory === 'all' ? 'active-food' : ''}`}
            onClick={() => setFilterCategory('all')}
          >
            Semua Ulasan
          </button>
          <button 
            className={`t-filter-btn ${filterCategory === 'seller' ? 'active-food' : ''}`}
            onClick={() => setFilterCategory('seller')}
          >
            Cerita Penjual (Sellers)
          </button>
          <button 
            className={`t-filter-btn ${filterCategory === 'buyer' ? 'active-food' : ''}`}
            onClick={() => setFilterCategory('buyer')}
          >
            Ulasan Pembeli (Buyers)
          </button>
        </div>

        {/* Cards Grid */}
        <div className="testimonials-grid">
          {filtered.map((item, index) => (
            <div key={index} className="testimonial-card glass-panel animated-fade-in gradient-border-food">
              <div className="t-card-top">
                <div className="stars-row">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-icon" fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <Quote size={24} className="quote-icon text-amber" />
              </div>

              <p className="t-quote">{item.quote}</p>

              <div className="t-author">
                <div className={`t-avatar ${item.avatarBg}`}>
                  {item.initials}
                </div>
                <div className="t-info">
                  <h4 className="t-name">{item.name}</h4>
                  <span className="t-role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
