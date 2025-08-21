'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Send, Home, Instagram, MessageCircle, Plus, Minus } from 'lucide-react';
import { products } from '@/lib/products';
import { Product, ProductPricing } from '@/lib/store';
import { useStore } from '@/lib/store';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<ProductPricing | null>(null);
  const [quantity, setQuantity] = useState(1);
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl font-bold border-2 border-white rounded-lg px-6 py-4">
          Produit non trouvé
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedPricing) {
      // Add multiple items based on quantity
      for (let i = 0; i < quantity; i++) {
        const productWithPricing = {
          ...product,
          price: selectedPricing.price,
          name: `${product.name} (${selectedPricing.weight})`
        };
        addToCart(productWithPricing);
      }
    } else {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative pt-8 pb-6 border-b-2 border-white">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-wider">
            VERSHASH
          </h1>
        </div>

        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="absolute top-8 left-4 bg-white text-black border-2 border-white rounded-lg px-6 py-3 flex items-center gap-2 hover:bg-black hover:text-white transition-all font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-bold">RETOUR</span>
        </motion.button>
      </div>

      {/* Product Content */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="bg-black border-4 border-white rounded-2xl overflow-hidden">
          
          {/* Product Image */}
          <div className="relative h-80 bg-white border-b-4 border-white overflow-hidden">
            {/* Product Image */}
            <div className="w-full h-full flex items-center justify-center relative bg-gradient-to-br from-gray-100 to-gray-300">
              <div 
                className="w-full h-full bg-cover bg-center opacity-80"
                style={{
                  backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f3f4f6"/><g transform="translate(200,200)"><g transform="scale(4)"><path d="M0,-20 Q-5,-15 -8,-10 Q-10,-5 -8,0 Q-5,5 0,0 Q5,5 8,0 Q10,-5 8,-10 Q5,-15 0,-20 Z" fill="%23374151" opacity="0.9"/><path d="M-15,-10 Q-20,-5 -18,0 Q-15,5 -10,0 Q-5,5 0,0 Q5,5 10,0 Q15,5 18,0 Q20,-5 15,-10" fill="%23111827" opacity="0.8"/><path d="M0,0 L0,15" stroke="%23374151" stroke-width="3" stroke-linecap="round"/><circle cx="0" cy="-12" r="3" fill="%23000000" opacity="0.9"/></g></g></svg>')`
                }}
              />
            </div>

            {/* Tag */}
            <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 border-2 border-white rounded-lg text-sm font-black flex items-center gap-2">
              <span>{product.tag}</span>
              <span className="text-lg">{product.countryFlag}</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-8 space-y-8">
            {/* Product Name */}
            <div className="text-center border-b-2 border-white pb-6">
              <h2 className="text-3xl font-black text-white tracking-wider">{product.name}</h2>
              <p className="text-white/80 mt-2 font-bold text-lg">{product.origin}</p>
            </div>

            {/* Pricing Options */}
            {product.pricing && product.pricing.length > 0 && (
              <div>
                <h3 className="text-2xl font-black text-center mb-6 text-white border-2 border-white rounded-lg py-3">
                  Poids
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {product.pricing.map((pricing, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedPricing(pricing)}
                      className={`border-4 rounded-2xl p-6 text-center transition-all font-black ${
                        selectedPricing?.weight === pricing.weight
                          ? 'border-white bg-white text-black'
                          : 'border-white text-white hover:bg-white hover:text-black'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-2xl font-black mb-2">{pricing.weight}</div>
                      <div className="text-3xl font-black">{pricing.price}€</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="border-4 border-white rounded-2xl p-6">
              <h3 className="text-2xl font-black text-center mb-6 text-white">QUANTITÉ</h3>
              <div className="flex items-center justify-center gap-6">
                <motion.button
                  onClick={decreaseQuantity}
                  className="bg-white text-black border-4 border-white rounded-full w-16 h-16 flex items-center justify-center font-black text-2xl hover:bg-black hover:text-white transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Minus size={24} />
                </motion.button>
                
                <div className="bg-white text-black border-4 border-white rounded-2xl px-8 py-4 min-w-[100px] text-center">
                  <span className="text-3xl font-black">{quantity}</span>
                </div>
                
                <motion.button
                  onClick={increaseQuantity}
                  className="bg-white text-black border-4 border-white rounded-full w-16 h-16 flex items-center justify-center font-black text-2xl hover:bg-black hover:text-white transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus size={24} />
                </motion.button>
              </div>
            </div>

            {/* Total Price Display */}
            {selectedPricing && (
              <div className="text-center border-4 border-white rounded-2xl p-6 bg-white text-black">
                <div className="text-xl font-black mb-2">TOTAL</div>
                <div className="text-4xl font-black">
                  {(selectedPricing.price * quantity).toLocaleString()}€
                </div>
              </div>
            )}

            {/* Selection Warning */}
            {!selectedPricing && !!product.pricing && (
              <div className="text-center text-white border-4 border-white rounded-2xl p-4 bg-red-600">
                <div className="text-lg font-black">⚠️ VEUILLEZ SÉLECTIONNER UN POIDS</div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Telegram Order Button */}
              <motion.button
                onClick={handleTelegramOrder}
                disabled={!selectedPricing && !!product.pricing}
                className={`w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 border-4 transition-all ${
                  !selectedPricing && !!product.pricing
                    ? 'bg-gray-500 border-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-black border-white text-white hover:bg-white hover:text-black'
                }`}
                whileHover={!selectedPricing && !!product.pricing ? {} : { scale: 1.02 }}
                whileTap={!selectedPricing && !!product.pricing ? {} : { scale: 0.98 }}
              >
                <Send size={28} />
                COMMANDER
              </motion.button>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                disabled={!selectedPricing && !!product.pricing}
                className={`w-full py-6 rounded-2xl font-black text-xl border-4 transition-all flex items-center justify-center gap-3 ${
                  !selectedPricing && !!product.pricing
                    ? 'bg-gray-500 border-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-white border-white text-black hover:bg-black hover:text-white'
                }`}
                whileHover={!selectedPricing && !!product.pricing ? {} : { scale: 1.02 }}
                whileTap={!selectedPricing && !!product.pricing ? {} : { scale: 0.98 }}
              >
                <ShoppingCart size={28} />
                AJOUTER AU PANIER ({quantity})
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t-4 border-white">
        <div className="max-w-lg mx-auto flex justify-around py-6">
          <motion.button
            onClick={() => router.push('/')}
            className="flex flex-col items-center gap-2 text-white hover:bg-white hover:text-black transition-all rounded-xl p-3 border-2 border-white font-black"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Home size={28} />
            <span className="text-xs">ACCUEIL</span>
          </motion.button>

          <motion.button
            onClick={() => window.open('https://instagram.com/vershash', '_blank')}
            className="flex flex-col items-center gap-2 text-white hover:bg-white hover:text-black transition-all rounded-xl p-3 border-2 border-white font-black"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Instagram size={28} />
            <span className="text-xs">INSTAGRAM</span>
          </motion.button>

          <motion.button
            onClick={() => window.open('https://t.me/VershashBot', '_blank')}
            className="flex flex-col items-center gap-2 text-white hover:bg-white hover:text-black transition-all rounded-xl p-3 border-2 border-white font-black"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={28} />
            <span className="text-xs">TELEGRAM</span>
          </motion.button>

          <motion.button
            onClick={() => router.push('/cart')}
            className="flex flex-col items-center gap-2 text-white hover:bg-white hover:text-black transition-all rounded-xl p-3 border-2 border-white font-black relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              <ShoppingCart size={28} />
              {cartItemCount > 0 && (
                <div className="absolute -top-3 -right-3 bg-white text-black text-sm rounded-full w-7 h-7 flex items-center justify-center font-black border-2 border-black">
                  {cartItemCount}
                </div>
              )}
            </div>
            <span className="text-xs">PANIER ({cartItemCount})</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}