import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { getCorsHeaders, isValidEmail, sanitizeString } from "../_shared/cors.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

// URL du PDF — temporairement le guide émotions, à remplacer par le vrai PDF autohypnose
const GUIDE_PDF_URL = 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/guide-emotions-travail.pdf'

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.text()
    console.log('send-guide-autohypnose — Body reçu:', body)

    if (!body) {
      throw new Error('Body vide')
    }

    const { prenom, email } = JSON.parse(body)

    if (!email) {
      throw new Error('Email manquant')
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Format d'email invalide" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const prenomSafe = sanitizeString(prenom || '', 100) || 'là'

    console.log('Envoi du guide autohypnose à:', email, '— Prénom:', prenomSafe)

    // Envoyer l'email avec le lien du guide au lead
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'NovaHypnose <contact@updates.novahypnose.fr>',
        to: [email],
        bcc: ['a.zenatti@gmail.com'],
        subject: 'Votre guide : L\'Autohypnose au Quotidien',
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #ffffff;">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #233C67 0%, #4470AD 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0; font-weight: 700;">
                Votre guide est prêt
              </h1>
              <p style="color: rgba(255,255,255,0.8); font-size: 15px; margin: 0;">
                L'Autohypnose au Quotidien
              </p>
            </div>

            <!-- Body -->
            <div style="padding: 36px 30px;">
              <p style="font-size: 16px; line-height: 1.7; color: #333; margin: 0 0 20px 0;">
                Bonjour ${prenomSafe},
              </p>

              <p style="font-size: 16px; line-height: 1.7; color: #333; margin: 0 0 20px 0;">
                Merci pour votre confiance. Voici votre guide gratuit de 30 pages pour
                <strong>maîtriser l'autohypnose</strong> et reprendre la main sur votre bien-être intérieur.
              </p>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${GUIDE_PDF_URL}"
                   style="display: inline-block; padding: 16px 40px; background: #F37336; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; letter-spacing: 0.3px;">
                  Télécharger le guide (PDF)
                </a>
              </div>

              <!-- Ce que vous allez découvrir -->
              <div style="background: #f0f4fa; padding: 24px; border-left: 4px solid #4470AD; border-radius: 0 8px 8px 0; margin: 28px 0;">
                <p style="margin: 0 0 12px 0; color: #233C67; font-weight: 600; font-size: 15px;">
                  Ce que vous allez découvrir :
                </p>
                <ul style="margin: 0; padding: 0 0 0 20px; color: #555;">
                  <li style="margin: 8px 0; line-height: 1.6;">9 protocoles complets, prêts à utiliser dès ce soir</li>
                  <li style="margin: 8px 0; line-height: 1.6;">Gestion du stress, de l'anxiété et des émotions au travail</li>
                  <li style="margin: 8px 0; line-height: 1.6;">Techniques de confiance en soi et d'amélioration du sommeil</li>
                  <li style="margin: 8px 0; line-height: 1.6;">2 protocoles NovaHypnose exclusifs (Socle inébranlable + Étincelle)</li>
                </ul>
              </div>

              <p style="font-size: 16px; line-height: 1.7; color: #333; margin: 0 0 20px 0;">
                Prenez le temps de le lire calmement — il est conçu pour être lu en 30 minutes et appliqué immédiatement.
              </p>

              <!-- Offre appel gratuit -->
              <div style="background: #fff8f0; border: 1px solid #F37336; border-radius: 10px; padding: 24px; text-align: center; margin: 28px 0;">
                <p style="margin: 0 0 8px 0; font-size: 17px; font-weight: 600; color: #233C67;">
                  Envie d'aller plus loin ?
                </p>
                <p style="margin: 0 0 16px 0; font-size: 15px; color: #555; line-height: 1.6;">
                  Je vous propose un échange gratuit de 30 minutes<br>pour faire le point — sans engagement.
                </p>
                <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                   style="display: inline-block; padding: 12px 28px; background: #233C67; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
                  Réserver un créneau gratuit
                </a>
              </div>

              <!-- WhatsApp -->
              <div style="background: #f0faf0; border: 1px solid #25D366; border-radius: 10px; padding: 24px; text-align: center; margin: 28px 0;">
                <p style="margin: 0 0 12px 0; font-size: 15px; color: #555; line-height: 1.7;">
                  Une question sur un protocole du guide ? Un blocage lors de votre première séance d'autohypnose ? Ma porte WhatsApp est ouverte pour vous accompagner.
                </p>
                <a href="https://wa.me/33649358089?text=Bonjour%20Alain%2C%20j%27ai%20une%20question%20sur%20le%20guide%20autohypnose"
                   style="display: inline-block; padding: 14px 28px; background: #25D366; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 600;">
                  Discuter avec Alain sur WhatsApp
                </a>
                <p style="margin: 12px 0 0 0; font-size: 13px; color: #888; line-height: 1.5;">
                  Je réponds personnellement dès que je quitte mon cabinet.
                </p>
              </div>

              <p style="font-size: 15px; line-height: 1.7; color: #555;">
                À très bientôt,<br>
                <strong style="color: #233C67;">Alain Zenatti — NovaHypnose</strong><br>
                <span style="font-size: 13px; color: #888;">Maître Praticien en Hypnose Ericksonienne — Paris 4e</span><br>
                <a href="https://novahypnose.fr" style="color: #4470AD; text-decoration: none; font-size: 13px;">novahypnose.fr</a>
              </p>
            </div>

            <!-- Footer -->
            <hr style="border: none; border-top: 1px solid #eee; margin: 0 30px;">
            <div style="padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
              <p style="margin: 5px 0;">
                <strong>Alain Zenatti — NovaHypnose</strong><br>
                16 rue Saint-Antoine, 75004 Paris<br>
                <a href="tel:0649358089" style="color: #4470AD; text-decoration: none;">06 49 35 80 89</a> ·
                <a href="https://novahypnose.fr" style="color: #4470AD; text-decoration: none;">novahypnose.fr</a>
              </p>
              <p style="margin: 10px 0 0 0; font-size: 11px; color: #bbb;">
                Vous recevez cet email car vous avez téléchargé le guide « L'Autohypnose au Quotidien »<br>
                Conformément au RGPD — Désabonnement libre à tout moment.
              </p>
            </div>
          </div>
        `,
      }),
    })

    const emailData = await emailRes.json()
    console.log('Réponse Resend (guide autohypnose):', emailData)

    if (!emailRes.ok) {
      console.error('Erreur Resend:', emailData)
      throw new Error(emailData?.message || 'Erreur lors de l\'envoi de l\'email')
    }

    return new Response(
      JSON.stringify({ success: true, emailId: emailData.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('send-guide-autohypnose — Erreur:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
