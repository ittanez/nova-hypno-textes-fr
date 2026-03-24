import { supabase } from '@/integrations/supabase/client';

interface GuideLeadResult {
  success: boolean;
  error?: string;
}

/**
 * Inscrit un lead pour le guide sommeil et déclenche l'envoi par email.
 * Appelle la Edge Function ebook-sommeil-brevo qui crée/met à jour le contact Brevo et envoie l'email.
 */
export async function submitSommeilLead(
  prenom: string,
  email: string,
  location: string
): Promise<GuideLeadResult> {
  try {
    const { error: fnError } = await supabase.functions.invoke(
      'ebook-sommeil-brevo',
      { body: { firstName: prenom, email, location } }
    );

    if (fnError) {
      console.error('Erreur Edge Function ebook-sommeil-brevo:', fnError);
      return { success: false, error: "L'envoi de l'email a échoué. Veuillez réessayer." };
    }

    return { success: true };
  } catch (err) {
    console.error('Exception submitSommeilLead:', err);
    return { success: false, error: 'Une erreur inattendue est survenue.' };
  }
}
