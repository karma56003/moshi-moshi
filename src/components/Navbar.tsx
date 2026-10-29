import React, { useState, useEffect } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X, MessageCircle, Heart, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { isSoundEnabled, toggleSound, playPop, playChime } from '../utils/audio';
import { WHATSAPP_PHONE, STORE_SCHEDULE } from '../data/moshiData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onCastSpell: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onCastSpell }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const navLinks = [
    { label: 'Menú', href: '#menu', icon: '🍜', desc: 'Ramen & Platillos' },
    { label: 'Promos ♡', href: '#promos', icon: '🎁', desc: 'Combos con regalos' },
    { label: 'Eventos Anime', href: '#eventos', icon: '⚡', desc: 'Chidori Fest & Aniversario' },
    { label: 'Ubicación', href: '#ubicacion', icon: '📍', desc: 'San Roque, Tarija' },
  ];

  const handleNavClick = (href: string) => {
    playPop();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Kawaii Welcome Marquee / Strip */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white text-xs py-1.5 px-3 sm:px-4 font-medium tracking-wide flex items-center justify-between shadow-xs relative z-40">
        <div className="container mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1 font-semibold shrink-0">
              <Heart className="w-3.5 h-3.5 fill-white animate-pulse" />
              <span>Okaerinasaimase!</span>
            </span>
            <span className="text-pink-200">·</span>
            <span className="hidden sm:inline">1.er Maid Café & Ramen House en Tarija</span>
            <span className="sm:hidden text-[10px]">Tarija, Bolivia</span>
            <span className="hidden md:inline text-pink-200">·</span>
            <span className="hidden md:inline text-pink-100 font-medium">Mar a Sáb 17:00 a 21:30</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => {
                playChime();
                onCastSpell();
              }}
              className="flex items-center gap-1 text-[10px] sm:text-[11px] bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
              title="¡Lanza el hechizo Moe Moe Kyun!"
            >
              <Sparkles className="w-3 h-3 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Moe Moe Kyun ♡</span>
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('¡Hola Moshi Moshi! Quisiera hacer una consulta.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-white hover:text-pink-100 transition-colors shrink-0"
            >
              <MessageCircle className="w-3 h-3 fill-white/80" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-xs transition-all duration-300">
        <div className="container mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo & Wordmark (Responsive, will never push buttons out) */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#inicio');
            }}
            className="flex items-center gap-2 sm:gap-3 group shrink min-w-0"
          >
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-white flex items-center justify-center overflow-hidden p-0.5">
                  <img
                    src="/assets/moshi-logo-clean.png"
                    alt="Moshi Moshi Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-pink-500 text-[8px] text-white font-bold shadow-xs">
                ♡
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-black text-lg sm:text-2xl tracking-tight text-slate-900 group-hover:text-pink-600 transition-colors truncate">
                  Moshi Moshi
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-pink-100 text-pink-700 shrink-0">
                  Maid
                </span>
              </div>
              <span className="hidden sm:flex text-xs text-slate-500 font-medium tracking-wide items-center gap-1 truncate">
                <span>もしもし</span>
                <span>·</span>
                <span>Ramen & Anime House</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-semibold text-slate-600 hover:text-pink-600 transition-colors flex items-center gap-1.5 relative py-1 group/link"
              >
                <span className="text-base group-hover/link:scale-125 transition-transform duration-200">
                  {link.icon}
                </span>
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover/link:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Action Zone: Sound Toggle, Cart, and Hamburger Button */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Desktop Audio Toggle */}
            <button
              onClick={handleToggleSound}
              type="button"
              className="hidden md:flex p-2.5 rounded-xl border border-pink-200/70 text-slate-600 hover:text-pink-600 hover:bg-pink-50/60 transition-all duration-200 cursor-pointer active:scale-95"
              title={soundOn ? 'Desactivar efectos sonoros' : 'Activar efectos sonoros'}
              aria-label={soundOn ? 'Sonido activado' : 'Sonido desactivado'}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-pink-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => {
                playPop();
                onOpenCart();
              }}
              type="button"
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm h-10 px-3 sm:px-4 rounded-xl shadow-sm hover:shadow-md shadow-pink-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Abrir carrito de compras"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-pink-600 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Mi Pedido</span>
            </button>

            {/* Mobile Hamburger Button (High contrast, clearly visible and never pushed off) */}
            <button
              onClick={() => {
                playPop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              type="button"
              className="lg:hidden w-10 h-10 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer shrink-0"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
              title="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-pink-600" /> : <Menu className="w-5 h-5 text-pink-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Featured Mobile Slide-Out Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            className="relative z-10 w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl flex flex-col border-l border-pink-100 animate-in slide-in-from-right duration-300"
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil"
          >
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-pink-100 flex items-center justify-between bg-pink-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-500 p-0.5 flex items-center justify-center shadow-xs">
                  <img
                    src="/assets/moshi-logo-clean.png"
                    alt="Logo"
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900 leading-tight">Moshi Moshi</h3>
                  <span className="text-[10px] text-pink-600 font-bold uppercase tracking-wider">Maid Café Tarija</span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2 py-1">
                Secciones
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 hover:bg-pink-50/80 border border-slate-100 hover:border-pink-200 text-left transition-all group active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-white border border-pink-100 text-lg flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <div>
                      <strong className="block text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
                        {link.label}
                      </strong>
                      <span className="text-[11px] text-slate-500">{link.desc}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-pink-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}

              {/* Interactive Magic Spell Button inside Mobile Menu */}
              <div className="pt-3">
                <button
                  onClick={() => {
                    playChime();
                    setMobileMenuOpen(false);
                    onCastSpell();
                  }}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>¡Hechizo Moe Moe Kyun! ♡</span>
                </button>
              </div>

              {/* Sound Toggle inside Mobile Drawer */}
              <div className="pt-2">
                <button
                  onClick={handleToggleSound}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {soundOn ? (
                      <Volume2 className="w-4 h-4 text-pink-600" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-slate-400" />
                    )}
                    <span>Efectos de Sonido Kawaii</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${soundOn ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {soundOn ? 'ACTIVADO' : 'SILENCIADO'}
                  </span>
                </button>
              </div>
            </div>

            {/* Drawer Footer with Direct Contact */}
            <div className="p-4 border-t border-pink-100 bg-pink-50/30 space-y-2.5">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('¡Hola Moshi Moshi Maid Café! Quisiera hacer un pedido.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir por WhatsApp (+591 68720993)</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <MapPin className="w-3 h-3 text-pink-500" /> San Roque, Tarija
                </span>
                <span>{STORE_SCHEDULE}</span>
              </div>

              <div className="flex items-center justify-center gap-4 pt-1 text-xs">
                <a
                  href="https://www.tiktok.com/@moshimoshitarijabolivia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-pink-600 font-medium"
                >
                  TikTok ↗
                </a>
                <span className="text-slate-300">·</span>
                <a
                  href="https://www.facebook.com/profile.php?id=100064257600943"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-pink-600 font-medium"
                >
                  Facebook ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
