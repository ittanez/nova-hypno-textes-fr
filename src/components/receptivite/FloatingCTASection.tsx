import { Button } from '@/components/ui/button';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Brain from 'lucide-react/dist/esm/icons/brain';

interface FloatingCTASectionProps {
  onStartTest: () => void;
}

const FloatingCTASection = ({ onStartTest }: FloatingCTASectionProps) => {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />

          <h2 className="text-2xl md:text-3xl font-bold text-nova-blue-dark mb-4">
            Vous avez des doutes ? Testez maintenant !
          </h2>

          <p className="text-lg text-gray-600 mb-6">
            Découvrez votre potentiel hypnotique en quelques minutes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-sm">30 questions scientifiques</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-sm">Résultats en 3-5 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-sm">Analyse VAKOG complète</span>
            </div>
          </div>

          <Button
            onClick={onStartTest}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-lg transition-all duration-200"
          >
            🧠 Commencer le Test Gratuit
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FloatingCTASection;
