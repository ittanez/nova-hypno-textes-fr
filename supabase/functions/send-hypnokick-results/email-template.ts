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
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 20px 0;">

        <!-- Main Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; max-width: 600px;">

          <!-- Header -->
          <tr>
            <td style="padding: 30px 30px 20px 30px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 15px;">
                    <a href="https://novahypnose.fr" style="color: #3b82f6; text-decoration: none; font-size: 16px; margin-right: 15px;">novahypnose.fr</a>
                    <a href="https://calendly.com/zenatti/rdvtelephonique" style="background-color: #3b82f6; color: white; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-weight: 500; font-size: 16px; display: inline-block;">Prendre rendez-vous</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 24px; padding: 10px 0;">
                    <span style="color: #3b82f6;">Hypno</span><span style="color: #ef4444;">Kick</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Title -->
          <tr>
            <td style="padding: 0 30px;">
              <h1 style="font-size: 32px; font-weight: 700; color: #7c3aed; line-height: 1.3; margin: 20px 0; text-align: center;">Félicitations ! Voici votre bilan hypnotique, découvrez votre pouvoir qui vous permet de manifester vos plus grands désirs</h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td height="3" style="background: linear-gradient(to right, #3b82f6, #ef4444); line-height: 3px; font-size: 1px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro Text -->
          <tr>
            <td style="padding: 25px 30px;">
              <p style="color: #64748b; text-align: center; font-size: 16px; line-height: 1.6; margin: 0;">Merci d'avoir pris le temps de réaliser ce test ! C'est une première étape importante dans votre voyage vers la transformation personnelle.</p>
            </td>
          </tr>

          <!-- Category -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="color: #3b82f6; font-size: 28px; font-weight: 600; text-align: center; margin: 0;">${category}</h2>
            </td>
          </tr>

          <!-- Sense Dominant -->
          <tr>
            <td style="padding: 10px 30px 20px 30px;">
              <p style="text-align: center; font-size: 18px; color: #1e293b; margin: 0;">Votre sens dominant : <span style="color: #3b82f6; font-weight: 600;">${senseDominant}</span></p>
            </td>
          </tr>

          <!-- Description Block -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-left: 6px solid #3b82f6; background-color: #f8fafc; padding: 20px; font-size: 15px; line-height: 1.8; color: #1e293b;">
                    ${content.description} <strong>Conseils :</strong> ${content.conseils} <em>${content.messageMotivant}</em>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Exercise Section -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="background-color: #f3e8ff; padding: 25px; border-radius: 8px;">
                    <p style="font-size: 18px; font-weight: 600; color: #1e293b; margin: 0 0 15px 0;">Éveillez votre potentiel dès maintenant :</p>
                    <p style="font-size: 15px; line-height: 1.8; color: #1e293b; margin: 0;">${content.exercice}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Superpouvoir Section -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin: 0 0 15px 0;">Votre superpouvoir hypnotique, un potentiel illimité qui grandit avec vous</h2>
              <p style="font-size: 15px; line-height: 1.8; color: #475569; margin: 0;">Votre capacité hypnotique n'est pas figée – elle fluctue selon votre état physique, émotionnel et votre environnement. Cette variabilité est une force! Elle signifie que vous pouvez développer ce potentiel avec de la pratique, comme un muscle qui se renforce. L'hypnose thérapeutique vous permet d'accéder à des ressources insoupçonnées et de créer des changements précis et durables dans votre vie, qu'il s'agisse de dépasser des peurs, renforcer votre confiance, ou transformer des habitudes. Chaque personne possède sa propre porte d'entrée vers ces états de conscience modifiés – découvrir la vôtre est le premier pas vers une vie plus alignée avec vos aspirations profondes.</p>
            </td>
          </tr>

          <!-- Therapist Section -->
          <tr>
            <td style="padding: 20px 30px;">
              <h2 style="font-size: 22px; font-weight: 600; color: #374151; text-align: center; margin: 0 0 20px 0;">Votre hypnothérapeute à Paris Le Marais Bastille</h2>

              <p style="color: #475569; font-size: 16px; text-align: center; margin: 0 0 15px 0;">📍 Je suis Alain Zenatti, hypnothérapeute à Paris, spécialisé en hypnose ericksonienne et en auto-hypnose.</p>

              <p style="font-size: 15px; line-height: 1.8; color: #475569; margin: 0 0 15px 0; text-align: center;">Depuis plusieurs années, j'aide les personnes à retrouver confiance, équilibre et clarté intérieure grâce à des séances d'hypnose sur mesure, toujours bienveillantes et respectueuses du rythme de chacun.</p>

              <p style="font-size: 15px; line-height: 1.8; color: #475569; margin: 0 0 20px 0; text-align: center;">Si vous ressentez l'envie d'aller plus loin, d'approfondir votre réceptivité, ou tout simplement de vivre une première séance d'hypnose à Paris, je serai heureux de vous guider pas à pas dans ce chemin.</p>

              <p style="font-size: 18px; font-weight: 600; color: #1e293b; text-align: center; margin: 0 0 15px 0;">Contactez votre hypnothérapeute à Paris :</p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding: 5px 0;">
                    <span style="color: #ef4444; font-size: 18px;">📧</span>
                    <a href="mailto:contact@novahypnose.fr" style="color: #3b82f6; text-decoration: none; font-size: 16px; margin-left: 8px;">contact@novahypnose.fr</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 5px 0;">
                    <span style="color: #3b82f6; font-size: 18px;">🌐</span>
                    <a href="https://www.novahypnose.fr" style="color: #3b82f6; text-decoration: none; font-size: 16px; margin-left: 8px;">www.novahypnose.fr</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 5px 0;">
                    <span style="color: #6b7280; font-size: 18px;">📞</span>
                    <span style="color: #3b82f6; font-size: 16px; margin-left: 8px;">06 49 35 80 89</span>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding: 25px 0 0 0;">
                    <a href="https://calendly.com/zenatti/rdvtelephonique" style="background-color: #3b82f6; color: white; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: 500; font-size: 16px; display: inline-block;">Prendre rendez-vous</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Image Section -->
          <tr>
            <td style="padding: 20px 30px 30px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <a href="https://calendly.com/zenatti/rdvtelephonique">
                      <img src="${seanceHypnoseImageUrl}" alt="Séance d'hypnose avec Alain Zenatti" style="max-width: 100%; height: auto; display: block; border-radius: 8px;" width="540" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
