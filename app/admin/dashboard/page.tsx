'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package, Users, ShoppingBag, Settings, LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { products } from '@/lib/products';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setAuthenticated = useStore((state) => state.setAuthenticated);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        router.push('/admin');
      } else {
        // Additional client-side check could be added here
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setAuthenticated(false);
    router.push('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  const stats = [
    { icon: Package, label: 'Produits', value: products.length, color: 'bg-purple-600' },
    { icon: ShoppingBag, label: 'Commandes', value: '24', color: 'bg-green-600' },
    { icon: Users, label: 'Clients', value: '156', color: 'bg-blue-600' },
    { icon: Settings, label: 'Paramètres', value: '', color: 'bg-gray-600' },
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Admin</h1>
            <p className="text-gray-400">Gérez votre boutique VERSHASH</p>
          </div>
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
            Déconnexion
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="glass-effect rounded-xl p-6"
                whileHover={{ y: -5 }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.color} rounded-lg mb-4`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Products Management */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Gestion des Produits</h2>
            <motion.button
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              Ajouter un produit
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 pb-3">Produit</th>
                  <th className="text-left text-gray-400 pb-3">Catégorie</th>
                  <th className="text-left text-gray-400 pb-3">Prix</th>
                  <th className="text-left text-gray-400 pb-3">Origine</th>
                  <th className="text-right text-gray-400 pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id} className="border-b border-gray-800">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                          🌿
                        </div>
                        <div>
                          <p className="text-white font-medium">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-300">{product.category.toUpperCase()}</td>
                    <td className="text-gray-300">{product.price}€</td>
                    <td className="text-gray-300">
                      <span className="mr-2">{product.countryFlag}</span>
                      {product.origin}
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Edit size={16} className="text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-red-900/20 rounded-lg transition-colors">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center">
            <button className="text-purple-400 hover:text-purple-300 text-sm">
              Voir tous les produits →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <motion.div
            className="glass-effect rounded-xl p-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-white font-medium mb-2">Configuration Cloudinary</h3>
            <p className="text-gray-400 text-sm">Gérer les images des produits</p>
          </motion.div>
          
          <motion.div
            className="glass-effect rounded-xl p-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-white font-medium mb-2">Base de données</h3>
            <p className="text-gray-400 text-sm">MongoDB connectée</p>
          </motion.div>
          
          <motion.div
            className="glass-effect rounded-xl p-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-white font-medium mb-2">Statistiques</h3>
            <p className="text-gray-400 text-sm">Voir les analytics détaillées</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}