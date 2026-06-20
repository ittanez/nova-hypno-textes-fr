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

const compulsionsFaqItems = [
  {
    question: "L'hypnose peut-elle vraiment arrêter les compulsions alimentaires ?",
    answer: "Oui. Les compulsions alimentaires — ces envies soudaines et incontrôlables de manger en dehors des repas — sont des comportements pilotés par l'inconscient en réponse à une tension émotionnelle. L'hypnose identifie le déclencheur émotionnel (stress, ennui, anxiété, tristesse) et propose à l'inconscient des réponses alternatives. En 3 à 5 séances, la fréquence et l'intensité des compulsions diminuent significativement."
  },
  {
    question: "Pourquoi les régimes ne résolvent-ils pas les compulsions alimentaires ?",
    answer: "Parce que les compulsions ne sont pas un problème de discipline alimentaire — elles sont un problème émotionnel. Un régime peut vous dire quoi ne pas manger, mais il ne traite pas la raison pour laquelle vous mangez sans faim. Sans traitement de la cause émotionnelle, les compulsions reviennent dès que la restriction cesse. L'hypnose s'attaque à cette cause, ce qui rend les changements alimentaires durables."
  },
  {
    question: "Comment différencier une vraie faim d'une compulsion alimentaire ?",
    answer: "La vraie faim arrive progressivement, elle est physique (creux dans l'estomac), elle peut attendre un peu et est satisfaite par n'importe quel aliment. La compulsion arrive brusquement, est souvent dirigée vers un aliment spécifique (sucre, chips, chocolat), est liée à un état émotionnel et pousse à manger rapidement et en grande quantité. L'hypnose vous aide à reconnecter votre inconscient à ces signaux naturels que les comportements compulsifs ont brouillés."
  },
  {
    question: "Combien de séances d'hypnose pour traiter les compulsions alimentaires ?",
    answer: "En général, 3 à 5 séances permettent une amélioration significative. La première séance identifie les déclencheurs émotionnels spécifiques. Les séances suivantes travaillent à modifier ces mécanismes et à installer de nouvelles réponses. Beaucoup de patients constatent une réduction des compulsions dès la deuxième ou troisième séance."
  },
  {
    question: "Les séances d'hypnose pour les compulsions alimentaires peuvent-elles se faire en visio ?",
    answer: "Oui, les séances en visioconférence sont aussi efficaces qu'en cabinet. Pour les compulsions alimentaires, certains patients trouvent même la séance à domicile plus adaptée : ils sont dans l'environnement où les comportements se produisent, ce qui peut faciliter l'identification des déclencheurs. L'état hypnotique s'atteint parfaitement à distance."
  }
];

const HypnoseCompulsionsAlimentairesParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose compulsions alimentaires Paris",
    "description": "Traitement des compulsions alimentaires par l'hypnose ericksonienne à Paris 4ème ou en visio. Envies incontrôlables, craving, eating compulsif — agir sur la cause émotionnelle.",
    "url": "https://novahypnose.fr/hypnose-compulsions-alimentaires-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie compulsions alimentaires",
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
      { "@type": "ListItem", "position": 3, "name": "Compulsions alimentaires", "item": "https://novahypnose.fr/hypnose-compulsions-alimentaires-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": compulsionsFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Envies soudaines et irrésistibles", desc: "Une impulsion surgit sans prévenir — vous avez besoin de manger maintenant, même sans faim" },
    { title: "Manger sans s'en rendre compte", desc: "Vous vous retrouvez en train de manger sans avoir décidé de le faire, souvent devant un écran" },
    { title: "Compulsions le soir", desc: "Après le travail, en rentrant, la nourriture s'impose comme seul moyen de décompresser" },
    { title: "Craving pour des aliments spécifiques", desc: "Toujours le même type d'aliment : sucré, gras, salé — peu importe, mais il faut ça" },
    { title: "Culpabilité après la crise", desc: "Une fois le comportement accompli, la culpabilité s'installe immédiatement — sans empêcher la prochaine fois" },
    { title: "Manger sans faim, incapable de s'arrêter", desc: "Vous continuez à manger même rassasié, jusqu'à l'inconfort physique" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose compulsions alimentaires Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous des compulsions alimentaires par l'hypnose à Paris 4ème ou en visio. L'hypnose traite la cause émotionnelle, pas le symptôme. Alain Zenatti, Maître Hypnologue Paris." />
        <meta name="keywords" content="hypnose compulsions alimentaires paris, traitement compulsions alimentaires hypnose, craving alimentaire hypnose paris, manger compulsivement hypnose, envies incontrôlables nourriture hypnose paris, hypnose compulsions alimentaires en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-compulsions-alimentaires-paris" />
        <meta property="og:title" content="Hypnose compulsions alimentaires Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous des compulsions alimentaires par l'hypnose à Paris 4ème ou en visio. L'hypnose traite la cause émotionnelle." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-compulsions-alimentaires-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose compulsions alimentaires" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose compulsions alimentaires Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous des compulsions alimentaires par l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Compulsions alimentaires — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous des compulsions<br/><em>alimentaires</em>
          </h1>
          <p className="sp-hero__lead">
            Envies irrésistibles de manger sans faim, craving incontrôlable, manger compulsivement le soir —
            ces comportements ne sont pas un manque de volonté. Ce sont des <strong>réponses inconscientes
            à des émotions</strong> que l'hypnose peut transformer, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Compulsions alimentaires — comprendre</div>
              <h2 className="section-title">Ce n'est pas<br/><em>de la gourmandise.</em></h2>
              <p>
                Vous n'êtes pas en train de céder à la tentation. Vous êtes en train de répondre, inconsciemment,
                à un signal émotionnel interne — stress, anxiété, ennui, solitude — que quelque chose en vous
                a appris à gérer avec la nourriture.
              </p>
              <p>
                Ce mécanisme s'est installé à un moment de votre vie où manger était la réponse la plus
                accessible à un besoin émotionnel. L'inconscient l'a enregistré comme solution. Et il la
                reproduit automatiquement, <strong>sans vous consulter</strong>.
              </p>
              <p>
                L'hypnose dialogue avec cet automatisme pour identifier la vraie demande émotionnelle
                et proposer des réponses plus adaptées. La compulsion perd sa raison d'être.
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
              <div className="section-tag">Mécanisme — dissocier émotion et nourriture</div>
              <h2 className="section-title">L'hypnose dénoue<br/><em>le lien émotion–nourriture.</em></h2>
              <p>
                L'hypnose ericksonienne ne vous force pas à ne plus manger. Elle rend la compulsion inutile
                en traitant ce qu'elle cherchait à soulager. En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier les émotions déclencheuses et les contextes à risque",
                  "Dissocier l'émotion difficile de la réponse alimentaire automatique",
                  "Installer de nouvelles stratégies de régulation émotionnelle",
                  "Reconnecter votre inconscient aux vrais signaux de faim et de satiété",
                  "Réduire l'intensité du craving (envie compulsive) à sa source",
                  "Ancrer un rapport plus serein à la nourriture et à vos émotions"
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
              <div className="sp-case__title">Compulsions nocturnes — décompresser autrement</div>
              <p>
                Sophie*, 41 ans, rentrait du travail et mangeait compulsivement devant son écran. Elle
                n'avait pas faim — mais quelque chose en elle cherchait à décompresser après des journées
                épuisantes. Les compulsions avaient lieu quasiment chaque soir.
              </p>
              <p>
                En 3 séances, nous avons travaillé sur le lien entre l'anxiété de performance et la nourriture.
                Sophie a progressivement trouvé d'autres façons de se déposer le soir. Les compulsions ont
                considérablement diminué puis cessé.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Craving sucré chronique</div>
              <p>
                Maxime*, 33 ans, avait des impulsions vers le sucre à chaque baisse de concentration
                au bureau. Chocolat, biscuits, bonbons — il avait essayé d'éliminer ces aliments sans succès.
              </p>
              <p>
                En hypnose, nous avons identifié que le sucre compensait un manque d'intérêt dans son
                travail actuel. Une fois cette insatisfaction adressée, l'attrait compulsif pour le sucré
                s'est réduit naturellement.
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
              { value: '3-5', label: 'séances pour réduire significativement les compulsions alimentaires' },
              { value: '100%', label: 'personnalisé selon vos déclencheurs et votre histoire émotionnelle' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et les compulsions alimentaires</h2>
          <div>
            {compulsionsFaqItems.map((item, i) => (
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
          keywords={["compulsions alimentaires", "craving", "eating compulsif", "nourriture émotionnelle"]}
          title="Articles sur les compulsions alimentaires"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-compulsions-alimentaires-paris"
          pageTitle="Hypnose pour les compulsions alimentaires à Paris"
          pageDescription="Hypnose ericksonienne pour traiter les compulsions alimentaires et le craving au cabinet Paris 4ème ou en visio."
          topic="les compulsions alimentaires et l'alimentation émotionnelle"
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
          <h2 className="sp-h2">Prêt à retrouver un rapport serein à la nourriture ?</h2>
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
            <Link to="/hypnose-grignotage-paris">Grignotage chronique →</Link>
            <Link to="/hypnose-alimentation-emotionnelle-paris">Alimentation émotionnelle →</Link>
            <Link to="/hypnose-addiction-sucre-paris">Addiction au sucre →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseCompulsionsAlimentairesParis;
