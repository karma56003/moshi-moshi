import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PromosSection } from './components/PromosSection';
import { EventsSection } from './components/EventsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { Product, ProductVariant, CartItem, Promo, OrderData } from './types/moshi';
import { PRODUCTS } from './data/moshiData';
import { playPop, playChime, playMoeMoeKyunSpell } from './utils/audio';
import { Heart, Sparkles, MessageCircle, X } from 'lucide-react';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('moshi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);
  const [activeSpellNotice, setActiveSpellNotice] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('moshi_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Total cart items count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Add customized product to cart
  const handleAddToCart = (
    product: Product,
    variant: ProductVariant | null,
    spiceLevel: 'Suave 🌸' | 'Medio 🌶️' | 'Fuego Anime 🔥',
    addons: { name: string; price: number }[],
    note: string,
    quantity: number
  ) => {
    const basePrice = variant ? variant.price : product.price || 0;
    const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = basePrice + addonsTotal;

    const addonsKey = addons.map((a) => a.name).sort().join('|');
    const itemKey = `${product.id}::${variant?.label || 'standard'}::${spiceLevel}::${addonsKey}::${note}`;

    setCart((prev) => {
      const existing = prev.find((it) => it.key === itemKey);
      if (existing) {
        return prev.map((it) =>
          it.key === itemKey ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          productId: product.id,
          name: product.name,
          japaneseName: product.japaneseName,
          image: product.image,
          price: unitPrice,
          variantLabel: variant?.label,
          spiceLevel: product.spiceLevelAllowed ? spiceLevel : undefined,
          addons: addons.length > 0 ? addons : undefined,
          note: note.trim() || undefined,
          quantity,
        },
      ];
    });

    playPop();
  };

  // Quick add from menu card without full customization
  const handleQuickAdd = (product: Product, variant: ProductVariant | null) => {
    const price = variant ? variant.price : product.price || 0;
    const itemKey = `${product.id}::${variant?.label || 'standard'}::quick`;

    setCart((prev) => {
      const existing = prev.find((it) => it.key === itemKey);
      if (existing) {
        return prev.map((it) =>
          it.key === itemKey ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          productId: product.id,
          name: product.name,
          japaneseName: product.japaneseName,
          image: product.image,
          price,
          variantLabel: variant?.label,
          quantity: 1,
        },
      ];
    });

    playChime();
    // Tiny heart confetti burst
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#ff2d7a', '#ff77b6', '#ffffff'],
    });
  };

  // Add full promotional combo to cart
  const handleAddPromoToCart = (promo: Promo) => {
    const itemKey = `promo::${promo.id}`;
    setCart((prev) => {
      const existing = prev.find((it) => it.key === itemKey);
      if (existing) {
        return prev.map((it) =>
          it.key === itemKey ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          productId: promo.id,
          name: `Combo Promo: ${promo.title}`,
          image: promo.image,
          price: promo.price,
          variantLabel: promo.badge,
          note: promo.includes.join(', '),
          quantity: 1,
        },
      ];
    });

    playChime();
    setIsCartOpen(true);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((it) => (it.key === key ? { ...it, quantity: it.quantity + delta } : it))
        .filter((it) => it.quantity > 0)
    );
  };

  // Remove single item from cart
  const handleRemoveItem = (key: string) => {
    setCart((prev) => prev.filter((it) => it.key !== key));
  };

  // Trigger the famous Maid spell "Moe Moe Kyun ♡"
  const handleCastSpell = () => {
    playMoeMoeKyunSpell();
    setActiveSpellNotice('¡Moe Moe Kyun! ♡ ¡Tus platillos han sido bendecidos con dulzura y sabor mágico!');

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#ff2d7a', '#ff77b6', '#c084fc', '#fde047', '#ffffff'],
    });

    setTimeout(() => {
      setActiveSpellNotice(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-pink-500 selection:text-white">
      {/* Floating Kawaii Maid Spell Banner */}
      {activeSpellNotice && (
        <div className="fixed top-24 inset-x-4 max-w-md mx-auto z-50 animate-in slide-in-from-top-6 duration-300">
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white p-4 rounded-3xl shadow-2xl border-2 border-white/60 flex items-center gap-3 backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 shrink-0 overflow-hidden shadow-sm">
              <img
                src="/assets/moshi-maid-flowers.png"
                alt="Maid Moshi Moshi"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-pink-200">
                <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
                <span>HECHIZO MAID ACTIVADO</span>
              </div>
              <strong className="block text-sm font-black mt-0.5 leading-snug">
                {activeSpellNotice}
              </strong>
            </div>
            <button
              onClick={() => setActiveSpellNotice(null)}
              className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onCastSpell={handleCastSpell}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => {
            const el = document.querySelector('#menu');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExplorePromos={() => {
            const el = document.querySelector('#promos');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onCastSpell={handleCastSpell}
        />

        {/* Menu Section */}
        <MenuSection
          onSelectProduct={(product) => setSelectedProduct(product)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Promos Section */}
        <PromosSection onAddPromoToCart={handleAddPromoToCart} />

        {/* Events & Anime Community Section */}
        <EventsSection />

        {/* Location & Opening Hours */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick Action Button for WhatsApp Order */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 sm:gap-3">
        <button
          onClick={handleCastSpell}
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-pink-500 border-2 border-pink-300 shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          title="¡Invocar Hechizo Moe Moe Kyun!"
        >
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 group-hover:rotate-45 transition-transform" />
        </button>

        <button
          onClick={() => {
            playPop();
            setIsCartOpen(true);
          }}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-xl shadow-pink-500/30 flex items-center justify-center hover:scale-108 active:scale-95 transition-all cursor-pointer"
          title="Ver mi pedido"
          aria-label="Abrir carrito"
        >
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-pink-600 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Product Detail & Customization Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Sliding Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreMenu={() => {
          const el = document.querySelector('#menu');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderCreated={(order) => {
          setCart([]);
          setIsCheckoutOpen(false);
          setCompletedOrder(order);
        }}
      />

      {/* Confirmation & Printable Ticket Modal */}
      <ConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onNewOrder={() => {
          setCompletedOrder(null);
          const el = document.querySelector('#menu');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
