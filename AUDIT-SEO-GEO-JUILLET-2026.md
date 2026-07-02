# AUDIT SEO & GEO — Juillet 2026

**Site :** novahypnose.fr (Alain Zenatti, hypnothérapeute, Paris 4ᵉ)
**Date :** 2 juillet 2026
**Branche :** `claude/seo-geo-site-audit-paceh1`
**Périmètre :** SEO technique, SEO local, GEO (Generative Engine Optimization — ChatGPT, Claude, Perplexity, Google AI Overviews/AI Mode, Gemini, Copilot).
**Référence :** fait suite à `AUDIT-GEO-MAI-2026.md` — mesure les progrès et identifie les écarts restants.

---

## 1. Résumé exécutif

**Le socle est excellent et la quasi-totalité des priorités 1 de l'audit de mai 2026 a été traitée** : `llms.txt` créé et riche, robots.txt ouvert à tous les crawlers IA (y compris les noms canoniques ClaudeBot / OAI-SearchBot / Perplexity-User), SIRET dans le JSON-LD, `alumniOf` + URLs des certifications, breadcrumbs par page, 9 avis dans le schéma, schémas `Service` + FAQ + références scientifiques sur les pages spécialités.

**Mais un problème structurel majeur est apparu depuis : le site a doublé de taille (≈47 pages statiques) et l'infrastructure SEO n'a pas suivi.** Trois systèmes doivent être synchronisés à chaque nouvelle page (sitemap Supabase, edge function de prerender, llms.txt) et aucun ne l'a été :

| Système | Pages couvertes | Pages manquantes |
|---|---|---|
| Sitemap production (fonction Supabase) | 47 | **10** (dont la toute nouvelle page tabac) |
| Prerender bots (`seo-prerender-static.ts`) | 26 | **≈21 pages spécialités** |
| `llms.txt` | 8 spécialités | **≈21 pages spécialités** |

Conséquence directe : **environ la moitié des pages spécialités est invisible pour Bing, ChatGPT, Claude et Perplexity** (crawlers sans JavaScript), qui reçoivent une coquille SPA vide avec le title générique de la homepage et un canonical pointant vers `https://novahypnose.fr`.

**Autorité de domaine : DR Ahrefs = 18.** C'est le plafond de verre actuel — le off-site (backlinks, citations presse, annuaires santé) est désormais le levier n°1 pour le SEO classique.

---

## 2. Progrès depuis l'audit de mai 2026 ✅

