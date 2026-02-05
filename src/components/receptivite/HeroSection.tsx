import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Brain from 'lucide-react/dist/esm/icons/brain';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStartTest: () => void;
}

const HeroSection = ({ onStartTest }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">

          {/* Text Content - Left Side */}
          <div className="flex-1 text-left max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="inline-block w-2 h-2 bg-pink-500 rounded-full"></span>
              <span className="text-sm text-gray-700">
                Test gratuit avec votre hypnothérapeute à Paris : Révélez votre potentiel hypnotique
              </span>
            </div>

            {/* Main Titles */}
            <h1 className="mb-4">
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-purple-600 mb-2">
                Suis-je hypnotisable ?
              </span>
              <span className="block text-4xl md:text-5xl font-bold text-blue-500 mb-2">
                Test gratuit à Paris
              </span>
              <span className="block text-3xl md:text-4xl font-bold text-blue-500">
                Découvrez votre réceptivité en quelques minutes
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-700 mb-2 leading-relaxed">
              <strong>Test de 30 questions pour évaluer votre réceptivité</strong> développé par un
              hypnothérapeute à Paris. Analysez votre réceptivité à l'hypnose et
              découvrez vos canaux sensoriels dominants (VAKOG).
            </p>
            <p className="text-base text-gray-600 mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span><strong>Durée estimée :</strong> 3-5 minutes</span>
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">Test basé sur la science hypnotique</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm">Résultats personnalisés immédiats</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Brain className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <span className="text-sm">Analyse VAKOG complète</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm">Hypnothérapeute certifié Paris</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex flex-col gap-2">
                <Button
                  onClick={onStartTest}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-bold px-8 py-7 text-lg rounded-lg shadow-lg transition-all duration-200"
                >
                  🧠 Test Gratuit
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Gratuit • Résultats immédiats • Sans engagement
                </p>
              </div>
              <Button
                onClick={() => window.location.href = 'https://novahypnose.fr'}
                variant="outline"
                size="lg"
                className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 font-medium px-6 py-6 text-base rounded-lg"
              >
                Hypnothérapeute Paris - En savoir plus
              </Button>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="flex-1 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/hypnotisable.webp"
                alt="Alain Zenatti - Hypnothérapeute certifié à Paris - Test gratuit de réceptivité à l'hypnose"
                className="w-full h-auto"
                loading="eager"
              />
              {/* Badge "+2000 tests" */}
              <div className="absolute bottom-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-green-500"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                  <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  +2000 tests réalisés à Paris
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
