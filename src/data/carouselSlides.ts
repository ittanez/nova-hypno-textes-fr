/**
 * Données du carousel hero de la page d'accueil
 * Extrait de src/pages/Index.tsx pour améliorer la maintenabilité
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
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/ALAIN.webp',
    title: 'RETROUVEZ VOTRE ÉNERGIE ET VOTRE FOCUS',
    description: 'Thérapie brève orientée solutions • 3 à 5 séances • Alain ZENATTI, Maître Hypnologue Paris 4ème'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/arraignee.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/PHOBIE.webp',
    title: 'PEURS - PHOBIES',
    description: 'Libérez-vous de vos peurs irrationnelles et retrouvez votre liberté de mouvement'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/stress-anxiete.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/CABINET.webp',
    title: 'STRESS - ANXIÉTÉ',
    description: 'Sortez du cercle vicieux de la pression permanente • Performance sans épuisement • Résultats en 3 à 5 séances'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/parler-en-public.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/PAROLEPUBLIC.webp',
    title: 'PEUR DE PARLER EN PUBLIC',
    description: 'Surmontez votre anxiété et exprimez-vous avec confiance devant un auditoire'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/sommeil.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/sommeil.webp',
    title: 'SOMMEIL',
    description: 'Retrouvez un sommeil réparateur et des nuits paisibles grâce à l\'hypnose'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/POIDS.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/POIDS.webp',
    title: 'POIDS',
    description: 'Atteignez votre poids idéal en modifiant durablement votre rapport à la nourriture'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/colere.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/COLERE.webp',
    title: 'COLÈRE',
    description: 'Maîtrisez vos émotions et retrouvez le calme intérieur grâce à l\'hypnose'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/procrastination.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/PROCRASTINATION.webp',
    title: 'PROCRASTINATION',
    description: 'Dépassez la procrastination et libérez votre potentiel d\'action'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/grok-video-db3ca028-5456-4df6-ba51-e63e2b1bbc21.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/RONGERSESONGLES.webp',
    title: 'RONGER SES ONGLES',
    description: 'Libérez-vous de cette habitude compulsive de manière définitive'
  },
  {
    type: 'video' as const,
    image: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/video/difficultes-relationnelles.mp4',
    poster: 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/carroussel/COUPLE.webp',
    title: 'DIFFICULTÉS RELATIONNELLES',
    description: 'Renforcez votre relation et retrouvez l\'harmonie dans votre couple'
  }
];
