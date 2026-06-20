import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import SpecialtyReferences from '@/components/SpecialtyReferences';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const frustrationFaqItems = [
  {
    question: "Pourquoi ressent-on une frustration chronique malgré une vie qui semble aller bien ?",
    answer: "La frustration chronique est rarement liée aux circonstances actuelles. Elle est le plus souvent le signal d'un besoin profond non satisfait, ancré dans l'inconscient depuis longtemps : besoin de reconnaissance, de liberté, de sens, d'appartenance. Quand ces besoins ne sont pas nommés et reconnus, la frustration s'installe comme un fond permanent, indépendamment de ce que la vie offre objectivement."
  },
  {
    question: "Comment l'hypnose aide-t-elle à sortir de la frustration chronique ?",
    answer: "L'hypnose travaille en profondeur pour identifier les besoins inconscients qui alimentent la frustration, comprendre les croyances limitantes qui empêchent de les satisfaire, et libérer les schémas automatiques d'insatisfaction. Elle ne cherche pas à vous rendre indifférent — elle aide à comprendre ce que la frustration dit de vous et à trouver des voies authentiques pour nourrir ces besoins."
  },
  {
    question: "La frustration chronique est-elle liée à de la perfectionnisme ?",
    answer: "Souvent, oui. Le perfectionnisme et la frustration chronique sont fréquemment liés : quand le niveau d'exigence envers soi et les autres est très élevé, la réalité ne peut que décevoir. L'hypnose explore les racines de ce perfectionnisme — souvent des croyances inconscientes sur ce qu'on doit être ou accomplir pour se sentir bien — et aide à les assouplir sans perdre les standards qui font votre identité."
  },
  {
    question: "Frustration chronique et impatience — est-ce la même chose ?",
    answer: "Elles sont souvent liées mais distinctes. L'impatience est la forme aiguë de la frustration face au délai ou à l'attente. La frustration chronique est plus profonde : c'est un état de fond de ne jamais avoir assez, de ne jamais être satisfait, même quand les choses vont bien. L'hypnose travaille sur les deux dimensions — la réponse automatique à l'impatience et le fond d'insatisfaction qui l'alimente."
  },
  {
    question: "Combien de séances pour sortir d'un état de frustration chronique ?",
    answer: "En général, 3 à 5 séances permettent une transformation significative. La première séance explore la nature de la frustration — ses déclencheurs, ses schémas, ses racines. Les séances suivantes travaillent sur la libération des croyances limitantes et l'identification des besoins authentiques. Les résultats se manifestent progressivement : d'abord dans les situations habituellement frustrantes, puis comme un changement de fond durable."
  }
];

const HypnoseFrustrationChroniqueParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose frustration chronique Paris",
    "description": "Accompagnement de la frustration chronique et de l'insatisfaction permanente par l'hypnose ericksonienne à Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-frustration-chronique-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie frustration chronique",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
      "name": "Au cabinet Paris 4ème ou en visioconférence (Google Meet)"
    },
    "offers": {
      "@type": "Offer",
      "price": "90",
      "priceCurrency": "EUR"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://novahypnose.fr" },
      { "@type": "ListItem", "position": 2, "name": "Troubles émotionnels", "item": "https://novahypnose.fr/hypnose-troubles-emotionnels-paris" },
      { "@type": "ListItem", "position": 3, "name": "Frustration chronique", "item": "https://novahypnose.fr/hypnose-frustration-chronique-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": frustrationFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Insatisfaction permanente", desc: "Rien n'est jamais assez bien, assez grand, assez rapide — une impression de vide difficile à combler" },
    { title: "Impatience et irritabilité", desc: "Les délais, erreurs ou lenteurs des autres vous exaspèrent — vous ressentez très vite une montée de frustration" },
    { title: "Sentiment de ne pas être à sa place", desc: "Vous avez l'impression de toujours être au mauvais endroit, dans la mauvaise situation, avec les mauvaises personnes" },
    { title: "Attentes trop élevées déçues", desc: "Vous avez des standards très hauts envers vous-même et les autres, et la réalité déçoit systématiquement" },
    { title: "Difficulté à accepter les situations", desc: "Les obstacles, imprévus ou injustices vous touchent de façon disproportionnée et durent longtemps" },
    { title: "Tension et résignation alternées", desc: "Vous alternez entre une énergie frustrée qui cherche un exutoire et une résignation épuisée" }
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose frustration chronique Paris | Alain Zenatti</title>
        <meta name="description" content="Accompagnement de la frustration chronique et de l'insatisfaction permanente par l'hypnose à Paris 4ème ou en visio. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose frustration chronique paris, insatisfaction permanente hypnose, hypnose impatience paris, frustration chronique traitement, sentiment vide hypnose paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-frustration-chronique-paris" />
        <meta property="og:title" content="Hypnose frustration chronique Paris | Alain Zenatti" />
        <meta property="og:description" content="Accompagnement de la frustration chronique et de l'insatisfaction permanente par l'hypnose à Paris 4ème ou en visio." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-frustration-chronique-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose frustration chronique" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose frustration chronique Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Accompagnement de la frustration chronique par l'hypnose à Paris 4ème ou en visio." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(serviceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(faqSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(localBusinessSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-hero__bg" aria-hidden="true">
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
            <g filter="url(#riso-full)">
              <path d="M 200 60 C 400 20, 700 60, 900 160 C 1040 230, 1150 240, 1280 180 C 1360 140, 1440 170, 1440 250 L 1440 0 L 0 0 L 0 200 C 60 130, 130 80, 200 60 Z" fill="#F2A12E" opacity="0.9" />
            </g>
            <g filter="url(#riso-full)" style={{mixBlendMode:'multiply'}}>
              <path d="M 0 720 C 200 660, 500 640, 800 680 C 1100 720, 1280 700, 1440 740 L 1440 900 L 0 900 Z" fill="#2B4BA0" opacity="0.88" />
            </g>
            <rect width="1440" height="900" filter="url(#paperGrain)" opacity=".2" />
          </svg>
        </div>
        <div className="container sp-hero__inner reveal">
          <div className="tag">Frustration chronique — Paris</div>
          <h1 className="sp-hero__h1">
            Sortir de l'insatisfaction<br/><em>permanente</em>
          </h1>
          <p className="sp-hero__lead">
            Rien n'est jamais assez, tout déçoit, la frustration est un fond constant — cette
            insatisfaction chronique n'est pas votre personnalité. C'est un
            <strong> mécanisme inconscient</strong> que l'hypnose peut identifier et transformer,
            au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089">06 49 35 80 89</a>
          </div>
        </div>
      </section>

      {/* Le problème */}
      <section className="sp-section">
        <div className="container">
          <div className="cabinet__grid reveal">
            <div className="cabinet__copy">
              <div className="section-tag">Frustration — comprendre</div>
              <h2 className="section-title">La frustration dit<br/><em>quelque chose d'important.</em></h2>
              <p>
                La frustration chronique n'est pas un caprice ou un manque de gratitude. C'est le signal
                d'un besoin profond non satisfait : besoin de reconnaissance, de liberté, de sens, de
                connexion authentique. Tant que ce besoin n'est pas nommé et reconnu, la frustration
                reste comme un fond permanent.
              </p>
              <p>
                Souvent, des croyances inconscientes créent un filtre : "ce n'est jamais assez", "je
                mérite mieux", "les autres ne comprennent pas". Ces croyances colorent chaque expérience
                et empêchent la satisfaction même quand les conditions objectives sont réunies.
              </p>
              <p>
                L'hypnose travaille sur ces couches profondes pour libérer la frustration à sa source —
                pas seulement gérer ses manifestations en surface.
              </p>
            </div>
            <div className="cabinet__visual" aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 40 220 C 20 150, 80 80, 180 55 C 280 30, 420 60, 480 150 C 530 225, 510 320, 460 380 C 410 440, 320 470, 200 465 C 90 460, 20 390, 10 310 C 5 270, 45 265, 40 220 Z" fill="#F2A12E" opacity="0.92" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 60 320 C 40 260, 70 190, 150 170 C 240 148, 380 175, 440 255 C 490 322, 470 410, 390 445 C 310 478, 180 465, 110 415 C 60 378, 72 362, 60 320 Z" fill="#2B4BA0" opacity="0.9" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Manifestations */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Reconnaissez-vous ces manifestations ?</h2>
          <div className="sp-grid-2">
            {manifestations.map((m) => (
              <div key={m.title} className="sp-card reveal">
                <div className="sp-card__title">{m.title}</div>
                <div className="sp-card__desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment l'hypnose agit */}
      <section className="sp-section">
        <div className="container">
          <div className="cabinet__grid cabinet__grid--reverse reveal">
            <div className="cabinet__visual" aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 80 100 C 180 30, 380 20, 470 140 C 545 240, 510 390, 390 455 C 272 518, 100 500, 35 385 C -25 275, 20 140, 80 100 Z" fill="#2B4BA0" opacity="0.9" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 155 155 C 265 95, 415 148, 420 272 C 425 385, 318 455, 200 436 C 86 418, 44 332, 70 224 C 91 142, 128 162, 155 155 Z" fill="#F2A12E" opacity="0.88" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
            </div>
            <div className="cabinet__copy">
              <div className="section-tag">Mécanisme — identifier et libérer</div>
              <h2 className="section-title">L'hypnose révèle<br/><em>le besoin derrière la frustration.</em></h2>
              <p>
                En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier les besoins profonds non satisfaits qui alimentent l'insatisfaction",
                  "Repérer les croyances inconscientes qui filtrent la réalité",
                  "Libérer les schémas automatiques d'attente et de déception",
                  "Assouplir le perfectionnisme sans perdre vos valeurs",
                  "Développer une capacité à apprécier ce qui est déjà là",
                  "Trouver des voies authentiques pour nourrir vos besoins réels"
                ].map((item) => (
                  <div key={item} className="sp-check-item">
                    <CheckCircle size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Exemples de parcours au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Insatisfaction professionnelle — jamais au bon endroit</div>
              <p>
                Nathalie*, 44 ans, avait changé trois fois d'entreprise en cinq ans. À chaque fois,
                la promesse s'étiolait rapidement, la frustration revenait. Elle commençait à se demander
                si c'était elle le problème.
              </p>
              <p>
                En hypnose, nous avons identifié un besoin de reconnaissance profond jamais nommé,
                et une croyance inconsciente que "les autres ne voient jamais vraiment". Après 4 séances,
                elle décrivait une légèreté inattendue dans son rapport au travail — et à ses collègues.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Impatience chronique — ne plus souffrir de l'attente</div>
              <p>
                Julien*, 37 ans, souffrait d'une impatience qui empoisonnait ses relations. Les délais,
                les lenteurs, les erreurs des autres le mettaient rapidement hors de lui. Sa femme
                commençait à en avoir assez.
              </p>
              <p>
                L'hypnose a travaillé sur l'origine de cette impatience — un sentiment d'urgence
                ancré très tôt. Après 3 séances, il décrivait la capacité d'attendre sans que
                la tension monte automatiquement.
              </p>
            </div>
          </div>
          <p className="sp-footnote">* Prénoms modifiés pour préserver la confidentialité</p>
        </div>
      </section>

      {/* Stats */}
      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <div className="sp-stats">
            {[
              { value: '3-5', label: 'séances pour transformer le fond d\'insatisfaction chronique' },
              { value: '100%', label: 'personnalisé — on travaille sur VOS besoins profonds spécifiques' },
              { value: '5/5', label: 'note moyenne sur Resalib et Google' },
            ].map((s) => (
              <div key={s.label} className="sp-stat reveal">
                <div className="sp-stat__val">{s.value}</div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la frustration chronique</h2>
          <div>
            {frustrationFaqItems.map((item, i) => (
              <div key={i} className={`faq__item${openFaq === i ? ' open' : ''}`}>
                <button
                  id={`faq-question-${i}`}
                  className="faq__q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  {item.question}
                  <span className="faq__icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className="faq__a"
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sp-ext-section">
        <SpecialtyBlogArticles
          keywords={["frustration", "insatisfaction", "impatience", "émotions", "besoins"]}
          title="Articles sur la frustration chronique"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-frustration-chronique-paris"
          pageTitle="Hypnose pour la frustration chronique à Paris"
          pageDescription="Hypnose ericksonienne pour accompagner la frustration chronique et l'insatisfaction permanente — au cabinet Paris 4ème ou en visio."
          topic="la frustration chronique et la régulation émotionnelle"
          dateModified="2026-06-20"
          references={[
            {
              authors: "Inserm",
              title: "Évaluation de l'efficacité de la pratique de l'hypnose",
              source: "Rapport d'expertise collective",
              year: 2015,
              url: "https://www.inserm.fr/expertise-collective/evaluation-efficacite-pratique-hypnose/",
            },
            {
              authors: "Deci EL, Ryan RM",
              title: "Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being",
              source: "American Psychologist",
              year: 2000,
              url: "https://pubmed.ncbi.nlm.nih.gov/11392867/",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt à comprendre et libérer votre frustration chronique ?</h2>
          <p className="sp-lead">Cabinet Paris 4ème – Marais-Bastille (Métro Bastille, lignes 1, 5, 8) • Séances au cabinet ou en visio partout en France • 90&nbsp;€ la séance</p>
          <div className="hero__cta" style={{justifyContent:'center'}}>
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
               style={{background:'var(--lin)', color:'var(--cobalt)'}}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089" style={{borderColor:'rgba(240,236,227,.4)', color:'var(--lin)'}}>06 49 35 80 89</a>
          </div>
          <div className="sp-links">
            <Link to="/hypnose-troubles-emotionnels-paris">Troubles émotionnels →</Link>
            <Link to="/hypnose-colere-paris">Colère et irritabilité →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Stress & Anxiété →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseFrustrationChroniqueParis;
