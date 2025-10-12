import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const SITE_URL = 'https://novahypnose.fr'
    const sitemapUrl = `${SITE_URL}/sitemap.xml`

    console.log('🔔 Notification Google Search Console pour le sitemap:', sitemapUrl)

    // Ping Google pour notifier du nouveau sitemap
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`

    const response = await fetch(googlePingUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'NovaHypnose Sitemap Notifier/1.0'
      }
    })

    if (response.ok) {
      console.log('✅ Google Search Console notifié avec succès')

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Google Search Console notifié',
          sitemapUrl,
          status: response.status
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    } else {
      console.warn('⚠️ Réponse Google non-OK:', response.status, response.statusText)

      return new Response(
        JSON.stringify({
          success: false,
          message: `Google a répondu avec le statut ${response.status}`,
          sitemapUrl,
          status: response.status
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200, // On retourne 200 quand même car ce n'est pas une erreur fatale
        }
      )
    }

  } catch (error) {
    console.error('❌ Erreur lors de la notification Google:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: 'Erreur lors de la notification de Google Search Console'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
