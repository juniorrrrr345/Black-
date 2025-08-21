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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Produit non trouvé</div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedPricing) {
      // Create a modified product with selected pricing
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="relative pt-8 pb-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            VERSHASH
          </h1>
        </div>

        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="absolute top-8 left-4 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-700/50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Retour</span>
        </motion.button>
      </div>

      {/* Product Content */}
      <div className="max-w-md mx-auto px-4 pb-24">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-3xl overflow-hidden">
          
          {/* Product Image */}
          <div className="relative h-80 bg-gradient-to-br from-purple-800/30 to-blue-800/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
            
            {/* Product Image */}
            <div className="w-full h-full flex items-center justify-center relative">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><radialGradient id="bg" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%23059669;stop-opacity:0.8" /><stop offset="100%" style="stop-color:%23064e3b;stop-opacity:1" /></radialGradient></defs><rect width="400" height="400" fill="url(%23bg)"/><g transform="translate(200,200)"><g transform="scale(3)"><path d="M0,-20 Q-5,-15 -8,-10 Q-10,-5 -8,0 Q-5,5 0,0 Q5,5 8,0 Q10,-5 8,-10 Q5,-15 0,-20 Z" fill="%2310b981" opacity="0.9"/><path d="M-15,-10 Q-20,-5 -18,0 Q-15,5 -10,0 Q-5,5 0,0 Q5,5 10,0 Q15,5 18,0 Q20,-5 15,-10" fill="%2334d399" opacity="0.8"/><path d="M0,0 L0,15" stroke="%23059669" stroke-width="2" stroke-linecap="round"/><circle cx="0" cy="-12" r="2" fill="%23fbbf24" opacity="0.9"/></g></g></svg>')`
                }}
              />
              
              {/* Overlay effect to match the original design */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
            </div>

            {/* Tag */}
            <div className="absolute top-4 right-4 bg-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <span>{product.tag}</span>
              <span className="text-lg">🌿</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-6">
            {/* Product Name and Flag */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <span className="text-3xl">{product.countryFlag}</span>
            </div>

            {/* Pricing Options */}
            {product.pricing && product.pricing.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">Poids</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.pricing.map((pricing, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedPricing(pricing)}
                      className={`border-2 rounded-xl p-4 text-center transition-all ${
                        selectedPricing?.weight === pricing.weight
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-purple-500/30 hover:border-purple-500/60'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-xl font-bold">{pricing.weight}</div>
                      <div className="text-2xl font-bold text-purple-400">{pricing.price}€</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Selection Warning */}
            {!selectedPricing && !!product.pricing && (
              <div className="text-center text-red-400 text-sm">
                Veuillez sélectionner un poids
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Telegram Order Button */}
              <motion.button
                onClick={handleTelegramOrder}
                disabled={!selectedPricing && !!product.pricing}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  !selectedPricing && !!product.pricing
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                whileHover={!selectedPricing && !!product.pricing ? {} : { scale: 1.02 }}
                whileTap={!selectedPricing && !!product.pricing ? {} : { scale: 0.98 }}
              >
                <Send size={24} />
                COMMANDER
              </motion.button>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                disabled={!selectedPricing && !!product.pricing}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  !selectedPricing && !!product.pricing
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                }`}
                whileHover={!selectedPricing && !!product.pricing ? {} : { scale: 1.02 }}
                whileTap={!selectedPricing && !!product.pricing ? {} : { scale: 0.98 }}
              >
                AJOUTER AU PANIER
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-purple-500/20">
        <div className="max-w-md mx-auto flex justify-around py-4">
          <motion.button
            onClick={() => router.push('/')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Home size={24} />
            <span className="text-xs">Accueil</span>
          </motion.button>

          <motion.button
            onClick={() => window.open('https://instagram.com/vershash', '_blank')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Instagram size={24} />
            <span className="text-xs">Instagram</span>
          </motion.button>

          <motion.button
            onClick={() => window.open('https://t.me/VershashBot', '_blank')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={24} />
            <span className="text-xs">Telegram</span>
          </motion.button>

          <motion.button
            onClick={() => router.push('/cart')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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