# Campagne Google Ads — Parler en public · Paris · 100 €/mois

| | |
|---|---|
| **Objectif** | Prises de rendez-vous (Resalib) + appels téléphoniques |
| **Budget** | 100 €/mois → **3,28 €/jour**, entièrement sur ce thème |
| **Zone** | Paris intra-muros (présence réelle uniquement) |
| **Page de destination** | `/hypnose-peur-parler-public-paris` |
| **Réseau** | Recherche Google uniquement |

---

## 1. Ce que dit la page, et ce qu'elle ne dit pas

Le ciblage a été construit à partir du contenu réel de la page, pas d'une idée de ce
qu'elle pourrait contenir. Relevé :

| Présent sur la page | Occurrences |
|---|---|
| `visio` | 10 |
| `trac` | 7 |
| `oral` | 8 |
| `réunion` | 5 |
| `pitch` | 4 |
| `voix` / « qui tremble » | 4 / 3 |
| `conférence` | 2 |

Les deux cas détaillés sont **« Peur de parler en réunion »** et **« Pitch
investisseurs »**.

**Absents : soutenance, examen oral, grand oral, discours de mariage, entretien
d'embauche.** C'est une page **professionnelle**, pas scolaire ni événementielle.

Conséquence directe : le mot-clé `hypnose soutenance`, présent dans une première version,
a été **retiré** — il promettait ce que la page ne tient pas. C'est le même défaut que
l'audit de la campagne stress avait relevé sur « anxiété sociale », appliqué cette fois à
un travail en cours.

Ce cadrage professionnel est aussi le bon commercialement. Le critère décisif n'est pas
seulement l'urgence ressentie, c'est la **capacité à payer** : un cadre qui doit pitcher
devant un comité engage 90 € sans arbitrage, un étudiant ou un candidat sans revenu
beaucoup moins. C'est ce qui départage deux requêtes pourtant aussi urgentes l'une que
l'autre.

---

## 2. Deux groupes, pas trois

3,28 €/jour répartis sur trois groupes, cela fait 1 € par groupe : aucun n'accumulerait
assez d'impressions pour être piloté. Deux groupes, à ~1,64 €/jour, avec deux angles
publicitaires réellement distincts.

| Groupe | Angle | Mots-clés |
|---|---|---|
| `AG1 • Peur & trac` | Surmonter la peur, le trac, la voix qui tremble | 20 |
| `AG2 • Prise de parole pro` | Performer en réunion, pitch, conférence, visio | 14 |

Les deux pointent vers la même page — elle couvre les deux angles.

Le plafond CPC est monté à **1,60 €** (contre 1,40 € sur les phobies) : le thème est plus
disputé par les coachs et organismes de formation, et l'audience professionnelle justifie
de payer un peu plus cher le clic.

---

## 3. Mots-clés — 34, exact + expression

[`import/2-mots-cles.csv`](import/2-mots-cles.csv). Aucune requête large.

Les termes distinctifs — `hypnose voix qui tremble`, `hypnose prise de parole en visio`,
`hypnose pitch` — sont rares mais quasi sans concurrence, et chacun correspond à un passage
identifié de la page.

---

## 4. Exclusions — 367

[`import/3-mots-cles-negatifs.csv`](import/3-mots-cles-negatifs.csv). Socle commun repris
des autres campagnes, plus 44 exclusions propres au thème. Cinq familles comptent
vraiment ici :

**La concurrence des formations.** C'est le thème où l'offre concurrente est la plus
dense : `formation`, `coach`, `cours`, `atelier`, `masterclass`, `toastmasters`,
`"cours d'éloquence"`, `"média training"`. Sans ça, une bonne moitié du budget partirait
sur des gens qui cherchent un stage de trois jours.

**Les métiers de la voix et de la scène.** `comédien`, `acteur`, `casting`,
`improvisation`, `"stand up"`, `humoriste`, `chant`, `slam`. Ils cherchent une technique,
pas une thérapie.

**Les troubles de la parole.** `bégaiement`, `orthophoniste`, `diction`, `élocution`,
`prononciation`, `accent`. Ils relèvent de l'orthophonie ; la page ne les traite pas.

**Les examens scolaires.** `"grand oral"`, `"oral du bac"`, `bac`, `brevet` — aucune
consultation pour mineurs.

