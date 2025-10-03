# 📚 Documentation Refactoring - NovaHypnose.fr

## 🎯 Vue d'ensemble

Cette documentation explique les composants réutilisables créés pour améliorer la maintenabilité du site.

---

## 🔧 Hook useCarousel

### Localisation
`src/hooks/useCarousel.tsx`

### Description
Hook personnalisé pour gérer la logique de navigation des carrousels (diaporamas).

### Utilisation

```typescript
import { useCarousel } from '@/hooks/useCarousel';

// Dans votre composant
const MyComponent = () => {
  const { currentIndex, goToNext, goToPrevious, goToSlide } = useCarousel(5); // 5 = nombre de slides

  return (
    <div>
      <button onClick={goToPrevious}>Précédent</button>
      <div>Slide {currentIndex + 1}</div>
      <button onClick={goToNext}>Suivant</button>
    </div>
  );
};
```

### API

| Paramètre | Type | Description |
|-----------|------|-------------|
| `totalSlides` | `number` | Nombre total de slides dans le carrousel |

| Retour | Type | Description |
|--------|------|-------------|
| `currentIndex` | `number` | Index du slide actuel (commence à 0) |
| `goToNext` | `() => void` | Fonction pour aller au slide suivant (boucle) |
| `goToPrevious` | `() => void` | Fonction pour aller au slide précédent (boucle) |
| `goToSlide` | `(index: number) => void` | Fonction pour aller à un slide spécifique |

### Exemple complet

```typescript
import { useCarousel } from '@/hooks/useCarousel';

const Testimonials = () => {
  const testimonials = [
    { name: 'Marie', text: 'Excellent!' },
    { name: 'Pierre', text: 'Super expérience' },
    { name: 'Sophie', text: 'Je recommande' }
  ];

  const { currentIndex, goToNext, goToPrevious, goToSlide } = useCarousel(testimonials.length);

  return (
    <div>
      <div>{testimonials[currentIndex].text}</div>
      <p>- {testimonials[currentIndex].name}</p>

      <button onClick={goToPrevious}>←</button>
      <button onClick={goToNext}>→</button>

      {/* Dots navigation */}
      {testimonials.map((_, index) => (
        <button key={index} onClick={() => goToSlide(index)}>
          {index === currentIndex ? '●' : '○'}
        </button>
      ))}
    </div>
  );
};
```

### Avantages
- ✅ Réutilisable pour tous les carrousels
- ✅ Navigation circulaire automatique
- ✅ Optimisé avec `useCallback`
- ✅ Pas de dépendances externes

---

## 🎠 Composant MobileCarousel

### Localisation
`src/components/common/MobileCarousel.tsx`

### Description
Composant réutilisable pour afficher un carrousel sur mobile avec navigation en bas (flèches + dots).

### Props

| Prop | Type | Description | Requis |
|------|------|-------------|--------|
| `currentIndex` | `number` | Index du slide actuel | ✅ |
| `totalItems` | `number` | Nombre total d'items | ✅ |
| `onNext` | `() => void` | Callback pour slide suivant | ✅ |
| `onPrevious` | `() => void` | Callback pour slide précédent | ✅ |
| `onGoToSlide` | `(index: number) => void` | Callback pour aller à un slide | ✅ |
| `children` | `React.ReactNode` | Contenu des slides | ✅ |

### Utilisation

```typescript
import { useCarousel } from '@/hooks/useCarousel';
import { MobileCarousel } from '@/components/common/MobileCarousel';

const MyCarousel = () => {
  const items = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' }
  ];

  const { currentIndex, goToNext, goToPrevious, goToSlide } = useCarousel(items.length);

  return (
    <MobileCarousel
      currentIndex={currentIndex}
      totalItems={items.length}
      onNext={goToNext}
      onPrevious={goToPrevious}
      onGoToSlide={goToSlide}
    >
      {items.map((item) => (
        <div key={item.id} className="min-w-full px-2">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3>{item.title}</h3>
          </div>
        </div>
      ))}
    </MobileCarousel>
  );
};
```