| Recommandation mai 2026 | Statut |
|---|---|
| Créer `public/llms.txt` | ✅ Fait (17/06/2026) — très bonne qualité : bloc résumé, FAQ en réponses directes, tarifs, avis, licence de citation |
| Compléter `Person.sameAs` (LinkedIn…) | ✅ LinkedIn + Resalib + Instagram (`schemaOrg.ts:323-327`) |
| Ajouter SIRET au LocalBusiness | ✅ `identifier` PropertyValue SIRET (`schemaOrg.ts:40-42`) |
| Étendre `BreadcrumbList` par page | ✅ Helper `createBreadcrumbSchema()` + breadcrumbs 3 niveaux sur les sous-pages |
| Ajouter `url` aux `recognizedBy` | ✅ `https://psynapse.fr/` sur les credentials |
| Compléter robots.txt (OAI-SearchBot, ClaudeBot, Claude-User, Perplexity-User) | ✅ + DuckAssistBot, MistralAI-User, cohere-ai, Amazonbot, Bytespider… (`robots.txt:24-98`) |
| Schéma `Service` par page spécialité | ✅ Sur les nouvelles pages (ex. `HypnoseBoulimieParis.tsx` : Service + areaServed + offers + availableChannel) |
| Section "Références scientifiques" | ✅ Composant `SpecialtyReferences` déployé |
| `alumniOf` École Psynapse | ✅ (`schemaOrg.ts:348-352`) |
| Étendre AggregateRating à 10+ avis | 🟡 Partiel : reviewCount 23, 9 `Review` détaillées. Erreur GSC "avis multiples" corrigée (#296, #297) |
| Meta `max-snippet:-1, max-image-preview:large` | ✅ (`index.html:18`) |
| Balises géo (geo.region, ICBM) | ✅ (`index.html:20-24`) |

Le travail éditorial est également remarquable : ≈21 nouvelles sous-pages spécialités (phobies détaillées, troubles émotionnels, troubles alimentaires, blocages) avec FAQ dédiées de qualité, schémas complets et maillage entre pages sœurs.

---

## 3. 🔴 Constat critique n°1 — Prerender bots : ≈21 pages servies en coquille vide

`netlify/edge-functions/seo-prerender-static.ts` ne définit que **26 routes** dans sa table `PAGES`. Toutes les pages créées depuis (émotions, alimentaire, blocages, procrastination…) tombent dans `context.next()` → les bots reçoivent le `index.html` SPA.

### 3a. Pages routées dans `netlify.toml` mais SANS entrée `PAGES` (fallthrough silencieux)

- `/hypnose-colere-paris`
- `/hypnose-hypersensibilite-paris`
- `/hypnose-deuil-paris`
- `/hypnose-frustration-paris`
- `/hypnose-anxiete-emotionnelle-paris`
- `/hypnose-charge-emotionnelle-paris`

### 3b. Pages ni routées dans `netlify.toml` ni dans `PAGES`

- `/hypnose-procrastination-paris`
- `/hypnose-onychophagie-paris`
- `/hypnose-toc-rituels-paris`
- `/hypnose-schemas-repetitifs-paris`
- `/hypnose-blocages-professionnels-paris`
- `/hypnose-addictions-comportementales-paris`
- `/hypnose-troubles-emotionnels-paris`
- `/hypnose-compulsions-alimentaires-paris`
- `/hypnose-grignotage-paris`
- `/hypnose-addiction-sucre-paris`
- `/hypnose-boulimie-paris`
- `/hypnose-alimentation-emotionnelle-paris`
- `/hypnose-image-corporelle-paris`
- `/hypnose-deuil-separation-paris`
- `/hypnose-frustration-chronique-paris`

### Impact

Pour tout crawler qui n'exécute pas le JavaScript (Bingbot en pratique, GPTBot, ClaudeBot, PerplexityBot, et **tous** les fetchers temps réel type ChatGPT-User) :

1. **Contenu invisible** — la page servie ne contient que le hero statique de la homepage.
2. **Title/description génériques** — ceux du fallback `index.html:13-14`.
3. **Canonical erroné** — `index.html:15` déclare `<link rel="canonical" href="https://novahypnose.fr">` : chaque page non pré-rendue se déclare comme un duplicata de la homepage. C'est le pire signal possible pour Bing (risque de désindexation "page dupliquée") et pour les moteurs génératifs.

### Correctif

1. Ajouter les ≈21 entrées manquantes à `PAGES` (title, description, h1, contenu HTML condensé, JSON-LD Service + FAQ + breadcrumb — tout existe déjà dans les `.tsx`, il s'agit d'une transposition).
2. Ajouter les blocs `[[edge_functions]]` correspondants dans `netlify.toml`.
3. **Mettre en place un garde-fou** : script de CI (ou test Vitest) qui compare les routes publiques d'`App.tsx` avec les clés de `PAGES`, les entrées du sitemap Supabase et `llms.txt`, et échoue si une page indexable manque. C'est la cause racine — sans ce garde-fou, l'écart se recréera à chaque nouvelle page.

---

## 4. 🔴 Constat critique n°2 — Sitemap de production : 10 pages indexables absentes

Le sitemap servi en prod vient de `supabase/functions/generate-sitemap/index.ts` (proxifié par `sitemap-proxy`). Sa liste `STATIC_PAGES` (47 URLs) omet :

| URL absente | Gravité |
|---|---|
| `/hypnose-arret-tabac-paris` | **Haute** — page toute neuve (commit `5571f02`), prerender OK mais jamais soumise à Google/Bing |
| `/hypnose-professionnels-paris` | **Haute** — page business B2B, pourtant prerendue et dans llms.txt |
| `/hypnose-deuil-separation-paris` | Moyenne |
| `/hypnose-frustration-chronique-paris` | Moyenne |
| `/guide-autohypnose`, `/guide-sommeil`, `/guide-procrastination`, `/guide-emotions-travail` | Moyenne — lead magnets, cités dans llms.txt mais hors sitemap |
| `/autohypnose/quiz` | Basse |
| `/peurdelavion` | ✅ présent (pour mémoire) |

**Incohérence supplémentaire :** il existe **deux générateurs de sitemap divergents** — `scripts/generate-sitemap.js` (prebuild, ~19 pages seulement, mais inclut `/zone-intervention` et `/test-receptivite-archive` qui sont `noindex` via `netlify.toml:305-323`) et la fonction Supabase (prod). Le fichier statique est masqué en prod par l'edge function, mais sert le déploiement GitHub Pages. Recommandation : faire de la fonction Supabase la source de vérité unique et faire pointer le script prebuild dessus (ou générer les deux depuis une liste partagée), et retirer les pages noindexées du script prebuild.

---

## 5. 🟠 Constat n°3 — Listes de bots des edge functions obsolètes (impact GEO direct)

Les deux edge functions (`seo-prerender.ts:12-38` et `seo-prerender-static.ts:11-36`) partagent une liste `BOT_USER_AGENTS` qui **ne reconnaît pas** :

| User-agent absent | Rôle |
|---|---|
| `chatgpt-user` | **Fetcher temps réel de ChatGPT** — c'est lui qui visite la page quand un utilisateur pose une question. N'exécute pas de JS → reçoit aujourd'hui la SPA vide |
| `claudebot`, `claude-user`, `claude-searchbot` | Noms canoniques Anthropic (seul `claude-web`, legacy, est listé) |
| `perplexity-user` | Fetcher temps réel de Perplexity |
| `duckassistbot` | DuckDuckGo AI |
| `mistralai-user` | Le Chat (Mistral) — pertinent pour une audience française |
| `cohere-ai`, `google-extended`, `applebot-extended` | Hygiène (les *-extended ne crawlent pas pour la recherche, priorité basse) |

C'est une correction de quelques lignes avec un impact GEO immédiat : le robots.txt invite ces bots, mais le serveur leur répond avec une coquille vide. À corriger **en même temps** que le §3 (mutualiser la liste dans un module partagé pour éviter une 3ᵉ divergence).

---

## 6. 🟠 Constat n°4 — llms.txt : à jour de juin, déjà obsolète

`public/llms.txt` (maj 17/06/2026) est de très bonne facture (résumé, FAQ, licence de citation) mais sa section « Spécialités » ne liste que **8 pages sur ~29**. Manquent notamment : tabac, procrastination, TOC, boulimie, colère, hypersensibilité, deuil, image corporelle… Les moteurs génératifs qui s'appuient sur ce fichier ignorent donc les pages longue traîne — précisément celles qui répondent aux questions spécifiques posées aux IA (« l'hypnose marche-t-elle contre la boulimie ? »).

