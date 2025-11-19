
import React from 'react';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Brain from 'lucide-react/dist/esm/icons/brain';
import Frown from 'lucide-react/dist/esm/icons/frown';
import ActivitySquare from 'lucide-react/dist/esm/icons/activity-square';
import CigaretteOff from 'lucide-react/dist/esm/icons/cigarette-off';
import Moon from 'lucide-react/dist/esm/icons/moon';
import Smile from 'lucide-react/dist/esm/icons/smile';
import Sandwich from 'lucide-react/dist/esm/icons/sandwich';
import GanttChart from 'lucide-react/dist/esm/icons/gantt-chart';

const applications = [
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
  },
];

const ApplicationsGrid = () => {
  return (
    <section id="applications" className="section-padding bg-nova-neutral">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-8">Comment l'hypnose peut vous aider : 9 domaines d'application</h2>

        <div className="max-w-4xl mx-auto mb-16 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-nova-blue-dark mb-4">
              L'hypnose : quand agir en profondeur fait la différence
            </h3>
            <p className="text-lg leading-relaxed mb-4">
              L'hypnose agit là où la volonté seule atteint ses limites :
            </p>
            <ul className="text-left max-w-2xl mx-auto space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-nova-green mr-3 mt-1 font-bold">→</span>
                <span>Dans vos <strong>mécanismes profonds</strong> : ceux qui régissent vos réactions automatiques</span>
              </li>
              <li className="flex items-start">
                <span className="text-nova-green mr-3 mt-1 font-bold">→</span>
                <span>Dans vos <strong>émotions inconscientes</strong> : celles qui vous débordent malgré vous</span>
              </li>
              <li className="flex items-start">
                <span className="text-nova-green mr-3 mt-1 font-bold">→</span>
                <span>Dans vos <strong>schémas mentaux</strong> : ceux qui influencent votre quotidien</span>
              </li>
            </ul>
          </div>

          <div className="bg-nova-blue-light bg-opacity-10 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold text-nova-blue-dark mb-4 text-center">
              Ce que vous pouvez attendre de l'hypnose
            </h3>
            <p className="text-lg leading-relaxed">
              En mobilisant vos ressources inconscientes, l'hypnose vous permet de :
            </p>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-nova-green mr-3 mt-1 font-bold">✓</span>
                <span><strong>Réduire votre stress et anxiété</strong> dès les premières séances</span>
              </li>
              <li className="flex items-start">
                <span className="text-nova-green mr-3 mt-1 font-bold">✓</span>
                <span><strong>Retrouver un sommeil réparateur</strong> en 3 à 5 séances</span>
              </li>
              <li className="flex items-start">
                <span className="text-nova-green mr-3 mt-1 font-bold">✓</span>
                <span><strong>Surmonter vos phobies et blocages</strong> de manière durable</span>
              </li>
              <li className="flex items-start">
                <span className="text-nova-green mr-3 mt-1 font-bold">✓</span>
                <span><strong>Renforcer votre confiance en vous</strong> au quotidien</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold text-nova-blue-dark mb-4">
              9 domaines d'accompagnement personnalisés
            </h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              Chaque accompagnement s'adapte à votre situation personnelle.<br/>
              Découvrez les domaines dans lesquels l'hypnose peut vous aider concrètement :
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-nova-blue-light p-3 rounded-full mr-4">
                    <Icon size={24} className="text-nova-blue-dark" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-nova-blue-dark">{app.title}</h3>
                </div>
                <p className="text-nova-neutral-dark">{app.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ApplicationsGrid;
