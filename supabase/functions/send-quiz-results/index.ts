import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { getCorsHeaders, isValidEmail } from "../_shared/cors.ts";

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      firstName,
      userEmail,
      totalScore,
      dimensionScores,
      promoCode,
      sendToClient = true
    } = await req.json();

    // Validation de l'email
    if (!isValidEmail(userEmail)) {
      return new Response(
        JSON.stringify({ error: 'Format d\'email invalide' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
    
    // Format dimension scores for admin email
    const formattedDimensions = dimensionScores.map(d => `
      <div style="margin-bottom: 15px;">
        <p><strong>${d.name} : </strong> ${Math.round(d.score)}%</p>
        <p><em>Recommandation :</em> ${d.recommendation}</p>
      </div>
    `).join('');

    // 1. Send notification email to admin
    const adminEmailData = await resend.emails.send({
      from: 'Harmonia <contact@updates.novahypnose.fr>',
      to: 'a.zenatti@gmail.com',
      subject: `Nouveau test complété par ${firstName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h1>Nouveau test de sérénité complété</h1>
          
          <h2>Informations utilisateur :</h2>
          <p><strong>Prénom :</strong> ${firstName}</p>
          <p><strong>Email :</strong> ${userEmail}</p>
          <p><strong>Code promo :</strong> ${promoCode}</p>
          
          <h2>Résultats du test :</h2>
          <p><strong>Score global :</strong> ${Math.round(totalScore)}%</p>
          ${formattedDimensions}
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="mailto:${userEmail}?subject=Vos%20résultats%20du%20test%20de%20sérénité%20Harmonia&body=Bonjour%20${firstName}%2C%0A%0AJe%20vous%20remercie%20d'avoir%20passé%20notre%20test%20de%20sérénité.%0A%0ACordialement%2C%0AAlain%20Zenatti" 
               style="display: inline-block; background-color: #6d5dac; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold;">
              Répondre au client
            </a>
          </div>
        </div>
      `
    });

    // 2. Send detailed results email to client if requested
    let clientEmailResult = { id: null };
    if (sendToClient) {
      // Prepare data for HTML template - convert dimension objects to the expected format
      const quizResults = {
        totalScore: totalScore,
        stressManagement: getScoreForDimension(dimensionScores, "stress"),
        sleepQuality: getScoreForDimension(dimensionScores, "sleep"),
        innerSecurity: getScoreForDimension(dimensionScores, "security"),
        selfRelationship: getScoreForDimension(dimensionScores, "self"),
        relationalImpact: getScoreForDimension(dimensionScores, "relationships"),
        stressManagementComment: getRecommendationForDimension(dimensionScores, "stress"),
        sleepQualityComment: getRecommendationForDimension(dimensionScores, "sleep"),
        innerSecurityComment: getRecommendationForDimension(dimensionScores, "security"),
        selfRelationshipComment: getRecommendationForDimension(dimensionScores, "self"),
        relationalImpactComment: getRecommendationForDimension(dimensionScores, "relationships")
      };

      clientEmailResult = await resend.emails.send({
        from: 'Harmonia <contact@updates.novahypnose.fr>',
        to: userEmail,
        cc: ['a.zenatti@gmail.com'],
        subject: 'Vos résultats du test de sérénité',
        html: generateClientEmailHtml(firstName, quizResults, promoCode)
      });
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        adminEmailId: adminEmailData.id,
        clientEmailId: clientEmailResult.id
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      }
    );
  }
});

// Helper function to find score for a specific dimension
function getScoreForDimension(dimensionScores, dimensionKey) {
  const dimension = dimensionScores.find(d => d.name === dimensionKey);
  return dimension ? dimension.score : 0;
}

// Helper function to find recommendation for a specific dimension
function getRecommendationForDimension(dimensionScores, dimensionKey) {
  const dimension = dimensionScores.find(d => d.name === dimensionKey);
  return dimension ? dimension.recommendation : '';
}

