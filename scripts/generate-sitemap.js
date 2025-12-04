import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration Supabase
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://akrlyzmfszumibwgocae.supabase.co";
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrcmx5em1mc3p1bWlid2dvY2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NjUyNDcsImV4cCI6MjA1ODM0MTI0N30.UDVk1wzm36OJGK0usCHEtvmkC2QxABvG9KQ8p2lKz30";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const SITE_URL = 'https://novahypnose.fr';

async function generateSitemap() {
  console.log('🚀 Génération du sitemap...');

  try {
    // Récupérer tous les articles publiés
    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, updated_at, published_at, image_url, title')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('❌ Erreur lors de la récupération des articles:', error);
      throw error;
    }

    console.log(`✅ ${articles?.length || 0} articles trouvés`);

    // Récupérer toutes les catégories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('slug, created_at');

    if (catError) {
      console.warn('⚠️ Erreur lors de la récupération des catégories:', catError);
    }

    console.log(`✅ ${categories?.length || 0} catégories trouvées`);

    // Générer le XML du sitemap
    const now = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Page d'accueil principale -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp</image:loc>
      <image:caption>Alain Zenatti, Hypnothérapeute à Paris</image:caption>
      <image:title>NovaHypnose - Cabinet d'hypnothérapie à Paris</image:title>
    </image:image>
  </url>

  <!-- Mentions légales -->
  <url>
    <loc>${SITE_URL}/mentions-legales</loc>
    <lastmod>${now}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Page blog principale -->
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

    // Ajouter les catégories
    if (categories && categories.length > 0) {
      xml += `\n  <!-- Catégories du blog -->\n`;
      categories.forEach(category => {
        const lastmod = category.created_at
          ? new Date(category.created_at).toISOString().split('T')[0]
          : now;

        xml += `  <url>
    <loc>${SITE_URL}/blog/categorie/${category.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      });
    }

    // Ajouter les articles
    if (articles && articles.length > 0) {
      xml += `\n  <!-- Articles du blog -->\n`;
      articles.forEach(article => {
        const lastmod = article.updated_at
          ? new Date(article.updated_at).toISOString().split('T')[0]
          : (article.published_at
              ? new Date(article.published_at).toISOString().split('T')[0]
              : now);

        xml += `  <url>
    <loc>${SITE_URL}/blog/article/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>`;

        // Ajouter l'image si elle existe
        if (article.image_url) {
          xml += `
    <image:image>
      <image:loc>${article.image_url}</image:loc>
      <image:title>${escapeXml(article.title)}</image:title>
    </image:image>`;
        }

        xml += `
  </url>
`;
      });
    }

    xml += `\n</urlset>`;

    // Écrire le fichier sitemap.xml
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml, 'utf8');

    console.log(`✅ Sitemap généré avec succès: ${sitemapPath}`);
    console.log(`📊 Total URLs: ${2 + (categories?.length || 0) + (articles?.length || 0) + 1}`);
    console.log(`   - Pages statiques: 3`);
    console.log(`   - Catégories: ${categories?.length || 0}`);
    console.log(`   - Articles: ${articles?.length || 0}`);

  } catch (error) {
    console.error('❌ Erreur lors de la génération du sitemap:', error);
    console.warn('⚠️  Le sitemap existant sera utilisé. Build continue...');
    // Ne pas exit(1) pour ne pas faire échouer le build GitHub Actions
    // Le sitemap existant dans public/ sera utilisé
  }
}

// Fonction helper pour échapper les caractères XML
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Exécuter la génération
generateSitemap();
