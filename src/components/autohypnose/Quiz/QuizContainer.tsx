
import { useState, useEffect, useRef } from "react";
import { Answer, DimensionResult, QuizResult, UserData } from "@/types/quiz";
import { quizQuestions, getDimensionRecommendation, getOverallConclusion, dimensionNames } from "@/data/quizData";
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";
import UserForm from "./UserForm";
import QuizResults from "./QuizResults";
import { toast } from "@/components/ui/sonner";
import { saveQuizResult, assignPromoCode, sendQuizResultsEmail } from "@/services/quizService";
import { trackQuizStep, trackConversion, trackFormInteraction } from "@/lib/analytics";

const QuizContainer = () => {
  // Quiz states
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  
  const quizSectionRef = useRef<HTMLDivElement>(null);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowUserForm(false);
    setUserData(null);
    setQuizResult(null);
    setPromoCode(null);
    setEmailSent(false);
    setEmailError(null);
    
    // Track quiz start
    trackQuizStep('quiz_started');
    
    // Scroll to the quiz section when starting
    setTimeout(() => {
      if (quizSectionRef.current) {
        quizSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAnswerSelected = (answer: Answer) => {
    const newAnswers = [...answers];
    // Check if this question was already answered
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === answer.questionId);
    
    if (existingAnswerIndex !== -1) {
      // Update existing answer
      newAnswers[existingAnswerIndex] = answer;
    } else {
      // Add new answer
      newAnswers.push(answer);
    }
    
    setAnswers(newAnswers);
    
    // Track quiz step
    trackQuizStep('question_answered', {
      question_id: answer.questionId,
      question_index: currentQuestionIndex + 1,
      answer_score: answer.score,
      dimension: answer.dimension
    });
    
    // Move to next question or show user form if all questions answered
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      trackQuizStep('quiz_completed');
      setShowUserForm(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleUserFormSubmit = async (data: UserData) => {
    setIsSubmitting(true);
    setUserData(data);

    // Track form submission
    trackFormInteraction('user_data_form', 'submitted');

    let assignedPromoCode: string | null = null;

    try {
      // Calculate quiz results
      const result = calculateResults();
      setQuizResult(result);

      // Save results to Supabase
      await saveQuizResult({
        userData: data,
        quizResult: result,
        answers: answers,
      });

      // Assign promo code
      try {
        assignedPromoCode = await assignPromoCode(data.email);
        setPromoCode(assignedPromoCode);
        console.log("Promo code assigned:", assignedPromoCode);

        // Only attempt to send email if we have a promo code
        if (assignedPromoCode) {
          try {
            // Send email with results
            console.log("Sending email with quiz results to", data.email);
            const emailResult = await sendQuizResultsEmail(data, result, assignedPromoCode);

            setEmailSent(emailResult.success);

            if (emailResult.success) {
              console.log("Email sent successfully");
              toast.success("Un email avec vos résultats a été envoyé à votre adresse.");
            } else {
              console.error("Email sending failed:", emailResult.error);
              setEmailError(emailResult.error || "Raison inconnue");
              toast.error(`L'envoi de l'email a échoué. ${emailResult.error || "Veuillez réessayer plus tard."}`);
            }
          } catch (emailError) {
            console.error("Exception during email sending:", emailError);
            setEmailError(emailError instanceof Error ? emailError.message : String(emailError));
            toast.error("Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer plus tard.");
          }
        }
      } catch (error) {
        console.error("Failed to assign promo code:", error);
        toast.error("Impossible d'attribuer un code promo. Veuillez nous contacter.");
      }

      // Track conversion
      trackConversion({
        event_name: 'quiz_completed',
        currency: 'EUR',
        value: 300, // Formation price
        custom_parameters: {
          quiz_score: result.totalScore,
          user_email: data.email,
          promo_code: assignedPromoCode
        }
      });

      toast.success("Votre test a été complété avec succès!");

    } catch (error) {
      console.error("Error processing quiz results:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateResults = () => {
    // Create a map to store scores by dimension
    const dimensionScoresMap: { [key: string]: number[] } = {};
    
    // Collect scores by dimension
    answers.forEach(answer => {
      if (!dimensionScoresMap[answer.dimension]) {
        dimensionScoresMap[answer.dimension] = [];
      }
      // Important: Use the actual score from the answer (0-100 scale)
      dimensionScoresMap[answer.dimension].push(answer.score);
    });
    
    // Calculate average score for each dimension
    const dimensionResults: DimensionResult[] = Object.keys(dimensionScoresMap).map(dimension => {
      const scores = dimensionScoresMap[dimension];
      
      // Calculate the average score (scores are already in percentage 0-100)
      const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      
      // Ensure score is between 0-100%
      const normalizedScore = Math.min(100, Math.max(0, averageScore));
      
      return {
        dimension,
        name: dimension,
        score: normalizedScore,
        maxScore: 100,
        percentage: normalizedScore,
        recommendation: getDimensionRecommendation(dimension, normalizedScore / 20) // Convert to 0-5 scale for recommendation
      };
    });
    
    // Calculate overall score as the average of dimension scores
    const totalScore = dimensionResults.reduce((sum, dimension) => sum + dimension.score, 0) / dimensionResults.length;
    
    // Ensure total score is between 0-100%
    const normalizedTotalScore = Math.min(100, Math.max(0, totalScore));
    
    // Create result object
    const result: QuizResult = {
      totalScore: normalizedTotalScore,
      score: normalizedTotalScore,
      totalQuestions: quizQuestions.length,
      answers: {},
      dimensionScores: dimensionResults,
      conclusion: getOverallConclusion(normalizedTotalScore / 20) // Convert to 0-5 scale for conclusion
    };
    
    return result;
  };

  return (
    <section id="quiz" className="py-20 bg-nova-blue-light" ref={quizSectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-nova-blue-dark font-serif">
          Évaluez votre niveau de sérénité
        </h2>
        
        {!quizStarted && !quizResult && (
          <QuizIntro onStart={startQuiz} />
        )}
        
        {quizStarted && !showUserForm && !quizResult && (
          <QuizQuestion
            question={quizQuestions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quizQuestions.length}
            onAnswerSelected={handleAnswerSelected}
            onPreviousQuestion={handlePreviousQuestion}
          />
        )}
        
        {showUserForm && !quizResult && (
          <UserForm onSubmit={handleUserFormSubmit} isSubmitting={isSubmitting} />
        )}
        
        {quizResult && (
          <QuizResults 
            result={quizResult} 
            onRestart={startQuiz} 
            promoCode={promoCode}
            emailSent={emailSent}
            emailError={emailError}
          />
        )}
      </div>
    </section>
  );
};

export default QuizContainer;
