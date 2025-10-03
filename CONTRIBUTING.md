# 🤝 Guide de Contribution - NovaHypnose.fr

Merci de contribuer à ce projet ! Ce guide vous aidera à maintenir et améliorer le code de manière cohérente.

## 📋 Table des matières

1. [Démarrage rapide](#démarrage-rapide)
2. [Structure du projet](#structure-du-projet)
3. [Standards de code](#standards-de-code)
4. [Git Workflow](#git-workflow)
5. [Tests](#tests)
6. [Documentation](#documentation)

---

## 🚀 Démarrage rapide

### Installation

```bash
# Cloner le repo
git clone https://github.com/ittanez/nova-hypno-textes-fr.git
cd nova-hypno-textes-fr

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:5173
```

### Commandes disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build production
npm run preview      # Prévisualiser le build
npm run lint         # Vérifier le code
npm run test         # Lancer les tests
npm run test:coverage # Coverage des tests
```

---

## 📁 Structure du projet

```
nova-hypno-textes-fr/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/
│   │   ├── common/        # Composants réutilisables ✅
│   │   │   ├── MobileCarousel.tsx
│   │   │   └── README.md
│   │   ├── sections/      # Sections de pages (à créer)
│   │   ├── ui/            # shadcn/ui components
│   │   └── ...
│   ├── hooks/             # Hooks personnalisés ✅
│   │   ├── useCarousel.tsx
│   │   └── README.md
│   ├── data/              # Données statiques ✅
│   │   ├── carouselData.ts
│   │   └── README.md
│   ├── pages/             # Pages de l'application
│   │   └── Index.tsx
│   ├── lib/               # Utilitaires
│   ├── utils/             # Fonctions helper
│   └── types/             # Types TypeScript
├── REFACTORING.md         # Documentation refactoring ✅
├── CONTRIBUTING.md        # Ce fichier ✅
└── package.json
```

---

## 💻 Standards de code

### TypeScript

```typescript
// ✅ Toujours typer explicitement
interface Props {
  title: string;
  count: number;
}

const MyComponent: React.FC<Props> = ({ title, count }) => {
  // ...
};

// ❌ Éviter 'any'
const data: any = {}; // Mauvais

// ✅ Typer correctement
interface Data {
  name: string;
  value: number;
}
const data: Data = { name: 'test', value: 123 };
```

### React Components

```typescript
// ✅ Composants fonctionnels avec TypeScript
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// ✅ Utiliser React.memo pour optimisation
export const ExpensiveComponent = React.memo<Props>(({ data }) => {
  // Rendu coûteux
});

// ✅ Hooks en haut du composant
const MyComponent = () => {
  const [state, setState] = useState(0);
  const { data } = useMyHook();

  // Reste du code
};
```

### Hooks

```typescript
// ✅ Préfixer par 'use'
export const useCarousel = (totalSlides: number) => {
  // ...
};

// ✅ Utiliser useCallback pour fonctions
const handleClick = useCallback(() => {
  // logique
}, [dependencies]);

// ✅ Utiliser useMemo pour calculs coûteux
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

### Nommage

```typescript
// Composants : PascalCase
export const MyComponent = () => {};

// Hooks : camelCase avec 'use'
export const useMyHook = () => {};

// Fonctions : camelCase
export const calculateTotal = () => {};

// Constantes : SCREAMING_SNAKE_CASE
export const API_BASE_URL = 'https://api.example.com';

// Types/Interfaces : PascalCase
export interface UserData {
  name: string;
}
```

### CSS / Tailwind

```typescript
// ✅ Classes lisibles sur plusieurs lignes
<div className="
  flex flex-col
  items-center justify-center
  p-4 md:p-8
  bg-white rounded-lg shadow-lg
">
  Content
</div>

// ✅ Utiliser clsx pour conditions
import clsx from 'clsx';

<div className={clsx(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
)}>

// ❌ Éviter les longues lignes
<div className="flex flex-col items-center justify-center p-4 md:p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
```

### Imports

```typescript
// ✅ Ordre des imports
// 1. React et librairies externes
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Alias @ (internal)
import { Button } from '@/components/ui/button';
import { useCarousel } from '@/hooks/useCarousel';

// 3. Relatifs
import { localHelper } from './helpers';

// 4. Types
import type { User } from '@/types';
```

---

## 🔀 Git Workflow

### Branches

```bash
# Format des branches
feature/nom-de-la-feature
fix/description-du-bug
refactor/nom-du-refactor
docs/description-de-la-doc
```

### Commits

```bash
# Format des messages de commit
type(scope): description

# Types possibles :
# feat: Nouvelle fonctionnalité
# fix: Correction de bug
# refactor: Refactoring (pas de changement fonctionnel)
# docs: Documentation
# test: Ajout/modification de tests
# style: Formatage, point-virgules, etc.
# perf: Amélioration de performance
# chore: Maintenance (deps, config, etc.)

# Exemples :
feat(carousel): add auto-scroll functionality
fix(hero): correct mobile text positioning
refactor(index): extract carousel data to separate file
docs(readme): update installation instructions
```

### Workflow type

```bash
# 1. Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# 2. Faire vos modifications
# ... coder ...

# 3. Vérifier que tout fonctionne
npm run lint
npm run test
npm run build

# 4. Commiter
git add .
git commit -m "feat(scope): description"

# 5. Pousser
git push origin feature/nouvelle-fonctionnalite

# 6. Créer une Pull Request sur GitHub
```

### Pull Request

**Template de PR :**

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Refactoring
- [ ] Documentation

## Checklist
- [ ] Code testé localement
- [ ] Tests ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Pas d'erreurs ESLint
- [ ] Build réussi

## Screenshots (si applicable)
```

---

## 🧪 Tests

### Écrire des tests

```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle click', () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Lancer les tests

```bash
# Tous les tests
npm run test

# Tests avec coverage
npm run test:coverage

# Tests en mode watch
npm run test -- --watch

# Test spécifique
npm run test MyComponent.test.tsx
```

---

## 📚 Documentation

### Documenter un composant

```typescript
/**
 * Affiche un bouton avec icône et texte
 *
 * @param title - Texte affiché sur le bouton
 * @param icon - Composant icône Lucide
 * @param onClick - Callback appelé au clic
 *
 * @example
 * ```tsx
 * <IconButton
 *   title="Cliquer"
 *   icon={Heart}
 *   onClick={() => console.log('clicked')}
 * />
 * ```
 */
export const IconButton: React.FC<Props> = ({ title, icon, onClick }) => {
  // ...
};
```

### Documenter un hook

```typescript
/**
 * Hook pour gérer la navigation d'un carrousel
 *
 * @param totalSlides - Nombre total de slides
 * @returns Object avec currentIndex et fonctions de navigation
 *
 * @example
 * ```typescript
 * const { currentIndex, goToNext, goToPrevious } = useCarousel(5);
 * ```
 */
export const useCarousel = (totalSlides: number) => {
  // ...
};
```

### Mettre à jour la documentation

Après un changement important :

1. ✅ Mettre à jour `REFACTORING.md` si refactoring
2. ✅ Mettre à jour `README.md` principal si changement d'utilisation
3. ✅ Mettre à jour JSDoc dans le code
4. ✅ Ajouter des exemples d'utilisation

---

## 🎯 Checklist avant commit

- [ ] Code formaté correctement
- [ ] Pas d'erreurs ESLint (`npm run lint`)
- [ ] Tests passent (`npm run test`)
- [ ] Build réussi (`npm run build`)
- [ ] Pas de `console.log` oubliés
- [ ] Pas de code commenté inutile
- [ ] Imports nettoyés
- [ ] Documentation mise à jour
- [ ] Types TypeScript corrects
- [ ] Accessibilité vérifiée (ARIA labels)

---

## ⚠️ Erreurs communes à éviter

### 1. Utiliser `any` au lieu de typer

```typescript
// ❌ Mauvais
const data: any = fetchData();

// ✅ Bon
interface ApiResponse {
  name: string;
  age: number;
}
const data: ApiResponse = fetchData();
```

### 2. Oublier les dépendances dans useEffect

```typescript
// ❌ Mauvais - eslint warning
useEffect(() => {
  doSomething(value);
}, []); // value manquante

// ✅ Bon
useEffect(() => {
  doSomething(value);
}, [value]);
```

### 3. Ne pas nettoyer les effets

```typescript
// ❌ Mauvais - memory leak
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
}, []);

// ✅ Bon
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

### 4. Dupliquer la logique

```typescript
// ❌ Mauvais - Code dupliqué
const ComponentA = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent(prev => ...);
  // ...
};

const ComponentB = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent(prev => ...);
  // ...
};

// ✅ Bon - Hook réutilisable
const useCarousel = (total) => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent(prev => ...);
  return { current, next };
};
```

### 5. Oublier l'accessibilité

```typescript
// ❌ Mauvais
<button onClick={handleClick}>
  <Icon />
</button>

// ✅ Bon
<button
  onClick={handleClick}
  aria-label="Description du bouton"
>
  <Icon />
</button>
```

---

## 🔧 Résolution de problèmes

### Build échoue

```bash
# Nettoyer et réinstaller
rm -rf node_modules dist
npm install
npm run build
```

### Tests échouent

```bash
# Nettoyer le cache Jest
npm run test -- --clearCache
npm run test
```

### ESLint errors

```bash
# Corriger automatiquement
npm run lint -- --fix
```

### Types TypeScript incorrects

```bash
# Vérifier les types
npx tsc --noEmit
```

---

## 📞 Besoin d'aide ?

1. 📖 Lire [REFACTORING.md](./REFACTORING.md)
2. 📖 Lire les README dans chaque dossier
3. 🔍 Chercher dans le code existant
4. 💬 Créer une issue GitHub
5. 📧 Contacter l'équipe

---

## 📝 Licence

Ce projet est privé et propriétaire de NovaHypnose.

---

**Merci de contribuer ! 🙏**

*Dernière mise à jour : 3 octobre 2025*
