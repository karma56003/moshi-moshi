import React from 'react';
import { Sparkles, Heart, UtensilsCrossed, ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { playPop, playChime } from '../utils/audio';

interface HeroProps {
  onExploreMenu: () => void;
  onExplorePromos: () => void;
  onCastSpell: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onExplorePromos, onCastSpell }) => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-pink-50/70 via-white to-pink-50/30">
      {/* Decorative Anime Floating Background Elements */}
      <div className="absolute top-10 left-8 text-pink-300/40 text-4xl select-none pointer-events-none animate-float-gentle">
        ✿
      </div>
      <div className="absolute top-28 right-12 text-purple-300/40 text-5xl select-none pointer-events-none animate-float-reverse">
        🌸
      </div>
      <div className="absolute bottom-16 left-1/4 text-rose-300/30 text-3xl select-none pointer-events-none animate-heartbeat-pulse">
        ♡
      </div>
      <div className="absolute top-1/2 right-1/3 text-amber-300/40 text-3xl select-none pointer-events-none animate-float-gentle">
        ✨
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Kawaii Welcome Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-[11px] sm:text-xs font-bold tracking-wide shadow-2xs mb-4 max-w-full">
              <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-ping shrink-0" />
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 shrink-0" />
              <span className="truncate">MAID CAFÉ & RAMEN HOUSE · TARIJA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4 sm:mb-6">
              ¡Ramen tradicional,{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600">
                cultura anime
              </span>{' '}
              y la magia maid!
            </h1>

            {/* Subheading / Lead */}
            <p className="text-sm sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mb-6 sm:mb-7">
              Ramen japonés humeante, hamburguesas kawaii y la calidez de nuestras maids en el corazón de Tarija.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={() => {
                  playPop();
                  onExploreMenu();
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-base px-7 py-3.5 rounded-2xl shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/35 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>Explorar Menú & Pedir</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => {
                  playChime();
                  onCastSpell();
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white hover:bg-pink-50/80 text-pink-600 border-2 border-pink-200 hover:border-pink-300 font-bold text-base px-6 py-3.5 rounded-2xl shadow-sm transition-all duration-300 active:scale-95 cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-pink-500 group-hover:rotate-12 transition-transform" />
                <span>Hechizo Moe Moe Kyun ♡</span>
              </button>

              <button
                onClick={() => {
                  playPop();
                  onExplorePromos();
                }}
                className="w-full sm:w-auto text-center sm:text-left text-sm font-bold text-slate-600 hover:text-pink-600 transition-colors py-2 px-3"
              >
                Ver Promos Especiales →
              </button>
            </div>

            {/* Quick Trust / Highlight Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full pt-4 border-t border-pink-100/80 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">
                  🍜
                </span>
                <div>
                  <strong className="block text-slate-800 font-semibold">Tazones Chibi & Sempai</strong>
                  <span className="text-[11px] text-slate-500">A tu medida</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">
                  🛵
                </span>
                <div>
                  <strong className="block text-slate-800 font-semibold">Recojo o Delivery</strong>
                  <span className="text-[11px] text-slate-500">Tarija ciudad</span>
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">
                  ✨
                </span>
                <div>
                  <strong className="block text-slate-800 font-semibold">Atención Maid Oficial</strong>
                  <span className="text-[11px] text-slate-500">100% Kawaii</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Maid Illustration Stage */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Glowing Backdrop Circle */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-pink-200/60 via-purple-100/50 to-rose-200/60 blur-2xl pointer-events-none -z-10" />

            {/* Visual Composition Card */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-white/90 to-pink-50/70 p-4 sm:p-5 rounded-3xl border border-pink-200/80 shadow-2xl shadow-pink-500/10 backdrop-blur-md">
              
              {/* Top Card Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-pink-100 text-xs">
                <span className="font-bold text-pink-600 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  Moshi Maid House · Akihabara Mood
                </span>
                <span className="text-slate-400 font-medium">いらっしゃいませ</span>
              </div>

              {/* Main Maid Graphic */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-pink-100/50 via-white to-pink-100/80 p-3 group">
                <img
                  src="/assets/moshi-maid-chocolates.png"
                  alt="Maid de Moshi Moshi con chocolates"
                  className="w-full h-80 sm:h-96 object-contain object-bottom drop-shadow-md group-hover:scale-102 transition-transform duration-500"
                />

                {/* Floating Secondary Maid Badge */}
                <div className="absolute top-3 right-3 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white/95 border-2 border-pink-300 shadow-lg p-1 animate-float-gentle">
                  <img
                    src="/assets/moshi-maid-flowers.png"
                    alt="Maid con flores"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-1 inset-x-1 text-center bg-pink-500/90 text-white text-[9px] font-bold rounded py-0.5">
                    Sakura-chan
                  </div>
                </div>

                {/* Floating Kawaii Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 border border-pink-200 rounded-2xl p-3 shadow-lg flex items-center gap-3 backdrop-blur-sm animate-heartbeat-pulse">
                  <span className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center text-lg font-bold shadow-md shadow-pink-500/30">
                    ♡
                  </span>
                  <div>
                    <span className="text-[10px] text-pink-600 font-bold uppercase tracking-wider block">
                      Ritual de la Casa
                    </span>
                    <strong className="text-xs sm:text-sm text-slate-800 font-bold block">
                      ¡Moe Moe Kyun!
                    </strong>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-3 pt-3 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-pink-500" /> Mar a Sáb 17:00 – 21:30
                </span>
                <span className="text-pink-600 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Barrio San Roque
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
