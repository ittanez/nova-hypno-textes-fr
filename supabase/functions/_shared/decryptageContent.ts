/**
 * Contenu du tunnel « Décryptage » (quiz 5 questions → décryptage → appel 15 min).
 *
 * Source unique, partagée par la page React (src/pages/Decryptage.tsx, via
 * src/data/decryptage.ts) et la fonction Supabase `decryptage-submit` qui
 * construit l'email. TypeScript pur : aucun import, aucune API Deno ou navigateur.
 *
 * Textes validés par Alain le 2026-11-08 (docs/tunnel-decryptage-textes.md).
 * Règles : vouvoiement, « clients », aucune promesse de résultat, pas de score.
 */

export type Q1 = 'anxiete' | 'sommeil' | 'peur' | 'confiance' | 'autre';
export type Q2 = 'leger' | 'oser' | 'energie' | 'proches';
export type Q3 = 'sans_resultat' | 'temporaire' | 'premiere_fois' | 'vivre_avec';
export type Q4 = 'pret' | 'peur_echec' | 'solution' | 'curieux';
export type Q5 = 'vite' | 'un_deux_mois' | 'renseigne' | 'sait_pas';

export interface DecryptageAnswers {
  q1: Q1;
  q2: Q2;
  q3: Q3;
  q4: Q4;
  q5: Q5;
}

export type QuestionId = keyof DecryptageAnswers;

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: QuestionId;
  title: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    title: "Aujourd'hui, qu'est-ce qui vous pèse le plus ?",
    options: [
      { value: 'anxiete', label: "L'anxiété, le stress, les pensées qui tournent en boucle" },
      { value: 'sommeil', label: 'Un sommeil qui ne me repose plus' },
      { value: 'peur', label: 'Une peur ou un blocage précis' },
      { value: 'confiance', label: 'Le manque de confiance en moi' },
      { value: 'autre', label: 'Autre chose' },
    ],
  },
  {
    id: 'q2',
    title: "Imaginez un matin où ce poids a disparu. Qu'est-ce qui change en premier pour vous ?",
    options: [
      { value: 'leger', label: "Je me réveille l'esprit léger" },
      { value: 'oser', label: "J'ose enfin faire ce que j'évite aujourd'hui" },
      { value: 'energie', label: "Je retrouve mon énergie et l'envie" },
      { value: 'proches', label: "Mes proches retrouvent la personne que j'étais" },
    ],
  },
  {
    id: 'q3',
    title: 'Avez-vous déjà essayé de vous en libérer ?',
    options: [
      { value: 'sans_resultat', label: 'Oui, sans résultat durable' },
      { value: 'temporaire', label: 'Oui, et ça a marché un temps' },
      { value: 'premiere_fois', label: "Non, c'est la première fois que j'en parle" },
      { value: 'vivre_avec', label: "Pas vraiment : j'ai surtout appris à vivre avec" },
    ],
  },
  {
    id: 'q4',
    title: 'Quelle phrase vous ressemble le plus ?',
    options: [
      { value: 'pret', label: "Je suis prêt(e) à m'impliquer pour que ça change" },
      { value: 'peur_echec', label: "J'aimerais que ça change, mais j'ai peur que ça ne marche pas" },
      { value: 'solution', label: "J'attends surtout qu'on me propose une solution" },
      { value: 'curieux', label: 'Je suis surtout curieux(se) de voir ce que c\'est' },
    ],
  },
  {
    id: 'q5',
    title: 'Quand aimeriez-vous commencer ?',
    options: [
      { value: 'vite', label: 'Dès que possible' },
      { value: 'un_deux_mois', label: 'Dans 1 à 2 mois' },
      { value: 'renseigne', label: "Je me renseigne d'abord" },
      { value: 'sait_pas', label: 'Je ne sais pas encore' },
    ],
  },
];

const AUTRE_INTRO = (texte: string) =>
  `Vous avez décrit ce qui vous pèse avec vos propres mots : « ${texte} ».`;
const AUTRE_FIN = "L'échange de 15 minutes permettra de voir si l'hypnose est adaptée à votre situation.";

