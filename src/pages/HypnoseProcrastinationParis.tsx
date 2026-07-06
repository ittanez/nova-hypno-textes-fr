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

const procrastinationFaqItems = [
  {
    question: "L'hypnose peut-elle vraiment aider à arrêter de procrastiner ?",
    answer: "Oui, et c'est l'une de ses applications les plus efficaces. La procrastination n'est pas un défaut de caractère — c'est un mécanisme de protection inconscient, souvent lié à la peur de l'échec, au perfectionnisme ou à l'anxiété de performance. L'hypnose identifie la peur cachée derrière votre procrastination et la neutralise à la source. Résultat : vous retrouvez naturellement la capacité de passer à l'action, sans forcer."
  },
  {
    question: "Combien de séances d'hypnose pour vaincre la procrastination ?",
    answer: "En général, 3 à 5 séances suffisent pour des résultats durables. La première séance permet d'identifier les mécanismes sous-jacents (peur de l'échec, perfectionnisme, auto-sabotage). Les séances suivantes travaillent à reprogrammer ces automatismes. Beaucoup de mes clients constatent un changement significatif dès la deuxième ou troisième séance : ils passent à l'action plus naturellement, sans cette résistance interne habituelle."
  },
  {
    question: "La procrastination est-elle liée à un manque de volonté ?",
    answer: "Non, et c'est l'un des malentendus les plus courants. La procrastination chronique est pilotée par l'inconscient, pas par la volonté. Vous pouvez très bien savoir ce que vous devez faire, vouloir le faire, et quand même ne pas y arriver. C'est parce que quelque chose dans votre inconscient freine l'action — souvent une peur de rater, de réussir, d'être jugé, ou un perfectionnisme qui attend les conditions idéales. C'est pour ça que la volonté seule ne suffit pas."
  },
  {
    question: "L'hypnose aide-t-elle aussi pour les procrastinateurs chroniques depuis l'enfance ?",
    answer: "Oui, l'hypnose est particulièrement efficace sur les schémas installés de longue date. Qu'ils datent de l'enfance ou de l'adolescence, ces programmes inconscients sont accessibles et modifiables par l'hypnose ericksonienne. L'ancienneté du problème ne détermine pas la durée du traitement : c'est la nature du programme inconscient qui compte. Souvent, une procrastination de 20 ans peut être considérablement améliorée en 3 à 4 séances."
  },
  {
    question: "Puis-je faire une séance d'hypnose pour la procrastination en visioconférence ?",
    answer: "Oui, tout à fait. Les séances en visio sont aussi efficaces qu'au cabinet. L'état hypnotique s'induit parfaitement à distance, par la voix et la relation thérapeutique. Beaucoup de mes clients procrastinateurs trouvent d'ailleurs que la séance en visio réduit une résistance supplémentaire : pas de déplacement à organiser, moins d'excuses pour reporter la séance elle-même."
  }
];

const HypnoseProcrastinationParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose procrastination Paris",
    "description": "Libérez-vous de la procrastination par l'hypnose ericksonienne à Paris 4ème ou en visio. Peur de l'échec, perfectionnisme, blocage à l'action — résultats en 3 à 5 séances.",
    "url": "https://novahypnose.fr/hypnose-procrastination-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie procrastination",
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
      { "@type": "ListItem", "position": 3, "name": "Procrastination", "item": "https://novahypnose.fr/hypnose-procrastination-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": procrastinationFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Report systématique", desc: "Vous remettez toujours à demain les tâches importantes, même quand vous en connaissez les conséquences" },
    { title: "Peur de l'échec masquée", desc: "Tant que vous n'avez pas commencé, vous ne pouvez pas échouer — votre inconscient a compris ça avant vous" },
    { title: "Perfectionnisme paralysant", desc: "Vous attendez les conditions idéales, le bon moment, d'être dans le bon état — qui n'arrive jamais" },
    { title: "Anxiété de performance", desc: "Le simple fait de penser à la tâche déclenche une tension ou une angoisse qui vous en éloigne" },
    { title: "Culpabilité chronique", desc: "Vous vous reprochez de ne pas avancer, ce qui génère un stress supplémentaire qui aggrave le blocage" },
    { title: "Auto-sabotage à chaque réussite", desc: "Dès que vous commencez à avancer, quelque chose vient saboter vos efforts ou votre élan" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose procrastination Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Arrêtez de procrastiner grâce à l'hypnose à Paris 4ème ou en visio. Peur de l'échec, perfectionnisme, blocage à l'action — l'hypnose agit sur la cause, pas le symptôme. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose procrastination paris, arrêter procrastiner hypnose, blocage à l'action hypnose paris, peur échec hypnose paris, perfectionnisme hypnose paris, auto-sabotage hypnose paris, procrastination chronique traitement, hypnose procrastination en ligne, séance hypnose procrastination visio" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-procrastination-paris" />
        <meta property="og:title" content="Hypnose procrastination Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Arrêtez de procrastiner grâce à l'hypnose à Paris 4ème ou en visio. L'hypnose agit sur la cause réelle : peur de l'échec, perfectionnisme, auto-sabotage." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-procrastination-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose procrastination" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose procrastination Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Arrêtez de procrastiner grâce à l'hypnose à Paris 4ème ou en visio. L'hypnose agit sur la cause réelle : peur de l'échec, perfectionnisme, auto-sabotage." />
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
          <div className="tag">Procrastination — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous<br/><em>de la procrastination</em>
          </h1>
          <p className="sp-hero__lead">
            Vous repoussez constamment ce qui est important, malgré votre volonté de changer ?
            La procrastination n'est pas un manque de motivation — c'est un <strong>frein inconscient</strong>
            que l'hypnose peut lever durablement, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Procrastination — comprendre</div>
              <h2 className="section-title">Ce n'est pas<br/><em>un manque de volonté.</em></h2>
              <p>
                Vous savez exactement ce que vous devez faire. Vous le voulez. Et pourtant, vous ne le faites pas.
                Une résistance inexplicable s'installe dès que vous approchez de la tâche : vous ouvrez les réseaux,
                vous faites autre chose, vous attendez « d'être dans l'état ».
              </p>
              <p>
                Ce n'est pas de la paresse. C'est un <strong>programme inconscient de protection</strong>.
                Votre inconscient a associé cette tâche à une menace — souvent la peur de l'échec, du jugement,
                ou même du succès — et il vous en éloigne pour vous protéger.
              </p>
              <p>
                L'hypnose va à la source de ce programme, le comprend, et propose à votre inconscient
                une réponse plus adaptée. Vous passez à l'action naturellement, sans effort de volonté.
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
              <div className="section-tag">Mécanisme — lever le frein inconscient</div>
              <h2 className="section-title">L'hypnose dissout<br/><em>la résistance.</em></h2>
              <p>
                L'hypnose ericksonienne ne combat pas votre procrastination — elle la rend inutile.
                En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier la peur inconsciente qui maintient le blocage (échec, succès, jugement)",
                  "Retraiter les expériences qui ont installé ce programme de protection",
                  "Dissocier la tâche de la menace perçue par votre inconscient",
                  "Installer un nouvel automatisme : approche confiante plutôt qu'évitement",
                  "Ancrer un état de concentration et d'action que vous pouvez activer à volonté",
                  "Vous transmettre une technique d'auto-hypnose pour maintenir l'élan"
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
              <div className="sp-case__title">Examen professionnel repoussé depuis des mois</div>
              <p>
                Un client devait passer un concours d'entrée au Ministère des Affaires Étrangères. Malgré ses
                compétences, il repoussait sans cesse la préparation. L'angoisse d'un enjeu aussi important
                le paralysait complètement dès qu'il ouvrait ses documents.
              </p>
              <p>
                Après deux séances d'hypnose pour identifier et neutraliser la peur de l'échec sous-jacente,
                il a abordé l'examen avec une sérénité remarquable et l'a passé avec une grande facilité.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Business plan bloqué depuis deux ans</div>
              <p>
                Mathieu*, 38 ans, entrepreneur, n'arrivait pas à finaliser son projet depuis deux ans. Il avait
                toutes les idées, toutes les compétences — mais quelque chose l'empêchait systématiquement
                de conclure. La culpabilité s'accumulait, paralysant encore davantage son action.
              </p>
              <p>
                En 3 séances, nous avons identifié une peur profonde de réussir et d'assumer la responsabilité
                qui en découle. Mathieu a finalisé son projet le mois suivant et lancé son activité.
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
              J'avais un examen important à passer et je n'arrivais pas à me mettre au travail.
              Après deux séances avec M. Zenatti, quelque chose s'est débloqué. J'ai préparé
              l'examen sereinement et je l'ai passé avec une facilité que je n'aurais jamais
              imaginée. Le changement a été profond et durable.
            </p>
            <footer>— Témoignage d'un client, séances en visio</footer>
          </blockquote>
        </div>
      </section>

      {/* Stats */}
      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <div className="sp-stats">
            {[
              { value: '3-5', label: 'séances pour neutraliser les freins inconscients à l\'action' },
              { value: '100%', label: 'personnalisé selon votre blocage et ses origines profondes' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la procrastination</h2>
          <div>
            {procrastinationFaqItems.map((item, i) => (
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
          keywords={["procrastination", "blocage", "passage à l'action", "peur de l'échec"]}
          title="Articles sur la procrastination et les blocages"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-procrastination-paris"
          pageTitle="Hypnose pour la procrastination à Paris"
          pageDescription="Hypnose ericksonienne pour traiter la procrastination et les blocages à l'action au cabinet Paris 4ème ou en visio."
          topic="la procrastination et les blocages comportementaux"
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
          <h2 className="sp-h2">Prêt à passer à l'action enfin ?</h2>
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
            <Link to="/hypnose-schemas-repetitifs-paris">Schémas répétitifs →</Link>
            <Link to="/hypnose-blocages-professionnels-paris">Blocages professionnels →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseProcrastinationParis;
