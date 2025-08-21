import mongoose from 'mongoose';

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  weight: string;
  category: string;
  description?: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  weight: {
    type: String,
    default: '1g',
    description: 'Poids du produit (ex: 1g, 3g, 5g, 10g)'
  },
  category: {
    type: String,
    required: true,
    enum: ['weed', 'hash'],
  },
  description: {
    type: String,
    default: '',
  },
  available: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);