**La recherche d'emploi.** `embauche`, `chômage`, `reconversion`, `"france travail"`,
`"job dating"`, en plus de `emploi` et `recrutement` du socle. Non par manque d'intention —
un entretien est une échéance forte — mais par **capacité à payer** : voir §8.

S'y ajoutent les phobies traitées ailleurs (`"hypnose peur du dentiste"`,
`claustrophobie`, `irm`) pour que les campagnes ne se marchent pas dessus, et
`mariage`, `politique`, `plaidoirie`, que la page ne couvre pas.

---

## 5. Audit de cohérence

22 requêtes confrontées aux mots-clés et aux exclusions :

- **11 requêtes légitimes** dérivées du contenu de la page : aucune bloquée, 10 couvertes.
  Seule « hypnose prise de parole cadre » passe sans être couverte — longue traîne
  acceptable.
- **11 pièges** : tous bloqués — cours d'éloquence, formation, coach, grand oral,
  orthophoniste, théâtre, discours de mariage, les autres phobies, « gratuit », et une
  ville hors Paris.

---

## 6. Suivi des conversions

Commun aux trois campagnes, rien à refaire. Voir
[`../stress-anxiete/README.md`](../stress-anxiete/README.md) §5.

Suffixe d'URL finale propre à cette campagne :

```
utm_source=google&utm_medium=cpc&utm_campaign=parler-en-public&utm_content={creative}&utm_term={keyword}&matchtype={matchtype}&device={device}
```

---

## 7. Tarif et durée affichés sur la page

Chaque annonce de cette campagne annonce « Séance 90 € » et « 1h30 pour la première ».
Or la page de destination — comme les trois autres pages de destination du portefeuille —
**n'affichait ni l'un ni l'autre**. Le visiteur arrivait avec une attente de prix que la
page ne confirmait pas et devait repartir vers `/tarifs` pour la vérifier : une friction
sur la page même que la campagne paie pour atteindre.

Deux lignes ont donc été ajoutées à la page :

- dans le chapô, au-dessus de la ligne de flottaison : « **90 € la séance**, 1h30 pour la
  première » ;
- dans le bloc d'appel final : « • 90 € la séance ».

Le prix dans l'annonce joue un rôle de pré-qualification — il écarte les chercheurs de
bonnes affaires avant le clic, ce qui vaut cher à 3,28 €/jour — mais il n'est tenable que
si la page le confirme.

> Les pages `/hypnose-peur-dentiste-paris`, `/hypnose-claustrophobie-paris` et
> `/hypnose-stress-anxiete-paris` présentent le même écart. Elles n'ont pas été modifiées :
> à traiter avant de lancer leurs campagnes respectives.

---

## 8. Lancement et points de vigilance

Procédure générale : [`../stress-anxiete/README.md`](../stress-anxiete/README.md) §8.
Propre à cette campagne :

- [ ] Vérifier après 2 semaines que les termes de recherche ne contiennent **aucune requête
      de formation ou de coaching** — c'est le risque numéro un ici
- [ ] Surveiller la rentrée : la prise de parole remonte fortement en septembre-octobre,
      puis en janvier
- [ ] Si le budget est sous-consommé (volume insuffisant), **ne pas** ajouter de requête
      large : élargir plutôt vers `/hypnose-blocages-professionnels-paris` et
      `/hypnose-confiance-en-soi-paris`, qui ont leurs propres pages

### Ce qu'on ne cible pas, et pourquoi

**L'entretien d'embauche est volontairement exclu**, alors qu'il a pourtant une échéance
forte. La raison n'est pas l'intention mais la **capacité à payer** : un candidat en
recherche est souvent sans revenu, et 90 € × 3 à 5 séances représentent un arbitrage
difficile. Le salarié en poste qui doit présenter devant son comité de direction, lui,
décide seul et rapidement.

C'est la même logique qui fait préférer ce thème aux autres : la peur de parler en public
frappe des gens **déjà en poste**. `embauche`, `chômage`, `reconversion`, `france travail`
et `job dating` sont donc exclus, en plus de `emploi` et `recrutement` déjà présents dans
le socle.

Le discours de mariage est écarté pour une autre raison : la page ne le traite pas.
