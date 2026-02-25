import { supabase } from '@/integrations/supabase/client';

interface GuideLeadResult {
  success: boolean;
  error?: string;
}

/**
 * Inscrit un lead pour le guide autohypnose et déclenche l'envoi par email.
 * 1. INSERT dans guide_leads (Supabase)
 * 2. Appelle la Edge Function send-guide-autohypnose (Resend)
 */
export async function submitAutohypnoseLead(
  prenom: string,
  email: string
): Promise<GuideLeadResult> {
  try {
    // 1. Enregistrer le lead en base
    const { error: dbError } = await supabase
      .from('guide_leads')
      .upsert([{ prenom, email, source: 'autohypnose' }], { onConflict: 'email' });

    if (dbError) {
      console.error('Erreur insertion guide_leads:', dbError);
      // On continue quand même pour envoyer l'email
    }

    // 2. Envoyer l'email avec le guide autohypnose
    const { error: fnError } = await supabase.functions.invoke(
      'send-guide-autohypnose',
      { body: { prenom, email } }
    );

    if (fnError) {
      console.error('Erreur Edge Function send-guide-autohypnose:', fnError);
      return { success: false, error: "L'envoi de l'email a échoué. Veuillez réessayer." };
    }

    return { success: true };
  } catch (err) {
    console.error('Exception submitAutohypnoseLead:', err);
    return { success: false, error: 'Une erreur inattendue est survenue.' };
  }
}
