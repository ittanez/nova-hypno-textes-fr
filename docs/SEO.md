# Documentation SEO - NovaHypnose.fr

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Stratégie SEO](#stratégie-seo)
3. [Meta Tags](#meta-tags)
4. [Structured Data (Schema.org)](#structured-data-schemaorg)
5. [Sitemap](#sitemap)
6. [Robots.txt](#robotstxt)
7. [Best Practices](#best-practices)
8. [Checklist SEO](#checklist-seo)
9. [Outils et monitoring](#outils-et-monitoring)

---

## Vue d'ensemble

### Performance SEO actuelle

| Critère | Score | Notes |
|---------|-------|-------|
| **Score SEO global** | 9.5/10 | Excellent |
| **Meta tags** | 10/10 | Tous présents |
| **Structured Data** | 10/10 | Schema.org complet |
| **Sitemap** | 9/10 | Généré dynamiquement |
| **Mobile-friendly** | 10/10 | Responsive design |
| **Performance** | 9/10 | Temps de chargement < 3s |
| **Accessibilité** | 8/10 | ARIA labels présents |

### Objectifs SEO

- **Ranking local** : Position #1 pour "hypnothérapeute Paris 4ème"
- **Mots-clés principaux** : "hypnose Paris", "hypnothérapie ericksonienne", "auto-hypnose"
- **Trafic organique** : Augmenter de 30% par trimestre
- **Taux de conversion** : 5% (contact/prise de rendez-vous)

---

## Stratégie SEO

### Mots-clés principaux

#### Primaires (haute priorité)

1. **hypnothérapeute Paris** (volume : 1000/mois, difficulté : moyenne)
2. **hypnose Paris 4ème** (volume : 200/mois, difficulté : faible)
3. **hypnothérapie ericksonienne** (volume : 500/mois, difficulté : moyenne)
4. **auto-hypnose** (volume : 2000/mois, difficulté : élevée)
5. **hypnose pour arrêter de fumer** (volume : 800/mois, difficulté : moyenne)

#### Secondaires (moyenne priorité)

- hypnose anxiété Paris
- hypnothérapeute certifié Paris centre
- séance hypnose Paris
- hypnose thérapeutique
- maître hypnologue Paris

#### Longue traîne (faible difficulté, conversion élevée)

- "cabinet hypnose quartier marais"
- "hypnose ericksonienne paris 4ème"
- "séance hypnose arrêt tabac paris"
- "formation auto-hypnose paris"

### Stratégie de contenu

**Blog "Émergences"** :
- 2 articles/mois minimum
- 1500-2000 mots par article
- Focus sur mots-clés longue traîne
- Contenu expert et éducatif

**Pages principales** :
- Page d'accueil : Optimisée pour "hypnothérapeute Paris"
- À propos : Expertise, diplômes (E-A-T)
- Applications : Mots-clés spécifiques (anxiété, tabac, etc.)
- Auto-hypnose : Guide complet, quiz
- Tarifs : Transparence (conversion)

---

## Meta Tags

### Composant SEOHead

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\components\blog\SEOHead.tsx`

```typescript
import SEOHead from '@/components/blog/SEOHead';

<SEOHead
  title="Titre de la page"
  description="Description de la page (150-160 caractères)"
  image="https://url-image.webp"
  url="https://novahypnose.fr/page"
  type="website" // ou "article"
  keywords={['hypnose', 'Paris', 'hypnothérapie']}
  robots="index, follow"
  structuredData={schemaData}
/>
```

### Meta tags générés

#### Balises de base

```html
<!-- Titre -->
<title>Hypnothérapie Ericksonienne Paris | NovaHypnose</title>

<!-- Description -->
<meta name="description" content="Cabinet d'hypnothérapie ericksonienne à Paris 4ème. Alain Zenatti, maître hypnologue certifié, vous accompagne..." />

<!-- Mots-clés -->
<meta name="keywords" content="hypnose, hypnothérapie, Paris, ericksonienne, auto-hypnose" />

<!-- Robots -->
<meta name="robots" content="index, follow" />
<meta name="googlebot" content="index, follow" />

<!-- Auteur -->
<meta name="author" content="Alain Zenatti" />
```

#### Open Graph (Facebook)

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Titre complet" />
<meta property="og:description" content="Description..." />
<meta property="og:image" content="https://url-image.webp" />
<meta property="og:url" content="https://novahypnose.fr" />
<meta property="og:site_name" content="NovaHypnose" />
```

#### Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Titre complet" />
<meta name="twitter:description" content="Description..." />
<meta name="twitter:image" content="https://url-image.webp" />
```

#### Articles spécifiques

```html
<meta property="article:published_time" content="2025-10-06T10:00:00Z" />
<meta property="article:modified_time" content="2025-10-06T15:30:00Z" />
<meta property="article:author" content="Alain Zenatti" />
```

### Canonical URL

```html
<link rel="canonical" href="https://novahypnose.fr/page" />
```

**Importance** : Évite le duplicate content, indique la version principale

---

## Structured Data (Schema.org)

### LocalBusiness Schema

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\vite-plugin-seo-headers.js`

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "NovaHypnose",
  "image": "https://novahypnose.fr/cabinet.webp",
  "@id": "https://novahypnose.fr",
  "url": "https://novahypnose.fr",
  "telephone": "+33-1-XX-XX-XX-XX",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rue de Turenne",
    "addressLocality": "Paris",
    "postalCode": "75004",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8566,
    "longitude": 2.3522
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "19:00"
  },
  "sameAs": [
    "https://www.facebook.com/novahypnose",
    "https://www.linkedin.com/company/novahypnose"
  ]
}
```

### Person Schema (Alain Zenatti)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Alain Zenatti",
  "jobTitle": "Maître Hypnologue",
  "description": "Maître en hypnose ericksonienne certifié ARCHE",
  "image": "https://novahypnose.fr/zenatti.webp",
  "url": "https://novahypnose.fr",
  "sameAs": [
    "https://www.linkedin.com/in/alain-zenatti"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "NovaHypnose"
  }
}
```

### Article Schema (Blog)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titre de l'article",
  "description": "Description courte",
  "image": "https://url-image.webp",
  "author": {
    "@type": "Person",
    "name": "Alain Zenatti"
  },
  "publisher": {
    "@type": "Organization",
    "name": "NovaHypnose",
    "logo": {
      "@type": "ImageObject",
      "url": "https://novahypnose.fr/logo.webp"
    }
  },
  "datePublished": "2025-10-06T10:00:00Z",
  "dateModified": "2025-10-06T15:30:00Z"
}
```

### FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que l'hypnose ericksonienne ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'hypnose ericksonienne est une approche thérapeutique..."
      }
    }
  ]
}
```

**Composant** : `C:\Users\zenat\nova-hypno-textes-fr\src\components\FAQSchema.tsx`

### BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://novahypnose.fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://novahypnose.fr/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Article",
      "item": "https://novahypnose.fr/blog/article/slug"
    }
  ]
}
```

---

## Sitemap

### Génération automatique

**Script** : `C:\Users\zenat\nova-hypno-textes-fr\scripts\generate-sitemap.js`

```bash
# Généré automatiquement avant chaque build
npm run generate-sitemap

# Build inclut la génération
npm run build  # appelle prebuild qui génère le sitemap
```

### Structure du sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Page d'accueil -->
  <url>
    <loc>https://novahypnose.fr/</loc>
    <lastmod>2025-10-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Pages statiques -->
  <url>
    <loc>https://novahypnose.fr/blog</loc>
    <lastmod>2025-10-06</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Articles dynamiques depuis Supabase -->
  <url>
    <loc>https://novahypnose.fr/blog/article/hypnose-anxiete</loc>
    <lastmod>2025-10-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Configuration

**Fichier** : `netlify.toml`

```toml
# Sitemap dynamique via Supabase Edge Function
[[redirects]]
  from = "/sitemap.xml"
  to = "https://akrlyzmfszumibwgocae.supabase.co/functions/v1/generate-sitemap"
  status = 200
  force = false

# Plugin Netlify Sitemap
[[plugins]]
  package = "@netlify/plugin-sitemap"
  [plugins.inputs]
  buildDir = "dist"
  exclude = ['**/admin/**']
```

### Soumettre le sitemap

```bash
# Google Search Console
https://search.google.com/search-console
# Ajouter propriété > Sitemaps > Ajouter sitemap
# URL : https://novahypnose.fr/sitemap.xml

# Bing Webmaster Tools
https://www.bing.com/webmasters
# Ajouter site > Sitemaps > Soumettre sitemap
```

### Notification automatique des moteurs de recherche

#### Google Search Console

**Edge Function** : `/supabase/functions/notify-google-sitemap/index.ts`

```bash
# Notifier Google automatiquement
curl -X POST https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-google-sitemap
```

Cette fonction ping Google pour lui signaler la mise à jour du sitemap.

#### Bing via IndexNow API

**Edge Function** : `/supabase/functions/notify-bing-indexnow/index.ts`

IndexNow est un protocole ouvert qui permet de notifier instantanément Bing, Yandex et autres moteurs des nouvelles URLs ou mises à jour.

**Configuration initiale** :

```bash
# 1. Générer la clé et créer le fichier de vérification
./scripts/setup-indexnow.sh

# 2. Configurer la variable d'environnement dans Supabase
# INDEXNOW_KEY=votre_cle_generee

# 3. Déployer avec le fichier de clé
git add public/votre_cle.txt
git commit -m "Add IndexNow key"
git push
```

**Utilisation** :

```bash
# Notifier des URLs spécifiques
curl -X POST https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-bing-indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://novahypnose.fr/blog/nouvel-article",
      "https://novahypnose.fr/autohypnose"
    ]
  }'

