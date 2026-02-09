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
import { Helmet } from 'react-helmet';
import { useQueryClient } from '@tanstack/react-query';
import ContentLayout from '@/components/layout/ContentLayout';
import { getAllArticlesNoPagination, getAllCategories } from '@/lib/services/blog/articleService';
import { logger } from '@/lib/logger';
import { localBusinessSchema, personSchema, faqSchema, breadcrumbSchema } from '@/data/schemaOrg';

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
const CredibilityBadgesSection = lazy(() => import('@/components/sections/CredibilityBadgesSection'));
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
        logger.error('Erreur lors du prechargement des donnees blog:', error);
      }
    };

    // Délai de 2 secondes pour ne pas interférer avec le chargement initial
    const timer = setTimeout(prefetchBlogData, 2000);

    return () => clearTimeout(timer);
  }, [queryClient]);

  return (
    <>
      {/* SEO Head pour la page d'accueil */}
      <Helmet>
        <title>Hypnothérapeute Paris 4 | Alain Zenatti - Hypnose</title>
        <meta name="description" content="Hypnothérapeute à Paris 4ème, cabinet Marais-Bastille. Alain Zenatti, Maître Hypnologue certifié. Stress, anxiété, phobies, sommeil. Résultats en 3 à 5 séances." />
        <meta name="keywords" content="hypnothérapeute paris, hypnothérapeute paris 4, hypnose paris, hypnose ericksonienne paris, maître hypnologue paris, cabinet hypnose paris, hypnothérapie paris, séance hypnose paris, hypnothérapeute bastille, hypnothérapeute marais, hypnose stress paris, hypnose anxiété paris, hypnose phobies paris, hypnose sommeil paris, hypnothérapeute paris 4ème, meilleur hypnothérapeute paris" />

        {/* Open Graph - URL cohérente sans trailing slash */}
        <meta property="og:title" content="Hypnothérapeute Paris | Alain Zenatti - Hypnose ericksonienne Marais-Bastille" />
        <meta property="og:description" content="Vous cherchez un hypnothérapeute à Paris ? Alain Zenatti, Maître Hypnologue certifié. Cabinet Paris 4ème Marais-Bastille. Stress, anxiété, phobies, sommeil. Résultats en 3 à 5 séances. Tél 06 49 35 80 89." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@novahypnose" />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />

        {/* Locale et site_name */}
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />

        {/* Canonical - sans trailing slash pour cohérence */}
        <link rel="canonical" href="https://novahypnose.fr" />

        {/* Structured Data JSON-LD - LocalBusiness + Person + FAQ + Breadcrumb */}
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

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
          {/* Section Badges de crédibilité */}
          <CredibilityBadgesSection />
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
