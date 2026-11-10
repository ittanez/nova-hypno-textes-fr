import React from 'react';

/* ─────────────────────────────────────────────
   Contenu des 7 pages de téléchargement des guides.
   Le gabarit est dans src/components/guide/GuideLanding.tsx.

   Règles de rédaction (comme pour les PDF, voir guides-pdf/README.md) :
   - le sommaire reprend le plan réel du PDF (mêmes titres) ;
   - le nombre de pages est celui du PDF publié ;
   - aucune promesse de résultat, aucun chiffre sans source.
   ───────────────────────────────────────────── */

export type GuideSubmit = (
  prenom: string,
  email: string,
  location: string
) => Promise<{ success: boolean; error?: string }>;

export interface GuideLandingConfig {
  /** Chemin de la page, sans slash : « guide-carriere ». La page merci est « /<slug>/merci ». */
  slug: string;
  /** Mot en filigrane dans le hero. */
  zenMark: string;
  metaTitle: string;
  metaDescription: string;
  schemaName: string;
  schemaDescription: string;
  /** Nombre de pages du PDF (affiché et injecté dans les données structurées). */
  pages: number;
  /** Une phrase pour la page qui regroupe tous les guides (/guides-gratuits). */
  blurb: string;
  tag: string;
  titleTop: string;
  titleEm: string;
  hook: React.ReactNode;
  cover: { src: string; alt: string };
  /** Demander « Paris Île-de-France / Autre, étranger » dans le formulaire. */
  askLocation: boolean;
  video: { id: string; title: string; text: string };
  recognition: { heading: React.ReactNode; items: { title?: string; text: string }[] };
  contents: { heading: React.ReactNode; items: { title: string; desc?: string }[] };
  /** Section facultative : à ne remplir qu'avec des témoignages réels et autorisés. */
  testimonials?: { text: string; author: string; role: string }[];
  /** Ligne supplémentaire dans le bloc auteur. */
  authorExtra?: React.ReactNode;
}

const em = (t: string) => <em style={{ color: 'var(--cobalt)' }}>{t}</em>;

