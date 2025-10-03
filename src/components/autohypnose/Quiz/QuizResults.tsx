
import { Button } from "@/components/ui/button";
import { QuizResult, DimensionResult } from "@/types/quiz";
import { dimensionNames } from "@/data/quizData";
import { Check, Copy, Calendar, AlertTriangle, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
  promoCode: string | null;
  emailSent: boolean;
  emailError?: string | null;
}

const QuizResults = ({ result, onRestart, promoCode, emailSent, emailError }: QuizResultsProps) => {
  const [copied, setCopied] = useState(false);
  
  // Ensure the results are visible when component mounts
  useEffect(() => {
    const resultElement = document.getElementById('quiz-results');
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const getColorForScore = (score: number) => {
    if (score < 40) return "bg-red-500";
    if (score < 60) return "bg-yellow-500";
    if (score < 80) return "bg-harmonia-300";
    return "bg-green-500";
  };

  const formatScore = (score: number) => {
    return Math.round(score);
  };

  const copyPromoCode = () => {
    if (promoCode) {
      navigator.clipboard.writeText(promoCode);
      setCopied(true);
      toast.success("Code promo copié !");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openCalendly = () => {
    window.open("https://calendly.com/zenatti/consultation-d-hypnose-paris-clone", "_blank");
  };

  const openStripeCheckout = () => {
    window.open("https://buy.stripe.com/28og292uN30p3XW3cc", "_blank");
  };

  return (
    <div id="quiz-results" className="quiz-card max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-harmonia-600">Vos résultats</h3>
      
      <div className="mb-8 text-center">
        <p className="text-gray-600 mb-4">
          Voici les résultats de votre test de sérénité. Prenez le temps d'explorer chaque dimension pour comprendre vos forces et vos opportunités d'amélioration.
        </p>
        <div className="flex flex-col items-center mb-6">
          <div className="text-5xl font-bold text-harmonia-600 mb-2">
            {formatScore(result.totalScore)}%
          </div>
          <p className="text-gray-600">Score global de sérénité</p>
        </div>
      </div>
      
      <div className="space-y-6 mb-10">
        <h4 className="text-xl font-bold text-harmonia-500 mb-4">Analyse par dimension</h4>
        
        {result.dimensionScores.map((dimension: DimensionResult, index: number) => (
          <div key={index} className="result-card">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-bold text-harmonia-600">
                {dimensionNames[dimension.name as keyof typeof dimensionNames]}
              </h5>
              <span className="font-bold">{formatScore(dimension.score)}%</span>
            </div>
            <div className="progress-bar mb-4">
              <div 
                className={`progress-value ${getColorForScore(dimension.score)}`}
                style={{ width: `${dimension.score}%` }}
              ></div>
            </div>
            <p className="text-gray-600 text-sm">{dimension.recommendation}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-harmonia-100 p-6 rounded-xl mb-8">
        <h4 className="text-xl font-bold text-harmonia-600 mb-4">Conclusion</h4>
        <p className="text-gray-700">{result.conclusion}</p>
      </div>

      {promoCode && (
        <div className="bg-pink-50 p-6 rounded-xl mb-8 text-center">
          <h4 className="text-xl font-bold text-pink-600 mb-2">Votre code promo</h4>
          <p className="text-gray-600 mb-3">
            Profitez de 50% de réduction sur votre formation Harmonia avec ce code promo valable 3 jours.
          </p>
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="bg-white border-2 border-pink-300 rounded-lg px-4 py-2 font-bold text-2xl text-pink-600">
              {promoCode}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyPromoCode}
              className="bg-white hover:bg-pink-50"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          
          {emailSent ? (
            <p className="text-sm text-green-600 flex items-center justify-center gap-1 mt-2">
              <Check className="h-4 w-4" />
              Un email avec vos résultats détaillés et ce code promo a été envoyé à votre adresse email.
            </p>
          ) : emailError ? (
            <div className="text-sm text-red-600 flex items-center gap-1 mt-2 p-2 bg-red-50 rounded">
              <AlertTriangle className="h-4 w-4" />
              <span>
                L'envoi de l'email a échoué. Veuillez conserver votre code et nous contacter si nécessaire.
                {emailError && (
                  <span className="block text-xs mt-1">Erreur: {emailError}</span>
                )}
              </span>
            </div>
          ) : null}
        </div>
      )}
      
      <div className="text-center space-y-4">
        <Button 
          onClick={openCalendly}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Prendre rendez-vous
        </Button>
        
        <Button 
          onClick={openStripeCheckout}
          className="bg-pink-600 hover:bg-pink-700 text-white w-full flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          S'inscrire
        </Button>
        
        <div>
          <Button 
            variant="link" 
            onClick={onRestart}
            className="text-harmonia-500"
          >
            Refaire le test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
