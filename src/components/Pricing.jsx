import React, { useState } from 'react';
import { 
  Check, Sparkles, Plus, ArrowRight, ShieldCheck, 
  Truck, Package, X, CheckCircle2, MessageCircle, Star, Zap 
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp';

export default function Pricing({ onOpenUpload }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planForm, setPlanForm] = useState({ storeName: '', phone: '', productName: '' });

  const sellerPlans = [
    {
      name: 'Paket Standar (Gratis)',
      desc: 'Cocok untuk penjual pribadi atau UMKM pemula yang ingin mulai memasarkan produk.',
      price: '0',
      period: 'Gratis Selamanya',
      badge: 'GRATIS 100%',
      features: [
        'Upload Produk Tanpa Batas',
        '0% Potongan Biaya Admin / Komisi',
        'Langsung Terbit di Etalase Publik',
        'Direct WhatsApp Chat dengan Pembeli',
        'Bisa Atur Harga & Nego Bebas'
      ],
      buttonText: 'Mulai Upload Sekarang',
      isFree: true,
      featured: false
    },
    {
      name: 'Paket Booster Disorot (Featured)',
      desc: 'Tingkatkan penjualan hingga 5x lipat dengan menempatkan produk di posisi teratas katalog.',
      price: '25.000',
      period: 'per Produk / 30 Hari',
      badge: 'PALING LARIS 🔥',
      features: [
        'Semua fitur Paket Standar',
        'Badge Emas "FEATURED / REKOMENDASI"',
        'Prioritas Tampil di Urutan Paling Atas',
        'Highlight Border Berkilau di Katalog',
        'Dukungan Promosi ke Grup Komunitas'
      ],
      buttonText: 'Aktifkan Booster Produk',
      isFree: false,
      featured: true
    },
    {
      name: 'Paket Toko Resmi (Verified Pro)',
      desc: 'Bangun reputasi dan kepercayaan maksimal untuk brand / toko online Anda.',
      price: '75.000',
      period: 'per Toko / 3 Bulan',
      badge: 'VERIFIED SELLER',
      features: [
        'Semua fitur Paket Booster',
        'Centang Biru Verifikasi Toko Resmi',
        'Banner Banner Toko Promosi Khusus',
        'Konsultasi Tips Foto & Copywriting Jualan',
        'Layanan Bantuan CS Prioritas 24/7'
      ],
      buttonText: 'Daftar Toko Verified',
      isFree: false,
      featured: false
    }
  ];

  const handlePlanAction = (plan) => {
    if (plan.isFree) {
      onOpenUpload();
    } else {
      setSelectedPlan(plan);
    }
  };

  const handleSendBoosterWA = (e) => {
    e.preventDefault();
    const msg = `Halo Admin PasarHub! Saya ingin mengaktifkan layanan *${selectedPlan.name}* (Rp ${selectedPlan.price}/${selectedPlan.period}).\n\n` +
      `🏪 *Nama Toko/Penjual*: ${planForm.storeName}\n` +
      `📱 *No. WhatsApp*: ${planForm.phone}\n` +
      `🛍️ *Nama Produk*: ${planForm.productName || '-'}\n\n` +
      `Mohon instruksi aktivasi dan info pembayaran QRIS. Terima kasih! 🚀`;

    window.open(getWhatsAppUrl(msg), '_blank');
    setSelectedPlan(null);
  };

  return (
    <section id="paket-seller" className="section pricing-section">
      <div className="container">
        
        <div className="section-header">
          <span className="tag tag-amber">Paket Booster Penjual</span>
          <h2>Tingkatkan Penjualan dengan <span className="gradient-text-food">Booster Seller</span></h2>
          <p>Mulai jualan 100% gratis selamanya atau pasang iklan booster untuk jangkauan pembeli yang lebih luas.</p>

          <div className="stock-counter-badge mt-4 border-amber">
            <span className="pulse-dot-green"></span>
            <span>Status Layanan: <strong>SISTEM UPLOAD AKTIF & GRATIS 24/7</strong></span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {sellerPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card glass-panel ${plan.featured ? 'pricing-card-featured gradient-border-food' : ''}`}
            >
              {plan.badge && (
                <div className="plan-badge-top badge-food-top">{plan.badge}</div>
              )}

              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-desc">{plan.desc}</p>
              </div>

              <div className="plan-price-box">
                <span className="currency">Rp</span>
                <span className="price-num text-amber">{plan.price}</span>
                <div className="msrp-tag">{plan.period}</div>
              </div>

              <ul className="plan-features">
                {plan.features.map((feat, i) => (
                  <li key={i}>
                    <Check size={16} className="text-amber" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`btn ${plan.featured ? 'btn-primary btn-food-orange' : 'btn-secondary'} btn-full`}
                onClick={() => handlePlanAction(plan)}
              >
                {plan.isFree ? <Plus size={18} /> : <Zap size={18} />}
                <span>{plan.buttonText}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Trust Highlight Box */}
        <div className="pricing-guarantee-box glass-panel mt-8 text-center gradient-border-food">
          <div className="guarantee-grid">
            <div className="g-item">
              <Zap size={24} className="text-amber mb-2 mx-auto" />
              <strong>Upload Instan Tanpa Biaya</strong>
              <span>Mulai berjualan dalam hitungan detik tanpa biaya pendaftaran</span>
            </div>
            <div className="g-item">
              <ShieldCheck size={24} className="text-green mb-2 mx-auto" />
              <strong>100% Bebas Potongan</strong>
              <span>Tidak ada komisi per transaksi tersembunyi</span>
            </div>
            <div className="g-item">
              <MessageCircle size={24} className="text-amber mb-2 mx-auto" />
              <strong>Chat WhatsApp Langsung</strong>
              <span>Bangun relasi dan pelanggan setia untuk bisnis Anda</span>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Aktivasi Booster Plan */}
      {selectedPlan && (
        <div className="modal-overlay animated-fade-in" onClick={(e) => e.target === e.currentTarget && setSelectedPlan(null)}>
          <div className="modal-content glass-panel gradient-border-food">
            <button className="modal-close" onClick={() => setSelectedPlan(null)}>
              <X size={20} />
            </button>

            <form onSubmit={handleSendBoosterWA} className="order-form">
              <div className="modal-header mb-4">
                <span className="tag tag-amber">Aktivasi Promosi Seller</span>
                <h3>Langganan {selectedPlan.name}</h3>
                <div className="modal-price-highlight">
                  Biaya: <strong className="text-amber">Rp {selectedPlan.price}</strong> ({selectedPlan.period})
                </div>
              </div>

              <div className="form-group mb-3">
                <label>Nama Toko / Penjual:</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Kicks Culture ID / Warung Berkah"
                  required
                  value={planForm.storeName}
                  onChange={(e) => setPlanForm({ ...planForm, storeName: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group mb-3">
                <label>Nomor WhatsApp Aktif:</label>
                <input 
                  type="tel" 
                  placeholder="0812xxxxxxx"
                  required
                  value={planForm.phone}
                  onChange={(e) => setPlanForm({ ...planForm, phone: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group mb-4">
                <label>Nama Produk yang Ingin Dipromosikan (Opsional):</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Sneaker Nike Air Jordan / iPhone 15 Pro"
                  value={planForm.productName}
                  onChange={(e) => setPlanForm({ ...planForm, productName: e.target.value })}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-food-orange btn-full">
                <Zap size={18} />
                <span>Kirim Permintaan Aktivasi ke Admin WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
