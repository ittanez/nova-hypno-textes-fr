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

const peurAvionFaqItems = [
  {
    question: "L'hypnose peut-elle remplacer les médicaments contre la peur de l'avion ?",
    answer: "Oui, l'hypnose agit à la source émotionnelle de votre peur, là où les anxiolytiques n'offrent qu'un soulagement temporaire. L'hypnothérapie ericksonienne reprogramme votre inconscient pour désactiver la réaction de panique durablement, sans béquilles chimiques avant chaque vol."
  },
  {
    question: "Combien de séances faut-il pour ne plus avoir peur de l'avion ?",
    answer: "En moyenne, 3 à 4 séances suffisent pour obtenir des résultats significatifs. Certaines personnes ressentent un changement dès la première séance. L'accompagnement est progressif : identification de l'origine, désensibilisation, ancrage de ressources et consolidation avant le vol."
  },
  {
    question: "Faut-il avoir un vol prévu pour commencer l'hypnose ?",
    answer: "Non, il vaut même mieux ne pas attendre. Vous pouvez commencer l'accompagnement à n'importe quel moment, même sans vol programmé. Cela laisse le temps à votre inconscient d'intégrer les changements en profondeur, sans pression. Si un vol approche dans moins d'un mois, un programme intensif avec séances rapprochées est possible."
  },
  {
    question: "Quelle est la différence entre l'hypnose et un stage anti-peur de l'avion ?",
    answer: "Les stages collectifs (Air France, AviaSim) travaillent sur la compréhension rationnelle de l'avion : ils expliquent la mécanique, les turbulences, la sécurité. L'hypnose, elle, agit directement sur votre inconscient émotionnel — là où la peur réside réellement. C'est pourquoi elle est plus efficace et durable. De plus, l'accompagnement est individuel, adapté à votre histoire et à vos déclencheurs spécifiques."
  },
  {
    question: "Les résultats sont-ils durables dans le temps ?",
    answer: "Oui. L'hypnose reprogramme en profondeur vos associations inconscientes liées à l'avion. Une fois que votre cerveau a intégré que voler n'est pas un danger, ce changement devient permanent. La grande majorité des personnes accompagnées volent sereinement des années après l'accompagnement."
  },
  {
    question: "L'hypnose fonctionne-t-elle même sur une peur de l'avion ancienne ou très intense ?",
    answer: "Oui. Que votre peur soit installée depuis 5 ou 30 ans, qu'elle se manifeste par une simple appréhension ou par des crises de panique paralysantes, le mécanisme reste le même : un programme inconscient qui peut être désactivé. Votre inconscient n'a pas de notion du temps, et l'intensité de la peur ne change pas fondamentalement le traitement."
  }
];

