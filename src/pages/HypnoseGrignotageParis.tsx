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

const grignotageFaqItems = [
  {
    question: "L'hypnose peut-elle arrêter le grignotage chronique ?",
    answer: "Oui. Le grignotage chronique est un automatisme alimentaire souvent lié à l'anxiété, à l'ennui ou à la concentration. L'hypnose identifie l'état émotionnel qui déclenche le grignotage et propose à l'inconscient des alternatives. En 3 à 5 séances, la plupart de mes patients voient le grignotage se réduire considérablement, souvent dès la deuxième séance."
  },
  {
    question: "Quelle est la différence entre grignotage et faim normale ?",
    answer: "La faim normale est un signal physique qui arrive progressivement et peut attendre. Le grignotage chronique est un comportement automatique qui n'est pas lié à la faim physique — il est déclenché par un état émotionnel (anxiété, ennui, stress, besoin de pause) ou par des signaux contextuels (l'heure, l'endroit, une activité). L'hypnose vous aide à distinguer ces deux types de signaux et à ne répondre qu'à la vraie faim."
  },
  {
    question: "Le grignotage est-il toujours lié au stress ?",
    answer: "Pas uniquement. Le stress est un déclencheur fréquent, mais le grignotage peut aussi répondre à l'ennui, à la procrastination (manger au lieu d'agir), à un besoin de récompense, ou à des associations contextuelles (télévision, travail sur ordinateur). L'hypnose explore votre grignotage spécifique pour identifier ses déclencheurs réels, qui peuvent varier d'une personne à l'autre."
  },
  {
    question: "Combien de séances d'hypnose pour arrêter de grignoter ?",
    answer: "En général, 2 à 4 séances suffisent pour des résultats concrets. Le grignotage est souvent un automatisme relativement isolé — il n'est pas toujours ancré dans une problématique émotionnelle complexe. Une fois le déclencheur identifié et traité, le comportement perd sa raison d'être rapidement."
  },
  {
    question: "Est-ce que l'hypnose peut aider à arrêter de grignoter au bureau ?",
    answer: "Oui, c'est l'une des situations les plus fréquentes que je traite. Le grignotage au bureau est souvent lié à l'anxiété de performance, à l'ennui, ou à un besoin de pause sensorielle. L'hypnose identifie ce qui se passe réellement et aide votre inconscient à trouver des réponses plus adaptées à ce contexte spécifique."
  }
];

const HypnoseGrignotageParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose grignotage chronique Paris",
    "description": "Arrêtez de grignoter grâce à l'hypnose ericksonienne à Paris 4ème ou en visio. Grignotage anxieux, ennui alimentaire, automatismes — agir sur la cause, pas le symptôme.",
    "url": "https://novahypnose.fr/hypnose-grignotage-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie grignotage",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
      "name": "Au cabinet Paris 4ème ou en visioconférence"
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
      { "@type": "ListItem", "position": 2, "name": "Troubles alimentaires", "item": "https://novahypnose.fr/hypnose-troubles-alimentaires-paris" },
      { "@type": "ListItem", "position": 3, "name": "Grignotage", "item": "https://novahypnose.fr/hypnose-grignotage-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": grignotageFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Grignotage au bureau", desc: "Chocolat, biscuits, fruits secs — vous mangez en continu devant l'ordinateur, souvent sans s'en rendre compte" },
    { title: "Grignotage devant la télévision", desc: "Le canapé et l'écran déclenchent automatiquement l'envie de manger, indépendamment des repas" },
    { title: "Grignotage anxieux", desc: "Dès que la tension monte, vous vous retrouvez la main dans le placard ou le réfrigérateur" },
    { title: "Grignotage par ennui", desc: "Quand il ne se passe rien, la nourriture s'impose comme occupation par défaut" },
    { title: "Grignotage de procrastination", desc: "Avant de commencer une tâche difficile, vous retardez le moment en mangeant" },
    { title: "Impossibilité de s'arrêter entre les repas", desc: "Malgré votre intention, vous ne parvenez pas à passer d'un repas à l'autre sans rien manger" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose grignotage chronique Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Arrêtez de grignoter grâce à l'hypnose à Paris 4ème ou en visio. Grignotage anxieux, au bureau, devant la télé — l'hypnose traite le déclencheur émotionnel. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose grignotage paris, arrêter grignoter hypnose, grignotage chronique traitement, grignotage anxieux hypnose paris, grignotage bureau hypnose, hypnose grignotage en ligne, automatisme alimentaire hypnose paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-grignotage-paris" />
        <meta property="og:title" content="Hypnose grignotage chronique Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Arrêtez de grignoter grâce à l'hypnose à Paris 4ème ou en visio. L'hypnose traite le déclencheur émotionnel du grignotage chronique." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-grignotage-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose grignotage" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose grignotage chronique Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Arrêtez de grignoter grâce à l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Grignotage — Paris</div>
          <h1 className="sp-hero__h1">
            Arrêtez de grignoter<br/><em>entre les repas</em>
          </h1>
          <p className="sp-hero__lead">
            Vous grignotez en continu au bureau, devant la télé, dès que vous stressez — souvent sans même
            vous en rendre compte. Le grignotage chronique n'est pas de la gourmandise : c'est un
            <strong> automatisme inconscient</strong> que l'hypnose peut reprogrammer, au cabinet à Paris 4ème
            ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Grignotage — comprendre</div>
              <h2 className="section-title">Un automatisme inconscient,<br/><em>pas un manque de discipline.</em></h2>
              <p>
                Vous avez décidé de ne pas grignoter. Vous avez rangé les gâteaux en hauteur, vous n'avez pas
                acheté de chips. Et pourtant, vous vous retrouvez la main dans quelque chose — ou vous êtes
                sorti en acheter.
              </p>
              <p>
                Le grignotage chronique est un comportement automatique que l'inconscient a associé à un
                état émotionnel spécifique. C'est une <strong>habitude neurologique</strong> — une séquence
                déclencheur-comportement-récompense — pas un choix délibéré.
              </p>
              <p>
                L'hypnose interrompt cette séquence au niveau où elle se forme : dans l'inconscient. Elle
                propose une réponse alternative au déclencheur, qui ne passe plus par la nourriture.
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
                  <path d="M 80 100 C 180 30, 380 20, 470 140 C 545 240, 510 390, 390 455 C 272 518, 100 500, 35 385 C -25 275, 20 140, 80 100 Z" fill="#2B4BA0" opacity="0.9" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 155 155 C 265 95, 415 148, 420 272 C 425 385, 318 455, 200 436 C 86 418, 44 332, 70 224 C 91 142, 128 162, 155 155 Z" fill="#F2A12E" opacity="0.88" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
            </div>
            <div className="cabinet__copy">
              <div className="section-tag">Mécanisme — reprogrammer l'automatisme</div>
              <h2 className="section-title">L'hypnose coupe<br/><em>la boucle automatique.</em></h2>
              <p>
                L'hypnose ericksonienne ne vous demande pas de résister — elle neutralise l'automatisme.
                En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier les déclencheurs précis de votre grignotage (émotions, contextes, heures)",
                  "Dissocier l'état déclencheur de la réponse alimentaire automatique",
                  "Installer une nouvelle réponse à ce déclencheur, sans passer par la nourriture",
                  "Reconnecter votre inconscient aux signaux naturels de faim et de satiété",
                  "Ancrer la capacité à passer d'un repas à l'autre sans impulsion de grignoter",
                  "Vous transmettre des outils pour les moments de montée de l'envie"
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
              <div className="sp-case__title">Grignotage au bureau — anxiété de performance</div>
              <p>
                Nicolas*, 35 ans, grignotait en continu au bureau — chocolat, biscuits, café sucré — sans
                s'en rendre compte. Ce comportement automatique était lié à l'anxiété de performance qu'il
                ressentait face à ses dossiers.
              </p>
              <p>
                En 2 séances, nous avons neutralisé le lien anxiété-nourriture. Nicolas a retrouvé la
                capacité de travailler sans avoir besoin de manger en permanence, et son anxiété au travail
                a également diminué.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Grignotage nocturne — décompresser autrement</div>
              <p>
                Aurélie*, 42 ans, grignotait chaque soir en regardant des séries. Ce n'était pas de la
                faim — c'était une façon automatique de signaler à son cerveau que la journée était terminée
                et qu'elle pouvait enfin se détendre.
              </p>
              <p>
                En 3 séances, nous avons installé d'autres rituels de décompression qui ne passaient
                pas par la nourriture. Le grignotage nocturne a cessé sans effort de volonté.
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
              { value: '2-4', label: 'séances pour neutraliser le grignotage chronique dans la plupart des cas' },
              { value: '100%', label: 'personnalisé selon vos déclencheurs et vos habitudes spécifiques' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et le grignotage</h2>
          <div>
            {grignotageFaqItems.map((item, i) => (
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
          keywords={["grignotage", "automatisme alimentaire", "manger sans faim", "snacking"]}
          title="Articles sur le grignotage et les automatismes alimentaires"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-grignotage-paris"
          pageTitle="Hypnose pour le grignotage à Paris"
          pageDescription="Hypnose ericksonienne pour stopper le grignotage chronique au cabinet Paris 4ème ou en visio."
          topic="le grignotage et les automatismes alimentaires"
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
              authors: "Barabasz M, Spiegel D",
              title: "Hypnotizability and weight loss in obese subjects",
              source: "International Journal of Eating Disorders",
              year: 1989,
              url: "https://pubmed.ncbi.nlm.nih.gov/2674707/",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt à arrêter de grignoter sans effort ?</h2>
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
            <Link to="/hypnose-troubles-alimentaires-paris">Tous les troubles alimentaires →</Link>
            <Link to="/hypnose-compulsions-alimentaires-paris">Compulsions alimentaires →</Link>
            <Link to="/hypnose-addiction-sucre-paris">Addiction au sucre →</Link>
            <Link to="/hypnose-alimentation-emotionnelle-paris">Alimentation émotionnelle →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseGrignotageParis;
