
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="intro" className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-nova-blue-dark/80 via-nova-blue/60 to-nova-green-light/40"></div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white animate-fade-in">
            Un accompagnement où chaque émotion est entendue, et chaque blocage devient une opportunité de changement.
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-white/90 animate-fade-in leading-relaxed" style={{animationDelay: "0.2s"}}>
            Hypnose ericksonienne et auto-hypnose à Paris : une approche respectueuse et sur mesure, pour mobiliser les ressources profondes de votre inconscient et favoriser un mieux-être durable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: "0.4s"}}>
            <a 
              href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-nova-green text-white rounded-full shadow-lg hover:bg-nova-green-dark transition-colors text-lg font-semibold"
            >
              Prendre rendez-vous
            </a>
            <a 
              href="#applications" 
              className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors text-lg font-semibold"
            >
              Découvrir les applications
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
        <a href="#about" aria-label="Défiler vers le bas">
          <ChevronDown size={40} className="text-white" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
