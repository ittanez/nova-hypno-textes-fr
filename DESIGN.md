---
name: NovaHypnose — Le Cabinet Risographié
description: Charte "ZENatti / risographie" — cobalt profond, ambre chaud, papier lin, ombres dures décalées
colors:
  cobalt: "#2B4BA0"
  cobalt-2: "#1C2B4A"
  amber: "#F2A12E"
  amber-2: "#F5BC60"
  amber-text: "#975D09"
  lin: "#F0ECE3"
  lin-2: "#F7F3EA"
  paper: "#FFFFFF"
  gris: "#566B8E"
  visio-navy: "#1E3A8A"
  error-red: "#EAB7B7"
typography:
  hero:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(72px, 10vw, 156px)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-.025em"
  hero-landing:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(44px, 8.2vw, 96px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-.03em"
  display:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(34px, 4.6vw, 62px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-.025em"
  chiffre:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(150px, 21vw, 330px)"
    fontWeight: 400
    lineHeight: 0.78
    letterSpacing: "-.05em"
  quote:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(24px, 3.2vw, 40px)"
    fontStyle: "italic"
    fontWeight: 400
    lineHeight: 1.32
    letterSpacing: "-.015em"
  lead:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(22px, 2vw, 30px)"
    fontWeight: 400
    lineHeight: 1.45
  stat:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "34px"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-.01em"
  title-sm:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.2
  body-lg:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.85
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
  small:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.7
  micro:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: ".22em"
rounded:
  pill: "999px"
  bloc: "40px"
  lg: "28px"
  md: "24px"
  sm: "16px"
  xs: "12px"
  focus: "6px"
spacing:
  container-max: "1240px"
  container-padding: "48px"
  container-padding-mobile: "24px"
  section: "130px"
  section-mobile: "88px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.lin}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-2}"
  button-amber:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.cobalt-2}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cobalt-2}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  card-domain:
    backgroundColor: "rgba(43,75,160,.05)"
    textColor: "{colors.cobalt-2}"
    rounded: "{rounded.md}"
    padding: "40px 34px 36px"
  card-tarif:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.cobalt-2}"
    rounded: "{rounded.md}"
    padding: "40px 32px 36px"
---

# Design System: NovaHypnose — Le Cabinet Risographié

## Overview

**Creative North Star: "Le Cabinet Risographié"**

