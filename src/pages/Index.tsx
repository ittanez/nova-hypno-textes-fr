/**
 * Page d'accueil - Index
 * Refactorisé pour améliorer la maintenabilité et les performances
 *
 * Architecture :
 * - Composants critiques (above the fold) : chargés immédiatement
 * - Composants non-critiques (below the fold) : lazy-loaded avec React.lazy()
 * - Données statiques externalisées dans /src/data
 * - Code splitting automatique pour réduire le bundle initial
 */

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ContentLayout from '@/components/layout/ContentLayout';
import { getAllArticlesNoPagination, getAllCategories } from '@/lib/services/blog/articleService';

// Composants critiques (above the fold) - Chargés immédiatement
import HeroCarousel from '@/components/sections/HeroCarousel';
import ProfessionalProblemsSection from '@/components/sections/ProfessionalProblemsSection';
import AboutSection from '@/components/sections/AboutSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';

// Composants non-critiques (below the fold) - Lazy loaded pour optimiser les performances
const ApplicationsCarousel = lazy(() => import('@/components/sections/ApplicationsCarousel'));
const HowItWorksCarousel = lazy(() => import('@/components/sections/HowItWorksCarousel'));
const SessionFlowSection = lazy(() => import('@/components/sections/SessionFlowSection'));
const Pricing = lazy(() => import('@/components/Pricing'));
const CTASection = lazy(() => import('@/components/sections/CTASection'));
const TestimonialsCarousel = lazy(() => import('@/components/sections/TestimonialsCarousel'));
const ContactSection = lazy(() => import('@/components/sections/ContactSection'));
const SelfHypnosisSection = lazy(() => import('@/components/sections/SelfHypnosisSection'));
const FAQSection = lazy(() => import('@/components/sections/FAQSection'));
const VideoModal = lazy(() => import('@/components/sections/VideoModal'));

/**
 * Composant Fallback pour le chargement lazy
 */
const SectionLoader: React.FC = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nova-blue"></div>
  </div>
);

/**
 * Composant principal de la page d'accueil
 */
const Index: React.FC = () => {
  const queryClient = useQueryClient();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Préchargement des données du blog en arrière-plan avec React Query cache
  useEffect(() => {
    const prefetchBlogData = async () => {
      try {
        // Préchargement des articles et catégories pour optimiser le chargement du blog
        await Promise.all([
          queryClient.prefetchQuery({
            queryKey: ['articles', 'all'],
            queryFn: () => getAllArticlesNoPagination(),
            staleTime: 5 * 60 * 1000, // 5 minutes
          }),
          queryClient.prefetchQuery({
            queryKey: ['categories'],
            queryFn: () => getAllCategories(),
            staleTime: 5 * 60 * 1000,
          }),
        ]);
      } catch (error) {
        console.error('Erreur lors du préchargement des données blog:', error);
      }
    };

    // Délai de 2 secondes pour ne pas interférer avec le chargement initial
    const timer = setTimeout(prefetchBlogData, 2000);

    return () => clearTimeout(timer);
  }, [queryClient]);

  return (
    <>
      <ContentLayout>
        {/* ===== ABOVE THE FOLD (Chargé immédiatement) ===== */}

        {/* Hero Section avec Carrousel vidéo */}
        <HeroCarousel />

        {/* Section Problèmes des Professionnels - PRIORITÉ 1 */}
        <ProfessionalProblemsSection />

        {/* Section À propos */}
        <AboutSection onOpenVideoModal={() => setIsVideoModalOpen(true)} />

        {/* Section Pourquoi choisir */}
        <WhyChooseSection />

        {/* ===== BELOW THE FOLD (Lazy loaded) ===== */}

        <Suspense fallback={<SectionLoader />}>
          {/* Section Applications de l'hypnothérapie */}
          <ApplicationsCarousel />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          {/* Section Comment ça fonctionne */}
          <HowItWorksCarousel />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          {/* Section Déroulement d'une séance */}
          <SessionFlowSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          {/* Section Tarifs */}
          <Pricing />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          {/* CTA intermédiaire */}
          <CTASection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          {/* Section Témoignages */}
          <TestimonialsCarousel />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          {/* Section Contact avec carte */}
          <ContactSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          {/* Section Auto-Hypnose */}
          <SelfHypnosisSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          {/* Section FAQ */}
          <FAQSection />
        </Suspense>
      </ContentLayout>

      {/* Modal vidéo (lazy loaded uniquement si ouvert) */}
      <Suspense fallback={null}>
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
        />
      </Suspense>
    </>
  );
};

export default Index;
