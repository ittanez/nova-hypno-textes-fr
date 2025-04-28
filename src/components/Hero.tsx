
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="intro" className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-nova-blue-light via-white to-nova-green-light">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-nova-blue-dark animate-fade-in">
            Découvrez le pouvoir de l'hypnothérapie
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-nova-neutral-dark animate-fade-in" style={{animationDelay: "0.2s"}}>
            Une approche thérapeutique efficace pour favoriser votre bien-être et votre épanouissement personnel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: "0.4s"}}>
            <a 
              href="#applications" 
              className="px-8 py-3 bg-nova-blue text-white rounded-full shadow-lg hover:bg-nova-blue-dark transition-colors"
            >
              Découvrir les applications
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 border-2 border-nova-blue text-nova-blue rounded-full hover:bg-nova-blue hover:text-white transition-colors"
            >
              Prendre rendez-vous
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
        <a href="#about" aria-label="Défiler vers le bas">
          <ChevronDown size={40} className="text-nova-blue" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
