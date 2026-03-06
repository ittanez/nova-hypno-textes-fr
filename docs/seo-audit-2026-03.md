# Audit SEO & Performance - NovaHypnose.fr
## Date : Mars 2026 | Stack : Vite + React SPA sur Netlify

---

## Resultats estimes Core Web Vitals

| Metrique | Cible | Estime | Score |
|----------|-------|--------|-------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5-4.0s (3G) | NEEDS IMPROVEMENT |
| INP (Interaction to Next Paint) | < 200ms | 100-200ms | GOOD |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.01-0.05 | GOOD |

---

## 1. Points forts

### Code splitting
- Chunks vendor granulaires : react, ui, router, supabase, icons, utils
- Asset naming avec hash pour invalidation selective
- esbuild minification, CSS code split, lazy loading routes admin/blog

### Images
- WebP via Supabase Storage avec compression adaptive (40-70% selon taille)
- srcset responsive (480w, 768w, 1024w, 1536w) avec sizes adaptatifs
- Slide 1 Hero : `loading="eager"` + `fetchPriority="high"` + `decoding="sync"`
- YouTube et Google Maps en lazy (IntersectionObserver)

### CSS critique
- 178 lignes de CSS inline dans index.html (hero, skeleton, typographie)
- Plugin deferCss convertit stylesheets en `media="print"` puis bascule
- Polices @fontsource auto-hebergees + Font Loading API + fallback 3s

### Resource hints
- Preconnect Supabase (avec crossorigin), Google Maps, YouTube
- Preload image LCP avec srcset/sizes complet et aligne

### Cache Netlify
- Assets hashes : `max-age=31536000, immutable`
- HTML : `no-cache, must-revalidate`
- Fonts woff2 : 1 an immutable
- Security headers complets (HSTS, X-Frame-Options, CSP, Permissions-Policy)

### Stabilite visuelle (CLS)
- Dimensions fixes pour hero (85vh, min 600px), texte carousel, boutons
- Absolute positioning pour contenu dynamique
- Skeleton visible avant hydration React

### Mobile
- Viewport correct, breakpoints mobile-first Tailwind
- Touch targets WCAG 44x44px
- Zoom non desactive (accessible)

### Donnees structurees
- Schema.org LocalBusiness/HealthAndBeautyBusiness complet
- FAQSchema, Breadcrumb, Person, AggregateRating
- JSON-LD genere par React Helmet

---

## 2. Problemes identifies et corrections

### CRITIQUE - RGPD : Scripts tiers sans consentement

**Probleme** : Google Analytics et Lucky Orange charges apres 8s sans consentement utilisateur.
Lucky Orange capture sessions (clics, scrolls, frappes) = donnees personnelles.

**Correction appliquee** : Lucky Orange conditionne au consentement (`analytics_consent` localStorage).
A faire : implementer un bandeau cookie complet pour GA4 + Lucky Orange.

### IMPORTANT - CSP `unsafe-eval`

**Probleme** : La Content Security Policy autorise `unsafe-eval`, potentiellement pour TinyMCE (admin).
**Recommandation** : Verifier si TinyMCE necessite `unsafe-eval` et restreindre au scope admin si possible.

### IMPORTANT - Preload fonts manquant

**Probleme** : Les polices Poppins et Playfair Display ne sont pas preloadees, causant un FOUT de 100-300ms.
**Correction appliquee** : Ajout de `<link rel="preload">` pour les 3 fichiers woff2 critiques.

### MOYEN - LCP sur reseaux lents

**Probleme** : LCP estime a 2.5-4s sur 3G lent (hydration React + image Supabase).
**Recommandations** :
- Considerer LQIP (Low Quality Image Placeholder) en base64 blur
- Evaluer `font-display: optional` pour eliminer FOIT
- Mesurer taille reelle avec `npm run build && npx rollup-plugin-visualizer`

### MOYEN - Lucide-react tree-shaking

**Probleme** : 462 icones potentiellement importees. Tree-shaking a verifier.
**Recommandation** : Auditer les imports Lucide, utiliser imports directs si necessaire :
```js
import { Calendar } from 'lucide-react/dist/esm/icons/calendar'
```

### MINEUR - ImageKit disponible mais inutilise

Le fichier `src/lib/utils/imagekit.ts` contient des fonctions pretes mais non utilisees.
Decision : activer ImageKit pour transformations avancees ou supprimer le code mort.

### MINEUR - Lucky Orange performance

Impact estime : +150-300 KiB reseau, +20-50ms INP, +5-10% CPU.
Si les donnees de session recording ne sont pas activement utilisees, considerer sa suppression.

---

## 3. Score global estime

| Categorie | Score | Notes |
|-----------|-------|-------|
| Performance | 75-85/100 | LCP ameliorable sur mobile/3G |
| SEO | 85-90/100 | Structure excellente, schema.org complet |
| Accessibilite | 80-85/100 | WCAG AA couleurs, touch targets OK |
| Best Practices | 75-80/100 | Security OK, CSP a renforcer |

---

## 4. Actions prioritaires

1. [ ] Implementer bandeau cookie RGPD complet (GA4 + Lucky Orange)
2. [ ] Mesurer bundle reel post-build (`npx vite-bundle-visualizer`)
3. [ ] Tester Core Web Vitals sur devices reels (Chrome DevTools, PageSpeed Insights)
4. [ ] Auditer imports Lucide-react pour tree-shaking
5. [ ] Evaluer suppression Lucky Orange si non utilise activement
6. [ ] Renforcer CSP en eliminant `unsafe-eval` si possible

---

*Fichiers analyses : vite.config.ts, index.html, netlify.toml, src/main.tsx, HeroCarousel.tsx, LazyYouTube.tsx, LazyCommuteMap.tsx, supabaseImageTransform.ts, index.css, tailwind.config.ts, schemaOrg.ts*
