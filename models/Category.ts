import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export interface ICategory {
  _id?: string;
  name: string;
  description?: string;
  image?: string;
  order?: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}