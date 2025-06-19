#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Contenu SEO avec tous les titres H1-H6 optimisés
const seoContent = `
    <!-- Contenu SEO optimisé avec tous les titres H1-H6 -->
    <div id="seo-content" style="position: absolute; left: -9999px; top: -9999px; visibility: hidden;">
      <!-- H1 Principal -->
      <h1>Hypnothérapie Ericksonienne Personnalisée Paris Centre</h1>
      
      <!-- H2 Sections principales -->
      <h2>À propos d'Alain Zenatti, Maître Hypnologue et Maître en Hypnose Ericksonienne</h2>
      <h2>Apaiser, transformer, réactiver ce qui est prêt en vous</h2>
      <h2>L'auto-hypnose : devenez votre propre thérapeute</h2>
      <h2>Un cadre sécurisant pour laisser émerger ce qui doit changer</h2>
      <h2>Ce qu'ils disent de l'hypnothérapie avec Alain Zenatti</h2>
      <h2>Questions fréquentes sur l'hypnothérapie</h2>
      <h2>Tarifs des séances d'hypnothérapie</h2>
      <h2>Informations de contact</h2>
      <h2>L'hypnothérapie à Paris avec Alain Zenatti - Votre Hypnothérapeute Certifié</h2>
      
      <!-- H3 Sous-sections -->
      <h3>Diplômes et formations</h3>
      <h3>L'hypnose ericksonienne : une approche respectueuse et créative</h3>
      <h3>Gestion du stress et des émotions</h3>
      <h3>Amélioration du sommeil</h3>
      <h3>Renforcement de la confiance en soi</h3>
      <h3>Pourquoi apprendre l'auto-hypnose ?</h3>
      <h3>Temps d'échange</h3>
      <h3>Induction hypnotique et travail ciblé</h3>
      <h3>Intégration et retour à l'état ordinaire</h3>
      <h3>À quelle vitesse va-t-on remarquer des changements ?</h3>
      <h3>L'hypnose peut-elle remplacer un traitement médical ?</h3>
      <h3>Combien de temps dure une séance ?</h3>
      <h3>Séances Individuelles</h3>
      <h3>Packs d'Hypnothérapie</h3>
      <h3>Modalités de Paiement</h3>
      <h3>Alain Zenatti Hypnothérapeute Paris</h3>
      <h3>Une approche sur mesure pour chaque situation</h3>
      <h3>Un accompagnement professionnel et bienveillant</h3>
      <h3>Découvrez les Hypno-Balades en Forêt de Senonches</h3>
      
      <!-- H4 Détails spécifiques -->
      <h4>Auto-hypnose pour le stress</h4>
      <h4>Auto-hypnose pour le sommeil</h4>
      <h4>Auto-hypnose pour la confiance</h4>
      <h4>Services d'hypnothérapie à Paris - Solutions adaptées à vos besoins</h4>
      <h4>Auto-hypnose et gestion du stress</h4>
      
      <!-- H5 Spécialités -->
      <h5>Hypnose à Paris 4ème</h5>
      <h5>Traitement de l'anxiété par hypnose</h5>
      <h5>Hypnose pour le sommeil</h5>
      
      <!-- H6 Détails techniques -->
      <h6>Techniques d'hypnose ericksonienne avancées</h6>
      <h6>Protocoles personnalisés d'hypnothérapie</h6>
      <h6>Formation certifiée en hypnose thérapeutique</h6>
    </div>
`;

// Fonction pour injecter le contenu SEO dans le HTML
function injectSeoContent(htmlPath) {
  try {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Chercher la balise <div id="root"> et injecter le contenu SEO juste après
    const rootDivRegex = /(<div id="root">)/;
    
    if (rootDivRegex.test(htmlContent)) {
      const updatedHtml = htmlContent.replace(rootDivRegex, `$1${seoContent}`);
      fs.writeFileSync(htmlPath, updatedHtml, 'utf8');
      console.log(`✅ Contenu SEO injecté avec succès dans ${htmlPath}`);
      return true;
    } else {
      console.error(`❌ Impossible de trouver <div id="root"> dans ${htmlPath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur lors de l'injection SEO: ${error.message}`);
    return false;
  }
}

// Fonction principale
function main() {
  console.log('🚀 Génération du contenu SEO statique...');
  
  const indexPath = path.join(__dirname, '..', 'index.html');
  const distIndexPath = path.join(__dirname, '..', 'dist', 'index.html');
  
  // Injecter dans le fichier source
  const sourceSuccess = injectSeoContent(indexPath);
  
  // Injecter dans le fichier build si il existe
  let distSuccess = true;
  if (fs.existsSync(distIndexPath)) {
    distSuccess = injectSeoContent(distIndexPath);
  }
  
  if (sourceSuccess && distSuccess) {
    console.log('✅ Contenu SEO généré avec succès !');
    console.log('📋 Titres H1-H6 maintenant visibles pour les moteurs de recherche');
  } else {
    console.log('⚠️  Problème lors de la génération du contenu SEO');
    process.exit(1);
  }
}

// Exécuter si appelé directly
if (require.main === module) {
  main();
}

module.exports = { injectSeoContent, seoContent };