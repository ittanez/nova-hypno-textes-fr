import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, fromAddress, fromName } from './config.ts';
import { generateEmailContent } from './email-template.ts';
import { getImageUrls } from './image-urls.ts';

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const responseHeaders = {
      ...corsHeaders,
      'Content-Type': 'application/json'
    };

    const { email, firstName, score, category, description, senseDominant, vakogScores, timestamp } = await req.json();

    console.log('send-hypnokick-results-brevo — Request:', JSON.stringify({ email, firstName, score, category, senseDominant, timestamp }, null, 2));

    if (!email) {
      throw new Error('Email is required');
    }

    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY non configurée');
    }

    const imageUrls = getImageUrls();

    const htmlContent = generateEmailContent(
      score,
      category,
      description,
      senseDominant,
      imageUrls.alainZenattiImageUrl,
      imageUrls.seanceHypnoseImageUrl
    );

    console.log(`📤 Envoi Brevo de ${fromAddress} vers ${email}`);

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { email: fromAddress, name: fromName },
        to: [{ email }],
        bcc: [{ email: 'a.zenatti@gmail.com' }],
        subject: "Félicitations ! Voici votre bilan hypnotique ! ⬇️✨",
        htmlContent,
      }),
    });

    const brevoData = await brevoRes.json();
    console.log('Réponse Brevo:', JSON.stringify(brevoData, null, 2));

    if (!brevoRes.ok) {
      console.error('❌ Erreur Brevo:', brevoData);
      return new Response(
        JSON.stringify({
          status: "warning",
          message: "Résultats calculés, mais l'envoi de l'email a échoué. Utilisez l'écran actuel pour voir vos résultats.",
          error: brevoData?.message,
          score,
          category,
          description
        }),
        { status: 200, headers: responseHeaders }
      );
    }

    console.log('✅ Email envoyé avec succès via Brevo');

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Email envoyé avec succès",
        data: brevoData,
        debug: {
          timestamp: new Date().toISOString(),
          images: imageUrls
        }
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
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
});
