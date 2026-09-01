import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import WorkflowDemo from './components/WorkflowDemo';
import FeaturesBento from './components/FeaturesBento';
import AnalyticsPreview from './components/AnalyticsPreview';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileBottomNav from './components/MobileBottomNav';
import ProductUploadModal from './components/ProductUploadModal';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import { 
  fetchPublicProducts, 
  createPublicProduct, 
  deletePublicProduct, 
  subscribeToProductChanges,
  isCloudConnected 
} from './services/productService';
import { resetProductsToDefault } from './config/marketplaceData';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const isCloud = isCloudConnected();

  // Show Toast
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  }, []);

  // Muat data produk dari Cloud Database / LocalStorage
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPublicProducts();
      setProducts(data || []);
    } catch (err) {
      console.error('Gagal memuat produk:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();

    // Aktifkan Realtime Listener jika Cloud Database aktif
    const unsubscribe = subscribeToProductChanges((payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        setProducts((prev) => {
          const exists = prev.some((p) => p.id === payload.new.id);
          if (exists) return prev;
          return [payload.new, ...prev];
        });
        showToast(`✨ Produk baru ditambahkan oleh penjual: "${payload.new.name}"`);
      } else if (payload.eventType === 'DELETE' && payload.old) {
        setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        setProducts((prev) =>
          prev.map((p) => (p.id === payload.new.id ? payload.new : p))
        );
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [loadProducts, showToast]);

  // Upload Produk Baru
  const handleProductUploaded = async (newProduct) => {
    try {
      const saved = await createPublicProduct(newProduct);
      setProducts((prev) => {
        const filtered = prev.filter((p) => p.id !== saved.id);
        return [saved, ...filtered];
      });

      if (isCloud) {
        showToast(`☁️ Produk "${saved.name}" berhasil dipublikasikan ke Cloud Database!`);
      } else {
        showToast(`📦 Produk "${saved.name}" berhasil ditayangkan (Mode Lokal)!`);
      }
    } catch (err) {
      console.error('Error saat upload:', err);
      showToast(`⚠️ Produk tersimpan di perangkat lokal.`);
    }
  };

  // Hapus Produk
  const handleDeleteProduct = async (productId) => {
    try {
      const updated = await deletePublicProduct(productId);
      setProducts(updated || []);
      showToast('Produk berhasil dihapus.');
    } catch (err) {
      console.error('Gagal menghapus produk:', err);
      showToast('Gagal menghapus produk.');
    }
  };

  // Reset Produk ke Default
  const handleResetProducts = () => {
    if (window.confirm('Kembalikan semua daftar produk ke contoh bawaan sistem?')) {
      const reset = resetProductsToDefault();
      setProducts(reset);
      showToast('Katalog produk di-reset ke data bawaan.');
    }
  };

  // Tambah ke Keranjang
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    showToast(`"${product.name}" ditambahkan ke keranjang.`);
  };

  // Update Qty Keranjang
  const handleUpdateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  // Hapus dari Keranjang
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast('Item dihapus dari keranjang.');
  };

  // Total Item di Keranjang
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="landing-app">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="global-toast-notification animated-slide-down">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar 
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartTotalItems}
        isCloudConnected={isCloud}
      />

      <main>
        {/* Hero Section */}
        <Hero onOpenUpload={() => setIsUploadOpen(true)} />

        {/* Centerpiece: Product Catalog */}
        <ProductCatalog 
          products={products}
          isLoading={isLoading}
          isCloudConnected={isCloud}
          onRefresh={loadProducts}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onOpenUpload={() => setIsUploadOpen(true)}
          onAddToCart={handleAddToCart}
          onDeleteProduct={handleDeleteProduct}
          onResetProducts={handleResetProducts}
        />

        {/* How to Sell / Profit Simulation */}
        <WorkflowDemo onOpenUpload={() => setIsUploadOpen(true)} />

        {/* Why Sell With Us (Bento Grid) */}
        <FeaturesBento />

        {/* Standards, Security & Delivery Specs */}
        <AnalyticsPreview />

        {/* Seller Booster Plans */}
        <Pricing onOpenUpload={() => setIsUploadOpen(true)} />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />

        {/* Bottom CTA */}
        <CTA onOpenUpload={() => setIsUploadOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenUpload={() => setIsUploadOpen(true)} isCloudConnected={isCloud} />

      {/* Modals & Drawers */}
      <ProductUploadModal 
        isOpen={isUploadOpen}
        isCloudConnected={isCloud}
        onClose={() => setIsUploadOpen(false)}
        onProductUploaded={handleProductUploaded}
      />

      <ProductDetailModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCart([])}
      />

      {/* Floating WhatsApp Assistant */}
      <FloatingWhatsApp onOpenUpload={() => setIsUploadOpen(true)} />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartTotalItems}
      />

    </div>
  );
}
