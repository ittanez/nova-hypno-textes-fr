import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Le sitemap doit rester accessible publiquement pour les moteurs de recherche
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

    // Pages statiques du site
    const STATIC_PAGES = [
      { loc: '/',                              changefreq: 'weekly',  priority: '1.0' },
      { loc: '/autohypnose',                   changefreq: 'monthly', priority: '0.8' },
      { loc: '/test-receptivite',              changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-stress-anxiete-paris',  changefreq: 'monthly', priority: '0.8' },
      // Phobies — page parent + 11 sous-pages
      { loc: '/hypnose-phobies-paris',         changefreq: 'monthly', priority: '0.8' },
      { loc: '/peurdelavion',                  changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-arachnophobie-paris',   changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-acrophobie-paris',      changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-claustrophobie-paris',  changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-peur-parler-public-paris', changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-peur-dentiste-paris',   changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-peur-aiguilles-paris',  changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-peur-sang-paris',       changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-aquaphobie-paris',      changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-amaxophobie-paris',     changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-phobie-sociale-paris',  changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-sommeil-paris',         changefreq: 'monthly', priority: '0.8' },
      { loc: '/hypnose-gestion-emotions-paris', changefreq: 'monthly', priority: '0.8' },
      // Blocages — page parent + 6 sous-pages
      { loc: '/hypnose-blocages-paris',        changefreq: 'monthly', priority: '0.8' },
      { loc: '/hypnose-procrastination-paris', changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-onychophagie-paris',    changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-toc-rituels-paris',     changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-schemas-repetitifs-paris', changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-blocages-professionnels-paris', changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-addictions-comportementales-paris', changefreq: 'monthly', priority: '0.7' },
      // Troubles émotionnels — page parent + 6 sous-pages
      { loc: '/hypnose-troubles-emotionnels-paris', changefreq: 'monthly', priority: '0.8' },
      { loc: '/hypnose-colere-paris',          changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-hypersensibilite-paris', changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-deuil-paris',           changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-traumatismes-paris',    changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-frustration-paris',     changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-anxiete-emotionnelle-paris', changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-charge-emotionnelle-paris', changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-confiance-en-soi-paris', changefreq: 'monthly', priority: '0.8' },
      // Troubles alimentaires — page parent + 6 sous-pages
      { loc: '/hypnose-troubles-alimentaires-paris', changefreq: 'monthly', priority: '0.8' },
      { loc: '/hypnose-compulsions-alimentaires-paris', changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-grignotage-paris',      changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-addiction-sucre-paris', changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-boulimie-paris',        changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-alimentation-emotionnelle-paris', changefreq: 'monthly', priority: '0.7' },
      { loc: '/hypnose-image-corporelle-paris', changefreq: 'monthly', priority: '0.7' },
      // Autres spécialités
      { loc: '/hypnose-arret-tabac-paris',     changefreq: 'monthly', priority: '0.8' },
      { loc: '/hypnose-professionnels-paris',  changefreq: 'monthly', priority: '0.8' },
      { loc: '/hypnose-en-ligne',              changefreq: 'monthly', priority: '0.8' },
      // Guides gratuits (lead magnets) + quiz
      { loc: '/guide-autohypnose',             changefreq: 'monthly', priority: '0.6' },
      { loc: '/guide-sommeil',                 changefreq: 'monthly', priority: '0.6' },
      { loc: '/guide-procrastination',         changefreq: 'monthly', priority: '0.6' },
      { loc: '/guide-emotions-travail',        changefreq: 'monthly', priority: '0.6' },
      { loc: '/guide-colere',                  changefreq: 'monthly', priority: '0.6' },
      { loc: '/guide-carriere',                changefreq: 'monthly', priority: '0.6' },
      { loc: '/guide-arret-tabac',             changefreq: 'monthly', priority: '0.6' },
      { loc: '/autohypnose/quiz',              changefreq: 'monthly', priority: '0.5' },
      { loc: '/alain-zenatti',                 changefreq: 'monthly', priority: '0.6' },
      { loc: '/tarifs',                        changefreq: 'monthly', priority: '0.8' },
      { loc: '/avis',                          changefreq: 'monthly', priority: '0.7' },
      { loc: '/contact',                       changefreq: 'monthly', priority: '0.8' },
      { loc: '/faq',                           changefreq: 'monthly', priority: '0.7' },
      { loc: '/blog',                          changefreq: 'daily',   priority: '0.9' },
      { loc: '/blog/categories',               changefreq: 'weekly',  priority: '0.6' },
      { loc: '/mentions-legales',              changefreq: 'yearly',  priority: '0.3' },
      { loc: '/politique-de-confidentialite', changefreq: 'yearly',  priority: '0.3' },
      { loc: '/politique-de-confidentialite-novarespire', changefreq: 'yearly', priority: '0.3' },
    ]

    console.log('🚀 Génération du sitemap...')

    // Récupérer tous les articles publiés (avec categories pour calcul lastmod des catégories)
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('slug, updated_at, published_at, image_url, title, categories')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (articlesError) {
      throw articlesError
    }

    console.log(`✅ ${articles?.length || 0} articles trouvés`)

    // Récupérer toutes les catégories (avec name pour faire le lien avec articles.categories)
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('slug, created_at, name')

    if (catError) {
      console.warn('⚠️ Erreur catégories:', catError)
    }

    console.log(`✅ ${categories?.length || 0} catégories trouvées`)

    // Calculer le lastmod de chaque catégorie = date du dernier article publié dans cette catégorie
    const categoryLastmod: Record<string, string> = Object.create(null)
    articles?.forEach(article => {
      if (!Array.isArray(article.categories)) return
      const articleDate = article.updated_at || article.published_at
      if (!articleDate) return
      article.categories.forEach((catName: string) => {
        if (!categoryLastmod[catName] || articleDate > categoryLastmod[catName]) {
          categoryLastmod[catName] = articleDate
        }
      })
    })

    // Générer le XML du sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`

    // Pages statiques
    for (const page of STATIC_PAGES) {
      xml += `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`

      if (page.loc === '/') {
        xml += `
    <image:image>
      <image:loc>https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp</image:loc>
      <image:caption>Alain Zenatti, Hypnothérapeute à Paris</image:caption>
      <image:title>NovaHypnose - Cabinet d'hypnothérapie à Paris</image:title>
    </image:image>`
      }

      xml += `
  </url>
`
    }

    // Ajouter les catégories
    if (categories && categories.length > 0) {
      xml += `\n  <!-- Catégories du blog -->\n`
      categories.forEach(category => {
        const rawLastmod = (category.name && categoryLastmod[category.name])
          ? categoryLastmod[category.name]
          : category.created_at
        let lastmod = now
        if (rawLastmod) {
          const parsedDate = new Date(rawLastmod)
          if (!isNaN(parsedDate.getTime())) {
            lastmod = parsedDate.toISOString().split('T')[0]
          }
        }

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

    console.log(`✅ Sitemap généré: ${STATIC_PAGES.length + (categories?.length || 0) + (articles?.length || 0)} URLs`)

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
