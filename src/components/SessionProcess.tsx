
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
    <section id="sessions" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-nova-blue-dark mb-6">
            Découvrez comment une séance d'hypnose à Paris peut transformer votre quotidien
          </h2>
          <div className="text-lg text-nova-neutral-dark max-w-3xl mx-auto space-y-4">
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

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                
                <h3 className="text-xl font-semibold text-nova-blue-dark mb-4">
                  {index + 1}. {step.title}
                </h3>
                
                <p className="text-nova-neutral-dark leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-nova-blue/5 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg text-nova-neutral-dark font-medium">
              Chaque séance est un pas. Un pas mesuré, respectueux, mais engagé vers un mieux-être durable et autonome.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionProcess;
