import React from 'react';
import { Store, ShoppingBag, Plus, Sparkles, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp';

export default function MobileBottomNav({ onOpenUpload, onOpenCart, cartCount = 0 }) {
  const handleOpenWhatsApp = () => {
    window.open(getWhatsAppUrl('Halo Admin Marketplace! Saya ingin bertanya seputar produk.'), '_blank');
  };

  return (
    <div className="mobile-bottom-bar">
      <div className="mobile-bottom-nav-inner">
        
        <a href="#overview" className="m-nav-item">
          <Store size={20} />
          <span>Beranda</span>
        </a>

        <a href="#katalog" className="m-nav-item">
          <Sparkles size={20} />
          <span>Etalase</span>
        </a>

        {/* Highlighted Center Upload Button */}
        <button onClick={onOpenUpload} className="m-nav-item m-nav-upload-center" title="Upload & Jual Produk">
          <div className="m-upload-icon-circle bg-orange-gradient">
            <Plus size={22} className="text-white" />
          </div>
          <span className="text-amber font-bold">Jual</span>
        </button>

        <button onClick={onOpenCart} className="m-nav-item relative-box" title="Keranjang Belanja">
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="m-cart-badge">{cartCount}</span>
          )}
          <span>Keranjang</span>
        </button>

        <button onClick={handleOpenWhatsApp} className="m-nav-item" title="Chat WhatsApp">
          <MessageCircle size={20} />
          <span>Bantuan</span>
        </button>

      </div>
    </div>
  );
}
