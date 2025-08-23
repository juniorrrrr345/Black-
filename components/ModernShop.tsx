'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Home, Instagram, Send, MessageCircle, 
  Star, TrendingUp, Package, Clock, Shield, 
  Plus, Minus, X, Trash2, ChevronRight, Sparkles,
  ChevronLeft, ChevronDown, Video, Eye,
  Facebook, Twitter, Youtube, Music, Ghost, Gamepad2, Link
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function ModernShop() {
  const router = useRouter();
  // Utilisation du store global au lieu de l'état local
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getTotalItems, 
    getTotalPrice,
    themeSettings,
    loadThemeSettings 
  } = useStore();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([
    { id: '1', name: 'Instagram', icon: 'instagram', emoji: '📷', url: 'https://instagram.com/', enabled: true },
    { id: '2', name: 'Telegram', icon: 'telegram', emoji: '✈️', url: 'https://t.me/', enabled: true }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    loadThemeSettings();
    // Charger les réseaux sociaux depuis localStorage
    const savedSocials = localStorage.getItem('shop-socials');
    if (savedSocials) {
      setSocials(JSON.parse(savedSocials));
    }
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Charger d'abord les produits statiques
      const { products: staticProducts } = await import('@/lib/products');
      setProducts(staticProducts.map(p => ({ ...p, _id: p.id, quantity: 50, available: true })));
      
      // Créer des catégories par défaut
      setCategories([
        { _id: '1', name: 'WEED', slug: 'weed' },
        { _id: '2', name: 'HASH', slug: 'hash' }
      ]);
      
      // Essayer de charger depuis l'API (optionnel)
      try {
        const productsRes = await fetch('/api/products');
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          if (productsData && productsData.length > 0) {
            setProducts(productsData);
          }
        }

        const categoriesRes = await fetch('/api/categories');
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          if (categoriesData && categoriesData.length > 0) {
            setCategories(categoriesData);
          }
        }
              } catch (apiError) {
          // Using static products data as fallback
        }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundStyle = () => {
    const { backgroundType, backgroundColor, backgroundImage, gradientFrom, gradientTo } = themeSettings;
    
    switch (backgroundType) {
      case 'image':
        return backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        } : { backgroundColor: 'black' };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
        };
      default:
        return { backgroundColor };
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category && p.category.toLowerCase() === selectedCategory.toLowerCase());

  // Fonction pour ajouter au panier avec le bon format
  const handleAddToCart = (product: any) => {
    // Convertir le produit au bon format pour le store
    const productToAdd = {
      id: product.id || product._id,
      name: product.name,
      origin: product.origin || '',
      price: product.price,
      pricing: product.pricing,
      image: product.image || '',
      category: product.category || 'weed',
      tag: product.tag,
      tagColor: product.tagColor,
      country: product.country || product.origin || '',
      countryFlag: product.countryFlag || '',
      description: product.description
    };
    addToCart(productToAdd);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl font-bold">Chargement...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen text-white relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Overlay pour assurer la lisibilité */}
      {themeSettings.backgroundType === 'image' && themeSettings.backgroundImage && (
        <div className="absolute inset-0 bg-black/50 z-0"></div>
      )}

      <div className="relative z-10">
        {/* Header - Responsive */}
        <header className="border-b-2 border-white">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-wider">
                  {themeSettings.shopName || 'MA BOUTIQUE'}
                </h1>
                
                {/* Cart Button - Redirige vers /cart */}
                <button
                  onClick={() => router.push('/cart')}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-colors font-bold shadow-lg"
                >
                  <ShoppingBag size={20} />
                  <span className="text-sm md:text-base font-bold">Voir le panier</span>
                  {getTotalItems() > 0 && (
                    <span className="bg-white text-green-600 text-sm rounded-full min-w-[24px] h-6 px-2 flex items-center justify-center font-bold ml-2">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Image principale sous le nom de la boutique */}
          <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
            <img 
              src={themeSettings.bannerImage || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=600&fit=crop"}
              alt="Boutique"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white">
                {themeSettings.bannerText || 'COLLECTION EXCLUSIVE'}
              </h2>
            </div>
          </div>
        </header>

        {/* Categories - Directement après l'image */}
        <section className="px-4 md:px-6 lg:px-8 py-8 md:py-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-8">
              NOS CATÉGORIES
            </h2>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {/* Bouton Tout */}
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-black text-sm md:text-base lg:text-lg ${
                  selectedCategory === 'all'
                    ? 'bg-white text-black'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                ✨ TOUT
              </button>

              {/* Catégories dynamiques */}
              {categories && categories.map((category: any) => (
                <button
                  key={category._id || category.id}
                  onClick={() => setSelectedCategory(category.slug || category.value || category.name.toLowerCase())}
                  className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-black text-sm md:text-base lg:text-lg ${
                    selectedCategory === (category.slug || category.value || category.name.toLowerCase())
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-900 text-green-400 hover:bg-gray-800'
                  }`}
                >
                  {category.icon || '📦'} {category.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid - Responsive - 2 colonnes sur mobile */}
        <section className="px-4 md:px-6 lg:px-8 pb-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Nos Produits Premium
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 min-h-[400px]">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id || product._id}
                  className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-xl overflow-hidden group hover:border-white shadow-xl"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-white overflow-hidden">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <Package size={50} className="text-gray-500" />
                      </div>
                    )}

                    {/* Tags et badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.tag && (
                        <div className={`px-2 py-1 rounded-md text-[10px] sm:text-xs font-bold text-white shadow-lg ${
                          product.tagColor === 'red' ? 'bg-red-500' : 
                          product.tagColor === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                        }`}>
                          {product.tag}
                        </div>
                      )}
                      {product.category && (
                        <div className="px-2 py-1 rounded-md text-[10px] sm:text-xs font-bold bg-black/80 text-white backdrop-blur">
                          {product.category}
                        </div>
                      )}
                    </div>





                    {/* Video indicator */}
                    {product.video && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white p-1.5 rounded-full">
                        <Video size={14} />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-2 line-clamp-1">
                      {product.origin}
                    </p>
                    
                    {/* Price Display */}
                    {product.pricing && product.pricing.length > 0 ? (
                      <div className="mb-3">
                        <div className="text-[10px] sm:text-xs text-gray-500 mb-1">À partir de</div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                          {Math.min(...product.pricing.map((p: any) => p.price))}€
                        </div>
                      </div>
                    ) : (
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3">
                        {product.price}€
                      </div>
                    )}

                    {/* Action - Voir détails ET Ajouter au panier */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={16} />
                        <span>AJOUTER AU PANIER</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          const productId = product.id || product._id;
                          router.push(`/products/${productId}`);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        <span>VOIR DÉTAILS</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Navigation - Design minimaliste et moderne */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center gap-8 py-4">
              {/* Accueil */}
              <button
                onClick={() => router.push('/')}
                className="flex flex-col items-center justify-center text-white hover:text-gray-300 transition-all group cursor-pointer"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">🏠</span>
                <span className="text-[10px] font-medium mt-1 opacity-70 group-hover:opacity-100">Accueil</span>
              </button>

              {/* Réseaux sociaux - design épuré */}
              {socials.filter(s => s.enabled && s.name && s.url).slice(0, 3).map(social => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center text-white hover:text-gray-300 transition-all group cursor-pointer"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {social.name === 'Instagram' ? '📸' : 
                     social.name === 'Telegram' ? '✈️' : 
                     social.name === 'Facebook' ? '👥' :
                     social.name === 'Twitter' ? '🐦' :
                     social.name === 'YouTube' ? '📺' :
                     social.name === 'TikTok' ? '🎵' :
                     social.name === 'Snapchat' ? '👻' :
                     social.name === 'Discord' ? '🎮' :
                     social.emoji || '🔗'}
                  </span>
                  <span className="text-[10px] font-medium mt-1 opacity-70 group-hover:opacity-100">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Suppression complète du Cart Modal car on utilise maintenant la page /cart */}
      </div>
    </div>
  );
}