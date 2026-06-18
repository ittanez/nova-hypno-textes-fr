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

const aquaphobieFaqItems = [
  {
    question: "L'hypnose peut-elle m'aider à mettre la tête sous l'eau ?",
    answer: "Oui. La peur de mettre la tête sous l'eau est l'une des manifestations les plus fréquentes de l'aquaphobie. L'hypnose désensibilise cette réaction au niveau inconscient et installe un état de calme associé à l'immersion. La plupart des personnes accompagnées parviennent à immerger leur visage sereinement en 2 à 3 séances."
  },
  {
    question: "Combien de séances pour vaincre la peur de l'eau ?",
    answer: "En moyenne, 2 à 4 séances suffisent pour obtenir des résultats significatifs. La progression dépend de l'objectif : retrouver de la sérénité à la piscine, apprendre à nager, ou se baigner en mer profonde. Un programme personnalisé est défini lors de la première séance."
  },
  {
    question: "Faut-il savoir nager pour commencer l'hypnose ?",
    answer: "Non. Beaucoup de personnes que j'accompagne ne savent pas nager ou n'ont jamais osé apprendre à cause de cette peur. L'hypnose vous prépare à reprendre confiance dans l'eau — l'apprentissage de la natation peut ensuite se faire avec un maître-nageur, dans des conditions psychologiques transformées."
  },
  {
    question: "Mon aquaphobie vient d'une noyade évitée dans l'enfance. L'hypnose peut-elle aider ?",
    answer: "Oui, et c'est même un cas où elle fonctionne particulièrement bien. L'hypnose ericksonienne permet de neutraliser le souvenir traumatique sans avoir à le revivre consciemment. Votre inconscient peut intégrer que cet événement est terminé et que vous êtes en sécurité aujourd'hui."
  },
  {
    question: "Je dois transmettre la natation à mes enfants malgré ma peur. L'hypnose peut-elle aider ?",
    answer: "Oui, c'est une motivation très fréquente. De nombreux parents viennent en consultation pour ne pas transmettre leur peur à leurs enfants. L'hypnose permet à la fois de vous libérer de votre propre aquaphobie et de pouvoir accompagner vos enfants dans l'eau sereinement, sans transmettre vos tensions corporelles."
  },
  {
    question: "Les résultats sont-ils durables ?",
    answer: "Oui. L'hypnose reprogramme en profondeur vos associations inconscientes liées à l'eau. Une fois que votre cerveau a intégré que l'eau peut être un environnement sûr et agréable, ce changement devient permanent. La grande majorité des personnes accompagnées maintiennent leur sérénité face à l'eau dans la durée."
  }
];

const HypnoseAquaphobie = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose peur de l'eau à Paris",
    "description": "Traitement de la peur de l'eau (aquaphobie) par l'hypnose ericksonienne. Cabinet Paris 4ème Marais-Bastille ou en visio. Résultats en 2 à 4 séances.",
    "url": "https://novahypnose.fr/hypnose-aquaphobie-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie aquaphobie",
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
      { "@type": "ListItem", "position": 3, "name": "Peur de l'eau", "item": "https://novahypnose.fr/hypnose-aquaphobie-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": aquaphobieFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Tête sous l'eau impossible", desc: "Impossible de plonger le visage, même dans la baignoire ou la douche" },
    { title: "Panique en eau profonde", desc: "Dès que vous n'avez plus pied, le corps se fige et la respiration s'emballe" },
    { title: "Évitement des plages et piscines", desc: "Vacances orientées hors-mer, refus des sorties piscine, isolement social" },
    { title: "Apprentissage de la natation bloqué", desc: "Plusieurs tentatives échouées, blocage adulte malgré la motivation" },
    { title: "Peur de transmettre à ses enfants", desc: "Tensions visibles dès que les enfants approchent de l'eau" },
    { title: "Cauchemars d'immersion", desc: "Rêves récurrents de noyade ou de submersion, fatigue accumulée" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose peur de l'eau (aquaphobie) Paris | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de la peur de l'eau par l'hypnose à Paris 4ème ou en visio. Aquaphobie, piscine, mer, immersion, natation. Résultats durables en 2 à 4 séances." />
        <meta name="keywords" content="hypnose peur eau paris, aquaphobie hypnose paris, peur de l'eau hypnose, vaincre peur natation, hypnothérapeute aquaphobie paris, peur piscine hypnose, peur eau hypnose en ligne, séance hypnose aquaphobie visio france" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-aquaphobie-paris" />
        <meta property="og:title" content="Hypnose peur de l'eau (aquaphobie) Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de la peur de l'eau par l'hypnose à Paris 4ème ou en visio. Aquaphobie, piscine, mer, immersion, natation. Résultats durables en 2 à 4 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-aquaphobie-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose peur de l'eau" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose peur de l'eau (aquaphobie) Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de la peur de l'eau par l'hypnose à Paris 4ème ou en visio. Aquaphobie, piscine, mer, immersion, natation. Résultats durables en 2 à 4 séances." />
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
          <div className="tag">Peur de l'eau — Paris</div>
          <h1 className="sp-hero__h1">
            Renouez sereinement<br/><em>avec l'eau</em>
          </h1>
          <p className="sp-hero__lead">
            Tête sous l'eau impossible, panique dès que vous n'avez plus pied, refus de la mer et
            des piscines… La peur de l'eau (aquaphobie) touche près de <strong>15% des
            adultes</strong>. L'hypnose ericksonienne agit à la racine de cette peur pour vous
            permettre de retrouver le plaisir de l'eau. <strong>Résultats en 2 à 4 séances</strong>,
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
              <div className="section-tag">Aquaphobie — comprendre</div>
              <h2 className="section-title">La peur de l'eau<br/><em>limite votre vie ?</em></h2>
              <p>
                Vous refusez les vacances en bord de mer, vous évitez les sorties piscine avec amis
                ou enfants, vous ne savez toujours pas nager malgré plusieurs tentatives. Même une
                baignoire vous met mal à l'aise dès qu'il faut immerger le visage.
              </p>
              <p>
                L'aquaphobie est un mécanisme de protection installé par votre inconscient, souvent
                à partir d'une immersion forcée dans l'enfance, d'une noyade évitée, ou parfois
                sans cause consciente identifiable. La bonne nouvelle : <strong>ce qui a été
                appris peut être désappris</strong>.
              </p>
              <p>
                L'hypnose permet de reprogrammer cette réaction automatique rapidement, sans
                exposition forcée à l'eau, et sans avoir à revivre consciemment l'événement
                déclencheur.
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
                L'hypnose ericksonienne agit sur le programme inconscient qui déclenche la panique
                face à l'eau. Vous restez conscient et en contrôle pendant toute la séance. Je vous
                guide dans un état de relaxation profonde pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier l'origine de l'aquaphobie (immersion, noyade évitée, transmission, sans cause apparente)",
                  "Désensibiliser la réaction phobique aux différents contextes aquatiques",
                  "Dissocier l'eau du sentiment de danger et de perte de contrôle",
                  "Ancrer un état de calme et de confiance activable avant et pendant le contact avec l'eau",
                  "Vous enseigner des techniques de respiration et d'auto-hypnose adaptées"
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
              <div className="sp-case__title">Apprendre à nager à 40 ans</div>
              <p>
                Marie*, 41 ans, n'avait jamais appris à nager malgré trois tentatives infructueuses
                au fil des années. Sa peur de mettre la tête sous l'eau remontait à un cours de
                natation forcé à l'école primaire. Ses enfants commençaient à demander pourquoi
                elle ne les rejoignait jamais dans la piscine.
              </p>
              <p>
                En 3 séances d'hypnose, nous avons neutralisé le souvenir traumatique scolaire
                et installé un état de confiance associé à l'immersion. Marie a pris des cours
                de natation adulte le mois suivant et a appris à nager en quelques semaines.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Noyade évitée — peur de la mer 20 ans après</div>
              <p>
                Olivier*, 35 ans, avait failli se noyer à l'adolescence en mer. Depuis, il refusait
                toute baignade en eau profonde. Sa compagne et lui rêvaient de plonger en couple
                lors d'un voyage, mais cette peur ancienne bloquait totalement le projet.
              </p>
              <p>
                En 4 séances d'hypnose ericksonienne, nous avons traité le souvenir traumatique
                sans avoir à le revivre consciemment, et ancré un nouveau rapport à l'eau profonde.
                Olivier a passé son baptême de plongée six mois plus tard, sereinement.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Maman aquaphobe — ne pas transmettre</div>
              <p>
                Sophie*, 33 ans, terrorisée par l'eau depuis l'enfance, refusait d'emmener sa fille
                de 4 ans à la piscine. Elle craignait surtout de transmettre sa peur par ses propres
                tensions corporelles et son anxiété visible.
              </p>
              <p>
                En 2 séances, nous avons travaillé sur sa peur personnelle et installé un état
                de calme transmissible. Sophie accompagne désormais sa fille à la piscine
                régulièrement et envisage des cours d'aquagym pour elle-même.
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
              { value: '2-4', label: 'séances suffisent en moyenne pour vaincre la peur de l\'eau' },
              { value: '15%', label: 'des adultes souffrent d\'aquaphobie en France' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la peur de l'eau</h2>
          <div>
            {aquaphobieFaqItems.map((item, i) => (
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
          keywords={["eau", "aquaphobie", "phobie", "peur", "natation"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur la peur de l'eau et les phobies"
          accentColor="text-purple-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-aquaphobie-paris"
          pageTitle="Hypnose pour la peur de l'eau à Paris"
          pageDescription="Hypnose ericksonienne pour traiter la peur de l'eau (aquaphobie) au cabinet Paris 4ème ou en visio."
          topic="la peur de l'eau et l'aquaphobie"
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
          <h2 className="sp-h2">Libérez-vous de la peur de l'eau</h2>
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
            <Link to="/hypnose-phobies-paris">Hypnose et phobies →</Link>
            <Link to="/peurdelavion">Peur de l'avion →</Link>
            <Link to="/hypnose-claustrophobie-paris">Claustrophobie →</Link>
            <Link to="/hypnose-acrophobie-paris">Peur du vide →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseAquaphobie;
