
/**
 * Fonction pour générer un résumé et des mots-clés à partir d'un contenu
 * @param content Contenu HTML de l'article
 * @returns Promise contenant l'extrait et les mots-clés
 */
export const generateSummaryAndKeywords = async (content: string): Promise<{ excerpt: string; keywords: string[] }> => {
  try {
    // Ici, nous simulons une réponse d'API
    console.log("Génération de résumé et mots-clés pour le contenu:", content.slice(0, 100) + "...");
    
    // Simulons un délai pour imiter une vraie API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Analyse simple du contenu pour extraire les mots les plus fréquents
    const cleanContent = content.replace(/<[^>]*>?/gm, '') // Enlever les balises HTML
                              .replace(/[^\w\s]/gi, '') // Enlever la ponctuation
                              .toLowerCase();
                              
    const words = cleanContent.split(/\s+/);
    
    // Compter les occurrences des mots (en excluant les mots courts et communs)
    const stopWords = ['le', 'la', 'les', 'un', 'une', 'des', 'et', 'ou', 'à', 'de', 'du', 'ce', 'cette', 'ces', 'est', 'sont', 'pour', 'dans', 'sur', 'par', 'avec', 'qui', 'que', 'quoi'];
    const wordCount: Record<string, number> = {};
    
    words.forEach(word => {
      if (word.length > 3 && !stopWords.includes(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    // Trier les mots par fréquence
    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0])
      .slice(0, 5); // Prendre les 5 mots les plus fréquents
    
    // Créer un résumé de 150-200 caractères
    let excerpt = cleanContent.substring(0, 180).trim() + '...';
    
    return {
      excerpt: excerpt,
      keywords: sortedWords
    };
  } catch (error) {
    console.error("Erreur lors de la génération du résumé:", error);
    throw error;
  }
};
