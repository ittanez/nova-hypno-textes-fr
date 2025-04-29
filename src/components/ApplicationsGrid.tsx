
import React from 'react';
import { Heart, Brain, Frown, ActivitySquare, CigaretteOff, Moon, Smile, Sandwich, GanttChart } from 'lucide-react';

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
        <h2 className="text-center text-nova-blue-dark mb-6">Apaiser, transformer, réactiver ce qui est prêt en vous</h2>
        
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-center text-lg">
            L'hypnose agit là où la volonté seule atteint ses limites : dans les mécanismes profonds, émotionnels et inconscients qui influencent notre manière de penser, de réagir, de vivre.
          </p>
          <p className="text-center text-lg mt-4">
            En travaillant avec votre inconscient, nous n'imposons rien : nous l'invitons à mobiliser ses propres ressources pour restaurer l'équilibre, alléger les tensions et soutenir vos capacités d'adaptation et de changement.
          </p>
          <p className="text-center text-lg mt-4">
            Chaque accompagnement s'adapte à votre réalité. Voici quelques domaines dans lesquels l'hypnose peut vous aider concrètement :
          </p>
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
