/**
 * PreviewCharteTestReceptivite — Test de réceptivité à l'hypnose, charte risographie.
 * Remplace TestReceptiviteTest pour la route /test-receptivite.
 */

import { useState } from 'react';
import { Helmet } from 'react-helmet';
import CzLayout from '@/components/charte/CzLayout';
import { QuestionStepTest } from '@/components/receptivite/test/QuestionStepTest';
import { EmailStep, Localisation } from '@/components/receptivite/test/EmailStep';
import { ResultsStepTest } from '@/components/receptivite/test/ResultsStepTest';
import { AnswerTest, calculateScoreTest } from '@/utils/receptivite/calculateScoreTest';
import { receptiviteQuestionsTest } from '@/data/receptivite/questionsTest';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const PreviewCharteTestReceptivite = () => {
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
    <CzLayout>
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
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Test de Réceptivité à l'Hypnose | NovaHypnose" />
        <meta name="twitter:description" content="Évaluez votre réceptivité à l'hypnose avec notre test gratuit. Découvrez votre profil et recevez des conseils personnalisés." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
      </Helmet>

      {currentStep === 'intro' ? (
        <>
          {/* Hero */}
          <section className="sp-hero">
            <div className="sp-hero__bg" aria-hidden="true">
              <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
                <g filter="url(#riso-full)">
                  <path d="M 200 60 C 400 20, 700 60, 900 160 C 1040 230, 1150 240, 1280 180 C 1360 140, 1440 170, 1440 250 L 1440 0 L 0 0 L 0 200 C 60 130, 130 80, 200 60 Z" fill="#F2A12E" opacity="0.9" />
                </g>
                <g filter="url(#riso-full)" style={{mixBlendMode:'multiply'}}>
                  <path d="M 0 720 C 200 660, 500 640, 800 680 C 1100 720, 1280 700, 1440 740 L 1440 900 L 0 900 Z" fill="#2B4BA0" opacity="0.88" />
                </g>
                <rect width="1440" height="900" filter="url(#paperGrain)" opacity=".2" />
              </svg>
            </div>
            <div className="container sp-hero__inner reveal">
              <div className="tag">Réceptivité à l'hypnose — Test gratuit</div>
              <h1 className="sp-hero__h1">
                Êtes-vous réceptif<br/><em>à l'hypnose ?</em>
              </h1>
              <p className="sp-hero__lead">
                Découvrez votre profil en 10 minutes. Recevez une analyse personnalisée par email et des conseils adaptés à votre réceptivité.
              </p>
              <div className="hero__cta">
                <button className="btn btn--primary" onClick={handleStartTest}>
                  Commencer le test <span className="arrow">→</span>
                </button>
                <a className="btn btn--ghost" href="/autohypnose">Auto-hypnose</a>
              </div>
            </div>
          </section>

          {/* Comment ça fonctionne */}
          <section className="sp-section sp-section--alt">
            <div className="container sp-narrow">
              <h2 className="sp-h2">Comment ça fonctionne ?</h2>
              <div className="sp-checklist">
                {[
                  "Répondez à 15 questions sur vos expériences et ressentis",
                  "Découvrez votre score de réceptivité et votre profil sensoriel",
                  "Recevez une analyse personnalisée par email",
                  "Obtenez des conseils pratiques adaptés à votre profil",
                ].map((item, i) => (
                  <div key={i} className="sp-check-item">
                    <CheckCircle size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA repeat */}
          <section className="sp-cta-final">
            <div className="container sp-narrow">
              <h2 className="sp-h2">Prêt à découvrir votre profil ?</h2>
              <p className="sp-lead">Gratuit · 10 minutes · Résultats par email</p>
              <div className="hero__cta" style={{justifyContent:'center'}}>
                <button className="btn btn--primary" onClick={handleStartTest}
                        style={{background:'var(--lin)', color:'var(--cobalt)'}}>
                  Commencer le test <span className="arrow">→</span>
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div style={{ background: 'var(--lin)', minHeight: '100vh' }}>
          {currentStep === 'questions' && (
            <QuestionStepTest
              currentQuestionIndex={currentQuestionIndex}
              onAnswerSelect={handleAnswerSelect}
              onPrevious={handleQuestionPrevious}
              answers={answers}
            />
          )}

          {currentStep === 'email' && (
            <div className="container" style={{ padding: '64px 24px' }}>
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
    </CzLayout>
  );
};

export default PreviewCharteTestReceptivite;
