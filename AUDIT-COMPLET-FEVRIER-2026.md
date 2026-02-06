# Audit Complet du Site NovaHypnose — Février 2026

## Table des matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Audit Technique](#2-audit-technique)
   - [Architecture et Stack](#21-architecture-et-stack)
   - [Sécurité](#22-sécurité)
   - [Performances](#23-performances)
   - [SEO Technique](#24-seo-technique)
   - [Accessibilité](#25-accessibilité)
3. [Audit Éditorial](#3-audit-éditorial)
   - [Incohérences de données](#31-incohérences-de-données)
   - [Erreurs de français](#32-erreurs-de-français)
   - [Contenu dupliqué](#33-contenu-dupliqué)
   - [Tonalité et voix](#34-tonalité-et-voix)
   - [Navigation et liens cassés](#35-navigation-et-liens-cassés)
4. [Synthèse par priorité](#4-synthèse-par-priorité)
5. [Plan d'action recommandé](#5-plan-daction-recommandé)

---

## 1. Vue d'ensemble

| Caractéristique | Détail |
|---|---|
| **Framework** | React 18.3 + Vite 7.2 (SPA client-side) |
| **Langage** | TypeScript 5.5, Tailwind CSS 3.4 |
| **Backend** | Supabase (PostgreSQL, Auth, Edge Functions, Storage) |
| **Composants UI** | shadcn/ui (46 composants) + Radix UI |
| **Hébergement** | Netlify (principal) + GitHub Pages |
| **CMS** | Admin blog custom via Supabase + TinyMCE |
| **Fichiers TS/TSX** | 227 fichiers |
| **Dépendances** | 80+ packages npm |
| **Pages publiques** | ~10 routes |
| **Domain** | novahypnose.fr |

---

## 2. Audit Technique

### 2.1 Architecture et Stack

**Points forts :**
- Code splitting intelligent avec chunks séparés (react, ui, router, supabase, icons)
- Lazy loading des routes et sections below-the-fold
- Service Worker pour le support offline
- Configuration Tailwind personnalisée avec palette cohérente
- Tests unitaires (Vitest) et E2E (Playwright)

**Points faibles :**
- SPA pure sans SSR/SSG — problème majeur pour le SEO et le partage social
- `vite-ssg` est installé (`package.json` ligne 115) mais **jamais configuré ni utilisé**
- Bibliothèques serveur dans le bundle client : `stripe` (2MB) et `resend` dans `dependencies`
- `next-themes` (package Next.js) utilisé dans un projet Vite
- TinyMCE (~1.5MB) copié dans chaque build de production (via `vite-plugin-static-copy`)
- Script GPT Engineer (`cdn.gpteng.co/gptengineer.js`) chargé en production sur chaque page
- `@supabase/supabase-js` dans `devDependencies` au lieu de `dependencies`

### 2.2 Sécurité

#### CRITIQUE

| Problème | Fichier | Ligne(s) |
|---|---|---|
| `.env` avec clés Supabase **traqué dans git** (commit historique) | `.env` | toutes |
| Table `quiz_peur_avion` : tout utilisateur authentifié peut lire les données de santé | `supabase/migrations/create_quiz_peur_avion_table.sql` | 29-32 |
| Table `users` : politique RLS permet à tout authentifié de lire TOUS les utilisateurs | `supabase/migrations/20251229_enable_rls_all_tables.sql` | 549-551 |
| `unsafe-inline` et `unsafe-eval` dans la CSP | `netlify.toml` | 80 |

#### MOYEN

| Problème | Fichier | Ligne(s) |
|---|---|---|
| Injection HTML dans les templates email (variables non échappées) | `supabase/functions/send-admin-notification/index.ts` | 42 |
| Clé Stripe `pk_live_` hardcodée dans le source (pas en variable d'env) | `src/components/autohypnose/AutohypnosePricing.tsx` | 101 |
| Markdown parser : le fallback en cas d'erreur contourne DOMPurify | `src/utils/markdownParser.ts` | 63 |
| Mot de passe minimum 6 caractères pour l'admin | `src/pages/admin/blog/AdminLogin.tsx` | 27 |
| Service Worker sans limite de taille de cache | `public/sw.js` | — |
| Directives CSP dupliquées (connect-src, media-src, frame-src) | `netlify.toml` | 84-89 |

#### POSITIF

- Clé anon Supabase correctement utilisée côté client (pas de service role key)
- Flow PKCE pour l'authentification
- RLS activée sur 30+ tables
- CORS avec whitelist stricte de 4 domaines
- Headers de sécurité HSTS, X-Frame-Options, X-Content-Type-Options
- `frame-ancestors 'none'` contre le clickjacking

### 2.3 Performances

#### CRITIQUE

| Problème | Fichier | Impact |
|---|---|---|
| Aucun SSR/SSG/prerendering — tous les crawlers voient le HTML de la homepage | `src/main.tsx` | SEO, partage social |
| Images sans `width`/`height` (dont l'image LCP hero) → CLS élevé | `HeroCarousel.tsx` et 13 autres | Core Web Vitals |
| `stripe` et `resend` (libs serveur) dans les dependencies client | `package.json` | Taille bundle |
| Plugin `vite-plugin-critical-css.js` avec hash CSS hardcodé — abandonné | `vite-plugin-critical-css.js` | 38 |
| Plugin `vite-plugin-seo-headers.js` : 3 remplacements regex qui échouent silencieusement | `vite-plugin-seo-headers.js` | Dead code |

#### MOYEN

| Problème | Fichier | Impact |
|---|---|---|
| Preconnect vers `ik.imagekit.io` inutilisé (aucune URL ImageKit dans le code) | `index.html` | 18 |
| Script CrazyEgg chargé sans délai sur la page autohypnose | `src/pages/autohypnose/Index.tsx` | 28 |
| Polices non auto-hébergées (DNS lookup extra vers Google Fonts) | `index.html` | 23 |
| Favicon déclaré `image/png` mais fichier `.ico` | `index.html` | 34 |
| Service Worker ne précache que 4 fichiers (pas les bundles JS/CSS hashés) | `public/sw.js` | 10-14 |
| `base` Vite fragile : `/nova-hypno-textes-fr/` par défaut sans env var | `vite.config.ts` | 20 |

### 2.4 SEO Technique

#### CRITIQUE — SPA sans rendu serveur

C'est le **problème n°1 du site**. En tant que SPA pure :

1. **Crawlers sociaux** (Facebook, Twitter, LinkedIn) ne voient que le HTML statique de `index.html` — titre et description de la homepage pour TOUTES les pages
2. **Google** exécute le JS mais avec un délai (heures à jours) et sans garantie
3. **Blog articles** : aucun contenu visible sans JavaScript
4. `vite-ssg` est installé mais totalement inutilisé

#### CRITIQUE — Script de SEO caché (Black Hat)

`scripts/generate-static-seo.cjs` injecte des titres H1-H6 cachés en `visibility: hidden; position: absolute; left: -9999px;`. C'est une technique de cloaking que Google pénalise explicitement.

#### CRITIQUE — Données structurées triplées et contradictoires

Le schema LocalBusiness est défini en **3 endroits** avec des données différentes :

| Source | Horaires | reviewCount | Adresse |
|---|---|---|---|
| `src/data/schemaOrg.ts` | 11h-20h | 12 | 16 rue Saint-Antoine |
| `src/hooks/useSeoMetadata.tsx` | 09h-19h | 40 | 16 rue St Antoine |
| `vite-plugin-seo-headers.js` | 09h-19h | 45 | 16 rue St Antoine |

#### Pages sans balises SEO complètes

| Page | Canonical | OG Tags | Schema |
|---|---|---|---|
| Home (`Index.tsx`) | Oui (slash inconsistant) | Partiel (pas de locale/site_name) | Via hook |
| Blog Index | Via SEOHead | Via SEOHead | Oui |
| Article Blog | Via SEOHead | Via SEOHead | Oui |
| CategoriesPage | **MANQUANT** | **MANQUANT** | **MANQUANT** |
| MentionsLegales | **MANQUANT** | **MANQUANT** | **MANQUANT** |
| ZoneIntervention | Oui | **MANQUANT** | **MANQUANT** |
| Autohypnose | Oui | Partiel | **MANQUANT** |
| TestReceptivite | **MANQUANT** | **MANQUANT** | **MANQUANT** |
| Custom404 | Oui (ne devrait PAS en avoir) | **MANQUANT** | **MANQUANT** |

#### Autres problèmes SEO

| Problème | Fichier | Ligne(s) |
|---|---|---|
| URL canonique avec/sans slash final inconsistante | `index.html` vs `Index.tsx` | 11 vs 103 |
| Pas de balise `og:locale` (Facebook affiche en_US par défaut) | `Index.tsx` | — |
| Pas de `hreflang` (site francophone uniquement) | global | — |
| `servesCuisine: null` dans le schema (propriété de restaurant) | `schemaOrg.ts` | 17 |
| Deux systèmes SEO concurrents (`SEOHead.tsx` vs `useSeoMetadata.tsx`) | global | — |
| `_redirects` et `netlify.toml` : double définition du catch-all SPA | `_redirects` + `netlify.toml` | — |
| Sitemap statique 549KB potentiellement écrasé par Edge Function dynamique | `netlify.toml` | 130-134 |
| `Crawl-delay` orphelin dans robots.txt | `robots.txt` | 74 |

### 2.5 Accessibilité

#### CRITIQUE

| Problème | Fichier | Ligne(s) |
|---|---|---|
| `nova-orange` (#F37336) : contraste 3.1:1 avec texte blanc — **échoue WCAG AA** | `tailwind.config.ts` | 77 |
| Carrousel auto-avance sans mécanisme de pause (WCAG 2.2.2) | `HeroCarousel.tsx` | 18-24 |
| Aucune région `aria-live` pour le contenu dynamique (recherche, quiz, notifications) | global | — |

#### MOYEN

| Problème | Fichier | Ligne(s) |
|---|---|---|
| Input recherche blog sans `<label>` ni `aria-label` | `BlogIndex.tsx` | 215-224 |
| Input adresse CommuteMap sans `<label>` | `CommuteMap.tsx` | 190-195 |
| `NavDropdown` : `focus:outline-none` sans ring de remplacement | `NavDropdown.tsx` | 27 |
| Skip navigation pointe vers `#main-content` absent sur certaines pages | Admin, Blog, NotFound | — |
| H1 visible uniquement en `sr-only` dans le carrousel hero | `HeroCarousel.tsx` | 86 |
| Texte blanc avec opacité réduite (`text-white/80`, `/90`) sur gradient | `Hero.tsx` | 18-24 |
| Erreurs de formulaire non associées aux inputs (`aria-describedby`) | `CommuteMap.tsx` | 198 |
| Loading spinner sans `aria-busy="true"` | `CommuteMap.tsx` | 252 |

#### POSITIF

- Skip navigation link bien implémenté dans `Header.tsx`
- 119 attributs ARIA/role à travers 44 fichiers
- Styles de focus globaux définis (3px solid outline)
- FAQ avec `aria-expanded`, `aria-controls`, `role="region"`
- Images avec `alt` descriptifs et optimisés SEO
- HTML sémantique (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`)

---

## 3. Audit Éditorial

### 3.1 Incohérences de données

#### P0 — Années d'expérience contradictoires

| Fichier | Valeur |
|---|---|
| `AutohypnoseProgram.tsx` lignes 116-117 | **"4 ans d'expérience"** |
| `About.tsx` ligne 43 | "Plus de 5 ans d'expérience" |
| `AboutSection.tsx` ligne 75 | "plus de 5 années d'expérience" |
| `WhyChooseSection.tsx` ligne 37 | "plus de 5 ans d'expérience" |

**Action :** Aligner sur "plus de 5 ans" partout.

#### P0 — "7j/7" contredit les horaires

`Contact.tsx` ligne 75 : *"Créneaux disponibles 7j/7"*
Mais `schemaOrg.ts` et `ContactSection.tsx` : **Lun-Ven 11h-20h**

**Action :** Supprimer "7j/7" ou préciser "Créneaux en ligne disponibles 7j/7".

#### P1 — Horaires d'ouverture contradictoires

- `schemaOrg.ts` : 11h-20h (Lun-Ven)
- `useSeoMetadata.tsx` : 09h-19h (Lun-Ven)
- `vite-plugin-seo-headers.js` : 09h-19h (Lun-Ven)

**Action :** Définir les horaires réels dans un seul fichier et les référencer partout.

#### P1 — Nombre d'avis incohérent

- `schemaOrg.ts` : 12 avis
- `useSeoMetadata.tsx` : 40 avis
- `vite-plugin-seo-headers.js` : 45 avis

#### P1 — Format d'adresse inconsistant

| Forme | Fichiers |
|---|---|
| "16 rue Saint-Antoine" (correct) | `faqData.ts`, `schemaOrg.ts` |
| "16 rue Saint Antoine" (sans trait) | `AutohypnoseProgram.tsx` |
| "16 rue St Antoine" (abrégé) | `Contact.tsx`, `Footer.tsx`, `ContactSection.tsx` |

**Action :** Standardiser sur **"16 rue Saint-Antoine, 75004 Paris"** partout.

### 3.2 Erreurs de français

| Erreur | Fichier | Ligne | Correction |
|---|---|---|---|
| "a totalement **disparue**" (accord avec avoir) | `testimonials.ts` / `TestimonialsCarousel.tsx` | 13 / 28 | "a totalement **disparu**" |
| "recentrer plus profondément **à** vous-même" | `HypnoWalks.tsx` | 30 | "recentrer **sur** vous-même" ou "reconnecter **à** vous-même" |
| "révèle des secrets **grâce à** l'hypnose" (connotation positive inappropriée) | `faqData.ts` | 41 | "révèle des secrets **sous** hypnose" |
| "**Cherchez** un hypnothérapeute" (sujet manquant) | `Index.tsx` | 92 | "**Vous cherchez** un hypnothérapeute" |
| "La **progression progressive**" (redondance) | `AutohypnoseProgram.tsx` | 36 | "L'entrée progressive" ou "La progression" |
| "une excellente **complémentaire**" (nom manquant) | `AutohypnoseFAQ.tsx` | 44 | "une excellente **approche complémentaire**" |
| "subconscient" au lieu de "**inconscient**" (terminologie ericksonienne) | `faqData.ts` | 38 | "**inconscient**" |
| Espaces doubles autour des noms de stations de métro | `faqData.ts` | 62 | Supprimer les espaces en trop |

### 3.3 Contenu dupliqué

| Contenu | Source 1 | Source 2 | Problème |
|---|---|---|---|
| **FAQ** (13 vs 20 questions) | `Faq.tsx` (hardcodé, 13 items) | `faqData.ts` (centralisé, 20 items) | Données non synchronisées |
| **Carrousel** (slides) | `carouselData.ts` (ancien, titres longs) | `carouselSlides.ts` (nouveau, utilisé) | `carouselData.ts` probablement obsolète |
| **Témoignages** | `testimonials.ts` (9 avis, noms complets) | `TestimonialsCarousel.tsx` (3 avis hardcodés, prénoms) | Pas d'import depuis la source centralisée |
| **Pages 404** | `Custom404.tsx` | `NotFound.tsx` | Deux pages quasi identiques |

### 3.4 Tonalité et voix

#### Oscillation "je" / "nous"

Le site est celui d'un praticien solo (Alain Zenatti), mais alterne entre :
- **"Je/mon"** (About, FAQ, Contact, sections principales) — correct et authentique
- **"Nous/nos"** (pages 404, SeoContent, AutohypnoseFAQ) — inadapté pour un solo

**Action :** Harmoniser vers "je/mon" sur tout le site.

#### Capitalisation de "Ericksonienne"

Incohérent : tantôt "ericksonienne" (minuscule), tantôt "Ericksonienne" (majuscule). En français l'adjectif dérivé d'un nom propre prend la minuscule.

**Action :** Standardiser sur "ericksonienne".

#### Nom de marque

| Forme | Usage |
|---|---|
| **NovaHypnose** (1 mot, PascalCase) | Majoritaire et correct |
| Nova Hypnose (2 mots) | `testimonials.ts` ligne 7 |
| NOVA HYPNOSE (caps) | `TestimonialsCarousel.tsx` ligne 23 |

**Action :** Standardiser sur **"NovaHypnose"** partout.

### 3.5 Navigation et liens cassés

#### P0 — Liens d'ancrage cassés

| Lien | Source | Section ID réelle | Statut |
|---|---|---|---|
| `/#pricing` | `Custom404.tsx` (58), `NotFound.tsx` (100) | `tarifs` | **CASSÉ** |
| `/#comment-fonctionne` | `navigationData.ts` (32) | `how-it-works` (?) | **PROBABLEMENT CASSÉ** |

#### P1 — Autres problèmes de navigation

- `navigationData.ts` ligne 41 : lien vers `/peurdelavion.html` (fichier statique, pas une route SPA)
- URL Calendly contient "clone" dans le path : `zenatti/consultation-d-hypnose-paris-clone`
- Deux URLs Stripe différentes pour le même programme autohypnose (`QuizResults.tsx` vs `AutohypnosePricing.tsx`)

#### Dates obsolètes dans les témoignages

Les témoignages utilisent des dates relatives ("Il y a 2 semaines", "Il y a 8 semaines") qui deviennent fausses avec le temps. Les témoignages autohypnose datés de Nov-Déc 2024 / Jan 2025 précèdent la date de formation prévue (12 avril 2026).

#### Section `SeoContent` cachée

`src/components/SeoContent.tsx` ligne 5 : `aria-hidden="true"` — le contenu est invisible pour les lecteurs d'écran. Si c'est du contenu purement SEO caché des utilisateurs, Google peut considérer cela comme du cloaking.

---

## 4. Synthèse par priorité

### CRITIQUE (à corriger immédiatement)

1. **Pas de SSR/SSG** — le site est invisible pour les crawlers sociaux et partiellement invisible pour Google. Activer `vite-ssg` ou migrer vers un framework SSR.
2. **Script SEO black hat** (`generate-static-seo.cjs`) — supprimer immédiatement pour éviter une pénalité Google.
3. **Données structurées triplées et contradictoires** — unifier en une seule source de vérité.
4. **`.env` dans l'historique git** — retirer du tracking et faire tourner les clés.
5. **RLS trop permissive** sur `quiz_peur_avion` et `users` — données sensibles exposées.
6. **Contraste `nova-orange`** (#F37336) insuffisant pour le texte blanc — échec WCAG AA.
7. **Images sans dimensions** (dont LCP) — impact CLS et Core Web Vitals.

### HAUTE PRIORITÉ

8. **OG tags manquants** sur 7/10 pages publiques — partage social cassé.
9. **Canonical URLs manquantes** sur 5 pages.
10. **Liens d'ancrage cassés** (`/#pricing` au lieu de `/#tarifs`).
11. **"4 ans" vs "5 ans" d'expérience** — contradiction visible.
12. **"7j/7" vs Lun-Ven** — information contradictoire.
13. **Horaires d'ouverture contradictoires** (11h-20h vs 09h-19h).
14. **Libs serveur dans le bundle** (`stripe`, `resend`) — poids inutile.
15. **CSP dupliquées** — bloquent certains domaines analytics.
16. **GPTEngineer en production** — outil de dev chargé sur chaque page.

### PRIORITÉ MOYENNE

17. Adresse non standardisée (6 fichiers).
18. FAQ dupliquée et désynchronisée.
19. Témoignages carrousel non centralisés.
20. Deux pages 404 redondantes.
21. Erreurs de grammaire française (6 corrections).
22. Nom de marque inconsistant (3 variantes).
23. Voix "je" / "nous" inconsistante.
24. Polices non auto-hébergées.
25. `aria-live` absent pour le contenu dynamique.
26. Carrousel auto-avance sans pause.
27. Labels manquants sur les inputs recherche/adresse.

### PRIORITÉ BASSE

28. Preconnect `ik.imagekit.io` inutile.
29. Plugin `vite-plugin-critical-css.js` abandonné.
30. Favicon MIME type incorrect.
31. `next-themes` dans un projet non-Next.
32. `carouselData.ts` probablement obsolète.
33. Double slash dans une URL d'image.

---

## 5. Plan d'action recommandé

### Phase 1 — Urgences (1-2 jours)

- [ ] Supprimer `scripts/generate-static-seo.cjs` et tout usage du script `build:seo`
- [ ] `git rm --cached .env` et ajouter `.env` dans `.gitignore` (déjà fait, mais le fichier est encore traqué)
- [ ] Corriger les politiques RLS : `quiz_peur_avion` (admin only read) et `users` (own data only)
- [ ] Unifier les données structurées en un seul fichier source de vérité
- [ ] Corriger les liens cassés `/#pricing` → `/#tarifs`
- [ ] Corriger l'incohérence "4 ans" → "plus de 5 ans" dans `AutohypnoseProgram.tsx`
- [ ] Supprimer "7j/7" de `Contact.tsx`
- [ ] Retirer la CSP `unsafe-eval` si possible

### Phase 2 — SEO et Performances (1 semaine)

- [ ] Configurer `vite-ssg` pour le prerendering des pages statiques, ou adopter un framework SSR (Astro, Next.js)
- [ ] Ajouter les balises OG complètes sur toutes les pages publiques
- [ ] Ajouter `og:locale`, `og:site_name`, `hreflang` globalement
- [ ] Résoudre l'inconsistance canonical (slash final)
- [ ] Ajouter `width` et `height` sur toutes les `<img>` (en priorité le hero LCP)
- [ ] Déplacer `stripe` et `resend` dans les dépendances serveur uniquement
- [ ] Supprimer le script GPTEngineer de `index.html`
- [ ] Supprimer le preconnect `ik.imagekit.io`
- [ ] Nettoyer les plugins Vite cassés/abandonés
- [ ] Mettre `nova-orange` à #D85A1F (ou ajuster pour passer WCAG AA)

### Phase 3 — Éditorial et Qualité (3-5 jours)

- [ ] Standardiser l'adresse : "16 rue Saint-Antoine, 75004 Paris" partout
- [ ] Standardiser les horaires dans un seul fichier partagé
- [ ] Corriger les 6 erreurs de français identifiées
- [ ] Refactorer `Faq.tsx` pour importer depuis `faqData.ts`
- [ ] Centraliser les témoignages dans `TestimonialsCarousel.tsx`
- [ ] Supprimer `carouselData.ts` si obsolète
- [ ] Fusionner les 2 pages 404 en une seule
- [ ] Harmoniser la voix "je/mon" sur tout le site
- [ ] Standardiser le nom de marque "NovaHypnose"
- [ ] Remplacer les dates relatives par des dates absolues dans les témoignages
- [ ] Ajouter `aria-live` pour les mises à jour dynamiques
- [ ] Ajouter les labels manquants sur les inputs
- [ ] Ajouter un mécanisme de pause au carrousel

### Phase 4 — Améliorations (en continu)

- [ ] Auto-héberger les polices Google Fonts
- [ ] Implémenter des limites de taille pour les caches du Service Worker
- [ ] Augmenter le minimum de caractères pour le mot de passe admin (8+)
- [ ] Échapper les variables dans les templates email des Edge Functions
- [ ] Déplacer la clé Stripe dans une variable d'environnement
- [ ] Nettoyer la documentation (30+ fichiers .md, certains obsolètes)

---

*Audit réalisé le 6 février 2026 — Outils : analyse statique du code source, revue manuelle de tous les fichiers de données, composants, pages et configuration.*
