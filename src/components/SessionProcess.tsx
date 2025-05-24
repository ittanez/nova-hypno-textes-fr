
import React, { useState } from 'react';
import { Clock, Users, Brain, Target } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SessionProcess = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Users,
      title: "Premier Entretien",
      description: "Échange pour comprendre vos objectifs et définir votre parcours personnalisé.",
      duration: "30 min"
    },
    {
      icon: Brain,
      title: "Séance d'Hypnose",
      description: "Accompagnement en état d'hypnose ericksonienne pour activer vos ressources.",
      duration: "45 min"
    },
    {
      icon: Target,
      title: "Ancrage des Changements",
      description: "Techniques pour intégrer durablement les nouveaux comportements.",
      duration: "15 min"
    }
  ];

  return (
    <section id="sessions" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-nova-blue-dark mb-4">
            Déroulement des Séances
          </h2>
          <p className="text-lg text-nova-neutral-dark max-w-2xl mx-auto">
            Un accompagnement structuré et bienveillant pour maximiser l'efficacité de chaque séance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`text-center p-6 rounded-lg border-2 transition-all cursor-pointer ${
                  activeStep === index 
                    ? 'border-nova-green bg-nova-green/5 transform scale-105' 
                    : 'border-gray-200 hover:border-nova-green/50'
                } ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full ${
                    activeStep === index ? 'bg-nova-green text-white' : 'bg-nova-blue/10 text-nova-blue'
                  }`}>
                    <Icon size={32} />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-nova-blue-dark mb-3">
                  {step.title}
                </h3>
                
                <p className="text-nova-neutral-dark mb-4 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="flex items-center justify-center text-nova-green font-medium">
                  <Clock size={16} className="mr-2" />
                  {step.duration}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-nova-blue/5 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-3">
              Durée totale : 90 minutes
            </h3>
            <p className="text-nova-neutral-dark">
              Chaque séance est adaptée à votre rythme et à vos besoins spécifiques. 
              Un suivi personnalisé vous est proposé entre les séances.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionProcess;
