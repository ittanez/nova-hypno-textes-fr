import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { getCorsHeaders } from "../_shared/cors.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { articleId, articleTitle, articleSlug, articleExcerpt } = await req.json()

    console.log('=== DÉBUT NOTIFICATION ABONNÉS ===')
    console.log('Article:', { articleId, articleTitle, articleSlug })

    // 1. Créer le client Supabase
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_KEY!)

    // 2. Récupérer tous les abonnés vérifiés
    console.log('Récupération des abonnés...')
    const { data: subscribers, error: subscribersError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('verified', true)

    if (subscribersError) {
      console.error('Erreur récupération abonnés:', subscribersError)
      throw subscribersError
    }

    if (!subscribers || subscribers.length === 0) {
      console.log('Aucun abonné à notifier')
      return new Response(
        JSON.stringify({ success: true, message: 'Aucun abonné à notifier' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`${subscribers.length} abonnés à notifier`)

    // 3. Récupérer les détails de l'article
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select('title, slug, excerpt, image_url, published_at')
      .eq('id', articleId)
      .single()

    if (articleError) {
      console.error('Erreur récupération article:', articleError)
      throw articleError
    }

    const title = article?.title || articleTitle
    const slug = article?.slug || articleSlug
    const excerpt = article?.excerpt || articleExcerpt || ''
    const imageUrl = article?.image_url || ''
    const articleUrl = `https://novahypnose.fr/blog/article/${slug}`

    // 4. Envoyer l'email à tous les abonnés
    console.log('Envoi des emails...')

    const emailPromises = subscribers.map(async (subscriber) => {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Alain Zenatti - NovaHypnose <contact@updates.novahypnose.fr>',
            to: [subscriber.email],
            subject: `Nouvel article : ${title}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #2980b9; font-size: 28px; margin-bottom: 10px;">Émergences</h1>
                  <p style="color: #666; font-size: 16px;">Le blog de l'hypnose ericksonienne par Alain Zenatti</p>
                </div>

                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                  <h2 style="color: white; margin: 0; font-size: 24px;">Nouvel article publié !</h2>
                </div>

                ${imageUrl ? `
                  <div style="text-align: center; margin-bottom: 25px;">
                    <img src="${imageUrl}" alt="${title}" style="max-width: 100%; height: auto; border-radius: 10px;">
                  </div>
                ` : ''}

                <h3 style="color: #2c3e50; font-size: 22px; margin-bottom: 15px;">
                  ${title}
                </h3>

                <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 25px;">
                  ${excerpt}
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${articleUrl}"
                     style="background: #3498db; color: white; padding: 14px 35px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; font-size: 16px;">
                    Lire l'article complet
                  </a>
                </div>

                <div style="background: #f0f8ff; padding: 20px; border-left: 4px solid #3498db; margin: 25px 0; border-radius: 5px;">
                  <p style="margin: 0; color: #2c3e50; font-size: 15px;">
                    💡 <strong>Envie d'en savoir plus ?</strong>
                  </p>
                  <p style="margin: 10px 0 0 0; color: #555;">
                    Découvrez tous nos articles sur l'hypnose thérapeutique, le bien-être et la transformation personnelle sur
                    <a href="https://novahypnose.fr/blog" style="color: #3498db; text-decoration: none;">notre blog</a>.
                  </p>
                </div>

                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

                <div style="text-align: center; color: #999; font-size: 13px;">
                  <p style="margin: 5px 0;">
                    <strong>Alain Zenatti</strong> - Hypnothérapeute<br>
                    16 rue St Antoine, 75004 Paris<br>
                    <a href="tel:0649358089" style="color: #3498db; text-decoration: none;">06 49 35 80 89</a>
                  </p>
                  <p style="margin: 15px 0 5px 0; font-size: 12px;">
                    Vous recevez cet email car vous êtes abonné à la newsletter Émergences.<br>
                    <a href="https://novahypnose.fr/blog" style="color: #999;">Se désabonner</a>
                  </p>
                </div>
              </div>
            `,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          console.error(`Erreur envoi email à ${subscriber.email}:`, data)
          return { email: subscriber.email, success: false, error: data }
        }

        console.log(`Email envoyé à ${subscriber.email}`)
        return { email: subscriber.email, success: true }
      } catch (error) {
        console.error(`Exception envoi email à ${subscriber.email}:`, error)
        return { email: subscriber.email, success: false, error: error.message }
      }
    })

    const results = await Promise.all(emailPromises)

    const successCount = results.filter(r => r.success).length
    const failureCount = results.filter(r => !r.success).length

    console.log(`Emails envoyés: ${successCount} succès, ${failureCount} échecs`)
    console.log('=== FIN NOTIFICATION ABONNÉS ===')

    return new Response(
      JSON.stringify({
        success: true,
        message: `Emails envoyés à ${successCount}/${subscribers.length} abonnés`,
        details: { successCount, failureCount, total: subscribers.length }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Erreur globale:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
