'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart,
  Send,
  Home,
  Instagram,
  MessageCircle
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useStore();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Erreur chargement settings:', error);
    }
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    if (!settings?.orderLink) {
      alert('Lien de commande non configuré');
      return;
    }

    // Créer le message de commande
    let message = `🛒 NOUVELLE COMMANDE\\n\\n`;
    message += `📦 Articles (${getTotalItems()}):\\n`;
    message += `------------------------\\n`;
    
    cart.forEach(item => {
      message += `• ${item.name}\\n`;
      message += `  Quantité: ${item.quantity}\\n`;
      message += `  Prix: ${item.price}€\\n\\n`;
    });
    
    message += `------------------------\\n`;
    message += `💰 TOTAL: ${getTotalPrice()}€`;

    // Remplacer le placeholder dans le lien
    const orderUrl = settings.orderLink.replace('{message}', encodeURIComponent(message));
    window.open(orderUrl, '_blank');
  };

  const increaseQuantity = (productId: string) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const decreaseQuantity = (productId: string) => {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b-4 border-white p-6">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-black">PANIER</h1>
            <p className="text-gray-300">({getTotalItems()} articles)</p>
          </div>

          <button
            onClick={clearCart}
            className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-lg mx-auto p-6 pb-32">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/10 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <ShoppingCart size={64} className="text-white/50" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4">PANIER VIDE</h2>
            <p className="text-gray-400 mb-8">Ajoutez des produits pour commencer</p>
            <button
              onClick={() => router.push('/')}
              className="bg-white text-black px-8 py-4 rounded-lg font-black hover:bg-gray-200 transition-colors"
            >
              RETOUR À LA BOUTIQUE
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.name}`} className="bg-black border-4 border-white rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden border-2 border-black flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-2xl">🌿</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-white mb-1">{item.name}</h3>
                      <p className="text-gray-300 text-sm mb-3">{item.origin}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-black hover:bg-gray-200 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          
                          <span className="text-2xl font-black text-white w-12 text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-black hover:bg-gray-200 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-black text-white">
                            {(item.price * item.quantity).toLocaleString()}€
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 text-sm mt-1"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-white text-black rounded-2xl p-6 border-4 border-black">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-black">TOTAL</span>
                <span className="text-3xl font-black">{getTotalPrice().toLocaleString()}€</span>
              </div>
              
              <div className="text-sm text-gray-600 mb-6">
                {getTotalItems()} article{getTotalItems() > 1 ? 's' : ''} dans votre panier
              </div>

              {/* Boutons des Commerçants */}
              <div className="space-y-3">
                <div className="text-center text-gray-600 font-bold text-sm mb-2">
                  COMMANDER CHEZ
                </div>
                
                {/* Bouton BURNS */}
                <button
                  onClick={() => {
                    // Créer le message de commande
                    let message = `🛒 NOUVELLE COMMANDE\n\n`;
                    message += `📦 Articles (${getTotalItems()}):\n`;
                    message += `------------------------\n`;
                    
                    cart.forEach(item => {
                      message += `• ${item.name}\n`;
                      message += `  Quantité: ${item.quantity}\n`;
                      message += `  Prix: ${item.price}€\n\n`;
                    });
                    
                    message += `------------------------\n`;
                    message += `💰 TOTAL: ${getTotalPrice()}€`;

                    if (settings?.burnsLink) {
                      const orderUrl = settings.burnsLink.includes('{message}') 
                        ? settings.burnsLink.replace('{message}', encodeURIComponent(message))
                        : settings.burnsLink;
                      window.open(orderUrl, '_blank');
                    } else {
                      alert('Le lien pour BURNS n\'est pas encore configuré. Contactez l\'administrateur.');
                    }
                  }}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-black text-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-3 border-2 border-orange-800"
                >
                  🏪 COMMANDER CHEZ BURNS
                </button>

                {/* Bouton APOU */}
                <button
                  onClick={() => {
                    // Créer le message de commande
                    let message = `🛒 NOUVELLE COMMANDE\n\n`;
                    message += `📦 Articles (${getTotalItems()}):\n`;
                    message += `------------------------\n`;
                    
                    cart.forEach(item => {
                      message += `• ${item.name}\n`;
                      message += `  Quantité: ${item.quantity}\n`;
                      message += `  Prix: ${item.price}€\n\n`;
                    });
                    
                    message += `------------------------\n`;
                    message += `💰 TOTAL: ${getTotalPrice()}€`;

                    if (settings?.apouLink) {
                      const orderUrl = settings.apouLink.includes('{message}') 
                        ? settings.apouLink.replace('{message}', encodeURIComponent(message))
                        : settings.apouLink;
                      window.open(orderUrl, '_blank');
                    } else {
                      alert('Le lien pour APOU n\'est pas encore configuré. Contactez l\'administrateur.');
                    }
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-black text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-3 border-2 border-green-800"
                >
                  🏪 COMMANDER CHEZ APOU
                </button>

                {/* Bouton MOE */}
                <button
                  onClick={() => {
                    // Créer le message de commande
                    let message = `🛒 NOUVELLE COMMANDE\n\n`;
                    message += `📦 Articles (${getTotalItems()}):\n`;
                    message += `------------------------\n`;
                    
                    cart.forEach(item => {
                      message += `• ${item.name}\n`;
                      message += `  Quantité: ${item.quantity}\n`;
                      message += `  Prix: ${item.price}€\n\n`;
                    });
                    
                    message += `------------------------\n`;
                    message += `💰 TOTAL: ${getTotalPrice()}€`;

                    if (settings?.moeLink) {
                      const orderUrl = settings.moeLink.includes('{message}') 
                        ? settings.moeLink.replace('{message}', encodeURIComponent(message))
                        : settings.moeLink;
                      window.open(orderUrl, '_blank');
                    } else {
                      alert('Le lien pour MOE n\'est pas encore configuré. Contactez l\'administrateur.');
                    }
                  }}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-black text-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-3 border-2 border-purple-800"
                >
                  🏪 COMMANDER CHEZ MOE
                </button>
              </div>
            </div>
          </div>
        )}
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

          <div className="flex flex-col items-center gap-2 text-black bg-white rounded-xl p-3 border-2 border-white font-black">
            <div className="relative">
              <ShoppingCart size={28} />
              {getTotalItems() > 0 && (
                <div className="absolute -top-3 -right-3 bg-black text-white text-sm rounded-full w-7 h-7 flex items-center justify-center font-black border-2 border-white">
                  {getTotalItems()}
                </div>
              )}
            </div>
            <span className="text-xs">PANIER ({getTotalItems()})</span>
          </div>
        </div>
      </div>
    </div>
  );
}