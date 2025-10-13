import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Calendar, Phone, Mail, MapPin,
  Brain, Heart, Target, Sparkles, Shield, Users,
  CheckCircle, Star, Award, Clock, Lightbulb,
  ChevronDown, ChevronUp, X,
  GanttChart, Moon, Frown, ActivitySquare, CigaretteOff, Smile, Sandwich,
  BookOpen, Smartphone, Waves, ChevronLeft, ChevronRight
} from 'lucide-react';
import ContentLayout from '@/components/layout/ContentLayout';
import { getAllArticlesNoPagination, getAllCategories } from '@/lib/services/blog/articleService';
import { useQueryClient } from '@tanstack/react-query';
import { getResponsiveSrcSet } from '@/lib/utils/imagekit';
import CommuteMap from '@/components/CommuteMap';

const Index = () => {
  const queryClient = useQueryClient();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentApplication, setCurrentApplication] = useState(0);
  const [currentHowItWorks, setCurrentHowItWorks] = useState(0);
  const [currentPricing, setCurrentPricing] = useState(0);

  const carouselSlides = [
    {
      type: 'video' as const,
      image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/sign/video/alain.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTUxZDFmMy1kNzgwLTQ5M2MtYTE0MS1lZmU0MjRhMTBmNWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlby9hbGFpbi5tcDQiLCJpYXQiOjE3NjAzNTc5ODUsImV4cCI6MjcwNjQzNzk4NX0.SdvQ9Su7l9SfV-8gScHAP2mtMO67XjhWH-2po2_VmHA',
      poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carroussel/ALAIN.webp',
      title: 'TRANSFORMEZ VOTRE VIE AVEC L\'HYPNOSE',
      description: 'Alain ZENATTI, Maître Hypnologue certifié à Paris 4ème - Hypnose Ericksonienne personnalisée'
    },
    {
      type: 'video' as const,
      image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/sign/video/arraignee.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTUxZDFmMy1kNzgwLTQ5M2MtYTE0MS1lZmU0MjRhMTBmNWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlby9hcnJhaWduZWUubXA0IiwiaWF0IjoxNzYwMzU3NDgzLCJleHAiOjIwNzU3MTc0ODN9.b7P8YNO3EHkO11ASArKVFdAkFzKOPPJuwfUC_GvZLvk',
      poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carroussel/PHOBIE.webp',
      title: 'PEURS - PHOBIES',
      description: 'Libérez-vous de vos peurs irrationnelles et retrouvez votre liberté de mouvement'
    },
    {
      type: 'video' as const,
      image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/sign/video/stress-anxiete.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTUxZDFmMy1kNzgwLTQ5M2MtYTE0MS1lZmU0MjRhMTBmNWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlby9zdHJlc3MtYW54aWV0ZS5tcDQiLCJpYXQiOjE3NjAzNTgxMDAsImV4cCI6MjcwNjQzODEwMH0.sx1q7tXg2XBGtaxuppYnni5D_PN18HYpwG1fA3x8jjA',
      poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carroussel/CABINET.webp',
      title: 'STRESS - ANXIÉTÉ',
      description: 'Apprenez à gérer votre stress et votre anxiété pour retrouver votre équilibre intérieur'
    },
    {
      type: 'video' as const,
      image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/sign/video/parler-en-public.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTUxZDFmMy1kNzgwLTQ5M2MtYTE0MS1lZmU0MjRhMTBmNWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlby9wYXJsZXItZW4tcHVibGljLm1wNCIsImlhdCI6MTc2MDM1ODA2MiwiZXhwIjoyNzA2NDM4MDYyfQ.nLdSm-R31p8OtMqOeMIYVdJffkwW7tWAqLrGW2vyaEc',
      poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carroussel/PAROLEPUBLIC.webp',
      title: 'PEUR DE PARLER EN PUBLIC',
      description: 'Surmontez votre anxiété et exprimez-vous avec confiance devant un auditoire'
    },
    {
      type: 'video' as const,
      image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/sign/video/sommeil.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTUxZDFmMy1kNzgwLTQ5M2MtYTE0MS1lZmU0MjRhMTBmNWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlby9zb21tZWlsLm1wNCIsImlhdCI6MTc2MDM1ODA4MCwiZXhwIjoyNzA2NDM4MDgwfQ.UrNOlTffAjabXdfdtnUuRi_W2FlDT-ncm7VpU_oyxeI',
      poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carroussel/sommeil.webp',
      title: 'SOMMEIL',
      description: 'Retrouvez un sommeil réparateur et des nuits paisibles grâce à l\'hypnose'
    },
    {
      type: 'video' as const,
      image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/sign/video/POIDS.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTUxZDFmMy1kNzgwLTQ5M2MtYTE0MS1lZmU0MjRhMTBmNWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlby9QT0lEUy5tcDQiLCJpYXQiOjE3NjAzNTk4ODIsImV4cCI6MjcwNjQzOTg4Mn0.CzuuFas_dbdNhAPhqwgQsCo_UKSU8dpwB0t5hnO_kKA',
      poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carroussel/POIDS.webp',
      title: 'POIDS',
      description: 'Atteignez votre poids idéal en modifiant durablement votre rapport à la nourriture'
    },
    {
      type: 'video' as const,
      image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/sign/video/colere.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTUxZDFmMy1kNzgwLTQ5M2MtYTE0MS1lZmU0MjRhMTBmNWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlby9jb2xlcmUubXA0IiwiaWF0IjoxNzYwMzU4MDEyLCJleHAiOjI3MDY0MzgwMTJ9.dVeTy8iqDM3qzxUnuQyhkbsC7uEOVV3xNM1UrhgvKt0',
      poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carroussel/COLERE.webp',
      title: 'COLÈRE',
      description: 'Maîtrisez vos émotions et retrouvez le calme intérieur grâce à l\'hypnose'
    },
    {
      type: 'video' as const,
      image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/sign/video/procrastination.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTUxZDFmMy1kNzgwLTQ5M2MtYTE0MS1lZmU0MjRhMTBmNWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlby9wcm9jcmFzdGluYXRpb24ubXA0IiwiaWF0IjoxNzYwMzU5NDQ0LCJleHAiOjI3MDY0Mzk0NDR9.Jv2AF0OiQBw1w-JXlP_tiYGk1Oh3pmFTFQBtD8S7ihU',
      poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carroussel/PROCRASTINATION.webp',
      title: 'PROCRASTINATION',
      description: 'Dépassez la procrastination et libérez votre potentiel d\'action'
    },
    {
      type: 'video' as const,
      image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/sign/video/grok-video-db3ca028-5456-4df6-ba51-e63e2b1bbc21.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTUxZDFmMy1kNzgwLTQ5M2MtYTE0MS1lZmU0MjRhMTBmNWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlby9ncm9rLXZpZGVvLWRiM2NhMDI4LTU0NTYtNGRmNi1iYTUxLWU2M2UyYjFiYmMyMS5tcDQiLCJpYXQiOjE3NjAzNjA1MDksImV4cCI6MjcwNjQ0MDUwOX0.PeVd1-5tjMra9_Qbkje2OAO1Y_o2PrxbnW9kxwSbJbo',
      poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carroussel/RONGERSESONGLES.webp',
      title: 'RONGER SES ONGLES',
      description: 'Libérez-vous de cette habitude compulsive de manière définitive'
    },
    {
      type: 'video' as const,
      image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/sign/video/difficultes-relationnelles.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTUxZDFmMy1kNzgwLTQ5M2MtYTE0MS1lZmU0MjRhMTBmNWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlby9kaWZmaWN1bHRlcy1yZWxhdGlvbm5lbGxlcy5tcDQiLCJpYXQiOjE3NjAzNTgwMzEsImV4cCI6MjcwNjQzODAzMX0.YROyGDStFV1Zy18PM3BmD3_fWNsKUcTLsmyW0pkyxvA',
      poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carroussel/COUPLE.webp',
      title: 'DIFFICULTÉS RELATIONNELLES',
      description: 'Renforcez votre relation et retrouvez l\'harmonie dans votre couple'
    }
  ];

  // Auto-scroll du carrousel toutes les 4,5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Préchargement des données du blog en arrière-plan avec React Query cache
  useEffect(() => {
    const prefetchBlogData = async () => {
      try {
        console.log('🚀 [Prefetch] Démarrage du préchargement blog...');
        const startTime = performance.now();

        // Précharger les articles avec React Query (mise en cache automatique)
        await queryClient.prefetchQuery({
          queryKey: ['blog-articles'],
          queryFn: async () => {
            console.log('📥 [Prefetch] Chargement articles...');
            const result = await getAllArticlesNoPagination();
            return result.data || [];
          },
          staleTime: 5 * 60 * 1000, // 5 minutes
        });

        // Précharger les catégories avec React Query
        await queryClient.prefetchQuery({
          queryKey: ['blog-categories'],
          queryFn: async () => {
            console.log('📥 [Prefetch] Chargement catégories...');
            const result = await getAllCategories();
            return result.data || [];
          },
          staleTime: 5 * 60 * 1000, // 5 minutes
        });

        const endTime = performance.now();
        console.log(`✅ [Prefetch] Blog préchargé en ${Math.round(endTime - startTime)}ms et mis en cache`);
      } catch (error) {
        // Ignorer silencieusement les erreurs de préchargement
        console.log('⚠️ [Prefetch] Échec du préchargement blog');
      }
    };

    // Attendre 2 secondes après le chargement pour ne pas impacter la performance initiale
    const timer = setTimeout(prefetchBlogData, 2000);

    return () => clearTimeout(timer);
  }, [queryClient]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "À quelle vitesse va-t-on remarquer des changements ?",
      answer: "Certaines personnes remarquent des changements après une seule séance, tandis que d'autres auront besoin de quelques séances pour observer des transformations significatives. Cela dépend de la problématique, de votre réceptivité à l'hypnose et de votre engagement dans le processus."
    },
    {
      question: "L'hypnose peut-elle remplacer un traitement médical ?",
      answer: "Non, l'hypnothérapie est une approche complémentaire qui ne remplace pas un traitement médical prescrit. Elle peut cependant s'intégrer dans une approche globale de soin et parfois permettre de réduire certains médicaments, toujours en accord avec votre médecin traitant."
    },
    {
      question: "Combien de temps dure une séance ?",
      answer: "Une séance standard dure généralement entre 1h et 1h30. La première séance peut être un peu plus longue (jusqu'à 2h) car elle comprend l'anamnèse détaillée de votre situation."
    },
    {
      question: "L'hypnothérapie est-elle dangereuse ?",
      answer: "Non, l'hypnothérapie pratiquée par un professionnel formé est une méthode sûre et naturelle. Vous restez conscient pendant toute la séance et ne ferez jamais quelque chose contre votre volonté. C'est un état modifié de conscience que vous expérimentez naturellement plusieurs fois par jour (comme lorsque vous êtes absorbé dans un livre ou un film)."
    },
    {
      question: "Un praticien en hypnose thérapeutique peut-il diagnostiquer des maladies ?",
      answer: "Non, en tant qu'hypnothérapeute, je ne pose pas de diagnostic médical. Si vous présentez des symptômes physiques, il est important de consulter d'abord un médecin pour un diagnostic approprié."
    },
    {
      question: "Qui peut être hypnotisé ?",
      answer: "Pratiquement tout le monde peut bénéficier de l'hypnose. La capacité d'être hypnotisé dépend principalement de votre volonté et de votre ouverture au processus, plutôt que d'une prédisposition particulière."
    },
    {
      question: "Est-ce que je fais les choses contre ma volonté en hypnose ?",
      answer: "Absolument pas. Contrairement aux idées reçues ou aux spectacles d'hypnose de divertissement, en hypnothérapie vous gardez toujours le contrôle. Votre subconscient ne vous permettra jamais d'agir contre vos valeurs ou votre volonté."
    },
    {
      question: "Est-ce que je révèle des secrets intimes grâce à l'hypnose ?",
      answer: "Non, vous ne révélerez que ce que vous souhaitez partager. L'hypnose n'est pas un sérum de vérité et vous gardez votre libre arbitre pendant toute la séance."
    },
    {
      question: "Et si je ne me réveille pas de l'hypnose ?",
      answer: "Cela n'arrive jamais. L'état d'hypnose est un état naturel dont on sort spontanément, même si l'hypnothérapeute cessait de parler. Il s'agit d'un état de concentration focalisée, pas d'un sommeil ou d'un coma."
    },
    {
      question: "Est-ce que je dors pendant l'hypnose ? Est-ce que j'entends quelque chose sous hypnose ?",
      answer: "Non, vous ne dormez pas. L'hypnose est un état de conscience modifié où vous restez parfaitement éveillé et attentif. Vous entendez tout ce qui se dit et vous vous souvenez généralement de la majorité des suggestions données pendant la séance."
    },
    {
      question: "Qu'est-ce qui empêche quelqu'un d'entrer en hypnose ?",
      answer: "Les principaux obstacles sont la peur, la méfiance ou une résistance volontaire au processus. Une personne très analytique qui cherche constamment à \"contrôler\" l'expérience peut parfois avoir plus de difficultés à se laisser aller, mais avec une bonne communication et la confiance, ces obstacles peuvent être surmontés."
    },
    {
      question: "Les séances d'hypnose sont-elles remboursées par les mutuelles ?",
      answer: "En France, l'hypnothérapie est remboursée par certaines mutuelles. Les remboursements varient en fonction des mutuelles et des contrats souscrits. Pour savoir si votre mutuelle rembourse l'hypnothérapie, il est recommandé de contacter votre mutuelle directement."
    },
    {
      question: "Où se situe le cabinet d'hypnothérapie Marais Bastille à Paris ?",
      answer: "Le cabinet Marais Bastille est situé au 16 rue Saint-Antoine à Bastille, au croisement des 4ᵉ, 11ᵉ et 12ᵉ arrondissements, dans le quartier du Marais.\n\nAccès métro : Station Bastille (lignes 1, 5, 8) à 2 minutes à pied, ou  Saint-Paul  (ligne 1).\n\n Situation centrale : Le cabinet se trouve à proximité de  République ,  Châtelet  et  Gare de Lyon , permettant un accès facile depuis toute la région parisienne. Plusieurs lignes de bus desservent également le secteur (69, 76, 86, 87, 96).\n\nCette localisation privilégiée au cœur de Paris facilite vos consultations d'hypnothérapie à Bastille, que ce soit en journée ou en soirée."
    },
    {
      question: "Pourquoi choisir un pack de séances ?",
      answer: "Le Pack 3 séances est particulièrement recommandé pour les problématiques les plus courantes qui nécessitent un accompagnement structuré : phobies, anxiété et confiance en soi. Ces trois domaines montrent les taux de réussite les plus élevés avec un suivi de 3 séances, permettant un travail progressif et l'ancrage durable des changements.\n\nLes packs offrent également un coût avantageux, un engagement à long terme et un plan de traitement structuré, créant les conditions optimales pour votre transformation."
    },
    {
      question: "Quelles sont les modalités de paiement et la politique d'annulation ?",
      answer: "Modalités de paiement :\n• Chèque, espèces, carte bancaire (cabinet)\n• Carte bancaire (téléconsultations)\n\nRemarques importantes :\n• Pas de consultations pour enfants et mineurs\n\nPolitique d'annulation :\n• Annulation ou report possible sans frais jusqu'à 48 heures avant le rendez-vous\n• En cas d'annulation tardive (moins de 48h) ou d'absence, la séance sera facturée quelle que soit la raison"
    },
    {
      question: "Comment reconnaître un hypnothérapeute qualifié ?",
      answer: "❌ Signes d'alarme à éviter :\n• Promesses de guérison miraculeuse\n• Refus d'expliquer la méthode\n• Formation insuffisante ou floue\n• Approche directive sans respect du client\n• Tarifs anormalement bas ou élevés\n\n✅ Garanties d'un expert qualifié :\n• Formation certifiée et continue\n• Transparence sur la méthode\n• Approche personnalisée et respectueuse\n• Explication claire du processus\n• Déontologie professionnelle stricte\n\nMa promesse de transparence : Je m'engage à vous expliquer chaque étape, à répondre à toutes vos questions et à respecter votre rythme. Aucune séance ne commence sans que vous compreniez exactement ce qui va se passer."
    }
  ];

  const applications = [
    {
      title: 'Gestion du stress et des émotions',
      description: "Apprendre à accueillir ce qui vous traverse sans être débordé. L'hypnose permet d'installer un espace de recul intérieur, pour retrouver stabilité, calme et sécurité émotionnelle.",
      icon: GanttChart
    },
    {
      title: 'Amélioration du sommeil',
      description: "En calmant les pensées envahissantes, en apaisant le système nerveux et en reconditionnant les automatismes du sommeil, l'hypnose aide à retrouver un endormissement plus naturel et réparateur.",
      icon: Moon
    },
    {
      title: 'Renforcement de la confiance en soi',
      description: "Vous reconnecter à vos capacités, redéfinir votre regard sur vous-même, oser prendre votre place avec assurance. L'inconscient devient ici un soutien puissant pour se réapproprier sa valeur.",
      icon: Heart
    },
    {
      title: 'Libération des blocages et peurs',
      description: "Phobies, peur du jugement, frein au changement : l'hypnose offre un accès indirect mais efficace aux racines émotionnelles du blocage, et permet de les transformer en nouvelles perceptions.",
      icon: Frown
    },
    {
      title: 'Préparation mentale',
      description: "Que ce soit pour une prise de parole, un examen, une étape de vie ou un changement professionnel, l'hypnose peut vous aider à mobiliser calme, clarté et engagement au moment juste.",
      icon: Brain
    },
    {
      title: 'Douleurs, Allergies',
      description: "L'hypnothérapie modifie la perception de la douleur. Elle permet une meilleure maîtrise des manifestations allergiques grâce à la puissance de l'imaginaire.",
      icon: ActivitySquare
    },
    {
      title: 'Dépendances',
      description: "Qu'il s'agisse de dépendances comportementales ou chimiques, l'hypnose permet de modifier les schémas mentaux à l'origine de la dépendance.",
      icon: CigaretteOff
    },
    {
      title: 'Troubles du comportement alimentaire',
      description: "Boulimie, anorexie, compulsions alimentaires... L'hypnothérapie aide à comprendre les causes de ces troubles et favorise le retour à une alimentation équilibrée.",
      icon: Sandwich
    },
    {
      title: 'Émotions',
      description: "Colère, tristesse, peur... L'hypnose aide à mieux gérer ses émotions et à transformer ses réactions pour plus de sérénité au quotidien.",
      icon: Smile
    }
  ];

  // ✅ STRUCTURED DATA SCHEMA.ORG POUR LE SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness", "HealthAndBeautyBusiness"],
    "@id": "https://novahypnose.fr/#localbusiness",
    "name": "NovaHypnose - Hypnothérapeute Paris",
    "alternateName": "Alain Zenatti Hypnothérapeute Paris 4",
    "url": "https://novahypnose.fr",
    "telephone": "+33649358089",
    "email": "contact@novahypnose.fr",
    "servesCuisine": null,
    "hasMap": "https://www.google.com/maps/place/16+Rue+Saint-Antoine,+75004+Paris",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "16 rue Saint-Antoine",
      "addressLocality": "Paris",
      "addressRegion": "Île-de-France",
      "postalCode": "75004",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8534",
      "longitude": "2.3656"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "11:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "€€",
    "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp",
    "description": "Hypnothérapeute Paris 4ème - Cabinet d'hypnothérapie ericksonienne. Spécialiste stress, sommeil, phobies, confiance en soi. Maître Hypnologue certifié Alain Zenatti.",
    "areaServed": [
      {
        "@type": "City",
        "name": "Paris"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Île-de-France"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services d'hypnothérapie",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Séance d'hypnose individuelle",
            "description": "Hypnothérapie ericksonienne personnalisée pour stress, anxiété, phobies, sommeil"
          }
        }
      ]
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://novahypnose.fr/#person",
    "name": "Alain Zenatti",
    "jobTitle": "Maître Hypnologue",
    "description": "Hypnothérapeute certifié spécialisé en hypnose ericksonienne à Paris",
    "url": "https://novahypnose.fr",
    "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp",
    "sameAs": [
      "https://www.instagram.com/novahypnose/",
      "https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
    ],
    "telephone": "+33649358089",
    "email": "contact@novahypnose.fr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "16 rue Saint-Antoine",
      "addressLocality": "Paris",
      "postalCode": "75004",
      "addressCountry": "FR"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <ContentLayout>
      {/* Hero Section avec Carrousel */}
      <section className="relative min-h-[400px] h-[50vh] md:h-[70vh] lg:h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Carrousel d'images/vidéos */}
        <div className="absolute inset-0">
          {carouselSlides.map((slide, index) => {
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {slide.type === 'video' ? (
                  <video
                    ref={(el) => {
                      if (el && index === currentSlide) {
                        el.currentTime = 0;
                        el.play().catch(() => {});
                      }
                    }}
                    src={slide.image}
                    poster={slide.poster}
                    className="w-full h-full object-cover object-center"
                    muted
                    playsInline
                    preload={index === 0 ? "auto" : "metadata"}
                  />
                ) : (
                  (() => {
                    const { src, srcSet, sizes } = getResponsiveSrcSet(slide.image, 75);
                    return (
                      <img
                        src={src}
                        srcSet={srcSet}
                        sizes={sizes}
                        alt={`${slide.title} - Hypnothérapie NovaHypnose Paris 4ème`}
                        className="w-full h-full object-cover object-center"
                        style={{ aspectRatio: '16/9' }}
                        width="1920"
                        height="1080"
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchpriority={index === 0 ? "high" : "low"}
                      />
                    );
                  })()
                )}
              </div>
            );
          })}
          {/* Gradient overlay constant */}
          <div className="absolute inset-0 bg-gradient-to-r from-nova-blue-dark/60 via-nova-blue-dark/40 to-transparent pointer-events-none"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 flex items-end pb-24 md:pb-16 h-full">
          <div className="max-w-3xl">
            {/* H1 masqué pour le SEO uniquement */}
            <h1 className="sr-only">Hypnothérapeute à Paris - Hypnose ericksonienne - Alain Zenatti</h1>

            {/* Contenu visuel dynamique du carrousel */}
            <div className="min-h-[160px] md:min-h-[200px] relative">
              {carouselSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 right-0'
                  }`}
                >
                  <div className="text-3xl sm:text-3xl md:text-4xl lg:text-7xl font-bold text-white mb-2 md:mb-4 leading-tight">
                    {slide.title}
                  </div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
            {/* Boutons masqués sur mobile */}
            <div className="hidden md:flex flex-col sm:flex-row gap-3 mt-6">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Calendar size={18} />
                Prendre rendez-vous
              </a>
              <a
                href="#applications"
                className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 rounded-lg text-sm font-semibold transition-all text-center"
              >
                Découvrir comment je peux vous aider
              </a>
            </div>
          </div>
        </div>

        {/* Boutons de navigation du carrousel - très discrets */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-1.5 rounded-full transition-all"
            aria-label="Slide précédent"
          >
            <ChevronLeft className="text-white" size={16} />
          </button>

          {/* Indicateurs de pagination */}
          <div className="flex gap-1.5">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white w-4'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-1.5 rounded-full transition-all"
            aria-label="Slide suivant"
          >
            <ChevronRight className="text-white" size={16} />
          </button>
        </div>

      </section>

      {/* Section À propos - Design moderne */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6 order-2 md:order-1">
                <img
                  src="/zenatti.webp"
                  alt="Alain Zenatti - Maître Hypnologue Paris"
                  className="rounded-2xl shadow-2xl w-3/4 md:w-full h-auto object-cover mx-auto md:mx-0"
                  loading="lazy"
                />

                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="block relative group w-full text-left"
                  >
                    <img
                      src="https://img.youtube.com/vi/4VRNBAoAcAE/sddefault.jpg"
                      alt="Présentation d'Alain Zenatti - Maître Hypnologue Paris"
                      className="w-full h-auto object-cover rounded-xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="text-blue-600" size={24} />
                    L'hypnose ericksonienne : une approche respectueuse
                  </h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    L'hypnose que je pratique est issue de l'approche ericksonienne, du nom de Milton H. Erickson, psychiatre et hypnothérapeute reconnu pour avoir révolutionné l'utilisation de l'hypnose thérapeutique.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Contrairement aux approches directives classiques, l'hypnose ericksonienne repose sur l'idée que l'inconscient de chaque personne est une source immense de solutions et de ressources. Cette approche est douce, personnalisée, et respecte pleinement votre rythme et vos choix inconscients.
                  </p>
                </div>
              </div>

              <div className="space-y-6 order-1 md:order-2">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                  Alain Zenatti, Hypnothérapeute à Paris
                </h2>
                <p className="text-xl text-blue-600 font-semibold">
                  Maître Hypnologue certifié • Cabinet Paris 4ème Marais-Bastille
                </p>

                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <p className="font-semibold text-gray-900 mb-2">Votre hypnothérapeute à Paris : expertise et bienveillance</p>
                  <p className="text-gray-700 leading-relaxed">
                    En tant que <strong>Maître Hypnologue certifié</strong>, je vous accompagne au cœur de Paris avec plus de 5 années d'expérience en hypnose ericksonienne et auto-hypnose.
                    Mon cabinet situé dans le Marais (Paris 4ème) vous offre un accompagnement professionnel de haut niveau, alliant formation approfondie et approche personnalisée.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Vous êtes accueilli dans votre singularité, sans jugement, avec attention. Qu'il s'agisse de votre stress persistant, de vos blocages émotionnels, de votre manque de confiance, ou simplement de votre besoin de réorientation intérieure, vous n'êtes pas dirigé, mais accompagné dans un dialogue respectueux avec votre inconscient.
                </p>

                <blockquote className="pl-6 border-l-4 border-blue-500 italic text-gray-700">
                  "Un mouvement intérieur qui ne force rien, mais qui facilite l'émergence de votre mieux-être authentique, durable et aligné avec qui vous êtes."
                  <footer className="text-gray-600 text-sm mt-2 not-italic">— Alain Zenatti, Maître Hypnologue</footer>
                </blockquote>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-gray-900">Formation approfondie et continue</p>
                      <p className="text-gray-600">Maître Hypnologue certifié, formation continue en hypnose ericksonienne</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-gray-900">Approche personnalisée et collaborative</p>
                      <p className="text-gray-600">Chaque séance adaptée à vos besoins spécifiques et votre rythme</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-gray-900">Transparence totale</p>
                      <p className="text-gray-600">Chaque étape expliquée pour comprendre le processus</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-gray-900">Techniques validées scientifiquement</p>
                      <p className="text-gray-600">Hypnose ericksonienne, PNL, hypnose directive et spirituelle</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Calendar size={24} />
                  Prendre rendez-vous
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi choisir NovaHypnose */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi choisir un hypnothérapeute à Paris qualifié ?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Trouver le meilleur hypnothérapeute à Paris est essentiel pour garantir un accompagnement sûr et efficace.
              Voici ce qui fait la différence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Award className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Expertise reconnue
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Maître Hypnologue certifié avec plus de 5 ans d'expérience.
                Formation continue pour garantir les meilleures pratiques.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Hypnose ericksonienne certifiée</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Auto-hypnose et accompagnement personnalisé</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Formation continue en hypnothérapie</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Localisation idéale à Paris
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cabinet situé au cœur de Paris 4ème, quartier Marais-Bastille, facilement accessible en métro.
                Cadre chaleureux et confidentiel pour vos séances.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Métro Bastille (lignes 1, 5, 8)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Horaires flexibles (11h-20h)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Téléconsultations disponibles</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Approche personnalisée
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chaque séance est adaptée à vos besoins spécifiques. Accompagnement bienveillant et sans jugement
                pour un travail en profondeur.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Écoute attentive et empathique</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Techniques sur-mesure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Résultats durables et mesurables</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Note moyenne : 5/5 ⭐⭐⭐⭐⭐
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Basé sur les avis vérifiés de patients accompagnés à Paris et en Île-de-France.
              Spécialiste reconnu pour le traitement du stress, de l'anxiété et des phobies.
            </p>
            <a
              href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              <Calendar size={24} />
              Prendre rendez-vous maintenant
            </a>
          </div>
        </div>
      </section>

      {/* Section Applications DÉTAILLÉE */}
      <section id="applications" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Apaiser, transformer, réactiver ce qui est prêt en vous
          </h2>

          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-center text-lg text-gray-700 mb-4">
              L'hypnose agit là où la volonté seule atteint ses limites : dans les mécanismes profonds, émotionnels et inconscients qui influencent notre manière de penser, de réagir, de vivre.
            </p>
            <p className="text-center text-lg text-gray-700 mb-4">
              En travaillant avec votre inconscient, nous n'imposons rien : nous l'invitons à mobiliser ses propres ressources pour restaurer l'équilibre, alléger les tensions et soutenir vos capacités d'adaptation et de changement.
            </p>
            <p className="text-center text-lg text-gray-700">
              Chaque accompagnement s'adapte à votre réalité. Voici quelques domaines dans lesquels l'hypnose peut vous aider concrètement :
            </p>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => {
              const Icon = app.icon;
              return (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                    <Icon className="text-blue-500 group-hover:text-white transition-colors" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{app.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{app.description}</p>
                </div>
              );
            })}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative max-w-lg mx-auto pb-12">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentApplication * 100}%)` }}>
                {applications.map((app, index) => {
                  const Icon = app.icon;
                  return (
                    <div key={index} className="min-w-full px-2">
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                          <Icon className="text-blue-500" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{app.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{app.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation en bas */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={() => setCurrentApplication(prev => prev === 0 ? applications.length - 1 : prev - 1)}
                className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
                aria-label="Application précédente"
              >
                <ChevronLeft className="text-blue-500" size={14} />
              </button>

              <div className="flex gap-1.5">
                {applications.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentApplication(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentApplication === index ? 'w-4 bg-blue-500' : 'w-1.5 bg-gray-300'
                    }`}
                    aria-label={`Application ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentApplication(prev => prev === applications.length - 1 ? 0 : prev + 1)}
                className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
                aria-label="Application suivante"
              >
                <ChevronRight className="text-blue-500" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Comment ça fonctionne */}
      <section id="comment-fonctionne" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment fonctionne l'hypnose ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              L'hypnose n'est ni magique ni mystérieuse. C'est un état naturel que votre cerveau connaît déjà.
            </p>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="text-blue-500" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">État naturel</h3>
              <p className="text-gray-600">
                Un état de conscience modifié que vous expérimentez naturellement (rêverie, absorption dans un livre)
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-blue-500" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Vous gardez le contrôle</h3>
              <p className="text-gray-600">
                Vous restez conscient et pouvez refuser toute suggestion qui ne vous convient pas
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="text-blue-500" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accès aux ressources</h3>
              <p className="text-gray-600">
                Accédez à vos ressources inconscientes et créez de nouveaux apprentissages positifs
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-500" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaboration active</h3>
              <p className="text-gray-600">
                Vous êtes acteur de votre changement. Le thérapeute guide, vous créez les solutions
              </p>
            </div>
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative max-w-lg mx-auto pb-12">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentHowItWorks * 100}%)` }}>
                <div className="min-w-full px-2">
                  <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Brain className="text-blue-500" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">État naturel</h3>
                    <p className="text-gray-600">
                      Un état de conscience modifié que vous expérimentez naturellement (rêverie, absorption dans un livre)
                    </p>
                  </div>
                </div>

                <div className="min-w-full px-2">
                  <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Shield className="text-blue-500" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Vous gardez le contrôle</h3>
                    <p className="text-gray-600">
                      Vous restez conscient et pouvez refuser toute suggestion qui ne vous convient pas
                    </p>
                  </div>
                </div>

                <div className="min-w-full px-2">
                  <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Lightbulb className="text-blue-500" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Accès aux ressources</h3>
                    <p className="text-gray-600">
                      Accédez à vos ressources inconscientes et créez de nouveaux apprentissages positifs
                    </p>
                  </div>
                </div>

                <div className="min-w-full px-2">
                  <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="text-blue-500" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Collaboration active</h3>
                    <p className="text-gray-600">
                      Vous êtes acteur de votre changement. Le thérapeute guide, vous créez les solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation en bas */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={() => setCurrentHowItWorks(prev => prev === 0 ? 3 : prev - 1)}
                className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
                aria-label="Précédent"
              >
                <ChevronLeft className="text-blue-500" size={14} />
              </button>

              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHowItWorks(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentHowItWorks === index ? 'w-4 bg-blue-500' : 'w-1.5 bg-gray-300'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentHowItWorks(prev => prev === 3 ? 0 : prev + 1)}
                className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
                aria-label="Suivant"
              >
                <ChevronRight className="text-blue-500" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Déroulement d'une séance */}
      <section id="deroulement" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Déroulement d'une séance
            </h2>

            <div className="space-y-4">
              {[
                { title: 'Entretien initial', content: 'Nous discutons de vos objectifs, de vos attentes et je vous explique le processus en détail. Vos questions sont les bienvenues.' },
                { title: 'Induction hypnotique', content: 'Phase de relaxation progressive pour accéder à l\'état hypnotique. Vous restez conscient et en contrôle à tout moment.' },
                { title: 'Travail thérapeutique', content: 'Nous travaillons sur vos objectifs en mobilisant vos ressources inconscientes. Approche personnalisée selon vos besoins.' },
                { title: 'Retour et débriefing', content: 'Retour progressif à l\'état de veille. Nous échangeons sur votre expérience et les prochaines étapes.' }
              ].map((step, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => {
                      const content = document.getElementById(`seance-content-${index + 1}`);
                      const icon = document.getElementById(`seance-icon-${index + 1}`);
                      if (content && icon) {
                        if (content.classList.contains('hidden')) {
                          content.classList.remove('hidden');
                          icon.style.transform = 'rotate(180deg)';
                        } else {
                          content.classList.add('hidden');
                          icon.style.transform = 'rotate(0deg)';
                        }
                      }
                    }}
                    className="w-full text-left p-6 bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                        {index + 1}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <ChevronDown id={`seance-icon-${index + 1}`} className="text-blue-500 transition-transform flex-shrink-0" size={24} />
                  </button>
                  <div id={`seance-content-${index + 1}`} className="hidden p-6 bg-white">
                    <p className="text-gray-600 leading-relaxed">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Tarifs */}
      <section id="tarifs" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Tarifs & Formules
            </h2>
            <p className="text-xl text-gray-600">
              Des formules de séances d'hypnothérapie adaptées à vos besoins
            </p>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Séance individuelle */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Séance Individuelle</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-blue-600">90€</span>
                <span className="text-gray-600">/séance</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-600">Séance personnalisée</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-600">Cabinet ou téléconsultation</span>
                </li>
              </ul>
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 bg-white border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Réserver
              </a>
            </div>

            {/* Pack 3 séances */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-bold">
                RECOMMANDÉ
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pack 3 Séances</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">255€</span>
                <span className="text-blue-100">/pack</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-white flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">85€/séance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-white flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">Suivi personnalisé</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-white flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">Économisez 15€</span>
                </li>
              </ul>
              <a
                href="https://buy.stripe.com/aFacN4bfL1nZ6Za3PO4ko07"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Réserver
              </a>
            </div>

            {/* Pack 5 séances */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pack 5 Séances</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-blue-600">400€</span>
                <span className="text-gray-600">/pack</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-600">80€/séance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-600">Transformation profonde</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-600">Économisez 50€</span>
                </li>
              </ul>
              <a
                href="https://buy.stripe.com/14A14mdnT7Mn1EQ1HG4ko08"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 bg-white border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Réserver
              </a>
            </div>
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative max-w-lg mx-auto pb-12 pt-4">
            <div className="overflow-visible">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentPricing * 100}%)` }}>
                {/* Séance individuelle */}
                <div className="min-w-full px-2">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Séance Individuelle</h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-blue-600">90€</span>
                      <span className="text-gray-600">/séance</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-600">Séance personnalisée</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-600">Cabinet ou téléconsultation</span>
                      </li>
                    </ul>
                    <a
                      href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-6 py-3 bg-white border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Réserver
                    </a>
                  </div>
                </div>

                {/* Pack 3 séances */}
                <div className="min-w-full px-2">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl shadow-2xl relative overflow-visible">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-4 py-1 rounded-full text-xs font-bold shadow-md z-10">
                      RECOMMANDÉ
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 mt-2">Pack 3 Séances</h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-white">255€</span>
                      <span className="text-blue-100">/pack</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-white flex-shrink-0 mt-1" size={20} />
                        <span className="text-white">85€/séance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-white flex-shrink-0 mt-1" size={20} />
                        <span className="text-white">Suivi personnalisé</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-white flex-shrink-0 mt-1" size={20} />
                        <span className="text-white">Économisez 15€</span>
                      </li>
                    </ul>
                    <a
                      href="https://buy.stripe.com/aFacN4bfL1nZ6Za3PO4ko07"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Réserver
                    </a>
                  </div>
                </div>

                {/* Pack 5 séances */}
                <div className="min-w-full px-2">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Pack 5 Séances</h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-blue-600">400€</span>
                      <span className="text-gray-600">/pack</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-600">80€/séance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-600">Transformation profonde</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-600">Économisez 50€</span>
                      </li>
                    </ul>
                    <a
                      href="https://buy.stripe.com/14A14mdnT7Mn1EQ1HG4ko08"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-6 py-3 bg-white border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Réserver
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation en bas */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={() => setCurrentPricing(prev => prev === 0 ? 2 : prev - 1)}
                className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
                aria-label="Tarif précédent"
              >
                <ChevronLeft className="text-blue-500" size={14} />
              </button>

              <div className="flex gap-1.5">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPricing(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentPricing === index ? 'w-4 bg-blue-500' : 'w-1.5 bg-gray-300'
                    }`}
                    aria-label={`Tarif ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentPricing(prev => prev === 2 ? 0 : prev + 1)}
                className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
                aria-label="Tarif suivant"
              >
                <ChevronRight className="text-blue-500" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA finale */}
      <section id="cta" className="py-20 bg-nova-blue-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            Prêt à commencer votre transformation ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Réservez votre première séance dès maintenant et découvrez comment l'hypnose peut vous aider
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Calendar size={24} />
              Prendre rendez-vous
            </a>
            <a
              href="tel:0649358089"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg text-lg font-semibold transition-all"
            >
              <Phone size={24} />
              Appeler maintenant
            </a>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section id="temoignages" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent mes clients
            </h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={32}
                  className="text-yellow-400 fill-yellow-400 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <p className="text-xl text-gray-600">
              Note moyenne de 5/5 sur Google My Business & Resalib
            </p>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "Découvrir NOVA HYPNOSE est une expérience marquante. Alain propose de véritables parcours de transformation.
                J'ai laissé derrière moi certaines croyances figées et ouvert un espace intérieur plus libre."
              </p>
              <p className="font-semibold text-gray-900">Edward</p>
              <p className="text-sm text-gray-500">il y a 2 mois</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "J'ai consulté pour un problème d'anxiété. Dès la première séance je me suis sentie apaisée.
                Mon anxiété a totalement disparue en 3 séances. Je recommande vivement."
              </p>
              <p className="font-semibold text-gray-900">Marie</p>
              <p className="text-sm text-gray-500">il y a 3 mois</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "Un praticien calme et réfléchi. En quelques séances, j'ai pu me libérer de certains blocages
                et entamer des changements pérennes. Merci pour cette évolution importante."
              </p>
              <p className="font-semibold text-gray-900">Philippe</p>
              <p className="text-sm text-gray-500">il y a 3 mois</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "Excellente séance avec Alain qui sait comprendre nos besoins puis faire en sorte
                que l'on atteigne nos objectifs."
              </p>
              <p className="font-semibold text-gray-900">Jaouad</p>
              <p className="text-sm text-gray-500">il y a 3 mois</p>
            </div>
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative max-w-lg mx-auto pb-12">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                <div className="min-w-full px-2">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "Découvrir NOVA HYPNOSE est une expérience marquante. Alain propose de véritables parcours de transformation.
                      J'ai laissé derrière moi certaines croyances figées et ouvert un espace intérieur plus libre."
                    </p>
                    <p className="font-semibold text-gray-900">Edward</p>
                    <p className="text-sm text-gray-500">il y a 2 mois</p>
                  </div>
                </div>

                <div className="min-w-full px-2">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "J'ai consulté pour un problème d'anxiété. Dès la première séance je me suis sentie apaisée.
                      Mon anxiété a totalement disparue en 3 séances. Je recommande vivement."
                    </p>
                    <p className="font-semibold text-gray-900">Marie</p>
                    <p className="text-sm text-gray-500">il y a 3 mois</p>
                  </div>
                </div>

                <div className="min-w-full px-2">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "Un praticien calme et réfléchi. En quelques séances, j'ai pu me libérer de certains blocages
                      et entamer des changements pérennes. Merci pour cette évolution importante."
                    </p>
                    <p className="font-semibold text-gray-900">Philippe</p>
                    <p className="text-sm text-gray-500">il y a 3 mois</p>
                  </div>
                </div>

                <div className="min-w-full px-2">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "Excellente séance avec Alain qui sait comprendre nos besoins puis faire en sorte
                      que l'on atteigne nos objectifs."
                    </p>
                    <p className="font-semibold text-gray-900">Jaouad</p>
                    <p className="text-sm text-gray-500">il y a 3 mois</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation en bas */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={() => setCurrentTestimonial(prev => prev === 0 ? 3 : prev - 1)}
                className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="text-blue-500" size={14} />
              </button>

              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentTestimonial === index ? 'w-4 bg-blue-500' : 'w-1.5 bg-gray-300'
                    }`}
                    aria-label={`Témoignage ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentTestimonial(prev => prev === 3 ? 0 : prev + 1)}
                className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="text-blue-500" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                  Contactez-moi
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Vous avez des questions ? N'hésitez pas à me contacter.
                  Je suis là pour vous accompagner dans votre démarche.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Téléphone</p>
                      <a href="tel:0649358089" className="text-blue-600 hover:underline text-lg">
                        06 49 35 80 89
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Email</p>
                      <a href="mailto:contact@novahypnose.fr" className="text-blue-600 hover:underline text-lg">
                        contact@novahypnose.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Adresse</p>
                      <p className="text-gray-600 text-lg">
                        16 rue St Antoine<br />
                        75004 Paris (Marais - Bastille)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Horaires</p>
                      <p className="text-gray-600 text-lg">
                        Lun - Ven : 11h - 20h<br />
                        Sur rendez-vous uniquement
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <CommuteMap />
              </div>
            </div>

            {/* Application mobile NovaRespire */}
            <div className="mt-16 border-t border-gray-200 pt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Application mobile NovaRespire</h3>
              <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto leading-relaxed">
                Complétez vos séances avec NovaRespire, l'application mobile qui vous propose des techniques de respiration et exercices de relaxation pour gérer le stress et l'anxiété au quotidien. Créée par Alain Zenatti, elle vous accompagne où que vous soyez.
              </p>
              <div className="text-center">
                <a
                  href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity"
                  aria-label="Télécharger NovaRespire sur Google Play"
                >
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png"
                    alt="Disponible sur Google Play"
                    className="h-16 mx-auto w-auto object-contain"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Auto-hypnose */}
      <section id="self-hypnosis" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            L'auto-hypnose : devenez votre propre thérapeute
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Pourquoi apprendre l'auto-hypnose ?
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                L'auto-hypnose est une compétence précieuse qui vous permettra de prolonger et d'approfondir
                les bienfaits des séances avec votre hypnothérapeute.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Une fois maîtrisée, cette technique devient un outil puissant pour gérer votre stress,
                améliorer votre sommeil, renforcer votre confiance et cultiver un état de bien-être au quotidien.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Je vous propose d'apprendre des techniques simples et efficaces, adaptées à vos besoins spécifiques,
                que vous pourrez pratiquer en toute autonomie.
              </p>

              <a
                href="https://harmonia.novahypnose.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <BookOpen size={24} />
                Découvrez la formation Harmonia : réduire le stress avec l'auto-hypnose
              </a>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images//SPLASH.webp"
                  alt="Formation auto-hypnose Paris"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-500 p-6 rounded-full shadow-lg">
                <Sparkles className="text-white" size={32} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Auto-hypnose pour le stress
              </h4>
              <p className="text-gray-600">
                Apprenez à entrer rapidement dans un état de calme profond,
                même au milieu des situations les plus stressantes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Auto-hypnose pour le sommeil
              </h4>
              <p className="text-gray-600">
                Découvrez des techniques puissantes pour améliorer la qualité de votre sommeil
                et installer un rituel apaisant avant de vous coucher.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Auto-hypnose pour la confiance
              </h4>
              <p className="text-gray-600">
                Renforcez votre estime personnelle grâce à des exercices d'ancrage
                et de visualisation positive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section id="faq" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
            Questions fréquentes sur l'hypnothérapie
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
                    {openFaqIndex === index ?
                      <ChevronUp className="text-blue-500 flex-shrink-0" size={24} /> :
                      <ChevronDown className="text-blue-500 flex-shrink-0" size={24} />
                    }
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      openFaqIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal vidéo */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              aria-label="Fermer la vidéo"
            >
              <X size={24} />
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/4VRNBAoAcAE?autoplay=1"
                title="Présentation d'Alain Zenatti - Maître Hypnologue Paris"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </ContentLayout>
    </>
  );
};

export default Index;
