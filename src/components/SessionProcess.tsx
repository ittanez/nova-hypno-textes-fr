
import { useState } from 'react';
import { Clock, MessageCircle, Brain, Target } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SessionProcess = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: MessageCircle,
      title: "Temps d'échange",
      description: "Nous commençons par un temps de parole. Vous y exprimez vos besoins, votre état du moment, vos attentes. Ce dialogue me permet de cerner ce qui se joue en vous, et de poser les bases d'un accompagnement personnalisé."
    },
    {
      icon: Brain,
      title: "Induction hypnotique et travail ciblé",
      description: "Je vous guide progressivement vers un état de conscience modifiée, naturel et sécurisé, qui facilite le dialogue avec votre monde intérieur. C'est dans cet état que nous mobilisons vos ressources inconscientes, à travers des suggestions, des métaphores, ou des protocoles adaptés à votre objectif."
    },
    {
      icon: Target,
      title: "Intégration et retour à l'état ordinaire",
      description: "En fin de séance, nous prenons un moment pour revenir à l'état de veille, accueillir vos ressentis et poser les premiers ancrages du changement. Vous repartez avec une sensation d'apaisement, parfois une clarté nouvelle, souvent un début de transformation silencieuse mais réelle."
    }
  ];

  return (
    <section id="sessions" className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center mb-8 md:mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-nova-blue-dark mb-4 md:mb-6">
            Découvrez comment une séance d'hypnose à Paris peut transformer votre quotidien
          </h2>
          <div className="text-base md:text-lg text-nova-neutral-dark max-w-3xl mx-auto space-y-3 md:space-y-4">
            <p>
              Chaque séance est une rencontre. Une rencontre avec vous-même, mais dans un cadre guidé, 
              respectueux, où rien n'est forcé et tout peut être entendu.
            </p>
            <p>
              Mon rôle est d'ouvrir un espace où votre inconscient peut s'exprimer librement, à son rythme, 
              et où vous pouvez vous sentir en sécurité pour amorcer un changement en profondeur.
            </p>
            <p className="font-semibold">
              Voici comment se déroule une séance type :
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`text-center p-4 md:p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                  activeStep === index 
                    ? 'border-nova-green bg-nova-green/5 transform scale-[1.02] md:scale-105' 
                    : 'border-gray-200 hover:border-nova-green/50'
                } ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className={`p-3 md:p-4 rounded-full transition-colors duration-300 ${
                    activeStep === index ? 'bg-nova-green text-white' : 'bg-nova-blue/10 text-nova-blue'
                  }`}>
                    <Icon size={24} className="md:w-8 md:h-8" />
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold text-nova-blue-dark mb-3 md:mb-4">
                  {index + 1}. {step.title}
                </h3>
                
                <p className="text-sm md:text-base text-nova-neutral-dark leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <div className="bg-nova-blue/5 rounded-lg p-4 md:p-6 max-w-2xl mx-auto">
            <p className="text-base md:text-lg text-nova-neutral-dark font-medium">
              Chaque séance est un pas. Un pas mesuré, respectueux, mais engagé vers un mieux-être durable et autonome.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionProcess;
