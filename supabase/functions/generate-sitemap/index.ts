import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const SITE_URL = 'https://novahypnose.fr'
    const now = new Date().toISOString().split('T')[0]

    console.log('🚀 Génération du sitemap...')

    // Récupérer tous les articles publiés
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('slug, updated_at, published_at, image_url, title')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (articlesError) {
      throw articlesError
    }

    console.log(`✅ ${articles?.length || 0} articles trouvés`)

    // Récupérer toutes les catégories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('slug, created_at')

    if (catError) {
      console.warn('⚠️ Erreur catégories:', catError)
    }

    console.log(`✅ ${categories?.length || 0} catégories trouvées`)

    // Générer le XML du sitemap
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
      <image:loc>${SITE_URL}/lovable-uploads/ac75f7ce-64fa-4285-9d09-3c372d3efde5.png</image:loc>
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
`

    // Ajouter les catégories
    if (categories && categories.length > 0) {
      xml += `\n  <!-- Catégories du blog -->\n`
      categories.forEach(category => {
        const lastmod = category.created_at
          ? new Date(category.created_at).toISOString().split('T')[0]
          : now

        xml += `  <url>
    <loc>${SITE_URL}/blog/categorie/${category.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`
      })
    }

    // Ajouter les articles
    if (articles && articles.length > 0) {
      xml += `\n  <!-- Articles du blog -->\n`
      articles.forEach(article => {
        const lastmod = article.updated_at
          ? new Date(article.updated_at).toISOString().split('T')[0]
          : (article.published_at
              ? new Date(article.published_at).toISOString().split('T')[0]
              : now)

        xml += `  <url>
    <loc>${SITE_URL}/blog/article/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>`

        // Ajouter l'image si elle existe
        if (article.image_url) {
          const escapedTitle = escapeXml(article.title)
          xml += `
    <image:image>
      <image:loc>${article.image_url}</image:loc>
      <image:title>${escapedTitle}</image:title>
    </image:image>`
        }

        xml += `
  </url>
`
      })
    }

    xml += `\n</urlset>`

    console.log(`✅ Sitemap généré: ${2 + (categories?.length || 0) + (articles?.length || 0) + 1} URLs`)

    // Retourner le XML avec le bon content-type
    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })

  } catch (error) {
    console.error('❌ Erreur:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

// Helper function pour échapper les caractères XML
function escapeXml(unsafe: string): string {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
