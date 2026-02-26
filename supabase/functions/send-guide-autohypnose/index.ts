import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { getCorsHeaders, isValidEmail, sanitizeString } from "../_shared/cors.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const GUIDE_PDF_URL = 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/pdf/REPRENEZ_LA_MAIN_COMPLET.pdf'

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

    // Envoyer l'email avec le lien du guide au lead
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
        subject: '\u{1F381} Votre guide "Autohypnose au Quotidien" est prêt — + 2 protocoles exclusifs\u{00A0}!',
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #ffffff;">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #233C67 0%, #4470AD 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0; font-weight: 700;">
                Votre guide est prêt
              </h1>
              <p style="color: rgba(255,255,255,0.8); font-size: 15px; margin: 0;">
                L'Autohypnose au Quotidien — 37 pages + 2 protocoles exclusifs
              </p>
            </div>

            <!-- Body -->
            <div style="padding: 36px 30px;">
              <p style="font-size: 22px; line-height: 1.5; color: #233C67; margin: 0 0 20px 0; font-weight: 700;">
                Bonjour ${prenomSafe},
              </p>

              <p style="font-size: 16px; line-height: 1.7; color: #333; margin: 0 0 20px 0;">
                Merci pour votre confiance. Je sais à quel point il peut être difficile de trouver du temps pour soi quand on est sous pression. Ce guide de 37 pages est conçu pour vous accompagner, <strong>étape par étape</strong>, sans vous prendre plus de 30 minutes par jour.
              </p>

              <p style="font-size: 15px; line-height: 1.7; color: #555; margin: 0 0 24px 0;">
                Pas besoin d'expérience en hypnose\u{00A0}: ces techniques sont conçues pour les débutants et s'intègrent facilement à votre routine.
              </p>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${GUIDE_PDF_URL}"
                   style="display: inline-block; padding: 16px 40px; background: #F37336; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; letter-spacing: 0.3px;">
                  \u{1F4E5} Accéder à mon guide gratuit maintenant
                </a>
                <p style="margin: 10px 0 0 0; font-size: 13px; color: #888;">
                  9 protocoles prêts à l'emploi + 2 techniques NovaHypnose exclusives
                </p>
              </div>

              <!-- Image ebook -->
              <div style="text-align: center; margin: 24px 0;">
                <img src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/ebookautohypnose.webp"
                     alt="Guide L'Autohypnose au Quotidien"
                     style="max-width: 280px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.12);" />
              </div>

              <!-- Ce que vous allez découvrir -->
              <div style="background: #f0f4fa; padding: 24px; border-left: 4px solid #4470AD; border-radius: 0 8px 8px 0; margin: 28px 0;">
                <p style="margin: 0 0 12px 0; color: #233C67; font-weight: 600; font-size: 15px;">
                  Ce que vous allez découvrir\u{00A0}:
                </p>
                <ul style="margin: 0; padding: 0 0 0 20px; color: #555;">
                  <li style="margin: 10px 0; line-height: 1.6;">
                    <strong>9 protocoles complets</strong> \u{2192} Pour vous sentir plus calme dès la première séance
                  </li>
                  <li style="margin: 10px 0; line-height: 1.6;">
                    <strong>Gestion du stress et des émotions</strong> \u{2192} Pour aborder vos journées avec sérénité
                  </li>
                  <li style="margin: 10px 0; line-height: 1.6;">
                    <strong>Techniques de confiance en soi</strong> \u{2192} Pour enfin oser prendre la parole en public
                  </li>
                  <li style="margin: 10px 0; line-height: 1.6;">
                    <strong>Amélioration du sommeil</strong> \u{2192} Pour des nuits réparatrices, même après une journée chargée
                  </li>
                  <li style="margin: 10px 0; line-height: 1.6;">
                    <strong>2 protocoles NovaHypnose exclusifs</strong> \u{2192} « Le Socle inébranlable » et « L'Étincelle intérieure », réservés à mes lecteurs
                  </li>
                </ul>
              </div>

              <!-- Preuve sociale -->
              <div style="background: #fafafa; border-radius: 10px; padding: 20px 24px; margin: 28px 0; border-left: 3px solid #F37336;">
                <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #555; font-style: italic;">
                  « Grâce à ces techniques, 85% de mes clients réduisent leur stress en 4 séances. Et le meilleur\u{00A0}? Vous pouvez commencer dès ce soir, chez vous, sans matériel. »
                </p>
              </div>

              <!-- Offre appel gratuit -->
              <div style="background: #fff8f0; border: 1px solid #F37336; border-radius: 10px; padding: 24px; text-align: center; margin: 28px 0;">
                <p style="margin: 0 0 8px 0; font-size: 17px; font-weight: 600; color: #233C67;">
                  Envie d'aller plus loin\u{00A0}?
                </p>
                <p style="margin: 0 0 16px 0; font-size: 15px; color: #555; line-height: 1.6;">
                  Réservez dès maintenant votre <strong>séance découverte gratuite de 30 minutes</strong> — et découvrez comment adapter ces protocoles à <strong>votre</strong> situation.
                </p>
                <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                   style="display: inline-block; padding: 14px 32px; background: #233C67; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 600;">
                  \u{1F4C5} Réserver mon créneau gratuit
                </a>
                <p style="margin: 12px 0 0 0; font-size: 13px; color: #888;">
                  Places limitées — Sans engagement.
                </p>
              </div>

              <!-- Formation Paris -->
              <div style="background: linear-gradient(135deg, #233C67 0%, #4470AD 100%); border-radius: 10px; padding: 24px; text-align: center; margin: 28px 0;">
                <p style="margin: 0 0 8px 0; font-size: 17px; font-weight: 600; color: #ffffff;">
                  🎓 Prochaine formation à Paris
                </p>
                <p style="margin: 0 0 16px 0; font-size: 22px; color: #ffffff; font-weight: 700;">
                  12 avril 2025
                </p>
                <p style="margin: 0 0 16px 0; font-size: 15px; color: rgba(255,255,255,0.85); line-height: 1.6;">
                  Apprenez l'autohypnose en présentiel.<br>
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
                  Besoin d'aide pour appliquer un protocole\u{00A0}? Envoyez-moi un message sur WhatsApp — je vous réponds <strong>personnellement sous 24h</strong>.
                </p>
                <a href="https://wa.me/33649358089?text=Bonjour%20Alain%2C%20j%27ai%20une%20question%20sur%20le%20guide%20autohypnose"
                   style="display: inline-block; padding: 14px 28px; background: #25D366; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 600;">
                  \u{1F4F2} Discuter avec Alain sur WhatsApp
                </a>
              </div>

              <p style="font-size: 15px; line-height: 1.7; color: #555;">
                À très bientôt,<br>
                <strong style="color: #233C67;">Alain Zenatti — NovaHypnose</strong><br>
                <span style="font-size: 13px; color: #888;">Maître Praticien en Hypnose Ericksonienne</span><br>
                <span style="font-size: 13px; color: #888;">\u{1F4CD} 16 rue Saint-Antoine, 75004 Paris</span><br>
                <span style="font-size: 13px; color: #888;">\u{1F4DE} 06 49 35 80 89</span><br>
                <a href="https://novahypnose.fr" style="color: #4470AD; text-decoration: none; font-size: 13px;">\u{1F310} novahypnose.fr</a>
              </p>
            </div>

            <!-- Footer -->
            <hr style="border: none; border-top: 1px solid #eee; margin: 0 30px;">
            <div style="padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
              <p style="margin: 10px 0 0 0; font-size: 11px; color: #bbb;">
                Vous recevez cet email car vous avez téléchargé le guide « L'Autohypnose au Quotidien ».<br>
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