### Structure HTML générée

```html
<div class="md:hidden relative max-w-lg mx-auto pb-12 pt-4">
  <!-- Container avec overflow visible pour badge -->
  <div class="overflow-visible">
    <!-- Slides avec transform translateX -->
    <div class="flex transition-transform duration-500 ease-out">
      {children}
    </div>
  </div>

  <!-- Navigation en bas (flèches + dots) -->
  <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2">
    <button>← Précédent</button>
    <div>● ○ ○</div>
    <button>Suivant →</button>
  </div>
</div>
```

### Classes importantes

| Classe | Description |
|--------|-------------|
| `md:hidden` | Visible uniquement sur mobile |
| `pb-12 pt-4` | Padding pour navigation en bas |
| `overflow-visible` | Permet badges dépassant du container |
| `min-w-full` | Chaque slide prend 100% de la largeur |

### Personnalisation

Pour personnaliser le style des slides, modifiez le contenu passé dans `children` :

```typescript
<MobileCarousel {...props}>
  {items.map((item) => (
    <div key={item.id} className="min-w-full px-2">
      {/* 🎨 Personnalisez ici */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl">
        <h3 className="text-white">{item.title}</h3>
      </div>
    </div>
  ))}
</MobileCarousel>
```

---

## 📦 Fichier de données carouselData

### Localisation
`src/data/carouselData.ts`

### Description
Externalise les données du carrousel principal pour faciliter la maintenance.

### Structure

```typescript
export const carouselSlides = [
  {
    image: string,      // URL de l'image
    title: string,      // Titre du slide
    description: string, // Description
    alt: string         // Texte alternatif pour SEO/a11y
  },
  // ...
];
```

### Utilisation

```typescript
import { carouselSlides } from '@/data/carouselData';

const HeroCarousel = () => {
  const { currentIndex, goToNext, goToPrevious } = useCarousel(carouselSlides.length);

  return (
    <div>
      {carouselSlides.map((slide, index) => (
        <div key={index} className={index === currentIndex ? 'block' : 'hidden'}>
          <img src={slide.image} alt={slide.alt} />
          <h2>{slide.title}</h2>
          <p>{slide.description}</p>
        </div>
      ))}
    </div>
  );
};
```

### Ajouter un nouveau slide

```typescript
export const carouselSlides = [
  // Slides existants...
  {
    image: 'https://example.com/new-image.webp',
    title: 'NOUVEAU TRAITEMENT',
    description: 'Description du nouveau traitement',
    alt: 'Description pour accessibilité'
  }
];
```

---

## 🚀 Guide de migration

### Remplacer un carrousel existant

#### Avant (code dupliqué)

```typescript
const [currentPricing, setCurrentPricing] = useState(0);

const goToNext = () => {
  setCurrentPricing(prev => prev === 2 ? 0 : prev + 1);
};

const goToPrevious = () => {
  setCurrentPricing(prev => prev === 0 ? 2 : prev - 1);
};

return (
  <div className="md:hidden relative max-w-lg mx-auto pb-12">
    <div className="overflow-hidden">
      <div style={{ transform: `translateX(-${currentPricing * 100}%)` }}>
        {/* slides */}
      </div>
    </div>

    {/* Navigation copiée-collée */}
    <button onClick={goToPrevious}>←</button>
    <div>
      {[0, 1, 2].map(index => (
        <button onClick={() => setCurrentPricing(index)}>●</button>
      ))}
    </div>
    <button onClick={goToNext}>→</button>
  </div>
);
```

#### Après (avec composants réutilisables)

```typescript
import { useCarousel } from '@/hooks/useCarousel';
import { MobileCarousel } from '@/components/common/MobileCarousel';

const pricingOptions = [/* ... */];
const { currentIndex, goToNext, goToPrevious, goToSlide } = useCarousel(pricingOptions.length);

return (
  <MobileCarousel
    currentIndex={currentIndex}
    totalItems={pricingOptions.length}
    onNext={goToNext}
    onPrevious={goToPrevious}
    onGoToSlide={goToSlide}
  >
    {pricingOptions.map((option) => (
      <div key={option.id} className="min-w-full px-2">
        {/* Contenu du slide */}
      </div>
    ))}
  </MobileCarousel>
);
```

**Avantages :**
- 🔥 Réduction de ~50 lignes de code par carrousel
- ✅ Maintenance centralisée
- 🎨 Style uniforme
- 🐛 Moins de bugs

---

## 📐 Architecture recommandée

### Structure actuelle
```
src/
├── pages/
│   └── Index.tsx (1684 lignes ⚠️)
├── components/
├── hooks/
└── data/
```

### Structure recommandée

```
src/
├── pages/
│   └── Index.tsx (< 500 lignes ✅)
├── components/
│   ├── common/          # Composants réutilisables
│   │   └── MobileCarousel.tsx ✅
│   ├── sections/        # Sections de la page d'accueil
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ApplicationsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── FAQSection.tsx
│   └── ...
├── hooks/
│   ├── useCarousel.tsx ✅
│   └── ...
└── data/
    ├── carouselData.ts ✅
    ├── applicationsData.ts
    ├── testimonialsData.ts
    ├── faqData.ts
    └── pricingData.ts
```

---

## 🎨 Patterns de code

### 1. Extraire une section

```typescript
// ❌ Avant : Tout dans Index.tsx
const Index = () => {
  return (
    <>
      <section id="about">
        {/* 200 lignes de code */}
      </section>
    </>
  );
};

// ✅ Après : Section séparée
// src/components/sections/AboutSection.tsx
export const AboutSection = () => {
  return (
    <section id="about">
      {/* 200 lignes */}
    </section>
  );
};

// src/pages/Index.tsx
import { AboutSection } from '@/components/sections/AboutSection';

const Index = () => {
  return <AboutSection />;
};
```

### 2. Extraire les données

```typescript
// ❌ Avant : Données dans le composant
const Pricing = () => {
  const plans = [
    { name: 'Basic', price: 90 },
    { name: 'Pro', price: 255 },
  ];

  return <div>{/* render */}</div>;
};

// ✅ Après : Données séparées
// src/data/pricingData.ts
export const pricingPlans = [
  {
    id: 1,
    name: 'Séance Individuelle',
    price: 90,
    features: ['Personnalisée', 'Cabinet ou télé']
  },
  {
    id: 2,
    name: 'Pack 3 Séances',
    price: 255,
    features: ['85€/séance', 'Suivi personnalisé'],
    recommended: true
  },
];

// src/components/sections/PricingSection.tsx
import { pricingPlans } from '@/data/pricingData';

export const PricingSection = () => {
  return <div>{pricingPlans.map(plan => ...)}</div>;
};
```

### 3. Hook avec auto-scroll

```typescript
// Ajouter auto-scroll au carrousel
import { useCarousel } from '@/hooks/useCarousel';
import { useEffect } from 'react';

const AutoCarousel = () => {
  const { currentIndex, goToNext } = useCarousel(slides.length);

  // Auto-scroll toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [goToNext]);

  return <div>{/* carousel */}</div>;
};
```

---

## 🧪 Tests

### Tester le hook useCarousel

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCarousel } from '@/hooks/useCarousel';

test('devrait naviguer au slide suivant', () => {
  const { result } = renderHook(() => useCarousel(3));

  expect(result.current.currentIndex).toBe(0);

  act(() => {
    result.current.goToNext();
  });

  expect(result.current.currentIndex).toBe(1);
});

