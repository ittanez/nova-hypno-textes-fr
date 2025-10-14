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
 * @param quality - Qualité de l'image (défaut: 80)
 * @returns String srcset pour l'attribut HTML
 */
export function generateSupabaseSrcSet(
  url: string,
  widths: number[] = [400, 800, 1200, 1600],
  quality: number = 80
): string {
  return widths
    .map((width) => {
      const transformedUrl = transformSupabaseImage(url, { width, quality });
      return `${transformedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * Tailles recommandées pour les images du carousel
 */
export const CAROUSEL_IMAGE_SIZES = {
  mobile: 640,
  tablet: 1024,
  desktop: 1920,
};

/**
 * Génère le srcset optimisé pour les images du carousel
 */
export function getCarouselImageSrcSet(url: string): {
  src: string;
  srcSet: string;
  sizes: string;
} {
  return {
    // Image par défaut (pour mobile)
    src: transformSupabaseImage(url, { width: CAROUSEL_IMAGE_SIZES.mobile, quality: 80 }),
    // srcset avec différentes tailles
    srcSet: generateSupabaseSrcSet(
      url,
      [
        CAROUSEL_IMAGE_SIZES.mobile,
        CAROUSEL_IMAGE_SIZES.tablet,
        CAROUSEL_IMAGE_SIZES.desktop,
      ],
      80
    ),
    // Tailles selon le viewport
    sizes: '100vw',
  };
}
