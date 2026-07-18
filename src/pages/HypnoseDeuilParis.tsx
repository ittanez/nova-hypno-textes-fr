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

const deuilFaqItems = [
  {
    question: "L'hypnose peut-elle vraiment aider à traverser un deuil ?",
    answer: "Oui. L'hypnose ericksonienne ne prétend pas effacer le deuil — le deuil est une réponse normale et nécessaire à une perte. Elle accompagne le processus en aidant votre inconscient à transformer la douleur brute en souvenirs apaisés, à avancer sans avoir l'impression de trahir la personne perdue, et à retrouver un sens à votre vie."
  },
  {
    question: "Est-ce trop tôt ou trop tard pour commencer une hypnose après un deuil ?",
    answer: "Il n'y a pas de moment idéal universel. Certaines personnes viennent quelques semaines après la perte, d'autres plusieurs années après. L'hypnose peut aider à chaque stade du deuil, qu'il soit récent ou que vous soyez bloqué(e) depuis longtemps. Ce qui compte, c'est votre intention de traverser ce processus."
  },
  {
    question: "L'hypnose peut-elle aider pour une rupture sentimentale ou un deuil non-mortel ?",
    answer: "Absolument. Le deuil s'applique à toutes les pertes significatives : un proche décédé, une rupture sentimentale, une amitié perdue, un divorce, la perte d'un emploi, un changement de vie majeur. Les mécanismes psychologiques sont similaires, et l'hypnose accompagne tous ces processus."
  },
  {
    question: "Combien de séances sont nécessaires pour un deuil ?",
    answer: "En général, 4 à 6 séances permettent d'accompagner significativement le processus de deuil. Le nombre exact dépend de l'intensité du deuil, de sa durée et des blocages spécifiques. Certaines personnes avancent plus vite, d'autres ont besoin d'un accompagnement plus long."
  },
  {
    question: "Avancer dans mon deuil, n'est-ce pas trahir la personne que j'ai perdue ?",
    answer: "Cette peur est très fréquente et tout à fait compréhensible. L'hypnose travaille précisément sur ce type de croyance limitante. Avancer ne signifie pas oublier ni trahir — cela signifie trouver une façon de continuer à vivre en portant la mémoire de la personne perdue de manière différente, plus apaisée."
  },
  {
    question: "Puis-je faire mes séances en visio ?",
    answer: "Oui. Les séances en visioconférence sont aussi efficaces qu'en cabinet pour accompagner le processus de deuil. Beaucoup de mes clients en deuil apprécient la visio car elle leur permet d'être dans un environnement familier et sécurisant, sans avoir à se déplacer dans un état émotionnel parfois fragile."
  }
];

const HypnoseDeuilParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose deuil et séparation Paris",
    "description": "Accompagnement du processus de deuil et des séparations par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-deuil-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie deuil et séparation",
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
      { "@type": "ListItem", "position": 3, "name": "Deuil et séparation", "item": "https://novahypnose.fr/hypnose-deuil-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": deuilFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Douleur persistante", desc: "La douleur de la perte ne diminue pas avec le temps — elle reste aussi vive qu'au premier jour" },
    { title: "Incapacité à avancer", desc: "Vous avez l'impression d'être figé(e), comme si la vie s'était arrêtée à ce moment de perte" },
    { title: "Culpabilité ou regrets", desc: "Des pensées de 'si seulement', de ce qui aurait pu être fait différemment, reviennent sans cesse" },
    { title: "Isolement progressif", desc: "Vous vous êtes retiré(e) des relations sociales, vous n'avez plus goût aux activités que vous aimiez" },
    { title: "Perte de sens ou de goût à la vie", desc: "Depuis la perte, rien ne semble plus avoir le même sens, vous vous sentez vide ou déconnecté(e)" },
    { title: "Blocage émotionnel", desc: "Vous n'arrivez pas à pleurer, ou à l'inverse, les larmes ne s'arrêtent pas — vous êtes bloqué(e) dans une phase" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose deuil et séparation Paris | Alain Zenatti</title>
        <meta name="description" content="Traversez votre deuil avec l'hypnose à Paris 4ème ou en visio. Perte d'un proche, rupture, séparation — accompagnement doux en 4 à 6 séances." />
        <meta name="keywords" content="hypnose deuil paris, traverser deuil hypnose, accompagnement deuil hypnose paris, hypnothérapeute deuil paris, hypnose séparation rupture, blocage deuil hypnose, deuil hypnose en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-deuil-paris" />
        <meta property="og:title" content="Hypnose deuil et séparation Paris | Alain Zenatti" />
        <meta property="og:description" content="Traversez votre deuil avec l'hypnose à Paris 4ème ou en visio. Perte d'un proche, rupture, séparation — accompagnement doux en 4 à 6 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-deuil-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose deuil" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose deuil et séparation Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Traversez votre deuil avec l'hypnose à Paris 4ème ou en visio. Perte d'un proche, rupture, séparation — accompagnement doux en 4 à 6 séances." />
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
          <div className="tag">Deuil &amp; séparation — Paris</div>
          <h1 className="sp-hero__h1">
            Traversez votre deuil avec l'hypnose
          </h1>
          <p className="sp-hero__lead">
            Vous avez perdu un proche, vécu une rupture douloureuse, ou traversé un changement de vie difficile ? Le deuil peut vous bloquer des mois, voire des années. L'hypnose ericksonienne accompagne ce processus en douceur, vous aidant à <strong>transformer la douleur en souvenirs apaisés</strong>. <strong>Résultats en 4 à 6 séances</strong>, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Deuil — comprendre</div>
              <h2 className="section-title">Le deuil bloqué,<br/><em>quand la douleur ne passe pas.</em></h2>
              <p>
                Le deuil est un processus naturel et nécessaire face à toute perte significative. Mais parfois, ce processus se bloque. La douleur reste vive des mois après la perte, le sentiment d'être figé dans le temps s'installe, la vie semble avoir perdu son sens.
              </p>
              <p>
                Ce blocage peut avoir de multiples causes : une mort brutale sans au revoir, une relation ambivalente avec la personne perdue, une culpabilité non résolue, ou simplement un inconscient qui ne sait pas comment avancer sans trahir la mémoire du disparu.
              </p>
              <p>
                L'hypnose ericksonienne accompagne ce processus en douceur, sans forcer, sans effacer les souvenirs — en aidant votre inconscient à trouver un chemin vers la paix intérieure.
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
              <div className="section-tag">Mécanisme — accompagnement du deuil</div>
              <h2 className="section-title">L'hypnose accompagne<br/><em>votre chemin intérieur.</em></h2>
              <p>
                L'hypnose ericksonienne ne force pas le deuil — elle crée les conditions intérieures pour qu'il puisse se compléter naturellement. En état de relaxation profonde, nous pouvons :
              </p>
              <div className="sp-checklist">
                {[
                  "Honorer la perte et lui donner une place intérieure digne",
                  "Transformer la douleur brute en souvenirs précieux et apaisés",
                  "Libérer la culpabilité et les regrets qui bloquent le processus",
                  "Trouver un sens à continuer à vivre sans trahir la mémoire",
                  "Réinstaller progressivement la connexion à la joie et au désir de vivre"
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
              <div className="sp-case__title">Deuil maternel bloqué depuis un an</div>
              <p>
                Anne*, 51 ans, était figée dans son deuil depuis la perte de sa mère un an plus tôt. Elle n'arrivait pas à pleurer, comme anesthésiée, et s'était progressivement isolée. Les activités qu'elle aimait n'avaient plus de sens. En 5 séances d'hypnose, nous avons accompagné le processus bloqué. Anne a progressivement retrouvé goût à la vie, sans oublier sa mère — en la portant autrement.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Divorce après 20 ans de vie commune</div>
              <p>
                Philippe*, 48 ans, traversait un divorce après vingt ans de mariage. La séparation avait été décidée par sa femme. La douleur, la colère et la culpabilité mêlées le paralysaient. En 4 séances, nous avons travaillé sur ces strates émotionnelles complexes. Philippe a retrouvé la capacité d'envisager l'avenir et de reconstruire sa vie.
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
              { value: '4-6', label: 'séances pour accompagner le processus de deuil durablement' },
              { value: 'Processus', label: 'accompagné en douceur — sans forcer, sans effacer' },
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
          <h2 className="sp-h2">Questions fréquentes sur le deuil et l'hypnose</h2>
          <div>
            {deuilFaqItems.map((item, i) => (
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
          keywords={["deuil", "séparation", "rupture", "perte", "émotions"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur le deuil et les séparations"
          accentColor="text-rose-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-deuil-paris"
          pageTitle="Hypnose pour le deuil et les séparations à Paris"
          pageDescription="Hypnose ericksonienne pour traverser le deuil et les séparations douloureuses. Cabinet Paris 4ème ou en visio."
          topic="le deuil et les processus de séparation"
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
          <h2 className="sp-h2">Avancez dans votre deuil, pas à pas</h2>
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
            <Link to="/hypnose-traumatismes-paris">Traumatismes psychologiques →</Link>
            <Link to="/hypnose-gestion-emotions-paris">Toutes les émotions →</Link>
            <Link to="/hypnose-charge-emotionnelle-paris">Charge émotionnelle →</Link>
            <Link to="/hypnose-anxiete-emotionnelle-paris">Anxiété émotionnelle →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseDeuilParis;
