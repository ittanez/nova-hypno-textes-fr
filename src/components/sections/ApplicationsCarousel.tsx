/**
 * ApplicationsCarousel Component
 * Carousel des 9 applications de l'hypnothérapie
 * Grid en desktop, carousel en mobile avec navigation
 */

import React, { useState } from 'react';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { applications } from '@/data/applicationsData';

const ApplicationsCarousel: React.FC = () => {
  const [currentApplication, setCurrentApplication] = useState<number>(0);

  return (
    <section id="applications" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            Comment l'hypnose peut vous aider
          </h2>
          <p className="text-xl text-nova-blue font-semibold mb-6">9 domaines d'application concrets</p>
        </div>

        <div className="max-w-4xl mx-auto mb-16 space-y-6">
          <div className="bg-nova-blue-light bg-opacity-10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-4 text-center">
              Des résultats mesurables et durables
            </h3>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-nova-green mr-3 mt-1 font-bold">✓</span>
                <span><strong>Stress et anxiété réduits</strong> dès les premières séances</span>
              </li>
              <li className="flex items-start">
                <span className="text-nova-green mr-3 mt-1 font-bold">✓</span>
                <span><strong>Sommeil retrouvé</strong> en 3 séances en moyenne</span>
              </li>
              <li className="flex items-start">
                <span className="text-nova-green mr-3 mt-1 font-bold">✓</span>
                <span><strong>Phobies surmontées</strong> avec un accompagnement progressif</span>
              </li>
              <li className="flex items-start">
                <span className="text-nova-green mr-3 mt-1 font-bold">✓</span>
                <span><strong>95% des clients</strong> constatent une amélioration significative dès les 3 premières séances</span>
              </li>
            </ul>
          </div>
          <p className="text-center text-lg text-gray-700">
            L'hypnose agit là où la volonté seule atteint ses limites. Découvrez les domaines dans lesquels elle peut transformer votre quotidien :
          </p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                  <Icon className="text-blue-500 group-hover:text-white transition-colors" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{app.title}</h3>
                <p className="text-gray-600 leading-relaxed">{app.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mobile: Carousel */}
        <div
          className="md:hidden relative max-w-lg mx-auto pb-12"
          role="region"
          aria-roledescription="carousel"
          aria-label="Applications de l'hypnothérapie"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); setCurrentApplication(prev => prev === 0 ? applications.length - 1 : prev - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); setCurrentApplication(prev => prev === applications.length - 1 ? 0 : prev + 1); }
          }}
        >
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentApplication * 100}%)` }}>
              {applications.map((app, index) => {
                const Icon = app.icon;
                return (
                  <div key={index} className="min-w-full px-2">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <Icon className="text-blue-500" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{app.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{app.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation en bas */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
            <button
              onClick={() => setCurrentApplication(prev => prev === 0 ? applications.length - 1 : prev - 1)}
              className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
              aria-label="Application précédente"
            >
              <ChevronLeft className="text-blue-500" size={14} />
            </button>

            <div className="flex gap-1.5">
              {applications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentApplication(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentApplication === index ? 'w-4 bg-blue-500' : 'w-1.5 bg-gray-300'
                  }`}
                  aria-label={`Application ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentApplication(prev => prev === applications.length - 1 ? 0 : prev + 1)}
              className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
              aria-label="Application suivante"
            >
              <ChevronRight className="text-blue-500" size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsCarousel;
