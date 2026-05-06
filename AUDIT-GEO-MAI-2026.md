# AUDIT GEO — Generative Engine Optimization
**Site :** novahypnose.fr (Alain Zenatti, hypnothérapeute, Paris 4ᵉ)
**Date :** mai 2026
**Branche :** `claude/audit-geo-luWrO`
**Périmètre :** visibilité dans les moteurs de réponse génératifs (ChatGPT Search, Perplexity, Google AI Overviews / SGE, Claude, Gemini, Bing Copilot).

---

## 1. Résumé exécutif

Le site dispose d'**excellentes fondations GEO** rarement vues sur un site de praticien : robots.txt explicitement ouvert à tous les bots IA majeurs, JSON-LD riche (HealthAndBeautyBusiness + Person + FAQPage + AggregateRating), prerendering Edge sur Netlify pour les pages stratégiques, et un maillage Paris (20 arrondissements + Marais/Bastille) très complet dans `areaServed`.

Les **3 leviers prioritaires** pour gagner en citations IA sont :
1. **E-E-A-T santé** — absence du n° ADELI / SIRET et des affiliations professionnelles (SFH, syndicat).
2. **`llms.txt`** manquant — convention émergente attendue par Perplexity / OpenAI.
3. **BreadcrumbList tronquée** (1 seul item) et **Article schema** non déployé sur les pages spécialités SPA.

Le reste est de l'optimisation incrémentale.

---

## 2. Accès des crawlers IA — **EXCELLENT**

`public/robots.txt:25-65` autorise explicitement : GPTBot, ChatGPT-User, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, GoogleOther, Applebot, Applebot-Extended, Bard, Gemini, Meta-ExternalAgent, CCBot, Diffbot, omgili.

**Points d'attention :**
- `Disallow: /*.json` (ligne 9) bloque tous les fichiers JSON publics. Pas un problème en soi (les JSON-LD sont inline dans le HTML), mais à vérifier si un futur endpoint d'API publique de contenu était souhaité.
- Bots manquants à ajouter par hygiène : `OAI-SearchBot` (distinct de GPTBot, dédié à ChatGPT Search), `ClaudeBot` et `Claude-User` (les noms canoniques Anthropic ; `Claude-Web` est legacy), `Perplexity-User`, `Bytespider`, `Amazonbot`, `DuckAssistBot`, `cohere-ai`, `MistralAI-User`.

---

## 3. Données structurées (JSON-LD) — **FORT, MAIS INCOMPLET**

### Existant
| Schéma | Fichier | Observations |
|---|---|---|
| `HealthAndBeautyBusiness` | `src/data/schemaOrg.ts:8-182` | `@id`, adresse, `geo`, `openingHours`, 3 `Offer` à 90/110/140 €, `priceRange`, `areaServed` (20 arrond. + Marais/Bastille), `paymentAccepted` |
| `AggregateRating` + 3 `Review` | `schemaOrg.ts:147-180` | 3 avis nominatifs avec `reviewBody` |
| `Person` (Alain Zenatti) | `schemaOrg.ts:184-241` + `src/pages/AuthorPage.tsx:23-67` | `jobTitle`, `image`, 4 `hasCredential`, `knowsAbout`, `worksFor` lié au LocalBusiness |
| `FAQPage` (générique site) | `schemaOrg.ts:243-254` + `src/components/FAQSchema.tsx:8-65` | 7 Q/R |
| `FAQPage` spécialités | `src/data/specialtyFaqData.ts` | 154 lignes — déployé via `SpecialtyFAQ.tsx` |
| `Article` blog | `src/pages/blog/ArticlePage.tsx:149-160` | `datePublished`, `dateModified`, `author` ✅ |
| `BreadcrumbList` | `schemaOrg.ts:256-267` | **⚠️ 1 seul item ("Accueil")** — schéma incomplet, à étendre par page |

