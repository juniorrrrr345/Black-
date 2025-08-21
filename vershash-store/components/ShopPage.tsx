'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProductModal from './ProductModal';
import { ShoppingCart } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Settings {
  shopName: string;
  bannerImage: string;
  bannerText: string;
}

interface ShopPageProps {
  settings: Settings;
  categories: Category[];
  products: Product[];
}

export default function ShopPage({ settings, categories, products }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<any[]>([]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header avec nom de la boutique */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {settings.shopName}
          </h1>
        </div>
      </header>

      {/* Banner "Nouveau Drop" */}
      <section className="relative w-full h-64 md:h-96 bg-gradient-to-r from-purple-900 to-pink-900">
        {settings.bannerImage && (
          <div className="absolute inset-0">
            <img 
              src={settings.bannerImage} 
              alt={settings.bannerText}
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl">
            {settings.bannerText}
          </h2>
        </div>
      </section>

      {/* Section Catégories */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-6">Catégories</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Tout
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.slug
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Grille de produits (2 colonnes) */}
      <section className="container mx-auto px-4 pb-20">
        <h3 className="text-2xl font-bold mb-6">Produits disponibles</h3>
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => setSelectedProduct(product)}
              className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="aspect-square relative">
                <img
                  src={product.image || '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.quantity > 0 && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    En stock
                  </span>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm">{product.name}</h4>
                <p className="text-purple-400 font-bold mt-1">{product.price}€</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal produit */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Bouton panier flottant */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
          <div className="relative">
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}