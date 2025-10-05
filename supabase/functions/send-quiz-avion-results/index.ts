import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('📧 Fonction send-quiz-avion-results appelée');
    const requestBody = await req.json().catch(() => null);
    console.log('📧 Request body reçu:', requestBody);

    if (!requestBody || !requestBody.email || !requestBody.results) {
      throw new Error('Email et résultats requis');
    }

    const { email, results, userAgent } = requestBody;
    console.log('📧 Email destinataire:', email);

    // Generate email content pour le quiz avancé
    const emailContent = generateQuizAvanceEmailContent(results);

    // Send email via Resend API avec copie cachée pour Alain
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Nova Hypnose <contact@updates.novahypnose.fr>',
        to: [email],
        bcc: ['a.zenatti@gmail.com'],
        subject: `Vos résultats de test peur de l'avion - Profil: ${results.profile.name}`,
        html: emailContent
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', resendResponse.status, errorText);
      throw new Error(`Resend API error: ${resendResponse.status} - ${errorText}`);
    }

    const resendData = await resendResponse.json();

    return new Response(JSON.stringify({
      success: true,
      messageId: resendData.id,
      message: 'Email quiz avancé envoyé avec succès (copie à a.zenatti@gmail.com)'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error sending quiz avancé results email:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});

// Fonctions utilitaires pour l'email
function getDominantDimension(dimensionPercentages: any) {
  if (!dimensionPercentages) return "Non défini";

  const max = Math.max(
    dimensionPercentages.cognitive || 0,
    dimensionPercentages.physique || 0,
    dimensionPercentages.comportementale || 0,
    dimensionPercentages.sociale || 0
  );

  if (dimensionPercentages.cognitive === max) return "Aspects cognitifs";
  if (dimensionPercentages.physique === max) return "Réactions physiques";
  if (dimensionPercentages.comportementale === max) return "Comportements";
  if (dimensionPercentages.sociale === max) return "Impact social";
  return "Non défini";
}

function getUrgencyLevel(totalScore: number) {
  if (totalScore >= 80) return "Critique - Action immédiate recommandée";
  if (totalScore >= 60) return "Élevée - Traitement fortement conseillé";
  if (totalScore >= 40) return "Modérée - Accompagnement bénéfique";
  if (totalScore >= 20) return "Légère - Prévention recommandée";
  return "Minimale - Sensibilisation suffisante";
}

function generatePersonalizedRecommendations(profile: any, totalScore: number, dimensionPercentages: any) {
  const recommendations = [];

  if (totalScore >= 70) {
    recommendations.push("• Commencez rapidement un accompagnement spécialisé");
    recommendations.push("• Évitez les vols jusqu'à la résolution de votre phobie");
    recommendations.push("• Pratiquez la relaxation quotidiennement");
  } else if (totalScore >= 50) {
    recommendations.push("• Un accompagnement thérapeutique est fortement conseillé");
    recommendations.push("• Préparez vos voyages avec des techniques de gestion du stress");
    recommendations.push("• Commencez par des vols courts");
  } else if (totalScore >= 30) {
    recommendations.push("• Des séances d'hypnose préventives seraient bénéfiques");
    recommendations.push("• Informez-vous sur le fonctionnement des avions");
    recommendations.push("• Pratiquez des exercices de respiration");
  } else {
    recommendations.push("• Maintenez vos connaissances sur la sécurité aérienne");
    recommendations.push("• Continuez à voyager régulièrement");
    recommendations.push("• Restez attentif à l'évolution de votre ressenti");
  }

  return recommendations.join('<br>');
}

function generateQuizAvanceEmailContent(results: any) {
  const { profile, totalScore, dimensionScores, dimensionPercentages, personalizedArguments } = results;

  console.log('📊 Results reçus:', JSON.stringify(results, null, 2));
  console.log('📊 dimensionScores:', dimensionScores);
  console.log('📊 dimensionPercentages:', dimensionPercentages);

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Résultats Test Peur de l'Avion</title>
<link href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css" rel="stylesheet">
<style>
@font-face{font-family:'AlibabaSans';src:url('https://assets-persist.lovart.ai/agent-static-assets/AlibabaSans-Regular.otf') format('opentype');font-weight:normal;font-style:normal;}
@font-face{font-family:'AlibabaSans';src:url('https://assets-persist.lovart.ai/agent-static-assets/AlibabaSans-Medium.otf') format('opentype');font-weight:500;font-style:normal;}
@font-face{font-family:'AlibabaSans';src:url('https://assets-persist.lovart.ai/agent-static-assets/Alibaba-PuHuiTi-Bold.otf') format('opentype');font-weight:bold;font-style:normal;}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'AlibabaSans',sans-serif;background-color:#f5f8fa;color:#333;line-height:1.6;}
.container{width:600px;margin:0 auto;background-color:#ffffff;}
.header{background-image:url('https://assets-persist.lovart.ai/agent_images/a66a234c-1ac4-4f00-ba62-1d660ae9e75d.png');background-size:cover;background-position:center;color:white;text-align:center;padding:60px 30px;position:relative;border-radius:0 0 20px 20px;}
.header h1{font-size:28px;font-weight:500;margin-bottom:10px;text-shadow:0 2px 4px rgba(0,0,0,0.2);}
.header p{font-size:16px;opacity:0.9;text-shadow:0 1px 2px rgba(0,0,0,0.2);}
.header .plane-icon{position:absolute;top:30px;right:40px;font-size:32px;opacity:0.9;}
.card{background:white;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,0.08);padding:25px;margin:20px;}
.card-title{display:flex;align-items:center;margin-bottom:20px;color:#1a73e8;font-size:18px;font-weight:500;}
.card-title i{margin-right:10px;font-size:22px;}
.profile-result{text-align:center;padding:15px 0;}
.profile-type{font-size:24px;font-weight:500;color:#1a73e8;margin-bottom:10px;}
.profile-score{font-size:42px;font-weight:bold;color:#333;margin:10px 0;}
.profile-description{font-size:14px;color:#666;}
.analysis-item{margin-bottom:20px;}
.analysis-item h4{font-size:16px;font-weight:500;margin-bottom:8px;display:flex;justify-content:space-between;}
.progress-bar{height:6px;background-color:#e0e0e0;border-radius:3px;overflow:hidden;margin-top:5px;}
.progress-fill{height:100%;background:linear-gradient(to right,#64b5f6,#1a73e8);border-radius:3px;}
.program-details{margin-top:15px;}
.program-price{font-size:24px;font-weight:bold;color:#1a73e8;margin:10px 0;}
.program-comparison{font-size:14px;color:#666;margin-bottom:15px;}
.program-feature{display:flex;align-items:center;margin-bottom:8px;}
.program-feature i{color:#1a73e8;margin-right:10px;font-size:18px;}
.success-rate{background-color:#e3f2fd;padding:10px 15px;border-radius:8px;margin-top:15px;text-align:center;color:#1a73e8;font-weight:500;}
.cta-button{display:block;background:linear-gradient(to top,#1a73e8,#64b5f6);color:white;text-align:center;padding:16px;border-radius:8px;font-size:18px;font-weight:500;text-decoration:none;margin:30px 20px;box-shadow:0 4px 12px rgba(26,115,232,0.3);transition:transform 0.2s,box-shadow 0.2s;}
.cta-button:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(26,115,232,0.4);}
.payment-info{text-align:center;font-size:13px;color:#666;margin:-20px 20px 20px;}
.contact-item{display:flex;align-items:center;margin-bottom:12px;}
.contact-item i{color:#1a73e8;margin-right:12px;font-size:18px;width:20px;text-align:center;}
.footer{background-color:#f5f8fa;padding:20px;text-align:center;font-size:12px;color:#666;border-radius:20px 20px 0 0;}
</style>
</head>
<body>
<div class="container">
<div class="header">
<i class="ri-flight-takeoff-line plane-icon"></i>
<h1>Vos résultats de test peur de l'avion</h1>
<p>Analyse personnalisée par Alain Zenatti, hypnothérapeute certifié</p>
</div>

<div class="card">
<div class="profile-result">
<div class="profile-type">${profile.name || 'Profil détecté'}</div>
<div class="profile-score">${totalScore}/100</div>
<div class="profile-description">${profile.description || 'Profil identifié selon votre niveau d\'aérophobie'}</div>
</div>
</div>

<div class="card">
<div class="card-title">
<i class="ri-bar-chart-grouped-line"></i>
<h3>Analyse détaillée par dimensions</h3>
</div>
<div class="analysis-item">
<h4><span>Aspects cognitifs</span><span>${dimensionPercentages?.cognitive || 0}%</span></h4>
<div class="progress-bar"><div class="progress-fill" style="width: ${dimensionPercentages?.cognitive || 0}%"></div></div>
</div>
<div class="analysis-item">
<h4><span>Réactions physiques</span><span>${dimensionPercentages?.physique || 0}%</span></h4>
<div class="progress-bar"><div class="progress-fill" style="width: ${dimensionPercentages?.physique || 0}%"></div></div>
</div>
<div class="analysis-item">
<h4><span>Comportements</span><span>${dimensionPercentages?.comportementale || 0}%</span></h4>
<div class="progress-bar"><div class="progress-fill" style="width: ${dimensionPercentages?.comportementale || 0}%"></div></div>
</div>
<div class="analysis-item">
<h4><span>Impact social</span><span>${dimensionPercentages?.sociale || 0}%</span></h4>
<div class="progress-bar"><div class="progress-fill" style="width: ${dimensionPercentages?.sociale || 0}%"></div></div>
</div>
</div>

<div class="card">
<div class="card-title">
<i class="ri-user-settings-line"></i>
<h3>Vos caractéristiques principales</h3>
</div>
<div style="margin-bottom: 15px;">
<div style="margin-bottom: 8px;"><strong>Niveau d'intensité :</strong> ${Math.round(totalScore / 20)} sur 5</div>
<div style="margin-bottom: 8px;"><strong>Dimension dominante :</strong> ${getDominantDimension(dimensionPercentages)}</div>
<div style="margin-bottom: 8px;"><strong>Urgence d'intervention :</strong> ${getUrgencyLevel(totalScore)}</div>
</div>
</div>

<div class="card">
<div class="card-title">
<i class="ri-lightbulb-line"></i>
<h3>Recommandations personnalisées</h3>
</div>
<div style="margin-bottom: 15px;">
${generatePersonalizedRecommendations(profile, totalScore, dimensionPercentages)}
</div>
</div>

<div class="card">
<div class="card-title">
<i class="ri-flight-land-line"></i>
<h3>Programme Liberté Aérienne - Accompagnement complet</h3>
</div>
<div class="program-details">
<div class="program-price">497€</div>
<div class="program-comparison">33% moins cher qu'Air France (750€) avec un suivi personnalisé unique</div>
<div style="margin: 15px 0; font-size: 14px; color: #1a73e8; font-weight: 500;">
En 3x sans frais : 166€/mois pendant 3 mois (avec Klarna)
</div>

<div style="margin: 20px 0;">
<div style="font-weight: 500; color: #1a73e8; margin-bottom: 10px;">🎯 Séances d'hypnothérapie garanties</div>
<div class="program-feature"><i class="ri-check-line"></i><span>3 séances + 1 offerte si nécessaire</span></div>
<div class="program-feature"><i class="ri-check-line"></i><span>Séances en présentiel (Paris 4ème) ou visioconférence</span></div>
<div class="program-feature"><i class="ri-check-line"></i><span>Planning flexible adapté à vos projets de voyage</span></div>
</div>

<div style="margin: 20px 0;">
<div style="font-weight: 500; color: #1a73e8; margin-bottom: 10px;">📚 Ressources personnalisées complètes</div>
<div class="program-feature"><i class="ri-check-line"></i><span>Livret PDF d'accompagnement enrichi avec conseils et exercices</span></div>
<div class="program-feature"><i class="ri-check-line"></i><span>Carnet de suivi personnalisé pour marquer votre progression</span></div>
<div class="program-feature"><i class="ri-check-line"></i><span>3 audios d'auto-hypnose spécialisés phobie avion</span></div>
</div>

<div style="margin: 20px 0;">
<div style="font-weight: 500; color: #1a73e8; margin-bottom: 10px;">📱 Suivi personnalisé révolutionnaire</div>
<div class="program-feature"><i class="ri-check-line"></i><span>Contact WhatsApp/SMS pour vos questions urgentes</span></div>
<div class="program-feature"><i class="ri-check-line"></i><span>Support réactif entre les séances</span></div>
<div class="program-feature"><i class="ri-check-line"></i><span>Programme de désensibilisation progressive</span></div>
</div>

<div style="margin: 20px 0;">
<div style="font-weight: 500; color: #1a73e8; margin-bottom: 10px;">✈️ Accompagnement jusqu'au vol réussi</div>
<div class="program-feature"><i class="ri-check-line"></i><span>Débriefing post-vol : consultation téléphonique (INCLUSE)</span></div>
<div class="program-feature"><i class="ri-check-line"></i><span>Contact d'urgence le jour J</span></div>
<div class="program-feature"><i class="ri-check-line"></i><span>Validation de votre guérison avec suivi résultats</span></div>
</div>

<div class="success-rate">Méthode éprouvée avec 95% de réussite</div>
</div>
</div>

<a href="https://buy.stripe.com/bJebJ0abH5Efabmcmk4ko0b" class="cta-button">${personalizedArguments?.cta || 'Libérez-vous maintenant'}</a>
<div class="payment-info">Paiement sécurisé • Possibilité 3x sans frais • 4ème séance offerte si nécessaire</div>

<div class="card">
<div class="card-title">
<i class="ri-map-pin-time-line"></i>
<h3>Vos prochaines étapes</h3>
</div>
<div class="contact-item"><i class="ri-phone-line"></i><span><a href="tel:+33649358089" style="color: #1a73e8; text-decoration: none;">06 49 35 80 89</a></span></div>
<div class="contact-item"><i class="ri-mail-line"></i><span>contact@novahypnose.fr</span></div>
<div class="contact-item"><i class="ri-map-pin-line"></i><span>16 Rue Saint Antoine, 75004 Paris</span></div>
<div class="contact-item"><i class="ri-time-line"></i><span>Du lundi au vendredi, 9h-19h</span></div>
</div>

<div class="footer">
<p>Alain Zenatti - Hypnothérapeute spécialisé dans le traitement de l'aérophobie</p>
<p>Vous recevez cet email suite à votre test en ligne sur peurdelavion.novahypnose.fr</p>
</div>
</div>
</body>
</html>
  `;
}