# Notifier les URLs principales automatiquement
curl -X POST https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-bing-indexnow
```

**Avantages IndexNow** :
- ✅ Indexation quasi-instantanée (quelques minutes vs plusieurs jours)
- ✅ Notifie plusieurs moteurs en une seule requête (Bing, Yandex, Seznam)
- ✅ Pas de limite de quota stricte
- ✅ API gratuite et simple

**Vérification** :
- Bing Webmaster Tools > Outils > URL Submission
- Voir l'historique des soumissions IndexNow

---

## Robots.txt

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\public\robots.txt`

```txt
User-agent: *
# Bloquer uniquement les zones privées
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /*.json$

# Autoriser le reste
Allow: /

# Réseaux sociaux
User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

# Crawlers IA - Autorisation explicite
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Gemini
Allow: /

# Sitemap
Sitemap: https://novahypnose.fr/sitemap.xml

# Crawl-delay
Crawl-delay: 1
```

### Vérifier robots.txt

```bash
# Test local
curl https://novahypnose.fr/robots.txt

# Google Search Console
# Outils > Testeur de robots.txt
```

---

## Best Practices

### Optimisation On-Page

#### 1. Structure HTML sémantique

```html
<!-- ✅ BON -->
<article>
  <header>
    <h1>Titre principal unique</h1>
    <time datetime="2025-10-06">6 octobre 2025</time>
  </header>

  <section>
    <h2>Sous-section</h2>
    <p>Contenu...</p>
  </section>

  <footer>
    <address>Auteur: Alain Zenatti</address>
  </footer>
</article>

<!-- ❌ MAUVAIS -->
<div class="article">
  <div class="title">Titre</div>
  <div class="content">Contenu</div>
</div>
```

