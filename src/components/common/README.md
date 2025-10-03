# 🧩 Common Components

Composants réutilisables partagés dans toute l'application.

## 📦 Composants disponibles

### MobileCarousel.tsx
Composant carrousel optimisé pour mobile avec navigation en bas.

**Props :**
- `currentIndex` : Index actuel
- `totalItems` : Nombre total d'items
- `onNext` : Callback suivant
- `onPrevious` : Callback précédent
- `onGoToSlide` : Callback pour slide spécifique
- `children` : Contenu des slides

**Usage :**
```typescript
import { MobileCarousel } from '@/components/common/MobileCarousel';
import { useCarousel } from '@/hooks/useCarousel';

const MyComponent = () => {
  const items = [...];
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
          {/* Contenu */}
        </div>
      ))}
    </MobileCarousel>
  );
};
```

**Documentation complète :** Voir [REFACTORING.md](../../../REFACTORING.md#-composant-mobilecarousel)

## 🎨 Principes de conception

Un composant "common" doit être :

1. **Réutilisable** : Utilisable dans plusieurs contextes
2. **Configurable** : Via props, pas de logique métier hardcodée
3. **Sans état** : Ou état minimal (présentation uniquement)
4. **Accessible** : ARIA labels, navigation clavier
5. **Responsive** : Fonctionne sur tous écrans
6. **Documenté** : Props et exemples d'utilisation clairs

## 📝 Template pour nouveau composant

```typescript
import React from 'react';

interface MyComponentProps {
  /**
   * Description de la prop
   */
  title: string;
  /**
   * Description de la prop optionnelle
   * @default 'default value'
   */
  subtitle?: string;
  /**
   * Callback appelé lors du clic
   */
  onClick?: () => void;
  /**
   * Contenu personnalisé
   */
  children?: React.ReactNode;
}

/**
 * Description du composant
 *
 * @example
 * ```tsx
 * <MyComponent title="Hello" onClick={() => console.log('clicked')}>
 *   <p>Content</p>
 * </MyComponent>
 * ```
 */
export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  subtitle = 'default',
  onClick,
  children,
}) => {
  return (
    <div className="..." onClick={onClick}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </div>
  );
};
```

## ✅ Checklist nouveau composant

Avant de créer un nouveau composant common, vérifiez :

- [ ] Le composant est utilisé (ou sera utilisé) dans 2+ endroits
- [ ] Le composant n'a pas de logique métier spécifique
- [ ] Toutes les props sont typées avec TypeScript
- [ ] JSDoc ajouté avec exemples
- [ ] Composant accessible (ARIA, keyboard nav)
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Tests unitaires créés
- [ ] Documentation mise à jour

## 🏗️ Structure du composant

```
MyComponent/
├── MyComponent.tsx          # Composant principal
├── MyComponent.test.tsx     # Tests
├── MyComponent.stories.tsx  # Storybook (optionnel)
└── index.ts                 # Export
```

Ou pour composants simples :

```
MyComponent.tsx
```

## 🎯 Quand créer un composant common ?

### ✅ Créer un composant common si :

- Code UI dupliqué dans 2+ endroits
- Pattern réutilisable (boutons, cartes, modals, etc.)
- Composant agnostique du contexte métier
- Besoin de cohérence visuelle

### ❌ Ne PAS créer de composant common si :

- Utilisé une seule fois
- Logique métier très spécifique
- Trop de props conditionnelles (sur-ingénierie)
- Composant déjà disponible dans shadcn/ui

## 🧪 Tests

Exemple de test pour composant common :

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render title', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<MyComponent title="Test" onClick={handleClick} />);

    fireEvent.click(screen.getByText('Test'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render children', () => {
    render(
      <MyComponent title="Test">
        <span>Child content</span>
      </MyComponent>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
```

## 📚 Ressources

- [React Component Patterns](https://reactpatterns.com/)
- [Component Composition](https://react.dev/learn/passing-props-to-a-component)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
