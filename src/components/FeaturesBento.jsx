import React from 'react';
import { 
  Award, ShieldCheck, Zap, Heart, Truck, 
  Sparkles, Check, MessageCircle, DollarSign, Store, Tag 
} from 'lucide-react';

export default function FeaturesBento() {
  return (
    <section id="keunggulan" className="section features-section">
      <div className="container">
        
        <div className="section-header">
          <span className="tag tag-amber">Keunggulan & Manfaat</span>
          <h2>Kenapa Harus Berjualan di <span className="gradient-text-food">PasarHub Nusantara?</span></h2>
          <p>Solusi jual beli modern paling fleksibel untuk UMKM, penjual pribadi, dan pencari barang berkualitas.</p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          
          {/* Card 1: 0% Admin Fee */}
          <div className="bento-card bento-col-2 glass-panel feature-card-glow-amber">
            <div className="bento-badge badge-amber">
              <DollarSign size={16} className="text-amber" />
              <span>Bebas Potongan Komisi</span>
            </div>
            <h3 className="bento-title">0% Biaya Admin — 100% Hasil Penjualan Milik Anda</h3>
            <p className="bento-desc">
              Tidak ada potongan persentase komisi sepeser pun untuk setiap transaksi yang terjadi. Uang pembayaran dari pembeli langsung masuk 100% ke rekening atau e-wallet Anda.
            </p>

            <div className="bento-graphic-agents">
              <div className="agent-pill agent-master border-amber">
                <Sparkles size={16} className="text-amber" />
                <span>Skema Transaksi Langsung PasarHub</span>
              </div>
              <div className="agent-tree-connector"></div>
              <div className="agent-sub-group">
                <div className="agent-pill">
                  <span className="dot-green"></span> Pembeli Menghubungi WA Anda
                </div>
                <div className="agent-pill">
                  <span className="dot-amber"></span> Pembayaran Langsung ke Seller
                </div>
                <div className="agent-pill">
                  <span className="dot-green"></span> 0% Fee / Potongan
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Upload Cepat 1 Menit */}
          <div className="bento-card glass-panel">
            <div className="bento-badge badge-green">
              <Zap size={16} className="text-green" />
              <span>Praktis & Instan</span>
            </div>
            <h3 className="bento-title">Upload Hanya 1 Menit</h3>
            <p className="bento-desc">
              Cukup upload foto dari HP, tulis nama barang, pasang harga, dan produk Anda seketika muncul di katalog publik.
            </p>
            <div className="speed-stat-box">
              <div className="speed-number gradient-text-food">&lt; 60 Detik</div>
              <div className="speed-sub">Produk Langsung Tayang Online</div>
            </div>
          </div>

          {/* Card 3: Bebas Produk Apa Saja */}
          <div className="bento-card glass-panel">
            <div className="bento-badge badge-amber">
              <Store size={16} className="text-amber" />
              <span>Multi Kategori</span>
            </div>
            <h3 className="bento-title">Jual Produk Apa Saja</h3>
            <p className="bento-desc">
              Dari gadget elektronik, baju/sepatu streetwear, makanan & kuliner homemade, sparepart motor, hingga kamera hobi.
            </p>
            <ul className="bento-list">
              <li><Check size={14} className="text-amber" /> Barang Baru & Bekas Berkualitas</li>
              <li><Check size={14} className="text-amber" /> Produk Fisik & Jasa Kreatif</li>
              <li><Check size={14} className="text-amber" /> Makanan & Minuman Siap Antar</li>
            </ul>
          </div>

          {/* Card 4: WhatsApp Direct Communication */}
          <div className="bento-card glass-panel">
            <div className="bento-badge badge-amber">
              <MessageCircle size={16} className="text-amber" />
              <span>Komunikasi Tanpa Batas</span>
            </div>
            <h3 className="bento-title">Chat Langsung via WhatsApp</h3>
            <p className="bento-desc">
              Pembeli dapat langsung bernegosiasi, bertanya detail kondisi, meminta video barang asli, hingga atur COD langsung lewat WhatsApp.
            </p>
            <div className="code-snippet-mini">
              <code>Pesan Otomatis: Termasuk Nama & Link Produk</code>
              <code className="text-muted">Langsung Terbuka di Aplikasi WhatsApp</code>
            </div>
          </div>

          {/* Card 5: Jangkauan Luas Se-Indonesia */}
          <div className="bento-card bento-col-2 glass-panel">
            <div className="bento-badge badge-amber">
              <Truck size={16} className="text-amber" />
              <span>Jangkauan Nasional</span>
            </div>
            <h3 className="bento-title">Dapat Diakses Calon Pembeli Seluruh Indonesia</h3>
            <p className="bento-desc">
              Pasang lokasi kota Anda agar pembeli di sekitar Anda dapat memilih opsi COD (ketemuan) atau pengiriman kurir ekspedisi untuk pengiriman antarkota.
            </p>
            
            <div className="bento-progress-bars">
              <div className="p-bar-item">
                <div className="p-bar-header">
                  <span>Tingkat Kepuasan Penjual UMKM</span>
                  <span>99.8% Sangat Puas</span>
                </div>
                <div className="p-bar-track">
                  <div className="p-bar-fill bg-amber" style={{ width: '99.8%' }}></div>
                </div>
              </div>

              <div className="p-bar-item">
                <div className="p-bar-header">
                  <span>Kecepatan Respon Penjual via WhatsApp</span>
                  <span>Rata-rata 5-10 Menit</span>
                </div>
                <div className="p-bar-track">
                  <div className="p-bar-fill bg-green" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
