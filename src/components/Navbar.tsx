import React, { useState } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X, MessageCircle, Heart, MapPin, Sparkles } from 'lucide-react';
import { isSoundEnabled, toggleSound, playPop, playChime } from '../utils/audio';
import { WHATSAPP_PHONE } from '../data/moshiData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onCastSpell: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onCastSpell }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const navLinks = [
    { label: 'Menú', href: '#menu', icon: '🍜' },
    { label: 'Promos ♡', href: '#promos', icon: '🎁' },
    { label: 'Eventos Anime', href: '#eventos', icon: '⚡' },
    { label: 'Ubicación', href: '#ubicacion', icon: '📍' },
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
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white text-xs py-1.5 px-4 font-medium tracking-wide flex items-center justify-between shadow-sm relative z-50">
        <div className="container mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1 font-semibold">
              <Heart className="w-3.5 h-3.5 fill-white animate-pulse" />
              <span>Okaerinasaimase!</span>
            </span>
            <span className="hidden sm:inline text-pink-200">·</span>
            <span className="hidden sm:inline">El 1.er Maid Café & Ramen House en Tarija, Bolivia</span>
            <span className="text-pink-200">·</span>
            <span className="text-pink-100 font-medium">Atención de Mar a Sáb 17:00 a 21:30</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                playChime();
                onCastSpell();
              }}
              className="hidden md:flex items-center gap-1 text-[11px] bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded-full transition-all duration-200 cursor-pointer active:scale-95"
              title="¡Lanza el hechizo Moe Moe Kyun!"
            >
              <Sparkles className="w-3 h-3 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Moe Moe Kyun ♡</span>
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('¡Hola Moshi Moshi! Quisiera hacer una consulta.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white hover:text-pink-100 transition-colors"
            >
              <MessageCircle className="w-3 h-3 fill-white/80" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Wordmark */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#inicio');
            }}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 p-0.5 shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden p-1">
                  <img
                    src="/assets/moshi-logo-clean.png"
                    alt="Moshi Moshi Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[9px] text-white font-bold shadow-sm">
                ♡
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-pink-600 transition-colors">
                  Moshi Moshi
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-pink-100 text-pink-700">
                  Maid Café
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium tracking-wide flex items-center gap-1">
                <span>もしもし</span>
                <span>·</span>
                <span>Ramen & Anime House</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
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

          {/* Action Zone: Sound Toggle & Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              type="button"
              className="p-2.5 rounded-xl border border-pink-200/70 text-slate-600 hover:text-pink-600 hover:bg-pink-50/60 transition-all duration-200 cursor-pointer active:scale-95"
              title={soundOn ? 'Desactivar efectos sonoros' : 'Activar efectos sonoros'}
              aria-label={soundOn ? 'Sonido activado' : 'Sonido desactivado'}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-pink-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Quick Spell caster on small screens */}
            <button
              onClick={() => {
                playChime();
                onCastSpell();
              }}
              type="button"
              className="hidden sm:flex md:hidden p-2.5 rounded-xl border border-pink-200/70 text-pink-600 hover:bg-pink-50 transition-all cursor-pointer"
              title="¡Lanzar hechizo Moe Moe Kyun!"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => {
                playPop();
                onOpenCart();
              }}
              type="button"
              className="flex items-center gap-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/30 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Abrir carrito de compras"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-pink-600 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Mi Pedido</span>
              {cartCount > 0 && (
                <span className="sm:hidden font-extrabold text-xs">({cartCount})</span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                playPop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              type="button"
              className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-pink-100 shadow-xl px-5 py-6 flex flex-col gap-3 animate-in fade-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-pink-100 text-xs text-slate-500">
              <span className="font-semibold text-pink-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Barrio San Roque · Tarija
              </span>
              <button
                onClick={() => {
                  playChime();
                  onCastSpell();
                }}
                className="text-pink-600 font-bold flex items-center gap-1 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                Moe Moe Kyun ♡
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-pink-50/50 hover:bg-pink-100/60 text-slate-800 font-semibold text-sm text-left transition-colors"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-pink-100 flex items-center justify-between text-xs text-slate-500">
              <a
                href="https://www.tiktok.com/@moshimoshitarijabolivia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-pink-600 font-medium"
              >
                TikTok Oficial ↗
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100064257600943"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-pink-600 font-medium"
              >
                Facebook Oficial ↗
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
