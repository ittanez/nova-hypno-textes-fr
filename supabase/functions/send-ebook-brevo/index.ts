import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { getCorsHeaders, isValidEmail, sanitizeString } from "../_shared/cors.ts"

// Variables d'environnement (à configurer via supabase secrets set)
const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')
const SENDER_EMAIL = Deno.env.get('BREVO_SENDER_EMAIL') || 'contact@novahypnose.fr'
const SENDER_NAME = Deno.env.get('BREVO_SENDER_NAME') || 'NovaHypnose'

// URL du PDF hébergé sur Supabase Storage
const EBOOK_PDF_URL = 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/pdf/REPRENEZ_LA_MAIN_COMPLET.pdf'

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)

  // Gestion des requêtes CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY non configurée')
    }

    const body = await req.text()
    console.log('send-ebook-brevo — Body reçu:', body)

    if (!body) {
      throw new Error('Body vide')
    }

    const { firstName, email, animal, location } = JSON.parse(body)

    if (!email) {
      throw new Error('Email manquant')
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Format d'email invalide" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!firstName) {
      return new Response(
        JSON.stringify({ success: false, error: "Prénom manquant" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const prenomSafe = sanitizeString(firstName, 100)
    const animalSafe = sanitizeString(animal || '', 100)
    const locationSafe = sanitizeString(location || '', 100)

    console.log('Envoi ebook à:', email, '— Prénom:', prenomSafe, '— Localisation:', locationSafe)

    // Phrase optionnelle sur l'animal
    const animalLine = animalSafe
      ? `<p style="font-size: 15px; line-height: 1.7; color: #555; margin: 0 0 20px 0;">
           Votre animal préféré est <strong>${animalSafe}</strong> — un beau choix ! 🐾
         </p>`
      : ''

    // Créer/mettre à jour le contact dans Brevo avec la localisation
    if (locationSafe) {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          attributes: {
            PRENOM: prenomSafe,
            LOCALISATION: locationSafe,
          },
          updateEnabled: true,
        }),
      })
    }

    // Appel API Brevo pour envoyer l'email transactionnel
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        to: [{ email, name: prenomSafe }],
        subject: "Votre ebook d'autohypnose",
        htmlContent: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #ffffff;">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #233C67 0%, #4470AD 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0; font-weight: 700;">
                Votre ebook est prêt !
              </h1>
              <p style="color: rgba(255,255,255,0.8); font-size: 15px; margin: 0;">
                Reprenez la main grâce à l'autohypnose
              </p>
            </div>

            <!-- Body -->
            <div style="padding: 36px 30px;">
              <p style="font-size: 16px; line-height: 1.7; color: #333; margin: 0 0 20px 0;">
                Bonjour ${prenomSafe},
              </p>

              <p style="font-size: 16px; line-height: 1.7; color: #333; margin: 0 0 20px 0;">
                Merci pour votre intérêt ! Voici votre ebook <strong>« Reprenez la main »</strong> sur l'autohypnose.
              </p>

              ${animalLine}

              <!-- Bouton CTA -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${EBOOK_PDF_URL}"
                   style="display: inline-block; padding: 16px 40px; background: #F37336; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; letter-spacing: 0.3px;">
                  Télécharger mon ebook (PDF)
                </a>
              </div>

              <p style="font-size: 15px; line-height: 1.7; color: #555;">
                À très bientôt,<br>
                <strong style="color: #233C67;">NovaHypnose</strong>
              </p>
            </div>

            <!-- Footer -->
            <hr style="border: none; border-top: 1px solid #eee; margin: 0 30px;">
            <div style="padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
              <p style="margin: 5px 0;">
                Conformément au RGPD — Désabonnement libre à tout moment.
              </p>
            </div>
          </div>
        `,
      }),
    })

    const brevoData = await brevoRes.json()
    console.log('Réponse Brevo:', brevoData)

    if (!brevoRes.ok) {
      console.error('Erreur Brevo:', brevoData)
      throw new Error(brevoData?.message || "Erreur lors de l'envoi de l'email via Brevo")
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('send-ebook-brevo — Erreur:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
