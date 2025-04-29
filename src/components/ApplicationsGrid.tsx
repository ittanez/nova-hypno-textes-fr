
import React from 'react';
import { Heart, Brain, Frown, ActivitySquare, CigaretteOff, Moon, Smile, Sandwich, GanttChart } from 'lucide-react';

const applications = [
  {
    title: 'Confiance en soi',
    description: "L'hypnothérapie peut vous aider à renforcer votre estime personnelle, à vous accepter tel que vous êtes et à développer votre assertivité.",
    icon: Heart
  },
  {
    title: 'Troubles Anxieux',
    description: "L'anxiété excessive peut nuire à votre qualité de vie. L'hypnose permet de réguler les réactions anxieuses et de retrouver calme et sérénité.",
    icon: Brain
  },
  {
    title: 'Phobies, peurs',
    description: "Vous souffrez de phobie spécifique ou de peurs envahissantes ? Grâce à l'hypnose, affrontez vos craintes irrationnelles et retrouvez la liberté d'esprit.",
    icon: Frown
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
    title: 'Sommeil',
    description: "Insomnies, cauchemars, sommeil agité ? L'hypnothérapie apaise et agit sur les blocages psychologiques et émotionnels.",
    icon: Moon
  },
  {
    title: 'Émotions',
    description: "Colère, tristesse, peur... L'hypnose aide à mieux gérer ses émotions et à transformer ses réactions pour plus de sérénité au quotidien.",
    icon: Smile
  },
  {
    title: 'Troubles du comportement alimentaire',
    description: "Boulimie, anorexie, compulsions alimentaires... L'hypnothérapie aide à comprendre les causes de ces troubles et favorise le retour à une alimentation équilibrée.",
    icon: Sandwich
  },
  {
    title: 'Stress',
    description: "Hyper-réactivité, fatigue, maux de tête : l'hypnose apprend à lâcher prise sur les tensions et à retrouver calme intérieur et sérénité.",
    icon: GanttChart
  },
];

const ApplicationsGrid = () => {
  return (
    <section id="applications" className="section-padding bg-nova-neutral">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-16">Applications thérapeutiques de l'hypnose</h2>
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
                    <Icon size={24} className="text-nova-blue-dark" />
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
