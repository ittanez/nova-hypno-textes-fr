import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userInfo, totalScore, percentage, fearLevel, recommendations, answers } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('quiz_peur_avion')
      .insert([
        {
          email: userInfo.email,
          first_name: userInfo.firstName,
          total_score: totalScore,
          percentage: percentage,
          fear_level: fearLevel,
          recommendations: recommendations,
          answers: answers,
          created_at: new Date().toISOString()
        }
      ]);

    if (dbError) {
      console.error('Database error:', dbError);
    }

    // Email HTML pour le client
    const clientEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0369A1 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .result-box { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #0369A1; }
            .score { font-size: 24px; font-weight: bold; color: #0369A1; }
            .recommendations { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
            .cta { background: #0369A1; color: white; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Vos résultats personnalisés</h1>
              <p>Quiz Peur de l'Avion - NovaHypnose</p>
            </div>

            <div class="content">
              <p>Bonjour ${userInfo.firstName},</p>

              <p>Merci d'avoir pris le temps de réaliser notre quiz de peur de l'avion. Voici vos résultats personnalisés :</p>

              <div class="result-box">
                <h3>Votre profil</h3>
                <div class="score">Score : ${totalScore}/100 (${percentage}%)</div>
                <p><strong>Niveau identifié :</strong> ${fearLevel}</p>
                <p>${recommendations}</p>
              </div>

              ${percentage > 40 ? `
              <div class="cta">
                <h3>Programme "Liberté Aérienne"</h3>
                <p>Basé sur votre profil, notre programme d'hypnothérapie peut vous aider à surmonter définitivement votre peur de l'avion.</p>
                <p><strong>95% de réussite • 3 séances + 1 offerte • Garantie satisfait</strong></p>
                <a href="https://novahypnose.fr/peur-avion-maquette#programmes" style="background: white; color: #0369A1; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 10px;">Découvrir le programme 497€</a>
              </div>
              ` : ''}

              <p>Vous avez des questions ? Répondez simplement à cet email, je serai ravi de vous aider.</p>

              <p>Bien à vous,<br>
              <strong>Alain Zenatti</strong><br>
              NovaHypnose - Spécialiste en hypnothérapie pour la peur de l'avion</p>
            </div>

            <div class="footer">
              <p>NovaHypnose - Libérez-vous de la peur de l'avion</p>
              <p>Email: contact@novahypnose.fr</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email HTML pour le praticien
    const praticienEmailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px;">📋 Nouveau Quiz Peur de l'Avion</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">NovaHypnose - ${new Date().toLocaleDateString('fr-FR')}</p>
          </div>

          <div style="background: #f8f9ff; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #4f46e5;">👤 INFORMATIONS CLIENT</h2>
            <p><strong>Prénom :</strong> ${userInfo.firstName}</p>
            <p><strong>Email :</strong> ${userInfo.email}</p>
          </div>

          <div style="background: #fff5f5; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 30px;">
            <h2 style="color: #dc2626;">🎯 RÉSULTATS</h2>
            <p><strong>Score :</strong> ${totalScore}/100 (${percentage}%)</p>
            <p><strong>Niveau :</strong> ${fearLevel}</p>
            <p><strong>Recommandation :</strong> ${recommendations}</p>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #0369a1;">📊 RÉPONSES DÉTAILLÉES</h2>
            ${answers.map((ans, idx) => `
              <div style="margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px;">
                <p style="margin: 0 0 5px 0;"><strong>Q${idx + 1}:</strong> ${ans.question}</p>
                <p style="margin: 0; color: #0369a1;"><strong>→</strong> ${ans.answer} (${ans.points} points)</p>
              </div>
            `).join('')}
          </div>

          <div style="background: #fefce8; border: 1px solid #eab308; padding: 20px; border-radius: 10px;">
            <h2 style="color: #a16207;">⚡ ACTIONS</h2>
            <p>Contacter ${userInfo.firstName} pour proposer un rendez-vous</p>
          </div>
        </body>
      </html>
    `;

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not found');
    }

    // 1. Email au client
    const clientResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NovaHypnose <contact@updates.novahypnose.fr>',
        to: [userInfo.email],
        subject: `${userInfo.firstName}, vos résultats du quiz peur de l'avion`,
        html: clientEmailHtml
      })
    });

    if (!clientResponse.ok) {
      const errorData = await clientResponse.text();
      console.error('Erreur email client:', errorData);
    }

    const clientResult = await clientResponse.json();

    // 2. Email au praticien
    const praticienResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NovaHypnose <contact@updates.novahypnose.fr>',
        to: ['a.zenatti@gmail.com'],
        subject: `Nouveau quiz peur avion - ${fearLevel}`,
        html: praticienEmailHtml
      })
    });

    if (!praticienResponse.ok) {
      console.error('Erreur email praticien');
    }

    const praticienResult = await praticienResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Résultats envoyés avec succès',
        clientEmailId: clientResult?.id,
        praticienEmailId: praticienResult?.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Function error:', error);

    return new Response(
      JSON.stringify({
        error: 'Erreur lors de l\'envoi des résultats',
        details: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
