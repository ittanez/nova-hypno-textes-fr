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

const troublesEmotionnelsFaqItems = [
  {
    question: "Comment l'hypnose aide-t-elle à gérer la colère ?",
    answer: "L'hypnose traite la colère en agissant sur deux niveaux. D'abord, elle identifie les déclencheurs inconscients qui provoquent des réactions disproportionnées — souvent liés à des blessures anciennes ou des schémas familiaux. Ensuite, elle reprogramme votre réponse automatique : au lieu de l'explosion, votre inconscient apprend à prendre du recul et à canaliser l'énergie de la colère de façon constructive. Vous ne devenez pas insensible — vous récupérez simplement le choix de votre réaction."
  },
  {
    question: "L'hypnose peut-elle aider à traverser un deuil ou une séparation ?",
    answer: "Oui, l'hypnose est un accompagnement précieux dans le processus de deuil ou de séparation. Elle ne cherche pas à effacer la tristesse, qui est une émotion saine et nécessaire, mais à débloquer les mécanismes qui empêchent le deuil de suivre son cours naturel : culpabilité, colère non exprimée, sentiment d'inachevé. L'hypnose permet aussi de transformer la relation avec la mémoire ou avec la personne, pour passer d'une douleur envahissante à une tristesse apaisée."
  },
  {
    question: "L'hypnose est-elle adaptée aux personnes hypersensibles ?",
    answer: "L'hypnose est particulièrement bien adaptée aux personnes hypersensibles, qui sont d'ailleurs souvent très réceptives à l'approche ericksonienne. L'hypersensibilité n'est pas un problème à corriger, mais une richesse à canaliser. L'hypnose vous aide à mettre en place des filtres naturels pour ne plus être submergé(e) par les stimuli émotionnels, tout en conservant votre profondeur de perception et votre empathie. C'est un travail de régulation, pas de suppression."
  },
  {
    question: "L'hypnose peut-elle soulager la charge émotionnelle et le sentiment d'épuisement ?",
    answer: "Oui. La charge émotionnelle — ce sentiment d'être constamment débordé par les émotions des autres, par les situations, par vos propres ressentis — est l'une des problématiques que l'hypnose accompagne bien. Elle travaille à alléger le poids accumulé, à restaurer des frontières émotionnelles saines et à réduire la perméabilité excessive aux émotions extérieures. Beaucoup de patients décrivent un sentiment de légèreté après les séances."
  },
  {
    question: "Combien de séances d'hypnose pour retrouver un équilibre émotionnel ?",
    answer: "En général, 3 à 5 séances permettent de retrouver un équilibre émotionnel durable. La première séance apporte déjà un soulagement en identifiant les mécanismes en jeu et en initiant le travail de régulation. Les séances suivantes consolident les changements et traitent les différentes facettes de la problématique. Pour un deuil ou une charge émotionnelle très ancienne, un accompagnement un peu plus long peut être bénéfique."
  }
];

const HypnoseTroublesEmotionnelsParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose troubles émotionnels Paris",
    "description": "Accompagnement des troubles émotionnels par l'hypnose ericksonienne à Paris 4ème ou en visio. Colère, deuil, hypersensibilité, frustration chronique, charge émotionnelle.",
    "url": "https://novahypnose.fr/hypnose-troubles-emotionnels-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie troubles émotionnels",
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
      { "@type": "ListItem", "position": 2, "name": "Gestion des émotions", "item": "https://novahypnose.fr/hypnose-gestion-emotions-paris" },
      { "@type": "ListItem", "position": 3, "name": "Troubles émotionnels", "item": "https://novahypnose.fr/hypnose-troubles-emotionnels-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": troublesEmotionnelsFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const troubles = [
    { title: "Colère et irritabilité", desc: "Réactions disproportionnées, explosions incontrôlées, irritabilité chronique qui abîme vos relations", href: "/hypnose-colere-paris" },
    { title: "Deuil et séparation", desc: "Perte d'un proche, rupture amoureuse — difficultés à traverser le deuil et à avancer", href: "/hypnose-deuil-separation-paris" },
    { title: "Hypersensibilité", desc: "Vous ressentez tout plus intensément, vous vous sentez submergé(e) par les émotions des autres et par les vôtres", href: "/hypnose-hypersensibilite-paris" },
    { title: "Frustration chronique", desc: "Un sentiment permanent d'insatisfaction, de ne jamais avoir assez, de ne pas être à votre place", href: "/hypnose-frustration-chronique-paris" },
    { title: "Charge émotionnelle", desc: "Épuisement par l'accumulation des émotions non digérées, poids intérieur difficile à porter", href: "/hypnose-charge-emotionnelle-paris" },
    { title: "Anxiété émotionnelle", desc: "Pour l'anxiété et le stress, consultez notre page dédiée — un travail spécifique est proposé", href: "/hypnose-stress-anxiete-paris" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose troubles émotionnels Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Accompagnement des troubles émotionnels par l'hypnose à Paris 4ème ou en visio. Colère, deuil, hypersensibilité, frustration chronique, charge émotionnelle. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose troubles émotionnels paris, hypnose colère paris, hypnose deuil paris, hypnose hypersensibilité paris, hypnose frustration chronique, charge émotionnelle hypnose paris, régulation émotionnelle hypnose, hypnose troubles émotionnels en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-troubles-emotionnels-paris" />
        <meta property="og:title" content="Hypnose troubles émotionnels Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Accompagnement des troubles émotionnels par l'hypnose à Paris 4ème ou en visio. Colère, deuil, hypersensibilité, frustration chronique, charge émotionnelle." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-troubles-emotionnels-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose troubles émotionnels" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose troubles émotionnels Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Accompagnement des troubles émotionnels par l'hypnose à Paris 4ème ou en visio. Colère, deuil, hypersensibilité, charge émotionnelle." />
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
          <div className="tag">Troubles émotionnels — Paris</div>
          <h1 className="sp-hero__h1">
            Retrouvez votre équilibre<br/><em>émotionnel</em>
          </h1>
          <p className="sp-hero__lead">
            Colère incontrôlée, deuil qui n'avance pas, hypersensibilité épuisante, frustration chronique,
            charge émotionnelle — ces déséquilibres ne sont pas une fatalité. L'hypnose agit sur les
            <strong> mécanismes inconscients</strong> qui les maintiennent, au cabinet à Paris 4ème ou en
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
              <div className="section-tag">Troubles émotionnels — comprendre</div>
              <h2 className="section-title">Ressentir sans<br/><em>être submergé(e).</em></h2>
              <p>
                Les émotions ne sont pas un problème — elles sont une information précieuse sur ce dont
                vous avez besoin. Le problème, c'est quand elles vous submergent, quand elles durent
                trop longtemps, quand elles sont disproportionnées, ou quand elles s'accumulent
                sans pouvoir être digérées.
              </p>
              <p>
                Ces déséquilibres émotionnels sont souvent maintenus par des <strong>programmes inconscients</strong> :
                des façons automatiques de réagir, héritées de votre histoire, qui amplifient ou bloquent
                le flux naturel des émotions.
              </p>
              <p>
                L'hypnose dialogue avec ces programmes pour restaurer une régulation émotionnelle naturelle.
                Vous continuez à ressentir — mais avec une capacité à choisir comment vous y répondez.
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
          <h2 className="sp-h2">Les troubles émotionnels que j'accompagne</h2>
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
              <div className="section-tag">Mécanisme — réguler sans supprimer</div>
              <h2 className="section-title">L'hypnose transforme<br/><em>votre rapport aux émotions.</em></h2>
              <p>
                L'hypnose ericksonienne ne supprime pas les émotions. Elle vous aide à les traverser plutôt
                qu'à en être prisonnier. En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier les déclencheurs émotionnels inconscients et leur origine",
                  "Libérer les émotions bloquées ou figées (deuil, colère non exprimée)",
                  "Réduire l'intensité des réactions disproportionnées",
                  "Installer des filtres naturels pour ne plus être submergé(e)",
                  "Restaurer la capacité à ressentir sans être envahi(e)",
                  "Développer des ressources intérieures de régulation émotionnelle"
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
              <div className="sp-case__title">Colère chronique — retrouver le choix</div>
              <p>
                Laurent*, 44 ans, explosait régulièrement chez lui et au travail pour des raisons qui
                semblaient dérisoires. Il savait que sa réaction était disproportionnée — mais ne pouvait
                pas s'en empêcher.
              </p>
              <p>
                En hypnose, nous avons retracé les racines de cette colère à une période de l'enfance
                où il ne se sentait pas entendu. Après 4 séances, il réagissait différemment — non pas
                en supprimant sa colère, mais en choisissant comment l'exprimer.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Deuil figé — traverser la perte</div>
              <p>
                Isabelle*, 52 ans, avait perdu sa mère deux ans auparavant. Elle n'arrivait pas à
                avancer — la culpabilité et des choses non dites bloquaient le processus. Elle se
                sentait figée dans la douleur.
              </p>
              <p>
                En 5 séances d'hypnose, nous avons travaillé sur ce qui était resté suspendu. Elle
                a pu traverser le deuil et garder une mémoire apaisée de sa relation avec sa mère.
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
              { value: '3-5', label: 'séances pour retrouver un équilibre émotionnel durable' },
              { value: '100%', label: 'personnalisé selon vos émotions spécifiques et leur histoire' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et les troubles émotionnels</h2>
          <div>
            {troublesEmotionnelsFaqItems.map((item, i) => (
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
          keywords={["colère", "deuil", "hypersensibilité", "émotions", "régulation émotionnelle"]}
          title="Articles sur les troubles émotionnels"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-troubles-emotionnels-paris"
          pageTitle="Hypnose pour les troubles émotionnels à Paris"
          pageDescription="Hypnose ericksonienne pour accompagner les troubles émotionnels — colère, deuil, hypersensibilité, frustration, charge émotionnelle — au cabinet Paris 4ème ou en visio."
          topic="les troubles émotionnels et la régulation émotionnelle"
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
          <h2 className="sp-h2">Prêt à retrouver votre équilibre émotionnel ?</h2>
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
            <Link to="/hypnose-gestion-emotions-paris">Gestion des émotions →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Stress & Anxiété →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/hypnose-blocages-paris">Blocages & Comportements →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseTroublesEmotionnelsParis;
