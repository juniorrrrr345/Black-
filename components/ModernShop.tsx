'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Home, Instagram, Send, MessageCircle, 
  Star, TrendingUp, Package, Clock, Shield, 
  Plus, Minus, X, Trash2, ChevronRight, Sparkles,
  ChevronLeft, ChevronDown
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function ModernShop() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'weed' | 'hash'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, themeSettings, loadThemeSettings } = useStore();

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
        <header className="border-b-2 border-white p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-wider"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {themeSettings.shopName || 'VERSHASH'}
              </motion.h1>
              
              {/* Cart Button */}
              <motion.button
                onClick={() => router.push('/cart')}
                className="relative bg-white text-black border-2 border-white rounded-lg px-4 py-2 md:px-6 md:py-3 flex items-center gap-2 hover:bg-black hover:text-white transition-all font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={20} />
                <span className="hidden md:inline text-sm font-bold">VOIR LE PANIER</span>
                {getTotalItems() > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </div>
                )}
              </motion.button>
            </div>
          </div>
        </header>

        {/* Hero Banner - Responsive */}
        <section className="relative py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              className="inline-block bg-black/80 backdrop-blur-sm border-2 border-white rounded-2xl px-6 py-4 md:px-8 md:py-6 lg:px-12 lg:py-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 md:mb-4">
                {themeSettings.bannerText || 'NOUVEAU DROP'}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-300 font-bold">
                QUALITÉ PREMIUM • LIVRAISON RAPIDE • SERVICE CLIENT 24/7
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories - Responsive */}
        <section className="px-4 md:px-6 lg:px-8 mb-8 md:mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {['all', 'weed', 'hash'].map((category) => (
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
            </div>
          </div>
        </section>

        {/* Products Grid - Responsive */}
        <section className="px-4 md:px-6 lg:px-8 pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id || product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black border-4 border-white rounded-2xl overflow-hidden group hover:border-gray-300 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-48 md:h-56 lg:h-64 bg-white overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
                      {product.image && product.image.startsWith('http') ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl md:text-7xl lg:text-8xl opacity-60">🌿</div>
                      )}
                    </div>

                    {/* Tag */}
                    {product.tag && (
                      <div className={`absolute top-3 left-3 px-2 py-1 md:px-3 md:py-2 rounded-lg text-xs md:text-sm font-black text-white ${
                        product.tagColor === 'red' ? 'bg-red-500' : 'bg-green-500'
                      }`}>
                        {product.tag}
                      </div>
                    )}

                    {/* Country Flag */}
                    <div className="absolute top-3 right-3 text-xl md:text-2xl">
                      {product.countryFlag}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white mb-2">{product.name}</h3>
                    <p className="text-sm md:text-base text-white/80 mb-2">{product.origin}</p>
                    
                    {/* Price Display */}
                    {product.pricing && product.pricing.length > 0 ? (
                      <div className="mb-4">
                        <div className="text-xs md:text-sm text-white/60 mb-2">À partir de:</div>
                        <div className="text-xl md:text-2xl lg:text-3xl font-black text-white">
                          {Math.min(...product.pricing.map((p: any) => p.price))}€
                        </div>
                      </div>
                    ) : (
                      <div className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-4">
                        {product.price}€
                      </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-2 md:space-y-3">
                      <motion.button
                        onClick={() => router.push(`/products/${product._id || product.id}`)}
                        className="w-full bg-white text-black py-2 md:py-3 lg:py-4 rounded-lg font-black text-sm md:text-base lg:text-lg hover:bg-gray-200 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        VOIR DÉTAILS
                      </motion.button>
                      
                      <motion.button
                        onClick={() => {
                          const productForCart = {
                            ...product,
                            id: product._id || product.id
                          };
                          addToCart(productForCart);
                        }}
                        className="w-full bg-black border-2 border-white text-white py-2 md:py-3 lg:py-4 rounded-lg font-black text-sm md:text-base lg:text-lg hover:bg-white hover:text-black transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ShoppingBag className="inline mr-2" size={16} />
                        AJOUTER
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Navigation - Responsive */}
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t-4 border-white z-50">
          <div className="max-w-7xl mx-auto flex justify-around py-3 md:py-4 lg:py-6 px-2">
            <motion.button
              onClick={() => router.push('/')}
              className="flex flex-col items-center gap-1 md:gap-2 text-white hover:bg-white hover:text-black transition-all rounded-xl p-2 md:p-3 border-2 border-white font-black"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Home size={20} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
              <span className="text-xs md:text-sm">ACCUEIL</span>
            </motion.button>

            <motion.button
              onClick={() => window.open('https://instagram.com/vershash', '_blank')}
              className="flex flex-col items-center gap-1 md:gap-2 text-white hover:bg-white hover:text-black transition-all rounded-xl p-2 md:p-3 border-2 border-white font-black"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram size={20} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
              <span className="text-xs md:text-sm">INSTAGRAM</span>
            </motion.button>

            <motion.button
              onClick={() => window.open('https://t.me/VershashBot', '_blank')}
              className="flex flex-col items-center gap-1 md:gap-2 text-white hover:bg-white hover:text-black transition-all rounded-xl p-2 md:p-3 border-2 border-white font-black"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle size={20} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
              <span className="text-xs md:text-sm">TELEGRAM</span>
            </motion.button>

            <motion.button
              onClick={() => router.push('/cart')}
              className="flex flex-col items-center gap-1 md:gap-2 text-white hover:bg-white hover:text-black transition-all rounded-xl p-2 md:p-3 border-2 border-white font-black relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative">
                <ShoppingBag size={20} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
                {getTotalItems() > 0 && (
                  <div className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-black border-2 border-black">
                    {getTotalItems()}
                  </div>
                )}
              </div>
              <span className="text-xs md:text-sm">VOIR PANIER</span>
            </motion.button>
          </div>
        </div>


      </div>
    </div>
  );
}