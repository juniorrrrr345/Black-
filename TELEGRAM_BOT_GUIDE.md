# 🤖 Guide Bot Telegram

## 📋 Configuration Requise

### Variables d'environnement obligatoires
Créez un fichier `.env.local` à la racine du projet :

```env
# Bot Telegram (OBLIGATOIRE)
BOT_TOKEN=votre_token_bot_telegram
ADMIN_ID=votre_id_telegram

# MongoDB (OPTIONNEL - le bot fonctionne sans)
MONGODB_URI=mongodb://localhost:27017/telegram-bot
```

## 🚀 Obtenir les informations nécessaires

### 1. Créer un bot Telegram
1. Ouvrez Telegram et cherchez **@BotFather**
2. Envoyez `/newbot`
3. Choisissez un nom pour votre bot
4. Choisissez un username (doit finir par `bot`)
5. Copiez le **token** fourni par BotFather

### 2. Obtenir votre ID Telegram
1. Cherchez **@userinfobot** sur Telegram
2. Envoyez n'importe quel message
3. Le bot vous répondra avec votre ID
4. Copiez cet ID

## 💻 Installation

```bash
# Installer les dépendances
npm install

# Lancer le bot (mode développement)
npm run bot

# Lancer le bot avec webhook (production)
npm run bot:webhook

# Lancer le bot avec MongoDB
npm run bot:mongodb
```

## 🎮 Utilisation

### Commandes disponibles
- `/start` - Démarre le bot et affiche le menu principal
- `/admin` - Accède au panel admin (seulement pour l'admin)
- `/stats` - Affiche les statistiques du bot
- `/info` - Affiche les informations configurées

### Panel Admin Web
1. Connectez-vous au panel admin : `/admin`
2. Allez dans **Bot Telegram**
3. Configurez :
   - Message de bienvenue
   - Image de bienvenue
   - Texte d'information
   - Mini Application
   - Réseaux sociaux

## 🔧 Fonctionnalités

### Sans MongoDB
- ✅ Configuration stockée en mémoire
- ✅ Message de bienvenue personnalisable
- ✅ Boutons de réseaux sociaux
- ✅ Mini Application
- ⚠️ Les données sont perdues au redémarrage

### Avec MongoDB
- ✅ Toutes les fonctionnalités sans MongoDB
- ✅ Persistance des données
- ✅ Historique des utilisateurs
- ✅ Statistiques détaillées
- ✅ Sauvegarde automatique

## 📱 Configuration du Bot

### Message de bienvenue
Utilisez `{firstname}` pour personnaliser le message :
```
🤖 Bienvenue {firstname} sur notre bot!
```

### Réseaux sociaux
Ajoutez vos liens sociaux avec des emojis :
- 📷 Instagram
- 🐦 Twitter
- 📱 Telegram
- 💬 WhatsApp

### Mini Application
Intégrez votre boutique ou site web directement dans Telegram !

## 🚨 Dépannage

### Le bot ne répond pas
1. Vérifiez que `BOT_TOKEN` est correct
2. Vérifiez que le bot n'est pas déjà lancé ailleurs
3. Relancez avec `npm run bot`

### MongoDB ne fonctionne pas
- Le bot fonctionne sans MongoDB !
- Les données seront stockées en mémoire
- Pour activer MongoDB, installez-le et configurez `MONGODB_URI`

### Erreur "polling error"
- Un autre processus utilise déjà le bot
- Arrêtez tous les processus : `pkill node`
- Relancez le bot

## 🎯 Commandes NPM

```bash
# Développement
npm run dev          # Lance Next.js
npm run bot         # Lance le bot Telegram

# Production
npm run build       # Build Next.js
npm run start       # Lance Next.js en production
npm run bot:webhook # Lance le bot avec webhook

# Avec MongoDB
npm run bot:mongodb # Lance le bot avec MongoDB
```

## 📝 Notes importantes

1. **Le bot fonctionne SANS MongoDB** - Configuration par défaut incluse
2. **Un seul admin** - Défini par `ADMIN_ID`
3. **Webhook pour production** - Utilisez `bot:webhook` sur un serveur
4. **Polling pour développement** - Utilisez `bot` en local

## 🔗 Liens utiles

- [Documentation Telegram Bot API](https://core.telegram.org/bots/api)
- [BotFather](https://t.me/botfather)
- [Obtenir son ID](https://t.me/userinfobot)

---

💡 **Astuce** : Commencez sans MongoDB pour tester, puis ajoutez-le plus tard si nécessaire !