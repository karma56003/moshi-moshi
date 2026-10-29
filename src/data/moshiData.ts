import { Product, Promo, MaidProfile, EventItem, ProductAddon } from '../types/moshi';

export const WHATSAPP_PHONE = '59168720993';
export const WHATSAPP_FORMATTED = '+591 68720993';
export const STORE_ADDRESS = 'Barrio San Roque, Calle Fray Manuel Mingo N.º 589, Tarija, Bolivia';
export const STORE_SCHEDULE = 'Mar a Sáb · 17:00 a 21:30';

export const AVAILABLE_ADDONS: ProductAddon[] = [
  { id: 'tamago', name: 'Huevo Marinado (Ajitsuke Tamago)', price: 4, icon: '🥚' },
  { id: 'chashu', name: 'Extra Cerdo Chashu', price: 8, icon: '🥩' },
  { id: 'ketchup-heart', name: 'Corazón en Ketchup por Maid', price: 2, icon: '❤️' },
  { id: 'nori-sesamo', name: 'Algas Nori & Sésamo', price: 3, icon: '🌿' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'ramen-clasico',
    name: 'Ramen Clásico Moshi',
    japaneseName: 'クラシックラーメン',
    category: 'ramen',
    image: '/assets/ramen-clasico.jpg',
    tag: 'Favorito',
    description: 'Cerdo chashu, verduras frescas, cebollín y huevo ajitsuke en caldo artesanal.',
    detailedDescription: 'Caldo cocinado a fuego lento por 8 horas, fideos caseros, cerdo chashu tierno, cebollín fresco, zanahoria y huevo marinado con yema cremosa.',
    spiceLevelAllowed: true,
    isPopular: true,
    variants: [
      { label: 'Chibi (Pequeño)', price: 15, description: 'Porción personal ligera' },
      { label: 'Sempai (Grande)', price: 25, description: 'Porción completa con doble fideo' }
    ]
  },
  {
    id: 'ramen-especial',
    name: 'Ramen Especial',
    japaneseName: 'スペシャルラーメン',
    category: 'ramen',
    image: '/assets/ramen-picante.jpg',
    tag: 'Especial Maid',
    description: 'Receta de la casa con especias orientales y toque picante.',
    detailedDescription: 'Fusión de miso rojo, especias japonesas y caldo tonkotsu cremoso con cerdo y vegetales crujientes.',
    spiceLevelAllowed: true,
    isPopular: true,
    variants: [
      { label: 'Chibi (Pequeño)', price: 17, description: 'Porción personal intensa' },
      { label: 'Sempai (Grande)', price: 27, description: 'Tazón grande para amantes del ramen' }
    ]
  },
  {
    id: 'soseji-ramen',
    name: 'Soseji Ramen Kawaii',
    japaneseName: 'ソーセージラーメン',
    category: 'ramen',
    image: '/assets/ramen-soseji.jpg',
    tag: 'Kawaii',
    description: 'Salchichas en forma de pulpito (Tako-san), huevo y sésamo tostado.',
    detailedDescription: 'Salchichas talladas a mano en forma de pulpitos japoneses, huevo tierno, verduras frescas y caldo reconfortante.',
    spiceLevelAllowed: true,
    isPopular: true,
    variants: [
      { label: 'Chibi (Pequeño)', price: 17, description: '3 pulpitos Tako-san' },
      { label: 'Sempai (Grande)', price: 27, description: '6 pulpitos Tako-san y extra fideos' }
    ]
  },
  {
    id: 'ramen-bekon',
    name: 'Ramen Bekon',
    japaneseName: 'ベーコンラーメン',
    category: 'ramen',
    image: '/assets/ramen-chashu.jpg',
    tag: 'Ahumado',
    description: 'Tocino crujiente dorado a la plancha, champiñones, huevo y verduras.',
    detailedDescription: 'Tocino ahumado caramelizado, champiñones laminados y caldo shoyu concentrado.',
    spiceLevelAllowed: true,
    variants: [
      { label: 'Chibi (Pequeño)', price: 20, description: 'Porción personal' },
      { label: 'Sempai (Grande)', price: 30, description: 'Porción abundante' }
    ]
  },
  {
    id: 'ramen-inosuke',
    name: 'Ramen Inosuke',
    japaneseName: '伊之助ラーメン',
    category: 'ramen',
    image: '/assets/ramen-chashu.jpg',
    tag: 'Demon Slayer',
    description: 'Doble carne: cerdo estofado, tocino crocante, champiñones y sésamo.',
    detailedDescription: 'Inspirado en Inosuke Hashibira. Doble proteína, hongos, huevo ajitsuke entero y caldo concentrado.',
    spiceLevelAllowed: true,
    isPopular: true,
    animeReference: 'Kimetsu no Yaiba',
    variants: [
      { label: 'Chibi (Pequeño)', price: 25, description: 'Tazón doble carne' },
      { label: 'Sempai (Grande)', price: 35, description: 'Combo épico del Rey de la Montaña' }
    ]
  },
  {
    id: 'ramen-p-chan',
    name: 'Ramen P-Chan',
    japaneseName: 'Pちゃんラーメン',
    category: 'ramen',
    image: '/assets/ramen-soseji.jpg',
    tag: 'Ranma 1/2',
    description: 'Pulpitos de salchicha, tocino, choclo dulce japonés y huevo.',
    detailedDescription: 'Choclo tierno dulce, salchichitas tako, tocino crocante y caldo suavemente sabroso.',
    spiceLevelAllowed: true,
    animeReference: 'Ranma 1/2',
    variants: [
      { label: 'Chibi (Pequeño)', price: 25, description: 'Porción clásica P-Chan' },
      { label: 'Sempai (Grande)', price: 35, description: 'Porción colosal con extra choclo' }
    ]
  },
  {
    id: 'ramen-mixto-soseji',
    name: 'Ramen Mixto Soseji',
    japaneseName: 'ミックスラーメン',
    category: 'ramen',
    image: '/assets/ramen-soseji.jpg',
    tag: 'Mixto',
    description: 'Láminas de cerdo chashu y salchichas pulpito en un solo tazón.',
    detailedDescription: 'Cerdo estofado casero y los emblemáticos pulpitos kawaii juntos en caldo sabroso.',
    spiceLevelAllowed: true,
    variants: [
      { label: 'Chibi (Pequeño)', price: 25, description: 'Mix personal' },
      { label: 'Sempai (Grande)', price: 35, description: 'Mix grande' }
    ]
  },
  {
    id: 'ramen-titan-colosal',
    name: 'Ramen Titán Colosal',
    japaneseName: '超大型巨人ラーメン',
    category: 'ramen',
    image: '/assets/ramen-picante.jpg',
    tag: 'Attack on Titan',
    description: 'Triple carne, champiñones, huevo entero y caldo picante intenso.',
    detailedDescription: 'Triple porción de proteínas, caldo picante ardiente de shoyu-miso y guarnición monumental.',
    spiceLevelAllowed: true,
    isPopular: true,
    animeReference: 'Attack on Titan',
    variants: [
      { label: 'Chibi (Colosal Jr.)', price: 32, description: 'Versión concentrada' },
      { label: 'Sempai (Titán Supremo)', price: 42, description: 'Tazón XL gigante' }
    ]
  },
  {
    id: 'pollo-agridulce',
    name: 'Pollo en Salsa Agridulce',
    japaneseName: '甘酸っぱいチキン',
    category: 'platos',
    image: '/assets/pollo-agridulce.jpg',
    tag: 'Plato Caliente',
    description: 'Presa de pollo glaseada en salsa agridulce con papas fritas y arroz Onigiri.',
    detailedDescription: 'Pollo crujiente bañado en salsa agridulce casera con papitas recién fritas y dos bolitas onigiri.',
    variants: [
      { label: 'Chibi (1 presa + guarnición)', price: 18, description: '1 presa grande con papas y onigiri' },
      { label: 'Sempai (2 presas + guarnición)', price: 28, description: '2 presas grandes con porción completa' }
    ]
  },
  {
    id: 'burger-moshi',
    name: 'Burger Moshi Ratón Kawaii',
    japaneseName: 'もしもしバーガー',
    category: 'burgers',
    image: '/assets/burger-moshi.jpg',
    tag: 'Exclusiva Moshi',
    description: 'Hamburguesa con orejitas de ratón, queso, huevo frito y papas fritas.',
    detailedDescription: 'Pan artesanal con orejitas kawaii, carne a la parrilla, queso derretido, huevo frito y papas.',
    price: 20
  },
  {
    id: 'hawk-burger',
    name: 'Hawk Burger Suprema',
    japaneseName: 'ホークバーガー',
    category: 'burgers',
    image: '/assets/burger-moshi.jpg',
    tag: 'Nanatsu no Taizai',
    description: 'Doble carne, queso cheddar fundido, tocino crocante y papas fritas.',
    detailedDescription: 'Doble carne jugosa, queso cheddar, tocino y papas doraditas.',
    price: 25
  },
  {
    id: 'papas-queso',
    name: 'Papas con Queso',
    japaneseName: 'チーズポテト',
    category: 'extras',
    image: '/assets/papas-postre.jpg',
    tag: 'Para Compartir',
    description: 'Papas fritas crujientes con queso rallado, mayonesa y ketchup.',
    price: 6
  },
  {
    id: 'postre-kawaii',
    name: 'Postre Dulce del Día',
    japaneseName: 'かわいいデザート',
    category: 'extras',
    image: '/assets/papas-postre.jpg',
    tag: 'Dulce',
    description: 'Bombones artesanales o porción de tarta bendecida por las maids.',
    price: 5
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola Personal',
    japaneseName: 'コカコーラ',
    category: 'bebidas',
    image: '/assets/bebidas.jpg',
    tag: 'Bebida',
    description: 'Botella personal bien fría.',
    price: 5
  },
  {
    id: 'fanta',
    name: 'Fanta Naranja',
    japaneseName: 'ファンタ',
    category: 'bebidas',
    image: '/assets/bebidas.jpg',
    tag: 'Bebida',
    description: 'Refresco frío sabor naranja.',
    price: 5
  }
];

