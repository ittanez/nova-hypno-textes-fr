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
    longitude: 2.3648,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "90€ - 140€",
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
      "Libérez-vous du stress et de l'anxiété par l'hypnose à Paris 4ème. Alain Zenatti, Maître Hypnologue. Résultats durables en 3 à 5 séances.",
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
    <p>Le stress chronique n'est pas une fatalité. Ce n'est pas un trait de caractère. C'est un <strong>mécanisme que votre inconscient a mis en place</strong> — et que l'hypnose peut désactiver.</p>

    <h2>Quand le stress devient un problème</h2>
    <p>Chaque semaine, je reçois à mon cabinet des personnes brillantes, compétentes, engagées — qui ne comprennent plus pourquoi elles se sentent submergées. Oppression thoracique, pensées en boucle, irritabilité, épuisement inexpliqué, troubles du sommeil.</p>
    <p>Ces symptômes ne sont pas « dans votre tête ». Le stress chronique produit des effets physiologiques mesurables : élévation du cortisol, activation permanente du système nerveux sympathique, inflammation silencieuse.</p>

    <h2>Comment l'hypnose agit sur le stress</h2>
    <p>L'hypnose ericksonienne agit à la source du problème : elle reprogramme la réponse automatique de votre système nerveux. En état d'hypnose, votre cerveau réduit naturellement la production de cortisol et active le système nerveux parasympathique — celui de la détente et de la récupération.</p>
    <ul>
      <li><strong>Désactivation des schémas de stress automatiques</strong></li>
      <li><strong>Réduction du cortisol</strong> et activation du parasympathique</li>
      <li><strong>Reprogrammation des réponses émotionnelles</strong> face aux situations stressantes</li>
      <li><strong>Techniques d'auto-hypnose</strong> pour gérer le stress au quotidien</li>
      <li><strong>Amélioration du sommeil</strong> dès les premières séances</li>
      <li><strong>Résultats durables</strong> : 90% d'amélioration dès la première séance</li>
    </ul>

    <h2>Mon approche</h2>
    <p>Je combine l'hypnose ericksonienne avec la PNL (Programmation Neuro-Linguistique) pour une approche complète. Chaque séance est personnalisée : nous identifions ensemble les déclencheurs de votre stress et travaillons directement avec votre inconscient pour modifier ces automatismes.</p>

    <h2>Résultats concrets</h2>
    <p><strong>3 à 5 séances</strong> suffisent généralement pour constater un changement profond et durable. 90% de mes patients rapportent une amélioration significative dès la première séance.</p>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance stress et anxiété</a>
    `,
  },

  "/hypnose-phobies-paris": {
    title: "Hypnose phobies et peurs Paris | Alain Zenatti",
    description:
      "Libérez-vous de vos phobies par l'hypnose à Paris 4ème. Phobie avion, claustrophobie, peur de parler en public. Résultats en 2 à 4 séances.",
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
    <p>Ce qui a été appris peut être désappris. Une phobie est un <strong>programme de protection installé par votre inconscient</strong> — souvent à partir d'une expérience passée. L'hypnose permet de désactiver ce programme sans revivre le trauma.</p>

    <h2>Phobies traitées en hypnose</h2>
    <ul>
      <li><strong>Phobie de l'avion</strong> (aviophobie) — Retrouvez la liberté de voyager</li>
      <li><strong>Claustrophobie</strong> — Ascenseurs, tunnels, espaces clos</li>
      <li><strong>Arachnophobie</strong> — Peur des araignées et insectes</li>
      <li><strong>Acrophobie</strong> — Peur du vide et des hauteurs</li>
      <li><strong>Peur de parler en public</strong> — Glossophobie</li>
      <li><strong>Phobie sociale</strong> — Peur du jugement des autres</li>
      <li><strong>Phobie de conduire</strong> — Amaxophobie</li>
      <li>Et toutes les autres phobies spécifiques</li>
    </ul>

    <h2>Comment l'hypnose traite les phobies</h2>
    <p>L'amygdale, centre de la peur dans votre cerveau, déclenche instantanément une cascade de réactions de survie — avant même que votre cortex rationnel n'ait le temps d'analyser la situation. C'est pourquoi la volonté seule ne suffit pas pour surmonter une phobie.</p>
    <p>L'hypnose agit directement sur ce circuit en <strong>désensibilisant la réponse phobique</strong> au niveau inconscient. En 2 à 4 séances, nous reprogrammons la réponse automatique de votre cerveau face à l'objet de la phobie.</p>

    <h2>Résultats</h2>
    <p><strong>2 à 4 séances</strong> suffisent pour les phobies simples, avec un taux de réussite de 95%. Vous retrouvez une vie normale, libérée de la peur irrationnelle qui vous limitait.</p>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance phobies</a>
    `,
  },

  "/hypnose-sommeil-paris": {
    title: "Hypnose sommeil et insomnie Paris | Alain Zenatti",
    description:
      "Retrouvez un sommeil profond par l'hypnose à Paris 4ème. Insomnie, réveils nocturnes, endormissement difficile. Sans médicament. 3 à 5 séances.",
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
    <p>Le problème n'est pas dans votre corps. Il est dans votre inconscient, qui a <strong>« oublié » comment lâcher prise pour s'endormir</strong>. L'hypnose permet de restaurer ce mécanisme naturel — sans aucun médicament.</p>

    <h2>Troubles du sommeil traités</h2>
    <ul>
      <li><strong>Insomnie d'endormissement</strong> — Vous tournez dans votre lit pendant des heures</li>
      <li><strong>Réveils nocturnes</strong> — Vous vous réveillez à 3h ou 4h du matin</li>
      <li><strong>Sommeil non réparateur</strong> — Vous dormez mais vous êtes épuisé au réveil</li>
      <li><strong>Anxiété du coucher</strong> — La peur de ne pas dormir qui empêche de dormir</li>
      <li><strong>Sevrage des somnifères</strong> — Accompagnement vers un sommeil naturel</li>
    </ul>

    <h2>Comment l'hypnose restaure le sommeil</h2>
    <p>L'insomnie est rarement un problème physique. C'est un cercle vicieux où l'anxiété de ne pas dormir empêche le sommeil, ce qui augmente l'anxiété. L'hypnose brise ce cercle en reprogrammant les automatismes inconscients liés à l'endormissement.</p>
    <p>En état d'hypnose, votre cerveau réapprend à activer naturellement les ondes alpha et thêta nécessaires au sommeil profond. Les techniques d'auto-hypnose que vous apprendrez vous accompagneront chaque soir.</p>

    <h2>Résultats</h2>
    <p>Beaucoup de mes patients dorment mieux <strong>dès la première séance</strong>. En <strong>3 à 5 séances</strong>, le sommeil se stabilise durablement — sans aucune dépendance, sans médicament.</p>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance sommeil</a>
    `,
  },

  "/hypnose-gestion-emotions-paris": {
    title: "Hypnose gestion des émotions Paris | Alain Zenatti",
    description:
      "Gérez vos émotions par l'hypnose à Paris 4ème. Colère, hypersensibilité, deuil, frustration. Alain Zenatti, Maître Hypnologue certifié.",
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
    <p>L'hypnose ericksonienne ne supprime pas vos émotions — elle vous apprend à <strong>les vivre sans en être prisonnier</strong>. Les réactions émotionnelles automatiques sont des programmes inconscients qui peuvent être reprogrammés.</p>

    <h2>Problématiques émotionnelles traitées</h2>
    <ul>
      <li><strong>Colère et irritabilité</strong> — Des explosions que vous regrettez aussitôt</li>
      <li><strong>Hypersensibilité</strong> — Vous absorbez les émotions des autres comme une éponge</li>
      <li><strong>Deuil et séparation</strong> — Un chagrin qui ne passe pas</li>
      <li><strong>Frustration chronique</strong> — Un sentiment d'insatisfaction permanent</li>
      <li><strong>Anxiété émotionnelle</strong> — Une peur diffuse et envahissante</li>
      <li><strong>Surcharge émotionnelle</strong> — Le sentiment d'être débordé par tout</li>
    </ul>

    <h2>Comment l'hypnose régule les émotions</h2>
    <p>Vos réactions émotionnelles excessives ne sont pas un défaut de caractère. Ce sont des mécanismes de protection installés par votre inconscient, souvent depuis l'enfance. L'hypnose accède directement à ces programmes pour les transformer.</p>
    <p>En travaillant avec votre inconscient, nous identifions la source des réactions automatiques et installons de nouvelles réponses plus adaptées. Vous gardez votre sensibilité — mais vous n'en êtes plus esclave.</p>

    <h2>Résultats</h2>
    <p><strong>3 à 5 séances</strong> pour retrouver un équilibre émotionnel durable. Approche 100% personnalisée, adaptée à votre histoire et votre fonctionnement.</p>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance gestion des émotions</a>
    `,
  },

  "/hypnose-blocages-paris": {
    title: "Hypnose blocages et comportements Paris | Zenatti",
    description:
      "Libérez vos blocages par l'hypnose à Paris 4ème. Procrastination, schémas répétitifs, TOC, addictions. Alain Zenatti, Maître Hypnologue.",
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
    <p>Ces comportements ne sont pas un choix — ce sont des <strong>programmes inconscients que l'hypnose peut débloquer</strong>. Ce n'est ni de la paresse, ni un manque de volonté. Ces comportements sont pilotés par votre inconscient.</p>

    <h2>Blocages traités en hypnose</h2>
    <ul>
      <li><strong>Procrastination</strong> — Vous remettez tout au lendemain malgré votre volonté</li>
      <li><strong>Schémas répétitifs</strong> — Vous reproduisez les mêmes erreurs dans vos relations ou votre travail</li>
      <li><strong>Onychophagie</strong> — Se ronger les ongles compulsivement</li>
      <li><strong>TOC et rituels</strong> — Vérifications, comptage, rituels envahissants</li>
      <li><strong>Blocages professionnels</strong> — Incapacité à avancer dans votre carrière</li>
      <li><strong>Addictions comportementales</strong> — Écrans, jeux, achats compulsifs</li>
    </ul>

    <h2>L'approche par l'hypnose</h2>
    <p>L'hypnose va directement à la source : elle dialogue avec l'inconscient pour comprendre le besoin caché derrière le comportement problématique. Chaque blocage a une fonction — souvent de protection. En identifiant cette fonction et en proposant une alternative saine, le comportement se libère naturellement.</p>

    <h2>Résultats</h2>
    <p><strong>3 à 5 séances</strong> pour des comportements profondément ancrés. Approche 100% personnalisée adaptée à votre histoire.</p>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance</a>
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
    <p>Le syndrome de l'imposteur, la timidité, la peur du jugement... ce sont des <strong>programmes inconscients installés depuis l'enfance</strong>. Ces programmes peuvent être modifiés. L'hypnose accède directement à ces croyances profondes pour les transformer.</p>

    <h2>Problématiques de confiance traitées</h2>
    <ul>
      <li><strong>Syndrome de l'imposteur</strong> — Vous ne vous sentez jamais à la hauteur malgré vos succès</li>
      <li><strong>Peur de parler en public</strong> — Réunions, présentations, prises de parole</li>
      <li><strong>Timidité excessive</strong> — Difficulté à s'affirmer dans les relations</li>
      <li><strong>Perfectionnisme paralysant</strong> — La peur de mal faire qui empêche d'agir</li>
      <li><strong>Faible estime de soi</strong> — Un regard négatif sur vous-même</li>
      <li><strong>Peur du regard des autres</strong> — Le jugement qui vous inhibe</li>
    </ul>

    <h2>Comment l'hypnose développe la confiance</h2>
    <p>Vos croyances limitantes (« je ne suis pas assez bien », « je vais échouer ») sont ancrées dans votre inconscient depuis des années, souvent depuis l'enfance. La volonté seule ne suffit pas à les changer — il faut agir au même niveau où elles se sont installées.</p>
    <p>L'hypnose permet de transformer ces croyances profondes et d'installer de nouvelles ressources : assurance naturelle, capacité à s'affirmer, sentiment légitime de compétence.</p>

    <h2>Résultats</h2>
    <p><strong>3 à 5 séances</strong> pour une transformation profonde et durable de votre confiance en vous. Approche 100% personnalisée.</p>

    <a class="cta" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">Réserver une séance confiance en soi</a>
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
      "Cabinet d'hypnothérapie Paris 4ème, métro Bastille (lignes 1, 5, 8) à 2 min. Séances au cabinet 90€, à domicile 140€ ou en visio. Accessible depuis tous les arrondissements.",
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
      "Accompagnement individuel en hypnose pour professionnels. Stress, burn-out, sommeil, émotions. Appel découverte gratuit. Cabinet Paris 4ème.",
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