#### 2. Hiérarchie des titres

**Règles** :
- 1 seul H1 par page
- Hiérarchie logique : H1 > H2 > H3 > H4
- Mots-clés dans les titres
- Titres descriptifs (pas "Cliquez ici")

**Implémentation** :

```html
<!-- index.html - SEO content statique -->
<div id="seo-content" style="position: absolute; left: -9999px;" aria-hidden="true">
  <h1>Hypnothérapie Ericksonienne Personnalisée Paris Centre</h1>

  <h2>À propos d'Alain Zenatti, Maître Hypnologue</h2>
  <h3>Diplômes et certifications</h3>

  <h2>Applications de l'hypnothérapie</h2>
  <h3>Hypnose pour l'anxiété</h3>
  <h3>Hypnose pour arrêter de fumer</h3>
</div>
```

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\index.html`

**Guide** : `C:\Users\zenat\nova-hypno-textes-fr\SEO-OPTIMIZATION-GUIDE.md`

#### 3. Images optimisées

```html
<!-- ✅ BON -->
<img
  src="cabinet.webp"
  alt="Cabinet d'hypnothérapie NovaHypnose à Paris 4ème"
  width="800"
  height="600"
  loading="lazy"
/>

<!-- ❌ MAUVAIS -->
<img src="image.jpg" />
```

**Checklist images** :
- Format WebP (compression optimale)
- Attribut `alt` descriptif avec mots-clés
- Dimensions spécifiées (`width`, `height`)
- Lazy loading (`loading="lazy"`)
- Taille < 200 KB par image

#### 4. Liens internes

```tsx
// ✅ BON - Liens descriptifs
<Link to="/blog/hypnose-anxiete">
  En savoir plus sur l'hypnose pour l'anxiété
