import React, { useState } from 'react';
import { Sparkles, Plus, CheckCircle2, ArrowRight, Store, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp';

export default function CTA({ onOpenUpload }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
    }
  };

  const handleHelpWhatsApp = () => {
    const msg = `Halo Admin Marketplace! Saya ingin berkonsultasi mengenai cara memaksimalkan jualan online produk saya di platform Marketplace. Email saya: ${email || 'seller@gmail.com'}.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <section className="section cta-section">
      <div className="container">
        
        <div className="cta-box glass-panel gradient-border-food">
          <div className="cta-glow-bg glow-amber"></div>

          <div className="cta-content">
            <div className="badge-pill badge-food-pill mb-4">
              <Sparkles size={14} className="text-amber" />
              <span>Mulai Berjualan Hari Ini</span>
            </div>

            <h2 className="cta-title">
              Punya Barang yang Ingin Dijual? Pasang Iklan Produkmu di <span className="gradient-text-food">Marketplace Sekarang!</span>
            </h2>

            <p className="cta-desc">
              Gratis 100%, tanpa potongan admin, dan produk Anda langsung dilihat oleh ribuan calon pembeli potensial se-Indonesia.
            </p>

            <div className="cta-main-action-buttons mt-6">
              <button 
                className="btn btn-primary btn-food-orange btn-lg pulse-btn"
                onClick={onOpenUpload}
              >
                <Plus size={20} />
                <span>+ Upload Produk Baru Sekarang (Gratis)</span>
              </button>
            </div>

            {submitted ? (
              <div className="cta-success-msg animated-fade-in border-amber mt-6">
                <CheckCircle2 size={24} className="text-amber" />
                <span>Terima kasih! Tim Marketplace akan mengirimkan tips jualan laris ke email Anda.</span>
                <div className="mt-4">
                  <button 
                    onClick={handleHelpWhatsApp}
                    className="btn btn-secondary"
                  >
                    <MessageCircle size={18} />
                    <span>Konsultasi Langsung via WhatsApp Admin</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cta-form mt-6">
                <input 
                  type="email" 
                  placeholder="Dapatkan panduan jualan laris via email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cta-input"
                  required
                />
                <button type="submit" className="btn btn-secondary">
                  <span>Daftar Panduan</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            <div className="cta-features-list mt-6">
              <span>✓ 0% Biaya Komisi Admin</span>
              <span>✓ Upload Instan & Mudah</span>
              <span>✓ Transaksi Langsung WhatsApp</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
