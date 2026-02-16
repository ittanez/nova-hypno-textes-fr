
import React from 'react';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';

const Hero = () => {
  return (
    <section id="intro" className="min-h-screen flex flex-col justify-center md:justify-start relative overflow-hidden">
      {/* Suppression de l'image d'arrière-plan pour améliorer les performances */}
      <div className="absolute inset-0 bg-gradient-to-br from-nova-blue-dark via-nova-blue to-nova-green-light" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 py-24 md:pt-40 md:pb-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Modification du H1 principal pour le SEO */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white animate-fade-in speakable" data-speakable="true">
            Libérez-vous du Stress, de l'Anxiété et des Phobies
          </h1>

          <p className="text-xl md:text-2xl mb-6 text-white/90 leading-relaxed speakable" data-speakable="true">
            Vous souffrez de <strong>stress chronique</strong>, <strong>troubles du sommeil</strong>, <strong>anxiété</strong> ou <strong>phobies</strong> ?
          </p>
          <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
            L'hypnose ericksonienne peut vous aider à retrouver sérénité et confiance en vous.
          </p>
          <p className="text-base md:text-lg mb-12 text-white/80 leading-relaxed">
            Accompagnement par un <strong>Maître Hypnologue certifié</strong> à Paris • Résultats visibles dès 3 à 5 séances
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
            <div className="flex flex-col items-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                aria-label="Réserver ma première consultation avec Alain Zenatti, hypnothérapeute à Paris 4ème"
                role="button"
              >
                Réserver ma première consultation
              </a>
              <p className="text-sm text-white/80 mt-2">Premier échange gratuit de 15 min par téléphone</p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2.5">
              <div className="flex" aria-hidden="true">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <span className="text-white font-semibold text-sm">5/5</span>
              <span className="text-white/70 text-sm">— 40+ avis Google vérifiés</span>
            </div>
          </div>

          <div className="mt-4 text-center">
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
