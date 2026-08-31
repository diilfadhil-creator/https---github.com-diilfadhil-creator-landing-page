import { supabase, isSupabaseConfigured } from '../config/supabase';
import { 
  getStoredProducts, 
  saveProductsToStorage, 
  addProductToStorage, 
  deleteProductFromStorage,
  INITIAL_PRODUCTS
} from '../config/marketplaceData';

/**
 * Cek status apakah database Cloud (Supabase) terhubung
 */
export function isCloudConnected() {
  return isSupabaseConfigured() && supabase !== null;
}

/**
 * Mengambil seluruh produk publik dari Cloud Database (Supabase)
 * Jika offline / belum dikonfigurasi, otomatis fallback ke LocalStorage
 */
export async function fetchPublicProducts() {
  if (isCloudConnected()) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) {
        console.warn('⚠️ Supabase error saat memuat produk, beralih ke cache lokal:', error.message);
        return getStoredProducts();
      }

      if (data && data.length > 0) {
        // Sinkronkan ke local storage sebagai backup offline
        saveProductsToStorage(data);
        return data;
      } else {
        // Jika tabel di cloud masih kosong, kembalikan data awal default
        return getStoredProducts();
      }
    } catch (err) {
      console.warn('⚠️ Gagal terhubung ke Cloud Database, menggunakan data lokal:', err);
      return getStoredProducts();
    }
  }

  // Fallback lokal jika Supabase belum diset
  return getStoredProducts();
}

/**
 * Menambahkan & mempublikasikan produk baru ke Cloud Database
 * Produk akan langsung dapat dilihat oleh seluruh pengunjung website
 */
export async function createPublicProduct(newProduct) {
  if (isCloudConnected()) {
    try {
      // Pastikan format tags tersimpan dengan benar (array/JSON)
      const payload = {
        ...newProduct,
        tags: Array.isArray(newProduct.tags) ? newProduct.tags : ['Produk Baru'],
        createdAt: newProduct.createdAt || new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('products')
        .insert([payload])
        .select();

      if (error) {
        console.error('❌ Gagal upload ke Supabase:', error.message);
        // Tetap simpan di local storage agar user tidak kehilangan inputnya
        addProductToStorage(newProduct);
        throw new Error(error.message);
      }

      // Update backup lokal
      addProductToStorage(newProduct);
      return data && data[0] ? data[0] : newProduct;
    } catch (err) {
      console.error('❌ Terjadi kesalahan saat upload ke cloud:', err);
      addProductToStorage(newProduct);
      throw err;
    }
  }

  // Mode lokal
  addProductToStorage(newProduct);
  return newProduct;
}

/**
 * Menghapus produk dari database
 */
export async function deletePublicProduct(productId) {
  if (isCloudConnected()) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.warn('⚠️ Gagal menghapus dari Supabase:', error.message);
      }
    } catch (err) {
      console.warn('⚠️ Error hapus cloud:', err);
    }
  }

  return deleteProductFromStorage(productId);
}

/**
 * Mendengarkan perubahan data produk secara Realtime dari Supabase
 * Begitu ada pengguna lain yang upload produk, fungsi callback langsung dipanggil
 */
export function subscribeToProductChanges(onProductChange) {
  if (!isCloudConnected()) {
    return () => {}; // No-op jika offline
  }

  try {
    const channel = supabase
      .channel('public:products')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          console.log('⚡ Realtime update produk dari Supabase:', payload);
          if (typeof onProductChange === 'function') {
            onProductChange(payload);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('⚠️ Gagal mengaktifkan Realtime listener:', err);
    return () => {};
  }
}
