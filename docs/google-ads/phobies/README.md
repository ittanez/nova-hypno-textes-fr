# Campagne Google Ads — Phobies · Paris · 100 €/mois

Campagne Search prête à lancer pour NovaHypnose (Alain Zenatti, 16 rue Saint-Antoine,
75004 Paris).

| | |
|---|---|
| **Objectif** | Prises de rendez-vous (Resalib) + appels téléphoniques |
| **Budget** | 100 €/mois → **3,28 €/jour** |
| **Zone** | Paris intra-muros (présence réelle uniquement) |
| **Thème** | Peur du dentiste · Claustrophobie & IRM |
| **Réseau** | Recherche Google uniquement |

---

## 1. Pourquoi ces deux phobies, et pas « les phobies »

**Personne ne cherche « phobie ».** C'est une catégorie clinique, pas un comportement de
recherche : celui qui a peur de l'avion tape « peur de l'avion », jamais « hypnose
phobie ». Cibler le terme générique, c'est acheter un volume faible avec une intention
diffuse — et perdre ce qui fait toute la valeur du créneau.

Car ce qui fait converger une phobie en Search payant, c'est **l'échéance**. Un rendez-vous
chez le dentiste déjà pris, une IRM programmée la semaine prochaine. C'est ce qui distingue
ces requêtes du stress, qui n'a pas de date et peut se reporter indéfiniment.

Les deux retenues sont celles qui combinent échéance forte **et** absence de creux
saisonnier :

| Groupe | Échéance | Page de destination | Séances annoncées |
|---|---|---|---|
| `AG1 • Peur du dentiste` | Rendez-vous pris, douleur en cours | `/hypnose-peur-dentiste-paris` | 2 à 4 |
| `AG2 • Claustrophobie & IRM` | Examen d'imagerie programmé | `/hypnose-claustrophobie-paris` | 2 à 4 |

La prise de parole en public, initialement dans cette campagne, a été **sortie dans sa
propre campagne** ([`../parler-en-public/`](../parler-en-public/README.md)) : deux
campagnes qui se disputent les mêmes enchères brouillent les données, et le thème méritait
le budget entier.

