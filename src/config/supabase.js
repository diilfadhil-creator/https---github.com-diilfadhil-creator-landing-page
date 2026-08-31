import { createClient } from '@supabase/supabase-js';

// Ambil kredensial dari environment variable (Vite)
// Pengguna dapat mengaturnya di file .env atau langsung di variabel ini
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Cek apakah Supabase sudah dikonfigurasi dengan URL & Key yang valid
export const isSupabaseConfigured = () => {
  return Boolean(
    SUPABASE_URL && 
    SUPABASE_ANON_KEY && 
    SUPABASE_URL.startsWith('https://') &&
    !SUPABASE_URL.includes('your-project-id')
  );
};

// Inisialisasi Supabase Client jika kredensial tersedia
export const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;
