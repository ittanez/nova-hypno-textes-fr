import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

interface GuideLeadResult {
  success: boolean;
  error?: string;
}

/**
 * Inscrit un lead pour le guide carrière et déclenche l'envoi par email.
 * Appelle la Edge Function ebook-carriere-brevo qui crée/met à jour le contact Brevo et envoie l'email.
 */
export async function submitCarriereLead(
  prenom: string,
  email: string,
  location: string
): Promise<GuideLeadResult> {
  try {
    const { error: fnError } = await supabase.functions.invoke(
      'ebook-carriere-brevo',
      { body: { firstName: prenom, email, location } }
    );

    if (fnError) {
      logger.error('Erreur Edge Function ebook-carriere-brevo:', fnError);
      return { success: false, error: "L'envoi de l'email a échoué. Veuillez réessayer." };
    }

    return { success: true };
  } catch (err) {
    logger.error('Exception submitCarriereLead:', err);
    return { success: false, error: 'Une erreur inattendue est survenue.' };
  }
}
