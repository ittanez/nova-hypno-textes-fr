
/**
 * Génère automatiquement un résumé et des mots-clés à partir du contenu d'un article
 * Note: Dans un environnement de production, cette fonction utiliserait une API d'IA
 * comme OpenAI. Pour simplifier, on utilise ici une version simplifiée.
 */
export const generateSummaryAndKeywords = async (content: string): Promise<{
  excerpt: string;
  keywords: string[];
}> => {
  // Simulation d'un délai d'appel API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Extraire le texte du HTML
  const tempElement = document.createElement('div');
  tempElement.innerHTML = content;
  const textContent = tempElement.textContent || '';
  
  // Générer un extrait (résumé)
  const words = textContent.split(/\s+/);
  const excerpt = words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');
  
  // Extraction basique de mots-clés (juste pour la démonstration)
  const commonWords = new Set(['le', 'la', 'les', 'un', 'une', 'des', 'et', 'ou', 'mais', 'donc',
    'car', 'pour', 'dans', 'sur', 'avec', 'sans', 'par', 'ce', 'cette', 'ces', 'que', 'qui', 'quoi',
    'dont', 'où', 'comment', 'pourquoi', 'quand', 'est', 'sont', 'sera', 'été', 'être', 'avoir',
    'a', 'ont', 'il', 'elle', 'ils', 'elles', 'nous', 'vous', 'je', 'tu', 'de', 'du', 'au', 'aux']);
  
  const potentialKeywords = words
    .filter(word => word.length > 3)
    .filter(word => !commonWords.has(word.toLowerCase()))
    .map(word => word.toLowerCase().replace(/[.,;:!?()]/g, ''))
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  // Extraire les 5 mots les plus fréquents comme mots-clés
  const keywords = Object.entries(potentialKeywords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
  
  return {
    excerpt,
    keywords
  };
};
