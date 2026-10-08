# Audit du contenu du blog — reprise (7 octobre 2026)

## Contexte
Audit des 131 articles (table `articles`, projet Supabase **NovaZen**, id `akrlyzmfszumibwgocae`) : 125 publiés, 6 brouillons.
Décisions d'Alain : supprimer les faux témoignages (ne pas simplement les anonymiser), les fausses études, les chiffres inventés et les promesses de résultat ; ne pas descendre sous 900 mots ; slugs inchangés.
Certification à utiliser dans la signature : « Hypnothérapeute, maître en hypnose ericksonienne » (déclarée par Alain, 9 certifications).
La « garantie 4e séance offerte » n'existe plus : ne jamais la citer.

## Constats
- Environ 66 articles présentent un client ou une patiente comme réel(le) (noms récurrents : Sophie, Marc, Sarah, Thomas). Alain confirme que ce sont de faux témoignages.
- Études sans source vérifiable : INSERM 2019 / 2020 / 2023, Université de Bordeaux 2023, « Rainville 2019 95 % », « 95 % des régimes échouent », « le subconscient contrôle 95 % de vos actions », « 25 % des Français aviophobes ».
- Chiffres de cabinet inventés : 90 % de réussite, 98 % de transe dès la 1re séance, 40 % de patients visuels, « 90 % de mes consultations ».
- Promesses de résultat dans les titres (« en 3 séances », « qui changent tout », « la réponse va vous surprendre »).
- Les articles de juillet à octobre 2026 sont les plus propres (ton à imiter). Priorité de réécriture : peur de l'avion, moi parallèles, GPS émotionnel, métaphores, cabinet Bastille, animaux totems, rêve éveillé.
- Meta description vide ou trop courte sur ~6 articles. L'article « arrêter de fumer » contient du CSS inline dans le contenu.

## État au 7 octobre 2026
- **Sauvegarde faite** : table `articles_backup_20261007` (131 lignes, RLS activée). À supprimer quand tout est validé.
- **3 articles pilotes réécrits** (1 070 à 1 230 mots) dans `pilote/` : peur de l'avion, régimes, suis-je hypnotisable. **NON écrits en base** : les écritures via le connecteur Supabase sont bloquées (« requires approval » / annulées), même en mode Auto.
- `pilote/METTRE-A-JOUR-LES-3-ARTICLES.sql` : à coller en entier dans Supabase > SQL Editor > Run (transaction begin/commit).
- Le script `scripts/update-article-content.js` accepte aussi les fichiers `pilote/*.json` (`--dry-run` pour tester).

## Suite prévue
1. Débloquer l'écriture (autoriser `execute_sql` du connecteur Supabase) ou appliquer le SQL à la main.
2. Recherche systématique, en lecture seule, des études et chiffres cités dans les 128 autres articles.
3. Réécriture par lots de 10, avant/après validé par Alain avant chaque écriture en base.
4. Corriger les meta descriptions et le CSS inline.

## Mise à jour du 8 octobre 2026

- **Pilotes appliqués** (peur de l'avion, régimes, hypnotisable). Leurs slugs avaient été recalculés par le déclencheur `trigger_auto_slug` (BEFORE INSERT OR UPDATE OF title) ; restaurés avec `pilote/RESTAURER-LES-3-SLUGS.sql`.
- **Règle pour tout script de mise à jour** qui modifie `title` : encadrer par `alter table public.articles disable trigger trigger_auto_slug;` puis `enable trigger`, dans la même transaction. Les slugs ne changent jamais.
- **Lot 1** (6 articles : moi parallèles, GPS émotionnel, métaphores/réalité, cabinet Bastille, animaux totems, rêve éveillé) : `lot-1/` contient `avant/`, `apres/`, `RELECTURE.html` (avant/après côte à côte) et `METTRE-A-JOUR-LE-LOT-1.sql`. Décisions d'Alain : tarifs 90 € (cabinet et visio) / 140 € (domicile), anecdotes personnelles non vérifiables retirées.
- Reste à traiter : l'autre article « métaphores » (`les-metaphores-en-hypnotherapie-quand-les-mots-deviennent-des-ponts-vers-la-transformation`), puis les ~110 autres par lots de 10.
- Autres déclencheurs de la table : `trigger_indexnow_on_article_change` (AFTER INSERT OR UPDATE) envoie probablement les URL à IndexNow à chaque modification.
