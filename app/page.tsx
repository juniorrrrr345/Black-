import Image from 'next/image';
import Link from 'next/link';

// Données des catégories avec leurs produits
const categories = [
  {
    id: 1,
    name: "Électronique",
    description: "Dernières technologies et gadgets",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    products: [
      {
        id: 1,
        name: "Smartphone Premium",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        description: "Dernier modèle avec écran OLED et 5G"
      },
      {
        id: 2,
        name: "Ordinateur Portable",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
        description: "Ultrabook performant pour professionnels"
      },
      {
        id: 3,
        name: "Écouteurs Sans Fil",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        description: "Son haute qualité avec réduction de bruit"
      }
    ]
  },
  {
    id: 2,
    name: "Mode & Vêtements",
    description: "Tendances actuelles et classiques intemporels",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
    products: [
      {
        id: 4,
        name: "Veste en Cuir",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        description: "Veste en cuir véritable, coupe moderne"
      },
      {
        id: 5,
        name: "Robe Élégante",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
        description: "Parfaite pour les occasions spéciales"
      },
      {
        id: 6,
        name: "Sneakers Design",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        description: "Confortables et stylées"
      }
    ]
  },
  {
    id: 3,
    name: "Maison & Déco",
    description: "Embellissez votre espace de vie",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    products: [
      {
        id: 7,
        name: "Lampe Design",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400",
        description: "Éclairage moderne et élégant"
      },
      {
        id: 8,
        name: "Coussin Décoratif",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400",
        description: "Confort et style pour votre canapé"
      },
      {
        id: 9,
        name: "Vase Artisanal",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400",
        description: "Pièce unique faite à la main"
      }
    ]
  },
  {
    id: 4,
    name: "Sports & Loisirs",
    description: "Équipements pour vos activités",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    products: [
      {
        id: 10,
        name: "Tapis de Yoga",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
        description: "Antidérapant et confortable"
      },
      {
        id: 11,
        name: "Haltères Ajustables",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
        description: "De 2 à 20 kg par haltère"
      },
      {
        id: 12,
        name: "Sac de Sport",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        description: "Grande capacité avec compartiments"
      }
    ]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec nom de la boutique */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Ma Boutique Élégante
            </h1>
            <p className="text-gray-600">
              Découvrez notre sélection de produits de qualité
            </p>
          </div>
        </div>
      </header>

      {/* Image principale */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
          alt="Boutique principale"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">Bienvenue</h2>
            <p className="text-xl">Les meilleures offres vous attendent</p>
          </div>
        </div>
      </div>

      {/* Section des catégories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Nos Catégories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group cursor-pointer">
              <Link href={`#category-${category.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative h-48 w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                    <p className="text-sm text-blue-600 mt-2 group-hover:underline">
                      Voir les produits →
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Section des produits par catégorie */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <div key={category.id} id={`category-${category.id}`} className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                      <div className="relative h-64 w-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-blue-600">
                            {product.price.toFixed(2)} €
                          </span>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Voir détails
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}