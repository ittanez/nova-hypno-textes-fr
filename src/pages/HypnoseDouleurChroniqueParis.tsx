import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import HeroArt from '@/components/charte/HeroArt';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import SpecialtyReferences from '@/components/SpecialtyReferences';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const douleurFaqItems = [
  {
    question: "L'hypnose peut-elle supprimer ma douleur chronique ?",
    answer: "Je ne peux pas vous le promettre, et personne ne le peut honnêtement. L'hypnose ne traite pas la cause médicale d'une douleur. Elle peut, chez certaines personnes, modifier la façon dont la douleur est vécue : l'attention qu'on lui porte, la tension, l'anxiété et la fatigue qui l'accompagnent. L'effet varie d'une personne à l'autre."
  },
  {
    question: "Dois-je consulter un médecin avant de venir ?",
    answer: "Oui. Une douleur persistante doit d'abord être évaluée par un médecin, qui pose le diagnostic et propose un traitement. L'hypnose vient en complément : elle ne remplace ni un diagnostic, ni un traitement, et il ne faut jamais arrêter ou modifier un traitement sans l'avis de votre médecin."
  },
  {
    question: "Pour quelles douleurs l'hypnose peut-elle accompagner ?",
    answer: "L'accompagnement porte sur le vécu de la douleur, quelle que soit son origine médicale une fois le diagnostic posé : migraines, fibromyalgie, douleurs de dos, arthrose, douleurs après une opération ou un accident. Le travail se concentre sur ce qui est modifiable : le stress, la tension, le sommeil et la relation à la douleur."
  },
  {
    question: "Que dit la recherche sur l'hypnose et la douleur ?",
    answer: "Une méta-analyse de 2019 (Thompson et coll., 85 essais, 3 632 participants) montre un effet antalgique de l'hypnose sur des douleurs provoquées expérimentalement chez des volontaires, variable selon la sensibilité à l'hypnose ; les auteurs précisent que des données cliniques de qualité sont nécessaires pour la douleur chronique. Le rapport Inserm de 2015 retient surtout l'intérêt de l'hypnose pour la douleur lors d'actes médicaux et juge les données insuffisantes pour la plupart des autres usages."
  },
  {
    question: "Combien coûte une séance et peut-on la faire en visio ?",
    answer: "Une séance coûte 90 €, au cabinet à Paris 4e (16 rue Saint-Antoine, près de la station Bastille) ou en visio, ce qui peut être utile quand se déplacer est difficile. Le nombre de séances n'est pas fixé à l'avance : nous le faisons évoluer ensemble après la première séance."
  }
];

const HypnoseDouleurChroniqueParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose douleur chronique Paris",
    "description": "Accompagnement du vécu de la douleur chronique par l'hypnose ericksonienne, en complément d'un suivi médical. Cabinet Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-douleur-chronique-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie douleur chronique",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
      "name": "Au cabinet Paris 4ème ou en visioconférence (Google Meet)"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://novahypnose.fr" },
      { "@type": "ListItem", "position": 2, "name": "Douleur chronique", "item": "https://novahypnose.fr/hypnose-douleur-chronique-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": douleurFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Une douleur qui dure", desc: "Elle est là depuis des mois ou des années et occupe une grande partie de vos pensées" },
    { title: "Un cercle tension-douleur", desc: "Plus la douleur dure, plus le corps se contracte et plus elle semble s'intensifier" },
    { title: "Un sommeil abîmé", desc: "La douleur gêne l'endormissement ou fragmente les nuits, et la fatigue amplifie le ressenti" },
    { title: "L'anticipation et l'évitement", desc: "Vous renoncez à des activités par peur de déclencher une crise ou une aggravation" },
    { title: "Un moral qui s'use", desc: "Irritabilité, découragement, sentiment d'impuissance face à une douleur qui ne cède pas" },
    { title: "Des traitements qui soulagent à moitié", desc: "Vous suivez un traitement médical, mais il reste une part de douleur et de tension à accompagner" },
  ];

  const TITLE = "Hypnose douleur chronique à Paris 4e | NovaHypnose";
  const DESC = "Migraines, fibromyalgie, douleurs de dos : l'hypnose accompagne le vécu de la douleur, en complément d'un suivi médical. Paris 4e ou visio. 90 €.";

  return (
    <CzLayout>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="keywords" content="hypnose douleur chronique paris, hypnose fibromyalgie, hypnose migraine, hypnose douleur dos, hypnothérapeute douleur paris, hypnose antalgique" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-douleur-chronique-paris" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-douleur-chronique-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://novahypnose.fr/images/og-alain-zenatti.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content="https://novahypnose.fr/images/og-alain-zenatti.jpg" />
        <script type="application/ld+json">{safeJSONStringify(serviceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(faqSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(localBusinessSchema)}</script>
      </Helmet>

      <section className="sp-hero">
        <div className="sp-hero__bg" aria-hidden="true">
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
            <g filter="url(#riso-full)">
              <path d="M 200 60 C 400 20, 700 60, 900 160 C 1040 230, 1150 240, 1280 180 C 1360 140, 1440 170, 1440 250 L 1440 0 L 0 0 L 0 200 C 60 130, 130 80, 200 60 Z" fill="#F2A12E" opacity="0.9" />
            </g>
            <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
              <path d="M 0 720 C 200 660, 500 640, 800 680 C 1100 720, 1280 700, 1440 740 L 1440 900 L 0 900 Z" fill="#2B4BA0" opacity="0.88" />
            </g>
            <rect width="1440" height="900" filter="url(#paperGrain)" opacity=".2" />
          </svg>
        </div>
        <div className="container sp-hero__inner sp-hero__inner--art reveal">
          <div className="sp-hero__copy">
          <div className="tag">Douleur chronique — Paris</div>
          <h1 className="sp-hero__h1">
            Hypnose et douleur chronique<br/><em>à Paris</em>
          </h1>
          <p className="sp-hero__lead">
            Vivre avec une douleur qui dure épuise le corps et le moral. L'hypnose ericksonienne ne soigne pas la cause médicale de la douleur, mais elle peut vous aider à <strong>changer votre relation à la douleur</strong> : détendre la tension qui l'entretient, apaiser l'anxiété et améliorer le sommeil. Elle s'ajoute à votre suivi médical, sans le remplacer. Au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089">06 49 35 80 89</a>
          </div>
          </div>
          <HeroArt theme="emotions" />
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <div className="section-tag">Ce que l'hypnose peut et ne peut pas faire</div>
          <h2 className="sp-h2">Une aide complémentaire,<br/><em>pas un traitement de la cause.</em></h2>
          <p>
            Une douleur chronique doit d'abord être évaluée par un médecin. L'hypnose n'établit aucun diagnostic et ne remplace aucun traitement : n'arrêtez jamais un traitement sans l'avis de votre médecin.
          </p>
          <p>
            Ce que l'hypnose peut offrir, c'est un travail sur le vécu de la douleur : l'attention qu'on lui porte, la tension musculaire, l'anxiété d'anticipation, la fatigue. Les effets varient beaucoup d'une personne à l'autre, et je ne promets pas de résultat : nous évaluons ensemble, séance après séance, ce qui change pour vous.
          </p>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Vous reconnaissez-vous&nbsp;?</h2>
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

      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <div className="section-tag">Déroulé au cabinet</div>
          <h2 className="sp-h2">Comment se déroule l'accompagnement</h2>
          <div className="sp-checklist">
            {[
              "Un premier échange pour comprendre votre douleur, votre suivi médical actuel et ce que vous souhaitez améliorer",
              "Un travail de détente et d'attention pour relâcher la tension qui entretient la douleur",
              "Des suggestions et des images ericksoniennes pour modifier la façon de percevoir la douleur",
              "Des exercices d'auto-hypnose à pratiquer chez vous, pour retrouver de l'autonomie entre les séances",
              "Un point à chaque séance sur ce qui change, et le cas échéant un lien avec votre médecin si vous le souhaitez"
            ].map((item, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <div className="section-tag">Ce que dit la recherche</div>
          <h2 className="sp-h2">Ce qui est établi, et ce qui ne l'est pas</h2>
          <p>
            Une méta-analyse publiée en 2019 (Thompson et coll., 85 essais contrôlés, 3 632 participants) observe un effet antalgique de l'hypnose sur des douleurs provoquées expérimentalement chez des volontaires. L'effet dépend de la sensibilité de la personne à l'hypnose, et les auteurs soulignent que des données cliniques de bonne qualité restent nécessaires pour la douleur chronique.
          </p>
          <p>
            Le rapport d'expertise collective de l'Inserm (2015) retient surtout l'intérêt de l'hypnose pour la douleur lors d'actes médicaux, et juge les données insuffisantes pour la plupart des autres usages. C'est pourquoi je présente l'hypnose comme une aide complémentaire, et non comme un traitement de la douleur chronique.
          </p>
          <p className="sp-footnote">Sources détaillées en bas de page.</p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la douleur chronique</h2>
          <div>
            {douleurFaqItems.map((item, i) => (
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
          keywords={["douleur", "migraine", "fibromyalgie", "tension", "stress"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur la douleur et le stress"
          accentColor="text-rose-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-douleur-chronique-paris"
          pageTitle="Hypnose et douleur chronique à Paris"
          pageDescription={DESC}
          topic="la douleur chronique"
          dateModified="2026-11-03"
          datePublished="2026-11-03"
          references={[
            {
              authors: "Thompson T, Terhune DB, Oram C, et al.",
              title: "The effectiveness of hypnosis for pain relief: a systematic review and meta-analysis of 85 controlled experimental trials",
              source: "Neuroscience & Biobehavioral Reviews, 99, 298-310",
              year: 2019,
              url: "https://gala.gre.ac.uk/id/eprint/23018",
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

      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Parlons de votre douleur, à votre rythme</h2>
          <p className="sp-lead">Cabinet Paris 4ème – Marais-Bastille (Métro Bastille, lignes 1, 5, 8) • 90 € la séance • Au cabinet ou en visio partout en France</p>
          <div className="hero__cta" style={{justifyContent:'center'}}>
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
               style={{background:'var(--lin)', color:'var(--cobalt)'}}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089" style={{borderColor:'rgba(240,236,227,.4)', color:'var(--lin)'}}>06 49 35 80 89</a>
          </div>
          <div className="sp-links">
            <Link to="/hypnose-stress-anxiete-paris">Stress et anxiété →</Link>
            <Link to="/hypnose-sommeil-paris">Sommeil →</Link>
            <Link to="/autohypnose">Auto-hypnose →</Link>
            <Link to="/hypnose-traumatismes-paris">Traumatismes →</Link>
            <Link to="/tarifs">Tarifs →</Link>
            <Link to="/contact">Contact →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseDouleurChroniqueParis;
