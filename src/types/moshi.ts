export interface ProductVariant {
  label: string;
  price: number;
  description?: string;
}

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  japaneseName?: string;
  category: 'ramen' | 'platos' | 'burgers' | 'extras' | 'bebidas';
  image: string;
  tag: string;
  description: string;
  detailedDescription?: string;
  price?: number; // for single-price items
  variants?: ProductVariant[]; // for Chibi / Sempai sizes
  spiceLevelAllowed?: boolean;
  isPopular?: boolean;
  animeReference?: string;
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  japaneseName?: string;
  image: string;
  price: number;
  variantLabel?: string;
  spiceLevel?: 'Suave 🌸' | 'Medio 🌶️' | 'Fuego Anime 🔥';
  addons?: { name: string; price: number }[];
  note?: string;
  quantity: number;
}

export interface Promo {
  id: string;
  title: string;
  subtitle: string;
  kicker: string;
  description: string;
  price: number;
  image: string;
  badge: string;
  themeColor: 'pink' | 'purple' | 'rose' | 'amber';
  includes: string[];
}

export interface MaidProfile {
  id: string;
  name: string;
  role: string;
  japaneseTitle: string;
  catchphrase: string;
  favoriteDish: string;
  image: string;
  badgeColor: string;
  charmSpell: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  badge: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface OrderData {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  fulfillment: 'pickup' | 'delivery';
  address?: string;
  reference?: string;
  paymentMethod: 'qr' | 'cash';
  cashAmount?: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}
