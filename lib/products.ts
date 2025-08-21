export interface ProductPricing {
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  video?: string;
  category: string | 'weed' | 'hash';
  description: string;
  origin: string;
  country: string;
  countryFlag: string;
  tag?: string;
  tagColor?: string;
  pricing?: ProductPricing[];
  stock?: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800',
      'https://images.unsplash.com/photo-1696446702983-dcd180308989?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=xqyUdNxWazA',
    category: 'Smartphones',
    description: 'Le dernier iPhone avec puce A17 Pro, système de caméra Pro, design en titane. Écran Super Retina XDR de 6,7 pouces avec ProMotion.',
    origin: 'Cupertino, USA',
    country: 'US',
    countryFlag: '🇺🇸',
    tag: 'NOUVEAU',
    tagColor: 'red',
    pricing: [
      { weight: '256 GB', price: 1299 },
      { weight: '512 GB', price: 1499 },
      { weight: '1 TB', price: 1699 }
    ],
    stock: 15,
    featured: true
  },
  {
    id: '2',
    name: 'MacBook Pro M3',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=qODWFe6v3zA',
    category: 'Ordinateurs',
    description: 'MacBook Pro avec puce M3, écran Liquid Retina XDR, jusqu\'à 22 heures d\'autonomie. Performance exceptionnelle pour les professionnels.',
    origin: 'Cupertino, USA',
    country: 'US',
    countryFlag: '🇺🇸',
    tag: 'PRO',
    tagColor: 'green',
    pricing: [
      { weight: '14" - 8GB/512GB', price: 1999 },
      { weight: '14" - 16GB/1TB', price: 2399 },
      { weight: '16" - 16GB/1TB', price: 2899 }
    ],
    stock: 8,
    featured: true
  },
  {
    id: '3',
    name: 'AirPods Pro 2',
    price: 279,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800',
      'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=TKqOx4Vt2Ek',
    category: 'Audio',
    description: 'Réduction active du bruit 2x plus efficace. Audio spatial personnalisé avec suivi dynamique de la tête. Jusqu\'à 6 heures d\'écoute.',
    origin: 'Shenzhen, China',
    country: 'CN',
    countryFlag: '🇨🇳',
    tag: 'BEST SELLER',
    tagColor: 'green',
    price: 279,
    stock: 25
  },
  {
    id: '4',
    name: 'iPad Pro 12.9"',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=ntjkwIXWtrc',
    category: 'Tablettes',
    description: 'iPad Pro avec puce M2, écran Liquid Retina XDR, compatible Apple Pencil et Magic Keyboard. L\'ordinateur est une tablette.',
    origin: 'Cupertino, USA',
    country: 'US',
    countryFlag: '🇺🇸',
    tag: 'PROMO -10%',
    tagColor: 'red',
    pricing: [
      { weight: '128 GB WiFi', price: 1099 },
      { weight: '256 GB WiFi', price: 1199 },
      { weight: '512 GB WiFi + 5G', price: 1599 }
    ],
    stock: 12
  },
  {
    id: '5',
    name: 'Apple Watch Ultra 2',
    price: 849,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800',
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=V5yxEqCojMo',
    category: 'Montres',
    description: 'Montre la plus robuste et performante d\'Apple. Boîtier en titane, autonomie jusqu\'à 72h, GPS double fréquence.',
    origin: 'Cupertino, USA',
    country: 'US',
    countryFlag: '🇺🇸',
    tag: 'SPORT',
    tagColor: 'green',
    pricing: [
      { weight: 'Trail Loop', price: 849 },
      { weight: 'Ocean Band', price: 849 },
      { weight: 'Alpine Loop', price: 849 }
    ],
    stock: 18
  },
  {
    id: '6',
    name: 'Sony PlayStation 5',
    price: 549,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=RkC0l4iekYo',
    category: 'Gaming',
    description: 'Console de jeu nouvelle génération avec SSD ultra-rapide, ray tracing, audio 3D et manette DualSense haptique.',
    origin: 'Tokyo, Japan',
    country: 'JP',
    countryFlag: '🇯🇵',
    tag: 'GAMING',
    tagColor: 'blue',
    pricing: [
      { weight: 'Standard Edition', price: 549 },
      { weight: 'Digital Edition', price: 449 }
    ],
    stock: 5
  },
  {
    id: '7',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=naj4sqfrqnw',
    category: 'Smartphones',
    description: 'Smartphone Android premium avec S Pen intégré, caméra 200MP, écran Dynamic AMOLED 2X de 6,8 pouces.',
    origin: 'Seoul, Korea',
    country: 'KR',
    countryFlag: '🇰🇷',
    tag: 'ANDROID',
    tagColor: 'green',
    pricing: [
      { weight: '256 GB', price: 1399 },
      { weight: '512 GB', price: 1519 },
      { weight: '1 TB', price: 1759 }
    ],
    stock: 10
  },
  {
    id: '8',
    name: 'DJI Mini 4 Pro',
    price: 759,
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800',
    images: [
      'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=SBZhpQL3MaY',
    category: 'Drones',
    description: 'Drone compact de moins de 249g, caméra 4K/60fps, détection d\'obstacles omnidirectionnelle, 34 min de vol.',
    origin: 'Shenzhen, China',
    country: 'CN',
    countryFlag: '🇨🇳',
    tag: 'COMPACT',
    tagColor: 'blue',
    pricing: [
      { weight: 'Drone seul', price: 759 },
      { weight: 'Fly More Combo', price: 1009 },
      { weight: 'Fly More Combo Plus', price: 1309 }
    ],
    stock: 7
  },
  {
    id: '9',
    name: 'Canon EOS R6 Mark II',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
      'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=Eo-3KqSFPRo',
    category: 'Photo',
    description: 'Appareil photo hybride plein format 24,2 MP, vidéo 4K 60p, stabilisation jusqu\'à 8 stops, rafale 40 fps.',
    origin: 'Tokyo, Japan',
    country: 'JP',
    countryFlag: '🇯🇵',
    tag: 'PRO',
    tagColor: 'green',
    pricing: [
      { weight: 'Boîtier nu', price: 2499 },
      { weight: 'Kit 24-105mm', price: 3599 },
      { weight: 'Kit 24-70mm f/2.8', price: 4899 }
    ],
    stock: 4
  },
  {
    id: '10',
    name: 'Bose QuietComfort Ultra',
    price: 429,
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800',
    images: [
      'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=aSoSN7aTJCU',
    category: 'Audio',
    description: 'Casque à réduction de bruit de référence, audio spatial immersif, confort exceptionnel, 24h d\'autonomie.',
    origin: 'Boston, USA',
    country: 'US',
    countryFlag: '🇺🇸',
    tag: 'PREMIUM',
    tagColor: 'blue',
    price: 429,
    stock: 20
  },
  {
    id: '11',
    name: 'LG OLED65C3',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=dYxVP5X_6fY',
    category: 'TV',
    description: 'TV OLED 65 pouces 4K, processeur α9 AI 4K Gen6, Dolby Vision et Atmos, HDMI 2.1 pour gaming.',
    origin: 'Seoul, Korea',
    country: 'KR',
    countryFlag: '🇰🇷',
    tag: 'OLED',
    tagColor: 'red',
    pricing: [
      { weight: '55 pouces', price: 1299 },
      { weight: '65 pouces', price: 1799 },
      { weight: '77 pouces', price: 2999 }
    ],
    stock: 3
  },
  {
    id: '12',
    name: 'Microsoft Surface Laptop 5',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800',
    images: [
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=dp420Jqv5LI',
    category: 'Ordinateurs',
    description: 'Laptop élégant avec écran tactile PixelSense, processeur Intel Core i7, jusqu\'à 18h d\'autonomie.',
    origin: 'Redmond, USA',
    country: 'US',
    countryFlag: '🇺🇸',
    tag: 'BUSINESS',
    tagColor: 'blue',
    pricing: [
      { weight: '13.5" i5/8GB/256GB', price: 1299 },
      { weight: '13.5" i7/16GB/512GB', price: 1799 },
      { weight: '15" i7/16GB/512GB', price: 1999 }
    ],
    stock: 9
  }
];

export const categories = [
  { id: '1', name: 'Tous', value: 'all' },
  { id: '2', name: 'Smartphones', value: 'smartphones' },
  { id: '3', name: 'Ordinateurs', value: 'ordinateurs' },
  { id: '4', name: 'Audio', value: 'audio' },
  { id: '5', name: 'Gaming', value: 'gaming' },
  { id: '6', name: 'Photo', value: 'photo' },
  { id: '7', name: 'TV', value: 'tv' },
  { id: '8', name: 'Tablettes', value: 'tablettes' },
  { id: '9', name: 'Montres', value: 'montres' },
  { id: '10', name: 'Drones', value: 'drones' }
];