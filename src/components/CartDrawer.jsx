import React, { useState } from 'react';
import { 
  X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, 
  MapPin, MessageCircle 
} from 'lucide-react';
import { getCartCheckoutWhatsAppUrl } from '../config/whatsapp';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart 
}) {
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckoutWhatsApp = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    const waUrl = getCartCheckoutWhatsAppUrl(cartItems, subtotal, buyerInfo);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="cart-drawer-overlay animated-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cart-drawer-container glass-panel gradient-border-food custom-scroll">
        
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag className="text-amber" size={22} />
            <h3>Keranjang Belanja ({cartItems.reduce((a, b) => a + b.quantity, 0)})</h3>
          </div>
          <div className="flex items-center gap-2">
            {cartItems.length > 0 && onClearCart && (
              <button 
                type="button"
                className="btn-text-reset text-xs text-muted"
                onClick={() => {
                  if (window.confirm('Kosongkan semua produk dari keranjang?')) {
                    onClearCart();
                  }
                }}
                title="Kosongkan Keranjang"
              >
                Kosongkan
              </button>
            )}
            <button className="cart-close-btn" onClick={onClose} aria-label="Tutup Keranjang">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon">
              <ShoppingBag size={56} className="text-muted" />
            </div>
            <h4>Keranjang Anda Masih Kosong</h4>
            <p className="text-muted text-sm">
              Jelajahi etalase produk marketplace kami dan tambahkan barang yang ingin Anda beli.
            </p>
            <button className="btn btn-primary btn-food-orange mt-4" onClick={onClose}>
              <span>Mulai Belanja Sekarang</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="cart-content-wrapper">
            
            {/* Items List */}
            <div className="cart-items-list custom-scroll">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card glass-panel">
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />
                  
                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <span className="cart-cat">{item.category?.toUpperCase()}</span>
                      <button 
                        className="btn-remove-item" 
                        onClick={() => onRemoveItem(item.id)}
                        title="Hapus dari keranjang"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <h4 className="cart-item-name">{item.name}</h4>
                    
                    <div className="cart-item-price text-amber">
                      Rp {Number(item.price).toLocaleString('id-ID')}
                    </div>

                    <div className="cart-item-bottom">
                      <div className="qty-picker-mini">
                        <button 
                          type="button" 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="qty-mini-btn"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-mini-val">{item.quantity}</span>
                        <button 
                          type="button" 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="qty-mini-btn"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="cart-item-subtotal">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Buyer Details Form */}
            <form onSubmit={handleCheckoutWhatsApp} className="cart-checkout-form">
              <div className="form-section-title">
                <MapPin size={16} className="text-amber inline mr-1" />
                <span>Informasi Pengiriman Pemesan:</span>
              </div>

              <div className="form-group mb-2">
                <input 
                  type="text" 
                  placeholder="Nama Lengkap Pemesan *" 
                  required
                  value={buyerInfo.name}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                  className="form-input text-sm"
                />
              </div>

              <div className="form-group mb-2">
                <input 
                  type="tel" 
                  placeholder="No. WhatsApp Aktif (0812xxxx) *" 
                  required
                  value={buyerInfo.phone}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
                  className="form-input text-sm"
                />
              </div>

              <div className="form-group mb-2">
                <textarea 
                  rows={2}
                  placeholder="Alamat Pengiriman Lengkap (Jalan, No, Kota) *" 
                  required
                  value={buyerInfo.address}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, address: e.target.value })}
                  className="form-input text-sm"
                />
              </div>

              <div className="form-group mb-3">
                <input 
                  type="text" 
                  placeholder="Catatan Tambahan untuk Penjual (Opsional)" 
                  value={buyerInfo.notes}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, notes: e.target.value })}
                  className="form-input text-sm"
                />
              </div>

              {/* Total & Checkout Button */}
              <div className="cart-summary-box glass-panel">
                <div className="summary-row">
                  <span>Total {cartItems.reduce((a, b) => a + b.quantity, 0)} Produk:</span>
                  <strong className="text-amber text-lg">Rp {subtotal.toLocaleString('id-ID')}</strong>
                </div>

                <p className="text-xs text-muted mt-1">
                  *Pemesanan akan otomatis dikirimkan ke WhatsApp dengan format rincian produk lengkap.
                </p>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-food-orange btn-full btn-lg mt-3"
                >
                  <MessageCircle size={18} />
                  <span>Checkout Sekarang via WhatsApp</span>
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
