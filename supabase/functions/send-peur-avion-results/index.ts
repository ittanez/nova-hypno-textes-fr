import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

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
      // Don't fail the request if DB fails, just log it
    }

    // Generate personalized recommendations based on score
    const getDetailedRecommendations = (percentage: number) => {
      if (percentage <= 20) {
        return {
          immediate: [
            "Pratiquez des exercices de respiration profonde",
            "Informez-vous sur le fonctionnement des avions",
            "Arrivez détendu à l'aéroport"
          ],
          longTerm: [
            "Maintenez vos bonnes habitudes de gestion du stress",
            "Continuez à voyager régulièrement"
          ]
        };
      } else if (percentage <= 40) {
        return {
          immediate: [
            "Apprenez des techniques de relaxation",
            "Préparez votre vol à l'avance",
            "Choisissez un siège qui vous rassure"
          ],
          longTerm: [
            "Considérez quelques séances de préparation mentale",
            "Développez des stratégies de gestion du stress"
          ]
        };
      } else if (percentage <= 60) {
        return {
          immediate: [
            "Pratiquez la méditation et la respiration",
            "Évitez la caféine avant le vol",
            "Apportez des distractions (musique, lectures)"
          ],
          longTerm: [
            "L'hypnothérapie peut grandement vous aider",
            "Travaillez sur vos pensées automatiques négatives"
          ]
        };
      } else if (percentage <= 80) {
        return {
          immediate: [
            "Commencez par des exercices de visualisation positive",
            "Parlez de vos peurs avec un proche",
            "Préparez un plan de gestion de l'anxiété"
          ],
          longTerm: [
            "Un accompagnement professionnel est recommandé",
            "L'hypnothérapie a 95% de réussite pour ce niveau de peur"
          ]
        };
      } else {
        return {
          immediate: [
            "Consultez un professionnel spécialisé",
            "Ne restez pas seul avec cette peur",
            "Commencez par des techniques de relaxation simples"
          ],
          longTerm: [
            "L'hypnothérapie est la solution la plus efficace",
            "Un programme personnalisé vous permettra de retrouver votre liberté"
          ]
        };
      }
    };

    const detailedRecommendations = getDetailedRecommendations(percentage);

    // Create email content
    const emailContent = `
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
            .recommendations h3 { color: #0369A1; margin-bottom: 15px; }
            .recommendations ul { padding-left: 20px; }
            .recommendations li { margin-bottom: 8px; }
            .cta { background: #0369A1; color: white; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
            .cta a { color: white; text-decoration: none; font-weight: bold; }
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
                    <div class="score">Score : ${totalScore}/48 (${percentage}%)</div>
                    <p><strong>Niveau identifié :</strong> ${fearLevel}</p>
                    <p>${recommendations}</p>
                </div>

                <div class="recommendations">
                    <h3>🎯 Actions immédiates recommandées</h3>
                    <ul>
                        ${detailedRecommendations.immediate.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>

                <div class="recommendations">
                    <h3>🚀 Stratégie à long terme</h3>
                    <ul>
                        ${detailedRecommendations.longTerm.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
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
                <p>Email: contact@novahypnose.fr | Tél: +33 XXX XXX XXX</p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Send email to client
    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: 'NovaHypnose <contact@updates.novahypnose.fr>',
      to: [userInfo.email],
      subject: `${userInfo.firstName}, vos résultats du quiz peur de l'avion`,
      html: emailContent,
      tags: [
        {
          name: 'category',
          value: 'quiz-peur-avion'
        }
      ]
    });

    if (emailError) {
      console.error('Email error:', emailError);
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }

    // Send notification to admin
    try {
      await resend.emails.send({
        from: 'NovaHypnose <contact@updates.novahypnose.fr>',
        to: ['a.zenatti@gmail.com'],
        subject: `Nouveau quiz peur avion - ${fearLevel}`,
        html: `
          <h3>Nouveau quiz de peur de l'avion complété</h3>
          <p><strong>Prénom :</strong> ${userInfo.firstName}</p>
          <p><strong>Email :</strong> ${userInfo.email}</p>
          <p><strong>Score :</strong> ${totalScore}/48 (${percentage}%)</p>
          <p><strong>Niveau :</strong> ${fearLevel}</p>
          <p><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</p>
        `
      });
    } catch (adminEmailError) {
      console.error('Admin email error:', adminEmailError);
      // Don't fail the main request if admin email fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Résultats envoyés avec succès',
        emailId: emailResult?.id
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
