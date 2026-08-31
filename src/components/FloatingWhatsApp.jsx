import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, CheckCircle2, ShoppingBag, ExternalLink, Plus } from 'lucide-react';
import { DEFAULT_ADMIN_PHONE, getWhatsAppUrl } from '../config/whatsapp';

export default function FloatingWhatsApp({ onOpenUpload }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Halo! 👋 Saya *MarketBot* (Asisten Cerdas Marketplace). Ada yang bisa saya bantu terkait jual beli produk hari ini?',
      time: 'Baru saja'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const botResponses = {
    jual: `📦 *CARA UPLOAD & JUAL PRODUK:*\n1. Klik tombol *+ Jual Produk* di menu atas\n2. Masukkan foto, nama barang, harga, dan No. WhatsApp Anda\n3. Klik Publikasikan — Produk Anda seketika muncul di katalog publik (100% Bebas Biaya Admin)!`,
    beli: `🛍️ *CARA BELI BARANG:*\n1. Pilih produk yang Anda sukai di etalase\n2. Klik tombol *Detail* atau *Beli*\n3. Anda akan langsung terhubung ke WhatsApp penjual untuk konfirmasi pemesanan & pengiriman!`,
    admin: `💰 *BIAYA ADMIN 0% (GRATIS):*\nMarketplace 100% gratis selamanya tanpa potongan komisi penjualan. Semua hasil transaksi masuk utuh ke rekening penjual.`,
    booster: `🚀 *PAKET BOOSTER SELLER:*\nIngin produk Anda berada di urutan paling atas dengan badge Emas 'FEATURED'? Cukup pilih Paket Booster di bagian bawah halaman!`,
    kontak: `Silakan hubungi WhatsApp Admin resmi kami untuk bantuan operasional atau verifikasi toko! 😊`
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputMsg).trim();
    if (!query) return;

    // Add user message
    const userMsgObj = { sender: 'user', text: query, time: 'Sekarang' };
    setMessages((prev) => [...prev, userMsgObj]);
    setInputMsg('');
    setIsTyping(true);

    // Bot Auto-Reply Logic
    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('jual') || qLower.includes('upload') || qLower.includes('pasang') || qLower.includes('iklan')) {
        reply = botResponses.jual;
      } else if (qLower.includes('beli') || qLower.includes('pesan') || qLower.includes('order') || qLower.includes('bayar')) {
        reply = botResponses.beli;
      } else if (qLower.includes('admin') || qLower.includes('biaya') || qLower.includes('potongan') || qLower.includes('komisi') || qLower.includes('gratis')) {
        reply = botResponses.admin;
      } else if (qLower.includes('booster') || qLower.includes('promosi') || qLower.includes('featured') || qLower.includes('iklan')) {
        reply = botResponses.booster;
      } else {
        reply = `Terima kasih pertanyaannya! 😊 Anda dapat mengunggah produk apa saja untuk dijual langsung, menjelajahi etalase, atau langsung terhubung ke WhatsApp Admin di nomor *${DEFAULT_ADMIN_PHONE}*.`;
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply, time: 'Sekarang' }]);
    }, 500);
  };

  const handleDirectWhatsApp = () => {
    const waUrl = getWhatsAppUrl(`Halo Admin Marketplace! Saya ingin bertanya mengenai marketplace dan fitur upload produk.`);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="floating-wa-wrapper">
      {isOpen && (
        <div className="wa-popup-box glass-panel gradient-border-food animated-fade-in">
          {/* Header */}
          <div className="wa-popup-header">
            <div className="wa-avatar-online">
              <Bot size={22} className="text-white" />
              <span className="wa-status-dot"></span>
            </div>
            <div className="wa-header-text">
              <h4>MarketBot 🤖 (Asisten Marketplace)</h4>
              <p>Aktif 24/7 • Respons Cepat</p>
            </div>
            <button className="wa-close-btn" onClick={() => setIsOpen(false)} aria-label="Tutup Bot">
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="wa-popup-body custom-scroll">
            <div className="bot-welcome-tag">
              <span>🤖 Asisten Marketplace Siap Membantu Anda</span>
            </div>

            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chat-msg-row ${msg.sender === 'user' ? 'msg-row-user' : 'msg-row-bot'}`}
              >
                <div className={`chat-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-bot'}`}>
                  <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-msg-row msg-row-bot">
                <div className="chat-bubble bubble-bot typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Bot Chips */}
          <div className="bot-quick-chips">
            <button onClick={() => handleSendMessage('Bagaimana cara jual produk?')} className="bot-chip">
              📦 Cara Jual
            </button>
            <button onClick={() => handleSendMessage('Bagaimana cara beli produk?')} className="bot-chip">
              🛍️ Cara Beli
            </button>
            <button onClick={() => handleSendMessage('Apakah ada biaya admin?')} className="bot-chip">
              💰 Biaya 0%
            </button>
            <button onClick={() => handleSendMessage('Info Paket Booster')} className="bot-chip">
              🚀 Booster
            </button>
          </div>

          {/* WhatsApp Direct Action Bar */}
          <div className="bot-forward-bar">
            <button onClick={handleDirectWhatsApp} className="btn-direct-wa">
              <span>Chat WhatsApp Admin</span>
              <ExternalLink size={14} />
            </button>
          </div>

          {/* Input Footer */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
            className="wa-popup-footer"
          >
            <input 
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Tanyakan seputar produk / jualan..."
              className="wa-input"
            />
            <button type="submit" className="wa-send-btn" title="Kirim Pesan">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button 
        className="floating-wa-btn pulse-glow-wa"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Buka Chat Bot WhatsApp"
      >
        <Bot size={28} />
        <span className="wa-badge-notif">🤖</span>
        <span className="floating-wa-tooltip">Tanya Asisten Marketplace</span>
      </button>
    </div>
  );
}
