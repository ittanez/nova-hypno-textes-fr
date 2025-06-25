
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="intro" className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Suppression de l'image d'arrière-plan pour améliorer les performances */}
      <div className="absolute inset-0 bg-gradient-to-br from-nova-blue-dark via-nova-blue to-nova-green-light" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Colonne image - sera le nouveau LCP */}
            <div className="order-2 lg:order-1">
              <img 
                src="/zenatti.webp" 
                srcSet="/zenatti.webp 1x, /zenatti.webp 2x"
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Alain Zenatti, Hypnothérapeute à Paris 4ème - Cabinet hypnose ericksonienne Marais Bastille" 
                className="w-full max-w-md mx-auto h-auto rounded-2xl shadow-2xl"
                width="400"
                height="500"
                fetchpriority="high"
              />
            </div>
            
            {/* Colonne texte */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              {/* Modification du H1 principal pour le SEO */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white animate-fade-in">
                Hypnothérapie Ericksonienne Personnalisée Paris Centre
              </h1>
          
              <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
                Hypnose ericksonienne et auto-hypnose à Paris : une approche respectueuse et sur mesure, pour mobiliser les ressources profondes de votre inconscient et favoriser un mieux-être durable.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-nova-green text-white rounded-full shadow-lg hover:bg-nova-green-dark transition-colors text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-nova-green focus:ring-offset-2"
                  aria-label="Prendre rendez-vous avec Alain Zenatti, hypnothérapeute à Paris 4ème"
                  role="button"
                >
                  Prendre rendez-vous
                </a>
                <a 
                  href="#applications" 
                  className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  aria-label="Découvrir les applications de l'hypnose ericksonienne"
                  role="button"
                >
                  Découvrir les applications
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
        <a 
          href="#about" 
          aria-label="Défiler vers la section à propos d'Alain Zenatti"
          className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-full p-2"
          role="button"
        >
          <ChevronDown size={40} className="text-white" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
