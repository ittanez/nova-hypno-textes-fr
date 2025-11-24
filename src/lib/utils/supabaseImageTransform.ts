/**
 * Utilitaire pour générer des URLs d'images Supabase transformées
 * Utilise l'API de transformation Supabase Storage
 */

interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

/**
 * Transforme une URL d'image Supabase Storage en URL avec transformations
 * @param url - URL originale de l'image Supabase
 * @param options - Options de transformation
 * @returns URL transformée
 */
export function transformSupabaseImage(
  url: string,
  options: ImageTransformOptions = {}
): string {
  // Si ce n'est pas une URL Supabase Storage, retourner l'originale
  if (!url.includes('supabase.co/storage/v1/object/public/')) {
    return url;
  }

  const { width, height, quality = 80, format } = options;

  // Remplacer /object/public/ par /render/image/public/
  let transformedUrl = url.replace(
    '/storage/v1/object/public/',
    '/storage/v1/render/image/public/'
  );

  // Ajouter les paramètres de transformation
  const params = new URLSearchParams();

  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  if (quality) params.append('quality', quality.toString());
  if (format) params.append('format', format);

  const queryString = params.toString();
  if (queryString) {
    transformedUrl += `?${queryString}`;
  }

  return transformedUrl;
}

/**
 * Génère un srcset pour une image Supabase avec différentes largeurs
 * @param url - URL originale de l'image
 * @param widths - Tableau de largeurs pour le srcset
 * @param quality - Qualité de l'image (défaut: 80) ou tableau de qualités par taille
 * @returns String srcset pour l'attribut HTML
 */
export function generateSupabaseSrcSet(
  url: string,
  widths: number[] = [400, 800, 1200, 1600],
  quality: number | number[] = 80
): string {
  return widths
    .map((width, index) => {
      // Qualité adaptative : utiliser tableau si fourni, sinon valeur fixe
      const q = Array.isArray(quality) ? quality[index] || quality[0] : quality;
      const transformedUrl = transformSupabaseImage(url, { width, quality: q });
      return `${transformedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * Tailles recommandées pour les images du carousel
 * ULTRA-OPTIMISÉES pour réduire drastiquement le poids (Phase 6 - AGRESSIVE)
 */
export const CAROUSEL_IMAGE_SIZES = {
  mobile: 320,      // Réduit: 360 → 320 (-25% poids total)
  tablet: 540,      // Réduit: 600 → 540 (-20% poids)
  desktop: 800,     // Réduit: 900 → 800 (-22% poids)
  large: 1024,      // Réduit: 1200 → 1024 (-30% poids)
};

/**
 * Génère le srcset optimisé pour les images du carousel
 * Qualité ULTRA-BASSE : compression maximale pour réduire le poids (Phase 6)
 */
export function getCarouselImageSrcSet(url: string): {
  src: string;
  srcSet: string;
  sizes: string;
} {
  return {
    // Image par défaut (mobile-first, compression maximale)
    src: transformSupabaseImage(url, { width: CAROUSEL_IMAGE_SIZES.mobile, quality: 40 }),
    // srcset avec qualité ultra-basse pour poids minimal
    srcSet: generateSupabaseSrcSet(
      url,
      [
        CAROUSEL_IMAGE_SIZES.mobile,   // 320px
        CAROUSEL_IMAGE_SIZES.tablet,   // 540px
        CAROUSEL_IMAGE_SIZES.desktop,  // 800px
        CAROUSEL_IMAGE_SIZES.large,    // 1024px
      ],
      [40, 45, 50, 55]  // Qualité réduite : -10 points sur chaque breakpoint
    ),
    // Tailles selon le viewport
    sizes: '100vw',
  };
}
