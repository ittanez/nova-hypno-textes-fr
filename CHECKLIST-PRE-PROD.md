# ✅ Checklist Pré-Production - NovaHypnose.fr

Checklist à valider avant de merger les PRs et déployer en production.

## 🧪 Tests Automatisés

- [ ] **Tests unitaires passent** : `npm run test:run`
  - Résultat attendu : ✓ 19/19 passed

- [ ] **Build production réussit** : `npm run build`
  - Aucune erreur
  - Aucun warning critique
  - Tailles de bundles raisonnables

## 👀 Tests Visuels

- [ ] **Prévisualisation locale** : `npm run preview`
  - [ ] Page d'accueil charge correctement
  - [ ] Navigation header fonctionne
  - [ ] Menu mobile s'ouvre/ferme
  - [ ] Footer visible et liens fonctionnels

- [ ] **Couleurs et contrastes** : Ouvrir `test-contrastes.html`
  - [ ] Nova Blue plus foncé (visible)
  - [ ] Nova Green plus foncé (visible)
  - [ ] Textes plus lisibles
  - [ ] Pas de régression visuelle

## 🎨 Composants Critiques

- [ ] **Carousel hero**
  - [ ] Images chargent correctement
  - [ ] Pas de layout shift (CLS)
  - [ ] Navigation carousel fonctionne
  - [ ] Vidéos ne chargent pas toutes en même temps (lazy)

- [ ] **Navigation**
  - [ ] Tous les liens header fonctionnent
  - [ ] Dropdowns s'ouvrent au hover
  - [ ] Smooth scroll vers sections
  - [ ] Boutons "Rendez-vous" → Resalib

- [ ] **FAQ**
  - [ ] Questions s'ouvrent/ferment au clic
  - [ ] Icônes chevron changent d'état
  - [ ] Toutes les questions affichées

- [ ] **Section Contact**
  - [ ] Informations visibles (tél, email, adresse)
  - [ ] Liens cliquables (tel:, mailto:)
  - [ ] Image cabinet charge
  - [ ] Bouton Resalib fonctionne

## ⌨️ Accessibilité

- [ ] **Navigation clavier** : Tester avec Tab
  - [ ] Focus visible (outline bleu 3px)
  - [ ] Ordre de tab logique
  - [ ] Tous les éléments interactifs accessibles
  - [ ] Enter/Espace fonctionnent sur boutons

- [ ] **Screen reader** (optionnel mais recommandé)
  - [ ] aria-labels présents
  - [ ] Headings hiérarchiques
  - [ ] Liens descriptifs

## 📱 Responsive

- [ ] **Mobile (375px)** : DevTools → iPhone 12
  - [ ] Menu hamburger fonctionne
  - [ ] Textes lisibles
  - [ ] Images adaptées (srcset)
  - [ ] Boutons assez grands (48x48px)
  - [ ] Pas de scroll horizontal

- [ ] **Tablet (768px)** : DevTools → iPad
  - [ ] Layout s'adapte
  - [ ] Navigation claire
  - [ ] Images responsive

- [ ] **Desktop (1920px)**
  - [ ] Contenu centré
  - [ ] Pas d'éléments trop étirés
  - [ ] Navigation desktop visible

## 📊 Performance (Lighthouse)

- [ ] **Lancer audit** : `lighthouse http://localhost:4173 --view`
  - [ ] Performance : Score amélioré
  - [ ] Accessibility : ≥95 (était 91)
  - [ ] SEO : 100 (maintenu)
  - [ ] Best Practices : 100 (headers sécurité)

- [ ] **Core Web Vitals**
  - [ ] LCP : <2.5s (était 12.1s)
  - [ ] CLS : <0.1 (était 0.085)
  - [ ] FCP : <1.8s
  - [ ] TBT : Réduit

## 🔒 Sécurité

- [ ] **Headers HTTP** (vérifier après déploiement Netlify)
  - [ ] Content-Security-Policy présent
  - [ ] Strict-Transport-Security (HSTS) présent
  - [ ] Permissions-Policy présent
  - [ ] X-Frame-Options: DENY
  - [ ] X-Content-Type-Options: nosniff

## 🌐 Compatibilité Navigateurs

- [ ] **Chrome/Edge** (Chromium)
  - [ ] Site fonctionne normalement
  - [ ] Aucune erreur console

- [ ] **Firefox**
  - [ ] Site fonctionne normalement
  - [ ] Aucune erreur console

- [ ] **Safari** (si disponible)
  - [ ] Site fonctionne normalement
  - [ ] Aucune erreur console

## 🚀 Avant le Merge

- [ ] Tous les tests automatisés passent
- [ ] Aucune régression visuelle détectée
- [ ] Navigation clavier fonctionne
- [ ] Responsive vérifié (mobile/tablet/desktop)
- [ ] Lighthouse scores améliorés
- [ ] Aucune erreur console critique

## 📝 Après le Déploiement Netlify

- [ ] Vérifier https://novahypnose.fr/ fonctionne
- [ ] Re-lancer Lighthouse sur le site en production
- [ ] Vérifier les headers HTTP (DevTools → Network → Headers)
- [ ] Tester sur mobile réel si possible
- [ ] Valider auprès du client

---

**Date** : _______________
**Testeur** : _______________
**Résultat** : ☐ Validé  ☐ À corriger

## 🐛 Problèmes Détectés

| Problème | Gravité | Status | Notes |
|----------|---------|--------|-------|
|          |         |        |       |
|          |         |        |       |

---

**Remarques** :

_______________________________________________________________________

_______________________________________________________________________

_______________________________________________________________________
