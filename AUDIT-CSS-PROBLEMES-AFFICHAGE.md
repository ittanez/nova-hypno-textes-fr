# AUDIT CSS - NOVAHYPNOSE.FR
## Problèmes d'affichage identifiés

**Date** : 2025-11-26
**Urgence** : 🔴 CRITIQUE
**Impact** : Photo d'accueil trop grande, erreurs d'affichage multiples

---

## 🔴 PROBLÈMES CRITIQUES (correction immédiate requise)

### PROB-CSS-001 : #root limite la largeur du site à 1280px
**Localisation** : `src/App.css:1-6`
**Code problématique** :
```css
#root {
  max-width: 1280px;    /* ❌ Limite TOUT le site à 1280px */
  margin: 0 auto;       /* ❌ Centre le contenu */
  padding: 2rem;        /* ❌ Padding sur toutes les pages */
  text-align: center;   /* ❌ Centre le texte partout */
}
```

**Impact** :
- Le site entier est limité à 1280px de large
- Le hero carousel ne peut pas être fullwidth
- Padding 2rem appliqué partout (32px de chaque côté)
- Tout le texte est centré par défaut

**Solution** :
```css
#root {
  min-height: 100vh;
  /* Supprimer max-width, margin, padding, text-align */
}
```

---

### PROB-CSS-002 : Attributs width/height forcent l'image hero à 240x135px
**Localisation** : `src/components/sections/HeroCarousel.tsx:67-70`
**Code problématique** :
```tsx
<img
  src={src}
  srcSet={srcSet}
  sizes={sizes}
  className="w-full h-full object-cover object-center"
  style={{ aspectRatio: '16/9' }}
  width="240"          // ❌ Force l'image à 240px de large
  height="135"         // ❌ Force l'image à 135px de haut
  loading={index === 0 ? "eager" : "lazy"}
/>
```

**Impact** :
- L'image est initialement rendue à 240x135px
- Le CSS `w-full h-full` essaie de l'étirer à la taille du conteneur
- Résultat : image énorme, floue, et mal dimensionnée
- Le navigateur doit redimensionner l'image de 240px à ~1920px (étirement 800%)

**Solution** :
```tsx
<img
  src={src}
  srcSet={srcSet}
  sizes={sizes}
  className="w-full h-full object-cover object-center"
  style={{ aspectRatio: '16/9' }}
  // ✅ SUPPRIMER width et height
  loading={index === 0 ? "eager" : "lazy"}
  fetchPriority={index === 0 ? "high" : "low"}
  decoding={index === 0 ? "sync" : "async"}
/>
```

---

### PROB-CSS-003 : Image par défaut (src) trop petite (240px qualité 30%)
**Localisation** : `src/lib/utils/supabaseImageTransform.ts:96`
**Code problématique** :
```typescript
return {
  // Image par défaut (mobile-first, ultra-compressée)
  src: transformSupabaseImage(url, {
    width: CAROUSEL_IMAGE_SIZES.mobile,  // ❌ 240px
    quality: 30                           // ❌ Qualité 30% trop basse
  }),
  srcSet: generateSupabaseSrcSet(...)
}
```

**Impact** :
- L'image par défaut (`src`) affichée est 240px de large avec qualité 30%
- Sur desktop, cette image 240px est étirée à 1920px
- Résultat : image extrêmement floue et pixelisée
- Le srcSet correct existe MAIS l'image par défaut est trop petite

**Solution** :
```typescript
return {
  // Image par défaut pour desktop (fallback si srcSet non supporté)
  src: transformSupabaseImage(url, {
    width: CAROUSEL_IMAGE_SIZES.desktop,  // ✅ 600px au lieu de 240px
    quality: 60                            // ✅ Qualité 60% au lieu de 30%
  }),
  srcSet: generateSupabaseSrcSet(...)
}
```

---

### PROB-CSS-004 : Conflit aspect-ratio + height:100%
**Localisation** : `index.html:103`
**Code problématique** :
```css
.hero-image-container img,
.hero-image-container video {
  width: 100%;
  height: 100%;        /* ❌ Conflit avec aspect-ratio */
  object-fit: cover;
  display: block;
  aspect-ratio: 16/9;  /* ❌ Conflit avec height:100% */
}
```

**Impact** :
- `height: 100%` force l'image à remplir le conteneur (100vh)
- `aspect-ratio: 16/9` essaie de maintenir le ratio 16:9
- Conflit : le navigateur ne sait pas quelle règle prioriser
- Résultat : comportement imprévisible selon le navigateur

**Solution** :
```css
.hero-image-container img,
.hero-image-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;  /* ✅ Couvre le conteneur en gardant le ratio */
  display: block;
  /* ✅ Supprimer aspect-ratio (géré par object-fit) */
}
```

---

## 🟡 PROBLÈMES MOYENS (à corriger rapidement)

### PROB-CSS-005 : Conflit entre public/styles.css et Tailwind
**Localisation** : `public/styles.css:57-61`
**Code** :
```css
img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}
```

**Impact** :
- Ce fichier `public/styles.css` semble être un ancien CSS non utilisé
- Il entre en conflit avec le CSS de Tailwind dans `src/index.css`
- Double définition des styles de base

**Solution** :
- Vérifier si `public/styles.css` est utilisé
- Si non utilisé → SUPPRIMER le fichier
- Si utilisé → Migrer les styles vers `src/index.css`

---

### PROB-CSS-006 : Styles duplicates dans index.html (CSS critique)
**Localisation** : `index.html:95-197`
**Impact** :
- Le CSS critique inline dans `index.html` duplique des styles Tailwind
- `.w-full`, `.h-full`, `.text-center` redéfinis alors que Tailwind les fournit déjà
- Augmente la taille du HTML initial (5.6 KB de CSS inline)

**Solution** :
- Garder uniquement les styles critiques réellement nécessaires avant React
- Supprimer les classes Tailwind redéfinies
- Exemple : garder `.hero-skeleton` mais supprimer `.w-full`, `.h-full`

---

## 🟢 OPTIMISATIONS RECOMMANDÉES

### OPT-CSS-001 : Simplifier srcSet carousel
**Localisation** : `src/lib/utils/supabaseImageTransform.ts:100-107`
**Recommandation** :
```typescript
// Augmenter les tailles pour meilleure qualité
[
  480,   // Mobile (au lieu de 240)
  768,   // Tablet (au lieu de 420)
  1024,  // Desktop (au lieu de 600)
  1536,  // Large (au lieu de 800)
],
[40, 50, 60, 70]  // Qualités augmentées
```

### OPT-CSS-002 : Supprimer App.css
**Localisation** : `src/App.css`
**Recommandation** :
- Ce fichier semble être le CSS par défaut de Vite (styles de demo)
- Il n'est probablement pas utilisé dans le projet
- **ACTION** : Supprimer complètement `src/App.css`

---

## PLAN DE CORRECTION IMMÉDIAT

### Étape 1 : Corriger #root (src/App.css)
```css
/* AVANT */
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

/* APRÈS */
#root {
  min-height: 100vh;
}
```

### Étape 2 : Supprimer width/height de l'image hero
```tsx
/* Dans HeroCarousel.tsx ligne 62-74 */
<img
  src={src}
  srcSet={srcSet}
  sizes={sizes}
  alt={slide.alt || `${slide.title} - Hypnothérapie NovaHypnose Paris 4ème`}
  className="w-full h-full object-cover object-center"
  /* SUPPRIMER : style={{ aspectRatio: '16/9' }} */
  /* SUPPRIMER : width="240" */
  /* SUPPRIMER : height="135" */
  loading={index === 0 ? "eager" : "lazy"}
  fetchPriority={index === 0 ? "high" : "low"}
  decoding={index === 0 ? "sync" : "async"}
/>
```

### Étape 3 : Augmenter taille image par défaut
```typescript
/* Dans supabaseImageTransform.ts ligne 94-114 */
export function getCarouselImageSrcSet(url: string): {
  src: string;
  srcSet: string;
  sizes: string;
} {
  return {
    // Image par défaut pour desktop (600px qualité 60%)
    src: transformSupabaseImage(url, {
      width: 600,   // ✅ Au lieu de 240
      quality: 60   // ✅ Au lieu de 30
    }),
    srcSet: generateSupabaseSrcSet(
      url,
      [480, 768, 1024, 1536],  // ✅ Tailles augmentées
      [40, 50, 60, 70]         // ✅ Qualités augmentées
    ),
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw',
  };
}
```

### Étape 4 : Corriger CSS critique index.html
```css
/* Dans index.html ligne 103 */
/* AVANT */
.hero-image-container img,.hero-image-container video{width:100%;height:100%;object-fit:cover;display:block;aspect-ratio:16/9}

/* APRÈS */
.hero-image-container img,.hero-image-container video{width:100%;height:100%;object-fit:cover;display:block}
```

---

## RÉSUMÉ DES CORRECTIONS

| Problème | Fichier | Ligne | Action | Urgence |
|----------|---------|-------|--------|---------|
| #root limite largeur | `src/App.css` | 1-6 | Supprimer max-width, margin, padding, text-align | 🔴 CRITIQUE |
| width/height forcent 240x135 | `HeroCarousel.tsx` | 67-70 | Supprimer attributs width, height, style | 🔴 CRITIQUE |
| Image src trop petite | `supabaseImageTransform.ts` | 96 | 240→600px, qualité 30→60% | 🔴 CRITIQUE |
| aspect-ratio conflit | `index.html` | 103 | Supprimer aspect-ratio:16/9 | 🔴 CRITIQUE |
| Conflit styles.css | `public/styles.css` | Tout | Vérifier utilisation, supprimer si inutile | 🟡 MOYEN |
| CSS critique dupliqué | `index.html` | 95-197 | Nettoyer classes Tailwind redéfinies | 🟡 MOYEN |

---

## IMPACT ATTENDU APRÈS CORRECTIONS

### Avant corrections
- ❌ Site limité à 1280px de large
- ❌ Image hero 240px étirée à 1920px (flou extrême)
- ❌ Padding 32px partout
- ❌ Texte centré partout

### Après corrections
- ✅ Site fullwidth responsive
- ✅ Image hero optimisée (480-1536px selon écran)
- ✅ Padding uniquement où nécessaire
- ✅ Texte aligné correctement
- ✅ Photo d'accueil nette et bien dimensionnée

---

**Temps de correction estimé** : 15-20 minutes
**Impact utilisateur** : Très élevé (photo d'accueil = premier élément vu)
**Priorité** : 🔴 URGENT - À corriger immédiatement

---

*Audit généré le 2025-11-26 par Claude Sonnet 4.5*
