# Décryptage dans les séquences email des guides : blocs à coller dans Brevo

*Rédigé le 10 novembre 2026, à valider avant d'être collés dans Brevo.*
Base : l'état des lieux Brevo du 10/11/2026 (4 emails par séquence : E1 guide, E2, E3, E4).
Règles : vouvoiement, aucune promesse de résultat, « pistes » et jamais de diagnostic, pas de nouvel email (on complète des emails existants).

## Où placer le bloc

| Séquence | Email | Pourquoi là |
|---|---|---|
| Sommeil, Procrastination, Tabac, Colère, Carrière | **E2** (J+3) : bloc complet avec bouton | Ces E2 n'ont aucun bouton : ils invitent seulement à répondre |
| Sommeil, Tabac, Colère, Carrière | **E4** (J+14, « dernier email ») : bouton secondaire sous le bouton Resalib | Sortie douce pour qui n'est pas prêt à réserver une séance |
| Procrastination | **E3** (template 95, « dernière question honnête ») : bouton secondaire sous le bouton | C'est elle qui porte « ceci est mon dernier email » |
| Autohypnose | **E4** (J+7, template 83) : bouton secondaire sous le bouton Resalib | L'E2 demande une réponse « OUI / PAS ENCORE » : un bouton la diluerait |
| Émotions au travail | aucun (guide envoyé par Resend, pas de séquence) | La page merci est son seul point d'entrée |

Procrastination : ne pas ajouter le bloc à l'E3 tant que l'ordre E3/E4 et le délai ne sont pas corrigés dans l'automation.

## Liens (à copier tels quels)

Convention de source : `utm_source=email`, `utm_medium=sequence`, `utm_content=email<N>-<guide>`.

| Guide | E2 | E4 (ou E3 pour procrastination) |
|---|---|---|
| Sommeil | `https://novahypnose.fr/decryptage?utm_source=email&utm_medium=sequence&utm_content=email2-sommeil` | `…utm_content=email4-sommeil` |
| Procrastination | `…utm_content=email2-procrastination` | `…utm_content=email3-procrastination` |
| Tabac | `…utm_content=email2-tabac` | `…utm_content=email4-tabac` |
| Colère | `…utm_content=email2-colere` | `…utm_content=email4-colere` |
| Carrière | `…utm_content=email2-carriere` | `…utm_content=email4-carriere` |
| Autohypnose | (non utilisé) | `…utm_content=email4-autohypnose` |

(`…` = `https://novahypnose.fr/decryptage?utm_source=email&utm_medium=sequence`)

## Bloc E2 (bouton), à placer avant « Si vous souhaitez en savoir plus, répondez à cet email »

Phrase d'ouverture selon le guide :
- **Sommeil** : Pour mettre des mots sur ce qui pèse sur vos nuits, j'ai préparé 5 questions.
- **Procrastination** : Pour mettre des mots sur ce qui se joue pour vous quand vous repoussez, j'ai préparé 5 questions.
- **Tabac** : Pour mettre des mots sur ce qui rend l'arrêt difficile pour vous, j'ai préparé 5 questions.
- **Colère** : Pour mettre des mots sur ce qui fait monter votre colère, j'ai préparé 5 questions.
- **Carrière** : Pour mettre des mots sur ce qui freine votre évolution, j'ai préparé 5 questions.

Suite, identique pour tous :

> Elles prennent 2 minutes. Vous obtenez tout de suite un décryptage personnalisé : ce qui ressort de vos réponses, et quelques pistes pour la suite. C'est gratuit, sans engagement, et vos réponses restent confidentielles.
>
> **[ Faire mon décryptage ]**  → lien E2 du guide

## Bouton secondaire E4 (et E3 procrastination), sous le bouton principal

Version validée le 10/11/2026 : un **bouton secondaire** et non un simple lien (le lien gris, petit, était trop discret sur le test). Le bouton principal (Prendre rendez-vous / WhatsApp) reste dominant.

À placer juste après le bouton « Prendre rendez-vous » (ou « Me contacter sur WhatsApp ») :

> Pas prêt(e) pour une séance ? Vous pouvez aussi commencer par un décryptage en 5 questions, gratuit et sans engagement.
> **[ Faire mon décryptage (2 min) ]** → lien E4 du guide

Style du bouton : « outline », fond blanc, bordure et texte de la même couleur que le bouton principal (rose), même largeur que lui. Phrase au-dessus : gris foncé (pas gris clair), taille de texte normale.

Pour l'autohypnose, même bloc, après le bouton « Prendre rendez-vous sur Resalib » et avant « Si vous avez une question avant de vous lancer ».

Suivi : les volumes sont trop faibles pour un test A/B. Regarder le nombre de clics sur ce bouton dans Brevo après 4 à 6 semaines.

## Avant de coller dans Brevo

1. Ne pas modifier le template d'une séquence active : le dupliquer, coller le bloc, envoyer un test, puis remplacer dans l'automation.
2. Dans le test, cliquer sur le bouton : la page `/decryptage` doit s'ouvrir sur l'écran d'accueil du tunnel (le lien d'email ne présélectionne pas la question 1).
3. Vérifier en même temps le lien de désinscription du test (voir l'état des lieux : absent du contenu, et `[UNSUBSCRIBE_LINK]` dans l'E4 autohypnose).
4. Le suivi par source n'enregistre une ligne dans `decryptage_responses` que si la personne laisse son email et coche le consentement. Les autres visites ne sont visibles que dans Google Analytics. La colonne `utm_*` exige que la migration `20261110_decryptage_responses_utm.sql` soit appliquée et la fonction `decryptage-submit` déployée.
