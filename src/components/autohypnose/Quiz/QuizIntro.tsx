
import { Button } from "@/components/ui/button";

interface QuizIntroProps {
  onStart: () => void;
}

const QuizIntro = ({ onStart }: QuizIntroProps) => {
  return (
    <div className="quiz-card max-w-3xl mx-auto text-center">
      <h3 className="text-2xl font-bold mb-4 text-harmonia-600">Test de sérénité Harmonia</h3>
      <p className="text-gray-600 mb-4">
        Découvrez votre niveau actuel de sérénité en répondant à 18 questions couvrant 5 dimensions essentielles de votre bien-être.
      </p>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h4 className="font-bold text-blue-800 mb-2">Pourquoi faire ce test ?</h4>
        <p className="text-blue-700 text-sm">
          Ce test vous aide à identifier vos forces et les domaines à améliorer avant votre formation. 
          Il me permet de personnaliser votre parcours d'apprentissage en auto-hypnose en fonction de vos besoins spécifiques. 
          Vous recevrez des recommandations ciblées pour optimiser votre expérience de formation.
        </p>
      </div>
      
      <div className="mb-8">
        <ul className="space-y-2 text-left max-w-xl mx-auto">
          <li className="flex items-start">
            <span className="text-harmonia-500 font-bold mr-2">•</span>
            <span className="text-gray-600">
              <strong>Durée :</strong> Environ 2 minutes
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-harmonia-500 font-bold mr-2">•</span>
            <span className="text-gray-600">
              <strong>Objectif :</strong> Évaluer votre niveau de sérénité dans 5 dimensions clés
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-harmonia-500 font-bold mr-2">•</span>
            <span className="text-gray-600">
              <strong>Résultat :</strong> Un score global et des recommandations personnalisées
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-harmonia-500 font-bold mr-2">•</span>
            <span className="text-gray-600">
              <strong>Confidentialité :</strong> Vos réponses sont confidentielles
            </span>
          </li>
        </ul>
      </div>
      
      <div className="bg-harmonia-50 p-4 rounded-lg mb-8">
        <h4 className="font-bold text-harmonia-600 mb-2">Les 5 dimensions évaluées</h4>
        <ul className="space-y-1 text-gray-600 text-left max-w-xl mx-auto">
          <li className="flex items-start">
            <span className="text-harmonia-500 font-bold mr-2">1.</span>
            <span>Gestion du stress quotidien</span>
          </li>
          <li className="flex items-start">
            <span className="text-harmonia-500 font-bold mr-2">2.</span>
            <span>Qualité du sommeil</span>
          </li>
          <li className="flex items-start">
            <span className="text-harmonia-500 font-bold mr-2">3.</span>
            <span>Sentiment de sécurité intérieure</span>
          </li>
          <li className="flex items-start">
            <span className="text-harmonia-500 font-bold mr-2">4.</span>
            <span>Relation avec soi-même</span>
          </li>
          <li className="flex items-start">
            <span className="text-harmonia-500 font-bold mr-2">5.</span>
            <span>Impact du stress sur les relations</span>
          </li>
        </ul>
      </div>
      
      <Button onClick={onStart} className="btn-primary text-lg">
        Commencer le test
      </Button>
    </div>
  );
};

export default QuizIntro;
