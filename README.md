# Bot Telegram Black

Bot Telegram complet avec panel administrateur, gestion des utilisateurs et fonctionnalités avancées.

## 🚀 Déploiement sur Render

### Build Command
```bash
npm install
```

### Start Command
```bash
npm start
```

### Variables d'environnement pour Render

Ajoutez ces variables dans les paramètres de votre service Render :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `BOT_TOKEN` | Token de votre bot Telegram (obtenu via @BotFather) | `123456789:ABCdefGHIjklMNOpqrsTUVwxyz` |
| `ADMIN_ID` | Votre ID Telegram (obtenu via @userinfobot) | `123456789` |
| `MONGODB_URI` | URI de connexion MongoDB (optionnel) | `mongodb+srv://...` |
| `PORT` | Port du serveur | `10000` |
| `NODE_ENV` | Environnement | `production` |
| `PUBLIC_URL` | URL publique de votre app Render | `https://votre-app.onrender.com` |

## 📝 Fonctionnalités

### Sans MongoDB
- ✅ Bot fonctionnel avec messages par défaut
- ✅ Panel administrateur basique
- ✅ Gestion des commandes
- ✅ Réponses automatiques
- ✅ Statistiques en mémoire

### Avec MongoDB
- ✅ Sauvegarde persistante des données
- ✅ Historique des utilisateurs
- ✅ Configuration personnalisée
- ✅ Messages personnalisables
- ✅ Gestion avancée des médias

## 🛠️ Installation locale

1. Clonez le repository
2. Copiez `.env.example` vers `.env` et configurez vos variables
3. Installez les dépendances :
```bash
npm install
```
4. Lancez le bot :
```bash
npm run dev
```

## 🎯 Commandes du Bot

### Utilisateurs
- `/start` - Démarrer le bot
- `/help` - Afficher l'aide
- `/info` - Informations sur le bot

### Administrateur
- `/admin` - Panel administrateur
- `/stats` - Statistiques du bot
- `/broadcast` - Envoyer un message à tous
- `/config` - Configuration du bot

## 🔧 Scripts disponibles

- `npm start` - Lance le bot en production avec webhook
- `npm run bot` - Lance le bot complet
- `npm run bot:dev` - Lance le bot en développement
- `npm run bot:mongodb` - Lance le bot avec MongoDB
- `npm run bot:webhook` - Lance le bot avec webhook

## 📦 Structure des fichiers

```
Black/
├── bot.js                    # Bot principal
├── bot-complete.js           # Bot avec toutes les fonctionnalités
├── bot-mongodb.js            # Bot avec MongoDB
├── bot-mongodb-webhook.js    # Bot MongoDB + Webhook (production)
├── bot-webhook-production.js # Bot webhook optimisé
├── config.js                 # Configuration
├── keyboards.js              # Claviers Telegram
├── models.js                 # Modèles MongoDB
├── package.json              # Dépendances
├── render.yaml               # Configuration Render
├── Procfile                  # Configuration Heroku/Render
└── ecosystem.config.js       # Configuration PM2
```

## ⚙️ Configuration Render

1. Créez un nouveau Web Service sur Render
2. Connectez votre repository GitHub
3. Utilisez la branche `main`
4. Runtime : Node
5. Build Command : `npm install`
6. Start Command : `npm start`
7. Ajoutez les variables d'environnement
8. Déployez !

## 🔒 Sécurité

- Ne partagez jamais votre `BOT_TOKEN`
- Gardez votre `ADMIN_ID` privé
- Utilisez des connexions MongoDB sécurisées
- Activez HTTPS pour les webhooks

## 📞 Support

Pour toute question ou problème, consultez la documentation ou contactez l'administrateur du bot.

## 📄 Licence

Ce projet est sous licence ISC.