export const PROMOTIONS: Promo[] = [
  {
    id: 'promo-moshi-amigos',
    title: 'Moshi Amigos',
    subtitle: 'Especial para compartir con tu Bestie',
    kicker: '✿ COMBO PARA DOS',
    badge: 'Besties ♡',
    themeColor: 'purple',
    price: 45,
    image: '/assets/promo-moshi-amigos.jpg',
    description: '2 tazones de ramen + 2 llaveritos anime de regalo + tarjeta con dedicatoria.',
    includes: [
      '2 Tazones de Ramen a elección (Chibi)',
      '2 Llaveros anime coleccionables de regalo',
      '1 Tarjeta con dedicatoria para tu amigo/a',
      'Bendición Moe Moe Kyun incluida'
    ]
  },
  {
    id: 'promo-enamorados',
    title: 'Promo Enamorados',
    subtitle: 'Combo amoroso para dos personas',
    kicker: '♡ LOVE EDITION',
    badge: 'Parejas ♡',
    themeColor: 'rose',
    price: 55,
    image: '/assets/promo-enamorados.jpg',
    description: '2 platos fuertes + 2 bebidas + globo corazón + bombones de chocolate.',
    includes: [
      '2 Platos a elección (Ramen Sempai o Burger Moshi)',
      '2 Bebidas frías a elección',
      '1 Globo corazón de recuerdo',
      'Bombones de chocolate artesanales',
      '2 Llaveritos anime de pareja'
    ]
  },
  {
    id: 'promo-soldado-caido',
    title: 'Soldado Caído',
    subtitle: 'El consuelo dulce si te rompieron el corazón',
    kicker: '💔 TE CUIDAMOS EN MOSHI',
    badge: 'Moshi te consuela 🐱',
    themeColor: 'pink',
    price: 35,
    image: '/assets/promo-soldado-caido.jpg',
    description: '1 Ramen Sempai calentito + ramo de flores kawaii + llaverito de ánimo.',
    includes: [
      '1 Tazón de Ramen Sempai bien calentito',
      'Ramo de flores y mensaje motivacional',
      '1 Llaverito de tu personaje favorito',
      'Mimos y palabras de ánimo de las maids'
    ]
  }
];

