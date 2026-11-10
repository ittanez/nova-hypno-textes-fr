# Audit des 7 PDF des guides gratuits (10/11/2026)

*Lecture seule : aucun fichier n'a été modifié, ni dans Supabase ni dans Brevo.*

## Ce qui a été fait, et ses limites
- Les 7 PDF ont été téléchargés depuis le stockage Supabase (liens relevés dans le code), leur texte extrait, des mesures faites (pages, mots, outil de fabrication, liens), les couvertures rendues côte à côte.
- **Je n'ai pas relu les 7 textes en entier.** J'ai lu les passages ciblés : chiffres, études, promesses, mentions médicales, fins de document. L'audit de la mise en page se limite aux **couvertures**, pas aux pages intérieures.
- **6 sources vérifiées sur le web** (voir section 4). Les autres références citées dans les PDF ne sont **pas vérifiées**.
- Je n'ai pas vu l'adresse exacte que chaque email Brevo utilise pour le PDF. L'association guide → fichier vient du code (`send-guide-autohypnose`, `send-guide-ebook`) et des noms de fichiers.

## 1. Les 7 fichiers
| Guide | Fichier (stockage Supabase) | Pages | Mots (env.) | Fabriqué avec | Liens cliquables |
|---|---|---|---|---|---|
| Émotions au travail | `images/guide-emotions-travail.pdf` | 19 | 3 400 | Google Docs | LinkedIn seulement |
| Autohypnose | `pdf/REPRENEZ_LA_MAIN_COMPLET.pdf` | 38 | 6 300 | Google Docs | aucun |
| Sommeil | `pdf/Ebook-Sommeil-et-Hypnose-Alain-Zenatti.pdf` | 17 | 2 800 | Ghostscript (PDF recompressé) | novahypnose.fr/contact-wa-brevo |
| Procrastination | `pdf/ebook-procrastination.pdf` | 17 | 3 100 | Google Docs | novahypnose.fr/wa |
| Tabac | `pdf/Ebook-Tabac-et-Hypnose-Alain-Zenatti.pdf` | 13 | 2 500 | ReportLab (généré par programme) | aucun |
| Colère | `pdf/Ebook-Colere-et-Hypnose-Alain-Zenatti.pdf` | 15 | 3 400 | LibreOffice Writer | novahypnose.fr/contact-wa-brevo |
| Carrière | `pdf/carriere.pdf` | 15 | 3 500 | LibreOffice Writer | novahypnose.fr/contact-wa-brevo |

Le dossier `pdf/` contient aussi `old-ebook-procrastination.pdf` et `old2-ebook-procrastination.pdf` (anciennes versions), ainsi que d'autres documents (Évasion du hamster, blessures d'enfance, transgénérationnel, peur et autohypnose) qui n'étaient pas dans le périmètre.

## 2. Mise en page : 7 styles différents
Les couvertures sont toutes différentes : illustration (Émotions), page blanche d'entreprise (Autohypnose), fond nuit avec lune (Sommeil), crème avec photo (Procrastination), bleu marine avec cercle (Tabac), texte seul sur fond crème (Colère, Carrière). **Quatre outils de fabrication différents** pour sept fichiers.
Même autorité de marque (Alain Zenatti, hypnothérapeute, NovaHypnose) mais pas de charte commune : couleurs, polices et structure varient.

## 3. Incohérences entre PDF, emails et pages
| Point | Ce que disent les emails/pages | Ce que contient le PDF |
|---|---|---|
| Nombre de pages, Sommeil | email E1 : « 20 pages » ; landing : 17 pages | **17** |
| Nombre de pages, Colère | email E1 : « 20 pages » | **15** |
| Nombre de pages, Carrière | email E1 : « 20 pages » | **15** |
| Nombre de pages, Autohypnose | email E1 : 37 pages | **38** (peut-être la couverture) |
| Titre, Tabac | email E1 : « Arrêter de Fumer, Votre Nouveau Départ » | couverture : « Arrêter de Fumer, Enfin et Pour de Bon » |
| Titre, Carrière | email E1 : « Votre Carrière, Enfin Débloquée » | couverture : « Levez les Freins qui Bloquent Votre Carrière » |
| Titre, Autohypnose | email E1 : « L'Autohypnose au Quotidien » | couverture : « Reprenez la main sur votre bien-être » (**à vérifier** : l'email pointe peut-être vers un autre fichier) |
| Procrastination | titre à la 2e personne du singulier : « Et si tu n'étais pas paresseux ? » | le reste du site et des guides vouvoie (à vérifier dans le corps du texte) |
| Émotions, dernière page | — | **`Site : [LIEN SITE WEB]` : un espace réservé jamais rempli**, visible par tous les lecteurs |

