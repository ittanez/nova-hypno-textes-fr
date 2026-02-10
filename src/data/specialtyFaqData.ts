/**
 * Données FAQ spécifiques aux pages spécialisées
 * Chaque page a ses propres questions-réponses contextuelles
 * + données structurées schema.org FAQPage pour le référencement IA
 */

export interface SpecialtyFaqItem {
  question: string;
  answer: string;
}

// ─── Stress & Anxiété ────────────────────────────────────────────────
export const stressFaqItems: SpecialtyFaqItem[] = [
  {
    question: "Combien de séances d'hypnose faut-il pour traiter le stress et l'anxiété ?",
    answer: "En général, 3 à 5 séances d'hypnose ericksonienne suffisent pour obtenir des résultats durables sur le stress et l'anxiété. Dès la première séance, la majorité de mes patients ressentent un soulagement significatif. Le nombre exact dépend de l'ancienneté du stress, de son intensité et de votre réceptivité. Lors de la première consultation, nous définissons ensemble un plan d'accompagnement adapté à votre situation."
  },
  {
    question: "L'hypnose est-elle efficace contre le burn-out ?",
    answer: "Oui, l'hypnose est particulièrement efficace pour accompagner un burn-out. Elle agit à plusieurs niveaux : relâchement des tensions physiques accumulées, reprogrammation des mécanismes de surmenage, restauration de la capacité à poser des limites et retrouver de l'énergie. L'hypnose ne remplace pas un arrêt de travail si nécessaire, mais elle accélère considérablement la récupération et prévient les rechutes en modifiant les automatismes qui ont mené à l'épuisement."
  },
  {
    question: "Quelle est la différence entre stress et anxiété, et l'hypnose traite-t-elle les deux ?",
    answer: "Le stress est une réaction à une situation concrète (surcharge de travail, conflit, échéance), tandis que l'anxiété est une inquiétude diffuse qui persiste même en l'absence de menace réelle. L'hypnose ericksonienne traite efficacement les deux. Pour le stress, elle reprogramme vos réactions automatiques face aux situations stressantes. Pour l'anxiété, elle travaille sur les schémas inconscients qui entretiennent cet état d'alerte permanent."
  },
  {
    question: "L'hypnose peut-elle aider en cas de crises d'angoisse ?",
    answer: "Absolument. L'hypnose est l'une des approches les plus efficaces pour traiter les crises d'angoisse. Elle agit en deux temps : d'abord, je vous transmets une technique d'auto-hypnose rapide que vous pouvez utiliser dès qu'une crise commence, pour la stopper en quelques minutes. Ensuite, le travail en séance permet de désactiver le mécanisme inconscient qui déclenche ces crises, réduisant progressivement leur fréquence jusqu'à leur disparition."
  },
  {
    question: "Peut-on combiner l'hypnose avec un suivi psychologique pour traiter le stress ?",
    answer: "Oui, l'hypnose se combine parfaitement avec un suivi psychologique ou psychiatrique. Les deux approches sont complémentaires : la psychothérapie travaille sur la compréhension consciente des mécanismes, tandis que l'hypnose agit directement sur les automatismes inconscients. Beaucoup de mes patients suivent les deux en parallèle, et leurs thérapeutes constatent que l'hypnose accélère le processus thérapeutique global."
  }
];

