import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

// Pour l'API route sans mongoose
export interface IAdmin {
  _id?: string;
  username: string;
  password: string;
  email?: string;
  createdAt?: Date;
}

export const defaultAdmin: IAdmin = {
  username: 'admin',
  password: Buffer.from('admin123').toString('base64'), // hash simple pour dev
  email: 'admin@boutique.com'
};