# NovaHypnose.fr - Site Web

Site web officiel de NovaHypnose, cabinet d'hypnothérapie à Paris.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)]()
[![React](https://img.shields.io/badge/React-18.3-blue)]()
[![License](https://img.shields.io/badge/license-Private-red)]()

---

## 🚀 Démarrage rapide

```bash
# Installation
git clone https://github.com/ittanez/nova-hypno-textes-fr.git
cd nova-hypno-textes-fr
npm install

# Développement
npm run dev

# Production
npm run build
npm run preview
```

→ **Guide complet :** [QUICK_START.md](./QUICK_START.md)

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICK_START.md](./QUICK_START.md) | ⚡ Démarrage en 5 minutes |
| [REFACTORING.md](./REFACTORING.md) | 📖 Architecture et composants réutilisables |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | 🤝 Standards de code et workflow Git |
| [src/hooks/README.md](./src/hooks/README.md) | 🪝 Guide des hooks |
| [src/components/common/README.md](./src/components/common/README.md) | 🧩 Guide des composants |
| [src/data/README.md](./src/data/README.md) | 📊 Guide des données |

---

## 🏗️ Stack technique

- **Framework :** React 18.3 + Vite 5.4
- **Language :** TypeScript 5.5
- **Styling :** Tailwind CSS 3.4 + shadcn/ui
- **Routing :** React Router 6.26
- **Forms :** React Hook Form + Zod
- **Backend :** Supabase
- **Tests :** Vitest + Testing Library
- **Linting :** ESLint 9
- **Build :** Rollup (via Vite)

---

## 📁 Structure du projet

```
nova-hypno-textes-fr/
├── public/              # Assets statiques
├── src/
│   ├── components/
│   │   ├── common/     # Composants réutilisables ✅
│   │   ├── sections/   # Sections de pages (à créer)
│   │   └── ui/         # shadcn/ui components
│   ├── hooks/          # Hooks personnalisés ✅
│   ├── data/           # Données statiques ✅
│   ├── pages/          # Pages
│   ├── lib/            # Utilitaires
│   └── types/          # Types TypeScript
├── REFACTORING.md      # Documentation refactoring ✅
├── CONTRIBUTING.md     # Guide contribution ✅
├── QUICK_START.md      # Quick start ✅
└── package.json
```

---

## 🎯 Fonctionnalités principales

- ✅ Page d'accueil avec carrousels
- ✅ Section À propos
- ✅ Applications de l'hypnose
- ✅ Témoignages clients
- ✅ Tarifs et packs
- ✅ FAQ interactive
- ✅ Formulaire de contact
- ✅ Blog (articles)
- ✅ Admin dashboard
- ✅ SEO optimisé (Schema.org)
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Accessible (ARIA labels, keyboard nav)

---

## 🧩 Composants réutilisables

### Hook useCarousel
Gestion de la logique des carrousels.

```typescript
import { useCarousel } from '@/hooks/useCarousel';

const { currentIndex, goToNext, goToPrevious, goToSlide } = useCarousel(5);
```

### MobileCarousel
Composant carrousel mobile avec navigation en bas.

```typescript
import { MobileCarousel } from '@/components/common/MobileCarousel';

<MobileCarousel
  currentIndex={currentIndex}
  totalItems={items.length}
  onNext={goToNext}
  onPrevious={goToPrevious}
  onGoToSlide={goToSlide}
>
  {/* slides */}
</MobileCarousel>
```

→ **Documentation complète :** [REFACTORING.md](./REFACTORING.md)

---

## 🧪 Tests

```bash
# Lancer tous les tests
npm run test

# Tests en mode watch
npm run test -- --watch

# Coverage
npm run test:coverage
```

---

## 📦 Scripts disponibles

```bash
npm run dev              # Dev server (http://localhost:5173)
npm run build            # Build production
npm run build:dev        # Build en mode dev
npm run preview          # Preview du build
npm run lint             # Linter ESLint
npm run test             # Tests Vitest
npm run test:coverage    # Coverage des tests
npm run generate-sitemap # Génère sitemap.xml
```

---

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env` :

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### Tailwind

Configuration dans `tailwind.config.js` :

```javascript
theme: {
  extend: {
    colors: {
      'nova-blue': '#1e40af',
      'nova-blue-dark': '#1e3a8a',
      'nova-green': '#10b981',
      // ...
    }
  }
}
```

---

## 🚀 Déploiement

### Lovable (recommandé)

1. Ouvrir [Lovable Project](https://lovable.dev/projects/4fbcaa73-88c4-4913-9f79-347fef3cd4b3)
2. Cliquer sur Share → Publish
3. Le site est déployé automatiquement

### Netlify / Vercel

```bash
# Build
npm run build

# Le dossier dist/ contient les fichiers statiques
```

→ Connecter le repo GitHub et configurer :
- **Build command :** `npm run build`
- **Publish directory :** `dist`

---

## 📊 Audit & Qualité

### Derniers résultats (03/10/2025)

| Critère | Score | Notes |
|---------|-------|-------|
| Architecture | 8/10 | Index.tsx trop volumineux |
| Performances | 7/10 | Bien optimisé |
| SEO | 9/10 | Excellent Schema.org |
| Accessibilité | 8/10 | Bon support a11y |
| Sécurité | 7/10 | 8 vulnérabilités à corriger |
| Maintenabilité | 6/10 | Refactoring nécessaire |

**Score moyen : 7.5/10** ✅

→ **Audit complet disponible** : Demander l'audit code

---

## 🎯 Tâches prioritaires

**Urgent :**
- [ ] Corriger 13 erreurs ESLint
- [ ] Exécuter `npm audit fix` (8 vulnérabilités)
- [ ] Ajouter attributs `alt` sur images

**Important :**
- [ ] Extraire données : pricingData, testimonialsData, faqData
- [ ] Diviser Index.tsx (1684 lignes) en sections
- [ ] Créer hook `useCarousel` usage dans tous les carrousels
- [ ] Augmenter couverture tests

**Améliorations :**
- [ ] Ajouter PWA support
- [ ] Implémenter lazy loading avancé
- [ ] Optimiser bundle size
- [ ] Ajouter monitoring Web Vitals

---

## 🤝 Contribution

Avant de contribuer :

1. Lire [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Créer une branche `feature/nom-feature`
3. Faire les modifications
4. Vérifier : `npm run lint && npm run test && npm run build`
5. Commit : `feat(scope): description`
6. Push et créer une Pull Request

---

## 📞 Support

- 📧 Email : contact@novahypnose.fr
- 🐛 Issues : [GitHub Issues](https://github.com/ittanez/nova-hypno-textes-fr/issues)
- 📖 Docs : Voir fichiers `.md` dans le repo

---

## 📝 Changelog

### [1.1.0] - 2025-10-03

**Refactoring :**
- ✅ Créé hook `useCarousel` réutilisable
- ✅ Créé composant `MobileCarousel`
- ✅ Extrait données carrousel dans `carouselData.ts`
- ✅ Ajouté documentation complète

**Fixes :**
- ✅ Badge "RECOMMANDÉ" visible sur mobile
- ✅ Navigation carrousels en bas sur mobile
- ✅ H2 taille réduite sur mobile
- ✅ Bouton sautille supprimé
- ✅ Hero positionné correctement (mobile centré, desktop haut)

### [1.0.0] - 2025-09-30
- 🎉 Version initiale du site

---

## 📄 Licence

Ce projet est privé et propriétaire de **NovaHypnose**.

Tous droits réservés © 2025 NovaHypnose

---

## 🌟 Crédits

- **Développement :** Équipe NovaHypnose
- **Design :** NovaHypnose
- **Hypnothérapeute :** Alain Zenatti
- **Framework :** React, Vite, shadcn/ui

---

**Version :** 1.1.0
**Dernière mise à jour :** 3 octobre 2025

---

**Site web :** [https://novahypnose.fr](https://novahypnose.fr)
