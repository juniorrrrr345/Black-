import { NextRequest, NextResponse } from 'next/server';

// Configuration par défaut si pas de MongoDB
const defaultConfig = {
  botId: 'main',
  welcomeMessage: "🤖 Bienvenue {firstname} sur notre bot!\n\nUtilisez les boutons ci-dessous pour naviguer.",
  welcomeImage: null,
  infoText: "ℹ️ Informations\n\nCeci est la section d'informations du bot.",
  miniApp: {
    url: null,
    text: "🎮 Mini Application"
  },
  socialNetworks: [
    { name: "Twitter", url: "https://twitter.com", emoji: "🐦" },
    { name: "Instagram", url: "https://instagram.com", emoji: "📷" },
    { name: "Facebook", url: "https://facebook.com", emoji: "👍" }
  ],
  socialButtonsPerRow: 3
};

// Stockage en mémoire si pas de MongoDB
let currentConfig = { ...defaultConfig };

export async function GET() {
  try {
    // Si MongoDB est configuré, essayer de charger depuis la DB
    if (process.env.MONGODB_URI) {
      try {
        const { loadConfig } = require('../../../../config');
        const config = await loadConfig();
        return NextResponse.json(config);
      } catch (error) {
        console.log('MongoDB non disponible, utilisation de la config par défaut');
      }
    }
    
    // Sinon retourner la config en mémoire
    return NextResponse.json(currentConfig);
  } catch (error) {
    console.error('Erreur GET config:', error);
    return NextResponse.json(currentConfig);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Si MongoDB est configuré, sauvegarder dans la DB
    if (process.env.MONGODB_URI) {
      try {
        const { saveConfig } = require('../../../../config');
        await saveConfig(body);
      } catch (error) {
        console.log('MongoDB non disponible, sauvegarde en mémoire');
      }
    }
    
    // Mettre à jour la config en mémoire
    currentConfig = { ...currentConfig, ...body };
    
    return NextResponse.json({ success: true, config: currentConfig });
  } catch (error) {
    console.error('Erreur POST config:', error);
    return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 });
  }
}