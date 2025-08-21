'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Home, Instagram, Send, MessageCircle, 
  Star, TrendingUp, Package, Clock, Shield, 
  Plus, Minus, X, Trash2, ChevronRight, Sparkles,
  ChevronLeft, ChevronDown
} from 'lucide-react';

import { products } from '@/lib/products';
import { useRouter } from 'next/navigation';

// Produits d'exemple avec style VERSHASH
const sampleProducts = [
  {
    _id: '1',
    name: 'Cali Spain',
    category: 'WEED',
    type: 'weed',
    price: 45,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400',
    badge: 'BON RAPPORT QUALITÉ',
    badgeColor: 'bg-red-600',
    flag: '🇪🇸',
    description: 'Qualité premium d\'Espagne'
  },
  {
    _id: '2',
    name: 'Lemon Cherry Gelato',
    category: 'WEED',
    type: 'weed',
    price: 55,
    image: 'https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?w=400',
    badge: 'DE LA FRAPPE',
    badgeColor: 'bg-green-500',
    flag: '🇨🇦',
    description: 'Saveurs citron-cerise exceptionnelles'
  },
  {
    _id: '3',
    name: 'Purple Haze',
    category: 'WEED',
    type: 'weed',
    price: 50,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784efd?w=400',
    badge: 'PREMIUM',
    badgeColor: 'bg-purple-600',
    flag: '🇳🇱',
    description: 'Classique hollandais'
  },
  {
    _id: '4',
    name: 'Afghan Hash',
    category: 'HASH',
    type: 'hash',
    price: 48,
    image: 'https://images.unsplash.com/photo-1536819114556-1e10f967fb61?w=400',
    badge: 'TRADITIONNEL',
    badgeColor: 'bg-amber-600',
    flag: '🇦🇫',
    description: 'Hash traditionnel afghan'
  },
  {
    _id: '5',
    name: 'Moroccan Gold',
    category: 'HASH',
    type: 'hash',
    price: 60,
    image: 'https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?w=400',
    badge: 'GOLD QUALITY',
    badgeColor: 'bg-yellow-600',
    flag: '🇲🇦',
    description: 'Hash doré du Maroc'
  },
  {
    _id: '6',
    name: 'Bubble Hash',
    category: 'HASH',
    type: 'hash',
    price: 52,
    image: 'https://images.unsplash.com/photo-1503262028195-93c528f03218?w=400',
    badge: 'BUBBLE',
    badgeColor: 'bg-blue-600',
    flag: '🇨🇦',
    description: 'Hash bubble premium'
  }
];

export default function ModernShop() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'weed' | 'hash'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carrousel automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product: any) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowCart(true);
    setTimeout(() => setShowCart(false), 2000);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item._id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? sampleProducts 
    : sampleProducts.filter(product => product.type === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Interface Mobile VERSHASH */}
      <div className="max-w-lg mx-auto bg-black min-h-screen relative overflow-hidden">
        
        {/* Header VERSHASH */}
        <div className="text-center py-8 relative z-10 border-b-4 border-white">
          <motion.h1 
            className="text-5xl font-black text-white tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            VERSHASH
          </motion.h1>
        </div>

        {/* Carrousel Hero */}
        <div className="relative h-80 mx-4 mb-6 rounded-3xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-800 rounded-3xl"
            >
              <div className="relative h-full flex flex-col justify-center items-center text-center p-6">
                <div className="text-6xl font-black text-white mb-4">NEW</div>
                <div className="bg-black/80 px-6 py-3 rounded-full flex items-center space-x-2">
                  <span className="text-2xl">🇨🇦</span>
                  <span className="text-white font-bold text-lg">RESTOCK CANADIENNE</span>
                  <span className="text-2xl">🇨🇦</span>
                </div>
                
                {/* Image de produit au centre */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <img 
                    src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400" 
                    alt="Product"
                    className="w-64 h-64 object-cover rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation du carrousel */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Flèches de navigation */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + 2) % 2)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % 2)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Section Catégories */}
        <div className="mx-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Catégorie</h2>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('weed')}
                className={`px-8 py-3 rounded-full border-2 transition-all font-bold ${
                  selectedCategory === 'weed' || selectedCategory === 'all'
                    ? 'border-green-500 bg-green-500/20 text-green-400'
                    : 'border-purple-500 text-purple-400'
                }`}
              >
                <span className="mr-2">🌿</span>
                WEED
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('hash')}
                className={`px-8 py-3 rounded-full border-2 transition-all font-bold ${
                  selectedCategory === 'hash' || selectedCategory === 'all'
                    ? 'border-red-500 bg-red-500/20 text-red-400'
                    : 'border-purple-500 text-purple-400'
                }`}
              >
                <span className="mr-2">🔥</span>
                HASH
              </motion.button>
            </div>
          </div>
        </div>

        {/* Grille de Produits */}
        <div className="px-4 pb-24">
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badge catégorie */}
                  <div className="absolute top-3 left-3 bg-black/70 px-3 py-1 rounded-full">
                    <span className="text-xs font-bold text-white flex items-center">
                      {product.type === 'weed' ? '🌿' : '🔥'} {product.category}
                    </span>
                  </div>
                  
                  {/* Badge qualité */}
                  <div className={`absolute top-3 right-3 ${product.badgeColor} px-3 py-1 rounded-full`}>
                    <span className="text-xs font-bold text-white">{product.badge}</span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{product.flag}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full text-white font-bold text-sm hover:shadow-lg transition-all"
                    >
                      {product.price}€
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Barre de Navigation Inférieure */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-slate-900/95 backdrop-blur-lg">
          <div className="flex justify-around items-center py-4 px-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center space-y-1 text-white"
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Accueil</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center space-y-1 text-gray-400"
            >
              <Instagram className="w-6 h-6" />
              <span className="text-xs font-medium">Instagram</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center space-y-1 text-gray-400"
            >
              <Send className="w-6 h-6" />
              <span className="text-xs font-medium">Telegram</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCart(true)}
              className="relative flex flex-col items-center space-y-1 text-white"
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">Panier ({getTotalItems()})</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowCart(false)}
            />
            
            {/* Cart Panel - Style VERSHASH */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-2xl z-50"
            >
              {/* Cart Header */}
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Mon Panier</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Votre panier est vide</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item._id}
                        layout
                        className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4"
                      >
                        <div className="flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{item.name}</h4>
                            <p className="text-sm text-gray-400 flex items-center">
                              {item.type === 'weed' ? '🌿' : '🔥'} {item.category}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item._id, -1)}
                                  className="w-7 h-7 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors text-white"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-semibold w-8 text-center text-white">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item._id, 1)}
                                  className="w-7 h-7 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors text-white"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-white">{item.price * item.quantity}€</span>
                                <button
                                  onClick={() => removeFromCart(item._id)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-slate-700 p-6">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Total ({getTotalItems()} articles)</span>
                    <span className="text-2xl font-bold text-white">{getTotalPrice()}€</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Procéder au paiement
                  </motion.button>
                  <p className="text-center text-sm text-gray-400 mt-3">
                    Livraison discrète garantie
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}