import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

interface Subscriber {
  id: string;
  email: string;
  verified: boolean;
  created_at: string;
}

export async function addSubscriber(email: string): Promise<{ data: Subscriber | null; error: any }> {
  logger.debug('=== DEBUT INSCRIPTION ABONNE ===');
  logger.debug('Email a inscrire:', email);
  
  try {
    // 1. Inserer l'abonne dans la base de donnees
    logger.debug('Etape 1: Insertion en base de donnees...');
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email, verified: true }])
      .select('*')
      .single();
    
    if (error) {
      logger.error('Erreur lors de l\'insertion en base:', error);
      return { data: null, error };
    }
    
    logger.debug('Abonne ajoute en base avec succes:', data);
    
    // 2. Envoyer l'email de confirmation a l'abonne
    logger.debug('Etape 2: Envoi de l\'email de confirmation...');
    try {
      logger.debug('Appel de la fonction send-confirmation-email...');
      const emailResponse = await supabase.functions.invoke('send-confirmation-email', {
        body: { email: data.email }
      });

      logger.debug('Reponse complete de la fonction email:', emailResponse);

      if (emailResponse.error) {
        logger.error('Erreur de la fonction edge:', emailResponse.error);
        // On ne fait pas echouer l'inscription si l'email echoue
        logger.warn('L\'email de confirmation n\'a pas pu etre envoye, mais l\'inscription est reussie');
      } else {
        logger.debug('Email de confirmation envoye avec succes!');
        logger.debug('Donnees de l\'email:', emailResponse.data);
      }
    } catch (emailError) {
      logger.error('Exception lors de l\'envoi de l\'email:', emailError);
      // On ne fait pas echouer l'inscription si l'email echoue
      logger.warn('Exception email, mais inscription reussie');
    }

    // 3. Notifier l'administrateur
    logger.debug('Etape 3: Envoi de la notification admin...');
    try {
      logger.debug('Envoi notification a a.zenatti@gmail.com...');
      const adminEmailResponse = await supabase.functions.invoke('send-admin-notification', {
        body: {
          subscriberEmail: data.email,
          adminEmail: 'a.zenatti@gmail.com'
        }
      });

      if (adminEmailResponse.error) {
        logger.error('Erreur notification admin:', adminEmailResponse.error);
      } else {
        logger.debug('Notification admin envoyee avec succes!');
      }
    } catch (adminError) {
      logger.error('Exception lors de la notification admin:', adminError);
    }
    
    logger.debug('=== FIN INSCRIPTION ABONNE - SUCCES ===');
    return { data, error: null };
    
  } catch (globalError) {
    logger.error('Exception globale lors de l\'inscription:', globalError);
    logger.debug('=== FIN INSCRIPTION ABONNE - ECHEC ===');
    return { data: null, error: globalError };
  }
}

export async function getSubscribers(): Promise<{ data: Subscriber[] | null; error: any }> {
  logger.debug('Recuperation de la liste des abonnes');
  
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    logger.error('Erreur lors de la recuperation des abonnes:', error);
    return { data: null, error };
  }
  
  logger.debug('Abonnes recuperes:', data?.length || 0);
  return { data, error: null };
}
