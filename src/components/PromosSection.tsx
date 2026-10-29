import React, { useState } from 'react';
import { Heart, Gift, Sparkles, Check, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { Promo } from '../types/moshi';
import { PROMOTIONS, WHATSAPP_PHONE } from '../data/moshiData';
import { playPop, playChime } from '../utils/audio';

interface PromosSectionProps {
  onAddPromoToCart: (promo: Promo) => void;
}

export const PromosSection: React.FC<PromosSectionProps> = ({ onAddPromoToCart }) => {
  const [expandedPromoId, setExpandedPromoId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    playPop();
    setExpandedPromoId(prev => (prev === id ? null : id));
  };

  return (
    <section id="promos" className="py-14 lg:py-20 bg-gradient-to-b from-pink-50/40 via-white to-pink-50/30 relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Concise Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5 text-pink-600" />
            <span>COMBOS ESPECIALES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Promociones <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Moshi</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
            Combos especiales con ramen, regalitos coleccionables y detalles maid.
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PROMOTIONS.map((promo) => {
            const isExpanded = expandedPromoId === promo.id;

            return (
              <div
                key={promo.id}
                className="group bg-white rounded-3xl border border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Poster Frame */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-pink-700 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs border border-pink-100 flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                    {promo.badge}
                  </span>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-sm sm:text-base px-3 py-1 rounded-xl shadow-md">
                    Bs {promo.price}
                  </div>
                </div>

                {/* Clean Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-pink-500 uppercase tracking-wider block mb-0.5">
                      {promo.kicker}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-pink-600 transition-colors">
                      {promo.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {promo.description}
                    </p>

                    {/* Expandable "Ver qué incluye" toggle */}
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => toggleDetails(promo.id)}
                        className="text-[11px] font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 py-1 cursor-pointer transition-colors"
                      >
                        <span>{isExpanded ? 'Ocultar detalles' : 'Ver qué incluye el combo'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 p-3 rounded-2xl bg-pink-50/70 border border-pink-100/90 text-xs text-slate-700 space-y-1.5 animate-in fade-in duration-200">
                          {promo.includes.map((inc, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                              <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-3 border-t border-pink-50 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playChime();
                        onAddPromoToCart(promo);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Pedir Combo · Bs {promo.price}</span>
                    </button>

                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                        `¡Hola Moshi Moshi! Quisiera pedir la promo ${promo.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-pink-200 text-pink-600 hover:bg-pink-50 transition-colors"
                      title="Consultar por WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
