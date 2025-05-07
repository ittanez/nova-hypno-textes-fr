
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
    </ContentLayout>
  );
};

export default Index;
