# Rapport de projet : tunnel de qualification pour la pratique d'hypnothérapie

*Synthèse de la session de travail du 8 novembre 2026*

---

## 1 · Point de départ

L'analyse d'un tunnel de vente réel ([event.alex-adler.fr — Système ABA](https://event.alex-adler.fr/inscription-aba), offre "Insta To Profit") a servi de référence. Ce tunnel enchaîne : landing page → quiz "Parcours Miroir" → bilan personnalisé → paiement Stripe, avec emails automatiques via ActiveCampaign.

**Constat initial :** la partie technique est largement réalisable en "vibe coding" (Claude Code, Vibe, etc.). Facile : landing, quiz, countdown, Stripe Checkout. Moyen : dashboard stats, séquence email, envoi du bilan. Le vrai travail : le PDF personnalisé par prospect et l'orchestration (quiz → scoring → PDF → email → relance).

---

## 2 · Le prototype interactif (canvas React « tunnel-aba-prototype »)

Prototype complet et navigable, développé en trois itérations :

1. **V1** : reproduction complète incluant landing page (countdown, preuves sociales, notifications "en direct" simulées, offre, paiement)
2. **V2** : suppression de la landing à la demande — le tunnel démarre directement au quiz
3. **V3** : adaptation à l'hypnothérapie, puis personnalisation sur les modalités réelles d'Alain

**Le tunnel final : Quiz → Décryptage → Échange 15 min → Confirmation**

| Étape | Contenu |
|---|---|
| **Quiz (Parcours Miroir)** | 5 questions en plein écran, barre de progression en %, réponses au clic |
| **Décryptage** | Score calculé en direct (35-98) selon les réponses + 3 priorités qui rejouent les mots exacts du prospect |
| **Échange 15 min** | Choix de créneau (agenda simulé, type Cal.com/Calendly), coordonnées, confirmation |
| **Confirmation** | Écran expliquant ce qui se passerait en production (emails, rappels, dashboard) |

**Mécanisme de scoring :** la projection (Q2) et l'engagement (Q4) pèsent plus lourd que le motif (Q1). Le score est borné et réagit aux mots-clés des réponses.

**Filtre anti "solution magique" :** si le prospect répond "J'attends surtout qu'on me propose une solution" (Q4), le score chute et un encadré d'honnêteté apparaît dans le décryptage, expliquant que l'hypnose est un travail à deux. Alain sait ainsi avant l'échange sur quel profil il va tomber.

---

## 3 · Les 5 questions du quiz (version finale)

Arc psychologique : **problème → projection → historique → engagement → passage à l'action**, en vouvoiement, ton chaleureux "comme une conversation".

**Q1 · Le problème** — Aujourd'hui, qu'est-ce qui vous pèse le plus au quotidien ?
L'anxiété, le stress, les ruminations · Un sommeil qui ne me repose plus · Une phobie ou un blocage précis · Le manque de confiance en moi

**Q2 · La projection (la plus importante)** — Imaginez un matin où tout cela a disparu. Qu'est-ce qui change en premier pour vous ?
Je me réveille l'esprit léger, sans ce poids · J'ose enfin faire ce que j'évite aujourd'hui · Je retrouve mon énergie et ma joie de vivre · Mes proches retrouvent l'ancien moi

**Q3 · L'historique** — Avez-vous déjà essayé de vous en libérer ?
Oui, sans résultat durable · Oui, ça a marché un temps · Non, c'est la première fois que j'en parle · J'ai surtout survécu avec, pas essayé de m'en libérer

**Q4 · L'engagement (le filtre)** — Quelle phrase vous ressemble le plus ?
Je suis prêt(e) à être acteur de mon changement · J'aimerais que ça change, mais j'ai peur que ça ne marche pas · J'attends surtout qu'on me propose une solution · J'ai déjà tout essayé, je suis venu(e) voir par curiosité

**Q5 · Le passage à l'action** — Quand souhaitez-vous passer à la vie d'après ?
Ce mois-ci, je n'en peux plus d'attendre · Dans 1 à 2 mois · Plus tard, je me renseigne d'abord · Je ne sais pas encore

*Signal faible identifié : la réponse Q3 "J'ai surtout survécu avec" doit être remontée explicitement dans l'email qu'Alain reçoit pour chaque bilan.*

---

## 4 · Les choix de positionnement validés

- **Vocabulaire** : des "clients", jamais des "patients" · vouvoiement systématique, y compris dans les supports marketing
- **Modalités réelles** : première séance 1h30 à 90 €, séances suivantes 90 €, au téléphone, au cabinet (Paris 4e) ou en visio. Échange préalable gratuit de 15 min **par téléphone** (agenda dédié)
- **Pas de promesse de résultat** : la règle des 2-3 séances a été reformulée en "promesse d'honnêteté", transférant le risque du client vers le praticien :
  > "Mon engagement : si après 2 ou 3 séances rien n'a bougé pour vous, je vous le dis franchement, et je ne vous propose pas de continuer."
- **Déontologie** : le bilan reste dans le registre des "pistes" et "orientations", jamais diagnostique ; bandeau de prudence en pied de bilan (ni avis médical ni suivi psychiatrique) ; réponses du quiz = données de santé mentale → consentement RGPD explicite requis en production

---

## 5 · Les textes du tunnel (canvas « bilan-hypnose-emails »)

Quatre blocs prêts à brancher sur un outil emailing (Brevo, MailerLite, ActiveCampaign), avec variables `[Prénom]`, `[Q1]`-`[Q5]`, `[Créneau]` :

1. **Email d'envoi du bilan** (J+5 min) : effet miroir sur Q1/Q2, règle d'honnêteté, CTA agenda
2. **Bilan PDF page 1/4** : score, 3 priorités, grille tarifaire, bandeau déontologique
3. **Email de confirmation de l'échange** : annonce l'appel, rassure, réaffirme la franchise bilatérale
4. **Séquence de relances** : rappel J-1, relances J+2/J+7 si appel manqué, message de fermeture à J+14 ("je ferme votre bilan") — au-delà de 3 messages, perte de crédibilité

---

## 6 · Stratégie d'acquisition (Instagram & LinkedIn)

**Instagram** :
- Sticker de lien en Story (seul lien cliquable natif) avec flèche/GIF pointant vers lui
- "Lien en bio" en fin de posts ; les liens en légende ne sont pas cliquables
- DM automatiques par mot-clé (ManyChat) : "Commentez DECRYPTAGE" — le meilleur convertisseur
- Contenu : un Reel par question du quiz ; la Q2 comme accroche vedette

**LinkedIn (2026)** :
- Un lien externe dans le corps d'un post coûte 40 à 60 % de portée ; le premier commentaire ne protège plus vraiment
- Parade : lien dans la section "Sélection" du profil, mention du décryptage en fin de post, lien direct max 1 post sur 5
- Depuis une page entreprise, un lien **augmente** les impressions (~+50 %) — à la différence du compte personnel
- Angle spécifique : stress professionnel, charge mentale, sommeil des dirigeants ; le mot "décryptage" y fonctionne mieux que "bilan bien-être"

**Principe unifiant** : le contenu gratuit fait 90 % du travail, le quiz n'est que la sortie. Vendre la révélation ("ce qui vous pèse a un nom"), jamais le test.

---

## 7 · Reste à faire (roadmap)

1. **Valider le contenu** : tester le prototype, ajuster formulations, scores et créneaux
2. **Identifiants** : remplacer le handle placeholder `@alain.hypnose` par le vrai compte Instagram ; décider du nom de domaine du tunnel
3. **Choix de la stack** : hébergement (Vercel/Netlify), quiz (développé sur mesure ou outil type Typeform/Tally avec logique conditionnelle), agenda (Cal.com — gratuit, envoie confirmation + rappels), emailing (Brevo, gratuit jusqu'à un certain volume)
4. **PDF personnalisé** : générer le bilan en HTML → PDF (ex. html2pdf, ou service type Carbone) à partir des réponses
5. **Conformité** : RGPD (données de santé → consentement explicite, hébergement HDS à étudier si nécessaire), mentions légales, politique de confidentialité
6. **Production de contenu** : série de 5 Reels/posts (un par question) avec accroches prêtes à publier
7. **Dashboard** (optionnel) : visites, taux de complétion, abandons par question, bilans reçus avec alerte sur les signaux faibles (Q3 "survécu", Q4 "solution magique")

---

## 8 · Livrables de la session

| Livrable | Support | Contenu |
|---|---|---|
| Prototype interactif | Canvas « Tunnel hypnose — Quiz · Décryptage · Échange 15 min » | Tunnel React complet, vouvoiement, scoring réel, filtre anti "solution magique" |
| Textes du tunnel | Canvas « Tunnel hypnose — Bilan PDF & emails automatiques » | Email bilan, bilan PDF, confirmation, séquence de relances |
| Fiche pratique | Base de connaissance | Tarifs, modalités, positionnement d'Alain (mis à jour en cours de session) |
| Rapport | Ce document | Synthèse complète du projet |