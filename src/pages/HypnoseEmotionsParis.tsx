import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import SpecialtyReferences from '@/components/SpecialtyReferences';
import { emotionsFaqItems } from '@/data/specialtyFaqData';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const HypnoseEmotionsParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour la gestion des émotions à Paris",
    "description": "Apprenez à gérer vos émotions grâce à l'hypnose ericksonienne à Paris. Colère, hypersensibilité, deuil, frustration. Cabinet Paris 4ème Marais-Bastille.",
    "url": "https://novahypnose.fr/hypnose-gestion-emotions-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie gestion des émotions",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose gestion des émotions Paris", "item": "https://novahypnose.fr/hypnose-gestion-emotions-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": emotionsFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const emotionTypes = [
    { title: "Colère et irritabilité", desc: "Réactions disproportionnées, explosions de colère, impatience permanente" },
    { title: "Hypersensibilité", desc: "Émotions amplifiées, pleurs faciles, sensation d'être submergé(e)" },
    { title: "Deuil et séparation", desc: "Difficulté à surmonter une perte, une rupture ou un changement de vie" },
    { title: "Frustration chronique", desc: "Sentiment d'insatisfaction permanent, difficulté à accepter les situations" },
    { title: "Anxiété émotionnelle", desc: "Peur d'être submergé(e) par ses émotions, évitement des situations intenses" },
    { title: "Charge émotionnelle", desc: "Accumulation d'émotions non exprimées, sensation de trop-plein" }
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose gestion des émotions à Paris et en ligne | Alain Zenatti</title>
        <meta name="description" content="Gérez vos émotions par l'hypnose à Paris 4ème ou en visio partout en France. Colère, hypersensibilité, deuil, frustration. Alain Zenatti, Maître Hypnologue. Résultats en 3 à 5 séances." />
        <meta name="keywords" content="hypnose gestion émotions paris, hypnose colère paris, hypersensibilité hypnose paris, deuil hypnose paris, débordement émotionnel hypnose, gestion colère hypnothérapie paris, hypnose émotions paris, hypnose émotions en ligne, séance hypnose émotions visio France, hypnose gestion émotions à distance, téléconsultation hypnose émotions" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-gestion-emotions-paris" />
        <meta property="og:title" content="Hypnose gestion des émotions à Paris et en ligne | Alain Zenatti" />
        <meta property="og:description" content="Gérez vos émotions par l'hypnose à Paris 4ème ou en visio partout en France. Colère, hypersensibilité, deuil, frustration. Alain Zenatti, Maître Hypnologue. Résultats en 3 à 5 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-gestion-emotions-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose gestion des émotions" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose gestion des émotions à Paris et en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Gérez vos émotions par l'hypnose à Paris 4ème ou en visio partout en France. Colère, hypersensibilité, deuil, frustration. Alain Zenatti, Maître Hypnologue. Résultats en 3 à 5 séances." />
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
          <div className="tag">Gestion des Émotions — Paris</div>
          <h1 className="sp-hero__h1">
            Retrouvez l'équilibre<br/><em>par l'hypnose</em>
          </h1>
          <p className="sp-hero__lead">
            Colère incontrôlable, hypersensibilité, deuil difficile, frustration permanente…
            Vos émotions vous submergent et vous ne savez plus comment les gérer ?
            L'hypnose vous aide à <strong>retrouver un équilibre émotionnel durable</strong>, au
            cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
      <section className="sp-section sp-deco-wrap">
        <svg className="sp-deco-blob sp-deco-blob--right" width="380" height="420" viewBox="0 0 380 420" aria-hidden="true">
          <g filter="url(#riso-full)">
            <path d="M 80 50 C 200 10, 340 50, 360 160 C 375 250, 320 330, 350 390 C 365 430, 290 445, 190 435 C 80 423, 20 400, 10 310 C 0 220, 30 120, 80 50 Z" fill="#F2A12E" opacity="0.55" />
          </g>
          <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
            <path d="M 130 140 C 230 100, 320 140, 330 240 C 338 320, 270 375, 180 370 C 90 365, 50 295, 65 210 C 73 163, 100 156, 130 140 Z" fill="#2B4BA0" opacity="0.3" />
          </g>
          <rect width="380" height="420" filter="url(#paperGrain)" opacity=".15" />
        </svg>
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Vos émotions prennent le dessus ?</h2>
          <div className="sp-prose">
            <p>
              Une remarque anodine et vous explosez de colère. Un souvenir et les larmes montent
              sans prévenir. Vous vous sentez à fleur de peau, comme si tout était amplifié.
            </p>
            <p>
              L'hypersensibilité, les accès de colère, la difficulté à faire un deuil, la frustration
              chronique — ces difficultés ne sont pas un signe de faiblesse. Ce sont des <strong>réactions
              émotionnelles automatiques</strong> que votre inconscient a mises en place pour
              vous protéger.
            </p>
            <p>
              Le problème, c'est que ces mécanismes qui vous protégeaient autrefois vous empêchent
              aujourd'hui de vivre sereinement. L'hypnose permet de les recalibrer.
            </p>
          </div>
        </div>
      </section>

      {/* Types d'émotions */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Les troubles émotionnels que je traite</h2>
          <div className="sp-grid-2">
            {emotionTypes.map((t, i) => (
              <div key={i} className="sp-card reveal">
                <div className="sp-card__title">{t.title}</div>
                <div className="sp-card__desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment l'hypnose agit */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Comment l'hypnose régule vos émotions</h2>
          <div className="sp-prose">
            <p>
              L'hypnose ericksonienne ne supprime pas vos émotions — elle vous apprend à les vivre
              sans en être prisonnier. En accédant à votre inconscient, elle permet de :
            </p>
          </div>
          <div className="sp-checklist">
            {[
              "Identifier les déclencheurs émotionnels inconscients",
              "Retraiter les expériences passées qui amplifient vos réactions",
              "Installer des mécanismes de régulation naturels",
              "Développer votre capacité à ressentir sans être submergé(e)",
              "Transformer la colère et la frustration en énergie constructive",
              "Accompagner le processus de deuil en douceur"
            ].map((item, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cas concrets */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Exemples de parcours au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Colères incontrôlables</div>
              <p>
                David*, chef de projet, explosait régulièrement au travail et à la maison. Ses accès
                de colère disproportionnés abîmaient ses relations avec sa compagne et ses collègues.
              </p>
              <p>
                En 4 séances d'hypnose dans mon cabinet du Marais, nous avons identifié l'origine
                de cette colère — une blessure d'enfance non traitée — et retraité la mémoire
                émotionnelle. David réagit désormais de manière proportionnée.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Deuil difficile</div>
              <p>
                Anne*, 50 ans, était figée dans son deuil depuis la perte de sa mère un an plus tôt.
                Elle ne parvenait plus à éprouver de joie, s'isolait, et avait perdu tout intérêt
                pour ses activités.
              </p>
              <p>
                En 5 séances d'hypnose ericksonienne, nous avons accompagné le processus de deuil en
                douceur, en transformant la douleur en souvenirs apaisés. Anne a retrouvé progressivement goût à la vie.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Hypersensibilité envahissante</div>
              <p>
                Sarah*, infirmière, absorbait les émotions de ses patients comme une éponge. Le soir,
                elle était vidée, submergée par les émotions des autres au point de ne plus savoir
                distinguer les siennes.
              </p>
              <p>
                En 3 séances, nous avons installé une &laquo;&nbsp;bulle de protection émotionnelle&nbsp;&raquo;
                lui permettant de rester empathique sans être envahie. Sarah continue d'exercer
                avec passion, sans se vider émotionnellement.
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
              Découvrir le travail de Alain Zenatti est une expérience marquante. J'ai laissé derrière moi certaines
              croyances figées et j'ai ouvert un espace intérieur plus souple, plus libre.
              Me voilà en adéquation avec mon présent et les envies que je croyais inaccessibles.
            </p>
            <footer>— Edward, avis Google vérifié</footer>
          </blockquote>
        </div>
      </section>

      {/* Stats */}
      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <div className="sp-stats">
            {[
              { value: '3-5', label: 'séances pour un équilibre émotionnel durable' },
              { value: '100%', label: 'personnalisé selon votre vécu et vos émotions' },
              { value: '5/5', label: 'note moyenne sur Resalib et Google — plus de 40 avis vérifiés' },
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
      <section className="sp-section sp-section--alt sp-deco-wrap">
        <svg className="sp-deco-blob sp-deco-blob--left" width="340" height="380" viewBox="0 0 340 380" aria-hidden="true">
          <g filter="url(#riso-full)">
            <path d="M 70 80 C 170 30, 300 70, 320 170 C 335 250, 280 320, 250 360 C 230 390, 150 390, 80 360 C 20 335, -10 260, 10 180 C 25 115, 60 100, 70 80 Z" fill="#2B4BA0" opacity="0.45" />
          </g>
          <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
            <path d="M 110 150 C 200 110, 280 155, 285 240 C 290 315, 230 365, 155 358 C 80 350, 45 285, 60 205 C 69 160, 90 160, 110 150 Z" fill="#F2A12E" opacity="0.25" />
          </g>
          <rect width="340" height="380" filter="url(#paperGrain)" opacity=".15" />
        </svg>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et les émotions</h2>
          <div>
            {emotionsFaqItems.map((item, i) => (
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
          keywords={["émotion", "colère", "amoureux", "deuil"]}
          title="Articles sur les émotions"
          accentColor="text-rose-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-gestion-emotions-paris"
          pageTitle="Hypnose gestion des émotions à Paris"
          pageDescription="Hypnose ericksonienne pour la gestion des émotions : colère, hypersensibilité, deuil, frustration. Cabinet Paris 4ème."
          topic="la gestion des émotions"
          dateModified="2026-05-06"
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
          <h2 className="sp-h2">Retrouvez la paix intérieure</h2>
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
            <Link to="/hypnose-phobies-paris">Hypnose et phobies →</Link>
            <Link to="/hypnose-sommeil-paris">Hypnose et sommeil →</Link>
            <Link to="/hypnose-blocages-paris">Blocages et comportements →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseEmotionsParis;