/** Bloc A : Q1 × Q2. Pour « autre », le texte libre est inséré par buildDecryptage. */
const BLOC_A: Record<Exclude<Q1, 'autre'>, Record<Q2, string>> = {
  anxiete: {
    leger:
      "Ce qui vous pèse, ce sont des pensées qui tournent sans s'arrêter. Et quand vous imaginez la suite, la première chose que vous voyez, c'est un réveil avec l'esprit léger. Ce détail compte : votre objectif ne se limite pas à « moins stresser », vous voulez retrouver de la place dans votre tête. C'est un objectif concret, et on peut le travailler.",
    oser:
      "Ce qui vous pèse, c'est une anxiété qui tourne en boucle. Et quand vous imaginez la suite, vous vous voyez oser ce que vous évitez aujourd'hui. L'anxiété pousse souvent à éviter, et l'évitement nourrit l'anxiété en retour. Votre réponse montre que vous savez déjà ce que vous voulez retrouver : la liberté d'agir.",
    energie:
      "Le stress et les pensées en boucle vous prennent beaucoup. Quand vous imaginez la suite, c'est votre énergie que vous voyez revenir en premier. C'est logique : ruminer fatigue autant qu'une longue journée. Une partie de l'énergie que vous cherchez est peut-être simplement occupée ailleurs.",
    proches:
      "L'anxiété vous pèse au quotidien, et vous pensez d'abord à vos proches : vous aimeriez qu'ils retrouvent la personne que vous étiez. Cela dit beaucoup de l'attention que vous leur portez, et de la fatigue de faire bonne figure. Retrouver cette part de vous-même est un objectif clair, et il peut se travailler.",
  },
  sommeil: {
    leger:
      "Vos nuits ne vous reposent plus, et vous rêvez d'un réveil avec l'esprit léger. Souvent, c'est le mental resté allumé qui empêche le sommeil d'arriver. Apaiser ce mental, c'est souvent par là que le travail commence.",
    oser:
      "Vos nuits ne vous reposent plus. Pourtant, quand vous imaginez la suite, vous ne parlez pas d'abord de sommeil : vous parlez d'oser enfin faire ce que vous évitez. Souvent, le manque de sommeil et l'évitement s'entretiennent l'un l'autre. La fatigue rend chaque pas plus coûteux. Le sommeil est peut-être une porte d'entrée, et votre vrai objectif se trouve juste derrière.",
    energie:
      "Le sommeil ne vous repose plus, et ce que vous voulez retrouver en premier, c'est votre énergie. Le lien est direct, et vous le vivez chaque matin. Le travail porte en général sur ce qui se passe avant de dormir : la façon dont la journée se dépose, ou ne se dépose pas.",
    proches:
      "Vos nuits sont difficiles, et vous pensez à vos proches, qui retrouveraient la personne que vous étiez. La fatigue change l'humeur, la patience, la présence aux autres. Vous l'avez remarqué, et c'est souvent ce qui décide à agir.",
  },
  peur: {
    leger:
      "Une peur ou un blocage précis vous pèse, et vous imaginez un réveil avec l'esprit léger. Une peur ciblée occupe souvent bien plus de place qu'on ne le croit : on y pense avant, pendant et après. Le fait qu'elle soit précise est une bonne chose : on sait sur quoi travailler.",
    oser:
      "Une peur ou un blocage vous retient, et votre premier souhait est d'oser enfin faire ce que vous évitez. Votre réponse est très claire, et c'est utile : on sait précisément ce que vous voulez pouvoir faire. C'est souvent ce point d'arrivée concret qui guide les séances.",
    energie:
      "Une peur ou un blocage vous pèse, et vous imaginez retrouver votre énergie. Éviter quelque chose demande une vigilance permanente, et cette vigilance fatigue. En vous libérant de ce qui vous retient, c'est aussi cette énergie que vous cherchez à récupérer.",
    proches:
      "Une peur ou un blocage vous pèse, et vous pensez à vos proches. Une peur ne gêne pas que soi : elle organise parfois les sorties, les vacances, le quotidien de toute une famille. Votre réponse montre que vous voulez retrouver plus de liberté, pour vous et pour eux.",
  },
  confiance: {
    leger:
      "Le manque de confiance en vous vous pèse, et vous imaginez un réveil avec l'esprit léger. Le doute de soi fonctionne souvent comme une petite voix qui commente tout. Ce que vous décrivez, c'est le silence de cette voix, et la place qu'il laisserait.",
    oser:
      "Le manque de confiance vous pèse, et vous voulez avant tout oser. Votre réponse est précise : vous savez déjà ce que vous voulez faire, et c'est le passage à l'acte qui coince. La confiance se construit souvent en marchant, un pas après l'autre.",
    energie:
      "Le manque de confiance vous pèse, et vous imaginez retrouver votre énergie et l'envie. Douter de soi en permanence épuise : chaque décision demande un effort de plus. Retrouver l'envie est souvent le premier signe que le regard sur soi commence à changer.",
    proches:
      "Le manque de confiance vous pèse, et vous pensez à vos proches, qui retrouveraient la personne que vous étiez. Vous savez donc que cette personne existe : elle a déjà été là. C'est un point d'appui précieux pour la suite.",
  },
};

