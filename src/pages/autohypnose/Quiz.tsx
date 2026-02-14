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
