# ⚡ Quick Start - Développement NovaHypnose.fr

Guide rapide pour démarrer le développement en 5 minutes.

---

## 🚀 Installation

```bash
git clone https://github.com/ittanez/nova-hypno-textes-fr.git
cd nova-hypno-textes-fr
npm install
npm run dev
```

→ Ouvrir http://localhost:5173

---

## 📝 Commandes essentielles

```bash
npm run dev          # Développement (hot reload)
npm run build        # Build production
npm run lint         # Vérifier le code
npm run test         # Tests
```

---

## 🗂️ Où trouver quoi ?

| Je veux... | Aller dans... |
|------------|---------------|
| Ajouter une page | `src/pages/` |
| Créer un composant réutilisable | `src/components/common/` |
| Créer une section de page | `src/components/sections/` (à créer) |
| Créer un hook | `src/hooks/` |
| Modifier du contenu (textes, images) | `src/data/` |
| Modifier le style global | `src/index.css` |
| Configurer Tailwind | `tailwind.config.js` |

---

## 🎯 Tâches communes

### Ajouter un slide au carrousel

**Fichier :** `src/data/carouselData.ts`

```typescript
export const carouselSlides = [
  // Slides existants...
  {
    image: 'https://url-de-limage.webp',
    title: 'NOUVEAU TITRE',
    description: 'Description du slide',
    alt: 'Description pour accessibilité'
  }
];
```

### Créer un nouveau carrousel

**1. Utiliser le hook**
```typescript
import { useCarousel } from '@/hooks/useCarousel';

const { currentIndex, goToNext, goToPrevious, goToSlide } = useCarousel(items.length);
```

**2. Utiliser le composant mobile**
```typescript
import { MobileCarousel } from '@/components/common/MobileCarousel';

<MobileCarousel
  currentIndex={currentIndex}
  totalItems={items.length}
  onNext={goToNext}
  onPrevious={goToPrevious}
  onGoToSlide={goToSlide}
>
  {items.map(item => (
    <div key={item.id} className="min-w-full px-2">
      {/* Contenu */}
    </div>
  ))}
</MobileCarousel>
```

→ **Documentation complète :** `REFACTORING.md`

### Modifier les tarifs

**Fichier :** `src/pages/Index.tsx` (ligne ~960+)

→ **À faire :** Créer `src/data/pricingData.ts` (voir `src/data/README.md`)

### Modifier les témoignages

**Fichier :** `src/pages/Index.tsx` (ligne ~1260+)

→ **À faire :** Créer `src/data/testimonialsData.ts`

### Ajouter une FAQ

**Fichier :** `src/pages/Index.tsx` (variable `faqItems`)

→ **À faire :** Créer `src/data/faqData.ts`

---

## 🎨 Composants réutilisables disponibles

### MobileCarousel
Carrousel mobile avec navigation en bas

```typescript
import { MobileCarousel } from '@/components/common/MobileCarousel';
```

### Hook useCarousel
Logique de navigation carrousel

```typescript
import { useCarousel } from '@/hooks/useCarousel';
```

### shadcn/ui
Composants UI dans `src/components/ui/`

```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
// etc.
```

---

## 🐛 Problèmes courants

### Le site ne se lance pas

```bash
rm -rf node_modules
npm install
npm run dev
```

### Erreurs TypeScript

```bash
npx tsc --noEmit  # Voir les erreurs
```

### Erreurs ESLint

```bash
npm run lint -- --fix  # Corriger auto
```

### Build échoue

```bash
rm -rf dist
npm run build
```

---

## 📚 Documentation complète

- 📖 **REFACTORING.md** - Composants réutilisables et architecture
- 📖 **CONTRIBUTING.md** - Standards de code et workflow Git
- 📖 **src/hooks/README.md** - Guide des hooks
- 📖 **src/components/common/README.md** - Guide des composants
- 📖 **src/data/README.md** - Guide des données

---

## ✅ Checklist avant commit

```bash
npm run lint      # ✅ Pas d'erreurs
npm run test      # ✅ Tests passent
npm run build     # ✅ Build OK
git add .
git commit -m "feat(scope): description"
git push
```

---

## 🆘 Besoin d'aide ?

1. Lire la doc ci-dessus
2. Chercher dans le code existant
3. Créer une issue GitHub

---

## 🎯 Prochaines tâches recommandées

**Urgent :**
- [ ] Corriger 13 erreurs ESLint
- [ ] Exécuter `npm audit fix`
- [ ] Ajouter `alt` sur images du carrousel

**Important :**
- [ ] Créer `src/data/pricingData.ts`
- [ ] Créer `src/data/testimonialsData.ts`
- [ ] Créer `src/data/faqData.ts`
- [ ] Diviser `Index.tsx` en sections

**Amélioration :**
- [ ] Augmenter couverture tests
- [ ] Ajouter Storybook
- [ ] Optimiser images
- [ ] Ajouter PWA

→ **Voir audit complet :** Demander un audit code complet

---

**Bon développement ! 🚀**
