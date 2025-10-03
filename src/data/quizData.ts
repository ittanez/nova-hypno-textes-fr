
import { Question } from '@/types/quiz';

export const quizQuestions: Question[] = [
  // Dimension 1: Gestion du stress quotidien (4 questions)
  {
    id: 1,
    text: "Face à un imprévu dans ma journée:",
    options: [
      { id: 1, text: "J'ai tendance à perdre mes moyens et à m'inquiéter excessivement", score: 25 },
      { id: 2, text: "Je ressens de l'anxiété mais je parviens généralement à m'adapter", score: 50 },
      { id: 3, text: "Je m'adapte facilement sans stress particulier", score: 75 },
      { id: 4, text: "Je vois cela comme une opportunité et reste parfaitement calme", score: 100 }
    ],
    dimension: "stress"
  },
  {
    id: 2,
    text: "Lorsque je dois gérer plusieurs tâches en même temps:",
    options: [
      { id: 1, text: "Je me sens rapidement submergé(e) et stressé(e)", score: 25 },
      { id: 2, text: "Je ressens une certaine pression mais je parviens à m'organiser", score: 50 },
      { id: 3, text: "Je reste généralement calme et organisé(e)", score: 75 },
      { id: 4, text: "J'apprécie ce genre de défi et reste parfaitement serein(e)", score: 100 }
    ],
    dimension: "stress"
  },
  {
    id: 3,
    text: "Quand je pense à ma charge de travail actuelle:",
    options: [
      { id: 1, text: "Je me sens constamment dépassé(e) et anxieux(se)", score: 25 },
      { id: 2, text: "Je ressens parfois de la pression mais je gère globalement", score: 50 },
      { id: 3, text: "Je me sens à l'aise avec ma charge de travail", score: 75 },
      { id: 4, text: "Je me sens parfaitement en contrôle et serein(e)", score: 100 }
    ],
    dimension: "stress"
  },
  {
    id: 4,
    text: "Face à un délai serré ou une échéance importante:",
    options: [
      { id: 1, text: "Je panique et mon stress affecte significativement ma performance", score: 25 },
      { id: 2, text: "Je ressens de l'anxiété mais je parviens à rester fonctionnel(le)", score: 50 },
      { id: 3, text: "Je reste concentré(e) sans stress excessif", score: 75 },
      { id: 4, text: "Je suis particulièrement efficace sous pression", score: 100 }
    ],
    dimension: "stress"
  },

  // Dimension 2: Qualité du sommeil (3 questions)
  {
    id: 5,
    text: "Mon sommeil est généralement:",
    options: [
      { id: 1, text: "Très perturbé, je me réveille souvent et/ou j'ai du mal à m'endormir", score: 25 },
      { id: 2, text: "Assez irrégulier, avec des périodes de bon et de mauvais sommeil", score: 50 },
      { id: 3, text: "Plutôt bon, avec quelques réveils occasionnels", score: 75 },
      { id: 4, text: "Excellent, je m'endors facilement et me réveille reposé(e)", score: 100 }
    ],
    dimension: "sleep"
  },
  {
    id: 6,
    text: "Lorsque je me couche le soir:",
    options: [
      { id: 1, text: "Mon esprit est souvent envahi de pensées anxieuses qui m'empêchent de dormir", score: 25 },
      { id: 2, text: "J'ai parfois des difficultés à calmer mes pensées", score: 50 },
      { id: 3, text: "Je parviens généralement à me détendre après quelques minutes", score: 75 },
      { id: 4, text: "Je m'endors rapidement dans un état de calme", score: 100 }
    ],
    dimension: "sleep"
  },
  {
    id: 7,
    text: "Au réveil, je me sens généralement:",
    options: [
      { id: 1, text: "Fatigué(e) et anxieux(se) à l'idée d'affronter la journée", score: 25 },
      { id: 2, text: "Un peu fatigué(e) mais je récupère au cours de la journée", score: 50 },
      { id: 3, text: "Assez reposé(e) et prêt(e) pour la journée", score: 75 },
      { id: 4, text: "Parfaitement reposé(e) et enthousiaste", score: 100 }
    ],
    dimension: "sleep"
  },

  // Dimension 3: Sentiment de sécurité intérieure (4 questions)
  {
    id: 8,
    text: "Face à l'incertitude et aux changements:",
    options: [
      { id: 1, text: "Je me sens très anxieux(se) et j'ai tendance à imaginer le pire", score: 25 },
      { id: 2, text: "Je ressens de l'inquiétude mais je parviens à la gérer", score: 50 },
      { id: 3, text: "Je reste généralement confiant(e) que les choses se passeront bien", score: 75 },
      { id: 4, text: "J'accueille les changements avec curiosité et confiance", score: 100 }
    ],
    dimension: "security"
  },
  {
    id: 9,
    text: "Concernant mon avenir personnel et professionnel:",
    options: [
      { id: 1, text: "J'éprouve beaucoup d'anxiété et d'inquiétude", score: 25 },
      { id: 2, text: "J'ai quelques inquiétudes mais aussi de l'espoir", score: 50 },
      { id: 3, text: "Je me sens globalement confiant(e) et optimiste", score: 75 },
      { id: 4, text: "J'ai une confiance totale en ma capacité à créer un avenir positif", score: 100 }
    ],
    dimension: "security"
  },
  {
    id: 10,
    text: "Lorsque je suis confronté(e) à une situation nouvelle:",
    options: [
      { id: 1, text: "Je me sens très vulnérable et anxieux(se)", score: 25 },
      { id: 2, text: "Je ressens une certaine appréhension mais je fais face", score: 50 },
      { id: 3, text: "J'aborde la situation avec une confiance modérée", score: 75 },
      { id: 4, text: "J'accueille les nouvelles situations avec assurance et enthousiasme", score: 100 }
    ],
    dimension: "security"
  },
  {
    id: 11,
    text: "Ma sensation générale de sécurité intérieure:",
    options: [
      { id: 1, text: "Je me sens souvent en insécurité, même dans des situations familières", score: 25 },
      { id: 2, text: "Je me sens en sécurité dans les situations habituelles mais pas face à l'inconnu", score: 50 },
      { id: 3, text: "Je me sens généralement en sécurité dans la plupart des situations", score: 75 },
      { id: 4, text: "J'ai un profond sentiment de sécurité intérieure quelles que soient les circonstances", score: 100 }
    ],
    dimension: "security"
  },

  // Dimension 4: Relation avec soi-même (3 questions)
  {
    id: 12,
    text: "Mon dialogue intérieur est généralement:",
    options: [
      { id: 1, text: "Très critique et négatif", score: 25 },
      { id: 2, text: "Parfois critique, parfois bienveillant", score: 50 },
      { id: 3, text: "Plutôt positif et encourageant", score: 75 },
      { id: 4, text: "Très bienveillant et constructif", score: 100 }
    ],
    dimension: "self"
  },
  {
    id: 13,
    text: "Lorsque je fais une erreur:",
    options: [
      { id: 1, text: "Je me critique sévèrement et j'ai du mal à me pardonner", score: 25 },
      { id: 2, text: "Je me sens mal mais je finis par accepter", score: 50 },
      { id: 3, text: "J'accepte relativement facilement en voyant les leçons à en tirer", score: 75 },
      { id: 4, text: "Je vois les erreurs comme des opportunités d'apprentissage essentielles", score: 100 }
    ],
    dimension: "self"
  },
  {
    id: 14,
    text: "Le temps que je consacre à mon bien-être personnel:",
    options: [
      { id: 1, text: "Très insuffisant, je néglige souvent mes besoins", score: 25 },
      { id: 2, text: "Insuffisant, mais j'y travaille", score: 50 },
      { id: 3, text: "Satisfaisant, je prends régulièrement soin de moi", score: 75 },
      { id: 4, text: "Excellent, je fais de mon bien-être une priorité", score: 100 }
    ],
    dimension: "self"
  },

  // Dimension 5: Impact du stress sur les relations (4 questions)
  {
    id: 15,
    text: "Lorsque je suis stressé(e):",
    options: [
      { id: 1, text: "Je deviens irritable et mes relations en souffrent significativement", score: 25 },
      { id: 2, text: "Je remarque une certaine tension dans mes interactions", score: 50 },
      { id: 3, text: "Je parviens généralement à ne pas laisser mon stress affecter mes relations", score: 75 },
      { id: 4, text: "Je communique ouvertement sur mon stress et mes relations s'en trouvent renforcées", score: 100 }
    ],
    dimension: "relationships"
  },
  {
    id: 16,
    text: "Dans mes relations personnelles et professionnelles:",
    options: [
      { id: 1, text: "Le stress crée souvent des tensions et des conflits", score: 25 },
      { id: 2, text: "Le stress affecte parfois la qualité de mes échanges", score: 50 },
      { id: 3, text: "Je maintiens généralement de bonnes relations malgré le stress", score: 75 },
      { id: 4, text: "Mes relations sont solides et résilientes face au stress", score: 100 }
    ],
    dimension: "relationships"
  },
  {
    id: 17,
    text: "Ma capacité à écouter les autres lorsque je suis préoccupé(e):",
    options: [
      { id: 1, text: "Très limitée, je suis souvent dans mes pensées", score: 25 },
      { id: 2, text: "Variable selon mon niveau de stress", score: 50 },
      { id: 3, text: "Généralement bonne, je reste présent(e) pour les autres", score: 75 },
      { id: 4, text: "Excellente, je sais mettre mes préoccupations de côté pour être disponible", score: 100 }
    ],
    dimension: "relationships"
  },
  {
    id: 18,
    text: "Mon ouverture à communiquer sur mes émotions et mon stress:",
    options: [
      { id: 1, text: "Je garde tout pour moi, même quand cela me pèse", score: 25 },
      { id: 2, text: "J'en parle parfois, mais avec difficulté", score: 50 },
      { id: 3, text: "Je partage assez facilement ce que je ressens avec mes proches", score: 75 },
      { id: 4, text: "Je communique ouvertement et constructivement sur mes émotions", score: 100 }
    ],
    dimension: "relationships"
  }
];

export const getDimensionRecommendation = (dimensionName: string, score: number): string => {
  if (dimensionName === "stress") {
    if (score < 40) {
      return "Votre gestion du stress quotidien semble être un défi important. L'auto-hypnose peut vous aider à développer des mécanismes de réponse plus calmes face aux imprévus et aux pressions du quotidien.";
    } else if (score < 60) {
      return "Vous parvenez à gérer votre stress dans certaines situations, mais d'autres restent difficiles. Des techniques d'auto-hypnose ciblées pourraient renforcer votre résilience face aux défis quotidiens.";
    } else if (score < 80) {
      return "Vous avez développé de bonnes capacités de gestion du stress. L'auto-hypnose peut vous aider à renforcer cette compétence pour faire face sereinement à des situations plus complexes.";
    } else {
      return "Votre gestion du stress est déjà très bonne. L'auto-hypnose peut vous permettre d'atteindre un niveau de sérénité encore plus profond et stable face aux défis du quotidien.";
    }
  } else if (dimensionName === "sleep") {
    if (score < 40) {
      return "Votre sommeil semble significativement perturbé. L'auto-hypnose offre des techniques efficaces pour calmer l'esprit avant le coucher et améliorer la qualité globale de votre repos.";
    } else if (score < 60) {
      return "Votre sommeil est irrégulier. Des séances régulières d'auto-hypnose pourraient vous aider à établir un rituel d'endormissement plus efficace et à approfondir la qualité de votre sommeil.";
    } else if (score < 80) {
      return "Vous dormez relativement bien. L'auto-hypnose peut optimiser davantage la qualité de votre sommeil et vous aider à vous réveiller plus énergique chaque matin.";
    } else {
      return "Votre sommeil est de bonne qualité. L'auto-hypnose peut vous aider à maintenir cette qualité même en périodes de stress intense et à accéder à un repos encore plus profond et réparateur.";
    }
  } else if (dimensionName === "security") {
    if (score < 40) {
      return "Votre sentiment de sécurité intérieure semble fragile face aux incertitudes. L'auto-hypnose peut vous aider à développer un ancrage émotionnel solide et durable, indépendant des circonstances extérieures.";
    } else if (score < 60) {
      return "Vous vous sentez en sécurité dans certains contextes, mais l'incertitude reste source d'anxiété. L'auto-hypnose peut renforcer votre sentiment de sécurité intérieure face aux changements.";
    } else if (score < 80) {
      return "Vous possédez un bon sentiment de sécurité intérieure. L'auto-hypnose peut l'approfondir et le rendre plus stable face aux défis majeurs de la vie.";
    } else {
      return "Votre sentiment de sécurité intérieure est solide. L'auto-hypnose peut vous aider à le cultiver davantage pour devenir une source d'inspiration et de stabilité pour votre entourage.";
    }
  } else if (dimensionName === "self") {
    if (score < 40) {
      return "Votre dialogue intérieur semble souvent critique. L'auto-hypnose peut transformer profondément votre relation à vous-même en cultivant l'auto-compassion et la bienveillance intérieure.";
    } else if (score < 60) {
      return "Votre relation à vous-même est parfois tendue. L'auto-hypnose offre des outils puissants pour développer un dialogue intérieur plus positif et nourrir l'estime de soi.";
    } else if (score < 80) {
      return "Vous entretenez une relation globalement positive avec vous-même. L'auto-hypnose peut approfondir cette relation et renforcer votre confiance intérieure.";
    } else {
      return "Votre relation à vous-même est saine et constructive. L'auto-hypnose peut vous aider à maintenir cette qualité même dans les moments difficiles et à cultiver une sagesse intérieure encore plus profonde.";
    }
  } else if (dimensionName === "relationships") {
    if (score < 40) {
      return "Le stress semble impacter significativement vos relations. L'auto-hypnose peut vous aider à gérer vos émotions et à maintenir des interactions positives même sous pression.";
    } else if (score < 60) {
      return "Vos relations sont parfois affectées par votre stress. L'auto-hypnose peut vous aider à développer plus de stabilité émotionnelle pour préserver la qualité de vos échanges.";
    } else if (score < 80) {
      return "Vous parvenez généralement à préserver vos relations malgré le stress. L'auto-hypnose peut vous aider à approfondir votre présence et votre écoute dans toutes les situations.";
    } else {
      return "Vos relations restent harmonieuses même en période de stress. L'auto-hypnose peut vous aider à cultiver une influence positive et apaisante sur votre entourage.";
    }
  }
  
  // Default fallback
  return "L'auto-hypnose peut vous aider à améliorer cette dimension de votre bien-être.";
};

export const getOverallConclusion = (score: number): string => {
  if (score < 40) {
    return "Votre niveau de stress actuel est significatif et impacte plusieurs dimensions de votre vie. La bonne nouvelle est que vous avez un potentiel important d'amélioration! La formation Harmonia vous propose des techniques d'auto-hypnose spécifiquement adaptées pour vous aider à retrouver calme et sérénité dans votre quotidien.";
  } else if (score < 60) {
    return "Votre niveau de stress est modéré, avec certaines dimensions qui mériteraient une attention particulière. La formation Harmonia vous offre des outils d'auto-hypnose ciblés pour renforcer ces aspects et vous aider à cultiver une sérénité plus stable et profonde.";
  } else if (score < 80) {
    return "Vous avez déjà développé de bonnes capacités de gestion du stress. La formation Harmonia peut vous aider à les optimiser davantage et à développer une maîtrise plus complète de votre bien-être mental et émotionnel.";
  } else {
    return "Félicitations pour votre excellent niveau de sérénité! La formation Harmonia peut vous aider à maintenir et approfondir cet état, même face aux défis les plus importants, et à développer une maîtrise avancée de l'auto-hypnose pour votre épanouissement personnel.";
  }
};

export const dimensionNames = {
  stress: "Gestion du stress quotidien",
  sleep: "Qualité du sommeil",
  security: "Sentiment de sécurité intérieure",
  self: "Relation avec soi-même",
  relationships: "Impact du stress sur les relations"
};
