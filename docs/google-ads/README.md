# Campagnes Google Ads — NovaHypnose

Trois campagnes Search prêtes à lancer, calibrées pour **100 €/mois sur Paris** chacune.
Elles partagent le même dispositif de suivi des conversions et le même validateur.
**Une seule doit tourner à la fois.**

| Campagne | Thème | Groupes | Mots-clés | État |
|---|---|---|---|---|
| [**Parler en public**](parler-en-public/README.md) | Trac, réunions, pitch, conférences, visio | 2 | 34 | **À lancer en premier** |
| [Phobies](phobies/README.md) | Peur du dentiste · Claustrophobie & IRM | 2 | 28 | Prête |
| [Stress & anxiété](stress-anxiete/README.md) | Stress, burn-out, anxiété, crises d'angoisse | 2 | 44 | En attente |

## Pourquoi ni le stress ni l'anxiété en premier

Ce qui fait converger une requête de thérapie en Search payant, c'est **l'échéance**. Une
présentation au comité de direction jeudi, un rendez-vous chez le dentiste déjà pris, une
IRM programmée la semaine prochaine : ces gens-là ne reportent pas. Le stress et l'anxiété,
eux, n'ont pas de date — quelqu'un qui vit avec depuis cinq ans peut attendre un mois de
plus.

S'y ajoutent un **CPC plus bas** (bien moins d'annonceurs sur ces requêtes nommées) et une
**correspondance annonce ↔ page parfaite**, chaque thème disposant de sa page dédiée.

Mais l'échéance ne suffit pas : le second critère est la **capacité à payer**. Deux
requêtes également urgentes ne se valent pas si l'une émane d'un salarié en poste et
l'autre de quelqu'un sans revenu. C'est ce qui fait passer parler en public devant — la
peur de s'exprimer frappe des gens **déjà en poste**, qui engagent 90 € sans arbitrage — et
ce qui fait écarter l'entretien d'embauche malgré son échéance. Le thème remonte en outre
fortement à la rentrée, quand dentiste et IRM restent stables toute l'année.

À 100 €/mois, en faire tourner plusieurs en parallèle serait une erreur : le budget divisé
ne permettrait à aucune d'accumuler assez de données pour être pilotée. Elles se
disputeraient en plus les mêmes enchères sur les requêtes limitrophes.

## Ce qui est commun aux trois

- **Suivi des conversions** — `src/lib/googleAds.ts`, mêmes actions, même
  `VITE_GOOGLE_ADS_ID`. Décrit dans [stress-anxiete/README.md §5](stress-anxiete/README.md).
  Ce module est livré **séparément** : il corrige aussi un bug de mesure du site et n'a
  pas à attendre le lancement des campagnes.
- **Validateur** — `npm run validate:ads` contrôle les trois campagnes : longueurs Google
  Ads (titres 30, descriptions 90, chemins 15, liens annexes 25/35, accroches 25) et
  détection des mots-clés bloqués par leurs propres exclusions.
- **Paramétrage** — réseaux, ciblage géographique, calendrier : identiques, détaillés
  écran par écran dans [stress-anxiete/README.md §2](stress-anxiete/README.md).

## Avant de lancer, quel que soit le mois

Tout est prêt côté fichiers. Restent trois choses qui demandent un accès au compte
Google Ads et qui ne peuvent pas être faites à l'avance :

1. Créer les 4 actions de conversion et relever leurs libellés
   ([stress-anxiete/README.md §5.3](stress-anxiete/README.md)).
2. Renseigner `VITE_GOOGLE_ADS_ID` et les libellés dans les variables Netlify, puis
   redéployer. **Sans cela le suivi reste inerte** et la campagne serait pilotée à l'aveugle.
3. Activer le balisage automatique et associer GA4 + Google Business Profile.

Deux points à revérifier le jour du lancement, parce qu'ils peuvent avoir bougé :

- les **tarifs** cités dans les annonces (90 €) et sur les pages ;
- la **saisonnalité** du thème retenu, si le report se prolonge au-delà de l'automne.

## Ajouter une campagne

Créer un dossier `docs/google-ads/<nom>/import/` contenant les cinq CSV aux mêmes noms.
Le validateur découvre les campagnes automatiquement, sans configuration.

## Feuille de route

| Échéance | Action |
|---|---|
| **Septembre — lancement envisagé** | Lancer **Parler en public**. Le report joue en sa faveur : la prise de parole remonte fortement à la rentrée, c'est le meilleur moment de l'année pour ce thème |
| Si le volume est trop faible | Basculer sur **Phobies** (dentiste, IRM), échéances plus contraintes |
| Janvier | Ajouter `AG3 • Peur de l'avion` à la campagne phobies, pour les réservations de printemps |
| Quand le CPA est < 25 € sur 2 mois | Monter le budget, ou réactiver **Stress & anxiété** en campagne séparée |
