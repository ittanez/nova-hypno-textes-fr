import { vakogQuestions } from '@/data/receptivite/vakogQuestions';
import { Button } from '@/components/ui/button';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ProgressBar from '../ProgressBar';
import { Answer } from '@/utils/receptivite/calculateScore';

type VAKOGStepProps = {
  onAnswerChange: (questionId: string, value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  answers: Answer[];
};

export const VAKOGStep = ({ onAnswerChange, onNext, onPrevious, answers }: VAKOGStepProps) => {
  const valueLabels = {
    1: "Pas du tout d'accord",
    2: "Plutôt pas d'accord",
    3: "Neutre",
    4: "Plutôt d'accord",
    5: "Tout à fait d'accord"
  };

  const isComplete = vakogQuestions.every((question) => {
    const answer = answers.find(a => a.questionId === question.id);
    return answer !== undefined;
  });

  return (
    <div className="mb-12">
      <ProgressBar currentStep={3} totalSteps={3} />

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-nova-blue-dark mb-4">
          Profil sensoriel VAKOG
        </h2>
        <p className="text-nova-neutral-dark">
          Ces questions me permettent de comprendre votre canal sensoriel dominant pour personnaliser votre accompagnement.
        </p>
      </div>

      <div className="space-y-8">
        {vakogQuestions.map((question) => {
          const currentValue = answers.find(a => a.questionId === question.id)?.value;

          return (
            <div key={question.id} className="p-6 bg-white rounded-lg shadow-md">
              <div className="text-lg font-medium mb-6 text-nova-neutral-dark">
                {question.text}
              </div>

              <div className="px-4">
                {/* Échelle numérique 1-5 */}
                <div className="flex justify-center items-center gap-4 sm:gap-8 mb-4">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => onAnswerChange(question.id, value)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-center transition-all duration-200 font-semibold ${
                        currentValue === value
                          ? 'bg-nova-blue text-white shadow-lg scale-110'
                          : 'bg-white hover:bg-nova-blue/10 hover:shadow-md hover:scale-105 border-2 border-gray-200'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>

                {/* Label de la valeur sélectionnée */}
                {currentValue && (
                  <div className="text-center text-sm text-nova-blue-dark font-medium mt-4">
                    {valueLabels[currentValue as keyof typeof valueLabels]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-8">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>

        <Button
          onClick={onNext}
          disabled={!isComplete}
          className="flex items-center gap-2 bg-nova-blue hover:bg-nova-blue-dark"
        >
          Suivant
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
