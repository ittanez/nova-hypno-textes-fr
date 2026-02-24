# Audit SEO Editorial - NovaHypnose.fr
## Fevrier 2026

**Date :** 24 fevrier 2026
**Domaine :** novahypnose.fr
**Framework :** React 18.3 + Vite (SPA) deploye sur Netlify
**Evaluateur :** Audit automatise

---

## Synthese executive

| Critere | Score | Tendance |
|---------|-------|----------|
| SEO technique | 7.5/10 | Stable |
| Contenu editorial | 8/10 | En hausse |
| Maillage interne | 6.5/10 | A ameliorer |
| Donnees structurees | 9/10 | Excellent |
| Meta tags et Open Graph | 8.5/10 | Bon |
| Architecture de l'information | 7/10 | A ameliorer |
| Opportunites SEO manquees | - | Significatives |

**Score global : 7.7/10**

---

## 1. SEO Technique

### 1.1 Probleme majeur : SPA React sans SSR/SSG

**Severite : CRITIQUE**

Le site est une SPA React pure. Meme si des Edge Functions Netlify (`seo-prerender`, `seo-prerender-static`) servent du HTML pre-rendu aux bots, cette architecture reste fragile pour le SEO :

- **Dependance aux Edge Functions** : Si une edge function echoue ou si un bot n'est pas detecte, il recoit un shell HTML vide avec un spinner.
- **index.html fallback** : Le fichier `index.html` ne contient que le titre/description de la page d'accueil. Toutes les autres pages heritent de ces meta tags fallback si le JS ne s'execute pas.
- **React Helmet cote client** : Les meta tags sont injectes cote client via `react-helmet`. Les crawlers qui n'executent pas le JS (Bingbot, certains crawlers IA) ne verront que le fallback.

**Recommandations :**
1. Migrer vers un framework avec SSR/SSG (Next.js, Astro, Remix) pour garantir que chaque page serve du HTML complet nativement
2. A defaut, s'assurer que toutes les Edge Functions couvrent TOUTES les pages (actuellement seules les pages blog et quelques pages statiques sont couvertes)
3. Ajouter les pages manquantes dans les edge functions : `/autohypnose`, `/test-receptivite`, `/zone-intervention`, `/guide-emotions-travail`, `/hypnose-professionnels-paris`

### 1.2 Robots.txt

**Score : 9/10**

Points positifs :
- Sitemap reference correctement (`https://novahypnose.fr/sitemap.xml`)
- Sections admin et API correctement bloquees
- Bots sociaux et IA autorises explicitement (GPTBot, Claude-Web, PerplexityBot, etc.)

Points a ameliorer :
- Le `Disallow: /*.json` bloque potentiellement des fichiers JSON utiles pour l'indexation
- Pas de mention de `User-agent: Bytespider` (TikTok) ou `User-agent: PetalBot` (Huawei)

### 1.3 Sitemap

**Score : 7/10**

Le sitemap est genere dynamiquement via une Supabase Edge Function (`/sitemap.xml` redirige vers `https://akrlyzmfszumibwgocae.supabase.co/functions/v1/generate-sitemap`).

Points d'attention :
- Impossible de verifier le contenu du sitemap sans executer la fonction
- La dependance a un service tiers (Supabase) pour le sitemap est un risque
- Verifier que TOUTES les pages sont incluses (specialites, autohypnose, zone-intervention, landing pages indexables, etc.)
- Verifier la presence des balises `<lastmod>`, `<changefreq>`, `<priority>` pour chaque URL

### 1.4 Canonical URLs

**Score : 8/10**

Points positifs :
- Toutes les pages de specialites ont une balise `<link rel="canonical">` explicite
- Les canonical sont coherents avec les `og:url`
- Le blog gere le contenu duplique entre domaines (`emergences.novahypnose.fr` et `novahypnose.fr`)

Incoherence detectee :
- `index.html` ligne 13 : canonical avec trailing slash `https://novahypnose.fr/`
- `Index.tsx` ligne 110 : canonical sans trailing slash `https://novahypnose.fr`
- Il faut uniformiser (sans trailing slash de preference, comme dans le reste du site)

### 1.5 Hreflang / Internationalisation

