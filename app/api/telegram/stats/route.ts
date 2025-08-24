import { NextResponse } from 'next/server';

// Stats par défaut
let stats = {
  totalUsers: 0,
  activeToday: 0,
  botStatus: 'offline',
  lastUpdate: new Date().toISOString()
};

export async function GET() {
  try {
    // Vérifier si le bot est en ligne
    if (process.env.BOT_TOKEN) {
      // Essayer de se connecter à MongoDB pour obtenir les vraies stats
      if (process.env.MONGODB_URI) {
        try {
          const mongoose = require('mongoose');
          
          // Se connecter si pas déjà connecté
          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI);
          }
          
          // Récupérer les stats depuis MongoDB
          const User = mongoose.models.BotUser || mongoose.model('BotUser', new mongoose.Schema({
            userId: Number,
            lastSeen: Date
          }));
          
          const totalUsers = await User.countDocuments();
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const activeToday = await User.countDocuments({
            lastSeen: { $gte: today }
          });
          
          stats = {
            totalUsers,
            activeToday,
            botStatus: 'online',
            lastUpdate: new Date().toISOString()
          };
        } catch (error) {
          console.log('MongoDB non disponible pour les stats');
          stats.botStatus = 'offline';
        }
      }
    }
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erreur stats:', error);
    return NextResponse.json(stats);
  }
}