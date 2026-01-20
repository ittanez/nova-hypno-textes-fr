
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

export async function notifySubscribersOfNewArticle(
  articleId: string, 
  articleTitle: string, 
  articleSlug: string, 
  articleExcerpt?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    logger.debug('=== DEBUT NOTIFICATION ABONNES ===');
    logger.debug('Article:', { articleId, articleTitle, articleSlug, articleExcerpt });
    
    logger.debug('Appel de la fonction notify-subscribers...');
    const { data, error } = await supabase.functions.invoke('notify-subscribers', {
      body: {
        articleId,
        articleTitle,
        articleSlug,
        articleExcerpt
      }
    });
    
    logger.debug('Reponse complete de notify-subscribers:', { data, error });
    
    if (error) {
      logger.error('Erreur de la fonction notify-subscribers:', error);
      return { success: false, error: error.message };
    }
    
    logger.debug('Notification des abonnes reussie');
    logger.debug('=== FIN NOTIFICATION ABONNES - SUCCES ===');
    return { success: true };
  } catch (err: any) {
    logger.error('Exception lors de la notification des abonnes:', err);
    logger.debug('=== FIN NOTIFICATION ABONNES - ECHEC ===');
    return { success: false, error: err.message };
  }
}
