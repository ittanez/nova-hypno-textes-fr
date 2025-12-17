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
      max-width: 1000px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 40px 60px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header-top {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
    }
    .header-link {
      color: #3b82f6;
      text-decoration: none;
      font-size: 16px;
    }
    .cta-button {
      display: inline-block;
      background-color: #3b82f6;
      color: white;
      text-decoration: none;
      padding: 10px 24px;
      border-radius: 6px;
      font-weight: 500;
      font-size: 16px;
    }
    .logo {
      font-size: 24px;
      margin: 20px 0;
    }
    .logo-hypno {
      color: #3b82f6;
    }
    .logo-kick {
      color: #ef4444;
    }
    .main-title {
      font-size: 36px;
      font-weight: 700;
      color: #1e293b;
      line-height: 1.3;
      margin: 30px 0;
      text-align: center;
    }
    .divider {
      height: 3px;
      background: linear-gradient(to right, #3b82f6, #ef4444);
      margin: 30px auto;
      max-width: 800px;
    }
    .intro-text {
      color: #64748b;
      text-align: center;
      font-size: 16px;
      margin: 30px 0;
    }
    .category-title {
      color: #3b82f6;
      font-size: 32px;
      font-weight: 600;
      text-align: center;
      margin: 40px 0 30px 0;
    }
    .sense-line {
      text-align: center;
      font-size: 18px;
      color: #1e293b;
      margin: 20px 0 30px 0;
    }
    .sense-dominant {
      color: #3b82f6;
      font-weight: 600;
    }
    .description-block {
      border-left: 6px solid #3b82f6;
      background-color: #f8fafc;
      padding: 25px 30px;
      margin: 30px 0;
      font-size: 15px;
      line-height: 1.8;
      color: #1e293b;
      text-align: justify;
    }
    .exercise-section {
      background-color: #f3e8ff;
      padding: 30px;
      border-radius: 8px;
      margin: 30px 0;
    }
    .exercise-title {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 15px 0;
    }
    .exercise-text {
      font-size: 15px;
      line-height: 1.8;
      color: #1e293b;
    }
    .superpower-section {
      background-color: #f1f5f9;
      padding: 30px;
      border-radius: 8px;
      margin: 30px 0;
    }
    .superpower-title {
      font-size: 20px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 15px 0;
      text-align: center;
    }
    .superpower-text {
      font-size: 15px;
      line-height: 1.8;
      color: #475569;
      text-align: justify;
    }
    .therapist-section {
      margin: 40px 0;
      text-align: center;
    }
    .therapist-title {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 20px 0;
    }
    .therapist-intro {
      color: #ef4444;
      font-size: 16px;
      margin: 0 0 15px 0;
    }
    .therapist-text {
      font-size: 15px;
      line-height: 1.8;
      color: #475569;
      margin: 0 0 15px 0;
      text-align: justify;
    }
    .contact-title {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin: 30px 0 15px 0;
    }
    .contact-item {
      font-size: 16px;
      margin: 8px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .contact-icon-email {
      color: #ef4444;
      font-size: 18px;
    }
    .contact-icon-web {
      color: #3b82f6;
      font-size: 18px;
    }
    .contact-icon-phone {
      color: #ec4899;
      font-size: 18px;
    }
    .contact-link {
      color: #3b82f6;
      text-decoration: none;
    }
    .cta-center {
      text-align: center;
      margin: 30px 0;
    }
    .image-section {
      text-align: center;
      margin: 40px 0;
    }
    .image-section img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
    @media only screen and (max-width: 600px) {
      .container {
        padding: 20px 15px;
      }
      .main-title {
        font-size: 28px;
      }
      .category-title {
        font-size: 24px;
      }
      .description-block {
        text-align: left;
      }
      .therapist-text {
        text-align: left;
      }
      .superpower-text {
        text-align: left;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-top">
        <a href="https://novahypnose.fr" class="header-link">novahypnose.fr</a>
        <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" class="cta-button">Prendre rendez-vous</a>
      </div>
      <div class="logo">
        <span class="logo-hypno">Hypno</span><span class="logo-kick">Kick</span>
      </div>
    </div>

    <!-- Main Title -->
    <h1 class="main-title">Félicitations ! Voici votre bilan hypnotique, découvrez votre pouvoir qui vous permet de manifester vos plus grands désirs</h1>

    <div class="divider"></div>

    <!-- Intro -->
    <p class="intro-text">
      Merci d'avoir pris le temps de réaliser ce test ! C'est une première étape importante dans votre voyage vers la transformation personnelle.
    </p>

    <!-- Category -->
    <h2 class="category-title">${category}</h2>

    <!-- Sense Dominant -->
    <p class="sense-line">
      Votre sens dominant : <span class="sense-dominant">${senseDominant}</span>
    </p>

    <!-- Description with Blue Bar -->
    <div class="description-block">
      ${content.description} <strong>Conseils :</strong> ${content.conseils} <em>${content.messageMotivant}</em>
    </div>

    <!-- Exercise Section -->
    <div class="exercise-section">
      <div class="exercise-title">Éveillez votre potentiel dès maintenant :</div>
      <div class="exercise-text">
        ${content.exercice}
      </div>
    </div>

    <!-- Superpouvoir Section -->
    <div class="superpower-section">
      <div class="superpower-title">Votre superpouvoir hypnotique, un potentiel illimité qui grandit avec vous</div>
      <div class="superpower-text">
        Votre capacité hypnotique n'est pas figée – elle fluctue selon votre état physique, émotionnel et votre environnement. Cette variabilité est une force! Elle signifie que vous pouvez développer ce potentiel avec de la pratique, comme un muscle qui se renforce. L'hypnose thérapeutique vous permet d'accéder à des ressources insoupçonnées et de créer des changements précis et durables dans votre vie, qu'il s'agisse de dépasser des peurs, renforcer votre confiance, ou transformer des habitudes. Chaque personne possède sa propre porte d'entrée vers ces états de conscience modifiés – découvrir la vôtre est le premier pas vers une vie plus alignée avec vos aspirations profondes.
      </div>
    </div>

    <!-- Therapist Section -->
    <div class="therapist-section">
      <h2 class="therapist-title">Votre hypnothérapeute à Paris Le Marais Bastille</h2>

      <p class="therapist-intro">
        📍 Je suis Alain Zenatti, hypnothérapeute à Paris, spécialisé en hypnose ericksonienne et en auto-hypnose.
      </p>

      <p class="therapist-text">
        Depuis plusieurs années, j'aide les personnes à retrouver confiance, équilibre et clarté intérieure grâce à des séances d'hypnose sur mesure, toujours bienveillantes et respectueuses du rythme de chacun.
      </p>

      <p class="therapist-text">
        Si vous ressentez l'envie d'aller plus loin, d'approfondir votre réceptivité, ou tout simplement de vivre une première séance d'hypnose à Paris, je serai heureux de vous guider pas à pas dans ce chemin.
      </p>

      <div class="contact-title">Contactez votre hypnothérapeute à Paris :</div>

      <div class="contact-item">
        <span class="contact-icon-email">📧</span>
        <a href="mailto:contact@novahypnose.fr" class="contact-link">contact@novahypnose.fr</a>
      </div>

      <div class="contact-item">
        <span class="contact-icon-web">🌐</span>
        <a href="https://www.novahypnose.fr" class="contact-link">www.novahypnose.fr</a>
      </div>

      <div class="contact-item">
        <span class="contact-icon-phone">📞</span>
        <span style="color: #3b82f6;">06 49 35 80 89</span>
      </div>

      <div class="cta-center">
        <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" class="cta-button">Prendre rendez-vous</a>
      </div>
    </div>

    <!-- Image Section -->
    <div class="image-section">
      <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">
        <img src="${seanceHypnoseImageUrl}" alt="Séance d'hypnose avec Alain Zenatti" style="cursor: pointer;" />
      </a>
    </div>
  </div>
</body>
</html>`;
}
