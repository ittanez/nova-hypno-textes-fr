// Import des utilitaires de sécurité partagés
export { getCorsHeaders, isValidEmail, sanitizeString } from '../_shared/cors.ts';

// Headers CORS sécurisés (restreints au domaine principal)
export const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://novahypnose.fr',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const fromAddress = 'contact@updates.novahypnose.fr';
