import React from 'react';
import { MapPin, Clock, MessageCircle, Navigation, ExternalLink, Heart, Sparkles } from 'lucide-react';
import { STORE_ADDRESS, STORE_SCHEDULE, WHATSAPP_PHONE, WHATSAPP_FORMATTED } from '../data/moshiData';

export const LocationSection: React.FC = () => {
  return (
    <section id="ubicacion" className="py-16 lg:py-24 bg-pink-50/40 relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-pink-600" />
            <span>NUESTRO LOCAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Visítanos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">San Roque</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
            Encuéntranos en Tarija para comer en local o pide tu delivery directo.
          </p>
        </div>

        {/* Location Card & Visual Map Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left: Info Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-pink-100 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-lg">
                  🏮
                </span>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Moshi Moshi Maid Café</h3>
                  <span className="text-xs text-pink-600 font-bold">Barrio San Roque · Tarija, Bolivia</span>
                </div>
              </div>

              <div className="space-y-4 my-6 text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-pink-50/50 border border-pink-100">
                  <MapPin className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Dirección:</strong>
                    <span className="text-slate-600 text-xs sm:text-sm">{STORE_ADDRESS}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Horario de Atención:</strong>
                    <span className="text-slate-600 text-xs sm:text-sm">{STORE_SCHEDULE}</span>
                    <span className="block text-[11px] text-purple-600 font-semibold mt-0.5">Domingos y lunes: Descanso de Maids</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">WhatsApp Directo:</strong>
                    <span className="text-slate-600 text-xs sm:text-sm">{WHATSAPP_FORMATTED}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-pink-100">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Barrio+San+Roque+Fray+Manuel+Mingo+589+Tarija+Bolivia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4 text-pink-400" />
                <span>Cómo Llegar en Maps ↗</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  '¡Hola Moshi Moshi Maid Café! Me gustaría hacer una consulta sobre la ubicación y horarios.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Escribir al WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Visual Tarija Map & Mascot Stash */}
          <div className="lg:col-span-6 relative bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Background Map Graphic Pattern */}
            <div className="absolute -right-8 -bottom-8 w-60 h-60 opacity-20 pointer-events-none">
              <img
                src="/assets/moshi-maid-flowers.png"
                alt="Maid Moshi Moshi"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-200 block mb-0.5">
                Delivery Tarija
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                ¿Prefieres pedir a domicilio?
              </h3>
              <p className="text-xs sm:text-sm text-pink-100 mt-1 leading-relaxed max-w-sm">
                Enviamos tu ramen caliente con empaque térmico sellado en toda la ciudad.
              </p>
            </div>

            <div className="my-4 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/90">
              <span className="font-bold text-amber-200 block mb-0.5">🍜 Fideos y caldo separados:</span>
              <span>Llegan con la textura y temperatura perfecta a tu mesa.</span>
            </div>

            <div className="flex items-center justify-between text-xs text-pink-200 pt-3 border-t border-white/20">
              <span>Delivery seguro con seguimiento</span>
              <span className="font-bold text-white flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-white text-white" /> Con amor Moshi
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