## 4. Affirmations vérifiées (recherche web)
Priorité haute : à corriger ou retirer avant toute rediffusion.

**a) Procrastination, tableau « Une efficacité reconnue »**
Le PDF affirme : psychanalyse 38 % après 600 séances, TCC 72 % après 22 séances, **hypnothérapie 93 % après 3 séances**, attribués à « une méta-analyse (Barrios, 1970) ».
- Ces chiffres (93 % / 72 % / 38 %) remontent bien à un article d'Alfred Barrios de 1970, mais sont **largement critiqués et mal sourcés**. Les reprises parlent de **6 séances** pour l'hypnose, pas 3. Aucun contrôle de la source primaire n'a été trouvé.
- Le chiffre « 3 séances » du PDF ne correspond donc pas aux reprises que j'ai trouvées.
- Ce tableau contredit ta règle « aucune promesse de résultat ». **À retirer.**
- Sources : [fil Skeptics Stack Exchange](https://kiwix.lema.org/skeptics.stackexchange.com_en_all_2023-11/questions/39569/does-hypnosis-have-a-93-recovery-rate-after-6-sessions), [blog reprenant le tableau](https://www.adam-eason.com/?p=2916).

**b) Autohypnose, « l'ajout de l'hypnose augmente l'efficacité de 70 % » (Kirsch et al., 1995)**
- Le chiffre de 70 % semble venir d'une autre formulation : le client moyen traité par TCC + hypnose s'améliorerait davantage qu'**au moins 70 % des clients traités sans hypnose**. Ce n'est pas « +70 % d'efficacité ». Cette formulation provient d'un site de promotion de l'hypnose, pas de l'article lui-même.
- L'analyse de 1995 portait sur 6 études de **perte de poids** (TCC seule contre TCC + hypnose) : le PDF la présente comme une règle générale pour « une thérapie classique ».
- Une réanalyse de 1996 (même revue) a trouvé des erreurs et un effet bien plus petit, plus statistiquement significatif après retrait d'une étude. Elle concluait que l'hypnose n'ajoute « au plus qu'une petite amélioration ».
- **À reformuler ou à retirer.**
- Sources : [Kirsch 1995, résumé PubMed](https://pubmed.ncbi.nlm.nih.gov/8698944/), [synthèse citant la réanalyse](https://hypnosisandsuggestion.org/is-it-effective.html).

**c) Tabac, « la méta-analyse Cochrane souligne que les études observationnelles suggèrent une efficacité supérieure »**
- La revue Cochrane de 2019 (Barnes et al.) conclut qu'il n'y a **pas de preuve fiable** que l'hypnothérapie aide plus à arrêter de fumer que d'autres approches ; s'il y a un bénéfice, il est **au plus petit** ; les preuves sont de **faible à très faible certitude**.
- La phrase du PDF présente les choses de façon bien plus favorable et omet cette conclusion. Les « 20-40 % d'abstinence à 6 mois » de la page ne sont pas vérifiés.
- **À reformuler honnêtement.**
- Source : [revue Cochrane CD001008](https://www.cochrane.org/evidence/CD001008).

Priorité moyenne : à nuancer.

**d) Sommeil, étude de Bâle (Cordi, Schlarb & Rasch, 2014)**
- Le résumé confirme : sommeil lent profond +81 %, éveil −67 %, **70 jeunes femmes, une sieste de 90 minutes**, effet chez les personnes **très suggestibles**. Le PDF le dit presque tel quel (« résultat chez les sujets hautement suggestibles »). Le titre du chapitre (« +81 % de Sommeil Profond ») et le préheader de l'email de J+3 (« +81 % de sommeil profond mesuré en labo ») généralisent davantage que l'étude ; le corps de l'email, lui, précise « chez les sujets suggestibles ». Sources : [Sleep 2014, PubMed Central](https://pmc.ncbi.nlm.nih.gov/articles/PMC4015388), [Université de Fribourg](https://www.unifr.ch/news/en/12513/).