export const MAIDS: MaidProfile[] = [
  {
    id: 'cherry',
    name: 'Sakura-chan',
    role: 'Maid Líder',
    japaneseTitle: 'さくらちゃん · チーフメイド',
    catchphrase: '¡El ramen sabe mejor con amor y un toque mágico!',
    favoriteDish: 'Ramen Clásico con Ajitsuke Tamago',
    image: '/assets/moshi-maid-flowers.png',
    badgeColor: 'from-pink-500 to-rose-400',
    charmSpell: '¡Moe Moe Kyun! ¡Que este ramen cure cualquier tristeza!'
  },
  {
    id: 'chibi',
    name: 'Chibi-chan',
    role: 'Maestra de Postres & Burgers',
    japaneseTitle: 'ちびちゃん · スイーツメイド',
    catchphrase: '¡Las orejitas en las burgers son mi especialidad secreta!',
    favoriteDish: 'Burger Moshi & Papas con Queso',
    image: '/assets/moshi-maid-chocolates.png',
    badgeColor: 'from-purple-500 to-fuchsia-400',
    charmSpell: '¡Kira Kira Doki! ¡La dulzura que alegra tu corazón!'
  },
  {
    id: 'yuki',
    name: 'Yuki-chan',
    role: 'Alquimista de Bebidas',
    japaneseTitle: 'ゆきちゃん · ゲームメイド',
    catchphrase: '¡Te reto a una partida de cartas anime mientras esperas!',
    favoriteDish: 'Soseji Ramen con pulpitos Tako-san',
    image: '/assets/moshi-maid-flowers.png',
    badgeColor: 'from-indigo-500 to-purple-400',
    charmSpell: '¡Niko Niko Nii! ¡Que la buena suerte acompañe tu día!'
  },
  {
    id: 'hina',
    name: 'Hina-chan',
    role: 'Anfitriona Cosplay & Karaoke',
    japaneseTitle: 'ひなちゃん · イベントメイド',
    catchphrase: '¡En Moshi la comunidad anime siempre tiene su casa abierta!',
    favoriteDish: 'Ramen Inosuke Guerrero Sempai',
    image: '/assets/moshi-maid-chocolates.png',
    badgeColor: 'from-rose-500 to-amber-400',
    charmSpell: '¡Sugoi Sugoi Spark! ¡A disfrutar de la mejor música y ramen!'
  }
];

