import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { questionnaireId, email, formData, bilan } = await req.json();

    // Debug logging
    console.log('Email function called with:', {
      questionnaireId,
      email,
      hasFormData: !!formData,
      formDataKeys: formData ? Object.keys(formData) : [],
      hasBilan: !!bilan
    });

    // Créer le client Supabase admin
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Récupérer les détails du questionnaire
    const { data: questionnaire, error: fetchError } = await supabase
      .from('questionnaire_avion_pre_accompagnement')
      .select('*')
      .eq('id', questionnaireId)
      .single();

    if (fetchError) {
      throw new Error(`Erreur récupération questionnaire: ${fetchError.message}`);
    }

    // Préparer le contenu de l'email
    const emailSubject = `Nouveau Questionnaire Peur de l'Avion - ${formData.prenom} ${formData.nom}`;

    // Analyse automatique des réponses pour le récapitulatif praticien
    const analyseAutomatique = (data) => {
      const profils = [];
      const techniques = [];
      let pronostic = '';
      let nbSeances = '';

      // Analyse du profil principal
      if (data.traumatisme_direct?.length > 0) {
        profils.push('Traumatisme Direct (vol difficile vécu)');
      }
      if (data.traumatisme_indirect?.length > 0) {
        profils.push('Traumatisme Indirect (médias, récits)');
      }
      if (data.peur_transmise?.length > 0) {
        profils.push('Peur Transmise (famille, entourage)');
      }
      if (data.peur_progressive?.length > 0) {
        profils.push('Peur Progressive (développement graduel)');
      }
      if (data.aspects_physiques?.includes('Claustrophobie (espace confiné)')) {
        profils.push('Claustrophobie Associée (espace confiné)');
      }
      if (data.aspects_physiques?.includes('Vertige/peur du vide')) {
        profils.push('Peur du Vide/Hauteur (acrophobie)');
      }
      if (data.aspects_psychologiques?.includes('Perte de contrôle')) {
        profils.push('Peur de Perte de Contrôle (besoin maîtrise)');
      }
      if (data.troubles_anxieux?.includes('Anxiété généralisée') || data.niveau_stress_general >= 7) {
        profils.push('Anxiété Généralisée (anxiété globale)');
      }

      // Techniques recommandées basées sur l'analyse
      if (data.receptivite_hypnose === 'Très réceptif' || data.pratique_hypnose?.includes('hypnose')) {
        techniques.push('Technique Ernest Rossi (accord inconscient)');
      }
      if (profils.some(p => p.includes('Traumatisme'))) {
        techniques.push('EMDR adapté');
      }
      if (data.aspects_psychologiques?.includes('Anticipation catastrophique')) {
        techniques.push('Recadrage cognitif spécifique');
      }
      if (data.peur_decollage > 7 || data.peur_turbulences > 7) {
        techniques.push('Technique "Mille-feuille" (confrontation progressive)');
      }
      techniques.push('Libération croyances négatives');
      techniques.push('Dissociation/Futurisation');

      // Pronostic basé sur motivation, croyance et complexité
      const motivation = data.motivation_niveau || 0;
      const croyance = data.croyance_changement || 0;
      const complexite = profils.length + (data.autres_phobies?.length || 0);

      if (motivation >= 8 && croyance >= 8 && complexite <= 2) {
        pronostic = 'Excellent (transformation rapide attendue)';
        nbSeances = '2-3 séances';
      } else if (motivation >= 6 && croyance >= 6 && complexite <= 4) {
        pronostic = 'Bon (évolution favorable prévue)';
        nbSeances = '3-4 séances';
      } else if (motivation >= 4 && complexite <= 6) {
        pronostic = 'Modéré (travail approfondi nécessaire)';
        nbSeances = '3-4 séances';
      } else {
        pronostic = 'Complexe (approche spécialisée requise)';
        nbSeances = '4+ séances (cas complexe)';
      }

      // Axes thérapeutiques basés sur l'analyse
      const axes = [];
      if (profils.includes('Traumatisme Direct')) {
        axes.push('Traitement du traumatisme en priorité');
      }
      if (data.aspects_psychologiques?.includes('Perte de contrôle')) {
        axes.push('Restitution du sentiment de contrôle et sécurité');
      }
      if (data.intensite_symptomes === 'intenses') {
        axes.push('Gestion des symptômes physiques et régulation émotionnelle');
      }
      if (!axes.length) {
        axes.push('Désensibilisation progressive et renforcement de la confiance');
      }

      return { profils, techniques, pronostic, nbSeances, axes };
    };

    const analyse = analyseAutomatique(formData);
    console.log('Analyse automatique:', analyse);

    const emailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px;">📋 Questionnaire Peur de l'Avion</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Évaluation Complète de la Peur de l'Avion</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">NovaHypnose - ${new Date().toLocaleDateString('fr-FR')}</p>
          </div>

          <div style="background: #f8f9ff; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">👤 INFORMATIONS DU PATIENT</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
              <p><strong>Nom :</strong> ${formData.nom || 'Non renseigné'}</p>
              <p><strong>Prénom :</strong> ${formData.prenom || 'Non renseigné'}</p>
              <p><strong>Âge :</strong> ${formData.age || 'Non renseigné'}</p>
              <p><strong>Profession :</strong> ${formData.profession || 'Non renseignée'}</p>
              <p><strong>Email :</strong> ${formData.email}</p>
              <p><strong>Téléphone :</strong> ${formData.telephone || 'Non renseigné'}</p>
            </div>
          </div>

          <div style="background: #fff5f5; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 30px;">
            <h2 style="color: #dc2626; margin-top: 0;">🎯 BILAN AUTOMATIQUE GÉNÉRÉ</h2>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #7c2d12;">PROFIL PRINCIPAL IDENTIFIÉ :</h3>
              <p style="background: white; padding: 10px; border-radius: 5px; border: 1px solid #fed7d7;">
                ${bilan?.profil_principal || analyse.profils.join(', ') || 'À analyser manuellement'}
              </p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #7c2d12;">TECHNIQUES RECOMMANDÉES :</h3>
              <ul style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #fed7d7;">
                ${(bilan?.techniques_recommandees || analyse.techniques).map(tech => `<li>${tech}</li>`).join('')}
              </ul>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #7c2d12;">PRONOSTIC :</h3>
              <p style="background: white; padding: 10px; border-radius: 5px; border: 1px solid #fed7d7; font-weight: bold;">
                ${bilan?.pronostic || analyse.pronostic}
              </p>
            </div>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #0369a1; border-bottom: 2px solid #0369a1; padding-bottom: 10px;">📊 ÉVALUATION DE LA PEUR</h2>
            <p style="margin-bottom: 15px;"><strong>Niveau de motivation :</strong> ${formData.motivation_niveau || 'Non renseigné'}/10</p>

            <h3 style="color: #0369a1;">Niveaux d'anxiété par situation (0-10) :</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
              <p>Réserver un billet : ${formData.peur_reserver || 0}/10</p>
              <p>Voir un avion (photo) : ${formData.peur_voir_photo || 0}/10</p>
              <p>Voir un avion réel : ${formData.peur_voir_reel || 0}/10</p>
              <p>Aller à l'aéroport : ${formData.peur_aeroport || 0}/10</p>
              <p>Entendre "avion" : ${formData.peur_mot_avion || 0}/10</p>
              <p>Embarquer : ${formData.peur_embarquer || 0}/10</p>
              <p>Fermeture portes : ${formData.peur_fermeture_portes || 0}/10</p>
              <p>Roulage : ${formData.peur_roulage || 0}/10</p>
              <p>Décollage : ${formData.peur_decollage || 0}/10</p>
              <p>Vol en altitude : ${formData.peur_altitude || 0}/10</p>
              <p>Turbulences : ${formData.peur_turbulences || 0}/10</p>
              <p>Atterrissage : ${formData.peur_atterrissage || 0}/10</p>
            </div>
          </div>

          <div style="background: #fefce8; border: 1px solid #eab308; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #a16207;">⚡ ACTIONS À PRENDRE</h2>
            <ol style="color: #713f12;">
              <li><strong>Contacter le patient</strong> dans les 24h pour programmer un entretien</li>
              <li><strong>Réviser</strong> le questionnaire complet en détail</li>
              <li><strong>Valider</strong> le bilan automatique et l'adapter si nécessaire</li>
              <li><strong>Préparer</strong> la stratégie thérapeutique personnalisée</li>
            </ol>
          </div>

          <div style="text-align: center; margin-top: 40px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
            <p style="margin: 0; font-size: 14px;">
              💙 <strong>NovaHypnose</strong> - Alain Zenatti<br>
              Transformation et libération par l'hypnose thérapeutique
            </p>
          </div>
        </body>
      </html>
    `;

    // Envoyer l'email via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not found');
    }

    // 1. Envoyer email au praticien avec analyse détaillée
    const emailToPraticien = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Nova Hypnose <contact@updates.novahypnose.fr>',
        to: ['a.zenatti@gmail.com'],
        subject: emailSubject,
        html: emailHtml
      })
    });

    if (!emailToPraticien.ok) {
      const errorData = await emailToPraticien.text();
      throw new Error(`Erreur envoi email praticien: ${emailToPraticien.status} - ${errorData}`);
    }

    const praticienResult = await emailToPraticien.json();

    // 2. Envoyer email au client avec ses résultats
    const calculatePercentage = () => {
      const scores = [
        formData.peur_reserver || 0,
        formData.peur_voir_photo || 0,
        formData.peur_voir_reel || 0,
        formData.peur_aeroport || 0,
        formData.peur_mot_avion || 0,
        formData.peur_embarquer || 0,
        formData.peur_fermeture_portes || 0,
        formData.peur_roulage || 0,
        formData.peur_decollage || 0,
        formData.peur_altitude || 0,
        formData.peur_turbulences || 0,
        formData.peur_atterrissage || 0
      ];
      const total = scores.reduce((sum, score) => sum + score, 0);
      const maxScore = 120; // 12 questions × 10
      return Math.round((total / maxScore) * 100);
    };

    const percentage = calculatePercentage();
    const getFearLevel = (pct) => {
      if (pct <= 20) return 'Peur légère';
      if (pct <= 40) return 'Peur modérée';
      if (pct <= 60) return 'Peur importante';
      if (pct <= 80) return 'Peur intense';
      return 'Peur très intense';
    };

    const fearLevel = getFearLevel(percentage);

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
            .cta { background: #0369A1; color: white; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
            .cta a { color: white; text-decoration: none; font-weight: bold; }
            .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Vos résultats personnalisés</h1>
              <p>Questionnaire Peur de l'Avion - NovaHypnose</p>
            </div>

            <div class="content">
              <p>Bonjour ${formData.prenom},</p>

              <p>Merci d'avoir pris le temps de compléter notre questionnaire détaillé sur la peur de l'avion. Voici votre profil personnalisé :</p>

              <div class="result-box">
                <h3>Votre profil</h3>
                <div class="score">Niveau d'anxiété : ${percentage}%</div>
                <p><strong>Profil identifié :</strong> ${fearLevel}</p>
                <p><strong>Pronostic :</strong> ${analyse.pronostic}</p>
                <p><strong>Nombre de séances estimé :</strong> ${analyse.nbSeances}</p>
              </div>

              <div class="cta">
                <h3>Programme "Liberté Aérienne"</h3>
                <p>Basé sur votre profil, notre programme d'hypnothérapie peut vous aider à surmonter définitivement votre peur de l'avion.</p>
                <p><strong>95% de réussite • ${analyse.nbSeances} • Garantie satisfait</strong></p>
                <a href="https://novahypnose.fr/peur-avion-maquette#programmes" style="background: white; color: #0369A1; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 10px;">Découvrir le programme 497€</a>
              </div>

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

    const clientEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NovaHypnose <contact@updates.novahypnose.fr>',
        to: [formData.email],
        subject: `${formData.prenom}, vos résultats du questionnaire peur de l'avion`,
        html: clientEmailHtml
      })
    });

    if (!clientEmailResponse.ok) {
      console.error('Erreur envoi email client, mais email praticien envoyé');
    }

    const clientResult = await clientEmailResponse.json();

    return new Response(JSON.stringify({
      success: true,
      message: 'Emails envoyés avec succès',
      praticienEmailId: praticienResult.id,
      clientEmailId: clientResult.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Erreur dans send-questionnaire-peur-avion:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
