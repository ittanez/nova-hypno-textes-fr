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

const amaxophobieFaqItems = [
  {
    question: "L'hypnose peut-elle aider après un accident de voiture ?",
    answer: "Oui, c'est même l'un des cas où elle est particulièrement efficace. Un accident laisse une empreinte traumatique dans votre inconscient qui déclenche automatiquement la peur au volant. L'hypnose ericksonienne neutralise cette empreinte sans que vous ayez à revivre consciemment l'accident. La plupart des personnes retrouvent de la sérénité au volant en 3 à 4 séances."
  },
  {
    question: "Je n'ai pas conduit depuis plusieurs années. Est-il trop tard pour reprendre ?",
    answer: "Non. L'hypnose traite efficacement l'amaxophobie quelle que soit la durée de l'évitement. Que vous n'ayez pas conduit depuis 2 ans ou 15 ans, le mécanisme inconscient est le même. L'hypnose permet d'abord de désactiver la peur, puis de reconstruire progressivement une image positive de vous au volant."
  },
  {
    question: "J'ai peur uniquement sur autoroute (ou en ville). L'hypnose peut-elle cibler cette peur précise ?",
    answer: "Absolument. L'amaxophobie se manifeste souvent dans des contextes spécifiques : autoroute, tunnel, rond-point, conduite de nuit, passagers à bord. L'hypnose travaille précisément sur les situations qui déclenchent votre peur et installe un état de calme spécifique à chaque contexte. Le travail est entièrement personnalisé selon votre profil."
  },
  {
    question: "Combien de séances pour retrouver confiance au volant ?",
    answer: "En moyenne, 2 à 4 séances suffisent pour obtenir des résultats significatifs. La première séance identifie l'origine de l'amaxophobie et initie le travail de désensibilisation. Les séances suivantes consolident le nouvel état de confiance et l'ancrent durablement. Un programme personnalisé est défini lors de la première rencontre."
  },
  {
    question: "L'hypnose peut-elle aider si ma peur vient du regard des passagers ?",
    answer: "Oui. Cette forme d'amaxophobie — la peur de conduire avec des passagers à bord — est liée à la peur du jugement et à la pression de responsabilité. L'hypnose traite à la fois la réaction phobique au volant et l'anxiété liée au regard des autres. Les résultats sont souvent rapides car ces deux dimensions sont interconnectées."
  },
  {
    question: "Les résultats sont-ils durables après l'hypnose ?",
    answer: "Oui. L'hypnose reprogramme en profondeur les associations inconscientes liées à la conduite. Une fois que votre cerveau a intégré que conduire peut être un acte sûr et neutre, ce changement est permanent. La grande majorité des personnes accompagnées maintiennent leur confiance au volant dans la durée, sans rechute."
  }
];

