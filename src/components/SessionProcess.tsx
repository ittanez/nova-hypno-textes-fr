
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
      title: "Accueil et échange",
      description: "Prise de contact, écoute de vos attentes et objectifs.",
      Icon: Check
    },
    {
      title: "Définition de l'objectif thérapeutique",
      description: "Clarification de votre intention de changement.",
      Icon: Target
    },
    {
      title: "Induction hypnotique",
      description: "Installation progressive de l'état hypnotique.",
      Icon: Clock
    },
    {
      title: "Phase thérapeutique",
      description: "Travail en profondeur sur l'inconscient avec suggestions adaptées.",
      Icon: Sunrise
    },
    {
      title: "Réveil progressif",
      description: "Retour naturel à l'état d'éveil, avec intégration des changements.",
      Icon: Sun
    },
    {
      title: "Temps d'échange final",
      description: "Partage de votre ressenti et conseils pour prolonger les bienfaits.",
      Icon: FileText
    }
  ];

  return (
    <section id="sessions" className="section-padding bg-nova-blue-light bg-opacity-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-16">Déroulement d'une séance d'hypnose Ericksonienne</h2>
        
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
