export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  images?: string[];
  category?: string;
  stock?: number;
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Produit Premium',
    description: 'Un produit de haute qualité',
    price: 99.99,
    category: 'Premium',
    stock: 10,
    featured: true
  },
  {
    id: '2',
    name: 'Produit Standard',
    description: 'Un produit standard de bonne qualité',
    price: 49.99,
    category: 'Standard',
    stock: 20,
    featured: false
  },
  {
    id: '3',
    name: 'Produit Économique',
    description: 'Un produit abordable',
    price: 19.99,
    category: 'Économique',
    stock: 30,
    featured: false
  }
];

export async function getProducts(): Promise<Product[]> {
  // En production, récupérer depuis MongoDB
  // Pour l'instant, retourner les produits par défaut
  return defaultProducts;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.id === id || p._id === id) || null;
}