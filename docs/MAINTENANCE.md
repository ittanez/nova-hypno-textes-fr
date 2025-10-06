# Guide de Maintenance - NovaHypnose.fr

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Tâches quotidiennes](#tâches-quotidiennes)
3. [Tâches hebdomadaires](#tâches-hebdomadaires)
4. [Tâches mensuelles](#tâches-mensuelles)
5. [Mise à jour des dépendances](#mise-à-jour-des-dépendances)
6. [Gestion des erreurs](#gestion-des-erreurs)
7. [Logs et monitoring](#logs-et-monitoring)
8. [Sécurité](#sécurité)
9. [Performance](#performance)
10. [Backups](#backups)

---

## Vue d'ensemble

### Philosophie de maintenance

**Principe** : Maintenance proactive plutôt que réactive

**Objectifs** :
- Site toujours disponible (99.9% uptime)
- Performance optimale (< 3s load time)
- Sécurité à jour (0 vulnérabilités critiques)
- Contenu frais (2 articles/mois minimum)
- Expérience utilisateur fluide

### Rôles et responsabilités

| Rôle | Responsabilités |
|------|-----------------|
| **DevOps** | Déploiements, monitoring, infrastructure |
| **Backend** | Base de données, API, Supabase |
| **Frontend** | UI/UX, composants, SEO |
| **Content** | Articles blog, images, contenu |
| **Admin** | Utilisateurs, modération, support |

---

## Tâches quotidiennes

### Monitoring (5 minutes)

**Checklist quotidienne** :

- [ ] Vérifier que le site est accessible : `https://novahypnose.fr`
- [ ] Vérifier Netlify Dashboard : Aucun build échoué
- [ ] Vérifier Google Search Console : Pas d'erreurs critiques
- [ ] Vérifier Supabase Dashboard : Pas de downtime
- [ ] Vérifier logs d'erreurs (Netlify Functions, Supabase)

**Commandes rapides** :

```bash
# Vérifier que le site répond
curl -I https://novahypnose.fr

# Vérifier sitemap
curl https://novahypnose.fr/sitemap.xml | grep "<url>" | wc -l

# Vérifier robots.txt
curl https://novahypnose.fr/robots.txt
```

### Email et notifications

**Vérifier** :
- Emails Netlify (build success/failure)
- Emails Google Search Console (erreurs indexation)
- Notifications Supabase (limites, erreurs)

### Nouveaux contenus

**Si nouveau contenu publié** :
- [ ] Vérifier que l'article apparaît sur `/blog`
- [ ] Vérifier meta tags (title, description, image)
- [ ] Vérifier structured data (Schema.org)
- [ ] Partager sur réseaux sociaux
- [ ] Soumettre URL à Google Search Console

---

## Tâches hebdomadaires

### Performance (15 minutes)

**Audit Lighthouse** :

```bash
# Installer Lighthouse
npm install -g lighthouse

# Audit complet
lighthouse https://novahypnose.fr \
  --output html \
  --output-path ./reports/lighthouse-$(date +%Y%m%d).html \
  --view

# Objectifs :
# - Performance : > 90
# - Accessibility : > 90
# - Best Practices : > 90
# - SEO : > 95
```

**Actions si score < objectif** :
1. Identifier la cause (images lourdes, JS bloquant, etc.)
2. Optimiser
3. Rebuild et redéployer
4. Re-tester

### Analytics (10 minutes)

**Google Analytics 4** :

- [ ] Trafic organique : Tendance
- [ ] Pages les plus visitées
- [ ] Taux de rebond : < 60%
- [ ] Temps moyen sur page : > 2 minutes
- [ ] Conversions (formulaire contact)

**Actions si metrics anormales** :
- Investiguer pages problématiques
- Vérifier contenu (pertinence, qualité)
- Optimiser CTAs

### SEO (15 minutes)

**Google Search Console** :

- [ ] Erreurs d'indexation (0 idéalement)
- [ ] Couverture : Pages indexées vs exclues
- [ ] Core Web Vitals : Toutes pages en vert
- [ ] Liens cassés : Corriger immédiatement

**Rank tracking** :

```bash
# Vérifier positions mots-clés principaux
# Utiliser Semrush, Ahrefs, ou manuellement :

# Position pour "hypnothérapeute Paris"
# → Objectif : Top 3

# Position pour "hypnose Paris 4ème"
# → Objectif : #1
```

### Sécurité (10 minutes)

**Vérifier vulnérabilités** :

```bash
npm audit

# Si vulnérabilités critiques :
npm audit fix

# Si fix automatique impossible :
# Mettre à jour manuellement les packages
```

**Vérifier headers de sécurité** :

```bash
curl -I https://novahypnose.fr | grep -E "X-Frame|X-XSS|X-Content"

# Doit afficher :
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
# X-Content-Type-Options: nosniff
```

### Backups (5 minutes)

**Supabase** :
- [ ] Vérifier que le backup automatique a bien eu lieu
- [ ] Dashboard > Database > Backups
- [ ] Dernier backup : < 24h

**GitHub** :
- [ ] Code pushé et sauvegardé
- [ ] Pas de commits non synchronisés localement

---

## Tâches mensuelles

### Mise à jour dépendances (30-60 minutes)

**Voir section dédiée** : [Mise à jour des dépendances](#mise-à-jour-des-dépendances)

### Audit complet (2-3 heures)

**Checklist audit mensuel** :

#### 1. Performance

- [ ] Lighthouse audit (desktop + mobile)
- [ ] PageSpeed Insights
- [ ] WebPageTest
- [ ] Bundle size analysis

**Objectifs** :
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Bundle JS total < 500 KB

#### 2. SEO

- [ ] Audit SEO complet (Screaming Frog ou Sitebulb)
- [ ] Vérifier tous les meta tags
- [ ] Vérifier structured data (Schema.org)
- [ ] Vérifier sitemap.xml
- [ ] Vérifier robots.txt
- [ ] Vérifier internal linking
- [ ] Vérifier backlinks (Ahrefs)

#### 3. Accessibilité

- [ ] WAVE audit (https://wave.webaim.org/)
- [ ] Axe DevTools
- [ ] Keyboard navigation
- [ ] Screen reader testing (NVDA ou JAWS)

**Objectifs** :
- 0 erreurs critiques
- Contrast ratio > 4.5:1
- Tous les éléments interactifs accessibles au clavier

#### 4. Sécurité

- [ ] npm audit (0 vulnérabilités critiques)
- [ ] Vérifier certificat SSL (expiration)
- [ ] Tester formulaires (injection SQL, XSS)
- [ ] Vérifier CORS policies (Supabase)
- [ ] Review Row Level Security (RLS)

#### 5. Contenu

- [ ] Mettre à jour contenu obsolète
- [ ] Vérifier liens cassés (Broken Link Checker)
- [ ] Optimiser images anciennes (WebP, compression)
- [ ] 2+ nouveaux articles publiés

#### 6. Base de données

- [ ] Vérifier taille DB (usage storage)
- [ ] Optimiser requêtes lentes (Supabase Dashboard > Logs)
- [ ] Nettoyer données obsolètes (quiz_results > 6 mois)
- [ ] Vérifier indexes (performance)

### Rapport mensuel

**Template** :

```markdown
# Rapport de maintenance - [Mois YYYY]

## Résumé

- Uptime : XX.X%
- Trafic : +/-X% vs mois précédent
- Nouveaux articles : X
- Incidents : X

## Métriques clés

| Métrique | Valeur | Objectif | Statut |
|----------|--------|----------|--------|
| Lighthouse Performance | XX | > 90 | ✅/❌ |
| Google Search Console Errors | XX | 0 | ✅/❌ |
| Core Web Vitals | Pass/Fail | Pass | ✅/❌ |
| Vulnérabilités npm | XX | 0 critical | ✅/❌ |

## Actions réalisées

- [ ] Mise à jour dépendances
- [ ] Publication X articles
- [ ] Correction bugs
- [ ] Optimisations performance

## Actions à venir

- [ ] Feature X
- [ ] Optimisation Y
- [ ] Correction bug Z
```

---

## Mise à jour des dépendances

### Stratégie de mise à jour

**Principes** :

1. **Tester en local** avant production
2. **Mises à jour incrémentales** (pas tout en même temps)
3. **Lire les changelogs** (breaking changes)
4. **Rollback plan** prêt

### Process étape par étape

#### 1. Vérifier les dépendances obsolètes

```bash
# Lister les packages obsolètes
npm outdated

# Résultat :
# Package           Current  Wanted  Latest
# react             18.3.0   18.3.1  18.3.1
# @supabase/...     2.58.0   2.58.0  2.60.0
```

#### 2. Catégoriser les mises à jour

**Patch** (18.3.0 → 18.3.1) : Corrections de bugs
- **Risque** : Très faible
- **Action** : Mettre à jour sans hésitation

**Minor** (18.3.0 → 18.4.0) : Nouvelles fonctionnalités
- **Risque** : Faible
- **Action** : Lire changelog, tester

**Major** (18.3.0 → 19.0.0) : Breaking changes
- **Risque** : Élevé
- **Action** : Lire migration guide, tester extensivement

#### 3. Mettre à jour progressivement

**Commandes** :

```bash
# Mettre à jour tous les patch/minor
npm update

# Mettre à jour un package spécifique
npm install react@latest
npm install @supabase/supabase-js@latest

# Mettre à jour un package à une version précise
npm install react@18.3.1
```

#### 4. Tester

```bash
# Installer les nouvelles dépendances
npm install

# Linter
npm run lint

# Tests
npm run test

# Build
npm run build

# Preview
npm run preview

# Tester manuellement :
# - Navigation
# - Formulaires
# - Admin dashboard
# - Blog
```

#### 5. Commit et deploy

```bash
git add package.json package-lock.json
git commit -m "chore(deps): update dependencies to latest versions"
git push origin main

# Vérifier le déploiement Netlify
```

#### 6. Rollback si problème

```bash
# Revenir au commit précédent
git revert HEAD
git push origin main

# Ou restaurer package.json/package-lock.json
git checkout HEAD~1 -- package.json package-lock.json
npm install
```

### Mises à jour critiques

**Packages à surveiller particulièrement** :

| Package | Impact si breaking change |
|---------|---------------------------|
| `react`, `react-dom` | Très élevé (tout le frontend) |
| `@supabase/supabase-js` | Élevé (backend, auth) |
| `react-router-dom` | Élevé (routing) |
| `vite` | Moyen (build, peut casser) |
| `tailwindcss` | Moyen (styles) |

### Calendrier recommandé

**Mensuel** :
- Mises à jour patch et minor
- npm audit fix

**Trimestriel** :
- Mises à jour major (React, Vite)
- Évaluation complète des dépendances

**Annuel** :
- Refactoring si nécessaire
- Suppression de dépendances inutilisées

---

## Gestion des erreurs

### Types d'erreurs

#### 1. Erreurs de build (Netlify)

**Symptômes** :
- Email "Deploy failed"
- Badge rouge dans Netlify Dashboard

**Actions** :

```bash
# 1. Lire les logs Netlify
# Identifier l'erreur exacte

# 2. Reproduire en local
npm run build

# 3. Corriger l'erreur
# Exemples :
# - Import manquant
# - Type TypeScript incorrect
# - Fichier supprimé mais encore référencé

# 4. Test et deploy
npm run build
git add .
git commit -m "fix(build): correct build error"
git push origin main
```

#### 2. Erreurs runtime (navigateur)

**Symptômes** :
- Console errors
- Page blanche
- Fonctionnalité cassée

**Actions** :

```bash
# 1. Vérifier logs navigateur
# Chrome DevTools > Console

# 2. Reproduire l'erreur localement
npm run dev

# 3. Utiliser React DevTools
# Identifier le composant problématique

# 4. Ajouter error boundary
```

**Error Boundary** :

```tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log vers service de monitoring
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

#### 3. Erreurs Supabase

**Symptômes** :
- Requêtes qui échouent
- Auth qui ne fonctionne pas
- Data non chargée

**Actions** :

```bash
# 1. Vérifier Supabase Dashboard > Logs
# Voir les erreurs API

# 2. Vérifier RLS policies
# Table concernée > Policies

# 3. Tester requête en SQL Editor
SELECT * FROM articles WHERE published = true;

# 4. Vérifier variables d'environnement
# Netlify > Environment variables
# VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY

# 5. Vérifier CORS
# Supabase > Settings > API > CORS
```

### Logging

**Frontend** :

```typescript
// Utiliser console.error pour erreurs
try {
  await supabase.from('articles').insert(data);
} catch (error) {
  console.error('Failed to create article:', error);
  // Optionnel : Log vers Sentry, LogRocket
}
```

**Backend (Supabase Edge Functions)** :

```typescript
console.log('Function called with:', request);
console.error('Error occurred:', error);
```

**Netlify Functions** :

```javascript
exports.handler = async (event) => {
  console.log('Event:', event);

  try {
    // Logic
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

---

## Logs et monitoring

### Netlify Logs

**Accès** :
1. Netlify Dashboard
2. Site > Deploys
3. Cliquer sur un déploiement
4. Voir les logs complets

**Logs de fonctions** :
1. Netlify Dashboard
2. Functions
3. Sélectionner une fonction
4. Real-time logs

### Supabase Logs

**Accès** :
1. Supabase Dashboard
2. Logs (menu gauche)
3. Filtrer par :
   - API requests
   - Database logs
   - Edge Functions
   - Auth

**Query performance** :
- Database > Query Performance
- Identifier les requêtes lentes
- Optimiser (indexes, requêtes)

### Browser Logs

**Chrome DevTools** :
- Console : Errors, warnings, logs
- Network : Requêtes API, timing
- Performance : Profiling, bottlenecks

### Monitoring externe (optionnel)

**Services recommandés** :

1. **Uptime monitoring** : UptimeRobot, Pingdom
2. **Error tracking** : Sentry, Bugsnag
3. **Analytics** : Google Analytics 4
4. **Performance** : Lighthouse CI, WebPageTest

**Configuration Sentry (exemple)** :

```bash
npm install @sentry/react

# src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://xxx@sentry.io/xxx',
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.1,
});
```

---

## Sécurité

### Checklist sécurité

#### Mensuel

- [ ] `npm audit` : 0 vulnérabilités critiques
- [ ] Vérifier certificat SSL (expiration)
- [ ] Review logs Supabase (tentatives d'intrusion)
- [ ] Vérifier CORS policies
- [ ] Tester formulaires (injection, XSS)

#### Trimestriel

- [ ] Audit sécurité complet (OWASP Top 10)
- [ ] Penetration testing (optionnel)
- [ ] Review Row Level Security (RLS)
- [ ] Rotation des secrets (API keys)
- [ ] Vérifier permissions admin

### npm audit

```bash
# Vérifier vulnérabilités
npm audit

# Corriger automatiquement (patch/minor)
npm audit fix

# Corriger avec breaking changes
npm audit fix --force

# Rapport détaillé
npm audit --json > security-report.json
```

**Si vulnérabilité critique** :
1. Identifier le package
2. Vérifier si fix disponible
3. Mettre à jour immédiatement
4. Si pas de fix : Trouver alternative ou mitigation

### Headers de sécurité

**Vérifier** :

```bash
curl -I https://novahypnose.fr

# Doit contenir :
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
# X-Content-Type-Options: nosniff
# Referrer-Policy: strict-origin-when-cross-origin
# Strict-Transport-Security: max-age=31536000
```

**Configuration** : `netlify.toml`

### Supabase Security

**RLS (Row Level Security)** :

```sql
-- Vérifier que RLS est activé
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Toutes les tables doivent avoir rowsecurity = true
```

**Policies review** :

```sql
-- Lister toutes les policies
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';

-- Vérifier qu'aucune table n'a de politique "allow all"
```

**Auth** :

- Supabase Dashboard > Authentication > Policies
- Vérifier email verification activée
- Rate limiting actif
- Password strength minimum

### Secrets management

**Ne jamais commiter** :
- `.env`
- API keys privées
- Tokens d'accès
- Mots de passe

**Vérifier .gitignore** :

```bash
# .gitignore
.env
.env.local
.env.*.local
*.key
*.pem
```

**Rotation des secrets** (tous les 6 mois) :
1. Générer nouveau secret
2. Mettre à jour Netlify > Environment variables
3. Rebuild
4. Révoquer ancien secret

---

## Performance

### Metrics à surveiller

| Métrique | Seuil | Outil |
|----------|-------|-------|
| Lighthouse Performance | > 90 | Lighthouse |
| LCP (Largest Contentful Paint) | < 2.5s | Chrome DevTools |
| FID (First Input Delay) | < 100ms | Chrome DevTools |
| CLS (Cumulative Layout Shift) | < 0.1 | Chrome DevTools |
| Time to Interactive (TTI) | < 3.5s | Lighthouse |
| Bundle size (JS) | < 500 KB | Vite build |

### Optimisations courantes

#### Images

```bash
# Convertir en WebP
npm install -g sharp-cli
sharp input.jpg -o output.webp

# Compression
# Utiliser https://squoosh.app/
# Ou TinyPNG
```

#### Code Splitting

```typescript
// Lazy load routes
const BlogIndex = lazy(() => import('@/pages/blog/BlogIndex'));

// Dynamic imports
const loadHeavyModule = async () => {
  const module = await import('./heavyModule');
  return module.default;
};
```

#### Cache

**Vérifier headers de cache** :

```bash
curl -I https://novahypnose.fr/assets/index.js

# Doit contenir :
# Cache-Control: public, max-age=31536000, immutable
```

#### Bundle analysis

```bash
npm run build

# Voir rapport dans la console
# Identifier les gros chunks
# Optimiser ou code-split
```

---

## Backups

### Stratégie de backup

**Quotidien** :
- Supabase : Backup automatique (7 jours retention)
- GitHub : Code versionné

**Hebdomadaire** :
- Télécharger backup Supabase manuellement
- Stocker sur Google Drive/Dropbox

**Mensuel** :
- Backup complet (DB + Storage)
- Archivage long terme

### Backup Supabase

**Via Dashboard** :
1. Supabase Dashboard
2. Database > Backups
3. Sélectionner backup
4. Download ou Restore

**Via pg_dump** :

```bash
pg_dump -h db.akrlyzmfszumibwgocae.supabase.co \
  -U postgres \
  -d postgres \
  -F c \
  -f backup_$(date +%Y%m%d).dump
```

### Backup GitHub

**Code déjà versionné** :

```bash
# Clone complet
git clone https://github.com/ittanez/nova-hypno-textes-fr.git backup/

# Ou télécharger ZIP
# GitHub > Code > Download ZIP
```

### Restore

**Database** :

```bash
pg_restore -h db.akrlyzmfszumibwgocae.supabase.co \
  -U postgres \
  -d postgres \
  -c \
  backup_20251006.dump
```

**Code** :

```bash
# Revenir à un commit spécifique
git checkout <commit-hash>

# Ou restaurer un fichier
git checkout <commit-hash> -- path/to/file
```

---

## Checklist de maintenance générale

### Daily

- [ ] Site accessible
- [ ] Pas d'erreurs de build
- [ ] Emails et notifications

### Weekly

- [ ] Lighthouse audit
- [ ] Analytics review
- [ ] SEO check (Search Console)
- [ ] Security audit (npm audit)

### Monthly

- [ ] Update dependencies
- [ ] Full audit (performance, SEO, a11y, security)
- [ ] Database optimization
- [ ] Backup verification
- [ ] Rapport mensuel

---

## Ressources

- [Netlify Status](https://www.netlifystatus.com/)
- [Supabase Status](https://status.supabase.com/)
- [Google Search Console](https://search.google.com/search-console)
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)

---

**Dernière mise à jour** : 6 octobre 2025
**Maintenu par** : Équipe NovaHypnose
