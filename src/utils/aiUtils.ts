
// Fonction fictive pour générer un résumé et des mots-clés
export const generateSummaryAndKeywords = async (content: string) => {
  try {
    // Ici, nous simulons une réponse d'API
    console.log("Génération de résumé et mots-clés pour le contenu:", content.slice(0, 100) + "...");
    
    // Retourner un résultat factice
    return {
      excerpt: "Ceci est un résumé automatiquement généré du contenu de l'article.",
      keywords: ["mot-clé1", "mot-clé2", "mot-clé3"]
    };
  } catch (error) {
    console.error("Erreur lors de la génération du résumé:", error);
    throw error;
  }
};
