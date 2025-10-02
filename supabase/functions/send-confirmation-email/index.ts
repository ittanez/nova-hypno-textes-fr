import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

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
    const body = await req.text()
    console.log('Body reçu:', body)

    if (!body) {
      throw new Error('Body vide')
    }

    const { email } = JSON.parse(body)

    if (!email) {
      throw new Error('Email manquant')
    }

    console.log('Envoi email de confirmation à:', email)

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'NovaHypnose <contact@updates.novahypnose.fr>',
        to: [email],
        subject: 'Bienvenue sur Émergences - Confirmation d\'abonnement',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2980b9; font-size: 28px; margin-bottom: 10px;">Émergences</h1>
              <p style="color: #666; font-size: 16px;">Le blog de l'hypnose ericksonienne par Alain Zenatti</p>
            </div>

            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h2 style="color: white; margin: 0;">Merci de votre inscription !</h2>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Bonjour,
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Votre abonnement à la newsletter <strong>Émergences</strong> est confirmé. Vous recevrez désormais nos derniers articles sur l'hypnose thérapeutique, le bien-être et la transformation personnelle.
            </p>

            <div style="background: #f0f8ff; padding: 20px; border-left: 4px solid #3498db; margin: 25px 0; border-radius: 5px;">
              <p style="margin: 0; color: #2c3e50; font-size: 15px;">
                💡 <strong>Ce que vous allez recevoir :</strong>
              </p>
              <ul style="color: #555; margin: 10px 0 0 20px; padding: 0;">
                <li style="margin: 8px 0;">Nos nouveaux articles dès leur publication</li>
                <li style="margin: 8px 0;">Des techniques d'hypnose et d'auto-hypnose</li>
                <li style="margin: 8px 0;">Des conseils pratiques pour votre bien-être</li>
              </ul>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              En attendant, n'hésitez pas à découvrir nos articles les plus populaires sur
              <a href="https://novahypnose.fr/blog" style="color: #3498db; text-decoration: none;">notre blog</a>.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://novahypnose.fr/blog"
                 style="background: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Découvrir le blog
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

            <div style="text-align: center; color: #999; font-size: 13px;">
              <p style="margin: 5px 0;">
                <strong>Alain Zenatti</strong> - Hypnothérapeute<br>
                16 rue St Antoine, 75004 Paris<br>
                <a href="tel:0649358089" style="color: #3498db; text-decoration: none;">06 49 35 80 89</a>
              </p>
              <p style="margin: 15px 0 5px 0; font-size: 12px;">
                Vous recevez cet email car vous vous êtes abonné à la newsletter Émergences.<br>
                <a href="https://novahypnose.fr/blog" style="color: #999;">Se désabonner</a>
              </p>
            </div>
          </div>
        `,
      }),
    })

    const data = await res.json()
    console.log('Réponse Resend:', data)

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Erreur:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
