import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
const BREVO_LIST_ID = 8;

function getCategoryContent(category: string) {
  const contentMap: Record<string, { description: string; conseils: string; messageMotivant: string; exercice: string }> = {
    'Réceptivité émergente': {
      description: "Vous avez une certaine sensibilité à l'hypnose, mais vous pourriez rencontrer quelques résistances naturelles au début. Votre esprit analytique ou votre besoin de contrôle peuvent parfois freiner l'entrée en état hypnotique. Cependant, avec un accompagnement bienveillant et des techniques adaptées, vous pouvez progressivement développer votre réceptivité. Chacun possède cette capacité innée – certains ont simplement besoin d'un peu plus de temps et de pratique pour la révéler. Votre volonté de faire ce test montre déjà votre ouverture au changement.",
      conseils: "Commencez par des exercices courts de relaxation quotidienne pour vous familiariser avec les états modifiés de conscience. Ne forcez rien, laissez-vous simplement observer sans jugement. Privilégiez des séances d'hypnose avec un praticien expérimenté qui saura adapter son approche à votre profil. La pratique régulière est votre meilleure alliée – même 5 minutes par jour peuvent faire une différence significative. Soyez patient(e) avec vous-même.",
      messageMotivant: "Vous avez les clés. Il suffit maintenant d'ouvrir la bonne porte.",
      exercice: "Fermez les yeux et imaginez un escalier de 5 marches. Descendez-les lentement en ressentant une détente de plus en plus profonde à chaque pas. Une fois en bas, imaginez une porte qui, une fois ouverte, vous mène à un lieu ressource personnel. Explorez ce lieu 2-3 minutes puis remontez l'escalier. Cet exercice simple vous permet déjà d'accéder à vos ressources intérieures."
    },
    'Réceptivité modérée et adaptative': {
      description: "Vous avez une certaine sensibilité à l'état d'hypnose, surtout lorsque l'environnement est propice et que vous vous sentez en confiance. Vous entrez probablement déjà dans des états modifiés de conscience dans votre vie quotidienne : rêverie, absorption dans une musique, moment suspendu… Vous avez les prédispositions naturelles, mais vous pouvez encore développer votre réceptivité avec l'aide d'un accompagnement sur mesure.",
      conseils: "La régularité favorise la profondeur des états hypnotiques. Apprenez à reconnaître les signes subtils de la transe (ralentissement, chaleur, sensation de flottement…). Explorez différents styles d'induction : certains répondent mieux à l'imaginaire, d'autres au corps ou à l'émotion. L'alliance avec l'hypnothérapeute joue un rôle clé dans l'approfondissement de votre expérience.",
      messageMotivant: "Vous avez les clés. Il suffit maintenant d'ouvrir la bonne porte.",
      exercice: "Fermez les yeux et imaginez un escalier de 5 marches. Descendez-les lentement en ressentant une détente de plus en plus profonde à chaque pas. Une fois en bas, imaginez une porte qui, une fois ouverte, vous mène à un lieu ressource personnel. Explorez ce lieu 2-3 minutes puis remontez l'escalier. Cet exercice simple vous permet déjà d'accéder à vos ressources intérieures."
    },
    'Réceptivité naturelle et fluide': {
      description: "Vous êtes naturellement réceptif aux suggestions et aux inductions hypnotiques. Votre esprit entre facilement dans des états modifiés de conscience. Vous êtes probablement sensible aux images mentales, à la musique, à la voix, ou aux émotions. Vous vous laissez guider aisément et pouvez vivre des expériences riches dès les premières séances. Cela ne veut pas dire que tout est facile, mais que vous disposez déjà d'un bon contact avec votre monde intérieur.",
      conseils: "Expérimentez différentes approches (visualisation, réification, métaphores…). Apprenez à ancrer vos états de ressources pour les utiliser dans votre vie quotidienne. L'hypnose peut devenir pour vous un véritable outil de développement personnel, voire un art de vivre. Un accompagnement adapté peut vous aider à canaliser votre réceptivité vers des transformations concrètes.",
      messageMotivant: "Vous êtes comme un instrument déjà accordé. Il ne reste qu'à jouer la bonne musique.",
      exercice: "Fermez les yeux et portez attention à votre respiration. À chaque expiration, répétez mentalement un mot ressource (paix, calme, confiance...). Après 1 minute, imaginez ce mot prenant forme, couleur, texture dans votre corps. Ressentez les effets de cette ressource se diffuser. Cette technique vous permet d'activer directement vos ressources intérieures pour transformer votre quotidien."
    },
    'Réceptivité très élevée': {
      description: "Vous possédez une réceptivité exceptionnelle à l'hypnose. Vous entrez très facilement dans des états profonds de conscience modifiée. Votre imagination est vivace, vos ressentis sont intenses, et vous vous laissez guider avec une grande fluidité. Vous êtes probablement capable de vivre des phénomènes hypnotiques remarquables (catalepsie, anesthésie, régression, etc.). Cette sensibilité naturelle fait de vous un sujet d'hypnose idéal. Vous pouvez atteindre des niveaux de transe qui permettent des transformations profondes et rapides.",
      conseils: "Explorez l'auto-hypnose pour développer votre autonomie – vous avez toutes les ressources nécessaires. Apprenez à doser l'intensité de vos transes selon vos besoins. Travaillez avec un praticien qui saura utiliser votre réceptivité de manière créative et thérapeutique. Vous pouvez également vous former à l'hypnose pour aider les autres. Votre don naturel mérite d'être cultivé avec conscience et précision.",
      messageMotivant: "Vous êtes comme un virtuose de l'hypnose. Votre instrument est rare et précieux.",
      exercice: "Fermez les yeux et laissez votre inconscient choisir un lieu, un souvenir, ou une sensation de bien-être. Laissez cette expérience se développer d'elle-même, sans contrôle. Observez les couleurs, les sons, les sensations qui émergent naturellement. Après quelques minutes, ancrez cet état en touchant votre poignet. Cette technique vous permet d'accéder instantanément à vos ressources les plus profondes, n'importe quand."
    }
  };
  return contentMap[category] || contentMap['Réceptivité modérée et adaptative'];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const responseHeaders = { ...corsHeaders, 'Content-Type': 'application/json' };

    const { email, firstName, score, category, senseDominant, localisation } = await req.json();
    console.log('Request received:', JSON.stringify({ email, firstName, score, category, senseDominant, localisation }));

    if (!email) throw new Error('Email is required');
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY non configurée');

    const content = getCategoryContent(category);
    console.log('Content generated for category:', category);

    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
      body: JSON.stringify({
        email,
        attributes: {
          PRENOM: firstName,
          HYPNOKICK_SCORE: score,
          HYPNOKICK_CATEGORIE: category,
          HYPNOKICK_SENS_DOMINANT: senseDominant,
          LOCALISATION: localisation,
          HYPNOKICK_DESCRIPTION: content.description,
          HYPNOKICK_CONSEILS: content.conseils,
          HYPNOKICK_MESSAGE_MOTIVANT: content.messageMotivant,
          HYPNOKICK_EXERCICE: content.exercice,
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    // Lire en texte brut d'abord pour éviter l'erreur sur body vide (ex: 204)
    const contactText = await contactRes.text();
    console.log('Brevo raw response:', contactText, 'Status:', contactRes.status);
    const contactData = contactText ? JSON.parse(contactText) : {};

    if (!contactRes.ok && contactData.code !== 'duplicate_parameter') {
      throw new Error(`Brevo contact error: ${contactData.message}`);
    }

    return new Response(
      JSON.stringify({ status: 'success', message: 'Contact ajouté, automation déclenchée' }),
      { status: 200, headers: responseHeaders }
    );

  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ status: 'error', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});
