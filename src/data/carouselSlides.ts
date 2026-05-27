/**
 * Données du carousel hero de la page d'accueil
 * Alt text optimisé SEO pour "hypnothérapeute Paris" et "hypnose Paris"
 */

export interface CarouselSlide {
  type: 'video';
  image: string;
  poster: string;
  title: string;
  description: string;
  alt?: string;
}

export const carouselSlides: CarouselSlide[] = [
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/alain.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carroussel/alaincab.webp',
    title: 'TRANSFORMEZ VOTRE VIE PAR L\'HYPNOSE',
    description: 'Thérapie brève orientée solutions • 3 à 5 séances • Alain ZENATTI, Maître Hypnologue Paris 4ème',
    alt: 'Alain Zenatti, hypnothérapeute à Paris 4ème dans son cabinet d\'hypnose Marais-Bastille'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/arraignee.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/PHOBIE.webp',
    title: 'PEURS - PHOBIES',
    description: 'Libérez-vous de vos peurs irrationnelles et retrouvez votre liberté de mouvement',
    alt: 'Traitement des phobies par hypnose à Paris - Hypnothérapeute spécialiste des peurs'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/stress-anxiete.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/CABINET.webp',
    title: 'STRESS - ANXIÉTÉ',
    description: 'Sortez du cercle vicieux de la pression permanente • Performance sans épuisement • Résultats en 3 à 5 séances',
    alt: 'Cabinet d\'hypnose Paris 4ème - Séance d\'hypnothérapie pour le stress et l\'anxiété'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/parler-en-public.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/PAROLEPUBLIC.webp',
    title: 'PEUR DE PARLER EN PUBLIC',
    description: 'Surmontez votre anxiété et exprimez-vous avec confiance devant un auditoire',
    alt: 'Hypnose pour la peur de parler en public à Paris - Confiance en soi par l\'hypnothérapie'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/sommeil.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/sommeil.webp',
    title: 'SOMMEIL',
    description: 'Retrouvez un sommeil réparateur et des nuits paisibles grâce à l\'hypnose',
    alt: 'Hypnose pour les troubles du sommeil à Paris - Retrouver un sommeil réparateur'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/POIDS.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/POIDS.webp',
    title: 'POIDS',
    description: 'Atteignez votre poids idéal en modifiant durablement votre rapport à la nourriture',
    alt: 'Hypnose pour la gestion du poids à Paris - Maigrir par l\'hypnothérapie'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/colere.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/COLERE.webp',
    title: 'COLÈRE',
    description: 'Maîtrisez vos émotions et retrouvez le calme intérieur grâce à l\'hypnose',
    alt: 'Gestion de la colère par hypnose à Paris - Hypnothérapeute émotions'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/procrastination.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/PROCRASTINATION.webp',
    title: 'PROCRASTINATION',
    description: 'Dépassez la procrastination et libérez votre potentiel d\'action',
    alt: 'Hypnose contre la procrastination à Paris - Retrouver la motivation'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/grok-video-db3ca028-5456-4df6-ba51-e63e2b1bbc21.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/RONGERSESONGLES.webp',
    title: 'RONGER SES ONGLES',
    description: 'Libérez-vous de cette habitude compulsive de manière définitive',
    alt: 'Hypnose pour arrêter de se ronger les ongles à Paris - Onychophagie'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/difficultes-relationnelles.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/COUPLE.webp',
    title: 'DIFFICULTÉS RELATIONNELLES',
    description: 'Renforcez votre relation et retrouvez l\'harmonie dans votre couple',
    alt: 'Hypnose pour les difficultés relationnelles à Paris - Thérapie de couple par hypnothérapie'
  }
];
