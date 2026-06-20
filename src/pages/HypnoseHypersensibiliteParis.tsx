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

const hypersensibiliteFaqItems = [
  {
    question: "L'hypersensibilité est-elle un trouble à traiter ou une caractéristique à accepter ?",
    answer: "L'hypersensibilité n'est pas un trouble à corriger — c'est une façon d'être au monde qui implique une perception plus fine, une empathie plus profonde, une résonance plus intense avec les émotions et les environnements. L'objectif de l'hypnose n'est pas de rendre une personne moins sensible, mais de l'aider à ne plus être submergée par cette sensibilité. Vous gardez votre richesse intérieure, vous gagnez simplement la capacité de la réguler."
  },
  {
    question: "Comment l'hypnose aide-t-elle les personnes hypersensibles ?",
    answer: "Les personnes hypersensibles sont souvent très réceptives à l'hypnose ericksonienne, précisément parce que leur rapport au ressenti est fin et profond. L'hypnose travaille sur l'installation de filtres naturels — une membrane perméable mais protectrice qui vous permet de ressentir sans vous noyer. Elle aide aussi à libérer les charges émotionnelles accumulées et à restaurer un espace intérieur de régulation."
  },
  {
    question: "Est-ce que l'hypnose peut aider à mieux supporter les environnements bruyants ou les foules ?",
    answer: "Oui. La surcharge sensorielle — lumières, bruits, foules — est l'une des difficultés les plus fréquentes des personnes hypersensibles. L'hypnose aide à moduler la réponse du système nerveux à ces stimuli, à créer un espace protecteur intérieur qui permet de traverser ces environnements sans être épuisé(e) ou déstabilisé(e). Ce n'est pas une suppression de la perception, mais une meilleure gestion de l'intensité."
  },
  {
    question: "Combien de séances pour apprendre à gérer l'hypersensibilité ?",
    answer: "En général, 4 à 6 séances permettent de développer des ressources durables de régulation. La première séance explore la nature spécifique de votre hypersensibilité et ses domaines d'impact. Les séances suivantes installent progressivement des outils intérieurs — filtres, ancres de calme, espace protecteur — que vous pouvez activer dans la vie quotidienne."
  },
  {
    question: "L'hypersensibilité est-elle liée à des expériences passées ?",
    answer: "Souvent, une hypersensibilité non gérée est renforcée par des expériences passées où les émotions n'ont pas pu s'exprimer ou ont été réprimées. L'hypnose permet de remonter à ces expériences fondatrices, de libérer les charges émotionnelles figées, et de recalibrer le système de régulation interne. Ce travail en profondeur produit des résultats plus durables que les techniques de surface."
  }
];

const HypnoseHypersensibiliteParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose hypersensibilité Paris",
    "description": "Accompagnement de l'hypersensibilité par l'hypnose ericksonienne à Paris 4ème ou en visio. Émotions amplifiées, surcharge sensorielle, épuisement émotionnel.",
    "url": "https://novahypnose.fr/hypnose-hypersensibilite-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie hypersensibilité",
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
      { "@type": "ListItem", "position": 3, "name": "Hypersensibilité", "item": "https://novahypnose.fr/hypnose-hypersensibilite-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": hypersensibiliteFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Émotions amplifiées", desc: "Vous ressentez tout avec une intensité que les autres ne comprennent pas — joie, tristesse, peur, beauté" },
    { title: "Surcharge sensorielle", desc: "Les bruits, lumières, foules ou parfums forts vous épuisent rapidement et vous déstabilisent" },
    { title: "Absorption des émotions des autres", desc: "Vous captez et ressentez les états émotionnels de votre entourage comme s'ils étaient les vôtres" },
    { title: "Pleurs faciles et imprévisibles", desc: "Les émotions montent très vite et débordent — un film, une musique, une parole peuvent vous faire pleurer" },
    { title: "Fatigue émotionnelle chronique", desc: "Cette intensité permanente est épuisante — vous avez besoin de plus de récupération que la moyenne" },
    { title: "Difficulté dans les interactions sociales", desc: "Les conflits, critiques ou atmosphères tendues vous affectent profondément et durablement" }
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose hypersensibilité Paris | Alain Zenatti</title>
        <meta name="description" content="Accompagnement de l'hypersensibilité par l'hypnose à Paris 4ème ou en visio. Émotions amplifiées, surcharge sensorielle, épuisement émotionnel. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose hypersensibilité paris, hypersensible hypnose, surcharge sensorielle hypnose paris, émotions amplifiées traitement, hypnose HSP paris, hypersensibilité émotionnelle hypnose en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-hypersensibilite-paris" />
        <meta property="og:title" content="Hypnose hypersensibilité Paris | Alain Zenatti" />
        <meta property="og:description" content="Accompagnement de l'hypersensibilité par l'hypnose à Paris 4ème ou en visio. Émotions amplifiées, surcharge sensorielle, épuisement émotionnel." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-hypersensibilite-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose hypersensibilité" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose hypersensibilité Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Accompagnement de l'hypersensibilité par l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Hypersensibilité — Paris</div>
          <h1 className="sp-hero__h1">
            Ressentir profondément<br/><em>sans être submergé(e)</em>
          </h1>
          <p className="sp-hero__lead">
            L'hypersensibilité n'est pas un défaut — c'est une richesse qui peut devenir épuisante.
            L'hypnose vous aide à <strong>réguler l'intensité</strong> sans perdre la profondeur de votre
            ressenti, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Hypersensibilité — comprendre</div>
              <h2 className="section-title">Une perception plus fine<br/><em>qui peut déborder.</em></h2>
              <p>
                Les personnes hypersensibles perçoivent le monde avec une intensité particulière : les
                nuances émotionnelles, les atmosphères, les beautés et les douleurs des autres. C'est
                une forme d'intelligence émotionnelle exceptionnelle.
              </p>
              <p>
                Mais cette finesse de perception peut devenir un fardeau quand elle n'est pas régulée :
                surcharge sensorielle, absorption des émotions des autres, fatigue chronique,
                pleurs incontrôlables, difficulté dans les relations.
              </p>
              <p>
                L'hypnose ne cherche pas à rendre une personne moins sensible. Elle l'aide à
                <strong> installer des filtres naturels</strong> — une membrane protectrice qui laisse passer
                l'essentiel sans laisser entrer le reste.
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
              <div className="section-tag">Mécanisme — filtrer sans fermer</div>
              <h2 className="section-title">L'hypnose installe<br/><em>vos filtres naturels.</em></h2>
              <p>
                En état de relaxation profonde, je vous guide pour développer des ressources intérieures
                durables :
              </p>
              <div className="sp-checklist">
                {[
                  "Explorer et honorer la nature spécifique de votre sensibilité",
                  "Libérer les charges émotionnelles accumulées et figées",
                  "Installer une membrane protectrice naturelle face aux stimuli extérieurs",
                  "Développer un espace intérieur de calme accessible en toutes circonstances",
                  "Apprendre à distinguer vos émotions de celles que vous absorbez",
                  "Restaurer l'énergie et réduire la fatigue émotionnelle chronique"
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
              <div className="sp-case__title">Absorption des émotions — retrouver ses propres frontières</div>
              <p>
                Camille*, 33 ans, thérapeute, rentrait chaque soir épuisée — elle portait littéralement
                les douleurs de ses patients. Elle ne savait plus où finissaient les émotions des autres
                et où commençaient les siennes.
              </p>
              <p>
                En 5 séances d'hypnose, nous avons travaillé à installer une membrane émotionnelle naturelle.
                Elle décrivait la sensation de pouvoir être pleinement présente en séance sans être envahie
                après. Son énergie a nettement augmenté.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Surcharge sensorielle — vivre en ville sans s'épuiser</div>
              <p>
                Romain*, 29 ans, avait du mal à rester dans des espaces bondés, bruyants ou sous
                néons — supermarché, métro, open space. Il esquivait ces situations mais ça limitait
                sa vie professionnelle et sociale.
              </p>
              <p>
                L'hypnose a travaillé sur la réponse de son système nerveux aux stimuli intenses.
                Après 4 séances, il décrivait ces environnements comme moins envahissants — comme
                si un volume avait été baissé.
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
              { value: '4-6', label: 'séances pour développer des ressources durables de régulation' },
              { value: '100%', label: 'respectueux de votre sensibilité — jamais pour la supprimer' },
              { value: '5/5', label: 'note moyenne sur Resalib et Google' },
            ].map((s) => (
              <div key={s.value} className="sp-stat reveal">
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et l'hypersensibilité</h2>
          <div>
            {hypersensibiliteFaqItems.map((item, i) => (
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
          keywords={["hypersensibilité", "émotions", "régulation émotionnelle", "sensibilité"]}
          title="Articles sur l'hypersensibilité"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-hypersensibilite-paris"
          pageTitle="Hypnose pour l'hypersensibilité à Paris"
          pageDescription="Hypnose ericksonienne pour accompagner l'hypersensibilité — émotions amplifiées, surcharge sensorielle, épuisement émotionnel — au cabinet Paris 4ème ou en visio."
          topic="l'hypersensibilité et la régulation émotionnelle"
          dateModified="2026-06-20"
          references={[
            {
              authors: "Aron EN",
              title: "The Highly Sensitive Person",
              source: "Broadway Books",
              year: 1996,
              url: "https://hsperson.com/",
            },
            {
              authors: "Inserm",
              title: "Évaluation de l'efficacité de la pratique de l'hypnose",
              source: "Rapport d'expertise collective",
              year: 2015,
              url: "https://www.inserm.fr/expertise-collective/evaluation-efficacite-pratique-hypnose/",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt à vivre votre sensibilité sans en être submergé(e) ?</h2>
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

export default HypnoseHypersensibiliteParis;
