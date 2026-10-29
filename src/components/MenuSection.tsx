import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Heart, Flame, Filter, SlidersHorizontal, Plus } from 'lucide-react';
import { Product, ProductVariant } from '../types/moshi';
import { PRODUCTS } from '../data/moshiData';
import { playPop } from '../utils/audio';

interface MenuSectionProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, variant: ProductVariant | null) => void;
}

type CategoryType = 'todos' | 'ramen' | 'platos' | 'burgers' | 'extras' | 'bebidas';

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectProduct, onQuickAdd }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  
  // Track selected variant per product on cards
  const [cardVariants, setCardVariants] = useState<Record<string, string>>({});

  const categories: { id: CategoryType; label: string; icon: string }[] = [
    { id: 'todos', label: 'Todo el Menú', icon: '✨' },
    { id: 'ramen', label: 'Ramen Japonés', icon: '🍜' },
    { id: 'platos', label: 'Platos Calientes', icon: '🍗' },
    { id: 'burgers', label: 'Burgers Kawaii', icon: '🍔' },
    { id: 'extras', label: 'Extras & Postres', icon: '🍟' },
    { id: 'bebidas', label: 'Bebidas Frías', icon: '🥤' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'todos' || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.animeReference && product.animeReference.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag =
        selectedTag === 'all' ||
        (selectedTag === 'popular' && product.isPopular) ||
        (selectedTag === 'anime' && Boolean(product.animeReference));

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [activeCategory, searchQuery, selectedTag]);

  const handleVariantSelect = (productId: string, variantLabel: string) => {
    playPop();
    setCardVariants((prev) => ({ ...prev, [productId]: variantLabel }));
  };

  return (
    <section id="menu" className="py-16 lg:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-pink-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-pink-600 mb-2">
              <span>おいしい · OISHII RAMEN & MORE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Menú Oficial <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Moshi Moshi</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Platos elaborados con ingredientes selectos, caldos de cocción lenta y el cariño característico de nuestro Maid Café.
            </p>
          </div>

          {/* Quick Currency Badge & Info */}
          <div className="flex items-center gap-3">
            <div className="bg-pink-50 border border-pink-200/80 rounded-2xl px-4 py-2.5 flex items-center gap-2 text-xs font-semibold text-slate-700 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Precios en Bolivianos (Bs)</span>
              <span className="text-pink-300">|</span>
              <span className="text-pink-600">Cocina activa hoy</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playPop();
                    setActiveCategory(cat.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25 scale-102'
                      : 'bg-pink-50/60 hover:bg-pink-100/60 text-slate-700 border border-pink-100'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar & Tag filters row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por plato, ingrediente o anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-pink-200 bg-pink-50/30 focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Quick Filter Tag Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
              <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filtrar:
              </span>
              <button
                onClick={() => {
                  playPop();
                  setSelectedTag('all');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedTag === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => {
                  playPop();
                  setSelectedTag('popular');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                  selectedTag === 'popular'
                    ? 'bg-pink-600 text-white'
                    : 'bg-pink-50 hover:bg-pink-100 text-pink-700'
                }`}
              >
                <Heart className="w-3 h-3 fill-current" /> Favoritos
              </button>
              <button
                onClick={() => {
                  playPop();
                  setSelectedTag('anime');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                  selectedTag === 'anime'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-700'
                }`}
              >
                <Sparkles className="w-3 h-3" /> Anime Edition
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-pink-50/40 rounded-3xl border border-pink-100 p-8">
            <span className="text-4xl block mb-3">🍜</span>
            <h3 className="text-lg font-bold text-slate-800">No encontramos platillos con ese filtro</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Prueba buscando otro término o restablece los filtros para ver todo el menú.
            </p>
            <button
              onClick={() => {
                setActiveCategory('todos');
                setSearchQuery('');
                setSelectedTag('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-pink-500 text-white text-xs font-bold hover:bg-pink-600 transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const hasVariants = Boolean(product.variants && product.variants.length > 0);
              const selectedVariantLabel =
                cardVariants[product.id] || (hasVariants ? product.variants![0].label : '');
              const activeVariant = hasVariants
                ? product.variants!.find((v) => v.label === selectedVariantLabel) || product.variants![0]
                : null;
              const displayPrice = activeVariant ? activeVariant.price : product.price || 0;

              return (
                <article
                  key={product.id}
                  className="group bg-white rounded-3xl border border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Photo & Tags Header */}
                  <div className="relative aspect-4/3 overflow-hidden bg-pink-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/95 text-pink-700 shadow-xs backdrop-blur-xs border border-pink-100">
                        {product.tag}
                      </span>
                    </div>

                    {/* Anime Reference Pill top-right */}
                    {product.animeReference && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-100 backdrop-blur-xs">
                        {product.animeReference}
                      </span>
                    )}

                    {/* Quick view trigger overlay button */}
                    <button
                      onClick={() => {
                        playPop();
                        onSelectProduct(product);
                      }}
                      className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                      title="Ver detalles completos y personalizar"
                    >
                      <span className="bg-white/90 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs">
                        Ver Detalles ↗
                      </span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {product.japaneseName && (
                        <span className="text-[11px] font-bold text-pink-500 tracking-wider block mb-1">
                          {product.japaneseName}
                        </span>
                      )}
                      <h3
                        onClick={() => {
                          playPop();
                          onSelectProduct(product);
                        }}
                        className="text-base font-extrabold text-slate-900 group-hover:text-pink-600 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-slate-500 text-xs mt-1.5 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Size Selector if has variants */}
                    {hasVariants && product.variants && (
                      <div className="mt-4 pt-3 border-t border-pink-50">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1.5">
                          <span>Tamaño:</span>
                          <span className="text-pink-600 font-bold">{selectedVariantLabel}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 bg-pink-50/60 p-1 rounded-xl">
                          {product.variants.map((v) => {
                            const isChosen = v.label === selectedVariantLabel;
                            return (
                              <button
                                key={v.label}
                                type="button"
                                onClick={() => handleVariantSelect(product.id, v.label)}
                                className={`py-1 px-1.5 text-center text-xs font-bold rounded-lg transition-all ${
                                  isChosen
                                    ? 'bg-white text-pink-700 shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                {v.label.split(' ')[0]} · Bs {v.price}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Bottom Pricing & Actions */}
                    <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                          Precio
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-slate-900">
                            Bs {displayPrice}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Customize button */}
                        <button
                          type="button"
                          onClick={() => {
                            playPop();
                            onSelectProduct(product);
                          }}
                          className="px-3 py-2 rounded-xl border border-pink-200 text-pink-700 hover:bg-pink-50 font-bold text-xs transition-colors cursor-pointer"
                          title="Personalizar picante y extras"
                        >
                          Opciones
                        </button>

                        {/* Quick Add Button */}
                        <button
                          type="button"
                          onClick={() => {
                            onQuickAdd(product, activeVariant);
                          }}
                          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-pink-500/20 active:scale-95 transition-all cursor-pointer"
                          title="Agregar al pedido"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-3" />
                          <span className="hidden sm:inline">Agregar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