### Lacunes prioritaires
- **`HealthAndBeautyBusiness` n'est pas le type le plus précis.** `MedicalBusiness` ou un sous-type (`MedicalClinic`) signale plus clairement la verticale santé aux LLM. Si la qualification médicale n'est pas revendiquée (l'hypnose n'étant pas une profession médicale en France), conserver `HealthAndBeautyBusiness` et **ajouter en parallèle un `ProfessionalService`** est une option neutre.
- **`MedicalCondition` / `MedicalTherapy`** absents. Les pages spécialités (`HypnoseStressParis.tsx`, `HypnosePhobiesParis.tsx`, `HypnoseSommeilParis.tsx`, `HypnoseEmotionsParis.tsx`, `HypnoseConfianceParis.tsx`, `HypnoseBlocagesParis.tsx`) gagneraient un schéma `Service` (ou `MedicalTherapy` si formulé prudemment) avec `serviceType`, `provider` et `areaServed`. Ce sont les schémas que Perplexity exploite pour les requêtes "hypnose stress paris".
- **`Person` sans n° ADELI / SIRET.** Voir §6.
- **`recognizedBy` sans `url`.** Ajouter `"url": "https://www.psynapse.fr/"` à chaque credential — un LLM préfère une autorité vérifiable à un nom.
- **`Person.alumniOf` manquant** alors que la formation Psynapse est citée 9 fois dans `AuthorPage.tsx:164-167`.
- **`BreadcrumbList` tronquée** — page d'accueil seulement. Chaque page (blog, spécialité, mentions légales) doit injecter sa propre breadcrumb.
- **Pas de schéma `Course` / `Book`** pour les e-books (`GuideEbook`, `GuideAutohypnose`, `GuideSommeil`, `GuideProcrastination`) — opportunité manquée pour les requêtes "livre auto-hypnose" / "guide hypnose sommeil".

---

## 4. Rendu pour crawlers IA (SPA + Edge prerender) — **CORRECT, À VÉRIFIER**

`netlify.toml` active des Edge Functions `seo-prerender` et `seo-prerender-static` sur les routes /blog et les 11 pages spécialités. C'est la bonne stratégie pour une SPA Vite.

