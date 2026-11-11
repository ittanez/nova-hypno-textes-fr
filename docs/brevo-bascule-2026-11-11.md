# Bascule Brevo des 6 séquences de guides (10-11 novembre 2026)

Ce document est la référence pour les e-mails des 6 séquences de guides gratuits dans Brevo. Il remplace les tableaux précédents (les numéros d'origine de Procrastination y étaient inversés pour E3 et E4).

## 1. Ce qui a été fait

- 24 copies corrigées créées dans Brevo (n° 154 à 177), puis renommées « <Séquence> E<n> — v2 2026-11 ».
- Dans chaque automation, l'ancien message de chaque étape a été supprimé et remplacé par un nouveau message créé à partir de la copie correspondante.
- Le nom, l'objet et le contenu des copies n'ont pas changé au renommage. Les copies restent dans la liste des modèles, inactives.
- La bascule a été faite par Alain Zenatti dans l'interface Brevo (et pour Procrastination par un plugin Claude). Elle n'a pas été relue ici directement dans Brevo : cette page repose sur le compte rendu d'Alain.

## 2. Correspondance (ancien modèle → copie v2 → place dans l'automation)

| Automation | E1 | E2 | E3 | E4 |
|---|---|---|---|---|
| Autohypnose (#2), J+0 / +2 / +4 / +7 | 41 → **154** | 42 → **155** | 43 → **156** | 83 → **157** |
| Sommeil (#5), J+0 / +3 / +7 / +14 | 73 → **158** | 74 → **159** | 75 → **160** | 76 → **161** |
| Procrastination (#10), attentes 3 / 4 / 3 / 3 jours | 92 → **162** | 93 → **163** | 95 → **165** | 94 → **164** |
| Tabac (#11), J+0 / +3 / +7 / +14 | 104 → **166** | 105 → **167** | 106 → **168** | 107 → **169** |
| Colère (#12), J+0 / +3 / +7 / +14 | 115 → **170** | 114 → **171** | 113 → **172** | 112 → **173** |
| Carrière (#13), J+0 / +3 / +7 / +14 | 121 → **174** | 120 → **175** | 119 → **176** | 118 → **177** |

Attention :
- **Procrastination** : l'E3 est « Une dernière question honnête… » (copie 165, ancien 95) et l'E4 est la FAQ « Vos questions sur l'hypnothérapie » (copie 164, ancien 94). C'est l'inverse de l'ordre des numéros.
- **Colère et Carrière** : les numéros d'origine descendent (115, 114, 113, 112). Les séquences ont été créées en dupliquant celle du Sommeil, d'où les anciens noms « Tunnel Sommeil… ». Se fier au nom « E1 à E4 » des copies, ou au numéro.
- Les délais sont ceux relevés dans l'audit du 10/11 ; ils n'ont pas été modifiés.

## 3. Ce que doivent contenir les e-mails

- Prénom géré (`{% if contact.PRENOM %}…{% endif %}`), « Bonjour, » si vide.
- Titre et nombre de pages du guide corrects : Autohypnose 19 pages (8 protocoles), Sommeil 14, Procrastination 14, Tabac 12, Colère 12, Carrière 12 (voir `guides-pdf/REVISION-2026-11-10.md`).
- Un lien de désinscription visible (variable `{{ unsubscribe }}`).
- `contact@novahypnose.fr` comme seule adresse.
- Aucune promesse de résultat. Là où un engagement est utile : « Je ne peux pas vous promettre de résultat : si après 2 ou 3 séances rien n'a bougé pour vous, je vous le dis franchement, et je ne vous propose pas de continuer. »
- Tarif : première séance de 1 h 30, 90 € ; séances suivantes d'1 heure, 90 €.
- Lieu : « Paris 4e et en visio, partout en France ».
- Boutons WhatsApp vers `https://novahypnose.fr/wa` ; boutons « Prendre rendez-vous » vers Resalib.

## 4. Sauvegardes et ménage dans Brevo

- 11 sauvegardes « [SAUVEGARDE 10-11] » (n° 143 à 153) : copies des anciens E2 et E4 (n° 74, 76, 83, 93, 95, 105, 107, 112, 114, 118, 120). Il n'existe pas de sauvegarde pour les anciens E1 et E3 : leur texte est dans l'état des lieux Brevo du 10/11.
- Les anciens modèles 92 et 94 (Procrastination) ont été supprimés sans sauvegarde ; leur contenu corrigé est dans 162 et 164.
- Les modèles « TEST Décryptage » (n° 122 à 131) et l'adresse `a.zenatti+test11nov2026@gmail.com` dans la liste de test restent en place pour l'instant.

## 5. Procédure pour remplacer un e-mail dans une étape d'automation

1. Ouvrir l'étape, noter le nom de l'ancien message.
2. Corbeille de l'étape, puis « Supprimer le message » (cela supprime le message du workflow, pas le modèle).
3. « Ajouter un message », « Créer un nouveau message », « à partir d'un template », choisir le modèle.
4. « Utiliser » en haut à droite, puis « Enregistrer » en bas (sans cela, rien n'est enregistré).
5. Contrôler à l'écran le nom, l'objet, l'expéditeur, les délais et l'état actif de l'automation.

## 6. Points ouverts

- Utm du bloc Décryptage de la copie 165 (Procrastination) : la décision initiale était `utm_content=email4-procrastination`, alors que cet e-mail est maintenant le 3e de la séquence (voir `docs/tunnel-decryptage-emails-guides.md`, qui indique `email3-procrastination`). Décision d'Alain le 11/11/2026 : on ne change rien dans Brevo. La valeur réellement présente dans la copie 165 n'a pas été relue ; elle n'a d'effet que sur l'étiquette de suivi des clics, pas sur l'envoi.
- L'objet et l'ordre E3 / E4 de Procrastination n'ont pas été testés sur un vrai parcours.
- E2 Colère : il évoque « la technique de respiration » alors que l'E1 propose la « Fenêtre physiologique » (relevé de l'audit, non corrigé).
- Autohypnose : les liens de désinscription des anciens E2 et E3 étaient `{{ unsubscribe_marketing}}` ; les copies utilisent `{{ unsubscribe }}`. Seul un envoi de test confirme que le lien fonctionne.
