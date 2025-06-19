 import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ApplicationsGrid from '../components/ApplicationsGrid';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';
import ContentLayout from '../components/layout/ContentLayout';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSeoMetadata } from '../hooks/useSeoMetadata';
import { Helmet } from 'react-helmet';
import BlogArticlesSlider from '../components/BlogArticlesSlider';
import FAQSchema from '../components/FAQSchema';

// Composants chargés de manière différée (lazy loading)
const SelfHypnosis = lazy(() => import('../components/SelfHypnosis'));
const SessionProcess = lazy(() => import('../components/SessionProcess'));
const Faq = lazy(() => import('../components/Faq'));
const Testimonials = lazy(() => import('../components/testimonials/Testimonials'));
const SeoContent = lazy(() => import('../components/SeoContent'));

// Contenu SEO spécifique à la page d'accueil - MISE À JOUR
const homePageSeo = {
  title: 'Hypnose Paris, Hypnothérapeute parisien thérapie par hypnose',
  description: "Cherchez un hypnothérapeute à Paris ? Cabinet d'hypnose pour traiter stress, sommeil, phobies. Consultations à Paris 4. Tél 06 49 35 80 89.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".speakable"]
    },
    "name": "NovaHypnose - Cabinet d'hypnothérapie à Paris",
    "headline": "Hypnothérapie Ericksonienne Personnalisée Paris Centre",
    "description": "Cherchez un hypnothérapeute à Paris ? Cabinet d'hypnose pour traiter stress, sommeil, phobies. Consultations à Paris 4.",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://novahypnose.fr/"
    }
  }
};

const Index = () => {
  // Utilisons notre hook personnalisé pour le SEO
  useSeoMetadata(homePageSeo);
  
  // Hook pour animations au défilement
  useScrollAnimation();

  return (
    <>
      <Helmet>
        {/* Balisage structuré supplémentaire pour la page d'accueil */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://novahypnose.fr/"
              }
            ]
          })}
        </script>
        
        {/* Meta Open Graph améliorées */}
        <meta property="og:title" content="Hypnothérapeute Paris 4 | Hypnose stress, sommeil, phobies" />
        <meta property="og:description" content="Hypnose à Paris 4 : hypnothérapeute certifié. Hypnothérapie sur-mesure pour stress, sommeil, phobies. Cabinet Hypnose Marais/Bastille." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@novahypnose" />
        <meta name="twitter:title" content="Hypnothérapeute Paris 4 | Hypnose stress, sommeil, phobies" />
        <meta name="twitter:description" content="Hypnose à Paris 4 : hypnothérapeute certifié. Hypnothérapie sur-mesure pour stress, sommeil, phobies." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp" />
      </Helmet>
      
      <FAQSchema />
      
      <ContentLayout>
        <Hero />
        <About />
        <ApplicationsGrid />
        
        <Suspense fallback={<div className="h-20 animate-pulse bg-gray-100"></div>}>
          <SelfHypnosis />
          <SessionProcess />
          <Testimonials />
          
          {/* ✅ Blog après les témoignages */}
          <div id="blog">
            <BlogArticlesSlider />
          </div>
          
          <Faq />
        </Suspense>
        
        <Pricing />
        <Contact />
        
        
        <Suspense fallback={null}>
          <SeoContent />
        </Suspense>
      </ContentLayout>
    </>
  );
};

export default Index;