À faire : ajouter les ~21 pages manquantes (une ligne chacune, format actuel), rafraîchir la date, et intégrer le fichier au garde-fou CI du §3.

---

## 7. 🟡 SEO local (géo)

Le dispositif local est solide :

- ✅ JSON-LD `HealthAndBeautyBusiness` complet : adresse, `geo`, `hasMap`, horaires, 20 arrondissements + Marais/Bastille dans `areaServed`, offres tarifées, SIRET.
- ✅ Balises `geo.region` / `geo.position` / `ICBM` dans `index.html`.
- ✅ Lien Google Maps CID dans `sameAs` (`cid=11956530853003446067`) — bon signal de rapprochement d'entité avec la fiche Google Business Profile.
- ✅ Signal national parallèle (`visioServiceSchema`, areaServed France + 12 grandes villes) qui ne cannibalise pas le local.
- 🟡 `/zone-intervention` est `noindex` (`netlify.toml:305-308`) — cohérent avec la doctrine anti-doorway, mais elle reste routée vers le prerender (`netlify.toml:142-144`, coût inutile) et listée dans `scripts/generate-sitemap.js`. Nettoyer les deux.
- 🟡 Incohérence horaire mineure : JSON-LD dit 11:00–20:30 (`schemaOrg.ts:31-38`), llms.txt dit « lundi-vendredi 11h-20h ». Harmoniser avec la fiche GBP (les LLM recoupent les sources et pénalisent les contradictions NAP).
- ⚠️ `aggregateRating` (23 avis, note 5) reprend visiblement les avis Google. Google désapprouve les notes « self-serving » sur LocalBusiness alimentées par des avis tiers ; l'erreur GSC de juin (#296/#297) venait déjà de là. Le doublon a été corrigé, mais garder ce point sous surveillance dans GSC (rapport « Extraits d'avis »).

---

## 8. 🟡 Autorité & off-site — le plafond de verre

**DR Ahrefs : 18** (mesuré ce jour via l'API Ahrefs ; les métriques détaillées — trafic, mots-clés, citations IA — nécessitent un plan Ahrefs supérieur et n'ont pas pu être extraites).

À ce niveau d'autorité, le contenu on-site (excellent) ne suffira pas à dépasser Doctolib/Resalib/annuaires sur les requêtes concurrentielles, ni à déclencher des citations IA régulières (les moteurs génératifs pondèrent fortement la notoriété d'entité). Leviers :

