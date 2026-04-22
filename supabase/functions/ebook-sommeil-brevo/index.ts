import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { getCorsHeaders, isValidEmail, sanitizeString } from "../_shared/cors.ts"

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')
const BREVO_LIST_ID = 9

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.text()
    console.log('ebook-sommeil-brevo — Body recu:', body)

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

    // FIX: Brevo renvoie 204 No Content (body vide) quand updateEnabled:true met a jour
    // un contact existant. await createRes.json() plantait alors avec SyntaxError et
    // empechait un utilisateur deja present dans Brevo de s'inscrire a un second ebook.
    // On parse le body de maniere defensive.
    const createText = await createRes.text()
    let createData: { message?: string } | null = null
    if (createText) {
      try { createData = JSON.parse(createText) } catch { /* body non-JSON */ }
    }
    console.log('Reponse Brevo creation contact:', createRes.status, createData)

    // FIX: on ne masque plus les 400 — avec updateEnabled:true le cas "duplicate" devient
    // 204, donc un 400 residuel est une vraie erreur de validation a surfacer.
    if (!createRes.ok) {
      throw new Error(createData?.message || "Impossible d'enregistrer votre email. Veuillez reessayer.")
    }

    // ETAPE 2 : Ajouter a la liste 9 (ebook-sommeil) pour declencher le workflow Brevo
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
    const listText = await listRes.text()
    let listData: { code?: string; message?: string } | null = null
    if (listText) {
      try { listData = JSON.parse(listText) } catch { /* body non-JSON */ }
    }
    console.log('Reponse Brevo ajout liste:', listRes.status, listData)

    // FIX: Brevo renvoie 400 "Contact already in list and/or does not exist" quand le
    // contact est deja dans la liste cible (cas d'une re-inscription au meme ebook).
    // C'est un succes fonctionnel — on ne throw pas.
    const alreadyInList = listRes.status === 400 && listData?.code === 'invalid_parameter'
    if (!listRes.ok && !alreadyInList) {
      console.error('Erreur ajout liste Brevo:', listData)
      throw new Error(listData?.message || "Erreur lors de l'ajout a la liste")
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('ebook-sommeil-brevo — Erreur:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
