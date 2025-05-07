
import React, { useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import ApplicationsGrid from '../components/ApplicationsGrid';
import SelfHypnosis from '../components/SelfHypnosis';
import SessionProcess from '../components/SessionProcess';
import Faq from '../components/Faq';
import Testimonials from '../components/testimonials/Testimonials';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import FloatingButton from '../components/FloatingButton';

const Index = () => {
  // Optimisation de l'effet d'animation au scroll avec useCallback pour éviter les recréations inutiles
  const animateElements = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      if (elementPosition < windowHeight - 100) {
        element.classList.add('is-visible');
      }
    });
  }, []);
  
  // Effect optimisé pour l'animation au scroll
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Utilisation de requestAnimationFrame pour optimiser les performances
      let animationFrameId: number;
      
      const handleScroll = () => {
        // Annule l'animation précédente si elle existe
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        
        // Planifie l'animation pour le prochain frame
        animationFrameId = requestAnimationFrame(animateElements);
      };
      
      // Run once on load
      animateElements();
      
      // Utilisation de l'événement passive pour améliorer les performances
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Clean up
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [animateElements]);
  
  // Update page title and description
  useEffect(() => {
    document.title = 'NovaHypnose | Hypnothérapie à Paris avec Alain Zenatti, Maître Hypnologue';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Découvrez l'hypnothérapie avec Alain Zenatti à Paris. Hypnose ericksonienne pour confiance en soi, gestion du stress, phobies, sommeil et plus. Cabinet à Bastille.");
    }

    // Add the schema.org structured data for local business
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://novahypnose.fr/#organization",
      "name": "NovaHypnose - Alain Zenatti",
      "image": "https://novahypnose.fr/wp-content/uploads/2023/12/alain-zenatti-lexperience-dun-hypnotherapeute-parisien.webp",
      "description": "Cabinet d'hypnothérapie à Paris. Alain Zenatti, Maître Hypnologue vous accompagne pour retrouver confiance, équilibre et vitalité.",
      "url": "https://novahypnose.fr",
      "telephone": "+33649358089",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "16 rue St Antoine",
        "addressLocality": "Paris",
        "postalCode": "75004",
        "addressCountry": "FR",
        "addressRegion": "Île-de-France"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.8533575,
        "longitude": 2.3644123
      },
      "priceRange": "€€",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/novahypnose/",
        "https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services d'hypnothérapie",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Séance d'Hypnose Individuelle",
              "description": "Séance d'hypnose ericksonienne en cabinet ou téléconsultation"
            },
            "price": "90",
            "priceCurrency": "EUR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Pack 3 séances d'hypnose",
              "description": "Pack de 3 séances d'hypnothérapie valable 6 mois"
            },
            "price": "255",
            "priceCurrency": "EUR"
          }
        ]
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Claire M."
        },
        "reviewBody": "Accompagnement vraiment exceptionnel d'Alain pour ma phobie des transports en commun. En seulement 3 séances, j'ai pu recommencer à prendre le métro sereinement."
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "ratingCount": "40",
        "bestRating": "5",
        "worstRating": "1"
      }
    });
    document.head.appendChild(script);
    
    // Clean up
    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <ApplicationsGrid />
        <SelfHypnosis />
        <SessionProcess />
        <Testimonials />
        <Faq />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingButton />
    </>
  );
};

export default Index;
