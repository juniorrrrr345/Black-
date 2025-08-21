'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Home, Instagram, Send, MessageCircle, 
  Star, TrendingUp, Package, Clock, Shield, 
  Plus, Minus, X, Trash2, ChevronRight, Sparkles,
  ChevronLeft, ChevronDown, Video, Eye
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function ModernShop() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'weed' | 'hash'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { themeSettings, loadThemeSettings } = useStore();

  useEffect(() => {
    loadData();
    loadThemeSettings();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Charger les produits depuis l'API
      const productsRes = await fetch('/api/products');
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      }

      // Charger les catégories depuis l'API
      const categoriesRes = await fetch('/api/categories');
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback vers les produits statiques si l'API échoue
      const { products: fallbackProducts } = await import('@/lib/products');
      setProducts(fallbackProducts.map(p => ({ ...p, _id: p.id, quantity: 50, available: true })));
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
    : products.filter(p => p.category === selectedCategory);

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
                  className="relative bg-white text-black border-2 border-white rounded-lg px-4 py-2 md:px-6 md:py-3 flex items-center gap-2 hover:bg-black hover:text-white transition-all font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag size={20} />
                  <span className="hidden md:inline text-sm font-bold">PANIER</span>
                  {getTotalItems() > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {getTotalItems()}
                    </div>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Image principale sous le nom de la boutique */}
          <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=600&fit=crop"
              alt="Boutique"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2">
                COLLECTION EXCLUSIVE
              </h2>
              <p className="text-lg md:text-xl text-gray-200">
                Découvrez nos produits premium
              </p>
            </div>
          </div>
        </header>

        {/* Categories - Directement après l'image */}
        <section className="px-4 md:px-6 lg:px-8 py-8 md:py-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-6">
              NOS CATÉGORIES
            </h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.length > 0 ? (
                categories.map((category: any) => (
                  <motion.button
                    key={category._id || category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-xl font-black text-sm md:text-base lg:text-lg transition-all border-2 ${
                      selectedCategory === category.name
                        ? 'bg-white text-black border-white'
                        : 'bg-black/50 text-white border-white hover:bg-white hover:text-black'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name.toUpperCase()}
                  </motion.button>
                ))
              ) : (
                <>
                  {['all', 'electronique', 'mode', 'maison'].map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category as any)}
                      className={`px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-xl font-black text-sm md:text-base lg:text-lg transition-all border-2 ${
                        selectedCategory === category
                          ? 'bg-white text-black border-white'
                          : 'bg-black/50 text-white border-white hover:bg-white hover:text-black'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category === 'all' ? 'TOUT' : category.toUpperCase()}
                    </motion.button>
                  ))}
                </>
              )}
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
                <motion.div
                  key={product._id || product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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

                    {/* Country Flag */}
                    {product.countryFlag && (
                      <div className="absolute top-2 right-2 text-lg sm:text-xl bg-white/90 rounded-full p-1 shadow-lg">
                        {product.countryFlag}
                      </div>
                    )}

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

                    {/* Actions - Boutons adaptés pour mobile */}
                    <div className="space-y-2">
                      <motion.button
                        onClick={() => router.push(`/products/${product._id || product.id}`)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold text-xs sm:text-sm hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye size={14} className="sm:hidden" />
                        <span className="hidden sm:inline">VOIR DÉTAILS</span>
                        <span className="sm:hidden">VOIR</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => addToCart(product)}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-semibold text-xs sm:text-sm hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ShoppingBag size={14} />
                        <span className="hidden sm:inline">AJOUTER</span>
                        <Plus size={14} className="sm:hidden" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Navigation - Design professionnel et moderne */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-gray-900 to-transparent backdrop-blur-xl z-50">
          <div className="border-t border-gray-700/50">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-4 gap-1 p-2">
                {/* Accueil */}
                <motion.button
                  onClick={() => router.push('/')}
                  className="flex flex-col items-center justify-center py-3 px-2 text-white hover:bg-white/10 rounded-2xl transition-all group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                      <Home size={24} className="group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold mt-1.5 opacity-80 group-hover:opacity-100">Accueil</span>
                </motion.button>

                {/* Instagram */}
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-3 px-2 text-white hover:bg-white/10 rounded-2xl transition-all group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 group-hover:from-pink-500 group-hover:to-purple-600 transition-all duration-300">
                      <Instagram size={24} className="group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold mt-1.5 opacity-80 group-hover:opacity-100">Instagram</span>
                </motion.a>

                {/* Telegram */}
                <motion.a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-3 px-2 text-white hover:bg-white/10 rounded-2xl transition-all group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 group-hover:from-sky-500 group-hover:to-blue-600 transition-all duration-300">
                      <Send size={24} className="group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold mt-1.5 opacity-80 group-hover:opacity-100">Telegram</span>
                </motion.a>

                {/* Panier */}
                <motion.button
                  onClick={() => setShowCart(true)}
                  className="flex flex-col items-center justify-center py-3 px-2 text-white hover:bg-white/10 rounded-2xl transition-all group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 group-hover:from-green-500 group-hover:to-emerald-600 transition-all duration-300">
                      <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
                      {getTotalItems() > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center font-bold shadow-lg animate-pulse">
                          {getTotalItems()}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-semibold mt-1.5 opacity-80 group-hover:opacity-100">Panier</span>
                </motion.button>
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
                      <ShoppingBag size={48} className="mx-auto text-gray-500 mb-4" />
                      <p className="text-white font-bold text-lg md:text-xl">Votre panier est vide</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 bg-white/10 p-3 md:p-4 rounded-lg">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-2xl md:text-3xl">🌿</span>
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-black text-white text-sm md:text-base">{item.name}</h4>
                            <p className="text-gray-300 text-xs md:text-sm">{item.price}€</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="bg-white text-black w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black hover:bg-gray-200"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-white font-black text-lg md:text-xl w-8 md:w-10 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="bg-white text-black w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black hover:bg-gray-200"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart Footer */}
                {cart.length > 0 && (
                  <div className="border-t-2 border-white p-4 md:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl md:text-2xl font-black text-white">TOTAL:</span>
                      <span className="text-2xl md:text-3xl font-black text-white">{getTotalPrice()}€</span>
                    </div>
                    
                    <motion.button
                      onClick={() => {
                        const message = cart.map(item => `${item.name} x${item.quantity} - ${item.price * item.quantity}€`).join('\n');
                        const total = getTotalPrice();
                        const fullMessage = `Commande VERSHASH:\n\n${message}\n\nTOTAL: ${total}€`;
                        window.open(`https://t.me/VershashBot?text=${encodeURIComponent(fullMessage)}`, '_blank');
                      }}
                      className="w-full bg-white text-black py-3 md:py-4 rounded-lg font-black text-lg md:text-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={20} />
                      COMMANDER VIA TELEGRAM
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