1. **Annuaire/citations santé & bien-être** : Resalib ✅ — compléter avec Pages Jaunes, annuaire Psynapse (page diplômés), syndicats d'hypnothérapeutes, médoucine/thérapeutes.com le cas échéant.
2. **Presse locale/spécialisée** : 2-3 retombées par an (interviews bien-être, presse locale Paris Centre) valent plus que tout le reste ; chaque mention alimente aussi les corpus d'entraînement des LLM.
3. **Podcast/YouTube invité** : les transcriptions sont massivement citées par les moteurs génératifs.
4. Ajouter chaque nouveau profil/mention dans `sameAs` (Person + LocalBusiness).

---

## 9. Points mineurs / hygiène

- **Canonical fallback** (`index.html:15`) : envisager de le supprimer du HTML statique (le prerender et React Helmet le définissent correctement par page) — un canonical homepage erroné sur les routes non pré-rendues est pire que pas de canonical. Devient sans objet si le §3 est corrigé intégralement, mais reste une fragilité pour toute future page oubliée.
- **Maillage interne** : les nouvelles sous-pages ne sont liées qu'entre pages sœurs et depuis leur page parent. Le menu statique du prerender homepage (`index.html:301-313`) ne liste que 6 spécialités + test. Ajouter sur chaque page parent (phobies, émotions, alimentaire, blocages) un bloc « hub » listant toutes ses sous-pages, et envisager un lien footer vers les pages parentes.
- **hreflang** : absent — acceptable en mono-langue ; à prévoir seulement si une version EN naît.
- **`sw.js`** : vérifier qu'il n'intercepte pas les bots (point déjà soulevé en mai, non re-testé ici : l'accès HTTP externe était bloqué par la politique réseau de l'environnement d'audit).
- **Suivi** : dans GSC, surveiller l'indexation Bing/Google des 21 pages après correction du §3 ; dans Bing Webmaster Tools, le rapport IndexNow (le ping existe déjà via `scripts/indexnow.js`).

---

## 10. Punch-list priorisée

### 🔴 P1 — à faire cette semaine (fort impact, effort modéré)
1. Ajouter les ~21 pages manquantes à `PAGES` dans `seo-prerender-static.ts` + blocs `[[edge_functions]]` dans `netlify.toml` (§3).
2. Ajouter les 10 URLs manquantes à `STATIC_PAGES` de la fonction Supabase `generate-sitemap` et redéployer (§4) — en priorité `/hypnose-arret-tabac-paris` et `/hypnose-professionnels-paris`.
3. Mettre à jour la liste `BOT_USER_AGENTS` des 2 edge functions : `chatgpt-user`, `claudebot`, `claude-user`, `claude-searchbot`, `perplexity-user`, `duckassistbot`, `mistralai-user` (§5) — idéalement en module partagé.
4. Compléter `llms.txt` avec les ~21 pages spécialités manquantes (§6).

### 🟠 P2 — ce mois-ci
5. Garde-fou CI : test qui compare routes publiques ↔ PAGES ↔ sitemap ↔ llms.txt (§3, cause racine).
6. Unifier les 2 générateurs de sitemap sur une liste partagée ; retirer les pages noindexées (`/zone-intervention`, `/test-receptivite-archive`) du script prebuild (§4).
7. Harmoniser les horaires JSON-LD / llms.txt / fiche GBP (§7).
8. Blocs « hub » de maillage sur les 4 pages parentes (§9).
9. Retirer la route prerender de `/zone-intervention` (noindex) dans `netlify.toml` (§7).

### 🟢 P3 — trimestre
10. Campagne off-site : 3-4 citations/annuaires santé + 1-2 retombées presse ; enrichir `sameAs` (§8).
11. Supprimer le canonical statique de `index.html` une fois le prerender complet (§9).
12. Re-tester en prod avec `curl -A "ChatGPT-User"` / `curl -A "ClaudeBot"` sur 3-4 pages nouvellement prerendues (impossible depuis l'environnement d'audit, réseau sortant restreint).
13. Surveiller GSC (extraits d'avis, AI Overviews) et Bing Webmaster Tools après déploiement.

---

## 11. Méthodologie

Audit par analyse statique du code (branche `claude/seo-geo-site-audit-paceh1`, à jour de `main`, dernier commit `48a200a`) : `index.html`, `netlify.toml`, `public/robots.txt`, `public/llms.txt`, `src/data/schemaOrg.ts`, `src/App.tsx`, `netlify/edge-functions/seo-prerender{,-static}.ts`, `supabase/functions/generate-sitemap/index.ts`, `scripts/generate-sitemap.js`, pages spécialités (échantillon `HypnoseBoulimieParis.tsx`). Comparaison systématique routes ↔ sitemap ↔ prerender ↔ llms.txt. DR via API Ahrefs (endpoint public). Les tests HTTP en production n'ont pas pu être exécutés (politique réseau de l'environnement) — le point 12 de la punch-list les reprend.
