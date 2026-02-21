import type { Context } from "https://edge.netlify.com";

// ─── Configuration ─────────────────────────────────────────────────────────
const SITE_URL = "https://novahypnose.fr";
const SITE_NAME = "NovaHypnose";
const STORAGE_URL =
  "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public";
const DEFAULT_IMAGE = `${STORAGE_URL}/images/alain-nov2025.webp`;

const BOT_USER_AGENTS = [
  "googlebot",
  "bingbot",
  "msnbot",        // Bing legacy crawler
  "bingpreview",   // Bing preview/thumbnail bot
  "yandex",
  "baiduspider",
  "duckduckbot",
  "slurp",
  "facebot",
  "ia_archiver",
  "linkedinbot",
  "twitterbot",
  "applebot",
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
  "petalbot",
  "gptbot",
  "claude-web",
  "perplexitybot",
  "meta-externalagent",
  "amazonbot",
  "bytespider",
  "dataforseobot",
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function isBot(request: Request): boolean {
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot));
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

// ─── Types ─────────────────────────────────────────────────────────────────

interface PageData {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  content: string;
  imageUrl?: string;
  jsonLd: unknown[];
}

// ─── HTML Shell ────────────────────────────────────────────────────────────

function htmlShell(page: PageData): string {
  const fullTitle = escapeHtml(page.title);
  const safeDesc = escapeHtml(page.description);
  const canonicalUrl = `${SITE_URL}${page.canonicalPath}`;
  const imageUrl = page.imageUrl || DEFAULT_IMAGE;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fullTitle}</title>
  <meta name="description" content="${safeDesc}">
  <meta name="robots" content="index, follow">
  <meta name="googlebot" content="index, follow">
  <meta name="bingbot" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:locale" content="fr_FR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${fullTitle}">
  <meta name="twitter:description" content="${safeDesc}">
  <meta name="twitter:image" content="${imageUrl}">
  ${page.jsonLd.map((ld) => `<script type="application/ld+json">${safeJsonLd(ld)}</script>`).join("\n  ")}
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 0 auto; padding: 1rem; color: #1a1a2e; line-height: 1.7; }
    header { border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 2rem; }
    header a { color: #233C67; text-decoration: none; margin-right: 1rem; font-weight: 600; }
    h1 { color: #233C67; font-size: 2rem; margin-bottom: 1rem; }
    h2 { color: #233C67; font-size: 1.4rem; margin: 2rem 0 0.5rem; }
    h3 { color: #4470AD; font-size: 1.1rem; margin: 1.5rem 0 0.5rem; }
    p { margin: 0.75rem 0; color: #333; }
    ul { margin: 0.5rem 0; padding-left: 1.5rem; }
    li { margin: 0.3rem 0; }
    .cta { display: inline-block; padding: 12px 24px; background: #F37336; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 1rem 0; }
    .contact { background: #f0f4fa; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; }
    footer { border-top: 1px solid #e2e8f0; margin-top: 3rem; padding-top: 1rem; color: #64748b; font-size: 0.85rem; }
    footer a { color: #233C67; text-decoration: none; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="${SITE_URL}">NovaHypnose</a>
      <a href="${SITE_URL}/hypnose-stress-anxiete-paris">Stress</a>
      <a href="${SITE_URL}/hypnose-phobies-paris">Phobies</a>
      <a href="${SITE_URL}/hypnose-sommeil-paris">Sommeil</a>
      <a href="${SITE_URL}/hypnose-gestion-emotions-paris">Émotions</a>
      <a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance</a>
      <a href="${SITE_URL}/blog">Blog</a>
    </nav>
  </header>
  <main>
    <h1>${escapeHtml(page.h1)}</h1>
    ${page.content}
  </main>
  <div class="contact">
    <h2>Prendre rendez-vous</h2>
    <p><strong>Alain Zenatti</strong> — Maître Praticien en Hypnose Ericksonienne</p>
    <p>16 rue Saint-Antoine, 75004 Paris (Marais-Bastille)</p>
    <p>Téléphone : <a href="tel:0649358089">06 49 35 80 89</a></p>
    <p>Email : <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a></p>
    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance</a>
  </div>
  <footer>
    <p><a href="${SITE_URL}">NovaHypnose</a> — Hypnothérapeute Paris 4 | Alain Zenatti</p>
    <p><a href="${SITE_URL}/mentions-legales">Mentions légales</a></p>
  </footer>
</body>
</html>`;
}

// ─── Structured Data ───────────────────────────────────────────────────────

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "NovaHypnose - Hypnothérapeute Paris",
  description:
    "Cabinet d'hypnothérapie à Paris 4ème. Alain Zenatti, Maître Hypnologue certifié. Hypnose ericksonienne pour le stress, les phobies, le sommeil et la confiance en soi.",
  url: SITE_URL,
  telephone: "+33649358089",
  email: "contact@novahypnose.fr",
  image: DEFAULT_IMAGE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "16 rue Saint-Antoine",
    addressLocality: "Paris",
    postalCode: "75004",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.8534,
    longitude: 2.3656,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "€€",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    reviewCount: "40",
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alain Zenatti",
  jobTitle: "Maître Hypnologue",
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  telephone: "+33649358089",
  email: "contact@novahypnose.fr",
  worksFor: {
    "@type": "HealthAndBeautyBusiness",
    name: "NovaHypnose",
    url: SITE_URL,
  },
};

function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

function serviceLd(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Person",
      name: "Alain Zenatti",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "Paris",
    },
    offers: {
      "@type": "Offer",
      price: "90",
      priceCurrency: "EUR",
    },
  };
}

// ─── Page Data ─────────────────────────────────────────────────────────────

const PAGES: Record<string, PageData> = {
  "/": {
    title: "Hypnothérapeute Paris 4 | Alain Zenatti - Hypnose",
    description:
      "Hypnothérapeute à Paris 4ème, cabinet Marais-Bastille. Alain Zenatti, Maître Hypnologue certifié. Stress, anxiété, phobies, sommeil. Résultats en 3 à 5 séances.",
    canonicalPath: "/",
    h1: "Hypnothérapeute à Paris — Alain Zenatti, Maître Hypnologue",
    imageUrl: DEFAULT_IMAGE,
    jsonLd: [
      localBusinessLd,
      personLd,
      breadcrumbLd([{ name: "Accueil", path: "/" }]),
    ],
    content: `
    <p>Bienvenue au cabinet <strong>NovaHypnose</strong>, situé au cœur du Marais à Paris 4ème. <strong>Alain Zenatti</strong>, Maître Praticien en Hypnose Ericksonienne, vous accompagne vers un changement profond et durable.</p>

    <h2>L'hypnose ericksonienne : une approche douce et efficace</h2>
    <p>L'hypnose ericksonienne est une méthode thérapeutique reconnue qui permet d'accéder à vos ressources inconscientes pour résoudre des problématiques ancrées. Contrairement aux idées reçues, vous restez pleinement conscient et acteur de votre transformation.</p>

    <h2>Domaines d'intervention</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Stress et anxiété</a> — Retrouvez la sérénité au quotidien</li>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Phobies et peurs</a> — Libérez-vous de vos peurs irrationnelles</li>
      <li><a href="${SITE_URL}/hypnose-sommeil-paris">Sommeil et insomnie</a> — Retrouvez des nuits réparatrices sans médicament</li>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — Apprenez à vivre vos émotions sans en être prisonnier</li>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — Procrastination, schémas répétitifs, TOC</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Syndrome de l'imposteur, prise de parole</li>
    </ul>

    <h2>Pourquoi choisir NovaHypnose ?</h2>
    <ul>
      <li><strong>9 certifications professionnelles</strong> en hypnose et PNL</li>
      <li><strong>Résultats en 3 à 5 séances</strong> pour la plupart des problématiques</li>
      <li><strong>Note 5/5</strong> — Plus de 40 avis vérifiés</li>
      <li><strong>Approche personnalisée</strong> — Chaque séance est adaptée à votre situation</li>
      <li><strong>Cabinet Paris 4ème</strong> — Métro Saint-Paul ou Bastille</li>
    </ul>

    <h2>Comment se déroule une séance ?</h2>
    <p>La première séance dure environ 1h30. Elle commence par un entretien approfondi pour comprendre votre situation, vos objectifs et votre fonctionnement. Puis, guidé par la voix d'Alain, vous entrez dans un état de relaxation profonde où votre inconscient peut travailler librement.</p>
    <p>Les séances suivantes durent environ 1h et permettent d'approfondir le travail thérapeutique. La plupart des patients constatent des améliorations significatives dès la première séance.</p>

    <h2>Tarifs</h2>
    <ul>
      <li>Séance au cabinet : <strong>90 €</strong></li>
      <li>Séance en téléconsultation : <strong>90 €</strong></li>
      <li>Séance à domicile : <strong>140 €</strong></li>
    </ul>

    <h2>Application mobile NovaRespire</h2>
    <p>Prolongez les bénéfices de vos séances avec l'application NovaRespire, disponible sur Google Play. Exercices de respiration et d'auto-hypnose guidés par Alain Zenatti.</p>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous</a>
    `,
  },

  "/hypnose-stress-anxiete-paris": {
    title: "Hypnose stress et anxiété Paris | Alain Zenatti",
    description:
      "Libérez-vous du stress chronique et de l'anxiété par l'hypnose à Paris 4ème. Alain Zenatti, Maître Hypnologue certifié. Résultats durables en 3 à 5 séances.",
    canonicalPath: "/hypnose-stress-anxiete-paris",
    h1: "Hypnose et stress — Retrouvez la sérénité à Paris",
    jsonLd: [
      serviceLd(
        "Hypnose stress et anxiété Paris",
        "Traitement du stress et de l'anxiété par l'hypnose ericksonienne à Paris 4ème. Résultats durables en 3 à 5 séances.",
        `${SITE_URL}/hypnose-stress-anxiete-paris`
      ),
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Stress et anxiété", path: "/hypnose-stress-anxiete-paris" },
      ]),
    ],
    content: `
    <p>Le stress et l'anxiété vous empêchent de vivre pleinement ? Vous vous réveillez la nuit avec des pensées qui tournent en boucle. Au travail, la pression ne retombe jamais. Vous avez essayé de relativiser, de lâcher prise, mais rien n'y fait. <strong>Le stress chronique n'est pas une fatalité.</strong> Ce n'est pas un trait de caractère. C'est un mécanisme que votre inconscient a mis en place — et que l'hypnose peut désactiver.</p>

    <h2>Quand le stress devient un problème de santé</h2>
    <p>Chaque semaine, je reçois à mon cabinet des personnes brillantes, compétentes, engagées — qui ne comprennent plus pourquoi elles se sentent submergées. Oppression thoracique, pensées en boucle, irritabilité, épuisement inexpliqué, troubles du sommeil. Ces symptômes ne sont pas dans votre tête. Le stress chronique produit des effets physiologiques mesurables : élévation du cortisol, activation permanente du système nerveux sympathique, inflammation silencieuse.</p>
    <p>Burn-out, anxiété généralisée, crises d'angoisse, stress au travail, charge mentale — ces réalités sont le signal que quelque chose doit changer. Et le changement peut être rapide.</p>

    <h2>Comment l'hypnose agit sur le stress et l'anxiété</h2>
    <p>L'hypnose ericksonienne travaille directement avec votre inconscient — là où se trouvent les automatismes qui génèrent le stress. Contrairement aux approches qui agissent uniquement sur les symptômes, l'hypnose traite le mécanisme à sa source.</p>
    <p>Les neurosciences confirment ce que les hypnothérapeutes observent depuis des années. En état d'hypnose, le cerveau réduit naturellement la production de <strong>cortisol</strong>, l'hormone du stress, tout en activant le <strong>système nerveux parasympathique</strong> — celui qui permet au corps de se régénérer. Des études en imagerie cérébrale montrent que l'hypnose modifie l'activité du cortex préfrontal et de l'amygdale, les zones impliquées dans la gestion des émotions et la réponse au danger.</p>
    <ul>
      <li><strong>Reprogrammation des réactions automatiques de stress</strong></li>
      <li><strong>Relâchement des tensions accumulées dans le corps</strong></li>
      <li><strong>Restauration d'un sommeil profond et réparateur</strong></li>
      <li><strong>Développement de ressources internes de calme durable</strong></li>
      <li><strong>Arrêt du cercle vicieux des pensées négatives</strong></li>
      <li><strong>Techniques d'auto-hypnose</strong> pour gérer le stress au quotidien</li>
    </ul>

    <h2>Mon approche pour traiter le stress</h2>
    <p>Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong>, installé à Paris 4ème dans le quartier Marais-Bastille. Ma méthode combine l'hypnose ericksonienne avec des techniques de PNL et d'auto-hypnose que vous pourrez réutiliser seul(e) au quotidien. Chaque séance est personnalisée selon votre situation.</p>
    <p>Lors de la première séance, nous identifions ensemble les déclencheurs de votre stress et je vous guide dans un état de profonde relaxation. La plupart de mes patients ressentent un soulagement significatif dès cette première rencontre.</p>

    <h2>Exemples de parcours au cabinet</h2>
    <h3>Stress professionnel chronique</h3>
    <p>Sophie*, cadre dans la finance à Paris, ne dormait plus que 4 heures par nuit. Les tensions au bureau avaient envahi toute sa vie : maux de tête, irritabilité, incapacité à décrocher le soir. Elle avait consulté son médecin, essayé le yoga, mais le stress revenait toujours. En 4 séances d'hypnose, nous avons identifié et neutralisé les mécanismes inconscients qui maintenaient son hypervigilance. Sophie a retrouvé un sommeil réparateur et une capacité à poser des limites saines au travail.</p>
    <h3>Crises d'angoisse dans les transports</h3>
    <p>Marc*, 35 ans, évitait le métro depuis un an après une première crise de panique en heure de pointe. Il prenait des taxis pour aller travailler, ce qui pesait sur son budget et renforçait son sentiment d'impuissance. Après 3 séances d'hypnose ericksonienne, Marc a repris le métro. La technique d'auto-hypnose rapide qu'il a apprise lui permet de gérer toute montée d'anxiété en quelques respirations.</p>
    <h3>Anxiété liée aux examens</h3>
    <p>Léa*, étudiante en droit, se paralysait systématiquement devant ses copies d'examen. Elle connaissait son cours, mais le trac lui faisait perdre tous ses moyens. En 3 séances, nous avons reprogrammé sa réponse au stress d'examen et ancré un état de concentration calme qu'elle peut activer avant chaque épreuve. Ses résultats se sont nettement améliorés dès la session suivante.</p>
    <p><em>* Prénoms modifiés pour préserver la confidentialité</em></p>

    <blockquote><p>« J'ai consulté pour un problème d'anxiété, dès la première séance je me suis sentie apaisée et sereine. Alain est à l'écoute et mon anxiété a totalement disparu en 3 séances. Je recommande vivement. »</p><cite>— Marie H., avis Google vérifié</cite></blockquote>

    <h2>Résultats concrets</h2>
    <ul>
      <li><strong>90%</strong> de mes patients constatent une amélioration dès la première séance</li>
      <li><strong>3 à 5 séances</strong> suffisent en moyenne pour un résultat durable</li>
      <li><strong>Note 5/5</strong> sur plus de 40 avis vérifiés</li>
    </ul>

    <h2>Questions fréquentes sur l'hypnose et le stress</h2>
    <h3>Combien de séances d'hypnose pour traiter le stress et l'anxiété ?</h3>
    <p>En général, 3 à 5 séances d'hypnose ericksonienne suffisent pour obtenir des résultats durables. Dès la première séance, la majorité de mes patients ressentent un soulagement significatif. Le nombre exact dépend de l'ancienneté du stress, de son intensité et de votre réceptivité.</p>
    <h3>L'hypnose est-elle efficace contre le burn-out ?</h3>
    <p>Oui, l'hypnose est particulièrement efficace pour accompagner un burn-out. Elle agit à plusieurs niveaux : relâchement des tensions physiques accumulées, reprogrammation des mécanismes de surmenage, restauration de la capacité à poser des limites et retrouver de l'énergie. Elle accélère considérablement la récupération et prévient les rechutes.</p>
    <h3>L'hypnose peut-elle aider en cas de crises d'angoisse ?</h3>
    <p>Absolument. L'hypnose est l'une des approches les plus efficaces pour traiter les crises d'angoisse. Elle agit en deux temps : d'abord, une technique d'auto-hypnose rapide à utiliser dès qu'une crise commence pour la stopper en quelques minutes. Ensuite, le travail en séance pour désactiver le mécanisme inconscient qui déclenche ces crises.</p>

    <h2>Autres spécialités</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Hypnose et phobies</a> — Phobie avion, claustrophobie, peur de parler en public</li>
      <li><a href="${SITE_URL}/hypnose-sommeil-paris">Hypnose et sommeil</a> — Insomnie, réveils nocturnes, sevrage somnifères</li>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — Colère, hypersensibilité, deuil</li>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — Procrastination, TOC, schémas répétitifs</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Syndrome de l'imposteur, prise de parole</li>
      <li><a href="${SITE_URL}/hypnose-professionnels-paris">Hypnose pour professionnels</a> — Stress au travail, burn-out</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit en ligne</li>
      <li><a href="${SITE_URL}/blog">Blog hypnose</a> — Articles sur le stress, l'anxiété et l'hypnose</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance stress et anxiété — 90€</a>
    `,
  },

  "/hypnose-phobies-paris": {
    title: "Hypnose phobies et peurs Paris | Alain Zenatti",
    description:
      "Libérez-vous de vos phobies par l'hypnose à Paris 4ème. Phobie avion, claustrophobie, peur de parler en public. Résultats durables en 2 à 4 séances. Séance 90€.",
    canonicalPath: "/hypnose-phobies-paris",
    h1: "Hypnose et phobies — Libérez-vous de vos peurs à Paris",
    jsonLd: [
      serviceLd(
        "Hypnose phobies et peurs Paris",
        "Traitement des phobies par l'hypnose ericksonienne à Paris 4ème. Phobie avion, claustrophobie, peur de parler en public. Résultats en 2 à 4 séances.",
        `${SITE_URL}/hypnose-phobies-paris`
      ),
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Phobies et peurs", path: "/hypnose-phobies-paris" },
      ]),
    ],
    content: `
    <p>Ce qui a été appris peut être désappris. Une phobie est un <strong>programme de protection installé par votre inconscient</strong> — souvent à partir d'une expérience passée. L'hypnose permet de désactiver ce programme sans revivre le trauma. Vous n'avez pas besoin de vous confronter à votre peur pour vous en libérer.</p>

    <h2>Phobies traitées en hypnose à Paris</h2>
    <ul>
      <li><strong>Phobie de l'avion</strong> (aviophobie) — Retrouvez la liberté de voyager sereinement</li>
      <li><strong>Claustrophobie</strong> — Ascenseurs, tunnels, IRM, espaces clos</li>
      <li><strong>Arachnophobie</strong> — Peur des araignées et insectes</li>
      <li><strong>Acrophobie</strong> — Peur du vide et des hauteurs</li>
      <li><strong>Peur de parler en public</strong> — Glossophobie, trac, exposés, réunions</li>
      <li><strong>Phobie sociale</strong> — Peur du jugement des autres</li>
      <li><strong>Phobie de conduire</strong> — Amaxophobie après accident ou longue pause</li>
      <li><strong>Phobie des injections</strong> — Seringues, prises de sang, dentiste</li>
      <li>Et toutes les autres phobies spécifiques</li>
    </ul>

    <h2>Comment l'hypnose traite les phobies</h2>
    <p>L'amygdale, centre de la peur dans votre cerveau, déclenche instantanément une cascade de réactions de survie — avant même que votre cortex rationnel n'ait le temps d'analyser la situation. C'est pourquoi vous savez que votre peur est irrationnelle, mais ne parvenez pas à la contrôler par la volonté seule.</p>
    <p>L'hypnose agit directement sur ce circuit en <strong>désensibilisant la réponse phobique</strong> au niveau inconscient. En état hypnotique, votre cerveau devient particulièrement réceptif à la création de nouveaux chemins neuronaux. Je guide votre inconscient pour qu'il associe progressivement le stimulus à un état de calme et de sécurité plutôt qu'à la panique. Ce processus de reconditionnement est rapide car il s'adresse directement à la mémoire émotionnelle.</p>

    <h2>Mon approche pour traiter les phobies</h2>
    <p>Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème, quartier Marais-Bastille. Chaque accompagnement est personnalisé selon votre phobie spécifique et votre histoire. Lors de la première séance, nous identifions l'origine de la peur et les mécanismes qui la maintiennent. Je combine l'hypnose ericksonienne avec des techniques de désensibilisation douce et d'auto-hypnose.</p>

    <h2>Exemples de parcours au cabinet</h2>
    <h3>Peur de l'avion</h3>
    <p>Thomas*, consultant international, refusait systématiquement les missions nécessitant un vol. Sa phobie de l'avion, installée depuis un vol turbulent 10 ans plus tôt, menaçait désormais sa carrière. En 3 séances d'hypnose dans mon cabinet du Marais, nous avons neutralisé le souvenir traumatique initial et installé un état de calme associé au vol. Thomas a repris l'avion le mois suivant pour un déplacement à Londres — sereinement.</p>
    <h3>Arachnophobie sévère</h3>
    <p>Claire*, 28 ans, ne pouvait pas entrer dans une pièce sans l'avoir inspectée minutieusement. La vue d'une simple toile d'araignée déclenchait une crise de panique. Après 2 séances d'hypnose ericksonienne, Claire a constaté que sa réaction face aux araignées avait radicalement changé. La peur intense s'était transformée en simple indifférence. Elle a pu partir en randonnée pour la première fois depuis des années.</p>
    <h3>Peur de parler en public</h3>
    <p>Julien*, entrepreneur, perdait tous ses moyens dès qu'il devait pitcher devant des investisseurs. Voix tremblante, mains moites, trous de mémoire — sa phobie de la prise de parole freinait le développement de sa startup. En 4 séances, nous avons travaillé sur l'origine de cette peur et ancré un état de confiance qu'il peut activer avant chaque présentation. Julien a levé des fonds avec succès trois mois plus tard.</p>
    <p><em>* Prénoms modifiés pour préserver la confidentialité</em></p>

    <blockquote><p>« Mr Zenatti est un praticien calme et réfléchi. Son écoute attentive lui a permis de déterminer les axes de travail. En quelques séances, j'ai pu me libérer de certains blocages et entamer des changements pérennes. »</p><cite>— Philippe A., avis Google vérifié</cite></blockquote>

    <h2>Résultats</h2>
    <ul>
      <li><strong>2 à 4 séances</strong> suffisent pour les phobies simples</li>
      <li><strong>95%</strong> des phobies simples peuvent être traitées par l'hypnose</li>
      <li><strong>Note 5/5</strong> sur plus de 40 avis vérifiés</li>
    </ul>

    <h2>Questions fréquentes sur l'hypnose et les phobies</h2>
    <h3>Faut-il être exposé à sa phobie pendant la séance d'hypnose ?</h3>
    <p>Non, c'est l'un des grands avantages de l'hypnose. Vous n'avez jamais besoin de vous confronter directement à l'objet de votre peur. L'hypnose ericksonienne travaille avec votre inconscient en utilisant des techniques dissociatives : votre cerveau reprogramme sa réaction de peur sans que vous ayez à revivre la situation anxiogène. C'est une approche douce et confortable.</p>
    <h3>La phobie peut-elle revenir après un traitement par hypnose ?</h3>
    <p>Dans la grande majorité des cas, non. Quand l'hypnose modifie le programme inconscient à l'origine de la phobie, le changement est permanent. Il peut arriver, dans de rares cas, qu'un événement traumatique réactive une ancienne peur. Si cela se produit, une séance de renforcement suffit généralement.</p>
    <h3>L'hypnose traite-t-elle les phobies installées depuis l'enfance ?</h3>
    <p>Oui, l'hypnose est même particulièrement efficace sur les phobies anciennes. Qu'une phobie soit installée depuis 5 ou 40 ans ne change pas fondamentalement le traitement : c'est toujours un programme inconscient qui maintient la peur. Votre inconscient n'a pas de notion du temps — une phobie de 30 ans peut être désactivée aussi rapidement qu'une phobie récente.</p>

    <h2>Autres spécialités</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Burn-out, crises d'angoisse, stress chronique</li>
      <li><a href="${SITE_URL}/hypnose-sommeil-paris">Hypnose et sommeil</a> — Insomnie, réveils nocturnes</li>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — Colère, hypersensibilité, deuil</li>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — Procrastination, TOC</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Syndrome de l'imposteur</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
      <li><a href="${SITE_URL}/blog">Blog hypnose</a> — Articles sur les phobies et l'hypnose</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance phobies — 90€</a>
    `,
  },

  "/hypnose-sommeil-paris": {
    title: "Hypnose sommeil et insomnie Paris | Alain Zenatti",
    description:
      "Retrouvez un sommeil profond par l'hypnose à Paris 4ème. Insomnie, réveils nocturnes, endormissement difficile. Sans médicament. Résultats en 3 à 5 séances.",
    canonicalPath: "/hypnose-sommeil-paris",
    h1: "Hypnose et sommeil — Retrouvez des nuits sereines à Paris",
    jsonLd: [
      serviceLd(
        "Hypnose sommeil et insomnie Paris",
        "Traitement de l'insomnie par l'hypnose à Paris 4ème. Retrouvez un sommeil profond et réparateur sans médicament en 3 à 5 séances.",
        `${SITE_URL}/hypnose-sommeil-paris`
      ),
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Sommeil et insomnie", path: "/hypnose-sommeil-paris" },
      ]),
    ],
    content: `
    <p>Le problème n'est pas dans votre corps. Il est dans votre inconscient, qui a <strong>oublié comment lâcher prise pour s'endormir</strong>. L'hypnose permet de restaurer ce mécanisme naturel — sans aucun médicament, sans dépendance, durablement.</p>

    <h2>Troubles du sommeil traités en hypnose</h2>
    <ul>
      <li><strong>Insomnie d'endormissement</strong> — Vous tournez dans votre lit pendant des heures</li>
      <li><strong>Réveils nocturnes</strong> — Vous vous réveillez à 3h ou 4h du matin avec des ruminations</li>
      <li><strong>Sommeil non réparateur</strong> — Vous dormez mais vous êtes épuisé au réveil</li>
      <li><strong>Anxiété du coucher</strong> — La peur de ne pas dormir qui empêche de dormir</li>
      <li><strong>Sevrage des somnifères</strong> — Accompagnement progressif vers un sommeil naturel</li>
      <li><strong>Hypersommnie et fatigue chronique</strong> — Quand dormir ne suffit plus</li>
    </ul>

    <h2>Comment l'hypnose restaure le sommeil</h2>
    <p>L'insomnie est rarement un problème physique. C'est un cercle vicieux où l'anxiété de ne pas dormir empêche le sommeil, ce qui augmente l'anxiété. L'hypnose brise ce cercle en reprogrammant les automatismes inconscients liés à l'endormissement.</p>
    <p>En état d'hypnose, votre cerveau réapprend à activer naturellement les ondes alpha et thêta nécessaires au sommeil profond. Je vous transmets des techniques d'auto-hypnose spécialement conçues pour l'endormissement que vous pourrez pratiquer chaque soir. Avec la pratique, cela devient un réflexe : votre cerveau associe la technique au signal naturel de s'endormir.</p>

    <h2>Mon approche pour traiter l'insomnie</h2>
    <p>Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème. Mon approche combine l'hypnose ericksonienne avec des techniques de PNL pour traiter à la fois les causes du trouble du sommeil et les automatismes qui le maintiennent. Chaque séance est personnalisée selon votre type d'insomnie et votre situation de vie.</p>

    <h2>Exemples de parcours au cabinet</h2>
    <h3>Insomnie chronique liée au travail</h3>
    <p>Laurent*, directeur commercial, ne dormait plus que 3 à 4 heures par nuit depuis 18 mois. Son cerveau continuait à travailler la nuit, repassant en boucle les problèmes du bureau. La fatigue accumulée affectait sa concentration et sa santé. En 4 séances d'hypnose dans mon cabinet de Paris 4ème, nous avons installé un interrupteur mental lui permettant de couper ses pensées professionnelles le soir. Laurent dort désormais 7 heures par nuit et se réveille reposé.</p>
    <h3>Réveils nocturnes et ruminations</h3>
    <p>Nathalie*, 42 ans, se réveillait chaque nuit vers 3h du matin avec des pensées anxieuses impossibles à stopper. Elle avait consulté un médecin du sommeil sans résultat probant. En 3 séances, nous avons traité la source de l'anxiété nocturne et je lui ai transmis une technique d'auto-hypnose pour se rendormir en quelques minutes. Ses réveils nocturnes ont cessé dès la deuxième semaine.</p>
    <h3>Sevrage des somnifères</h3>
    <p>Patrick*, 55 ans, prenait des somnifères depuis 8 ans. Il voulait arrêter mais n'y arrivait pas seul. En 5 séances progressives, nous avons réappris à son inconscient à s'endormir naturellement. Patrick a pu réduire puis arrêter complètement ses somnifères, en accord avec son médecin.</p>
    <p><em>* Prénoms modifiés pour préserver la confidentialité</em></p>

    <blockquote><p>« Après des mois d'insomnie, j'ai retrouvé des nuits complètes en quelques séances seulement. Alain sait comprendre nos besoins et faire en sorte que l'on atteigne nos objectifs. »</p><cite>— Jaouad M., avis Google vérifié</cite></blockquote>

    <h2>Résultats</h2>
    <ul>
      <li><strong>3 à 5 séances</strong> pour retrouver un sommeil stable et réparateur</li>
      <li><strong>0 médicament</strong> nécessaire — une solution 100% naturelle</li>
      <li>Amélioration souvent visible <strong>dès la première séance</strong></li>
      <li><strong>Note 5/5</strong> sur plus de 40 avis vérifiés</li>
    </ul>

    <h2>Questions fréquentes sur l'hypnose et le sommeil</h2>
    <h3>L'auto-hypnose peut-elle aider à s'endormir chaque soir ?</h3>
    <p>Oui, c'est même l'un des outils les plus puissants que je transmets à mes patients. Je vous enseigne une technique d'auto-hypnose spécialement conçue pour l'endormissement, que vous pouvez pratiquer chaque soir en quelques minutes. Cette technique induit un état de relaxation profonde qui facilite la transition naturelle vers le sommeil.</p>
    <h3>L'hypnose peut-elle remplacer les somnifères ?</h3>
    <p>L'hypnose est une alternative naturelle aux somnifères, mais le sevrage de médicaments doit toujours se faire en accord avec votre médecin. L'hypnose restaure les mécanismes naturels du sommeil sans créer de dépendance. Beaucoup de mes patients réduisent progressivement leurs somnifères au fil des séances.</p>
    <h3>L'hypnose fonctionne-t-elle pour les réveils nocturnes à 3h ou 4h du matin ?</h3>
    <p>Oui, les réveils nocturnes sont une problématique que l'hypnose traite très bien. Ces réveils sont souvent liés à un mécanisme d'hyper-vigilance inconscient. L'hypnose identifie la cause spécifique de vos réveils et reprogramme votre cycle de sommeil pour qu'il se déroule sans interruption.</p>

    <h2>Autres spécialités</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Burn-out, crises d'angoisse</li>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Hypnose et phobies</a> — Phobie avion, claustrophobie</li>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — Colère, hypersensibilité, deuil</li>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — Procrastination, TOC</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Syndrome de l'imposteur</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
      <li><a href="${SITE_URL}/blog">Blog hypnose</a> — Articles sur le sommeil et l'hypnose</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance sommeil — 90€</a>
    `,
  },

  "/hypnose-gestion-emotions-paris": {
    title: "Hypnose gestion des émotions Paris | Alain Zenatti",
    description:
      "Gérez vos émotions par l'hypnose à Paris 4ème. Colère, hypersensibilité, deuil, frustration. Alain Zenatti, Maître Hypnologue certifié. Résultats en 3 à 5 séances.",
    canonicalPath: "/hypnose-gestion-emotions-paris",
    h1: "Hypnose et gestion des émotions — Retrouvez votre équilibre à Paris",
    jsonLd: [
      serviceLd(
        "Hypnose gestion des émotions Paris",
        "Gestion des émotions par l'hypnose ericksonienne à Paris 4ème. Colère, hypersensibilité, deuil, frustration. Retrouvez votre équilibre émotionnel.",
        `${SITE_URL}/hypnose-gestion-emotions-paris`
      ),
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Gestion des émotions", path: "/hypnose-gestion-emotions-paris" },
      ]),
    ],
    content: `
    <p>L'hypnose ericksonienne ne supprime pas vos émotions — elle vous apprend à <strong>les vivre sans en être prisonnier</strong>. Les réactions émotionnelles automatiques sont des programmes inconscients qui peuvent être reprogrammés. Vous ressentez pleinement, mais vous n'êtes plus submergé(e).</p>

    <h2>Problématiques émotionnelles traitées en hypnose</h2>
    <ul>
      <li><strong>Colère et irritabilité</strong> — Des explosions que vous regrettez aussitôt, des réactions disproportionnées</li>
      <li><strong>Hypersensibilité</strong> — Vous absorbez les émotions des autres comme une éponge, vidé(e) en fin de journée</li>
      <li><strong>Deuil et séparation</strong> — Un chagrin qui ne passe pas, une tristesse envahissante</li>
      <li><strong>Frustration chronique</strong> — Un sentiment d'insatisfaction permanent</li>
      <li><strong>Anxiété émotionnelle</strong> — Une peur diffuse et envahissante sans cause précise</li>
      <li><strong>Surcharge émotionnelle</strong> — Le sentiment d'être débordé(e) par tout et par tous</li>
    </ul>

    <h2>Comment l'hypnose régule les émotions</h2>
    <p>Vos réactions émotionnelles excessives ne sont pas un défaut de caractère. Ce sont des mécanismes de protection installés par votre inconscient, souvent depuis l'enfance. La volonté seule ne peut pas les modifier — il faut agir au même niveau où ils se sont installés.</p>
    <p>En travaillant avec votre inconscient, nous identifions la source des réactions automatiques et installons de nouvelles réponses émotionnelles plus adaptées. Vous gardez votre sensibilité et votre profondeur — mais vous n'en êtes plus l'esclave.</p>
    <p>Je vous transmets également des <strong>techniques d'auto-hypnose</strong> pour gérer les moments d'intensité émotionnelle au quotidien — un outil que vous garderez pour la vie.</p>

    <h2>Mon approche pour l'équilibre émotionnel</h2>
    <p>Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème. La gestion des émotions est au coeur de ma pratique. Que vous soyez submergé(e) par la colère, paralysé(e) par un deuil ou épuisé(e) par votre hypersensibilité, je vous accompagne vers un nouvel équilibre. Mon approche est douce et progressive, entièrement personnalisée selon votre histoire et votre fonctionnement.</p>

    <h2>Exemples de parcours au cabinet</h2>
    <h3>Colères incontrôlables</h3>
    <p>David*, chef de projet, explosait régulièrement au travail et à la maison. Ses accès de colère disproportionnés abîmaient ses relations avec sa compagne et ses collègues. Il se sentait coupable après chaque épisode mais ne parvenait pas à se contrôler. En 4 séances d'hypnose, nous avons identifié l'origine de cette colère — une blessure d'enfance non traitée — et retraité la mémoire émotionnelle. David réagit désormais de manière proportionnée et ses relations se sont considérablement améliorées.</p>
    <h3>Deuil difficile</h3>
    <p>Anne*, 50 ans, était figée dans son deuil depuis la perte de sa mère un an plus tôt. Elle ne parvenait plus à éprouver de joie, s'isolait, et avait perdu tout intérêt pour ses activités. En 5 séances d'hypnose ericksonienne, nous avons accompagné le processus de deuil en douceur, en transformant la douleur en souvenirs apaisés et en gratitude. Anne a retrouvé progressivement goût à la vie.</p>
    <h3>Hypersensibilité envahissante</h3>
    <p>Sarah*, infirmière, absorbait les émotions de ses patients comme une éponge. Le soir, elle était vidée, submergée au point de ne plus savoir distinguer ses propres émotions. En 3 séances, nous avons installé une bulle de protection émotionnelle lui permettant de rester empathique sans être envahie. Sarah continue d'exercer avec passion, mais sans se vider émotionnellement.</p>
    <p><em>* Prénoms modifiés pour préserver la confidentialité</em></p>

    <blockquote><p>« Découvrir NovaHypnose est une expérience marquante. J'ai laissé derrière moi certaines croyances figées et j'ai ouvert un espace intérieur plus souple, plus libre. Me voilà en adéquation avec mon présent. »</p><cite>— Edward, avis Google vérifié</cite></blockquote>

    <h2>Résultats</h2>
    <ul>
      <li><strong>3 à 5 séances</strong> pour retrouver un équilibre émotionnel durable</li>
      <li><strong>100% personnalisé</strong> selon votre histoire et votre fonctionnement</li>
      <li><strong>Note 5/5</strong> sur plus de 40 avis vérifiés</li>
    </ul>

    <h2>Questions fréquentes sur l'hypnose et les émotions</h2>
    <h3>L'hypnose supprime-t-elle les émotions ?</h3>
    <p>Non, absolument pas. Les émotions sont essentielles et font partie de votre richesse intérieure. Ce que l'hypnose modifie, c'est l'intensité disproportionnée de certaines réactions émotionnelles et les automatismes qui vous submergent. Après les séances, vous continuez à ressentir toute la palette émotionnelle, mais avec un sentiment de contrôle et de choix.</p>
    <h3>L'hypnose est-elle adaptée aux personnes hypersensibles ?</h3>
    <p>L'hypnose est particulièrement bien adaptée aux personnes hypersensibles, qui sont d'ailleurs souvent très réceptives à l'approche ericksonienne. L'hypersensibilité n'est pas un problème à corriger, mais une richesse à canaliser. L'hypnose vous aide à mettre en place des filtres naturels pour ne plus être submergé(e), tout en conservant votre profondeur et votre empathie.</p>
    <h3>L'hypnose peut-elle aider à surmonter un deuil ?</h3>
    <p>Oui, l'hypnose est un accompagnement précieux dans le processus de deuil. Elle ne cherche pas à effacer la tristesse, qui est une émotion saine et nécessaire, mais à débloquer les mécanismes qui empêchent le deuil de suivre son cours naturel : culpabilité, colère non exprimée, sentiment d'inachevé.</p>

    <h2>Autres spécialités</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Burn-out, crises d'angoisse</li>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Hypnose et phobies</a> — Phobie avion, claustrophobie</li>
      <li><a href="${SITE_URL}/hypnose-sommeil-paris">Hypnose et sommeil</a> — Insomnie, réveils nocturnes</li>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — Procrastination, TOC</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Syndrome de l'imposteur</li>
      <li><a href="${SITE_URL}/hypnose-professionnels-paris">Hypnose pour professionnels</a> — Stress au travail</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
      <li><a href="${SITE_URL}/blog">Blog hypnose</a> — Articles sur les émotions et l'hypnose</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance gestion des émotions — 90€</a>
    `,
  },

  "/hypnose-blocages-paris": {
    title: "Hypnose blocages et comportements Paris | Zenatti",
    description:
      "Libérez vos blocages par l'hypnose à Paris 4ème. Procrastination, schémas répétitifs, TOC, addictions comportementales. Alain Zenatti, Maître Hypnologue. 3 à 5 séances.",
    canonicalPath: "/hypnose-blocages-paris",
    h1: "Blocages et troubles du comportement — Libérez-vous par l'hypnose à Paris",
    jsonLd: [
      serviceLd(
        "Hypnose blocages et comportements Paris",
        "Libération des blocages et troubles du comportement par l'hypnose à Paris 4ème. Procrastination, schémas répétitifs, TOC, addictions comportementales.",
        `${SITE_URL}/hypnose-blocages-paris`
      ),
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Blocages et comportements", path: "/hypnose-blocages-paris" },
      ]),
    ],
    content: `
    <p>Ces comportements ne sont pas un choix — ce sont des <strong>programmes inconscients que l'hypnose peut débloquer</strong>. Ce n'est ni de la paresse, ni un manque de volonté. La volonté ne peut pas accéder à ce niveau — il faut une approche qui dialogue directement avec l'inconscient.</p>

    <h2>Blocages et comportements traités en hypnose</h2>
    <ul>
      <li><strong>Procrastination</strong> — Vous remettez tout au lendemain malgré votre volonté, paralysé(e) par la peur de l'échec</li>
      <li><strong>Schémas répétitifs</strong> — Vous reproduisez les mêmes erreurs dans vos relations ou votre travail</li>
      <li><strong>Onychophagie</strong> — Se ronger les ongles compulsivement, un automatisme inconscient</li>
      <li><strong>TOC et rituels</strong> — Vérifications, comptage, rituels envahissants qui épuisent</li>
      <li><strong>Blocages professionnels</strong> — Auto-sabotage, peur de réussir, syndrome de l'imposteur</li>
      <li><strong>Addictions comportementales</strong> — Écrans, jeux, achats compulsifs, relation à la nourriture</li>
      <li><strong>Peur du changement</strong> — Vous restez dans une situation qui ne vous convient plus</li>
    </ul>

    <h2>Comment l'hypnose libère les blocages</h2>
    <p>L'hypnose va directement à la source : elle dialogue avec l'inconscient pour comprendre le besoin caché derrière le comportement problématique. Chaque blocage a une fonction — souvent de protection, parfois de confort. En identifiant cette fonction et en proposant à votre inconscient une alternative plus saine, le comportement se libère naturellement, sans effort de volonté.</p>
    <p>Je combine l'hypnose ericksonienne avec des techniques de PNL pour maximiser l'efficacité. Vous repartirez aussi avec des outils d'auto-hypnose pour consolider le travail entre les séances.</p>

    <h2>Mon approche pour les blocages</h2>
    <p>Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème. Les blocages et les troubles du comportement sont des problématiques que je traite quotidiennement au cabinet. Mon approche est sans jugement et entièrement personnalisée. Lors de la première séance, nous explorons ensemble le comportement qui vous pose problème et ses déclencheurs.</p>

    <h2>Exemples de parcours au cabinet</h2>
    <h3>Procrastination chronique</h3>
    <p>Vincent*, développeur freelance, repoussait systématiquement ses projets importants. Malgré des deadlines serrées, il se retrouvait à faire tout sauf ce qu'il devait faire. Ce schéma récurrent menaçait sa carrière et générait une culpabilité permanente. En 3 séances d'hypnose, nous avons découvert que sa procrastination cachait une peur de l'échec liée à des attentes parentales trop élevées. Une fois cette croyance transformée, Vincent a retrouvé sa productivité naturelle.</p>
    <h3>Schémas relationnels répétitifs</h3>
    <p>Caroline*, 38 ans, enchaînait les relations avec le même profil de partenaire et la même issue douloureuse. Elle savait que quelque chose se répétait mais ne comprenait pas pourquoi, malgré un travail en psychothérapie. En 4 séances, l'hypnose a permis d'identifier et de transformer un schéma inconscient hérité de la dynamique familiale. Caroline a pu enfin construire une relation épanouissante.</p>
    <h3>Peur du changement</h3>
    <p>Antoine*, 45 ans, rêvait de quitter son poste pour créer son entreprise depuis 10 ans. Chaque fois qu'il s'en approchait, une peur paralysante le ramenait dans sa zone de confort. En 5 séances, nous avons travaillé sur ses croyances limitantes autour de la sécurité et ancré les ressources de courage nécessaires. Antoine a lancé son activité six mois plus tard.</p>
    <p><em>* Prénoms modifiés pour préserver la confidentialité</em></p>

    <blockquote><p>« En quelques séances, avec ses techniques d'hypnose et sa connaissance de la PNL, j'ai pu me libérer de certains blocages et entamer des changements pérennes. Cela m'a fait beaucoup de bien. »</p><cite>— Philippe A., avis Google vérifié</cite></blockquote>

    <h2>Résultats</h2>
    <ul>
      <li><strong>3 à 5 séances</strong> pour des comportements profondément ancrés</li>
      <li><strong>100% personnalisé</strong> — sans jugement, adapté à votre histoire</li>
      <li><strong>Note 5/5</strong> sur plus de 40 avis vérifiés</li>
    </ul>

    <h2>Questions fréquentes sur l'hypnose et les blocages</h2>
    <h3>L'hypnose peut-elle aider à arrêter la procrastination ?</h3>
    <p>Oui, l'hypnose est très efficace contre la procrastination car elle traite la cause, pas le symptôme. La procrastination n'est pas un manque de volonté : c'est un mécanisme de protection inconscient, souvent lié à la peur de l'échec, au perfectionnisme ou à l'anxiété de performance. L'hypnose identifie la peur cachée et la neutralise.</p>
    <h3>L'hypnose peut-elle briser les schémas répétitifs en amour ou au travail ?</h3>
    <p>C'est même l'une de ses applications les plus puissantes. Les schémas répétitifs sont maintenus par des programmes inconscients souvent liés à l'enfance. L'hypnose identifie le schéma, remonte à son origine et reprogramme la réponse inconsciente. Mes patients sont souvent surpris de constater qu'après quelques séances, ils font naturellement des choix différents.</p>
    <h3>Peut-on traiter plusieurs blocages comportementaux en même temps ?</h3>
    <p>Oui, et c'est même souvent ce qui se passe naturellement. Beaucoup de blocages partagent une racine commune : anxiété, manque de confiance, besoin de contrôle. En traitant cette racine, plusieurs comportements s'améliorent simultanément.</p>

    <h2>Autres spécialités</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Burn-out, crises d'angoisse</li>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Hypnose et phobies</a> — Phobie avion, claustrophobie</li>
      <li><a href="${SITE_URL}/hypnose-sommeil-paris">Hypnose et sommeil</a> — Insomnie, réveils nocturnes</li>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — Colère, deuil, hypersensibilité</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Syndrome de l'imposteur</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
      <li><a href="${SITE_URL}/blog">Blog hypnose</a> — Articles sur les blocages et l'hypnose</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance blocages et comportements — 90€</a>
    `,
  },

  "/hypnose-confiance-en-soi-paris": {
    title: "Hypnose confiance en soi Paris | Alain Zenatti",
    description:
      "Développez votre confiance en soi par l'hypnose à Paris 4ème. Syndrome de l'imposteur, prise de parole, estime de soi. Résultats en 3 à 5 séances.",
    canonicalPath: "/hypnose-confiance-en-soi-paris",
    h1: "Hypnose et confiance en soi — Révélez votre potentiel à Paris",
    jsonLd: [
      serviceLd(
        "Hypnose confiance en soi Paris",
        "Développez votre confiance en soi par l'hypnose à Paris 4ème. Syndrome de l'imposteur, prise de parole, estime de soi. Résultats en 3 à 5 séances.",
        `${SITE_URL}/hypnose-confiance-en-soi-paris`
      ),
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Confiance en soi", path: "/hypnose-confiance-en-soi-paris" },
      ]),
    ],
    content: `
    <p>Le syndrome de l'imposteur, la timidité, la peur du jugement — ce sont des <strong>programmes inconscients installés depuis l'enfance</strong>. Ces croyances limitantes se sont installées à un niveau profond que la volonté ne peut pas atteindre. L'hypnose accède directement à ces croyances profondes pour les transformer durablement.</p>

    <h2>Problématiques de confiance traitées en hypnose</h2>
    <ul>
      <li><strong>Syndrome de l'imposteur</strong> — Vous ne vous sentez jamais à la hauteur malgré vos succès réels</li>
      <li><strong>Peur de parler en public</strong> — Réunions, présentations, entretiens, trac paralysant</li>
      <li><strong>Timidité excessive</strong> — Difficulté à s'affirmer, à dire non, à prendre de la place</li>
      <li><strong>Perfectionnisme paralysant</strong> — La peur de mal faire qui empêche d'agir</li>
      <li><strong>Faible estime de soi</strong> — Un regard négatif et persistant sur vous-même</li>
      <li><strong>Peur du regard des autres</strong> — Le jugement qui vous inhibe dans vos choix</li>
      <li><strong>Estime de soi après une rupture ou un échec</strong> — Reconstruction de l'image de soi</li>
    </ul>

    <h2>Comment l'hypnose développe la confiance en soi</h2>
    <p>Vos croyances limitantes — « je ne suis pas assez bien », « je vais échouer », « je ne mérite pas » — sont ancrées dans votre inconscient depuis des années, souvent depuis l'enfance. La volonté seule ne suffit pas à les changer, car elles opèrent à un niveau plus profond que la pensée consciente. Il faut agir au même niveau où elles se sont installées.</p>
    <p>L'hypnose ericksonienne accède à ces programmations profondes pour les transformer. Contrairement aux affirmations positives qui superposent une couche artificielle, l'hypnose transforme les fondations elles-mêmes. Le résultat : vous vous sentez légitime dans vos réussites, naturellement, sans avoir à vous « convaincre ».</p>
    <p>J'installe également de nouvelles ressources durables : assurance naturelle, capacité à s'affirmer, sentiment légitime de compétence, aisance sociale.</p>

    <h2>Mon approche pour développer la confiance</h2>
    <p>Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème. Mon approche est personnalisée selon vos objectifs spécifiques et votre histoire. La prise de parole en public, le syndrome de l'imposteur, la timidité — chaque problématique de confiance a ses propres mécanismes que nous explorons ensemble lors de la première séance.</p>

    <h2>Exemples de parcours au cabinet</h2>
    <h3>Syndrome de l'imposteur</h3>
    <p>Camille*, directrice marketing, avait le sentiment permanent de ne pas mériter sa place malgré 15 ans de succès professionnels. Chaque réunion avec sa direction déclenchait une peur d'être démasquée. Elle minimisait systématiquement ses accomplissements. En 4 séances d'hypnose, nous avons identifié et transformé les croyances installées dans l'enfance. Camille assume désormais ses compétences avec assurance et a obtenu la promotion qu'elle n'osait pas demander.</p>
    <h3>Timidité sociale paralysante</h3>
    <p>Romain*, 30 ans, évitait toutes les situations sociales : dîners, fêtes, networking professionnel. Même en réunion d'équipe, il ne prenait jamais la parole de peur d'être jugé. En 3 séances d'hypnose ericksonienne, nous avons travaillé sur les expériences fondatrices de cette peur du jugement, puis ancré un état d'aisance sociale. Romain participe désormais activement aux réunions.</p>
    <h3>Estime de soi après une rupture</h3>
    <p>Inès*, 34 ans, avait perdu toute confiance en elle après une rupture difficile. Les paroles dévalorisantes de son ex continuaient à résonner dans sa tête. En 4 séances, nous avons neutralisé l'impact émotionnel de ces paroles toxiques et reconstruit une image de soi positive. Inès a retrouvé confiance en sa valeur.</p>
    <p><em>* Prénoms modifiés pour préserver la confidentialité</em></p>

    <blockquote><p>« Alain propose de véritables parcours de transformation conçus pour libérer l'esprit et dépasser les freins invisibles. J'ai laissé derrière moi certaines croyances figées et ouvert un espace intérieur plus souple, plus libre. »</p><cite>— Edward, avis Google vérifié</cite></blockquote>

    <h2>Résultats</h2>
    <ul>
      <li><strong>3 à 5 séances</strong> pour une transformation profonde et durable de la confiance en soi</li>
      <li><strong>100% personnalisé</strong> selon vos objectifs et votre histoire</li>
      <li><strong>Note 5/5</strong> sur plus de 40 avis vérifiés</li>
    </ul>

    <h2>Questions fréquentes sur l'hypnose et la confiance en soi</h2>
    <h3>L'hypnose peut-elle réellement augmenter la confiance en soi ?</h3>
    <p>Oui, l'hypnose est l'une des approches les plus efficaces pour développer la confiance en soi, car elle agit directement sur les croyances inconscientes qui sabotent votre estime personnelle. Ces croyances se sont installées à un niveau profond, et la volonté seule ne peut pas les modifier. L'hypnose ericksonienne accède à ces programmations pour les transformer.</p>
    <h3>Comment l'hypnose traite-t-elle le syndrome de l'imposteur ?</h3>
    <p>Le syndrome de l'imposteur repose sur une dissonance entre vos compétences réelles et l'image que vous avez de vous-même. L'hypnose traite ce décalage en identifiant les expériences fondatrices qui ont créé le doute (critique parentale, comparaison sociale) et en les retraitant. En état d'hypnose, votre inconscient intègre une perception plus juste de vos capacités.</p>
    <h3>Les résultats de l'hypnose sur la confiance en soi sont-ils durables ?</h3>
    <p>Oui, les résultats sont durables car l'hypnose modifie les croyances profondes, pas seulement les comportements de surface. Les patients constatent que les changements persistent et s'amplifient même avec le temps, car la confiance nouvellement acquise génère des expériences positives qui la renforcent.</p>

    <h2>Autres spécialités</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Burn-out, crises d'angoisse</li>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Hypnose et phobies</a> — Phobie avion, peur de parler en public</li>
      <li><a href="${SITE_URL}/hypnose-sommeil-paris">Hypnose et sommeil</a> — Insomnie, réveils nocturnes</li>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — Colère, hypersensibilité, deuil</li>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — Procrastination, TOC</li>
      <li><a href="${SITE_URL}/hypnose-professionnels-paris">Hypnose pour professionnels</a> — Stress au travail, affirmation de soi</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
      <li><a href="${SITE_URL}/blog">Blog hypnose</a> — Articles sur la confiance et l'hypnose</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance confiance en soi — 90€</a>
    `,
  },

  "/test-receptivite": {
    title: "Test de Réceptivité à l'Hypnose | NovaHypnose",
    description:
      "Évaluez votre réceptivité à l'hypnose avec notre test gratuit de 30 questions. Découvrez votre profil VAKOG et recevez des conseils personnalisés.",
    canonicalPath: "/test-receptivite",
    h1: "Test de Réceptivité à l'Hypnose — Découvrez votre profil",
    jsonLd: [
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Test de réceptivité", path: "/test-receptivite" },
      ]),
    ],
    content: `
    <p>Êtes-vous réceptif à l'hypnose ? Découvrez-le en quelques minutes avec notre <strong>test gratuit de 30 questions</strong>. Ce test évalue votre profil sensoriel VAKOG (Visuel, Auditif, Kinesthésique, Olfactif, Gustatif) et votre réceptivité à l'hypnose.</p>

    <h2>Comment fonctionne le test ?</h2>
    <ul>
      <li><strong>30 questions</strong> en 2 phases pour évaluer votre profil complet</li>
      <li><strong>Profil VAKOG</strong> — Identifiez votre sens dominant</li>
      <li><strong>Score de réceptivité</strong> — Évaluez votre potentiel hypnotique</li>
      <li><strong>Conseils personnalisés</strong> — Recevez des recommandations adaptées à votre profil</li>
    </ul>

    <h2>Tout le monde est-il réceptif à l'hypnose ?</h2>
    <p>Oui, à des degrés différents. 95% des personnes sont réceptives à l'hypnose ericksonienne. La réceptivité n'est pas une question de volonté ou d'intelligence — c'est une capacité naturelle que nous possédons tous. Ce test vous aide à identifier vos points forts pour maximiser l'efficacité de vos séances.</p>

    <a class="cta" href="${SITE_URL}/test-receptivite">Commencer le test gratuit</a>
    `,
  },

  "/autohypnose": {
    title: "Auto-hypnose et entraînement | NovaHypnose",
    description:
      "Découvrez l'auto-hypnose avec NovaHypnose. Quiz personnalisé, techniques guidées et exercices pratiques pour développer vos compétences en auto-hypnose.",
    canonicalPath: "/autohypnose",
    h1: "Auto-hypnose — Développez vos compétences",
    jsonLd: [
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Auto-hypnose", path: "/autohypnose" },
      ]),
    ],
    content: `
    <p>L'auto-hypnose est un outil puissant que vous pouvez utiliser au quotidien pour <strong>gérer le stress, améliorer votre sommeil et renforcer votre confiance</strong>. Apprenez les techniques d'auto-hypnose avec le quiz personnalisé NovaHypnose.</p>

    <h2>Qu'est-ce que l'auto-hypnose ?</h2>
    <p>L'auto-hypnose est la capacité de se mettre soi-même dans un état de relaxation profonde et de concentration focalisée. C'est une compétence naturelle que tout le monde peut développer avec de la pratique.</p>

    <h2>Les bénéfices de l'auto-hypnose</h2>
    <ul>
      <li><strong>Gestion du stress</strong> — Retrouvez le calme en quelques minutes</li>
      <li><strong>Amélioration du sommeil</strong> — Facilitez l'endormissement naturellement</li>
      <li><strong>Confiance en soi</strong> — Renforcez vos ressources intérieures</li>
      <li><strong>Gestion de la douleur</strong> — Techniques analgésiques naturelles</li>
      <li><strong>Performance</strong> — Préparez-vous mentalement pour vos défis</li>
    </ul>

    <h2>Quiz auto-hypnose personnalisé</h2>
    <p>Notre quiz vous guide vers les techniques d'auto-hypnose les plus adaptées à votre profil et vos objectifs. Répondez à quelques questions et recevez un programme personnalisé avec un code promo pour votre première séance.</p>

    <a class="cta" href="${SITE_URL}/autohypnose">Découvrir l'auto-hypnose</a>
    `,
  },

  "/zone-intervention": {
    title: "Zone d'intervention Paris | Cabinet Hypnose Bastille",
    description:
      "Cabinet d'hypnothérapie Paris 4ème, métro Bastille (lignes 1, 5, 8) à 2 min. Séances au cabinet 90€, à domicile 140€ ou en visio. Accessible depuis toute la région parisienne.",
    canonicalPath: "/zone-intervention",
    h1: "Zone d'Intervention — Cabinet d'Hypnothérapie à Paris",
    jsonLd: [
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Zone d'intervention", path: "/zone-intervention" },
      ]),
    ],
    content: `
    <p>Mon cabinet d'hypnothérapie situé au <strong>16 rue Saint-Antoine, Paris 4ème</strong>, est facilement accessible depuis tous les arrondissements parisiens grâce à son emplacement stratégique à <strong>Bastille</strong> (métro lignes 1, 5, 8).</p>

    <h2>Accès au cabinet</h2>
    <ul>
      <li><strong>Métro Bastille</strong> (Lignes 1, 5, 8) — 2 min à pied</li>
      <li><strong>Métro Saint-Paul</strong> (Ligne 1) — 5 min à pied</li>
      <li><strong>Bus</strong> — Lignes 69, 76, 86, 87, 91</li>
    </ul>

    <h2>Zones desservies</h2>
    <ul>
      <li><strong>Paris Centre</strong> (1er, 2ème, 3ème, 4ème) — 5-10 min</li>
      <li><strong>Paris Est</strong> (10ème, 11ème, 12ème) — 5-15 min</li>
      <li><strong>Paris Nord</strong> (18ème, 19ème, 20ème) — 15-25 min</li>
      <li><strong>Paris Sud</strong> (5ème, 13ème, 14ème) — 15-25 min</li>
      <li><strong>Paris Ouest</strong> (7ème, 8ème, 15ème, 16ème, 17ème) — 20-30 min</li>
    </ul>

    <h2>Tarifs</h2>
    <ul>
      <li>Séance au cabinet : <strong>90 €</strong></li>
      <li>Séance à domicile : <strong>140 €</strong> (Paris et proche banlieue)</li>
      <li>Séance en visio : <strong>90 €</strong></li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous</a>
    `,
  },

  "/hypnose-professionnels-paris": {
    title: "Hypnose stress au travail Paris | Alain Zenatti",
    description:
      "Accompagnement individuel en hypnose pour professionnels. Stress, burn-out, sommeil, émotions. Résultats en quelques semaines. Appel découverte gratuit. Cabinet Paris 4ème.",
    canonicalPath: "/hypnose-professionnels-paris",
    h1: "Vous tenez au travail. Mais à quel prix ?",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Accompagnement hypnose pour professionnels en souffrance au travail — Paris",
        description: "Accompagnement individuel en hypnose ericksonienne, auto-hypnose et communication relationnelle pour les salariés et professionnels en souffrance au travail. Stress, burn-out, sommeil, émotions, relations. Cabinet Paris 4ème.",
        url: `${SITE_URL}/hypnose-professionnels-paris`,
        provider: { "@type": "Person", name: "Alain Zenatti", url: SITE_URL },
        areaServed: { "@type": "City", name: "Paris" },
        serviceType: "Hypnothérapie — accompagnement professionnel",
      },
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Accompagnement professionnels", path: "/hypnose-professionnels-paris" },
      ]),
    ],
    content: `
    <p>Un accompagnement individuel qui combine <strong>hypnose ericksonienne, auto-hypnose et communication relationnelle</strong> pour vous aider à <strong>retrouver énergie, sommeil et sérénité</strong> — durablement.</p>

    <h2>Ce que vous vivez en ce moment</h2>
    <p>Que vous soyez cadre, manager, employé, indépendant ou responsable d'équipe, vous jonglez chaque jour avec une surcharge : objectifs élevés, délais serrés, pression de résultats, tensions relationnelles.</p>
    <ul>
      <li><strong>Épuisement mental</strong> — Impossible de « couper ». Vos pensées tournent en boucle, même au lit, sous la douche, en famille.</li>
      <li><strong>Fatigue persistante</strong> — Irritabilité, perte d'enthousiasme. L'épuisement ne passe plus, même le week-end.</li>
      <li><strong>Le corps parle</strong> — Oppression thoracique, mâchoire serrée, dos bloqué, sommeil perturbé.</li>
      <li><strong>Relations dégradées</strong> — Vous n'osez plus poser de limites, ou vous explosez. Au travail comme à la maison.</li>
      <li><strong>Tout essayé</strong> — Sport, méditation, coaching... ça aide un temps, puis le mécanisme se réenclenche.</li>
    </ul>

    <h2>Ce que vous souhaitez retrouver</h2>
    <p>Sortir du mode survie. Retrouver une énergie stable, dormir mieux, se réveiller plus clair et disponible. Poser des limites sans culpabilité. Améliorer vos relations au travail. Revenir à un mode plus aligné et plus respectueux de vous.</p>
    <ul>
      <li>Moins de stress, moins de tensions internes</li>
      <li>Un sommeil qui redevient réparateur</li>
      <li>Des émotions que vous traversez sans en être submergé</li>
      <li>Plus d'énergie, plus de clarté au quotidien</li>
      <li>Des relations plus apaisées — au travail comme à la maison</li>
      <li>Une posture professionnelle plus posée, plus juste pour vous</li>
    </ul>

    <h2>L'accompagnement — trois piliers complémentaires</h2>
    <p>Un accompagnement structuré, individuel, sur mesure — conçu pour les professionnels qui veulent des résultats concrets. En quelques semaines, vous passez du mode « tenir » au mode « avancer ».</p>
    <h3>Hypnose Ericksonienne</h3>
    <p>Apaiser le stress, améliorer le sommeil, alléger la charge mentale — en agissant là où la volonté seule ne suffit pas.</p>
    <h3>Auto-Hypnose</h3>
    <p>Des outils simples que vous utilisez au quotidien pour devenir autonome dans la gestion de votre stress et de vos émotions.</p>
    <h3>Communication Relationnelle (approche Jacques Salomé)</h3>
    <p>Oser dire, poser des limites, clarifier vos besoins — avec une méthode concrète et respectueuse.</p>
    <ul>
      <li>Séances individuelles, adaptées à votre réalité</li>
      <li>Un parcours structuré sur quelques semaines</li>
      <li>En présentiel (Paris 4e) ou en visio</li>
      <li>Des pratiques simples entre les séances (10-15 min/jour)</li>
      <li>Un suivi par messages si besoin entre les rendez-vous</li>
    </ul>

    <h2>Comment savoir si c'est fait pour vous ?</h2>
    <p>Un appel découverte gratuit, sans engagement. On fait le point sur votre situation, je vous explique comment l'accompagnement fonctionne, et on voit ensemble si c'est le bon chemin pour vous.</p>

    <h2>Pourquoi me faire confiance</h2>
    <p><strong>Alain Zenatti</strong>, Maître Praticien en Hypnose Ericksonienne et en Auto-Hypnose, Praticien en Communication Relationnelle (approche Jacques Salomé). Note 5/5 sur 40+ avis vérifiés. 90% des patients constatent une amélioration dès la première séance.</p>

    <a class="cta" href="https://calendly.com/zenatti/rdvtelephonique">Réserver un appel découverte gratuit</a>
    `,
  },
};

// ─── Main handler ──────────────────────────────────────────────────────────

export default async function handler(
  request: Request,
  context: Context
): Promise<Response> {
  // Only intercept for bots
  if (!isBot(request)) {
    return context.next();
  }

  const url = new URL(request.url);
  // Normalize: remove trailing slash except for "/"
  const pathname =
    url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");

  const pageData = PAGES[pathname];
  if (!pageData) {
    return context.next();
  }

  const html = htmlShell(pageData);
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
      "x-robots-tag": "index, follow",
    },
  });
}
