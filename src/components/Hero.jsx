import React, { useState } from 'react';
import { 
  Sparkles, Plus, ShoppingBag, CheckCircle2, 
  Store, ShieldCheck, Zap, TrendingUp, Star,
  Flame
} from 'lucide-react';

export default function Hero({ onOpenUpload }) {
  const [activeSpotlight, setActiveSpotlight] = useState(0);

  const spotlightProducts = [
    {
      title: 'Gadget & Smartphone',
      subtitle: 'iPhone, Android, Laptop & Aksesoris',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      price: 'Mulai Rp 500 Ribuan',
      badge: 'POPULER 🔥',
      seller: 'iTech Store • Jakarta'
    },
    {
      title: 'Fashion & Streetwear',
      subtitle: 'Sneakers, Jaket Kulit, Kaos & Jam Tangan',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      price: 'Mulai Rp 99 Ribuan',
      badge: 'TRENDING ✨',
      seller: 'Urban Kicks • Bandung'
    },
    {
      title: 'Makanan & Kuliner Nusantara',
      subtitle: 'Kopi Arabika, Sambal Cumi, Camilan & Frozen Food',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
      price: 'Mulai Rp 25 Ribuan',
      badge: 'ENAK & FRESH ☕',
      seller: 'Roastery ID • Aceh'
    },
    {
      title: 'Otomotif & Hobi Kamera',
      subtitle: 'Helm SNI, Sparepart Motor, Kamera & Lensa',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      price: 'Mulai Rp 150 Ribuan',
      badge: 'HOBBIES 📷',
      seller: 'CamCorner • Jogja'
    }
  ];

  const current = spotlightProducts[activeSpotlight];

  return (
    <section id="overview" className="hero-section hero-marketplace-bg">
      <div className="hero-bg-glow glow-amber"></div>
      
      <div className="container hero-container">
        
        {/* Top Announcement Badge */}
        <div className="hero-badge-wrapper">
          <div className="badge-pill badge-food-pill">
            <span className="badge-dot pulse-amber"></span>
            <span className="text-amber font-bold">PLATFORM JUAL BELI BEBAS ADMIN 0%</span>
            <span className="badge-divider">|</span>
            <span className="badge-action">Upload Produk Cepat & Praktis <Sparkles size={14} /></span>
          </div>
        </div>

        {/* Hero Headline */}
        <h1 className="hero-title">
          Jual & Beli Produk Apa Saja dengan Cepat di{' '}
          <span className="gradient-text-food">Marketplace Nusantara</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Marketplace terbuka terlengkap untuk siapa saja. Unggah produk Anda sendiri, pasang harga terbaik, dan terima transaksi langsung dari pembeli melalui WhatsApp tanpa potongan biaya sepeser pun!
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <button 
            className="btn btn-primary btn-lg btn-food-orange pulse-btn"
            onClick={onOpenUpload}
          >
            <Plus size={20} />
            <span>+ Mulai Jual Produk (Gratis 0%)</span>
          </button>
          
          <a href="#katalog" className="btn btn-secondary btn-lg">
            <ShoppingBag size={18} />
            <span>Jelajahi Semua Produk</span>
          </a>
        </div>

        {/* Value Proposition Micro Pills */}
        <div className="hero-trust-badges">
          <div className="trust-item">
            <CheckCircle2 size={16} className="text-amber" />
            <span>0% Potongan Biaya Admin</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} className="text-amber" />
            <span>Direct WhatsApp Order</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} className="text-amber" />
            <span>Bebas Jual Kategori Apa Saja</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} className="text-amber" />
            <span>Jangkauan Pembeli Se-Indonesia</span>
          </div>
        </div>

        {/* Interactive Marketplace Showcase Spotlight */}
        <div className="product-showcase-container glass-panel gradient-border-food mt-8">
          
          <div className="product-showcase-grid">
            
            {/* Left: Showcase Visual with Floating Micro Badges */}
            <div className="product-preview-stage">
              <div className="hero-spotlight-card glass-panel">
                <div className="spotlight-badge-top">{current.badge}</div>
                
                {/* Floating Achievement Badges */}
                <div className="hero-floating-badge badge-float-top-right">
                  <Flame size={14} className="text-amber" />
                  <span>0% Admin Fee</span>
                </div>
                <div className="hero-floating-badge badge-float-bottom-left">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>Rating 4.9/5</span>
                </div>

                <img src={current.image} alt={current.title} className="spotlight-image" />
                <div className="spotlight-overlay-info">
                  <h4>{current.title}</h4>
                  <p className="text-sm text-muted">{current.subtitle}</p>
                  <div className="spotlight-price text-amber">{current.price}</div>
                </div>
              </div>

              {/* Switcher Buttons */}
              <div className="screen-mode-selector mt-4">
                <span className="selector-label">Pilih Kategori Populer:</span>
                <div className="btn-group-sm flex-wrap justify-center">
                  {spotlightProducts.map((p, idx) => (
                    <button
                      key={idx}
                      className={`btn-mode ${activeSpotlight === idx ? 'active-food' : ''}`}
                      onClick={() => setActiveSpotlight(idx)}
                    >
                      {p.title.split('&')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Info & Call-To-Action */}
            <div className="product-info-panel text-left">
              <div className="product-badge text-amber mb-2">ETALASE UNGGULAN MARKETPLACE</div>
              <h3 className="product-model-title">{current.title}</h3>
              <p className="product-model-desc">
                Kategori {current.title} selalu ramai dicari oleh ribuan pengunjung setiap harinya. Siapapun bisa bergabung menjadi penjual dan mengunggah dagangannya sekarang juga.
              </p>

              <div className="food-price-highlight mt-4">
                <span className="food-price-label">Kisaran Harga:</span>
                <strong className="food-price-number text-amber">{current.price}</strong>
                <span className="food-diskon-tag">Bisa Nego / Direct WA</span>
              </div>

              {/* Highlights 4-grid */}
              <div className="spec-highlights-grid mt-6">
                <div className="spec-item">
                  <Zap className="text-amber mb-1" size={20} />
                  <strong>Upload 1 Menit</strong>
                  <span>Tanpa registrasi ribet</span>
                </div>
                <div className="spec-item">
                  <TrendingUp className="text-green mb-1" size={20} />
                  <strong>0% Admin Fee</strong>
                  <span>Hasil penjualan 100% milik Anda</span>
                </div>
                <div className="spec-item">
                  <Store className="text-amber mb-1" size={20} />
                  <strong>Langsung Tayang</strong>
                  <span>Tampil di etalase seketika</span>
                </div>
                <div className="spec-item">
                  <ShieldCheck className="text-green mb-1" size={20} />
                  <strong>Chat WhatsApp</strong>
                  <span>Komunikasi langsung dengan buyer</span>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  className="btn btn-primary btn-food-orange btn-full"
                  onClick={onOpenUpload}
                >
                  <Plus size={18} />
                  <span>Jual Produk Anda di Kategori Ini</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
