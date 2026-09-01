import React, { useState, useMemo } from 'react';
import { 
  Search,
  MapPin, User, Star, ShoppingBag, Eye, 
  Plus, Sparkles, Trash2, ArrowUpDown, RefreshCw, MessageCircle,
  Loader2, Flame
} from 'lucide-react';
import { CATEGORIES } from '../config/marketplaceData';
import { getProductWhatsAppUrl } from '../config/whatsapp';

export default function ProductCatalog({ 
  products, 
  isLoading = false,
  isCloudConnected = false,
  onRefresh,
  onSelectProduct, 
  onOpenUpload, 
  onAddToCart,
  onDeleteProduct,
  onResetProducts 
}) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price-low', 'price-high', 'popular'
  const [conditionFilter, setConditionFilter] = useState('all'); // 'all', 'baru', 'bekas', 'my-products'

  // Hitung jumlah produk per kategori
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length, 'my-products': products.filter((p) => p.isUserUploaded).length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = products.filter((p) => p.category === cat.id).length;
      }
    });
    return counts;
  }, [products]);

  // Filter & Urutkan Produk
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Filter Kategori
        if (selectedCat === 'my-products') {
          if (!p.isUserUploaded) return false;
        } else if (selectedCat !== 'all' && p.category !== selectedCat) {
          return false;
        }

        // Filter Kondisi
        if (conditionFilter === 'baru' && !p.condition?.toLowerCase().includes('baru')) {
          return false;
        }
        if (conditionFilter === 'bekas' && !p.condition?.toLowerCase().includes('bekas')) {
          return false;
        }

        // Filter Pencarian
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name?.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          const matchSeller = p.sellerName?.toLowerCase().includes(q);
          const matchLoc = p.location?.toLowerCase().includes(q);
          const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q));
          return matchName || matchDesc || matchSeller || matchLoc || matchTags;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'popular') return (b.soldCount || 0) - (a.soldCount || 0);
        // Default newest
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [products, selectedCat, searchQuery, sortBy, conditionFilter]);

  const handleQuickOrderWA = (e, product) => {
    e.stopPropagation();
    const waUrl = getProductWhatsAppUrl(product);
    window.open(waUrl, '_blank');
  };

  const handleQuickAddToCart = (e, product) => {
    e.stopPropagation();
    onAddToCart(product, 1);
  };

  return (
    <section id="katalog" className="section catalog-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="tag tag-amber">
              <Sparkles size={14} className="inline mr-1" /> Etalase Produk Serba Ada
            </span>
            {isCloudConnected ? (
              <span className="tag tag-green text-xs" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                🟢 Cloud Sync Realtime
              </span>
            ) : (
              <span className="tag tag-blue text-xs" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                🟡 Mode Cache Lokal
              </span>
            )}
          </div>
          <h2>Jelajahi & Beli <span className="gradient-text-food">Produk Pilihan</span></h2>
          <p>Temukan ribuan barang berkualitas dari berbagai kategori atau unggah produk Anda sendiri untuk langsung dipasarkan ke seluruh pembeli.</p>

          {/* Action Top Banner */}
          <div className="catalog-cta-strip glass-panel mt-6 gradient-border-food">
            <div className="cta-strip-left">
              <div className="strip-icon-circle bg-orange-gradient">
                <Plus size={24} className="text-white" />
              </div>
              <div className="strip-text">
                <h4>Punya Barang yang Ingin Dijual Hari Ini?</h4>
                <p>Pasang iklan produk Anda gratis tanpa biaya admin. Terhubung langsung dengan jutaan calon pembeli via WhatsApp!</p>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-food-orange btn-lg"
              onClick={onOpenUpload}
            >
              <Plus size={18} />
              <span>+ Upload Produk Sekarang</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="catalog-filters-container glass-panel">
          
          {/* Category Tabs */}
          <div className="cat-tabs-scroll custom-scroll">
            <button
              className={`cat-tab-pill ${selectedCat === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCat('all')}
            >
              <span>🛍️ Semua Produk</span>
              <span className="cat-counter">{categoryCounts.all || 0}</span>
            </button>

            {categoryCounts['my-products'] > 0 && (
              <button
                className={`cat-tab-pill tab-my-prod ${selectedCat === 'my-products' ? 'active' : ''}`}
                onClick={() => setSelectedCat('my-products')}
              >
                <span>✨ Unggahan Anda</span>
                <span className="cat-counter">{categoryCounts['my-products']}</span>
              </button>
            )}

            {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
              <button
                key={cat.id}
                className={`cat-tab-pill ${selectedCat === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat.id)}
              >
                <span>{cat.icon} {cat.name}</span>
                <span className="cat-counter">{categoryCounts[cat.id] || 0}</span>
              </button>
            ))}
          </div>

          {/* Search & Sort Bar */}
          <div className="catalog-search-sort-bar">
            
            {/* Search Input */}
            <div className="search-input-wrap">
              <Search size={18} className="search-icon text-muted" />
              <input
                type="text"
                placeholder="Cari nama barang, kategori, lokasi, atau nama penjual..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="search-clear-btn" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Condition Filters */}
            <div className="condition-filter-group">
              <button 
                className={`cond-btn ${conditionFilter === 'all' ? 'active' : ''}`}
                onClick={() => setConditionFilter('all')}
              >
                Semua Kondisi
              </button>
              <button 
                className={`cond-btn ${conditionFilter === 'baru' ? 'active' : ''}`}
                onClick={() => setConditionFilter('baru')}
              >
                Kondisi Baru
              </button>
              <button 
                className={`cond-btn ${conditionFilter === 'bekas' ? 'active' : ''}`}
                onClick={() => setConditionFilter('bekas')}
              >
                Bekas Berkualitas
              </button>
            </div>

            {/* Sort Select */}
            <div className="sort-dropdown-wrap">
              <ArrowUpDown size={15} className="sort-icon text-amber" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="newest">Terbaru Ditambahkan</option>
                <option value="price-low">Harga: Termurah ke Termahal</option>
                <option value="price-high">Harga: Termahal ke Termurah</option>
                <option value="popular">Paling Banyak Terjual</option>
              </select>
            </div>

          </div>

        </div>

        {/* Results Counter & Actions */}
        <div className="results-status-bar">
          <span className="text-muted text-sm">
            Menampilkan <strong>{filteredProducts.length}</strong> produk {searchQuery && `untuk pencarian "${searchQuery}"`}
          </span>
          <div className="flex items-center gap-3">
            {onRefresh && (
              <button 
                className="btn-text-reset text-xs text-muted"
                onClick={onRefresh}
                title="Segarkan data dari server"
              >
                <RefreshCw size={12} className={`inline mr-1 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
              </button>
            )}
            <button 
              className="btn-text-reset text-xs text-muted"
              onClick={onResetProducts}
              title="Kembalikan produk ke bawaan sistem"
            >
              <RefreshCw size={12} className="inline mr-1" /> Reset Data
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="loading-grid-state text-center py-12">
            <Loader2 size={40} className="text-amber animate-spin inline mb-3" />
            <p className="text-muted text-sm">Memuat etalase produk dari Cloud Database...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products-box glass-panel text-center">
            <div className="no-products-icon">
              <Search size={48} className="text-muted" />
            </div>
            <h3>Produk Tidak Ditemukan</h3>
            <p className="text-muted text-sm">
              Tidak ada produk yang cocok dengan filter atau kata kunci pencarian Anda.
            </p>
            <div className="no-products-actions mt-4">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => { setSearchQuery(''); setSelectedCat('all'); setConditionFilter('all'); }}
              >
                Reset Semua Filter
              </button>
              <button 
                className="btn btn-primary btn-food-orange btn-sm"
                onClick={onOpenUpload}
              >
                <Plus size={16} /> + Upload Produk Baru
              </button>
            </div>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const discountPercent = product.originalPrice && product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : null;

              return (
                <div 
                  key={product.id}
                  className="product-card glass-panel gradient-border-food animated-fade-in"
                  onClick={() => onSelectProduct(product)}
                >
                  
                  {/* Media Thumbnail */}
                  <div className="product-card-media">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      loading="lazy"
                      className="product-thumb-img"
                    />
                    
                    {discountPercent && (
                      <div className="badge-discount-top">Diskon {discountPercent}%</div>
                    )}

                    <div className="badge-condition-pill">{product.condition}</div>

                    {product.isFeatured && (
                      <div className="badge-featured-gold">
                        <Flame size={11} className="inline mr-1" /> Featured
                      </div>
                    )}

                    {product.isUserUploaded && (
                      <div className="badge-user-upload">
                        <Sparkles size={11} className="inline mr-1" /> Produk Anda
                      </div>
                    )}

                    {product.isUserUploaded && (
                      <button 
                        className="btn-delete-user-prod" 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Hapus produk "${product.name}"?`)) {
                            onDeleteProduct(product.id);
                          }
                        }}
                        title="Hapus Produk Ini"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="product-card-info">
                    
                    <div className="card-top-meta">
                      <span className="cat-pill">{product.category?.toUpperCase()}</span>
                      <span className="loc-pill">
                        <MapPin size={11} className="inline mr-1 text-amber" /> {product.location}
                      </span>
                    </div>

                    <h3 className="prod-title" title={product.name}>
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="price-row">
                      <span className="price-val text-amber">
                        Rp {Number(product.price).toLocaleString('id-ID')}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="price-original">
                          Rp {Number(product.originalPrice).toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>

                    {/* Rating & Seller */}
                    <div className="card-sub-meta">
                      <div className="rating-pill">
                        <Star size={12} fill="#f59e0b" color="#f59e0b" />
                        <span>{product.rating || 5.0}</span>
                        <span className="sold-muted">({product.soldCount || 0} terjual)</span>
                      </div>
                      <div className="seller-name-tag" title={product.sellerName}>
                        <User size={12} className="inline mr-1 text-muted" />
                        <span>{product.sellerName}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="tags-row-mini">
                        {(Array.isArray(product.tags) ? product.tags : []).slice(0, 2).map((t, idx) => (
                          <span key={idx} className="tag-mini">{t}</span>
                        ))}
                      </div>
                    )}

                    {/* Card Actions */}
                    <div className="card-actions-grid mt-3">
                      <button 
                        className="btn btn-secondary btn-sm btn-card-detail"
                        onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
                      >
                        <Eye size={15} />
                        <span>Detail</span>
                      </button>

                      <button 
                        className="btn btn-secondary btn-sm btn-card-cart"
                        onClick={(e) => handleQuickAddToCart(e, product)}
                        title="Tambah ke Keranjang"
                      >
                        <ShoppingBag size={15} />
                      </button>

                      <button 
                        className="btn btn-primary btn-food-orange btn-sm btn-card-wa"
                        onClick={(e) => handleQuickOrderWA(e, product)}
                        title="Order via WhatsApp"
                      >
                        <MessageCircle size={15} />
                        <span>Beli</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
