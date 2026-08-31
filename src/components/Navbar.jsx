import React, { useState, useEffect } from 'react';
import { 
  Store, ShoppingBag, Plus, Menu, X, 
  Sparkles, Search, MessageCircle, ArrowRight, Cloud, CloudCheck
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/whatsapp';

export default function Navbar({ onOpenUpload, onOpenCart, cartCount = 0, isCloudConnected = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-container">
        
        {/* Brand Logo */}
        <a href="#" className="nav-logo">
          <div className="logo-icon-bg bg-orange-gradient">
            <Store className="logo-icon text-white" size={22} />
          </div>
          <span className="logo-text">
            Market<span className="gradient-text-food">place</span>
            <span className="logo-badge badge-halal">0% ADMIN FEE</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          <a href="#katalog" className="nav-link">Etalase Produk</a>
          <a href="#cara-jual" className="nav-link">Cara Jual</a>
          <a href="#keunggulan" className="nav-link">Keunggulan</a>
          <a href="#paket-seller" className="nav-link">Booster Seller</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          
          {/* Cart Trigger */}
          <button 
            className="nav-cart-btn glass-panel"
            onClick={onOpenCart}
            aria-label="Buka Keranjang Belanja"
            title="Keranjang Belanja"
          >
            <ShoppingBag size={18} className="text-amber" />
            {cartCount > 0 && (
              <span className="cart-badge-count animated-pulse">{cartCount}</span>
            )}
          </button>

          {/* Upload Product Button */}
          <button 
            className="btn btn-primary btn-sm btn-food-orange btn-upload-nav"
            onClick={onOpenUpload}
          >
            <Plus size={16} />
            <span>+ Jual Produk</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu animated-fade-in">
          <a href="#katalog" onClick={() => setMobileMenuOpen(false)}>Etalase Produk</a>
          <a href="#cara-jual" onClick={() => setMobileMenuOpen(false)}>Cara Jual Produk</a>
          <a href="#keunggulan" onClick={() => setMobileMenuOpen(false)}>Keunggulan Marketplace</a>
          <a href="#paket-seller" onClick={() => setMobileMenuOpen(false)}>Paket Booster Seller</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ & Panduan</a>
          
          <div className="mobile-actions mt-2">
            <button 
              className="btn btn-primary btn-food-orange btn-full"
              onClick={() => { setMobileMenuOpen(false); onOpenUpload(); }}
            >
              <Plus size={18} />
              <span>+ Upload & Jual Produk Sekarang</span>
            </button>
            <button 
              className="btn btn-secondary btn-full mt-2"
              onClick={() => { setMobileMenuOpen(false); onOpenCart(); }}
            >
              <ShoppingBag size={18} />
              <span>Buka Keranjang ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
