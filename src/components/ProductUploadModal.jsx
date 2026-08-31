import React, { useState, useRef } from 'react';
import { 
  Upload, Image, Plus, Check, X, Sparkles, Tag, 
  MapPin, Phone, User, Layers, AlertCircle, 
  CheckCircle2, ArrowRight, Eye, Camera, Package, ShieldCheck,
  Cloud, CloudCheck, Loader2
} from 'lucide-react';
import { CATEGORIES, PRESET_IMAGES } from '../config/marketplaceData';

export default function ProductUploadModal({ isOpen, onClose, onProductUploaded, isCloudConnected }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'gadget',
    price: '',
    originalPrice: '',
    condition: 'Baru (BNIB)',
    stock: 1,
    location: 'Jakarta Selatan',
    sellerName: '',
    sellerPhone: '',
    description: '',
    image: '',
    tags: ['Gratis Ongkir']
  });

  const [imageTab, setImageTab] = useState('upload'); // 'upload', 'preset', 'url'
  const [customTagInput, setCustomTagInput] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Handle file upload to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Ukuran file foto maksimal 5 MB!');
        return;
      }
      setErrorMsg('');
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset selection
  const handleSelectPreset = (presetUrl) => {
    setFormData((prev) => ({ ...prev, image: presetUrl }));
  };

  // Toggle default tag
  const toggleTag = (tag) => {
    setFormData((prev) => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag]
      };
    });
  };

  // Add custom tag
  const handleAddCustomTag = (e) => {
    e.preventDefault();
    if (customTagInput.trim() && !formData.tags.includes(customTagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, customTagInput.trim()]
      }));
      setCustomTagInput('');
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Nama produk wajib diisi!');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setErrorMsg('Harga produk harus lebih dari 0!');
      return;
    }
    if (!formData.sellerName.trim()) {
      setErrorMsg('Nama penjual / toko wajib diisi!');
      return;
    }

    setIsSubmitting(true);

    try {
      // Default image if empty
      const finalImage = formData.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80';

      const newProduct = {
        id: 'user-prod-' + Date.now(),
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        condition: formData.condition,
        stock: Number(formData.stock) || 1,
        location: formData.location || 'Indonesia',
        sellerName: formData.sellerName.trim(),
        sellerPhone: formData.sellerPhone.trim() || '085150962928',
        image: finalImage,
        description: formData.description.trim() || 'Produk berkualitas tinggi siap dikirim ke alamat Anda.',
        tags: formData.tags.length > 0 ? formData.tags : ['Produk Baru'],
        rating: 5.0,
        soldCount: 0,
        isFeatured: false,
        isUserUploaded: true,
        createdAt: new Date().toISOString()
      };

      setCreatedProduct(newProduct);
      if (onProductUploaded) {
        await onProductUploaded(newProduct);
      }
      setUploadSuccess(true);
    } catch (err) {
      console.error('Gagal submit produk:', err);
      setErrorMsg(err.message || 'Gagal memproses upload produk. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setUploadSuccess(false);
    setCreatedProduct(null);
    onClose();
  };

  return (
    <div className="modal-overlay animated-fade-in" onClick={(e) => e.target === e.currentTarget && handleResetAndClose()}>
      <div className="upload-modal-container glass-panel gradient-border-food">
        
        {/* Header Modal */}
        <div className="upload-modal-header">
          <div className="header-badge-title">
            <div className="flex items-center gap-2 mb-1">
              <span className="tag tag-amber">
                <Sparkles size={14} className="inline mr-1" /> Marketplace Studio Jual
              </span>
              {isCloudConnected ? (
                <span className="tag tag-green text-xs" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  ☁️ Cloud Database Publik
                </span>
              ) : (
                <span className="tag tag-blue text-xs" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  📦 Mode Penyimpanan Lokal
                </span>
              )}
            </div>
            <h2>Unggah & Jual Produk Anda</h2>
            <p className="text-muted text-sm">
              Isi formulir di bawah ini untuk memasang produk Anda di etalase marketplace secara instan tanpa biaya admin (100% Gratis).
            </p>
          </div>
          <button className="modal-close-btn" onClick={handleResetAndClose} aria-label="Tutup">
            <X size={20} />
          </button>
        </div>

        {uploadSuccess && createdProduct ? (
          <div className="upload-success-view animated-fade-in">
            <div className="success-icon-circle">
              <CheckCircle2 size={56} className="text-green" />
            </div>
            <h3>Selamat! Produk Anda Berhasil Ditayangkan 🎉</h3>
            <p className="text-muted">
              Produk <strong>"{createdProduct.name}"</strong> sekarang sudah aktif di etalase marketplace dan langsung dapat dilihat serta dipesan oleh calon pembeli melalui WhatsApp Anda.
            </p>

            <div className="preview-product-card-mini glass-panel mt-4">
              <img src={createdProduct.image} alt={createdProduct.name} className="mini-thumb" />
              <div className="mini-info">
                <span className="mini-cat">{createdProduct.category?.toUpperCase()}</span>
                <h4>{createdProduct.name}</h4>
                <div className="mini-price text-amber">
                  Rp {Number(createdProduct.price).toLocaleString('id-ID')}
                </div>
                <div className="mini-loc">
                  <MapPin size={12} className="inline mr-1" /> {createdProduct.location} • Penjual: {createdProduct.sellerName}
                </div>
              </div>
            </div>

            <div className="success-actions mt-6">
              <button 
                className="btn btn-primary btn-food-orange btn-lg" 
                onClick={handleResetAndClose}
              >
                <span>Lihat di Etalase Sekarang</span>
                <ArrowRight size={18} />
              </button>
              <button 
                className="btn btn-secondary btn-lg ml-3"
                onClick={() => {
                  setUploadSuccess(false);
                  setCreatedProduct(null);
                  setFormData({
                    name: '',
                    category: 'gadget',
                    price: '',
                    originalPrice: '',
                    condition: 'Baru (BNIB)',
                    stock: 1,
                    location: 'Jakarta Selatan',
                    sellerName: '',
                    sellerPhone: '',
                    description: '',
                    image: '',
                    tags: ['Gratis Ongkir']
                  });
                }}
              >
                <Plus size={16} />
                <span>Unggah Produk Lain</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="upload-form-grid">
            
            {/* Left Column: Image & Media Upload */}
            <div className="upload-col-media">
              <label className="form-label-section">
                <Camera size={16} className="text-amber inline mr-1" />
                <span>Foto Produk / Cover Etalase *</span>
              </label>

              {/* Image Source Tabs */}
              <div className="image-tabs-picker">
                <button
                  type="button"
                  className={`img-tab-btn ${imageTab === 'upload' ? 'active' : ''}`}
                  onClick={() => setImageTab('upload')}
                >
                  <Upload size={14} />
                  <span>Upload Foto</span>
                </button>
                <button
                  type="button"
                  className={`img-tab-btn ${imageTab === 'preset' ? 'active' : ''}`}
                  onClick={() => setImageTab('preset')}
                >
                  <Sparkles size={14} />
                  <span>Pilihan Siap Pakai</span>
                </button>
                <button
                  type="button"
                  className={`img-tab-btn ${imageTab === 'url' ? 'active' : ''}`}
                  onClick={() => setImageTab('url')}
                >
                  <Image size={14} />
                  <span>Link URL</span>
                </button>
              </div>

              {/* Tab 1: Direct File Upload */}
              {imageTab === 'upload' && (
                <div 
                  className="upload-dropzone glass-panel"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                    style={{ display: 'none' }}
                  />
                  {formData.image ? (
                    <div className="dropzone-preview">
                      <img src={formData.image} alt="Preview" className="preview-img-full" />
                      <div className="preview-overlay">
                        <span>Ganti Foto</span>
                      </div>
                    </div>
                  ) : (
                    <div className="dropzone-empty">
                      <div className="dropzone-icon bg-amber-soft">
                        <Upload size={28} className="text-amber" />
                      </div>
                      <p className="font-semibold text-sm">Klik untuk pilih gambar dari galeri HP / Laptop</p>
                      <span className="text-xs text-muted">Format JPG, PNG, WEBP (Maks 5MB)</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Presets by category */}
              {imageTab === 'preset' && (
                <div className="presets-gallery-grid custom-scroll">
                  {PRESET_IMAGES.map((preset, index) => (
                    <div 
                      key={index} 
                      className={`preset-thumb-card ${formData.image === preset.url ? 'selected' : ''}`}
                      onClick={() => handleSelectPreset(preset.url)}
                    >
                      <img src={preset.url} alt={preset.title} />
                      <span className="preset-caption">{preset.title}</span>
                      {formData.image === preset.url && (
                        <div className="preset-check-badge">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: URL */}
              {imageTab === 'url' && (
                <div className="url-input-box">
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/photo-xxx..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="form-input text-sm"
                  />
                  {formData.image && (
                    <div className="url-preview-thumb mt-2">
                      <img src={formData.image} alt="Preview URL" />
                    </div>
                  )}
                </div>
              )}

              {/* Tags Selector */}
              <div className="tags-manager-section mt-4">
                <label className="form-label-section">
                  <Tag size={16} className="text-amber inline mr-1" />
                  <span>Label & Promo Produk:</span>
                </label>
                <div className="tags-quick-picker">
                  {['Gratis Ongkir', 'Bisa Nego WA', 'Baru (BNIB)', 'Garansi Resmi', 'Bisa COD', 'Diskon 10%', 'Original 100%'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`tag-toggle-chip ${formData.tags.includes(t) ? 'active' : ''}`}
                      onClick={() => toggleTag(t)}
                    >
                      {formData.tags.includes(t) && <Check size={12} className="inline mr-1" />}
                      {t}
                    </button>
                  ))}
                </div>

                <div className="custom-tag-row mt-2">
                  <input 
                    type="text" 
                    placeholder="+ Tambah label custom..."
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    className="form-input text-xs"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddCustomTag}
                    className="btn btn-secondary btn-xs"
                  >
                    Tambah
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Details & Seller Information */}
            <div className="upload-col-info">
              
              {errorMsg && (
                <div className="upload-error-banner animated-shake">
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Nama Produk */}
              <div className="form-group mb-3">
                <label className="form-label">
                  Nama Barang / Judul Produk <span className="text-amber">*</span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Contoh: iPhone 14 Pro Max 128GB Deep Purple Fullset"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              {/* 2. Kategori & Kondisi */}
              <div className="form-grid-2 mb-3">
                <div className="form-group">
                  <label className="form-label">Kategori</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-select"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Kondisi Barang</label>
                  <select 
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="form-select"
                  >
                    <option value="Baru (BNIB)">Baru (Segel / BNIB)</option>
                    <option value="Bekas Like New (99%)">Bekas Mulus Like New (99%)</option>
                    <option value="Bekas Normal (90%)">Bekas Normal (90%)</option>
                    <option value="Refurbished / Servis">Refurbished / Rekondisi</option>
                  </select>
                </div>
              </div>

              {/* 3. Harga & Diskon */}
              <div className="form-grid-2 mb-3">
                <div className="form-group">
                  <label className="form-label">
                    Harga Jual (Rp) <span className="text-amber">*</span>
                  </label>
                  <input 
                    type="number"
                    required
                    min="1000"
                    placeholder="Contoh: 1500000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="form-input font-mono"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Harga Coret / Asli (Opsional)</label>
                  <input 
                    type="number"
                    min="0"
                    placeholder="Contoh: 1800000"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="form-input font-mono"
                  />
                </div>
              </div>

              {/* 4. Lokasi & Stok */}
              <div className="form-grid-2 mb-3">
                <div className="form-group">
                  <label className="form-label">Kota / Lokasi Pengiriman</label>
                  <input 
                    type="text"
                    placeholder="Contoh: Jakarta Selatan, Surabaya, dll"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Jumlah Stok Siap Kirim</label>
                  <input 
                    type="number"
                    min="1"
                    placeholder="1"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="form-input font-mono"
                  />
                </div>
              </div>

              {/* 5. Info Penjual & WhatsApp */}
              <div className="form-section-card glass-panel mb-3">
                <div className="card-section-head">
                  <Phone size={15} className="text-amber inline mr-1" />
                  <span className="font-semibold text-sm">Kontak Penjual (Tujuan Order WhatsApp):</span>
                </div>
                
                <div className="form-grid-2 mt-2">
                  <div className="form-group">
                    <label className="form-label text-xs">Nama Anda / Nama Toko *</label>
                    <input 
                      type="text"
                      required
                      placeholder="Contoh: Toko Berkah Jaya"
                      value={formData.sellerName}
                      onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                      className="form-input text-sm"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label text-xs">Nomor WhatsApp Pembeli Menghubungi</label>
                    <input 
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      value={formData.sellerPhone}
                      onChange={(e) => setFormData({ ...formData, sellerPhone: e.target.value })}
                      className="form-input text-sm font-mono"
                    />
                  </div>
                </div>
                <span className="text-xs text-muted block mt-1">
                  *Nomor ini akan langsung menerima pesan chat saat pembeli menekan tombol beli di etalase.
                </span>
              </div>

              {/* 6. Deskripsi Barang */}
              <div className="form-group mb-3">
                <label className="form-label">Deskripsi Lengkap & Spesifikasi Produk</label>
                <textarea 
                  rows={3}
                  placeholder="Jelaskan kondisi detail barang, kelengkapan aksesoris, spesifikasi, dan keunggulan produk Anda..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-input text-sm"
                />
              </div>

              {/* Live Card Mini Preview */}
              <div className="live-preview-box glass-panel">
                <div className="preview-badge-mini">
                  <Eye size={12} className="inline mr-1" /> Tampilan Kartu di Etalase:
                </div>
                <div className="mini-mock-card">
                  <img 
                    src={formData.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'} 
                    alt="Preview" 
                    className="mock-img"
                  />
                  <div className="mock-details">
                    <span className="mock-cat">{formData.category.toUpperCase()} • {formData.location || 'Indonesia'}</span>
                    <h5 className="mock-title">{formData.name || 'Judul Nama Produk Anda'}</h5>
                    
                    <div className="mock-price-row">
                      <strong className="text-amber">
                        Rp {formData.price ? Number(formData.price).toLocaleString('id-ID') : '0'}
                      </strong>
                      {formData.originalPrice && Number(formData.originalPrice) > Number(formData.price) && (
                        <span className="price-original">
                          Rp {Number(formData.originalPrice).toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>

                    <div className="card-seller-row">
                      <User size={12} className="text-muted" />
                      <span>{formData.sellerName || 'Nama Toko Anda'}</span>
                    </div>

                    <div className="tags-row-mini">
                      {formData.tags.slice(0, 2).map((t, i) => (
                        <span key={i} className="tag-mini">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary btn-food-orange btn-full btn-lg mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Memproses & Menyimpan Produk...</span>
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    <span>Publikasikan & Jual Produk Sekarang</span>
                  </>
                )}
              </button>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}
