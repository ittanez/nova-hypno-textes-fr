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
import { EmailStep, Localisation } from '@/components/receptivite/test/EmailStep';
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
  const [localisation, setLocalisation] = useState<Localisation>('');
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
      // Sauvegarde en base (non bloquant si la table n'existe pas encore)
      const { error: insertError } = await supabase
        .from('hypnokick_results')
        .insert({
          user_email: email,
          first_name: firstName,
          localisation,
          score: testResults.score,
          category: testResults.category,
          dominant_sense: testResults.senseDominant,
          vakog_scores: testResults.vakogScores
        });

      if (insertError) {
        logger.error('Error saving results to DB:', insertError);
      }

      // Envoi email via Brevo
      const { error: emailError, data: emailData } = await supabase.functions.invoke('send-hypnokick-results-brevo', {
        body: {
          email,
          firstName,
          localisation,
          score: testResults.score,
          category: testResults.category,
          description: testResults.description,
          senseDominant: testResults.senseDominant,
          vakogScores: testResults.vakogScores
        }
      });

      if (emailError) {
        logger.error('Error sending email via Brevo:', emailError);
        toast.error("Une erreur est survenue lors de l'envoi de l'email");
      } else {
        logger.info('Brevo response:', emailData);
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
        <meta name="description" content="Évaluez votre réceptivité à l'hypnose avec notre test gratuit. Découvrez votre profil et recevez des conseils personnalisés." />
        <link rel="canonical" href="https://novahypnose.fr/test-receptivite" />
        <meta property="og:title" content="Test de Réceptivité à l'Hypnose | NovaHypnose" />
        <meta property="og:description" content="Évaluez votre réceptivité à l'hypnose avec notre test gratuit. Découvrez votre profil et recevez des conseils personnalisés." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/test-receptivite" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
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
                    localisation={localisation}
                    gdprConsent={gdprConsent}
                    onEmailChange={setEmail}
                    onFirstNameChange={setFirstName}
                    onLocalisationChange={setLocalisation}
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
