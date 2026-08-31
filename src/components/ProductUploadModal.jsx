import React, { useState, useRef } from 'react';
import { 
  Upload, Image, Plus, Check, X, Sparkles, Tag, 
  MapPin, Phone, User, Layers, AlertCircle, 
  CheckCircle2, ArrowRight, Eye, Camera, Package, ShieldCheck
} from 'lucide-react';
import { CATEGORIES, PRESET_IMAGES } from '../config/marketplaceData';

export default function ProductUploadModal({ isOpen, onClose, onProductUploaded }) {
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
  const handleSubmit = (e) => {
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
    onProductUploaded(newProduct);
    setUploadSuccess(true);
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
            <span className="tag tag-amber">
              <Sparkles size={14} className="inline mr-1" /> PasarHub Studio Jual
            </span>
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
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="upload-form-grid">
            
            {/* Left Column: Form Details */}
            <div className="upload-form-fields">
              
              {errorMsg && (
                <div className="alert-error-box animated-fade-in">
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Nama Produk */}
              <div className="form-group">
                <label>Nama Produk <span className="text-red">*</span></label>
                <input 
                  type="text"
                  placeholder="Contoh: Kamera Sony A7 III / Jaket Kulit Vintage / Kopi Arabika"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              {/* 2. Kategori & Kondisi */}
              <div className="form-row-2">
                <div className="form-group">
                  <label>Kategori Produk</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-select"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Kondisi Barang</label>
                  <select 
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="form-select"
                  >
                    <option value="Baru (BNIB)">Baru (BNIB)</option>
                    <option value="Baru (Produksi Sendiri)">Baru (Produksi Sendiri / Home-made)</option>
                    <option value="Bekas Like New (99%)">Bekas Like New (99%)</option>
                    <option value="Bekas Sangat Baik">Bekas Sangat Baik (Normal)</option>
                    <option value="Bekas Layak Pakai">Bekas Layak Pakai</option>
                  </select>
                </div>
              </div>

              {/* 3. Harga & Harga Coret Promo */}
              <div className="form-row-2">
                <div className="form-group">
                  <label>Harga Jual (Rp) <span className="text-red">*</span></label>
                  <input 
                    type="number"
                    placeholder="Contoh: 150000"
                    required
                    min="1000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Harga Asli / Coret (Opsional)</label>
                  <input 
                    type="number"
                    placeholder="Contoh: 200000"
                    min="1000"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* 4. Stok & Lokasi */}
              <div className="form-row-2">
                <div className="form-group">
                  <label>Jumlah Stok</label>
                  <input 
                    type="number"
                    min="1"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Lokasi Penjual (Kota/Kabupaten)</label>
                  <input 
                    type="text"
                    placeholder="Contoh: Jakarta Selatan / Bandung / Surabaya"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* 5. Info Penjual & WhatsApp */}
              <div className="form-row-2">
                <div className="form-group">
                  <label>Nama Toko / Penjual <span className="text-red">*</span></label>
                  <input 
                    type="text"
                    placeholder="Nama Anda atau Nama Toko Anda"
                    required
                    value={formData.sellerName}
                    onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Nomor WhatsApp Pembeli Menghubungi</label>
                  <input 
                    type="tel"
                    placeholder="081234567890"
                    value={formData.sellerPhone}
                    onChange={(e) => setFormData({ ...formData, sellerPhone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* 6. Deskripsi Produk */}
              <div className="form-group">
                <label>Deskripsi & Spesifikasi Produk Lengkap</label>
                <textarea 
                  rows={3}
                  placeholder="Jelaskan spesifikasi produk, keunggulan, kelengkapan aksesoris, garansi, atau cara penggunaan..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-input"
                />
              </div>

              {/* 7. Label / Tags Promosi */}
              <div className="form-group">
                <label>Label & Keunggulan Produk</label>
                <div className="tag-chips-wrapper">
                  {['Gratis Ongkir', 'Bisa COD', 'Garansi Resmi', '100% Original', 'Diskon Spesial', 'Kualitas Premium'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`tag-chip ${formData.tags.includes(t) ? 'active' : ''}`}
                      onClick={() => toggleTag(t)}
                    >
                      {formData.tags.includes(t) && <Check size={12} className="inline mr-1" />}
                      {t}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Media Upload & Live Card Preview */}
            <div className="upload-media-preview-pane">
              
              <div className="media-selector-box glass-panel">
                <label className="section-mini-label">Foto Produk <span className="text-red">*</span></label>
                
                {/* Tabs Image Source */}
                <div className="media-tabs">
                  <button 
                    type="button" 
                    className={`tab-btn ${imageTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setImageTab('upload')}
                  >
                    <Upload size={14} /> Upload File
                  </button>
                  <button 
                    type="button" 
                    className={`tab-btn ${imageTab === 'preset' ? 'active' : ''}`}
                    onClick={() => setImageTab('preset')}
                  >
                    <Sparkles size={14} /> Pilih Contoh
                  </button>
                  <button 
                    type="button" 
                    className={`tab-btn ${imageTab === 'url' ? 'active' : ''}`}
                    onClick={() => setImageTab('url')}
                  >
                    <Image size={14} /> URL Link
                  </button>
                </div>

                {/* Tab 1: File Upload */}
                {imageTab === 'upload' && (
                  <div 
                    className="dropzone-box" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                    />
                    <div className="dropzone-inner">
                      <Camera size={32} className="text-amber mb-2" />
                      <p className="text-sm font-semibold">Klik untuk Pilih Foto dari Perangkat</p>
                      <span className="text-xs text-muted">Format JPG, PNG, WEBP (Maks 5 MB)</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Preset Photos */}
                {imageTab === 'preset' && (
                  <div className="preset-grid custom-scroll">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <div 
                        key={idx}
                        className={`preset-item ${formData.image === preset.url ? 'selected' : ''}`}
                        onClick={() => handleSelectPreset(preset.url)}
                      >
                        <img src={preset.url} alt={preset.title} />
                        <span className="preset-title">{preset.title}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 3: URL Link */}
                {imageTab === 'url' && (
                  <div className="url-input-box">
                    <input 
                      type="url"
                      placeholder="Tempel tautan gambar https://..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="form-input"
                    />
                  </div>
                )}

              </div>

              {/* Live Preview Card */}
              <div className="live-preview-box">
                <div className="preview-label">
                  <Eye size={14} className="inline mr-1 text-amber" /> Pratinjau Tampilan Produk di Katalog:
                </div>

                <div className="product-card glass-panel preview-mode gradient-border-food">
                  <div className="product-image-wrap">
                    <img 
                      src={formData.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'} 
                      alt="Preview" 
                      className="product-img"
                    />
                    <div className="badge-condition-pill">{formData.condition}</div>
                    <div className="badge-user-upload">Produk Anda</div>
                  </div>

                  <div className="product-card-info">
                    <div className="card-top-meta">
                      <span className="cat-pill">{formData.category?.toUpperCase()}</span>
                      <span className="loc-pill"><MapPin size={11} /> {formData.location || 'Indonesia'}</span>
                    </div>

                    <h4 className="prod-title">{formData.name || 'Nama Produk Anda Akan Muncul di Sini'}</h4>

                    <div className="price-row">
                      <span className="price-val text-amber">
                        Rp {formData.price ? Number(formData.price).toLocaleString('id-ID') : '0'}
                      </span>
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
                className="btn btn-primary btn-food-orange btn-full btn-lg mt-4"
              >
                <Plus size={20} />
                <span>Publikasikan & Jual Produk Sekarang</span>
              </button>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}
