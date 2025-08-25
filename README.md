# VERSHASH Store 🌿

Une boutique e-commerce moderne et élégante avec interface d'administration.

## 🚀 Démarrage Rapide

### 1. Configuration de l'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
cp .env.local.example .env.local
```

Puis modifiez le fichier `.env.local` avec vos informations :

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vershash?retryWrites=true&w=majority

# JWT Secret (générez une clé sécurisée)
JWT_SECRET=votre-cle-secrete-super-securisee

# Admin Setup Key (pour créer le premier admin)
ADMIN_SETUP_KEY=une-cle-pour-setup-initial

# Cloudinary Configuration (optionnel pour les images)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre-cloud-name
CLOUDINARY_API_KEY=votre-api-key
CLOUDINARY_API_SECRET=votre-api-secret
```

### 2. Installation des dépendances

```bash
npm install
```

### 3. Démarrer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### 4. Créer le compte administrateur

#### Option 1: Via le script (recommandé)

```bash
node scripts/setup-admin.js
```

#### Option 2: Via API directement

```bash
curl -X POST http://localhost:3000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "votre-mot-de-passe",
    "setupKey": "votre-setup-key-depuis-env"
  }'
```

### 5. Accéder à l'administration

Rendez-vous sur [http://localhost:3000/admin](http://localhost:3000/admin) et connectez-vous avec vos identifiants.

## 📱 Fonctionnalités

### Côté Client
- ✅ Page d'accueil avec bannière hero animée
- ✅ Catégories de produits (Weed 🌲, Hash 🍫)
- ✅ Cartes produits avec tags et drapeaux pays
- ✅ Panier d'achat fonctionnel
- ✅ Navigation mobile optimisée
- ✅ Design sombre premium avec effets glassmorphism

### Côté Admin
- ✅ Connexion sécurisée avec JWT
- ✅ Dashboard avec statistiques
- ✅ Gestion des produits
- ✅ Configuration Cloudinary (pour les images)
- ✅ Connexion MongoDB

## 🛠 Technologies Utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **MongoDB** - Base de données
- **Mongoose** - ODM MongoDB
- **JWT** - Authentification
- **bcryptjs** - Hashage des mots de passe
- **Cloudinary** - Gestion des images (optionnel)

## 📂 Structure du Projet

```
vershash-store/
├── app/
│   ├── admin/
│   │   ├── page.tsx          # Page de connexion admin
│   │   └── dashboard/
│   │       └── page.tsx       # Dashboard admin
│   ├── cart/
│   │   └── page.tsx           # Page panier
│   ├── api/
│   │   └── auth/
│   │       ├── login/         # API login
│   │       └── setup/         # API setup admin
│   ├── globals.css            # Styles globaux
│   ├── layout.tsx             # Layout principal
│   └── page.tsx               # Page d'accueil
├── components/
│   ├── HeroBanner.tsx         # Bannière hero
│   ├── Categories.tsx         # Sélecteur de catégories
│   ├── ProductCard.tsx        # Carte produit
│   └── BottomNav.tsx          # Navigation mobile
├── lib/
│   ├── store.ts               # State management Zustand
│   ├── products.ts            # Données produits
│   ├── mongodb.ts             # Configuration MongoDB
│   └── auth.ts                # Utilitaires auth
├── models/
│   └── Admin.ts               # Modèle Admin MongoDB
└── middleware.ts              # Protection des routes
```

## 🔒 Sécurité

- Les mots de passe sont hashés avec bcrypt
- Authentification JWT avec cookies httpOnly
- Protection des routes admin via middleware
- Validation des données côté serveur

## 🚀 Déploiement sur Vercel

1. Poussez votre code sur GitHub
2. Connectez votre repo à Vercel
3. Configurez les variables d'environnement dans Vercel
4. Déployez !

## 📝 Notes Importantes

- **IMPORTANT**: Désactivez la route `/api/auth/setup` en production après avoir créé votre admin
- Changez le `JWT_SECRET` en production
- Utilisez une vraie base de données MongoDB (MongoDB Atlas recommandé)
- Configurez Cloudinary pour gérer les images des produits

## 🤝 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue.

---

Fait avec 💜 pour VERSHASH