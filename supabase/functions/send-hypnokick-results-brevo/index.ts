import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from '../_shared/cors.ts';
import { fromAddress, fromName } from './config.ts';
import { getCategoryContent } from './content-generator.ts';

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_TEMPLATE_ID = 23;
const BREVO_LIST_ID = 8;

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const responseHeaders = {
      ...corsHeaders,
      'Content-Type': 'application/json'
    };

    const body = await req.text();
    console.log('send-hypnokick-results-brevo — Body reçu:', body);

    if (!body) {
      throw new Error('Body vide');
    }

    const { email, firstName, localisation, score, category, senseDominant, vakogScores } = JSON.parse(body);

    console.log('Données parsées:', JSON.stringify({ email, firstName, localisation, score, category, senseDominant }, null, 2));

    if (!email) {
      throw new Error('Email is required');
    }

    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY non configurée');
    }

    const content = getCategoryContent(category);

    // 1. Ajout / mise à jour du contact dans la liste Brevo
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        attributes: {
          PRENOM: firstName,
          LOCALISATION: localisation || '',
          HYPNOKICK_SCORE: score,
          HYPNOKICK_CATEGORIE: category,
          HYPNOKICK_SENS_DOMINANT: senseDominant,
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    const contactData = await contactRes.json();
    console.log('Contact Brevo:', JSON.stringify(contactData, null, 2));

    // 2. Envoi de l'email via le template Brevo
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        templateId: BREVO_TEMPLATE_ID,
        sender: { email: fromAddress, name: fromName },
        to: [{ email, name: firstName }],
        bcc: [{ email: 'a.zenatti@gmail.com' }],
        params: {
          PRENOM: firstName,
          LOCALISATION: localisation || '',
          SCORE: score,
          CATEGORIE: category,
          SENS_DOMINANT: senseDominant,
          DESCRIPTION: content.description,
          CONSEILS: content.conseils,
          MESSAGE_MOTIVANT: content.messageMotivant,
          EXERCICE: content.exercice,
        },
      }),
    });

    const emailData = await emailRes.json();
    console.log('Réponse Brevo email:', JSON.stringify(emailData, null, 2));

    if (!emailRes.ok) {
      console.error('❌ Erreur envoi email Brevo:', emailData);
      return new Response(
        JSON.stringify({
          status: "warning",
          message: "Résultats calculés, mais l'envoi de l'email a échoué.",
          error: emailData?.message,
          score,
          category,
        }),
        { status: 200, headers: responseHeaders }
      );
    }

    console.log('✅ Email envoyé + contact ajouté à la liste', BREVO_LIST_ID);

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Email envoyé et contact ajouté à la liste Brevo",
        data: emailData,
      }),
      { status: 200, headers: responseHeaders }
    );

  } catch (error) {
    console.error('💥 Erreur:', error);
    return new Response(
      JSON.stringify({
        status: "error",
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...getCorsHeaders(req) }
      }
    );
  }
});
