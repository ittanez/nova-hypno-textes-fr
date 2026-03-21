import { Button } from '@/components/ui/button';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

type ResultsStepTestProps = {
  firstName: string;
};

export const ResultsStepTest = ({ firstName }: ResultsStepTestProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-10 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-nova-blue" />
        </div>

        <h1 className="text-2xl font-bold text-nova-blue-dark mb-4">
          Merci {firstName} !
        </h1>

        <p className="text-nova-neutral-dark text-lg leading-relaxed mb-8">
          Vos résultats personnalisés arrivent dans votre boîte mail dans quelques instants.
          Pensez à vérifier vos spams.
        </p>

        <Button
          onClick={() => window.location.href = 'https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris'}
          className="bg-nova-blue hover:bg-nova-blue-dark text-white px-8 py-3 text-base"
        >
          Prendre rendez-vous →
        </Button>
      </div>
    </div>
  );
};
