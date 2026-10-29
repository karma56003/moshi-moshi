import React, { useState } from 'react';
import { Calendar, MapPin, Zap, CheckCircle2, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { EVENTS, WHATSAPP_PHONE } from '../data/moshiData';
import { playPop } from '../utils/audio';

export const EventsSection: React.FC = () => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const toggleEvent = (id: string) => {
    playPop();
    setExpandedEventId(prev => (prev === id ? null : id));
  };

  return (
    <section id="eventos" className="py-14 lg:py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Concise Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>EVENTOS & EXPO ANIME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Comunidad & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400">Eventos</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5">
            Convenciones anime, encuentros cosplay y celebraciones en Tarija.
          </p>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {EVENTS.map((event) => {
            const isExpanded = expandedEventId === event.id;

            return (
              <article
                key={event.id}
                className="bg-slate-800/90 rounded-3xl border border-slate-700 hover:border-pink-500/50 p-5 sm:p-6 flex flex-col sm:flex-row gap-5 shadow-lg transition-all duration-300 group"
              >
                {/* Event Poster Photo */}
                <div className="relative w-full sm:w-44 aspect-3/4 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-700/80 shadow-md">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-pink-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
                    {event.badge}
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date and Location */}
                    <div className="flex flex-col gap-1 text-[11px] text-pink-400 font-bold mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-pink-400" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-400 font-normal">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {event.location}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-pink-300 transition-colors mb-1.5">
                      {event.title}
                    </h3>

                    <p className="text-slate-300 text-xs leading-relaxed">
                      {event.description}
                    </p>

                    {/* Expandable activities toggle */}
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => toggleEvent(event.id)}
                        className="text-[11px] font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>{isExpanded ? 'Ocultar actividades' : 'Ver actividades destacadas'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 space-y-1.5 text-xs text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-700/70 animate-in fade-in duration-200">
                          {event.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp button */}
                  <div className="mt-4 pt-3 border-t border-slate-700/70 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Stand Moshi</span>
                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                        `¡Hola Moshi Moshi! Quisiera información sobre ${event.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      <span>Consultar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Compact Social Follow Strip */}
        <div className="bg-slate-800/80 rounded-2xl p-5 border border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-white">
              ¡Sigue a Moshi Moshi en redes sociales!
            </h4>
            <p className="text-slate-400 text-xs">
              Videos de maids, adelantos de menú y noticias en Tarija.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://www.tiktok.com/@moshimoshitarijabolivia"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
            >
              TikTok @moshimoshitarijabolivia ↗
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100064257600943"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors"
            >
              Facebook ↗
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
