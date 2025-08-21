'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, Star, TrendingUp, Clock, Shield, ChevronRight, Plus, Minus, X } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Settings {
  shopName: string;
  bannerImage: string;
  bannerText: string;
}

interface ShopPageProps {
  settings: Settings;
  categories: Category[];
  products: Product[];
}

export default function ShopPage({ settings, categories, products }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, cartQuantity: quantity }]);
    }
    
    // Animation feedback
    setShowCart(true);
    setTimeout(() => setShowCart(false), 3000);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.cartQuantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Premium Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-40 backdrop-blur-xl bg-black/40 border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                {settings.shopName}
              </h1>
            </motion.div>
            
            {/* Premium Features */}
            <div className="hidden md:flex items-center space-x-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Livraison 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Premium</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Banner Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-black/50 to-black/80">
          {settings.bannerImage && (
            <img 
              src={settings.bannerImage} 
              alt={settings.bannerText}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-full px-6 py-2 mb-6">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Nouveauté</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                {settings.bannerText}
              </span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Découvrez notre sélection premium de produits d'exception
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-white shadow-2xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300"
            >
              Explorer la collection
              <ChevronRight className="inline ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Animated decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>
      </section>

      {/* Categories Section */}
      <section className="relative z-30 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 mr-4 rounded-full"></span>
            Catégories
          </h3>
          
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('all')}
              className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/5 backdrop-blur-xl text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              ✨ Tout voir
            </motion.button>
            
            {categories.map((category) => (
              <motion.button
                key={category._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.slug
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-white/5 backdrop-blur-xl text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="relative z-30 container mx-auto px-4 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 mr-4 rounded-full"></span>
            Produits Premium
            <span className="ml-4 px-3 py-1 bg-purple-600/20 text-purple-400 text-sm rounded-full">
              {filteredProducts.length} disponibles
            </span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedProduct(product)}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                      <img
                        src={product.image || 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      
                      {/* Stock Badge */}
                      {product.quantity > 0 ? (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 backdrop-blur-xl border border-green-500/30 rounded-full">
                          <span className="text-green-400 text-xs font-semibold">En stock</span>
                        </div>
                      ) : (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-full">
                          <span className="text-red-400 text-xs font-semibold">Rupture</span>
                        </div>
                      )}
                      
                      {/* Quick Add Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (product.quantity > 0) {
                            addToCart(product, 1);
                          }
                        }}
                        className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Plus className="w-6 h-6 text-white" />
                      </motion.button>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-5">
                      <h4 className="font-bold text-white text-lg mb-2 line-clamp-1">
                        {product.name}
                      </h4>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-xs">Prix</p>
                          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            {product.price}€
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>

      {/* Floating Cart Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowCart(!showCart)}
          className="relative w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl shadow-purple-600/50 flex items-center justify-center"
        >
          <ShoppingBag className="w-7 h-7 text-white" />
          {getTotalItems() > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
            >
              {getTotalItems()}
            </motion.span>
          )}
        </motion.button>
      </motion.div>

      {/* Mini Cart */}
      <AnimatePresence>
        {showCart && cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-32 right-8 z-40 w-80 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 p-4"
          >
            <h4 className="text-white font-bold mb-3">Panier ({getTotalItems()} articles)</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-purple-400">{item.cartQuantity}x {item.price}€</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 mt-3 pt-3">
              <div className="flex justify-between font-bold">
                <span className="text-white">Total</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {getTotalPrice()}€
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

// Product Modal Component
function ProductModal({ product, onClose, onAddToCart }: any) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    product.image || 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800',
    'https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?w=800',
    'https://images.unsplash.com/photo-1587049352846-4a222e784efd?w=800'
  ];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image Gallery */}
          <div className="relative h-[500px] md:h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image Thumbnails */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === index ? 'border-purple-500 scale-110' : 'border-white/20'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="p-8 md:p-12">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-xs font-semibold rounded-full">
                  PREMIUM
                </span>
                <span className="px-3 py-1 bg-green-600/20 text-green-400 text-xs font-semibold rounded-full">
                  EN STOCK
                </span>
              </div>
              
              <h2 className="text-4xl font-black text-white mb-4">{product.name}</h2>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-400">(4.9/5 - 127 avis)</span>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {product.description || 'Produit premium de qualité exceptionnelle. Notre sélection exclusive garantit une expérience unique et inoubliable. Chaque produit est soigneusement sélectionné pour répondre aux plus hautes exigences.'}
              </p>
            </div>

            {/* Price Section */}
            <div className="mb-8">
              <p className="text-gray-500 text-sm mb-2">Prix unitaire</p>
              <div className="flex items-baseline space-x-4">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {product.price}€
                </span>
                <span className="text-gray-500 line-through text-xl">{(product.price * 1.3).toFixed(2)}€</span>
                <span className="px-2 py-1 bg-red-600/20 text-red-400 text-sm rounded-full">-30%</span>
              </div>
            </div>

            {/* Quantity Selector */}
            {product.quantity > 0 && (
              <>
                <div className="mb-8">
                  <p className="text-gray-500 text-sm mb-3">Quantité</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-white/5 rounded-2xl border border-white/10">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-white/10 rounded-l-2xl transition-colors"
                      >
                        <Minus className="w-5 h-5 text-white" />
                      </button>
                      <span className="px-6 text-xl font-bold text-white">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                        className="p-3 hover:bg-white/10 rounded-r-2xl transition-colors"
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <span className="text-gray-500">
                      Stock: {product.quantity} disponibles
                    </span>
                  </div>
                </div>

                {/* Total & Add to Cart */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                    <span className="text-gray-400">Total</span>
                    <span className="text-3xl font-black text-white">
                      {(product.price * quantity).toFixed(2)}€
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-white text-lg shadow-2xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <ShoppingBag className="w-6 h-6" />
                    <span>Ajouter au panier</span>
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}