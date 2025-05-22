
import React, { useEffect, useRef } from 'react';
import { Check, Target, Clock, Sunrise, Sun, FileText } from 'lucide-react';

const SessionProcess = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });
    
    const steps = timelineRef.current?.querySelectorAll('.step');
    steps?.forEach((step) => {
      observer.observe(step);
    });
    
    return () => {
      steps?.forEach((step) => {
        observer.unobserve(step);
      });
    };
  }, []);
  
  const steps = [
    {
      title: "Temps d'échange",
      description: "Nous commençons par un temps de parole. Vous y exprimez vos besoins, votre état du moment, vos attentes. Ce dialogue me permet de cerner ce qui se joue en vous, et de poser les bases d'un accompagnement personnalisé.",
      Icon: Check
    },
    {
      title: "Induction hypnotique et travail ciblé",
      description: "Je vous guide progressivement vers un état de conscience modifiée, naturel et sécurisé, qui facilite le dialogue avec votre monde intérieur. C'est dans cet état que nous mobilisons vos ressources inconscientes, à travers des suggestions, des métaphores, ou des protocoles adaptés à votre objectif.",
      Icon: Target
    },
    {
      title: "Intégration et retour à l'état ordinaire",
      description: "En fin de séance, nous prenons un moment pour revenir à l'état de veille, accueillir vos ressentis et poser les premiers ancrages du changement. Vous repartez avec une sensation d'apaisement, parfois une clarté nouvelle, souvent un début de transformation silencieuse mais réelle.",
      Icon: Clock
    }
  ];

  return (
    <section id="sessions" className="section-padding bg-nova-blue-light bg-opacity-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-6">Découvrez comment une séance d'hypnose à Paris peut transformer votre quotidien</h2>
        
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-center">
            Chaque séance est une rencontre. Une rencontre avec vous-même, mais dans un cadre guidé, respectueux, où rien n'est forcé et tout peut être entendu.
          </p>
          <p className="text-center mt-4">
            Mon rôle est d'ouvrir un espace où votre inconscient peut s'exprimer librement, à son rythme, et où vous pouvez vous sentir en sécurité pour amorcer un changement en profondeur.
          </p>
          <p className="text-center mt-4 font-medium">
            Voici comment se déroule une séance type :
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div 
            ref={timelineRef}
            className="relative flex flex-col border-l-3 border-nova-blue pl-8 my-8"
            style={{ borderLeftWidth: '3px' }}
          >
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="step mb-12 relative opacity-0 transform -translate-x-12 transition-all duration-600"
                style={{
                  transition: 'all 0.6s ease-out'
                }}
              >
                <div className="absolute -left-[10px] top-0 w-3 h-3 rounded-full bg-nova-blue border-2 border-white"></div>
                <div className="absolute -left-14 -top-1 w-6 h-6 text-nova-blue">
                  <step.Icon size={24} stroke="#005f73" />
                </div>
                <div className="content">
                  <h3 className="m-0 mb-2 text-xl font-semibold text-nova-blue-dark">{step.title}</h3>
                  <p className="m-0 text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-nova-blue-dark font-medium">
            Chaque séance est un pas. Un pas mesuré, respectueux, mais engagé vers un mieux-être durable et autonome.
          </p>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .step.visible {
            opacity: 1;
            transform: translateX(0);
          }
        `
      }} />
    </section>
  );
};

export default SessionProcess;
