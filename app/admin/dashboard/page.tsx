'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Save,
  X,
  Image as ImageIcon,
  Tag,
  Eye,
  DollarSign,
  Weight,
  Share2,
  Instagram,
  Send,
  MessageCircle,
  Facebook,
  Twitter,
  Youtube,
  Link
} from 'lucide-react';
import CloudinaryUpload from '@/components/CloudinaryUpload';
import CloudinaryVideoUpload from '@/components/CloudinaryVideoUpload';
import { useStore } from '@/lib/store';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({ 
    shopName: 'VERSHASH', 
    bannerText: 'NOUVEAU DROP',
    bannerSubtext: 'Découvrez nos produits premium de qualité exceptionnelle', 
    bannerImage: '', 
    orderLink: '',
    burnsLink: '',
    apouLink: '',
    moeLink: ''
  });
  const [socials, setSocials] = useState<any[]>([
    { id: '1', name: 'Instagram', icon: 'instagram', emoji: '📷', url: 'https://instagram.com/', enabled: true },
    { id: '2', name: 'Telegram', icon: 'telegram', emoji: '✈️', url: 'https://t.me/', enabled: true }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const { themeSettings, updateThemeSettings, loadThemeSettings } = useStore();
  
  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    fetchData();
    loadThemeSettings();
    // Charger les réseaux sociaux depuis localStorage
    const savedSocials = localStorage.getItem('shop-socials');
    if (savedSocials) {
      setSocials(JSON.parse(savedSocials));
    }
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      router.push('/admin');
    }
  };

  const fetchData = async () => {
    try {
      // Fetch products
      const productsRes = await fetch('/api/products');
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      }

      // Fetch categories
      const categoriesRes = await fetch('/api/categories');
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
      }

      // Fetch settings
      const settingsRes = await fetch('/api/settings');
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setSettings({
          ...settingsData,
          backgroundType: settingsData.backgroundType || 'color',
          backgroundColor: settingsData.backgroundColor || 'black',
          backgroundImage: settingsData.backgroundImage || '',
          gradientFrom: settingsData.gradientFrom || '#000000',
          gradientTo: settingsData.gradientTo || '#111111',
          shopName: settingsData.shopName || 'VERSHASH',
          bannerText: settingsData.bannerText || 'NOUVEAU DROP',
          bannerSubtext: settingsData.bannerSubtext || 'Découvrez nos produits premium de qualité exceptionnelle',
          bannerImage: settingsData.bannerImage || '',
          orderLink: settingsData.orderLink || ''
        });
        // Synchroniser avec le store
        updateThemeSettings({
          backgroundType: settingsData.backgroundType || 'color',
          backgroundColor: settingsData.backgroundColor || 'black',
          backgroundImage: settingsData.backgroundImage || '',
          gradientFrom: settingsData.gradientFrom || '#000000',
          gradientTo: settingsData.gradientTo || '#111111',
          shopName: settingsData.shopName || 'VERSHASH',
          bannerText: settingsData.bannerText || 'NOUVEAU DROP',
          bannerImage: settingsData.bannerImage || '',
          orderLink: settingsData.orderLink || ''
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    router.push('/admin');
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        // Synchroniser avec le store
        await updateThemeSettings({
          backgroundType: settings.backgroundType || 'color',
          backgroundColor: settings.backgroundColor || 'black',
          backgroundImage: settings.backgroundImage || '',
          gradientFrom: settings.gradientFrom || '#000000',
          gradientTo: settings.gradientTo || '#111111',
          shopName: settings.shopName || 'VERSHASH',
          bannerText: settings.bannerText || 'NOUVEAU DROP',
          bannerSubtext: settings.bannerSubtext || 'Découvrez nos produits premium de qualité exceptionnelle',
          bannerImage: settings.bannerImage || '',
          orderLink: settings.orderLink || ''
        });
        alert('✅ Paramètres sauvegardés avec succès !');
      }
    } catch (error) {
      alert('❌ Erreur lors de la sauvegarde');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        const res = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchData(); // Recharger les données
          alert('Produit supprimé avec succès');
        } else {
          alert('Erreur lors de la suppression');
        }
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - Responsive */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            VERSHASH ADMIN DASHBOARD
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg transition-colors font-black text-sm md:text-base lg:text-lg"
          >
            <LogOut size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
            DÉCONNEXION
          </button>
        </div>
      </header>

      {/* Tabs - Responsive */}
      <div className="bg-gray-900 border-b border-gray-800 overflow-x-auto">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex gap-2 md:gap-4 min-w-max">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-3 px-4 md:px-6 lg:px-8 font-black text-sm md:text-base lg:text-lg transition-colors whitespace-nowrap ${
                activeTab === 'products'
                  ? 'text-white border-b-2 border-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package className="inline mr-2" size={16} />
              PRODUITS
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-3 px-4 md:px-6 lg:px-8 font-black text-sm md:text-base lg:text-lg transition-colors whitespace-nowrap ${
                activeTab === 'categories'
                  ? 'text-white border-b-2 border-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tag className="inline mr-2" size={16} />
              CATÉGORIES
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3 px-4 md:px-6 lg:px-8 font-black text-sm md:text-base lg:text-lg transition-colors whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'text-white border-b-2 border-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="inline mr-2" size={16} />
              PARAMÈTRES
            </button>
            <button
              onClick={() => setActiveTab('background')}
              className={`py-3 px-4 md:px-6 lg:px-8 font-black text-sm md:text-base lg:text-lg transition-colors whitespace-nowrap ${
                activeTab === 'background'
                  ? 'text-white border-b-2 border-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="inline mr-2" size={16} />
              BACKGROUND
            </button>
            <button
              onClick={() => setActiveTab('socials')}
              className={`py-3 px-4 md:px-6 lg:px-8 font-black text-sm md:text-base lg:text-lg transition-colors whitespace-nowrap ${
                activeTab === 'socials'
                  ? 'text-white border-b-2 border-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Share2 className="inline mr-2" size={16} />
              RÉSEAUX
            </button>
          </div>
        </div>
      </div>

      {/* Content - Responsive */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 lg:mb-12 gap-4">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white">📦 GESTION DES PRODUITS</h2>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowProductModal(true);
                  }}
                  className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg transition-colors font-black text-sm md:text-base lg:text-lg border-2 border-white"
                >
                  <Plus size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  AJOUTER UN PRODUIT
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {products.map((product) => (
                <div key={product._id} className="bg-black border-4 border-white rounded-2xl p-6">
                  <div className="aspect-square bg-white rounded-2xl mb-4 overflow-hidden border-2 border-black">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <ImageIcon size={48} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-black text-white text-lg">{product.name}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${
                        product.tagColor === 'red' ? 'bg-red-500' : 'bg-green-500'
                      } text-white`}>
                        {product.tag}
                      </span>
                      <span className="text-gray-300 text-sm">{product.category}</span>
                    </div>

                    {product.pricing && product.pricing.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-white font-bold text-sm">OPTIONS DE PRIX:</p>
                        {product.pricing.map((pricing: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm bg-white/10 rounded-lg px-3 py-2">
                            <span className="text-white font-bold">{pricing.weight}</span>
                            <span className="text-white font-black">{pricing.price}€</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white font-black text-xl">{product.price}€</p>
                    )}
                    
                    <p className="text-gray-300 text-sm">
                      <span className="font-bold">Stock:</span> {product.quantity} unités
                    </p>
                    
                    {product.description && (
                      <p className="text-gray-400 text-xs line-clamp-2">{product.description}</p>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t-2 border-white">
                    <button
                      onClick={() => router.push(`/products/${product.id}`)}
                      className="flex-1 bg-white text-black py-2 rounded-lg font-black hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye size={16} />
                      VOIR
                    </button>
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowProductModal(true);
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-black hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit size={16} />
                      EDIT
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product._id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg font-black hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 size={16} />
                      SUP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Gestion des Catégories</h2>
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setShowCategoryModal(true);
                }}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Ajouter une catégorie
              </button>
            </div>

            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left p-4">Nom</th>
                    <th className="text-left p-4">Slug</th>
                    <th className="text-left p-4">Ordre</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id} className="border-t border-gray-800">
                      <td className="p-4">{category.name}</td>
                      <td className="p-4 text-gray-400">{category.slug}</td>
                      <td className="p-4">{category.order}</td>
                      <td className="p-4">
                        <button 
                          onClick={async () => {
                            if (confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ?`)) {
                              try {
                                const res = await fetch(`/api/categories/${category._id || category.id}`, {
                                  method: 'DELETE',
                                });
                                if (res.ok) {
                                  fetchData(); // Recharger les données
                                  alert('✅ Catégorie supprimée avec succès');
                                } else {
                                  alert('❌ Erreur lors de la suppression');
                                }
                              } catch (error) {
                                alert('❌ Erreur lors de la suppression');
                              }
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg font-bold transition-colors flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          SUPPRIMER
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-7xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-6 md:mb-8 lg:mb-12 border-b-2 border-white pb-4">
              ⚙️ CONFIGURATION DE LA BOUTIQUE
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {/* Informations générales */}
              <div className="bg-black border-4 border-white rounded-2xl p-4 md:p-6 lg:p-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 md:mb-6">🏪 INFORMATIONS GÉNÉRALES</h3>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">NOM DE LA BOUTIQUE</label>
                    <input
                      type="text"
                      value={settings.shopName}
                      onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
                      className="w-full bg-white text-black px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-lg border-2 border-black font-bold text-sm md:text-base lg:text-lg"
                      placeholder="Ex: VERSHASH"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">🔗 LIEN DE COMMANDE</label>
                    <input
                      type="text"
                      value={settings.orderLink || ''}
                      onChange={(e) => setSettings({ ...settings, orderLink: e.target.value })}
                      placeholder="https://t.me/votre_bot?text={message}"
                      className="w-full bg-white text-black px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-lg border-2 border-black font-bold text-sm md:text-base lg:text-lg"
                    />
                    <p className="text-gray-300 text-xs md:text-sm mt-2 bg-white/10 rounded-lg p-2 md:p-3">
                      💡 Utilisez <span className="font-bold text-white">{'{message}'}</span> pour insérer automatiquement le message de commande
                    </p>
                  </div>
                </div>
              </div>

              {/* Liens des Commerçants */}
              <div className="bg-black border-4 border-white rounded-2xl p-4 md:p-6 lg:p-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 md:mb-6">🛒 LIENS DES COMMERÇANTS</h3>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">🏪 COMMANDER CHEZ BURNS</label>
                    <input
                      type="text"
                      value={settings.burnsLink || ''}
                      onChange={(e) => setSettings({ ...settings, burnsLink: e.target.value })}
                      placeholder="https://exemple.com/burns"
                      className="w-full bg-white text-black px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-lg border-2 border-black font-bold text-sm md:text-base lg:text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">🏪 COMMANDER CHEZ APOU</label>
                    <input
                      type="text"
                      value={settings.apouLink || ''}
                      onChange={(e) => setSettings({ ...settings, apouLink: e.target.value })}
                      placeholder="https://exemple.com/apou"
                      className="w-full bg-white text-black px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-lg border-2 border-black font-bold text-sm md:text-base lg:text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">🏪 COMMANDER CHEZ MOE</label>
                    <input
                      type="text"
                      value={settings.moeLink || ''}
                      onChange={(e) => setSettings({ ...settings, moeLink: e.target.value })}
                      placeholder="https://exemple.com/moe"
                      className="w-full bg-white text-black px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-lg border-2 border-black font-bold text-sm md:text-base lg:text-lg"
                    />
                  </div>

                  <p className="text-gray-300 text-xs md:text-sm mt-2 bg-white/10 rounded-lg p-2 md:p-3">
                    💡 Ces liens seront affichés dans le panier pour permettre aux clients de commander chez différents commerçants
                  </p>
                </div>
              </div>

              {/* Gestion du Thème */}
              <div className="bg-black border-4 border-white rounded-2xl p-4 md:p-6 lg:p-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 md:mb-6">🎨 THÈME DE LA BOUTIQUE</h3>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">TYPE DE FOND</label>
                    <select
                      value={settings.backgroundType || 'color'}
                      onChange={(e) => setSettings({ ...settings, backgroundType: e.target.value })}
                      className="w-full bg-white text-black px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-lg border-2 border-black font-bold text-sm md:text-base lg:text-lg"
                    >
                      <option value="color">🎨 Couleur Unie</option>
                      <option value="gradient">🌈 Dégradé</option>
                      <option value="image">🖼️ Image Personnalisée</option>
                    </select>
                  </div>

                  {settings.backgroundType === 'color' && (
                    <div>
                      <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">COULEUR D'ARRIÈRE-PLAN</label>
                      <select
                        value={settings.backgroundColor || 'black'}
                        onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                        className="w-full bg-white text-black px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-lg border-2 border-black font-bold text-sm md:text-base lg:text-lg"
                      >
                        <option value="black">⚫ Noir</option>
                        <option value="#1a1a1a">⚫ Gris Très Foncé</option>
                        <option value="#2d1b69">🟣 Violet Foncé</option>
                        <option value="#1e3a8a">🔵 Bleu Foncé</option>
                        <option value="#064e3b">🟢 Vert Foncé</option>
                      </select>
                    </div>
                  )}

                  {settings.backgroundType === 'gradient' && (
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-white font-black text-sm md:text-base mb-2">COULEUR 1</label>
                        <input
                          type="color"
                          value={settings.gradientFrom || '#000000'}
                          onChange={(e) => setSettings({ ...settings, gradientFrom: e.target.value })}
                          className="w-full h-10 md:h-12 lg:h-14 rounded-lg border-2 border-white cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-black text-sm md:text-base mb-2">COULEUR 2</label>
                        <input
                          type="color"
                          value={settings.gradientTo || '#111111'}
                          onChange={(e) => setSettings({ ...settings, gradientTo: e.target.value })}
                          className="w-full h-10 md:h-12 lg:h-14 rounded-lg border-2 border-white cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {settings.backgroundType === 'image' && (
                    <div>
                      <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">IMAGE DE FOND</label>
                      <CloudinaryUpload
                        currentImage={settings.backgroundImage}
                        onUpload={(url) => setSettings({ ...settings, backgroundImage: url })}
                        onRemove={() => setSettings({ ...settings, backgroundImage: '' })}
                      />
                      <p className="text-gray-300 text-xs md:text-sm mt-2 bg-white/10 rounded-lg p-2 md:p-3">
                        💡 Cette image sera utilisée comme fond de toute la boutique
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bannière */}
              <div className="bg-black border-4 border-white rounded-2xl p-4 md:p-6 lg:p-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 md:mb-6">🖼️ BANNIÈRE D'ACCUEIL</h3>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">TEXTE DE LA BANNIÈRE</label>
                    <input
                      type="text"
                      value={settings.bannerText}
                      onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
                      className="w-full bg-white text-black px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-lg border-2 border-black font-bold text-sm md:text-base lg:text-lg"
                      placeholder="Ex: NOUVEAU DROP"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">SOUS-TEXTE DE LA BANNIÈRE</label>
                    <input
                      type="text"
                      value={settings.bannerSubtext}
                      onChange={(e) => setSettings({ ...settings, bannerSubtext: e.target.value })}
                      className="w-full bg-white text-black px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-lg border-2 border-black font-bold text-sm md:text-base lg:text-lg"
                      placeholder="Ex: Découvrez nos produits premium"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">IMAGE DE LA BANNIÈRE</label>
                    <CloudinaryUpload
                      currentImage={settings.bannerImage}
                      onUpload={(url) => setSettings({ ...settings, bannerImage: url })}
                      onRemove={() => setSettings({ ...settings, bannerImage: '' })}
                    />
                  </div>

                  {/* Aperçu de la bannière */}
                  {(settings.bannerText || settings.bannerImage) && (
                    <div>
                      <label className="block text-white font-black text-sm md:text-base mb-2 md:mb-3">APERÇU</label>
                      <div className="relative h-24 md:h-32 lg:h-40 bg-white rounded-2xl overflow-hidden border-4 border-black">
                        {settings.bannerImage && (
                          <img 
                            src={settings.bannerImage} 
                            alt="Banner preview" 
                            className="w-full h-full object-cover opacity-80"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/80 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-2xl">
                            <span className="text-white font-black text-sm md:text-base lg:text-xl">
                              {settings.bannerText || 'NOUVEAU DROP'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions - Responsive */}
            <div className="mt-6 md:mt-8 lg:mt-12 flex flex-col md:flex-row gap-4">
              <button
                onClick={handleSaveSettings}
                className="flex-1 bg-white text-black py-3 md:py-4 lg:py-6 rounded-lg font-black text-lg md:text-xl lg:text-2xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 md:gap-3"
              >
                <Save size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
                SAUVEGARDER LES PARAMÈTRES
              </button>
              
              <button
                onClick={() => window.open('/', '_blank')}
                className="bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 lg:px-12 lg:py-6 rounded-lg font-black text-lg md:text-xl lg:text-2xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 md:gap-3"
              >
                <Eye size={20} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
                PRÉVISUALISER
              </button>
            </div>
          </div>
        )}

        {/* Background Tab */}
        {activeTab === 'background' && (
          <div>
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-2">🎨 PERSONNALISATION DU FOND</h2>
              <p className="text-gray-400">Personnalisez l'apparence de votre boutique</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Type de fond */}
              <div className="bg-black border-4 border-white rounded-2xl p-6">
                <h3 className="text-xl font-black text-white mb-6">TYPE DE FOND</h3>
                
                <div className="space-y-4">
                  {/* Sélecteur de type */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSettings({ ...settings, backgroundType: 'color' })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        settings.backgroundType === 'color' 
                          ? 'bg-white text-black border-white' 
                          : 'bg-black text-white border-gray-600 hover:border-white'
                      }`}
                    >
                      <div className="text-2xl mb-2">🎨</div>
                      <div className="font-bold text-sm">Couleur</div>
                    </button>
                    
                    <button
                      onClick={() => setSettings({ ...settings, backgroundType: 'gradient' })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        settings.backgroundType === 'gradient' 
                          ? 'bg-white text-black border-white' 
                          : 'bg-black text-white border-gray-600 hover:border-white'
                      }`}
                    >
                      <div className="text-2xl mb-2">🌈</div>
                      <div className="font-bold text-sm">Dégradé</div>
                    </button>
                    
                    <button
                      onClick={() => setSettings({ ...settings, backgroundType: 'image' })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        settings.backgroundType === 'image' 
                          ? 'bg-white text-black border-white' 
                          : 'bg-black text-white border-gray-600 hover:border-white'
                      }`}
                    >
                      <div className="text-2xl mb-2">🖼️</div>
                      <div className="font-bold text-sm">Image</div>
                    </button>
                  </div>

                  {/* Options selon le type */}
                  {settings.backgroundType === 'color' && (
                    <div>
                      <label className="block text-white font-bold mb-3">Couleur de fond</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={settings.backgroundColor}
                          onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                          className="w-20 h-12 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.backgroundColor}
                          onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                          className="flex-1 bg-white text-black px-4 py-2 rounded-lg font-mono font-bold"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  )}

                  {settings.backgroundType === 'gradient' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white font-bold mb-3">Couleur de départ</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={settings.gradientFrom}
                            onChange={(e) => setSettings({ ...settings, gradientFrom: e.target.value })}
                            className="w-20 h-12 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={settings.gradientFrom}
                            onChange={(e) => setSettings({ ...settings, gradientFrom: e.target.value })}
                            className="flex-1 bg-white text-black px-4 py-2 rounded-lg font-mono font-bold"
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white font-bold mb-3">Couleur de fin</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={settings.gradientTo}
                            onChange={(e) => setSettings({ ...settings, gradientTo: e.target.value })}
                            className="w-20 h-12 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={settings.gradientTo}
                            onChange={(e) => setSettings({ ...settings, gradientTo: e.target.value })}
                            className="flex-1 bg-white text-black px-4 py-2 rounded-lg font-mono font-bold"
                            placeholder="#111111"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {settings.backgroundType === 'image' && (
                    <div>
                      <label className="block text-white font-bold mb-3">Image de fond</label>
                      <CloudinaryUpload
                        currentImage={settings.backgroundImage}
                        onUpload={(url) => setSettings({ ...settings, backgroundImage: url })}
                        onRemove={() => setSettings({ ...settings, backgroundImage: '' })}
                      />
                      <p className="text-gray-400 text-sm mt-3">
                        💡 L'image sera affichée en plein écran avec un overlay sombre pour la lisibilité
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Aperçu */}
              <div className="bg-black border-4 border-white rounded-2xl p-6">
                <h3 className="text-xl font-black text-white mb-6">APERÇU EN DIRECT</h3>
                
                <div 
                  className="h-96 rounded-lg border-2 border-gray-600 overflow-hidden relative"
                  style={
                    settings.backgroundType === 'color' 
                      ? { backgroundColor: settings.backgroundColor }
                      : settings.backgroundType === 'gradient'
                      ? { background: `linear-gradient(135deg, ${settings.gradientFrom}, ${settings.gradientTo})` }
                      : settings.backgroundImage 
                      ? { 
                          backgroundImage: `url(${settings.backgroundImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }
                      : { backgroundColor: 'black' }
                  }
                >
                  {settings.backgroundType === 'image' && settings.backgroundImage && (
                    <div className="absolute inset-0 bg-black/50"></div>
                  )}
                  
                  <div className="relative z-10 p-6 text-white">
                    <h4 className="text-2xl font-black mb-4">{settings.shopName || 'MA BOUTIQUE'}</h4>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <p className="font-semibold mb-2">Exemple de contenu</p>
                      <p className="text-sm text-gray-200">
                        Voici comment votre contenu apparaîtra avec ce fond
                      </p>
                    </div>
                  </div>
                </div>

                {/* Presets */}
                <div className="mt-6">
                  <h4 className="text-white font-bold mb-3">Thèmes prédéfinis</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSettings({
                        ...settings,
                        backgroundType: 'color',
                        backgroundColor: '#000000'
                      })}
                      className="p-3 bg-black border-2 border-gray-600 rounded-lg hover:border-white transition-colors"
                    >
                      <div className="text-xs font-bold text-white">Noir</div>
                    </button>
                    
                    <button
                      onClick={() => setSettings({
                        ...settings,
                        backgroundType: 'gradient',
                        gradientFrom: '#1a1a2e',
                        gradientTo: '#16213e'
                      })}
                      className="p-3 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-gray-600 rounded-lg hover:border-white transition-colors"
                    >
                      <div className="text-xs font-bold text-white">Nuit</div>
                    </button>
                    
                    <button
                      onClick={() => setSettings({
                        ...settings,
                        backgroundType: 'gradient',
                        gradientFrom: '#0f3443',
                        gradientTo: '#34e89e'
                      })}
                      className="p-3 bg-gradient-to-br from-[#0f3443] to-[#34e89e] border-2 border-gray-600 rounded-lg hover:border-white transition-colors"
                    >
                      <div className="text-xs font-bold text-white">Ocean</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton sauvegarder */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-black text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-3"
              >
                <Save size={24} />
                SAUVEGARDER LES CHANGEMENTS
              </button>
            </div>
          </div>
        )}

        {/* Socials Tab */}
        {activeTab === 'socials' && (
          <div>
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-2">🌐 RÉSEAUX SOCIAUX</h2>
              <p className="text-gray-400">Gérez les liens vers vos réseaux sociaux</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Liste des réseaux */}
              <div className="bg-black border-4 border-white rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-white">VOS RÉSEAUX</h3>
                  <button
                    onClick={() => {
                      const newSocial = {
                        id: Date.now().toString(),
                        name: '',
                        icon: 'link',
                        url: '',
                        enabled: true
                      };
                      setSocials([...socials, newSocial]);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Ajouter
                  </button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {socials.map((social, index) => (
                    <div key={social.id} className="bg-white/10 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Nom du réseau"
                          value={social.name}
                          onChange={(e) => {
                            const updated = [...socials];
                            updated[index].name = e.target.value;
                            setSocials(updated);
                          }}
                          className="flex-1 bg-white text-black px-3 py-2 rounded-lg font-bold mr-2"
                        />
                        <button
                          onClick={() => {
                            const updated = [...socials];
                            updated[index].enabled = !updated[index].enabled;
                            setSocials(updated);
                          }}
                          className={`px-3 py-2 rounded-lg font-bold transition-colors ${
                            social.enabled 
                              ? 'bg-green-600 text-white hover:bg-green-700' 
                              : 'bg-gray-600 text-white hover:bg-gray-700'
                          }`}
                        >
                          {social.enabled ? 'Actif' : 'Inactif'}
                        </button>
                        <button
                          onClick={() => setSocials(socials.filter(s => s.id !== social.id))}
                          className="ml-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Emoji (ex: 📷)"
                            value={social.emoji || ''}
                            onChange={(e) => {
                              const updated = [...socials];
                              updated[index].emoji = e.target.value;
                              setSocials(updated);
                            }}
                            className="w-20 bg-white text-black px-3 py-2 rounded-lg font-bold text-center text-xl"
                            maxLength={2}
                          />
                          
                          <select
                            value={social.icon}
                            onChange={(e) => {
                              const updated = [...socials];
                              updated[index].icon = e.target.value;
                              // Auto-remplir l'emoji si pas déjà défini
                              if (!updated[index].emoji) {
                                const emojis: any = {
                                  'instagram': '📷',
                                  'telegram': '✈️',
                                  'whatsapp': '💬',
                                  'facebook': '👤',
                                  'twitter': '🐦',
                                  'youtube': '📺',
                                  'tiktok': '🎵',
                                  'snapchat': '👻',
                                  'discord': '🎮',
                                  'link': '🔗'
                                };
                                updated[index].emoji = emojis[e.target.value] || '🔗';
                              }
                              setSocials(updated);
                            }}
                            className="flex-1 bg-white text-black px-3 py-2 rounded-lg font-bold"
                          >
                            <option value="">Choisir un type...</option>
                            <option value="instagram">Instagram</option>
                            <option value="telegram">Telegram</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="facebook">Facebook</option>
                            <option value="twitter">Twitter</option>
                            <option value="youtube">YouTube</option>
                            <option value="tiktok">TikTok</option>
                            <option value="snapchat">Snapchat</option>
                            <option value="discord">Discord</option>
                            <option value="link">Autre</option>
                          </select>
                        </div>
                        
                        <input
                          type="url"
                          placeholder="URL complète (https://...)"
                          value={social.url}
                          onChange={(e) => {
                            const updated = [...socials];
                            updated[index].url = e.target.value;
                            setSocials(updated);
                          }}
                          className="w-full bg-white text-black px-3 py-2 rounded-lg font-bold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aperçu */}
              <div className="bg-black border-4 border-white rounded-2xl p-6">
                <h3 className="text-xl font-black text-white mb-6">APERÇU</h3>
                
                <div className="bg-gray-900 rounded-lg p-6">
                  <p className="text-gray-400 text-sm mb-4">Voici comment vos réseaux apparaîtront en bas de page :</p>
                  
                  <div className="flex flex-wrap gap-4 justify-center">
                    {socials.filter(s => s.enabled && s.name && s.url).map(social => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition-all flex items-center gap-2"
                      >
                        <span className="text-xl">{social.emoji || '🔗'}</span>
                        <span className="font-bold">{social.name}</span>
                      </a>
                    ))}
                  </div>
                  
                  {socials.filter(s => s.enabled && s.name && s.url).length === 0 && (
                    <p className="text-center text-gray-500">Aucun réseau social configuré</p>
                  )}
                </div>

                <div className="mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-600/50">
                  <p className="text-yellow-400 text-sm">
                    💡 Les réseaux sociaux actifs s'afficheront automatiquement dans la navigation en bas de page de votre boutique.
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton sauvegarder */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={async () => {
                  try {
                    // Sauvegarder dans localStorage pour l'instant
                    localStorage.setItem('shop-socials', JSON.stringify(socials));
                    
                    // TODO: Sauvegarder via API
                    alert('✅ Réseaux sociaux sauvegardés !');
                  } catch (error) {
                    alert('❌ Erreur lors de la sauvegarde');
                  }
                }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-black text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-3"
              >
                <Save size={24} />
                SAUVEGARDER LES RÉSEAUX
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <ProductFormModal
          product={editingProduct}
          categories={categories}
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
          onSave={() => {
            setShowProductModal(false);
            setEditingProduct(null);
            fetchData();
          }}
        />
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() => {
            setShowCategoryModal(false);
            setEditingCategory(null);
          }}
          onSave={() => {
            setShowCategoryModal(false);
            setEditingCategory(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
}

// Product Form Modal Component
function ProductFormModal({ product, categories, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    pricing: product?.pricing || [],
    category: product?.category || 'weed',
    tag: product?.tag || '',
    tagColor: product?.tagColor || 'green',
    description: product?.description || '',
    image: product?.image || '',
    video: product?.video || '',
  });

  const [pricingOptions, setPricingOptions] = useState(
    product?.pricing || [{ weight: '100g', price: 0 }]
  );

  const addPricingOption = () => {
    setPricingOptions([...pricingOptions, { weight: '', price: 0 }]);
  };

  const removePricingOption = (index: number) => {
    if (pricingOptions.length > 1) {
      setPricingOptions(pricingOptions.filter((_: any, i: number) => i !== index));
    }
  };

  const updatePricingOption = (index: number, field: string, value: any) => {
    const updated = [...pricingOptions];
    updated[index] = { ...updated[index], [field]: value };
    setPricingOptions(updated);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        pricing: pricingOptions.filter((p: any) => p.weight && p.price > 0)
      };

      const url = product ? `/api/products/${product._id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
      
      if (res.ok) {
        onSave();
      } else {
        const errorData = await res.json();
        alert('Erreur: ' + (errorData.error || 'Erreur lors de la sauvegarde'));
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-black border-4 border-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6 border-b-2 border-white pb-4">
            <h3 className="text-3xl font-black text-white">
              {product ? 'MODIFIER LE PRODUIT' : 'AJOUTER UN PRODUIT'}
            </h3>
            <button
              onClick={onClose}
              className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Upload */}
              <div>
                <label className="block text-white font-black text-lg mb-4">
                  📸 PHOTO DU PRODUIT (Carte)
                </label>
                <CloudinaryUpload
                  currentImage={formData.image}
                  onUpload={(url) => setFormData({ ...formData, image: url })}
                  onRemove={() => setFormData({ ...formData, image: '' })}
                />
                <p className="text-gray-300 text-sm mt-2">
                  Cette image sera affichée sur la carte produit de la page d'accueil
                </p>
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-white font-black text-lg mb-4">
                  🎬 VIDÉO DU PRODUIT (Détail)
                </label>
                <CloudinaryVideoUpload
                  currentVideo={formData.video}
                  onUpload={(url) => setFormData({ ...formData, video: url })}
                  onRemove={() => setFormData({ ...formData, video: '' })}
                />
                <p className="text-gray-300 text-sm mt-2">
                  Cette vidéo sera affichée sur la page détail du produit
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-black text-sm mb-2">
                    NOM DU PRODUIT
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Fond De Haze"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white text-black px-4 py-3 rounded-lg border-2 border-black font-bold"
                    required
                  />
                </div>



                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-black text-sm mb-2">
                      CATÉGORIE
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white text-black px-4 py-3 rounded-lg border-2 border-black font-bold"
                      required
                    >
                      <option value="weed">🌿 Weed</option>
                      <option value="hash">🍫 Hash</option>
                    </select>
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-black text-sm mb-2">
                      TAG
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: WEED"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="w-full bg-white text-black px-4 py-3 rounded-lg border-2 border-black font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-black text-sm mb-2">
                      COULEUR TAG
                    </label>
                    <select
                      value={formData.tagColor}
                      onChange={(e) => setFormData({ ...formData, tagColor: e.target.value })}
                      className="w-full bg-white text-black px-4 py-3 rounded-lg border-2 border-black font-bold"
                    >
                      <option value="green">🟢 Vert</option>
                      <option value="red">🔴 Rouge</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-black text-lg mb-4">
                📝 DESCRIPTION
              </label>
              <textarea
                placeholder="Description détaillée du produit..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white text-black px-4 py-3 rounded-lg border-2 border-black font-bold"
                rows={4}
              />
            </div>

            {/* Pricing Options */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-white font-black text-lg">
                  💰 OPTIONS DE PRIX
                </label>
                <button
                  type="button"
                  onClick={addPricingOption}
                  className="bg-white text-black px-4 py-2 rounded-lg font-black hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  AJOUTER
                </button>
              </div>

              <div className="space-y-3">
                {pricingOptions.map((pricing: any, index: number) => (
                  <div key={index} className="flex gap-4 items-center bg-white/10 p-4 rounded-lg border-2 border-white">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Ex: 100g"
                        value={pricing.weight}
                        onChange={(e) => updatePricingOption(index, 'weight', e.target.value)}
                        className="w-full bg-white text-black px-3 py-2 rounded-lg border-2 border-black font-bold"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Prix en €"
                        value={pricing.price}
                        onChange={(e) => updatePricingOption(index, 'price', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white text-black px-3 py-2 rounded-lg border-2 border-black font-bold"
                      />
                    </div>
                    {pricingOptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePricingOption(index)}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t-2 border-white">
              <button
                type="submit"
                className="flex-1 bg-white text-black py-4 rounded-lg font-black text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Save size={24} />
                SAUVEGARDER
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-red-600 text-white py-4 rounded-lg font-black text-lg hover:bg-red-700 transition-colors"
              >
                ANNULER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Category Form Modal Component  
function CategoryFormModal({ category, onClose, onSave }: any) {
  // Fonction pour générer automatiquement le slug
  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o')
      .replace(/[ùûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || generateSlug(category?.name || ''),
    order: category?.order || 1,
    icon: category?.icon || '🌿'
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Toujours générer le slug basé sur le nom actuel
      const dataToSend = {
        ...formData,
        slug: generateSlug(formData.name) // Toujours générer à partir du nom
      };
      
      const url = category ? `/api/categories/${category._id || category.id}` : '/api/categories';
      const method = category ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      
      if (res.ok) {
        // Forcer le rechargement du cache côté client
        if (typeof window !== 'undefined') {
          localStorage.removeItem('categories-cache');
        }
        onSave();
      } else {
        const errorData = await res.json();
        alert('Erreur: ' + (errorData.error || 'Erreur lors de la sauvegarde'));
      }
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-black border-4 border-white rounded-2xl max-w-lg w-full p-8">
        <div className="flex justify-between items-center mb-6 border-b-2 border-white pb-4">
          <h3 className="text-3xl font-black text-white">
            {category ? 'MODIFIER LA CATÉGORIE' : 'AJOUTER UNE CATÉGORIE'}
          </h3>
          <button
            onClick={onClose}
            className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-black text-sm mb-2">
              NOM DE LA CATÉGORIE
            </label>
            <input
              type="text"
              placeholder="Ex: Weed Premium"
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                setFormData({ 
                  ...formData, 
                  name: name,
                  slug: generateSlug(name)
                });
              }}
              className="w-full bg-white text-black px-4 py-3 rounded-lg border-2 border-black font-bold"
              required
            />
          </div>



          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-black text-sm mb-2">
                ICÔNE (EMOJI)
              </label>
              <input
                type="text"
                placeholder="Ex: 🌿"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full bg-white text-black px-4 py-3 rounded-lg border-2 border-black font-bold text-center text-2xl"
                maxLength={2}
              />
              <p className="text-gray-400 text-xs mt-1">Utilisez un emoji</p>
            </div>
            <div>
              <label className="block text-white font-black text-sm mb-2">
                POSITION D'AFFICHAGE
              </label>
              <select
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="w-full bg-white text-black px-4 py-3 rounded-lg border-2 border-black font-bold"
              >
                <option value="1">1ère position</option>
                <option value="2">2ème position</option>
                <option value="3">3ème position</option>
                <option value="4">4ème position</option>
                <option value="5">5ème position</option>
              </select>
              <p className="text-gray-400 text-xs mt-1">Ordre d'apparition</p>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t-2 border-white">
            <button
              type="submit"
              className="flex-1 bg-white text-black py-4 rounded-lg font-black text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={24} />
              SAUVEGARDER
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-red-600 text-white py-4 rounded-lg font-black text-lg hover:bg-red-700 transition-colors"
            >
              ANNULER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}