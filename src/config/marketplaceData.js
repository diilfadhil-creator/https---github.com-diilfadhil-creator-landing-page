// Konfigurasi Data Marketplace & Penyimpanan Lokal (LocalStorage)

export const CATEGORIES = [
  { id: 'all', name: 'Semua Kategori', icon: '🛍️', count: 0 },
  { id: 'gadget', name: 'Gadget & Komputer', icon: '💻', count: 0 },
  { id: 'elektronik', name: 'Elektronik & Rumah', icon: '⚡', count: 0 },
  { id: 'fashion', name: 'Fashion & Pakaian', icon: '👕', count: 0 },
  { id: 'kuliner', name: 'Makanan & Kuliner', icon: '🍔', count: 0 },
  { id: 'otomotif', name: 'Otomotif & Motor', icon: '🛵', count: 0 },
  { id: 'hobi', name: 'Hobi & Kamera', icon: '📷', count: 0 },
  { id: 'lainnya', name: 'Produk Lainnya', icon: '📦', count: 0 }
];

export const PRESET_IMAGES = [
  {
    category: 'gadget',
    title: 'Smartphone Flagship',
    url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'gadget',
    title: 'Laptop Ultrabook',
    url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'elektronik',
    title: 'Wireless Headphone',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'elektronik',
    title: 'Smartwatch Sport',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'fashion',
    title: 'Sneakers Streetwear',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'fashion',
    title: 'Jaket Denim Casual',
    url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'kuliner',
    title: 'Ayam Bakar Rempah Madu',
    url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'kuliner',
    title: 'Kopi Biji Arabika Premium',
    url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'otomotif',
    title: 'Helm Full Face Sport',
    url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'hobi',
    title: 'Kamera Mirrorless Pro',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Apple iPhone 15 Pro Max 256GB Titanium Natural',
    category: 'gadget',
    price: 21499000,
    originalPrice: 23999000,
    condition: 'Baru (BNIB)',
    stock: 5,
    location: 'Jakarta Selatan',
    sellerName: 'iTech Official Store',
    sellerPhone: '085150962928',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    description: 'Garansi Resmi iBox Indonesia 1 Tahun. Kondisi Brand New In Box (Segel Greenpeel). Chip A17 Pro super kencang, kamera 48MP dengan 5x Optical Zoom, rangka Titanium ringan & mewah.',
    tags: ['Gratis Ongkir', 'Garansi Resmi', 'Diskon 10%'],
    rating: 4.9,
    soldCount: 38,
    isFeatured: true,
    isUserUploaded: false,
    createdAt: '2026-08-20T08:00:00.000Z'
  },
  {
    id: 'prod-2',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphone',
    category: 'elektronik',
    price: 4799000,
    originalPrice: 5999000,
    condition: 'Baru (BNIB)',
    stock: 12,
    location: 'Bandung',
    sellerName: 'AudioMania Studio',
    sellerPhone: '085150962928',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Headphone peredam kebisingan terbaik di kelasnya. Baterai tahan hingga 30 jam, mikrofon jernih dengan teknologi AI Voice Pickup, dan suara audiophile dengan codec LDAC.',
    tags: ['Bisa COD', 'Garansi 1 Thn', 'Best Seller'],
    rating: 4.9,
    soldCount: 94,
    isFeatured: true,
    isUserUploaded: false,
    createdAt: '2026-08-21T09:30:00.000Z'
  },
  {
    id: 'prod-3',
    name: 'Sepatu Sneaker Nike Air Jordan 1 Retro High OG Chicago',
    category: 'fashion',
    price: 3250000,
    originalPrice: 3800000,
    condition: 'Baru (Lengkap Box)',
    stock: 7,
    location: 'Surabaya',
    sellerName: 'Kicks Culture ID',
    sellerPhone: '085150962928',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    description: '100% Original Authentic Guarantee. Tersedia size 40, 41, 42, 43, 44. Kulit premium super empuk dan nyaman dipakai harian atau hangout.',
    tags: ['100% Original', 'Gratis Kaos Kaki', 'Free Ongkir'],
    rating: 4.8,
    soldCount: 112,
    isFeatured: false,
    isUserUploaded: false,
    createdAt: '2026-08-22T11:00:00.000Z'
  },
  {
    id: 'prod-4',
    name: 'Paket Kopi Arabika Single Origin Gayo Wine 250g (Biji / Bubuk)',
    category: 'kuliner',
    price: 85000,
    originalPrice: 110000,
    condition: 'Baru (Fresh Roast)',
    stock: 45,
    location: 'Aceh / Medan',
    sellerName: 'Roastery Nusantara',
    sellerPhone: '085150962928',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    description: 'Kopi Arabika proses Wine Fermentation dengan aroma fruity, anggur manis, dan aftertaste karamel yang sangat khas. Baru di-roast tiap minggu.',
    tags: ['Fresh Roast', 'Bisa Kirim Se-Indonesia'],
    rating: 5.0,
    soldCount: 260,
    isFeatured: true,
    isUserUploaded: false,
    createdAt: '2026-08-23T14:15:00.000Z'
  },
  {
    id: 'prod-5',
    name: 'Kamera Mirrorless Fujifilm X-T30 II Kit 15-45mm OIS PZ',
    category: 'hobi',
    price: 14200000,
    originalPrice: 15500000,
    condition: 'Bekas Like New (99%)',
    stock: 2,
    location: 'Yogyakarta',
    sellerName: 'CamCorner Jogja',
    sellerPhone: '085150962928',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    description: 'Kondisi mulus 99% tanpa lecet/jamur, SC rendah di bawah 3.000 shot. Lengkap dus, buku panduan, baterai original, charger, strap & bonus filter UV.',
    tags: ['Like New 99%', 'Bisa Nego WA', 'Bonus Tas'],
    rating: 4.9,
    soldCount: 15,
    isFeatured: false,
    isUserUploaded: false,
    createdAt: '2026-08-24T16:45:00.000Z'
  },
  {
    id: 'prod-6',
    name: 'Helm Full Face KYT TT-Course Grand Prix Edition Glossy',
    category: 'otomotif',
    price: 1350000,
    originalPrice: 1500000,
    condition: 'Baru (BNIB)',
    stock: 10,
    location: 'Tangerang',
    sellerName: 'Helmet Garage ID',
    sellerPhone: '085150962928',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    description: 'Sertifikasi SNI & DOT, bobot ringan aerodinamis, busa interior empuk dapat dilepas dan dicuci. Dilengkapi flat visor smoke tahan gores.',
    tags: ['SNI & DOT', 'Free Balaclava', 'Bisa COD'],
    rating: 4.8,
    soldCount: 78,
    isFeatured: false,
    isUserUploaded: false,
    createdAt: '2026-08-25T10:00:00.000Z'
  },
  {
    id: 'prod-7',
    name: 'Smart RGB LED Floor Lamp Minimalis Nordic with App Control',
    category: 'elektronik',
    price: 299000,
    originalPrice: 450000,
    condition: 'Baru (Segel)',
    stock: 30,
    location: 'Jakarta Barat',
    sellerName: 'SmartHome Living',
    sellerPhone: '085150962928',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    description: 'Lampu sudut ruangan estetik dengan 16 juta warna RGB, sinkronisasi irama musik, remote control wireless, dan kontrol aplikasi smartphone Android/iOS.',
    tags: ['Hemat Listrik', 'Estetik Room', 'Diskon 33%'],
    rating: 4.7,
    soldCount: 145,
    isFeatured: false,
    isUserUploaded: false,
    createdAt: '2026-08-26T12:00:00.000Z'
  },
  {
    id: 'prod-8',
    name: 'Jaket Bomber Leather Vintage Classic Biker Style Pria',
    category: 'fashion',
    price: 485000,
    originalPrice: 650000,
    condition: 'Baru (Produksi Sendiri)',
    stock: 18,
    location: 'Garut / Bandung',
    sellerName: 'LeatherCraft ID',
    sellerPhone: '085150962928',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    description: 'Material kulit sintetis Grade A tebal, tahan angin (windproof), furing dalam katun adem tidak gerah. Jahitan dobel kuat dan resleting YKK premium.',
    tags: ['Windproof', 'Anti Air Ringan', 'Size M - XXL'],
    rating: 4.8,
    soldCount: 88,
    isFeatured: false,
    isUserUploaded: false,
    createdAt: '2026-08-27T15:20:00.000Z'
  }
];

const LOCAL_STORAGE_KEY = 'pasarhub_user_products_v1';

// Ambil semua produk (dari LocalStorage jika ada, atau gunakan default)
export function getStoredProducts() {
  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localData) {
      const parsed = JSON.parse(localData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Gagal membaca data produk dari localStorage:', err);
  }
  return INITIAL_PRODUCTS;
}

// Simpan daftar produk ke LocalStorage
export function saveProductsToStorage(products) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Gagal menyimpan produk ke localStorage:', err);
  }
}

// Tambah produk baru dari user
export function addProductToStorage(newProduct) {
  const currentProducts = getStoredProducts();
  const updated = [newProduct, ...currentProducts];
  saveProductsToStorage(updated);
  return updated;
}

// Hapus produk
export function deleteProductFromStorage(productId) {
  const currentProducts = getStoredProducts();
  const updated = currentProducts.filter((p) => p.id !== productId);
  saveProductsToStorage(updated);
  return updated;
}

// Reset ke data awal
export function resetProductsToDefault() {
  saveProductsToStorage(INITIAL_PRODUCTS);
  return INITIAL_PRODUCTS;
}
