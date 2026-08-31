import React, { useState } from 'react';
import { 
  X, MapPin, User, ShoppingBag, ShieldCheck, 
  Truck, Star, Share2, Heart, CheckCircle2, 
  MessageCircle, Sparkles, Tag, Check, ArrowRight
} from 'lucide-react';
import { getProductWhatsAppUrl } from '../config/whatsapp';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [buyerNotes, setBuyerNotes] = useState('');
  const [addedToCartToast, setAddedToCartToast] = useState(false);

  if (!isOpen || !product) return null;

  const handleOrderWhatsApp = () => {
    const waUrl = getProductWhatsAppUrl(product, {
      notes: buyerNotes || 'Pemesanan langsung via website'
    });
    window.open(waUrl, '_blank');
  };

  const handleAddCartClick = () => {
    onAddToCart(product, quantity);
    setAddedToCartToast(true);
    setTimeout(() => {
      setAddedToCartToast(false);
    }, 2000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="modal-overlay animated-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="detail-modal-container glass-panel gradient-border-food">
        
        {/* Close button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Tutup">
          <X size={20} />
        </button>

        <div className="detail-modal-grid">
          
          {/* Left: Product Image Showcase */}
          <div className="detail-media-pane">
            <div className="detail-main-image-wrap">
              <img src={product.image} alt={product.name} className="detail-main-img" />
              {product.isUserUploaded && (
                <div className="badge-user-upload-lg">
                  <Sparkles size={14} className="inline mr-1" /> Produk Terunggah User
                </div>
              )}
              {discountPercent && (
                <div className="badge-discount-lg">Diskon {discountPercent}%</div>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="detail-trust-cards mt-4">
              <div className="trust-card-mini">
                <Truck size={18} className="text-amber" />
                <div>
                  <strong>Pengiriman Cepat</strong>
                  <span>Siap kirim ke seluruh kota</span>
                </div>
              </div>
              <div className="trust-card-mini">
                <ShieldCheck size={18} className="text-green" />
                <div>
                  <strong>Transaksi Langsung</strong>
                  <span>Hubungi penjual via WA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="detail-info-pane custom-scroll">
            
            <div className="detail-category-row">
              <span className="cat-badge-pill">{product.category?.toUpperCase()}</span>
              <span className="condition-badge-pill">{product.condition}</span>
              <span className="stock-badge-pill">Stok: {product.stock} unit</span>
            </div>

            <h2 className="detail-product-title">{product.name}</h2>

            {/* Rating & Sold count */}
            <div className="detail-rating-row">
              <div className="stars-mini">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span className="rating-score">{product.rating || 5.0}</span>
              <span className="divider-dot">•</span>
              <span className="sold-count-text">{product.soldCount || 0} Terjual</span>
              <button className="btn-share-mini" onClick={handleShare} title="Salin Tautan">
                <Share2 size={14} /> {copied ? 'Tersalin!' : 'Bagikan'}
              </button>
            </div>

            {/* Price Box */}
            <div className="detail-price-box glass-panel">
              <div className="price-label-sm">Harga Produk:</div>
              <div className="price-big-row">
                <span className="price-highlight text-amber">
                  Rp {Number(product.price).toLocaleString('id-ID')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="original-price-strike">
                    Rp {Number(product.originalPrice).toLocaleString('id-ID')}
                  </span>
                )}
              </div>
            </div>

            {/* Seller Information Box */}
            <div className="seller-profile-card glass-panel">
              <div className="seller-avatar-badge">
                <User size={20} className="text-amber" />
              </div>
              <div className="seller-profile-info">
                <h4>{product.sellerName || 'Penjual Terpercaya'}</h4>
                <div className="seller-meta-row">
                  <span><MapPin size={12} className="inline mr-1 text-amber" /> {product.location || 'Indonesia'}</span>
                  <span><MessageCircle size={12} className="inline mr-1 text-green" /> Respons Cepat</span>
                </div>
              </div>
            </div>

            {/* Tags / Promo Highlights */}
            {product.tags && product.tags.length > 0 && (
              <div className="detail-tags-row">
                {product.tags.map((t, idx) => (
                  <span key={idx} className="detail-tag-item">
                    <Tag size={12} className="inline mr-1 text-amber" /> {t}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="detail-desc-box">
              <h3>Deskripsi Produk:</h3>
              <p>{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="detail-qty-row">
              <span className="qty-label">Jumlah Pembelian:</span>
              <div className="qty-picker">
                <button 
                  type="button" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-val">{quantity}</span>
                <button 
                  type="button" 
                  onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
              <span className="subtotal-calc text-muted text-sm">
                Total: <strong className="text-amber">Rp {(product.price * quantity).toLocaleString('id-ID')}</strong>
              </span>
            </div>

            {/* Notes input */}
            <div className="form-group mt-2">
              <input 
                type="text"
                placeholder="Catatan untuk penjual (misal: warna, size, pertanyaan)..."
                value={buyerNotes}
                onChange={(e) => setBuyerNotes(e.target.value)}
                className="form-input text-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="detail-action-buttons mt-4">
              <button 
                type="button"
                className="btn btn-primary btn-food-orange btn-lg btn-order-wa"
                onClick={handleOrderWhatsApp}
              >
                <MessageCircle size={20} />
                <span>Beli / Hubungi Penjual via WhatsApp</span>
              </button>

              <button 
                type="button"
                className="btn btn-secondary btn-lg btn-add-cart"
                onClick={handleAddCartClick}
              >
                <ShoppingBag size={18} />
                <span>+ Ke Keranjang</span>
              </button>
            </div>

            {addedToCartToast && (
              <div className="toast-cart-added animated-fade-in">
                <CheckCircle2 size={16} className="text-green mr-1 inline" />
                <span>Berhasil ditambahkan ke keranjang belanja!</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
