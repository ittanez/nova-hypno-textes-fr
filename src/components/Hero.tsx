
import { ArrowDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)'
      }}
      role="banner"
      aria-label="Section d'accueil"
    >
      {/* Contenu principal */}
      <div className={`relative z-10 text-center text-white px-4 max-w-4xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="block">Hypnose Ericksonienne</span>
          <span className="block text-white">à Paris</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90 max-w-3xl mx-auto">
          Accompagnement thérapeutique avec <strong>Alain Zenatti</strong>, Maître Hypnologue. 
          Retrouvez confiance, équilibre et vitalité grâce à l'hypnose ericksonienne.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
            className="bg-nova-green hover:bg-nova-green-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Prendre rendez-vous avec Alain Zenatti"
          >
            Prendre Rendez-vous
          </a>
          
          <a 
            href="tel:0649358089"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            aria-label="Appeler le cabinet au 06 49 35 80 89"
          >
            06 49 35 80 89
          </a>
        </div>
        
        <div className="mt-8 text-sm opacity-75">
          <p>📍 Cabinet à Paris 4ème - Quartier Marais Bastille</p>
          <p>🌿 Séances en cabinet ou Hypno-Balades en forêt</p>
        </div>
      </div>
      
      {/* Indicateur de scroll optimisé */}
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-blue-200 transition-colors duration-300 animate-bounce"
        aria-label="Faire défiler vers la section suivante"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
