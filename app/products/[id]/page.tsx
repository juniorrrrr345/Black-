'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Send, Home, Instagram, MessageCircle } from 'lucide-react';
import { products } from '@/lib/products';
import { Product, ProductPricing } from '@/lib/store';
import { useStore } from '@/lib/store';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<ProductPricing | null>(null);
  const { addToCart, getTotalItems } = useStore();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === params.id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Set default pricing to first option if available
      if (foundProduct.pricing && foundProduct.pricing.length > 0) {
        setSelectedPricing(foundProduct.pricing[0]);
      }
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 flex items-center justify-center">
        <div className="text-white text-xl font-bold border-2 border-white rounded-lg px-6 py-4">
          Produit non trouvé
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedPricing) {
      const productWithPricing = {
        ...product,
        price: selectedPricing.price,
        name: `${product.name} (${selectedPricing.weight})`
      };
      addToCart(productWithPricing);
    } else {
      addToCart(product);
    }
  };

  const handleTelegramOrder = () => {
    const productName = selectedPricing 
      ? `${product.name} (${selectedPricing.weight})` 
      : product.name;
    const price = selectedPricing ? selectedPricing.price : product.price;
    const message = `Bonjour, je souhaite commander: ${productName} - ${price}€`;
    const telegramUrl = `https://t.me/VershashBot?start=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const cartItemCount = getTotalItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300 rounded-full blur-2xl"></div>
      </div>

      {/* Header */}
      <div className="relative pt-12 pb-8 text-center">
        <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-wider drop-shadow-2xl">
          VERSHASH
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-32">
        <div className="max-w-md mx-auto">
          
          {/* Product Image */}
          <div className="relative mb-8">
            <div className="bg-gradient-to-br from-blue-400 via-teal-300 to-blue-500 rounded-3xl p-1 shadow-2xl">
              <div className="bg-gradient-to-br from-blue-200 to-blue-100 rounded-3xl h-80 flex items-center justify-center relative overflow-hidden">
                {/* Decorative cannabis image overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-100/20 to-green-200/30"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="text-8xl opacity-60 filter drop-shadow-lg">🌿</div>
                </div>
                
                {/* Product tag */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-full text-sm font-black flex items-center gap-2 shadow-lg border-2 border-white">
                  <span>{product.tag}</span>
                  <span className="text-lg">🌲</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-2 tracking-wide drop-shadow-lg">
              {product.name} {product.countryFlag}
            </h2>
          </div>

          {/* Small flag indicator */}
          <div className="flex justify-center mb-8">
            <div className="text-2xl">{product.countryFlag}</div>
          </div>

          {/* Pricing Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-black text-center mb-6 text-white drop-shadow-lg">
              Poids
            </h3>
            
            {!selectedPricing && (
              <div className="text-center mb-6">
                <p className="text-red-400 font-bold text-lg">Veuillez sélectionner un poids</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {product.pricing?.map((pricing, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedPricing(pricing)}
                  className={`border-2 rounded-2xl p-6 text-center transition-all font-black backdrop-blur-sm ${
                    selectedPricing?.weight === pricing.weight
                      ? 'border-pink-400 bg-pink-500/20 text-white shadow-lg shadow-pink-500/25'
                      : 'border-white/50 text-white hover:border-pink-400 hover:bg-pink-500/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-xl font-black mb-2">{pricing.weight}</div>
                  <div className="text-2xl font-black">{pricing.price}€</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Commander Button */}
            <motion.button
              onClick={handleTelegramOrder}
              disabled={!selectedPricing}
              className={`w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-2xl ${
                !selectedPricing
                  ? 'bg-gray-600/50 border-2 border-gray-500 text-gray-300 cursor-not-allowed backdrop-blur-sm'
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 border-2 border-white text-white hover:from-blue-500 hover:to-blue-400 shadow-blue-500/25'
              }`}
              whileHover={!selectedPricing ? {} : { scale: 1.02 }}
              whileTap={!selectedPricing ? {} : { scale: 0.98 }}
            >
              <Send size={24} />
              COMMANDER
            </motion.button>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!selectedPricing}
              className={`w-full py-6 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-2xl ${
                !selectedPricing
                  ? 'bg-gray-600/50 border-2 border-gray-500 text-gray-300 cursor-not-allowed backdrop-blur-sm'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-white text-white hover:from-purple-500 hover:to-pink-500 shadow-purple-500/25'
              }`}
              whileHover={!selectedPricing ? {} : { scale: 1.02 }}
              whileTap={!selectedPricing ? {} : { scale: 0.98 }}
            >
              <ShoppingCart size={24} />
              AJOUTER AU PANIER
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900/95 via-blue-900/95 to-purple-800/95 backdrop-blur-lg border-t border-white/20">
        <div className="max-w-lg mx-auto flex justify-around py-4">
          <motion.button
            onClick={() => router.push('/')}
            className="flex flex-col items-center gap-1 text-white hover:text-pink-300 transition-all rounded-xl p-3 font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Home size={24} />
            <span className="text-xs">Accueil</span>
          </motion.button>

          <motion.button
            onClick={() => window.open('https://instagram.com/vershash', '_blank')}
            className="flex flex-col items-center gap-1 text-white hover:text-pink-300 transition-all rounded-xl p-3 font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Instagram size={24} />
            <span className="text-xs">Instagram</span>
          </motion.button>

          <motion.button
            onClick={() => window.open('https://t.me/VershashBot', '_blank')}
            className="flex flex-col items-center gap-1 text-white hover:text-pink-300 transition-all rounded-xl p-3 font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={24} />
            <span className="text-xs">Telegram</span>
          </motion.button>

          <motion.button
            onClick={() => router.push('/cart')}
            className="flex flex-col items-center gap-1 text-white hover:text-pink-300 transition-all rounded-xl p-3 font-bold relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-black border-2 border-white">
                  {cartItemCount}
                </div>
              )}
            </div>
            <span className="text-xs">Panier ({cartItemCount})</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}