// ─── Phobies & Peurs ────────────────────────────────────────────────
export const phobiesFaqItems: SpecialtyFaqItem[] = [
  {
    question: "Combien de séances d'hypnose pour se libérer d'une phobie ?",
    answer: "Pour une phobie simple (peur d'un objet ou d'une situation spécifique), 2 à 4 séances suffisent généralement. Certaines phobies comme la peur de l'avion ou l'arachnophobie peuvent être traitées en 2 séances seulement. Les phobies plus complexes, comme la phobie sociale, peuvent nécessiter 4 à 6 séances car elles impliquent plusieurs mécanismes interconnectés. Le résultat est durable : une fois le programme inconscient modifié, la phobie ne revient pas."
  },
  {
    question: "Faut-il être exposé à sa phobie pendant la séance d'hypnose ?",
    answer: "Non, c'est l'un des grands avantages de l'hypnose par rapport aux thérapies comportementales classiques. Vous n'avez jamais besoin de vous confronter directement à l'objet de votre peur. L'hypnose ericksonienne travaille avec votre inconscient en utilisant des techniques dissociatives : votre cerveau reprogramme sa réaction de peur sans que vous ayez à revivre la situation anxiogène. C'est une approche douce et confortable."
  },
  {
    question: "La phobie peut-elle revenir après un traitement par hypnose ?",
    answer: "Dans la grande majorité des cas, non. Quand l'hypnose modifie le programme inconscient à l'origine de la phobie, le changement est permanent. La peur disparaît ou se réduit à un niveau normal et gérable. Il peut arriver, dans de rares cas, qu'un événement traumatique réactive une ancienne peur. Si cela se produit, une séance de renforcement suffit généralement à rétablir le résultat."
  },
  {
    question: "Comment l'hypnose traite-t-elle la peur de l'avion ?",
    answer: "La peur de l'avion est l'une des phobies que je traite le plus fréquemment à mon cabinet de Paris. L'hypnose identifie d'abord l'origine de la peur (expérience traumatisante, turbulences, peur de perdre le contrôle, claustrophobie associée). Ensuite, en hypnose profonde, je guide votre inconscient pour dissocier la peur de la situation de vol et installer une sensation de calme et de sécurité. Je vous enseigne aussi une technique d'auto-hypnose à utiliser dans l'avion. La plupart de mes patients reprennent l'avion sereinement après 2 à 3 séances."
  },
  {
    question: "L'hypnose peut-elle traiter les phobies chez l'adulte installées depuis l'enfance ?",
    answer: "Oui, l'hypnose est même particulièrement efficace sur les phobies anciennes. Qu'une phobie soit installée depuis 5 ou 40 ans ne change pas fondamentalement le traitement : c'est toujours un programme inconscient qui maintient la peur. L'hypnose ericksonienne accède directement à ce programme, indépendamment de son ancienneté. En fait, votre inconscient n'a pas de notion du temps comme votre conscient — une phobie de 30 ans peut être désactivée aussi rapidement qu'une phobie récente."
  }
];

// ─── Sommeil & Insomnie ─────────────────────────────────────────────
export const sommeilFaqItems: SpecialtyFaqItem[] = [
  {
    question: "Combien de séances d'hypnose pour retrouver un bon sommeil ?",
    answer: "En moyenne, 3 à 5 séances d'hypnose permettent de retrouver un sommeil stable et réparateur. Beaucoup de mes patients constatent une amélioration dès la première séance : endormissement plus rapide, moins de réveils nocturnes, sommeil plus profond. Le travail complet sur 3 à 5 séances permet de stabiliser ces résultats durablement et de vous transmettre des techniques d'auto-hypnose pour maintenir un bon sommeil sur le long terme."
  },
  {
    question: "L'hypnose peut-elle remplacer les somnifères ?",
    answer: "L'hypnose est une alternative naturelle aux somnifères, mais le sevrage de médicaments doit toujours se faire en accord avec votre médecin. L'hypnose restaure les mécanismes naturels du sommeil sans créer de dépendance. Beaucoup de mes patients réduisent progressivement leurs somnifères au fil des séances, en coordination avec leur médecin traitant, pour finalement s'en passer complètement. L'auto-hypnose que je vous enseigne prend le relais comme outil d'endormissement naturel."
  },
  {
    question: "L'auto-hypnose peut-elle aider à s'endormir chaque soir ?",
    answer: "Oui, c'est même l'un des outils les plus puissants que je transmets à mes patients. Je vous enseigne une technique d'auto-hypnose spécialement conçue pour l'endormissement, que vous pouvez pratiquer chaque soir en quelques minutes. Cette technique induit un état de relaxation profonde qui facilite la transition naturelle vers le sommeil. Avec la pratique, cela devient un réflexe : votre cerveau associe la technique au signal de s'endormir."
  },
  {
    question: "L'hypnose fonctionne-t-elle pour les réveils nocturnes à 3h ou 4h du matin ?",
    answer: "Oui, les réveils nocturnes sont une problématique que l'hypnose traite très bien. Ces réveils sont souvent liés à un mécanisme d'hyper-vigilance inconscient ou à des préoccupations non traitées qui émergent quand le contrôle conscient diminue. L'hypnose identifie la cause spécifique de vos réveils et reprogramme votre cycle de sommeil pour qu'il se déroule sans interruption. Je vous enseigne aussi une technique de ré-endormissement rapide en cas de réveil occasionnel."
  },
  {
    question: "Quelle est la différence entre l'hypnose et la méditation pour le sommeil ?",
    answer: "La méditation et l'hypnose partagent certains mécanismes (relaxation, focalisation de l'attention), mais l'hypnose est une approche thérapeutique qui va plus loin. La méditation calme le mental en surface, ce qui peut faciliter l'endormissement. L'hypnose, elle, travaille directement avec l'inconscient pour reprogrammer les causes profondes de l'insomnie : anxiété anticipatoire, hyper-vigilance, associations négatives avec le coucher. C'est pourquoi l'hypnose produit des résultats plus rapides et plus durables sur les troubles du sommeil."
  }
];

