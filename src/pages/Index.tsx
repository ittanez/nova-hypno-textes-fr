
import React, { useEffect } from 'react';
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
  // Effect for the scroll animation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const animateElements = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach((element) => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
            element.classList.add('is-visible');
          }
        });
      };
      
      // Run once on load
      animateElements();
      
      // Add scroll event listener
      window.addEventListener('scroll', animateElements);
      
      // Clean up
      return () => {
        window.removeEventListener('scroll', animateElements);
      };
    }
  }, []);
  
  // Update page title and description
  useEffect(() => {
    document.title = 'NovaHypnose | Hypnothérapie à Paris avec Alain Zenatti, Maître Hypnologue';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Découvrez l'hypnothérapie avec Alain Zenatti. Confiance en soi, gestion du stress, phobies, sommeil et plus encore. Cabinet à Paris et téléconsultation.");
    }

    // Add the schema.org structured data for local business
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "NovaHypnose",
      "image": "https://novahypnose.fr/wp-content/uploads/2023/12/alain-zenatti-lexperience-dun-hypnotherapeute-parisien.webp",
      "description": "Cabinet d'hypnothérapie à Paris. Alain Zenatti, Maître Hypnologue vous accompagne pour retrouver confiance, équilibre et vitalité.",
      "url": "https://novahypnose.fr",
      "telephone": "+33649358089",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "16 rue St Antoine",
        "addressLocality": "Paris",
        "postalCode": "75004",
        "addressCountry": "FR"
      },
      "priceRange": "€€",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      ]
    });
    document.head.appendChild(script);
    
    // Clean up
    return () => {
      document.head.removeChild(script);
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
