# Campagne « Anxiete Paris Search 2026 »

Campagne Search pour la landing page `/anxiete-hypnose-paris.html`, à importer via
**Google Ads Editor** — l'interface web de création de campagne s'est révélée
instable (brouillon corrompu, page blanche récurrente à l'étape mots-clés).

## Lire d'abord : la déclaration annonces politiques UE

**Un import qui fixe le ciblage géographique échoue tant que la campagne cible n'a
pas été déclarée.** C'est le premier obstacle rencontré, et il n'a rien d'évident :
le message d'erreur parle de ciblage géographique, la cause est ailleurs.

Chaque campagne porte un champ `contains_eu_political_advertising`. Tant qu'il vaut
`UNSPECIFIED`, toute modification de `proximity`, `location` ou `location_group` est
rejetée avec `MISSING_EU_POLITICAL_ADVERTISING_SELF_DECLARATION`. C'est bloquant
depuis avril 2026.

Trois pièges, dans l'ordre où on tombe dedans :

1. **La déclaration au niveau du compte ne dispense de rien.** Celle de NOVA HYPNOSE
   est faite depuis le 24 sept. 2025 (`Admin > Règlement > Compte`, ou directement
   `ads.google.com/aw/policy/account`) et la campagne reste refusée. Le champ est
   exigé campagne par campagne.
2. **Il n'existe aucune colonne CSV pour ce champ.** La liste officielle des colonnes
   reconnues par Editor n'en contient pas. Un import ne peut donc pas déclarer une
   campagne : `1-campaign.csv`, seul fichier à porter le ciblage géographique, ne
   passera pas sur une campagne non déclarée.
3. **La réponse est « Non »**, sans hésitation : la définition de Google vise les
   annonces émanant d'un acteur politique ou conçues pour influencer une élection,
   un référendum, un vote ou un processus législatif. Répondre « Oui » interdit
   purement et simplement la diffusion dans l'UE.

Référence : https://developers.google.com/google-ads/api/docs/api-policy/eu-par

## Importer

1. Installer Google Ads Editor : https://ads.google.com/home/tools/ads-editor/
2. Se connecter au compte **672-748-1209 (NOVA HYPNOSE — ALAIN ZENATTI)**
3. Vérifier si Editor expose le réglage : sélectionner une campagne, chercher dans
   le panneau d'édition un champ « Annonces à caractère politique dans l'UE ».
   - **S'il existe** : le passer à « Non », puis importer
     `import/campagne-complete.csv` (tout en un seul import).
   - **S'il n'existe pas** : suivre la procédure en deux temps ci-dessous.
4. Vérifier l'aperçu des modifications, puis `Publier`

### Procédure en deux temps (si Editor n'expose pas le réglage)

Elle a un avantage inattendu : elle évite l'étape mots-clés de l'interface web,
celle-là même qui corrompait les brouillons.

1. **Interface web** : créer la campagne coquille vide, avec les réglages du tableau
   plus bas (nom `Anxiete Paris Search 2026`, 3,30 €/jour, Maximiser les conversions,
   Réseau de Recherche seul, français, Paris). La question sur les annonces politiques
   apparaît pendant la création : répondre « Non ». S'arrêter avant les mots-clés.
2. **Editor** : `Compte > Obtenir les modifications récentes`, puis importer les
   fichiers séparés **en sautant `1-campaign.csv`** :
   `2-adgroups` → `3-keywords` → `4-negatives` → `5-ads`

C'est le cas d'usage pour lequel les cinq fichiers séparés existent : `1-campaign.csv`
est le seul à porter le ciblage géographique, donc le seul que la déclaration bloque.

Les noms doivent correspondre **au caractère près** — campagne
`Anxiete Paris Search 2026`, groupe d'annonces `Anxiete Stress` — sinon Editor crée
des doublons au lieu de rattacher aux éléments existants.

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
| Max CPC du groupe d'annonces | 2,00 € | Editor refuse un groupe d'annonces sans enchère (« Le groupe d'annonces ne comporte aucune enchère »), même quand la campagne est en enchères automatiques. La valeur est stockée sans être utilisée tant que la stratégie reste « Maximiser les conversions » ; elle ne redeviendrait active qu'en repassant en CPC manuel |

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

### Accroches (`6-callouts.csv`)

Editor signale « Votre campagne sur le Réseau de Recherche comprend moins de quatre
accroches ». C'est une **recommandation, pas une infraction** : la campagne publie
sans. Les accroches restent utiles, elles occupent de la place gratuite sous
l'annonce et améliorent le CTR.

Huit accroches au niveau campagne, toutes tirées du contenu réel de la page
(≤ 25 caractères chacune) :

| Accroche | Adossée à |
| --- | --- |
| Cabinet Marais ou visio | barre sticky et pied de page |
| Maître Praticien certifié | badges du hero, section Certifications |
| Hypnose ericksonienne | H1 et section méthode |
| Auto-hypnose enseignée | « Vous apprenez l'auto-hypnose » (section Autonomie) |
| Suivi entre les séances | « Un accompagnement continu entre les séances » |
| Parcours sur mesure | « sur mesure, jamais un protocole figé » |
| Paris 4e (Marais) | adresse du pied de page |
| Réservation en ligne | CTA « Voir mes disponibilités » (Resalib) |

**À ne pas transformer en accroche** : la page affiche « 5/5 ★ 100 % de clients
satisfaits sur Google et Resalib ». Une note ou un pourcentage de satisfaction dans
le texte d'une annonce tombe sous les règles Google sur les avis : les notes ne
peuvent passer que par les avis vendeurs, pas par une accroche rédigée à la main.

Pour huit chaînes courtes, les saisir directement dans Editor
(`Extensions > Accroches`) est souvent plus rapide qu'un import.

### Liens annexes (`7-sitelinks.csv`)

Google en recommande quatre au minimum, et ils pèsent plus sur le CTR que les
accroches. Six ici, chacun vers une **page réelle et distincte** du site : la landing
page n'a pas d'ancres internes exploitables, et des liens annexes qui pointeraient
tous vers la même URL risquent le refus pour destination non unique.

| Lien | Destination | Contenu réel de la page |
| --- | --- | --- |
| Tarifs et formules | `/tarifs` | 90 € la séance, formules, paiement et annulation |
| Avis de clients | `/avis` | 21 avis vérifiés sur Resalib |
| Questions fréquentes | `/faq` | questions sur l'hypnose et le cabinet |
| Qui est Alain Zenatti | `/alain-zenatti` | parcours, spécialités, approche |
| Accès au cabinet | `/zone-intervention` | Paris 4e, Bastille et Marais |
| Test de réceptivité | `/test-receptivite` | questionnaire en ligne |

Limites respectées : texte ≤ 25 caractères, chaque ligne de description ≤ 35.

Deux points assumés :

- **Le lien Tarifs affiche un prix** (90 €), alors que la landing page n'en montre
  aucun. Ce n'est pas une contradiction avec la règle « ne rien promettre que la page
  ne dit pas » : la page de destination du lien, elle, affiche bien ce prix. À 3,30 €
  de budget quotidien, qualifier le clic avant qu'il ne coûte a de la valeur.
- **Aucun lien ne pointe vers Resalib.** Les liens annexes doivent partager le domaine
  de l'URL finale de l'annonce ; `resalib.fr` serait refusé. La prise de rendez-vous
  passe donc par le CTA de la landing page.

## Après le lancement

- Laisser tourner **2 semaines sans y toucher** — les enchères automatiques ont
  besoin de données pour sortir de leur phase d'apprentissage
- Surveiller le rapport **Termes de recherche** : chaque requête hors-sujet qui
  apparaît devient un négatif à ajouter dans `4-negatives.csv`
- Si le click fraud réapparaît (clics multiples sans conversion, même zone),
  regarder du côté des exclusions d'IP et d'un outil tiers type ClickCease

## Pour toute future campagne

À refaire à chaque nouvelle campagne, quel que soit le sujet :

- **Déclarer « Non » aux annonces politiques UE**, campagne par campagne. La
  déclaration du compte ne se propage pas. C'est la seule étape qui doit passer par
  l'interface web tant qu'Editor n'expose pas le réglage.
- **Vérifier les longueurs avant l'import** : titres ≤ 30, descriptions ≤ 90,
  chemins ≤ 15, en points de code Unicode. Une correction éditoriale qui rallonge une
  description la fait passer la limite sans prévenir : c'est arrivé ici, une
  description est passée de 85 à 97 caractères en corrigeant sa formulation.
- **Reporter toute correction dans les deux jeux de fichiers**, séparés et fusionné,
  sinon l'un des deux chemins d'import réintroduit l'ancienne version.
- **Aligner les annonces sur le contenu réel de la page.** Un titre qui promet ce que
  la page ne dit pas dégrade le Quality Score en plus du risque de conformité. Quand
  la landing page change, les annonces changent avec elle.
- **Ne jamais réenregistrer les CSV depuis Excel** (voir la section Encodage).
