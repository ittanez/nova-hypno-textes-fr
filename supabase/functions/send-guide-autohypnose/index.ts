import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const GUIDE_PDF_URL = 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/pdf/REPRENEZ_LA_MAIN_COMPLET.pdf'

const ALLOWED_ORIGINS = [
  'https://novahypnose.fr',
  'https://www.novahypnose.fr',
  'http://localhost:5173',
  'http://localhost:4173',
]

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || ''
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitizeString(str: string, maxLength = 100): string {
  return str.replace(/<[^>]*>/g, '').trim().slice(0, maxLength)
}

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

    const prenomRaw = sanitizeString(prenom || '', 100) || 'là'
    const prenomSafe = prenomRaw.charAt(0).toUpperCase() + prenomRaw.slice(1)

    console.log('Envoi du guide autohypnose à:', email, '— Prénom:', prenomSafe)

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Alain Zenatti - NovaHypnose <contact@updates.novahypnose.fr>',
        to: [email],
        bcc: ['a.zenatti@gmail.com'],
        subject: '🎁 Votre guide "Reprenez la main sur votre bien-être" est prêt',
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #ffffff;">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #233C67 0%, #4470AD 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0; font-weight: 700;">
                Votre guide est prêt
              </h1>
              <p style="color: rgba(255,255,255,0.8); font-size: 15px; margin: 0;">
                Reprenez la main sur votre bien-être — 19 pages, 8 protocoles
              </p>
            </div>

            <!-- Body -->
            <div style="padding: 36px 30px;">
              <p style="font-size: 22px; line-height: 1.5; color: #233C67; margin: 0 0 20px 0; font-weight: 700;">
                Bonjour ${prenomSafe},
              </p>

              <p style="font-size: 16px; line-height: 1.7; color: #333; margin: 0 0 20px 0;">
                Merci pour votre confiance. Je sais à quel point il peut être difficile de trouver du temps pour soi quand on est sous pression. Ce guide de 19 pages est conçu pour vous accompagner, <strong>étape par étape</strong>, à votre rythme.
              </p>

              <p style="font-size: 15px; line-height: 1.7; color: #555; margin: 0 0 24px 0;">
                Pas besoin d'expérience en hypnose : ces techniques sont conçues pour les débutants et s'intègrent facilement à votre routine.
              </p>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${GUIDE_PDF_URL}"
                   style="display: inline-block; padding: 16px 40px; background: #F37336; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; letter-spacing: 0.3px;">
                  📥 Accéder à mon guide gratuit maintenant
                </a>
                <p style="margin: 10px 0 0 0; font-size: 13px; color: #888;">
                  8 protocoles à pratiquer chez vous
                </p>
              </div>

              <!-- Image ebook -->
              <div style="text-align: center; margin: 24px 0;">
                <img src="https://novahypnose.fr/images/couverture-guide-autohypnose.webp"
                     alt="Guide Reprenez la main sur votre bien-être"
                     style="max-width: 280px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.12);" />
              </div>

              <!-- Ce que vous allez découvrir -->
              <div style="background: #f0f4fa; padding: 24px; border-left: 4px solid #4470AD; border-radius: 0 8px 8px 0; margin: 28px 0;">
                <p style="margin: 0 0 12px 0; color: #233C67; font-weight: 600; font-size: 15px;">
                  Ce que vous allez découvrir :
                </p>
                <ul style="margin: 0; padding: 0 0 0 20px; color: #555;">
                  <li style="margin: 10px 0; line-height: 1.6;">
                    <strong>8 protocoles complets</strong> → Des exercices à pratiquer chez vous, à votre rythme
                  </li>
                  <li style="margin: 10px 0; line-height: 1.6;">
                    <strong>Gestion du stress et des émotions</strong> → Pour aborder vos journées avec plus de recul
                  </li>
                  <li style="margin: 10px 0; line-height: 1.6;">
                    <strong>Techniques de confiance en soi</strong> → Pour préparer les situations qui vous inquiètent, comme prendre la parole
                  </li>
                  <li style="margin: 10px 0; line-height: 1.6;">
                    <strong>Sommeil</strong> → Des pistes pour mieux aborder la nuit
                  </li>
                  <li style="margin: 10px 0; line-height: 1.6;">
                    <strong>Un journal de suivi</strong> → Pour observer votre progression séance après séance
                  </li>
                </ul>
              </div>

              <!-- Formation Paris -->
              <div style="background: linear-gradient(135deg, #233C67 0%, #4470AD 100%); border-radius: 10px; padding: 24px; text-align: center; margin: 28px 0;">
                <p style="margin: 0 0 8px 0; font-size: 17px; font-weight: 600; color: #ffffff;">
                  🎓 Formation à l'autohypnose
                </p>
                <p style="margin: 0 0 16px 0; font-size: 20px; color: #ffffff; font-weight: 700;">
                  Au cabinet, à Paris 4e
                </p>
                <p style="margin: 0 0 16px 0; font-size: 15px; color: rgba(255,255,255,0.85); line-height: 1.6;">
                  Jusqu'à 6 personnes. Pour un groupe plus large (jusqu'à 12 personnes, une entreprise par exemple), sur devis.<br>
                  Tous les détails sur le site.
                </p>
                <a href="https://novahypnose.fr/autohypnose"
                   style="display: inline-block; padding: 14px 32px; background: #F37336; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 600;">
                  Découvrir la formation
                </a>
              </div>

              <!-- WhatsApp -->
              <div style="background: #f0faf0; border: 1px solid #25D366; border-radius: 10px; padding: 24px; text-align: center; margin: 28px 0;">
                <p style="margin: 0 0 12px 0; font-size: 15px; color: #555; line-height: 1.7;">
                  Vous vous demandez si vous êtes &laquo;&nbsp;hypnotisable&nbsp;&raquo;, comment pratiquer au quotidien… ou même ce qu'un accompagnement en cabinet pourrait vous apporter&nbsp;?<br><br>
                  Je suis là pour en parler — sans engagement, sur WhatsApp.
                </p>
                <a href="https://novahypnose.fr/wa"
                   style="display: inline-block; padding: 14px 28px; background: #25D366; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 600;">
                  📱 Discuter avec Alain sur WhatsApp
                </a>
              </div>

              <p style="font-size: 15px; line-height: 1.7; color: #555;">
                À très bientôt,<br>
                <strong style="color: #233C67;">Alain Zenatti — NovaHypnose</strong><br>
                <span style="font-size: 13px; color: #888;">Hypnothérapeute — Paris 4e et visio, partout en France</span><br>
                <span style="font-size: 13px; color: #888;">📍 16 rue Saint-Antoine, 75004 Paris</span><br>
                <span style="font-size: 13px; color: #888;">📞 06 49 35 80 89</span><br>
                <span style="font-size: 13px; color: #888;">✉️ contact@novahypnose.fr</span><br>
                <a href="https://novahypnose.fr" style="color: #4470AD; text-decoration: none; font-size: 13px;">🌐 novahypnose.fr</a>
              </p>
            </div>

            <!-- Footer -->
            <hr style="border: none; border-top: 1px solid #eee; margin: 0 30px;">
            <div style="padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
              <p style="margin: 10px 0 0 0; font-size: 11px; color: #bbb;">
                Vous recevez cet email car vous avez téléchargé le guide « Reprenez la main sur votre bien-être ».<br>
                Conformément au RGPD, vous pouvez vous désabonner à tout moment.
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