export const GUIDE_LANDINGS: Record<string, GuideLandingConfig> = {
  sommeil: {
    slug: 'guide-sommeil',
    zenMark: 'nuit',
    metaTitle: 'Guide gratuit — Le Sommeil, Votre Allié Secret | NovaHypnose',
    metaDescription:
      "Guide gratuit de 14 pages d'Alain Zenatti : comprendre le sommeil, ce que la recherche dit de l'hypnose, et un programme pratique avec rituel du coucher. En complément d'un suivi médical si besoin.",
    schemaName: 'Le Sommeil, Votre Allié Secret',
    schemaDescription:
      "Guide de 14 pages sur le sommeil et l'hypnose : comprendre le sommeil, les troubles courants, ce que dit la recherche et un programme pratique, en complément d'un suivi médical.",
    pages: 14,
    blurb: "Comprendre votre sommeil, ce que dit la recherche sur l'hypnose, et un programme pratique avec rituel du coucher.",
    tag: 'Guide gratuit · 14 pages',
    titleTop: 'Le Sommeil,',
    titleEm: 'Votre Allié Secret',
    hook: (
      <>
        En 2008, 19 % des personnes de 16 ans et plus en France métropolitaine déclaraient une insomnie chronique avec retentissement en journée (
        <a
          href="https://www.santepubliquefrance.fr/sommeil/article/insomnie-fatigue-et-somnolence-prevalence-et-etat-de-sante-associe-declares-par-les-plus-de-16-ans"
          target="_blank"
          rel="noopener noreferrer"
        >
          Santé publique France, BEH 2012
        </a>
        ). Ce guide est fait pour vous, {em("en complément d'un suivi médical.")}
      </>
    ),
    cover: { src: '/images/couverture-guide-sommeil.webp', alt: 'Guide Le Sommeil, Votre Allié Secret — 14 pages' },
    askLocation: true,
    video: {
      id: 'w82Vi6WL_Pc',
      title: "Plus vous cherchez le sommeil, plus il s'éloigne",
      text: "Trois règles simples pour cesser de lutter contre l'insomnie. Un avant-goût en 30 secondes de ce que contient le guide.",
    },
    recognition: {
      heading: (
        <>
          Ce que vit un sommeil
          <br />
          <em>qui résiste.</em>
        </>
      ),
      items: [
        { title: "Difficulté à s'endormir", text: 'Malgré la fatigue, le sommeil ne vient pas.' },
        { title: 'Réveils nocturnes', text: 'Des réveils dans la nuit, avec l\'impossibilité de se rendormir.' },
        { title: 'Fatigue au réveil', text: 'Une fatigue présente au réveil, malgré une nuit correcte.' },
        { title: 'Anticipation anxieuse', text: '« Vais-je encore mal dormir ce soir ? » : l\'inquiétude qui commence dès le coucher.' },
      ],
    },
    contents: {
      heading: (
        <>
          14 pages pour comprendre
          <br />
          <em>votre sommeil.</em>
        </>
      ),
      items: [
        { title: 'Pourquoi dormons-nous ?', desc: "Les deux mécanismes qui régulent le sommeil : la pression de sommeil et l'horloge biologique." },
        { title: "L'architecture du sommeil", desc: 'Sommeil lent profond et sommeil paradoxal : le rôle de chaque stade.' },
        { title: 'Les troubles du sommeil : comprendre pour mieux agir', desc: "L'insomnie et les principaux saboteurs du sommeil." },
        { title: "Ce que la recherche dit de l'hypnose et du sommeil", desc: "L'étude de Bâle (2014) et celle de Besedovsky et coll. (2022), avec leurs limites." },
        { title: 'Votre programme pratique', desc: 'Les fondations, le rituel du coucher en 5 étapes et la gestion de la rumination nocturne.' },
        { title: "Quand consulter, et ce qu'une séance peut apporter", desc: "Les signes qui justifient un avis médical, et ce qu'une séance d'hypnothérapie peut apporter." },
      ],
    },
  },

  procrastination: {
    slug: 'guide-procrastination',
    zenMark: 'agir',
    metaTitle: "Guide gratuit : Et si vous n'étiez pas paresseux ? | NovaHypnose",
    metaDescription:
      "Guide gratuit de 14 pages d'Alain Zenatti pour comprendre la procrastination : ce qui se passe dans le cerveau, les 7 visages de la procrastination et 2 protocoles d'auto-hypnose.",
    schemaName: "Et si vous n'étiez pas paresseux ?",
    schemaDescription:
      "Guide pratique de 14 pages pour comprendre la procrastination, avec des stratégies concrètes et 2 protocoles d'auto-hypnose, par Alain Zenatti.",
    pages: 14,
    blurb: "Les 7 visages de la procrastination, des stratégies concrètes et 2 protocoles d'auto-hypnose.",
    tag: 'Guide gratuit · 14 pages · 2 protocoles',
    titleTop: "Et si vous n'étiez pas",
    titleEm: 'paresseux ?',
    hook: <>Comprendre ce qui se passe quand vous repoussez, {em('et des pistes pour passer à l\'action.')}</>,
    cover: { src: '/images/couverture-guide-procrastination.webp', alt: "Guide Et si vous n'étiez pas paresseux ? — 14 pages, 2 protocoles" },
    askLocation: true,
    video: {
      id: 'fnbMAh2v098',
      title: 'Cette tâche qui pèse comme un rocher : découpez-la',
      text: "Une méthode simple pour passer à l'action sans vous forcer, en 30 secondes.",
    },
    recognition: {
      heading: (
        <>
          Les 7 visages de la procrastination :
          <br />
          <em>lequel est le vôtre ?</em>
        </>
      ),
      items: [
        { title: "La peur de l'échec", text: "Ne pas commencer protège de l'échec, mais l'échec devient certain." },
        { title: 'Le perfectionnisme paralysant', text: 'Attendre le moment idéal, les conditions parfaites.' },
        { title: 'La surcharge cognitive', text: "Une montagne de tâches qui semble insurmontable : le cerveau choisit l'inaction comme protection." },
        { title: 'La procrastination numérique', text: 'Défilement infini, notifications, séries en lecture automatique : de petites doses de dopamine immédiates.' },
      ],
    },
    contents: {
      heading: (
        <>
          14 pages, 2 protocoles <em>à essayer.</em>
        </>
      ),
      items: [
        { title: "Qu'est-ce que la procrastination ?", desc: 'Définitions et idées reçues.' },
        { title: 'Ce qui se passe vraiment dans votre cerveau' },
        { title: 'Les 7 visages de la procrastination' },
        { title: 'Les conséquences cachées' },
        { title: "Stratégies concrètes pour passer à l'action" },
        { title: "Protocole n° 1 : l'ancrage de l'action", desc: "Un protocole d'auto-hypnose." },
        { title: 'Protocole n° 2 : la ligne du temps', desc: "Un protocole d'auto-hypnose." },
        { title: "Et si la solution venait de votre inconscient ?" },
        { title: "L'hypnothérapie au service de votre liberté d'action" },
        { title: 'Un premier pas avec Alain Zenatti' },
      ],
    },
    testimonials: [
      { text: "J'ai arrêté de remettre mes projets au lendemain. La technique du découpage radical a changé mon approche du travail.", author: 'Thomas D.', role: 'Chef de projet IT' },
      { text: "Enfin quelqu'un qui parle de la peur réelle derrière la procrastination. Les protocoles hypnotiques m'ont débloqué.", author: 'Sophie M.', role: 'Directrice RH' },
      { text: 'Gratuit, complet, et vraiment efficace. En 2 semaines, je m\'attaque aux tâches difficiles sans traîner.', author: 'Marc L.', role: 'Consultant en Management' },
    ],
  },

  tabac: {
    slug: 'guide-arret-tabac',
    zenMark: 'libre',
    metaTitle: 'Guide gratuit : Arrêter de Fumer, Autrement | NovaHypnose',
    metaDescription:
      "Guide gratuit de 12 pages d'Alain Zenatti : comprendre la dépendance au tabac, ce que dit la recherche sur l'hypnose et l'arrêt du tabac, et un programme pour préparer votre arrêt.",
    schemaName: 'Arrêter de Fumer, Autrement',
    schemaDescription:
      "Guide pratique de 12 pages sur la dépendance au tabac et l'hypnose : comprendre la dépendance, ce que dit la recherche et des pistes pour préparer l'arrêt, par Alain Zenatti.",
    pages: 12,
    blurb: "Comprendre la dépendance au tabac, ce que dit la recherche sur l'hypnose, et préparer votre arrêt.",
    tag: 'Guide gratuit · 12 pages',
    titleTop: 'Arrêter de Fumer,',
    titleEm: 'Autrement',
    hook: <>Comprendre la dépendance au tabac, et des pistes pour aborder l'arrêt {em('autrement que par la seule volonté.')}</>,
    cover: { src: '/images/couverture-guide-tabac.webp', alt: 'Guide Arrêter de Fumer, Autrement — 12 pages' },
    askLocation: true,
    video: {
      id: 'VhcabYV8scc',
      title: 'Changez de ligne, pas de volonté',
      text: "Pourquoi la volonté seule ne suffit pas pour arrêter de fumer, et ce que l'hypnose change. En 30 secondes.",
    },
    recognition: {
      heading: (
        <>
          Ce qui rend l'arrêt
          <br />
          <em>si difficile.</em>
        </>
      ),
      items: [
        { title: 'Une dépendance physique', text: 'Le circuit de la nicotine : un mécanisme réel, à ne pas minimiser.' },
        { title: 'Une dépendance psychologique', text: 'Souvent plus tenace : le café du matin, la pause après le déjeuner, la fin d\'une journée difficile.' },
        { title: 'Des tentatives qui n\'ont pas tenu', text: 'Les tentatives ratées ne sont pas un manque de caractère : le guide explique pourquoi.' },
        { title: 'La seule volonté', text: 'Pourquoi « se retenir » ne suffit pas, et pourquoi c\'est normal.' },
      ],
    },
    contents: {
      heading: (
        <>
          12 pages pour comprendre
          <br />
          <em>et préparer votre arrêt.</em>
        </>
      ),
      items: [
        { title: 'Pourquoi fumez-vous vraiment ? La science de la dépendance', desc: 'La dépendance physique et la dépendance psychologique.' },
        { title: 'Les 3 profils du fumeur' },
        { title: 'Pourquoi la volonté seule ne suffit pas, et pourquoi c\'est normal', desc: "Le mythe de la volonté, l'effet des tentatives ratées, des pistes utiles." },
        { title: "Ce que la recherche dit de l'hypnose et de l'arrêt du tabac", desc: "L'état hypnotique, ce que dit la recherche (avec ses limites) et comment l'hypnose ericksonienne travaille." },
        { title: 'Votre programme pratique : préparer votre arrêt', desc: "Cinq étapes, dont la cigarette en pleine conscience, et la grille simplifiée du score de Fagerström." },
        { title: "Quand consulter ? Ce que l'hypnothérapie peut faire pour vous", desc: "Ce qu'une séance peut apporter, et à quoi s'attendre." },
      ],
    },
  },

  colere: {
    slug: 'guide-colere',
    zenMark: 'apaisée',
    metaTitle: 'Guide gratuit — La Colère, Enfin Apprivoisée | NovaHypnose',
    metaDescription:
      "Guide gratuit de 12 pages d'Alain Zenatti pour comprendre la colère et l'irritabilité : ce qui se passe dans le cerveau, ce que dit la recherche sur l'hypnose et un programme pratique.",
    schemaName: 'La Colère, Enfin Apprivoisée',
    schemaDescription:
      "Guide pratique de 12 pages pour comprendre la colère et l'irritabilité : le cerveau, les profils de la colère, ce que dit la recherche sur l'hypnose et des outils concrets, par Alain Zenatti.",
    pages: 12,
    blurb: "Ce qui se passe dans le cerveau quand la colère monte, et un programme pour la désamorcer au quotidien.",
    tag: 'Guide gratuit · 12 pages',
    titleTop: 'La Colère,',
    titleEm: 'Enfin Apprivoisée',
    hook: <>Elle explose avant que vous ne puissiez réagir. {em('Comprendre ce qui se joue, sans la supprimer.')}</>,
    cover: { src: '/images/couverture-guide-colere.webp', alt: 'Guide La Colère, Enfin Apprivoisée — 12 pages' },
    askLocation: true,
    video: {
      id: 'OGSa3lG-xE4',
      title: "Quelqu'un s'énerve devant vous : une tempête, et un phare",
      text: 'Deux tempêtes, c\'est trop : votre respiration peut devenir le phare. Un repère simple pour garder votre calme.',
    },
    recognition: {
      heading: (
        <>
          Ce que vit une colère
          <br />
          <em>mal apprivoisée.</em>
        </>
      ),
      items: [
        { title: 'Explosions soudaines', text: 'Vous vous emportez pour des raisons qui semblent dérisoires, et regrettez immédiatement votre réaction.' },
        { title: 'Irritabilité chronique', text: "Tout vous agace, vous êtes à fleur de peau en permanence, le moindre imprévu vous exaspère." },
        { title: 'Réactions disproportionnées', text: "Votre colère est bien plus forte que la situation ne le justifie : vous le savez, mais ne pouvez pas l'arrêter." },
        { title: 'Tension relationnelle', text: "Vos proches marchent sur des œufs, vos relations souffrent de cette colère qui s'exprime sans filtre." },
      ],
    },
    contents: {
      heading: (
        <>
          12 pages pour comprendre
          <br />
          <em>votre colère.</em>
        </>
      ),
      items: [
        { title: 'Pourquoi ressentez-vous de la colère ? Ce qui se passe dans votre cerveau', desc: "Le réflexe d'alarme, le « détournement de l'amygdale » et la fonction de la colère." },
        { title: 'Les 3 profils de la colère' },
        { title: 'Pourquoi « se contrôler » ne suffit pas, et pourquoi c\'est normal', desc: 'Le mythe de la décharge, le mythe du contrôle pur, et ce qui fonctionne mieux.' },
        { title: "Ce que la science dit de l'hypnose et de la régulation émotionnelle", desc: 'Ce qui se passe dans le cerveau pendant l\'hypnose, et ce que montrent les études, avec leurs limites.' },
        { title: 'Votre programme pratique : désamorcer la colère au quotidien', desc: "Six étapes, dont la fenêtre physiologique, la respiration et l'ancrage par l'auto-hypnose." },
        { title: "Quand consulter ? Ce que l'hypnothérapie peut faire pour vous", desc: "Ce qu'une séance peut apporter, et à quoi s'attendre." },
      ],
    },
  },

  carriere: {
    slug: 'guide-carriere',
    zenMark: 'élan',
    metaTitle: 'Guide gratuit — Levez les Freins qui Bloquent Votre Carrière | NovaHypnose',
    metaDescription:
      "Guide gratuit de 12 pages d'Alain Zenatti : comprendre ce qui freine votre évolution (syndrome de l'imposteur, auto-sabotage) et des pistes concrètes pour avancer.",
    schemaName: 'Levez les Freins qui Bloquent Votre Carrière',
    schemaDescription:
      "Guide pratique de 12 pages pour comprendre ce qui freine l'évolution professionnelle : syndrome de l'imposteur, auto-sabotage, croyances, et des pistes concrètes, par Alain Zenatti.",
    pages: 12,
    blurb: "Syndrome de l'imposteur, auto-sabotage : comprendre ce qui freine votre évolution, et des pistes concrètes.",
    tag: 'Guide gratuit · 12 pages',
    titleTop: 'Levez les Freins',
    titleEm: 'qui Bloquent Votre Carrière',
    hook: <>Vos compétences sont là. Ce qui manque, c'est {em("l'autorisation intérieure d'avancer.")}</>,
    cover: { src: '/images/couverture-guide-carriere.webp', alt: 'Guide Levez les Freins qui Bloquent Votre Carrière — 12 pages' },
    askLocation: true,
    video: {
      id: '8CeL7yAQtfk',
      title: "Déléguer, c'est passer le témoin",
      text: 'Un repère concret pour alléger votre charge au travail, en 30 secondes.',
    },
    recognition: {
      heading: (
        <>
          Ce que vit une carrière
          <br />
          <em>freinée de l'intérieur.</em>
        </>
      ),
      items: [
        { title: "Syndrome de l'imposteur", text: "Vous doutez de votre légitimité malgré vos compétences, vous craignez que vos réussites soient découvertes comme un « coup de chance »." },
        { title: 'Auto-sabotage récurrent', text: 'Vous compromettez vos propres succès au moment décisif : retard, oubli, conflit provoqué inconsciemment.' },
        { title: 'Stagnation professionnelle', text: 'Vous restez au même poste depuis des années alors que vous en avez largement les capacités.' },
        { title: 'Blocage à la décision', text: 'Vous analysez indéfiniment sans jamais trancher, paralysé par la peur de faire le mauvais choix.' },
      ],
    },
    contents: {
      heading: (
        <>
          12 pages pour comprendre
          <br />
          <em>ce qui vous freine.</em>
        </>
      ),
      items: [
        { title: 'Pourquoi ces blocages ne sont pas rationnels', desc: "Le cerveau, l'homéostasie psychique, le syndrome de l'imposteur et l'auto-sabotage." },
        { title: 'Les 3 profils des freins de carrière', desc: "Les visages du syndrome de l'imposteur, et un mot sur la « peur du succès »." },
        { title: 'Pourquoi « avoir confiance » ou « positiver » ne suffit pas', desc: 'Le mythe du perfectionnisme coupable : travailler sur la croyance, pas sur le symptôme.' },
        { title: "Ce que la science dit de l'hypnose et de la confiance en soi", desc: "Ce qui se passe dans le cerveau pendant l'hypnose, et le renforcement du moi, avec les limites des études." },
        { title: 'Votre programme pratique : désamorcer les freins inconscients', desc: "Cinq étapes, dont le « dossier de preuves » et l'ancrage de confiance par l'auto-hypnose." },
        { title: "Quand consulter ? Ce que l'hypnothérapie peut faire pour vous", desc: "Ce qu'une séance peut apporter, et à quoi s'attendre." },
      ],
    },
  },

  'emotions-travail': {
    slug: 'guide-emotions-travail',
    zenMark: 'tenir',
    metaTitle: "Guide gratuit — Vous tenez. Mais jusqu'à quand ? | NovaHypnose",
    metaDescription:
      "Guide gratuit de 12 pages d'Alain Zenatti : comprendre irritabilité, épuisement et émotions au travail, avec trois pratiques simples et une approche d'hypnose ericksonienne.",
    schemaName: "Vous tenez. Mais jusqu'à quand ?",
    schemaDescription:
      "Guide pratique de 12 pages pour comprendre ses émotions au travail, avec trois pratiques simples et une approche d'hypnose ericksonienne, par Alain Zenatti.",
    pages: 12,
    blurb: "Irritabilité, épuisement, larmes inattendues : ce que vos émotions au travail essaient de vous dire, et 3 pratiques simples.",
    tag: 'Guide gratuit · 12 pages',
    titleTop: 'Vous tenez.',
    titleEm: "Mais jusqu'à quand ?",
    hook: <>Comprendre vos émotions au travail {em('avant que votre corps décide à votre place.')}</>,
    cover: { src: '/images/couverture-guide-emotions-travail.webp', alt: "Guide Vous tenez. Mais jusqu'à quand ? — 12 pages" },
    askLocation: false,
    video: {
      id: 'EoNJtkDIUlk',
      title: "L'hypnose, sans mystère",
      text: "L'hypnose n'est ni un spectacle ni de la magie : un état naturel que vous gardez toujours sous contrôle. Présentation en 30 secondes.",
    },
    recognition: {
      heading: (
        <>
          Ces pensées qui <em>tournent en boucle…</em>
        </>
      ),
      items: [
        { text: '« Je me sens épuisé même après avoir dormi. Je ne comprends plus pourquoi je fais ce travail. »' },
        { text: '« Je m\'énerve pour rien — un email, une remarque — et je passe la journée à m\'en vouloir. »' },
        { text: "« J'arrive à tenir en réunion, mais une fois seul, quelque chose lâche. Et je ne sais pas quoi. »" },
        { text: '« Mes collègues semblent gérer. Pourquoi moi, je n\'y arrive plus comme avant ? »' },
        { text: "« Je n'ose pas en parler — ni à mon manager, ni à ma famille. Je dois tenir. »" },
        { text: '« Je dors mal, je rumine, je ne déconnecte plus. Mon corps envoie des signaux que j\'ignore. »' },
      ],
    },
    contents: {
      heading: (
        <>
          12 pages pour comprendre
          <br />
          ce qui se passe <em>en vous.</em>
        </>
      ),
      items: [
        { title: "Non, vous n'êtes pas « trop sensible »", desc: "Pourquoi cette étiquette efface la vraie cause de votre épuisement." },
        { title: 'Ce que vos émotions signalent vraiment', desc: "Irritabilité, larmes inattendues, colère froide, vide intérieur, hypervigilance." },
        { title: 'Pourquoi les combattre aggrave tout', desc: "L'épuisement de « tenir » et l'effet boule de neige." },
        { title: 'Les croyances qui vous maintiennent coincé', desc: 'Quatre croyances courantes, et comment les regarder autrement.' },
        { title: 'Ce que la communication relationnelle change concrètement', desc: 'Trois principes clés et des exemples de phrases transformées.' },
        { title: "Comment l'hypnose aide là où la volonté seule ne suffit pas", desc: "Ce que l'hypnose peut chercher à faire, et l'auto-hypnose comme outil quotidien." },
        { title: 'Trois pratiques simples dès maintenant', desc: 'Respiration et scan corporel, phrase du soir, mini-visualisation guidée.' },
        { title: 'Et si vous alliez plus loin ?', desc: 'Un échange téléphonique gratuit de 15 minutes pour faire le point, sans engagement.' },
      ],
    },
    authorExtra: (
      <>
        <strong>Praticien en communication relationnelle</strong> (approche Jacques Salomé)
      </>
    ),
  },

  autohypnose: {
    slug: 'guide-autohypnose',
    zenMark: 'soi',
    metaTitle: 'Guide gratuit : Reprenez la main sur votre bien-être | NovaHypnose',
    metaDescription:
      "Guide gratuit de 19 pages d'Alain Zenatti : 8 protocoles d'autohypnose pour le stress, la confiance, le sommeil, les peurs, les émotions et la concentration.",
    schemaName: 'Reprenez la main sur votre bien-être',
    schemaDescription:
      "Guide pratique d'autohypnose en 19 pages : les fondamentaux, des techniques d'induction et 8 protocoles pour le stress, la confiance, le sommeil, les peurs, les émotions et la performance professionnelle.",
    pages: 19,
    blurb: "Les fondamentaux de l'autohypnose et 8 protocoles : stress, confiance, sommeil, peurs, émotions, concentration.",
    tag: 'Guide gratuit · 19 pages · 8 protocoles',
    titleTop: 'Reprenez la main',
    titleEm: 'sur votre bien-être',
    hook: <>Le guide d'autohypnose pour les {em('professionnels sous pression.')}</>,
    cover: { src: '/images/couverture-guide-autohypnose.webp', alt: 'Guide Reprenez la main sur votre bien-être — 19 pages, 8 protocoles' },
    askLocation: true,
    video: {
      id: 'HG47GixpkDs',
      title: 'Autohypnose au bureau : cinq minutes, cinq étapes',
      text: 'Un avant-goût en 30 secondes : une routine courte pour retrouver votre calme et votre concentration, sans matériel.',
    },
    recognition: {
      heading: (
        <>
          Quand le stress
          <br />
          <em>s'accumule.</em>
        </>
      ),
      items: [
        { title: 'Le soir, difficile de « décrocher »', text: 'Les réunions sous tension et les deadlines serrées vous suivent jusqu\'à la maison.' },
        { title: "L'anxiété avant le réveil", text: "Le matin, l'anxiété vous réveille parfois avant même que la journée commence." },
        { title: 'Un nœud au ventre', text: 'Avant une présentation importante, le stress monte et vous aimeriez savoir comment le déposer.' },
        { title: 'Pas le temps pour soi', text: 'Le sport, la méditation, le yoga demandent du temps : le guide propose des exercices de 5 à 30 minutes.' },
      ],
    },
    contents: {
      heading: (
        <>
          19 pages, 8 protocoles <em>à pratiquer chez vous.</em>
        </>
      ),
      items: [
        { title: "Pourquoi l'autohypnose ?" },
        { title: "Les fondamentaux de l'autohypnose", desc: "Qu'est-ce que l'hypnose, conscient et inconscient, les 5 phases d'une séance." },
        { title: 'Définir son intention et ses objectifs' },
        { title: 'Les fusibles de sécurité', desc: "Les 3 mécanismes de protection et ce que l'autohypnose n'est pas." },
        { title: "Les techniques d'induction", desc: 'La fixation du regard, la respiration 4-2-6 et le scan corporel.' },
        { title: "L'approfondissement de la transe" },
        { title: 'La phase de travail' },
        { title: 'Le réveil et le retour' },
        { title: 'Stress et anxiété : reprendre le contrôle', desc: "Le sas de décompression (5 min) et l'ancre anti-stress." },
        { title: 'Confiance en soi : retrouver votre force intérieure', desc: 'La forêt enchantée de la confiance (25 min) et les 3 réussites du jour.' },
        { title: 'Sommeil : retrouver un repos réparateur', desc: 'Le décompte descendant et les réveils nocturnes.' },
        { title: 'Phobies : apaiser les peurs limitantes', desc: 'La double dissociation (20 min).' },
        { title: 'Gestion des émotions : naviguer avec clarté', desc: "Le changement d'état interne (20 min)." },
        { title: 'Performance professionnelle : libérer votre potentiel', desc: 'Le rayon de focus et la préparation mentale.' },
        { title: 'Construire votre protocole personnel' },
        { title: 'Suivre votre progression, et aller plus loin' },
      ],
    },
    testimonials: [
      { text: "Enfin un guide sans blabla ! J'ai installé l'ancre anti-stress en 1 semaine, elle fonctionne en réunion difficile.", author: 'Sarah M.', role: 'Directrice Marketing' },
      { text: 'Le protocole sommeil a changé ma vie. Plus de ruminations à 2h du matin. Merci pour ce guide gratuit de qualité.', author: 'Thomas R.', role: 'Consultant IT' },
      { text: "J'étais sceptique sur l'autohypnose. La base scientifique m'a convaincu, les résultats m'ont bluffé.", author: 'Marie L.', role: 'Contrôleuse de gestion' },
    ],
  },
};

/** Ordre d'affichage sur la page /guides-gratuits. */
export const GUIDE_LANDINGS_ORDER = [
  'sommeil',
  'autohypnose',
  'procrastination',
  'emotions-travail',
  'colere',
  'carriere',
  'tabac',
] as const;
