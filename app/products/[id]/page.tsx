'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ShoppingCart, Package, 
  Video, Image as ImageIcon, Tag, Info, ChevronLeft, ChevronRight, Play,
  X, Plus, Minus, Trash2, Send, ShoppingBag
} from 'lucide-react';
import { Product, ProductPricing } from '@/lib/store';
import { useStore } from '@/lib/store';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<ProductPricing | null>(null);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true); // Afficher la vidéo par défaut si elle existe
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const { 
    cart,
    addToCart, 
    removeFromCart,
    updateQuantity,
    getTotalItems, 
    getTotalPrice,
    themeSettings, 
    loadThemeSettings 
  } = useStore();

  useEffect(() => {
    loadThemeSettings();
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const productId = String(params.id);
      
      // Essayer l'API en premier
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const apiProduct = await response.json();
          setProduct(apiProduct);
          if (apiProduct.pricing && apiProduct.pricing.length > 0) {
            setSelectedPricing(apiProduct.pricing[0]);
          }
          return;
        }
      } catch (apiError) {
        // Silently fallback to static products
      }
      
      // Fallback: charger directement depuis les produits statiques
      const { products } = await import('@/lib/products');
      const foundProduct = products.find(p => String(p.id) === productId);
      
      if (foundProduct) {
        setProduct({ ...foundProduct, _id: foundProduct.id });
        if (foundProduct.pricing && foundProduct.pricing.length > 0) {
          setSelectedPricing(foundProduct.pricing[0]);
        }
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
          <Package size={80} className="text-gray-600 mx-auto mb-4" />
          <p className="text-white text-2xl font-bold mb-4">Produit non trouvé</p>
          <button
            onClick={() => router.push('/')}
            className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (pricing?: ProductPricing) => {
    if (pricing) {
      const productWithPricing = {
        ...product,
        price: pricing.price,
        name: `${product.name} (${pricing.weight})`
      };
      addToCart(productWithPricing);
    } else if (selectedPricing) {
      const productWithPricing = {
        ...product,
        price: selectedPricing.price,
        name: `${product.name} (${selectedPricing.weight})`
      };
      addToCart(productWithPricing);
    } else {
      addToCart(product);
    }
    
    // Notification visuelle
    const button = event?.target as HTMLElement;
    if (button) {
      button.classList.add('scale-125');
      setTimeout(() => button.classList.remove('scale-125'), 200);
    }
  };

  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentImage = allImages[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div 
      className="min-h-screen text-white"
      style={getBackgroundStyle()}
    >
      {/* Overlay */}
      {themeSettings.backgroundType === 'image' && themeSettings.backgroundImage && (
        <div className="fixed inset-0 bg-black/70 z-0"></div>
      )}

      <div className="relative z-10">
        {/* Header simplifié */}
        <header className="bg-black/50 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors group"
              >
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold hidden sm:inline">Retour</span>
              </button>

              <h1 className="text-xl md:text-2xl font-bold text-white text-center flex-1 mx-4">
                {themeSettings.shopName || 'Ma Boutique'}
              </h1>

              <motion.button
                onClick={() => setShowCart(true)}
                className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={30} className="drop-shadow-lg" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-base rounded-full min-w-[28px] h-7 px-2 flex items-center justify-center font-bold shadow-xl animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </header>

        {/* Contenu principal - Layout responsive */}
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            
            {/* Section Gauche - Images/Vidéo */}
            <div className="space-y-4">
              {/* Image/Vidéo principale */}
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-square">
                <AnimatePresence mode="wait">
                  {showVideo && product.video ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full"
                    >
                      {product.video.includes('youtube') || product.video.includes('youtu.be') ? (
                        <iframe
                          src={`${product.video.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}?autoplay=1&mute=1&controls=1&rel=0`}
                          className="w-full h-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          title={`Vidéo de ${product.name}`}
                        />
                      ) : (
                        <video
                          src={product.video}
                          controls
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                        />
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`image-${currentImageIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-full"
                    >
                      {currentImage ? (
                        <img 
                          src={currentImage} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                          <Package size={100} className="text-gray-600" />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation images */}
                {!showVideo && allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.tag && (
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-bold text-white shadow-lg ${
                      product.tagColor === 'red' ? 'bg-red-500' : 
                      product.tagColor === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {product.tag}
                    </span>
                  )}
                  {product.countryFlag && (
                    <span className="px-3 py-1.5 rounded-lg text-sm font-bold bg-white/90 shadow-lg">
                      {product.countryFlag}
                    </span>
                  )}
                </div>

                {/* Switch Image/Vidéo - Seulement si on a les deux */}
                {product.video && allImages.length > 0 && (
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="absolute bottom-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur text-black hover:bg-white transition-all group shadow-lg"
                    title={showVideo ? "Voir les photos" : "Voir la vidéo"}
                  >
                    {showVideo ? 
                      <ImageIcon size={24} className="group-hover:scale-110 transition-transform" /> : 
                      <Video size={24} className="group-hover:scale-110 transition-transform" />
                    }
                  </button>
                )}

                {/* Indicateur d'images */}
                {!showVideo && allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {allImages.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Galerie miniatures avec vidéo - Desktop uniquement */}
              {(product.video || allImages.length > 1) && (
                <div className="hidden lg:flex gap-2 overflow-x-auto pb-2">
                  {/* Miniature vidéo si elle existe */}
                  {product.video && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all relative group ${
                        showVideo ? 'border-white ring-2 ring-white' : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                        <Video size={32} className="text-white" />
                      </div>
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Play size={24} className="text-white" />
                      </div>
                    </button>
                  )}
                  {/* Miniatures des images */}
                  {allImages.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentImageIndex(idx);
                        setShowVideo(false);
                      }}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        !showVideo && idx === currentImageIndex ? 'border-white ring-2 ring-white' : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Section Droite - Informations */}
            <div className="space-y-6">
              {/* En-tête produit */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  {product.category && (
                    <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm">
                      {product.category}
                    </span>
                  )}
                  {product.origin && (
                    <span className="text-gray-400 text-sm">{product.origin}</span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {product.name}
                </h1>

                {/* Description */}
                {product.description && (
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Section Prix et Options */}
              <div className="bg-gray-900/50 backdrop-blur rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <Tag size={20} />
                  Prix et Options
                </h3>

                {product.pricing && product.pricing.length > 0 ? (
                  <div className="space-y-3">
                    {product.pricing.map((pricing: ProductPricing) => (
                      <motion.div
                        key={pricing.weight}
                        className="flex items-center justify-between p-4 rounded-xl bg-black/50 border border-gray-700 hover:border-white/50 transition-all group"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-6">
                          <span className="text-xl font-semibold text-white">
                            {pricing.weight}
                          </span>
                          <span className="text-2xl font-bold text-green-400">
                            {pricing.price}€
                          </span>
                        </div>
                        <motion.button
                          onClick={() => handleAddToCart(pricing)}
                          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg font-bold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ShoppingCart size={24} />
                          <span className="hidden sm:inline">AJOUTER</span>
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    className="flex items-center justify-between p-5 rounded-xl bg-black/50 border border-gray-700"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-3xl font-bold text-green-400">
                      {product.price}€
                    </span>
                    <motion.button
                      onClick={() => handleAddToCart()}
                      className="flex items-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg font-bold text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShoppingCart size={26} />
                      <span>AJOUTER AU PANIER</span>
                    </motion.button>
                  </motion.div>
                )}
              </div>

              {/* Informations supplémentaires */}
              {(product.stock || product.featured) && (
                <div className="flex flex-wrap gap-4">
                  {product.stock && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Package size={18} />
                      <span>Stock: {product.stock} disponibles</span>
                    </div>
                  )}
                  {product.featured && (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <span>⭐ Produit vedette</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart Modal - Même que sur la page d'accueil */}
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
                      <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-white font-bold text-xl md:text-2xl mb-2">Votre panier est vide</p>
                      <p className="text-gray-400 text-sm">Ajoutez des produits pour commencer</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <p className="text-gray-400 text-sm">
                          ({getTotalItems()} {getTotalItems() > 1 ? 'articles' : 'article'})
                        </p>
                      </div>
                      
                      {cart.map((item) => (
                        <motion.div 
                          key={item.id} 
                          className="bg-gradient-to-r from-white/10 to-white/5 p-4 rounded-xl border border-white/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                        >
                          <div className="flex items-start gap-4">
                            {/* Product Image */}
                            <div className="relative">
                              {item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                                  <Package size={32} className="text-white" />
                                </div>
                              )}
                            </div>
                            
                            {/* Product Info */}
                            <div className="flex-1">
                              <h4 className="font-black text-white text-base md:text-lg mb-1">{item.name}</h4>
                              {item.origin && (
                                <p className="text-gray-400 text-xs md:text-sm mb-2">{item.origin}</p>
                              )}
                              
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <motion.button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Minus size={18} />
                                </motion.button>
                                
                                <span className="text-white font-bold text-lg min-w-[30px] text-center">
                                  {item.quantity}
                                </span>
                                
                                <motion.button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Plus size={18} />
                                </motion.button>
                              </div>
                            </div>
                            
                            {/* Price & Delete */}
                            <div className="flex flex-col items-end gap-2">
                              <p className="text-white font-black text-lg md:text-xl">
                                {(item.price * item.quantity).toFixed(2)}€
                              </p>
                              <motion.button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-400 hover:text-red-500 text-xs flex items-center gap-1 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Trash2 size={14} />
                                Supprimer
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart Footer */}
                {cart.length > 0 && (
                  <div className="bg-gradient-to-b from-transparent to-black/50 border-t-2 border-white p-4 md:p-6">
                    {/* Summary */}
                    <div className="bg-white/10 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Sous-total</span>
                        <span className="text-white font-semibold">{getTotalPrice()}€</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Livraison</span>
                        <span className="text-green-400 font-semibold">GRATUITE</span>
                      </div>
                      <div className="border-t border-white/20 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xl md:text-2xl font-black text-white">TOTAL</span>
                          <span className="text-2xl md:text-3xl font-black text-green-400">{getTotalPrice()}€</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center text-gray-400 text-xs mb-4">
                      {getTotalItems()} {getTotalItems() > 1 ? 'articles' : 'article'} dans votre panier
                    </div>
                    
                    <motion.button
                      onClick={() => {
                        const message = cart.map(item => `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}€`).join('\n');
                        const total = getTotalPrice();
                        const fullMessage = `🛒 Commande VERSHASH\n\n${message}\n\n💰 TOTAL: ${total}€`;
                        window.open(`https://t.me/VershashBot?text=${encodeURIComponent(fullMessage)}`, '_blank');
                      }}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-black text-lg md:text-xl hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-3 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={24} />
                      COMMANDER MAINTENANT
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