export const EVENTS: EventItem[] = [
  {
    id: 'chidori-fest',
    title: 'Chidori Fest · Expo Anime 2026',
    date: '24 y 25 de Octubre, 2026',
    location: 'Coliseo San Roque · Tarija',
    badge: 'Expo Anime ⚡',
    image: '/assets/evento-chidori-fest.jpg',
    description: 'Encuentro de anime, cosplay y gaming con stand oficial de comida rápida Moshi Moshi.',
    highlights: [
      'Stand oficial de ramen y burgers',
      'Photocall exclusivo con las Maids',
      'Torneo de Cosplay y Baile',
      'Concurso del Ramen más Picante'
    ]
  },
  {
    id: 'tanjoubi-moshi',
    title: 'Tanjoubi Moshi · Aniversario',
    date: 'Celebración Anual',
    location: 'Local Central Moshi Moshi',
    badge: 'Aniversario 🎂',
    image: '/assets/evento-tanjoubi-moshi.jpg',
    description: 'Fiesta de agradecimiento con pastel, regalos coleccionables y dinámicas especiales.',
    highlights: [
      'Pastel compartido con todos los clientes',
      'Llaveros de regalo en cada pedido',
      'Karaoke anime libre con premios',
      'Descuentos especiales en combos'
    ]
  }
];

export const EXPERIENCE_PILLARS = [
  {
    step: '01',
    icon: '✨',
    title: 'Ritual Moe Moe Kyun ♡',
    japanese: '萌え萌えキュン',
    description: 'Las maids bendicen tu platillo en mesa o al empacarlo con un encantamiento de felicidad y sabor.'
  },
  {
    step: '02',
    icon: '🎨',
    title: 'Dibujos en Ketchup',
    japanese: 'ケチャップアート',
    description: 'Gatitos, corazones o dedicatorias dibujadas al instante sobre tus hamburguesas y platos.'
  },
  {
    step: '03',
    icon: '📖',
    title: 'Mangateca & Juegos',
    japanese: 'マンガとボードゲーム',
    description: 'Tomos de manga y juegos de mesa casuales para disfrutar con amigos en tu mesa.'
  },
  {
    step: '04',
    icon: '🌸',
    title: 'Comunidad Cosplay',
    japanese: 'コスプレコミュニティ',
    description: 'Punto de encuentro otaku en Tarija. Ven con tu cosplay a compartir tu pasión.'
  }
];