Non applicable - site uniquement en francais. Cependant, ajouter `<meta property="og:locale" content="fr_FR">` sur TOUTES les pages (deja present sur la plupart, a verifier).

---

## 2. Meta Tags et Open Graph

### 2.1 Page d'accueil

| Element | Valeur | Evaluation |
|---------|--------|------------|
| Title | `Hypnotherapeute Paris 4 \| Alain Zenatti - Hypnose` | OK (54 car.) |
| Description | `Hypnotherapeute a Paris 4eme, cabinet Marais-Bastille...` | OK (153 car.) |
| OG Title | `Hypnotherapeute Paris \| Alain Zenatti - Hypnose ericksonienne Marais-Bastille` | TROP LONG (76 car. > 60 recommandes) |
| OG Image | Image Supabase alain-nov2025.webp | OK |
| Keywords | Liste extensive | OK mais faible valeur SEO en 2026 |

### 2.2 Pages de specialites

| Page | Title (car.) | Description (car.) | Evaluation |
|------|-------------|-------------------|------------|
| Stress | 50 | 153 | OK |
| Phobies | 49 | 157 | OK |
| Sommeil | 51 | 155 | OK |
| Emotions | 52 | 158 | OK |
| Blocages | 51 | 156 | OK - mais "Zenatti" sans prenom dans le title |
| Confiance | 48 | 148 | OK |

**Probleme detecte sur Blocages :** Le title est `Hypnose blocages et comportements Paris | Zenatti` au lieu de `| Alain Zenatti`. L'absence du prenom est incoherente avec les autres pages et affaiblit la reconnaissance de marque.

### 2.3 Pages secondaires

| Page | Title | Description | Problemes |
|------|-------|-------------|-----------|
| Autohypnose | `Formation Auto-hypnose Paris - Harmonia \| NovaHypnose` | OK | Title coherent |
| Test receptivite | Non visible dans le code lu | A verifier | Verifier que Helmet est bien configure |
| Zone intervention | `Zone d'intervention Paris \| Cabinet Hypnose Bastille` | OK | Bonne optimisation locale |
| Landing pro | `Hypnose stress au travail Paris \| Alain Zenatti` | OK | Bien cible |
| Guide ebook | A verifier | A verifier | S'assurer que `noindex` est bien present (landing isolee) |
| Blog index | Gere via SEOHead | OK | Bien structure |

### 2.4 Twitter Cards

Toutes les pages ont `twitter:card = summary_large_image`, ce qui est correct. Le `twitter:site` est present uniquement sur la page d'accueil (`@novahypnose`). **A ajouter sur toutes les pages.**

---

## 3. Donnees structurees (Schema.org)

### 3.1 Page d'accueil

**Score : 9/10** - Implementation exemplaire.

4 schemas injectes :
1. **LocalBusiness** (`HealthAndBeautyBusiness`) : Complet avec adresse, horaires, prix, avis, catalogue de services
2. **Person** : Alain Zenatti avec credentials, certifications, competences
3. **FAQPage** : Genere dynamiquement depuis `faqData.ts` (21 questions)
4. **BreadcrumbList** : Minimal mais present

Points d'amelioration :
- `aggregateRating.reviewCount: "40"` -> A mettre a jour regulierement avec le nombre reel d'avis Google
- Ajouter `@type: "WebSite"` avec `potentialAction: SearchAction` pour le sitelinks search box
- Le `logo` pointe vers `favicon.ico` - devrait pointer vers un vrai logo au format image (PNG/WebP)

### 3.2 Pages de specialites

Chaque page a :
- `Service` schema avec provider reference au `#person`
- `BreadcrumbList` a 2 niveaux

**Manquant :**
- Schema `FAQPage` pour les FAQ de specialites (les FAQ sont presentes dans le DOM via `SpecialtyFAQ` mais pas dans le JSON-LD). C'est une opportunite manquee majeure pour les rich snippets FAQ.
- Schema `MedicalCondition` ou `MedicalTherapy` qui pourrait renforcer le E-E-A-T medical

### 3.3 Blog

Le composant `SEOHead` gere les schemas pour les articles. Verifier que chaque article de blog a :
- `Article` ou `BlogPosting` schema
- `author` reference vers le `Person` schema
- `datePublished` et `dateModified`

