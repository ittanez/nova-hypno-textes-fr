# Audit GEO — novahypnose.fr (15 octobre 2026)

Visibilité dans les moteurs de réponse IA : ChatGPT, Perplexity, Claude, Google AI Overviews, Copilot.

> Rappel de Google (Search Central) : optimiser pour l'IA, c'est **du SEO**. Pas de
> recette séparée. `llms.txt` n'a aujourd'hui aucun effet prouvé sur les citations.

## Score de préparation GEO : 68/100

| Critère | Poids | Note | Commentaire |
|---|---|---|---|
| Accessibilité technique | 20 % | 18/20 | Robots IA autorisés, HTML pré-rendu servi aux bots |
| Structure | 20 % | 16/20 | H1 unique, H2/H3 clairs, FAQ balisées |
| Citabilité | 25 % | 16/25 | Bonnes réponses directes, mais `llms.txt` contredit les règles d'écriture d'octobre |
| Autorité et marque | 20 % | 6/20 | **Quasi aucune présence hors du site** |
| Multimédia | 15 % | 12/15 | Images ; pas de vidéo intégrée |

| Plateforme | Note | Facteur limitant |
|---|---|---|
| Google AI Overviews | 72 | Dépend du classement Google classique : correct en local |
| ChatGPT | 55 | S'appuie sur Wikipédia et les mentions tierces : absentes |
| Perplexity | 50 | S'appuie beaucoup sur Reddit et les forums : absents |
| Copilot (Bing) | 70 | IndexNow en place, pré-rendu servi à Bingbot |

## 1. Accès des robots IA — OK

`robots.txt` autorise GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot,
Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, MistralAI-User,
etc. Aucun robot IA bloqué.

Petit défaut : chaque robot IA a son propre bloc `User-agent`, qui **remplace** le bloc `*`.
Les `Disallow` (`/admin/`, `/api/`, `/*.json`…) ne s'appliquent donc pas à eux. Sans gravité
(l'admin est protégé par connexion), mais facile à corriger en répétant les `Disallow` ou en
regroupant les robots sous un seul bloc.

## 2. Rendu côté serveur — OK

Test réel avec les user-agents GPTBot, ChatGPT-User, PerplexityBot et ClaudeBot :

- **73 des 77 pages hors blog** du sitemap reçoivent un HTML complet et propre à chaque page.
- Les articles de blog aussi (exemple bruxisme : 1 758 mots, BlogPosting + FAQPage + Person,
  dates de publication et de modification).
- 4 pages reçoivent la coquille SPA vide : `/autohypnose/quiz`, `/mentions-legales`,
  `/politique-de-confidentialite`, `/politique-de-confidentialite-novarespire`. Faible enjeu.

## 3. llms.txt — présent, mais à mettre à jour (priorité 1)

Le fichier existe (16 Ko, bien structuré, daté du **2 juillet 2026**). Il n'aide pas le
classement, mais c'est un résumé que des agents IA lisent tel quel. Or il contient des
formulations abandonnées lors de l'audit du blog d'octobre :

| Ligne | Texte actuel | Problème |
|---|---|---|
| 3 | « Résultats généralement obtenus en 3 à 5 séances » | Repère formulé comme une promesse |
| 29 | « Les résultats s'obtiennent en 3 à 5 séances en moyenne » | Idem |
| 43 | « reconnue par l'INSERM et validée par de nombreuses études » | Règle : « étudiée par l'INSERM » |
| 43 | « amélioration significative dès la première séance » ; « 2 séances suffisent souvent » | Promesse chiffrée |
| 3, 46, 54 | « aussi efficace qu'en présentiel » | Affirmation non sourcée |
| 103, 114 | « 1 à 3 séances », « 6 à 12 séances » | Chiffres à vérifier sur les pages concernées |
| 20 | « 26 avis » Google | À recompter (chiffre de juillet) |

`/llms-full.txt` renvoie la page d'accueil SPA avec un code 200 (fausse page). Soit créer le
fichier, soit le faire répondre en 404.

## 4. Présence de la marque — le point faible

Recherches « Alain Zenatti hypnose » et « NovaHypnose Paris » : **aucun résultat tiers**
trouvé (outil de recherche basé aux États-Unis, à confirmer depuis la France). Pas de page
Wikidata, pas de mentions sur Reddit, pas de chaîne YouTube reliée au site, pas de citation
dans des annuaires d'hypnose repérés par la recherche.

C'est le levier principal : les études (Ahrefs, déc. 2025) montrent que les mentions de marque
pèsent environ 3 fois plus que les liens pour être cité par une IA, et YouTube arrive en tête.

## 5. Données structurées — incohérences de profils

| Où | sameAs actuel |
|---|---|
| Accueil servi aux bots (`seo-prerender-static.ts:213`) | Google Maps seulement |
| Personne servie aux bots | aucun sameAs |
| Page `/alain-zenatti` servie aux bots | Instagram + Resalib (pas LinkedIn) |
| `src/data/schemaOrg.ts` (version navigateur) | Instagram, LinkedIn, Resalib, Maps |
| Pied de page (`Footer.tsx:36`) | `linkedin.com/in/zenatti/` ≠ `alain-zenatti` partout ailleurs |

Les IA voient la version la plus pauvre. Il faut une seule liste de profils, la même partout,
avec la fiche Google, LinkedIn, Instagram, Resalib, et YouTube / Wikidata quand ils existeront.
Vérifier aussi quelle URL LinkedIn est la bonne.

## 6. Citabilité des passages

Bon : la FAQ de `llms.txt` et des pages donne des réponses directes de 100 à 170 mots
(« Qui est Alain Zenatti ? », « Comment fonctionne l'hypnose ericksonienne ? »), le format
que les IA citent le plus.

À améliorer : la page `/alain-zenatti` ne fait que **363 mots** côté robots. C'est la page
d'autorité principale (parcours, Psynapse, 9 certifications, années de pratique). La passer à
700–900 mots, avec une liste des certifications et leurs dates.

## Les 5 changements les plus utiles

1. **Réécrire `llms.txt`** avec les formulations validées en octobre et la date du jour. *(30 min)*
2. **Unifier les profils (sameAs)** dans les edge functions et corriger le lien LinkedIn du pied de page. *(30 min)*
3. **Créer une chaîne YouTube** avec les vidéos motion design déjà produites (respiration 4-7-8,
   douleur, insomnie…), chaque description renvoyant vers la page correspondante. *(gros effet)*
4. **Obtenir des mentions tierces** : annuaires d'hypnose (Psynapse, hypnose.fr, Doctolib si
   possible, PagesJaunes), une fiche Wikidata pour le cabinet, des réponses utiles sur des
   forums. *(effort continu)*
5. **Étoffer `/alain-zenatti`** (parcours, certifications datées, approche) et servir les
   4 pages manquantes en pré-rendu. *(1 h)*

## Ce qu'il ne faut pas faire

- Découper les textes « pour l'IA » ou écrire des versions spéciales robots : Google le
  déconseille, et ça risque d'être vu comme du contenu masqué.
- Acheter ou fabriquer des mentions.
