import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  storeName: String,
  storeDescription: String,
  currency: String,
  logo: String,
  favicon: String,
  primaryColor: String,
  secondaryColor: String,
  backgroundImage: String,
  gradientFrom: String,
  gradientTo: String,
  orderLink: String,
  burnsLink: String,
  apuLink: String,
  moeLink: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    tiktok: String,
  },
  contactEmail: String,
  contactPhone: String,
  address: String,
}, {
  timestamps: true,
});

export const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

export interface ISettings {
  _id?: string;
  storeName?: string;
  storeDescription?: string;
  currency?: string;
  logo?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundImage?: string;
  gradientFrom?: string;
  gradientTo?: string;
  orderLink?: string;
  burnsLink?: string;
  apuLink?: string;
  moeLink?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}