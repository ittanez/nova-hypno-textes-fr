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
  "siteauditbot",  // Semrush Site Audit (UA distinct de SemrushBot)
  "ahrefsbot",
  "mj12bot",
  "petalbot",
  "gptbot",
  "oai-searchbot",
  "chatgpt-user",   // fetcher temps réel ChatGPT (n'exécute pas le JS)
  "claudebot",      // crawler canonique Anthropic
  "claude-user",    // fetcher temps réel Claude
  "claude-searchbot",
  "claude-web",     // legacy Anthropic
  "perplexitybot",
  "perplexity-user", // fetcher temps réel Perplexity
  "meta-externalagent",
  "amazonbot",
  "bytespider",
  "duckassistbot",  // DuckDuckGo AI
  "mistralai-user", // Le Chat (Mistral)
  "cohere-ai",
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
  <meta name="msvalidate.01" content="802C8CF0910ACE394934676CB839E931">
  <meta name="google-site-verification" content="3VKz5JfNFaPVPQOGFV9iuTBzPZsQghbXpgb8vwiyjfM">
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
  "@id": `${SITE_URL}/#localbusiness`,
  name: "NovaHypnose - Hypnothérapeute Paris",
  description:
    "Cabinet d'hypnothérapie à Paris 4ème. Alain Zenatti, Maître Hypnologue certifié. Hypnose ericksonienne pour le stress, les phobies, le sommeil et la confiance en soi.",
  url: SITE_URL,
  telephone: "+33649358089",
  email: "contact@novahypnose.fr",
  image: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#primaryimage`,
    url: DEFAULT_IMAGE,
    width: 1200,
    height: 630,
    caption: "Alain Zenatti, Maître Hypnologue certifié — Cabinet NovaHypnose Paris 4ème",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "16 rue Saint-Antoine",
    addressLocality: "Paris",
    postalCode: "75004",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.85358,
    longitude: 2.36642,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "11:00",
      closes: "20:30",
    },
  ],
  priceRange: "€€",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    reviewCount: "23",
  },
  sameAs: ["https://maps.google.com/?cid=11956530853003446067"],
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Alain Zenatti",
  jobTitle: "Maître Hypnologue",
  url: SITE_URL,
  image: {
    "@type": "ImageObject",
    url: DEFAULT_IMAGE,
    width: 1200,
    height: 630,
    caption: "Portrait d'Alain Zenatti, hypnothérapeute à Paris",
  },
  telephone: "+33649358089",
  email: "contact@novahypnose.fr",
  worksFor: {
    "@id": `${SITE_URL}/#localbusiness`,
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
    "@id": `${url}#service`,
    name,
    description,
    url,
    provider: {
      "@id": `${SITE_URL}/#person`,
    },
    areaServed: [
      { "@type": "City", name: "Paris" },
      { "@type": "Country", name: "France" },
    ],
    offers: {
      "@type": "Offer",
      price: "90",
      priceCurrency: "EUR",
    },
  };
}

function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

// ─── Page Data ─────────────────────────────────────────────────────────────