test('devrait boucler du dernier au premier slide', () => {
  const { result } = renderHook(() => useCarousel(3));

  act(() => {
    result.current.goToSlide(2); // Dernier slide
    result.current.goToNext();
  });

  expect(result.current.currentIndex).toBe(0);
});
```

### Tester MobileCarousel

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileCarousel } from '@/components/common/MobileCarousel';

test('devrait afficher le bon nombre de dots', () => {
  const mockProps = {
    currentIndex: 0,
    totalItems: 3,
    onNext: jest.fn(),
    onPrevious: jest.fn(),
    onGoToSlide: jest.fn(),
  };

  render(
    <MobileCarousel {...mockProps}>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </MobileCarousel>
  );

  const dots = screen.getAllByRole('button', { name: /Aller au slide/i });
  expect(dots).toHaveLength(3);
});
```

---

## 🔍 Debugging

### Vérifier l'index du carrousel

```typescript
const { currentIndex } = useCarousel(5);

console.log('Current slide:', currentIndex); // 0 à 4
```

### Vérifier le transform CSS

```typescript
// Dans le navigateur, inspectez l'élément
// Devrait voir : transform: translateX(-100%) pour le 2ème slide
```

### Problème : Les slides ne défilent pas

**Cause probable :** Classes Tailwind manquantes

**Solution :**
```typescript
// ✅ Classes requises sur les slides
<div className="min-w-full px-2">
  {/* Contenu */}
</div>
```

### Problème : Badge tronqué

**Cause :** `overflow-hidden` sur le parent

**Solution :**
```typescript
// Changer overflow-hidden en overflow-visible
<div className="overflow-visible">
```

---

## 📝 Checklist pour nouveau carrousel

- [ ] Créer le fichier de données dans `src/data/`
- [ ] Ajouter attributs `alt` sur toutes les images
- [ ] Utiliser `useCarousel` hook
- [ ] Utiliser `MobileCarousel` composant
- [ ] Tester sur mobile et desktop
- [ ] Vérifier l'accessibilité (navigation clavier)
- [ ] Ajouter tests unitaires

---

## 🚨 Bonnes pratiques

### ✅ À FAIRE

```typescript
// Nommer clairement les variables
const { currentIndex: currentTestimonial, goToNext, goToPrevious, goToSlide } = useCarousel(testimonials.length);

// Ajouter des alt sur les images
<img src={slide.image} alt={slide.alt} loading="lazy" />

// Externaliser les données
import { testimonials } from '@/data/testimonialsData';

// Utiliser des constantes
const AUTO_SCROLL_INTERVAL = 5000;
const TRANSITION_DURATION = 500;
```

### ❌ À ÉVITER

```typescript
// Dupliquer la logique carrousel
const [current, setCurrent] = useState(0);
const next = () => setCurrent(prev => ...); // ❌

// Images sans alt
<img src="image.jpg" /> // ❌

// Données hardcodées dans le JSX
<div>
  <Card title="Marie" text="Super!" />
  <Card title="Pierre" text="Excellent!" />
</div> // ❌

// Magic numbers
setInterval(goToNext, 8000); // ❌ Qu'est-ce que 8000 ?
```

---

## 📞 Support

Pour toute question sur le refactoring :

1. Lire cette documentation
2. Vérifier les exemples dans le code
3. Consulter les tests existants
4. Créer une issue GitHub si nécessaire

---

## 📅 Historique

| Date | Action | Fichiers |
|------|--------|----------|
| 2025-10-03 | Création hook useCarousel | `src/hooks/useCarousel.tsx` |
| 2025-10-03 | Création MobileCarousel | `src/components/common/MobileCarousel.tsx` |
| 2025-10-03 | Extraction données carrousel | `src/data/carouselData.ts` |

---

## 🎯 Prochaines étapes

1. [ ] Migrer tous les carrousels vers `useCarousel` + `MobileCarousel`
2. [ ] Extraire toutes les sections de Index.tsx
3. [ ] Créer fichiers data pour applications, témoignages, FAQ, pricing
4. [ ] Ajouter tests pour tous les nouveaux composants
5. [ ] Corriger les 13 erreurs ESLint
6. [ ] Exécuter `npm audit fix`

---

**Version :** 1.0
**Dernière mise à jour :** 3 octobre 2025
