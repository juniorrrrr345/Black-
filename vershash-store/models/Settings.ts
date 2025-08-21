import mongoose from 'mongoose';

export interface ISettings {
  _id: string;
  shopName: string;
  bannerImage: string;
  bannerText: string;
  orderLink: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    telegram?: string;
  };
  updatedAt: Date;
}

const SettingsSchema = new mongoose.Schema({
  shopName: {
    type: String,
    default: 'VERSHASH',
  },
  bannerImage: {
    type: String,
    default: '',
  },
  bannerText: {
    type: String,
    default: 'NOUVEAU DROP',
  },
  orderLink: {
    type: String,
    default: '',
    description: 'Lien pour envoyer les commandes (Telegram, WhatsApp, etc.)'
  },
  socialLinks: {
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    telegram: { type: String, default: '' },
  }
}, {
  timestamps: true,
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);