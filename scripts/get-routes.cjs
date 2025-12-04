#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script pour récupérer toutes les routes à pre-render depuis le sitemap.xml
 * Utilisé par le script de pre-rendering pour générer le HTML statique
 */

function getAllRoutes() {
  console.log('🔍 Récupération des routes depuis le sitemap...');

  try {
    // Lire le sitemap.xml généré
    const sitemapPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');

    if (!fs.existsSync(sitemapPath)) {
      console.warn('⚠️  Sitemap non trouvé, utilisation des routes par défaut');
      return getDefaultRoutes();
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

    // Parser les URLs du sitemap (regex simple)
    const urlMatches = sitemapContent.matchAll(/<loc>(https?:\/\/[^\/]+)(\/[^<]*)<\/loc>/g);
    const routes = [];

    for (const match of urlMatches) {
      const route = match[2] || '/';
      // Ignorer certaines routes
      if (!route.includes('/admin') && !route.includes('/autohypnose')) {
        routes.push(route);
      }
    }

    // Dédupliquer
    const uniqueRoutes = [...new Set(routes)];

    console.log(`✅ ${uniqueRoutes.length} routes trouvées dans le sitemap`);

    return uniqueRoutes;

  } catch (error) {
    console.error('❌ Erreur lors de la lecture du sitemap:', error.message);
    console.log('📋 Utilisation des routes par défaut');
    return getDefaultRoutes();
  }
}

function getDefaultRoutes() {
  // Routes par défaut si le sitemap n'est pas disponible
  return [
    '/',
    '/blog',
    '/mentions-legales',
    '/test-receptivite',
    '/zone-intervention'
  ];
}

// Exécuter si appelé directement
if (require.main === module) {
  const routes = getAllRoutes();
  console.log('\n📋 Routes à pre-render:');
  routes.forEach(route => console.log(`   ${route}`));
  process.exit(0);
}

module.exports = { getAllRoutes };
