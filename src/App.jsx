import React, { useState, useEffect } from 'react';
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
  getStoredProducts, 
  addProductToStorage, 
  deleteProductFromStorage, 
  resetProductsToDefault 
} from './config/marketplaceData';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Muat data awal dari localStorage
  useEffect(() => {
    const loaded = getStoredProducts();
    setProducts(loaded);
  }, []);

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Upload Produk Baru
  const handleProductUploaded = (newProduct) => {
    const updated = addProductToStorage(newProduct);
    setProducts(updated);
    showToast(`Produk "${newProduct.name}" berhasil ditayangkan!`);
  };

  // Hapus Produk
  const handleDeleteProduct = (productId) => {
    const updated = deleteProductFromStorage(productId);
    setProducts(updated);
    showToast('Produk berhasil dihapus.');
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
      />

      <main>
        {/* Hero Section */}
        <Hero onOpenUpload={() => setIsUploadOpen(true)} />

        {/* Centerpiece: Product Catalog */}
        <ProductCatalog 
          products={products}
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
      <Footer onOpenUpload={() => setIsUploadOpen(true)} />

      {/* Modals & Drawers */}
      <ProductUploadModal 
        isOpen={isUploadOpen}
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
