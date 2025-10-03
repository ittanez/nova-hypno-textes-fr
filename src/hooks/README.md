# 🪝 Hooks Directory

Ce dossier contient les hooks personnalisés React du projet.

## 📚 Hooks disponibles

### useCarousel.tsx
Hook pour gérer la logique de navigation des carrousels.

**Usage :**
```typescript
const { currentIndex, goToNext, goToPrevious, goToSlide } = useCarousel(totalSlides);
```

**Documentation complète :** Voir [REFACTORING.md](../../REFACTORING.md#-hook-usecarousel)

### useScrollAnimation.tsx
Hook pour animations au scroll.

### useSeoMetadata.tsx
Hook pour gérer les métadonnées SEO.

### useAdminArticles.tsx
Hook pour la gestion des articles dans l'admin.

## 🎯 Quand créer un nouveau hook ?

Créez un hook personnalisé quand :

1. **Logique réutilisable** : Code utilisé dans plusieurs composants
2. **Logique complexe** : État + effets secondaires combinés
3. **Abstraction** : Masquer la complexité d'implémentation
4. **Testabilité** : Logique nécessitant des tests unitaires

## 📝 Template pour nouveau hook

```typescript
import { useState, useEffect, useCallback } from 'react';

interface UseMyHookReturn {
  // Types des valeurs retournées
}

interface UseMyHookOptions {
  // Types des options (optionnel)
}

/**
 * Description de ce que fait le hook
 *
 * @param param1 - Description du paramètre
 * @returns Object contenant les valeurs et fonctions
 *
 * @example
 * ```typescript
 * const { value, action } = useMyHook(initialValue);
 * ```
 */
export const useMyHook = (
  param1: string,
  options?: UseMyHookOptions
): UseMyHookReturn => {
  const [state, setState] = useState(initialValue);

  // Utiliser useCallback pour les fonctions
  const action = useCallback(() => {
    // logique
  }, [dependencies]);

  // Utiliser useEffect pour les effets secondaires
  useEffect(() => {
    // logique
    return () => {
      // cleanup
    };
  }, [dependencies]);

  return {
    state,
    action,
  };
};
```

## ✅ Bonnes pratiques

1. **Nommage** : Toujours préfixer par `use` (convention React)
2. **TypeScript** : Typer tous les paramètres et retours
3. **Documentation** : Ajouter JSDoc avec exemples
4. **Tests** : Créer tests unitaires dans `__tests__/`
5. **Dependencies** : Minimiser les dépendances des useEffect/useCallback
6. **Cleanup** : Toujours nettoyer les effets (timers, listeners, etc.)

## 🧪 Tests

Les tests des hooks doivent être dans le dossier `__tests__/` :

```typescript
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  it('should work as expected', () => {
    const { result } = renderHook(() => useMyHook());
    // assertions
  });
});
```
