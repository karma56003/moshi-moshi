import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Heart } from 'lucide-react';
import { CartItem } from '../types/moshi';
import { playPop, playChime } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onProceedToCheckout: () => void;
  onExploreMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreMenu,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          playPop();
          onClose();
        }}
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-pink-100 animate-in slide-in-from-right duration-300"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-pink-100 flex items-center justify-between bg-white/90 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 flex items-center gap-1.5">
                  <span>Tu Pedido</span>
                  <span className="text-pink-500">♡</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {totalItemsCount} {totalItemsCount === 1 ? 'platillo' : 'platillos'} seleccionados
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                playPop();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center text-3xl mb-4 shadow-inner">
                  🍜
                </div>
                <h4 className="text-base font-bold text-slate-800">
                  Tu carrito está esperando por ti
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                  Añade tus ramen favoritos, hamburguesas kawaii o promos para empezar tu pedido.
                </p>
                <button
                  onClick={() => {
                    playPop();
                    onClose();
                    onExploreMenu();
                  }}
                  className="mt-6 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  Ver el Menú Completo ↗
                </button>
              </div>
            ) : (
              items.map((item) => (
                <article
                  key={item.key}
                  className="p-3.5 rounded-2xl bg-pink-50/40 border border-pink-100 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover shrink-0 border border-pink-200/60"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            playPop();
                            onRemoveItem(item.key);
                          }}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                          title="Eliminar plato"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant & Spice Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                        {item.variantLabel && (
                          <span className="font-semibold text-pink-700 bg-pink-100/70 px-1.5 py-0.5 rounded">
                            {item.variantLabel}
                          </span>
                        )}
                        {item.spiceLevel && (
                          <span className="font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
                            {item.spiceLevel}
                          </span>
                        )}
                      </div>

                      {/* Addons List */}
                      {item.addons && item.addons.length > 0 && (
                        <div className="mt-1 text-[11px] text-slate-500 space-y-0.5">
                          {item.addons.map((a, i) => (
                            <span key={i} className="block text-slate-600">
                              + {a.name} (Bs {a.price})
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Special Note */}
                      {item.note && (
                        <span className="text-[10px] text-purple-700 italic block mt-0.5">
                          Nota: "{item.note}"
                        </span>
                      )}
                    </div>

                    {/* Quantity & Price Row */}
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-pink-100/60">
                      <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => {
                            playPop();
                            onUpdateQuantity(item.key, -1);
                          }}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Restar 1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            playPop();
                            onUpdateQuantity(item.key, 1);
                          }}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Sumar 1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <strong className="text-sm font-black text-slate-900">
                        Bs {item.price * item.quantity}
                      </strong>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Footer with Subtotal & Proceed Button */}
          {items.length > 0 && (
            <div className="p-6 border-t border-pink-100 bg-white/95 space-y-4">
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal de productos:</span>
                  <span className="font-bold text-slate-800">Bs {subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Modalidad de entrega:</span>
                  <span className="text-pink-600 font-semibold">Recojo gratis / Delivery</span>
                </div>
                <div className="flex items-center justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total estimado:</span>
                  <span className="text-pink-600 text-xl">Bs {subtotal}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playChime();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continuar con el Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  playPop();
                  onClose();
                  onExploreMenu();
                }}
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-pink-600 transition-colors"
              >
                Seguir explorando el menú
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
