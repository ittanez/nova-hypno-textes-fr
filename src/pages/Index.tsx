
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ApplicationsGrid from '../components/ApplicationsGrid';
import SelfHypnosis from '../components/SelfHypnosis';
import SessionProcess from '../components/SessionProcess';
import Faq from '../components/Faq';
import Testimonials from '../components/testimonials/Testimonials';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';
import ContentLayout from '../components/layout/ContentLayout';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSeoMetadata } from '../hooks/useSeoMetadata';

// Section de contenu textuel pour améliorer le SEO
const SeoContent = () => {
  return (
    <div className="hidden">
      <h2>L'hypnothérapie à Paris avec Alain Zenatti</h2>
      <p>
        Bienvenue chez NovaHypnose, votre cabinet d'hypnothérapie à Paris. Spécialiste en hypnose ericksonienne, 
        Alain Zenatti vous accompagne dans votre cheminement vers un mieux-être durable. Situé dans le 4ème arrondissement 
        de Paris, près de Bastille, notre cabinet propose des séances d'hypnose thérapeutique personnalisées pour 
        répondre à vos besoins spécifiques.
      </p>
      
      <h3>Une approche sur mesure pour chaque situation</h3>
      <p>
        L'hypnose ericksonienne est une méthode douce et respectueuse qui permet d'accéder aux ressources inconscientes 
        pour résoudre divers problèmes : troubles du sommeil, gestion du stress, phobies, manque de confiance, 
        addictions, et bien d'autres. Chaque séance est adaptée à votre personnalité et à vos objectifs spécifiques.
      </p>
      
      <h3>Un accompagnement professionnel et bienveillant</h3>
      <p>
        Maître hypnologue certifié, Alain Zenatti met à votre disposition son expertise et sa bienveillance pour vous 
        guider vers le changement souhaité. Les séances d'hypnose à Paris sont proposées en cabinet ou en téléconsultation, 
        pour s'adapter au mieux à vos contraintes. Réservez votre séance d'hypnothérapie dès maintenant.
      </p>
    </div>
  );
};

const Index = () => {
  // Use our custom hooks for animations and SEO
  useScrollAnimation();
  useSeoMetadata();

  return (
    <ContentLayout>
      <Hero />
      <About />
      <ApplicationsGrid />
      <SelfHypnosis />
      <SessionProcess />
      <Testimonials />
      <Faq />
      <Pricing />
      <Contact />
      <SeoContent />
    </ContentLayout>
  );
};

export default Index;
