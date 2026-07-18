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

const traumatismesFaqItems = [
  {
    question: "L'hypnose peut-elle vraiment aider après un traumatisme ?",
    answer: "Oui. L'hypnose ericksonienne offre un cadre sécurisant pour accompagner les conséquences d'un choc psychologique — reviviscences, hypervigilance, évitement, troubles du sommeil. Elle travaille sur la manière dont le souvenir est stocké et vécu par l'inconscient, sans nécessiter de revivre l'événement dans les moindres détails."
  },
  {
    question: "Est-ce que je vais devoir revivre l'événement traumatique en séance ?",
    answer: "Non, ce n'est pas nécessaire. Contrairement à certaines idées reçues, l'hypnose ericksonienne ne vous oblige pas à replonger dans les détails du traumatisme. Nous travaillons de façon dissociée et sécurisée, en installant d'abord un espace de sécurité intérieure, puis en retraitant le souvenir en douceur, à distance émotionnelle suffisante."
  },
  {
    question: "Quelle est la différence entre l'hypnose et l'EMDR pour un traumatisme ?",
    answer: "Les deux approches visent à retraiter un souvenir traumatique bloqué, mais leurs outils diffèrent : l'EMDR s'appuie sur la stimulation bilatérale du regard, l'hypnose ericksonienne sur la relaxation profonde, les métaphores et le langage indirect. Elles sont complémentaires plutôt que concurrentes, et le choix dépend souvent de ce qui vous convient le mieux."
  },
  {
    question: "L'hypnose peut-elle aider en cas de stress post-traumatique (TSPT) ?",
    answer: "L'hypnose peut accompagner certains symptômes du stress post-traumatique (hypervigilance, troubles du sommeil, anxiété anticipatoire). Pour un TSPT caractérisé et sévère, elle s'inscrit idéalement en complément d'un suivi médical ou psychothérapeutique, jamais en remplacement d'un diagnostic ou d'un traitement en cours."
  },
  {
    question: "Combien de séances sont nécessaires pour un traumatisme ?",
    answer: "Cela dépend fortement de la nature du choc (accident, agression, deuil traumatique, traumatisme ancien) et de son ancienneté. Un événement récent et isolé peut s'apaiser en 4 à 6 séances. Un traumatisme ancien ou complexe demande souvent un accompagnement plus progressif, construit pas à pas avec vous."
  },
  {
    question: "Puis-je faire mes séances en visio pour un traumatisme ?",
    answer: "Oui, les séances en visioconférence sont possibles et efficaces, à condition d'être dans un lieu calme et sécurisant. Pour certains traumatismes récents ou intenses, un premier échange permet d'évaluer ensemble si le cabinet ou la visio est le cadre le plus adapté pour démarrer."
  }
];

const HypnoseTraumatismesParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose traumatismes psychologiques Paris",
    "description": "Accompagnement des traumatismes psychologiques par l'hypnose ericksonienne : chocs, accidents, agressions, stress post-traumatique. Cabinet Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-traumatismes-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie traumatismes psychologiques",
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
      { "@type": "ListItem", "position": 3, "name": "Traumatismes psychologiques", "item": "https://novahypnose.fr/hypnose-traumatismes-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": traumatismesFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Reviviscences et flashbacks", desc: "Des images, sensations ou émotions liées à l'événement reviennent brutalement, comme si vous le reviviez" },
    { title: "Hypervigilance", desc: "Vous êtes constamment sur le qui-vive, à l'affût du moindre danger, incapable de vous détendre" },
    { title: "Évitement", desc: "Vous fuyez les lieux, personnes ou situations qui rappellent, même de loin, l'événement traumatique" },
    { title: "Troubles du sommeil et cauchemars", desc: "Les nuits sont perturbées par des cauchemars récurrents ou une difficulté à trouver le sommeil" },
    { title: "Sursauts et anxiété diffuse", desc: "Un bruit, une image, une odeur suffisent à déclencher une réaction de sursaut ou une angoisse soudaine" },
    { title: "Sentiment de dissociation", desc: "Une impression d'être détaché(e) de vous-même ou de la réalité, comme observateur de votre propre vie" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose traumatismes psychologiques Paris | Alain Zenatti</title>
        <meta name="description" content="Apaisez un traumatisme psychologique avec l'hypnose à Paris 4ème ou en visio. Choc, accident, agression, stress post-traumatique — accompagnement en douceur, sans revivre le trauma." />
        <meta name="keywords" content="hypnose traumatisme paris, hypnose choc psychologique, hypnose stress post-traumatique, hypnothérapeute trauma paris, hypnose après agression, hypnose après accident, traumatisme hypnose en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-traumatismes-paris" />
        <meta property="og:title" content="Hypnose traumatismes psychologiques Paris | Alain Zenatti" />
        <meta property="og:description" content="Apaisez un traumatisme psychologique avec l'hypnose à Paris 4ème ou en visio. Choc, accident, agression, stress post-traumatique — accompagnement en douceur, sans revivre le trauma." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-traumatismes-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose traumatismes" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose traumatismes psychologiques Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Apaisez un traumatisme psychologique avec l'hypnose à Paris 4ème ou en visio. Choc, accident, agression, stress post-traumatique — accompagnement en douceur, sans revivre le trauma." />
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
              <path d="M 200 60 C 400 20, 700 60, 900 160 C 1040 230, 1150 240, 1280 180 C 1360 140, 1440 170, 1440 250 L 1440 0 L 0 0 L 0 200 C 60 130, 130 80, 200 60 Z" fill="#2B4BA0" opacity="0.9" />
            </g>
            <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
              <path d="M 0 720 C 200 660, 500 640, 800 680 C 1100 720, 1280 700, 1440 740 L 1440 900 L 0 900 Z" fill="#F2A12E" opacity="0.88" />
            </g>
            <rect width="1440" height="900" filter="url(#paperGrain)" opacity=".2" />
          </svg>
        </div>
        <div className="container sp-hero__inner reveal">
          <div className="tag">Traumatismes psychologiques — Paris</div>
          <h1 className="sp-hero__h1">
            Apaisez un traumatisme avec l'hypnose
          </h1>
          <p className="sp-hero__lead">
            Un accident, une agression, un choc soudain ou un événement bouleversant vous laisse encore des traces : reviviscences, hypervigilance, évitement, sommeil perturbé ? L'hypnose ericksonienne accompagne ces conséquences <strong>en douceur, sans vous obliger à revivre l'événement</strong>. Accompagnement personnalisé, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Traumatisme — comprendre</div>
              <h2 className="section-title">Quand le corps et l'esprit<br/><em>restent en état d'alerte.</em></h2>
              <p>
                Un traumatisme psychologique survient lorsqu'un événement dépasse notre capacité à l'intégrer sur le moment : accident, agression, deuil brutal, choc médical, événement violent vécu ou witnessé. L'esprit et le corps restent alors comme figés en état d'alerte, même longtemps après que le danger a disparu.
              </p>
              <p>
                Ce n'est pas une question de volonté ou de « force de caractère » : c'est un mécanisme de survie qui s'est mal refermé. Le souvenir reste stocké de façon brute, non digérée, et peut ressurgir à tout moment sous forme de flashback, de sursaut ou d'angoisse diffuse.
              </p>
              <p>
                L'hypnose ericksonienne offre un cadre sécurisant pour retraiter ce vécu en douceur — sans jamais forcer, sans nécessairement revenir sur les détails de l'événement.
              </p>
            </div>
            <div className="cabinet__visual" aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 100 80 C 240 20, 450 50, 490 200 C 520 320, 450 460, 310 500 C 175 538, 30 490, 10 360 C -8 238, 60 120, 100 80 Z" fill="#2B4BA0" opacity="0.92" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 200 150 C 310 110, 410 170, 400 270 C 390 365, 300 420, 210 400 C 125 380, 90 305, 120 220 C 143 155, 168 168, 200 150 Z" fill="#F2A12E" opacity="0.9" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 240 220 C 295 200, 345 235, 338 290 C 331 340, 285 368, 240 355 C 198 342, 180 305, 198 263 C 210 238, 225 228, 240 220 Z" fill="#2B4BA0" opacity="0.7" />
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
                  <path d="M 260 60 C 320 60, 480 140, 490 260 C 498 360, 430 460, 320 490 C 220 518, 100 485, 50 395 C 5 313, 30 195, 100 135 C 158 87, 210 60, 260 60 Z" fill="#F2A12E" opacity="0.88" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 260 30 L 350 140 L 490 130 L 410 240 L 460 380 L 320 310 L 200 420 L 190 270 L 50 210 L 185 185 Z" fill="#2B4BA0" opacity="0.75" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
            </div>
            <div className="cabinet__copy">
              <div className="section-tag">Mécanisme — accompagnement du traumatisme</div>
              <h2 className="section-title">L'hypnose retraite<br/><em>le souvenir en sécurité.</em></h2>
              <p>
                L'hypnose ericksonienne ne cherche jamais à vous faire revivre brutalement l'événement. Elle installe d'abord un espace de sécurité intérieure, puis permet à l'inconscient de retraiter le souvenir à distance, comme depuis un lieu protégé. En pratique, nous pouvons :
              </p>
              <div className="sp-checklist">
                {[
                  "Installer un ancrage de sécurité mobilisable à tout moment",
                  "Réduire l'intensité émotionnelle du souvenir sans en effacer la mémoire",
                  "Apaiser l'hypervigilance et restaurer un sentiment de contrôle",
                  "Désamorcer les déclencheurs (lieux, sons, sensations) associés au choc",
                  "Retrouver progressivement un sommeil et un quotidien apaisés"
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
              <div className="sp-case__title">Hypervigilance après un accident de la route</div>
              <p>
                Camille*, 34 ans, ne supportait plus de conduire depuis un accident survenu six mois plus tôt. Mains moites, sursauts au moindre freinage brusque, évitement des grands axes. En 5 séances, nous avons travaillé sur l'ancrage de sécurité et le retraitement du souvenir. Camille a pu reprendre le volant progressivement, sans la charge d'angoisse initiale.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Reviviscences après une agression</div>
              <p>
                Karim*, 41 ans, revivait par flashs une agression survenue deux ans auparavant, avec des réveils nocturnes fréquents. Le travail hypnotique s'est fait par étapes, toujours depuis un espace de sécurité, sans jamais forcer le rythme. Après 7 séances, les flashbacks avaient nettement diminué et le sommeil s'était stabilisé.
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
              { value: '4-8', label: 'séances selon la nature et l\'ancienneté du traumatisme' },
              { value: 'Sécurité', label: 'un cadre protégé, sans obligation de revivre l\'événement' },
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
          <h2 className="sp-h2">Questions fréquentes sur les traumatismes et l'hypnose</h2>
          <div>
            {traumatismesFaqItems.map((item, i) => (
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
          keywords={["traumatisme", "choc", "stress post-traumatique", "agression", "accident"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur les traumatismes et le stress post-traumatique"
          accentColor="text-indigo-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-traumatismes-paris"
          pageTitle="Hypnose pour les traumatismes psychologiques à Paris"
          pageDescription="Hypnose ericksonienne pour accompagner les traumatismes psychologiques et leurs conséquences. Cabinet Paris 4ème ou en visio."
          topic="l'accompagnement des traumatismes psychologiques"
          dateModified="2026-07-18"
          references={[
            {
              authors: "Inserm",
              title: "Évaluation de l'efficacité de la pratique de l'hypnose",
              source: "Rapport d'expertise collective",
              year: 2015,
              url: "https://www.inserm.fr/expertise-collective/evaluation-efficacite-pratique-hypnose/",
            },
            {
              authors: "Bryant RA, Moulds ML, Guthrie RM, Nixon RDV",
              title: "The additive benefit of hypnosis and cognitive-behavioral therapy in treating acute stress disorder",
              source: "Journal of Consulting and Clinical Psychology",
              year: 2005,
              url: "https://pubmed.ncbi.nlm.nih.gov/15982146/",
            },
            {
              authors: "Hammond DC",
              title: "Hypnosis in the treatment of anxiety- and stress-related disorders",
              source: "Expert Review of Neurotherapeutics",
              year: 2010,
              url: "https://pubmed.ncbi.nlm.nih.gov/20128679/",
            },
          ]}
        />
      </div>

      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Retrouvez un sentiment de sécurité intérieure</h2>
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
            <Link to="/hypnose-deuil-paris">Deuil et séparation →</Link>
            <Link to="/hypnose-gestion-emotions-paris">Toutes les émotions →</Link>
            <Link to="/hypnose-charge-emotionnelle-paris">Charge émotionnelle →</Link>
            <Link to="/hypnose-anxiete-emotionnelle-paris">Anxiété émotionnelle →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseTraumatismesParis;
