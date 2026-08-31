import React, { useState } from 'react';
import { 
  Camera, FileText, CheckCircle2, MessageCircle, 
  DollarSign, Calculator, Sparkles, Plus, TrendingUp 
} from 'lucide-react';

export default function WorkflowDemo({ onOpenUpload }) {
  const [estimatedPrice, setEstimatedPrice] = useState(250000);
  const [estimatedQty, setEstimatedQty] = useState(10);
  const [marketType, setMarketType] = useState('umum'); // 'umum', 'elektronik', 'fashion', 'kuliner'

  const platformFee = 0; // 0%
  const totalRevenue = estimatedPrice * estimatedQty;
  const netEarnings = totalRevenue - platformFee;

  const comparisonFeeOtherPlatform = totalRevenue * 0.08; // 8% fee on other marketplace

  return (
    <section id="cara-jual" className="section workflow-section">
      <div className="container">
        
        <div className="section-header">
          <span className="tag tag-amber">
            <Sparkles size={14} className="inline mr-1" /> Panduan & Simulasi Penjual
          </span>
          <h2>4 Langkah Mudah <span className="gradient-text-food">Mulai Berjualan</span></h2>
          <p>Siapapun bisa langsung menjual barang baru atau bekas berkualitas tanpa verifikasi berbelit.</p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="selling-steps-grid">
          
          <div className="step-card glass-panel gradient-border-food">
            <div className="step-num-badge">1</div>
            <div className="step-icon-bg bg-orange-gradient">
              <Camera size={26} className="text-white" />
            </div>
            <h3>Foto Produk Anda</h3>
            <p>Ambil foto produk yang jelas dan menarik menggunakan kamera HP atau unggah foto dari galeri Anda.</p>
          </div>

          <div className="step-card glass-panel gradient-border-food">
            <div className="step-num-badge">2</div>
            <div className="step-icon-bg bg-orange-gradient">
              <FileText size={26} className="text-white" />
            </div>
            <h3>Isi Info & Harga</h3>
            <p>Tentukan nama barang, kategori, harga jual terbaik, kondisi barang, dan nomor WhatsApp Anda.</p>
          </div>

          <div className="step-card glass-panel gradient-border-food">
            <div className="step-num-badge">3</div>
            <div className="step-icon-bg bg-orange-gradient">
              <CheckCircle2 size={26} className="text-white" />
            </div>
            <h3>Tayang Seketika</h3>
            <p>Produk langsung terbit di katalog etalase Marketplace dan dapat ditemukan oleh calon pembeli.</p>
          </div>

          <div className="step-card glass-panel gradient-border-food">
            <div className="step-num-badge">4</div>
            <div className="step-icon-bg bg-orange-gradient">
              <MessageCircle size={26} className="text-white" />
            </div>
            <h3>Terima Order via WA</h3>
            <p>Calon pembeli langsung menghubungi WhatsApp Anda untuk konfirmasi pesanan dan pembayaran 100% milik Anda.</p>
          </div>

        </div>

        {/* Interactive Profit Calculator */}
        <div className="workflow-canvas glass-panel gradient-border-food mt-8">
          <div className="calc-header-row">
            <div className="calc-title">
              <Calculator size={22} className="text-amber inline mr-2" />
              <h3>Kalkulator Simulasi Keuntungan (0% Potongan Admin)</h3>
            </div>
            <span className="badge-pill badge-food-pill">100% Keuntungan Milik Anda</span>
          </div>

          <div className="calc-body-grid mt-4">
            
            {/* Input Controls */}
            <div className="calc-inputs-col">
              <div className="form-group mb-3">
                <label>Estimasi Harga Jual per Produk (Rp):</label>
                <input 
                  type="range" 
                  min="20000" 
                  max="5000000" 
                  step="10000"
                  value={estimatedPrice}
                  onChange={(e) => setEstimatedPrice(Number(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="slider-value-tag text-amber">
                  Rp {estimatedPrice.toLocaleString('id-ID')}
                </div>
              </div>

              <div className="form-group mb-3">
                <label>Estimasi Penjualan per Bulan (Unit):</label>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  step="1"
                  value={estimatedQty}
                  onChange={(e) => setEstimatedQty(Number(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="slider-value-tag text-amber">
                  {estimatedQty} Unit / Bulan
                </div>
              </div>
            </div>

            {/* Profit Results Comparison */}
            <div className="calc-results-col glass-panel">
              <div className="result-metric-row">
                <span className="metric-label">Total Omset Penjualan:</span>
                <strong className="metric-val text-white">Rp {totalRevenue.toLocaleString('id-ID')}</strong>
              </div>

              <div className="result-metric-row">
                <span className="metric-label">Potongan Biaya Admin Marketplace:</span>
                <strong className="metric-val text-green">Rp 0 (GRATIS 0%)</strong>
              </div>

              <div className="result-metric-row highlight-row">
                <span className="metric-label">Penghasilan Bersih Anda:</span>
                <strong className="metric-val text-amber text-2xl">
                  Rp {netEarnings.toLocaleString('id-ID')}
                </strong>
              </div>

              <div className="hemat-savings-box mt-3">
                <TrendingUp size={16} className="text-green inline mr-1" />
                <span>
                  Anda hemat <strong>Rp {comparisonFeeOtherPlatform.toLocaleString('id-ID')}</strong> dibandingkan marketplace konvensional yang memotong komisi 5-8%!
                </span>
              </div>

              <button 
                className="btn btn-primary btn-food-orange btn-full mt-4"
                onClick={onOpenUpload}
              >
                <Plus size={18} />
                <span>+ Upload Produk Saya Sekarang</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
