/**
 * Module de sécurité CORS pour les Edge Functions
 * Restreint l'accès aux domaines autorisés uniquement
 */

// Domaines autorisés
const ALLOWED_ORIGINS = [
  'https://novahypnose.fr',
  'https://www.novahypnose.fr',
  'https://harmonia.novahypnose.fr',
  'https://emergences.novahypnose.fr',
];

/**
 * Génère les headers CORS en fonction de l'origine de la requête
 */
export function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  const isAllowed = ALLOWED_ORIGINS.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  };
}

/**
 * Vérifie si l'origine est autorisée
 */
export function isOriginAllowed(req: Request): boolean {
  const origin = req.headers.get('origin') || '';
  return ALLOWED_ORIGINS.includes(origin);
}

/**
 * Valide le format d'un email
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Sanitize une chaîne pour éviter les injections
 */
export function sanitizeString(str: string, maxLength: number = 1000): string {
  if (!str || typeof str !== 'string') return '';
  return str.slice(0, maxLength).replace(/[<>]/g, '');
}
