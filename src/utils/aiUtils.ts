
/**
 * Génère un résumé et des mots-clés automatiquement à partir du contenu d'un article
 * Remarque: Dans une application réelle, cela pourrait être une API call vers OpenAI ou un service similaire
 */
export const generateSummaryAndKeywords = (content: string): { excerpt: string, keywords: string } => {
  if (!content || content.length < 100) {
    return {
      excerpt: "Cet article n'a pas assez de contenu pour générer un résumé automatique.",
      keywords: "hypnose, bien-être"
    };
  }

  // Simplistic implementation for demo purposes
  // In a real app, this would call an AI service like OpenAI or Claude
  
  // Extract first paragraph that's at least 50 chars
  const paragraphs = content.split('</p>');
  let excerpt = '';
  
  for (const p of paragraphs) {
    const text = p.replace(/<[^>]*>/g, '').trim();
    if (text.length >= 50) {
      excerpt = text.substring(0, 160) + (text.length > 160 ? '...' : '');
      break;
    }
  }
  
  if (!excerpt) {
    excerpt = content.replace(/<[^>]*>/g, '').substring(0, 160).trim() + '...';
  }
  
  // Extract potential keywords from the content
  const contentText = content.toLowerCase().replace(/<[^>]*>/g, '');
  const commonKeywords = [
    'hypnose', 'ericksonienne', 'thérapie', 'bien-être', 'sommeil', 
    'stress', 'anxiété', 'confiance', 'changement', 'inconscient',
    'relaxation', 'méditation', 'auto-hypnose', 'santé mentale'
  ];
  
  const keywords = commonKeywords
    .filter(keyword => contentText.includes(keyword))
    .slice(0, 5)
    .join(', ');
  
  return {
    excerpt,
    keywords: keywords || 'hypnose, thérapie, bien-être'
  };
};
