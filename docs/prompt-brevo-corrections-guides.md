# Prompt à donner à Claude Code (avec accès à Brevo) : mettre les emails en cohérence avec les nouveaux guides

*Rédigé le 10 novembre 2026. À coller tel quel dans Claude Code sur votre ordinateur, là où Brevo est accessible.*

---

## Prompt

Tu as accès à mon compte Brevo (NovaHypnose, hypnothérapeute à Paris). J'ai refait les 7 guides PDF gratuits. Les emails des séquences ne correspondent plus aux guides. Je veux que tu **audites** les emails, puis que tu **prépares des copies corrigées**, sans rien envoyer et sans modifier les originaux.

### Règles strictes
1. **Lecture seule d'abord.** Ne modifie, n'active, ne désactive et n'envoie rien avant que j'aie validé ton rapport.
2. **Jamais de modification directe d'un template actif.** Tu dupliques le template (suffixe « — v2 2026-11 ») et tu corriges la copie. Tu ne branches pas la copie dans une automation : je le ferai.
3. **Ne rien inventer.** Si une information manque (identifiant, délai, texte), écris « Je ne sais pas » et dis-moi où la trouver.
4. Vouvoiement, le mot « client », aucune promesse de résultat, « pistes » et jamais « diagnostic ».
5. Ne touche à aucune liste de contacts, aucun contact, aucun segment.

### Les 7 guides
| Guide | Titre exact du PDF | Pages | Séquence Brevo |
|---|---|---|---|
| Sommeil | Le Sommeil, Votre Allié Secret | 14 | oui |
| Procrastination | Et si vous n'étiez pas paresseux ? | 14 | oui |
| Arrêt du tabac | Arrêter de Fumer, Autrement | 12 | oui |
| Colère | La Colère, Enfin Apprivoisée | 12 | oui |
| Carrière | Levez les Freins qui Bloquent Votre Carrière | 12 | oui |
| Autohypnose | Reprenez la main sur votre bien-être | 19 | oui |
| Émotions au travail | Vous tenez. Mais jusqu'à quand ? | 12 | non (envoyé par Resend, hors Brevo) |

### Ce que tu dois relever, email par email (E1 à E4 de chaque séquence)
Pour chaque template, dis-moi s'il contient l'un de ces points, et cite la phrase exacte :

1. **Nombre de pages** différent du tableau ci-dessus (anciennes valeurs probables : 17, 20, 37 pages).
2. **Titre du guide** différent du tableau (ex. « Votre Nouveau Départ » pour le tabac, « Votre Carrière, Enfin Débloquée », « L'Autohypnose au Quotidien »).
3. **Promesses de résultat ou chiffres sans source** : « 85 % de mes clients… », « +81 % », « garanti », « efficace à X % », « testé sur 1 000 clients », « en une séance », etc. Liste-les toutes, je déciderai au cas par cas.
4. **Titre « Maître Praticien en Hypnose Ericksonienne »** (ou « Maître Hypnologue ») : à remplacer par « Hypnothérapeute ».
5. **Tarif** : la bonne formule est « première séance 1 h 30, 90 € ; séances suivantes 1 heure, 90 € ». Signale tout autre prix ou durée.
6. **Contact** : le seul email à afficher est `contact@novahypnose.fr`. Le lien WhatsApp est `https://novahypnose.fr/wa`. Signale tout autre email ou lien WhatsApp.
7. **Lieu** : la formule est « Paris 4e et en visio, partout en France ». Signale « Paris » seul ou une autre formule.
8. **Premier échange téléphonique** : 15 minutes (pas 30). Lien Calendly : `https://calendly.com/zenatti/rdvtelephonique`.
9. **Tabac** : un email parle de « 3 à 5 séances » alors que le guide ne donne plus de nombre. Remplace par « quelques séances, variable selon les personnes ».
10. **Autohypnose** : le guide ne contient plus « 2 protocoles exclusifs » ni « 9 protocoles » ; il en contient 8. La formation à l'autohypnose se fait au cabinet à Paris 4e jusqu'à 6 personnes, et sur devis jusqu'à 12 personnes (entreprises, par exemple). Corrige toute autre indication.
11. **Images** : toute image qui montre une ancienne couverture. Les nouvelles couvertures seront disponibles après la mise en ligne du site à ces adresses :
    - `https://novahypnose.fr/images/couverture-guide-sommeil.webp`
    - `https://novahypnose.fr/images/couverture-guide-procrastination.webp`
    - `https://novahypnose.fr/images/couverture-guide-tabac.webp`
    - `https://novahypnose.fr/images/couverture-guide-colere.webp`
    - `https://novahypnose.fr/images/couverture-guide-carriere.webp`
    - `https://novahypnose.fr/images/couverture-guide-autohypnose.webp`
    Avant de les utiliser, vérifie que l'adresse répond bien (sinon dis-le-moi : le site n'est peut-être pas encore déployé).
12. **Lien de téléchargement du PDF** : liste l'adresse utilisée dans chaque E1. Ne la change pas : les PDF seront remplacés sous le même nom.
13. **Bloc Décryptage** (voir `docs/tunnel-decryptage-emails-guides.md`) : dis-moi s'il est déjà présent dans chaque E2 et E4 (ou E3 pour la procrastination), avec le bon `utm_content`.
14. **Désinscription** : vérifie que le lien de désinscription est présent dans chaque email.

### Ce que tu me rends
1. Un tableau : séquence, email, id du template, problème relevé, phrase actuelle, phrase proposée.
2. La liste des copies créées (nom et id), sans les avoir activées.
3. Les points où tu hésites ou où une information me manque.
4. Les emails qui n'avaient aucun problème.

Attends ma validation avant toute autre action.

---

## Ce que je fais de mon côté (pas dans Brevo)
- Remplacer les 7 PDF dans le stockage Supabase, sous le même nom (liste dans `guides-pdf/README.md`), **en même temps** que la mise en ligne du site : le site annonce désormais 14, 14, 12, 12, 12, 19 pages.
- Les fonctions d'envoi des guides Autohypnose et Émotions (Resend) sont déjà corrigées dans le dépôt ; elles doivent encore être déployées dans Supabase.
