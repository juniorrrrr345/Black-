'use client';

import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const getTotalPrice = useStore((state) => state.getTotalPrice());
  const clearCart = useStore((state) => state.clearCart);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pb-20">
        <div className="px-4 md:px-8 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
            <ArrowLeft size={20} />
            Retour
          </Link>

          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag size={64} className="text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Panier vide</h2>
            <p className="text-gray-400 mb-8">Ajoutez des produits pour commencer</p>
            <Link href="/">
              <motion.button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continuer les achats
              </motion.button>
            </Link>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowLeft size={20} />
            Retour
          </Link>
          <h1 className="text-2xl font-bold text-white">Mon Panier</h1>
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Vider
          </button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="glass-effect rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">🌿</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {item.countryFlag} {item.origin}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center"
                      >
                        <Minus size={16} className="text-white" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center"
                      >
                        <Plus size={16} className="text-white" />
                      </button>
                    </div>
                    <p className="text-purple-400 font-bold">
                      {(item.price * item.quantity).toFixed(2)}€
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total and Checkout */}
        <div className="glass-effect rounded-xl p-6">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-400">
              <span>Sous-total</span>
              <span>{getTotalPrice.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Livraison</span>
              <span>Gratuite</span>
            </div>
            <div className="border-t border-gray-700 pt-3">
              <div className="flex justify-between text-white text-xl font-bold">
                <span>Total</span>
                <span className="text-purple-400">{getTotalPrice.toFixed(2)}€</span>
              </div>
            </div>
          </div>
          
          <motion.button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Procéder au paiement
          </motion.button>
          
          <p className="text-center text-gray-500 text-sm mt-4">
            Paiement sécurisé via Telegram
          </p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}