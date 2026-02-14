import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuizContainer from '@/components/autohypnose/Quiz/QuizContainer';

const AutohypnoseQuiz = () => {
  return (
    <>
      <Helmet>
        <title>Quiz Auto-évaluation - Formation Auto-hypnose | NovaHypnose</title>
        <meta
          name="description"
          content="Évaluez votre niveau de stress et découvrez comment l'auto-hypnose peut vous aider. Quiz gratuit et personnalisé."
        />
        <meta property="og:title" content="Quiz Auto-évaluation - Formation Auto-hypnose | NovaHypnose" />
        <meta property="og:description" content="Évaluez votre niveau de stress et découvrez comment l'auto-hypnose peut vous aider. Quiz gratuit et personnalisé." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/autohypnose/quiz" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Quiz Auto-évaluation - Formation Auto-hypnose | NovaHypnose" />
        <meta name="twitter:description" content="Évaluez votre niveau de stress et découvrez comment l'auto-hypnose peut vous aider. Quiz gratuit et personnalisé." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <link rel="canonical" href="https://novahypnose.fr/autohypnose/quiz" />
      </Helmet>

      <Header />
      <main className="min-h-screen">
        <QuizContainer />
      </main>
      <Footer />
    </>
  );
};

export default AutohypnoseQuiz;