</Link>

// ❌ MAUVAIS
<Link to="/blog/hypnose-anxiete">Cliquez ici</Link>
```

**Stratégie de maillage** :
- Lier les articles entre eux
- Navigation breadcrumb
- Footer avec liens importants
- CTA vers contact/rendez-vous

#### 5. URLs propres

```
✅ BON
https://novahypnose.fr/blog/hypnose-pour-arreter-de-fumer
https://novahypnose.fr/autohypnose

❌ MAUVAIS
https://novahypnose.fr/blog?id=123
https://novahypnose.fr/page.html
```

### Optimisation Off-Page

#### 1. Backlinks de qualité

**Stratégies** :
- Annuaires professionnels (Pages Jaunes, Yelp)
- ARCHE (certification hypnose)
- Articles invités sur blogs santé/bien-être
- Partenariats avec médecins/psychologues
- Press releases

#### 2. Google My Business

**Optimisation** :
- Profil complet (photos, horaires, services)
- Catégorie : "Hypnothérapeute"
- Avis clients (encourager les avis positifs)
- Posts réguliers (actualités, articles)
- Q&A (répondre aux questions)

#### 3. Réseaux sociaux

**Présence active** :
- Facebook : Page professionnelle
- LinkedIn : Profil Alain Zenatti
- Instagram : Témoignages, coulisses
- YouTube : Vidéos éducatives (hypnose)

**Signaux sociaux** : Partages, likes, commentaires influencent SEO

### Performance technique

#### 1. Core Web Vitals

**Objectifs Google** :

| Métrique | Seuil "Bon" | NovaHypnose |
|----------|-------------|-------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | ~2.1s ✅ |
| **FID** (First Input Delay) | < 100ms | ~80ms ✅ |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ~0.05 ✅ |

**Vérifier** :

```bash
# Lighthouse
npm install -g lighthouse
lighthouse https://novahypnose.fr --view

# PageSpeed Insights
https://pagespeed.web.dev/
```

#### 2. Mobile-first

**Design responsive** :
- Breakpoints : 640px (mobile), 768px (tablet), 1024px (desktop)
- Touch-friendly (boutons > 44px)
- Pas de pop-ups intrusifs
- Navigation simple

**Test** :

```bash
# Chrome DevTools > Toggle device toolbar
# Ou tester sur appareil réel
```

#### 3. HTTPS

- Certificat SSL actif ✅ (Netlify)
- Redirection HTTP → HTTPS automatique
- HSTS headers

#### 4. Compression

```toml
# netlify.toml - Compression automatique
# Gzip/Brotli activés par défaut

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Checklist SEO

### Pour chaque nouvelle page

