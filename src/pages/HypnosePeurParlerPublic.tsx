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

const peurParlerFaqItems = [
  {
    question: "L'hypnose peut-elle supprimer complètement le trac ?",
    answer: "L'objectif n'est pas de supprimer tout trac — un peu d'adrénaline avant une intervention est utile et performant. L'hypnose vise à transformer le trac paralysant en énergie productive. Vous garderez une légère activation, mais sans les symptômes envahissants (trous de mémoire, voix chevrotante, tremblements)."
  },
  {
    question: "Combien de séances pour vaincre la peur de parler en public ?",
    answer: "En général, 3 à 5 séances. Les premières séances travaillent sur l'origine de la peur et la désensibilisation. Les suivantes ancrent un état de confiance et des automatismes de performance. Certaines personnes ressentent un changement dès la deuxième séance."
  },
  {
    question: "Est-ce que ça marche si j'ai une présentation importante dans deux semaines ?",
    answer: "Oui. Si l'échéance est proche, nous organisons des séances rapprochées pour maximiser les effets avant l'événement. Je vous transmets aussi des techniques d'auto-hypnose que vous pouvez utiliser le jour J pour rester centré."
  },
  {
    question: "Ma peur est liée à une humiliation ancienne — est-ce que ça change quelque chose ?",
    answer: "Non. L'hypnose est particulièrement efficace pour les phobies d'origine traumatique. Nous retravaillons le souvenir fondateur à distance émotionnelle — vous n'avez pas à le revivre — pour neutraliser l'empreinte qu'il a laissée sur vos prises de parole aujourd'hui."
  },
  {
    question: "L'hypnose fonctionne-t-elle pour les professions qui parlent souvent en public ?",
    answer: "Oui, et c'est une situation courante. Avocats, formateurs, commerciaux, managers, enseignants — beaucoup de professionnels dont le métier exige une prise de parole régulière souffrent de glossophobie. L'hypnose est très efficace pour reconstruire une relation sereine et performante avec la prise de parole."
  },
  {
    question: "Puis-je faire mes séances en visio ?",
    answer: "Oui. L'hypnose en visioconférence est aussi efficace qu'en cabinet pour la peur de parler en public. Vous êtes chez vous, à l'aise, et cela facilite parfois la profondeur de l'état hypnotique. Je reçois des patients de toute la France pour cet accompagnement entièrement en visio."
  }
];

