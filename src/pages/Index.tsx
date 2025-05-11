
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
import HypnoWalks from '../components/HypnoWalks';
import ContentLayout from '../components/layout/ContentLayout';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSeoMetadata } from '../hooks/useSeoMetadata';

// Section de contenu textuel enrichi pour améliorer le SEO
const SeoContent = () => {
  return (
    <div className="hidden">
      <h2>L'hypnothérapie à Paris avec Alain Zenatti - Votre Hypnothérapeute Certifié</h2>
      <p>
        Bienvenue chez NovaHypnose, votre cabinet d'hypnothérapie de référence à Paris. Spécialiste en hypnose ericksonienne, 
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
        pour s'adapter au mieux à vos contraintes. Réservez votre séance d'hypnothérapie dès maintenant pour retrouver
        équilibre, confiance et sérénité.
      </p>
      
      <h3>Découvrez les Hypno-Balades en Forêt de Senonches</h3>
      <p>
        En plus des séances d'hypnothérapie classiques, NovaHypnose vous propose une expérience unique : les Hypno-Balades 
        en Forêt de Senonches. Combinez les bienfaits de l'hypnose avec l'énergie revitalisante de la nature pour une 
        reconnexion profonde à vous-même. Ces promenades guidées sous état d'hypnose légère vous permettent de vivre 
        une expérience sensorielle enrichie tout en profitant des bienfaits reconnus de la forêt sur la santé mentale 
        et physique.
      </p>

      <h3>Services d'hypnothérapie à Paris - Solutions adaptées à vos besoins</h3>
      <p>
        NovaHypnose vous offre un éventail de services thérapeutiques basés sur l'hypnose ericksonienne. Nos séances
        sont conçues pour vous aider à surmonter différentes problématiques : anxiété, stress chronique, troubles du 
        sommeil, phobies, manque de confiance en soi, difficultés relationnelles, et bien plus encore.
      </p>

      <h4>Auto-hypnose et gestion du stress</h4>
      <p>
        Apprenez les techniques d'auto-hypnose avec un hypnothérapeute certifié à Paris. Ces outils précieux vous 
        permettront de gérer votre stress quotidien, d'améliorer votre concentration et de cultiver un état de 
        bien-être durable. L'auto-hypnose représente un investissement pour votre équilibre à long terme.
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
      <HypnoWalks />
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