// ─── Gestion des Émotions ───────────────────────────────────────────
export const emotionsFaqItems: SpecialtyFaqItem[] = [
  {
    question: "Comment l'hypnose aide-t-elle à gérer la colère ?",
    answer: "L'hypnose traite la colère en agissant sur deux niveaux. D'abord, elle identifie les déclencheurs inconscients qui provoquent des réactions disproportionnées — souvent liés à des blessures anciennes ou des schémas familiaux. Ensuite, elle reprogramme votre réponse automatique : au lieu de l'explosion, votre inconscient apprend à prendre du recul et à canaliser l'énergie de la colère de façon constructive. Vous ne devenez pas insensible — vous récupérez simplement le choix de votre réaction."
  },
  {
    question: "L'hypnose peut-elle aider à surmonter un deuil ?",
    answer: "Oui, l'hypnose est un accompagnement précieux dans le processus de deuil. Elle ne cherche pas à effacer la tristesse, qui est une émotion saine et nécessaire, mais à débloquer les mécanismes qui empêchent le deuil de suivre son cours naturel : culpabilité, colère non exprimée, sentiment d'inachevé. L'hypnose permet aussi de transformer la relation avec le souvenir de la personne disparue, pour passer d'une douleur envahissante à une mémoire apaisée."
  },
  {
    question: "L'hypnose supprime-t-elle les émotions ?",
    answer: "Non, absolument pas. L'hypnose ne supprime aucune émotion. Les émotions sont essentielles et font partie de votre richesse intérieure. Ce que l'hypnose modifie, c'est l'intensité disproportionnée de certaines réactions émotionnelles et les automatismes qui vous submergent. Après les séances, vous continuez à ressentir toute la palette émotionnelle, mais avec un sentiment de contrôle et de choix. Vous ressentez sans être submergé(e)."
  },
  {
    question: "L'hypnose est-elle adaptée aux personnes hypersensibles ?",
    answer: "L'hypnose est particulièrement bien adaptée aux personnes hypersensibles, qui sont d'ailleurs souvent très réceptives à l'approche ericksonienne. L'hypersensibilité n'est pas un problème à corriger, mais une richesse à canaliser. L'hypnose vous aide à mettre en place des filtres naturels pour ne plus être submergé(e) par les stimuli émotionnels, tout en conservant votre profondeur de perception et votre empathie. C'est un travail de régulation, pas de suppression."
  },
  {
    question: "Combien de séances d'hypnose pour retrouver un équilibre émotionnel ?",
    answer: "En général, 3 à 5 séances permettent de retrouver un équilibre émotionnel durable. La première séance apporte déjà un soulagement en identifiant les mécanismes en jeu et en initiant le travail de régulation. Les séances suivantes consolident les changements et traitent les différentes facettes de la problématique. Pour un deuil ou une charge émotionnelle très ancienne, un accompagnement un peu plus long peut être bénéfique."
  }
];

// ─── Confiance en Soi ───────────────────────────────────────────────
export const confianceFaqItems: SpecialtyFaqItem[] = [
  {
    question: "L'hypnose peut-elle réellement augmenter la confiance en soi ?",
    answer: "Oui, l'hypnose est l'une des approches les plus efficaces pour développer la confiance en soi, car elle agit directement sur les croyances inconscientes qui sabotent votre estime personnelle. Ces croyances (« je ne suis pas à la hauteur », « je ne mérite pas ») se sont installées à un niveau profond, souvent pendant l'enfance, et la volonté seule ne peut pas les modifier. L'hypnose ericksonienne accède à ces programmations pour les transformer et ancrer une image de soi positive et réaliste."
  },
  {
    question: "Comment l'hypnose traite-t-elle le syndrome de l'imposteur ?",
    answer: "Le syndrome de l'imposteur repose sur une dissonance entre vos compétences réelles et l'image que vous avez de vous-même. L'hypnose traite ce décalage en identifiant les expériences fondatrices qui ont créé le doute (critique parentale, échec scolaire, comparaison sociale) et en les retraitant. En état d'hypnose, votre inconscient intègre une perception plus juste de vos capacités. Le résultat : vous vous sentez légitime dans vos réussites, naturellement, sans avoir à vous « convaincre »."
  },
  {
    question: "L'hypnose aide-t-elle pour la prise de parole en public ?",
    answer: "La prise de parole en public est l'un des domaines où l'hypnose obtient les résultats les plus spectaculaires. Elle travaille sur la peur du jugement, l'anxiété de performance et les scénarios catastrophes que votre inconscient projette. En 2 à 3 séances, nous installons un état de calme et d'assurance que votre inconscient active automatiquement quand vous prenez la parole. Je vous enseigne aussi une technique d'auto-hypnose flash à utiliser juste avant une présentation ou un entretien."
  },
  {
    question: "Les résultats de l'hypnose sur la confiance en soi sont-ils durables ?",
    answer: "Oui, les résultats sont durables car l'hypnose modifie les croyances profondes, pas seulement les comportements de surface. Contrairement à la méthode Coué ou aux affirmations positives, l'hypnose ne superpose pas une couche de confiance artificielle sur des croyances négatives. Elle transforme les fondations elles-mêmes. Les patients qui viennent pour un manque de confiance constatent que les changements persistent et s'amplifient même avec le temps, car la confiance nouvellement acquise génère des expériences positives qui la renforcent."
  },
  {
    question: "L'hypnose peut-elle aider à s'affirmer dans ses relations personnelles et professionnelles ?",
    answer: "Absolument. L'affirmation de soi est directement liée à la confiance en soi. L'hypnose vous aide à poser vos limites, à dire non sans culpabilité, à exprimer vos besoins et à défendre vos positions. Le travail porte sur les schémas inconscients de soumission ou d'évitement du conflit, souvent installés pendant l'enfance. Après les séances, mes patients rapportent une capacité naturelle à s'affirmer — non pas avec agressivité, mais avec une assurance calme qui transforme leurs relations."
  }
];