### 3.4 Landing pages

La page `LandingProfessionnels` a son propre schema `Service` et `BreadcrumbList`. C'est bien.

**Manquant :** Schema `Event` pour la formation auto-hypnose (page `/autohypnose`) qui pourrait enrichir les resultats de recherche.

---

## 4. Contenu editorial

### 4.1 Page d'accueil

**Score : 8/10**

Structure de contenu riche et bien organisee :
- Hero carousel avec CTA immediat
- Section problemes professionnels (identification du public cible)
- Section a propos (credibilite)
- Section "Pourquoi choisir" (argumentation)
- Applications de l'hypnose
- Deroulement d'une seance
- Parcours hypnotherapie
- Tarifs
- Temoignages
- Contact
- Auto-hypnose
- FAQ (21 questions)

**Probleme identifie :** Le composant `SeoContent.tsx` (section SEO bas de page) a l'attribut `aria-hidden="true"`. Cela signifie que le contenu est masque aux lecteurs d'ecran mais reste visible aux moteurs de recherche. Google pourrait interpreter cela comme du contenu cache/spam si la section est aussi visuellement masquee ou de faible qualite.

**Recommandation :** Soit integrer ce contenu de maniere naturelle dans la page, soit le supprimer s'il n'apporte pas de valeur reelle aux utilisateurs.

### 4.2 Pages de specialites

**Score : 8.5/10** - Contenu editorial de tres bonne qualite.

Chaque page de specialite (6 pages) suit une structure coherente et efficace :

1. **Hero** avec H1 bien optimise, sous-titre descriptif, CTA
2. **Section probleme** : Identification empathique du probleme du visiteur
3. **Section methode** : Explication de l'approche hypnose ericksonienne
4. **Section praticien** : Presentation d'Alain Zenatti, credibilite
5. **Cas concrets** : 3 etudes de cas anonymisees (excellent pour E-E-A-T)
6. **Temoignage** : Citation d'un avis Google verifie
7. **Resultats chiffres** : 90% d'amelioration, 3-5 seances, 5/5 note
8. **FAQ specifique** : 5 questions contextuelles
9. **Articles de blog lies** : Maillage vers le contenu du blog
10. **CTA final** : Avec liens croises vers les autres specialites

**Points forts :**
- Les etudes de cas sont credibles et detaillees (prenoms modifies, contexte realiste)
- Les FAQ sont specifiques a chaque specialite (pas de contenu duplique)
- Le maillage entre specialites est present dans chaque CTA final
- Les meta descriptions sont uniques et bien calibrees

**Points a ameliorer :**
- Aucune page n'a d'images specifiques dans le contenu (meme image OG pour toutes)
- Il manque des sources/references scientifiques pour renforcer le E-E-A-T
- Les statistiques (90%, 3-5 seances) devraient etre sourcees ou qualifiees

### 4.3 Qualite de la FAQ

**Score : 9/10**

La FAQ principale (21 questions dans `faqData.ts`) couvre :
- Questions generales sur l'hypnose (8 questions)
- Questions sur le deroulement (3 questions)
- Questions pratiques/logistiques (7 questions : acces, parking, gares, paiement)
- Questions de localisation (3 questions)

Les FAQ de specialites (5 questions chacune dans `specialtyFaqData.ts`) sont :
- Pertinentes et specifiques a chaque thematique
- Bien redigees avec des reponses detaillees (150-300 mots chacune)
- Optimisees pour les PAA (People Also Ask) de Google

**Opportunite manquee :** Les FAQ de specialites ne sont pas indexees dans un schema `FAQPage` JSON-LD sur leurs pages respectives. C'est l'une des actions les plus impactantes a mettre en oeuvre.

### 4.4 Blog

**Score : 7/10**

Le blog est alimente depuis Supabase avec un systeme de categories, tags et pagination. L'infrastructure est solide mais :

- Les articles du blog sont charges dynamiquement via API, rendant le contenu invisible aux crawlers sans JavaScript (meme probleme SPA)
- Les Edge Functions `seo-prerender` pour le blog sont en place, ce qui compense partiellement
- Le composant `SEOHead` gere correctement les meta tags avec normalisation des URLs et troncature intelligente des titres
- Les articles de blog supportent les FAQ (`BlogArticleFAQ`), ce qui est excellent

