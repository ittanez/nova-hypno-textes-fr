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
 * OPTIMISÉES pour mobile : tailles encore plus réduites pour adaptation parfaite
 */
export const CAROUSEL_IMAGE_SIZES = {
  mobile: 240,      // Réduit: 280 → 240 (adapté aux petits écrans)
  tablet: 420,      // Réduit: 480 → 420 (adapté tablettes)
  desktop: 600,     // Réduit: 640 → 600 (adapté desktops)
  large: 800,       // Réduit: 900 → 800 (adapté grands écrans)
};

/**
 * Génère le srcset optimisé pour les images du carousel
 * Avec sizes intelligents pour charger la bonne taille selon l'écran
 */
export function getCarouselImageSrcSet(url: string): {
  src: string;
  srcSet: string;
  sizes: string;
} {
  return {
    // Image par défaut pour desktop (fallback si srcSet non supporté)
    src: transformSupabaseImage(url, { width: 768, quality: 60 }),
    // srcset avec plusieurs tailles optimisées
    srcSet: generateSupabaseSrcSet(
      url,
      [
        480,   // Mobile
        768,   // Tablet
        1024,  // Desktop
        1536,  // Large
      ],
      [40, 50, 60, 70]  // Qualité adaptative améliorée
    ),
    // sizes intelligents pour charger la bonne image selon la largeur d'écran
    // Mobile (0-640px): 100vw → charge 480px
    // Tablet (640-1024px): 90vw → charge 768px
    // Desktop (1024px+): 80vw → charge 1024-1536px
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw',
  };
}
