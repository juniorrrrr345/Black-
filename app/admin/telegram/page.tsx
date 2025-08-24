'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bot, 
  Settings, 
  Users, 
  MessageSquare, 
  Image,
  Link,
  Save,
  RefreshCw,
  ArrowLeft,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';

export default function TelegramAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    welcomeMessage: '',
    welcomeImage: '',
    infoText: '',
    miniApp: {
      url: '',
      text: ''
    },
    socialNetworks: [],
    socialButtonsPerRow: 3
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeToday: 0,
    botStatus: 'offline'
  });

  useEffect(() => {
    checkAuth();
    loadConfig();
    loadStats();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      router.push('/admin');
    }
  };

  const loadConfig = async () => {
    try {
      const res = await fetch('/api/telegram/config');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Erreur chargement config:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await fetch('/api/telegram/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

  const saveConfig = async () => {
    try {
      const res = await fetch('/api/telegram/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        alert('✅ Configuration sauvegardée !');
      }
    } catch (error) {
      alert('❌ Erreur lors de la sauvegarde');
    }
  };

  const addSocialNetwork = () => {
    setConfig({
      ...config,
      socialNetworks: [
        ...config.socialNetworks,
        { name: '', url: '', emoji: '🔗' }
      ]
    });
  };

  const updateSocialNetwork = (index, field, value) => {
    const updated = [...config.socialNetworks];
    updated[index] = { ...updated[index], [field]: value };
    setConfig({ ...config, socialNetworks: updated });
  };

  const removeSocialNetwork = (index) => {
    setConfig({
      ...config,
      socialNetworks: config.socialNetworks.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <Bot className="text-blue-400" size={28} />
                <h1 className="text-xl font-bold">Bot Telegram Admin</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <div className={`px-3 py-1 rounded-full ${
                stats.botStatus === 'online' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {stats.botStatus === 'online' ? '🟢 En ligne' : '🔴 Hors ligne'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <Users className="text-blue-400" size={24} />
              <div>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <div className="text-sm text-gray-400">Utilisateurs total</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-green-400" size={24} />
              <div>
                <div className="text-2xl font-bold">{stats.activeToday}</div>
                <div className="text-sm text-gray-400">Actifs aujourd'hui</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
            <button
              onClick={loadStats}
              className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600 rounded-lg transition-colors"
            >
              <RefreshCw size={18} />
              Actualiser
            </button>
          </div>
        </div>

        {/* Configuration */}
        <div className="space-y-6">
          {/* Message de bienvenue */}
          <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MessageSquare size={20} />
              Message de bienvenue
            </h2>
            <textarea
              value={config.welcomeMessage}
              onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white resize-none h-32"
              placeholder="🤖 Bienvenue {firstname} sur notre bot!"
            />
            <p className="text-xs text-gray-400 mt-2">
              Utilisez {`{firstname}`} pour le prénom de l'utilisateur
            </p>
          </div>

          {/* Image de bienvenue */}
          <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Image size={20} />
              Image de bienvenue
            </h2>
            <input
              type="text"
              value={config.welcomeImage}
              onChange={(e) => setConfig({ ...config, welcomeImage: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
              placeholder="URL de l'image ou file_id Telegram"
            />
          </div>

          {/* Texte d'information */}
          <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Settings size={20} />
              Texte d'information
            </h2>
            <textarea
              value={config.infoText}
              onChange={(e) => setConfig({ ...config, infoText: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white resize-none h-32"
              placeholder="ℹ️ Informations sur votre service..."
            />
          </div>

          {/* Mini App */}
          <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-bold mb-4">🎮 Mini Application</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={config.miniApp.text}
                onChange={(e) => setConfig({ 
                  ...config, 
                  miniApp: { ...config.miniApp, text: e.target.value }
                })}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                placeholder="Texte du bouton"
              />
              <input
                type="url"
                value={config.miniApp.url}
                onChange={(e) => setConfig({ 
                  ...config, 
                  miniApp: { ...config.miniApp, url: e.target.value }
                })}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                placeholder="URL de la mini app"
              />
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Link size={20} />
                Réseaux sociaux
              </h2>
              <button
                onClick={addSocialNetwork}
                className="flex items-center gap-2 px-3 py-1 bg-green-600/20 hover:bg-green-600/30 border border-green-600 rounded-lg transition-colors text-sm"
              >
                <Plus size={16} />
                Ajouter
              </button>
            </div>
            
            <div className="space-y-3">
              {config.socialNetworks.map((social, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={social.emoji}
                    onChange={(e) => updateSocialNetwork(index, 'emoji', e.target.value)}
                    className="w-16 bg-white/5 border border-white/10 rounded-lg p-2 text-center"
                    placeholder="📱"
                  />
                  <input
                    type="text"
                    value={social.name}
                    onChange={(e) => updateSocialNetwork(index, 'name', e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2"
                    placeholder="Nom"
                  />
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => updateSocialNetwork(index, 'url', e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2"
                    placeholder="URL"
                  />
                  <button
                    onClick={() => removeSocialNetwork(index)}
                    className="p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm text-gray-400">Boutons par ligne:</label>
              <select
                value={config.socialButtonsPerRow}
                onChange={(e) => setConfig({ ...config, socialButtonsPerRow: parseInt(e.target.value) })}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>

          {/* Bouton sauvegarder */}
          <button
            onClick={saveConfig}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
          >
            <Save size={24} />
            Sauvegarder la configuration
          </button>
        </div>
      </div>
    </div>
  );
}