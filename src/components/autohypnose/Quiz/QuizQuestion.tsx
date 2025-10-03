import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Question, Option, Answer } from "@/types/quiz";

interface QuizQuestionProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswerSelected: (answer: Answer) => void;
  onPreviousQuestion: () => void;
}

const QuizQuestion = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswerSelected,
  onPreviousQuestion
}: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Automatically proceed to the next question when an option is selected
  useEffect(() => {
    if (selectedOption) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 300); // Small delay for better UX
      return () => clearTimeout(timer);
    }
  }, [selectedOption]);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      onAnswerSelected({
        questionId: question.id,
        optionId: selectedOption.id,
        score: selectedOption.score,
        dimension: question.dimension
      });
      setSelectedOption(null);
    }
  };

  return (
    <div className="quiz-card max-w-3xl mx-auto" role="region" aria-label="Question de quiz">
      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-500">
          Question {currentQuestionIndex + 1} sur {totalQuestions}
        </div>
        <div className="h-2 w-full max-w-[200px] bg-gray-200 rounded-full ml-4" role="progressbar" aria-valuenow={currentQuestionIndex + 1} aria-valuemin={1} aria-valuemax={totalQuestions} aria-label={`Progression: question ${currentQuestionIndex + 1} sur ${totalQuestions}`}>
          <div
            className="h-full bg-harmonia-500 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-6 text-harmonia-600" id={`question-${question.id}`}>{question.text}</h3>

      <fieldset className="space-y-4 mb-8" aria-labelledby={`question-${question.id}`}>
        <legend className="sr-only">Choisissez votre réponse</legend>
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`quiz-option touch-target-mobile ${
              selectedOption?.id === option.id ? "selected" : ""
            }`}
          >
            <label className="flex items-center cursor-pointer w-full p-2">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.id}
                checked={selectedOption?.id === option.id}
                onChange={() => handleOptionClick(option)}
                className="sr-only"
                aria-describedby={`option-${option.id}-text`}
              />
              <div className="h-5 w-5 rounded-full border-2 border-harmonia-300 flex-shrink-0 mr-3" aria-hidden="true">
                {selectedOption?.id === option.id && (
                  <div className="h-3 w-3 m-0.5 rounded-full bg-harmonia-500"></div>
                )}
              </div>
              <span className="text-gray-700" id={`option-${option.id}-text`}>{option.text}</span>
            </label>
          </div>
        ))}
      </fieldset>

      <div className="flex justify-between">
        {currentQuestionIndex > 0 ? (
          <Button
            variant="outline"
            className="border-harmonia-300 text-harmonia-500 touch-target-mobile"
            onClick={onPreviousQuestion}
            aria-label="Revenir à la question précédente"
          >
            Précédent
          </Button>
        ) : (
          <div></div>
        )}
        {/* We keep the button but hide it since we auto-advance */}
        <Button
          onClick={handleNextQuestion}
          disabled={!selectedOption}
          className={`btn-primary touch-target-mobile ${!selectedOption ? "opacity-50 cursor-not-allowed" : "hidden"}`}
          aria-label={currentQuestionIndex === totalQuestions - 1 ? "Terminer le quiz" : "Passer à la question suivante"}
        >
          {currentQuestionIndex === totalQuestions - 1 ? "Terminer" : "Suivant"}
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;
