'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ShoppingCart, Send, Home, Instagram, MessageCircle, 
  Plus, Minus, Star, Package, Shield, Truck, Clock, 
  Video, Image as ImageIcon, Tag, Info
} from 'lucide-react';
import { Product, ProductPricing } from '@/lib/store';
import { useStore } from '@/lib/store';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<ProductPricing | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const { addToCart, getTotalItems, themeSettings, loadThemeSettings } = useStore();

  useEffect(() => {
    loadThemeSettings();
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const productId = String(params.id);
      
      console.log('Looking for product with ID:', productId);
      
      // Essayer l'API en premier (qui vérifie aussi les produits statiques)
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const apiProduct = await response.json();
          console.log('Product found:', apiProduct.name);
          setProduct(apiProduct);
          if (apiProduct.pricing && apiProduct.pricing.length > 0) {
            setSelectedPricing(apiProduct.pricing[0]);
          }
          return; // Produit trouvé, on arrête ici
        }
      } catch (apiError) {
        console.log('API error, trying static products:', apiError);
      }
      
      // Fallback: charger directement depuis les produits statiques
      const { products } = await import('@/lib/products');
      const foundProduct = products.find(p => String(p.id) === productId);
      
      if (foundProduct) {
        console.log('Product found in static imports:', foundProduct.name);
        setProduct({ ...foundProduct, _id: foundProduct.id });
        if (foundProduct.pricing && foundProduct.pricing.length > 0) {
          setSelectedPricing(foundProduct.pricing[0]);
        }
      } else {
        console.log('Product not found anywhere');
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundStyle = () => {
    if (themeSettings.backgroundType === 'gradient') {
      return {
        background: `linear-gradient(135deg, ${themeSettings.gradientFrom || '#000000'} 0%, ${themeSettings.gradientTo || '#1a1a1a'} 100%)`
      };
    } else if (themeSettings.backgroundType === 'image' && themeSettings.backgroundImage) {
      return {
        backgroundImage: `url(${themeSettings.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#000000'
      };
    }
    return { backgroundColor: themeSettings.backgroundColor || '#000000' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl font-bold">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl font-bold mb-4">Produit non trouvé</p>
          <button
            onClick={() => router.push('/')}
            className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedPricing) {
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
    // Animation de confirmation
    const btn = document.getElementById('add-to-cart-btn');
    if (btn) {
      btn.classList.add('animate-pulse');
      setTimeout(() => btn.classList.remove('animate-pulse'), 1000);
    }
  };

  const handleTelegramOrder = () => {
    const productName = selectedPricing 
      ? `${product.name} (${selectedPricing.weight})` 
      : product.name;
    const price = selectedPricing ? selectedPricing.price : product.price;
    const message = `Bonjour, je souhaite commander: ${productName} - Quantité: ${quantity} - Prix total: ${(price * quantity).toFixed(2)}€`;
    const telegramUrl = `https://t.me/?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const currentPrice = selectedPricing ? selectedPricing.price : product.price;
  const totalPrice = currentPrice * quantity;

  return (
    <div 
      className="min-h-screen text-white relative"
      style={getBackgroundStyle()}
    >
      {/* Overlay pour la lisibilité */}
      {themeSettings.backgroundType === 'image' && themeSettings.backgroundImage && (
        <div className="absolute inset-0 bg-black/60 z-0"></div>
      )}

      <div className="relative z-10">
        {/* Header élégant */}
        <header className="bg-black/80 backdrop-blur-xl border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <motion.button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft size={24} />
                <span className="font-semibold">Retour</span>
              </motion.button>

              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {themeSettings.shopName || 'Ma Boutique'}
              </h1>

              <motion.button
                onClick={() => router.push('/cart')}
                className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={24} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Section Média (Image/Vidéo) */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-square">
                {showVideo && product.video ? (
                  <div className="w-full h-full">
                    {product.video.includes('youtube') || product.video.includes('youtu.be') ? (
                      <iframe
                        src={product.video.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={product.video}
                        controls
                        className="w-full h-full object-cover"
                        autoPlay
                      />
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <Package size={100} className="text-gray-600" />
                      </div>
                    )}
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.tag && (
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold text-white ${
                      product.tagColor === 'red' ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                      {product.tag}
                    </span>
                  )}
                  {product.category && (
                    <span className="px-3 py-1 rounded-lg text-sm font-bold bg-blue-600 text-white">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Bouton Switch Image/Vidéo */}
                {product.video && (
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="absolute bottom-4 right-4 p-3 rounded-full bg-black/80 backdrop-blur text-white hover:bg-black transition-colors"
                  >
                    {showVideo ? <ImageIcon size={20} /> : <Video size={20} />}
                  </button>
                )}
              </div>

              {/* Galerie d'images miniatures (si disponible) */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-700 hover:border-white transition-colors"
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Section Informations */}
            <div className="space-y-6">
              {/* En-tête du produit */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.countryFlag && (
                    <span className="text-2xl">{product.countryFlag}</span>
                  )}
                  {product.origin && (
                    <span className="text-gray-400 text-sm">{product.origin}</span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {product.name}
                </h1>
                
                {product.category && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Tag size={16} />
                    <span>Catégorie: {product.category}</span>
                  </div>
                )}

                {/* Note et avis */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < 4 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">(4.8/5 - 127 avis)</span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                    <Info size={20} />
                    Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Sélection du prix/poids */}
              {product.pricing && product.pricing.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Choisir une option:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {product.pricing.map((pricing: ProductPricing) => (
                      <button
                        key={pricing.weight}
                        onClick={() => setSelectedPricing(pricing)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedPricing?.weight === pricing.weight
                            ? 'border-white bg-white text-black'
                            : 'border-gray-600 hover:border-gray-400 bg-gray-900/50'
                        }`}
                      >
                        <div className="font-semibold">{pricing.weight}</div>
                        <div className="text-lg font-bold">{pricing.price}€</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Prix et quantité */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Prix unitaire</p>
                    <p className="text-3xl font-bold text-white">{currentPrice}€</p>
                  </div>
                  
                  {/* Sélecteur de quantité */}
                  <div className="flex items-center gap-3 bg-black/50 rounded-lg p-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded hover:bg-white/10 transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded hover:bg-white/10 transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-lg text-gray-300">Total:</p>
                    <p className="text-3xl font-bold text-white">{totalPrice.toFixed(2)}€</p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="space-y-3">
                <motion.button
                  id="add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={24} />
                  Ajouter au panier
                </motion.button>

                <motion.button
                  onClick={handleTelegramOrder}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={24} />
                  Commander via Telegram
                </motion.button>
              </div>

              {/* Avantages */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Shield size={18} className="text-green-500" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Truck size={18} className="text-blue-500" />
                  <span>Livraison rapide</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock size={18} className="text-yellow-500" />
                  <span>Support 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Package size={18} className="text-purple-500" />
                  <span>Qualité garantie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}