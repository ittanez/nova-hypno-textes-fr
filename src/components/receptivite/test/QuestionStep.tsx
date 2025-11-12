import { receptiviteQuestions } from '@/data/receptivite/questions';
import { Button } from '@/components/ui/button';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ProgressBar from '../ProgressBar';
import { Answer } from '@/utils/receptivite/calculateScore';

type QuestionStepProps = {
  currentQuestionIndex: number;
  onAnswerSelect: (questionId: number, value: number) => void;
  onNext: () => void;
  answers: Answer[];
};

export const QuestionStep = ({
  currentQuestionIndex,
  onAnswerSelect,
  onNext,
  answers,
}: QuestionStepProps) => {
  const questionsPerPage = 10;
  const currentPage = Math.floor(currentQuestionIndex / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const pageQuestions = receptiviteQuestions.slice(startIndex, startIndex + questionsPerPage);

  const valueLabels = {
    1: "Pas du tout d'accord",
    2: "Plutôt pas d'accord",
    3: "Neutre",
    4: "Plutôt d'accord",
    5: "Tout à fait d'accord"
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      window.history.back();
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onNext();
  };

  const isPageComplete = pageQuestions.every((question) => {
    const answer = answers.find(a => a.questionId === question.id);
    return answer !== undefined;
  });

  return (
    <div className="mb-12">
      <ProgressBar
        currentStep={currentPage + 1}
        totalSteps={3}
      />

      <div className="space-y-8">
        {pageQuestions.map((question) => {
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
                      onClick={() => onAnswerSelect(question.id, value)}
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
          onClick={handlePrevious}
          variant="outline"
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isPageComplete}
          className="flex items-center gap-2 bg-nova-blue hover:bg-nova-blue-dark"
        >
          Suivant
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