Le système visuel traite le cabinet d'hypnothérapie comme une affiche sérigraphiée : papier lin en fond, deux couleurs d'encre (cobalt profond, ambre chaud), et le décalage caractéristique d'une impression risographie mal calée — visible dans les ombres portées, jamais floues, toujours décalées en diagonale (`4px 4px 0`, `6px 6px 0`). L'ambiance est chaleureuse, apaisée, artisanale : elle évite délibérément le blanc clinique et la froideur du cabinet médical, tout en restant lisible et confiante grâce à une typographie éditoriale soignée (EB Garamond en display, italique pour l'emphase émotionnelle) posée sur une base sans-serif discrète (DM Sans).

Le nom du praticien lui-même porte la signature de marque : « **ZEN**atti », avec « zen » en cobalt italique et « atti » en ambre — la charte est littéralement construite autour de ce jeu typographique bicolore, répété dans les titres de section (`<em>` en cobalt) et les accents ambre.

**Anti-référence confirmée :** le style « startup SaaS générique » — dégradés violet/bleu génériques, cartes uniformément arrondies sans caractère, icônes plates interchangeables. Rien dans ce système ne doit ressembler à un template IA par défaut.

**Key Characteristics:**
- Fond papier lin (`#F0ECE3`), jamais blanc pur en fond de section
- Duo d'encre cobalt/ambre, utilisé avec parcimonie et intention (accent, jamais fond dominant)
- Ombres dures décalées sans flou sur tout élément interactif (boutons, cartes, CTA flottant)
- Typographie éditoriale : EB Garamond en display/italique, DM Sans en corps, graisse 400 partout
- Coins très arrondis (pills `999px` pour boutons/tags, `24–28px` pour cartes et panneaux, `40px` pour une section entière traitée en bloc plein)
- Formes organiques animées en arrière-plan (blobs `border-radius` irréguliers, rotation lente) comme seule touche de mouvement décoratif

## Colors

Palette matière à deux encres sur fond papier : le cobalt structure et rassure, l'ambre ponctue et chaleuruse.

### Primary
- **Cobalt Profond** (`#2B4BA0`): couleur de marque dominante — CTA principal, liens, tags de section, bordures de focus, fond de la section contact. Utilisée aussi en version plus sombre **Cobalt Encre** (`#1C2B4A`, alias `cobalt-2`) pour le texte courant, les titres, le hover des boutons primaires et le fond du footer. Le texte de titre (`--texte`) et le corps de texte (`--corps`) partagent volontairement cette même valeur `#1C2B4A` : une seule encre foncée pour tout le texte.

### Secondary
- **Ambre Chaud** (`#F2A12E`): accent chaleureux — fonds, bordures, ombres riso, puces, CTA secondaire (`btn--amber`). Réservé aux surfaces et aux traits ; jamais utilisée en couleur de texte (1.80:1 sur lin, sous le seuil WCAG AA même pour du texte large). Variante claire **Ambre Doux** (`#F5BC60`, alias `amber-2`) pour les dégradés de séparateurs. Pour tout texte qui doit porter la teinte ambre (numéros de carte, "atti" du logo, chevron FAQ, statistiques), utiliser **Ambre Texte** (`#975D09`, alias `amber-text`) — même famille chromatique, assombrie pour atteindre 4.58:1 sur lin / 4.88:1 sur lin-2.

### Neutral
- **Lin Naturel** (`#F0ECE3`): fond de page par défaut, évoque le papier — jamais remplacé par du blanc pur.
- **Lin Clair** (`#F7F3EA`, alias `lin-2`): fond alterné pour les sections en bandes (à propos, domaines, tarifs), crée un rythme sans rupture de palette.
- **Papier** (`#FFFFFF`): réservé aux cartes qui doivent se détacher du fond lin (cartes tarifs).
- **Gris Discret** (`#566B8E`, alias `gris`): labels secondaires, légendes, métadonnées. Assombri depuis la valeur d'origine (`#8A9BB8`, 2.39:1) pour atteindre 4.58:1 sur lin — reste réservé aux métadonnées, jamais au texte porteur du message principal.
- **Bleu Visio** (`#1E3A8A`, alias `visio-navy`): couleur distincte réservée au bouton "RDV visio" de la nav, pour le différencier visuellement du CTA cobalt standard.
- **Rouge Erreur** (`#EAB7B7`, alias `error-red`): champs requis et messages d'erreur du formulaire de contact — cette teinte claire est calibrée pour le fond cobalt du formulaire (4.57:1) ; la version foncée d'origine (`#a83232`) y était quasi invisible (1.21:1).

### Named Rules
**La Règle de l'Encre Unique.** Le texte courant, les titres et `cobalt-2` partagent la même valeur hex (`#1C2B4A`). Ne jamais introduire une seconde nuance de "texte foncé" — toute variation de contraste se fait par opacité, pas par une nouvelle couleur.

**La Règle du Lin Jamais Blanc.** Les fonds de section utilisent `lin` ou `lin-2`, jamais blanc pur (`#FFFFFF`) sauf pour les cartes tarifs qui doivent se détacher intentionnellement.

**La Règle de l'Ambre Réservé aux Surfaces.** `amber` (plein) habille fonds, bordures et ombres ; toute occurrence en couleur de texte utilise `amber-text`, jamais `amber` directement — le ratio de contraste de l'ambre plein sur lin/lin-2 est structurellement insuffisant pour du texte.

## Typography

**Display Font:** EB Garamond (avec fallback Georgia, serif)
**Body Font:** DM Sans (avec fallback system-ui, sans-serif)

**Chargement.** Les deux familles sont auto-hébergées en woff2, sous-ensemble latin, `font-display: swap` : `/fonts/eb-garamond-latin-400-normal.woff2`, `/fonts/eb-garamond-latin-400-italic.woff2`, `/fonts/dm-sans-latin-400-normal.woff2` (63 Ko au total). Aucun appel à Google Fonts : les pages qui reçoivent du trafic payé ne doivent porter aucune requête tierce dans le chemin critique. La face utilisée dans le hero est préchargée (`rel="preload"`).

**Pourquoi EB Garamond et non Cormorant Garamond.** Même famille garamond, mais une hauteur d'x nettement plus grande et des fûts plus épais : Cormorant se délave sous 24px à l'écran, EB Garamond tient jusqu'au corps de texte. L'italique est structurel dans cette charte (deuxième ligne des titres, mot émotionnel, chevrons, chiffres) : c'est la face qui doit rester lisible en premier.

**État de la migration (10 septembre 2026).** Migration faite, charte et code alignés. Deux mécaniques de chargement coexistent, par nécessité :

- **Site React** : `@fontsource/eb-garamond` en `latin-400`, `latin-500` et leurs italiques, importés dans `src/index.css`. Les woff2 sont hachés par Vite, et `vite-plugin-seo-headers.js` retrouve leur nom dans le bundle pour injecter le `<link rel="preload">` du hero (le nom « ZENatti » est l'élément LCP). Toute modification des variantes importées doit être répercutée dans la liste `CRITICAL_FONTS` du plugin, sinon le préchargement retombe silencieusement à vide.
- **Landing statique `anxiete-hypnose-paris.html`** : hors du build Vite, donc `@font-face` écrits à la main sur `/fonts/*.woff2` (sous-ensemble latin, 400 romain et italique seulement).

Le calibrage du hero d'accueil a été vérifié plutôt que modifié : `clamp(72px, 10vw, 156px)` tient à 390px (202px de nom pour 229px disponibles) comme à 2080px (470px pour 470px, ajusté au pixel). EB Garamond ayant une hauteur d'x plus grande, le nom remplit désormais le panneau bord à bord là où Cormorant laissait de l'air. C'est un parti pris d'affiche, pas un débordement ; le réduire tient en une valeur si l'on veut respirer davantage.

**Graisses réellement disponibles.** Le site React charge 400 et 500 (romain et italique) : le 500 sert au nom du hero. La landing statique n'embarque que le 400. Le corps de texte DM Sans reste en graisse 300 sur le site React et 400 sur la landing — divergence connue, non traitée.

**Ne jamais déclarer `font-weight: 300` sur du serif.** La charte d'origine appelait une graisse 300 en display ; EB Garamond n'en a pas, et aucune des deux mécaniques de chargement ne l'embarque. Le navigateur synthétiserait un faux maigre. Les déclarations `300` restantes dans `preview-charte.css` retombent déjà sur le 400 réellement chargé.

**Character:** Un serif éditorial élégant et aéré en display (graisse 300, souvent italique pour l'emphase émotionnelle) posé sur un sans-serif neutre et léger en corps — le contraste entre les deux évoque une revue indépendante plutôt qu'un site de service.

### Hierarchy
- **Hero** (400, `clamp(72px, 10vw, 156px)`, line-height 0.92): nom du praticien en page d'accueil uniquement.
- **Display** (300, `clamp(40px, 5.5vw, 72px)`, line-height 1.04): titres de section (`section-title`), avec emphase `<em>` en cobalt italique.
- **Lead** (300 italique, `clamp(22px, 2vw, 30px)`, line-height 1.45): accroche sous le hero, citations, contact lead.
- **Title** (400, 30px, line-height 1.2): titres de carte (domaine, tarif, approche).
- **Body** (300, 16px, line-height 1.75): texte courant. Les paragraphes de contenu élargissent souvent à 17px avec line-height 1.85 pour les blocs longs.
- **Label** (500, 11px, letter-spacing 0.22em, majuscules): tags de section, labels de formulaire, métadonnées — toujours en DM Sans, jamais en serif.

### Named Rules
**La Règle de l'Italique Émotionnel.** L'italique en EB Garamond cobalt/ambre marque systématiquement le mot ou groupe de mots porteur de l'émotion clé d'un titre ou d'une citation — jamais un usage décoratif gratuit.

## Layout

Conteneur centré à `max-width: 1240px`, padding horizontal `48px` (`24px` sous 760px). Les sections respirent largement : `padding: 130px 0` en desktop, réduit à `88px 0` sous 760px. Les grilles à deux colonnes (à propos, cabinet, contact) passent en une colonne sous 900px ; la grille hero passe en une colonne sous 980px. Les grilles de cartes (`cards`, `tarifs-grid`) sont à 3 colonnes desktop → 1 colonne mobile.

### Named Rules

**La Règle du Rythme de Blocs.** Sur une page de conversion, une section peut devenir un bloc plein très arrondi (`40px`) posé sur le fond lin, séparé du suivant par une gouttière de `14px`, en alternant `lin-2`, `paper` et `cobalt`. C'est la seule circonstance où le cobalt plein sert de fond de section : il reste une **surface de bloc** posée sur le lin, jamais le fond de page, qui demeure `lin`. La règle du Lin Jamais Blanc n'est pas levée pour autant — aucune section ne prend un fond blanc pleine largeur.

## Elevation & Depth

Système hybride : les panneaux de verre (nav, hero panel, card témoignage) utilisent un flou doux (`backdrop-filter: blur(14–24px)`) avec des ombres ambiantes classiques et floues — mais **tout élément interactif ou cliquable** (boutons, cartes de domaine, cartes tarif, CTA flottant) porte une ombre dure, décalée en diagonale, **sans flou**, qui s'accentue au survol (`4px 4px 0` → `6px 6px 0`, translation du bloc de `-2px, -2px`).

### Shadow Vocabulary
- **Riso Cobalt** (`box-shadow: 4px 4px 0 rgba(43,75,160,.22)`, hover `6px 6px 0 rgba(43,75,160,.32)`): boutons primaires, cartes tarif au survol.
- **Riso Ambre** (`box-shadow: 4px 4px 0 rgba(242,161,46,.35)`, hover `6px 6px 0 rgba(242,161,46,.5)`): bouton ambre, règle sous le hero.
- **Verre Ambiant** (`box-shadow: 0 24px 60px rgba(28,43,74,.08)` à `12px 12px 30px rgba(28,43,74,.18)`): panneaux hero, cartes de citation — flou classique, jamais décalé.

### Named Rules
**La Règle du Décalage Sans Flou.** Toute ombre portée sur un élément interactif est un décalage net (`Xpx Ypx 0`), jamais un flou. Le flou est réservé aux panneaux de verre statiques (nav, hero panel). Mélanger les deux styles sur un même élément est une erreur.

## Shapes

Trois gammes de coins coexistent : le **bloc** (`40px`, `28px` sous 680px) pour une section entière traitée en surface pleine, le **pill** (`border-radius: 999px`) pour tout élément d'action (boutons, tags de durée, CTA flottant), et le **grand rayon** (`24–28px`) pour les conteneurs (cartes, panneaux hero, formulaire contact). La photo du praticien est un cercle parfait avec une ombre riso ambre en décalage. Les formes organiques d'arrière-plan (`.about__bg`, `.contact__blob`) utilisent des `border-radius` asymétriques à 4 valeurs, animées en rotation lente — seule concession à une géométrie non-rectiligne.

## Components

### Buttons
- **Shape:** pill (`border-radius: 999px`), padding `12px 22px`.
- **Primary:** fond cobalt, texte lin, ombre riso cobalt ; hover : fond cobalt-2, translation -2px/-2px, ombre agrandie.
- **Amber:** fond ambre, texte cobalt-2 (contraste fort), ombre riso ambre.
- **Ghost:** fond transparent, texte cobalt-2, bordure `rgba(28,43,74,.25)` ; hover : bordure et texte cobalt.
- **Visio (variante spécifique nav):** fond bleu marine distinct (`#1E3A8A`), même grammaire d'ombre riso.

### Cards
- **Domaine (grille "Séances"):** fond `rgba(43,75,160,.05)`, radius 24px, pas d'ombre au repos ; hover : translation verticale -4px + ombre riso cobalt. Numéro en EB Garamond italique `amber-text`, titre en EB Garamond 28px (`title`).
- **Tarif:** fond papier blanc (se détache du lin), radius 24px, bordure fine cobalt à 8% ; variante `--featured` en fond cobalt plein avec accents ambre. Hover : translation -4px + ombre riso cobalt.

### FAQ (accordéon)
- **Style:** séparateur fin `rgba(28,43,74,.1)`, question en DM Sans 17px, chevron `amber-text` qui pivote à l'ouverture. Le chevron est un SVG : il pivote, il n'est jamais remplacé par un caractère texte (`+`, `−`) — cette substitution a fait disparaître le pictogramme sur la landing anxiété. La variante spécialités (`.faq__item`/`.faq__a`) s'ouvre via `max-height` (0 → 600px) : anime une propriété de layout par nécessité — le contenu n'est pas enveloppé dans un élément dédié, donc la technique `grid-template-rows` ne collapse pas correctement sans modifier le JSX des ~20 pages qui l'utilisent. Ne pas migrer sans ajouter ce wrapper.

### Navigation
- Barre fixe en verre (`backdrop-filter: blur(14px)`, fond lin translucide), logo bicolore ZEN/atti, liens à opacité 0.72 → 1 au hover avec passage en cobalt. Double CTA desktop (RDV Paris / RDV visio) ; en mobile, menu burger plein écran + CTA flottant pill en bas d'écran.

### Contact Form
- **Style:** champs sans bordure pleine, seulement une ligne inférieure (`border-bottom`), fond transparent sur le bloc cobalt de la section contact ; focus : ligne ambre. Le champ nom est stylé en EB Garamond italique — signature distinctive à ne pas généraliser aux autres champs. Astérisque requis et messages d'erreur en `error-red` (`#EAB7B7`), calibré pour ce fond cobalt.

### Callout / Bloc mis en avant
- **Style (`.about__approche` et similaires):** fond `rgba(43,75,160,.05)`, bordure fine cobalt à 8%, radius 16px, **ombre riso ambre** (`4px 4px 0 rgba(242,161,46,.35)`) en signature — jamais de bordure latérale colorée (voir Don't).

## Do's and Don'ts

### Do:
- **Do** garder le fond lin (`#F0ECE3` / `#F7F3EA`) sur toute nouvelle section ; réserver le blanc pur aux cartes qui doivent trancher.
- **Do** appliquer une ombre décalée nette (jamais floue) à tout nouvel élément cliquable, avec accentuation au survol par translation `-2px, -2px`.
- **Do** utiliser l'italique EB Garamond cobalt/ambre pour marquer le mot émotionnellement central d'un titre.
- **Do** garder les boutons en forme pill (`999px`) et les conteneurs en grand rayon (`24–28px`).
- **Do** utiliser `amber-text` (`#975D09`) pour tout texte qui doit porter la teinte ambre ; réserver `amber` plein aux fonds/bordures/ombres.
- **Do** faire ressortir un bloc mis en avant par une ombre riso (cobalt ou ambre), jamais par une bordure latérale colorée.

### Don't:
- **Don't** utiliser de dégradé violet/bleu générique ou d'icônes plates interchangeables (anti-référence "startup SaaS").
- **Don't** mélanger ombre floue et ombre décalée sur un même composant.
- **Don't** créer une deuxième nuance de "texte foncé" distincte de `#1C2B4A` — toute variation de contraste passe par l'opacité.
- **Don't** utiliser de blanc pur comme fond de section pleine largeur.
- **Don't** utiliser `amber` (`#F2A12E`) en couleur de texte — son contraste sur lin/lin-2 est insuffisant (1.80:1) ; utiliser `amber-text`.
- **Don't** ajouter de bordure latérale colorée (`border-left`/`border-right`) sur une carte, une liste ou un callout — c'est le tell visuel générique d'une UI IA, explicitement banni.