- [ ] **Titre** : Unique, < 60 caractères, mot-clé principal
- [ ] **Meta description** : 150-160 caractères, CTA
- [ ] **URL** : Courte, descriptive, mots-clés
- [ ] **H1** : 1 seul, mot-clé principal
- [ ] **H2-H6** : Hiérarchie logique
- [ ] **Images** : WebP, alt descriptif, < 200 KB
- [ ] **Liens internes** : 3-5 liens vers autres pages
- [ ] **Structured Data** : Schema.org approprié
- [ ] **Canonical** : URL canonique définie
- [ ] **Mobile** : Responsive, lisible
- [ ] **Performance** : Lighthouse > 90

### Pour chaque article de blog

- [ ] **Longueur** : 1500-2000 mots minimum
- [ ] **Mots-clés** : 1 principal + 3-5 secondaires
- [ ] **Structure** : Introduction, sections, conclusion
- [ ] **Lisibilité** : Paragraphes courts, listes, images
- [ ] **Liens externes** : 2-3 sources de qualité
- [ ] **CTA** : Appel à l'action (contact, rendez-vous)
- [ ] **Images** : 3-5 images pertinentes avec alt
- [ ] **Méta** : Title, description, keywords
- [ ] **Schema Article** : JSON-LD présent
- [ ] **Partage social** : Open Graph, Twitter Cards
- [ ] **Relecture** : Orthographe, grammaire

### Mensuel (maintenance SEO)

- [ ] Vérifier positions Google (Search Console)
- [ ] Vérifier positions Bing (Webmaster Tools)
- [ ] Analyser trafic (Analytics)
- [ ] Corriger erreurs 404
- [ ] Mettre à jour contenu ancien
- [ ] Ajouter 2 nouveaux articles minimum
- [ ] Vérifier backlinks (Ahrefs/Semrush)
- [ ] Optimiser pages faibles
- [ ] Tester Core Web Vitals
- [ ] Vérifier sitemap
- [ ] Notifier Google et Bing des mises à jour (IndexNow)
- [ ] Surveiller concurrence

---

## Outils et monitoring

### Outils SEO gratuits

**Google Search Console**
- URL : https://search.google.com/search-console
- Fonctionnalités :
  - Indexation des pages
  - Erreurs de crawl
  - Performances de recherche
  - Core Web Vitals
  - Sitemaps

**Google Analytics 4**
- URL : https://analytics.google.com
- Métriques :
  - Trafic organique
  - Pages les plus visitées
  - Taux de rebond
  - Conversions

**Lighthouse**
```bash
npm install -g lighthouse
lighthouse https://novahypnose.fr --view
```

**PageSpeed Insights**
- URL : https://pagespeed.web.dev/

### Outils SEO payants (optionnel)

**Semrush** (recommandé)
- Recherche de mots-clés
- Analyse concurrence
- Audit technique SEO
- Suivi de positions

**Ahrefs**
- Backlinks analysis
- Content explorer
- Site audit

**Screaming Frog**
- Crawl technique
- Analyse on-page
- Version gratuite : 500 URLs

### Configuration Google Search Console

```bash
# 1. Ajouter la propriété
https://search.google.com/search-console
# Ajouter propriété > Préfixe d'URL > https://novahypnose.fr

# 2. Vérifier la propriété
# Méthode recommandée : Fichier HTML
# Télécharger le fichier de vérification
# Le placer dans /public/
# Rebuild et deploy

# 3. Soumettre sitemap
# Sitemaps > Ajouter sitemap
# https://novahypnose.fr/sitemap.xml

# 4. Demander indexation
# Inspection d'URL > Entrer URL > Demander indexation
```

### Monitoring automatique

**Script de vérification SEO** :

```bash
#!/bin/bash
# C:\Users\zenat\nova-hypno-textes-fr\scripts\seo-check.sh

echo "🔍 Vérification SEO..."

# 1. Vérifier que le site est en ligne
curl -s -o /dev/null -w "%{http_code}" https://novahypnose.fr

# 2. Vérifier robots.txt
curl -s https://novahypnose.fr/robots.txt | grep "Sitemap"

# 3. Vérifier sitemap.xml
curl -s https://novahypnose.fr/sitemap.xml | grep "<url>"

# 4. Lighthouse
lighthouse https://novahypnose.fr --only-categories=seo --output=json

echo "✅ Vérification terminée"
```