const PAGES: Record<string, PageData> = {
  "/": {
    title: "Hypnothérapeute Paris 4 | Alain Zenatti - Hypnose",
    description:
      "Hypnothérapeute à Paris 4ème, cabinet Marais-Bastille. Alain Zenatti, Maître Hypnologue certifié. Stress, anxiété, phobies, sommeil. Résultats en 3 à 5 séances.",
    canonicalPath: "/",
    h1: "Hypnothérapeute à Paris — Alain Zenatti, hypnose ericksonienne et auto-hypnose",
    imageUrl: DEFAULT_IMAGE,
    jsonLd: [
      localBusinessLd,
      personLd,
      breadcrumbLd([{ name: "Accueil", path: "/" }]),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Hypnothérapeute Paris 4 | Alain Zenatti - Hypnose",
        dateModified: "2026-06-13",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
    content: `
    <p>Bienvenue au cabinet <strong>NovaHypnose</strong>, situé au cœur du Marais à Paris 4ème. <strong>Alain Zenatti</strong>, hypnothérapeute en hypnose ericksonienne et auto-hypnose, vous accompagne vers un changement profond et durable.</p>

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
    <p>Les séances suivantes durent environ 1h et permettent d'approfondir le travail thérapeutique. La plupart des clients constatent des améliorations significatives dès la première séance.</p>

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
      faqLd([
        {
          q: "Combien de séances d'hypnose pour traiter le stress et l'anxiété ?",
          a: "En général, 3 à 5 séances d'hypnose ericksonienne suffisent pour obtenir des résultats durables. Dès la première séance, la majorité des clients ressentent un soulagement significatif.",
        },
        {
          q: "L'hypnose est-elle efficace contre le burn-out ?",
          a: "Oui, l'hypnose est particulièrement efficace pour accompagner un burn-out. Elle agit à plusieurs niveaux : relâchement des tensions physiques accumulées, reprogrammation des mécanismes de surmenage, restauration de la capacité à poser des limites et retrouver de l'énergie.",
        },
        {
          q: "L'hypnose peut-elle aider en cas de crises d'angoisse ?",
          a: "Absolument. L'hypnose est l'une des approches les plus efficaces pour traiter les crises d'angoisse. Elle agit en deux temps : une technique d'auto-hypnose rapide pour stopper une crise, puis le travail en séance pour désactiver le mécanisme inconscient qui déclenche ces crises.",
        },
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
    <p>Lors de la première séance, nous identifions ensemble les déclencheurs de votre stress et je vous guide dans un état de profonde relaxation. La plupart de mes clients ressentent un soulagement significatif dès cette première rencontre.</p>

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
      <li><strong>90%</strong> de mes clients constatent une amélioration dès la première séance</li>
      <li><strong>3 à 5 séances</strong> suffisent en moyenne pour un résultat durable</li>
      <li><strong>Note 5/5</strong> sur plus de 40 avis vérifiés</li>
    </ul>

    <h2>Questions fréquentes sur l'hypnose et le stress</h2>
    <h3>Combien de séances d'hypnose pour traiter le stress et l'anxiété ?</h3>
    <p>En général, 3 à 5 séances d'hypnose ericksonienne suffisent pour obtenir des résultats durables. Dès la première séance, la majorité de mes clients ressentent un soulagement significatif. Le nombre exact dépend de l'ancienneté du stress, de son intensité et de votre réceptivité.</p>
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
      faqLd([
        {
          q: "Faut-il être exposé à sa phobie pendant la séance d'hypnose ?",
          a: "Non, c'est l'un des grands avantages de l'hypnose. Vous n'avez jamais besoin de vous confronter directement à l'objet de votre peur. L'hypnose ericksonienne travaille avec votre inconscient en utilisant des techniques dissociatives.",
        },
        {
          q: "La phobie peut-elle revenir après un traitement par hypnose ?",
          a: "Dans la grande majorité des cas, non. Quand l'hypnose modifie le programme inconscient à l'origine de la phobie, le changement est permanent. Il peut arriver, dans de rares cas, qu'un événement traumatique réactive une ancienne peur. Si cela se produit, une séance de renforcement suffit.",
        },
        {
          q: "L'hypnose traite-t-elle les phobies installées depuis l'enfance ?",
          a: "Oui, l'hypnose est même particulièrement efficace sur les phobies anciennes. Qu'une phobie soit installée depuis 5 ou 40 ans ne change pas fondamentalement le traitement : c'est toujours un programme inconscient qui maintient la peur.",
        },
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

        <h2>Chaque phobie a sa page dédiée</h2>
    <ul>
      <li><a href="${SITE_URL}/peurdelavion">Peur de l'avion</a> — Aérophobie, aviophobie</li>
      <li><a href="${SITE_URL}/hypnose-arachnophobie-paris">Arachnophobie</a> — Peur des araignées</li>
      <li><a href="${SITE_URL}/hypnose-acrophobie-paris">Acrophobie</a> — Peur du vide et des hauteurs</li>
      <li><a href="${SITE_URL}/hypnose-claustrophobie-paris">Claustrophobie</a> — Espaces clos, ascenseurs, IRM</li>
      <li><a href="${SITE_URL}/hypnose-peur-parler-public-paris">Peur de parler en public</a> — Glossophobie, trac</li>
      <li><a href="${SITE_URL}/hypnose-peur-dentiste-paris">Peur du dentiste</a> — Phobie dentaire</li>
      <li><a href="${SITE_URL}/hypnose-peur-aiguilles-paris">Peur des aiguilles</a> — Bélonéphobie, piqûres</li>
      <li><a href="${SITE_URL}/hypnose-peur-sang-paris">Peur du sang</a> — Hématophobie</li>
      <li><a href="${SITE_URL}/hypnose-aquaphobie-paris">Aquaphobie</a> — Peur de l'eau</li>
      <li><a href="${SITE_URL}/hypnose-amaxophobie-paris">Amaxophobie</a> — Peur de conduire</li>
      <li><a href="${SITE_URL}/hypnose-phobie-sociale-paris">Phobie sociale</a> — Anxiété sociale</li>
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
      faqLd([
        {
          q: "L'auto-hypnose peut-elle aider à s'endormir chaque soir ?",
          a: "Oui, c'est même l'un des outils les plus puissants transmis aux clients. Une technique d'auto-hypnose spécialement conçue pour l'endormissement peut être pratiquée chaque soir en quelques minutes pour induire un état de relaxation profonde.",
        },
        {
          q: "L'hypnose peut-elle remplacer les somnifères ?",
          a: "L'hypnose est une alternative naturelle aux somnifères, mais le sevrage de médicaments doit toujours se faire en accord avec votre médecin. L'hypnose restaure les mécanismes naturels du sommeil sans créer de dépendance.",
        },
        {
          q: "L'hypnose fonctionne-t-elle pour les réveils nocturnes à 3h ou 4h du matin ?",
          a: "Oui, les réveils nocturnes sont une problématique que l'hypnose traite très bien. Ces réveils sont souvent liés à un mécanisme d'hyper-vigilance inconscient. L'hypnose identifie la cause spécifique et reprogramme votre cycle de sommeil.",
        },
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
    <p>Oui, c'est même l'un des outils les plus puissants que je transmets à mes clients. Je vous enseigne une technique d'auto-hypnose spécialement conçue pour l'endormissement, que vous pouvez pratiquer chaque soir en quelques minutes. Cette technique induit un état de relaxation profonde qui facilite la transition naturelle vers le sommeil.</p>
    <h3>L'hypnose peut-elle remplacer les somnifères ?</h3>
    <p>L'hypnose est une alternative naturelle aux somnifères, mais le sevrage de médicaments doit toujours se faire en accord avec votre médecin. L'hypnose restaure les mécanismes naturels du sommeil sans créer de dépendance. Beaucoup de mes clients réduisent progressivement leurs somnifères au fil des séances.</p>
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

  "/hypnose-arret-tabac-paris": {
    title: "Hypnose arrêt du tabac à Paris et en ligne | Alain Zenatti",
    description:
      "Arrêtez de fumer par l'hypnose à Paris 4ème ou en visio partout en France. L'hypnose ericksonienne neutralise les automatismes liés à la cigarette en 1 à 3 séances. Alain Zenatti, Maître Praticien.",
    canonicalPath: "/hypnose-arret-tabac-paris",
    h1: "Libérez-vous de la cigarette durablement",
    jsonLd: [
      serviceLd(
        "Hypnose arrêt du tabac Paris",
        "Arrêtez de fumer par l'hypnose ericksonienne à Paris 4ème. En 1 à 3 séances, sans substitut nicotinique, au cabinet ou en visio partout en France.",
        `${SITE_URL}/hypnose-arret-tabac-paris`
      ),
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Spécialités", path: "/#specialites" },
        { name: "Arrêt du tabac", path: "/hypnose-arret-tabac-paris" },
      ]),
      faqLd([
        {
          q: "Combien de séances sont nécessaires pour arrêter de fumer ?",
          a: "Pour l'arrêt du tabac, une à trois séances suffisent dans la majorité des cas. La première séance est souvent la plus transformatrice : elle neutralise les déclencheurs automatiques les plus forts et installe une nouvelle relation à la cigarette.",
        },
        {
          q: "L'hypnose fonctionne-t-elle aussi pour la cigarette électronique ?",
          a: "Oui, l'hypnose est tout aussi efficace pour arrêter la vape que la cigarette traditionnelle. La dépendance à la cigarette électronique est d'abord comportementale et psychologique, et l'hypnose travaille directement sur ces automatismes.",
        },
        {
          q: "Peut-on risquer de prendre du poids après l'arrêt du tabac ?",
          a: "La prise de poids n'est pas une fatalité. Lors des séances, nous travaillons précisément sur ce risque : neutraliser les compulsions alimentaires compensatoires et renforcer votre capacité à gérer le stress sans substitution.",
        },
      ]),
    ],
    content: `
    <p>Le tabac ne crée pas seulement une dépendance physique à la nicotine. Il s'inscrit dans des rituels profondément ancrés : le café du matin, la pause au travail, le stress d'une réunion, la fin d'un repas. Ces associations fonctionnent comme des <strong>automatismes indépendants de la volonté</strong>. L'hypnose ericksonienne agit directement sur ces mécanismes inconscients.</p>

    <h2>Pourquoi les substituts nicotiniques échouent souvent</h2>
    <p>Les patchs, gommes et cigarettes électroniques traitent la dépendance physique à la nicotine, mais laissent intacts les réflexes comportementaux et émotionnels qui maintiennent le tabagisme. C'est pourquoi beaucoup de fumeurs rechutent malgré un sevrage nicotinique réussi.</p>

    <h2>Ce que l'hypnose traite</h2>
    <ul>
      <li><strong>Les déclencheurs automatiques</strong> — café, repas, stress, téléphone</li>
      <li><strong>Les associations plaisir / geste</strong> — le rituel sensoriel lié à la cigarette</li>
      <li><strong>Le manque psychologique</strong> — l'impression d'un vide à combler</li>
      <li><strong>Le stress et l'anxiété compensatoires</strong> — la cigarette comme calmant</li>
      <li><strong>Les compensations alimentaires</strong> — prévenir la prise de poids</li>
    </ul>

    <h2>Mon approche pour l'arrêt du tabac</h2>
    <p>Je suis <strong>Alain Zenatti, Maître Praticien en Hypnose Ericksonienne</strong> à Paris 4ème. Ma pratique de l'arrêt du tabac combine des techniques d'hypnose ericksonienne classiques avec des suggestions adaptées à votre profil de fumeur : durée de la dépendance, rituels spécifiques, déclencheurs émotionnels. Chaque séance est entièrement personnalisée.</p>

    <h2>Comment se passe une séance d'arrêt du tabac ?</h2>
    <p>La séance dure environ 1h15 à 1h30, au cabinet à Paris ou en visio. Elle se déroule en deux temps complémentaires.</p>
    <h3>Temps 1 — Comprendre votre relation au tabac</h3>
    <p>La première partie est un échange approfondi pour explorer vos rituels spécifiques, les déclencheurs de l'envie de fumer, et ce que la cigarette représente pour vous. Ce travail permet d'adapter précisément le travail hypnotique qui suit.</p>
    <h3>Temps 2 — Le travail en hypnose</h3>
    <p>La seconde partie se déroule en état d'hypnose. Nous travaillons sur les automatismes liés à la cigarette et sur les associations que votre cerveau a construites entre certaines situations et l'envie de fumer. L'objectif est de rendre l'arrêt fluide et stable, en visio comme au cabinet.</p>

    <h2>Exemples de parcours au cabinet</h2>
    <h3>Fumeur depuis 20 ans, un paquet par jour</h3>
    <p>Christophe*, 48 ans, fumait depuis l'adolescence. Il avait essayé les patchs, les gommes, même une première tentative d'hypnose ailleurs, sans résultat durable. En une séance au cabinet à Paris, nous avons neutralisé les rituels les plus ancrés — la cigarette du café, la pause déjeuner, le trajet retour. Depuis 4 mois, il n'a plus touché une cigarette.</p>
    <h3>Arrêt de la cigarette électronique</h3>
    <p>Julie*, 34 ans, avait arrêté la cigarette grâce à la vape — mais les préoccupations avaient simplement changé de forme : « est-ce que ma batterie est chargée ? », « est-ce que j'ai assez de liquide ? ». La dépendance, elle, était restée intacte. Une séance a suffi à lui permettre de se libérer du besoin constant de vapoter.</p>
    <h3>Séance en ligne depuis la province</h3>
    <p>Marc*, installé à Lyon, avait des doutes sur l'efficacité d'une séance d'hypnose à distance. Résultat identique à une séance en cabinet, depuis son salon, en moins de deux heures.</p>
    <p><em>* Prénoms modifiés pour préserver la confidentialité</em></p>

    <blockquote><p>« J'avais fumé pendant 15 ans. Après une séance avec Alain, je n'ai plus eu envie de cigarettes. Pas de manque, pas d'irritabilité — juste une liberté retrouvée. »</p><cite>— Sophie R., avis Google vérifié</cite></blockquote>

    <h2>Résultats</h2>
    <ul>
      <li><strong>1 à 3 séances</strong> en moyenne pour arrêter de fumer durablement</li>
      <li><strong>0 substitut nicotinique</strong> nécessaire — une libération naturelle</li>
      <li><strong>Note 5/5</strong> sur avis vérifiés cabinet et visio</li>
    </ul>

    <h2>Préparez votre arrêt du tabac</h2>
    <ul>
      <li><strong>Fixez une date</strong> — votre rendez-vous est votre point de départ. Il n'existe pas de moment parfait.</li>
      <li><strong>Prévenez vos proches</strong> — annoncer que vous arrêtez crée un engagement positif.</li>
      <li><strong>Fumez votre dernière cigarette avant la séance</strong> — puis jetez votre paquet. Ne gardez pas de cigarettes « au cas où ».</li>
      <li><strong>Prévoyez 1h30 libres</strong> — sans obligation juste après, pour laisser le travail s'installer.</li>
      <li><strong>Après la séance, félicitez-vous</strong> — vous avez enclenché un vrai changement.</li>
    </ul>

    <h2>Questions fréquentes sur l'hypnose et le tabac</h2>
    <h3>Combien de séances sont nécessaires pour arrêter de fumer ?</h3>
    <p>Pour l'arrêt du tabac, une à trois séances suffisent dans la majorité des cas. La première séance est souvent la plus transformatrice : elle neutralise les déclencheurs automatiques les plus forts et installe une nouvelle relation à la cigarette.</p>
    <h3>L'hypnose fonctionne-t-elle aussi pour la cigarette électronique ?</h3>
    <p>Oui, l'hypnose est tout aussi efficace pour arrêter la vape que la cigarette traditionnelle. La dépendance à la cigarette électronique est d'abord comportementale et psychologique, et l'hypnose travaille directement sur ces automatismes.</p>
    <h3>Peut-on risquer de prendre du poids après l'arrêt du tabac ?</h3>
    <p>La prise de poids n'est pas une fatalité. Lors des séances, nous travaillons précisément sur ce risque : neutraliser les compulsions alimentaires compensatoires et renforcer votre capacité à gérer le stress sans substitution.</p>

    <h2>Autres spécialités</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Burn-out, crises d'angoisse</li>
      <li><a href="${SITE_URL}/hypnose-sommeil-paris">Hypnose et sommeil</a> — Insomnie, réveils nocturnes</li>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Hypnose et phobies</a> — Phobie avion, claustrophobie</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Syndrome de l'imposteur</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
      <li><a href="${SITE_URL}/blog">Blog hypnose</a> — Articles sur le tabac et l'hypnose</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance arrêt tabac — 90€</a>
    `,
  },

  "/hypnose-gestion-emotions-paris": {
    title: "Hypnose gestion des émotions Paris | Alain Zenatti",
    description:
      "Gérez vos émotions par l'hypnose à Paris 4ème. Colère, hypersensibilité, deuil, frustration. Alain Zenatti, Maître Hypnologue. Résultats en 3 à 5 séances.",
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
      faqLd([
        {
          q: "L'hypnose supprime-t-elle les émotions ?",
          a: "Non, absolument pas. Les émotions sont essentielles et font partie de votre richesse intérieure. Ce que l'hypnose modifie, c'est l'intensité disproportionnée de certaines réactions émotionnelles et les automatismes qui vous submergent.",
        },
        {
          q: "L'hypnose est-elle adaptée aux personnes hypersensibles ?",
          a: "L'hypnose est particulièrement bien adaptée aux personnes hypersensibles, qui sont d'ailleurs souvent très réceptives à l'approche ericksonienne. L'hypnose vous aide à mettre en place des filtres naturels pour ne plus être submergé tout en conservant votre profondeur.",
        },
        {
          q: "L'hypnose peut-elle aider à surmonter un deuil ?",
          a: "Oui, l'hypnose est un accompagnement précieux dans le processus de deuil. Elle ne cherche pas à effacer la tristesse, mais à débloquer les mécanismes qui empêchent le deuil de suivre son cours naturel : culpabilité, colère non exprimée, sentiment d'inachevé.",
        },
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

        <h2>Chaque problématique émotionnelle a sa page dédiée</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-troubles-emotionnels-paris">Troubles émotionnels — vue d'ensemble</a></li>
      <li><a href="${SITE_URL}/hypnose-colere-paris">Colère et irritabilité</a> — Explosions, réactions disproportionnées</li>
      <li><a href="${SITE_URL}/hypnose-hypersensibilite-paris">Hypersensibilité</a> — Émotions amplifiées, surcharge sensorielle</li>
      <li><a href="${SITE_URL}/hypnose-deuil-paris">Deuil et séparation</a> — Perte, rupture</li>
      <li><a href="${SITE_URL}/hypnose-traumatismes-paris">Traumatismes psychologiques</a> — Choc, accident, agression</li>
      <li><a href="${SITE_URL}/hypnose-frustration-paris">Frustration chronique</a> — Insatisfaction permanente</li>
      <li><a href="${SITE_URL}/hypnose-anxiete-emotionnelle-paris">Anxiété émotionnelle</a> — Peur de craquer, contrôle excessif</li>
      <li><a href="${SITE_URL}/hypnose-charge-emotionnelle-paris">Charge émotionnelle</a> — Saturation, épuisement</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance gestion des émotions — 90€</a>
    `,
  },

  "/hypnose-blocages-paris": {
    title: "Hypnose blocages et comportements Paris | Zenatti",
    description:
      "Libérez vos blocages par l'hypnose à Paris 4ème. Procrastination, schémas répétitifs, TOC, addictions. Alain Zenatti, Maître Hypnologue. 3 à 5 séances.",
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
      faqLd([
        {
          q: "L'hypnose peut-elle aider à arrêter la procrastination ?",
          a: "Oui, l'hypnose est très efficace contre la procrastination car elle traite la cause, pas le symptôme. La procrastination n'est pas un manque de volonté : c'est un mécanisme de protection inconscient, souvent lié à la peur de l'échec ou au perfectionnisme.",
        },
        {
          q: "L'hypnose peut-elle briser les schémas répétitifs en amour ou au travail ?",
          a: "C'est même l'une de ses applications les plus puissantes. Les schémas répétitifs sont maintenus par des programmes inconscients souvent liés à l'enfance. L'hypnose identifie le schéma, remonte à son origine et reprogramme la réponse inconsciente.",
        },
        {
          q: "Peut-on traiter plusieurs blocages comportementaux en même temps ?",
          a: "Oui, et c'est même souvent ce qui se passe naturellement. Beaucoup de blocages partagent une racine commune : anxiété, manque de confiance, besoin de contrôle. En traitant cette racine, plusieurs comportements s'améliorent simultanément.",
        },
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
    <p>C'est même l'une de ses applications les plus puissantes. Les schémas répétitifs sont maintenus par des programmes inconscients souvent liés à l'enfance. L'hypnose identifie le schéma, remonte à son origine et reprogramme la réponse inconsciente. Mes clients sont souvent surpris de constater qu'après quelques séances, ils font naturellement des choix différents.</p>
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

        <h2>Chaque blocage ou comportement a sa page dédiée</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-procrastination-paris">Procrastination</a> — Blocage à l'action, peur de l'échec</li>
      <li><a href="${SITE_URL}/hypnose-onychophagie-paris">Onychophagie</a> — Arrêter de se ronger les ongles</li>
      <li><a href="${SITE_URL}/hypnose-toc-rituels-paris">TOC et rituels compulsifs</a> — Vérifications, trichotillomanie</li>
      <li><a href="${SITE_URL}/hypnose-schemas-repetitifs-paris">Schémas répétitifs</a> — Cycles en amour et au travail</li>
      <li><a href="${SITE_URL}/hypnose-blocages-professionnels-paris">Blocages professionnels</a> — Auto-sabotage, syndrome de l'imposteur</li>
      <li><a href="${SITE_URL}/hypnose-addictions-comportementales-paris">Addictions comportementales</a> — Écrans, jeux, achats compulsifs</li>
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
      faqLd([
        {
          q: "L'hypnose peut-elle réellement augmenter la confiance en soi ?",
          a: "Oui, l'hypnose est l'une des approches les plus efficaces pour développer la confiance en soi, car elle agit directement sur les croyances inconscientes qui sabotent votre estime personnelle.",
        },
        {
          q: "Comment l'hypnose traite-t-elle le syndrome de l'imposteur ?",
          a: "Le syndrome de l'imposteur repose sur une dissonance entre vos compétences réelles et l'image que vous avez de vous-même. L'hypnose traite ce décalage en identifiant les expériences fondatrices qui ont créé le doute et en les retraitant.",
        },
        {
          q: "Les résultats de l'hypnose sur la confiance en soi sont-ils durables ?",
          a: "Oui, les résultats sont durables car l'hypnose modifie les croyances profondes, pas seulement les comportements de surface. Les clients constatent que les changements persistent et s'amplifient même avec le temps.",
        },
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
    <p>Oui, les résultats sont durables car l'hypnose modifie les croyances profondes, pas seulement les comportements de surface. Les clients constatent que les changements persistent et s'amplifient même avec le temps, car la confiance nouvellement acquise génère des expériences positives qui la renforcent.</p>

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

  "/test-receptivite-archive": {
    title: "Test de Réceptivité à l'Hypnose (Archive) | NovaHypnose",
    description:
      "Version archivée du test de réceptivité à l'hypnose. Veuillez accéder à la version actuelle.",
    canonicalPath: "/test-receptivite-archive",
    h1: "Test de Réceptivité à l'Hypnose (Archive)",
    jsonLd: [
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Test de réceptivité (Archive)", path: "/test-receptivite-archive" },
      ]),
    ],
    content: `
    <p>Cette page est une version archivée. Veuillez accéder à la <a href="${SITE_URL}/test-receptivite">version actuelle du test de réceptivité</a>.</p>
    `,
  },

  "/autohypnose": {
    title: "Auto-hypnose à Paris — Formation & accompagnement | NovaHypnose",
    description:
      "Apprenez l'auto-hypnose avec Alain Zenatti à Paris : formation en groupe (1 journée, max 6, 240 €), accompagnement individuel et formations en entreprise sur devis. Gérez stress, sommeil et émotions en autonomie.",
    canonicalPath: "/autohypnose",
    h1: "Auto-hypnose — Devenir acteur de votre changement.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${SITE_URL}/autohypnose#service`,
        "name": "Formation Auto-hypnose Paris — NovaHypnose",
        "description": "Formation à l'auto-hypnose en groupe (1 journée, max 6 participants) et accompagnement individuel à Paris. Apprenez à reproduire les états de ressource de vos séances d'hypnose.",
        "url": `${SITE_URL}/autohypnose`,
        "provider": {
          "@type": "Person",
          "name": "Alain Zenatti",
          "@id": `${SITE_URL}/#person`
        },
        "areaServed": { "@type": "City", "name": "Paris" },
        "serviceType": "Formation auto-hypnose",
        "offers": [
          {
            "@type": "Offer",
            "name": "Formation groupe 1 journée",
            "price": "240",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/LimitedAvailability",
            "description": "Formation auto-hypnose 1 journée, groupe max 6 participants, Paris Bastille"
          },
          {
            "@type": "Offer",
            "name": "Accompagnement individuel",
            "price": "90",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
          }
        ]
      },
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Auto-hypnose", path: "/autohypnose" },
      ]),
    ],
    content: `
    <p>L'auto-hypnose n'est pas une technique ésotérique. C'est l'usage volontaire d'un état naturel — celui où l'on est absorbé dans un livre, perdu dans ses pensées au volant sur une route familière, ou bercé par une musique. Apprendre à y entrer par soi-même, c'est apprendre à <strong>rappeler votre calme en quelques minutes</strong>, sans rien attendre de l'extérieur.</p>

    <h2>La Formation (groupe)</h2>
    <p>Une journée pour apprendre à rappeler, seul·e, ce que vous vivez en séance.</p>
    <ul>
      <li><strong>Format</strong> — 1 journée · max 6 participants</li>
      <li><strong>Lieu</strong> — Paris · Bastille (16 rue Saint-Antoine, 75004)</li>
      <li><strong>Tarif</strong> — 240 €</li>
      <li><strong>Inclus</strong> — fascicule, enregistrements audio, suivi à 1 mois</li>
    </ul>

    <h2>Accompagnement individuel</h2>
    <p>Un travail sur-mesure, intégré à vos séances d'hypnose ericksonienne. Idéal pour aller plus loin et prolonger entre deux rendez-vous ce qui s'est ouvert en séance. 90 € la séance.</p>

    <h2>Formations en entreprise</h2>
    <p>Interventions sur-mesure pour les équipes : gestion du stress, amélioration du sommeil, renforcement de la concentration. Sur devis selon les besoins.</p>

    <h2>Les bénéfices de l'auto-hypnose</h2>
    <ul>
      <li><strong>Retrouver un état apaisé</strong> — Le calme apprivoisé en séance, vous le rappelez en quelques minutes</li>
      <li><strong>Vos propres ancres</strong> — Un signal personnel qui ramène l'état ressource d'un seul rappel</li>
      <li><strong>Prolonger entre deux rendez-vous</strong> — Faire vivre dans la semaine ce qui s'est ouvert pendant la séance</li>
      <li><strong>Un rituel du soir, à vous</strong> — Pour laisser le mental se déposer et basculer dans la nuit</li>
    </ul>

    <a class="cta" href="${SITE_URL}/autohypnose">Rejoindre la liste d'attente</a>
    `,
  },

  "/zone-intervention": {
    title: "Hypnothérapeute Paris 4 · Bastille & Visio France | NovaHypnose",
    description:
      "Hypnothérapeute Paris 4e, Marais-Bastille (métro Bastille 2 min). Séances cabinet 90€, à domicile 140€, visio partout en France 90€. Alain Zenatti, Maître Hypnologue.",
    canonicalPath: "/zone-intervention",
    h1: "Hypnothérapeute Paris 4e — Marais · Bastille & Visio France",
    jsonLd: [
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Zone d'intervention", path: "/zone-intervention" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": ["HealthAndBeautyBusiness", "MedicalBusiness"],
        "@id": `${SITE_URL}/#localbusiness`,
        "name": "NovaHypnose — Alain Zenatti, hypnothérapeute Paris 4",
        "url": SITE_URL,
        "image": DEFAULT_IMAGE,
        "priceRange": "90€–140€",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "16 rue Saint-Antoine",
          "addressLocality": "Paris",
          "postalCode": "75004",
          "addressCountry": "FR"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 48.85358, "longitude": 2.36642 },
        "areaServed": [
          { "@type": "City", "name": "Paris" },
          { "@type": "Country", "name": "France" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "23",
          "bestRating": "5"
        }
      }
    ],
    content: `
    <p>Installé dans le <strong>4e arrondissement de Paris</strong>, au cœur du quartier Marais-Bastille, le cabinet NovaHypnose est votre référence en <strong>hypnothérapie Paris 4</strong>. À deux pas du métro Bastille (lignes 1, 5, 8) et de Saint-Paul (ligne 1), le cabinet est accessible en moins de 10 minutes depuis la majorité des arrondissements parisiens.</p>

    <p>Alain Zenatti, <strong>hypnothérapeute Bastille</strong> et Maître Hypnologue certifié, accompagne ses clients dans un cadre confidentiel et bienveillant. Le cabinet d'<strong>hypnose Marais</strong> propose des séances individuelles pour le stress, l'anxiété, les phobies, les troubles du sommeil, la gestion des émotions et la confiance en soi — des résultats durables, généralement en 3 à 5 séances.</p>

    <h2>Accès au cabinet Paris 4e</h2>
    <ul>
      <li><strong>Métro Bastille</strong> (Lignes 1, 5, 8) — 2 min à pied</li>
      <li><strong>Métro Saint-Paul</strong> (Ligne 1) — 5 min à pied</li>
      <li><strong>Bus</strong> — Lignes 69, 76, 86, 87, 91</li>
      <li>Adresse : 16 rue Saint-Antoine, Paris 75004</li>
    </ul>

    <h2>Zones desservies depuis le cabinet Paris 4</h2>
    <ul>
      <li><strong>Paris Centre</strong> (1er, 2ème, 3ème, 4ème — Marais, Bastille, Châtelet) — 5-10 min</li>
      <li><strong>Paris Est</strong> (10ème, 11ème, 12ème — Oberkampf, Nation, Bercy) — 5-15 min</li>
      <li><strong>Paris Nord</strong> (18ème, 19ème, 20ème — Belleville, Père Lachaise) — 15-25 min</li>
      <li><strong>Paris Sud</strong> (5ème, 13ème, 14ème — Quartier Latin, Montparnasse) — 15-25 min</li>
      <li><strong>Paris Ouest</strong> (7ème, 8ème, 15ème, 16ème, 17ème) — 20-30 min</li>
    </ul>

    <h2>Séances en visio partout en France</h2>
    <p>Vous ne pouvez pas vous déplacer à Paris ? Les <strong>séances d'hypnose en visio partout en France</strong> offrent la même qualité d'accompagnement qu'en présentiel — depuis votre domicile, votre bureau ou tout lieu calme avec une connexion internet. Idéal pour les clients en province, à l'étranger, ou qui préfèrent la flexibilité de la téléconsultation.</p>

    <h2>Tarifs</h2>
    <ul>
      <li>Séance au cabinet (Paris 4e) : <strong>90 €</strong></li>
      <li>Séance à domicile : <strong>140 €</strong> (Paris et proche banlieue)</li>
      <li>Séance en visio (France entière) : <strong>90 €</strong></li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous</a>
    `,
  },

  "/hypnose-professionnels-paris": {
    title: "Hypnose stress au travail Paris | Alain Zenatti",
    description:
      "Hypnose pour professionnels. Stress, burn-out, sommeil, émotions. Résultats en quelques semaines. Appel découverte gratuit. Cabinet Paris 4ème.",
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
    <p><strong>Alain Zenatti</strong>, Maître Praticien en Hypnose Ericksonienne et en Auto-Hypnose, Praticien en Communication Relationnelle (approche Jacques Salomé). Note 5/5 sur 40+ avis vérifiés. 90% des clients constatent une amélioration dès la première séance.</p>

    <a class="cta" href="https://calendly.com/zenatti/rdvtelephonique">Réserver un appel découverte gratuit</a>
    `,
  },

  "/alain-zenatti": {
    title: "Alain Zenatti - Maître Hypnologue à Paris | NovaHypnose",
    description:
      "Alain Zenatti, Maître Hypnologue certifié à Paris 4ème. Hypnose ericksonienne, 5+ ans d'expérience, auteur de nombreux articles sur l'hypnothérapie. Stress, anxiété, phobies, sommeil.",
    canonicalPath: "/alain-zenatti",
    h1: "Alain Zenatti — Maître Hypnologue",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        "name": "Alain Zenatti",
        "jobTitle": "Maître Hypnologue",
        "description": "Maître Hypnologue certifié, praticien en hypnose ericksonienne et auto-hypnose. Cabinet à Paris 4ème (Marais-Bastille) et séances en visioconférence.",
        "url": `${SITE_URL}/alain-zenatti`,
        "image": DEFAULT_IMAGE,
        "worksFor": { "@type": "Organization", "name": "NovaHypnose", "@id": `${SITE_URL}/#localbusiness` },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "16 rue Saint-Antoine",
          "addressLocality": "Paris",
          "postalCode": "75004",
          "addressCountry": "FR"
        },
        "sameAs": [
          "https://www.instagram.com/novahypnose/",
          "https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
        ]
      },
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Alain Zenatti", path: "/alain-zenatti" },
      ]),
    ],
    content: `
    <p>Alain Zenatti est <strong>Maître Hypnologue certifié</strong>, praticien en hypnose ericksonienne et en auto-hypnose depuis 2021. Son cabinet est situé au <strong>16 rue Saint-Antoine, Paris 4ème</strong> (Marais-Bastille), et il propose également des séances en visioconférence partout en France.</p>

    <h2>Formations et certifications</h2>
    <ul>
      <li><strong>Maître Hypnologue</strong> — École Psynapse (2025)</li>
      <li><strong>Maître Praticien Hypnose Ericksonienne</strong> — École Psynapse (2023)</li>
      <li><strong>Hypnose Ericksonienne</strong> — École Psynapse (2021)</li>
      <li><strong>Hypnose Spirituelle</strong> — École Psynapse (2023)</li>
      <li><strong>Hypnose Directive & Hyperemperia</strong> — Formation Continue (2025)</li>
      <li><strong>Formation PNL & Neurosciences</strong> — Instituts spécialisés (2022-2024)</li>
    </ul>

    <h2>Domaines d'intervention</h2>
    <ul>
      <li>Stress chronique et anxiété</li>
      <li>Troubles du sommeil et insomnies</li>
      <li>Phobies et peurs spécifiques</li>
      <li>Gestion des émotions</li>
      <li>Confiance en soi et estime de soi</li>
      <li>Blocages et comportements indésirables</li>
      <li>Formation à l'auto-hypnose</li>
    </ul>

    <h2>Approche thérapeutique</h2>
    <p>Alain Zenatti pratique l'hypnose ericksonienne, une approche douce et respectueuse qui utilise des suggestions indirectes et la métaphore pour accéder aux ressources intérieures. Les résultats sont généralement observés en <strong>3 à 5 séances</strong>.</p>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous</a>
    `,
  },

  "/hypnose-troubles-alimentaires-paris": {
    title: "Hypnose troubles alimentaires Paris | Rapport au corps | Alain Zenatti",
    description:
      "Retrouvez un rapport apaisé à la nourriture grâce à l'hypnose à Paris 4ème. Compulsions, restriction, relation difficile à l'alimentation. Alain Zenatti, Maître Hypnologue. 90 €.",
    canonicalPath: "/hypnose-troubles-alimentaires-paris",
    h1: "Hypnose et rapport au corps — Retrouvez une relation apaisée à la nourriture",
    jsonLd: [
      serviceLd(
        "Hypnose troubles alimentaires et rapport au corps Paris",
        "Accompagnement par hypnose ericksonienne pour retrouver un rapport apaisé à la nourriture et au corps à Paris 4ème. Compulsions alimentaires, restriction, émotions et alimentation.",
        `${SITE_URL}/hypnose-troubles-alimentaires-paris`
      ),
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Rapport au corps", path: "/hypnose-troubles-alimentaires-paris" },
      ]),
      faqLd([
        {
          q: "L'hypnose peut-elle aider les compulsions alimentaires liées au stress ?",
          a: "Oui. Les compulsions alimentaires sont très souvent un mécanisme de régulation émotionnelle installé par l'inconscient — une réponse au stress, à l'anxiété ou à l'ennui. L'hypnose agit à la source en modifiant ce mécanisme de compensation.",
        },
        {
          q: "Combien de séances sont nécessaires pour retrouver un rapport apaisé à la nourriture ?",
          a: "En général, 4 à 6 séances permettent d'obtenir des changements durables sur le rapport à la nourriture. Le nombre varie selon la complexité de la situation, l'ancienneté des difficultés et la réceptivité.",
        },
        {
          q: "L'hypnose remplace-t-elle un suivi médical ou nutritionnel ?",
          a: "Non. L'hypnose est un accompagnement complémentaire à un suivi médical ou nutritionnel, pas un substitut. Elle agit sur la dimension psychologique et émotionnelle du rapport au corps.",
        },
      ]),
    ],
    content: `
    <p>La relation à la nourriture n'est jamais uniquement une question de volonté. Derrière les compulsions, les restrictions ou les émotions qui envahissent les repas, il y a <strong>des mécanismes inconscients profonds</strong> que l'hypnose ericksonienne peut modifier durablement.</p>

    <h2>Situations accompagnées en hypnose</h2>
    <ul>
      <li><strong>Compulsions alimentaires</strong> — Grignotages compulsifs, envies irrépressibles, manger en réponse au stress</li>
      <li><strong>Relation difficile au corps</strong> — Image corporelle négative, rapport douloureux au miroir</li>
      <li><strong>Alimentation émotionnelle</strong> — Manger pour combler une émotion, ennui, tristesse, anxiété</li>
      <li><strong>Restriction et contrôle excessif</strong> — Rigidité alimentaire, culpabilité après les repas</li>
      <li><strong>Peur de certains aliments</strong> — Néophobie, restrictions liées à l'anxiété</li>
      <li><strong>Préparation à une démarche médicale</strong> — Accompagnement complémentaire d'un suivi nutritionnel ou médical</li>
    </ul>

    <h2>Comment l'hypnose agit sur le rapport au corps</h2>
    <p>L'hypnose ericksonienne travaille avec l'inconscient pour <strong>identifier et modifier les croyances et automatismes</strong> qui gouvernent le comportement alimentaire. Elle ne cherche pas à contrôler la nourriture, mais à transformer la relation intérieure qui génère les comportements difficiles.</p>
    <p>En état hypnotique, votre cerveau devient particulièrement réceptif à l'installation de nouveaux schémas. L'hypnose permet de déconstruire les associations émotionnelles négatives liées à la nourriture, de restaurer les signaux naturels de faim et de satiété, et de développer une relation plus douce au corps.</p>

    <h2>Mon approche</h2>
    <p>Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong>, installé à Paris 4ème dans le quartier Marais-Bastille. Mon accompagnement est complémentaire — et non substitut — à un suivi médical ou nutritionnel. Je travaille sur la dimension émotionnelle et inconsciente du rapport au corps, en coordination avec les professionnels de santé qui vous suivent si nécessaire.</p>

    <h2>Questions fréquentes</h2>
    <h3>L'hypnose peut-elle aider les compulsions alimentaires liées au stress ?</h3>
    <p>Oui. Les compulsions alimentaires sont très souvent un mécanisme de régulation émotionnelle installé par l'inconscient — une réponse au stress, à l'anxiété ou à l'ennui. L'hypnose agit à la source en modifiant ce mécanisme de compensation et en développant des alternatives plus adaptées. Beaucoup de clients observent une réduction significative des compulsions dès les premières séances.</p>
    <h3>Combien de séances sont nécessaires ?</h3>
    <p>En général, 4 à 6 séances permettent d'obtenir des changements durables sur le rapport à la nourriture. Le nombre varie selon la complexité de la situation, l'ancienneté des difficultés et votre réceptivité. Chaque séance est personnalisée selon votre situation.</p>
    <h3>L'hypnose remplace-t-elle un suivi médical ou nutritionnel ?</h3>
    <p>Non. L'hypnose est un accompagnement complémentaire à un suivi médical ou nutritionnel, pas un substitut. Elle agit sur la dimension psychologique et émotionnelle du rapport au corps. Si vous suivez déjà un traitement ou un suivi, l'hypnose peut s'y articuler efficacement.</p>

    <h2>Autres spécialités</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Burn-out, crises d'angoisse</li>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — Colère, hypersensibilité</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Estime de soi, image de soi</li>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — Schémas répétitifs</li>
      <li><a href="${SITE_URL}/blog">Blog hypnose</a> — Articles sur l'hypnose et la relation au corps</li>
    </ul>

        <h2>Chaque trouble du comportement alimentaire a sa page dédiée</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-compulsions-alimentaires-paris">Compulsions alimentaires</a> — Envies incontrôlables</li>
      <li><a href="${SITE_URL}/hypnose-grignotage-paris">Grignotage chronique</a> — Automatismes entre les repas</li>
      <li><a href="${SITE_URL}/hypnose-addiction-sucre-paris">Addiction au sucre</a> — Dépendance sucrée</li>
      <li><a href="${SITE_URL}/hypnose-boulimie-paris">Boulimie</a> — Crises et causes émotionnelles</li>
      <li><a href="${SITE_URL}/hypnose-alimentation-emotionnelle-paris">Alimentation émotionnelle</a> — Manger ses émotions</li>
      <li><a href="${SITE_URL}/hypnose-image-corporelle-paris">Image corporelle</a> — Rapport douloureux au corps</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance — 90€</a>
    `,
  },

  "/hypnose-en-ligne": {
    title: "Hypnose en ligne & visio — Spécialiste France | Alain Zenatti",
    description:
      "Spécialiste de l'hypnose en visioconférence partout en France. Alain Zenatti, Maître Hypnologue certifié, propose des téléconsultations d'hypnose aussi efficaces qu'au cabinet. 90 € — Résultats en 3 à 5 séances.",
    canonicalPath: "/hypnose-en-ligne",
    h1: "Spécialiste de l'hypnose en ligne — Consultez depuis chez vous, partout en France.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${SITE_URL}/hypnose-en-ligne#service`,
        "name": "Séances d'hypnose en ligne — NovaHypnose",
        "description": "Séances d'hypnose ericksonienne en visioconférence (Google Meet), disponibles partout en France. Aussi efficaces qu'au cabinet.",
        "url": `${SITE_URL}/hypnose-en-ligne`,
        "provider": { "@type": "Person", "name": "Alain Zenatti", "@id": `${SITE_URL}/#person` },
        "areaServed": { "@type": "Country", "name": "France" },
        "serviceType": "Hypnose en ligne",
        "availableLanguage": "French",
        "offers": {
          "@type": "Offer",
          "price": "90",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      },
      breadcrumbLd([
        { name: "Accueil", path: "/" },
        { name: "Hypnose en ligne", path: "/hypnose-en-ligne" },
      ]),
    ],
    content: `
    <p>Alain Zenatti, <strong>Maître Hypnologue certifié</strong>, est l'un des rares hypnothérapeutes en France à proposer des séances exclusivement <strong>en ligne, via visioconférence</strong>, avec un protocole aussi rigoureux qu'en cabinet. Depuis Paris 4ème, il accompagne des clients de toute la France — Lyon, Marseille, Bordeaux, Toulouse, Nice, Strasbourg, Nantes, Rennes, Grenoble, Montpellier, et partout en métropole, DOM-TOM et à l'étranger.</p>

    <h2>L'hypnose en visio est-elle aussi efficace qu'au cabinet ?</h2>
    <p>Oui. L'état hypnotique repose sur la <strong>voix, le rythme et la relation thérapeutique</strong> — pas sur la proximité physique. Les résultats obtenus en téléconsultation sont identiques au présentiel : 3 à 5 séances suffisent dans la grande majorité des cas. De nombreux clients se sentent même <em>plus détendus</em> dans leur environnement familier, ce qui facilite l'accès à l'état hypnotique.</p>

    <h2>Comment se déroule une séance d'hypnose en visio ?</h2>
    <ul>
      <li><strong>Préparation</strong> — Un endroit calme où vous ne serez pas dérangé·e, casque ou écouteurs obligatoires</li>
      <li><strong>Connexion</strong> — Lien Google Meet envoyé par email avant la séance, aucune installation requise</li>
      <li><strong>Durée</strong> — 60 à 75 minutes, identique au cabinet</li>
      <li><strong>Tarif</strong> — 90 € la séance, paiement en ligne par carte bancaire ou Wero</li>
    </ul>

    <h2>Domaines traités en hypnose à distance</h2>
    <p>Toutes les problématiques se traitent efficacement en visio : <strong>stress et anxiété</strong>, phobies (avion, claustrophobie, prise de parole), <strong>troubles du sommeil</strong> (insomnie, réveils nocturnes), confiance en soi, gestion des émotions, procrastination, arrêt du tabac.</p>

    <h2>Disponible partout en France</h2>
    <p>Que vous soyez à Lyon, Marseille, Bordeaux, Toulouse, Nice, Strasbourg, Nantes, Rennes, Grenoble, Montpellier, Lille, ou dans une zone rurale sans hypnothérapeute qualifié à proximité, vous accédez au même niveau d'expertise qu'un client parisien. Les séances sont également disponibles pour les francophones à l'étranger.</p>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une téléconsultation d'hypnose — 90 €</a>
    `,
  },
};

