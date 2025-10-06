# 🚀 Guide de Déploiement - NovaHypnose

Documentation complète pour déployer le site NovaHypnose sur Netlify via GitHub.

---

## 📋 Table des matières

- [Architecture de déploiement](#architecture-de-déploiement)
- [Configuration Netlify](#configuration-netlify)
- [Workflow de déploiement](#workflow-de-déploiement)
- [Deploy Previews](#deploy-previews)
- [Rollback](#rollback)
- [Monitoring](#monitoring)
- [Domaine personnalisé](#domaine-personnalisé)
- [Troubleshooting](#troubleshooting)
- [Checklist](#checklist-de-déploiement)

---

## 🏗 Architecture de déploiement

### Flux de déploiement

```
┌─────────────────┐
│  Développement  │
│     local       │
└────────┬────────┘
         │ git push
         ▼
┌─────────────────┐
│     GitHub      │
│  (main branch)  │
└────────┬────────┘
         │ webhook
         ▼
┌─────────────────┐
│  Netlify Build  │
│  npm run build  │
└────────┬────────┘
         │ deploy
         ▼
┌─────────────────┐
│   Production    │
│ novahypnose.fr  │
└─────────────────┘
```

### Stack technique

**Source :** GitHub (`ittanez/nova-hypno-textes-fr`)
**Build :** Netlify
**Hosting :** Netlify CDN
**Domaine :** novahypnose.fr (via Netlify DNS)

---

## ⚙️ Configuration Netlify

### 1. Paramètres de build

**Dashboard Netlify > Site settings > Build & deploy > Build settings**

| Paramètre | Valeur |
|-----------|--------|
| Base directory | (vide) |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Branch to deploy | `main` |

### 2. Variables d'environnement

**Site settings > Build & deploy > Environment > Environment variables**

```env
VITE_SUPABASE_URL=https://akrlyzmfszumibwgocae.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrcmx5em1mc3p1bWlid2dvY2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NjUyNDcsImV4cCI6MjA1ODM0MTI0N30.UDVk1wzm36OJGK0usCHEtvmkC2QxABvG9KQ8p2lKz30
```

⚠️ **Important :** Ne jamais commiter les clés dans le code source !

### 3. netlify.toml

**Fichier de configuration à la racine du projet :**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

# Redirection SPA - toutes les routes vers index.html
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Headers de sécurité
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

# Cache pour assets statiques
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 4. Build hooks

**Site settings > Build & deploy > Build hooks**

Créer un webhook pour déclencher un build manuellement :

```bash
# Nom : Manual Build
# Branch : main
# URL générée : https://api.netlify.com/build_hooks/XXXXX
```

**Utilisation :**
```bash
curl -X POST -d {} https://api.netlify.com/build_hooks/XXXXX
```

---

## 🔄 Workflow de déploiement

### Développement local

```bash
# 1. Créer une branche feature
git checkout -b feature/nom-feature

# 2. Développer et tester
npm run dev
# Ouvrir http://localhost:8080

# 3. Vérifier le build
npm run build

# 4. Prévisualiser le build
npm run preview
# Ouvrir http://localhost:4173
```

### Commit et push

```bash
# 1. Vérifier les changements
git status
git diff

# 2. Ajouter les fichiers
git add .

# 3. Commit avec message descriptif
git commit -m "feat(blog): ajout nouveau système de tags

- Ajout table tags dans Supabase
- Composant TagSelector
- Filtrage par tags dans BlogIndex

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# 4. Pousser sur GitHub
git push origin feature/nom-feature
```

### Pull Request (recommandé)

1. **Créer une PR sur GitHub**
   - Aller sur https://github.com/ittanez/nova-hypno-textes-fr
   - Cliquer "Compare & pull request"
   - Remplir le formulaire :
     - Title: `feat(blog): ajout nouveau système de tags`
     - Description: Détailler les changements
     - Reviewers: (si applicable)

2. **Review du code**
   - Vérifier le code
   - Tester le Deploy Preview Netlify
   - Approuver ou demander des changements

3. **Merge sur main**
   - Cliquer "Merge pull request"
   - Confirmer le merge

### Déploiement automatique

**Dès que le code est mergé sur `main` :**

```
✅ Netlify détecte le push (webhook GitHub)
✅ Démarrage du build automatique
✅ npm install (installation dépendances)
✅ npm run build (compilation Vite)
✅ Tests de build (exit code 0 = succès)
✅ Déploiement sur le CDN Netlify
✅ Invalidation du cache
✅ Site live sur novahypnose.fr
```

**Temps de déploiement :** 2-3 minutes

**Notification :**
- Email de confirmation
- Slack (si configuré)
- GitHub commit status

---

## 🔍 Deploy Previews

Pour chaque Pull Request, Netlify crée un **Deploy Preview** automatique.

### URL Preview

```
https://deploy-preview-{PR-NUMBER}--nova-hypnose.netlify.app
```

**Exemple :**
```
PR #42 → https://deploy-preview-42--nova-hypnose.netlify.app
```

### Configuration

**Site settings > Build & deploy > Deploy contexts**

```
Production branch: main
Branch deploys: All
Deploy Previews: Any pull request against main
```

### Utilisation

1. Créer une Pull Request
2. Netlify build automatiquement
3. Lien Deploy Preview apparaît dans la PR
4. Tester les changements avant merge
5. Partager l'URL pour review

---

## ⏮️ Rollback

### Via l'interface Netlify

**Méthode rapide (recommandée) :**

1. Aller sur **Deploys** dans le dashboard Netlify
2. Trouver le déploiement précédent stable
3. Cliquer sur **"Publish deploy"**
4. Le site revient instantanément à cette version

**Temps de rollback :** < 30 secondes

### Via Git (méthode alternative)

```bash
# 1. Identifier le commit à restaurer
git log --oneline -10

# 2. Revenir au commit précédent
git revert HEAD

# OU revenir à un commit spécifique
git revert abc1234

# 3. Pousser sur GitHub
git push origin main
```

**Temps de rollback :** 2-3 minutes (nouveau build)

### En cas d'urgence

**Rollback immédiat + investigation :**

```bash
# 1. Rollback via Netlify UI (30 sec)
# 2. Créer une branche hotfix
git checkout -b hotfix/fix-critical-bug

# 3. Corriger le bug
# 4. Commit et push
git commit -m "hotfix: correction bug critique"
git push origin hotfix/fix-critical-bug

# 5. Merger immédiatement sans PR
git checkout main
git merge hotfix/fix-critical-bug
git push origin main
```

---

## 📊 Monitoring

### Logs de build

**Deploys > [Deploy ID] > Deploy log**

**À vérifier :**
```
✅ 1. npm install - Installation des dépendances
✅ 2. npm run build - Compilation TypeScript + Vite
✅ 3. Build output - Taille des bundles
✅ 4. Post-processing - Optimisation assets
✅ 5. Deploy status - Success ou Error
```

**Exemple de log :**
```
8:42:15 AM: Build ready to start
8:42:17 AM: Installing dependencies
8:42:45 AM: Dependencies installed
8:42:46 AM: Started building
8:43:22 AM: vite v5.4.20 building for production...
8:43:38 AM: ✓ 1247 modules transformed
8:43:40 AM: dist/index.html                   0.52 kB
8:43:40 AM: dist/assets/index-abc123.css    256.78 kB
8:43:40 AM: dist/assets/index-def456.js   2,048.32 kB
8:43:42 AM: Build complete
8:43:45 AM: Site is live ✨
```

### Analytics

**Site overview > Analytics**

**Métriques disponibles :**
- **Page views** : Nombre de visites
- **Bandwidth** : Bande passante utilisée
- **Build minutes** : Temps de build consommé
- **Deploy frequency** : Fréquence des déploiements
- **Build status** : Succès/Échecs

### Alertes

**Site settings > Build & deploy > Notifications**

**Configurer des alertes pour :**
- ✅ Build échoue
- ✅ Build réussit après échec
- ✅ Deploy succeed
- ✅ Deploy failed

**Canaux :**
- Email
- Slack
- Webhook custom

### Performance monitoring

**Outils externes :**

1. **Google Analytics**
   - Trafic en temps réel
   - Pages les plus visitées
   - Sources de trafic

2. **Google Search Console**
   - Indexation Google
   - Erreurs crawl
   - Performance SEO

3. **Netlify Analytics** (payant)
   - Analytics sans cookies
   - Données serveur
   - Données exactes (pas de bloqueurs de pub)

---

## 🌐 Domaine personnalisé

### Configuration DNS

**Site settings > Domain management > Add custom domain**

1. **Ajouter le domaine**
   ```
   novahypnose.fr
   ```

2. **Vérifier le domaine**
   - Netlify génère un code de vérification
   - Ajouter TXT record dans le DNS

3. **Configurer les DNS**

**Enregistrements DNS à créer :**

```
# A Record pour le domaine principal
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600

# CNAME pour www
Type: CNAME
Name: www
Value: nova-hypnose.netlify.app
TTL: 3600

# Optionnel : MX records pour email
Type: MX
Name: @
Value: (configuré par votre hébergeur email)
Priority: 10
```

### HTTPS / SSL

**Site settings > Domain management > HTTPS**

**Configuration automatique :**
- ✅ Certificat Let's Encrypt (gratuit)
- ✅ Renouvellement automatique tous les 90 jours
- ✅ Force HTTPS (redirection HTTP → HTTPS)
- ✅ HSTS (HTTP Strict Transport Security)

**Vérifier HTTPS :**
```bash
curl -I https://novahypnose.fr
# Doit retourner : HTTP/2 200
```

### Sous-domaines

**Pour ajouter blog.novahypnose.fr (exemple) :**

```
Type: CNAME
Name: blog
Value: nova-hypnose.netlify.app
TTL: 3600
```

Puis dans Netlify :
```
Site settings > Domain management > Add domain alias
→ blog.novahypnose.fr
```

---

## 🔧 Troubleshooting

### Build échoue

**Erreur :** `Build failed` / `Exit code 1`

**Solutions :**

1. **Tester en local**
   ```bash
   npm run build
   ```
   Si ça échoue, corriger les erreurs TypeScript/Vite

2. **Vérifier les variables d'environnement**
   - Netlify UI > Environment variables
   - Comparer avec `.env.example`
   - Vérifier les clés Supabase

3. **Vérifier Node version**
   ```toml
   # netlify.toml
   [build.environment]
     NODE_VERSION = "18"
   ```

4. **Nettoyer le cache Netlify**
   - Deploys > Trigger deploy
   - Sélectionner "Clear cache and deploy"

5. **Vérifier les dépendances**
   ```bash
   # Supprimer node_modules et package-lock.json
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

### Site ne se met pas à jour

**Problème :** Modifications non visibles

**Solutions :**

1. **Vérifier le build**
   - Dashboard Netlify > Deploys
   - Status doit être "Published"
   - Vérifier la date/heure du dernier deploy

2. **Vider le cache navigateur**
   - Chrome/Firefox : Ctrl + Shift + R
   - Safari : Cmd + Shift + R
   - Ou mode navigation privée

3. **Vérifier le CDN**
   - Attendre 1-2 minutes pour propagation
   - Tester avec `?v=timestamp` : `https://novahypnose.fr?v=123456`

4. **Invalider le cache Netlify**
   ```bash
   # Via Netlify CLI
   netlify deploy --prod --clear-cache
   ```

### Erreur 404 sur certaines routes

**Problème :** Routes React Router renvoient 404

**Cause :** Configuration SPA manquante

**Solution :** Vérifier `netlify.toml` :

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Si manquant, ajouter et redéployer.

### Images ne s'affichent pas

**Problème :** Images Supabase Storage non visibles

**Solutions :**

1. **Vérifier les politiques Supabase**
   - Bucket `images` doit être public
   - RLS policies correctement configurées

2. **Vérifier les URLs**
   ```typescript
   // Correct
   https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/...

   // Incorrect (manque /public/)
   https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/images/...
   ```

3. **Vérifier CORS**
   - Supabase Storage settings
   - Autoriser `novahypnose.fr` et `*.netlify.app`

### Build lent (> 5 min)

**Optimisations :**

1. **Activer le cache de dépendances**
   ```toml
   [build]
     command = "npm ci && npm run build"
   ```

2. **Utiliser pnpm** (plus rapide)
   ```toml
   [build.environment]
     NPM_FLAGS = "--version" # Désactiver npm

   [build]
     command = "pnpm install && pnpm run build"
   ```

3. **Réduire la taille du bundle**
   - Lazy loading des routes
   - Code splitting
   - Tree shaking (automatique avec Vite)

---

## ✅ Checklist de déploiement

### Avant le déploiement

- [ ] Tests passent en local : `npm run build`
- [ ] Pas d'erreurs TypeScript : `npx tsc --noEmit`
- [ ] Variables d'environnement configurées sur Netlify
- [ ] `.env` jamais commité sur GitHub
- [ ] Sitemap généré : `npm run generate-sitemap`
- [ ] Meta tags SEO vérifiés (title, description)
- [ ] Images optimisées (format WebP, < 200KB)
- [ ] Liens internes fonctionnels
- [ ] Tests responsive (mobile/tablette)
- [ ] Changelog mis à jour

### Après le déploiement

- [ ] Site accessible : https://novahypnose.fr
- [ ] Routes principales fonctionnent
  - [ ] `/` (accueil)
  - [ ] `/blog` (liste articles)
  - [ ] `/blog/article/:slug` (article)
  - [ ] `/blog/categorie/:slug` (catégorie)
  - [ ] `/peurdelavion.html` (page statique)
- [ ] Meta tags visibles : View Page Source
- [ ] Structured data valides : Google Rich Results Test
- [ ] Recherche blog fonctionne
- [ ] Formulaire newsletter fonctionne
- [ ] Sitemap accessible : /sitemap.xml
- [ ] Robots.txt accessible : /robots.txt
- [ ] HTTPS forcé (redirection HTTP → HTTPS)
- [ ] Certificat SSL valide
- [ ] Performance OK : PageSpeed Insights > 90
- [ ] Pas d'erreurs console JavaScript (F12)

### Post-déploiement (J+1)

- [ ] Vérifier indexation Google Search Console
- [ ] Vérifier analytics (trafic normal)
- [ ] Surveiller les erreurs Netlify
- [ ] Vérifier les logs Supabase (si applicable)

---

## 📞 Support

### En cas de problème critique

**Ordre d'intervention :**

1. **Rollback immédiat** via Netlify UI (< 30 sec)
2. **Investigation** sur branche locale
3. **Hotfix** si nécessaire
4. **Redéploiement** après tests

### Ressources

**Documentation :**
- Netlify Docs : https://docs.netlify.com
- Vite Docs : https://vitejs.dev
- React Router : https://reactrouter.com

**Status pages :**
- Netlify Status : https://www.netlifystatus.com
- GitHub Status : https://www.githubstatus.com
- Supabase Status : https://status.supabase.com

**Support :**
- Netlify Support : support@netlify.com
- GitHub : https://github.com/ittanez/nova-hypno-textes-fr/issues
- Contact projet : contact@novahypnose.fr

---

## 🔗 Liens utiles

**Dashboard Netlify :**
https://app.netlify.com/sites/nova-hypnose

**GitHub Repository :**
https://github.com/ittanez/nova-hypno-textes-fr

**Site en production :**
https://novahypnose.fr

**Supabase Dashboard :**
https://supabase.com/dashboard/project/akrlyzmfszumibwgocae

---

## 📝 Notes

- Le déploiement est **100% automatique** une fois configuré
- Chaque push sur `main` déclenche un build
- Les Deploy Previews permettent de tester avant production
- Le rollback est instantané via l'interface Netlify
- Netlify gère automatiquement les certificats SSL

**Dernière mise à jour :** 6 octobre 2025
