import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { getCorsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const SITE_URL = 'https://novahypnose.fr'

    // Clé IndexNow (publique par design - accessible via /public/{key}.txt)
    // Peut être surchargée via variable d'environnement Supabase si besoin
    const INDEXNOW_KEY = Deno.env.get('INDEXNOW_KEY') || '1290617b03634f6a91131c77a141c8c6'

    // Récupérer les URLs depuis le body (optionnel)
    let urlsToSubmit: string[] = []

    if (req.method === 'POST') {
      const body = await req.json()

      // Support du format Database Webhook Supabase
      // { type: "INSERT"|"UPDATE", table: "articles", record: { slug, published, ... } }
      if (body.type && body.record?.slug) {
        const slug = body.record.slug
        const isPublished = body.record.published === true

        if (isPublished) {
          urlsToSubmit = [
            `${SITE_URL}/blog/article/${slug}`,
            `${SITE_URL}/blog`, // Rafraîchir l'index blog aussi
          ]
          console.log(`📝 Webhook: article "${slug}" ${body.type} → soumission IndexNow`)
        } else {
          console.log(`⏭️ Webhook: article "${slug}" non publié, skip IndexNow`)
          return new Response(
            JSON.stringify({ success: true, message: 'Article non publié, IndexNow non notifié', skipped: true }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
          )
        }
      } else {
        // Format classique : { urls: [...] }
        urlsToSubmit = body.urls || []
      }
    }

    // Si pas d'URLs spécifiques, soumettre les URLs principales
    if (urlsToSubmit.length === 0) {
      urlsToSubmit = [
        `${SITE_URL}/`,
        `${SITE_URL}/blog`,
        `${SITE_URL}/autohypnose`,
        `${SITE_URL}/hypnose-stress-anxiete-paris`,
        `${SITE_URL}/hypnose-phobies-paris`,
        `${SITE_URL}/hypnose-sommeil-paris`,
        `${SITE_URL}/hypnose-gestion-emotions-paris`,
        `${SITE_URL}/hypnose-blocages-paris`,
        `${SITE_URL}/hypnose-confiance-en-soi-paris`,
        `${SITE_URL}/hypnose-professionnels-paris`,
        `${SITE_URL}/test-receptivite`,
        `${SITE_URL}/zone-intervention`,
      ]
    }

    console.log('🔔 Notification Bing IndexNow pour', urlsToSubmit.length, 'URLs')

    // Préparer la requête IndexNow
    const indexNowPayload = {
      host: 'novahypnose.fr',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urlsToSubmit
    }

    // Soumettre à IndexNow API
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'NovaHypnose IndexNow Notifier/1.0'
      },
      body: JSON.stringify(indexNowPayload)
    })

    // IndexNow retourne 200 pour succès, 202 pour accepté
    if (response.status === 200 || response.status === 202) {
      console.log('✅ Bing IndexNow notifié avec succès')

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Bing IndexNow notifié avec succès',
          urlsSubmitted: urlsToSubmit.length,
          urls: urlsToSubmit,
          status: response.status
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    } else {
      const errorText = await response.text()
      console.warn('⚠️ Réponse IndexNow non-OK:', response.status, errorText)

      return new Response(
        JSON.stringify({
          success: false,
          message: `IndexNow a répondu avec le statut ${response.status}`,
          error: errorText,
          status: response.status
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200, // On retourne 200 quand même car ce n'est pas une erreur fatale
        }
      )
    }

  } catch (error) {
    console.error('❌ Erreur lors de la notification IndexNow:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: 'Erreur lors de la notification de Bing IndexNow'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
