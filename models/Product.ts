import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  images: [{
    type: String,
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  categoryName: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  sizes: [{
    type: String,
  }],
  colors: [{
    type: String,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Interface pour TypeScript
export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  images?: string[];
  category?: string;
  categoryName?: string;
  stock?: number;
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}