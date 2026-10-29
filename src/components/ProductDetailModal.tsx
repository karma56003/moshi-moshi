import React, { useState } from 'react';
import { X, Heart, Plus, Minus, Sparkles, Check, Flame, MessageCircle } from 'lucide-react';
import { Product, ProductVariant } from '../types/moshi';
import { AVAILABLE_ADDONS } from '../data/moshiData';
import { playPop, playChime } from '../utils/audio';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    variant: ProductVariant | null,
    spiceLevel: 'Suave 🌸' | 'Medio 🌶️' | 'Fuego Anime 🔥',
    selectedAddons: { name: string; price: number }[],
    note: string,
    quantity: number
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const hasVariants = Boolean(product.variants && product.variants.length > 0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    hasVariants ? product.variants![0] : null
  );
  const [spiceLevel, setSpiceLevel] = useState<'Suave 🌸' | 'Medio 🌶️' | 'Fuego Anime 🔥'>('Suave 🌸');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const basePrice = selectedVariant ? selectedVariant.price : product.price || 0;
  const addonsTotal = selectedAddonIds.reduce((sum, id) => {
    const addon = AVAILABLE_ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const itemTotal = (basePrice + addonsTotal) * quantity;

  const handleToggleAddon = (id: string) => {
    playPop();
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    playChime();
    const addons = selectedAddonIds.map((id) => {
      const a = AVAILABLE_ADDONS.find((item) => item.id === id)!;
      return { name: a.name, price: a.price };
    });

    setAddedAnimation(true);
    setTimeout(() => {
      onAddToCart(product, selectedVariant, spiceLevel, addons, note, quantity);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
              {product.tag}
            </span>
            {product.animeReference && (
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                ✦ {product.animeReference}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Product Banner & Hero info */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-pink-50 border border-pink-100 shadow-inner">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-5">
              <div className="text-white">
                <span className="text-xs font-bold text-pink-300 tracking-wider block">
                  {product.japaneseName}
                </span>
                <h3 className="text-2xl font-black">{product.name}</h3>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Descripción del plato
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              {product.detailedDescription || product.description}
            </p>
          </div>

          {/* Size Variant Selector */}
          {hasVariants && product.variants && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Elige tu tamaño
                </h4>
                <span className="text-xs text-pink-600 font-semibold">Obligatorio</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.label === v.label;
                  return (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() => {
                        playPop();
                        setSelectedVariant(v);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50/70 shadow-sm'
                          : 'border-slate-200 hover:border-pink-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-sm font-bold text-slate-800">{v.label}</strong>
                        <span className="text-sm font-black text-pink-600">Bs {v.price}</span>
                      </div>
                      {v.description && (
                        <p className="text-xs text-slate-500">{v.description}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spice Level Selector */}
          {product.spiceLevelAllowed && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  Nivel de Picante japonés
                </h4>
                <span className="text-xs text-slate-400">A tu gusto</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Suave 🌸', 'Medio 🌶️', 'Fuego Anime 🔥'] as const).map((lvl) => {
                  const isSelected = spiceLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        playPop();
                        setSpiceLevel(lvl);
                      }}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Agregados & Toques Kawaii opcionales
              </h4>
              <span className="text-xs text-slate-400">Extras</span>
            </div>
            <div className="space-y-2">
              {AVAILABLE_ADDONS.map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => handleToggleAddon(addon.id)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-pink-400 bg-pink-50/50 text-slate-900'
                        : 'border-slate-200 hover:border-pink-200 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{addon.icon}</span>
                      <span className="text-xs sm:text-sm font-medium">{addon.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-pink-600">+Bs {addon.price}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-pink-500 border-pink-500 text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-3" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes for Maid Kitchen */}
          <div>
            <label htmlFor="modalNote" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Nota especial o indicación para la cocina:
            </label>
            <input
              id="modalNote"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ej. Sin cebollín, caldo bien caliente, mensaje para llevar..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 bg-slate-50/60"
            />
          </div>
        </div>

        {/* Footer / Add to Cart Bar */}
        <div className="sticky bottom-0 z-20 bg-white border-t border-pink-100 p-4 sm:p-5 flex items-center justify-between gap-4">
          {/* Quantity Counter */}
          <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1 bg-slate-50 shrink-0">
            <button
              type="button"
              onClick={() => {
                playPop();
                setQuantity(Math.max(1, quantity - 1));
              }}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-bold text-sm text-slate-800">{quantity}</span>
            <button
              type="button"
              onClick={() => {
                playPop();
                setQuantity(quantity + 1);
              }}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleConfirm}
            className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-5 rounded-2xl shadow-md shadow-pink-500/25 active:scale-95 transition-all duration-200 cursor-pointer ${
              addedAnimation ? 'scale-95 bg-emerald-500' : ''
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-5 h-5 animate-bounce" />
                <span>¡Agregado con Amor! ♡</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 fill-white" />
                <span>Agregar al Pedido · Bs {itemTotal}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
