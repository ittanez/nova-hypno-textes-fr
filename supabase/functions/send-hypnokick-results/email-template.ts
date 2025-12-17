import { getCategoryContent } from './content-generator.ts';

export function generateEmailContent(
  score: number,
  category: string,
  description: string,
  senseDominant: string,
  alainZenattiImageUrl: string,
  seanceHypnoseImageUrl: string
): string {
  const content = getCategoryContent(category);

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
      line-height: 1.6;
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
    .header-link {
      color: white;
      text-decoration: none;
      font-size: 14px;
      display: block;
      margin-bottom: 10px;
    }
    .header h1 {
      margin: 10px 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 16px;
      opacity: 0.95;
      line-height: 1.4;
    }
    .content {
      padding: 30px 20px;
    }
    .intro-text {
      color: #333;
      line-height: 1.6;
      margin: 0 0 25px 0;
      font-size: 15px;
    }
    .category-badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      text-align: center;
      margin: 25px 0;
      font-size: 20px;
      font-weight: 600;
    }
    .sense-badge {
      background-color: #f0f4ff;
      border-left: 4px solid #667eea;
      padding: 12px 15px;
      border-radius: 6px;
      margin: 20px 0;
      font-size: 15px;
      color: #333;
    }
    .description-text {
      color: #333;
      line-height: 1.8;
      margin: 20px 0;
      text-align: justify;
      font-size: 15px;
    }
    .exercise-section {
      margin: 25px 0;
    }
    .exercise-title {
      color: #667eea;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 10px 0;
    }
    .exercise-box {
      color: #333;
      line-height: 1.6;
      background-color: #f9fafb;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      font-size: 14px;
    }
    .superpower-section {
      background-color: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      margin: 25px 0;
    }
    .superpower-title {
      color: #667eea;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 10px 0;
    }
    .therapist-section {
      background-color: #ffffff;
      padding: 25px 20px;
      margin: 30px 0;
      border-top: 2px solid #f0f0f0;
    }
    .therapist-title {
      color: #667eea;
      margin: 0 0 15px 0;
      font-size: 18px;
      font-weight: 600;
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
      margin: 15px 0;
    }
    .image-section {
      text-align: center;
      padding: 20px;
      background-color: #ffffff;
    }
    .image-section img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
    .footer {
      background-color: #f5f5f5;
      color: #666;
      padding: 20px;
      text-align: center;
      font-size: 12px;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 20px 15px;
      }
      .header h1 {
        font-size: 24px;
      }
      .description-text {
        text-align: left;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <a href="https://novahypnose.fr" class="header-link">novahypnose.fr</a>
      <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" class="header-link">Prendre rendez-vous</a>
      <h1>HypnoKick</h1>
      <p>Félicitations ! Voici votre bilan hypnotique, découvrez votre pouvoir qui vous permet de manifester vos plus grands désirs</p>
    </div>

    <!-- Content -->
    <div class="content">
      <p class="intro-text">
        Merci d'avoir pris le temps de réaliser ce test ! C'est une première étape importante dans votre voyage vers la transformation personnelle.
      </p>

      <!-- Category Badge -->
      <div class="category-badge">
        ${category}
      </div>

      <!-- Sense Dominant -->
      <div class="sense-badge">
        <strong>Votre sens dominant : ${senseDominant}</strong>
      </div>

      <!-- Description with Conseils and Message Motivant -->
      <p class="description-text">
        ${content.description} <strong style="color: #667eea;">Conseils :</strong> ${content.conseils} <em style="color: #764ba2;">${content.messageMotivant}</em>
      </p>

      <!-- Exercise -->
      <div class="exercise-section">
        <div class="exercise-title">Éveillez votre potentiel dès maintenant :</div>
        <div class="exercise-box">
          ${content.exercice}
        </div>
      </div>

      <!-- Superpouvoir -->
      <div class="superpower-section">
        <div class="superpower-title">Votre superpouvoir hypnotique, un potentiel illimité qui grandit avec vous</div>
        <p style="color: #333; line-height: 1.6; margin: 0; font-size: 14px;">
          Votre capacité hypnotique n'est pas figée – elle fluctue selon votre état physique, émotionnel et votre environnement.
          Cette variabilité est une force! Elle signifie que vous pouvez développer ce potentiel avec de la pratique, comme un
          muscle qui se renforce. L'hypnose thérapeutique vous permet d'accéder à des ressources insoupçonnées et de créer des
          changements précis et durables dans votre vie, qu'il s'agisse de dépasser des peurs, renforcer votre confiance, ou
          transformer des habitudes. Chaque personne possède sa propre porte d'entrée vers ces états de conscience modifiés –
          découvrir la vôtre est le premier pas vers une vie plus alignée avec vos aspirations profondes.
        </p>
      </div>

      <!-- Therapist Section -->
      <div class="therapist-section">
        <div class="therapist-title">Votre hypnothérapeute à Paris Le Marais Bastille</div>
        <p style="color: #333; margin: 0 0 10px 0; font-size: 14px;">
          📍 Je suis <strong>Alain Zenatti</strong>, hypnothérapeute à Paris, spécialisé en hypnose ericksonienne et en auto-hypnose.
        </p>
        <p style="color: #333; margin: 0 0 10px 0; font-size: 14px;">
          Depuis plusieurs années, j'aide les personnes à retrouver confiance, équilibre et clarté intérieure grâce à des séances
          d'hypnose sur mesure, toujours bienveillantes et respectueuses du rythme de chacun.
        </p>
        <p style="color: #333; margin: 0 0 15px 0; font-size: 14px;">
          Si vous ressentez l'envie d'aller plus loin, d'approfondir votre réceptivité, ou tout simplement de vivre une première
          séance d'hypnose à Paris, je serai heureux de vous guider pas à pas dans ce chemin.
        </p>
        <p style="color: #333; font-weight: 600; margin: 0 0 8px 0; font-size: 15px;">Contactez votre hypnothérapeute à Paris :</p>
        <p style="color: #333; margin: 3px 0; font-size: 14px;">📩 contact@novahypnose.fr</p>
        <p style="color: #333; margin: 3px 0; font-size: 14px;">🌐 www.novahypnose.fr</p>
        <p style="color: #333; margin: 3px 0 15px 0; font-size: 14px;">📞 06 49 35 80 89</p>
        <div style="text-align: center;">
          <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" class="cta-button">
            Prendre rendez-vous
          </a>
        </div>
      </div>
    </div>

    <!-- Image Section - SEANCEHYPNOSE.webp -->
    <div class="image-section">
      <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">
        <img src="${seanceHypnoseImageUrl}" alt="Séance d'hypnose avec Alain Zenatti" style="cursor: pointer;" />
      </a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p style="margin: 5px 0;">
        <a href="https://novahypnose.fr/mentions-legales" style="color: #667eea; text-decoration: none;">Mentions légales</a> |
        <a href="https://novahypnose.fr/politique-confidentialite" style="color: #667eea; text-decoration: none;">Politique de confidentialité</a>
      </p>
      <p style="margin: 15px 0 5px 0;">
        ⚠️ Rappel important : L'hypnothérapie est une approche complémentaire qui ne remplace en aucun cas une consultation
        médicale ou un traitement prescrit par un professionnel de santé. En cas de problème de santé, consultez toujours
        votre médecin.
      </p>
      <p style="margin: 10px 0 0 0; opacity: 0.6;">
        Version: ${new Date().toISOString()} | Score: ${score}
      </p>
    </div>
  </div>
</body>
</html>`;
}
