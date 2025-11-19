/**
 * HowItWorksCarousel Component
 * Carousel expliquant comment fonctionne l'hypnose en 4 étapes
 * Grid en desktop, carousel en mobile avec navigation
 */

import React, { useState } from 'react';
import Brain from 'lucide-react/dist/esm/icons/brain';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Lightbulb from 'lucide-react/dist/esm/icons/lightbulb';
import Users from 'lucide-react/dist/esm/icons/users';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';

interface HowItWorksStep {
  icon: typeof Brain;
  title: string;
  description: string;
}

const howItWorksSteps: HowItWorksStep[] = [
  {
    icon: Brain,
    title: 'État naturel',
    description: 'Un état de conscience modifié que vous expérimentez naturellement (rêverie, absorption dans un livre)'
  },
  {
    icon: Shield,
    title: 'Vous gardez le contrôle',
    description: 'Vous restez conscient et pouvez refuser toute suggestion qui ne vous convient pas'
  },
  {
    icon: Lightbulb,
    title: 'Accès aux ressources',
    description: 'Accédez à vos ressources inconscientes et créez de nouveaux apprentissages positifs'
  },
  {
    icon: Users,
    title: 'Collaboration active',
    description: 'Vous êtes acteur de votre changement. Le thérapeute guide, vous créez les solutions'
  }
];

const HowItWorksCarousel: React.FC = () => {
  const [currentHowItWorks, setCurrentHowItWorks] = useState<number>(0);

  return (
    <section id="comment-fonctionne" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment fonctionne l'hypnose ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            L'hypnose n'est ni magique ni mystérieuse. C'est un état naturel que votre cerveau connaît déjà.
          </p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {howItWorksSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="text-blue-500" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden relative max-w-lg mx-auto pb-12">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentHowItWorks * 100}%)` }}>
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="min-w-full px-2">
                    <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="text-blue-500" size={40} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation en bas */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
            <button
              onClick={() => setCurrentHowItWorks(prev => prev === 0 ? 3 : prev - 1)}
              className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
              aria-label="Précédent"
            >
              <ChevronLeft className="text-blue-500" size={14} />
            </button>

            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHowItWorks(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentHowItWorks === index ? 'w-4 bg-blue-500' : 'w-1.5 bg-gray-300'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentHowItWorks(prev => prev === 3 ? 0 : prev + 1)}
              className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
              aria-label="Suivant"
            >
              <ChevronRight className="text-blue-500" size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksCarousel;