**e) Sommeil, étude de Besedovsky et al. 2022 (Communications Biology)**
- L'article existe et décrit bien une hausse de l'hormone de croissance et une moindre prédominance sympathique ; la presse rapporte une hausse du sommeil lent profond « de presque la moitié » (cohérent avec « +49 % »). Je **n'ai pas pu vérifier** « +400 % au pic » ni « 23 jeunes hommes ». Les participants étaient sélectionnés pour leur forte suggestibilité, à l'occasion d'une **sieste**. Sources : [article en accès libre](https://oa-fund.ub.uni-muenchen.de/433/1/s42003-022-03643-y.pdf), [PsyPost](https://www.psypost.org/hypnotic-suggestion-may-enhance-slow-wave-sleep-and-increase-secretion-of-certain-hormones-study-finds/).

**f) Sommeil, « l'espace entre les cellules cérébrales s'élargit de 60 % » (Xie et al., 2013)**
- Le résumé de l'article confirme « environ 60 % », mais **chez la souris**. Le PDF écrit « le cerveau » sans préciser. À corriger : ajouter « chez la souris ». Source : [Xie et al. 2013](https://www.polyu.edu.hk/cbs/rclcn/images/cdl_articles/X/Xie_et_al._2013.pdf).

## 5. Affirmations non vérifiées (à contrôler avant réédition)
- Procrastination : Le Bouc & Pessiglione, Nature Communications 2022 ; « 68 % des procrastinateurs (étude 2023) » ; « étude longitudinale de l'Université de Sheffield » ; « Lieberman, UCLA, 40 % » ; « rapport Inserm 2015 reconnaissant l'efficacité de l'hypnose » (formulation à vérifier).
- Tabac : « 3 à 6 % d'abstinence avec la volonté seule », « 26 % / 54 % / 13 millions » du tableau d'ouverture.
- Autohypnose : « plus de 60 % des salariés » (INRS), « vous êtes en contrôle à 100 % ».
- Colère et Carrière : toutes les références de la bibliographie (Beck & Fernandez 1998, Bushman 2002, Jiang et al. 2017, Clance & Imes 1978, Steel 2007, Hartland 1971…) ; aussi « Gallup (2026) » et « Qualisocial-Ipsos 2024 », dont je ne peux pas confirmer l'existence.
- Colère et Carrière sont les seuls guides qui ont une **bibliographie** et une phrase d'honnêteté sur les limites de la recherche : un bon modèle pour les autres.

## 6. Structure et appel à l'action
- **Fin de document** : chaque guide se termine différemment : WhatsApp (Sommeil, Tabac, Colère, Carrière via une page de redirection Brevo), Resalib + téléphone (Procrastination), téléphone + email (Autohypnose), espace réservé non rempli + LinkedIn (Émotions).
- **Aucun guide ne renvoie vers le Décryptage.**
- **Mention médicale** : trouvée dans 5 guides sur 7 (consulter un médecin, complément d'un suivi). Je n'en ai pas trouvé dans Émotions ni dans Procrastination (recherche par mots-clés : un passage formulé autrement a pu m'échapper).
- **Sources** : bibliographie complète seulement dans Colère et Carrière ; aucune citation dans Émotions.

## 7. Propositions pour harmoniser
1. **Charte commune** pour les 7 : même couverture type, mêmes polices, mêmes couleurs, même pied de page. Un seul outil de fabrication (par exemple Canva ou Google Docs avec un modèle).
2. **Bloc de fin standard** : le Décryptage en premier (lien avec `utm_source=guide&utm_medium=pdf&utm_content=<guide>`), puis la prise de rendez-vous, puis le contact. Même mention médicale partout.
3. **Section « Sources et limites »** commune, sur le modèle de Colère/Carrière.
4. **Retirer ou corriger** les points 4a, 4b, 4c ; nuancer 4d, 4e, 4f.
5. **Aligner les emails** sur les PDF : nombre de pages, titres.
6. **Une version à jour dans le stockage** : remplacer le fichier à la même adresse met à jour les futurs téléchargements (cache à vérifier).
7. **Archiver** les anciennes versions hors du dossier public.

## 8. Ce que je ne sais pas
- Où sont les fichiers sources (Google Docs, LibreOffice, Canva…).
- Quelle adresse exacte utilisent les emails Brevo pour chaque PDF.
- Si le cache du stockage Supabase sert l'ancien fichier après remplacement.
- Le contenu des pages intérieures (mise en page, images, lisibilité).
