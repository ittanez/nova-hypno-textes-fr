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

const boulimieFaqItems = [
  {
    question: "L'hypnose peut-elle aider contre la boulimie ?",
    answer: "Oui, et c'est un accompagnement qui demande une approche profonde, pas seulement symptomatique. La boulimie n'est pas un problème d'alimentation — c'est une façon de gérer une douleur intérieure, souvent ancienne. L'hypnose permet d'aller à la source de cette douleur : les blessures émotionnelles non intégrées, les situations de perte de contrôle, les émotions qui ne trouvent pas d'autre sortie. Elle travaille là où les approches cognitives ou diététiques seules ne parviennent pas. Je vous accompagne avec bienveillance, sans jugement, à votre rythme."
  },
  {
    question: "La boulimie peut-elle être traitée sans hospitalisation ?",
    answer: "Dans de nombreux cas, oui. Lorsque la boulimie n'entraîne pas de complications médicales graves (dénutrition sévère, troubles cardiaques liés aux purges), un suivi en ambulatoire combinant hypnose et, si besoin, psychothérapie peut être suffisant et efficace. Si votre situation nécessite un suivi médical ou psychiatrique, je vous orienterai en toute transparence vers des confrères ou structures adaptées. L'hypnose peut s'intégrer dans un parcours de soin pluridisciplinaire."
  },
  {
    question: "Combien de séances pour accompagner la boulimie ?",
    answer: "Plus que pour d'autres problématiques, la boulimie nécessite en général un suivi sur la durée — entre 6 et 12 séances selon les personnes. Les premières séances visent à créer un espace sécurisant, à comprendre les déclencheurs et à apporter un soulagement des crises. Les séances suivantes travaillent en profondeur les blessures sous-jacentes. Je ne fixe pas un nombre à l'avance — nous avançons ensemble à votre rythme."
  },
  {
    question: "L'hypnose agit-elle sur les crises de boulimie elles-mêmes ?",
    answer: "Oui. L'état de transe hypnotique permet de travailler directement sur les déclencheurs émotionnels des crises — les émotions qui montent, le vide intérieur, la tension irrépressible. Nous travaillons à installer des « pauses » intérieures avant la crise, à modifier la relation à ces états émotionnels, et à nourrir autrement des besoins que la nourriture cherchait à satisfaire. La réduction de la fréquence et de l'intensité des crises est souvent l'un des premiers effets observés."
  },
  {
    question: "Est-ce que je dois avoir honte de consulter pour la boulimie ?",
    answer: "Absolument pas. La boulimie est une souffrance réelle, souvent portée seul·e depuis des années, dans un silence qui l'aggrave. Consulter demande du courage, pas de la honte. Mon cabinet est un espace de bienveillance totale, sans jugement d'aucune sorte. Ce que vous vivez a du sens — et nous allons le comprendre ensemble pour que vous puissiez vous en libérer."
  }
];

const HypnoseBoulimieParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose boulimie Paris",
    "description": "Accompagnement par l'hypnose ericksonienne pour la boulimie à Paris 4ème ou en visio. Approche profonde, bienveillante, centrée sur les causes émotionnelles. Alain Zenatti, Maître Hypnologue.",
    "url": "https://novahypnose.fr/hypnose-boulimie-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie boulimie",
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
      { "@type": "ListItem", "position": 3, "name": "Boulimie", "item": "https://novahypnose.fr/hypnose-boulimie-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": boulimieFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Crises de consommation compulsive", desc: "Épisodes où vous mangez de grandes quantités en peu de temps, souvent seul·e, avec une impression de perte de contrôle totale" },
    { title: "Vide intérieur difficile à nommer", desc: "Une sensation creuse, diffuse, qui monte et qui appelle quelque chose — la nourriture répond à l'appel, temporairement" },
    { title: "Honte et secret", desc: "Vous cachez ces épisodes, vous avez honte, vous prometez que c'est la dernière fois — et ça recommence" },
    { title: "Comportements compensatoires", desc: "Vomissements, exercice excessif, jeûne — des tentatives de « réparer » ce qui vient de se passer" },
    { title: "Pensées obsessionnelles autour de la nourriture", desc: "La nourriture occupe une place démesurée dans vos pensées — ce que vous avez mangé, ce que vous allez manger, comment compenser" },
    { title: "Désorganisation du rapport au corps", desc: "Difficulté à percevoir la faim et la satiété, image corporelle douloureuse, relation conflictuelle avec votre corps" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose boulimie Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Accompagnement par l'hypnose pour la boulimie à Paris 4ème ou en visio. Approche profonde et bienveillante, centrée sur les causes émotionnelles. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose boulimie paris, traitement boulimie hypnose, arrêter boulimie hypnose, boulimie aide paris, hypnose compulsions alimentaires boulimie, boulimie hypnothérapie paris, boulimie traitement en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-boulimie-paris" />
        <meta property="og:title" content="Hypnose boulimie Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Accompagnement par l'hypnose pour la boulimie à Paris 4ème ou en visio. Approche profonde, bienveillante, sans jugement." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-boulimie-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose boulimie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose boulimie Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Accompagnement par l'hypnose pour la boulimie à Paris 4ème ou en visio. Approche profonde et bienveillante." />
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
          <div className="tag">Boulimie — Paris</div>
          <h1 className="sp-hero__h1">
            Se libérer de la boulimie —<br/><em>aller au cœur du problème</em>
          </h1>
          <p className="sp-hero__lead">
            La boulimie n'est pas un manque de volonté. C'est une douleur intérieure qui cherche
            une sortie. L'hypnose ne traite pas les symptômes — elle va à la source de ce qui
            génère les crises, avec <strong>bienveillance, profondeur et sans jugement</strong>,
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

      {/* Le problème — approche profonde */}
      <section className="sp-section">
        <div className="container">
          <div className="cabinet__grid reveal">
            <div className="cabinet__copy">
              <div className="section-tag">Boulimie — comprendre</div>
              <h2 className="section-title">Ce n'est pas la nourriture<br/><em>le vrai problème.</em></h2>
              <p>
                Les crises de boulimie ont une logique. Elles arrivent quand quelque chose devient
                insupportable à l'intérieur — une tension, un vide, une émotion trop grande —
                et que la nourriture est la seule issue disponible. Rapidement. Sans réfléchir.
              </p>
              <p>
                Ce mécanisme s'est mis en place à un moment de votre vie pour répondre à un besoin
                réel. L'hypnose ne cherche pas à le supprimer de force. Elle cherche à comprendre
                ce qu'il protège, à entendre ce qu'il dit — et à créer d'autres façons de répondre
                à ce besoin sans passer par la crise.
              </p>
              <p>
                C'est une approche qui respecte votre rythme, votre histoire, votre complexité.
                Il n'y a pas de solution rapide à la boulimie — mais il y a un chemin, et vous
                n'avez pas à le parcourir seul·e.
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
          <h2 className="sp-h2">Ce que vivent les personnes concernées</h2>
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
              <div className="section-tag">Approche — en profondeur</div>
              <h2 className="section-title">L'hypnose va là<br/><em>où les crises prennent racine.</em></h2>
              <p>
                L'accompagnement hypnothérapeutique pour la boulimie ne se contente pas de gérer
                les crises. En état de relaxation profonde, nous explorons ensemble :
              </p>
              <div className="sp-checklist">
                {[
                  "Les émotions déclencheuses des crises — ce qui monte juste avant",
                  "Les blessures ou situations passées qui ont installé ce mécanisme",
                  "Le besoin réel que la crise cherche à combler (réconfort, contrôle, anesthésie)",
                  "La relation à l'image de soi et au corps, souvent altérée",
                  "La honte et le secret qui isolent et aggravent le cycle",
                  "Des ressources intérieures pour traverser les moments difficiles autrement"
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

      {/* Témoignages */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Témoignages au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Trouver la source — au-delà des crises</div>
              <p>
                Céline*, 34 ans, vivait avec la boulimie depuis l'adolescence. Elle avait déjà suivi
                plusieurs thérapies qui l'avaient aidée à comprendre intellectuellement son fonctionnement,
                mais les crises continuaient. Elle voulait quelque chose qui « aille plus loin ».
              </p>
              <p>
                Ensemble, en état hypnotique, nous avons remonté à l'origine du mécanisme — une période
                de sa vie où la nourriture était devenue son seul espace de contrôle dans un environnement
                familial chaotique. Une fois cette blessure reconnue et intégrée, les crises ont
                progressivement perdu leur emprise. Elle a suivi 9 séances au total.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Briser le cycle honte-crise-honte</div>
              <p>
                Mathieu*, 27 ans, consultait pour la première fois et avait du mal à parler de sa boulimie.
                Il ne l'avait jamais dite à voix haute. La honte faisait partie du cycle : après chaque crise,
                elle descendait sur lui comme une chape — et c'était souvent la honte elle-même qui
                déclenchait la crise suivante.
              </p>
              <p>
                Le travail a commencé par déprogrammer la honte. À mesure que l'auto-jugement reculait,
                l'espace entre l'envie de crise et la crise elle-même s'est agrandi — et il a pu commencer
                à y faire des choix différents.
              </p>
            </div>
          </div>
          <p className="sp-footnote">* Prénoms modifiés pour préserver la confidentialité</p>
        </div>
      </section>

      {/* Citation */}
      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <blockquote className="sp-quote">
            <p>
              « La boulimie n'est pas une faiblesse de caractère. C'est une intelligence
              de survie qui a besoin d'évoluer. Mon rôle est de vous accompagner
              à comprendre ce qu'elle dit — et à ne plus avoir besoin d'elle. »
            </p>
            <cite>Alain Zenatti, Maître Hypnologue — NovaHypnose Paris</cite>
          </blockquote>
        </div>
      </section>

      {/* Stats */}
      <section className="sp-section">
        <div className="container sp-narrow">
          <div className="sp-stats">
            {[
              { value: '6-12', label: 'séances en moyenne pour un accompagnement en profondeur de la boulimie' },
              { value: '100%', label: 'bienveillance et confidentialité, sans jugement d\'aucune sorte' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la boulimie</h2>
          <div>
            {boulimieFaqItems.map((item, i) => (
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
          keywords={["boulimie", "troubles alimentaires", "compulsions alimentaires", "alimentation émotionnelle"]}
          title="Articles sur la boulimie et les troubles alimentaires"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-boulimie-paris"
          pageTitle="Hypnose pour la boulimie à Paris"
          pageDescription="Accompagnement hypnothérapeutique pour la boulimie au cabinet Paris 4ème ou en visio. Approche profonde centrée sur les causes émotionnelles."
          topic="la boulimie et les troubles du comportement alimentaire"
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
              authors: "Vanderlinden J, Vandereycken W",
              title: "The use of hypnosis in the treatment of bulimia nervosa",
              source: "International Journal of Clinical and Experimental Hypnosis",
              year: 1990,
              url: "https://pubmed.ncbi.nlm.nih.gov/2081852/",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Faire le premier pas — c'est déjà beaucoup.</h2>
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
            <Link to="/hypnose-alimentation-emotionnelle-paris">Alimentation émotionnelle →</Link>
            <Link to="/hypnose-image-corporelle-paris">Image corporelle →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseBoulimieParis;
