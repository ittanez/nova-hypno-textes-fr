import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AutohypnoseHero from '@/components/autohypnose/AutohypnoseHero';
import AutohypnoseSerenityTest from '@/components/autohypnose/AutohypnoseSerenityTest';
import AutohypnoseRoadmap from '@/components/autohypnose/AutohypnoseRoadmap';
import AutohypnoseProgram from '@/components/autohypnose/AutohypnoseProgram';
import AutohypnosePricing from '@/components/autohypnose/AutohypnosePricing';
import AutohypnoseFAQ from '@/components/autohypnose/AutohypnoseFAQ';
import AutohypnoseTestimonials from '@/components/autohypnose/AutohypnoseTestimonials';
import AutohypnosePromoPopup from '@/components/autohypnose/AutohypnosePromoPopup';

const AutohypnoseIndex = () => {
  return (
    <>
      <Helmet>
        <title>Formation Auto-hypnose Paris - Harmonia | NovaHypnose</title>
        <meta
          name="description"
          content="Maîtrisez l'auto-hypnose en 1 journée à Paris Bastille ! Formation anti-stress avec Alain Zenatti, hypnothérapeute certifié. Groupe de 6 max. 300€"
        />
        <meta property="og:title" content="Formation Auto-hypnose Paris - Harmonia | NovaHypnose" />
        <meta property="og:description" content="Maîtrisez l'auto-hypnose en 1 journée à Paris Bastille ! Formation anti-stress avec Alain Zenatti, hypnothérapeute certifié." />
        <meta property="og:url" content="https://novahypnose.fr/autohypnose" />
        <link rel="canonical" href="https://novahypnose.fr/autohypnose" />
      </Helmet>

      <Header />
      <main>
        <AutohypnoseHero />
        <AutohypnoseSerenityTest />
        <AutohypnoseRoadmap />
        <AutohypnoseProgram />
        <AutohypnosePricing />
        <AutohypnoseTestimonials />
        <AutohypnoseFAQ />
      </main>
      <Footer />
      <AutohypnosePromoPopup />
    </>
  );
};

export default AutohypnoseIndex;
