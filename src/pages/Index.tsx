
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import ApplicationsGrid from '../components/ApplicationsGrid';
import SelfHypnosis from '../components/SelfHypnosis';
import SessionProcess from '../components/SessionProcess';
import HypnoWalks from '../components/HypnoWalks';
import Faq from '../components/Faq';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

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
    document.title = 'NovaHypnose - Hypnothérapie avec Alain Zenatti';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Découvrez l'hypnothérapie avec Alain Zenatti. Confiance en soi, gestion du stress, phobies, sommeil et plus encore. Cabinet à Paris et téléconsultation.");
    }
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
        <HypnoWalks />
        <Testimonials />
        <Faq />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Index;
