# Guide des Tests - NovaHypnose.fr

Ce projet dispose d'une suite complète de tests pour garantir la qualité et la stabilité du code.

## 📋 Types de Tests

### Tests Unitaires (Vitest + Testing Library)

Tests des composants React isolés pour vérifier leur comportement individuel.

**Composants testés** :
- `Header` : Navigation principale et menu mobile
- `FAQ` : Accordéon de questions/réponses
- `Contact` : Informations de contact et liens

**Lancer les tests** :
```bash
# Mode watch (interactif)
npm run test

# Run once (pour CI/CD)
npm run test:run

# Avec couverture de code
npm run test:coverage
```

**Fichiers** :
- Configuration : `vitest.config.ts`
- Setup : `src/test/setup.ts`
- Tests : `src/components/__tests__/*.test.tsx`

### Tests E2E (Playwright)

Tests de bout en bout simulant un utilisateur réel naviguant sur le site.

**Scénarios testés** :
- Navigation principale et responsive
- Parcours prise de rendez-vous (CTA vers Resalib)
- Interactions FAQ (ouverture/fermeture accordéon)
- Navigation clavier (accessibilité)

**Lancer les tests** :
```bash
# Tous les tests E2E (headless)
npm run test:e2e

# Mode headed (voir le navigateur)
npm run test:e2e:headed

# Interface utilisateur Playwright
npm run test:e2e:ui

# Un seul navigateur (Chromium)
npm run test:e2e:chromium

# Tous les tests (unitaires + E2E)
npm run test:all
```

**Fichiers** :
- Configuration : `playwright.config.ts`
- Tests : `e2e/*.spec.ts`

## 🎯 Navigateurs Testés

### Desktop
- Chrome (Chromium)
- Firefox
- Safari (WebKit)

### Mobile
- Chrome Mobile (Pixel 5)
- Safari Mobile (iPhone 12)

## 📊 Couverture de Tests

### Tests Unitaires
- **19 tests** répartis sur 3 composants critiques
- Couverture des interactions utilisateur (clics, hover, clavier)
- Vérification de l'accessibilité (ARIA, labels)

### Tests E2E
- **12 tests** couvrant les parcours utilisateur principaux
- Navigation responsive (desktop + mobile)
- Liens externes et CTA
- Accessibilité clavier

## 🚀 CI/CD

Les tests sont configurés pour s'exécuter automatiquement en CI/CD :

```yaml
# GitHub Actions exemple
- name: Run tests
  run: npm run test:run

- name: Run E2E tests
  run: npm run test:e2e
```

## 🛠️ Debugging

### Vitest
```bash
# Mode UI interactif
npx vitest --ui
```

### Playwright
```bash
# Mode debug
npx playwright test --debug

# Inspector
npx playwright codegen http://localhost:8080
```

## 📝 Bonnes Pratiques

### Tests Unitaires
- ✅ Tester le comportement, pas l'implémentation
- ✅ Utiliser `screen.getByRole` pour meilleure accessibilité
- ✅ Mocker les dépendances externes
- ✅ Grouper les tests avec `describe()`

### Tests E2E
- ✅ Tester les parcours utilisateur critiques
- ✅ Utiliser des sélecteurs stables (rôles, labels)
- ✅ Vérifier l'accessibilité (navigation clavier)
- ✅ Tester sur mobile ET desktop

## 🔧 Configuration

### Vitest (`vitest.config.ts`)
- Environnement : jsdom
- Setup : Mock window.matchMedia, IntersectionObserver
- Globals : `describe`, `it`, `expect` disponibles partout

### Playwright (`playwright.config.ts`)
- Base URL : `http://localhost:8080`
- Web Server : Lance automatiquement `npm run dev`
- Retry : 2x en CI, 0x en local
- Reporters : HTML (rapport visuel)

## 📈 Métriques

- **Tests unitaires** : 19 passés ✅
- **Tests E2E** : 12 scenarios ✅
- **Temps d'exécution unitaires** : ~6s
- **Navigateurs** : 5 configurations

---

**Dernière mise à jour** : 11 Novembre 2025
**Version** : 1.0
