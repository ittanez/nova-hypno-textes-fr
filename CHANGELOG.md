# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Non publié]

### À venir

- PWA support (Progressive Web App)
- Système de commentaires pour le blog
- Newsletter automation avancée
- Intégration calendrier de prise de rendez-vous
- Mode sombre (dark mode)

---

## [1.2.0] - 2025-10-06

### Ajouté

- Documentation complète professionnelle :
  - `docs/DEPLOYMENT.md` - Guide de déploiement complet
  - `docs/SEO.md` - Documentation SEO et stratégie
  - `docs/DATABASE.md` - Schéma base de données Supabase
  - `docs/ARCHITECTURE.md` - Architecture technique détaillée
  - `docs/MAINTENANCE.md` - Guide de maintenance
- `CHANGELOG.md` - Historique des versions
- Score SEO de 9.5/10

### Amélioré

- Optimisation des meta tags pour toutes les pages
- Structured data (Schema.org) complet
- Performance Web Vitals (LCP < 2.5s, CLS < 0.1)

### Documentation

- Ajout de diagrammes d'architecture
- Documentation des workflows de déploiement
- Checklists SEO pour nouveau contenu
- Procédures de maintenance quotidienne/mensuelle

---

## [1.1.0] - 2025-10-03

### Ajouté

- Hook `useCarousel` réutilisable pour tous les carrousels
- Composant `MobileCarousel` pour navigation mobile optimisée
- Fichier de données `carouselData.ts` pour centralisation
- Documentation complète dans `REFACTORING.md`
- Guide de contribution `CONTRIBUTING.md`
- Guide de démarrage rapide `QUICK_START.md`

### Amélioré

- Navigation carrousels mobile : Boutons repositionnés en bas
- Badge "RECOMMANDÉ" désormais visible sur mobile
- Titres H2 optimisés pour mobile (taille réduite)
- Hero positioning : Centré sur mobile, aligné en haut sur desktop
- Architecture du code (composants réutilisables)

### Corrigé

- Bouton "sautille" supprimé (animation involontaire)
- Problème de visibilité des contrôles de carrousel sur mobile
- Incohérences de positionnement du Hero entre mobile et desktop
- Duplication de logique carrousel dans plusieurs composants

### Documentation

- `REFACTORING.md` : Guide complet du refactoring
- `CONTRIBUTING.md` : Standards de code et workflow Git
- `QUICK_START.md` : Guide de démarrage en 5 minutes
- `src/hooks/README.md` : Documentation des hooks personnalisés
- `src/components/common/README.md` : Documentation des composants réutilisables
- `src/data/README.md` : Documentation des données statiques

### Technique

- Extraction de la logique carrousel dans un hook personnalisé
- Centralisation des données de carrousel
- Amélioration de la maintenabilité du code
- Réduction de la duplication de code

---

## [1.0.1] - 2025-10-01

### Ajouté

- Page 404 personnalisée (`Custom404.tsx`)
- Optimisation SEO avec titres H1-H6 visibles dans le HTML initial
- Guide `SEO-OPTIMIZATION-GUIDE.md`

### Amélioré

- SEO : 40 titres H1-H6 injectés statiquement dans `index.html`
- Meta tags Open Graph pour partage réseaux sociaux
- Structured data JSON-LD (LocalBusiness, FAQPage)
- Performance : Code splitting optimisé

### Corrigé

- Titres H1-H6 invisibles pour les moteurs de recherche (générés côté client)
- Problème d'indexation Google Search Console
- Redirections 404 pour routes non existantes

### SEO

- Plugin Vite personnalisé `vite-plugin-seo-headers.js`
- Script de génération SEO `generate-static-seo.cjs`
- Section `<div id="seo-content">` dans `index.html`
- Score SEO passé de 7/10 à 9.5/10

---

## [1.0.0] - 2025-09-30

### Version initiale

#### Fonctionnalités principales

**Pages publiques** :
- Page d'accueil (Hero, À propos, Applications, Témoignages, FAQ, Tarifs)
- Blog "Émergences" (liste articles, article détaillé, catégories)
- Auto-hypnose (présentation, quiz VAKOG)
- Mentions légales
- Page 404 personnalisée

**Admin Dashboard** :
- Authentification Supabase (email/password)
- Gestion des articles de blog (CRUD)
- Éditeur WYSIWYG (TinyMCE)
- Upload d'images
- Gestion des catégories et tags
- Gestion des abonnés newsletter
- Dashboard avec statistiques

**Fonctionnalités techniques** :
- React 18.3 + TypeScript 5.5
- Vite 5.4 (build ultra-rapide)
- Tailwind CSS 3.4 + shadcn/ui
- React Router 6.26 (routing client-side)
- Supabase (backend, auth, database)
- React Query (state management serveur)
- React Hook Form + Zod (formulaires)

