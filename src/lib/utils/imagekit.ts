/**
 * ImageKit helper pour optimiser automatiquement les images
 * https://docs.imagekit.io/features/image-transformations
 */

const IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/7higvzmeg';
const SUPABASE_BASE = 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/';

/**
 * Transforme une URL Supabase en URL ImageKit optimisée
 * @param supabaseUrl - URL complète de l'image sur Supabase
 * @param options - Options de transformation
 */
export function getImageKitUrl(
  supabaseUrl: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    blur?: number;
  }
): string {
  // Extraire le chemin après la base URL Supabase
  const path = supabaseUrl.replace(SUPABASE_BASE, '');

  // Construire les paramètres de transformation
  const transformations: string[] = [];

  if (options?.width) transformations.push(`w-${options.width}`);
  if (options?.height) transformations.push(`h-${options.height}`);
  if (options?.quality) transformations.push(`q-${options.quality}`);
  if (options?.format) transformations.push(`f-${options.format}`);
  if (options?.blur) transformations.push(`bl-${options.blur}`);

  // Construire l'URL ImageKit
  const transformString = transformations.length > 0
    ? `tr:${transformations.join(',')}`
    : '';

  return transformString
    ? `${IMAGEKIT_ENDPOINT}/${transformString}/${path}`
    : `${IMAGEKIT_ENDPOINT}/${path}`;
}

/**
 * Génère un srcset optimisé pour les images responsives
 * @param supabaseUrl - URL de l'image sur Supabase
 * @param quality - Qualité par défaut (80)
 */
export function getResponsiveSrcSet(
  supabaseUrl: string,
  quality: number = 80
): {
  src: string;
  srcSet: string;
  sizes: string;
} {
  const widths = [640, 1024, 1920];

  const srcSet = widths
    .map(width => {
      const url = getImageKitUrl(supabaseUrl, {
        width,
        quality,
        format: 'auto' // ImageKit choisit le meilleur format (WebP si supporté)
      });
      return `${url} ${width}w`;
    })
    .join(', ');

  // URL par défaut (mobile first)
  const src = getImageKitUrl(supabaseUrl, {
    width: 1024,
    quality,
    format: 'auto'
  });

  return {
    src,
    srcSet,
    sizes: '100vw' // L'image occupe toute la largeur de la viewport
  };
}