const BLOC_A_AUTRE: Record<Q2, string> = {
  leger: `Et quand vous imaginez la suite, vous voyez d'abord un réveil avec l'esprit léger. C'est un objectif clair. ${AUTRE_FIN}`,
  oser: `Et quand vous imaginez la suite, vous vous voyez oser enfin ce que vous évitez aujourd'hui. Savoir ce qu'on veut pouvoir faire est un excellent point de départ. ${AUTRE_FIN}`,
  energie: `Et quand vous imaginez la suite, c'est votre énergie et l'envie que vous voyez revenir en premier. ${AUTRE_FIN}`,
  proches: `Et quand vous imaginez la suite, vous pensez d'abord à vos proches, qui retrouveraient la personne que vous étiez. C'est souvent ce qui décide à agir. ${AUTRE_FIN}`,
};

const BLOC_B: Record<Q3, string> = {
  sans_resultat:
    "Vous avez déjà essayé, sans que ça tienne dans le temps. Ce n'est pas un échec de votre part. Cela indique plutôt qu'il faut chercher ce qui entretient le problème, au-delà des symptômes.",
  temporaire:
    "Quelque chose a déjà fonctionné pour vous, au moins un temps. C'est une information précieuse : on peut partir de ce qui a aidé et comprendre ce qui a fait revenir les difficultés.",
  premiere_fois:
    "C'est la première fois que vous en parlez. Mettre des mots sur ce qui pèse, comme vous venez de le faire, est déjà un premier pas.",
  vivre_avec:
    "Vous avez surtout appris à vivre avec. Cela demande beaucoup d'énergie, souvent sans qu'on s'en rende compte. Vous n'êtes pas obligé(e) de continuer à porter ça seul(e).",
};

const BLOC_C: Record<Q4, string> = {
  pret:
    "Vous êtes prêt(e) à vous impliquer, et c'est ce qui compte le plus. En hypnose, le travail se fait à deux : je vous guide, et c'est vous qui faites le chemin.",
  peur_echec:
    "Vous avez peur que ça ne marche pas. C'est légitime, et je préfère être franc : je ne peux pas vous promettre de résultat. Je peux en revanche m'engager à être honnête avec vous (voir plus bas).",
  solution:
    "Vous attendez surtout qu'on vous propose une solution. Je le comprends, quand on est fatigué(e) de chercher. Je vous dois une précision : l'hypnose n'est pas quelque chose qu'on vous fait. C'est un travail à deux, où vous restez conscient(e) et acteur(trice). Si cette idée vous convient, parlons-en.",
  curieux:
    "Vous êtes curieux(se) de découvrir l'hypnose. C'est une bonne façon de commencer : l'échange de 15 minutes sert justement à répondre à vos questions, sans engagement.",
};

export const BLOC_D = {
  titre: 'Et maintenant ?',
  texte:
    "Je vous propose un échange de 15 minutes par téléphone, gratuit. On regarde ensemble si l'hypnose est adaptée à votre situation. Si elle ne l'est pas, je vous le dis.",
  engagement:
    "si après 2 ou 3 séances rien n'a bougé pour vous, je vous le dis franchement, et je ne vous propose pas de continuer.",
};