PAGES["/peurdelavion"] = {
  title: "Hypnose peur de l'avion Paris | Alain Zenatti",
  description:
    "Libérez-vous de la peur de l'avion par l'hypnose à Paris 4ème ou en visio partout en France. Aérophobie, crises de panique, claustrophobie en cabine. Résultats durables en 3 à 4 séances.",
  canonicalPath: "/peurdelavion",
  h1: "Hypnose et peur de l'avion — Reprenez l'avion sereinement",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}/peurdelavion#service`,
      name: "Hypnose pour la peur de l'avion à Paris",
      description:
        "Traitement de la peur de l'avion (aérophobie) par l'hypnose ericksonienne. Cabinet Paris 4ème Marais-Bastille ou en visio. Résultats en 3 à 4 séances.",
      url: `${SITE_URL}/peurdelavion`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie aérophobie",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Peur de l'avion", path: "/peurdelavion" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle remplacer les médicaments contre la peur de l'avion ?",
        a: "Oui, l'hypnose agit à la source émotionnelle de votre peur, là où les anxiolytiques n'offrent qu'un soulagement temporaire. L'hypnothérapie ericksonienne reprogramme votre inconscient pour désactiver la réaction de panique durablement.",
      },
      {
        q: "Combien de séances faut-il pour ne plus avoir peur de l'avion ?",
        a: "En moyenne, 3 à 4 séances suffisent pour obtenir des résultats significatifs. Certaines personnes ressentent un changement dès la première séance.",
      },
      {
        q: "Faut-il avoir un vol prévu pour commencer l'hypnose ?",
        a: "Non, il vaut même mieux ne pas attendre. Vous pouvez commencer l'accompagnement sans vol programmé. Si un vol approche dans moins d'un mois, un programme intensif avec séances rapprochées est possible.",
      },
    ]),
  ],
  content: `
    <p>Boule au ventre à l'idée de monter à bord, nuits blanches avant un vol, crises de panique au décollage… La peur de l'avion (aérophobie) touche près d'<strong>une personne sur cinq</strong>. L'hypnose ericksonienne agit à la racine de cette peur pour vous redonner la liberté de voyager.</p>

    <h2>Vous reconnaissez-vous ?</h2>
    <ul>
      <li><strong>Anxiété paralysante</strong> — Rien qu'à l'idée de prendre l'avion, votre cœur s'emballe et vos mains tremblent</li>
      <li><strong>Évitement des voyages</strong> — Vous refusez des opportunités professionnelles ou personnelles par peur de voler</li>
      <li><strong>Dépendance aux médicaments</strong> — Vous ne pouvez pas imaginer voler sans anxiolytiques ou alcool</li>
      <li><strong>Nuits blanches</strong> — Vous perdez le sommeil des semaines avant un vol programmé</li>
      <li><strong>Crises de panique</strong> — Turbulences, décollage, atterrissage… votre corps réagit comme face à un danger réel</li>
      <li><strong>Claustrophobie en cabine</strong> — L'espace confiné de l'avion déclenche une sensation d'étouffement insoutenable</li>
    </ul>

    <h2>Comment l'hypnose désactive la peur de l'avion</h2>
    <p>L'aérophobie est un programme de protection installé par votre inconscient, souvent déclenché par un vol turbulent, un reportage marquant, ou parfois sans raison apparente. L'hypnose ericksonienne agit directement sur ce programme — sans avoir à revivre l'événement déclencheur, et sans exposition forcée à l'avion. Vous restez conscient et en contrôle pendant toute la séance.</p>
    <ul>
      <li>Identifier l'origine de la peur (vol turbulent, reportage, transmission familiale…)</li>
      <li>Dissocier l'émotion de panique du contexte du vol (cabine, décollage, turbulences)</li>
      <li>Créer de nouvelles associations positives liées à l'avion et au voyage</li>
      <li>Ancrer un état de calme que vous pouvez activer à volonté avant et pendant le vol</li>
      <li>Vous transmettre des techniques d'auto-hypnose pour rester serein en cabine</li>
    </ul>

    <h2>Exemples de parcours au cabinet</h2>
    <h3>Aérophobie installée depuis 10 ans</h3>
    <p>Thomas*, consultant international, refusait systématiquement les missions nécessitant un vol. Sa peur de l'avion, déclenchée par un vol très turbulent dix ans plus tôt, menaçait désormais sa carrière. En 3 séances d'hypnose dans mon cabinet du Marais, nous avons neutralisé le souvenir traumatique initial et installé un état de calme associé au vol. Thomas a repris l'avion le mois suivant pour un déplacement à Londres — sereinement.</p>
    <h3>Crises de panique au décollage</h3>
    <p>Sophie*, 35 ans, avait toujours pris l'avion sans difficulté jusqu'au jour où, sans raison apparente, elle a fait une crise de panique au décollage. En 4 séances d'hypnose ericksonienne, nous avons travaillé sur le déclencheur inconscient de cette crise initiale et reconstruit une association de sécurité avec le vol. Sophie a pu repartir en vacances aux Antilles, détendue.</p>
    <h3>Peur transmise depuis l'enfance</h3>
    <p>Julien*, 42 ans, n'avait jamais pris l'avion. Sa mère, terrorisée à l'idée de voler, lui avait transmis cette peur depuis l'enfance. En 3 séances, nous avons identifié les croyances inconscientes héritées et installé un nouveau rapport à l'avion. Julien a effectué son premier vol vers Rome deux mois plus tard, sans anxiolytique.</p>
    <p><em>* Prénoms modifiés pour préserver la confidentialité</em></p>

    <h2>Résultats</h2>
    <ul>
      <li><strong>3 à 4 séances</strong> suffisent en moyenne pour vaincre la peur de l'avion</li>
      <li><strong>85%</strong> des personnes accompagnées retrouvent la sérénité en vol</li>
      <li><strong>Note 5/5</strong> sur Resalib et Google</li>
    </ul>

    <h2>Questions fréquentes sur la peur de l'avion</h2>
    <h3>L'hypnose peut-elle remplacer les médicaments contre la peur de l'avion ?</h3>
    <p>Oui, l'hypnose agit à la source émotionnelle de votre peur, là où les anxiolytiques n'offrent qu'un soulagement temporaire. L'hypnothérapie ericksonienne reprogramme votre inconscient pour désactiver la réaction de panique durablement, sans béquilles chimiques avant chaque vol.</p>
    <h3>Combien de séances faut-il pour ne plus avoir peur de l'avion ?</h3>
    <p>En moyenne, 3 à 4 séances suffisent pour obtenir des résultats significatifs. Certaines personnes ressentent un changement dès la première séance. L'accompagnement est progressif : identification de l'origine, désensibilisation, ancrage de ressources et consolidation avant le vol.</p>
    <h3>Faut-il avoir un vol prévu pour commencer l'hypnose ?</h3>
    <p>Non, il vaut même mieux ne pas attendre. Vous pouvez commencer l'accompagnement à n'importe quel moment, même sans vol programmé. Cela laisse le temps à votre inconscient d'intégrer les changements en profondeur, sans pression.</p>

    <h2>Autres spécialités</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Hypnose et phobies</a> — Toutes les phobies traitées en hypnose</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Burn-out, crises d'angoisse, stress chronique</li>
      <li><a href="${SITE_URL}/hypnose-sommeil-paris">Hypnose et sommeil</a> — Insomnie, réveils nocturnes</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Syndrome de l'imposteur</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour vaincre la peur de l'avion</a>
    `,
};

PAGES["/hypnose-arachnophobie-paris"] = {
  title: "Hypnose arachnophobie (peur des araignées) Paris | Alain Zenatti",
  description:
    "Libérez-vous de l'arachnophobie (peur des araignées) par l'hypnose à Paris 4ème ou en visio. Araignées, insectes — résultats durables en 2 à 3 séances.",
  canonicalPath: "/hypnose-arachnophobie-paris",
  h1: "Hypnose et arachnophobie — Libérez-vous de la peur des araignées à Paris",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose arachnophobie Paris",
      description: "Traitement de l'arachnophobie (peur des araignées) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-arachnophobie-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie arachnophobie",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Phobies et peurs", path: "/hypnose-phobies-paris" },
      { name: "Arachnophobie", path: "/hypnose-arachnophobie-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle vraiment faire disparaître la peur des araignées ?",
        a: "Oui. L'arachnophobie est un programme inconscient appris — ce qui a été appris peut être désappris. L'hypnose ericksonienne accède directement à ce programme pour le reconfigurer. La plupart des arachnophobes traités constatent une transformation radicale en 2 à 3 séances.",
      },
      {
        q: "Est-ce que je vais devoir toucher des araignées pendant les séances ?",
        a: "Absolument pas. L'hypnose n'est pas de la thérapie par exposition. Vous restez dans votre fauteuil, en état de relaxation profonde, et nous travaillons uniquement sur votre représentation mentale. Aucune araignée n'est présente dans le cabinet.",
      },
      {
        q: "Combien de séances pour se libérer de l'arachnophobie ?",
        a: "En général, 2 à 3 séances suffisent. La plupart des clients constatent un changement significatif dès la deuxième séance.",
      },
    ]),
  ],
  content: `
    <p>La simple vue d'une araignée vous glace d'effroi ? L'arachnophobie touche environ une personne sur quatre. L'hypnose ericksonienne neutralise cette peur à sa racine. Résultats en 2 à 3 séances.</p>

    <h2>L'arachnophobie : plus qu'une simple peur</h2>
    <p>L'arachnophobie est un programme inconscient installé à un moment de votre vie — souvent déclenché par un événement marquant ou transmis par un parent. Ce programme peut être reconfiguré par l'hypnose ericksonienne, sans exposition forcée aux araignées.</p>

    <h2>Comment l'hypnose traite l'arachnophobie</h2>
    <ul>
      <li>Identifier le déclencheur initial (événement fondateur, transmission familiale)</li>
      <li>Dissocier l'émotion de panique du stimulus visuel (l'araignée)</li>
      <li>Reconfigurer la réponse automatique : de la panique à l'indifférence</li>
      <li>Ancrer un état de calme face aux araignées</li>
    </ul>

    <h2>Autres phobies traitées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Toutes les phobies</a> — Phobie avion, claustrophobie, peur de parler en public</li>
      <li><a href="${SITE_URL}/peurdelavion">Peur de l'avion</a> — Aérophobie traitée en hypnose</li>
      <li><a href="${SITE_URL}/hypnose-acrophobie-paris">Peur du vide</a> — Acrophobie traitée en hypnose</li>
      <li><a href="${SITE_URL}/hypnose-claustrophobie-paris">Claustrophobie</a> — Espaces clos et enfermement</li>
      <li><a href="${SITE_URL}/hypnose-peur-parler-public-paris">Peur de parler en public</a> — Glossophobie et trac</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour traiter l'arachnophobie</a>
    `,
};

PAGES["/hypnose-acrophobie-paris"] = {
  title: "Hypnose acrophobie (peur du vide) Paris | Alain Zenatti",
  description:
    "Libérez-vous de l'acrophobie (peur du vide et des hauteurs) par l'hypnose à Paris 4ème ou en visio. Balcons, escaliers, hauteurs — résultats durables en 2 à 4 séances.",
  canonicalPath: "/hypnose-acrophobie-paris",
  h1: "Hypnose et acrophobie — Libérez-vous de la peur du vide à Paris",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose acrophobie Paris",
      description: "Traitement de l'acrophobie (peur du vide et des hauteurs) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-acrophobie-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie acrophobie",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Phobies et peurs", path: "/hypnose-phobies-paris" },
      { name: "Acrophobie", path: "/hypnose-acrophobie-paris" },
    ]),
    faqLd([
      {
        q: "L'acrophobie est-elle différente du vertige ?",
        a: "Oui. Le vertige est une sensation physique due à un problème d'oreille interne. L'acrophobie est une peur phobique — une réaction émotionnelle intense à la perception du vide. L'hypnose traite l'acrophobie (la peur) mais pas le vertige d'origine vestibulaire.",
      },
      {
        q: "Combien de séances pour se débarrasser de la peur du vide ?",
        a: "En général, 2 à 4 séances suffisent. La plupart des acrophobes ressentent un changement significatif dès la deuxième séance.",
      },
      {
        q: "Est-ce que je vais devoir aller sur un balcon pendant les séances ?",
        a: "Non. Nous travaillons entièrement dans le cabinet, en état de relaxation profonde, sur votre représentation mentale de la hauteur. Pas d'exposition réelle.",
      },
    ]),
  ],
  content: `
    <p>Balcon bloqué, escaliers en verre, falaises, ponts… La peur du vide (acrophobie) vous empêche de profiter pleinement de votre vie ? L'hypnose ericksonienne désactive cette peur à sa racine. Résultats en 2 à 4 séances.</p>

    <h2>L'acrophobie : bien plus qu'un vertige</h2>
    <p>L'acrophobie est une réaction émotionnelle intense déclenchée par la perception du vide, parfois même à faible hauteur. Ce n'est pas la hauteur elle-même qui est problématique, mais la manière dont votre inconscient a codé une expérience passée comme dangereuse. Ce programme peut être reconfiguré par l'hypnose.</p>

    <h2>Comment l'hypnose traite l'acrophobie</h2>
    <ul>
      <li>Identifier l'événement fondateur de la peur du vide dans votre histoire</li>
      <li>Dissocier la réaction de panique de la perception du vide ou de la hauteur</li>
      <li>Reconfigurer votre réponse automatique : de la panique à la vigilance calme</li>
      <li>Ancrer un état de stabilité et de confiance face au vide</li>
    </ul>

    <h2>Autres phobies traitées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Toutes les phobies</a> — Phobie avion, claustrophobie, arachnophobie</li>
      <li><a href="${SITE_URL}/peurdelavion">Peur de l'avion</a> — Aérophobie traitée en hypnose</li>
      <li><a href="${SITE_URL}/hypnose-claustrophobie-paris">Claustrophobie</a> — Espaces clos et enfermement</li>
      <li><a href="${SITE_URL}/hypnose-arachnophobie-paris">Arachnophobie</a> — Peur des araignées</li>
      <li><a href="${SITE_URL}/hypnose-peur-parler-public-paris">Peur de parler en public</a> — Glossophobie et trac</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour traiter la peur du vide</a>
    `,
};

PAGES["/hypnose-claustrophobie-paris"] = {
  title: "Hypnose claustrophobie (peur des espaces clos) Paris | Alain Zenatti",
  description:
    "Libérez-vous de la claustrophobie (peur des espaces clos) par l'hypnose à Paris 4ème ou en visio. Ascenseurs, IRM, métro — résultats durables en 2 à 4 séances.",
  canonicalPath: "/hypnose-claustrophobie-paris",
  h1: "Hypnose et claustrophobie — Libérez-vous de la peur des espaces clos à Paris",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose claustrophobie Paris",
      description: "Traitement de la claustrophobie (peur des espaces clos) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-claustrophobie-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie claustrophobie",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Phobies et peurs", path: "/hypnose-phobies-paris" },
      { name: "Claustrophobie", path: "/hypnose-claustrophobie-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle vraiment soigner la claustrophobie ?",
        a: "Oui. La claustrophobie est un programme inconscient appris — tout programme appris peut être reconfiguré. L'hypnose ericksonienne accède directement aux mécanismes inconscients qui déclenchent la panique en espace clos. La plupart des clients constatent une transformation en 2 à 4 séances.",
      },
      {
        q: "Ma claustrophobie m'empêche de faire une IRM — que faire ?",
        a: "C'est l'une des situations les plus fréquentes que je traite. L'hypnose peut vous permettre de passer une IRM sereinement, souvent en 1 à 2 séances si l'examen est urgent.",
      },
      {
        q: "Est-ce que les séances d'hypnose se déroulent dans un espace confiné ?",
        a: "Non. Le cabinet est un espace confortable et ouvert. Vous n'êtes jamais enfermé. Nous travaillons uniquement sur votre représentation mentale, en état de relaxation profonde.",
      },
    ]),
  ],
  content: `
    <p>Ascenseurs, IRM, avions, sous-terrains… La claustrophobie vous contraint à des contorsions quotidiennes pour éviter tout espace confiné ? L'hypnose ericksonienne neutralise cette peur à sa racine. Résultats en 2 à 4 séances.</p>

    <h2>La claustrophobie : une prison invisible</h2>
    <p>La claustrophobie est la peur des espaces clos, confinés ou sans issue de sortie visible. Dans la plupart des cas, elle naît d'une expérience traumatisante (ascenseur bloqué, enfermement accidentel) ou d'une transmission familiale. L'hypnose permet de reprogrammer cette réponse automatique rapidement.</p>

    <h2>Comment l'hypnose traite la claustrophobie</h2>
    <ul>
      <li>Identifier le contexte dans lequel la claustrophobie s'est installée</li>
      <li>Dissocier la sensation d'étouffement du stimulus (l'espace fermé)</li>
      <li>Créer de nouvelles associations — espace confiné = calme et contrôle</li>
      <li>Ancrer un état de sécurité intérieure activable dans toute situation</li>
    </ul>

    <h2>Autres phobies traitées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Toutes les phobies</a> — Phobie avion, acrophobie, arachnophobie</li>
      <li><a href="${SITE_URL}/peurdelavion">Peur de l'avion</a> — Aérophobie traitée en hypnose</li>
      <li><a href="${SITE_URL}/hypnose-acrophobie-paris">Peur du vide</a> — Acrophobie traitée en hypnose</li>
      <li><a href="${SITE_URL}/hypnose-arachnophobie-paris">Arachnophobie</a> — Peur des araignées</li>
      <li><a href="${SITE_URL}/hypnose-peur-parler-public-paris">Peur de parler en public</a> — Glossophobie et trac</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour traiter la claustrophobie</a>
    `,
};

