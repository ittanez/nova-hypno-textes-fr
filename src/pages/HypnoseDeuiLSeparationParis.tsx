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
    answer: "L'hypnose ne cherche pas à effacer la tristesse — elle est une émotion saine et nécessaire que le deuil requiert. Ce qu'elle peut faire, c'est débloquer les mécanismes qui empêchent le deuil de suivre son cours naturel : culpabilité non résolue, mots jamais dits, colère non exprimée, sentiment d'inachevé. L'hypnose aide à transformer la relation avec ce qui est parti, pour passer d'une douleur figée à une tristesse apaisée qui peut s'intégrer."
  },
  {
    question: "Est-ce que l'hypnose aide aussi lors d'une séparation amoureuse ?",
    answer: "Oui. Une rupture amoureuse est un deuil à part entière — le deuil d'une relation, d'un projet de vie, d'une version de soi-même. L'hypnose accompagne ce processus en libérant les attachements inconscients qui maintiennent la douleur, en aidant à digérer les émotions non exprimées (colère, tristesse, honte), et en ouvrant un espace pour reconstruire une identité après la séparation."
  },
  {
    question: "Le deuil est bloqué depuis des années — est-il trop tard ?",
    answer: "Non, il n'est jamais trop tard. Un deuil figé peut durer des années, voire des décennies, sans que les personnes en soient conscientes. Les charges émotionnelles restent présentes dans l'inconscient, même longtemps après les faits. L'hypnose peut rouvrir ce processus suspendu à tout moment, en douceur et en sécurité. Beaucoup de patients décrivent un soulagement profond après avoir enfin pu traverser un deuil qui attendait depuis des années."
  },
  {
    question: "Comment se passe une séance d'hypnose pour accompagner un deuil ?",
    answer: "La première séance est un temps d'écoute approfondie pour comprendre la nature du deuil, ce qui est resté suspendu, les émotions non exprimées. En hypnose, je vous guide pour créer un espace sécurisé où vous pouvez rencontrer symboliquement ce que vous avez perdu, exprimer ce qui n'a pas pu l'être, et initier un processus de séparation apaisée. C'est un travail en douceur, jamais forcé."
  },
  {
    question: "Combien de séances pour traverser un deuil bloqué ?",
    answer: "En général, 4 à 6 séances permettent un accompagnement complet. La durée varie selon la nature du deuil, son ancienneté et la complexité des émotions impliquées. Un deuil récent peut nécessiter moins de séances ; un deuil ancien et chargé de non-dits ou de culpabilité peut en demander davantage. L'important est d'avancer à votre rythme, sans forcer le processus."
  }
];

const HypnoseDeuiLSeparationParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose deuil et séparation Paris",
    "description": "Accompagnement du deuil et des séparations par l'hypnose ericksonienne à Paris 4ème ou en visio. Deuil bloqué, rupture, perte, émotions non exprimées.",
    "url": "https://novahypnose.fr/hypnose-deuil-separation-paris",
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
      { "@type": "ListItem", "position": 2, "name": "Troubles émotionnels", "item": "https://novahypnose.fr/hypnose-troubles-emotionnels-paris" },
      { "@type": "ListItem", "position": 3, "name": "Deuil et séparation", "item": "https://novahypnose.fr/hypnose-deuil-separation-paris" }
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
    { title: "Deuil figé", desc: "La tristesse ne progresse pas, vous êtes bloqué(e) dans la même douleur des semaines ou des mois après la perte" },
    { title: "Culpabilité persistante", desc: "Des regrets, des mots jamais dits, des choses non faites continuent de vous hanter et d'alourdir le deuil" },
    { title: "Impossibilité de pleurer", desc: "Vous n'arrivez pas à libérer les émotions, vous vous sentez anesthésié(e) ou figé(e) dans l'incompréhension" },
    { title: "Deuil d'une rupture", desc: "Une séparation amoureuse dont vous n'arrivez pas à sortir, une identité à reconstruire sans la personne" },
    { title: "Deuil d'un projet de vie", desc: "La perte d'un emploi, d'un rêve, d'une maternité — des deuils dont on parle peu mais qui peuvent être profonds" },
    { title: "Deuil ancien non traversé", desc: "Une perte de plusieurs années qui continue de peser sans que vous sachiez pourquoi vous n'avancez pas" }
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose deuil et séparation Paris | Alain Zenatti</title>
        <meta name="description" content="Accompagnement du deuil et des séparations par l'hypnose à Paris 4ème ou en visio. Deuil bloqué, rupture, perte, culpabilité, émotions figées. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose deuil paris, hypnose séparation paris, deuil bloqué hypnose, hypnose rupture amoureuse paris, traverser un deuil hypnose, hypnose perte être cher en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-deuil-separation-paris" />
        <meta property="og:title" content="Hypnose deuil et séparation Paris | Alain Zenatti" />
        <meta property="og:description" content="Accompagnement du deuil et des séparations par l'hypnose à Paris 4ème ou en visio. Deuil bloqué, rupture, perte, culpabilité." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-deuil-separation-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose deuil" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose deuil et séparation Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Accompagnement du deuil et des séparations par l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Deuil & Séparation — Paris</div>
          <h1 className="sp-hero__h1">
            Traverser la perte<br/><em>pour avancer apaisé(e)</em>
          </h1>
          <p className="sp-hero__lead">
            Un deuil qui n'avance pas, une séparation dont on ne sort pas, des émotions figées dans la
            douleur — l'hypnose aide à <strong>débloquer le processus</strong> naturel du deuil, en douceur,
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
              <div className="section-tag">Deuil — comprendre</div>
              <h2 className="section-title">Quand le deuil<br/><em>ne peut pas avancer.</em></h2>
              <p>
                Le deuil est un processus naturel — mais il peut se bloquer. La culpabilité, les mots
                jamais dits, la colère non exprimée, le sentiment d'inachevé : ces éléments non digérés
                maintiennent la douleur et empêchent l'intégration.
              </p>
              <p>
                Parfois, un deuil peut rester figé pendant des années, des décennies, sans que la
                personne comprenne pourquoi elle n'avance pas. D'autres fois, c'est une séparation
                amoureuse — un deuil relationnel — qui laisse une blessure ouverte.
              </p>
              <p>
                L'hypnose ne cherche pas à supprimer la tristesse. Elle aide à créer les conditions
                pour que le deuil puisse se vivre et s'intégrer, à transformer une douleur qui envahit
                en une mémoire apaisée.
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
          <h2 className="sp-h2">Dans quelles situations l'hypnose peut-elle aider ?</h2>
          <div className="sp-grid-2">
            {manifestations.map((m) => (
              <div key={m.title} className="sp-card reveal">
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
              <div className="section-tag">Mécanisme — accompagner le processus</div>
              <h2 className="section-title">L'hypnose crée<br/><em>les conditions du lâcher-prise.</em></h2>
              <p>
                En état de relaxation profonde, dans un espace de sécurité et de bienveillance,
                je vous accompagne pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier ce qui bloque le processus naturel du deuil",
                  "Exprimer les émotions figées — colère, culpabilité, tristesse, amour",
                  "Donner symboliquement les mots qui n'ont pas pu être dits",
                  "Transformer la relation à ce qui est parti — perte ou séparation",
                  "Passer d'une mémoire douloureuse à une mémoire apaisée",
                  "Rouvrir un espace pour reconstruire et avancer"
                ].map((item) => (
                  <div key={item} className="sp-check-item">
                    <CheckCircle size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Exemples de parcours au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Deuil de sa mère — deux ans après, encore figée</div>
              <p>
                Isabelle*, 52 ans, avait perdu sa mère deux ans plus tôt. Elle ne pleurait plus,
                ne pensait plus à elle constamment — mais elle se sentait comme anesthésiée, incapable
                d'avancer. Des mots non dits, une relation ambivalente, une culpabilité sourde.
              </p>
              <p>
                En 5 séances, nous avons ouvert l'espace pour ce qui n'avait pas pu se dire.
                Elle a décrit la sensation que quelque chose de lourd s'était allégé — et qu'elle
                pouvait enfin garder sa mère dans sa mémoire sans que ça fasse aussi mal.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Rupture — sortir d'une relation toxique sans se perdre</div>
              <p>
                Antoine*, 35 ans, avait quitté une relation difficile depuis 8 mois. Il voulait
                avancer mais se retrouvait à ressasser, à idéaliser l'ancienne relation, incapable
                de se projeter. La rupture avait rouvert des blessures bien plus anciennes.
              </p>
              <p>
                L'hypnose a permis de séparer la douleur de la rupture des blessures anciennes qu'elle
                avait réactivées. Après 4 séances, il décrivait un espace intérieur libéré et une
                capacité à imaginer à nouveau son avenir.
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
              { value: '4-6', label: 'séances pour accompagner un deuil bloqué ou une séparation difficile' },
              { value: '100%', label: 'à votre rythme — le deuil ne se force pas, il s\'accompagne' },
              { value: '5/5', label: 'note moyenne sur Resalib et Google' },
            ].map((s) => (
              <div key={s.label} className="sp-stat reveal">
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et le deuil</h2>
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
          title="Articles sur le deuil et les séparations"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-deuil-separation-paris"
          pageTitle="Hypnose pour le deuil et les séparations à Paris"
          pageDescription="Hypnose ericksonienne pour accompagner le deuil bloqué et les séparations difficiles — au cabinet Paris 4ème ou en visio."
          topic="le deuil et le processus de séparation"
          dateModified="2026-06-20"
          references={[
            {
              authors: "Kübler-Ross E, Kessler D",
              title: "On Grief and Grieving: Finding the Meaning of Grief Through the Five Stages of Loss",
              source: "Scribner",
              year: 2005,
              url: "https://www.simonandschuster.com/books/On-Grief-and-Grieving/Elisabeth-Kubler-Ross/9781476775555",
            },
            {
              authors: "Inserm",
              title: "Évaluation de l'efficacité de la pratique de l'hypnose",
              source: "Rapport d'expertise collective",
              year: 2015,
              url: "https://www.inserm.fr/expertise-collective/evaluation-efficacite-pratique-hypnose/",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt à traverser ce deuil pour avancer apaisé(e) ?</h2>
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
            <Link to="/hypnose-troubles-emotionnels-paris">Troubles émotionnels →</Link>
            <Link to="/hypnose-colere-paris">Colère et irritabilité →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Stress & Anxiété →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseDeuiLSeparationParis;
