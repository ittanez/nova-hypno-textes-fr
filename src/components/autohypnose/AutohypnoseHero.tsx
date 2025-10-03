
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { memo } from 'react';

// Memoize the Hero component to prevent unnecessary re-renders
const Hero = memo(() => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Image de fond avec overlay sombre */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/harmonia/autohypnosepartcipants.webp)',
        }}
        aria-hidden="true"
      >
        {/* Overlay gradient sombre pour rendre le texte lisible */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>
      </div>

      <div className="container mx-auto px-4 py-24 md:pt-40 md:pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white font-serif leading-tight animate-fade-in"
            id="main-heading"
          >
            Auto-hypnose à Paris Bastille – Formation pour gérer le stress
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
            Apprenez les techniques de relaxation mentale et d'auto-régulation émotionnelle en une journée. Cet atelier bien-être Paris vous permettra de développer votre autonomie psychologique et de créer des ancrages positifs durables avec un hypnothérapeute certifié.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://buy.stripe.com/28og292uN30p3XW3cc"
              className="px-8 py-4 bg-nova-green text-white rounded-full shadow-lg hover:bg-nova-green-dark transition-colors text-lg font-semibold"
              rel="noopener"
            >
              Inscrivez-vous maintenant
            </a>
            <a
              href="#program"
              className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors text-lg font-semibold"
            >
              En savoir plus
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2 text-white">✨ Techniques de relaxation</h3>
              <p className="text-white/80 text-sm">Auto-hypnose et auto-régulation émotionnelle</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2 text-white">👥 Petit groupe</h3>
              <p className="text-white/80 text-sm">Max 6 participants</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2 text-white">🎯 Ancrages positifs</h3>
              <p className="text-white/80 text-sm">Techniques immédiatement applicables</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2 text-white">⭐ Expertise certifiée</h3>
              <p className="text-white/80 text-sm">Hypnothérapeute certifié (5★)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center animate-bounce z-10">
        <a
          href="#serenity-test"
          className="focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2"
        >
          <ChevronDown size={40} className="text-white" />
        </a>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