PAGES["/hypnose-peur-parler-public-paris"] = {
  title: "Hypnose peur de parler en public Paris | Alain Zenatti",
  description:
    "Libérez-vous de la peur de parler en public par l'hypnose à Paris 4ème ou en visio. Présentations, pitchs, réunions — retrouvez votre aisance à l'oral. Résultats en 3 à 5 séances.",
  canonicalPath: "/hypnose-peur-parler-public-paris",
  h1: "Hypnose et peur de parler en public — Retrouvez l'aisance à l'oral à Paris",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose peur de parler en public Paris",
      description: "Traitement de la peur de parler en public (glossophobie) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-peur-parler-public-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie glossophobie",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Phobies et peurs", path: "/hypnose-phobies-paris" },
      { name: "Peur de parler en public", path: "/hypnose-peur-parler-public-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle supprimer complètement le trac ?",
        a: "L'objectif n'est pas de supprimer tout trac — un peu d'adrénaline est utile. L'hypnose vise à transformer le trac paralysant en énergie productive. Vous garderez une légère activation, mais sans les symptômes envahissants (trous de mémoire, voix chevrotante, tremblements).",
      },
      {
        q: "Combien de séances pour vaincre la peur de parler en public ?",
        a: "En général, 3 à 5 séances. Les premières séances travaillent sur l'origine de la peur et la désensibilisation. Les suivantes ancrent un état de confiance et des automatismes de performance.",
      },
      {
        q: "Est-ce que ça marche si j'ai une présentation importante dans deux semaines ?",
        a: "Oui. Si l'échéance est proche, nous organisons des séances rapprochées. Je vous transmets aussi des techniques d'auto-hypnose que vous pouvez utiliser le jour J pour rester centré.",
      },
    ]),
  ],
  content: `
    <p>Voix qui tremble, mains moites, trou de mémoire, envie de fuir… La peur de parler en public (glossophobie) touche près de trois personnes sur quatre. L'hypnose ericksonienne agit à la racine de cette peur. Résultats en 3 à 5 séances.</p>

    <h2>La peur de parler en public : une compétence à reconstruire</h2>
    <p>Ce n'est pas un manque de préparation ou de compétence : c'est un programme de survie que votre inconscient a codé autour du jugement des autres. L'hypnose permet de reconfigurer ce programme en profondeur — et de remplacer la réaction de panique par un état de confiance activable à volonté.</p>

    <h2>Comment l'hypnose traite la peur de parler en public</h2>
    <ul>
      <li>Identifier l'expérience fondatrice qui a installé la peur du jugement public</li>
      <li>Dissocier la prise de parole de la menace perçue (humiliation, rejet)</li>
      <li>Ancrer un état de confiance et de présence activable avant chaque intervention</li>
      <li>Travailler sur l'estime de soi et la confiance en votre expertise</li>
    </ul>

    <h2>Autres phobies traitées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Toutes les phobies</a> — Phobie avion, claustrophobie, arachnophobie</li>
      <li><a href="${SITE_URL}/peurdelavion">Peur de l'avion</a> — Aérophobie traitée en hypnose</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Syndrome de l'imposteur</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Trac et anxiété sociale</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour traiter la peur de parler en public</a>
    `,
};

PAGES["/hypnose-peur-dentiste-paris"] = {
  title: "Hypnose peur du dentiste (odontophobie) Paris | Alain Zenatti",
  description: "Libérez-vous de la peur du dentiste par l'hypnose à Paris 4ème ou en visio. Odontophobie, angoisse du fauteuil — résultats durables en 2 à 4 séances.",
  canonicalPath: "/hypnose-peur-dentiste-paris",
  h1: "Hypnose et peur du dentiste — Soignez vos dents sans angoisse à Paris",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose peur du dentiste Paris",
      description: "Traitement de la peur du dentiste (odontophobie) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-peur-dentiste-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie odontophobie",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
        name: "Au cabinet Paris 4ème ou en visioconférence (Google Meet)",
      },
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Phobies et peurs", path: "/hypnose-phobies-paris" },
      { name: "Peur du dentiste", path: "/hypnose-peur-dentiste-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle vraiment m'aider à aller chez le dentiste ?",
        a: "Oui. La peur du dentiste est un programme inconscient que l'hypnose permet de désactiver directement. Contrairement aux anxiolytiques qui masquent la peur le temps d'un soin, l'hypnose agit sur l'origine même de cette phobie pour un changement durable.",
      },
      {
        q: "Combien de séances faut-il pour ne plus avoir peur du dentiste ?",
        a: "En moyenne, 2 à 4 séances suffisent. La première séance identifie l'origine de la peur et travaille la désensibilisation. Les suivantes ancrent un état de calme associé au cabinet dentaire et vous transmettent des techniques d'auto-hypnose à utiliser sur le fauteuil.",
      },
      {
        q: "Et si j'ai aussi un fort réflexe nauséeux ?",
        a: "Le réflexe nauséeux est souvent d'origine psychosomatique et répond très bien à l'hypnose. En travaillant sur la détente du système nerveux et en dissociant le réflexe de l'anxiété, beaucoup de clients voient leur réflexe nauséeux considérablement réduit dès les premières séances.",
      },
    ]),
  ],
  content: `
    <p>Des années sans soins, des caries laissées sans traitement, des douleurs ignorées… La peur du dentiste (odontophobie) touche près d'<strong>une personne sur cinq</strong> en France. L'hypnose ericksonienne agit à la racine de cette peur pour vous permettre de vous soigner sereinement. Résultats en 2 à 4 séances.</p>

    <h2>Pourquoi la peur du dentiste s'installe</h2>
    <p>Une mauvaise expérience passée, une douleur vive, un praticien peu attentif à votre inconfort… Votre inconscient a créé un programme de protection pour vous éviter de revivre cette expérience. Le problème : ce programme se déclenche même quand vous n'êtes plus en danger. L'hypnose permet de <strong>reprogrammer cette réaction automatique</strong> en profondeur.</p>

    <h2>Ce que l'hypnose traite</h2>
    <ul>
      <li><strong>Angoisse anticipatoire</strong> — Les nuits blanches avant le rendez-vous</li>
      <li><strong>Peur de la douleur</strong> — L'anticipation de la souffrance plus forte que la réalité</li>
      <li><strong>Réflexe nauséeux</strong> — Souvent d'origine psychosomatique, très réceptif à l'hypnose</li>
      <li><strong>Panique en salle d'attente</strong> — Les odeurs, les sons qui déclenchent l'angoisse</li>
      <li><strong>Méfiance de l'anesthésie</strong> — Peur que ça ne fasse pas effet</li>
    </ul>

    <h2>Comment l'hypnose traite la peur du dentiste</h2>
    <ul>
      <li>Identifier l'expérience fondatrice qui a installé la peur</li>
      <li>Désensibiliser les déclencheurs (bruit de la fraise, odeur du cabinet, position inclinée)</li>
      <li>Créer de nouvelles associations de calme et de sécurité liées aux soins dentaires</li>
      <li>Ancrer un état de relaxation profonde activable à volonté sur le fauteuil</li>
      <li>Vous enseigner des techniques de respiration et d'auto-hypnose</li>
    </ul>

    <h2>Peurs médicales traitées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Toutes les phobies</a> — Phobie avion, claustrophobie, arachnophobie</li>
      <li><a href="${SITE_URL}/hypnose-peur-aiguilles-paris">Peur des aiguilles</a> — Bélonéphobie, prises de sang, vaccins</li>
      <li><a href="${SITE_URL}/hypnose-peur-sang-paris">Peur du sang</a> — Hématophobie, malaises, évanouissements</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Anxiété médicale générale</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour traiter la peur du dentiste</a>
    `,
};

PAGES["/hypnose-peur-aiguilles-paris"] = {
  title: "Hypnose peur des aiguilles (bélonéphobie) Paris | Alain Zenatti",
  description: "Libérez-vous de la peur des aiguilles par l'hypnose à Paris 4ème ou en visio. Prises de sang, vaccins, perfusions — résultats durables en 2 à 3 séances.",
  canonicalPath: "/hypnose-peur-aiguilles-paris",
  h1: "Hypnose et peur des aiguilles — Prises de sang et vaccins sans angoisse à Paris",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose peur des aiguilles Paris",
      description: "Traitement de la peur des aiguilles (bélonéphobie) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-peur-aiguilles-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie bélonéphobie",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
        name: "Au cabinet Paris 4ème ou en visioconférence (Google Meet)",
      },
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Phobies et peurs", path: "/hypnose-phobies-paris" },
      { name: "Peur des aiguilles", path: "/hypnose-peur-aiguilles-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle m'aider à supporter les prises de sang ?",
        a: "Oui. La peur des aiguilles est un programme inconscient que l'hypnose permet de désactiver. Beaucoup de clients qui faisaient des malaises vagaux lors des prises de sang arrivent à se faire prélever sereinement après 2 à 3 séances.",
      },
      {
        q: "Combien de séances pour ne plus avoir peur des aiguilles ?",
        a: "En moyenne, 2 à 3 séances suffisent pour obtenir des résultats significatifs. Certaines personnes ressentent un changement dès la première séance. Je vous transmets également des techniques d'auto-hypnose que vous pouvez utiliser au moment du soin.",
      },
      {
        q: "L'hypnose peut-elle aussi traiter le malaise vagal ?",
        a: "Oui. Le malaise vagal déclenché par la vue d'une aiguille ou d'une seringue est souvent lié à une réaction phobique. En désensibilisant cette réaction au niveau inconscient, l'hypnose permet dans beaucoup de cas d'éliminer le malaise vagal associé.",
      },
    ]),
  ],
  content: `
    <p>Malaise vagal à la vue d'une seringue, refus de vaccins essentiels, bilans sanguins reportés depuis des années… La peur des aiguilles (bélonéphobie) touche environ <strong>10% de la population</strong>. L'hypnose ericksonienne agit à la racine de cette peur pour vous permettre de vous faire soigner sans angoisse. Résultats en 2 à 3 séances.</p>

    <h2>Pourquoi la peur des aiguilles peut être grave</h2>
    <p>Contrairement à d'autres phobies, la peur des aiguilles peut avoir des conséquences médicales directes : bilans sanguins évités, vaccinations refusées, traitements intraveineux impossibles à supporter. Cette phobie peut empêcher de recevoir des soins essentiels. L'hypnose permet de <strong>rompre ce cercle</strong> rapidement.</p>

    <h2>Ce que l'hypnose traite</h2>
    <ul>
      <li><strong>Malaise vagal</strong> — La syncope ou pré-syncope à la vue d'une aiguille</li>
      <li><strong>Panique anticipatoire</strong> — L'angoisse qui monte des jours avant le soin</li>
      <li><strong>Refus de vaccinations</strong> — Impossibilité de se faire vacciner</li>
      <li><strong>Perfusions et hospitalisations</strong> — Soins intraveineux vécus comme un supplice</li>
      <li><strong>Transmission à ses enfants</strong> — Briser la chaîne de cette peur héritée</li>
    </ul>

    <h2>Comment l'hypnose traite la peur des aiguilles</h2>
    <ul>
      <li>Identifier l'origine de la peur (mauvaise expérience, malaise passé, transmission)</li>
      <li>Désensibiliser la réaction phobique à la vue d'une seringue ou d'une aiguille</li>
      <li>Inhiber la réponse vagale inconsciente déclenchant le malaise</li>
      <li>Ancrer un état de calme associé aux soins par injection</li>
      <li>Vous enseigner des techniques d'auto-hypnose pour les soins futurs</li>
    </ul>

    <h2>Peurs médicales traitées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Toutes les phobies</a> — Phobie avion, claustrophobie, arachnophobie</li>
      <li><a href="${SITE_URL}/hypnose-peur-dentiste-paris">Peur du dentiste</a> — Odontophobie, angoisse du fauteuil</li>
      <li><a href="${SITE_URL}/hypnose-peur-sang-paris">Peur du sang</a> — Hématophobie, malaises, évanouissements</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Anxiété médicale générale</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour traiter la peur des aiguilles</a>
    `,
};

PAGES["/hypnose-peur-sang-paris"] = {
  title: "Hypnose peur du sang (hématophobie) Paris | Alain Zenatti",
  description: "Libérez-vous de la peur du sang par l'hypnose à Paris 4ème ou en visio. Hématophobie, malaises, évanouissements — résultats durables en 2 à 3 séances.",
  canonicalPath: "/hypnose-peur-sang-paris",
  h1: "Hypnose et peur du sang — Reprenez le contrôle face au sang à Paris",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose peur du sang Paris",
      description: "Traitement de la peur du sang (hématophobie) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-peur-sang-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie hématophobie",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
        name: "Au cabinet Paris 4ème ou en visioconférence (Google Meet)",
      },
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Phobies et peurs", path: "/hypnose-phobies-paris" },
      { name: "Peur du sang", path: "/hypnose-peur-sang-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle m'aider à ne plus faire de malaise face au sang ?",
        a: "Oui. La peur du sang déclenche une réaction dite vasovagale — une chute brusque de la pression artérielle qui provoque le malaise. Cette réaction est un programme inconscient que l'hypnose peut désactiver en agissant directement sur le système nerveux autonome.",
      },
      {
        q: "Combien de séances pour ne plus avoir peur du sang ?",
        a: "En moyenne, 2 à 3 séances permettent d'obtenir des résultats significatifs. La première séance identifie l'origine et désensibilise la réaction phobique. Les suivantes ancrent un nouvel état de neutralité face au sang.",
      },
      {
        q: "Ma peur du sang m'empêche de pratiquer ma profession médicale. L'hypnose peut-elle aider ?",
        a: "Oui, c'est un cas que je traite régulièrement. Étudiants en médecine, aides-soignants, infirmiers — certains professionnels de santé développent une peur du sang qui menace leur carrière. L'hypnose permet de désensibiliser cette réaction spécifiquement, sans toucher aux autres aspects de votre pratique.",
      },
    ]),
  ],
  content: `
    <p>Malaise ou évanouissement à la vue du sang, impossibilité de regarder certaines scènes de films, soins médicaux vécus comme une épreuve… La peur du sang (hématophobie) touche environ <strong>3 à 4% de la population</strong>. L'hypnose ericksonienne agit à la racine de cette peur pour que vous repreniez le contrôle. Résultats en 2 à 3 séances.</p>

    <h2>Une peur aux conséquences médicales réelles</h2>
    <p>L'hématophobie est particulière : contrairement à la plupart des phobies qui déclenchent une montée d'adrénaline, la peur du sang peut provoquer une chute brusque de pression artérielle (réflexe vasovagal) menant à l'évanouissement. Cette réaction est un programme inconscient que votre cerveau a installé — et que l'hypnose peut reprogrammer.</p>

    <h2>Ce que l'hypnose traite</h2>
    <ul>
      <li><strong>Malaise ou évanouissement</strong> — La réaction vasovagale déclenchée par la vue du sang</li>
      <li><strong>Évitement médical</strong> — Refus de soins par peur de saigner</li>
      <li><strong>Impossibilité de certains métiers</strong> — Soignants, secouristes limités par cette phobie</li>
      <li><strong>Angoisse des blessures banales</strong> — Coupures, égratignures vécues comme une catastrophe</li>
      <li><strong>Restrictions quotidiennes</strong> — Films, informations, même certaines images</li>
    </ul>

    <h2>Comment l'hypnose traite la peur du sang</h2>
    <ul>
      <li>Identifier l'origine de la phobie (choc visuel, malaise passé, expérience traumatique)</li>
      <li>Inhiber la réponse vasovagale inconsciente au niveau du système nerveux autonome</li>
      <li>Désensibiliser progressivement les stimuli déclencheurs (vue du sang, scènes médicales)</li>
      <li>Ancrer un état de neutralité et de contrôle face à ces situations</li>
      <li>Vous enseigner des techniques d'auto-régulation pour les situations à risque</li>
    </ul>

    <h2>Peurs médicales traitées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Toutes les phobies</a> — Phobie avion, claustrophobie, arachnophobie</li>
      <li><a href="${SITE_URL}/hypnose-peur-dentiste-paris">Peur du dentiste</a> — Odontophobie, angoisse du fauteuil</li>
      <li><a href="${SITE_URL}/hypnose-peur-aiguilles-paris">Peur des aiguilles</a> — Bélonéphobie, prises de sang, vaccins</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Anxiété médicale générale</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour traiter la peur du sang</a>
    `,
};

PAGES["/hypnose-aquaphobie-paris"] = {
  title: "Hypnose peur de l'eau (aquaphobie) Paris | Alain Zenatti",
  description: "Libérez-vous de la peur de l'eau par l'hypnose à Paris 4ème ou en visio. Aquaphobie, piscine, mer, immersion — résultats durables en 2 à 4 séances.",
  canonicalPath: "/hypnose-aquaphobie-paris",
  h1: "Hypnose et peur de l'eau — Renouez sereinement avec l'eau à Paris",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose peur de l'eau Paris",
      description: "Traitement de la peur de l'eau (aquaphobie) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-aquaphobie-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie aquaphobie",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
        name: "Au cabinet Paris 4ème ou en visioconférence (Google Meet)",
      },
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Phobies et peurs", path: "/hypnose-phobies-paris" },
      { name: "Peur de l'eau", path: "/hypnose-aquaphobie-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle m'aider à mettre la tête sous l'eau ?",
        a: "Oui. La peur de mettre la tête sous l'eau est l'une des manifestations les plus fréquentes de l'aquaphobie. L'hypnose désensibilise cette réaction au niveau inconscient et installe un état de calme associé à l'immersion. La plupart des personnes accompagnées parviennent à immerger leur visage sereinement en 2 à 3 séances.",
      },
      {
        q: "Combien de séances pour vaincre la peur de l'eau ?",
        a: "En moyenne, 2 à 4 séances suffisent pour obtenir des résultats significatifs. La progression dépend de l'objectif : retrouver de la sérénité à la piscine, apprendre à nager, ou se baigner en mer profonde. Un programme personnalisé est défini lors de la première séance.",
      },
      {
        q: "Faut-il savoir nager pour commencer ?",
        a: "Non. Beaucoup de personnes que j'accompagne ne savent pas nager ou n'ont jamais osé apprendre à cause de cette peur. L'hypnose vous prépare à reprendre confiance dans l'eau — l'apprentissage de la natation peut ensuite se faire avec un maître-nageur, dans des conditions psychologiques transformées.",
      },
    ]),
  ],
  content: `
    <p>Impossible de mettre la tête sous l'eau, refus de la piscine et de la plage, panique dès que vous n'avez plus pied… La peur de l'eau (aquaphobie) touche près de <strong>15% des adultes</strong>. L'hypnose ericksonienne agit à la racine de cette peur pour vous permettre de renouer sereinement avec l'eau. Résultats en 2 à 4 séances.</p>

    <h2>Pourquoi la peur de l'eau s'installe</h2>
    <p>Une expérience d'immersion mal vécue dans l'enfance, une noyade évitée de justesse, un cours de natation traumatisant, ou parfois aucune raison consciente identifiable… Votre inconscient a installé un programme de protection autour de l'eau. L'hypnose permet de <strong>désactiver ce programme</strong> en profondeur et durablement.</p>

    <h2>Ce que l'hypnose traite</h2>
    <ul>
      <li><strong>Peur de mettre la tête sous l'eau</strong> — Même dans la baignoire ou la piscine peu profonde</li>
      <li><strong>Panique en eau profonde</strong> — Dès que vous n'avez plus pied, le corps se bloque</li>
      <li><strong>Refus de la mer et des activités nautiques</strong> — Vacances limitées, opportunités évitées</li>
      <li><strong>Impossibilité d'apprendre à nager</strong> — Blocage adulte malgré plusieurs tentatives</li>
      <li><strong>Cours de natation à transmettre à ses enfants</strong> — Briser la chaîne de la peur</li>
    </ul>

    <h2>Comment l'hypnose traite la peur de l'eau</h2>
    <ul>
      <li>Identifier l'origine de l'aquaphobie (immersion forcée, noyade, transmission, sans cause apparente)</li>
      <li>Désensibiliser la réaction phobique aux différents contextes aquatiques</li>
      <li>Dissocier l'eau du sentiment de danger et de perte de contrôle</li>
      <li>Ancrer un état de calme et de confiance activable avant et pendant le contact avec l'eau</li>
      <li>Vous enseigner des techniques de respiration et d'auto-hypnose</li>
    </ul>

    <h2>Autres phobies traitées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Toutes les phobies</a> — Phobie avion, claustrophobie, arachnophobie</li>
      <li><a href="${SITE_URL}/peurdelavion">Peur de l'avion</a> — Aérophobie traitée en hypnose</li>
      <li><a href="${SITE_URL}/hypnose-claustrophobie-paris">Claustrophobie</a> — Espaces clos et enfermement</li>
      <li><a href="${SITE_URL}/hypnose-acrophobie-paris">Peur du vide</a> — Acrophobie traitée en hypnose</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour traiter la peur de l'eau</a>
    `,
};

PAGES["/hypnose-amaxophobie-paris"] = {
  title: "Hypnose peur de conduire (amaxophobie) Paris | Alain Zenatti",
  description: "Reprenez le volant en confiance par l'hypnose à Paris 4ème ou en visio. Amaxophobie, peur autoroute, séquelles accident — résultats durables en 2 à 4 séances.",
  canonicalPath: "/hypnose-amaxophobie-paris",
  h1: "Hypnose et peur de conduire — Reprenez le volant en confiance à Paris",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose peur de conduire Paris",
      description: "Traitement de la peur de conduire (amaxophobie) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-amaxophobie-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie amaxophobie",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
        name: "Au cabinet Paris 4ème ou en visioconférence (Google Meet)",
      },
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Phobies et peurs", path: "/hypnose-phobies-paris" },
      { name: "Peur de conduire", path: "/hypnose-amaxophobie-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle aider après un accident de voiture ?",
        a: "Oui, c'est même l'un des cas où elle est particulièrement efficace. Un accident laisse une empreinte traumatique dans votre inconscient qui déclenche automatiquement la peur au volant. L'hypnose ericksonienne neutralise cette empreinte sans que vous ayez à revivre consciemment l'accident.",
      },
      {
        q: "Combien de séances pour retrouver confiance au volant ?",
        a: "En moyenne, 2 à 4 séances suffisent pour obtenir des résultats significatifs. La première séance identifie l'origine de l'amaxophobie et initie le travail de désensibilisation. Les séances suivantes consolident le nouvel état de confiance et l'ancrent durablement.",
      },
      {
        q: "J'ai peur uniquement sur autoroute. L'hypnose peut-elle cibler cette peur précise ?",
        a: "Absolument. L'amaxophobie se manifeste souvent dans des contextes spécifiques : autoroute, tunnel, rond-point, conduite de nuit, passagers à bord. L'hypnose travaille précisément sur les situations qui déclenchent votre peur et installe un état de calme spécifique à chaque contexte.",
      },
    ]),
  ],
  content: `
    <p>Panique sur autoroute, évitement du volant depuis des mois, séquelles d'un accident… La peur de conduire (amaxophobie) touche des millions de conducteurs en France. L'hypnose ericksonienne agit à la racine de cette peur pour vous permettre de reprendre la route sereinement. <strong>Résultats en 2 à 4 séances.</strong></p>

    <h2>Pourquoi la peur de conduire s'installe</h2>
    <p>Un accident, une frayeur intense, une longue période sans conduire, ou parfois aucune cause consciente identifiable… Votre inconscient a installé un programme de protection autour de la conduite. L'hypnose permet de <strong>désactiver ce programme</strong> en profondeur et durablement — sans exposition forcée à la conduite.</p>

    <h2>Ce que l'hypnose traite</h2>
    <ul>
      <li><strong>Panique sur autoroute</strong> — Vitesse, dépassements, sorties impossibles</li>
      <li><strong>Évitement total du volant</strong> — Des mois ou des années sans conduire</li>
      <li><strong>Anxiété avec des passagers</strong> — Pression de responsabilité, refus de conduire en compagnie</li>
      <li><strong>Peur des tunnels et ronds-points</strong> — Contextes spécifiques déclencheurs</li>
      <li><strong>Séquelles après un accident</strong> — Flash traumatique qui paralyse les réflexes</li>
    </ul>

    <h2>Comment l'hypnose traite la peur de conduire</h2>
    <ul>
      <li>Identifier l'origine de l'amaxophobie (accident, frayeur, longue pause)</li>
      <li>Neutraliser l'empreinte traumatique sans la revivre consciemment</li>
      <li>Désensibiliser les contextes spécifiques déclencheurs</li>
      <li>Ancrer un état de calme et de confiance activable au volant</li>
      <li>Reconstruire une image positive de soi en tant que conducteur(trice)</li>
    </ul>

    <h2>Autres phobies traitées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Toutes les phobies</a> — Phobie avion, claustrophobie, arachnophobie</li>
      <li><a href="${SITE_URL}/peurdelavion">Peur de l'avion</a> — Aérophobie traitée en hypnose</li>
      <li><a href="${SITE_URL}/hypnose-claustrophobie-paris">Claustrophobie</a> — Espaces clos et enfermement</li>
      <li><a href="${SITE_URL}/hypnose-phobie-sociale-paris">Phobie sociale</a> — Peur du jugement et des interactions</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour traiter la peur de conduire</a>
    `,
};

