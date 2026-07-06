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

const schemasFaqItems = [
  {
    question: "Pourquoi reproduit-on les mêmes schémas relationnels malgré soi ?",
    answer: "Parce que ces schémas sont pilotés par l'inconscient, pas par le choix conscient. Votre inconscient a appris, souvent dans l'enfance, qu'un certain type de relation était la norme — même si cette norme était douloureuse. Il cherche à recréer ce qu'il connaît parce que le familier est rassurant, même quand c'est difficile. C'est ce programme inconscient que l'hypnose peut identifier et transformer."
  },
  {
    question: "L'hypnose peut-elle vraiment briser les schémas répétitifs en amour ?",
    answer: "Oui, c'est l'une de ses applications les plus puissantes. Les schémas amoureux répétitifs — toujours choisir le même type de partenaire, reproduire les mêmes conflits, s'auto-saboter à chaque relation qui commence bien — sont maintenus par des programmes inconscients souvent installés dans l'enfance. L'hypnose identifie le schéma fondateur, remonte à son origine et reprogramme la réponse inconsciente. Mes clients sont souvent surpris de faire naturellement des choix différents après quelques séances."
  },
  {
    question: "Comment savoir si je suis dans un schéma répétitif ?",
    answer: "Le signe le plus clair est la répétition malgré la conscience : vous reconnaissez le schéma, vous vous dites 'encore ça', vous avez peut-être travaillé dessus en thérapie — et pourtant vous le reproduisez. Cette résistance au changement conscient est la signature d'un programme inconscient. L'hypnose est particulièrement indiquée parce qu'elle accède directement à ce niveau inconscient, là où les approches cognitives atteignent parfois leurs limites."
  },
  {
    question: "Combien de séances d'hypnose pour briser un schéma répétitif ?",
    answer: "En général, 4 à 6 séances permettent de travailler en profondeur sur un schéma relationnel ou comportemental répétitif. Les premières séances identifient le programme, son origine et sa fonction. Les suivantes le retraitent et installent de nouvelles réponses. Le changement se produit souvent progressivement : vous commencez à remarquer que vous réagissez différemment, puis que vous faites des choix différents."
  },
  {
    question: "Les schémas au travail peuvent-ils aussi être traités par hypnose ?",
    answer: "Tout à fait. Les schémas répétitifs ne se limitent pas aux relations amoureuses — ils se déploient aussi au travail (conflits récurrents avec l'autorité, auto-sabotage avant une promotion, difficulté à déléguer) et dans la vie sociale. L'hypnose peut travailler sur n'importe quel schéma comportemental répétitif, quelle que soit sa nature ou le domaine de vie où il s'exprime."
  }
];

const HypnoseSchemasRepetitifsParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose schémas répétitifs Paris",
    "description": "Brisez les schémas répétitifs en amour et au travail grâce à l'hypnose ericksonienne à Paris 4ème ou en visio. Programmes inconscients, cycles relationnels, auto-sabotage.",
    "url": "https://novahypnose.fr/hypnose-schemas-repetitifs-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie schémas répétitifs",
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
      { "@type": "ListItem", "position": 2, "name": "Blocages & Comportements", "item": "https://novahypnose.fr/hypnose-blocages-paris" },
      { "@type": "ListItem", "position": 3, "name": "Schémas répétitifs", "item": "https://novahypnose.fr/hypnose-schemas-repetitifs-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": schemasFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Toujours le même type de partenaire", desc: "Vous tombez systématiquement amoureux des mêmes profils, malgré vos promesses de faire autrement" },
    { title: "Conflits qui se reproduisent", desc: "Les mêmes disputes reviennent dans chaque relation, avec des personnes différentes" },
    { title: "Auto-sabotage dès que ça va bien", desc: "Quand une relation s'améliore ou réussit, quelque chose en vous commence à tout faire capoter" },
    { title: "Répétition dans le travail", desc: "Conflits récurrents avec l'autorité, blocage avant chaque promotion, difficultés relationnelles identiques" },
    { title: "Conscience du schéma sans pouvoir l'arrêter", desc: "Vous voyez clairement ce qui se passe — et vous le reproduisez quand même, impuissant" },
    { title: "Choix de vie qui se ressemblent", desc: "Vos grandes décisions (logement, travail, amis) semblent suivre le même fil inconscient" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose schémas répétitifs Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Brisez vos schémas répétitifs en amour et au travail grâce à l'hypnose à Paris 4ème ou en visio. L'hypnose reprogramme les cycles inconscients à leur source. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose schémas répétitifs paris, briser cycle relationnel hypnose, patterns amoureux inconscients hypnose, auto-sabotage répétitif hypnose paris, hypnose répétition comportements paris, cycles négatifs hypnose traitement, hypnose schémas en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-schemas-repetitifs-paris" />
        <meta property="og:title" content="Hypnose schémas répétitifs Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Brisez vos schémas répétitifs en amour et au travail grâce à l'hypnose à Paris 4ème ou en visio." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-schemas-repetitifs-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose schémas répétitifs" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose schémas répétitifs Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Brisez vos schémas répétitifs en amour et au travail grâce à l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Schémas répétitifs — Paris</div>
          <h1 className="sp-hero__h1">
            Brisez les cycles<br/><em>qui se répètent</em>
          </h1>
          <p className="sp-hero__lead">
            Vous reproduisez toujours les mêmes schémas dans vos relations, votre travail, vos choix de vie —
            malgré votre conscience du problème. Ces cycles sont des <strong>programmes inconscients</strong>
            que l'hypnose peut identifier et transformer, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Schémas répétitifs — comprendre</div>
              <h2 className="section-title">Voir le schéma<br/><em>ne suffit pas à le briser.</em></h2>
              <p>
                Vous savez exactement ce que vous faites. Vous l'avez analysé, peut-être en thérapie.
                Vous avez promis de faire autrement. Et pourtant, à la prochaine opportunité, le même scénario
                se rejoue — avec d'autres acteurs, mais le même script.
              </p>
              <p>
                C'est parce que ces schémas ne sont pas conscients : ils sont pilotés par un programme
                inconscient installé tôt dans votre histoire. L'inconscient cherche le familier, même si le
                familier est douloureux. Il reproduit ce qu'il connaît <strong>pour vous protéger</strong>
                — paradoxalement.
              </p>
              <p>
                L'hypnose dialogue directement avec ce programme inconscient pour l'identifier, le
                comprendre et proposer une nouvelle façon d'être en relation — avec soi et avec les autres.
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
              <div className="section-tag">Mécanisme — reprogrammer les cycles</div>
              <h2 className="section-title">L'hypnose réécrit<br/><em>le programme de base.</em></h2>
              <p>
                L'hypnose ericksonienne accède directement aux programmes inconscients qui maintiennent
                les cycles répétitifs. En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier le schéma fondateur installé dans l'enfance ou l'adolescence",
                  "Comprendre la fonction protectrice inconsciente de ce programme",
                  "Retraiter les expériences à l'origine du cycle",
                  "Installer un nouveau modèle relationnel basé sur vos valeurs adultes",
                  "Briser les associations automatiques qui reconstituent le schéma",
                  "Ancrer la capacité à faire des choix différents naturellement"
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
              <div className="sp-case__title">Schémas amoureux répétitifs — rupture du cycle</div>
              <p>
                Une cliente reproduisait toujours les mêmes schémas dans ses relations amoureuses :
                elle choisissait systématiquement des partenaires émotionnellement distants, puis s'épuisait
                à essayer de les rendre disponibles. Consciente du cycle, elle ne parvenait pas à s'en défaire.
              </p>
              <p>
                En 5 séances d'hypnose ericksonienne, nous avons retracé l'origine de ce modèle relationnel
                installé dans son histoire familiale. Elle a progressivement fait des choix relationnels
                différents, s'ouvrant à une relation fondée sur la réciprocité et la présence.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Auto-sabotage professionnel récurrent</div>
              <p>
                Pierre*, 42 ans, sabotait systématiquement sa progression professionnelle dès qu'une
                promotion se profilait. Il trouvait des raisons de quitter, de se mettre en retrait,
                d'échouer au moment décisif — sans comprendre pourquoi.
              </p>
              <p>
                En hypnose, nous avons découvert une croyance profonde sur l'illégitimité du succès,
                héritée d'une dynamique familiale. Après 4 séances, Pierre a accepté sa première
                promotion sans se saboter.
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
              { value: '4-6', label: 'séances pour identifier et reprogrammer les cycles inconscients' },
              { value: '100%', label: 'personnalisé selon votre schéma spécifique et son histoire' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et les schémas répétitifs</h2>
          <div>
            {schemasFaqItems.map((item, i) => (
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
          keywords={["schémas répétitifs", "cycles relationnels", "auto-sabotage", "inconscient"]}
          title="Articles sur les schémas répétitifs et les cycles"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-schemas-repetitifs-paris"
          pageTitle="Hypnose pour les schémas répétitifs à Paris"
          pageDescription="Hypnose ericksonienne pour briser les schémas répétitifs relationnels et comportementaux au cabinet Paris 4ème ou en visio."
          topic="les schémas répétitifs et les cycles comportementaux inconscients"
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
          <h2 className="sp-h2">Prêt à sortir du cycle ?</h2>
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
            <Link to="/hypnose-blocages-paris">Tous les blocages →</Link>
            <Link to="/hypnose-blocages-professionnels-paris">Blocages professionnels →</Link>
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

export default HypnoseSchemasRepetitifsParis;
