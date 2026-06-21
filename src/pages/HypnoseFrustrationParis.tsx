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
    question: "Comment l'hypnose peut-elle agir sur la frustration chronique ?",
    answer: "La frustration chronique vient souvent de croyances inconscientes sur ce que la vie devrait être, sur ce que vous méritez, sur la façon dont les autres devraient se comporter. L'hypnose accède à ces croyances sous-jacentes pour les recalibrer, vous permettant d'ajuster vos attentes sans perdre vos ambitions légitimes."
  },
  {
    question: "Est-ce que l'hypnose va me rendre passif(ve) ou résigné(e) ?",
    answer: "Non. L'objectif n'est pas la résignation mais la capacité à distinguer ce qui mérite votre énergie de ce qui ne la mérite pas. Vous conservez votre sens de la justice et vos aspirations — mais vous cessez de souffrir pour des situations sur lesquelles vous n'avez pas de prise."
  },
  {
    question: "Ma frustration vient de mon environnement professionnel — est-ce que l'hypnose peut aider ?",
    answer: "Oui. L'hypnose ne peut pas changer votre environnement, mais elle peut changer la façon dont vous le percevez et y réagissez. Elle vous aide à identifier ce que vous pouvez changer et ce que vous ne pouvez pas, et à puiser votre satisfaction dans les bonnes sources."
  },
  {
    question: "Combien de séances faut-il pour libérer la frustration chronique ?",
    answer: "En général, 3 à 5 séances permettent d'observer des changements significatifs. La frustration chronique ayant souvent des racines profondes (perfectionnisme, blessures d'injustice anciennes, attentes héritées), le travail peut s'étaler sur plusieurs semaines."
  },
  {
    question: "L'hypnose est-elle efficace si j'ai des traits perfectionnistes marqués ?",
    answer: "Oui, et c'est souvent très pertinent. Le perfectionnisme est fréquemment à l'origine de la frustration chronique — l'écart entre ce que vous attendez et ce qui est génère une insatisfaction permanente. L'hypnose peut travailler sur les mécanismes inconscients qui alimentent le perfectionnisme excessif."
  },
  {
    question: "Puis-je faire mes séances en visio ?",
    answer: "Oui. Les séances en visioconférence sont aussi efficaces qu'en cabinet pour traiter la frustration chronique. Je reçois des patients de toute la France pour ce type d'accompagnement, intégralement en visio."
  }
];

const HypnoseFrustrationParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose frustration chronique Paris",
    "description": "Libérez-vous de la frustration chronique et de l'insatisfaction permanente par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-frustration-paris",
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
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://novahypnose.fr" },
      { "@type": "ListItem", "position": 2, "name": "Gestion des émotions", "item": "https://novahypnose.fr/hypnose-gestion-emotions-paris" },
      { "@type": "ListItem", "position": 3, "name": "Frustration chronique", "item": "https://novahypnose.fr/hypnose-frustration-paris" }
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
    { title: "Insatisfaction permanente", desc: "Peu importe ce que vous obtenez, ce n'est jamais assez — la satisfaction dure quelques instants puis disparaît" },
    { title: "Ruminations et comparaisons", desc: "Vous vous comparez constamment aux autres, ruminez sur ce que vous n'avez pas ou auriez dû avoir" },
    { title: "Ressentiment envers les autres", desc: "Une aigreur s'installe progressivement, vous en voulez aux autres de ne pas correspondre à vos attentes" },
    { title: "Difficulté à profiter du présent", desc: "Vous ne pouvez pas vous réjouir pleinement de ce que vous avez — un autre désir ou une autre attente prend aussitôt le relais" },
    { title: "Relations tendues", desc: "Votre insatisfaction déborde sur vos proches qui ne comprennent pas pourquoi rien ne semble vous rendre heureux(se)" },
    { title: "Sentiment d'injustice chronique", desc: "Vous avez l'impression que la vie est injuste avec vous, que les autres ont plus de chance ou méritent moins" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose frustration chronique Paris | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de la frustration chronique et de l'insatisfaction permanente par l'hypnose à Paris 4ème ou en visio. Résultats en 3 à 5 séances." />
        <meta name="keywords" content="hypnose frustration paris, insatisfaction chronique hypnose, frustration permanente hypnose paris, hypnothérapeute frustration paris, ressentiment hypnose, perfectionnisme frustration hypnose, frustration hypnose en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-frustration-paris" />
        <meta property="og:title" content="Hypnose frustration chronique Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de la frustration chronique et de l'insatisfaction permanente par l'hypnose à Paris 4ème ou en visio. Résultats en 3 à 5 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-frustration-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose frustration" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose frustration chronique Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de la frustration chronique et de l'insatisfaction permanente par l'hypnose à Paris 4ème ou en visio. Résultats en 3 à 5 séances." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(serviceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(faqSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(localBusinessSchema)}</script>
      </Helmet>

      <section className="sp-hero">
        <div className="sp-hero__bg" aria-hidden="true">
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
            <g filter="url(#riso-full)">
              <path d="M 200 60 C 400 20, 700 60, 900 160 C 1040 230, 1150 240, 1280 180 C 1360 140, 1440 170, 1440 250 L 1440 0 L 0 0 L 0 200 C 60 130, 130 80, 200 60 Z" fill="#F2A12E" opacity="0.9" />
            </g>
            <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
              <path d="M 0 720 C 200 660, 500 640, 800 680 C 1100 720, 1280 700, 1440 740 L 1440 900 L 0 900 Z" fill="#2B4BA0" opacity="0.88" />
            </g>
            <rect width="1440" height="900" filter="url(#paperGrain)" opacity=".2" />
          </svg>
        </div>
        <div className="container sp-hero__inner reveal">
          <div className="tag">Frustration chronique — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous de la frustration chronique
          </h1>
          <p className="sp-hero__lead" dangerouslySetInnerHTML={{ __html: "Vous avez le sentiment permanent de ne jamais en avoir assez, que les choses ne sont jamais à votre place, que la vie ne correspond pas à vos attentes ? La frustration chronique épuise et abîme vos relations. L'hypnose travaille sur les croyances et attentes inconscientes qui alimentent ce sentiment. <strong>Résultats en 3 à 5 séances</strong>, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>." }} />
          <div className="hero__cta">
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089">06 49 35 80 89</a>
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="cabinet__grid reveal">
            <div className="cabinet__copy">
              <div className="section-tag">Frustration — comprendre</div>
              <h2 className="section-title">L'insatisfaction chronique,<br/><em>un piège de l'inconscient.</em></h2>
              <p>
                La frustration est une émotion normale qui survient quand nos besoins ou désirs ne sont pas satisfaits. Mais quand elle devient chronique — quand rien ne semble jamais suffire, quand la satisfaction est toujours repoussée à demain — elle révèle des mécanismes inconscients plus profonds.
              </p>
              <p>
                Ces mécanismes peuvent être liés à des croyances héritées (« je dois mériter pour recevoir », « le bonheur n'est pas pour moi »), à un perfectionnisme excessif, à des attentes irréalistes sur soi-même, les autres, ou la vie. L'environnement extérieur ne suffit jamais parce que le problème est intérieur.
              </p>
              <p>
                L'hypnose ericksonienne accède à ces programmes inconscients pour les recalibrer, vous permettant de trouver satisfaction dans ce que vous avez tout en continuant à aspirer à davantage.
              </p>
            </div>
            <div className="cabinet__visual" aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 100 80 C 240 20, 450 50, 490 200 C 520 320, 450 460, 310 500 C 175 538, 30 490, 10 360 C -8 238, 60 120, 100 80 Z" fill="#F2A12E" opacity="0.92" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 200 150 C 310 110, 410 170, 400 270 C 390 365, 300 420, 210 400 C 125 380, 90 305, 120 220 C 143 155, 168 168, 200 150 Z" fill="#2B4BA0" opacity="0.9" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 240 220 C 295 200, 345 235, 338 290 C 331 340, 285 368, 240 355 C 198 342, 180 305, 198 263 C 210 238, 225 228, 240 220 Z" fill="#F2A12E" opacity="0.7" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Vous reconnaissez-vous&nbsp;?</h2>
          <div className="sp-grid-2">
            {manifestations.map((m, i) => (
              <div key={i} className="sp-card reveal">
                <div className="sp-card__title">{m.title}</div>
                <div className="sp-card__desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="cabinet__grid cabinet__grid--reverse reveal">
            <div className="cabinet__visual" aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 260 60 C 320 60, 480 140, 490 260 C 498 360, 430 460, 320 490 C 220 518, 100 485, 50 395 C 5 313, 30 195, 100 135 C 158 87, 210 60, 260 60 Z" fill="#2B4BA0" opacity="0.88" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 260 30 L 350 140 L 490 130 L 410 240 L 460 380 L 320 310 L 200 420 L 190 270 L 50 210 L 185 185 Z" fill="#F2A12E" opacity="0.75" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
            </div>
            <div className="cabinet__copy">
              <div className="section-tag">Mécanisme — recalibrage des attentes</div>
              <h2 className="section-title">L'hypnose recalibre<br/><em>vos croyances inconscientes.</em></h2>
              <p>
                L'hypnose ericksonienne travaille sur les croyances et attentes inconscientes qui alimentent la frustration chronique. En état de relaxation profonde, nous pouvons :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier les croyances inconscientes sur le mérite et la satisfaction",
                  "Retraiter les expériences passées qui ont installé l'insatisfaction chronique",
                  "Développer la capacité à trouver satisfaction dans le présent",
                  "Réajuster les attentes sans perdre les aspirations légitimes",
                  "Transformer le ressentiment en énergie constructive et motivante"
                ].map((item, i) => (
                  <div key={i} className="sp-check-item">
                    <CheckCircle size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Exemples de parcours au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Entrepreneur insatisfait malgré le succès</div>
              <p>
                Laurent*, 46 ans, chef d'entreprise, avait bâti une société prospère — mais rien ne semblait jamais suffire. Chaque objectif atteint laissait place immédiatement à une nouvelle insatisfaction. Il était épuisé de cette course sans fin et ses proches ne comprenaient plus. En 4 séances d'hypnose, nous avons travaillé sur les croyances profondes qui rendaient la satisfaction impossible. Laurent a retrouvé la capacité d'apprécier ce qu'il avait construit.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Frustration relationnelle chronique</div>
              <p>
                Sophie*, 39 ans, en couple depuis cinq ans, ressentait une frustration permanente envers son partenaire — qui ne correspondait jamais tout à fait à ses attentes. Son partenaire, épuisé, envisageait de partir. En 3 séances, nous avons exploré l'origine de ces attentes idéales impossibles à satisfaire. Sophie a pu retrouver une relation réelle et nourrissante avec son partenaire.
              </p>
            </div>
          </div>
          <p className="sp-footnote">* Prénoms modifiés pour préserver la confidentialité</p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-narrow">
          <blockquote className="sp-quote reveal">
            <p>
              Mr Zenatti est un praticien calme et réfléchi. Son écoute attentive lui a permis de
              déterminer les axes de travail, les points d'amélioration, les émotions limitantes.
              En quelques séances, j'ai pu me libérer de certains blocages et entamer des
              changements pérennes.
            </p>
            <footer>— Philippe A., avis Google vérifié</footer>
          </blockquote>
        </div>
      </section>

      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <div className="sp-stats">
            {[
              { value: '3-5', label: 'séances pour transformer l\'insatisfaction chronique en perception nouvelle' },
              { value: 'Nouvelle', label: 'perception — trouver satisfaction dans le présent' },
              { value: '5/5', label: 'note moyenne sur Resalib et Google' },
            ].map((s, i) => (
              <div key={i} className="sp-stat reveal">
                <div className="sp-stat__val">{s.value}</div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Questions fréquentes sur la frustration chronique</h2>
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
          keywords={["frustration", "insatisfaction", "émotions", "attentes"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur la frustration et l'insatisfaction"
          accentColor="text-rose-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-frustration-paris"
          pageTitle="Hypnose pour la frustration chronique à Paris"
          pageDescription="Hypnose ericksonienne pour libérer la frustration chronique et l'insatisfaction permanente. Cabinet Paris 4ème ou en visio."
          topic="la frustration chronique et les mécanismes d'insatisfaction"
          dateModified="2026-06-21"
          references={[
            {
              authors: "Inserm",
              title: "Évaluation de l'efficacité de la pratique de l'hypnose",
              source: "Rapport d'expertise collective",
              year: 2015,
              url: "https://www.inserm.fr/expertise-collective/evaluation-efficacite-pratique-hypnose/",
            },
            {
              authors: "Hammond DC",
              title: "Hypnosis in the treatment of anxiety- and stress-related disorders",
              source: "Expert Review of Neurotherapeutics",
              year: 2010,
              url: "https://pubmed.ncbi.nlm.nih.gov/20128679/",
            },
            {
              authors: "Lynn SJ, Laurence JR, Kirsch I",
              title: "Hypnosis, Suggestion, and Suggestibility: An Integrative Model",
              source: "American Journal of Clinical Hypnosis",
              year: 2015,
              url: "https://pubmed.ncbi.nlm.nih.gov/26046713/",
            },
          ]}
        />
      </div>

      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Retrouvez la satisfaction dans votre vie</h2>
          <p className="sp-lead">Cabinet Paris 4ème – Marais-Bastille (Métro Bastille, lignes 1, 5, 8) • Séances au cabinet ou en visio partout en France</p>
          <div className="hero__cta" style={{justifyContent:'center'}}>
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
               style={{background:'var(--lin)', color:'var(--cobalt)'}}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089" style={{borderColor:'rgba(240,236,227,.4)', color:'var(--lin)'}}>06 49 35 80 89</a>
          </div>
          <div className="sp-links">
            <Link to="/hypnose-gestion-emotions-paris">Toutes les émotions →</Link>
            <Link to="/hypnose-colere-paris">Colère et irritabilité →</Link>
            <Link to="/hypnose-charge-emotionnelle-paris">Charge émotionnelle →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseFrustrationParis;
