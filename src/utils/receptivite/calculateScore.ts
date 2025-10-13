export type Answer = {
  questionId: number | string;
  value: number;
};

export type VAKOGScores = {
  V: number;
  A: number;
  K: number;
  O: number;
  G: number;
};

export type TestResult = {
  score: number;
  category: string;
  description: string;
  senseDominant: string;
  vakogScores?: VAKOGScores;
};

export const calculateScore = (answers: Answer[]): TestResult => {
  // Calculer le score total (somme de toutes les réponses)
  const totalScore = answers.reduce((sum, answer) => sum + answer.value, 0);

  // Déterminer la catégorie selon le score
  let category = "";
  let description = "";

  if (totalScore >= 24 && totalScore <= 48) {
    category = "Réceptivité émergente";
    description = "Vous possédez une sensibilité à l'hypnose qui peut être développée. Bien que vous puissiez parfois trouver difficile de vous laisser aller complètement, votre ouverture aux nouvelles expériences est un excellent point de départ. Avec de la pratique et un accompagnement adapté, vous pourrez progressivement approfondir votre capacité à entrer en état hypnotique. L'hypnose sera particulièrement bénéfique si vous êtes prêt(e) à explorer cette approche avec patience et curiosité.";
  } else if (totalScore >= 49 && totalScore <= 72) {
    category = "Réceptivité modérée et adaptative";
    description = "Vous présentez une bonne capacité à entrer en état hypnotique. Vous êtes capable de vous concentrer et de suivre les suggestions, tout en conservant un certain niveau de contrôle qui vous sécurise. Cette réceptivité équilibrée vous permet de bénéficier pleinement des séances d'hypnose tout en restant acteur de votre propre transformation. Vous êtes particulièrement réceptif(ve) aux techniques qui respectent votre rythme et votre besoin d'autonomie.";
  } else if (totalScore >= 73 && totalScore <= 96) {
    category = "Réceptivité naturelle et fluide";
    description = "Vous possédez une excellente réceptivité à l'hypnose. Vous avez naturellement la capacité de vous immerger profondément dans vos expériences intérieures et de vous laisser guider par votre imagination. Votre sensibilité aux suggestions hypnotiques est remarquable, ce qui facilite grandement le travail thérapeutique. Vous êtes capable d'atteindre rapidement des états de conscience modifiée et d'en tirer des bénéfices significatifs pour votre bien-être et votre développement personnel.";
  } else if (totalScore >= 97 && totalScore <= 120) {
    category = "Réceptivité très élevée";
    description = "Vous présentez une réceptivité exceptionnelle à l'hypnose. Votre capacité à vous immerger totalement dans l'expérience hypnotique est remarquable. Vous possédez une imagination vivace et une sensibilité profonde qui vous permettent d'accéder facilement à des états de conscience modifiée très profonds. Cette réceptivité naturelle fait de vous un excellent candidat pour tous types d'approches hypnotiques. Votre sensibilité est un véritable atout pour votre développement personnel et votre bien-être.";
  }

  // Calculer les scores VAKOG si présents
  const vakogAnswers = answers.filter(a => typeof a.questionId === 'string');
  let senseDominant = "";
  let vakogScores: VAKOGScores | undefined;

  if (vakogAnswers.length > 0) {
    vakogScores = {
      V: 0,
      A: 0,
      K: 0,
      O: 0,
      G: 0
    };

    vakogAnswers.forEach(answer => {
      const senseType = answer.questionId.toString().charAt(0).toUpperCase() as keyof VAKOGScores;
      if (vakogScores && vakogScores[senseType] !== undefined) {
        vakogScores[senseType] += answer.value;
      }
    });

    // Trouver le sens dominant
    const maxScore = Math.max(...Object.values(vakogScores));
    const dominantSense = Object.entries(vakogScores).find(([_, score]) => score === maxScore)?.[0] || "";

    const senseNames: Record<string, string> = {
      V: "Visuel",
      A: "Auditif",
      K: "Kinesthésique",
      O: "Olfactif",
      G: "Gustatif"
    };

    senseDominant = senseNames[dominantSense] || "";
  }

  return {
    score: totalScore,
    category,
    description,
    senseDominant,
    vakogScores
  };
};
