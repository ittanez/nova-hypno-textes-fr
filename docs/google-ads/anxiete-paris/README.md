# Campagne « Anxiete Paris Search 2026 »

Campagne Search pour la landing page `/anxiete-hypnose-paris.html`, à importer via
**Google Ads Editor** — l'interface web de création de campagne s'est révélée
instable (brouillon corrompu, page blanche récurrente à l'étape mots-clés).

## Importer

1. Installer Google Ads Editor : https://ads.google.com/home/tools/ads-editor/
2. Se connecter au compte **672-748-1209 (NOVA HYPNOSE — ALAIN ZENATTI)**
3. `Compte > Importer > Depuis un fichier`, puis au choix :
   - `import/campagne-complete.csv` — tout en un seul import (recommandé)
   - ou les cinq fichiers séparés **dans l'ordre**, si un import global échoue et
     qu'il faut isoler l'étape fautive :
     `1-campaign` → `2-adgroups` → `3-keywords` → `4-negatives` → `5-ads`
4. Vérifier l'aperçu des modifications, puis `Publier`

Les deux chemins décrivent la même campagne : toute correction doit être reportée
dans les deux, sinon l'un des imports réintroduit l'ancienne version.

À relire dans l'aperçu, là où l'import dérape le plus souvent : le budget doit être
lu **3,30 €** et non 330 € (séparateur décimal), et la zone doit se résoudre sur
**Paris ville** et non sur l'Île-de-France entière.

La campagne est importée **en pause** (`Campaign Status: Paused`) : rien ne se
diffuse tant qu'elle n'est pas activée manuellement.

### Encodage : ne pas y toucher

Les CSV sont en **UTF-8 avec BOM**, en **CRLF**. Les trois comptent.

Google Ads Editor sous Windows ne devine pas l'encodage d'un fichier : sans le BOM
(`EF BB BF`) en tête, il lit le CSV en ANSI et chaque accent, codé sur deux octets
en UTF-8, ressort en deux caractères parasites (`é` devient `Ã©`). Un `.gitattributes`
local force le CRLF au checkout ; le BOM, lui, fait partie du contenu versionné.

Conséquence pratique : **ne pas rouvrir ces fichiers dans Excel**, qui les
réenregistre volontiers en ANSI et réintroduit le problème. Pour une relecture
rapide, le Bloc-notes ou un éditeur de code.

## Choix de configuration, et pourquoi

| Réglage | Valeur | Raison |
| --- | --- | --- |
| Réseau | Recherche Google seule | Display et Partenaires désactivés : ce sont les sources de clics les moins qualifiés, et le compte a déjà subi du click fraud en 2023 |
| Enchères | Maximiser les conversions | En CPC manuel, un clic frauduleux coûte plein tarif ; en enchères auto, l'algorithme apprend à éviter les profils qui ne convertissent jamais |
| Budget | 3,30 €/jour | = 100 €/mois, le budget réel du client |
| Zone | Paris (ville) | Cabinet dans le 4e, déplacement client attendu |
| Correspondance | Exact + Expression | Aucune requête large : à 3 €/jour, une seule requête hors-sujet mange la journée |
| AI Max | Désactivé | Élargit les mots clés en requête large et réécrit les annonces — incompatible avec un budget serré et avec la règle « ne rien promettre que la page ne dit pas » |

## Conversions

L'action de conversion **« Prise de rendez-vous »** existe déjà dans le compte :
elle importe l'événement GA4 `confirmation_rdv`, déclenché par le clic sur
« Voir mes disponibilités » (lien Resalib) de la landing page.

Le tracking GA4 (`G-5W9ZQEJKLF`) est posé en dur dans
`anxiete-hypnose-paris.html` — cette page est un fichier statique servi depuis
`public/`, elle ne passe donc pas par le chargement différé de gtag.js du site
React.

## Textes d'annonces

Chaque titre et description a été écrit à partir du contenu réel de la landing
page (règle du `CLAUDE.md` : ne jamais promettre dans une annonce ce que la page
ne dit pas). Aucun prix n'est mentionné, la page n'en affiche aucun.

Longueurs validées : titres ≤ 30 points de code, descriptions ≤ 90, chemins ≤ 15.

## Après le lancement

- Laisser tourner **2 semaines sans y toucher** — les enchères automatiques ont
  besoin de données pour sortir de leur phase d'apprentissage
- Surveiller le rapport **Termes de recherche** : chaque requête hors-sujet qui
  apparaît devient un négatif à ajouter dans `4-negatives.csv`
- Si le click fraud réapparaît (clics multiples sans conversion, même zone),
  regarder du côté des exclusions d'IP et d'un outil tiers type ClickCease
