
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
import { Helmet } from 'react-helmet';

// Contenu SEO spécifique à la page d'accueil - MISE À JOUR
const homePageSeo = {
  title: 'Hypnose Paris 4 | Hypnothérapeute parisien thérapie par hypnose',
  description: 'Vous recherchez un hypnothérapeute sur Paris pour la prise en charge de vos maux (stress, sommeil, phobies,...) qui vous gâchent la vie ? 0649358089',
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".speakable"]
    },
    "name": "NovaHypnose - Cabinet d'hypnothérapie à Paris",
    "headline": "Hypnothérapie Ericksonienne Personnalisée Paris Centre",
    "description": "Vous recherchez un hypnothérapeute sur Paris pour la prise en charge de vos maux (stress, sommeil, phobies,...) qui vous gâchent la vie ?",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://novahypnose.fr/"
    }
  }
};

// Section de contenu textuel enrichi pour améliorer le SEO
const SeoContent = () => {
  return (
    <section aria-hidden="true" className="py-8 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-serif mb-4">L'hypnothérapie à Paris avec Alain Zenatti - Votre Hypnothérapeute Certifié</h2>
        <p className="mb-4">
          Bienvenue chez NovaHypnose, votre cabinet d'hypnothérapie de référence à Paris. Spécialiste en hypnose ericksonienne, 
          Alain Zenatti vous accompagne dans votre cheminement vers un mieux-être durable. Situé dans le 4ème arrondissement 
          de Paris, près de Bastille, notre cabinet propose des séances d'hypnose thérapeutique personnalisées pour 
          répondre à vos besoins spécifiques.
        </p>
        
        <h3 className="text-xl font-serif mt-6 mb-3">Une approche sur mesure pour chaque situation</h3>
        <p className="mb-4">
          L'hypnose ericksonienne est une méthode douce et respectueuse qui permet d'accéder aux ressources inconscientes 
          pour résoudre divers problèmes : troubles du sommeil, gestion du stress, phobies, manque de confiance, 
          addictions, et bien d'autres. Chaque séance est adaptée à votre personnalité et à vos objectifs spécifiques.
        </p>
        
        <h3 className="text-xl font-serif mt-6 mb-3">Un accompagnement professionnel et bienveillant</h3>
        <p className="mb-4">
          Maître hypnologue certifié, Alain Zenatti met à votre disposition son expertise et sa bienveillance pour vous 
          guider vers le changement souhaité. Les séances d'hypnose à Paris sont proposées en cabinet ou en téléconsultation, 
          pour s'adapter au mieux à vos contraintes. Réservez votre séance d'hypnothérapie dès maintenant pour retrouver
          équilibre, confiance et sérénité.
        </p>
        
        <h3 className="text-xl font-serif mt-6 mb-3">Découvrez les Hypno-Balades en Forêt de Senonches</h3>
        <p className="mb-4">
          En plus des séances d'hypnothérapie classiques, NovaHypnose vous propose une expérience unique : les Hypno-Balades 
          en Forêt de Senonches. Combinez les bienfaits de l'hypnose avec l'énergie revitalisante de la nature pour une 
          reconnexion profonde à vous-même. Ces promenades guidées sous état d'hypnose légère vous permettent de vivre 
          une expérience sensorielle enrichie tout en profitant des bienfaits reconnus de la forêt sur la santé mentale 
          et physique.
        </p>

        <h4 className="text-lg font-serif mt-5 mb-2">Services d'hypnothérapie à Paris - Solutions adaptées à vos besoins</h4>
        <p className="mb-4">
          NovaHypnose vous offre un éventail de services thérapeutiques basés sur l'hypnose ericksonienne. Nos séances
          sont conçues pour vous aider à surmonter différentes problématiques : anxiété, stress chronique, troubles du 
          sommeil, phobies, manque de confiance en soi, difficultés relationnelles, et bien plus encore.
        </p>

        <h4 className="text-lg font-serif mt-5 mb-2">Auto-hypnose et gestion du stress</h4>
        <p className="mb-4">
          Apprenez les techniques d'auto-hypnose avec un hypnothérapeute certifié à Paris. Ces outils précieux vous 
          permettront de gérer votre stress quotidien, d'améliorer votre concentration et de cultiver un état de 
          bien-être durable. L'auto-hypnose représente un investissement pour votre équilibre à long terme.
        </p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h5 className="text-md font-semibold mb-2">Hypnose à Paris 4ème</h5>
            <p>Cabinet d'hypnose thérapeutique près de Bastille, séances sur rendez-vous, hypnose certifiée, approche ericksonienne.</p>
          </div>
          <div>
            <h5 className="text-md font-semibold mb-2">Traitement de l'anxiété par hypnose</h5>
            <p>Gestion du stress, apaisement des angoisses, techniques de respiration, relaxation profonde, retrouver le calme intérieur.</p>
          </div>
          <div>
            <h5 className="text-md font-semibold mb-2">Hypnose pour le sommeil</h5>
            <p>Traitement de l'insomnie, amélioration de la qualité du sommeil, endormissement facilité, sommeil réparateur, rituels de coucher.</p>
          </div>
        </div>
      </div>
    </section>
  );
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
        <HypnoWalks />
        <SelfHypnosis />
        <SessionProcess />
        <Testimonials />
        <Faq />
        <Pricing />
        <Contact />
        <SeoContent />
      </ContentLayout>
    </>
  );
};

export default Index;
