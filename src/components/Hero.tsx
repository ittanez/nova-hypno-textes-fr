
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="intro" className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Suppression de l'image d'arrière-plan pour améliorer les performances */}
      <div className="absolute inset-0 bg-gradient-to-br from-nova-blue-dark via-nova-blue to-nova-green-light" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Modification du H1 principal pour le SEO */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white animate-fade-in">
            Comprendre l'Hypnose, Choisir le Bon Accompagnement
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Vous voulez comprendre comment fonctionne l'hypnose avant de vous engager ?
          </p>
          <p className="text-lg md:text-xl mb-12 text-white/80 leading-relaxed">
            Découvrez une approche transparente avec un <strong>Maître Hypnologue certifié</strong> qui prend le temps de vous expliquer chaque étape de votre transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#about" 
              className="px-8 py-4 bg-nova-green text-white rounded-full shadow-lg hover:bg-nova-green-dark transition-colors text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-nova-green focus:ring-offset-2"
              aria-label="Découvrir ma méthode et mes qualifications"
              role="button"
            >
              Découvrir ma méthode
            </a>
            <a 
              href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              aria-label="Prendre rendez-vous avec Alain Zenatti, hypnothérapeute à Paris 4ème"
              role="button"
            >
              Prendre rendez-vous
            </a>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-white/70 mb-2">✓ Maître Hypnologue certifié</p>
            <p className="text-sm text-white/70 mb-2">✓ Une approche transparente, expliquée à chaque étape</p>
            <p className="text-sm text-white/70">✓ Un accompagnement sur-mesure et collaboratif</p>
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