// Generate the HTML for the client email
function generateClientEmailHtml(firstName, quizResults, promoCode) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vos résultats Harmonia</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f9;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    
    <!-- En-tête -->
    <div style="background-color: #6d5dac; padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Vos résultats du test de sérénité</h1>
    </div>
    
    <!-- Message d'accueil -->
    <div style="padding: 30px 30px 20px;">
      <p style="font-size: 16px; line-height: 1.5; color: #333;">Bonjour ${firstName},</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333;">Merci d'avoir complété notre test de sérénité. Voici un résumé de vos résultats qui vous donnera un aperçu de votre niveau actuel de stress et des domaines qui pourraient bénéficier des techniques d'auto-hypnose.</p>
    </div>
    
    <!-- Score global -->
    <div style="background-color: #f7f5ff; padding: 20px 30px; text-align: center; margin: 0 30px 20px; border-radius: 8px;">
      <h2 style="color: #6d5dac; margin-top: 0;">Votre score global : ${Math.round(quizResults.totalScore)} %</h2>
    </div>
    
    <!-- Analyse détaillée -->
    <div style="padding: 0 30px 20px;">
      <h3 style="color: #6d5dac; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Analyse par dimension</h3>
      
      <!-- Gestion du stress -->
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <h4 style="margin: 0; color: #555;">Gestion du stress quotidien</h4>
          <h4 style="margin: 0; color: #6d5dac;">${Math.round(quizResults.stressManagement)} %</h4>
        </div>
        <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; margin-bottom: 10px;">
          <div style="height: 100%; width: ${Math.round(quizResults.stressManagement)}%; background-color: #6d5dac; border-radius: 5px;"></div>
        </div>
        <p style="font-size: 15px; line-height: 1.5; color: #555; margin-top: 5px; font-style: italic; background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
          ${quizResults.stressManagementComment}
        </p>
      </div>
      
      <!-- Qualité du sommeil -->
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <h4 style="margin: 0; color: #555;">Qualité du sommeil</h4>
          <h4 style="margin: 0; color: #6d5dac;">${Math.round(quizResults.sleepQuality)} %</h4>
        </div>
        <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; margin-bottom: 10px;">
          <div style="height: 100%; width: ${Math.round(quizResults.sleepQuality)}%; background-color: #6d5dac; border-radius: 5px;"></div>
        </div>
        <p style="font-size: 15px; line-height: 1.5; color: #555; margin-top: 5px; font-style: italic; background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
          ${quizResults.sleepQualityComment}
        </p>
      </div>
      
      <!-- Sentiment de sécurité intérieure -->
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <h4 style="margin: 0; color: #555;">Sentiment de sécurité intérieure</h4>
          <h4 style="margin: 0; color: #6d5dac;">${Math.round(quizResults.innerSecurity)} %</h4>
        </div>
        <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; margin-bottom: 10px;">
          <div style="height: 100%; width: ${Math.round(quizResults.innerSecurity)}%; background-color: #6d5dac; border-radius: 5px;"></div>
        </div>
        <p style="font-size: 15px; line-height: 1.5; color: #555; margin-top: 5px; font-style: italic; background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
          ${quizResults.innerSecurityComment}
        </p>
      </div>
      
      <!-- Relation avec soi-même -->
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <h4 style="margin: 0; color: #555;">Relation avec soi-même</h4>
          <h4 style="margin: 0; color: #6d5dac;">${Math.round(quizResults.selfRelationship)} %</h4>
        </div>
        <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; margin-bottom: 10px;">
          <div style="height: 100%; width: ${Math.round(quizResults.selfRelationship)}%; background-color: #6d5dac; border-radius: 5px;"></div>
        </div>
        <p style="font-size: 15px; line-height: 1.5; color: #555; margin-top: 5px; font-style: italic; background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
          ${quizResults.selfRelationshipComment}
        </p>
      </div>
      
      <!-- Impact du stress sur les relations -->
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <h4 style="margin: 0; color: #555;">Impact du stress sur les relations</h4>
          <h4 style="margin: 0; color: #6d5dac;">${Math.round(quizResults.relationalImpact)} %</h4>
        </div>
        <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; margin-bottom: 10px;">
          <div style="height: 100%; width: ${Math.round(quizResults.relationalImpact)}%; background-color: #6d5dac; border-radius: 5px;"></div>
        </div>
        <p style="font-size: 15px; line-height: 1.5; color: #555; margin-top: 5px; font-style: italic; background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
          ${quizResults.relationalImpactComment}
        </p>
      </div>
    </div>
    
    <!-- Code promo -->
    <div style="background-color: #6d5dac; color: white; padding: 25px 30px; margin: 0 30px 30px; text-align: center; border-radius: 8px;">
      <h3 style="margin-top: 0; font-size: 24px;">Votre code promo exclusif</h3>
      <div style="background-color: white; color: #6d5dac; font-weight: bold; font-size: 20px; padding: 15px; border-radius: 5px; margin: 15px 0;">
        ${promoCode}
      </div>
      <p style="font-size: 16px; margin-bottom: 20px;">
        Bénéficiez de <strong>50% de réduction</strong> sur notre formation Harmonia<br>
        <span style="font-size: 14px;">(150€ au lieu de 300€)</span>
      </p>
      <p style="font-size: 15px; margin-bottom: 20px;">Formation débutant le <strong>26 octobre</strong></p>
      <a href="https://buy.stripe.com/28og292uN30p3XW3cc" style="display: inline-block; background-color: white; color: #6d5dac; text-decoration: none; padding: 12px 25px; border-radius: 30px; font-weight: bold;">
        S'INSCRIRE MAINTENANT
      </a>
    </div>
    
    <!-- Rendez-vous -->
    <div style="padding: 0 30px 30px;">
      <h3 style="color: #6d5dac; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Des questions sur vos résultats ?</h3>
      <p style="font-size: 16px; line-height: 1.5; color: #333;">
        Je vous propose un échange téléphonique gratuit de 30 minutes pour approfondir l'analyse de vos résultats et voir comment l'auto-hypnose pourrait vous aider.
      </p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://calendly.com/zenatti/consultation-d-hypnose-paris-clone" style="display: inline-block; background-color: #6d5dac; color: white; text-decoration: none; padding: 12px 25px; border-radius: 30px; font-weight: bold;">
          RÉSERVER UN APPEL GRATUIT
        </a>
      </div>
    </div>
    
    <!-- Formation -->
    <div style="background-color: #f7f5ff; padding: 30px;">
      <h3 style="color: #6d5dac; text-align: center; margin-top: 0;">Formation Harmonia - Retrouvez votre sérénité</h3>
      <p style="font-size: 16px; line-height: 1.5; color: #333; text-align: center;">
        Notre formation est principalement axée sur la pratique. Vous apprendrez des techniques concrètes d'auto-hypnose pour gérer votre stress au quotidien.
      </p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://harmonia.novahypnose.fr/#programme" style="display: inline-block; background-color: transparent; color: #6d5dac; text-decoration: none; padding: 10px 20px; border: 2px solid #6d5dac; border-radius: 30px; font-weight: bold;">
          VOIR LE PROGRAMME DÉTAILLÉ
        </a>
      </div>
    </div>
    
    <!-- Pied de page -->
    <div style="padding: 30px; text-align: center; background-color: #333; color: white;">
      <p style="font-size: 14px; margin-bottom: 10px;">
        Cordialement,<br>
        <strong>Alain Zenatti</strong><br>
        Hypnothérapeute - Formateur en auto-hypnose
      </p>
      <p style="font-size: 12px; margin-top: 20px;">
        © 2025 <a href="https://harmonia.novahypnose.fr" style="color: white; text-decoration: none;">Harmonia</a> - 
        <a href="https://novahypnose.fr" style="color: white; text-decoration: none;">Novahypnose</a> - Tous droits réservés
      </p>
    </div>
    
  </div>
</body>
</html>`;
}
