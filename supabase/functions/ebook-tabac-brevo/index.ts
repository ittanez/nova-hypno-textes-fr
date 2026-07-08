import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { getCorsHeaders, isValidEmail, sanitizeString } from "../_shared/cors.ts"

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')
const BREVO_LIST_ID = 19

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (!BREVO_API_KEY) {
    console.error('ebook-tabac-brevo — BREVO_API_KEY manquante dans les variables d\'environnement')
    return new Response(
      JSON.stringify({ error: 'Configuration serveur incorrecte' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body = await req.text()
    console.log('ebook-tabac-brevo — Body recu:', body)

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

    // Creer/mettre a jour le contact avec PRENOM (+ LOCALISATION si presente) et
    // l'ajouter directement a la liste 19 (ebook-tabac) via listIds, en un seul appel.
    const attributes: Record<string, string> = {}
    if (prenomSafe) attributes.PRENOM = prenomSafe
    if (locationSafe) attributes.LOCALISATION = locationSafe

    const createPayload: Record<string, unknown> = {
      email: email,
      updateEnabled: true,
      listIds: [BREVO_LIST_ID],
    }
    if (Object.keys(attributes).length > 0) {
      createPayload.attributes = attributes
    }

    const createRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(createPayload),
    })

    // Brevo renvoie 204 No Content (body vide) quand updateEnabled:true met a jour
    // un contact existant. On parse le body de maniere defensive.
    const createText = await createRes.text()
    let createData: { message?: string } | null = null
    if (createText) {
      try { createData = JSON.parse(createText) } catch { /* body non-JSON */ }
    }
    console.log('Reponse Brevo creation/mise a jour contact:', createRes.status, createData)

    if (!createRes.ok) {
      throw new Error(createData?.message || "Impossible d'enregistrer votre email. Veuillez reessayer.")
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('ebook-tabac-brevo — Erreur:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