---

## 5. Maillage interne

### 5.1 Navigation principale

**Score : 7/10**

La navigation est riche avec 6 sections dropdown :
1. Accueil
2. A propos (Presentation, Temoignages)
3. L'hypnose (Comment fonctionne, Auto-hypnose, Deroulement, Test receptivite)
4. Specialites (6 pages)
5. Mes accompagnements (Applications, Formation auto-hypnose)
6. Blog
7. Infos pratiques (Tarifs, FAQ, Zone intervention, Contact)

**Probleme :** Le lien vers la formation auto-hypnose dans la navigation pointe vers `https://novahypnose.fr/autohypnose` avec `external: true`, ce qui cree un lien externe vers son propre domaine. Cela devrait etre un lien interne (`/autohypnose`).

### 5.2 Footer

**Score : 7.5/10**

Le footer contient 4 colonnes :
1. A propos + App mobile
2. Navigation rapide (8 liens)
3. Specialites (6 liens)
4. Contact + RDV

**Probleme :** Les liens de navigation rapide du footer utilisent des `<button>` avec `onClick` au lieu de `<a>` ou `<Link>`. Les crawlers ne suivent pas les evenements JavaScript `onClick` sur des boutons. **Ces liens sont invisibles pour les moteurs de recherche.**

**Recommandation :** Remplacer les `<button onClick={...}>` du footer par des `<Link to="/#section">` ou `<a href="/#section">` pour que les crawlers puissent suivre ces liens.

### 5.3 Liens croises entre specialites

**Score : 8/10**

Chaque page de specialite inclut des liens vers les autres specialites dans le CTA final. C'est un excellent maillage en silo. Les liens incluent aussi le blog et le test de receptivite.

### 5.4 Liens manquants

Pages orphelines ou faiblement reliees :
- `/zone-intervention` : Presente uniquement dans "Infos pratiques" du header et non dans le footer
- `/guide-emotions-travail` : Landing page isolee (normal pour une landing), mais aucun lien depuis les pages de specialites "stress" ou "emotions"
- `/autohypnose` : Lien dans la navigation mais pas dans les pages de specialites concernees (stress, sommeil)
- `/test-receptivite` : Present dans la navigation et dans les CTA des specialites, bon maillage

---

## 6. Opportunites SEO manquees

### 6.1 Pages de contenu a creer (priorite haute)

| Page suggeree | URL proposee | Volume de recherche estime |
|---------------|-------------|---------------------------|
| Hypnose arret tabac Paris | `/hypnose-arret-tabac-paris` | Eleve |
| Hypnose perte de poids Paris | `/hypnose-perte-poids-paris` | Eleve |
| Hypnose peur avion Paris | `/hypnose-peur-avion-paris` | Moyen-Eleve |
| Hypnose deuil Paris | `/hypnose-deuil-paris` | Moyen |
| Hypnose couple Paris | `/hypnose-couple-paris` | Moyen |
| Hypnose enfant Paris | `/hypnose-enfant-paris` | Moyen (note: politique actuelle = pas de mineurs) |

**Note :** La page statique `public/peurdelavion.html` (185 Ko) existe mais n'est pas integree dans la SPA React. C'est une perte d'opportunite SEO significative. Cette page devrait etre integree en tant que page de specialite comme les 6 autres, avec le meme format et maillage.

### 6.2 Contenu local a renforcer