const HypnosePeurParlerPublic = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose peur de parler en public Paris",
    "description": "Traitement de la peur de parler en public (glossophobie) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-peur-parler-public-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie glossophobie",
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
      { "@type": "ListItem", "position": 3, "name": "Peur de parler en public", "item": "https://novahypnose.fr/hypnose-peur-parler-public-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": peurParlerFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Trac paralysant", desc: "Dès que vous savez que vous allez devoir prendre la parole, l'anxiété s'installe des jours à l'avance" },
    { title: "Symptômes physiques intenses", desc: "Voix chevrotante, rougissement, transpiration, tremblements des mains, cœur qui s'emballe" },
    { title: "Trous de mémoire", desc: "Vous connaissez votre sujet, mais face au public, tout disparaît — blanc total" },
    { title: "Évitement des situations", desc: "Vous refusez des présentations, des postes, des promotions pour ne pas avoir à parler en public" },
    { title: "Impact sur votre carrière", desc: "Vous avez les compétences mais n'obtenez pas les résultats car votre peur de parler vous freine" },
    { title: "Mauvaise estime de soi post-prise de parole", desc: "Vous vous critiquez sévèrement après chaque prise de parole, même réussie" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose peur de parler en public Paris | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de la peur de parler en public par l'hypnose à Paris 4ème ou en visio. Présentations, pitchs, réunions, oraux — retrouvez votre aisance à l'oral. Résultats en 3 à 5 séances." />
        <meta name="keywords" content="hypnose peur parler public paris, glossophobie hypnose paris, trac prise de parole hypnose, traitement peur de parler, hypnothérapeute glossophobie paris, hypnose trac oral, peur parler public hypnose en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-peur-parler-public-paris" />
        <meta property="og:title" content="Hypnose peur de parler en public Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de la peur de parler en public par l'hypnose à Paris 4ème ou en visio. Présentations, pitchs, réunions, oraux — retrouvez votre aisance à l'oral. Résultats en 3 à 5 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-peur-parler-public-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose peur de parler en public" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose peur de parler en public Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de la peur de parler en public par l'hypnose à Paris 4ème ou en visio. Présentations, pitchs, réunions, oraux — retrouvez votre aisance à l'oral. Résultats en 3 à 5 séances." />
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
          <div className="tag">Peur de parler en public — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous de la peur de parler en public
          </h1>
          <p className="sp-hero__lead" dangerouslySetInnerHTML={{ __html: "Voix qui tremble, mains moites, trou de mémoire, envie de fuir… La peur de parler en public (glossophobie) touche près de <strong>trois personnes sur quatre</strong> à des degrés divers. L'hypnose ericksonienne agit à la racine de cette peur pour vous redonner votre aisance à l'oral. <strong>Résultats en 3 à 5 séances</strong>, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>." }} />
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
              <div className="section-tag">Glossophobie — comprendre</div>
              <h2 className="section-title">La peur de parler en public,<br/><em>une compétence à reconstruire ?</em></h2>
              <p>
                La peur de parler en public — aussi appelée glossophobie — est l'une des peurs les plus répandues dans le monde. Elle touche des personnes de tous milieux et de tous niveaux de compétence. Ce n'est pas un manque de préparation, d'intelligence ou de compétence : c'est un programme de survie que votre inconscient a codé autour du jugement des autres.
              </p>
              <p>
                Souvent, cette peur s'enracine dans une expérience humiliante (être moqué en classe, avoir le trac lors d'un exposé important, essuyer une critique sévère devant témoins). L'hypnose permet de reconfigurer ce programme en profondeur — et de remplacer la réaction de panique par un état de confiance et de présence que vous pouvez activer à volonté.
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

      {/* Manifestations / Vous reconnaissez-vous ? */}
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
                panique face au public. Vous restez conscient et en contrôle pendant toute la séance. Je vous
                guide dans un état de relaxation profonde pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier l'expérience fondatrice qui a installé la peur du jugement public",
                  "Dissocier la prise de parole de la menace perçue (humiliation, rejet, jugement)",
                  "Ancrer un état de confiance et de présence activable avant chaque intervention",
                  "Travailler sur l'estime de soi et la confiance en votre expertise",
                  "Vous transmettre des techniques de préparation mentale pour rester centré à l'oral"
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
              <div className="sp-case__title">Peur de parler en réunion</div>
              <p>
                Stéphanie*, 38 ans, cadre dans une grande entreprise, n'arrivait pas à prendre la parole en réunion. Elle avait des idées pertinentes mais le trac l'en empêchait. En 4 séances, nous avons travaillé sur l'origine de cette peur du jugement et ancré un état de confiance.
              </p>
              <p>
                Elle prend maintenant la parole naturellement devant 20 personnes.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Pitch investisseurs</div>
              <p>
                Thomas*, entrepreneur de 33 ans, perdait tous ses moyens devant des investisseurs. Voix tremblante, oublis — sa startup en pâtissait. En 5 séances d'hypnose, nous avons reconstruit sa confiance à l'oral et ancré un état de performance.
              </p>
              <p>
                Il a levé des fonds avec succès quatre mois plus tard.
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
              { value: '3-5', label: 'séances en moyenne pour retrouver l\'aisance à l\'oral' },
              { value: '3 sur 4', label: 'personnes redoutent de parler en public — une peur très traitable par hypnose' },
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
          <h2 className="sp-h2">Questions fréquentes sur la peur de parler en public</h2>
          <div>
            {peurParlerFaqItems.map((item, i) => (
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
          keywords={["trac", "parler en public", "glossophobie", "confiance", "prise de parole"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur la peur de parler en public"
          accentColor="text-purple-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-peur-parler-public-paris"
          pageTitle="Hypnose pour la peur de parler en public à Paris"
          pageDescription="Hypnose ericksonienne pour la peur de parler en public (glossophobie) au cabinet Paris 4ème ou en visio."
          topic="la peur de parler en public et la glossophobie"
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
          <h2 className="sp-h2">Libérez-vous de la peur de parler en public</h2>
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
            <Link to="/hypnose-claustrophobie-paris">Claustrophobie →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Hypnose et confiance en soi →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnosePeurParlerPublic;
