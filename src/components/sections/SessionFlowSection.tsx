/**
 * SessionFlowSection Component
 * Section déroulement d'une séance avec accordéons interactifs
 * Présente les 4 étapes d'une séance d'hypnothérapie
 */

import React from 'react';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';

interface SessionStep {
  title: string;
  content: string;
}

const sessionSteps: SessionStep[] = [
  {
    title: 'Entretien initial',
    content: 'Je discute avec vous de vos objectifs, de vos attentes et je vous explique le processus en détail. Vos questions sont les bienvenues.'
  },
  {
    title: 'Induction hypnotique',
    content: 'Phase de relaxation progressive pour accéder à l\'état hypnotique. Vous restez conscient et en contrôle à tout moment.'
  },
  {
    title: 'Travail thérapeutique',
    content: 'Je travaille sur vos objectifs en mobilisant vos ressources inconscientes. Approche personnalisée selon vos besoins.'
  },
  {
    title: 'Retour et débriefing',
    content: 'Retour progressif à l\'état de veille. J\'échange avec vous sur votre expérience et les prochaines étapes.'
  }
];

const SessionFlowSection: React.FC = () => {
  const handleAccordionClick = (index: number): void => {
    const content = document.getElementById(`seance-content-${index + 1}`);
    const icon = document.getElementById(`seance-icon-${index + 1}`);
    if (content && icon) {
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
      } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
      }
    }
  };

  return (
    <section id="deroulement" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Déroulement d'une séance
          </h2>

          <div className="space-y-4">
            {sessionSteps.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => handleAccordionClick(index)}
                  className="w-full text-left p-6 bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <ChevronDown id={`seance-icon-${index + 1}`} className="text-blue-500 transition-transform flex-shrink-0" size={24} />
                </button>
                <div id={`seance-content-${index + 1}`} className="hidden p-6 bg-white">
                  <p className="text-gray-600 leading-relaxed">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionFlowSection;