PAGES["/hypnose-phobie-sociale-paris"] = {
  title: "Hypnose phobie sociale Paris | Alain Zenatti – Anxiété sociale",
  description: "Libérez-vous de la phobie sociale par l'hypnose à Paris 4ème ou en visio. Peur du jugement, rougissement, anxiété sociale — résultats durables en 3 à 5 séances.",
  canonicalPath: "/hypnose-phobie-sociale-paris",
  h1: "Hypnose et phobie sociale — Retrouvez le plaisir des interactions à Paris",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose phobie sociale Paris",
      description: "Traitement de la phobie sociale (anxiété sociale) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-phobie-sociale-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie phobie sociale",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
        name: "Au cabinet Paris 4ème ou en visioconférence (Google Meet)",
      },
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Phobies et peurs", path: "/hypnose-phobies-paris" },
      { name: "Phobie sociale", path: "/hypnose-phobie-sociale-paris" },
    ]),
    faqLd([
      {
        q: "La phobie sociale est-elle différente de la timidité ?",
        a: "Oui. La timidité est un trait de personnalité inconfortable mais qui ne limite pas véritablement la vie. La phobie sociale est une peur intense et persistante des situations d'interaction qui génère des symptômes physiques — rougissement, transpiration, tremblements — et entraîne un évitement systématique.",
      },
      {
        q: "Combien de séances d'hypnose pour traiter la phobie sociale ?",
        a: "En moyenne, 3 à 5 séances permettent d'obtenir des résultats significatifs et durables. La première séance identifie l'origine de la peur du jugement. Les séances suivantes désensibilisent les situations spécifiques et ancrent un nouvel état d'aisance sociale.",
      },
      {
        q: "L'hypnose peut-elle aider si je rougis dès que je parle en public ?",
        a: "Oui. Le rougissement (érythrophobie) est l'une des manifestations les plus fréquentes de la phobie sociale. Il résulte d'une réaction du système nerveux autonome déclenchée par l'anticipation du jugement. L'hypnose agit directement sur ce mécanisme inconscient pour dissocier la situation sociale de la réaction physiologique.",
      },
    ]),
  ],
  content: `
    <p>Peur intense du jugement, rougissement incontrôlable, évitement des repas et des réunions… La phobie sociale touche environ <strong>13% de la population</strong>. L'hypnose ericksonienne agit à la racine de cette peur pour vous permettre de retrouver le plaisir des interactions. <strong>Résultats en 3 à 5 séances.</strong></p>

    <h2>Pourquoi la phobie sociale s'installe</h2>
    <p>Une expérience humiliante, un regard social trop exigeant dans l'enfance, une critique répétée… Votre inconscient a installé un programme de protection autour des interactions sociales. L'hypnose permet de <strong>désactiver ce programme</strong> en profondeur — sans exposition forcée aux situations redoutées.</p>

    <h2>Ce que l'hypnose traite</h2>
    <ul>
      <li><strong>Peur intense du jugement</strong> — Certitude d'être observé et évalué négativement</li>
      <li><strong>Rougissement incontrôlable</strong> — Érythrophobie qui amplifie l'anxiété</li>
      <li><strong>Évitement des repas et réunions</strong> — Isolation progressive</li>
      <li><strong>Tremblements et voix qui tremble</strong> — Symptômes physiques visibles qui aggravent la honte</li>
      <li><strong>Ruminations après chaque interaction</strong> — Rejouer mentalement les conversations pendant des heures</li>
    </ul>

    <h2>Comment l'hypnose traite la phobie sociale</h2>
    <ul>
      <li>Identifier l'origine de la phobie (humiliation, regard critique, comparaison sociale)</li>
      <li>Neutraliser les croyances inconscientes autour du jugement des autres</li>
      <li>Désensibiliser les situations spécifiques déclencheurs (repas, réunions, conversations)</li>
      <li>Ancrer un état naturel d'aisance et de confiance en situation sociale</li>
      <li>Techniques d'auto-hypnose pour les moments d'anxiété anticipatoire</li>
    </ul>

    <h2>Autres phobies et problématiques sociales traitées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-phobies-paris">Toutes les phobies</a> — Phobie avion, claustrophobie, arachnophobie</li>
      <li><a href="${SITE_URL}/hypnose-peur-parler-public-paris">Peur de parler en public</a> — Glossophobie, trac, exposés</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Syndrome de l'imposteur, timidité</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Hypnose stress et anxiété</a> — Anxiété généralisée</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour traiter la phobie sociale</a>
    `,
};

// ─── Sous-pages troubles émotionnels ───────────────────────────────────────

PAGES["/hypnose-troubles-emotionnels-paris"] = {
  title: "Hypnose troubles émotionnels Paris & en ligne | Alain Zenatti",
  description:
    "Accompagnement des troubles émotionnels par l'hypnose à Paris 4ème ou en visio. Colère, deuil, hypersensibilité, frustration chronique, charge émotionnelle. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-troubles-emotionnels-paris",
  h1: "Hypnose et troubles émotionnels — Retrouvez votre équilibre émotionnel à Paris",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose troubles émotionnels Paris",
      description: "Accompagnement des troubles émotionnels (colère, deuil, hypersensibilité, frustration, charge émotionnelle) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-troubles-emotionnels-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie troubles émotionnels",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Gestion des émotions", path: "/hypnose-gestion-emotions-paris" },
      { name: "Troubles émotionnels", path: "/hypnose-troubles-emotionnels-paris" },
    ]),
    faqLd([
      {
        q: "Comment l'hypnose aide-t-elle à gérer la colère ?",
        a: "L'hypnose traite la colère en agissant sur deux niveaux. D'abord, elle identifie les déclencheurs inconscients qui provoquent des réactions disproportionnées — souvent liés à des blessures anciennes ou des schémas familiaux. Ensuite, elle reprogramme votre réponse automatique : au lieu de l'explosion, votre inconscient apprend à prendre du recul et à canaliser l'énergie de la colère de façon constructive.",
      },
      {
        q: "L'hypnose peut-elle soulager la charge émotionnelle et le sentiment d'épuisement ?",
        a: "Oui. La charge émotionnelle — ce sentiment d'être constamment débordé par les émotions des autres, par les situations, par vos propres ressentis — est l'une des problématiques que l'hypnose accompagne bien. Elle travaille à alléger le poids accumulé, à restaurer des frontières émotionnelles saines et à réduire la perméabilité excessive aux émotions extérieures.",
      },
      {
        q: "L'hypnose est-elle adaptée aux personnes hypersensibles ?",
        a: "Oui. L'objectif n'est pas de rendre une personne moins sensible, mais de l'aider à ne plus être submergée par cette sensibilité : filtres intérieurs, ancres de calme, régulation des environnements surchargés. Vous gardez votre richesse intérieure, vous gagnez la capacité de la réguler.",
      },
    ]),
  ],
  content: `
    <p>Colère qui déborde, deuil qui n'avance pas, hypersensibilité épuisante, frustration permanente, charge émotionnelle trop lourde : l'hypnose ericksonienne agit sur les racines inconscientes de ces états pour restaurer un équilibre émotionnel durable.</p>

    <h2>Les troubles émotionnels accompagnés au cabinet</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-colere-paris">Colère et irritabilité</a> — Explosions incontrôlées, réactions disproportionnées</li>
      <li><a href="${SITE_URL}/hypnose-deuil-paris">Deuil et séparation</a> — Perte d'un proche, rupture</li>
      <li><a href="${SITE_URL}/hypnose-traumatismes-paris">Traumatismes psychologiques</a> — Choc, accident, agression</li>
      <li><a href="${SITE_URL}/hypnose-hypersensibilite-paris">Hypersensibilité</a> — Émotions amplifiées, surcharge sensorielle</li>
      <li><a href="${SITE_URL}/hypnose-frustration-paris">Frustration chronique</a> — Insatisfaction permanente</li>
      <li><a href="${SITE_URL}/hypnose-charge-emotionnelle-paris">Charge émotionnelle</a> — Saturation, épuisement émotionnel</li>
      <li><a href="${SITE_URL}/hypnose-anxiete-emotionnelle-paris">Anxiété émotionnelle</a> — Peur de craquer, contrôle excessif</li>
    </ul>

    <h2>Comment l'hypnose restaure l'équilibre émotionnel</h2>
    <ul>
      <li>Identifier les déclencheurs et les racines inconscientes des débordements émotionnels</li>
      <li>Libérer les charges émotionnelles accumulées (blessures anciennes, émotions non digérées)</li>
      <li>Reprogrammer les réponses automatiques : du débordement à la régulation</li>
      <li>Installer des ressources intérieures durables (ancres de calme, frontières saines)</li>
    </ul>

    <h2>Voir aussi</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Stress et anxiété</a> — Anxiété généralisée, burn-out</li>
      <li><a href="${SITE_URL}/test-receptivite">Tester ma réceptivité à l'hypnose</a> — Test gratuit</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour retrouver l'équilibre émotionnel</a>
    `,
};

PAGES["/hypnose-colere-paris"] = {
  title: "Hypnose colère et irritabilité Paris | Alain Zenatti",
  description:
    "Accompagnement de la colère chronique par l'hypnose à Paris 4ème ou en visio. Explosions incontrôlées, irritabilité, réactions disproportionnées. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-colere-paris",
  h1: "Hypnose colère et irritabilité — Retrouvez le calme sans perdre votre énergie",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose colère et irritabilité Paris",
      description: "Accompagnement de la colère chronique et de l'irritabilité par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-colere-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie gestion de la colère",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Troubles émotionnels", path: "/hypnose-troubles-emotionnels-paris" },
      { name: "Colère et irritabilité", path: "/hypnose-colere-paris" },
    ]),
    faqLd([
      {
        q: "Comment l'hypnose agit-elle sur la colère et l'irritabilité ?",
        a: "La colère chronique est rarement une émotion isolée — elle est souvent le signal d'une blessure ancienne, d'un besoin non satisfait ou d'un apprentissage familial ancré dans l'inconscient. L'hypnose remonte à ces sources, libère la charge émotionnelle qui les alimente, et reprogramme la réponse automatique. Vous ne devenez pas insensible — vous récupérez le choix de votre réaction.",
      },
      {
        q: "Combien de séances faut-il pour réduire l'irritabilité chronique ?",
        a: "En général, 3 à 5 séances permettent une amélioration significative de la gestion de la colère. La première séance identifie les déclencheurs et les racines inconscientes ; les suivantes travaillent la libération des anciennes charges et l'installation de nouvelles réponses automatiques. Les résultats sont souvent perceptibles dès la deuxième ou troisième séance.",
      },
      {
        q: "La colère n'est-elle pas une émotion saine à ne pas supprimer ?",
        a: "Si, la colère est une émotion utile qui signale qu'une limite a été franchie. Le but de l'hypnose n'est pas de la supprimer mais de sortir des explosions incontrôlées et disproportionnées, pour retrouver une colère qui informe sans détruire.",
      },
    ]),
  ],
  content: `
    <p>Explosions de colère incontrôlées, irritabilité permanente, réactions disproportionnées qui abîment vos relations ? L'hypnose ericksonienne agit sur les racines inconscientes de la colère chronique — pas seulement sur ses manifestations.</p>

    <h2>Comment l'hypnose transforme la colère chronique</h2>
    <ul>
      <li>Identifier les déclencheurs et le message caché derrière la colère (blessure, injustice, besoin non satisfait)</li>
      <li>Libérer les charges émotionnelles anciennes qui alimentent les explosions</li>
      <li>Reprogrammer la réponse automatique : de l'explosion au recul</li>
      <li>Canaliser l'énergie de la colère de façon constructive, sans devenir insensible</li>
    </ul>
    <p>En général, 3 à 5 séances permettent une amélioration significative, souvent perceptible dès la deuxième séance.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-troubles-emotionnels-paris">Troubles émotionnels</a> — La page d'ensemble</li>
      <li><a href="${SITE_URL}/hypnose-frustration-paris">Frustration chronique</a> — Insatisfaction permanente</li>
      <li><a href="${SITE_URL}/hypnose-hypersensibilite-paris">Hypersensibilité</a> — Émotions amplifiées</li>
      <li><a href="${SITE_URL}/hypnose-charge-emotionnelle-paris">Charge émotionnelle</a> — Saturation émotionnelle</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Stress et anxiété</a> — Tension permanente</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour apaiser la colère</a>
    `,
};

PAGES["/hypnose-hypersensibilite-paris"] = {
  title: "Hypnose hypersensibilité Paris | Alain Zenatti",
  description:
    "Accompagnement de l'hypersensibilité par l'hypnose à Paris 4ème ou en visio. Émotions amplifiées, surcharge sensorielle, épuisement émotionnel. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-hypersensibilite-paris",
  h1: "Hypnose et hypersensibilité — Ressentir profondément sans être submergé(e)",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose hypersensibilité Paris",
      description: "Accompagnement de l'hypersensibilité par l'hypnose ericksonienne : réguler sans renier sa sensibilité. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-hypersensibilite-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie hypersensibilité",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Troubles émotionnels", path: "/hypnose-troubles-emotionnels-paris" },
      { name: "Hypersensibilité", path: "/hypnose-hypersensibilite-paris" },
    ]),
    faqLd([
      {
        q: "L'hypersensibilité est-elle un trouble à traiter ou une caractéristique à accepter ?",
        a: "L'hypersensibilité n'est pas un trouble à corriger — c'est une façon d'être au monde qui implique une perception plus fine, une empathie plus profonde, une résonance plus intense avec les émotions et les environnements. L'objectif de l'hypnose n'est pas de rendre une personne moins sensible, mais de l'aider à ne plus être submergée par cette sensibilité.",
      },
      {
        q: "Combien de séances pour apprendre à gérer l'hypersensibilité ?",
        a: "En général, 4 à 6 séances permettent de développer des ressources durables de régulation. La première séance explore la nature spécifique de votre hypersensibilité et ses domaines d'impact. Les séances suivantes installent progressivement des outils intérieurs — filtres, ancres de calme, espace protecteur — activables dans la vie quotidienne.",
      },
      {
        q: "Est-ce que l'hypnose peut aider à mieux supporter les environnements bruyants ou les foules ?",
        a: "Oui. La surcharge sensorielle (bruit, foule, sollicitations multiples) est l'un des motifs de consultation les plus fréquents des personnes hypersensibles. L'hypnose installe des filtres intérieurs qui réduisent la perméabilité aux stimulations, sans couper de l'environnement.",
      },
    ]),
  ],
  content: `
    <p>Émotions amplifiées, surcharge sensorielle, épuisement après les interactions sociales ? L'hypnose ericksonienne aide les personnes hypersensibles à réguler leur sensibilité sans la renier : ressentir profondément, sans être submergé.</p>

    <h2>Ce que l'hypnose apporte aux hypersensibles</h2>
    <ul>
      <li>Installer des filtres intérieurs contre la surcharge sensorielle et émotionnelle</li>
      <li>Créer des ancres de calme activables en situation (foule, bruit, conflit)</li>
      <li>Restaurer des frontières émotionnelles saines face aux émotions des autres</li>
      <li>Transformer l'hypersensibilité subie en sensibilité choisie et ressource</li>
    </ul>
    <p>En général, 4 à 6 séances permettent de développer des ressources durables de régulation.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-troubles-emotionnels-paris">Troubles émotionnels</a> — La page d'ensemble</li>
      <li><a href="${SITE_URL}/hypnose-charge-emotionnelle-paris">Charge émotionnelle</a> — Porter les émotions des autres</li>
      <li><a href="${SITE_URL}/hypnose-anxiete-emotionnelle-paris">Anxiété émotionnelle</a> — Peur d'être submergé</li>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — Régulation émotionnelle</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour réguler mon hypersensibilité</a>
    `,
};

PAGES["/hypnose-deuil-paris"] = {
  title: "Hypnose deuil et séparation Paris | Alain Zenatti",
  description:
    "Traversez votre deuil avec l'hypnose à Paris 4ème ou en visio. Perte d'un proche, rupture, séparation — accompagnement doux en 4 à 6 séances.",
  canonicalPath: "/hypnose-deuil-paris",
  h1: "Traversez votre deuil avec l'hypnose — Perte, rupture, séparation",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose deuil et séparation Paris",
      description: "Accompagnement du deuil et des séparations par l'hypnose ericksonienne : transformer la douleur brute en souvenirs apaisés. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-deuil-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie deuil",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Gestion des émotions", path: "/hypnose-gestion-emotions-paris" },
      { name: "Deuil et séparation", path: "/hypnose-deuil-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle vraiment aider à traverser un deuil ?",
        a: "Oui. L'hypnose ericksonienne ne prétend pas effacer le deuil — le deuil est une réponse normale et nécessaire à une perte. Elle accompagne le processus en aidant votre inconscient à transformer la douleur brute en souvenirs apaisés, à avancer sans avoir l'impression de trahir la personne perdue, et à retrouver un sens à votre vie.",
      },
      {
        q: "Combien de séances sont nécessaires pour un deuil ?",
        a: "En général, 4 à 6 séances permettent d'accompagner significativement le processus de deuil. Le nombre exact dépend de l'intensité du deuil, de sa durée et des blocages spécifiques. Certaines personnes avancent plus vite, d'autres ont besoin d'un accompagnement plus long.",
      },
      {
        q: "L'hypnose peut-elle aider pour une rupture sentimentale ou un deuil non-mortel ?",
        a: "Oui. Le deuil ne concerne pas que la mort : rupture amoureuse, séparation, perte d'un emploi, éloignement d'un proche déclenchent le même processus psychique de perte. L'hypnose accompagne ces deuils de la même manière, en aidant à intégrer la perte et à se réengager dans sa propre vie. Les séances sont possibles au cabinet comme en visio, avec la même efficacité.",
      },
    ]),
  ],
  content: `
    <p>Perte d'un proche, rupture, séparation : quand le deuil n'avance plus, l'hypnose ericksonienne aide votre inconscient à transformer la douleur brute en souvenirs apaisés — sans rien effacer, sans trahir ce qui a été vécu.</p>

    <h2>Comment l'hypnose accompagne le deuil</h2>
    <ul>
      <li>Apaiser la douleur aiguë et les vagues émotionnelles qui submergent</li>
      <li>Dénouer les blocages du processus de deuil (culpabilité, choses non dites, colère)</li>
      <li>Transformer le lien : de la douleur de l'absence aux souvenirs apaisés</li>
      <li>Retrouver l'élan de vie sans avoir l'impression de trahir la personne perdue</li>
    </ul>
    <p>En général, 4 à 6 séances permettent d'accompagner significativement le processus, au cabinet ou en visio.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-troubles-emotionnels-paris">Troubles émotionnels</a> — Colère, charge émotionnelle</li>
      <li><a href="${SITE_URL}/hypnose-charge-emotionnelle-paris">Charge émotionnelle</a> — Le poids accumulé</li>
      <li><a href="${SITE_URL}/hypnose-sommeil-paris">Sommeil</a> — Quand le deuil empêche de dormir</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour traverser mon deuil</a>
    `,
};

PAGES["/hypnose-traumatismes-paris"] = {
  title: "Hypnose traumatismes psychologiques Paris | Alain Zenatti",
  description:
    "Apaisez un traumatisme psychologique avec l'hypnose à Paris 4ème ou en visio. Choc, accident, agression, stress post-traumatique — accompagnement en douceur, sans revivre le trauma.",
  canonicalPath: "/hypnose-traumatismes-paris",
  h1: "Apaisez un traumatisme avec l'hypnose — Choc, accident, agression, stress post-traumatique",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose traumatismes psychologiques Paris",
      description: "Accompagnement des traumatismes psychologiques par l'hypnose ericksonienne : chocs, accidents, agressions, stress post-traumatique. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-traumatismes-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie traumatismes psychologiques",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Gestion des émotions", path: "/hypnose-gestion-emotions-paris" },
      { name: "Traumatismes psychologiques", path: "/hypnose-traumatismes-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle vraiment aider après un traumatisme ?",
        a: "Oui. L'hypnose ericksonienne offre un cadre sécurisant pour accompagner les conséquences d'un choc psychologique — reviviscences, hypervigilance, évitement, troubles du sommeil. Elle travaille sur la manière dont le souvenir est stocké et vécu par l'inconscient, sans nécessiter de revivre l'événement dans les moindres détails.",
      },
      {
        q: "Est-ce que je vais devoir revivre l'événement traumatique en séance ?",
        a: "Non, ce n'est pas nécessaire. Contrairement à certaines idées reçues, l'hypnose ericksonienne ne vous oblige pas à replonger dans les détails du traumatisme. Nous travaillons de façon dissociée et sécurisée, en installant d'abord un espace de sécurité intérieure, puis en retraitant le souvenir en douceur.",
      },
      {
        q: "L'hypnose peut-elle aider en cas de stress post-traumatique (TSPT) ?",
        a: "L'hypnose peut accompagner certains symptômes du stress post-traumatique (hypervigilance, troubles du sommeil, anxiété anticipatoire). Pour un TSPT caractérisé et sévère, elle s'inscrit idéalement en complément d'un suivi médical ou psychothérapeutique, jamais en remplacement d'un diagnostic ou d'un traitement en cours.",
      },
      {
        q: "Un licenciement peut-il être vécu comme un traumatisme ?",
        a: "Oui. Un licenciement brutal peut ébranler l'identité professionnelle aussi profondément qu'un choc physique : sentiment d'injustice, de trahison, perte de repères. L'hypnose accompagne ce trauma identitaire comme n'importe quel autre choc.",
      },
    ]),
  ],
  content: `
    <p>Accident, agression, choc soudain, licenciement vécu comme une remise en cause identitaire : quand un événement dépasse la capacité à l'intégrer, l'esprit et le corps restent en état d'alerte. L'hypnose ericksonienne accompagne ces conséquences en douceur, sans obligation de revivre l'événement dans le détail.</p>

    <h2>Comment l'hypnose accompagne un traumatisme</h2>
    <ul>
      <li>Installer un ancrage de sécurité mobilisable à tout moment</li>
      <li>Aborder le souvenir en dissociation, puis réassocier les ressources internes</li>
      <li>Apaiser l'hypervigilance et restaurer un sentiment de contrôle, avec un langage permissif qui laisse le client maître du rythme</li>
      <li>Désamorcer les déclencheurs (lieux, sons, sensations) associés au choc</li>
    </ul>
    <p>Selon la nature et l'ancienneté du traumatisme, 4 à 8 séances permettent d'accompagner significativement le processus, au cabinet ou en visio.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-deuil-paris">Deuil et séparation</a> — Quand la perte est aussi un choc</li>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-charge-emotionnelle-paris">Charge émotionnelle</a> — Le poids accumulé</li>
      <li><a href="${SITE_URL}/hypnose-sommeil-paris">Sommeil</a> — Quand le traumatisme empêche de dormir</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour apaiser mon traumatisme</a>
    `,
};