**SEO et Performance** :
- Meta tags dynamiques (SEOHead component)
- Structured data Schema.org
- Sitemap.xml automatique
- robots.txt optimisé
- Lazy loading des routes
- Code splitting
- Images WebP optimisées
- Score Lighthouse > 85

**Déploiement** :
- GitHub repository
- Netlify (déploiement automatique)
- Netlify Functions
- Variables d'environnement sécurisées
- HTTPS automatique
- CDN mondial

#### Stack technique

| Catégorie | Technologie |
|-----------|-------------|
| Frontend | React 18.3, TypeScript 5.5 |
| Build | Vite 5.4 |
| Styling | Tailwind CSS 3.4, shadcn/ui |
| Routing | React Router 6.26 |
| Forms | React Hook Form 7.63, Zod 4.1 |
| Backend | Supabase 2.58 |
| State | React Query 5.90 |
| Testing | Vitest 3.2, Testing Library |
| Linting | ESLint 9 |
| Deployment | Netlify |

#### Base de données Supabase

**Tables** :
- `articles` : Articles de blog
- `categories` : Catégories d'articles
- `tags` : Tags d'articles
- `article_categories` : Liaison articles ↔ catégories
- `article_tags` : Liaison articles ↔ tags
- `subscribers` : Abonnés newsletter
- `quiz_results` : Résultats quiz auto-hypnose
- `email_logs` : Logs emails envoyés
- `promo_codes` : Codes promo Stripe
- `admin_users` : Utilisateurs admin
- `admin_requests` : Demandes d'accès admin
- `user_roles` : Rôles utilisateurs
- `images` : Métadonnées images uploadées
- `authors` : Auteurs d'articles

**Sécurité** :
- Row Level Security (RLS) activé
- Policies pour lecture publique / écriture admin
- JWT authentication
- CORS configuré

#### Composants principaux

**Pages** :
- `Index.tsx` : Page d'accueil
- `BlogIndex.tsx` : Liste articles blog
- `ArticlePage.tsx` : Article détaillé
- `AutohypnoseIndex.tsx` : Page auto-hypnose
- `Quiz.tsx` : Quiz VAKOG
- `AdminDashboard.tsx` : Dashboard admin
- `AdminArticles.tsx` : Gestion articles
- `AdminArticleEditor.tsx` : Éditeur article

**Composants UI** :
- `Hero` : Section hero responsive
- `ApplicationsGrid` : Grille applications hypnose
- `Faq` : FAQ avec accordion
- `Pricing` : Cartes tarifaires
- `Testimonials` : Témoignages clients
- `SEOHead` : Meta tags SEO
- `FloatingButton` : CTA flottant
- 40+ composants shadcn/ui

**Hooks personnalisés** :
- `useAuth` : Authentification
- `useCarousel` : Gestion carrousels
- `useSeoMetadata` : Meta tags dynamiques
- `useArticleEditor` : Éditeur articles
- `useAdminArticles` : Gestion admin articles
- `useScrollAnimation` : Animations scroll

#### Configuration

**Build** :
- Output directory : `dist/`
- Code splitting : vendor chunks séparés
- Minification : esbuild
- CSS : code splitting activé
- Source maps : désactivés en production

**Netlify** :
- Build command : `npm run build`
- Publish directory : `dist`
- Node version : 18
- Redirections SPA configurées
- Headers de sécurité
- Cache assets statiques (1 an)

**Scripts npm** :
- `dev` : Serveur de développement
- `build` : Build production
- `preview` : Prévisualiser build
- `lint` : Linter ESLint
- `test` : Tests Vitest
- `generate-sitemap` : Générer sitemap.xml

#### Documentation

- `README.md` : Documentation principale
- `REFACTORING.md` : Guide refactoring
- `CONTRIBUTING.md` : Guide contribution
- `QUICK_START.md` : Démarrage rapide
- `SEO-OPTIMIZATION-GUIDE.md` : Guide SEO

---

## Légende

- **Ajouté** : Nouvelles fonctionnalités
- **Amélioré** : Améliorations de fonctionnalités existantes
- **Corrigé** : Corrections de bugs
- **Supprimé** : Fonctionnalités retirées
- **Déprécié** : Fonctionnalités bientôt retirées
- **Sécurité** : Corrections de vulnérabilités
- **Documentation** : Changements de documentation
- **Technique** : Changements techniques (refactoring, architecture)

---

## Format des versions

**MAJOR.MINOR.PATCH**

- **MAJOR** : Changements incompatibles avec versions précédentes
- **MINOR** : Nouvelles fonctionnalités compatibles
- **PATCH** : Corrections de bugs compatibles

Exemples :
- `1.0.0` → `1.0.1` : Patch (corrections bugs)
- `1.0.1` → `1.1.0` : Minor (nouvelles fonctionnalités)
- `1.1.0` → `2.0.0` : Major (breaking changes)

---

**Maintenu par** : Équipe NovaHypnose
**Dernière mise à jour** : 6 octobre 2025
