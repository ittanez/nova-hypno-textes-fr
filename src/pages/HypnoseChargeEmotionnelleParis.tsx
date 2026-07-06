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

const chargeFaqItems = [
  {
    question: "Qu'est-ce que la charge émotionnelle exactement ?",
    answer: "La charge émotionnelle, c'est l'accumulation progressive des émotions non digérées — tristesses, colères, inquiétudes, déceptions — qui s'accumulent dans l'inconscient sans avoir pu être exprimées ou traitées. Avec le temps, ce poids devient de plus en plus lourd à porter : fatigue chronique, sentiment d'être constamment à bout, réactions disproportionnées, irritabilité, larmes sans raison apparente."
  },
  {
    question: "Pourquoi ai-je l'impression de porter les émotions des autres en plus des miennes ?",
    answer: "C'est l'une des formes les plus communes de charge émotionnelle, particulièrement chez les personnes empathiques ou hypersensibles. L'inconscient absorbe les états émotionnels de l'entourage sans filtre — la tension d'un conjoint, la tristesse d'un ami, l'atmosphère d'un lieu de travail. L'hypnose travaille à installer des frontières émotionnelles saines : vous restez capable d'empathie, mais vous ne portez plus ce qui appartient aux autres."
  },
  {
    question: "La charge émotionnelle peut-elle causer une fatigue physique ?",
    answer: "Absolument. L'inconscient et le corps ne sont pas séparés — les émotions non digérées se manifestent souvent physiquement : tensions musculaires, fatigue chronique inexpliquée, troubles du sommeil, maux de tête, problèmes digestifs. L'hypnose, en travaillant à libérer les charges émotionnelles accumulées, peut avoir des effets positifs sur ces symptômes physiques associés."
  },
  {
    question: "Comment l'hypnose aide-t-elle à alléger la charge émotionnelle ?",
    answer: "En état de relaxation profonde, l'hypnose accède directement à l'inconscient où les émotions sont stockées. Je vous guide pour identifier les charges spécifiques — d'où elles viennent, ce qu'elles contiennent — et créer les conditions pour qu'elles puissent être libérées. C'est un processus en douceur, qui va à votre rythme. Beaucoup de clients décrivent un sentiment de légèreté très concret après les séances."
  },
  {
    question: "Combien de séances pour alléger une charge émotionnelle chronique ?",
    answer: "En général, 4 à 6 séances permettent un allègement significatif. Les premières séances commencent à décharger les couches les plus récentes et les plus accessibles. Les séances suivantes vont en profondeur pour libérer des charges plus anciennes et installer de nouvelles frontières émotionnelles. La durée dépend de l'ancienneté et de la densité de la charge accumulée."
  }
];

const HypnoseChargeEmotionnelleParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose charge émotionnelle Paris",
    "description": "Accompagnement de la charge émotionnelle et de l'épuisement émotionnel par l'hypnose ericksonienne à Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-charge-emotionnelle-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie charge émotionnelle",
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
      { "@type": "ListItem", "position": 3, "name": "Charge émotionnelle", "item": "https://novahypnose.fr/hypnose-charge-emotionnelle-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": chargeFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Épuisement inexpliqué", desc: "Une fatigue profonde qui ne passe pas avec le repos — comme si vous portiez un poids invisible en permanence" },
    { title: "Larmes sans raison apparente", desc: "Des pleurs qui surgissent pour rien, une émotivité qui déborde à tout moment, parfois avec gêne ou incompréhension" },
    { title: "Sentiment d'être saturé(e)", desc: "L'impression que vous ne pouvez plus recevoir d'information ou d'émotion de plus — une saturation complète" },
    { title: "Absorption des émotions des autres", desc: "Vous repartez d'une réunion, d'un repas ou d'une conversation avec les émotions des autres collées à vous" },
    { title: "Réactions disproportionnées", desc: "Des petits événements déclenchent des réactions très intenses — parce que la charge est déjà pleine" },
    { title: "Tension physique chronique", desc: "Tensions musculaires, mâchoires serrées, estomac noué — le corps porte physiquement la charge émotionnelle" }
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose charge émotionnelle Paris | Alain Zenatti</title>
        <meta name="description" content="Accompagnement de la charge émotionnelle et de l'épuisement émotionnel par l'hypnose à Paris 4ème ou en visio. Fatigue, saturation, absorption des émotions. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose charge émotionnelle paris, épuisement émotionnel hypnose, saturation émotionnelle traitement, hypnose fatigue émotionnelle paris, porter émotions des autres hypnose" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-charge-emotionnelle-paris" />
        <meta property="og:title" content="Hypnose charge émotionnelle Paris | Alain Zenatti" />
        <meta property="og:description" content="Accompagnement de la charge émotionnelle par l'hypnose à Paris 4ème ou en visio. Épuisement, saturation, absorption des émotions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-charge-emotionnelle-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose charge émotionnelle" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose charge émotionnelle Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Accompagnement de la charge émotionnelle par l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Charge émotionnelle — Paris</div>
          <h1 className="sp-hero__h1">
            Déposer le poids<br/><em>que vous portez seul(e)</em>
          </h1>
          <p className="sp-hero__lead">
            Épuisement profond, saturation, larmes inexpliquées, sensation de porter les émotions de
            tout le monde — la charge émotionnelle s'accumule silencieusement. L'hypnose aide à
            <strong> libérer ces couches accumulées</strong> et à retrouver une légèreté durable,
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
              <div className="section-tag">Charge émotionnelle — comprendre</div>
              <h2 className="section-title">Les émotions non digérées<br/><em>s'accumulent.</em></h2>
              <p>
                Chaque émotion non exprimée, chaque situation difficile traversée sans espace pour
                la digérer, chaque fois qu'on s'est dit "ça va, je gère" — tout cela s'accumule
                dans l'inconscient comme des couches successives.
              </p>
              <p>
                Avec le temps, cette charge devient de plus en plus lourde. Le corps commence à
                signaler : fatigue inexpliquée, tensions chroniques, saturation, réactions
                disproportionnées, larmes qui surgissent pour rien.
              </p>
              <p>
                L'hypnose permet d'accéder à ces couches profondes pour les libérer progressivement,
                en douceur. Beaucoup de clients décrivent un sentiment concret de légèreté après
                les premières séances.
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
              <div className="section-tag">Mécanisme — libérer en profondeur</div>
              <h2 className="section-title">L'hypnose accède<br/><em>aux émotions figées.</em></h2>
              <p>
                En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier et localiser les couches de charge émotionnelle accumulée",
                  "Créer un espace sécurisé pour libérer les émotions figées",
                  "Distinguer vos émotions de celles absorbées chez les autres",
                  "Installer des frontières émotionnelles saines et naturelles",
                  "Restaurer l'énergie et réduire la fatigue émotionnelle",
                  "Développer des ressources intérieures de régulation durable"
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
              <div className="sp-case__title">Infirmière — porter la souffrance des clients sans s'y noyer</div>
              <p>
                Marie*, 39 ans, infirmière en service oncologie, rentrait chaque soir avec un poids
                qu'elle ne savait pas décrire. Elle n'arrivait plus à "décrocher", dormait mal,
                pleurait parfois dans sa voiture sans savoir pourquoi.
              </p>
              <p>
                En hypnose, nous avons travaillé à créer une membrane émotionnelle naturelle —
                être pleinement présente avec les clients sans absorber leur détresse. Après 5 séances,
                elle décrivait la capacité de rentrer chez elle "légère" pour la première fois depuis des années.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Accumulation sur des années — un trop-plein qui éclate</div>
              <p>
                Stéphane*, 46 ans, avait traversé plusieurs années difficiles sans jamais s'arrêter :
                deuil du père, divorce, restructuration au travail. Il "gérait" — jusqu'au jour où
                il s'est mis à pleurer en voiture pour rien et n'arrivait plus à s'arrêter.
              </p>
              <p>
                En 6 séances, nous avons libéré progressivement les couches accumulées. Il décrivait
                la sensation que quelque chose de très lourd s'était progressivement allégé, de l'intérieur.
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
              { value: '4-6', label: 'séances pour alléger significativement la charge émotionnelle accumulée' },
              { value: '100%', label: 'personnalisé — on travaille sur VOS couches spécifiques' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la charge émotionnelle</h2>
          <div>
            {chargeFaqItems.map((item, i) => (
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
          keywords={["charge émotionnelle", "épuisement émotionnel", "émotions", "fatigue"]}
          title="Articles sur la charge émotionnelle"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-charge-emotionnelle-paris"
          pageTitle="Hypnose pour la charge émotionnelle à Paris"
          pageDescription="Hypnose ericksonienne pour libérer la charge émotionnelle accumulée et restaurer une légèreté durable — au cabinet Paris 4ème ou en visio."
          topic="la charge émotionnelle et l'épuisement émotionnel"
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
              authors: "Maslach C, Leiter MP",
              title: "Understanding the burnout experience: recent research and its implications for psychiatry",
              source: "World Psychiatry",
              year: 2016,
              url: "https://pubmed.ncbi.nlm.nih.gov/27265691/",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt à retrouver cette légèreté que vous avez oubliée ?</h2>
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
            <Link to="/hypnose-hypersensibilite-paris">Hypersensibilité →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Stress & Anxiété →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseChargeEmotionnelleParis;
