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
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([
    { id: '1', name: 'Instagram', icon: 'instagram', emoji: '📷', url: 'https://instagram.com/', enabled: true },
    { id: '2', name: 'Telegram', icon: 'telegram', emoji: '✈️', url: 'https://t.me/', enabled: true }
  ]);
  const [loading, setLoading] = useState(true);
  const { themeSettings, loadThemeSettings } = useStore();

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
      const { products: staticProducts, categories: staticCategories } = await import('@/lib/products');
      setProducts(staticProducts.map(p => ({ ...p, _id: p.id, quantity: 50, available: true })));
      setCategories(staticCategories);
      
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

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item._id === productId ? { ...item, quantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
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
                <motion.h1 
                  className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-wider"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {themeSettings.shopName || 'MA BOUTIQUE'}
                </motion.h1>
                
                {/* Cart Button */}
                <motion.button
                  onClick={() => setShowCart(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-bold shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag size={20} />
                  <span className="text-sm md:text-base font-bold">Voir le panier</span>
                  {getTotalItems() > 0 && (
                    <span className="bg-white text-green-600 text-sm rounded-full min-w-[24px] h-6 px-2 flex items-center justify-center font-bold ml-2">
                      {getTotalItems()}
                    </span>
                  )}
                </motion.button>
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
                className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-black text-sm md:text-base lg:text-lg transition-all shadow-lg ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-white to-gray-100 text-black shadow-white/30'
                    : 'bg-gradient-to-r from-gray-900 to-black text-white hover:from-gray-800 hover:to-gray-900 shadow-black/50'
                }`}
              >
                ✨ TOUT
              </button>

              {/* Catégories dynamiques */}
              {categories && categories.map((category: any) => (
                <button
                  key={category._id || category.id}
                  onClick={() => setSelectedCategory(category.slug || category.value || category.name.toLowerCase())}
                  className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-black text-sm md:text-base lg:text-lg transition-all shadow-lg ${
                    selectedCategory === (category.slug || category.value || category.name.toLowerCase())
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/30'
                      : 'bg-gradient-to-r from-gray-900 to-black text-green-400 hover:from-green-900/30 hover:to-green-950/30 shadow-black/50'
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id || product._id}
                  className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-xl overflow-hidden group hover:border-white transition-all duration-300 shadow-xl"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-white overflow-hidden">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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

                    {/* Action - Voir détails seulement */}
                    <button
                      onClick={() => {
                        const productId = product.id || product._id;
                        router.push(`/products/${productId}`);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg font-bold text-xs sm:text-sm hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2"
                    >
                      <Eye size={16} />
                      <span>VOIR DÉTAILS</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Navigation - Design professionnel et moderne */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-gray-900 to-transparent backdrop-blur-xl z-50">
          <div className="border-t border-gray-700/50">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center items-center gap-4 p-3">
                {/* Accueil */}
                <button
                  onClick={() => router.push('/')}
                  className="flex flex-col items-center justify-center py-2 px-4 text-white hover:bg-white/10 rounded-xl transition-all group"
                >
                  <div className="relative">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                      <Home size={20} />
                    </div>
                  </div>
                  <span className="text-xs font-semibold mt-1 opacity-80 group-hover:opacity-100">Accueil</span>
                </button>

                {/* Réseaux sociaux */}
                {socials.filter(s => s.enabled && s.name && s.url).slice(0, 3).map(social => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center py-2 px-4 text-white hover:bg-white/10 rounded-xl transition-all group"
                  >
                    <div className="relative">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-white/20 to-white/10 group-hover:from-white/40 group-hover:to-white/20 transition-all duration-300">
                        <span className="text-2xl">{social.emoji || '🔗'}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold mt-1 opacity-80 group-hover:opacity-100">{social.name}</span>
                  </a>
                ))}

                {/* Panier */}
                <button
                  onClick={() => setShowCart(true)}
                  className="flex flex-col items-center justify-center py-2 px-4 text-white hover:bg-white/10 rounded-xl transition-all group"
                >
                  <div className="relative">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 group-hover:from-green-500 group-hover:to-emerald-600 transition-all duration-300">
                      <ShoppingBag size={20} />
                      {getTotalItems() > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center font-bold shadow-lg animate-pulse">
                          {getTotalItems()}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-semibold mt-1 opacity-80 group-hover:opacity-100">Panier</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Modal - Responsive */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setShowCart(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-black border-4 border-white rounded-2xl w-full max-w-md md:max-w-lg lg:max-w-2xl max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Cart Header */}
                <div className="flex justify-between items-center p-4 md:p-6 border-b-2 border-white">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white">MON PANIER</h3>
                  <button
                    onClick={() => setShowCart(false)}
                    className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Cart Content */}
                <div className="p-4 md:p-6 max-h-96 overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                      <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-white font-bold text-xl md:text-2xl mb-2">Votre panier est vide</p>
                      <p className="text-gray-400 text-sm">Ajoutez des produits pour commencer</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <p className="text-gray-400 text-sm">
                          ({getTotalItems()} {getTotalItems() > 1 ? 'articles' : 'article'})
                        </p>
                      </div>
                      
                      {cart.map((item) => (
                        <motion.div 
                          key={item._id} 
                          className="bg-gradient-to-r from-white/10 to-white/5 p-4 rounded-xl border border-white/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                        >
                          <div className="flex items-start gap-4">
                            {/* Product Image */}
                            <div className="relative">
                              {item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                                  <Package size={32} className="text-white" />
                                </div>
                              )}

                            </div>
                            
                            {/* Product Info */}
                            <div className="flex-1">
                              <h4 className="font-black text-white text-base md:text-lg mb-1">{item.name}</h4>
                              {item.origin && (
                                <p className="text-gray-400 text-xs md:text-sm mb-2">{item.origin}</p>
                              )}
                              
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <motion.button
                                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Minus size={18} />
                                </motion.button>
                                
                                <span className="text-white font-bold text-lg min-w-[30px] text-center">
                                  {item.quantity}
                                </span>
                                
                                <motion.button
                                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                  className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Plus size={18} />
                                </motion.button>
                              </div>
                            </div>
                            
                            {/* Price & Delete */}
                            <div className="flex flex-col items-end gap-2">
                              <p className="text-white font-black text-lg md:text-xl">
                                {(item.price * item.quantity).toFixed(2)}€
                              </p>
                              <motion.button
                                onClick={() => removeFromCart(item._id)}
                                className="text-red-400 hover:text-red-500 text-xs flex items-center gap-1 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Trash2 size={14} />
                                Supprimer
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart Footer */}
                {cart.length > 0 && (
                  <div className="bg-gradient-to-b from-transparent to-black/50 border-t-2 border-white p-4 md:p-6">
                    {/* Summary */}
                    <div className="bg-white/10 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Sous-total</span>
                        <span className="text-white font-semibold">{getTotalPrice()}€</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Livraison</span>
                        <span className="text-green-400 font-semibold">GRATUITE</span>
                      </div>
                      <div className="border-t border-white/20 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xl md:text-2xl font-black text-white">TOTAL</span>
                          <span className="text-2xl md:text-3xl font-black text-green-400">{getTotalPrice()}€</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center text-gray-400 text-xs mb-4">
                      {getTotalItems()} {getTotalItems() > 1 ? 'articles' : 'article'} dans votre panier
                    </div>
                    
                    <motion.button
                      onClick={() => {
                        const message = cart.map(item => `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}€`).join('\n');
                        const total = getTotalPrice();
                        const fullMessage = `🛒 Commande VERSHASH\n\n${message}\n\n💰 TOTAL: ${total}€`;
                        window.open(`https://t.me/VershashBot?text=${encodeURIComponent(fullMessage)}`, '_blank');
                      }}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-black text-lg md:text-xl hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-3 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={24} />
                      COMMANDER MAINTENANT
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}