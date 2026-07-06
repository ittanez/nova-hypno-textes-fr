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

const acrophobieFaqItems = [
  {
    question: "L'acrophobie est-elle différente du vertige ?",
    answer: "Oui. Le vertige est une sensation physique (impression de tourner) souvent due à un problème d'oreille interne. L'acrophobie est une peur phobique — une réaction émotionnelle intense à la perception du vide, sans cause physique. L'hypnose traite l'acrophobie (la peur) mais pas le vertige d'origine vestibulaire."
  },
  {
    question: "Combien de séances pour se débarrasser de la peur du vide ?",
    answer: "En général, 2 à 4 séances suffisent. La plupart des acrophobes ressentent un changement significatif dès la deuxième séance. L'accompagnement comprend : identification de l'origine de la peur, désensibilisation et ancrage d'un état de calme face au vide."
  },
  {
    question: "Est-ce que je vais devoir aller sur un balcon pendant les séances ?",
    answer: "Non. Nous travaillons entièrement dans le cabinet, en état de relaxation profonde, sur votre représentation mentale de la hauteur. Pas d'exposition réelle, pas d'image de vide. L'hypnose travaille directement sur votre programme inconscient."
  },
  {
    question: "Ma peur du vide est installée depuis 20 ans — est-il trop tard ?",
    answer: "Non, absolument pas. L'ancienneté d'une phobie ne détermine pas la durée du traitement. Votre inconscient n'a pas de notion du temps — un programme installé depuis 20 ans peut être reconfiguré en quelques séances, exactement comme un programme récent."
  },
  {
    question: "L'acrophobie peut-elle aussi provoquer une peur de sauter ?",
    answer: "Oui, certaines personnes souffrent d'une impulsion phobique (l'appel du vide) en plus de la peur. C'est une variante de l'acrophobie que l'hypnose peut également traiter en travaillant sur le sentiment de contrôle et de sécurité intérieure."
  },
  {
    question: "Les séances en visio sont-elles aussi efficaces pour une phobie du vide ?",
    answer: "Oui. L'hypnose en visioconférence est aussi efficace qu'en cabinet pour les phobies. Vous êtes chez vous, confortablement installé, et je vous guide dans un état de relaxation profonde. De nombreux clients ont été libérés de leur acrophobie entièrement en visio."
  }
];

const HypnoseAcrophobie = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose acrophobie Paris",
    "description": "Traitement de l'acrophobie (peur du vide et des hauteurs) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-acrophobie-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie acrophobie",
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
      { "@type": "ListItem", "position": 2, "name": "Phobies et peurs", "item": "https://novahypnose.fr/hypnose-phobies-paris" },
      { "@type": "ListItem", "position": 3, "name": "Acrophobie", "item": "https://novahypnose.fr/hypnose-acrophobie-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": acrophobieFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Vertige et paralysie", desc: "Dès que vous approchez d'un bord, vos jambes se dérobent et vous ne pouvez plus avancer" },
    { title: "Évitement des lieux en hauteur", desc: "Balcons, terrasses, belvédères, ponts vitrés… vous renoncez à des expériences mémorables" },
    { title: "Difficultés en escaliers", desc: "Les escaliers en colimaçon, les escalators, les passerelles vous sont insupportables" },
    { title: "Angoisses en avion", desc: "Les turbulences ou l'idée de regarder par le hublot déclenchent une réaction de panique" },
    { title: "Limitations professionnelles", desc: "Vous refusez des chantiers, des installations ou des postes nécessitant de travailler en hauteur" },
    { title: "Voyages limités", desc: "Montagne, randonnées, sites touristiques perchés… vous n'en profitez pas à cause de cette peur" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose acrophobie (peur du vide) Paris | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de l'acrophobie (peur du vide et des hauteurs) par l'hypnose à Paris 4ème ou en visio. Balcons, escaliers, échelles, falaises — résultats durables en 2 à 4 séances." />
        <meta name="keywords" content="hypnose acrophobie paris, peur vide hypnose, traitement acrophobie, peur hauteurs hypnose paris, hypnothérapeute acrophobie paris, hypnose vertige hauteur, peur vide hypnose en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-acrophobie-paris" />
        <meta property="og:title" content="Hypnose acrophobie (peur du vide) Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de l'acrophobie (peur du vide et des hauteurs) par l'hypnose à Paris 4ème ou en visio. Balcons, escaliers, échelles, falaises — résultats durables en 2 à 4 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-acrophobie-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose acrophobie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose acrophobie (peur du vide) Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de l'acrophobie (peur du vide et des hauteurs) par l'hypnose à Paris 4ème ou en visio. Balcons, escaliers, échelles, falaises — résultats durables en 2 à 4 séances." />
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
            <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
              <path d="M 0 720 C 200 660, 500 640, 800 680 C 1100 720, 1280 700, 1440 740 L 1440 900 L 0 900 Z" fill="#2B4BA0" opacity="0.88" />
            </g>
            <rect width="1440" height="900" filter="url(#paperGrain)" opacity=".2" />
          </svg>
        </div>
        <div className="container sp-hero__inner reveal">
          <div className="tag">Acrophobie — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous de la peur du vide
          </h1>
          <p className="sp-hero__lead" dangerouslySetInnerHTML={{ __html: "Balcon bloqué, escaliers en verre, falaises, ponts, échelles… La peur du vide (acrophobie) vous empêche de profiter pleinement de votre vie ? Cette phobie touche près d'<strong>une personne sur dix</strong>. L'hypnose ericksonienne désactive cette peur à sa racine. <strong>Résultats en 2 à 4 séances</strong>, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>." }} />
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
              <div className="section-tag">Acrophobie — comprendre</div>
              <h2 className="section-title">L'acrophobie,<br/><em>bien plus qu'un vertige ?</em></h2>
              <p>
                L'acrophobie (du grec akron, sommet) est la peur irrationnelle des hauteurs. Elle va bien au-delà du vertige physiologique — c'est une réaction émotionnelle intense déclenchée par la perception du vide, parfois même à faible hauteur. La peur peut se déclencher en regardant par une fenêtre, sur un balcon, en montant une échelle ou en s'approchant d'une rambarde.
              </p>
              <p>
                Contrairement à ce que l'on croit, ce n'est pas la hauteur elle-même qui est problématique, mais la manière dont votre inconscient a codé une expérience passée comme dangereuse. Ce programme peut souvent être retracé à un événement fondateur — une chute, un quasi-accident, ou même une peur transmise par un parent.
              </p>
              <p>
                Ce qui a été appris peut être désappris : l'hypnose vous permet de reconfigurer ce programme en profondeur.
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

      {/* Manifestations */}
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

      {/* Comment ça marche */}
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
              <div className="section-tag">Mécanisme — désensibilisation</div>
              <h2 className="section-title">L'hypnose désactive<br/><em>la peur à la racine.</em></h2>
              <p>
                L'hypnose ericksonienne agit sur le programme inconscient qui déclenche la réaction de
                panique face au vide. Vous restez conscient et en contrôle pendant toute la séance. Je vous
                guide dans un état de relaxation profonde pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier l'événement fondateur de la peur du vide dans votre histoire",
                  "Dissocier la réaction de panique de la perception du vide ou de la hauteur",
                  "Reconfigurer votre réponse automatique : de la panique à la vigilance calme",
                  "Ancrer un état de stabilité et de confiance que vous activez en situation",
                  "Installer des techniques d'auto-hypnose pour rester serein face au vide"
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
          <h2 className="sp-h2">Exemples de parcours au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Vertige sur balcon</div>
              <p>
                Antoine*, architecte, ne pouvait pas accompagner ses clients sur les terrasses de chantier. Sa peur du vide menaçait sa carrière. En 3 séances, nous avons neutralisé l'origine de cette peur.
              </p>
              <p>
                Antoine visite maintenant ses chantiers à tous les étages sans problème.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Refus de montagne depuis 15 ans</div>
              <p>
                Sylvie*, 45 ans, n'avait pas pu accompagner sa famille en randonnée depuis 15 ans. La vue du vide depuis un sentier la paralysait complètement.
              </p>
              <p>
                En 4 séances d'hypnose, elle a retrouvé la capacité de marcher sur des sentiers de montagne et a rejoint sa famille pour des vacances qu'elle n'avait jamais pu partager.
              </p>
            </div>
          </div>
          <p className="sp-footnote">* Prénoms modifiés pour préserver la confidentialité</p>
        </div>
      </section>

      {/* Témoignage */}
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

      {/* Stats */}
      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <div className="sp-stats">
            {[
              { value: '2-4', label: "séances suffisent en moyenne pour traiter l'acrophobie" },
              { value: '1 sur 10', label: "personnes souffrent d'acrophobie, dont beaucoup peuvent en être libérées" },
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
          <h2 className="sp-h2">Questions fréquentes sur la peur du vide</h2>
          <div>
            {acrophobieFaqItems.map((item, i) => (
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
          keywords={["acrophobie", "peur du vide", "hauteurs", "phobie", "vertige"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur l'acrophobie et la peur du vide"
          accentColor="text-purple-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-acrophobie-paris"
          pageTitle="Hypnose pour l'acrophobie à Paris"
          pageDescription="Hypnose ericksonienne pour l'acrophobie (peur du vide et des hauteurs) au cabinet Paris 4ème ou en visio."
          topic="l'acrophobie et la peur des hauteurs"
          dateModified="2026-06-18"
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

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Libérez-vous de la peur du vide</h2>
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
            <Link to="/hypnose-phobies-paris">Toutes les phobies →</Link>
            <Link to="/peurdelavion">Peur de l'avion →</Link>
            <Link to="/hypnose-claustrophobie-paris">Claustrophobie →</Link>
            <Link to="/hypnose-arachnophobie-paris">Arachnophobie →</Link>
            <Link to="/hypnose-peur-parler-public-paris">Peur de parler en public →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseAcrophobie;
