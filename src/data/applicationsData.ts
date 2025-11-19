/**
 * Données des applications de l'hypnothérapie
 * Extrait de src/pages/Index.tsx pour améliorer la maintenabilité
 */

import GanttChart from 'lucide-react/dist/esm/icons/gantt-chart';
import Moon from 'lucide-react/dist/esm/icons/moon';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Frown from 'lucide-react/dist/esm/icons/frown';
import Brain from 'lucide-react/dist/esm/icons/brain';
import ActivitySquare from 'lucide-react/dist/esm/icons/activity-square';
import CigaretteOff from 'lucide-react/dist/esm/icons/cigarette-off';
import Sandwich from 'lucide-react/dist/esm/icons/sandwich';
import Smile from 'lucide-react/dist/esm/icons/smile';
import { LucideIcon } from 'lucide-react';

export interface Application {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const applications: Application[] = [
  {
    title: 'Gestion du stress et des émotions',
    description: "Apprendre à accueillir ce qui vous traverse sans être débordé. L'hypnose permet d'installer un espace de recul intérieur, pour retrouver stabilité, calme et sécurité émotionnelle.",
    icon: GanttChart
  },
  {
    title: 'Amélioration du sommeil',
    description: "En calmant les pensées envahissantes, en apaisant le système nerveux et en reconditionnant les automatismes du sommeil, l'hypnose aide à retrouver un endormissement plus naturel et réparateur.",
    icon: Moon
  },
  {
    title: 'Renforcement de la confiance en soi',
    description: "Vous reconnecter à vos capacités, redéfinir votre regard sur vous-même, oser prendre votre place avec assurance. L'inconscient devient ici un soutien puissant pour se réapproprier sa valeur.",
    icon: Heart
  },
  {
    title: 'Libération des blocages et peurs',
    description: "Phobies, peur du jugement, frein au changement : l'hypnose offre un accès indirect mais efficace aux racines émotionnelles du blocage, et permet de les transformer en nouvelles perceptions.",
    icon: Frown
  },
  {
    title: 'Préparation mentale',
    description: "Que ce soit pour une prise de parole, un examen, une étape de vie ou un changement professionnel, l'hypnose peut vous aider à mobiliser calme, clarté et engagement au moment juste.",
    icon: Brain
  },
  {
    title: 'Douleurs, Allergies',
    description: "L'hypnothérapie modifie la perception de la douleur. Elle permet une meilleure maîtrise des manifestations allergiques grâce à la puissance de l'imaginaire.",
    icon: ActivitySquare
  },
  {
    title: 'Dépendances',
    description: "Qu'il s'agisse de dépendances comportementales ou chimiques, l'hypnose permet de modifier les schémas mentaux à l'origine de la dépendance.",
    icon: CigaretteOff
  },
  {
    title: 'Troubles du comportement alimentaire',
    description: "Boulimie, anorexie, compulsions alimentaires... L'hypnothérapie aide à comprendre les causes de ces troubles et favorise le retour à une alimentation équilibrée.",
    icon: Sandwich
  },
  {
    title: 'Émotions',
    description: "Colère, tristesse, peur... L'hypnose aide à mieux gérer ses émotions et à transformer ses réactions pour plus de sérénité au quotidien.",
    icon: Smile
  }
];