**Écartées volontairement :** peur de l'avion (la meilleure niche de l'année, mais en creux
en août — à relancer vers février-mars), arachnophobie et acrophobie (aucune échéance),
phobie sociale (plus proche de l'anxiété que de la phobie spécifique).

Deux avantages structurels par rapport au thème stress : le **CPC est plus bas** (bien
moins d'annonceurs se disputent ces requêtes) et la **correspondance annonce ↔ page est
parfaite**, chaque phobie disposant de sa page dédiée.

### Une seule annonce par groupe

Deux groupes à 3,28 €/jour, cela fait environ **1,64 € par groupe et par jour**. Deux
annonces par groupe ne cumuleraient jamais assez d'impressions pour que Google puisse les
départager. Une RSA complète (15 titres, 4 descriptions) par groupe donne déjà à
l'algorithme de quoi tester des combinaisons.

---

## 2. Paramètres

Identiques à ceux de la campagne stress, **au nom et aux enchères près** — voir
[`../stress-anxiete/README.md`](../stress-anxiete/README.md) §2 pour le détail écran par
écran, notamment les deux réglages qui protègent le plus de budget :

> ⚠️ **Display et partenaires de recherche décochés** · **ciblage géographique sur
> « Présence » et non « Présence ou intérêt »**

| Paramètre | Valeur |
|---|---|
| Nom | `NH • Search • Phobies • Paris` |
| Budget quotidien | **3,28 €** |
| Stratégie | **Maximiser les clics**, plafond CPC **1,40 €** |
| Zone | Paris (ville), option **Présence** |
| Calendrier | 07:00 – 23:00, +20 % sur Lun–Ven 11:00–20:30 |

Le plafond est légèrement inférieur à celui de la campagne stress (1,40 € contre 1,50 €) :
ces requêtes sont moins disputées, il n'y a pas de raison de surenchérir.

---

## 3. Mots-clés — 28, exact + expression

[`import/2-mots-cles.csv`](import/2-mots-cles.csv) — 7 termes par groupe, chacun décliné en
exact et en expression. Aucune requête large.

Chaque groupe contient un terme distinctif tiré du contenu réel de sa page :
`hypnose réflexe nauséeux` (mentionné 10 fois sur la page dentiste) et `hypnose peur irm`
(10 fois sur la page claustrophobie). Ces requêtes sont rares mais quasi sans concurrence.

---

## 4. Exclusions — 356

[`import/3-mots-cles-negatifs.csv`](import/3-mots-cles-negatifs.csv). Le socle commun est
repris de la campagne stress (gratuit, formation, villes hors Paris, concurrence, mineurs,
prix, détresse), **moins les 22 termes qui bloqueraient les phobies elles-mêmes** —
`dentiste`, `claustrophobie`, `hypnose peur`, `hypnose phobie` en faisaient partie.

S'y ajoutent 42 exclusions propres au thème, dont deux pièges qui coûteraient cher :

**Le piège du dentiste.** « hypnose dentiste paris » attire deux populations très
différentes : celui qui cherche un hypnothérapeute pour sa peur, et celui qui cherche **un
dentiste pratiquant la sédation sous hypnose**. Le second ne prendra jamais rendez-vous
ici. D'où l'exclusion de `sédation`, `méopa`, `anesthésiste`, `chirurgien dentiste`, et de
tous les actes dentaires (`implant`, `couronne`, `détartrage`, `blanchiment`, `carie`…).
Le mot-clé trop générique « hypnose dentiste paris » a d'ailleurs été écarté au profit de
formulations qui nomment la peur.

**Le piège de l'IRM.** « hypnose IRM » peut aussi être cherché par quelqu'un qui veut un
centre d'imagerie, ou ses résultats. D'où `radiologie`, `radiologue`,
`"imagerie médicale"`, `"résultats irm"`, `"rendez-vous irm"`.

Les phobies non ciblées sont exclues **en expression** et non en requête large
(`"hypnose peur de l'avion"` plutôt que `avion`) : la page claustrophobie traite
explicitement l'avion et le métro, une exclusion large amputerait ses propres requêtes.

---

## 5. Suivi des conversions

**Rien à refaire.** Le dispositif est commun aux trois campagnes : les mêmes actions de
conversion, le même `VITE_GOOGLE_ADS_ID`, le même module `src/lib/googleAds.ts`. Voir
[`../stress-anxiete/README.md`](../stress-anxiete/README.md) §5.

Seul le suffixe d'URL finale change :

```
utm_source=google&utm_medium=cpc&utm_campaign=phobies-paris&utm_content={creative}&utm_term={keyword}&matchtype={matchtype}&device={device}
```

---

## 6. Audit de cohérence

24 requêtes dérivées du contenu réel des pages ont été confrontées aux mots-clés et
aux exclusions. **Deux sur-blocages ont été trouvés et corrigés :**

| Exclusion fautive | Ce qu'elle bloquait | Correction |
|---|---|---|
| `réunion` en requête large | « hypnose prise de parole réunion » — alors que la page emploie « réunion » 5 fois | Le terme visait l'**île de La Réunion** : remplacé par l'expression `"île de la réunion"` |
| `anesthésie` en requête large | « hypnose peur du dentiste anesthésie », une requête parfaitement légitime | Restreint à l'expression `"anesthésie générale"` |

Le premier était une vraie collision de sens entre un département d'outre-mer et un mot du
vocabulaire professionnel. **Il était aussi présent dans la campagne stress**, où il a été
corrigé de la même manière.

Après correction, seules les requêtes visées sont bloquées : recherche d'un dentiste, de
résultats d'imagerie, de cours d'éloquence, de formation, et les phobies non ciblées.

---

## 7. Lancement

La procédure est celle du [README stress](../stress-anxiete/README.md) §8, avec ces
fichiers-ci. Points d'attention propres à cette campagne :

- [ ] Vérifier que chaque groupe pointe vers **sa** page (deux URL finales différentes)
- [ ] Extension d'appel planifiée sur **Lun–Ven 11:00–20:30**
- [ ] Après 2 semaines, contrôler les termes de recherche du groupe dentiste en priorité —
      c'est là que la confusion « hypnothérapeute / dentiste sous hypnose » se verra

---

## 8. Quand relancer la peur de l'avion

C'est la meilleure niche du portefeuille, mais elle est saisonnière. Un troisième groupe
`AG3 • Peur de l'avion` vers `/peurdelavion` se prépare en **janvier**, pour capter les
réservations de printemps et d'été. La page existe déjà et est aussi étoffée que les deux
autres.
