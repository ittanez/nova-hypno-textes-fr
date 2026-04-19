import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { getCorsHeaders, isValidEmail, sanitizeString } from "./cors.ts"

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')
const BREVO_LIST_ID = 18

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.text()
    console.log('ebook-procrastination-brevo — Body recu:', body)

    if (!body) {
      throw new Error('Body vide')
    }

    const { firstName, prenom: prenomField, email, location } = JSON.parse(body)
    const prenom = firstName || prenomField

    if (!email) {
      throw new Error('Email manquant')
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Format d'email invalide" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const prenomRaw = sanitizeString(prenom || '', 100) || ''
    const prenomSafe = prenomRaw ? prenomRaw.charAt(0).toUpperCase() + prenomRaw.slice(1) : ''
    const locationSafe = sanitizeString(location || '', 100)

    console.log('Contact:', email, '— Prenom:', prenomSafe, '— Localisation:', locationSafe)

    // ETAPE 1 : Creer/mettre a jour le contact avec PRENOM (+ LOCALISATION si presente)
    const attributes: Record<string, string> = {}
    if (prenomSafe) attributes.PRENOM = prenomSafe
    if (locationSafe) attributes.LOCALISATION = locationSafe

    const createPayload: any = {
      email: email,
      updateEnabled: true,
    }
    if (Object.keys(attributes).length > 0) {
      createPayload.attributes = attributes
    }

    const createRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY!,
      },
      body: JSON.stringify(createPayload),
    })
    const createData = await createRes.json()
    console.log('Reponse Brevo creation contact:', createData)

    if (!createRes.ok && createRes.status !== 400) {
      throw new Error(createData?.message || "Erreur lors de la creation du contact")
    }

    // ETAPE 2 : Ajouter a la liste 18 (ebook-procrastination) pour declencher le workflow Brevo
    const listPayload = {
      emails: [email],
    }

    const listRes = await fetch(`https://api.brevo.com/v3/contacts/lists/${BREVO_LIST_ID}/contacts/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY!,
      },
      body: JSON.stringify(listPayload),
    })
    const listData = await listRes.json()
    console.log('Reponse Brevo ajout liste:', listData)

    if (!listRes.ok) {
      console.error('Erreur ajout liste Brevo:', listData)
      throw new Error(listData?.message || "Erreur lors de l'ajout a la liste")
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('ebook-procrastination-brevo — Erreur:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
