import { useEffect, useState } from 'react';
import { receptiviteQuestionsTest } from '@/data/receptivite/questionsTest';
import { Button } from '@/components/ui/button';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import { AnswerTest } from '@/utils/receptivite/calculateScoreTest';

type QuestionStepTestProps = {
  currentQuestionIndex: number;
  onAnswerSelect: (questionId: string, value: number) => void;
  onPrevious: () => void;
  answers: AnswerTest[];
};

const valueLabels: Record<number, string> = {
  1: "Jamais",
  2: "Rarement",
  3: "Parfois",
  4: "Souvent",
  5: "Toujours"
};

export const QuestionStepTest = ({
  currentQuestionIndex,
  onAnswerSelect,
  onPrevious,
  answers,
}: QuestionStepTestProps) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const question = receptiviteQuestionsTest[currentQuestionIndex];
  const totalQuestions = receptiviteQuestionsTest.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Restaurer la réponse précédente lors du retour en arrière
  useEffect(() => {
    const existing = answers.find(a => a.questionId === question.id);
    setSelectedValue(existing ? existing.value : null);
  }, [currentQuestionIndex, question.id, answers]);

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    // Délai court pour le retour visuel avant l'avancement automatique
    setTimeout(() => {
      onAnswerSelect(question.id, value);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Progression */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-nova-blue-dark">
            Question {currentQuestionIndex + 1} / {totalQuestions}
          </span>
          <span className="text-sm font-medium text-nova-blue-dark">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-nova-blue h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Carte question */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mb-8">
        <p className="text-xl font-medium text-nova-neutral-dark text-center leading-relaxed mb-10">
          {question.text}
        </p>

        {/* Boutons de réponse avec labels */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleSelect(value)}
              className={`w-full py-4 px-6 rounded-lg text-left font-medium transition-all duration-200 border-2 ${
                selectedValue === value
                  ? 'bg-nova-blue text-white border-nova-blue shadow-md scale-[1.02]'
                  : 'bg-white text-nova-neutral-dark border-gray-200 hover:border-nova-blue hover:bg-nova-blue/5'
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  selectedValue === value
                    ? 'bg-white text-nova-blue'
                    : 'bg-gray-100 text-nova-neutral-dark'
                }`}>
                  {value}
                </span>
                {valueLabels[value]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bouton Précédent */}
      <div className="w-full max-w-2xl">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>
      </div>
    </div>
  );
};
