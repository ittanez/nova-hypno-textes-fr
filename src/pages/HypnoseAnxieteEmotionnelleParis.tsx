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

const anxieteEmotionnelleFaqItems = [
  {
    question: "Qu'est-ce que l'anxiété émotionnelle et comment l'hypnose peut-elle aider ?",
    answer: "L'anxiété émotionnelle est la peur d'être submergé(e) par ses propres émotions — craindre de craquer, de perdre le contrôle, d'être envahi(e) par la tristesse, la colère ou la panique. L'hypnose ericksonienne travaille sur les croyances inconscientes qui font de vos émotions une menace, et vous aide à rétablir une relation de confiance avec votre vie émotionnelle."
  },
  {
    question: "J'ai peur de craquer si je commence à ressentir mes émotions — est-ce que l'hypnose peut déclencher quelque chose de difficile ?",
    answer: "Non. L'hypnose ericksonienne procède toujours à votre rythme et ne force rien. Nous travaillons dans votre zone de confort émotionnel. Si quelque chose de difficile émerge, nous avons des outils pour le gérer en douceur. Beaucoup de patients redoutent cette crainte avant la première séance et se retrouvent au contraire dans un état de calme profond."
  },
  {
    question: "Je ne pleure jamais — est-ce que c'est un problème pour l'hypnose ?",
    answer: "Pas du tout. L'incapacité à pleurer ou à exprimer ses émotions est elle-même un mécanisme de protection inconscient. L'hypnose peut travailler avec ce mode de fonctionnement, sans forcer l'expression émotionnelle. Le travail se fait en douceur, à votre rythme et selon votre style émotionnel."
  },
  {
    question: "Combien de séances sont nécessaires pour l'anxiété émotionnelle ?",
    answer: "En général, 3 à 5 séances permettent d'observer des changements significatifs. La première séance identifie l'origine de la peur des émotions et les mécanismes de contrôle en place. Les séances suivantes installent progressivement une confiance dans votre capacité émotionnelle."
  },
  {
    question: "Mon contrôle excessif vient d'une famille où on ne montrait pas ses émotions — est-ce que l'hypnose peut quand même aider ?",
    answer: "Oui, c'est même l'une des situations les plus fréquentes. Le modèle familial où les émotions ne s'expriment pas crée souvent une méfiance profonde envers son propre monde émotionnel. L'hypnose peut retracer ces apprentissages inconscients et vous aider à développer une nouvelle relation avec vos émotions."
  },
  {
    question: "Puis-je faire mes séances en visio ?",
    answer: "Oui. Les séances en visioconférence sont aussi efficaces qu'en cabinet pour l'anxiété émotionnelle. De nombreux patients préfèrent même la visio pour ce type de travail, car être dans leur propre espace les aide à se sentir en sécurité pour explorer leurs émotions."
  }
];

const HypnoseAnxieteEmotionnelleParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose anxiété émotionnelle Paris",
    "description": "Rétablissez la confiance en votre vie émotionnelle par l'hypnose ericksonienne. Peur de craquer, contrôle excessif, évitement émotionnel. Cabinet Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-anxiete-emotionnelle-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie anxiété émotionnelle",
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
      { "@type": "ListItem", "position": 3, "name": "Anxiété émotionnelle", "item": "https://novahypnose.fr/hypnose-anxiete-emotionnelle-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": anxieteEmotionnelleFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Peur de 'craquer'", desc: "Vous redoutez de perdre le contrôle émotionnel — de pleurer, de vous mettre en colère, de vous effondrer" },
    { title: "Évitement émotionnel", desc: "Vous fuyez les situations susceptibles de déclencher des émotions fortes : films tristes, conflits, discussions intimes" },
    { title: "Contrôle excessif", desc: "Vous maintenez une façade de calme permanent qui demande une énergie considérable et vous épuise" },
    { title: "Ruminations anxieuses", desc: "Vous anticipez constamment comment vous allez réagir émotionnellement à des situations futures" },
    { title: "Difficultés à exprimer ses émotions", desc: "Vous ne savez pas comment nommer ce que vous ressentez ni comment l'exprimer de façon adaptée" },
    { title: "Corps sous tension permanente", desc: "Gorge serrée, estomac noué, tensions musculaires — votre corps retient les émotions non exprimées" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose anxiété émotionnelle Paris | Alain Zenatti</title>
        <meta name="description" content="Rétablissez la confiance en vos émotions par l'hypnose à Paris 4ème ou en visio. Peur de craquer, contrôle excessif, évitement émotionnel — résultats en 3 à 5 séances." />
        <meta name="keywords" content="hypnose anxiété émotionnelle paris, peur émotions hypnose, contrôle émotions hypnose paris, hypnothérapeute anxiété émotionnelle paris, évitement émotionnel hypnose, exprimer émotions hypnose, anxiété émotionnelle hypnose en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-anxiete-emotionnelle-paris" />
        <meta property="og:title" content="Hypnose anxiété émotionnelle Paris | Alain Zenatti" />
        <meta property="og:description" content="Rétablissez la confiance en vos émotions par l'hypnose à Paris 4ème ou en visio. Peur de craquer, contrôle excessif, évitement émotionnel — résultats en 3 à 5 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-anxiete-emotionnelle-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose anxiété émotionnelle" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose anxiété émotionnelle Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Rétablissez la confiance en vos émotions par l'hypnose à Paris 4ème ou en visio. Peur de craquer, contrôle excessif, évitement émotionnel — résultats en 3 à 5 séances." />
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
          <div className="tag">Anxiété émotionnelle — Paris</div>
          <h1 className="sp-hero__h1">
            Hypnose pour l'anxiété émotionnelle
          </h1>
          <p className="sp-hero__lead">
            Vous avez peur d'être submergé(e) par vos émotions ? Vous évitez les situations intenses, les confrontations, ou tout ce qui pourrait déclencher une réaction émotionnelle forte ? Cette peur de ses propres émotions peut paralyser votre vie. L'hypnose vous aide à <strong>rétablir la confiance en votre capacité émotionnelle</strong>. <strong>Résultats en 3 à 5 séances</strong>, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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

      <section className="sp-section">
        <div className="container">
          <div className="cabinet__grid reveal">
            <div className="cabinet__copy">
              <div className="section-tag">Anxiété émotionnelle — comprendre</div>
              <h2 className="section-title">Quand les émotions<br/><em>font peur.</em></h2>
              <p>
                L'anxiété émotionnelle est moins connue que l'anxiété classique mais tout aussi paralysante. Ce n'est pas la peur d'une situation extérieure — c'est la peur de ses propres émotions. La crainte de craquer, de perdre le contrôle, d'être envahi(e) par quelque chose de trop intense.
              </p>
              <p>
                Cette peur conduit souvent à un évitement systématique de tout ce qui pourrait déclencher des émotions : films touchants, conversations profondes, conflits, situations de vulnérabilité. Elle peut aussi se manifester par un contrôle excessif — maintenir une façade de calme permanent au prix d'un épuisement considérable.
              </p>
              <p>
                L'hypnose travaille sur la croyance inconsciente que vos émotions sont une menace — pour vous redonner confiance en votre capacité naturelle à ressentir et à traverser.
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
              <div className="section-tag">Mécanisme — confiance émotionnelle</div>
              <h2 className="section-title">L'hypnose rétablit<br/><em>la confiance émotionnelle.</em></h2>
              <p>
                L'hypnose ericksonienne travaille sur la croyance inconsciente que les émotions sont dangereuses ou incontrôlables. En état de relaxation profonde, nous pouvons :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier l'origine de la peur des émotions (expériences passées de débordement, modèle familial)",
                  "Transformer la perception des émotions : de menace à information utile",
                  "Développer une tolérance progressive à l'intensité émotionnelle",
                  "Apprendre à traverser les émotions sans en être submergé(e)",
                  "Installer une confiance dans votre capacité naturelle à ressentir et à revenir au calme"
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
              <div className="sp-case__title">Évitement total des conflits</div>
              <p>
                Camille*, 35 ans, évitait systématiquement tout conflit, toute discussion difficile, toute situation susceptible de déclencher des émotions fortes. Cette vigilance permanente l'épuisait et limitait considérablement sa vie relationnelle et professionnelle. En 4 séances d'hypnose, nous avons travaillé sur la peur du débordement émotionnel. Camille peut désormais exprimer ses besoins et traverser des désaccords sans panique.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Incapacité à pleurer</div>
              <p>
                Raphaël*, 43 ans, n'avait pas pleuré depuis l'enfance. Il se sentait déconnecté de lui-même, incapable de vraiment ressentir quoi que ce soit. Cette anesthésie émotionnelle nuisait à ses relations intimes. En 3 séances, nous avons exploré les mécanismes de protection mis en place et progressivement rétabli la connexion à son monde émotionnel. Raphaël a retrouvé une profondeur relationnelle qu'il ne connaissait plus.
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
              { value: '3-5', label: 'séances pour rétablir la confiance en sa vie émotionnelle' },
              { value: 'Confiance', label: 'émotionnelle retrouvée — ressentir sans craindre' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'anxiété émotionnelle</h2>
          <div>
            {anxieteEmotionnelleFaqItems.map((item, i) => (
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
          keywords={["anxiété", "émotions", "contrôle", "peur"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur l'anxiété émotionnelle"
          accentColor="text-rose-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-anxiete-emotionnelle-paris"
          pageTitle="Hypnose pour l'anxiété émotionnelle à Paris"
          pageDescription="Hypnose ericksonienne pour rétablir la confiance émotionnelle et vaincre la peur de ses émotions. Cabinet Paris 4ème ou en visio."
          topic="l'anxiété émotionnelle et la régulation des émotions"
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
          <h2 className="sp-h2">Retrouvez confiance en vos émotions</h2>
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
            <Link to="/hypnose-hypersensibilite-paris">Hypersensibilité →</Link>
            <Link to="/hypnose-charge-emotionnelle-paris">Charge émotionnelle →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseAnxieteEmotionnelleParis;
