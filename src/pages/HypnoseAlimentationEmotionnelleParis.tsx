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

const alimentationEmotionnelleFaqItems = [
  {
    question: "Qu'est-ce que l'alimentation émotionnelle exactement ?",
    answer: "L'alimentation émotionnelle, c'est manger en réponse à des émotions plutôt qu'à une faim physique réelle. Stress, ennui, tristesse, solitude, anxiété — la nourriture devient une façon de gérer ces états intérieurs. Ce n'est pas un manque de volonté, c'est un mécanisme de régulation émotionnelle appris, souvent depuis l'enfance. L'hypnose travaille à installer d'autres formes de régulation, qui répondent au vrai besoin sans passer par la nourriture."
  },
  {
    question: "Comment distinguer la faim émotionnelle de la faim physique ?",
    answer: "La faim physique s'installe progressivement, n'a pas d'urgence particulière, accepte n'importe quel aliment et s'arrête quand on est rassasié·e. La faim émotionnelle apparaît soudainement, est souvent associée à un aliment précis (sucré, gras, réconfortant), ne s'arrête pas toujours à la satiété, et laisse souvent un sentiment de culpabilité après. L'hypnose aide à mieux reconnaître ces signaux intérieurs et à rétablir le contact avec la faim physique réelle."
  },
  {
    question: "L'hypnose peut-elle m'aider à arrêter de manger mes émotions ?",
    answer: "Oui, et c'est une problématique que j'accompagne régulièrement au cabinet. L'hypnose travaille en profondeur sur deux niveaux : identifier les émotions déclencheuses (stress, ennui, solitude) et apprendre à les reconnaître sans avoir à les « noyer » dans la nourriture, et installer de nouvelles stratégies de régulation émotionnelle qui répondent au besoin réel. Le résultat n'est pas une restriction — c'est une liberté nouvelle face à la nourriture."
  },
  {
    question: "Combien de séances pour traiter l'alimentation émotionnelle ?",
    answer: "En général, 4 à 6 séances permettent des changements durables. Les premières séances identifient les déclencheurs émotionnels principaux et commencent à modifier les automatismes. Les séances suivantes renforcent ces changements et travaillent sur la relation plus globale aux émotions. Chaque personne a son propre rythme — certains ressentent des changements dès la deuxième séance, d'autres ont besoin de plus de temps."
  },
  {
    question: "L'alimentation émotionnelle est-elle liée à d'autres problèmes ?",
    answer: "Souvent, oui. L'alimentation émotionnelle coexiste fréquemment avec l'anxiété, le stress chronique, une faible estime de soi, ou des difficultés à exprimer ou gérer ses émotions. Elle peut aussi être liée à des habitudes familiales (« on mange quand on est triste ») ou à des expériences passées. L'hypnose aborde ces dimensions de façon intégrée plutôt que de traiter le comportement alimentaire isolément."
  }
];

const HypnoseAlimentationEmotionnelleParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose alimentation émotionnelle Paris",
    "description": "Libérez-vous de l'alimentation émotionnelle par l'hypnose ericksonienne à Paris 4ème ou en visio. Manger par stress, ennui ou tristesse — traiter les causes émotionnelles.",
    "url": "https://novahypnose.fr/hypnose-alimentation-emotionnelle-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie alimentation émotionnelle",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
      "name": "Au cabinet Paris 4ème ou en visioconférence"
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
      { "@type": "ListItem", "position": 2, "name": "Troubles alimentaires", "item": "https://novahypnose.fr/hypnose-troubles-alimentaires-paris" },
      { "@type": "ListItem", "position": 3, "name": "Alimentation émotionnelle", "item": "https://novahypnose.fr/hypnose-alimentation-emotionnelle-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": alimentationEmotionnelleFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Manger sous le stress", desc: "Dès que la pression monte au travail ou à la maison, vous vous retrouvez à chercher de la nourriture — sans faim réelle" },
    { title: "Manger par ennui", desc: "Quand rien ne se passe, quand vous êtes seul·e — la nourriture remplit un vide, occupe, distrait" },
    { title: "Manger pour se réconforter", desc: "Après une déception, une dispute, une mauvaise journée — les aliments réconfortants deviennent votre premier réflexe" },
    { title: "Manger pour se récompenser", desc: "Quand vous avez bien travaillé, accompli quelque chose — vous marquez le coup avec de la nourriture, systématiquement" },
    { title: "Incapacité à s'arrêter malgré la satiété", desc: "Votre corps dit stop, mais quelque chose continue de manger — l'émotion n'est pas encore apaisée" },
    { title: "Culpabilité après avoir mangé", desc: "Vous savez que vous avez mangé « pour les mauvaises raisons » — et cette culpabilité alimente le cycle" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose alimentation émotionnelle Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Arrêtez de manger par stress, ennui ou tristesse grâce à l'hypnose à Paris 4ème ou en visio. L'hypnose traite les causes émotionnelles de la faim émotionnelle. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose alimentation émotionnelle paris, manger ses émotions hypnose, faim émotionnelle hypnose paris, manger par stress hypnose, alimentation émotionnelle traitement paris, hypnose manger ennui paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-alimentation-emotionnelle-paris" />
        <meta property="og:title" content="Hypnose alimentation émotionnelle Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Arrêtez de manger par stress, ennui ou tristesse grâce à l'hypnose. L'hypnose traite les causes émotionnelles de la faim émotionnelle." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-alimentation-emotionnelle-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose alimentation émotionnelle" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose alimentation émotionnelle Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Arrêtez de manger par stress, ennui ou tristesse grâce à l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Alimentation émotionnelle — Paris</div>
          <h1 className="sp-hero__h1">
            Arrêter de manger<br/><em>ses émotions</em>
          </h1>
          <p className="sp-hero__lead">
            Vous mangez par stress, par ennui, par tristesse — pas parce que vous avez faim.
            Ce comportement n'est pas une faiblesse : c'est une façon apprise de gérer des
            émotions sans autre outil disponible. L'hypnose crée ces outils,
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
              <div className="section-tag">Alimentation émotionnelle — comprendre</div>
              <h2 className="section-title">La nourriture est devenue<br/><em>votre régulateur émotionnel.</em></h2>
              <p>
                Tout le monde mange parfois par émotion. Mais pour certaines personnes, c'est le
                principal mécanisme pour faire face — ou plutôt, pour ne pas avoir à faire face.
                La nourriture calme, distrait, réconforte, remplit. Pendant quelques minutes.
              </p>
              <p>
                Puis la culpabilité arrive. Et elle crée une nouvelle émotion à gérer. Qui appelle
                à nouveau la nourriture. Le cycle se referme.
              </p>
              <p>
                L'hypnose interrompt ce cycle en travaillant à la source : les émotions elles-mêmes.
                Elle vous aide à les reconnaître, les traverser, les accueillir — sans avoir à les
                noyer. C'est une forme de liberté intérieure que la diététique seule ne peut pas
                apporter.
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
          <h2 className="sp-h2">Vous reconnaissez-vous ?</h2>
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
              <div className="section-tag">Mécanisme — réguler autrement</div>
              <h2 className="section-title">L'hypnose crée<br/><em>d'autres sorties aux émotions.</em></h2>
              <p>
                En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier les émotions précises qui déclenchent le comportement alimentaire",
                  "Apprendre à reconnaître la différence entre faim physique et faim émotionnelle",
                  "Installer de nouvelles stratégies de régulation émotionnelle (intérieures)",
                  "Neutraliser les associations automatiques entre une émotion et un aliment",
                  "Réduire la culpabilité alimentaire qui alimente le cycle",
                  "Rétablir un rapport apaisé et conscient à la nourriture"
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

      {/* Cas concrets */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Témoignages au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Manger par stress — transformer le réflexe</div>
              <p>
                Sarah*, 38 ans, manageuse dans une grande entreprise, rentrait chaque soir épuisée
                et se jetait sur la nourriture — pas par faim, mais pour « décompresser ». Elle avait
                essayé la diététique, le sport, les applications de pleine conscience. Rien ne tenait.
              </p>
              <p>
                En 5 séances, nous avons travaillé sur ce qui se passait réellement dans ces soirées :
                un besoin de transition entre le professionnel et le personnel que la nourriture remplissait.
                Une fois ce besoin nommé et comblé autrement, le comportement s'est dissous sans effort.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Manger seul·e le soir — combler un vide</div>
              <p>
                Julien*, 45 ans, vivait seul depuis 3 ans et mangeait chaque soir en regardant la
                télévision — souvent jusqu'à tard, souvent au-delà de sa faim. La nourriture
                s'était substituée à la présence, au lien, à la connexion.
              </p>
              <p>
                L'hypnose a permis de travailler sur ce besoin de lien et la solitude qui le sous-tendait.
                À mesure que sa vie sociale s'est enrichie, et qu'il trouvait d'autres façons de
                se sentir présent à lui-même, les soirées de grignotage ont naturellement reculé.
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
              { value: '4-6', label: 'séances pour transformer durablement le rapport aux émotions et à la nourriture' },
              { value: '100%', label: 'personnalisé selon vos déclencheurs émotionnels propres' },
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

      {/* FAQ */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et l'alimentation émotionnelle</h2>
          <div>
            {alimentationEmotionnelleFaqItems.map((item, i) => (
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
          keywords={["alimentation émotionnelle", "manger ses émotions", "faim émotionnelle", "stress alimentaire"]}
          title="Articles sur l'alimentation émotionnelle"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-alimentation-emotionnelle-paris"
          pageTitle="Hypnose pour l'alimentation émotionnelle à Paris"
          pageDescription="Hypnose ericksonienne pour se libérer de l'alimentation émotionnelle au cabinet Paris 4ème ou en visio."
          topic="l'alimentation émotionnelle et la régulation émotionnelle"
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
              authors: "Macht M",
              title: "How emotions affect eating: A five-way model",
              source: "Appetite",
              year: 2008,
              url: "https://pubmed.ncbi.nlm.nih.gov/18082300/",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt·e à ne plus manger vos émotions ?</h2>
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
            <Link to="/hypnose-troubles-alimentaires-paris">Tous les troubles alimentaires →</Link>
            <Link to="/hypnose-compulsions-alimentaires-paris">Compulsions alimentaires →</Link>
            <Link to="/hypnose-grignotage-paris">Grignotage chronique →</Link>
            <Link to="/hypnose-addiction-sucre-paris">Addiction au sucre →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseAlimentationEmotionnelleParis;
