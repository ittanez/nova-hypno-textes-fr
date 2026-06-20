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

const claustrophobieFaqItems = [
  {
    question: "L'hypnose peut-elle vraiment soigner la claustrophobie ?",
    answer: "Oui. La claustrophobie est un programme inconscient appris — et tout programme appris peut être reconfiguré. L'hypnose ericksonienne accède directement aux mécanismes inconscients qui déclenchent la panique en espace clos. La plupart des patients constatent une transformation significative en 2 à 4 séances."
  },
  {
    question: "Ma claustrophobie m'empêche de faire une IRM — que faire ?",
    answer: "C'est l'une des situations les plus fréquentes et les plus urgentes que je traite. L'hypnose peut vous permettre de passer une IRM sereinement, souvent en 1 à 2 séances si l'examen est urgent. Contactez-moi en précisant votre délai, nous organiserons un accompagnement adapté."
  },
  {
    question: "Est-ce que les séances d'hypnose se déroulent dans un espace confiné ?",
    answer: "Non. Le cabinet est un espace confortable et ouvert. Vous n'êtes jamais enfermé, et la porte reste accessible. Nous travaillons uniquement sur votre représentation mentale, en état de relaxation profonde."
  },
  {
    question: "Ma claustrophobie est liée à un accident d'ascenseur — est-ce traitable ?",
    answer: "Oui. La claustrophobie d'origine traumatique (ascenseur bloqué, enfermement accidentel) est l'une des formes les plus courantes. L'hypnose permet de retraiter le souvenir traumatique à distance émotionnelle, sans le revivre, pour neutraliser l'empreinte qu'il a laissée."
  },
  {
    question: "La claustrophobie peut-elle se développer à l'âge adulte ?",
    answer: "Oui. Elle peut apparaître à tout âge, souvent après un événement déclencheur (ascenseur bloqué, accident, intervention médicale traumatisante). L'hypnose est efficace quelle que soit l'ancienneté de la phobie."
  },
  {
    question: "Les séances en visio sont-elles possibles pour la claustrophobie ?",
    answer: "Oui. L'hypnose en visio est aussi efficace qu'en cabinet pour la claustrophobie. Vous êtes dans votre propre espace, en sécurité, et je vous guide dans un état hypnotique profond. De nombreux patients claustrophobes ont été traités intégralement en téléconsultation."
  }
];

const HypnoseClaustrophobie = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose claustrophobie Paris",
    "description": "Traitement de la claustrophobie (peur des espaces clos) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-claustrophobie-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie claustrophobie",
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
      { "@type": "ListItem", "position": 3, "name": "Claustrophobie", "item": "https://novahypnose.fr/hypnose-claustrophobie-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": claustrophobieFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Angoisse dans les ascenseurs", desc: "Vous prenez systématiquement les escaliers, parfois jusqu'au 15ème étage, pour éviter l'ascenseur" },
    { title: "IRM impossible", desc: "Vous avez déjà refusé ou interrompu un examen médical par IRM à cause de la claustrophobie" },
    { title: "Métro et RER", desc: "Les rames bondées ou les tunnels longs déclenchent une sensation d'étouffement insupportable" },
    { title: "Difficultés en avion", desc: "La cabine pressurisée déclenche une anxiété qui s'ajoute à votre gêne à bord" },
    { title: "Lieux bondés ou étroits", desc: "Foules, caves, couloirs étroits, cabines téléphoniques — tout espace sans issue visible vous angoisse" },
    { title: "Impossibilité de rester seul dans une pièce fermée", desc: "Vous devez laisser une porte entrouverte pour ne pas paniquer" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose claustrophobie (peur des espaces clos) Paris | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de la claustrophobie (peur des espaces clos) par l'hypnose à Paris 4ème ou en visio. Ascenseurs, IRM, métro, avion — résultats durables en 2 à 4 séances." />
        <meta name="keywords" content="hypnose claustrophobie paris, peur espaces clos hypnose, traitement claustrophobie, vaincre claustrophobie hypnose, hypnothérapeute claustrophobie paris, hypnose peur enfermement, claustrophobie hypnose en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-claustrophobie-paris" />
        <meta property="og:title" content="Hypnose claustrophobie (peur des espaces clos) Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de la claustrophobie (peur des espaces clos) par l'hypnose à Paris 4ème ou en visio. Ascenseurs, IRM, métro, avion — résultats durables en 2 à 4 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-claustrophobie-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose claustrophobie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose claustrophobie (peur des espaces clos) Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de la claustrophobie (peur des espaces clos) par l'hypnose à Paris 4ème ou en visio. Ascenseurs, IRM, métro, avion — résultats durables en 2 à 4 séances." />
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
          <div className="tag">Claustrophobie — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous de la claustrophobie
          </h1>
          <p className="sp-hero__lead" dangerouslySetInnerHTML={{ __html: "Ascenseurs, IRM, avions, sous-terrains, cabines de douche… La claustrophobie vous contraint à des contorsions quotidiennes pour éviter tout espace confiné ? Cette phobie touche environ <strong>5 à 7% de la population</strong>. L'hypnose ericksonienne neutralise cette peur à sa racine. <strong>Résultats en 2 à 4 séances</strong>, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>." }} />
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
              <div className="section-tag">Claustrophobie — comprendre</div>
              <h2 className="section-title">La claustrophobie,<br/><em>une prison invisible ?</em></h2>
              <p>
                La claustrophobie est la peur des espaces clos, confinés ou sans issue de sortie visible.
                C'est l'une des phobies les plus invalidantes au quotidien, car les situations
                déclencheuses sont omniprésentes : transports, médecine, travail, logement.
              </p>
              <p>
                Dans la plupart des cas, la claustrophobie naît d'une expérience traumatisante (enfermement
                accidentel, ascenseur bloqué, situation d'urgence) ou d'une transmission familiale. Elle
                active un mécanisme de survie disproportionné — votre inconscient perçoit l'espace confiné
                comme une menace vitale.
              </p>
              <p>
                L'hypnose permet de reprogrammer cette réponse automatique, sans avoir à revivre
                l'événement fondateur, et sans exposition forcée aux situations redoutées.
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
                panique en espace clos. Vous restez conscient et en contrôle pendant toute la séance. Je
                vous guide dans un état de relaxation profonde pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier le contexte dans lequel la claustrophobie s'est installée",
                  "Dissocier la sensation d'étouffement du stimulus (l'espace fermé)",
                  "Créer de nouvelles associations — espace confiné = calme et contrôle",
                  "Ancrer un état de sécurité intérieure activable dans toute situation",
                  "Vous transmettre des techniques d'auto-hypnose pour rester serein en espace clos"
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
              <div className="sp-case__title">IRM refusée depuis 3 ans</div>
              <p>
                Nathalie*, 49 ans, avait besoin d'une IRM prescrite par son médecin mais ne pouvait pas
                l'effectuer. Elle avait déjà interrompu deux tentatives sous sédatif. En 3 séances, nous
                avons neutralisé sa claustrophobie.
              </p>
              <p>
                Elle a passé son IRM complète sereinement le mois suivant.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Escaliers jusqu'au 9ème étage</div>
              <p>
                David*, 37 ans, montait 9 étages à pied chaque matin pour éviter l'ascenseur de son bureau.
                Sa claustrophobie l'épuisait physiquement et psychologiquement.
              </p>
              <p>
                Après 2 séances d'hypnose, il prend l'ascenseur sans anxiété.
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
              { value: '2-4', label: 'séances en moyenne pour traiter la claustrophobie' },
              { value: '5-7%', label: 'de la population souffre de claustrophobie — une phobie très traitable par hypnose' },
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
          <h2 className="sp-h2">Questions fréquentes sur la claustrophobie</h2>
          <div>
            {claustrophobieFaqItems.map((item, i) => (
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
          keywords={["claustrophobie", "espaces clos", "enfermement", "phobie", "angoisse"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur la claustrophobie"
          accentColor="text-purple-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-claustrophobie-paris"
          pageTitle="Hypnose pour la claustrophobie à Paris"
          pageDescription="Hypnose ericksonienne pour la claustrophobie (peur des espaces clos) au cabinet Paris 4ème ou en visio."
          topic="la claustrophobie et la peur des espaces clos"
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
          <h2 className="sp-h2">Libérez-vous de la claustrophobie</h2>
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
            <Link to="/hypnose-arachnophobie-paris">Arachnophobie →</Link>
            <Link to="/hypnose-acrophobie-paris">Peur du vide →</Link>
            <Link to="/hypnose-peur-parler-public-paris">Peur de parler en public →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseClaustrophobie;