const HypnoseAmaxophobie = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose peur de conduire Paris",
    "description": "Traitement de la peur de conduire (amaxophobie) par l'hypnose ericksonienne. Cabinet Paris 4ème Marais-Bastille ou en visio. Résultats en 2 à 4 séances.",
    "url": "https://novahypnose.fr/hypnose-amaxophobie-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie amaxophobie",
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
      { "@type": "ListItem", "position": 3, "name": "Peur de conduire", "item": "https://novahypnose.fr/hypnose-amaxophobie-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": amaxophobieFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Panique sur autoroute", desc: "Vitesse, dépassements, sortie impossible… le corps se bloque dès l'accélération" },
    { title: "Évitement total du volant", desc: "Vous n'avez pas conduit depuis des mois ou des années, dépendance aux transports" },
    { title: "Anxiété avec des passagers", desc: "La pression de responsabilité multiplie la peur, refus de conduire en compagnie" },
    { title: "Peur des tunnels et ronds-points", desc: "Certains contextes spécifiques déclenchent une réaction disproportionnée" },
    { title: "Stress avant chaque trajet", desc: "L'anticipation du trajet génère autant d'anxiété que la conduite elle-même" },
    { title: "Séquelles après un accident", desc: "Un accident passé revient comme un flash au volant, paralysant les réflexes" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose peur de conduire (amaxophobie) Paris | Alain Zenatti</title>
        <meta name="description" content="Reprenez le volant en confiance par l'hypnose à Paris 4ème ou en visio. Amaxophobie, peur autoroute, séquelles accident. Résultats durables en 2 à 4 séances." />
        <meta name="keywords" content="hypnose peur conduire paris, amaxophobie hypnose paris, peur de conduire hypnose, reprendre volant hypnose, hypnothérapeute amaxophobie paris, peur autoroute hypnose, hypnose peur voiture paris, séance hypnose conduite visio france" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-amaxophobie-paris" />
        <meta property="og:title" content="Hypnose peur de conduire (amaxophobie) Paris | Alain Zenatti" />
        <meta property="og:description" content="Reprenez le volant en confiance par l'hypnose à Paris 4ème ou en visio. Amaxophobie, peur autoroute, séquelles accident. Résultats durables en 2 à 4 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-amaxophobie-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose peur de conduire" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose peur de conduire (amaxophobie) Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Reprenez le volant en confiance par l'hypnose à Paris 4ème ou en visio. Amaxophobie, peur autoroute, séquelles accident. Résultats durables en 2 à 4 séances." />
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
          <div className="tag">Peur de conduire — Paris</div>
          <h1 className="sp-hero__h1">
            Reprenez le volant<br/><em>en toute confiance</em>
          </h1>
          <p className="sp-hero__lead">
            Panique sur autoroute, évitement du volant depuis des mois, séquelles d'un accident…
            La peur de conduire (amaxophobie) touche des millions de conducteurs en France.
            L'hypnose ericksonienne agit à la racine de cette peur pour vous permettre de
            reprendre la route sereinement. <strong>Résultats en 2 à 4 séances</strong>,
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
              <div className="section-tag">Amaxophobie — comprendre</div>
              <h2 className="section-title">La peur de conduire<br/><em>vous isole ?</em></h2>
              <p>
                Vous refusez les invitations parce qu'il faudrait conduire. Vous dépendez des
                transports en commun ou des autres pour les moindres déplacements. Votre permis
                est là depuis des années, mais vous ne conduisez plus — ou jamais en dehors de
                votre zone de confort.
              </p>
              <p>
                L'amaxophobie est un mécanisme de protection installé par votre inconscient,
                souvent après un accident, une frayeur intense ou une longue période sans
                conduire. La bonne nouvelle : <strong>ce qui a été appris peut être
                désappris</strong>.
              </p>
              <p>
                L'hypnose permet de reprogrammer cette réaction automatique rapidement, sans
                exposition forcée à la conduite, et sans avoir à revivre consciemment
                l'événement déclencheur.
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
                L'hypnose ericksonienne agit sur le programme inconscient qui déclenche la
                panique au volant. Vous restez conscient et en contrôle pendant toute la séance.
                Je vous guide dans un état de relaxation profonde pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier l'origine de l'amaxophobie (accident, frayeur, longue pause, transmission)",
                  "Neutraliser l'empreinte traumatique sans la revivre consciemment",
                  "Désensibiliser les contextes spécifiques déclencheurs (autoroute, tunnel, passagers)",
                  "Ancrer un état de calme et de confiance activable au volant",
                  "Reconstruire une image positive de vous-même en tant que conducteur(trice)",
                  "Vous enseigner des techniques d'auto-hypnose pour les moments d'anxiété anticipatoire"
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
              <div className="sp-case__title">Séquelles d'un accident trois ans après</div>
              <p>
                Camille*, 34 ans, avait eu un accident de voiture trois ans plus tôt — sans
                blessé, mais le choc l'avait marquée profondément. Depuis, elle évitait
                l'autoroute, refusait de conduire la nuit et n'osait plus prendre le volant
                avec ses enfants à bord.
              </p>
              <p>
                En 3 séances d'hypnose, nous avons neutralisé l'empreinte traumatique de
                l'accident et installé un nouvel état de confiance au volant. Camille conduit
                désormais sur autoroute régulièrement, sans anxiété préalable.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">15 ans sans conduire — reprendre la route</div>
              <p>
                Julien*, 45 ans, avait son permis depuis 20 ans mais n'avait presque pas
                conduit. Une série de petits incidents au début lui avait fait décider d'éviter
                la voiture. Son installation en banlieue le forçait maintenant à affronter le
                problème.
              </p>
              <p>
                En 4 séances, nous avons reconstruit sa confiance de conducteur depuis les
                bases — désensibilisation des situations anxiogènes et ancrage d'une image
                positive. Julien conduit aujourd'hui pour ses trajets quotidiens.
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
              { value: '2-4', label: 'séances suffisent en moyenne pour reprendre le volant sereinement' },
              { value: '15M', label: 'de conducteurs souffrent d\'anxiété au volant en France' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la peur de conduire</h2>
          <div>
            {amaxophobieFaqItems.map((item, i) => (
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
          keywords={["conduite", "voiture", "amaxophobie", "phobie", "peur"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur la peur de conduire et les phobies"
          accentColor="text-purple-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-amaxophobie-paris"
          pageTitle="Hypnose pour la peur de conduire à Paris"
          pageDescription="Hypnose ericksonienne pour traiter la peur de conduire (amaxophobie) au cabinet Paris 4ème ou en visio."
          topic="la peur de conduire et l'amaxophobie"
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
          <h2 className="sp-h2">Reprenez la route en confiance</h2>
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
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseAmaxophobie;
