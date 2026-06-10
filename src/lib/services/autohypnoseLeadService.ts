import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

interface GuideLeadResult {
  success: boolean;
  error?: string;
}

/**
 * Inscrit un lead pour le guide autohypnose et déclenche l'envoi par email.
 * Appelle la Edge Function send-ebook-brevo qui crée/met à jour le contact Brevo et envoie l'email.
 */
export async function submitAutohypnoseLead(
  prenom: string,
  email: string,
  location: string
): Promise<GuideLeadResult> {
  try {
    const { error: fnError } = await supabase.functions.invoke(
      'send-ebook-brevo',
      { body: { firstName: prenom, email, location } }
    );

    if (fnError) {
      logger.error('Erreur Edge Function send-ebook-brevo:', fnError);
      return { success: false, error: "L'envoi de l'email a échoué. Veuillez réessayer." };
    }

    return { success: true };
  } catch (err) {
    logger.error('Exception submitAutohypnoseLead:', err);
    return { success: false, error: 'Une erreur inattendue est survenue.' };
  }
}
