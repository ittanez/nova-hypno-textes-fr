/**
 * Script d'injection des FAQ dans les articles de blog (Supabase)
 *
 * Usage : node scripts/inject-blog-faq.js
 *
 * Ce script :
 * 1. Se connecte à Supabase
 * 2. Récupère tous les articles publiés
 * 3. Génère des FAQ contextuelles basées sur le slug/titre/catégorie
 * 4. Met à jour chaque article avec ses FAQ
 *
 * Prérequis : colonne `faq` de type JSONB dans la table `articles`
 * ALTER TABLE articles ADD COLUMN faq JSONB DEFAULT '[]'::jsonb;
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY requises dans .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ═══════════════════════════════════════════════════════════════════════
// FAQ PRÉ-ÉCRITES PAR SLUG
// Pour ajouter des FAQ à un nouvel article, ajoutez une entrée ici.
// ═══════════════════════════════════════════════════════════════════════

const FAQ_BY_SLUG = {
  // ─── Peur du vide / Acrophobie ─────────────────────────────────────
  'peur-du-vide': [
    {
      question: "L'hypnose peut-elle vraiment guérir la peur du vide (acrophobie) ?",
      answer: "Oui, l'hypnose ericksonienne est l'une des approches les plus efficaces pour traiter l'acrophobie. Elle agit directement sur le programme inconscient qui déclenche la réaction de panique face au vide. En 2 à 4 séances, la plupart des patients retrouvent la capacité de se trouver en hauteur sans être submergés par la peur. Le changement est durable car l'hypnose modifie la réponse automatique elle-même, pas seulement le comportement de surface."
    },
    {
      question: "Comment se déroule une séance d'hypnose pour traiter la peur du vide ?",
      answer: "La séance commence par un entretien pour comprendre l'origine et les déclencheurs de votre peur du vide. Ensuite, en état d'hypnose, je vous guide à travers des techniques dissociatives qui permettent à votre inconscient de reprogrammer sa réaction face au vide. Vous n'êtes jamais exposé à une situation réelle de hauteur pendant la séance. Le travail se fait dans un cadre sécurisant et confortable, à votre rythme."
    },
    {
      question: "Faut-il connaître l'origine de sa peur du vide pour que l'hypnose fonctionne ?",
      answer: "Non, il n'est pas nécessaire de connaître l'événement déclencheur. L'hypnose ericksonienne travaille avec votre inconscient qui, lui, connaît l'origine de la peur. Parfois la cause remonte à l'enfance et a été oubliée par le conscient. L'hypnose peut identifier et traiter cette racine sans que vous ayez besoin de la revivre consciemment."
    },
    {
      question: "La peur du vide et le vertige sont-ils la même chose ?",
      answer: "Non, ce sont deux phénomènes distincts. Le vertige est un trouble de l'équilibre d'origine physiologique (oreille interne), tandis que la peur du vide (acrophobie) est une réaction émotionnelle intense face aux hauteurs. L'hypnose est efficace sur l'acrophobie, qui est un mécanisme psychologique. Si vous souffrez de vertiges d'origine médicale, consultez d'abord un ORL."
    },
    {
      question: "Combien de séances d'hypnose faut-il pour surmonter la peur du vide ?",
      answer: "En général, 2 à 4 séances suffisent pour traiter une peur du vide. La première séance apporte souvent un soulagement notable. Le nombre exact dépend de l'intensité de votre phobie, de son ancienneté et de votre réceptivité à l'hypnose. Lors de la première consultation au cabinet de Paris 4ème, nous définissons ensemble un plan d'accompagnement adapté."
    }
  ],

  // ─── Sommeil / Rêves / Nuits ───────────────────────────────────────
  'nuits-magiques': [
    {
      question: "L'hypnose peut-elle améliorer la qualité des rêves ?",
      answer: "Oui, l'hypnose influence profondément la qualité du sommeil et, par extension, l'activité onirique. En travaillant sur les mécanismes de relaxation profonde et en réduisant l'anxiété qui perturbe le sommeil, l'hypnose favorise un sommeil plus profond et des phases de sommeil paradoxal plus complètes — la phase où se produisent les rêves les plus vivides et réparateurs."
    },
    {
      question: "Comment l'hypnose aide-t-elle à mieux dormir ?",
      answer: "L'hypnose agit sur les causes profondes des troubles du sommeil : anxiété, hyperactivité mentale, associations négatives avec le coucher. En reprogrammant ces mécanismes inconscients, elle restaure votre capacité naturelle à vous endormir et à maintenir un sommeil profond. Je vous enseigne aussi des techniques d'auto-hypnose que vous pouvez utiliser chaque soir pour faciliter l'endormissement."
    },
    {
      question: "Peut-on utiliser l'hypnose pour arrêter les cauchemars récurrents ?",
      answer: "Absolument. Les cauchemars récurrents sont souvent liés à des émotions non traitées, du stress ou des traumatismes. L'hypnose permet de retraiter ces contenus émotionnels et de reprogrammer l'activité onirique. En travaillant avec votre inconscient, nous pouvons transformer les scénarios de cauchemars en rêves neutres ou positifs. La plupart des patients constatent une réduction significative des cauchemars en 2 à 3 séances."
    },
    {
      question: "Quelle est la relation entre l'hypnose et le sommeil profond ?",
      answer: "L'état d'hypnose et le sommeil partagent certaines caractéristiques neurologiques, mais sont des états distincts. L'hypnose induit un état de relaxation profonde similaire aux phases d'endormissement, ce qui explique son efficacité pour traiter l'insomnie. En séance, votre cerveau apprend (ou réapprend) à entrer naturellement dans les phases de sommeil profond, celles qui sont les plus réparatrices pour le corps et l'esprit."
    },
    {
      question: "L'auto-hypnose du soir peut-elle remplacer un somnifère ?",
      answer: "L'auto-hypnose est une excellente alternative naturelle aux somnifères. La technique que je transmets en séance induit un état de relaxation profonde qui facilite la transition vers le sommeil, sans aucune dépendance ni effet secondaire. Cependant, l'arrêt d'un traitement médicamenteux doit toujours se faire progressivement et en accord avec votre médecin. L'auto-hypnose prend le relais naturellement au fur et à mesure du sevrage."
    }
  ],

  // ─── Estime de soi ─────────────────────────────────────────────────
  'estime-de-soi': [
    {
      question: "Quelle est la différence entre estime de soi et confiance en soi ?",
      answer: "L'estime de soi est la valeur que vous vous accordez en tant que personne — c'est le sentiment profond de mériter d'être aimé et respecté. La confiance en soi est la croyance en vos capacités à accomplir des tâches et atteindre des objectifs. Les deux sont liées, mais on peut avoir confiance dans ses compétences professionnelles tout en ayant une estime de soi fragile. L'hypnose travaille sur les deux dimensions pour un résultat complet et durable."
    },
    {
      question: "Comment l'hypnose peut-elle améliorer l'estime de soi ?",
      answer: "L'estime de soi se construit dans l'inconscient, à travers les expériences de vie — particulièrement celles de l'enfance. L'hypnose ericksonienne accède directement à ces croyances profondes (« je ne suis pas assez bien », « je ne mérite pas ») pour les transformer. En état d'hypnose, votre inconscient intègre une image de soi plus positive et réaliste. Ce n'est pas de la suggestion superficielle : c'est une reprogrammation profonde qui modifie durablement votre rapport à vous-même."
    },
    {
      question: "Les résultats de l'hypnose sur l'estime de soi sont-ils durables ?",
      answer: "Oui, car l'hypnose modifie les croyances à leur racine, pas seulement les comportements. Contrairement aux affirmations positives qui superposent une couche de positivité sur des croyances négatives intactes, l'hypnose transforme les fondations elles-mêmes. Les résultats sont durables et s'amplifient même avec le temps : une meilleure estime de soi génère des expériences positives qui renforcent encore cette nouvelle image de soi."
    },
    {
      question: "Combien de séances d'hypnose pour améliorer son estime de soi ?",
      answer: "En moyenne, 3 à 5 séances permettent une transformation significative de l'estime de soi. La première séance identifie les croyances limitantes et leurs origines, et initie le processus de changement. Les séances suivantes consolident et approfondissent le travail. L'estime de soi touchant souvent à des couches profondes de l'identité, un accompagnement de 4 à 5 séances est recommandé pour un résultat complet."
    },
    {
      question: "L'hypnose peut-elle aider une personne qui se dévalorise constamment ?",
      answer: "Oui, l'autodévalorisation est l'une des problématiques les mieux traitées par l'hypnose. Ce comportement est un automatisme inconscient — un programme installé souvent dans l'enfance par des remarques, des comparaisons ou des expériences d'échec. L'hypnose identifie ces programmations et les remplace par une perception plus juste de votre valeur. Mes patients sont souvent surpris de constater qu'après quelques séances, la petite voix critique intérieure s'est naturellement apaisée."
    }
  ],

  // ─── Peur de l'avion ───────────────────────────────────────────────
  'hypnose-peur-avion-solution-efficace-3-seances': [
    {
      question: "L'hypnose est-elle vraiment efficace pour la peur de l'avion ?",
      answer: "Oui, la peur de l'avion (aérophobie) est l'une des phobies les plus fréquemment et les plus efficacement traitées par l'hypnose. Le taux de réussite est élevé : la grande majorité des patients reprennent l'avion sereinement après 2 à 3 séances. L'hypnose agit sur le mécanisme inconscient de peur plutôt que sur la volonté, ce qui explique son efficacité là où la raison seule échoue."
    },
    {
      question: "Combien de séances faut-il pour ne plus avoir peur en avion ?",
      answer: "En moyenne, 2 à 3 séances d'hypnose suffisent pour traiter la peur de l'avion. La première séance identifie l'origine de votre peur (turbulences, perte de contrôle, claustrophobie, crash) et initie la reprogrammation. La deuxième séance consolide le travail et installe un ancrage de calme. Une troisième séance est parfois utile pour les phobies très ancrées. Je vous enseigne aussi une technique d'auto-hypnose à utiliser dans l'avion."
    },
    {
      question: "L'hypnose pour la peur de l'avion fonctionne-t-elle même si j'ai toujours eu peur ?",
      answer: "Oui, que votre peur existe depuis toujours ou qu'elle soit apparue après un événement (turbulences, accident médiatisé), l'hypnose est efficace. L'ancienneté de la phobie ne change pas fondamentalement le traitement : c'est toujours un programme inconscient qui maintient la peur, et ce programme peut être modifié indépendamment de son ancienneté."
    },
    {
      question: "Que faire si mon vol est dans quelques jours et que j'ai très peur ?",
      answer: "En urgence, une séance d'hypnose intensive peut déjà réduire significativement votre anxiété. Je vous enseignerai une technique d'auto-hypnose rapide (5 minutes) à pratiquer avant et pendant le vol. Idéalement, prévoyez 2 séances avant votre voyage. N'hésitez pas à me contacter au 06 49 35 80 89 pour un rendez-vous rapide au cabinet de Paris 4ème."
    },
    {
      question: "L'hypnose aide-t-elle aussi pour l'anxiété pendant le vol (turbulences, décollage) ?",
      answer: "Oui, l'hypnose ne se limite pas à traiter la peur avant de monter dans l'avion. Elle reprogramme votre réaction aux moments spécifiques qui vous angoissent : le décollage, les turbulences, l'atterrissage, le sentiment d'enfermement. Chaque déclencheur est traité individuellement. De plus, la technique d'auto-hypnose que je vous enseigne est spécialement conçue pour être utilisée discrètement pendant le vol, vous permettant de retrouver le calme en quelques minutes."
    }
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// FAQ GÉNÉRIQUES PAR CATÉGORIE (fallback pour articles sans FAQ dédiée)
// ═══════════════════════════════════════════════════════════════════════

function generateFaqFromArticle(article) {
  const title = article.title || '';
  const categories = article.categories || [];
  const excerpt = article.excerpt || '';
  const topic = title.toLowerCase();

  // FAQ contextuelle basée sur le titre/catégorie
  const faq = [];

  // Q1 - Toujours incluse : question sur l'efficacité
  faq.push({
    question: `L'hypnose est-elle efficace pour ${getTopicPhrase(title)} ?`,
    answer: `Oui, l'hypnose ericksonienne est une approche reconnue et efficace pour accompagner les problématiques liées à ${getTopicPhrase(title)}. Elle agit directement sur les mécanismes inconscients impliqués, ce qui permet d'obtenir des résultats durables en 3 à 5 séances. Au cabinet NovaHypnose à Paris 4ème, Alain Zenatti, Maître Hypnologue certifié, propose un accompagnement personnalisé et adapté à chaque situation.`
  });

  // Q2 - Nombre de séances
  faq.push({
    question: `Combien de séances d'hypnose sont nécessaires pour traiter cette problématique ?`,
    answer: `En moyenne, 3 à 5 séances d'hypnose suffisent pour obtenir des résultats significatifs et durables. La première séance comprend un entretien approfondi pour comprendre votre situation, suivi du travail en hypnose. Beaucoup de patients ressentent un changement dès cette première rencontre. Le nombre exact de séances dépend de l'ancienneté et de la complexité de votre problématique.`
  });

  // Q3 - Auto-hypnose
  faq.push({
    question: `Peut-on pratiquer l'auto-hypnose entre les séances pour renforcer les résultats ?`,
    answer: `Oui, c'est même recommandé. À chaque séance, je vous transmets des techniques d'auto-hypnose adaptées à votre problématique. Ces exercices simples de 5 à 10 minutes, pratiqués quotidiennement, renforcent et accélèrent le travail réalisé en cabinet. L'auto-hypnose est un outil que vous garderez pour la vie, bien au-delà de la fin de l'accompagnement.`
  });

  // Q4 - Compatibilité
  faq.push({
    question: `L'hypnose est-elle compatible avec un suivi médical ou psychologique en cours ?`,
    answer: `Absolument. L'hypnose est une approche complémentaire qui s'intègre parfaitement dans un parcours de soin global. Elle ne remplace pas un traitement médical ni un suivi psychologique, mais elle les enrichit en agissant sur les mécanismes inconscients que ces approches n'atteignent pas directement. De nombreux médecins et psychologues recommandent l'hypnose en complément de leur accompagnement.`
  });

  // Q5 - Résultats durables
  faq.push({
    question: `Les résultats de l'hypnose sont-ils durables dans le temps ?`,
    answer: `Oui, les résultats de l'hypnose ericksonienne sont durables car elle modifie les schémas inconscients à leur racine. Contrairement aux approches qui agissent uniquement sur les symptômes, l'hypnose traite la cause profonde. Les changements obtenus se consolident et s'amplifient naturellement avec le temps, car les nouvelles réponses apprises génèrent des expériences positives qui les renforcent.`
  });

  return faq;
}

function getTopicPhrase(title) {
  // Extraire le sujet principal du titre
  const lower = title.toLowerCase();

  if (lower.includes('peur du vide') || lower.includes('acrophobie') || lower.includes('vertige')) {
    return 'la peur du vide et les problématiques liées aux hauteurs';
  }
  if (lower.includes('sommeil') || lower.includes('insomnie') || lower.includes('nuit') || lower.includes('rêve') || lower.includes('dormir')) {
    return 'les troubles du sommeil et la qualité du repos';
  }
  if (lower.includes('estime') || lower.includes('confiance')) {
    return "le développement de l'estime de soi et de la confiance en soi";
  }
  if (lower.includes('stress') || lower.includes('anxiété') || lower.includes('angoisse')) {
    return 'la gestion du stress et de l\'anxiété';
  }
  if (lower.includes('phobie') || lower.includes('peur')) {
    return 'le traitement des phobies et des peurs';
  }
  if (lower.includes('émotion')) {
    return 'la gestion des émotions';
  }
  if (lower.includes('avion')) {
    return 'la peur de l\'avion';
  }
  if (lower.includes('tabac') || lower.includes('fumer') || lower.includes('cigarette')) {
    return "l'arrêt du tabac";
  }
  if (lower.includes('poids') || lower.includes('mincir') || lower.includes('maigrir')) {
    return 'la gestion du poids';
  }
  if (lower.includes('douleur')) {
    return 'la gestion de la douleur';
  }

  // Fallback : essayer d'extraire un sujet du titre
  const cleaned = title
    .replace(/^(comment|pourquoi|les|la|le|l'|un|une|des)\s+/i, '')
    .replace(/\s+(grâce|par|avec|en)\s+.*$/i, '');
  return cleaned.toLowerCase();
}

// ═══════════════════════════════════════════════════════════════════════
// EXÉCUTION PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════

async function main() {
  console.log('🚀 Injection des FAQ dans les articles de blog...\n');

  // 1. Récupérer tous les articles publiés
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, slug, excerpt, categories, faq')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Erreur Supabase:', error.message);
    process.exit(1);
  }

  console.log(`📝 ${articles.length} articles trouvés\n`);

  let updated = 0;
  let skipped = 0;
  let generated = 0;

  for (const article of articles) {
    const existingFaq = article.faq || [];

    // Skip si l'article a déjà des FAQ
    if (existingFaq.length > 0) {
      console.log(`⏭️  "${article.title}" — déjà ${existingFaq.length} FAQ, ignoré`);
      skipped++;
      continue;
    }

    // Chercher une FAQ pré-écrite par slug
    let faqItems = FAQ_BY_SLUG[article.slug];

    if (faqItems) {
      console.log(`✅ "${article.title}" — FAQ pré-écrite trouvée (${faqItems.length} questions)`);
    } else {
      // Générer une FAQ contextuelle automatique
      faqItems = generateFaqFromArticle(article);
      console.log(`🤖 "${article.title}" — FAQ auto-générée (${faqItems.length} questions)`);
      generated++;
    }

    // Mettre à jour l'article dans Supabase
    const { error: updateError } = await supabase
      .from('articles')
      .update({ faq: faqItems })
      .eq('id', article.id);

    if (updateError) {
      console.error(`   ❌ Erreur update: ${updateError.message}`);
    } else {
      updated++;
    }
  }

  console.log('\n══════════════════════════════════════');
  console.log(`✅ ${updated} articles mis à jour`);
  console.log(`⏭️  ${skipped} articles déjà équipés`);
  console.log(`🤖 ${generated} FAQ auto-générées (pensez à les personnaliser dans l'admin)`);
  console.log('══════════════════════════════════════\n');
}

main().catch(console.error);
