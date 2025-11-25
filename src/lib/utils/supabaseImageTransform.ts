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
 * RÉDUCTION EXTRÊME pour poids minimal absolu (Phase 7 - ULTRA-LIGHT)
 */
export const CAROUSEL_IMAGE_SIZES = {
  mobile: 280,      // Réduit: 320 → 280 (-50% vs original)
  tablet: 480,      // Réduit: 540 → 480 (-40% vs original)
  desktop: 640,     // Réduit: 800 → 640 (-45% vs original)
  large: 900,       // Réduit: 1024 → 900 (-50% vs original)
};

/**
 * Génère le srcset optimisé pour les images du carousel
 * Qualité MINIMALE : compression extrême pour poids minimal (Phase 7)
 */
export function getCarouselImageSrcSet(url: string): {
  src: string;
  srcSet: string;
  sizes: string;
} {
  return {
    // Image par défaut (mobile-first, compression extrême)
    src: transformSupabaseImage(url, { width: CAROUSEL_IMAGE_SIZES.mobile, quality: 30 }),
    // srcset avec qualité minimale absolue
    srcSet: generateSupabaseSrcSet(
      url,
      [
        CAROUSEL_IMAGE_SIZES.mobile,   // 280px
        CAROUSEL_IMAGE_SIZES.tablet,   // 480px
        CAROUSEL_IMAGE_SIZES.desktop,  // 640px
        CAROUSEL_IMAGE_SIZES.large,    // 900px
      ],
      [30, 35, 40, 45]  // Qualité minimale : -10 points supplémentaires
    ),
    // Tailles selon le viewport
    sizes: '100vw',
  };
}