PAGES["/hypnose-frustration-paris"] = {
  title: "Hypnose frustration chronique Paris | Alain Zenatti",
  description:
    "Libérez-vous de la frustration chronique et de l'insatisfaction permanente par l'hypnose à Paris 4ème ou en visio. Résultats en 3 à 5 séances.",
  canonicalPath: "/hypnose-frustration-paris",
  h1: "Hypnose et frustration chronique — Libérez-vous de l'insatisfaction permanente",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose frustration chronique Paris",
      description: "Accompagnement de la frustration chronique et de l'insatisfaction permanente par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-frustration-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie frustration chronique",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Gestion des émotions", path: "/hypnose-gestion-emotions-paris" },
      { name: "Frustration chronique", path: "/hypnose-frustration-paris" },
    ]),
    faqLd([
      {
        q: "Comment l'hypnose peut-elle agir sur la frustration chronique ?",
        a: "La frustration chronique vient souvent de croyances inconscientes sur ce que la vie devrait être, sur ce que vous méritez, sur la façon dont les autres devraient se comporter. L'hypnose accède à ces croyances sous-jacentes pour les recalibrer, vous permettant d'ajuster vos attentes sans perdre vos ambitions légitimes.",
      },
      {
        q: "Combien de séances faut-il pour libérer la frustration chronique ?",
        a: "En général, 3 à 5 séances permettent d'observer des changements significatifs. La frustration chronique ayant souvent des racines profondes (perfectionnisme, blessures d'injustice anciennes, attentes héritées), le travail peut s'étaler sur plusieurs semaines.",
      },
      {
        q: "Est-ce que l'hypnose va me rendre passif(ve) ou résigné(e) ?",
        a: "Non. L'objectif n'est pas la résignation mais la libération : sortir du sentiment permanent d'injustice et d'insatisfaction pour retrouver la capacité d'agir sur ce qui dépend de vous, avec une énergie apaisée. Les séances sont possibles au cabinet ou en visio.",
      },
    ]),
  ],
  content: `
    <p>Sentiment permanent que les choses ne sont jamais comme elles devraient être ? Insatisfaction qui gâche vos réussites ? L'hypnose ericksonienne recalibre les croyances inconscientes qui alimentent la frustration chronique.</p>

    <h2>Comment l'hypnose libère de la frustration chronique</h2>
    <ul>
      <li>Identifier les croyances et attentes inconscientes qui alimentent l'insatisfaction</li>
      <li>Libérer les blessures d'injustice anciennes et le perfectionnisme hérité</li>
      <li>Recalibrer les attentes sans renoncer aux ambitions légitimes</li>
      <li>Retrouver la capacité de savourer ce qui est acquis</li>
    </ul>
    <p>En général, 3 à 5 séances permettent d'observer des changements significatifs.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-colere-paris">Colère et irritabilité</a> — Quand la frustration explose</li>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — Perfectionnisme, auto-sabotage</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Estime de soi</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour sortir de la frustration</a>
    `,
};

PAGES["/hypnose-anxiete-emotionnelle-paris"] = {
  title: "Hypnose anxiété émotionnelle Paris | Alain Zenatti",
  description:
    "Rétablissez la confiance en vos émotions par l'hypnose à Paris 4ème ou en visio. Peur de craquer, contrôle excessif, évitement émotionnel — résultats en 3 à 5 séances.",
  canonicalPath: "/hypnose-anxiete-emotionnelle-paris",
  h1: "Hypnose pour l'anxiété émotionnelle — Rétablir la confiance en ses émotions",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose anxiété émotionnelle Paris",
      description: "Accompagnement de l'anxiété émotionnelle (peur de craquer, contrôle excessif, évitement émotionnel) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-anxiete-emotionnelle-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie anxiété émotionnelle",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Gestion des émotions", path: "/hypnose-gestion-emotions-paris" },
      { name: "Anxiété émotionnelle", path: "/hypnose-anxiete-emotionnelle-paris" },
    ]),
    faqLd([
      {
        q: "Qu'est-ce que l'anxiété émotionnelle et comment l'hypnose peut-elle aider ?",
        a: "L'anxiété émotionnelle est la peur d'être submergé(e) par ses propres émotions — craindre de craquer, de perdre le contrôle, d'être envahi(e) par la tristesse, la colère ou la panique. L'hypnose ericksonienne travaille sur les croyances inconscientes qui font de vos émotions une menace, et vous aide à rétablir une relation de confiance avec votre vie émotionnelle.",
      },
      {
        q: "J'ai peur de craquer si je commence à ressentir mes émotions — est-ce un risque avec l'hypnose ?",
        a: "Non. L'hypnose ericksonienne procède toujours à votre rythme et ne force rien. Nous travaillons dans votre zone de confort émotionnel. Si quelque chose de difficile émerge, nous avons des outils pour le gérer en douceur. Beaucoup de clients redoutent cette crainte avant la première séance et se retrouvent au contraire dans un état de calme profond.",
      },
      {
        q: "Combien de séances sont nécessaires pour l'anxiété émotionnelle ?",
        a: "En général, 3 à 5 séances permettent des résultats significatifs : la confiance dans ses propres émotions se rétablit progressivement, le contrôle excessif se relâche, l'évitement émotionnel diminue. Les séances sont possibles au cabinet ou en visio.",
      },
    ]),
  ],
  content: `
    <p>Peur de craquer, contrôle permanent de ce que vous ressentez, évitement de tout ce qui pourrait faire remonter des émotions ? L'hypnose ericksonienne rétablit une relation de confiance avec votre vie émotionnelle.</p>

    <h2>Comment l'hypnose traite l'anxiété émotionnelle</h2>
    <ul>
      <li>Transformer les croyances inconscientes qui font des émotions une menace</li>
      <li>Relâcher le contrôle excessif sans perdre la maîtrise de soi</li>
      <li>Apprivoiser progressivement les émotions évitées, à votre rythme</li>
      <li>Installer la confiance : ressentir sans craindre de s'effondrer</li>
    </ul>
    <p>En général, 3 à 5 séances permettent des résultats significatifs.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Stress et anxiété</a> — Anxiété généralisée</li>
      <li><a href="${SITE_URL}/hypnose-hypersensibilite-paris">Hypersensibilité</a> — Émotions amplifiées</li>
      <li><a href="${SITE_URL}/hypnose-charge-emotionnelle-paris">Charge émotionnelle</a> — Saturation émotionnelle</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour apaiser l'anxiété émotionnelle</a>
    `,
};

PAGES["/hypnose-charge-emotionnelle-paris"] = {
  title: "Hypnose charge émotionnelle Paris | Alain Zenatti",
  description:
    "Accompagnement de la charge émotionnelle et de l'épuisement émotionnel par l'hypnose à Paris 4ème ou en visio. Fatigue, saturation, absorption des émotions. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-charge-emotionnelle-paris",
  h1: "Hypnose et charge émotionnelle — Déposer le poids que vous portez seul(e)",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose charge émotionnelle Paris",
      description: "Accompagnement de la charge émotionnelle et de l'épuisement émotionnel par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-charge-emotionnelle-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie charge émotionnelle",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Troubles émotionnels", path: "/hypnose-troubles-emotionnels-paris" },
      { name: "Charge émotionnelle", path: "/hypnose-charge-emotionnelle-paris" },
    ]),
    faqLd([
      {
        q: "Qu'est-ce que la charge émotionnelle exactement ?",
        a: "La charge émotionnelle, c'est l'accumulation progressive des émotions non digérées — tristesses, colères, inquiétudes, déceptions — qui s'accumulent dans l'inconscient sans avoir pu être exprimées ou traitées. Avec le temps, ce poids devient de plus en plus lourd : fatigue chronique, sentiment d'être constamment à bout, réactions disproportionnées, irritabilité, larmes sans raison apparente.",
      },
      {
        q: "Comment l'hypnose aide-t-elle à alléger la charge émotionnelle ?",
        a: "En état de relaxation profonde, l'hypnose accède directement à l'inconscient où les émotions sont stockées. Je vous guide pour identifier les charges spécifiques — d'où elles viennent, ce qu'elles contiennent — et créer les conditions pour qu'elles puissent être libérées. C'est un processus en douceur, qui va à votre rythme. Beaucoup de clients décrivent un sentiment de légèreté très concret après les séances.",
      },
      {
        q: "Pourquoi ai-je l'impression de porter les émotions des autres en plus des miennes ?",
        a: "Certaines personnes — souvent empathiques ou hypersensibles — absorbent les émotions de leur entourage sans filtre. L'hypnose travaille à restaurer des frontières émotionnelles saines : rester à l'écoute des autres sans porter leur poids à leur place.",
      },
    ]),
  ],
  content: `
    <p>Fatigue qui ne passe pas, sentiment d'être saturé(e), impression de porter les émotions de tout le monde ? La charge émotionnelle est un poids accumulé que l'hypnose ericksonienne aide à déposer, en douceur.</p>

    <h2>Comment l'hypnose allège la charge émotionnelle</h2>
    <ul>
      <li>Identifier les émotions accumulées et non digérées stockées dans l'inconscient</li>
      <li>Libérer progressivement ces charges, à votre rythme</li>
      <li>Restaurer des frontières émotionnelles saines face aux émotions des autres</li>
      <li>Retrouver énergie et légèreté au quotidien</li>
    </ul>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-troubles-emotionnels-paris">Troubles émotionnels</a> — La page d'ensemble</li>
      <li><a href="${SITE_URL}/hypnose-hypersensibilite-paris">Hypersensibilité</a> — Absorption des émotions</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Stress et anxiété</a> — Épuisement, burn-out</li>
      <li><a href="${SITE_URL}/hypnose-sommeil-paris">Sommeil</a> — Fatigue chronique</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour alléger ma charge émotionnelle</a>
    `,
};

// ─── Sous-pages blocages & comportements ───────────────────────────────────

PAGES["/hypnose-procrastination-paris"] = {
  title: "Hypnose procrastination Paris & en ligne | Alain Zenatti",
  description:
    "Arrêtez de procrastiner grâce à l'hypnose à Paris 4ème ou en visio. Peur de l'échec, perfectionnisme, blocage à l'action — l'hypnose agit sur la cause, pas le symptôme. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-procrastination-paris",
  h1: "Hypnose et procrastination — Libérez-vous du blocage à l'action",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose procrastination Paris",
      description: "Traitement de la procrastination par l'hypnose ericksonienne : agir sur la peur cachée derrière le report permanent. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-procrastination-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie procrastination",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Blocages & Comportements", path: "/hypnose-blocages-paris" },
      { name: "Procrastination", path: "/hypnose-procrastination-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle vraiment aider à arrêter de procrastiner ?",
        a: "Oui, et c'est l'une de ses applications les plus efficaces. La procrastination n'est pas un défaut de caractère — c'est un mécanisme de protection inconscient, souvent lié à la peur de l'échec, au perfectionnisme ou à l'anxiété de performance. L'hypnose identifie la peur cachée derrière votre procrastination et la neutralise à la source. Vous retrouvez naturellement la capacité de passer à l'action, sans forcer.",
      },
      {
        q: "Combien de séances d'hypnose pour vaincre la procrastination ?",
        a: "En général, 3 à 5 séances suffisent pour des résultats durables. La première séance identifie les mécanismes sous-jacents (peur de l'échec, perfectionnisme, auto-sabotage). Les séances suivantes reprogramment ces automatismes. Beaucoup de clients constatent un changement significatif dès la deuxième ou troisième séance.",
      },
      {
        q: "La procrastination est-elle liée à un manque de volonté ?",
        a: "Non. Si la volonté suffisait, vous auriez déjà arrêté. La procrastination est pilotée par l'inconscient — c'est pourquoi l'hypnose, qui travaille directement à ce niveau, obtient des résultats là où les injonctions à « se bouger » échouent.",
      },
    ]),
  ],
  content: `
    <p>Vous reportez sans cesse ce qui compte, malgré votre volonté ? La procrastination n'est pas de la paresse : c'est un mécanisme de protection inconscient. L'hypnose ericksonienne le neutralise à la source — peur de l'échec, perfectionnisme, anxiété de performance.</p>

    <h2>Comment l'hypnose traite la procrastination</h2>
    <ul>
      <li>Identifier la peur cachée derrière le report permanent (échec, jugement, perfection)</li>
      <li>Neutraliser le mécanisme de protection devenu handicapant</li>
      <li>Reprogrammer le passage à l'action : de la résistance à la fluidité</li>
      <li>Ancrer la capacité d'agir sans lutte intérieure</li>
    </ul>
    <p>En général, 3 à 5 séances suffisent pour des résultats durables.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-blocages-professionnels-paris">Blocages professionnels</a> — Auto-sabotage, syndrome de l'imposteur</li>
      <li><a href="${SITE_URL}/hypnose-schemas-repetitifs-paris">Schémas répétitifs</a> — Cycles qui se répètent</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Estime de soi, oser agir</li>
      <li><a href="${SITE_URL}/guide-procrastination">Guide gratuit procrastination</a> — E-book offert</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour arrêter de procrastiner</a>
    `,
};

PAGES["/hypnose-onychophagie-paris"] = {
  title: "Hypnose onychophagie (rongement des ongles) Paris | Alain Zenatti",
  description:
    "Arrêtez de vous ronger les ongles grâce à l'hypnose à Paris 4ème ou en visio. L'onychophagie cède souvent en 1 à 3 séances. Alain Zenatti, Maître Hypnologue Paris.",
  canonicalPath: "/hypnose-onychophagie-paris",
  h1: "Hypnose et onychophagie — Arrêtez de vous ronger les ongles définitivement",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose onychophagie Paris",
      description: "Traitement de l'onychophagie (rongement des ongles) par l'hypnose ericksonienne, souvent en 1 à 3 séances. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-onychophagie-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie onychophagie",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Blocages & Comportements", path: "/hypnose-blocages-paris" },
      { name: "Onychophagie", path: "/hypnose-onychophagie-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle vraiment faire arrêter de se ronger les ongles ?",
        a: "Oui, et c'est l'une des applications les plus efficaces de l'hypnose ericksonienne. L'onychophagie est un automatisme inconscient, souvent lié à la gestion du stress ou à un besoin de réconfort. L'hypnose identifie la fonction cachée du comportement — ce que le geste cherche à satisfaire — et propose à l'inconscient une alternative. En 1 à 3 séances, la plupart des clients cessent de se ronger les ongles sans effort de volonté.",
      },
      {
        q: "Je me ronge les ongles sans même m'en rendre compte — est-ce que l'hypnose peut quand même aider ?",
        a: "Oui, c'est même le cas typique. L'automatisme se déclenche hors de la conscience, ce qui explique pourquoi la volonté seule échoue. L'hypnose travaille précisément au niveau où le geste se décide : l'inconscient.",
      },
      {
        q: "L'onychophagie est-elle liée au stress ou à de l'anxiété ?",
        a: "Très souvent, oui. Le rongement des ongles est une stratégie d'auto-apaisement : il décharge une tension intérieure. C'est pourquoi la séance travaille aussi sur la source de la tension, pas seulement sur le geste.",
      },
    ]),
  ],
  content: `
    <p>Vous vous rongez les ongles depuis des années, souvent sans vous en rendre compte ? L'onychophagie est un automatisme inconscient — l'hypnose ericksonienne le désactive en travaillant sur sa fonction cachée. La plupart des clients arrêtent en 1 à 3 séances.</p>

    <h2>Comment l'hypnose fait cesser l'onychophagie</h2>
    <ul>
      <li>Identifier la fonction du geste : décharge de stress, réconfort, concentration</li>
      <li>Proposer à l'inconscient une alternative qui satisfait le même besoin</li>
      <li>Neutraliser le déclenchement automatique, même hors de la conscience</li>
      <li>Travailler la source de la tension (stress, anxiété) pour un résultat durable</li>
    </ul>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-toc-rituels-paris">TOC et rituels compulsifs</a> — Comportements répétitifs</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Stress et anxiété</a> — La tension sous-jacente</li>
      <li><a href="${SITE_URL}/hypnose-procrastination-paris">Procrastination</a> — Autres automatismes</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour arrêter de me ronger les ongles</a>
    `,
};

PAGES["/hypnose-toc-rituels-paris"] = {
  title: "Hypnose TOC & rituels compulsifs Paris & en ligne | Alain Zenatti",
  description:
    "Libérez-vous des TOC, rituels compulsifs et comportements répétitifs (trichotillomanie) par l'hypnose à Paris 4ème ou en visio. L'hypnose agit sur l'anxiété sous-jacente. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-toc-rituels-paris",
  h1: "Hypnose, TOC et rituels compulsifs — Libérez-vous des comportements répétitifs",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose TOC et rituels compulsifs Paris",
      description: "Accompagnement des TOC légers à modérés, rituels compulsifs et trichotillomanie par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-toc-rituels-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie TOC et rituels",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Blocages & Comportements", path: "/hypnose-blocages-paris" },
      { name: "TOC & Rituels", path: "/hypnose-toc-rituels-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle aider avec les TOC et les rituels compulsifs ?",
        a: "L'hypnose accompagne efficacement les TOC légers à modérés en travaillant sur le mécanisme d'anxiété sous-jacent. Les rituels compulsifs — vérifications, lavages, comptage, arrachage de cheveux — sont des stratégies que l'inconscient a mises en place pour gérer une anxiété profonde. L'hypnose réduit cette anxiété à sa source et propose à l'inconscient des alternatives plus adaptées. Pour les TOC sévères, l'hypnose constitue un complément à un suivi spécialisé.",
      },
      {
        q: "L'hypnose peut-elle traiter la trichotillomanie (arrachage de cheveux) ?",
        a: "Oui. La trichotillomanie est un comportement répétitif centré sur le corps (BFRB), apparenté aux TOC, souvent lié à une tension interne ou à un mécanisme de régulation émotionnelle. L'hypnose identifie la fonction du comportement et propose une alternative inconsciente. Certains clients constatent une réduction significative dès les premières séances.",
      },
      {
        q: "Quelle est la différence entre un TOC et un rituel habituel ?",
        a: "Un rituel devient un TOC quand il s'impose : impossible d'y résister sans angoisse majeure, temps consacré croissant, retentissement sur la vie quotidienne. C'est l'anxiété qui pilote — et c'est elle que l'hypnose cible.",
      },
    ]),
  ],
  content: `
    <p>Vérifications sans fin, lavages, comptages, arrachage de cheveux : les rituels compulsifs sont des stratégies inconscientes de gestion de l'anxiété. L'hypnose ericksonienne réduit cette anxiété à sa source, pour les TOC légers à modérés.</p>

    <h2>Comment l'hypnose agit sur les TOC et rituels</h2>
    <ul>
      <li>Réduire l'anxiété profonde qui pilote les compulsions</li>
      <li>Identifier la fonction protectrice du rituel pour l'inconscient</li>
      <li>Proposer des alternatives de régulation plus adaptées</li>
      <li>Accompagner aussi la trichotillomanie et les comportements répétitifs centrés sur le corps (BFRB)</li>
    </ul>
    <p>Pour les TOC sévères, l'hypnose s'inscrit en complément d'un suivi spécialisé, jamais en substitution.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-onychophagie-paris">Onychophagie</a> — Rongement des ongles</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Stress et anxiété</a> — L'anxiété sous-jacente</li>
      <li><a href="${SITE_URL}/hypnose-schemas-repetitifs-paris">Schémas répétitifs</a> — Cycles inconscients</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour me libérer des rituels compulsifs</a>
    `,
};

PAGES["/hypnose-schemas-repetitifs-paris"] = {
  title: "Hypnose schémas répétitifs Paris & en ligne | Alain Zenatti",
  description:
    "Brisez vos schémas répétitifs en amour et au travail grâce à l'hypnose à Paris 4ème ou en visio. L'hypnose reprogramme les cycles inconscients à leur source. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-schemas-repetitifs-paris",
  h1: "Hypnose et schémas répétitifs — Brisez les cycles qui se répètent",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose schémas répétitifs Paris",
      description: "Accompagnement des schémas répétitifs amoureux et professionnels par l'hypnose ericksonienne : reprogrammer les cycles inconscients à leur source. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-schemas-repetitifs-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie schémas répétitifs",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Blocages & Comportements", path: "/hypnose-blocages-paris" },
      { name: "Schémas répétitifs", path: "/hypnose-schemas-repetitifs-paris" },
    ]),
    faqLd([
      {
        q: "Pourquoi reproduit-on les mêmes schémas relationnels malgré soi ?",
        a: "Parce que ces schémas sont pilotés par l'inconscient, pas par le choix conscient. Votre inconscient a appris, souvent dans l'enfance, qu'un certain type de relation était la norme — même si cette norme était douloureuse. Il cherche à recréer ce qu'il connaît parce que le familier est rassurant, même quand c'est difficile. C'est ce programme inconscient que l'hypnose peut identifier et transformer.",
      },
      {
        q: "L'hypnose peut-elle vraiment briser les schémas répétitifs en amour ?",
        a: "Oui, c'est l'une de ses applications les plus puissantes. Toujours choisir le même type de partenaire, reproduire les mêmes conflits, s'auto-saboter à chaque relation qui commence bien : ces cycles sont maintenus par des programmes inconscients souvent installés dans l'enfance. L'hypnose identifie le schéma fondateur, remonte à son origine et reprogramme la réponse inconsciente.",
      },
      {
        q: "Comment savoir si je suis dans un schéma répétitif ?",
        a: "Le signe le plus net : le sentiment de « rejouer le même film » avec des personnes ou des contextes différents — mêmes types de relations, mêmes conflits au travail, mêmes impasses. Si le scénario se répète malgré vos décisions conscientes de faire autrement, un programme inconscient est probablement à l'œuvre.",
      },
    ]),
  ],
  content: `
    <p>Toujours le même type de partenaire, les mêmes conflits, les mêmes impasses professionnelles ? Quand le scénario se répète malgré vos décisions conscientes, un programme inconscient est à l'œuvre. L'hypnose ericksonienne le reprogramme à sa source.</p>

    <h2>Comment l'hypnose brise les schémas répétitifs</h2>
    <ul>
      <li>Identifier le schéma fondateur et son origine (souvent dans l'enfance)</li>
      <li>Comprendre ce que le cycle cherche à rejouer ou à réparer</li>
      <li>Reprogrammer la réponse inconsciente qui perpétue le scénario</li>
      <li>Ouvrir de nouveaux choix relationnels et professionnels réels</li>
    </ul>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-blocages-professionnels-paris">Blocages professionnels</a> — Auto-sabotage de carrière</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Estime de soi</li>
      <li><a href="${SITE_URL}/hypnose-procrastination-paris">Procrastination</a> — Blocage à l'action</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour briser mes schémas répétitifs</a>
    `,
};