- Creer des pages par arrondissement : "Hypnotherapeute Paris 11", "Hypnotherapeute Bastille", "Hypnotherapeute Marais"
- La page `/zone-intervention` est un bon debut mais pourrait etre enrichie avec du contenu unique par zone
- Ajouter les schemas `LocalBusiness` sur les pages de specialites (pas uniquement sur l'accueil)

### 6.3 Schemas manquants

| Schema | Page | Impact |
|--------|------|--------|
| FAQPage JSON-LD | 6 pages de specialites | **ELEVE** - Rich snippets FAQ |
| WebSite + SearchAction | Page d'accueil | Moyen - Sitelinks search box |
| Event | /autohypnose | Moyen - Rich snippet evenement |
| HowTo | Pages specialites | Faible - Rich snippet etapes |
| VideoObject | Page d'accueil (carrousel video) | Moyen - Rich snippet video |

### 6.4 Contenu duplique potentiel

- Le composant `SeoContent.tsx` repete des informations deja presentes dans d'autres sections de la page d'accueil. Risque de cannibalisation interne.
- Les descriptions meta des pages Stress et Emotions sont tres similaires dans leur structure ("Liberez-vous du stress..." / "Gerez vos emotions par l'hypnose..."). Suffisamment differenciees pour ne pas poser probleme, mais a surveiller.

---

## 7. Performance SEO

### 7.1 Core Web Vitals

L'infrastructure technique est bien optimisee :
- **LCP** : Preload de l'image hero carousel, CSS critique inline, lazy loading des sections below-the-fold
- **CLS** : Squelette hero stabilise, dimensions d'images definies
- **INP** : Chargement differe de Google Analytics (8s), Lucky Orange (8s)
- **Cache** : Headers de cache agressifs pour les assets statiques (1 an immutable)

### 7.2 Points de vigilance performance

- Google Analytics charge a 8s : acceptable mais le GA4 pourrait etre charge plus tot pour ne pas perdre de donnees de session
- Fonts : Les polices Playfair Display et Poppins sont auto-hebergees via @fontsource, bon point
- Images : Toutes les images de contenu sont hebergees sur Supabase Storage avec transformation d'image (resize, quality), bon point

---

## 8. Problemes specifiques detectes

### 8.1 SeoContent avec aria-hidden="true"

**Fichier :** `src/components/SeoContent.tsx:5`
**Probleme :** La section de contenu SEO a `aria-hidden="true"`, ce qui la masque aux technologies d'assistance. Si cette section est egalement visuellement distincte (style different, taille reduite), Google pourrait la considerer comme du cloaking ou du contenu de faible qualite.
**Action :** Supprimer `aria-hidden="true"` ou integrer le contenu naturellement dans les autres sections.

### 8.2 Lien autohypnose en externe

**Fichier :** `src/components/header/navigationData.ts:49`
**Probleme :** `{ name: 'Formation auto-hypnose', href: 'https://novahypnose.fr/autohypnose', external: true }`
Ce lien est traite comme un lien externe (nouvel onglet, noopener noreferrer) alors qu'il pointe vers le meme domaine.
**Action :** Remplacer par `{ name: 'Formation auto-hypnose', href: '/autohypnose' }` sans `external`.

### 8.3 Boutons du footer non crawlables

**Fichier :** `src/components/Footer.tsx:82-143`
**Probleme :** Les 8 liens de navigation rapide du footer utilisent `<button onClick={...}>` au lieu de `<a>` ou `<Link>`. Les moteurs de recherche ne peuvent pas suivre ces liens.
**Action :** Remplacer par `<Link to="/#about">`, `<Link to="/#applications">`, etc.

### 8.4 Page peur de l'avion non integree

**Fichier :** `public/peurdelavion.html` (185 Ko)
**Probleme :** Page HTML statique complete hors de la SPA React. Pas de lien depuis la navigation principale. Contenu potentiellement riche et non exploite pour le SEO.
**Action :** Creer une page React `/hypnose-peur-avion-paris` sur le meme modele que les 6 specialites existantes.

### 8.5 Incoherence canonical page d'accueil

**Fichiers :** `index.html:13` vs `src/pages/Index.tsx:110`
**Probleme :** Le fallback HTML a un canonical avec trailing slash (`https://novahypnose.fr/`) tandis que React Helmet le definit sans trailing slash (`https://novahypnose.fr`).
**Action :** Uniformiser vers `https://novahypnose.fr` (sans slash).

### 8.6 Schema LocalBusiness : logo incorrect

**Fichier :** `src/data/schemaOrg.ts:41`
**Probleme :** `"logo": "https://novahypnose.fr/favicon.ico"` - Le logo doit etre une image (PNG, WebP, SVG) et non un favicon ICO.
**Action :** Remplacer par le logo reel au format image.

### 8.7 reviewCount potentiellement obsolete

**Fichier :** `src/data/schemaOrg.ts:127`
**Probleme :** `"reviewCount": "40"` est en dur. Si le nombre d'avis Google evolue, cette valeur sera incorrecte et Google pourrait penaliser pour donnees structurees trompeuses.
**Action :** Mettre a jour regulierement ou automatiser la recuperation du nombre d'avis.

---

## 9. Plan d'action prioritaire

### Priorite 1 - Impact eleve, effort faible

1. **Ajouter le schema FAQPage JSON-LD sur les 6 pages de specialites** (utiliser les donnees de `specialtyFaqData.ts`)
2. **Corriger les boutons du footer** : Remplacer `<button>` par `<Link>` pour le crawlabilite
3. **Corriger le lien autohypnose** : Passer de `external: true` a un lien interne
4. **Uniformiser le canonical** de la page d'accueil (sans trailing slash)
5. **Corriger le title de la page Blocages** : "Zenatti" -> "Alain Zenatti"

### Priorite 2 - Impact eleve, effort moyen

6. **Integrer la page peur de l'avion** dans la SPA comme 7eme specialite
7. **Ajouter les pages manquantes dans les Edge Functions** seo-prerender-static
8. **Supprimer ou reformer** `SeoContent.tsx` (aria-hidden)
9. **Corriger le logo** dans le schema LocalBusiness
10. **Ajouter twitter:site** sur toutes les pages

### Priorite 3 - Impact moyen, effort moyen

11. **Creer la page "Hypnose arret tabac Paris"** (forte demande)
12. **Creer la page "Hypnose perte de poids Paris"** (forte demande)
13. **Ajouter le schema WebSite + SearchAction** sur la page d'accueil
14. **Enrichir les pages specialites avec des references scientifiques**
15. **Ajouter un schema Event** pour la formation auto-hypnose

### Priorite 4 - Impact strategique, effort eleve

16. **Migration SSR/SSG** : Envisager Next.js ou Astro pour resoudre definitivement le probleme SPA/SEO
17. **Creer des pages d'arrondissement** pour le SEO local
18. **Automatiser la mise a jour du reviewCount** dans le schema

---

## 10. Recapitulatif des forces

- Donnees structurees Schema.org de haute qualite sur la page d'accueil
- Contenu editorial des pages de specialites riche, credible et bien structure (etudes de cas, FAQ, temoignages)
- Meta tags et Open Graph correctement configures sur toutes les pages principales
- Maillage entre les specialites bien implemente
- Edge Functions pour le pre-rendu SEO des pages blog
- FAQ de 21 questions couvrant les interrogations cles des prospects
- Robots.txt complet avec autorisation des bots IA
- Performance Web optimisee (lazy loading, cache, preload LCP)

---

## Annexe : Inventaire des pages indexables

| URL | Title | Statut SEO |
|-----|-------|-----------|
| `/` | Hypnotherapeute Paris 4 \| Alain Zenatti | OK |
| `/hypnose-stress-anxiete-paris` | Hypnose stress et anxiete Paris | OK |
| `/hypnose-phobies-paris` | Hypnose phobies et peurs Paris | OK |
| `/hypnose-sommeil-paris` | Hypnose sommeil et insomnie Paris | OK |
| `/hypnose-gestion-emotions-paris` | Hypnose gestion des emotions Paris | OK |
| `/hypnose-blocages-paris` | Hypnose blocages et comportements Paris | Fix title |
| `/hypnose-confiance-en-soi-paris` | Hypnose confiance en soi Paris | OK |
| `/hypnose-professionnels-paris` | Hypnose stress au travail Paris | OK |
| `/autohypnose` | Formation Auto-hypnose Paris | Manque Edge Function |
| `/test-receptivite` | Test de receptivite hypnose | Manque Edge Function |
| `/zone-intervention` | Zone d'intervention Paris | Manque Edge Function |
| `/blog` | Blog NovaHypnose | OK (Edge Function) |
| `/blog/article/*` | Dynamique | OK (Edge Function) |
| `/blog/categorie/*` | Dynamique | OK (Edge Function) |
| `/blog/categories` | Categories blog | OK (Edge Function) |
| `/mentions-legales` | Mentions legales | OK |
| `/guide-emotions-travail` | Landing guide (noindex ?) | A verifier |
| `/404` | Page erreur 404 | noindex (correct) |

---

*Fin de l'audit SEO editorial - Fevrier 2026*
