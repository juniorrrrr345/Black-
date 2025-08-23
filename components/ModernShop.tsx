'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Home, Instagram, Send, MessageCircle, 
  Star, TrendingUp, Package, Clock, Shield, 
  Plus, Minus, X, Trash2, ChevronRight, Sparkles,
  ChevronLeft, ChevronDown, Video, Eye,
  Facebook, Twitter, Youtube, Music, Ghost, Gamepad2, Link, ArrowDown
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
        } : { backgroundColor: '#0a0a0a' };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
        };
      default:
        return { backgroundColor: backgroundColor || '#0a0a0a' };
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
      className="min-h-screen text-white relative"
      style={getBackgroundStyle()}
    >
      {/* Overlay pour assurer la lisibilité */}
      {themeSettings.backgroundType === 'image' && themeSettings.backgroundImage && (
        <div className="absolute inset-0 bg-black/60 z-0"></div>
      )}

      <div className="relative z-10">
        {/* Header fixe et moderne */}
        <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-lg z-50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {themeSettings.shopName || 'MA BOUTIQUE'}
              </h1>
              
              {/* Cart Button moderne */}
              <button
                onClick={() => router.push('/cart')}
                className="relative group"
              >
                <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all">
                  <ShoppingBag size={20} />
                  <span className="text-sm font-medium">Panier</span>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section avec bannière immersive */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden mt-14">
          {themeSettings.bannerImage ? (
            <div className="absolute inset-0">
              <img 
                src={themeSettings.bannerImage}
                alt="Bannière"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black"></div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
          )}
          
          <div className="relative text-center px-4 max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
            >
              {themeSettings.bannerText || 'COLLECTION EXCLUSIVE'}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-8"
            >
              Découvrez nos produits premium de qualité exceptionnelle
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center gap-2 mx-auto"
            >
              Découvrir la collection
              <ArrowDown size={20} className="animate-bounce" />
            </motion.button>
          </div>
        </section>

        {/* Categories Section avec design moderne */}
        <section id="categories" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Catégories</h2>
              <p className="text-gray-400">Sélectionnez une catégorie pour filtrer les produits</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Bouton Tout */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('all')}
                className={`relative overflow-hidden rounded-2xl p-6 transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-xl shadow-purple-500/25'
                    : 'bg-white/5 hover:bg-white/10 backdrop-blur'
                }`}
              >
                <div className="relative z-10">
                  <span className="text-3xl mb-2 block">✨</span>
                  <span className="font-bold text-sm">TOUT</span>
                  <span className="block text-xs mt-1 opacity-70">
                    {products.length} produits
                  </span>
                </div>
              </motion.button>

              {/* Catégories dynamiques */}
              {categories.map((category: any) => {
                const categoryProducts = products.filter(p => 
                  p.category && p.category.toLowerCase() === (category.slug || category.value || category.name.toLowerCase())
                );
                return (
                  <motion.button
                    key={category._id || category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.slug || category.value || category.name.toLowerCase())}
                    className={`relative overflow-hidden rounded-2xl p-6 transition-all ${
                      selectedCategory === (category.slug || category.value || category.name.toLowerCase())
                        ? 'bg-gradient-to-br from-green-600 to-emerald-600 shadow-xl shadow-green-500/25'
                        : 'bg-white/5 hover:bg-white/10 backdrop-blur'
                    }`}
                  >
                    <div className="relative z-10">
                      <span className="text-3xl mb-2 block">{category.icon || '🌿'}</span>
                      <span className="font-bold text-sm">{category.name.toUpperCase()}</span>
                      <span className="block text-xs mt-1 opacity-70">
                        {categoryProducts.length} produits
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Section avec grille moderne */}
        <section className="py-20 px-4 pb-32">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {selectedCategory === 'all' ? 'Tous nos produits' : `Catégorie ${selectedCategory.toUpperCase()}`}
              </h2>
              <p className="text-gray-400">{filteredProducts.length} produits disponibles</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id || product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                    {/* Image avec effet de zoom */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={60} className="text-gray-600" />
                        </div>
                      )}

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.tag && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                            product.tagColor === 'red' ? 'bg-red-500' : 
                            product.tagColor === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                          }`}>
                            {product.tag}
                          </span>
                        )}
                        {product.category && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/70 text-white backdrop-blur">
                            {product.category.toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Quick view on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => router.push(`/products/${product.id || product._id}`)}
                          className="bg-white text-black px-4 py-2 rounded-full font-bold transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                        >
                          Voir détails
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-1">
                        {product.origin || 'Premium Quality'}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < 4 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'} />
                        ))}
                        <span className="text-xs text-gray-400 ml-2">(4.8)</span>
                      </div>

                      {/* Price */}
                      <div className="mb-4 flex-1">
                        {product.pricing && product.pricing.length > 0 ? (
                          <div>
                            <span className="text-xs text-gray-400">À partir de</span>
                            <div className="text-2xl font-bold text-white">
                              {Math.min(...product.pricing.map((p: any) => p.price))}€
                            </div>
                          </div>
                        ) : (
                          <div className="text-2xl font-bold text-white">
                            {product.price}€
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(product)}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2.5 rounded-xl font-bold text-sm hover:from-green-600 hover:to-emerald-600 transition-all"
                        >
                          Ajouter
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => router.push(`/products/${product.id || product._id}`)}
                          className="bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl font-bold text-sm transition-all backdrop-blur"
                        >
                          Détails
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <Package size={64} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-400">Essayez une autre catégorie</p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Navigation - Design minimaliste et moderne */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md z-40">
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