'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('auth-token', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        className="relative bg-black border-4 border-white rounded-2xl p-6 sm:p-8 lg:p-12 w-full max-w-sm sm:max-w-md lg:max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-full mb-4 lg:mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Lock size={32} className="text-black sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
          </motion.div>
          
          <motion.h1 
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 lg:mb-4 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            VERSHASH ADMIN
          </motion.h1>
          
          <motion.p 
            className="text-gray-400 text-sm sm:text-base lg:text-lg font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Connectez-vous pour gérer la boutique
          </motion.p>
        </div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6 lg:space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Username Field */}
          <div>
            <label className="block text-sm sm:text-base lg:text-lg font-black text-white mb-2 lg:mb-3">
              NOM D'UTILISATEUR
            </label>
            <div className="relative">
              <User className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white text-black pl-10 lg:pl-12 pr-4 py-3 lg:py-4 rounded-lg border-2 border-black font-bold text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="admin"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm sm:text-base lg:text-lg font-black text-white mb-2 lg:mb-3">
              MOT DE PASSE
            </label>
            <div className="relative">
              <Lock className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white text-black pl-10 lg:pl-12 pr-4 py-3 lg:py-4 rounded-lg border-2 border-black font-bold text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              className="flex items-center gap-2 text-white bg-red-600 p-3 lg:p-4 rounded-lg border-2 border-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AlertCircle size={20} />
              <span className="text-sm sm:text-base font-bold">{error}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black py-3 lg:py-4 rounded-lg text-sm sm:text-base lg:text-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white"
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? 'CONNEXION...' : 'SE CONNECTER'}
          </motion.button>
        </motion.form>

        {/* Credentials Info */}
        <motion.div 
          className="mt-6 lg:mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-white/10 rounded-lg p-3 lg:p-4 border-2 border-white/20">
            <p className="text-gray-300 text-xs sm:text-sm lg:text-base font-bold">
              🔑 IDENTIFIANTS DE TEST
            </p>
            <p className="text-white text-xs sm:text-sm lg:text-base font-black mt-2">
              Username: <span className="text-gray-300">admin</span>
            </p>
            <p className="text-white text-xs sm:text-sm lg:text-base font-black">
              Password: <span className="text-gray-300">vershash2024</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}