PAGES["/hypnose-blocages-professionnels-paris"] = {
  title: "Hypnose blocages professionnels Paris & en ligne | Alain Zenatti",
  description:
    "Levez vos blocages professionnels par l'hypnose à Paris 4ème ou en visio. Auto-sabotage, syndrome de l'imposteur, peur de réussir — l'hypnose agit sur les freins inconscients. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-blocages-professionnels-paris",
  h1: "Hypnose et blocages professionnels — Levez les freins qui bloquent votre carrière",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose blocages professionnels Paris",
      description: "Accompagnement des blocages professionnels (auto-sabotage, syndrome de l'imposteur, peur de réussir) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-blocages-professionnels-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie blocages professionnels",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Blocages & Comportements", path: "/hypnose-blocages-paris" },
      { name: "Blocages professionnels", path: "/hypnose-blocages-professionnels-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle aider à surmonter les blocages professionnels ?",
        a: "Oui, et c'est l'une de ses applications les plus concrètes. Les blocages professionnels — peur de demander une augmentation, incapacité à passer à l'action, auto-sabotage avant une promotion, syndrome de l'imposteur — sont pilotés par des croyances inconscientes. L'hypnose accède directement à ces programmes pour les transformer. Un changement est souvent notable dès les premières séances.",
      },
      {
        q: "Comment l'hypnose aide-t-elle contre le syndrome de l'imposteur ?",
        a: "Le syndrome de l'imposteur repose sur des croyances inconscientes de non-légitimité, souvent installées bien avant la vie professionnelle. L'hypnose remonte à ces croyances, les déconstruit et installe un sentiment de légitimité aligné avec vos compétences réelles.",
      },
      {
        q: "Qu'est-ce que l'auto-sabotage professionnel ?",
        a: "C'est le mécanisme par lequel l'inconscient fait échouer ce que vous désirez consciemment : rater un entretien décisif, procrastiner un dossier stratégique, fuir une promotion. Derrière, il y a souvent une peur cachée — de réussir, d'être exposé, de trahir son milieu d'origine. L'hypnose identifie cette peur et la neutralise.",
      },
    ]),
  ],
  content: `
    <p>Peur de demander une augmentation, auto-sabotage avant une promotion, sentiment d'imposture malgré vos compétences ? Les blocages professionnels sont pilotés par des croyances inconscientes que l'hypnose ericksonienne transforme directement.</p>

    <h2>Blocages professionnels traités par l'hypnose</h2>
    <ul>
      <li>Syndrome de l'imposteur et sentiment de non-légitimité</li>
      <li>Auto-sabotage : échouer ce que l'on désire consciemment</li>
      <li>Peur de réussir, peur d'être exposé, peur de dépasser son milieu d'origine</li>
      <li>Incapacité à négocier, à se positionner, à passer à l'action</li>
    </ul>
    <p>Un changement est souvent notable dès les premières séances : une capacité à agir qui se débloque naturellement.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-professionnels-paris">Hypnose pour les professionnels</a> — Burn-out, performance</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Légitimité, estime de soi</li>
      <li><a href="${SITE_URL}/hypnose-procrastination-paris">Procrastination</a> — Blocage à l'action</li>
      <li><a href="${SITE_URL}/hypnose-peur-parler-public-paris">Peur de parler en public</a> — Prise de parole</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour lever mes blocages professionnels</a>
    `,
};

PAGES["/hypnose-addictions-comportementales-paris"] = {
  title: "Hypnose addictions comportementales Paris & en ligne | Alain Zenatti",
  description:
    "Libérez-vous de vos addictions comportementales (jeux d'argent, écrans, achats compulsifs) par l'hypnose à Paris 4ème ou en visio. L'hypnose agit sur la cause émotionnelle. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-addictions-comportementales-paris",
  h1: "Hypnose et addictions comportementales — Libérez-vous des comportements dont vous n'arrivez pas à vous défaire",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose addictions comportementales Paris",
      description: "Accompagnement des addictions comportementales (jeux d'argent, écrans, achats compulsifs, réseaux sociaux) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-addictions-comportementales-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie addictions comportementales",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Blocages & Comportements", path: "/hypnose-blocages-paris" },
      { name: "Addictions comportementales", path: "/hypnose-addictions-comportementales-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle aider à se libérer d'une addiction comportementale ?",
        a: "Oui. Les addictions comportementales — jeux d'argent, écrans, achats compulsifs, réseaux sociaux — partagent le même mécanisme : un comportement qui procure un soulagement immédiat à une tension émotionnelle profonde. L'hypnose identifie cette tension sous-jacente et propose à l'inconscient d'autres façons de la gérer. Le comportement addictif perd alors sa raison d'être et son emprise se réduit.",
      },
      {
        q: "Combien de séances d'hypnose pour traiter une addiction comportementale ?",
        a: "En général, 4 à 6 séances permettent d'obtenir des résultats significatifs. Le nombre dépend de l'ancienneté de l'addiction, de son intensité et de la complexité des mécanismes émotionnels sous-jacents. Les premières séances identifient la fonction de l'addiction ; les suivantes reprogramment ces mécanismes et ancrent de nouvelles stratégies de régulation.",
      },
      {
        q: "Quelle différence entre addiction comportementale et addiction aux substances ?",
        a: "L'addiction comportementale ne repose pas sur une substance chimique mais sur un comportement (jouer, acheter, scroller) qui active le circuit de la récompense. Le mécanisme émotionnel est comparable — c'est lui que l'hypnose cible. Pour les addictions aux substances, un accompagnement médical est nécessaire en parallèle.",
      },
    ]),
  ],
  content: `
    <p>Jeux d'argent, écrans, achats compulsifs, réseaux sociaux : quand un comportement prend le contrôle malgré vous, il répond à une tension émotionnelle profonde. L'hypnose ericksonienne agit sur cette cause, pas seulement sur le comportement.</p>

    <h2>Comment l'hypnose réduit l'emprise des addictions comportementales</h2>
    <ul>
      <li>Identifier la tension émotionnelle que le comportement vient soulager</li>
      <li>Proposer à l'inconscient d'autres stratégies de régulation</li>
      <li>Réduire le déclenchement automatique du comportement compulsif</li>
      <li>Ancrer des sources de satisfaction durables et choisies</li>
    </ul>
    <p>En général, 4 à 6 séances permettent des résultats significatifs, selon l'ancienneté et l'intensité de l'addiction.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-blocages-paris">Blocages et comportements</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-arret-tabac-paris">Arrêt du tabac</a> — Se libérer de la cigarette</li>
      <li><a href="${SITE_URL}/hypnose-addiction-sucre-paris">Addiction au sucre</a> — Dépendance sucrée</li>
      <li><a href="${SITE_URL}/hypnose-toc-rituels-paris">TOC et rituels</a> — Compulsions</li>
      <li><a href="${SITE_URL}/hypnose-stress-anxiete-paris">Stress et anxiété</a> — La tension sous-jacente</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour me libérer d'une addiction comportementale</a>
    `,
};

// ─── Sous-pages troubles alimentaires ──────────────────────────────────────

PAGES["/hypnose-compulsions-alimentaires-paris"] = {
  title: "Hypnose compulsions alimentaires Paris & en ligne | Alain Zenatti",
  description:
    "Libérez-vous des compulsions alimentaires par l'hypnose à Paris 4ème ou en visio. L'hypnose traite la cause émotionnelle, pas le symptôme. Alain Zenatti, Maître Hypnologue Paris.",
  canonicalPath: "/hypnose-compulsions-alimentaires-paris",
  h1: "Hypnose et compulsions alimentaires — Libérez-vous des envies incontrôlables",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose compulsions alimentaires Paris",
      description: "Traitement des compulsions alimentaires par l'hypnose ericksonienne : agir sur le déclencheur émotionnel. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-compulsions-alimentaires-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie compulsions alimentaires",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Troubles alimentaires", path: "/hypnose-troubles-alimentaires-paris" },
      { name: "Compulsions alimentaires", path: "/hypnose-compulsions-alimentaires-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle vraiment arrêter les compulsions alimentaires ?",
        a: "Oui. Les compulsions alimentaires — ces envies soudaines et incontrôlables de manger en dehors des repas — sont des comportements pilotés par l'inconscient en réponse à une tension émotionnelle. L'hypnose identifie le déclencheur émotionnel (stress, ennui, anxiété, tristesse) et propose à l'inconscient des réponses alternatives. En 3 à 5 séances, la fréquence et l'intensité des compulsions diminuent significativement.",
      },
      {
        q: "Pourquoi les régimes ne résolvent-ils pas les compulsions alimentaires ?",
        a: "Parce que les régimes traitent le symptôme (ce que vous mangez) sans toucher à la cause (pourquoi l'inconscient déclenche l'envie). La restriction augmente même souvent la tension intérieure, donc les compulsions. L'hypnose inverse la logique : elle apaise le déclencheur émotionnel, et le comportement se normalise naturellement.",
      },
      {
        q: "Comment différencier une vraie faim d'une compulsion alimentaire ?",
        a: "La faim physique s'installe progressivement, peut attendre et se satisfait de plusieurs aliments. La compulsion surgit brutalement, exige un aliment précis (souvent sucré ou gras), et laisse culpabilité ou vide après coup. C'est cette signature émotionnelle que l'hypnose cible.",
      },
    ]),
  ],
  content: `
    <p>Envies soudaines et incontrôlables de manger, souvent sans faim réelle ? Les compulsions alimentaires sont pilotées par l'inconscient en réponse à une tension émotionnelle. L'hypnose ericksonienne traite ce déclencheur — pas seulement le symptôme.</p>

    <h2>Comment l'hypnose traite les compulsions alimentaires</h2>
    <ul>
      <li>Identifier le déclencheur émotionnel : stress, ennui, anxiété, tristesse</li>
      <li>Proposer à l'inconscient des réponses alternatives à la tension</li>
      <li>Dissocier l'émotion du réflexe alimentaire</li>
      <li>Restaurer une relation apaisée à la nourriture, sans restriction ni lutte</li>
    </ul>
    <p>En 3 à 5 séances, la fréquence et l'intensité des compulsions diminuent significativement.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-troubles-alimentaires-paris">Troubles alimentaires</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-alimentation-emotionnelle-paris">Alimentation émotionnelle</a> — Manger ses émotions</li>
      <li><a href="${SITE_URL}/hypnose-grignotage-paris">Grignotage</a> — Automatismes entre les repas</li>
      <li><a href="${SITE_URL}/hypnose-boulimie-paris">Boulimie</a> — Crises alimentaires</li>
      <li><a href="${SITE_URL}/hypnose-addiction-sucre-paris">Addiction au sucre</a> — Dépendance sucrée</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour arrêter les compulsions alimentaires</a>
    `,
};

PAGES["/hypnose-grignotage-paris"] = {
  title: "Hypnose grignotage chronique Paris & en ligne | Alain Zenatti",
  description:
    "Arrêtez de grignoter grâce à l'hypnose à Paris 4ème ou en visio. Grignotage anxieux, au bureau, devant la télé — l'hypnose traite le déclencheur émotionnel. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-grignotage-paris",
  h1: "Hypnose et grignotage — Arrêtez de grignoter entre les repas",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose grignotage Paris",
      description: "Traitement du grignotage chronique par l'hypnose ericksonienne : agir sur l'état émotionnel déclencheur. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-grignotage-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie grignotage",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Troubles alimentaires", path: "/hypnose-troubles-alimentaires-paris" },
      { name: "Grignotage", path: "/hypnose-grignotage-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle arrêter le grignotage chronique ?",
        a: "Oui. Le grignotage chronique est un automatisme alimentaire souvent lié à l'anxiété, à l'ennui ou à la concentration. L'hypnose identifie l'état émotionnel qui déclenche le grignotage et propose à l'inconscient des alternatives. En 3 à 5 séances, la plupart des clients voient le grignotage se réduire considérablement, souvent dès la deuxième séance.",
      },
      {
        q: "Quelle est la différence entre grignotage et faim normale ?",
        a: "La faim physique s'installe progressivement et se satisfait d'un vrai repas. Le grignotage se déclenche par l'état intérieur — anxiété, ennui, besoin de pause — indépendamment du besoin nutritionnel : main qui cherche le placard au bureau, chips devant la télé, biscuits en télétravail.",
      },
      {
        q: "Le grignotage est-il toujours lié au stress ?",
        a: "Pas uniquement. Le stress est un déclencheur fréquent, mais l'ennui, la concentration prolongée, la solitude ou de simples associations conditionnées (télé = snack) entretiennent aussi l'automatisme. La séance identifie votre déclencheur spécifique pour le neutraliser.",
      },
    ]),
  ],
  content: `
    <p>Main qui cherche le placard au bureau, biscuits devant la télé, grignotage en télétravail ? Le grignotage chronique est un automatisme déclenché par un état émotionnel — anxiété, ennui, besoin de pause. L'hypnose ericksonienne neutralise ce déclencheur.</p>

    <h2>Comment l'hypnose fait cesser le grignotage</h2>
    <ul>
      <li>Identifier l'état émotionnel déclencheur (anxiété, ennui, concentration)</li>
      <li>Défaire les associations conditionnées (télé = snack, écran = biscuits)</li>
      <li>Proposer à l'inconscient d'autres réponses au besoin réel</li>
      <li>Retrouver un rythme alimentaire naturel, sans lutte de volonté</li>
    </ul>
    <p>En 3 à 5 séances, le grignotage se réduit considérablement — souvent dès la deuxième séance.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-troubles-alimentaires-paris">Troubles alimentaires</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-compulsions-alimentaires-paris">Compulsions alimentaires</a> — Envies incontrôlables</li>
      <li><a href="${SITE_URL}/hypnose-addiction-sucre-paris">Addiction au sucre</a> — Envies sucrées</li>
      <li><a href="${SITE_URL}/hypnose-alimentation-emotionnelle-paris">Alimentation émotionnelle</a> — Manger ses émotions</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour arrêter de grignoter</a>
    `,
};

PAGES["/hypnose-addiction-sucre-paris"] = {
  title: "Hypnose addiction au sucre Paris & en ligne | Alain Zenatti",
  description:
    "Libérez-vous de l'addiction au sucre par l'hypnose à Paris 4ème ou en visio. L'hypnose agit sur les causes émotionnelles de la dépendance sucrée. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-addiction-sucre-paris",
  h1: "Hypnose et addiction au sucre — Libérez-vous de la dépendance sucrée",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose addiction au sucre Paris",
      description: "Accompagnement de l'addiction au sucre par l'hypnose ericksonienne : agir sur les besoins émotionnels sous-jacents. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-addiction-sucre-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie addiction au sucre",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Troubles alimentaires", path: "/hypnose-troubles-alimentaires-paris" },
      { name: "Addiction au sucre", path: "/hypnose-addiction-sucre-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle vraiment réduire l'addiction au sucre ?",
        a: "Oui, c'est une problématique accompagnée régulièrement au cabinet. L'addiction au sucre n'est pas qu'une question de goût — le sucre agit sur le circuit de la récompense du cerveau et répond souvent à des besoins émotionnels (réconfort, stimulation, soulagement du stress). L'hypnose identifie ces besoins sous-jacents et aide votre inconscient à les satisfaire autrement. L'attrait pour le sucre diminue naturellement, sans restriction forcée.",
      },
      {
        q: "Pourquoi est-il si difficile de réduire sa consommation de sucre malgré la volonté ?",
        a: "Parce que l'envie de sucre est pilotée par l'inconscient et le circuit de la récompense, pas par la raison. La volonté lutte contre un mécanisme automatique — c'est un combat perdu d'avance. L'hypnose modifie le mécanisme lui-même, si bien que l'envie diminue au lieu de devoir être combattue.",
      },
      {
        q: "L'hypnose peut-elle aider à réduire les envies de sucre même après les repas ?",
        a: "Oui. Les envies de sucre après les repas sont souvent liées à des associations conditionnées (« je termine toujours par du sucré ») ou à un besoin de clôturer le repas. L'hypnose travaille sur ces associations spécifiques pour les neutraliser. Beaucoup de clients constatent que ces envies systématiques disparaissent après 2 à 3 séances.",
      },
    ]),
  ],
  content: `
    <p>Impossible de finir un repas sans sucré, envies irrépressibles dans la journée ? L'addiction au sucre active le circuit de la récompense et répond à des besoins émotionnels. L'hypnose ericksonienne agit sur ces causes — l'attrait du sucre diminue naturellement, sans restriction forcée.</p>

    <h2>Comment l'hypnose réduit la dépendance au sucre</h2>
    <ul>
      <li>Identifier les besoins émotionnels que le sucre vient satisfaire (réconfort, stimulation, apaisement)</li>
      <li>Neutraliser les associations conditionnées (fin de repas = sucré, pause = gâteau)</li>
      <li>Aider l'inconscient à satisfaire ces besoins autrement</li>
      <li>Faire diminuer l'envie plutôt que la combattre</li>
    </ul>
    <p>Les envies systématiques disparaissent souvent après 2 à 3 séances.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-troubles-alimentaires-paris">Troubles alimentaires</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-grignotage-paris">Grignotage</a> — Automatismes alimentaires</li>
      <li><a href="${SITE_URL}/hypnose-compulsions-alimentaires-paris">Compulsions alimentaires</a> — Envies incontrôlables</li>
      <li><a href="${SITE_URL}/hypnose-addictions-comportementales-paris">Addictions comportementales</a> — Autres dépendances</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour me libérer du sucre</a>
    `,
};

