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
import { QuestionStepTest } from '@/components/receptivite/test/QuestionStepTest';
import { EmailStep } from '@/components/receptivite/test/EmailStep';
import { ResultsStepTest } from '@/components/receptivite/test/ResultsStepTest';
import { AnswerTest, calculateScoreTest } from '@/utils/receptivite/calculateScoreTest';
import { receptiviteQuestionsTest } from '@/data/receptivite/questionsTest';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

const TestReceptiviteTest = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'email' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerTest[]>([]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartTest = () => {
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerSelect = (questionId: string, value: number) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { questionId, value };
        return updated;
      }
      return [...prev, { questionId, value }];
    });

    // Avancement automatique vers la question suivante ou l'étape email
    if (currentQuestionIndex < receptiviteQuestionsTest.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStep('email');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuestionPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStep('intro');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEmailPrevious = () => {
    setCurrentQuestionIndex(receptiviteQuestionsTest.length - 1);
    setCurrentStep('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const testResults = calculateScoreTest(answers);

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

      // Appel vers la nouvelle edge function Brevo (test)
      const { error: emailError } = await supabase.functions.invoke('send-hypnokick-results-brevo', {
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
        <title>Test de Réceptivité à l'Hypnose — Page de test | NovaHypnose</title>
        <meta name="robots" content="noindex, nofollow" />
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
            <div className="bg-gray-50 min-h-screen">
              {currentStep === 'questions' && (
                <QuestionStepTest
                  currentQuestionIndex={currentQuestionIndex}
                  onAnswerSelect={handleAnswerSelect}
                  onPrevious={handleQuestionPrevious}
                  answers={answers}
                />
              )}

              {currentStep === 'email' && (
                <div className="container mx-auto px-4 py-16">
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
                </div>
              )}

              {currentStep === 'results' && (
                <ResultsStepTest firstName={firstName} />
              )}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TestReceptiviteTest;
