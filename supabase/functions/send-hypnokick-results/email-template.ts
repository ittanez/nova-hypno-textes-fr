export function generateEmailContent(
  score: number,
  category: string,
  description: string,
  senseDominant: string,
  alainZenattiImageUrl: string,
  seanceHypnoseImageUrl: string
): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Votre bilan hypnotique</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px;
    }
    .score-badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      margin: 20px 0;
    }
    .score-badge h2 {
      margin: 0 0 5px 0;
      font-size: 28px;
    }
    .score-badge p {
      margin: 0;
      font-size: 18px;
      opacity: 0.9;
    }
    .section {
      margin: 25px 0;
    }
    .section h3 {
      color: #667eea;
      font-size: 18px;
      margin: 0 0 10px 0;
    }
    .section p {
      color: #333;
      line-height: 1.6;
      margin: 0;
    }
    .sense-badge {
      background-color: #f0f4ff;
      border-left: 4px solid #667eea;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .sense-badge strong {
      color: #667eea;
      font-size: 16px;
    }
    .cta-section {
      background-color: #f9fafb;
      padding: 25px 20px;
      text-align: center;
      border-radius: 12px;
      margin: 30px 0;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      padding: 14px 30px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 10px 0;
    }
    .image-section {
      text-align: center;
      padding: 30px 20px;
      background-color: #f9fafb;
    }
    .image-section img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .footer {
      background-color: #1a1a1a;
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
      font-size: 14px;
    }
    .footer p {
      margin: 5px 0;
      opacity: 0.8;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 20px 15px;
      }
      .header h1 {
        font-size: 20px;
      }
      .score-badge h2 {
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🎯 HypnoKick</h1>
      <p>Félicitations ! Voici votre bilan hypnotique, découvrez votre pouvoir qui vous permet de manifester vos plus grands désirs</p>
    </div>

    <!-- Content -->
    <div class="content">
      <p style="color: #666; line-height: 1.6;">
        Merci d'avoir pris le temps de réaliser ce test ! C'est une première étape importante dans votre voyage vers la transformation personnelle.
      </p>

      <!-- Score Badge -->
      <div class="score-badge">
        <h2>${category}</h2>
        <p>Score : ${score} / 120</p>
      </div>

      <!-- Sense Dominant -->
      <div class="sense-badge">
        <strong>Votre sens dominant : ${senseDominant}</strong>
      </div>

      <!-- Description -->
      <div class="section">
        <h3>📋 Analyse de votre profil</h3>
        <p>${description}</p>
      </div>

      <!-- Conseils -->
      <div class="section">
        <h3>💡 Conseils personnalisés</h3>
        <p>
          La régularité favorise la profondeur des états hypnotiques. Apprenez à reconnaître les signes subtils de la transe
          (ralentissement, chaleur, sensation de flottement…). Explorez différents styles d'induction : certains répondent mieux
          à l'imaginaire, d'autres au corps ou à l'émotion. L'alliance avec l'hypnothérapeute joue un rôle clé dans
          l'approfondissement de votre expérience.
        </p>
      </div>

      <!-- Exercise -->
      <div class="section">
        <h3>🧘 Éveillez votre potentiel dès maintenant</h3>
        <p>
          Fermez les yeux et imaginez un escalier de 5 marches. Descendez-les lentement en ressentant une détente de plus en
          plus profonde à chaque pas. Une fois en bas, imaginez une porte qui, une fois ouverte, vous mène à un lieu ressource
          personnel. Explorez ce lieu 2-3 minutes puis remontez l'escalier. Cet exercice simple vous permet déjà d'accéder à
          vos ressources intérieures.
        </p>
      </div>

      <!-- Superpouvoir -->
      <div class="section">
        <h3>✨ Votre superpouvoir hypnotique</h3>
        <p>
          Votre capacité hypnotique n'est pas figée – elle fluctue selon votre état physique, émotionnel et votre environnement.
          Cette variabilité est une force! Elle signifie que vous pouvez développer ce potentiel avec de la pratique, comme un
          muscle qui se renforce. L'hypnose thérapeutique vous permet d'accéder à des ressources insoupçonnées et de créer des
          changements précis et durables dans votre vie.
        </p>
      </div>

      <!-- CTA Section -->
      <div class="cta-section">
        <h3 style="color: #667eea; margin: 0 0 15px 0;">📍 Votre hypnothérapeute à Paris Le Marais Bastille</h3>
        <p style="color: #666; margin: 0 0 20px 0;">
          Je suis Alain Zenatti, hypnothérapeute à Paris, spécialisé en hypnose ericksonienne et en auto-hypnose.
          Si vous ressentez l'envie d'aller plus loin, je serai heureux de vous guider pas à pas dans ce chemin.
        </p>
        <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" class="cta-button">
          Prendre rendez-vous
        </a>
        <p style="color: #666; margin: 15px 0 0 0; font-size: 14px;">
          📩 contact@novahypnose.fr<br>
          📞 06 49 35 80 89<br>
          🌐 www.novahypnose.fr
        </p>
      </div>
    </div>

    <!-- Image Section -->
    <div class="image-section">
      <img src="${seanceHypnoseImageUrl}" alt="Séance d'hypnose" />
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>Alain Zenatti - Hypnothérapeute à Paris</strong></p>
      <p>16 rue St Antoine, 75004 Paris</p>
      <p style="margin-top: 15px; font-size: 12px;">
        <a href="https://novahypnose.fr">Mentions légales</a> |
        <a href="https://novahypnose.fr">Politique de confidentialité</a>
      </p>
      <p style="margin-top: 15px; font-size: 12px;">
        ⚠️ Rappel important : L'hypnothérapie est une approche complémentaire qui ne remplace en aucun cas une consultation
        médicale ou un traitement prescrit par un professionnel de santé. En cas de problème de santé, consultez toujours
        votre médecin.
      </p>
      <p style="margin-top: 15px; font-size: 11px; opacity: 0.6;">
        Version: ${new Date().toISOString()} | Score: ${score}
      </p>
    </div>
  </div>
</body>
</html>`;
}
