import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, Sparkles, CheckCircle2, 
  ArrowUpRight, Users, Store, DollarSign 
} from 'lucide-react';

export default function AnalyticsPreview() {
  const [activeTab, setActiveTab] = useState('security');

  const guideData = {
    security: [
      { label: 'Transaksi COD (Ketemuan)', value: 'Gunakan opsi COD di tempat ramai/publik untuk memeriksa fisik barang sebelum membayar.' },
      { label: 'Verifikasi Foto Asli', value: 'Pembeli berhak meminta foto/video real-time barang dengan watermark tulisan nama via WhatsApp.' },
      { label: 'Pembayaran Rekber/Transfer', value: 'Pastikan nomor rekening sesuai dengan identitas penjual yang terverifikasi.' },
      { label: 'Laporkan Penjual Bermasalah', value: 'Tim pengawas Marketplace siap menindak tegas setiap iklan yang melanggar aturan.' }
    ],
    delivery: [
      { label: 'Pilihan Ekspedisi Fleksibel', value: 'Mendukung pengiriman reguler (JNE, J&T, SiCepat) & kurir instan (GoSend, GrabExpress).' },
      { label: 'Pengemasan Ekstra Aman', value: 'Penjual wajib menggunakan bubble wrap tebal untuk barang elektronik & pecah belah.' },
      { label: 'Nomor Resi Pelacakan', value: 'Penjual langsung mengirimkan foto struk / nomor resi pengiriman begitu barang diserahkan ke kurir.' }
    ],
    seller_tips: [
      { label: 'Foto Produk Terang & Jelas', value: 'Gunakan pencahayaan alami dan ambil foto dari beberapa sudut (depan, belakang, detail minus jika bekas).' },
      { label: 'Tulis Deskripsi Lengkap', value: 'Sertakan merk, tipe, kelengkapan dus/nota, usia pemakaian, dan alasan dijual.' },
      { label: 'Respon Cepat di WhatsApp', value: 'Penjual dengan respon cepat memiliki peluang 4x lebih tinggi untuk langsung closing penjualan.' }
    ]
  };

  return (
    <section id="specs" className="section analytics-section">
      <div className="container">
        
        <div className="analytics-box glass-panel gradient-border-food">
          
          <div className="analytics-header">
            <div>
              <span className="tag tag-amber">Keamanan & Panduan Transaksi</span>
              <h2>Standar Kepercayaan <span className="gradient-text-food">Marketplace</span></h2>
            </div>
            
            {/* Category Switcher */}
            <div className="time-filter-toggle">
              <button 
                className={`filter-btn ${activeTab === 'security' ? 'active-food' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                Keamanan Transaksi
              </button>
              <button 
                className={`filter-btn ${activeTab === 'delivery' ? 'active-food' : ''}`}
                onClick={() => setActiveTab('delivery')}
              >
                Pengiriman & Kurir
              </button>
              <button 
                className={`filter-btn ${activeTab === 'seller_tips' ? 'active-food' : ''}`}
                onClick={() => setActiveTab('seller_tips')}
              >
                Tips Jualan Cepat Laku
              </button>
            </div>
          </div>

          {/* Metric Highlights Grid */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon-bg bg-amber-light">
                <Store size={20} className="text-amber" />
              </div>
              <div className="metric-details">
                <span className="metric-title">Biaya Admin Platform</span>
                <span className="metric-value">0% GRATIS</span>
                <span className="metric-trend text-green"><ArrowUpRight size={14} /> Selamanya tanpa potongan</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-bg bg-amber-light">
                <DollarSign size={20} className="text-amber" />
              </div>
              <div className="metric-details">
                <span className="metric-title">Kemudahan Negosiasi</span>
                <span className="metric-value">Direct WA</span>
                <span className="metric-trend text-green"><ArrowUpRight size={14} /> Chat & Deal langsung</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-bg bg-amber-light">
                <ShieldCheck size={20} className="text-green" />
              </div>
              <div className="metric-details">
                <span className="metric-title">Verifikasi Iklan</span>
                <span className="metric-value">Real-Time</span>
                <span className="metric-trend text-green"><ArrowUpRight size={14} /> Bebas penipuan & spam</span>
              </div>
            </div>
          </div>

          {/* Quality List Table */}
          <div className="specs-table-container mt-6">
            <table className="specs-table">
              <tbody>
                {guideData[activeTab].map((item, index) => (
                  <tr key={index} className="spec-row">
                    <td className="spec-label-col">
                      <CheckCircle2 size={16} className="text-amber mr-2 inline" />
                      <strong>{item.label}</strong>
                    </td>
                    <td className="spec-val-col">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  );
}
