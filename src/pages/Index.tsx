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
// ✅ AJOUT : Import du slider
import BlogArticlesSlider from '../components/BlogArticlesSlider';

// Composants chargés de manière différée (lazy loading)
const SelfHypnosis = lazy(() => import('../components/SelfHypnosis'));
const SessionProcess = lazy(() => import('../components/SessionProcess'));
const Faq = lazy(() => import('../components/Faq'));
const Testimonials = lazy(() => import('../components/testimonials/Testimonials'));
const HypnoWalks = lazy(() => import('../components/HypnoWalks'));
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
      </Helmet>
      
      <ContentLayout>
        <Hero />
        <About />
        <ApplicationsGrid />
        
        <Suspense fallback={<div className="h-20 animate-pulse bg-gray-100"></div>}>
          <HypnoWalks />
          <SelfHypnosis />
          <SessionProcess />
          <Testimonials />
          <Faq />
        </Suspense>
        
        <Pricing />
        <Contact />
        
        {/* ✅ AJOUT : Slider des articles du blog */}
        <Suspense fallback={<div className="h-96 animate-pulse bg-gradient-to-br from-purple-50 to-blue-50"></div>}>
          <BlogArticlesSlider />
        </Suspense>
        
        <Suspense fallback={null}>
          <SeoContent />
        </Suspense>
      </ContentLayout>
    </>
  );
};

export default Index;
