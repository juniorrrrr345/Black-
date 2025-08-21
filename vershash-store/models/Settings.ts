import mongoose from 'mongoose';

export interface ISettings {
  _id: string;
  shopName: string;
  bannerImage: string;
  bannerText: string;
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
}, {
  timestamps: true,
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);