// ─── Blocages & Comportements ───────────────────────────────────────
export const blocagesFaqItems: SpecialtyFaqItem[] = [
  {
    question: "L'hypnose peut-elle aider à arrêter la procrastination ?",
    answer: "Oui, l'hypnose est très efficace contre la procrastination car elle traite la cause, pas le symptôme. La procrastination n'est pas un manque de volonté : c'est un mécanisme de protection inconscient, souvent lié à la peur de l'échec, au perfectionnisme ou à l'anxiété de performance. L'hypnose identifie la peur cachée derrière votre procrastination et la neutralise. Résultat : vous retrouvez naturellement la capacité de passer à l'action sans forcer, car le frein inconscient a été levé."
  },
  {
    question: "Comment l'hypnose agit-elle sur les TOC (troubles obsessionnels compulsifs) ?",
    answer: "L'hypnose accompagne efficacement les TOC en travaillant sur le mécanisme d'anxiété sous-jacent. Les rituels compulsifs (vérifications, lavages, comptage) sont des stratégies que l'inconscient a mises en place pour gérer une anxiété profonde. L'hypnose réduit cette anxiété à sa source et propose à l'inconscient des alternatives plus adaptées. L'hypnose ne remplace pas un suivi psychiatrique pour les TOC sévères, mais elle constitue un complément thérapeutique précieux qui accélère les progrès."
  },
  {
    question: "L'hypnose peut-elle briser les schémas répétitifs en amour ou au travail ?",
    answer: "C'est même l'une de ses applications les plus puissantes. Les schémas répétitifs (toujours choisir le même type de partenaire, reproduire les mêmes conflits au travail, s'auto-saboter à chaque réussite) sont maintenus par des programmes inconscients souvent liés à l'enfance. L'hypnose identifie le schéma, remonte à son origine et reprogramme la réponse inconsciente. Mes patients sont souvent surpris de constater qu'après quelques séances, ils font naturellement des choix différents."
  },
  {
    question: "L'hypnose fonctionne-t-elle pour arrêter de se ronger les ongles (onychophagie) ?",
    answer: "Oui, l'onychophagie est l'un des comportements compulsifs les mieux traités par l'hypnose, avec un taux de réussite très élevé. Ce comportement est un automatisme inconscient souvent lié à la gestion du stress ou à un besoin de réconfort. L'hypnose identifie la fonction cachée du comportement et propose à l'inconscient une alternative. En 2 à 3 séances, la plupart de mes patients arrêtent de se ronger les ongles sans effort de volonté, car l'automatisme a été reprogrammé."
  },
  {
    question: "Peut-on traiter plusieurs blocages comportementaux en même temps avec l'hypnose ?",
    answer: "Oui, et c'est même souvent ce qui se passe naturellement. Beaucoup de blocages partagent une racine commune (anxiété, manque de confiance, besoin de contrôle). En traitant cette racine par l'hypnose, plusieurs comportements s'améliorent simultanément. Par exemple, en travaillant sur la peur de l'échec, on peut voir s'améliorer à la fois la procrastination, la difficulté à s'affirmer et les schémas d'auto-sabotage. Chaque séance est personnalisée pour adresser vos problématiques dans leur globalité."
  }
];
