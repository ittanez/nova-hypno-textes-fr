
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
      title: "1. Échange et explication (15 min)",
      description: "Le processus vous est expliqué, vos questions trouvent leurs réponses et vous définissez ensemble l'objectif de votre séance. Vous comprenez exactement ce qui va se passer et pourquoi. C'est le moment de lever toutes vos interrogations.",
      Icon: Check
    },
    {
      title: "2. Induction guidée et travail collaboratif (30 min)",
      description: "Vous êtes guidé pas à pas vers un état de relaxation profonde. Vous gardez le contrôle et la conscience. Ensemble, vos ressources intérieures sont mobilisées grâce à des techniques adaptées qui vous sont expliquées au fur et à mesure.",
      Icon: Target
    },
    {
      title: "3. Retour progressif et débriefing (15 min)",
      description: "Retour en douceur à l'état de veille normale. Nous échangeons sur vos ressentis, je réponds à vos questions et nous ancrons les bénéfices de la séance. Vous repartez avec une compréhension claire de ce qui s'est passé.",
      Icon: Clock
    }
  ];

  return (
    <section id="sessions" className="section-padding bg-nova-blue-light bg-opacity-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-6">Déroulement d'une séance : transparence et collaboration</h2>
        
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-center">
            Vous méritez de savoir exactement ce qui va se passer. Chaque séance suit un protocole clair que je vous explique en détail.
          </p>
          <p className="text-center mt-4">
            Mon rôle est de vous guider étape par étape, de répondre à toutes vos questions et de co-construire avec vous le travail thérapeutique.
          </p>
          <p className="text-center mt-4 font-medium">
            Voici le déroulement détaillé d'une séance :
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
          
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <p className="text-center text-nova-blue-dark font-medium mb-2">
              Ma promesse : Aucune surprise, tout est expliqué
            </p>
            <p className="text-center text-gray-700">
              Vous ne vivrez jamais quelque chose que vous ne comprenez pas. Le temps est pris pour vous expliquer, 
              vous rassurer et s'adapter à votre rythme. C'est votre séance, vous la construisez ensemble.
            </p>
          </div>
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
