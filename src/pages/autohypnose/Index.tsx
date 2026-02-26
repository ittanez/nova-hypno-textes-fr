import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AutohypnoseHero from '@/components/autohypnose/AutohypnoseHero';
import AutohypnoseTargetAudience from '@/components/autohypnose/AutohypnoseTargetAudience';
import AutohypnoseRoadmap from '@/components/autohypnose/AutohypnoseRoadmap';
import AutohypnoseProgram from '@/components/autohypnose/AutohypnoseProgram';
import AutohypnosePricing from '@/components/autohypnose/AutohypnosePricing';
import AutohypnosePostTraining from '@/components/autohypnose/AutohypnosePostTraining';
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
          content="Maîtrisez l'auto-hypnose en 1 journée à Paris Bastille ! Formation anti-stress avec Alain Zenatti, hypnothérapeute certifié. Groupe de 6 max. 180€ (jusqu'au 14 mars)"
        />
        <meta property="og:title" content="Formation Auto-hypnose Paris - Harmonia | NovaHypnose" />
        <meta property="og:description" content="Maîtrisez l'auto-hypnose en 1 journée à Paris Bastille ! Formation anti-stress avec Alain Zenatti, hypnothérapeute certifié." />
        <meta property="og:url" content="https://novahypnose.fr/autohypnose" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <link rel="canonical" href="https://novahypnose.fr/autohypnose" />
        <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0132/0442.js" async="async"></script>
      </Helmet>

      <Header />
      <main>
        <AutohypnoseHero />
        <AutohypnoseTargetAudience />
        <AutohypnoseRoadmap />
        <AutohypnoseProgram />
        <AutohypnosePricing />
        <AutohypnosePostTraining />
        <AutohypnoseTestimonials />
        <AutohypnoseFAQ />
      </main>
      <Footer />
      <AutohypnosePromoPopup />
    </>
  );
};

export default AutohypnoseIndex;
