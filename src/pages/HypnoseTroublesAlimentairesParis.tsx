import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import SpecialtyReferences from '@/components/SpecialtyReferences';
import { troublesAlimentairesFaqItems } from '@/data/specialtyFaqData';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const HypnoseTroublesAlimentairesParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour les troubles alimentaires à Paris",
    "description": "Retrouvez un rapport apaisé à la nourriture grâce à l'hypnose ericksonienne à Paris. Compulsions alimentaires, boulimie, anorexie, grignotages. Cabinet Paris 4ème & visio France.",
    "url": "https://novahypnose.fr/hypnose-troubles-alimentaires-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie troubles du comportement alimentaire",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose troubles alimentaires Paris", "item": "https://novahypnose.fr/hypnose-troubles-alimentaires-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": troublesAlimentairesFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const troubles = [
    { title: "Compulsions alimentaires", desc: "Envies soudaines et irrésistibles de manger, souvent le soir ou sous l'effet du stress, sans faim réelle", href: "/hypnose-compulsions-alimentaires-paris" },
    { title: "Grignotages chroniques", desc: "Comportement automatique de manger en continu, souvent sans en avoir conscience, lié à l'anxiété", href: "/hypnose-grignotage-paris" },
    { title: "Boulimie & crises", desc: "Épisodes incontrôlables de prise alimentaire massive suivis de culpabilité ou de comportements compensatoires", href: "/hypnose-boulimie-paris" },
    { title: "Addiction au sucre", desc: "Envies incontrôlables de sucré, dépendance aux aliments sucrés, cycles de craving et de culpabilité", href: "/hypnose-addiction-sucre-paris" },
    { title: "Alimentation émotionnelle", desc: "Manger pour gérer les émotions — stress, ennui, tristesse, solitude — plutôt que par faim physique", href: "/hypnose-alimentation-emotionnelle-paris" },
    { title: "Image corporelle douloureuse", desc: "Regard sévère et déformé sur son corps, honte, difficulté à se sentir bien dans sa peau", href: "/hypnose-image-corporelle-paris" }
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose troubles alimentaires Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Retrouvez un rapport apaisé à la nourriture par l'hypnose à Paris 4ème ou en visio partout en France. Compulsions, boulimie, grignotages, alimentation émotionnelle. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose troubles alimentaires paris, hypnose boulimie paris, hypnose compulsions alimentaires paris, hypnose anorexie paris, hypnose grignotage paris, hypnose rapport nourriture paris, troubles comportement alimentaire hypnose, hypnose alimentation émotionnelle paris, hypnose troubles alimentaires en ligne, séance hypnose alimentation visio France" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-troubles-alimentaires-paris" />
        <meta property="og:title" content="Hypnose troubles alimentaires Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Retrouvez un rapport apaisé à la nourriture par l'hypnose à Paris 4ème ou en visio partout en France. Compulsions, boulimie, grignotages, alimentation émotionnelle." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-troubles-alimentaires-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose troubles alimentaires" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose troubles alimentaires Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Retrouvez un rapport apaisé à la nourriture par l'hypnose à Paris 4ème ou en visio partout en France." />
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
          <div className="tag">Rapport au corps &amp; Alimentation — Paris</div>
          <h1 className="sp-hero__h1">
            Retrouvez un rapport apaisé<br/><em>à votre poids</em>
          </h1>
          <p className="sp-hero__lead">
            Compulsions, grignotages, boulimie, alimentation émotionnelle : votre rapport à la nourriture
            n'est pas une question de volonté. Ce sont des <strong>programmes inconscients</strong> que l'hypnose
            peut transformer, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Comprendre — les troubles alimentaires</div>
              <h2 className="section-title">Ce n'est pas<br/><em>une question de volonté.</em></h2>
              <p>
                Vous savez ce que vous devriez manger. Vous connaissez les règles. Et pourtant, quelque chose
                vous pousse à manger quand vous n'avez pas faim, à vous restreindre jusqu'à l'épuisement,
                ou à osciller entre les deux.
              </p>
              <p>
                Ce n'est pas un défaut de caractère. Ces comportements sont pilotés par votre inconscient,
                qui a trouvé dans la nourriture une réponse à des besoins émotionnels profonds — sécurité,
                réconfort, contrôle, apaisement. C'est pour ça que la volonté seule ne suffit pas.
              </p>
              <p>
                L'hypnose va directement à cette source : elle dialogue avec l'inconscient pour comprendre
                le besoin que remplit ce comportement et proposer une réponse plus juste.
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

      {/* Types de troubles */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Les situations que j&apos;accompagne</h2>
          <div className="sp-grid-2">
            {troubles.map((t) => (
              <Link key={t.href} to={t.href} className="sp-card sp-card--link reveal">
                <div className="sp-card__title">{t.title} <span aria-hidden="true">→</span></div>
                <div className="sp-card__desc">{t.desc}</div>
              </Link>
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
              <div className="section-tag">Mécanisme — transformer le rapport à soi</div>
              <h2 className="section-title">L&apos;hypnose transforme<br/><em>le lien nourriture–émotion.</em></h2>
              <p>
                L'hypnose ericksonienne ne lutte pas contre le comportement alimentaire. Elle libère
                le besoin émotionnel qui le maintient. En état d'hypnose, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier le déclencheur émotionnel derrière chaque comportement",
                  "Dissocier la nourriture des émotions difficiles (stress, ennui, tristesse)",
                  "Reconnecter votre inconscient aux signaux naturels de faim et de satiété",
                  "Apaiser l'image corporelle et le regard sur soi",
                  "Installer un rapport plus intuitif et serein à l'alimentation",
                  "Trouver des réponses émotionnelles alternatives à la nourriture"
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
              <div className="sp-case__title">Compulsions alimentaires nocturnes</div>
              <p>
                Sophie*, 41 ans, rentrait du travail et mangeait compulsivement devant son écran. Elle
                n'avait pas faim — mais quelque chose en elle cherchait à décompresser après des journées
                stressantes.
              </p>
              <p>
                En 3 séances, nous avons travaillé sur le mécanisme stress–nourriture. Sophie a progressivement
                retrouvé d'autres façons de se déposer le soir, sans passer par la nourriture.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Cycles restriction–compulsion</div>
              <p>
                Élise*, 29 ans, alternait régimes stricts et crises de boulimie depuis ses 20 ans. Ce cycle
                épuisant générait une honte immense et un sentiment de perte de contrôle total.
              </p>
              <p>
                En 5 séances d'hypnose ericksonienne, nous avons travaillé sur la relation à la nourriture
                et à son corps. Les crises ont diminué progressivement, remplacées par une alimentation
                plus intuitive et apaisée.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Grignotages au bureau</div>
              <p>
                Nicolas*, 35 ans, grignotait en continu au bureau — chocolat, biscuits, café sucré — sans
                s'en rendre compte. Ce comportement automatique était lié à l'anxiété de performance.
              </p>
              <p>
                En 2 séances, nous avons neutralisé le lien anxiété–nourriture. Nicolas a retrouvé la
                capacité de travailler sans avoir besoin de manger en permanence.
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
              { value: '3-5', label: 'séances pour transformer en profondeur votre rapport à la nourriture' },
              { value: '100%', label: 'personnalisé selon votre histoire et vos mécanismes émotionnels' },
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
          <h2 className="sp-h2">Questions fréquentes sur l&apos;hypnose et les troubles alimentaires</h2>
          <div>
            {troublesAlimentairesFaqItems.map((item, i) => (
              <div key={i} className={`faq__item${openFaq === i ? ' open' : ''}`}>
                <button className="faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.question}
                  <span className="faq__icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="faq__a">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sp-ext-section">
        <SpecialtyBlogArticles
          keywords={["alimentation", "comportement alimentaire", "boulimie"]}
          title="Articles sur le rapport à la nourriture et au corps"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-troubles-alimentaires-paris"
          pageTitle="Hypnose pour les troubles alimentaires à Paris"
          pageDescription="Hypnose ericksonienne pour transformer le rapport à la nourriture — compulsions, boulimie, alimentation émotionnelle — au cabinet Paris 4ème."
          topic="les troubles du comportement alimentaire"
          dateModified="2026-06-12"
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
          <h2 className="sp-h2">Retrouvez un rapport serein à la nourriture</h2>
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
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/hypnose-blocages-paris">Blocages &amp; comportements →</Link>
            <Link to="/hypnose-gestion-emotions-paris">Gestion des émotions →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseTroublesAlimentairesParis;
