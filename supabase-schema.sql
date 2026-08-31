-- ==============================================================================
-- 🚀 SKRIP SCHEMA DATABASE SUPABASE UNTUK MARKETPLACE NUSANTARA
-- ==============================================================================
-- CARA PENGGUNAAN:
-- 1. Buka dashboard Supabase Anda di: https://supabase.com/dashboard
-- 2. Pilih project Anda -> Masuk ke menu "SQL Editor" di sidebar kiri.
-- 3. Klik "New query", salin (copy) seluruh isi file ini, lalu klik "Run".
-- ==============================================================================

-- 1. Buat Tabel Produk Publik
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'gadget',
    price NUMERIC NOT NULL,
    "originalPrice" NUMERIC,
    condition TEXT DEFAULT 'Baru (BNIB)',
    stock NUMERIC DEFAULT 1,
    location TEXT DEFAULT 'Indonesia',
    "sellerName" TEXT NOT NULL,
    "sellerPhone" TEXT NOT NULL DEFAULT '085150962928',
    image TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '["Produk Baru"]'::jsonb,
    rating NUMERIC DEFAULT 5.0,
    "soldCount" INTEGER DEFAULT 0,
    "isFeatured" BOOLEAN DEFAULT false,
    "isUserUploaded" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Buat Kebijakan Akses (Policies)
-- A. Kebijakan Membaca: Siapa saja (pengunjung umum) dapat melihat produk
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- B. Kebijakan Mengunggah: Siapa saja dapat menambahkan produk baru
DROP POLICY IF EXISTS "Public can insert products" ON public.products;
CREATE POLICY "Public can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

-- C. Kebijakan Menghapus: Pengguna dapat menghapus produk
DROP POLICY IF EXISTS "Public can delete products" ON public.products;
CREATE POLICY "Public can delete products" 
ON public.products 
FOR DELETE 
USING (true);

-- D. Kebijakan Mengubah: Pengguna dapat mengupdate produk
DROP POLICY IF EXISTS "Public can update products" ON public.products;
CREATE POLICY "Public can update products" 
ON public.products 
FOR UPDATE 
USING (true);

-- 4. Aktifkan Fitur Realtime Supabase untuk tabel products
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;

-- 5. Masukkan Data Produk Bawaan Awal (Jika tabel masih kosong)
INSERT INTO public.products (
    id, name, category, price, "originalPrice", condition, stock, location,
    "sellerName", "sellerPhone", image, description, tags, rating, "soldCount", "isFeatured", "isUserUploaded", "createdAt"
) VALUES 
(
    'prod-1',
    'Apple iPhone 15 Pro Max 256GB Titanium Natural',
    'gadget',
    21499000,
    23999000,
    'Baru (BNIB)',
    5,
    'Jakarta Selatan',
    'iTech Official Store',
    '085150962928',
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    'Garansi Resmi iBox Indonesia 1 Tahun. Kondisi Brand New In Box (Segel Greenpeel). Chip A17 Pro super kencang, kamera 48MP dengan 5x Optical Zoom, rangka Titanium ringan & mewah.',
    '["Gratis Ongkir", "Garansi Resmi", "Diskon 10%"]'::jsonb,
    4.9,
    38,
    true,
    false,
    '2026-08-20T08:00:00.000Z'
),
(
    'prod-2',
    'Sony WH-1000XM5 Wireless Noise Cancelling Headphone',
    'elektronik',
    4799000,
    5999000,
    'Baru (BNIB)',
    12,
    'Bandung',
    'AudioMania Studio',
    '085150962928',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'Headphone peredam kebisingan terbaik di kelasnya. Baterai tahan hingga 30 jam, mikrofon jernih dengan teknologi AI Voice Pickup, dan suara audiophile dengan codec LDAC.',
    '["Bisa COD", "Garansi 1 Thn", "Best Seller"]'::jsonb,
    4.9,
    94,
    true,
    false,
    '2026-08-21T09:30:00.000Z'
),
(
    'prod-3',
    'Sepatu Sneaker Nike Air Jordan 1 Retro High OG Chicago',
    'fashion',
    3250000,
    3800000,
    'Baru (Lengkap Box)',
    7,
    'Surabaya',
    'Kicks Culture ID',
    '085150962928',
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    '100% Original Authentic Guarantee. Tersedia size 40, 41, 42, 43, 44. Kulit premium super empuk dan nyaman dipakai harian atau hangout.',
    '["100% Original", "Gratis Kaos Kaki", "Free Ongkir"]'::jsonb,
    4.8,
    112,
    false,
    false,
    '2026-08-22T11:00:00.000Z'
),
(
    'prod-4',
    'Paket Kopi Arabika Single Origin Gayo Wine 250g (Biji / Bubuk)',
    'kuliner',
    85000,
    110000,
    'Baru (Fresh Roast)',
    45,
    'Aceh / Medan',
    'Roastery Nusantara',
    '085150962928',
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    'Kopi Arabika proses Wine Fermentation dengan aroma fruity, anggur manis, dan aftertaste karamel yang sangat khas. Baru di-roast tiap minggu.',
    '["Fresh Roast", "Bisa Kirim Se-Indonesia"]'::jsonb,
    5.0,
    260,
    true,
    false,
    '2026-08-23T14:15:00.000Z'
),
(
    'prod-5',
    'Kamera Mirrorless Fujifilm X-T30 II Kit 15-45mm OIS PZ',
    'hobi',
    14200000,
    15500000,
    'Bekas Like New (99%)',
    2,
    'Yogyakarta',
    'CamCorner Jogja',
    '085150962928',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    'Kondisi mulus 99% tanpa lecet/jamur, SC rendah di bawah 3.000 shot. Lengkap dus, buku panduan, baterai original, charger, strap & bonus filter UV.',
    '["Like New 99%", "Bisa Nego WA", "Bonus Tas"]'::jsonb,
    4.9,
    15,
    false,
    false,
    '2026-08-24T16:45:00.000Z'
),
(
    'prod-6',
    'Helm Full Face KYT TT-Course Grand Prix Edition Glossy',
    'otomotif',
    1350000,
    1500000,
    'Baru (BNIB)',
    10,
    'Tangerang',
    'Helmet Garage ID',
    '085150962928',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    'Sertifikasi SNI & DOT, bobot ringan aerodinamis, busa interior empuk dapat dilepas dan dicuci. Dilengkapi flat visor smoke tahan gores.',
    '["SNI & DOT", "Free Balaclava", "Bisa COD"]'::jsonb,
    4.8,
    78,
    false,
    false,
    '2026-08-25T10:00:00.000Z'
),
(
    'prod-7',
    'Smart RGB LED Floor Lamp Minimalis Nordic with App Control',
    'elektronik',
    299000,
    450000,
    'Baru (Segel)',
    30,
    'Jakarta Barat',
    'SmartHome Living',
    '085150962928',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    'Lampu sudut ruangan estetik dengan 16 juta warna RGB, sinkronisasi irama musik, remote control wireless, dan kontrol aplikasi smartphone Android/iOS.',
    '["Hemat Listrik", "Estetik Room", "Diskon 33%"]'::jsonb,
    4.7,
    145,
    false,
    false,
    '2026-08-26T12:00:00.000Z'
),
(
    'prod-8',
    'Jaket Bomber Leather Vintage Classic Biker Style Pria',
    'fashion',
    485000,
    650000,
    'Baru (Produksi Sendiri)',
    18,
    'Garut / Bandung',
    'LeatherCraft ID',
    '085150962928',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    'Material kulit sintetis Grade A tebal, tahan angin (windproof), furing dalam katun adem tidak gerah. Jahitan dobel kuat dan resleting YKK premium.',
    '["Windproof", "Anti Air Ringan", "Size M - XXL"]'::jsonb,
    4.8,
    88,
    false,
    false,
    '2026-08-27T15:20:00.000Z'
)
ON CONFLICT (id) DO NOTHING;
