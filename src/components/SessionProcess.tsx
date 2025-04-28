
import React from 'react';
import { ClipboardList, BookOpen, Sparkles, Smile } from 'lucide-react';

const SessionProcess = () => {
  const steps = [
    {
      title: "L'anamnèse",
      description: "Tout d'abord, une séance d'hypnose Ericksonienne débute par un entretien préalable appelé \"anamnèse\". Cet entretien permet d'identifier vos problèmes et difficultés. Ensemble, nous définissons ensuite vos objectifs pour la séance.",
      icon: ClipboardList
    },
    {
      title: "Explication de l'hypnose",
      description: "Ensuite, je vous explique en détail le fonctionnement de l'hypnose Ericksonienne. Vous comprendrez alors comment vivre cet état de conscience modifiée. Cette relaxation physique et mentale profonde servira à travailler sur vos problèmes.",
      icon: BookOpen
    },
    {
      title: "La phase d'hypnose",
      description: "Après avoir créé un contexte accueillant et explicité le processus, je mets en œuvre la technique hypnothérapeutique que j'ai spécialement adaptée à votre situation. Pendant cette phase, vous utilisez des exercices et des jeux d'imagination pour atteindre vos buts.",
      icon: Sparkles
    },
    {
      title: "Fin de la séance",
      description: "Enfin, vous êtes invité à revenir doucement à la fin de la séance et à faire part de vos ressentis et des changements dans vos sensations pendant la séance. Nous discutons également des prochains objectifs à atteindre.",
      icon: Smile
    }
  ];

  return (
    <section id="sessions" className="section-padding bg-nova-blue-light bg-opacity-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-16">Déroulement d'une séance d'hypnose Ericksonienne</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-nova-blue"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="mb-12 md:mb-24 relative">
                <div className={`md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline circle marker */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-12 h-12 rounded-full border-4 border-nova-blue bg-white shadow-lg z-10 flex items-center justify-center">
                    {React.createElement(step.icon, { size: 24, className: "text-nova-blue" })}
                  </div>
                  
                  {/* Content box */}
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="md:hidden bg-nova-blue rounded-full p-2 mr-3">
                          {React.createElement(step.icon, { size: 18, className: "text-white" })}
                        </div>
                        <h3 className="text-nova-blue-dark text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionProcess;
