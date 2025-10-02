import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { subscriberEmail, adminEmail } = await req.json()

    console.log('Envoi de notification admin pour:', subscriberEmail)

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'NovaHypnose <contact@updates.novahypnose.fr>',
        to: [adminEmail],
        subject: 'Nouvel abonné à la newsletter Émergences',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2980b9;">Nouvel abonné à la newsletter</h2>
            <p>Un nouveau lecteur s'est abonné à la newsletter Émergences.</p>
            <div style="background: #f0f8ff; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
              <p style="margin: 0;"><strong>Email :</strong> ${subscriberEmail}</p>
              <p style="margin: 5px 0 0 0;"><small>Date : ${new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</small></p>
            </div>
            <p style="color: #666; font-size: 14px;">
              Vous pouvez consulter la liste complète des abonnés dans votre espace d'administration.
            </p>
          </div>
        `,
      }),
    })

    const data = await res.json()
    console.log('Réponse Resend:', data)

    return new Response(
      JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Erreur:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
})