PAGES["/hypnose-boulimie-paris"] = {
  title: "Hypnose boulimie Paris & en ligne | Alain Zenatti",
  description:
    "Accompagnement par l'hypnose pour la boulimie à Paris 4ème ou en visio. Approche profonde et bienveillante, centrée sur les causes émotionnelles. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-boulimie-paris",
  h1: "Hypnose et boulimie — Se libérer en allant au cœur du problème",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose boulimie Paris",
      description: "Accompagnement par l'hypnose ericksonienne pour la boulimie à Paris 4ème ou en visio. Approche profonde, bienveillante, centrée sur les causes émotionnelles.",
      url: `${SITE_URL}/hypnose-boulimie-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie boulimie",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Troubles alimentaires", path: "/hypnose-troubles-alimentaires-paris" },
      { name: "Boulimie", path: "/hypnose-boulimie-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle aider contre la boulimie ?",
        a: "Oui, et c'est un accompagnement qui demande une approche profonde, pas seulement symptomatique. La boulimie n'est pas un problème d'alimentation — c'est une façon de gérer une douleur intérieure, souvent ancienne. L'hypnose permet d'aller à la source de cette douleur : les blessures émotionnelles non intégrées, les situations de perte de contrôle, les émotions qui ne trouvent pas d'autre sortie.",
      },
      {
        q: "Combien de séances pour accompagner la boulimie ?",
        a: "Plus que pour d'autres problématiques, la boulimie nécessite en général un suivi sur la durée — entre 6 et 12 séances selon les personnes. Les premières séances visent à créer un espace sécurisant, à comprendre les déclencheurs et à apporter un soulagement des crises. Les séances suivantes travaillent en profondeur les blessures sous-jacentes.",
      },
      {
        q: "La boulimie peut-elle être traitée sans hospitalisation ?",
        a: "Dans de nombreux cas, oui. Lorsque la boulimie n'entraîne pas de complications médicales graves, un suivi en ambulatoire combinant hypnose et, si besoin, psychothérapie peut être suffisant et efficace. Si votre situation nécessite un suivi médical ou psychiatrique, une orientation transparente vers des structures adaptées est proposée. L'hypnose peut s'intégrer dans un parcours de soin pluridisciplinaire.",
      },
    ]),
  ],
  content: `
    <p>La boulimie n'est pas un problème d'alimentation : c'est une façon de gérer une douleur intérieure, souvent ancienne. L'hypnose ericksonienne va à la source — blessures émotionnelles non intégrées, émotions sans autre sortie — avec bienveillance et sans jugement.</p>

    <h2>Comment l'hypnose accompagne la boulimie</h2>
    <ul>
      <li>Créer un espace sécurisant et comprendre les déclencheurs des crises</li>
      <li>Installer des « pauses » intérieures avant la crise et réduire fréquence et intensité</li>
      <li>Travailler en profondeur les blessures émotionnelles sous-jacentes</li>
      <li>Nourrir autrement les besoins que la nourriture cherchait à satisfaire</li>
    </ul>
    <p>L'accompagnement s'étend en général sur 6 à 12 séances, et peut s'intégrer dans un parcours de soin pluridisciplinaire. Cette démarche complète un suivi médical, elle ne le remplace pas.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-troubles-alimentaires-paris">Troubles alimentaires</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-compulsions-alimentaires-paris">Compulsions alimentaires</a> — Envies incontrôlables</li>
      <li><a href="${SITE_URL}/hypnose-image-corporelle-paris">Image corporelle</a> — Rapport au corps</li>
      <li><a href="${SITE_URL}/hypnose-alimentation-emotionnelle-paris">Alimentation émotionnelle</a> — Manger ses émotions</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour un accompagnement boulimie</a>
    `,
};

PAGES["/hypnose-alimentation-emotionnelle-paris"] = {
  title: "Hypnose alimentation émotionnelle Paris & en ligne | Alain Zenatti",
  description:
    "Arrêtez de manger par stress, ennui ou tristesse grâce à l'hypnose à Paris 4ème ou en visio. L'hypnose traite les causes émotionnelles de la faim émotionnelle. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-alimentation-emotionnelle-paris",
  h1: "Hypnose et alimentation émotionnelle — Arrêter de manger ses émotions",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose alimentation émotionnelle Paris",
      description: "Accompagnement de l'alimentation émotionnelle par l'hypnose ericksonienne : installer d'autres régulations que la nourriture. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-alimentation-emotionnelle-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie alimentation émotionnelle",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Troubles alimentaires", path: "/hypnose-troubles-alimentaires-paris" },
      { name: "Alimentation émotionnelle", path: "/hypnose-alimentation-emotionnelle-paris" },
    ]),
    faqLd([
      {
        q: "Qu'est-ce que l'alimentation émotionnelle exactement ?",
        a: "L'alimentation émotionnelle, c'est manger en réponse à des émotions plutôt qu'à une faim physique réelle. Stress, ennui, tristesse, solitude, anxiété — la nourriture devient une façon de gérer ces états intérieurs. Ce n'est pas un manque de volonté, c'est un mécanisme de régulation émotionnelle appris, souvent depuis l'enfance.",
      },
      {
        q: "Combien de séances pour traiter l'alimentation émotionnelle ?",
        a: "En général, 4 à 6 séances permettent des changements durables. Les premières séances identifient les déclencheurs émotionnels principaux et commencent à modifier les automatismes. Les suivantes renforcent ces changements et travaillent la relation plus globale aux émotions. Certains ressentent des changements dès la deuxième séance.",
      },
      {
        q: "Comment distinguer la faim émotionnelle de la faim physique ?",
        a: "La faim physique arrive progressivement, se satisfait de n'importe quel aliment et s'arrête à satiété. La faim émotionnelle surgit d'un coup, réclame des aliments précis (réconfortants, sucrés, gras), persiste après satiété et laisse souvent de la culpabilité. C'est le signal d'une émotion qui cherche une sortie.",
      },
    ]),
  ],
  content: `
    <p>Manger sous stress, par ennui, pour combler un vide ? L'alimentation émotionnelle est un mécanisme de régulation appris — souvent depuis l'enfance. L'hypnose ericksonienne installe d'autres façons de répondre au vrai besoin, sans passer par la nourriture.</p>

    <h2>Comment l'hypnose traite l'alimentation émotionnelle</h2>
    <ul>
      <li>Identifier les émotions qui déclenchent la prise alimentaire (stress, ennui, tristesse, solitude)</li>
      <li>Distinguer faim physique et faim émotionnelle au niveau inconscient</li>
      <li>Installer d'autres formes de régulation qui répondent au vrai besoin</li>
      <li>Apaiser la relation globale aux émotions et à la nourriture</li>
    </ul>
    <p>En général, 4 à 6 séances permettent des changements durables.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-troubles-alimentaires-paris">Troubles alimentaires</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-compulsions-alimentaires-paris">Compulsions alimentaires</a> — Envies incontrôlables</li>
      <li><a href="${SITE_URL}/hypnose-grignotage-paris">Grignotage</a> — Automatismes entre les repas</li>
      <li><a href="${SITE_URL}/hypnose-gestion-emotions-paris">Gestion des émotions</a> — Régulation émotionnelle</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour arrêter de manger mes émotions</a>
    `,
};

PAGES["/hypnose-image-corporelle-paris"] = {
  title: "Hypnose image corporelle Paris & en ligne | Alain Zenatti",
  description:
    "Transformez votre rapport à votre corps par l'hypnose à Paris 4ème ou en visio. Image corporelle négative, honte corporelle — l'hypnose change le regard intérieur. Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/hypnose-image-corporelle-paris",
  h1: "Hypnose et image corporelle — Se réconcilier avec son corps",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hypnose image corporelle Paris",
      description: "Accompagnement de l'image corporelle douloureuse par l'hypnose ericksonienne : changer le regard intérieur sur son corps. Cabinet Paris 4ème ou en visio.",
      url: `${SITE_URL}/hypnose-image-corporelle-paris`,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "Country", name: "France" },
      ],
      serviceType: "Hypnothérapie image corporelle",
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Troubles alimentaires", path: "/hypnose-troubles-alimentaires-paris" },
      { name: "Image corporelle", path: "/hypnose-image-corporelle-paris" },
    ]),
    faqLd([
      {
        q: "L'hypnose peut-elle aider avec une image corporelle négative ?",
        a: "Oui. L'image corporelle douloureuse est souvent le résultat d'un regard intérieur déformé par des expériences passées — remarques blessantes, comparaisons, honte corporelle. Ce regard n'est pas objectif : il a été construit. L'hypnose permet de remonter à l'origine de ces perceptions, de les déconstruire et d'installer un regard plus juste et plus bienveillant sur son propre corps.",
      },
      {
        q: "Combien de séances pour améliorer son image corporelle ?",
        a: "L'image corporelle est souvent enracinée dans des expériences anciennes et peut nécessiter 5 à 8 séances pour un travail en profondeur. Les premières séances identifient et déconstruisent les perceptions négatives ; les suivantes installent un regard différent, plus neutre ou plus bienveillant. Beaucoup rapportent une amélioration significative dès les 3 premières séances.",
      },
      {
        q: "Mon rapport douloureux au corps influence-t-il mon alimentation ?",
        a: "Très souvent, oui. Honte corporelle et restrictions, compulsions ou contrôle alimentaire s'entretiennent mutuellement. Travailler l'image corporelle apaise fréquemment le comportement alimentaire — et réciproquement. Les deux axes peuvent être travaillés ensemble.",
      },
    ]),
  ],
  content: `
    <p>Regard dur sur votre corps, honte, évitement des miroirs ou des photos ? Ce regard intérieur n'est pas objectif — il a été construit par des expériences passées. L'hypnose ericksonienne le déconstruit et installe une perception plus juste et plus bienveillante.</p>

    <h2>Comment l'hypnose transforme l'image corporelle</h2>
    <ul>
      <li>Remonter à l'origine du regard négatif (remarques blessantes, comparaisons, honte)</li>
      <li>Déconstruire les perceptions déformées installées dans l'inconscient</li>
      <li>Installer un regard plus neutre, puis plus bienveillant, sur son corps</li>
      <li>Apaiser le lien entre image corporelle et comportement alimentaire</li>
    </ul>
    <p>Un travail en profondeur demande en général 5 à 8 séances, avec une amélioration souvent notable dès les 3 premières.</p>

    <h2>Problématiques liées</h2>
    <ul>
      <li><a href="${SITE_URL}/hypnose-troubles-alimentaires-paris">Troubles alimentaires</a> — La page principale</li>
      <li><a href="${SITE_URL}/hypnose-boulimie-paris">Boulimie</a> — Crises et douleur intérieure</li>
      <li><a href="${SITE_URL}/hypnose-confiance-en-soi-paris">Confiance en soi</a> — Estime de soi</li>
      <li><a href="${SITE_URL}/hypnose-alimentation-emotionnelle-paris">Alimentation émotionnelle</a> — Manger ses émotions</li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous pour me réconcilier avec mon corps</a>
    `,
};

PAGES["/tarifs"] = {
  title: "Tarifs hypnose Paris & visio — 90 € la séance | NovaHypnose",
  description:
    "Tarifs des séances d'hypnose avec Alain Zenatti : 90 € au cabinet Paris 4ème ou en visio, 140 € à domicile Paris Centre. 1h30 la première séance. Paiement CB, Stripe, Wero. Annulation sans frais jusqu'à 48 h.",
  canonicalPath: "/tarifs",
  h1: "Tarifs des séances d'hypnose à Paris & en visio",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "@id": `${SITE_URL}/tarifs#offres`,
      "name": "Tarifs des séances d'hypnose — NovaHypnose Paris",
      "url": `${SITE_URL}/tarifs`,
      "itemListElement": [
        { "@type": "Offer", "name": "Séance d'hypnose au cabinet (Paris 4ème)", "price": "90", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Séance d'hypnose en visioconférence", "price": "90", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Séance d'hypnose à domicile (Paris Centre)", "price": "140", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Formation auto-hypnose en groupe (1 journée)", "price": "240", "priceCurrency": "EUR" },
      ],
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Tarifs", path: "/tarifs" },
    ]),
  ],
  content: `
    <p>Un cadre clair, posé d'emblée : la séance d'hypnose coûte <strong>90 €</strong>, au cabinet Paris 4ème (Marais-Bastille) comme en visioconférence. La <strong>première séance dure 1h30</strong>, les suivantes 1 heure — le tarif reste identique. Séances réservées aux adultes.</p>

    <h2>Les formules</h2>
    <ul>
      <li><strong>Au cabinet — 90 €</strong> : 16 rue Saint-Antoine, Paris 4ème. Métro Bastille (lignes 1, 5, 8) ou Saint-Paul (ligne 1).</li>
      <li><strong>En visio — 90 €</strong> : depuis chez vous, partout en France ou à l'étranger, via Google Meet. Même durée, même efficacité.</li>
      <li><strong>À domicile — 140 €</strong> : dans Paris Centre (arrondissements 1 à 4 et 9 à 11).</li>
      <li><strong>Formation auto-hypnose — 240 €</strong> : une journée en petit groupe (6 participants maximum). Voir la page <a href="${SITE_URL}/autohypnose">auto-hypnose</a>.</li>
    </ul>

    <h2>Combien de séances faut-il prévoir ?</h2>
    <p>L'hypnose ericksonienne est une thérapie brève : la plupart des accompagnements aboutissent en <strong>3 à 5 séances</strong>. Aucun forfait imposé, aucun engagement de durée — chaque séance se réserve librement.</p>

    <h2>Paiement, remboursement, annulation</h2>
    <p>Règlement par <strong>carte bancaire, Wero ou en ligne via Stripe</strong> (visio). L'hypnothérapie n'est pas remboursée par la Sécurité sociale, mais de nombreuses <strong>mutuelles</strong> participent via leur forfait « médecines douces » ; une facture est fournie sur demande. <strong>Annulation sans frais jusqu'à 48 h</strong> avant le rendez-vous.</p>

    <h2>Pages liées</h2>
    <ul>
      <li><a href="${SITE_URL}/avis">Avis &amp; témoignages des clients</a></li>
      <li><a href="${SITE_URL}/hypnose-en-ligne">Hypnose en visioconférence</a></li>
      <li><a href="${SITE_URL}/test-receptivite">Test de réceptivité à l'hypnose</a></li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous</a>
    `,
};

PAGES["/avis"] = {
  title: "Avis & témoignages clients — NovaHypnose | Alain Zenatti",
  description:
    "Les avis des clients d'Alain Zenatti, hypnothérapeute à Paris 4ème : 5/5 sur Google et 5/5 sur Resalib. Témoignages vérifiés sur le stress, l'anxiété, les phobies, le sommeil et la confiance en soi.",
  canonicalPath: "/avis",
  h1: "Avis & témoignages des clients",
  jsonLd: [
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Avis & témoignages", path: "/avis" },
    ]),
  ],
  content: `
    <p><strong>5/5 sur Google</strong> et <strong>5/5 sur Resalib</strong>. Voici ce que disent les personnes accompagnées par Alain Zenatti au cabinet Paris 4ème ou en visio — sur le stress, l'anxiété, les phobies, le sommeil, la confiance en soi. Les noms sont abrégés par discrétion.</p>

    <h2>Ce qu'ils écrivent, après</h2>
    <p>« J'ai consulté pour un problème d'anxiété, dès la première séance je me suis sentie apaisée et sereine. Alain est à l'écoute et mon anxiété a totalement disparu en 3 séances. Je recommande vivement. » — <strong>Marie H.</strong>, avis Google vérifié</p>
    <p>« Alain m'a aidée à retrouver un sommeil réparateur en 2 séances. Je vous le recommande. » — <strong>Isabelle M.</strong>, avis Google vérifié</p>
    <p>« Grâce à Alain j'ai pris le dessus sur ma phobie, je recommande à 100 %. Dès le premier contact téléphonique il a su être à mon écoute, et toutes les séances ont été bienveillantes. » — <strong>Karine B.</strong>, avis Google vérifié</p>
    <p>« Phobique de l'avion, monsieur Zenatti a su m'aider avant un voyage important. Merci encore pour ce que vous avez fait ! » — <strong>Arthur P.</strong>, avis Google vérifié</p>
    <p>« J'ai apprécié la patience, la douceur, l'écoute et le professionnalisme d'Alain Zenatti. Il m'a aidée au-delà de mes espérances alors que j'étais sceptique vis-à-vis de l'hypnose. Grâce à lui, j'ai repris confiance en moi. » — <strong>Safia A.</strong>, avis Google vérifié</p>
    <p>« Première séance d'hypnose de ma vie qui a permis de solutionner un problème que j'avais depuis de nombreuses années. Un grand merci et bravo. » — <strong>Regis G.</strong>, avis Google vérifié</p>

    <p>Chaque parcours est unique : ces retours illustrent des accompagnements individuels et ne constituent pas une promesse de résultat. La plupart des accompagnements aboutissent en 3 à 5 séances.</p>

    <h2>Pages liées</h2>
    <ul>
      <li><a href="${SITE_URL}/tarifs">Tarifs des séances</a> — 90 € cabinet ou visio</li>
      <li><a href="${SITE_URL}/alain-zenatti">Alain Zenatti, Maître Hypnologue</a></li>
      <li><a href="${SITE_URL}/test-receptivite">Test de réceptivité à l'hypnose</a></li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous</a>
    `,
};

PAGES["/contact"] = {
  title: "Contact — Cabinet NovaHypnose Paris 4ème | Alain Zenatti",
  description:
    "Contactez Alain Zenatti, hypnothérapeute à Paris 4ème (Marais-Bastille) : téléphone, email, formulaire, adresse et horaires. Cabinet et visioconférence, du lundi au vendredi de 11h à 20h30.",
  canonicalPath: "/contact",
  h1: "Nous contacter au cabinet ou en visio",
  jsonLd: [
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  ],
  content: `
    <p>Un message ou un appel suffit. Nous échangeons quelques minutes, et nous fixons une première séance si vous le souhaitez.</p>

    <h2>Coordonnées</h2>
    <ul>
      <li><strong>Téléphone</strong> : <a href="tel:+33649358089">06 49 35 80 89</a></li>
      <li><strong>Email</strong> : <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a></li>
      <li><strong>Cabinet</strong> : 16 rue Saint-Antoine, 75004 Paris — Métro Bastille (lignes 1, 5, 8) ou Saint-Paul (ligne 1)</li>
      <li><strong>Horaires</strong> : du lundi au vendredi, 11h — 20h30</li>
    </ul>

    <h2>Accès au cabinet</h2>
    <p>Le cabinet se situe au 16 rue Saint-Antoine, 75004 Paris, dans le quartier du Marais-Bastille, à deux pas de la place de la Bastille. Vous préférez ne pas vous déplacer ? Les séances en <a href="${SITE_URL}/hypnose-en-ligne">visioconférence</a> sont aussi efficaces qu'au cabinet, depuis n'importe où en France.</p>

    <h2>Pages liées</h2>
    <ul>
      <li><a href="${SITE_URL}/tarifs">Tarifs des séances</a> — 90 € cabinet ou visio</li>
      <li><a href="${SITE_URL}/avis">Avis &amp; témoignages des clients</a></li>
      <li><a href="${SITE_URL}/hypnose-en-ligne">Hypnose en visioconférence</a></li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous</a>
    `,
};

PAGES["/faq"] = {
  title: "FAQ — Questions sur l'hypnose et le cabinet | NovaHypnose",
  description:
    "Toutes les réponses sur l'hypnose ericksonienne : déroulement d'une séance, sécurité, remboursement, accès au cabinet Paris 4ème, hypnose en visio. Par Alain Zenatti, Maître Hypnologue.",
  canonicalPath: "/faq",
  h1: "Questions fréquentes sur l'hypnose",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}/faq#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Pourquoi consulter un hypnothérapeute à Paris ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Consulter un hypnothérapeute à Paris permet de bénéficier d'un accompagnement professionnel pour résoudre des problématiques comme le stress, l'anxiété, les phobies, les troubles du sommeil ou le manque de confiance en soi. L'hypnose ericksonienne est une thérapie brève qui donne des résultats concrets en 3 à 5 séances, sans médicaments." },
        },
        {
          "@type": "Question",
          "name": "Comment se déroule une séance d'hypnose ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Une séance se déroule en 3 étapes : un entretien pour comprendre votre problématique et définir vos objectifs, la séance d'hypnose ericksonienne proprement dite, puis un debriefing pour ancrer les changements. La première séance dure environ 1h30, les suivantes 1h." },
        },
        {
          "@type": "Question",
          "name": "L'hypnothérapie est-elle dangereuse ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Non. Vous restez conscient pendant toute la séance et ne ferez jamais quelque chose contre votre volonté. C'est un état modifié de conscience que vous expérimentez naturellement plusieurs fois par jour." },
        },
        {
          "@type": "Question",
          "name": "Est-ce que je révèle des secrets intimes sous hypnose ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Non, vous ne révélerez que ce que vous souhaitez partager. L'hypnose n'est pas un sérum de vérité et vous gardez votre libre arbitre pendant toute la séance." },
        },
        {
          "@type": "Question",
          "name": "Les séances d'hypnose sont-elles remboursées par les mutuelles ?",
          "acceptedAnswer": { "@type": "Answer", "text": "En France, l'hypnothérapie est remboursée par certaines mutuelles selon les contrats souscrits. Il est recommandé de contacter directement votre mutuelle pour le vérifier." },
        },
        {
          "@type": "Question",
          "name": "L'hypnose en visio est-elle aussi efficace qu'en cabinet ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Oui. L'état hypnotique repose sur la voix, les suggestions et la relation thérapeutique — pas sur la présence physique. Les séances en visioconférence donnent les mêmes résultats qu'en présentiel, en 3 à 5 séances dans la grande majorité des cas." },
        },
        {
          "@type": "Question",
          "name": "Où se situe le cabinet et comment y accéder ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Le cabinet est situé au 16 rue Saint-Antoine, Paris 4ème, au croisement des 4e, 11e et 12e arrondissements, dans le quartier du Marais. Accès à 2 minutes à pied du métro Bastille (lignes 1, 5, 8) ou Saint-Paul (ligne 1)." },
        },
        {
          "@type": "Question",
          "name": "Quelles sont les modalités de paiement et la politique d'annulation ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Paiement par carte bancaire, Wero ou en ligne (visio). Annulation ou report possible sans frais jusqu'à 48 heures avant le rendez-vous ; au-delà, la séance est facturée. Consultations réservées aux adultes." },
        },
      ],
    },
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "FAQ", path: "/faq" },
    ]),
  ],
  content: `
    <p>Déroulement d'une séance, sécurité, remboursement, accès au cabinet, hypnose en visio : les réponses aux questions les plus posées avant de prendre rendez-vous.</p>

    <h2>Pourquoi consulter un hypnothérapeute à Paris ?</h2>
    <p>Consulter un hypnothérapeute à Paris permet de bénéficier d'un accompagnement professionnel pour résoudre des problématiques comme le stress, l'anxiété, les phobies, les troubles du sommeil ou le manque de confiance en soi. L'hypnose ericksonienne est une thérapie brève qui donne des résultats concrets en 3 à 5 séances, sans médicaments.</p>

    <h2>Comment se déroule une séance d'hypnose ?</h2>
    <p>Une séance se déroule en 3 étapes : un entretien pour comprendre votre problématique et définir vos objectifs, la séance d'hypnose ericksonienne proprement dite (état de relaxation profonde guidée), puis un debriefing pour ancrer les changements. La première séance dure environ 1h30, les suivantes 1h.</p>

    <h2>L'hypnothérapie est-elle dangereuse ?</h2>
    <p>Non, l'hypnothérapie pratiquée par un professionnel formé est une méthode sûre et naturelle. Vous restez conscient pendant toute la séance et ne ferez jamais quelque chose contre votre volonté — un état modifié de conscience que vous expérimentez naturellement plusieurs fois par jour (absorbé dans un livre ou un film).</p>

    <h2>Est-ce que je révèle des secrets intimes sous hypnose ?</h2>
    <p>Non, vous ne révélerez que ce que vous souhaitez partager. L'hypnose n'est pas un sérum de vérité et vous gardez votre libre arbitre pendant toute la séance.</p>

    <h2>Les séances sont-elles remboursées par les mutuelles ?</h2>
    <p>En France, l'hypnothérapie est remboursée par certaines mutuelles selon les contrats souscrits. Il est recommandé de contacter directement votre mutuelle pour le vérifier. Voir aussi la page <a href="${SITE_URL}/tarifs">tarifs des séances</a>.</p>

    <h2>L'hypnose en visio est-elle aussi efficace qu'en cabinet ?</h2>
    <p>Oui. L'état hypnotique repose sur la voix, les suggestions et la relation thérapeutique — pas sur la présence physique. De nombreux clients rapportent même se sentir plus détendus chez eux. Les séances en visioconférence donnent les mêmes résultats qu'en présentiel, en 3 à 5 séances dans la grande majorité des cas. Voir la page <a href="${SITE_URL}/hypnose-en-ligne">hypnose en visio</a>.</p>

    <h2>Où se situe le cabinet et comment y accéder ?</h2>
    <p>Le cabinet est situé au 16 rue Saint-Antoine, Paris 4ème, au croisement des 4e, 11e et 12e arrondissements, dans le quartier du Marais. Accès à 2 minutes à pied du métro Bastille (lignes 1, 5, 8) ou Saint-Paul (ligne 1). Voir la page <a href="${SITE_URL}/contact">contact</a>.</p>

    <h2>Quelles sont les modalités de paiement et la politique d'annulation ?</h2>
    <p>Paiement par carte bancaire, Wero ou en ligne (visio). Annulation ou report possible sans frais jusqu'à 48 heures avant le rendez-vous ; au-delà, la séance est facturée. Consultations réservées aux adultes.</p>

    <h2>Pages liées</h2>
    <ul>
      <li><a href="${SITE_URL}/tarifs">Tarifs des séances</a></li>
      <li><a href="${SITE_URL}/avis">Avis &amp; témoignages des clients</a></li>
      <li><a href="${SITE_URL}/contact">Nous contacter</a></li>
      <li><a href="${SITE_URL}/hypnose-en-ligne">Hypnose en visioconférence</a></li>
    </ul>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Prendre rendez-vous</a>
    `,
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
