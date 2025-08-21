import { create } from 'zustand';

export interface ProductPricing {
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  origin: string;
  price: number; // Base price for compatibility
  pricing?: ProductPricing[]; // Multiple pricing options
  image: string;
  category: 'weed' | 'hash';
  tag?: string;
  tagColor?: 'red' | 'green';
  country: string;
  countryFlag: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  isAuthenticated: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setAuthenticated: (value: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  isAuthenticated: false,
  
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    });
  },
  
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },
  
  clearCart: () => {
    set({ cart: [] });
  },
  
  getTotalItems: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  
  setAuthenticated: (value) => {
    set({ isAuthenticated: value });
  },
}));