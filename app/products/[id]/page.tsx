'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Send, Home, Instagram, MessageCircle, Plus, Minus } from 'lucide-react';
import { Product, ProductPricing } from '@/lib/store';
import { useStore } from '@/lib/store';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<ProductPricing | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart, getTotalItems, themeSettings, loadThemeSettings } = useStore();

  useEffect(() => {
    loadThemeSettings();
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      
      // Essayer de charger depuis l'API d'abord
      const response = await fetch(`/api/products/${params.id}`);
      if (response.ok) {
        const apiProduct = await response.json();
        setProduct(apiProduct);
        if (apiProduct.pricing && apiProduct.pricing.length > 0) {
          setSelectedPricing(apiProduct.pricing[0]);
        }
      } else {
        // Fallback vers les produits statiques
        const { products } = await import('@/lib/products');
        const foundProduct = products.find(p => p.id === params.id);
        if (foundProduct) {
          setProduct({ ...foundProduct, _id: foundProduct.id });
          if (foundProduct.pricing && foundProduct.pricing.length > 0) {
            setSelectedPricing(foundProduct.pricing[0]);
          }
        }
      }
    } catch (error) {
      console.error('Error loading product:', error);
      // Fallback vers les produits statiques
      const { products } = await import('@/lib/products');
      const foundProduct = products.find(p => p.id === params.id);
      if (foundProduct) {
        setProduct({ ...foundProduct, _id: foundProduct.id });
        if (foundProduct.pricing && foundProduct.pricing.length > 0) {
          setSelectedPricing(foundProduct.pricing[0]);
        }
      }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl font-bold">Chargement...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={getBackgroundStyle()}
      >
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
        <div className="relative pt-6 pb-4 md:pt-8 md:pb-6 lg:pt-12 lg:pb-8 border-b-2 border-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-wider">
                {themeSettings.shopName || 'VERSHASH'}
              </h1>
            </div>

            {/* Back Button - Responsive */}
            <motion.button
              onClick={() => router.back()}
              className="absolute top-6 left-4 md:top-8 md:left-6 lg:top-12 lg:left-8 bg-white text-black border-2 border-white rounded-lg px-3 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 flex items-center gap-2 hover:bg-black hover:text-white transition-all font-bold text-sm md:text-base lg:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <span className="font-bold">RETOUR</span>
            </motion.button>
          </div>
        </div>

        {/* Product Content - Responsive */}
        <div className="max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <div className="bg-black border-4 border-white rounded-2xl overflow-hidden">
            
            {/* Product Image - Responsive */}
            <div className="relative h-64 md:h-80 lg:h-96 xl:h-[28rem] bg-white border-b-4 border-white overflow-hidden">
              <div className="w-full h-full flex items-center justify-center relative bg-gradient-to-br from-gray-100 to-gray-300">
                {product.image && product.image.startsWith('http') ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-cover bg-center opacity-80"
                    style={{
                      backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f3f4f6"/><g transform="translate(200,200)"><g transform="scale(4)"><path d="M0,-20 Q-5,-15 -8,-10 Q-10,-5 -8,0 Q-5,5 0,0 Q5,5 8,0 Q10,-5 8,-10 Q5,-15 0,-20 Z" fill="%23374151" opacity="0.9"/><path d="M-15,-10 Q-20,-5 -18,0 Q-15,5 -10,0 Q-5,5 0,0 Q5,5 10,0 Q15,5 18,0 Q20,-5 15,-10" fill="%23111827" opacity="0.8"/><path d="M0,0 L0,15" stroke="%23374151" stroke-width="3" stroke-linecap="round"/><circle cx="0" cy="-12" r="3" fill="%23000000" opacity="0.9"/></g></g></svg>')`
                    }}
                  />
                )}
              </div>

              {/* Tag - Responsive */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 lg:top-6 lg:right-6 bg-black text-white px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 border-2 border-white rounded-lg text-xs md:text-sm lg:text-base font-black flex items-center gap-2">
                <span>{product.tag}</span>
                <span className="text-sm md:text-base lg:text-lg">{product.countryFlag}</span>
              </div>
            </div>

            {/* Product Info - Responsive */}
            <div className="p-4 md:p-6 lg:p-8 xl:p-12 space-y-6 md:space-y-8 lg:space-y-12">
              {/* Product Name */}
              <div className="text-center border-b-2 border-white pb-4 md:pb-6 lg:pb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-wider mb-2 md:mb-4">{product.name}</h2>
                <p className="text-white/80 text-base md:text-lg lg:text-xl font-bold">{product.origin}</p>
              </div>

              {/* Pricing Options - Responsive */}
              {product.pricing && product.pricing.length > 0 && (
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-center mb-4 md:mb-6 lg:mb-8 text-white border-2 border-white rounded-lg py-2 md:py-3 lg:py-4">
                    POIDS
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                    {product.pricing.map((pricing: any, index: number) => (
                      <motion.button
                        key={index}
                        onClick={() => setSelectedPricing(pricing)}
                        className={`border-4 rounded-2xl p-4 md:p-6 lg:p-8 text-center transition-all font-black ${
                          selectedPricing?.weight === pricing.weight
                            ? 'border-white bg-white text-black'
                            : 'border-white text-white hover:bg-white hover:text-black'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-xl md:text-2xl lg:text-3xl font-black mb-2">{pricing.weight}</div>
                        <div className="text-2xl md:text-3xl lg:text-4xl font-black">{pricing.price}€</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector - Responsive */}
              <div className="border-4 border-white rounded-2xl p-4 md:p-6 lg:p-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-center mb-4 md:mb-6 lg:mb-8 text-white">QUANTITÉ</h3>
                <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
                  <motion.button
                    onClick={decreaseQuantity}
                    className="bg-white text-black border-4 border-white rounded-full w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center font-black text-xl md:text-2xl lg:text-3xl hover:bg-black hover:text-white transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus size={20} className="md:w-6 md:h-6 lg:w-8 lg:h-8" />
                  </motion.button>
                  
                  <div className="bg-white text-black border-4 border-white rounded-2xl px-6 py-3 md:px-8 md:py-4 lg:px-12 lg:py-6 min-w-[80px] md:min-w-[100px] lg:min-w-[120px] text-center">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-black">{quantity}</span>
                  </div>
                  
                  <motion.button
                    onClick={increaseQuantity}
                    className="bg-white text-black border-4 border-white rounded-full w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center font-black text-xl md:text-2xl lg:text-3xl hover:bg-black hover:text-white transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus size={20} className="md:w-6 md:h-6 lg:w-8 lg:h-8" />
                  </motion.button>
                </div>
              </div>

              {/* Total Price Display - Responsive */}
              {selectedPricing && (
                <div className="text-center border-4 border-white rounded-2xl p-4 md:p-6 lg:p-8 bg-white text-black">
                  <div className="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-4">TOTAL</div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-black">
                    {(selectedPricing.price * quantity).toLocaleString()}€
                  </div>
                </div>
              )}

              {/* Selection Warning */}
              {!selectedPricing && !!product.pricing && (
                <div className="text-center text-white border-4 border-white rounded-2xl p-3 md:p-4 lg:p-6 bg-red-600">
                  <div className="text-base md:text-lg lg:text-xl font-black">⚠️ VEUILLEZ SÉLECTIONNER UN POIDS</div>
                </div>
              )}

              {/* Action Buttons - Responsive */}
              <div className="space-y-3 md:space-y-4 lg:space-y-6">
                {/* Telegram Order Button */}
                <motion.button
                  onClick={handleTelegramOrder}
                  disabled={!selectedPricing && !!product.pricing}
                  className={`w-full py-4 md:py-6 lg:py-8 rounded-2xl font-black text-lg md:text-xl lg:text-2xl flex items-center justify-center gap-2 md:gap-3 lg:gap-4 border-4 transition-all ${
                    !selectedPricing && !!product.pricing
                      ? 'bg-gray-500 border-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-black border-white text-white hover:bg-white hover:text-black'
                  }`}
                  whileHover={!selectedPricing && !!product.pricing ? {} : { scale: 1.02 }}
                  whileTap={!selectedPricing && !!product.pricing ? {} : { scale: 0.98 }}
                >
                  <Send size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
                  COMMANDER
                </motion.button>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!selectedPricing && !!product.pricing}
                  className={`w-full py-4 md:py-6 lg:py-8 rounded-2xl font-black text-lg md:text-xl lg:text-2xl border-4 transition-all flex items-center justify-center gap-2 md:gap-3 lg:gap-4 ${
                    !selectedPricing && !!product.pricing
                      ? 'bg-gray-500 border-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-white border-white text-black hover:bg-black hover:text-white'
                  }`}
                  whileHover={!selectedPricing && !!product.pricing ? {} : { scale: 1.02 }}
                  whileTap={!selectedPricing && !!product.pricing ? {} : { scale: 0.98 }}
                >
                  <ShoppingCart size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
                  AJOUTER AU PANIER ({quantity})
                </motion.button>
              </div>
            </div>
          </div>
        </div>

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
                <ShoppingCart size={20} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 flex items-center justify-center font-black border-2 border-black">
                    {cartItemCount}
                  </div>
                )}
              </div>
              <span className="text-xs md:text-sm">PANIER ({cartItemCount})</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}