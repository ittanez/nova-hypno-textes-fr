# Fix Router Basename pour Compatibilité GitHub Pages

## 🎯 Objectif
Corriger l'erreur 404 sur GitHub Pages en configurant correctement React Router pour fonctionner avec un déploiement en sous-dossier, tout en maintenant la compatibilité Netlify.

## 🐛 Problème Identifié

**Symptôme** : 404 "Page introuvable" sur https://ittanez.github.io/nova-hypno-textes-fr/

**Cause racine** :
- ✅ Vite buildait correctement avec `base: '/nova-hypno-textes-fr/'` (assets chargés OK)
- ✅ Les fichiers statiques étaient bien déployés sur GitHub Pages
- ❌ **React Router n'avait pas de `basename` configuré**
- ❌ Il cherchait les routes à la racine `/` au lieu de `/nova-hypno-textes-fr/`
- ❌ Résultat : toutes les routes renvoyaient 404

## ✅ Solution Implémentée

### 1. Configuration React Router (`src/App.tsx`)

```tsx
// AVANT
<BrowserRouter>
  <AppRedirects />
  ...
</BrowserRouter>

// APRÈS
<BrowserRouter basename={import.meta.env.BASE_URL}>
  <AppRedirects />
  ...
</BrowserRouter>
```

**Pourquoi ça marche** :
- `import.meta.env.BASE_URL` récupère automatiquement la valeur de `base` dans Vite
- GitHub Pages : `basename = '/nova-hypno-textes-fr/'`
- Netlify : `basename = '/'`
- Pas besoin de dupliquer la configuration

### 2. Configuration Vite Unifiée (`vite.config.ts`)

```typescript
// Configuration unifiée avec variable d'environnement
base: process.env.VITE_BASE_PATH || '/nova-hypno-textes-fr/',
```

**Stratégie** :
- Par défaut : `/nova-hypno-textes-fr/` (GitHub Pages)
- Avec `VITE_BASE_PATH=/` : `/` (Netlify custom domain)

### 3. Configuration Netlify (`netlify.toml`)

```toml
[build.environment]
  NODE_VERSION = "18"
  VITE_BASE_PATH = "/"  # Force base path racine pour custom domain
```

**Effet** :
- Netlify build avec `base = '/'`
- GitHub Actions build avec `base = '/nova-hypno-textes-fr/'` (défaut)

## 🎯 Résultats

### Avant
- ❌ GitHub Pages : 404 sur toutes les pages
- ✅ Netlify : Fonctionne (novahypnose.fr)

### Après
- ✅ GitHub Pages : Toutes les routes fonctionnent
- ✅ Netlify : Continue à fonctionner sans changement
- ✅ Configuration unifiée, pas de duplication de code

## 🧪 Comment Tester

### GitHub Pages
1. Visiter https://ittanez.github.io/nova-hypno-textes-fr/
2. ✅ Page d'accueil s'affiche correctement
3. ✅ Navigation fonctionne (Blog, Auto-hypnose, Test réceptivité, etc.)
4. ✅ Assets chargés depuis le bon chemin

### Netlify
1. Visiter https://novahypnose.fr/
2. ✅ Continue à fonctionner normalement
3. ✅ Aucune régression

## 📝 Changements de Fichiers

- `src/App.tsx` : Ajout `basename={import.meta.env.BASE_URL}` au BrowserRouter
- `vite.config.ts` : Utilisation de `VITE_BASE_PATH` pour configuration flexible
- `netlify.toml` : Ajout `VITE_BASE_PATH = "/"` dans build.environment

## 🔍 Impact

- **Performance** : Aucun impact (changement de configuration uniquement)
- **SEO** : Positif (site GitHub Pages maintenant accessible)
- **UX** : Amélioration majeure (404 → site fonctionnel)
- **Compatibilité** : 100% rétrocompatible avec Netlify

## ✅ Checklist

- [x] Code modifié et testé
- [x] Aucune régression sur Netlify
- [x] GitHub Pages fonctionne
- [x] Configuration unifiée et maintenable
- [x] Documentation à jour

---

**Type** : Bug Fix
**Priority** : High
**Labels** : bug, github-pages, router, deployment
