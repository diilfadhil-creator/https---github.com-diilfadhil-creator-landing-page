import React from 'react';
import { Store, Globe, Share2, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp';

export default function Footer({ onOpenUpload, isCloudConnected = false }) {
  return (
    <footer className="footer-section">
      <div className="container">
        
        <div className="footer-top">
          
          {/* Brand Info */}
          <div className="footer-brand">
            <a href="#" className="nav-logo mb-3">
              <div className="logo-icon-bg bg-orange-gradient">
                <Store className="logo-icon text-white" size={22} />
              </div>
              <span className="logo-text">
                Market<span className="gradient-text-food">place</span> 
                <span className="logo-badge badge-halal">0% ADMIN FEE</span>
              </span>
            </a>
            <p className="footer-tagline">
              Platform Marketplace Terbuka Nusantara. Wadah jual beli produk apa saja yang mudah, cepat, dan 100% bebas biaya komisi untuk seluruh masyarakat Indonesia.
            </p>
            <div className="system-status-pill border-amber">
              <span className="status-dot-green"></span>
              <span>
                {isCloudConnected 
                  ? '☁️ Cloud Database: TERKONEKSI (Multi-Seller Live)' 
                  : '🟢 Layanan Upload & Transaksi: AKTIF 24 JAM'}
              </span>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="footer-col">
            <h4>Jelajahi Kategori</h4>
            <ul>
              <li><a href="#katalog">Gadget & Smartphone</a></li>
              <li><a href="#katalog">Elektronik & Smart Home</a></li>
              <li><a href="#katalog">Fashion & Streetwear</a></li>
              <li><a href="#katalog">Kuliner & Makanan</a></li>
              <li><a href="#katalog">Otomotif & Hobi</a></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="footer-col">
            <h4>Pusat Penjual (Seller)</h4>
            <ul>
              <li>
                <button 
                  onClick={onOpenUpload} 
                  className="footer-link-btn text-amber font-semibold"
                >
                  + Upload Produk Baru (Gratis)
                </button>
              </li>
              <li><a href="#cara-jual">4 Langkah Jual Produk</a></li>
              <li><a href="#paket-seller">Paket Booster Toko</a></li>
              <li><a href="#keunggulan">Simulasi Keuntungan 0% Fee</a></li>
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div className="footer-col">
            <h4>Bantuan & Kontak</h4>
            <ul>
              <li>
                <a 
                  href={getWhatsAppUrl('Halo Admin Marketplace! Saya butuh bantuan seputar marketplace.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green font-semibold"
                >
                  💬 Chat WhatsApp Admin
                </a>
              </li>
              <li><a href="#faq">Panduan Transaksi Aman</a></li>
              <li><a href="#specs">Kebijakan Privasi & Ketentuan</a></li>
              <li><span>📍 Layanan Seluruh Kota di Indonesia</span></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Marketplace Nusantara. Platform Jual Beli Serba Ada.</p>
          
          <div className="social-links">
            <a href="#" aria-label="Website"><Globe size={18} /></a>
            <a href="#" aria-label="Bagikan"><Share2 size={18} /></a>
            <a 
              href={getWhatsAppUrl('Halo Admin Marketplace!')} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
