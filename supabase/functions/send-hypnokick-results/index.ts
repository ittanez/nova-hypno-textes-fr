import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { corsHeaders, fromAddress } from './config.ts';
import { generateEmailContent } from './email-template.ts';
import { getImageUrls } from './image-urls.ts';
import { EmailLogger } from './logger.ts';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }

  try {
    const responseHeaders = {
      ...corsHeaders,
      'Content-Type': 'application/json'
    };

    const { email, firstName, score, category, description, senseDominant, vakogScores, timestamp } = await req.json();

    EmailLogger.logRequest({
      email,
      firstName,
      score,
      category,
      senseDominant,
      timestamp
    });

    if (!email) {
      throw new Error('Email is required');
    }

    const imageUrls = getImageUrls();
    EmailLogger.logImages(imageUrls);

    const htmlContent = generateEmailContent(
      score,
      category,
      description,
      senseDominant,
      imageUrls.alainZenattiImageUrl,
      imageUrls.seanceHypnoseImageUrl
    );

    EmailLogger.logEmailSending(fromAddress, email);

    const emailResponse = await resend.emails.send({
      from: `Nova Hypnose <${fromAddress}>`,
      to: [email],
      bcc: ["a.zenatti@gmail.com"],
      subject: "Félicitations ! Voici votre bilan hypnotique ! ⬇️✨",
      html: htmlContent
    });

    EmailLogger.logEmailResponse(emailResponse);

    if (emailResponse.error) {
      EmailLogger.logResendError(emailResponse.error);
      return new Response(
        JSON.stringify({
          status: "warning",
          message: "Résultats calculés, mais l'envoi de l'email a échoué. Utilisez l'écran actuel pour voir vos résultats.",
          error: emailResponse.error.message,
          score,
          category,
          description
        }),
        {
          status: 200,
          headers: responseHeaders
        }
      );
    }

    EmailLogger.logSuccess();

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Email envoyé avec succès",
        data: emailResponse,
        debug: {
          timestamp: new Date().toISOString(),
          images: imageUrls
        }
      }),
      {
        status: 200,
        headers: responseHeaders
      }
    );
  } catch (error) {
    EmailLogger.logError(error);

    return new Response(
      JSON.stringify({
        status: "error",
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});