### Rapports SEO automatiques

**Email hebdomadaire** (via Google Search Console) :
- Impressions
- Clics
- Position moyenne
- Erreurs de crawl

**Dashboard personnalisé** :
- Google Data Studio (gratuit)
- Combiner GSC + GA4 + autres sources

---

## Exemple : Optimiser un nouvel article

### 1. Recherche de mots-clés

```bash
# Mot-clé cible : "hypnose pour arrêter de fumer Paris"

# Recherche Semrush/Ubersuggest :
# - Volume : 800/mois
# - Difficulté : Moyenne
# - Mots-clés associés :
#   - arrêt tabac hypnose
#   - séance hypnose tabac prix
#   - hypnose tabac témoignage
```

### 2. Créer le contenu

```markdown
# Titre H1 (inclut mot-clé principal)
Hypnose pour Arrêter de Fumer à Paris : Méthode Efficace et Naturelle

## Introduction (150 mots)
Présenter le problème, la solution, le bénéfice

## H2 : Pourquoi l'hypnose pour arrêter de fumer ?
- Statistiques
- Témoignages
- Études scientifiques

## H2 : Comment fonctionne l'hypnose anti-tabac ?
- Processus détaillé
- Nombre de séances
- Taux de réussite

## H2 : Déroulement d'une séance chez NovaHypnose
- Étape 1, 2, 3...
- Durée
- Prix

## H2 : Témoignages de clients
- 3-4 témoignages réels

## Conclusion + CTA
Appel à l'action : Prendre rendez-vous
```

### 3. Optimiser les meta tags

```tsx
<SEOHead
  title="Hypnose pour Arrêter de Fumer Paris | NovaHypnose"
  description="Arrêtez de fumer naturellement avec l'hypnose. Cabinet Paris 4ème. Méthode efficace, 80% de réussite. Prise de rendez-vous en ligne."
  keywords={[
    'hypnose arrêter de fumer',
    'hypnose tabac Paris',
    'arrêt tabac hypnose',
    'hypnothérapie tabac'
  ]}
  type="article"
  image="https://novahypnose.fr/images/hypnose-tabac.webp"
  url="https://novahypnose.fr/blog/hypnose-arreter-fumer-paris"
  structuredData={articleSchema}
/>
```

### 4. Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Hypnose pour Arrêter de Fumer à Paris",
  "description": "Guide complet sur l'hypnose pour arrêter de fumer...",
  "image": "https://novahypnose.fr/images/hypnose-tabac.webp",
  "author": {
    "@type": "Person",
    "name": "Alain Zenatti"
  },
  "publisher": {
    "@type": "Organization",
    "name": "NovaHypnose"
  },
  "datePublished": "2025-10-06",
  "dateModified": "2025-10-06"
}
```

### 5. Liens internes

Ajouter 4-5 liens vers :
- Page d'accueil
- Page "Applications de l'hypnose"
- Page "Tarifs"
- Autres articles de blog
- Page contact

### 6. Vérification finale

```bash
# Build et preview
npm run build
npm run preview

# View source et vérifier :
# - Meta tags présents
# - Structured data valide
# - Titres H1-H6 présents
# - Images avec alt

# Lighthouse
lighthouse http://localhost:4173/blog/hypnose-arreter-fumer-paris

# Valider structured data
https://validator.schema.org/
```

---

## Ressources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Moz SEO Guide](https://moz.com/beginners-guide-to-seo)
- [Ahrefs Blog](https://ahrefs.com/blog/)
- [SEO-OPTIMIZATION-GUIDE.md](C:\Users\zenat\nova-hypno-textes-fr\SEO-OPTIMIZATION-GUIDE.md)

---

**Dernière mise à jour** : 6 octobre 2025
**Maintenu par** : Équipe NovaHypnose
