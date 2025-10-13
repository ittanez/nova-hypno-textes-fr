import { Button } from '@/components/ui/button';
import { TestResult } from '@/utils/receptivite/calculateScore';
import { Mail } from 'lucide-react';

type ResultsStepProps = {
  results: TestResult;
  email: string;
};

export const ResultsStep = ({ results, email }: ResultsStepProps) => {
  const handleRestart = () => {
    window.location.reload();
  };

  const getScoreColor = (score: number) => {
    if (score >= 97) return 'text-green-600';
    if (score >= 73) return 'text-blue-600';
    if (score >= 49) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-nova-blue-dark mb-6 text-center">
          Vos Résultats
        </h1>

        {/* Score global */}
        <div className="bg-nova-blue-light rounded-lg p-6 mb-6 text-center">
          <div className="text-lg font-medium text-nova-neutral-dark mb-2">
            Votre score de réceptivité
          </div>
          <div className={`text-5xl font-bold ${getScoreColor(results.score)} mb-2`}>
            {results.score} / 120
          </div>
          <div className="text-xl font-semibold text-nova-blue-dark">
            {results.category}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-nova-blue-dark mb-3">
            Analyse de votre profil
          </h2>
          <p className="text-nova-neutral-dark leading-relaxed">
            {results.description}
          </p>
        </div>

        {/* Sens dominant VAKOG */}
        {results.senseDominant && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-nova-blue-dark mb-3">
              Votre canal sensoriel dominant
            </h2>
            <div className="text-2xl font-semibold text-nova-blue mb-2">
              {results.senseDominant}
            </div>
            <p className="text-nova-neutral-dark">
              Ce canal sensoriel sera privilégié dans votre accompagnement pour optimiser votre expérience hypnotique.
            </p>
          </div>
        )}

        {/* Scores VAKOG détaillés */}
        {results.vakogScores && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-nova-blue-dark mb-3">
              Répartition de vos canaux sensoriels
            </h3>
            <div className="space-y-3">
              {Object.entries(results.vakogScores).map(([key, value]) => {
                const labels: Record<string, string> = {
                  V: 'Visuel',
                  A: 'Auditif',
                  K: 'Kinesthésique',
                  O: 'Olfactif',
                  G: 'Gustatif'
                };
                const percentage = (value / 10) * 100;

                return (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-nova-neutral-dark">
                        {labels[key]}
                      </span>
                      <span className="text-sm font-medium text-nova-blue">
                        {value}/10
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-nova-blue h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Email notification */}
        {email && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <Mail className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">
                Email envoyé avec succès !
              </p>
              <p className="text-green-700 text-sm">
                Vos résultats détaillés ont été envoyés à <strong>{email}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="bg-nova-blue-light rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-nova-blue-dark mb-3">
            Prêt(e) à explorer l'hypnose ?
          </h3>
          <p className="text-nova-neutral-dark mb-4">
            Que vous soyez débutant ou que vous souhaitiez approfondir votre pratique,
            je vous accompagne dans votre parcours avec des séances personnalisées adaptées à votre profil.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => window.location.href = 'https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris'}
              className="bg-nova-green hover:bg-nova-green-dark"
            >
              Prendre rendez-vous
            </Button>
            <Button
              onClick={() => window.location.href = '/#contact'}
              variant="outline"
            >
              En savoir plus
            </Button>
          </div>
        </div>

        {/* Bouton refaire le test */}
        <div className="text-center">
          <Button
            onClick={handleRestart}
            variant="outline"
            className="border-nova-blue text-nova-blue hover:bg-nova-blue hover:text-white"
          >
            Refaire le test
          </Button>
        </div>
      </div>
    </div>
  );
};
