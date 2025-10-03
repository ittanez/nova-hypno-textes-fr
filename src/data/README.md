# 📊 Data Directory

Ce dossier contient toutes les données statiques du site.

## 🎯 Objectif

Séparer les données du code pour :
- ✅ Faciliter la maintenance
- ✅ Permettre modifications sans toucher au code
- ✅ Faciliter traduction future
- ✅ Centraliser le contenu

## 📁 Fichiers disponibles

### carouselData.ts
Données du carrousel principal de la page d'accueil.

```typescript
export const carouselSlides = [
  {
    image: string,
    title: string,
    description: string,
    alt: string // Pour SEO/Accessibilité
  },
  // ...
];
```

**Usage :**
```typescript
import { carouselSlides } from '@/data/carouselData';
```

## 📝 Template pour nouveau fichier data

```typescript
/**
 * Description de ce que contient ce fichier
 */

export interface MyDataItem {
  id: number;
  title: string;
  description: string;
  // autres champs
}

export const myData: MyDataItem[] = [
  {
    id: 1,
    title: 'Premier item',
    description: 'Description...',
  },
  {
    id: 2,
    title: 'Deuxième item',
    description: 'Description...',
  },
];
```

## 🗂️ Structure recommandée

Organiser les fichiers par type de données :

```
data/
├── carouselData.ts      ✅ Créé
├── applicationsData.ts  📝 À créer
├── testimonialsData.ts  📝 À créer
├── faqData.ts           📝 À créer
├── pricingData.ts       📝 À créer
├── contactData.ts       📝 À créer
└── README.md
```

## 💡 Exemples de fichiers à créer

### applicationsData.ts
```typescript
import { LucideIcon } from 'lucide-react';
import { Frown, Moon, CigaretteOff, ActivitySquare } from 'lucide-react';

export interface Application {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const applications: Application[] = [
  {
    id: 1,
    icon: Frown,
    title: 'Stress et Anxiété',
    description: 'Libérez-vous du stress chronique et retrouvez votre sérénité.',
  },
  {
    id: 2,
    icon: Moon,
    title: 'Troubles du sommeil',
    description: 'Retrouvez un sommeil réparateur et naturel.',
  },
  // ...
];
```

### testimonialsData.ts
```typescript
export interface Testimonial {
  id: number;
  name: string;
  text: string;
  date: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marie',
    text: 'Excellente expérience...',
    date: 'il y a 2 mois',
    rating: 5,
  },
  // ...
];
```

### faqData.ts
```typescript
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'Combien de temps dure une séance ?',
    answer: 'Une séance dure généralement entre 1h et 1h30...',
    category: 'general',
  },
  // ...
];
```

### pricingData.ts
```typescript
export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  currency: string;
  features: string[];
  recommended?: boolean;
  stripeLink?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: 'Séance Individuelle',
    price: 90,
    currency: '€',
    features: [
      'Séance personnalisée',
      'Cabinet ou téléconsultation',
    ],
  },
  {
    id: 2,
    name: 'Pack 3 Séances',
    price: 255,
    currency: '€',
    features: [
      '85€/séance',
      'Suivi personnalisé',
      'Économisez 15€',
    ],
    recommended: true,
    stripeLink: 'https://buy.stripe.com/...',
  },
  // ...
];
```

### contactData.ts
```typescript
export interface ContactInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  hours: {
    weekdays: string;
    weekend: string;
  };
}

export const contactInfo: ContactInfo = {
  name: 'Alain Zenatti',
  title: 'Maître Hypnologue',
  phone: '+33 6 49 35 80 89',
  email: 'contact@novahypnose.fr',
  address: {
    street: '16 rue Saint-Antoine',
    city: 'Paris',
    postalCode: '75004',
    country: 'France',
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/novahypnose/',
  },
  hours: {
    weekdays: '11h00 - 20h00',
    weekend: 'Fermé',
  },
};
```

## ✅ Bonnes pratiques

### 1. Toujours typer les données

```typescript
// ❌ Mauvais
export const data = [
  { name: 'Test', value: 123 }
];

// ✅ Bon
export interface DataItem {
  name: string;
  value: number;
}

export const data: DataItem[] = [
  { name: 'Test', value: 123 }
];
```

### 2. Utiliser des IDs uniques

```typescript
// ✅ Bon
export const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];
```

### 3. Ajouter des métadonnées

```typescript
// ✅ Bon - Inclure alt, aria-label, etc.
export const slides = [
  {
    image: '/image.webp',
    alt: 'Description pour accessibilité',
    title: 'Titre',
  },
];
```

### 4. Grouper les données liées

```typescript
// ✅ Bon
export const siteData = {
  hero: {
    title: '...',
    subtitle: '...',
  },
  contact: {
    email: '...',
    phone: '...',
  },
};
```

### 5. Documenter les données

```typescript
/**
 * Liste des tarifs des séances d'hypnothérapie
 * Mis à jour : 01/10/2025
 */
export const pricingPlans = [...];
```

## 🔄 Migration de données existantes

### Étape 1 : Identifier les données dans Index.tsx

```bash
# Chercher les tableaux de données
grep -n "const.*= \[" src/pages/Index.tsx
```

### Étape 2 : Créer le fichier data

```typescript
// src/data/myData.ts
export const myData = [...]; // Copier les données
```

### Étape 3 : Importer dans le composant

```typescript
// src/pages/Index.tsx
import { myData } from '@/data/myData';

// Remplacer le tableau local par l'import
// const myData = [...]; // ❌ Supprimer
```

### Étape 4 : Tester

```bash
npm run build
npm run dev
```

## 🌍 Internationalisation (i18n)

Pour préparer la traduction future :

```typescript
// src/data/fr/testimonialsData.ts
export const testimonialsFr = [...];

// src/data/en/testimonialsData.ts
export const testimonialsEn = [...];

// Usage avec switch ou i18n library
import { testimonialsFr } from '@/data/fr/testimonialsData';
import { testimonialsEn } from '@/data/en/testimonialsData';

const testimonials = locale === 'fr' ? testimonialsFr : testimonialsEn;
```

## 📊 Validation des données

Pour valider les données avec Zod :

```typescript
import { z } from 'zod';

const PricingPlanSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().positive(),
  features: z.array(z.string()),
});

export const pricingPlans = [
  { id: 1, name: 'Basic', price: 90, features: ['...'] },
];

// Valider au runtime
pricingPlans.forEach(plan => {
  PricingPlanSchema.parse(plan);
});
```

## 🧪 Tests

Tester les données :

```typescript
import { pricingPlans } from './pricingData';

describe('pricingData', () => {
  it('should have unique IDs', () => {
    const ids = pricingPlans.map(plan => plan.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have positive prices', () => {
    pricingPlans.forEach(plan => {
      expect(plan.price).toBeGreaterThan(0);
    });
  });

  it('should have at least one feature', () => {
    pricingPlans.forEach(plan => {
      expect(plan.features.length).toBeGreaterThan(0);
    });
  });
});
```

## 📚 Ressources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Zod Validation](https://zod.dev/)
- [i18next](https://www.i18next.com/)