**À auditer manuellement :**
- Tester une requête `curl -A "PerplexityBot" https://novahypnose.fr/hypnose-stress-paris` et vérifier que le HTML de réponse contient bien le corps éditorial **et** les JSON-LD, sans `<div id="root"></div>` vide.
- Vérifier la latence du prerender Edge (timeout par défaut Netlify : 50 ms d'init, 30 s exec). Les bots IA ont des timeouts courts (5-10 s) ; un Edge prerender qui interroge Supabase à chaque hit risque la latence.
- `public/sw.js` — vérifier qu'il n'intercepte pas les requêtes des user-agents bots (un service worker mal configuré peut servir une coquille vide).

---

## 5. Citabilité par les LLM — contenu et factualité

Les LLM citent préférentiellement les pages qui :
1. **Définissent** clairement un terme dans la première phrase ("L'hypnose ericksonienne est…").
2. Présentent des **listes** (les LLM extraient des bullets verbatim).
3. **Citent des sources** datées avec URL.
4. Affichent des **dates** de publication / mise à jour.
5. Contiennent **15+ Q/R** sur le thème.

**Constats :**
- ✅ Articles blog : `datePublished` + `dateModified` + `author` présents (`ArticlePage.tsx:156-160`).
- ⚠️ Pages spécialités (`HypnoseStressParis.tsx` etc.) : aucune date visible côté utilisateur ni dans un schéma `Article`/`MedicalWebPage`. Les LLM les considéreront comme "intemporelles" donc moins prioritaires que des sources datées.
- ⚠️ Affirmations sans source : "résultats en 3-5 séances" (`schemaOrg.ts:42`), chiffres de réussite. Sur un sujet santé, les engines IA modernes (Perplexity, Google AI Overviews) déclassent les contenus médicaux non sourcés. **Ajouter une section "Références" en bas de chaque page spécialité** avec au minimum 2-3 liens vers : INSERM, HAS, études PubMed, ou ouvrages de Milton Erickson / François Roustang.
- ✅ FAQ : 7 (générale) + ~15 (spécialités via `specialtyFaqData.ts`) Q/R, c'est un bon volume pour les snippets ChatGPT/Perplexity.
- ⚠️ Pas de section "À propos de cet article" / "Méthodologie" / "Dernière mise à jour" visible utilisateur sur les pages spécialités.

---

## 6. E-E-A-T santé — **POINT FAIBLE**

Sur un sujet **YMYL** (Your Money or Your Life — santé), les LLM appliquent des filtres E-E-A-T renforcés.

| Signal | Statut |
|---|---|
| Identité réelle du praticien | ✅ Alain Zenatti, photo, adresse |
| Diplômes listés | ✅ 4 dans `schemaOrg.ts:206-230`, 9 dans `AuthorPage.tsx:164` |
| Organisme certificateur | ✅ École Psynapse cité, mais **sans URL** |
| Année d'obtention des certifications | ✅ visible dans `AuthorPage.tsx` (2021-2025) — **non remontée dans le JSON-LD** |
| **N° ADELI / RPPS** | ❌ absent (l'hypnothérapeute n'a pas de n° ADELI obligatoire en France, mais s'il existe il doit être affiché) |
| **N° SIRET** | ❌ absent — vérifier dans `MentionsLegales` (légalement requis et signal de fiabilité fort pour les LLM) |
| Affiliation syndicale (SFH, IFH, NGH, Syndicat National des Hypnothérapeutes) | ❌ absente |
| Mentions presse / interviews | ❌ aucune dans `sameAs` |
| LinkedIn / Profil professionnel | ❌ absent de `sameAs` (qui ne contient qu'Instagram + Resalib) |
| `Person.medicalSpecialty` | ❌ non exploité (champ existe sur `Physician`, à reformuler en `knowsAbout` étendu) |

**Action immédiate à fort impact :** enrichir `sameAs` du `Person` avec LinkedIn, Doctolib si présent, Pages Jaunes Pro, Resalib (déjà), Wikidata si une fiche existe. Chaque entrée `sameAs` est un signal d'identité que les LLM utilisent pour résoudre l'entité "Alain Zenatti hypnothérapeute".

---

## 7. Sitemap & maillage interne

- **Sitemap** : généré par `scripts/generate-sitemap.js` en prebuild. À ouvrir pour vérifier que toutes les pages spécialités, guides et articles blog sont inclus avec `lastmod` cohérent.
- **Maillage** : `Header.tsx`, `Footer.tsx` et `BlogArticlesSlider.tsx` constituent les hubs. **Recommandation** : créer un cluster sémantique explicite — chaque page spécialité (Stress, Phobies, Sommeil, Émotions, Confiance, Blocages) doit linker vers 2-3 articles blog associés et vers 1-2 autres pages spécialités proches. Les LLM exploitent la profondeur de cluster pour évaluer l'autorité topique.
- **Page `ZoneIntervention.tsx`** existe — vérifier qu'elle liste bien chaque arrondissement comme entité linkée et que chacun renvoie vers la page d'accueil avec ancre. C'est un atout local-GEO majeur.

---

## 8. Fichiers spécifiques IA — **MANQUANTS**

- ❌ `public/llms.txt` — convention proposée par llmstxt.org, déjà adoptée par Stripe, Anthropic, Mintlify. Donne aux LLM un index curé du site (titres + URLs + descriptions courtes).
- ❌ `public/llms-full.txt` — variante avec contenu inline (utile pour fine-tuning).
- ❌ `public/.well-known/ai.txt` — convention émergente (moins répandue que llms.txt).
- ❌ Pas de méta `<meta name="robots" content="max-snippet:-1, max-image-preview:large">` dans `index.html` — utile pour autoriser les snippets longs dans les AI Overviews.

---

## 9. Open Graph, hreflang, canonicals

- `index.html:2` : `<html lang="fr">` ✅
- Canonical site root : `index.html:15` ✅
- ⚠️ **Pas de hreflang** — si une version anglophone (`/en/`) ou un projet international est envisagé, le prévoir. Sinon, ajouter `<link rel="alternate" hreflang="fr-FR" href="...">` et `hreflang="x-default"` est une bonne hygiène.
- Per-page OG/canonical : injectés via `react-helmet` côté React. **À vérifier que le prerender Edge les capture bien dans le HTML servi aux bots** (test curl recommandé en §4).

---

## 10. Punch-list priorisée

### 🔴 Priorité 1 — Impact GEO élevé, effort faible (1-2 j)
1. **Créer `public/llms.txt`** avec : qui est Alain Zenatti, adresse, spécialités, liste des 6 pages spécialités + 5 articles blog phares + page contact.
2. **Compléter `Person.sameAs`** dans `schemaOrg.ts:193` : LinkedIn, Doctolib (si applicable), Pages Jaunes Pro, profil syndical.
3. **Ajouter SIRET** au `LocalBusiness` (`"identifier": [{"@type": "PropertyValue", "propertyID": "SIRET", "value": "..."}]`) et le rendre visible sur `MentionsLegales`.
4. **Étendre `BreadcrumbList`** par page (homepage / blog / article / spécialité / mentions) au lieu d'un schéma unique tronqué.
5. **Ajouter `url` aux `recognizedBy`** des credentials (`https://www.psynapse.fr/`).
6. **Compléter robots.txt** : OAI-SearchBot, ClaudeBot, Claude-User, Perplexity-User.

### 🟠 Priorité 2 — Impact moyen (3-5 j)
7. Ajouter un schéma **`Service`** (ou `MedicalTherapy` formulé prudemment) sur chacune des 6 pages `Hypnose*Paris.tsx`, avec `provider`, `areaServed`, `serviceType`, `offers`.
8. Sur chaque page spécialité, afficher une **date de mise à jour** visible utilisateur + injecter un schéma `WebPage` avec `dateModified`.
9. Sur chaque page spécialité, ajouter une section **"Références scientifiques"** avec 2-3 liens vers INSERM / HAS / études peer-reviewed.
10. Tester `curl -A "PerplexityBot"` et `curl -A "GPTBot"` sur les pages clés ; vérifier que le HTML servi est complet (corps + JSON-LD).
11. Vérifier que `public/sw.js` n'intercepte pas les bots IA.
12. Étendre l'`AggregateRating` à 10+ avis (Google Business Profile import) — 3 reviews est faible pour un déclencheur de citation IA.

### 🟢 Priorité 3 — Optimisations long-terme
13. Ajouter `Course` ou `Book` schema aux 4 pages guides e-book.
14. Créer une page **"Méthodologie"** publique expliquant comment Alain travaille (les LLM citent ces pages comme sources d'autorité).
15. Publier 2-3 articles "Q/R formatés" longs (`Comment l'hypnose agit-elle sur le stress chronique ?`) avec 15+ paires Q/R chacun et schéma FAQ — formats préférés par Perplexity et AI Overviews.
16. Suivi : mesurer dans Google Search Console les impressions sur "AI Overview" (filtre disponible début 2026) et dans Bing Webmaster Tools les "Copilot impressions".

---

## 11. Méthodologie

Audit conduit par exploration statique du code source (branche `claude/audit-geo-luWrO`, commit propre). Les pages servies en production n'ont pas été testées en HTTP — les recommandations §4 (test `curl -A`) doivent être exécutées avant de clore le ticket.

**Fichiers clés référencés :**
- `public/robots.txt`
- `src/data/schemaOrg.ts`
- `src/components/FAQSchema.tsx`
- `src/data/specialtyFaqData.ts`
- `src/pages/AuthorPage.tsx`
- `src/pages/blog/ArticlePage.tsx`
- `src/pages/Hypnose*Paris.tsx` (6 fichiers)
- `netlify.toml`
- `scripts/generate-sitemap.js`
