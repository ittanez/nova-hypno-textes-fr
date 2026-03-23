import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/receptivite/HeroSection';
import SEOContent from '@/components/receptivite/SEOContent';
import StepsSection from '@/components/receptivite/StepsSection';
import HowItWorksSection from '@/components/receptivite/HowItWorksSection';
import TestimonialSection from '@/components/receptivite/TestimonialSection';
import FAQSection from '@/components/receptivite/FAQSection';
import FloatingCTASection from '@/components/receptivite/FloatingCTASection';
import { QuestionStep } from '@/components/receptivite/test/QuestionStep';
import { VAKOGStep } from '@/components/receptivite/test/VAKOGStep';
import { EmailStep } from '@/components/receptivite/test/EmailStep';
import { ResultsStep } from '@/components/receptivite/test/ResultsStep';
import { Answer, calculateScore, TestResult } from '@/utils/receptivite/calculateScore';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

const TestReceptivite = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'vakog' | 'email' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<TestResult | null>(null);

  const handleStartTest = () => {
    setCurrentStep('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerSelect = (questionId: number, value: number) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { questionId, value };
        return updated;
      }
      return [...prev, { questionId, value }];
    });
  };

  const handleVAKOGAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { questionId, value };
        return updated;
      }
      return [...prev, { questionId, value }];
    });
  };

  const handleQuestionNext = () => {
    if (currentQuestionIndex < 10) {
      setCurrentQuestionIndex(10);
    } else if (currentQuestionIndex < 20) {
      setCurrentStep('vakog');
    }
  };

  const handleVAKOGNext = () => {
    setCurrentStep('email');
  };

  const handleVAKOGPrevious = () => {
    setCurrentQuestionIndex(10);
    setCurrentStep('questions');
  };

  const handleEmailPrevious = () => {
    setCurrentStep('vakog');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const testResults = calculateScore(answers);
      setResults(testResults);

      const { error: insertError } = await supabase
        .from('hypnokick_results')
        .insert({
          user_email: email,
          first_name: firstName,
          score: testResults.score,
          category: testResults.category,
          dominant_sense: testResults.senseDominant,
          vakog_scores: testResults.vakogScores
        });

      if (insertError) {
        logger.error('Error saving results:', insertError);
      }

      const { error: emailError } = await supabase.functions.invoke('send-hypnokick-results', {
        body: {
          email,
          firstName,
          score: testResults.score,
          category: testResults.category,
          description: testResults.description,
          senseDominant: testResults.senseDominant,
          vakogScores: testResults.vakogScores
        }
      });

      if (emailError) {
        logger.error('Error sending email:', emailError);
        toast.error("Une erreur est survenue lors de l'envoi de l'email");
      } else {
        toast.success('Email envoyé avec succès !');
      }

      setCurrentStep('results');
    } catch (error) {
      logger.error('Error processing results:', error);
      toast.error('Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Test de Réceptivité à l'Hypnose | NovaHypnose</title>
        <meta name="description" content="Évaluez votre réceptivité à l'hypnose avec notre test gratuit de 30 questions. Découvrez votre profil VAKOG et recevez des conseils personnalisés." />
        <link rel="canonical" href="https://novahypnose.fr/test-receptivite" />
        <meta property="og:title" content="Test de Réceptivité à l'Hypnose | NovaHypnose" />
        <meta property="og:description" content="Évaluez votre réceptivité à l'hypnose avec notre test gratuit de 30 questions. Découvrez votre profil VAKOG." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/test-receptivite" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow pt-20">
          {currentStep === 'intro' ? (
            <>
              <HeroSection onStartTest={handleStartTest} />
              <SEOContent />
              <StepsSection />
              <HowItWorksSection />
              <TestimonialSection />
              <FAQSection />
              <FloatingCTASection onStartTest={handleStartTest} />
            </>
          ) : (
            <div className="container mx-auto px-4 py-16 bg-gray-50 min-h-screen">
              {currentStep === 'questions' && (
                <QuestionStep
                  currentQuestionIndex={currentQuestionIndex}
                  onAnswerSelect={handleAnswerSelect}
                  onNext={handleQuestionNext}
                  answers={answers}
                />
              )}

              {currentStep === 'vakog' && (
                <VAKOGStep
                  onAnswerChange={handleVAKOGAnswerChange}
                  onNext={handleVAKOGNext}
                  onPrevious={handleVAKOGPrevious}
                  answers={answers}
                />
              )}

              {currentStep === 'email' && (
                <EmailStep
                  email={email}
                  firstName={firstName}
                  gdprConsent={gdprConsent}
                  onEmailChange={setEmail}
                  onFirstNameChange={setFirstName}
                  onGdprChange={setGdprConsent}
                  onSubmit={handleEmailSubmit}
                  onPrevious={handleEmailPrevious}
                  isSubmitting={isSubmitting}
                />
              )}

              {currentStep === 'results' && results && (
                <ResultsStep
                  results={results}
                  email={email}
                />
              )}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TestReceptivite;
