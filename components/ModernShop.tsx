'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Home, Instagram, Send, MessageCircle, 
  Star, TrendingUp, Package, Clock, Shield, 
  Plus, Minus, X, Trash2, ChevronRight, Sparkles 
} from 'lucide-react';

// Produits d'exemple
const sampleProducts = [
  {
    _id: '1',
    name: 'Purple Haze Premium',
    category: 'Fleurs CBD',
    price: 45,
    originalPrice: 60,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400',
    rating: 4.8,
    reviews: 234,
    badge: 'Best Seller',
    description: 'Fleur premium avec un taux de CBD élevé',
    inStock: true
  },
  {
    _id: '2',
    name: 'OG Kush Elite',
    category: 'Fleurs CBD',
    price: 55,
    originalPrice: 70,
    image: 'https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?w=400',
    rating: 4.9,
    reviews: 189,
    badge: 'Nouveau',
    description: 'Variété légendaire aux arômes uniques',
    inStock: true
  },
  {
    _id: '3',
    name: 'Amnesia Gold',
    category: 'Fleurs CBD',
    price: 50,
    originalPrice: 65,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784efd?w=400',
    rating: 4.7,
    reviews: 156,
    badge: 'Premium',
    description: 'Qualité supérieure, effet relaxant',
    inStock: true
  },
  {
    _id: '4',
    name: 'Strawberry Diesel',
    category: 'Fleurs CBD',
    price: 48,
    originalPrice: 62,
    image: 'https://images.unsplash.com/photo-1536819114556-1e10f967fb61?w=400',
    rating: 4.6,
    reviews: 203,
    badge: 'Promo',
    description: 'Notes fruitées et diesel caractéristiques',
    inStock: true
  },
  {
    _id: '5',
    name: 'White Widow Supreme',
    category: 'Fleurs CBD',
    price: 60,
    originalPrice: 75,
    image: 'https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?w=400',
    rating: 5.0,
    reviews: 312,
    badge: 'Exclusif',
    description: 'La légendaire White Widow en version CBD',
    inStock: true
  },
  {
    _id: '6',
    name: 'Gelato Dream',
    category: 'Fleurs CBD',
    price: 52,
    originalPrice: 68,
    image: 'https://images.unsplash.com/photo-1503262028195-93c528f03218?w=400',
    rating: 4.8,
    reviews: 178,
    badge: 'Populaire',
    description: 'Saveurs douces et crémeuses',
    inStock: true
  }
];

export default function ModernShop() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Animation du header au scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    // Petit feedback visuel
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Moderne */}
      <motion.header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                PremiumShop
              </span>
            </motion.div>

            {/* Navigation centrale */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                Nouveautés
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                Promotions
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                Best Sellers
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCart(true)}
                className="relative p-2"
              >
                <ShoppingBag className="w-6 h-6 text-gray-700" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        <div className="relative container mx-auto px-4 py-20">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Livraison gratuite dès 50€</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Collection Premium
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Découvrez notre sélection exclusive de produits haut de gamme
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Explorer la collection
                <ChevronRight className="inline ml-2 w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-200"
              >
                Voir les promotions
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Package, title: 'Livraison Express', desc: '24-48h' },
              { icon: Shield, title: 'Paiement Sécurisé', desc: '100% protégé' },
              { icon: Star, title: 'Qualité Premium', desc: 'Produits certifiés' },
              { icon: Clock, title: 'Support 24/7', desc: 'À votre service' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
                  <feature.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Nos Produits Premium
              </span>
            </h2>
            <p className="text-gray-600">Sélection exclusive de produits d'exception</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-full">
                      {product.badge}
                    </span>
                    {/* Discount */}
                    <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {product.rating} ({product.reviews} avis)
                      </span>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-800">{product.price}€</span>
                        <span className="ml-2 text-sm text-gray-400 line-through">{product.originalPrice}€</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Accueil */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Accueil
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Nouveautés</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Promotions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
              </ul>
            </div>

            {/* Nos Réseaux */}
            <div>
              <h3 className="font-bold text-lg mb-4">Nos Réseaux</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.a>
              </div>
              <p className="text-gray-400 mt-4 text-sm">
                Suivez-nous pour les dernières nouveautés et offres exclusives
              </p>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="font-bold text-lg mb-4">Support Client</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 contact@premiumshop.com</li>
                <li>📱 +33 1 23 45 67 89</li>
                <li>🕒 Lun-Ven: 9h-18h</li>
                <li>📍 Paris, France</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PremiumShop. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

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
            
            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50"
            >
              {/* Cart Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Mon Panier</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Votre panier est vide</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item._id}
                        layout
                        className="bg-gray-50 rounded-xl p-4"
                      >
                        <div className="flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.category}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item._id, -1)}
                                  className="w-7 h-7 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item._id, 1)}
                                  className="w-7 h-7 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-gray-800">{item.price * item.quantity}€</span>
                                <button
                                  onClick={() => removeFromCart(item._id)}
                                  className="text-red-500 hover:text-red-600"
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
                <div className="border-t p-6">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Total ({getTotalItems()} articles)</span>
                    <span className="text-2xl font-bold text-gray-800">{getTotalPrice()}€</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Procéder au paiement
                  </motion.button>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Livraison gratuite dès 50€ d'achat
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