const PeurDelAvion = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour la peur de l'avion à Paris",
    "description": "Traitement de la peur de l'avion (aérophobie) par l'hypnose ericksonienne. Cabinet Paris 4ème Marais-Bastille ou en visio. Résultats en 3 à 4 séances.",
    "url": "https://novahypnose.fr/peurdelavion",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie aérophobie",
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
      { "@type": "ListItem", "position": 2, "name": "Peur de l'avion", "item": "https://novahypnose.fr/peurdelavion" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": peurAvionFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Anxiété paralysante", desc: "Rien qu'à l'idée de prendre l'avion, votre cœur s'emballe et vos mains tremblent" },
    { title: "Évitement des voyages", desc: "Vous refusez des opportunités professionnelles ou personnelles par peur de voler" },
    { title: "Dépendance aux médicaments", desc: "Vous ne pouvez pas imaginer voler sans anxiolytiques ou alcool" },
    { title: "Nuits blanches", desc: "Vous perdez le sommeil des semaines avant un vol programmé" },
    { title: "Crises de panique", desc: "Turbulences, décollage, atterrissage… votre corps réagit comme face à un danger réel" },
    { title: "Claustrophobie en cabine", desc: "L'espace confiné de l'avion déclenche une sensation d'étouffement insoutenable" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose peur de l'avion à Paris et en ligne | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de la peur de l'avion par l'hypnose à Paris 4ème ou en visio partout en France. Aérophobie, crises de panique, claustrophobie en cabine. Résultats durables en 3 à 4 séances." />
        <meta name="keywords" content="hypnose peur avion paris, aérophobie hypnose paris, traitement peur avion, vaincre peur avion hypnose, hypnothérapeute peur de l'avion paris, hypnose aviophobie, peur avion hypnose en ligne, séance hypnose peur avion visio France, téléconsultation aérophobie" />
        <link rel="canonical" href="https://novahypnose.fr/peurdelavion" />
        <meta property="og:title" content="Hypnose peur de l'avion à Paris et en ligne | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de la peur de l'avion par l'hypnose à Paris 4ème ou en visio partout en France. Aérophobie, crises de panique, claustrophobie en cabine. Résultats durables en 3 à 4 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/peurdelavion" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose peur de l'avion" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose peur de l'avion à Paris et en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de la peur de l'avion par l'hypnose à Paris 4ème ou en visio partout en France. Aérophobie, crises de panique, claustrophobie en cabine. Résultats durables en 3 à 4 séances." />
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
          <div className="tag">Peur de l'avion — Paris</div>
          <h1 className="sp-hero__h1">
            Reprenez l'avion<br/><em>sereinement</em>
          </h1>
          <p className="sp-hero__lead">
            Boule au ventre à l'idée de monter à bord, nuits blanches avant un vol, crises de panique
            au décollage… La peur de l'avion (aérophobie) touche près d'<strong>une personne sur cinq</strong>.
            L'hypnose ericksonienne agit à la racine de cette peur pour vous redonner la liberté de
            voyager. <strong>Résultats en 3 à 4 séances</strong>, au cabinet à Paris 4ème ou en
            <strong> visio partout en France</strong>.
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
              <div className="section-tag">Aérophobie — comprendre</div>
              <h2 className="section-title">La peur de l'avion<br/><em>gâche vos voyages ?</em></h2>
              <p>
                Vous annulez des vacances, vous refusez des missions à l'étranger, vous vous arrangez pour
                éviter toute occasion de prendre l'avion. Quand vous ne pouvez vraiment pas faire autrement,
                la simple idée du vol vous obsède pendant des semaines. À bord, votre corps réagit comme
                face à un danger imminent — alors même que vous savez, rationnellement, que l'avion est
                le moyen de transport le plus sûr au monde.
              </p>
              <p>
                L'aérophobie est un mécanisme de protection installé par votre inconscient, souvent
                déclenché par un vol turbulent, un reportage marquant, ou parfois sans raison apparente.
                La bonne nouvelle : <strong>ce qui a été appris peut être désappris</strong>.
              </p>
              <p>
                L'hypnose permet de reprogrammer cette réaction automatique, sans avoir à revivre
                l'événement déclencheur, et sans exposition forcée à l'avion.
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
                panique à bord. Vous restez conscient et en contrôle pendant toute la séance. Je vous
                guide dans un état de relaxation profonde pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier l'origine de la peur (vol turbulent, reportage, transmission familiale…)",
                  "Dissocier l'émotion de panique du contexte du vol (cabine, décollage, turbulences)",
                  "Créer de nouvelles associations positives liées à l'avion et au voyage",
                  "Ancrer un état de calme que vous pouvez activer à volonté avant et pendant le vol",
                  "Vous transmettre des techniques d'auto-hypnose pour rester serein en cabine"
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
              <div className="sp-case__title">Aérophobie installée depuis 10 ans</div>
              <p>
                Thomas*, consultant international, refusait systématiquement les missions nécessitant
                un vol. Sa peur de l'avion, déclenchée par un vol très turbulent dix ans plus tôt,
                menaçait désormais sa carrière. Chaque déplacement était reporté ou refusé.
              </p>
              <p>
                En 3 séances d'hypnose dans mon cabinet du Marais, nous avons neutralisé le souvenir
                traumatique initial et installé un état de calme associé au vol. Thomas a repris
                l'avion le mois suivant pour un déplacement à Londres — sereinement.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Crises de panique au décollage</div>
              <p>
                Sophie*, 35 ans, avait toujours pris l'avion sans difficulté jusqu'au jour où, sans
                raison apparente, elle a fait une crise de panique au décollage. Depuis, chaque vol
                était devenu une épreuve : palpitations, sensation d'étouffer, peur de mourir.
              </p>
              <p>
                En 4 séances d'hypnose ericksonienne, nous avons travaillé sur le déclencheur
                inconscient de cette crise initiale et reconstruit une association de sécurité
                avec le vol. Sophie a pu repartir en vacances aux Antilles, détendue.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Peur transmise depuis l'enfance</div>
              <p>
                Julien*, 42 ans, n'avait jamais pris l'avion. Sa mère, terrorisée à l'idée de voler,
                lui avait transmis cette peur depuis l'enfance — au point que toute la famille
                voyageait exclusivement en voiture ou en train.
              </p>
              <p>
                En 3 séances, nous avons identifié les croyances inconscientes héritées et
                installé un nouveau rapport à l'avion. Julien a effectué son premier vol vers Rome
                deux mois plus tard, sans anxiolytique.
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
              { value: '3-4', label: 'séances suffisent en moyenne pour vaincre la peur de l\'avion' },
              { value: '85%', label: 'des personnes accompagnées retrouvent la sérénité en vol' },
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
          <h2 className="sp-h2">Questions fréquentes sur la peur de l'avion</h2>
          <div>
            {peurAvionFaqItems.map((item, i) => (
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
          keywords={["avion", "phobie", "peur", "phobique", "aérophobie"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur la peur de l'avion et les phobies"
          accentColor="text-purple-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/peurdelavion"
          pageTitle="Hypnose pour la peur de l'avion à Paris"
          pageDescription="Hypnose ericksonienne pour vaincre la peur de l'avion (aérophobie) au cabinet Paris 4ème ou en visio."
          topic="la peur de l'avion et l'aérophobie"
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
          <h2 className="sp-h2">Libérez-vous de la peur de l'avion</h2>
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
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/hypnose-sommeil-paris">Hypnose et sommeil →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/hypnose-gestion-emotions-paris">Gestion des émotions →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default PeurDelAvion;
