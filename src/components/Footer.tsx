import React from 'react';
import { Heart, MapPin, Clock, MessageCircle, ArrowUp } from 'lucide-react';
import { STORE_ADDRESS, STORE_SCHEDULE, WHATSAPP_FORMATTED, WHATSAPP_PHONE } from '../data/moshiData';
import { playPop } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-pink-900/40 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center overflow-hidden shadow-md">
                <img
                  src="/assets/moshi-logo-clean.png"
                  alt="Moshi Moshi Maid Café"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white block">
                  Moshi Moshi
                </span>
                <span className="text-xs text-pink-400 font-bold tracking-wider uppercase block">
                  Maid Café & Ramen House · Tarija
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              El rincón otaku y kawaii favorito de Tarija. Ramen japonés de cocción lenta, hamburguesas con orejitas, promociones llenas de ternura y la mejor atención maid.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.tiktok.com/@moshimoshitarijabolivia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                title="TikTok Oficial"
              >
                ♪
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100064257600943"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                title="Facebook Oficial"
              >
                f
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                title="WhatsApp Oficial"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#menu" className="hover:text-pink-400 transition-colors">
                  Menú de Ramen & Platillos
                </a>
              </li>
              <li>
                <a href="#promos" className="hover:text-pink-400 transition-colors">
                  Promociones Especiales
                </a>
              </li>
              <li>
                <a href="#eventos" className="hover:text-pink-400 transition-colors">
                  Chidori Fest & Eventos Anime
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-pink-400 transition-colors">
                  Ubicación & Horarios
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Visítanos en Tarija
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>{STORE_ADDRESS}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{STORE_SCHEDULE}</span>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Pedidos & Consultas: {WHATSAPP_FORMATTED}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  '¡Hola Moshi Moshi! Quisiera hacer un pedido.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hacer pedido por WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Moshi Moshi Maid Café. Hecho con</span>
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 inline" />
            <span>para la comunidad otaku de Tarija.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-pink-400 transition-colors p-1"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
