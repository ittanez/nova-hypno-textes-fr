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

const onychophagieFaqItems = [
  {
    question: "L'hypnose peut-elle vraiment faire arrêter de se ronger les ongles ?",
    answer: "Oui, et c'est l'une des applications les plus efficaces de l'hypnose ericksonienne. L'onychophagie est un automatisme inconscient, souvent lié à la gestion du stress ou à un besoin de réconfort. L'hypnose identifie la fonction cachée du comportement — ce que le geste cherche à satisfaire — et propose à l'inconscient une alternative. En 1 à 3 séances, la plupart de mes patients cessent de se ronger les ongles sans effort de volonté, car l'automatisme a été reprogrammé."
  },
  {
    question: "Combien de séances faut-il pour arrêter l'onychophagie par hypnose ?",
    answer: "Une à trois séances suffisent dans la grande majorité des cas. Certains patients constatent l'arrêt du comportement dès la première séance. C'est l'une des problématiques où l'hypnose obtient les résultats les plus rapides, car l'onychophagie est un automatisme relativement isolé — il n'est pas ancré dans une problématique émotionnelle complexe, même si le stress est souvent un déclencheur."
  },
  {
    question: "Je me ronge les ongles sans même m'en rendre compte — est-ce que l'hypnose peut quand même aider ?",
    answer: "C'est justement parce que le comportement est inconscient que l'hypnose est si efficace. Vous n'avez pas besoin d'être conscient du geste pour qu'il soit reprogrammé. L'hypnose dialogue directement avec l'inconscient qui pilote cet automatisme. Une fois que l'inconscient a intégré la nouvelle réponse, le geste disparaît — même en dehors de votre champ de conscience."
  },
  {
    question: "L'onychophagie est-elle liée au stress ou à de l'anxiété ?",
    answer: "Très souvent, oui. L'onychophagie est un comportement de régulation émotionnelle : votre inconscient a trouvé dans ce geste un moyen de gérer la tension interne. Mais ce n'est pas toujours le cas — pour certains, c'est simplement un automatisme appris, sans lien direct avec l'anxiété. L'hypnose explore ces deux dimensions et traite ce qui est réellement à l'origine du comportement pour votre cas spécifique."
  },
  {
    question: "Puis-je faire une séance d'hypnose pour l'onychophagie depuis chez moi, en visio ?",
    answer: "Oui, les séances en visioconférence sont aussi efficaces qu'au cabinet pour l'onychophagie. L'état hypnotique s'atteint parfaitement à distance. Pour ce type de comportement compulsif, beaucoup de patients trouvent même plus confortable de faire la séance chez eux, dans leur propre environnement."
  }
];

const HypnoseOnychophagieParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose onychophagie (rongement des ongles) Paris",
    "description": "Arrêtez de vous ronger les ongles grâce à l'hypnose ericksonienne à Paris 4ème ou en visio. Résultats rapides en 1 à 3 séances. Cabinet Paris Marais-Bastille.",
    "url": "https://novahypnose.fr/hypnose-onychophagie-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie onychophagie",
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
      { "@type": "ListItem", "position": 3, "name": "Onychophagie", "item": "https://novahypnose.fr/hypnose-onychophagie-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": onychophagieFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Geste automatique et inconscient", desc: "Vous vous retrouvez à vous ronger les ongles sans même vous en apercevoir, souvent pendant que vous lisez ou regardez un écran" },
    { title: "Douleurs et ongles abîmés", desc: "Ongles rongés jusqu'au sang, chairs à vif, infections récurrentes autour des ongles" },
    { title: "Honte et dissimulation", desc: "Vous cachez vos mains, évitez les poignées de main, n'osez pas montrer vos ongles en réunion" },
    { title: "Impossible d'arrêter malgré la volonté", desc: "Vous avez essayé le vernis amer, les bagues, les gants — sans résultat durable" },
    { title: "Aggravation sous le stress", desc: "Le comportement s'intensifie en période d'anxiété, d'ennui ou de concentration intense" },
    { title: "Impact sur la vie sociale et professionnelle", desc: "Présentations, réunions, rendez-vous : vos mains vous trahissent et parasitent votre confiance" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose onychophagie (rongement des ongles) Paris | Alain Zenatti</title>
        <meta name="description" content="Arrêtez de vous ronger les ongles grâce à l'hypnose à Paris 4ème ou en visio. L'onychophagie cède souvent en 1 à 3 séances. Alain Zenatti, Maître Hypnologue Paris." />
        <meta name="keywords" content="hypnose onychophagie paris, arrêter se ronger ongles hypnose, traitement onychophagie hypnose, rongement ongles comportement compulsif hypnose paris, onychophagie adulte traitement, hypnose onychophagie en ligne, séance rongement ongles visio" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-onychophagie-paris" />
        <meta property="og:title" content="Hypnose onychophagie (rongement des ongles) Paris | Alain Zenatti" />
        <meta property="og:description" content="Arrêtez de vous ronger les ongles grâce à l'hypnose à Paris 4ème ou en visio. Résultats en 1 à 3 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-onychophagie-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose onychophagie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose onychophagie (rongement des ongles) Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Arrêtez de vous ronger les ongles grâce à l'hypnose à Paris 4ème ou en visio. Résultats en 1 à 3 séances." />
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
          <div className="tag">Onychophagie — Paris</div>
          <h1 className="sp-hero__h1">
            Arrêtez de vous ronger les ongles<br/><em>définitivement</em>
          </h1>
          <p className="sp-hero__lead">
            Vous vous rongez les ongles depuis l'enfance, sans pouvoir arrêter malgré votre volonté ?
            L'onychophagie est un <strong>automatisme inconscient</strong> que l'hypnose peut reprogrammer
            rapidement — souvent en une seule séance — au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Onychophagie — comprendre</div>
              <h2 className="section-title">Un automatisme inconscient,<br/><em>pas un manque de volonté.</em></h2>
              <p>
                Vous avez essayé le vernis amer, les bagues anti-rongement, les rappels sur votre téléphone.
                Vous avez décidé des dizaines de fois d'arrêter. Et pourtant, vous recommencez — souvent sans
                même vous en rendre compte.
              </p>
              <p>
                C'est parce que l'onychophagie est un comportement piloté par votre <strong>inconscient</strong>,
                pas par votre volonté. Il remplit une fonction : gérer la tension, se réconforter, s'ancrer dans
                le moment présent. Tant que cette fonction n'est pas satisfaite autrement, le comportement revient.
              </p>
              <p>
                L'hypnose identifie ce que le geste cherche à accomplir et propose à votre inconscient
                une réponse alternative. Le résultat : l'automatisme disparaît naturellement.
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
                  <path d="M 260 60 C 320 60, 480 140, 490 260 C 498 360, 430 460, 320 490 C 220 518, 100 485, 50 395 C 5 313, 30 195, 100 135 C 158 87, 210 60, 260 60 Z" fill="#2B4BA0" opacity="0.88" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 260 30 L 350 140 L 490 130 L 410 240 L 460 380 L 320 310 L 200 420 L 190 270 L 50 210 L 185 185 Z" fill="#F2A12E" opacity="0.75" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
            </div>
            <div className="cabinet__copy">
              <div className="section-tag">Mécanisme — reprogrammer l'automatisme</div>
              <h2 className="section-title">L'hypnose remplace<br/><em>l'automatisme.</em></h2>
              <p>
                L'hypnose ericksonienne ne combat pas l'onychophagie — elle la rend inutile. En état de
                relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier la fonction inconsciente du geste (gestion du stress, réconfort, ancrage)",
                  "Comprendre les déclencheurs spécifiques (situations, émotions, contextes)",
                  "Dissocier le geste du besoin qu'il satisfaisait",
                  "Installer une nouvelle réponse automatique adaptée à ce besoin",
                  "Ancrer une sensation de répulsion naturelle ou d'indifférence au geste",
                  "Vous transmettre des outils d'auto-hypnose pour les moments de tension"
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
              <div className="sp-case__title">Soulagé en une seule séance</div>
              <p>
                Un patient qui se rongeait les ongles depuis l'adolescence est venu consulter sans vraiment
                y croire. En une seule séance, nous avons identifié le déclencheur principal — un état
                d'anxiété diffuse lié au travail — et reprogrammé la réponse automatique.
              </p>
              <p>
                Dès la semaine suivante, le comportement avait cessé. Il n'avait ni fait d'effort de volonté,
                ni utilisé de vernis — l'automatisme avait simplement disparu.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Onychophagie sévère depuis l'enfance</div>
              <p>
                Clément*, 28 ans, se rongeait les ongles jusqu'au sang depuis l'adolescence. Ce comportement
                compulsif lui causait de la honte et l'empêchait dans sa vie professionnelle lors des réunions.
              </p>
              <p>
                En 2 séances, nous avons remplacé le geste automatique par une réponse plus adaptée. Clément
                a cessé de se ronger les ongles dès la première semaine après la séance.
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
              { value: '1-3', label: 'séances suffisent pour stopper l\'onychophagie dans la grande majorité des cas' },
              { value: '100%', label: 'personnalisé selon vos déclencheurs et votre histoire spécifique' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et l'onychophagie</h2>
          <div>
            {onychophagieFaqItems.map((item, i) => (
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
          keywords={["onychophagie", "rongement des ongles", "comportement compulsif", "automatisme"]}
          title="Articles sur l'onychophagie et les comportements compulsifs"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-onychophagie-paris"
          pageTitle="Hypnose pour l'onychophagie à Paris"
          pageDescription="Hypnose ericksonienne pour arrêter de se ronger les ongles (onychophagie) au cabinet Paris 4ème ou en visio."
          topic="l'onychophagie et les comportements compulsifs"
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
              authors: "Hammond DC",
              title: "Hypnosis in the treatment of anxiety- and stress-related disorders",
              source: "Expert Review of Neurotherapeutics",
              year: 2010,
              url: "https://pubmed.ncbi.nlm.nih.gov/20128679/",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt à retrouver des ongles en bonne santé ?</h2>
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
            <Link to="/hypnose-toc-rituels-paris">TOC & rituels →</Link>
            <Link to="/hypnose-procrastination-paris">Procrastination →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseOnychophagieParis;
