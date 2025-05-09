
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

  // Suppression des tags HTML pour l'analyse du contenu
  const plainContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Extraction des paragraphes pour trouver un bon résumé
  const paragraphs = content.split('</p>');
  let excerpt = '';
  
  // Trouver un paragraphe significatif pour l'extrait
  for (const p of paragraphs) {
    const text = p.replace(/<[^>]*>/g, '').trim();
    if (text.length >= 50 && !text.startsWith('<h')) {
      excerpt = text.substring(0, 180) + (text.length > 180 ? '...' : '');
      break;
    }
  }
  
  if (!excerpt) {
    excerpt = plainContent.substring(0, 180).trim() + '...';
  }
  
  // Extraction de mots-clés potentiels basée sur le contenu
  const contentText = plainContent.toLowerCase();
  
  // Liste des mots-clés communs dans le domaine de l'hypnose
  const commonKeywords = [
    'hypnose', 'ericksonienne', 'thérapie', 'bien-être', 'sommeil', 
    'stress', 'anxiété', 'confiance', 'changement', 'inconscient',
    'relaxation', 'méditation', 'auto-hypnose', 'santé mentale',
    'respiration', 'visualisation', 'conscience', 'subconscient',
    'suggestion', 'milton erickson', 'pnl', 'régression', 'trauma',
    'phobie', 'addiction', 'poids', 'douleur', 'performance'
  ];
  
  // Algorithme amélioré pour trouver les mots-clés pertinents
  const keywordScores: Record<string, number> = {};
  
  commonKeywords.forEach(keyword => {
    // Compter le nombre d'occurrences
    const regex = new RegExp(keyword, 'gi');
    const matches = contentText.match(regex);
    const count = matches ? matches.length : 0;
    
    // Donner un score basé sur le nombre d'occurrences et la position
    // Les mots-clés qui apparaissent tôt dans le texte sont plus importants
    const firstPosition = contentText.indexOf(keyword.toLowerCase());
    const positionBonus = firstPosition !== -1 ? Math.max(0, 1 - (firstPosition / 1000)) : 0;
    
    keywordScores[keyword] = count + positionBonus;
  });
  
  // Trier les mots-clés par score et prendre les 6 premiers
  const sortedKeywords = Object.entries(keywordScores)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([keyword]) => keyword);
  
  const finalKeywords = sortedKeywords.slice(0, 6).join(', ');
  
  return {
    excerpt,
    keywords: finalKeywords || 'hypnose, thérapie, bien-être'
  };
};