export const BANDEAU_PRUDENCE =
  "Ce décryptage propose des pistes de réflexion. Il ne remplace ni un avis médical ni un suivi psychologique ou psychiatrique. En cas de détresse, appelez le 3114 (numéro national de prévention du suicide).";

export const CALENDLY_URL = 'https://calendly.com/zenatti/rdvtelephonique';
export const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

/** Alternative à Calendly (peu de créneaux) : la personne envoie un SMS, Alain rappelle. */
export const SMS_NUMERO_AFFICHE = '06 49 35 80 89';
export const SMS_TEXTE =
  "Aucun créneau ne vous convient ? Envoyez-moi un SMS avec les moments où vous êtes joignable, je vous rappelle.";

/** Lien `sms:` prérempli. La forme `?&body=` fonctionne sur iPhone et Android. */
export function buildSmsHref(prenom: string): string {
  const nom = prenom.trim();
  const body = `Bonjour Alain, ${nom ? `c'est ${nom}. ` : ''}Suite à mon décryptage, vous pouvez me rappeler : `;
  return `sms:+33649358089?&body=${encodeURIComponent(body)}`;
}

/** Version du texte de consentement, enregistrée avec chaque réponse. */
export const CONSENT_VERSION = '2026-11-08';

export interface Decryptage {
  titre: string;
  /** Q1 × Q2 ; pour « Autre chose », le texte libre y est déjà cité. */
  blocA: string;
  blocB: string;
  blocC: string;
  /** Q4 « solution » : le bloc C s'affiche dans un encadré. */
  blocCEncadre: boolean;
}

export const MAX_AUTRE = 120;
export const MAX_MESSAGE = 500;
export const MAX_PRENOM = 50;

export function buildDecryptage(
  answers: DecryptageAnswers,
  prenom: string,
  autreTexte = '',
): Decryptage {
  const nom = prenom.trim();
  const titre = nom ? `Ce qui ressort de vos réponses, ${nom}` : 'Ce qui ressort de vos réponses';

  let blocA: string;
  if (answers.q1 === 'autre') {
    const texte = autreTexte.trim().slice(0, MAX_AUTRE);
    blocA = texte
      ? `${AUTRE_INTRO(texte)} ${BLOC_A_AUTRE[answers.q2]}`
      : `Vous avez indiqué que quelque chose d'autre vous pèse. ${BLOC_A_AUTRE[answers.q2]}`;
  } else {
    blocA = BLOC_A[answers.q1][answers.q2];
  }

  return {
    titre,
    blocA,
    blocB: BLOC_B[answers.q3],
    blocC: BLOC_C[answers.q4],
    blocCEncadre: answers.q4 === 'solution',
  };
}

export type Repere = 'pret' | 'hesitant' | 'attente_passive';

/** Repère interne pour Alain (jamais affiché au client). */
export function computeRepere(answers: DecryptageAnswers): Repere {
  if (answers.q4 === 'solution') return 'attente_passive';
  if (answers.q4 === 'pret' && (answers.q5 === 'vite' || answers.q5 === 'un_deux_mois')) return 'pret';
  return 'hesitant';
}

export const REPERE_LABEL: Record<Repere, string> = {
  pret: 'Prêt(e)',
  hesitant: 'Hésitant(e)',
  attente_passive: 'Attente passive',
};

/** Signaux faibles à mettre en avant dans l'email d'Alain. */
export function computeSignaux(answers: DecryptageAnswers, message: string): string[] {
  const s: string[] = [];
  if (answers.q3 === 'vivre_avec') s.push('Q3 : « j\'ai surtout appris à vivre avec »');
  if (answers.q4 === 'solution') s.push('Q4 : « j\'attends surtout qu\'on me propose une solution »');
  if (answers.q1 === 'autre') s.push('Q1 : « Autre chose » (texte libre)');
  if (message.trim()) s.push('Message libre laissé');
  return s;
}

export function labelFor(id: QuestionId, value: string): string {
  return QUESTIONS.find((q) => q.id === id)?.options.find((o) => o.value === value)?.label ?? value;
}

export function isValidAnswers(a: unknown): a is DecryptageAnswers {
  if (!a || typeof a !== 'object') return false;
  const obj = a as Record<string, unknown>;
  return QUESTIONS.every((q) => q.options.some((o) => o.value === obj[q.id]));
}
