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

const addictionsFaqItems = [
  {
    question: "L'hypnose peut-elle aider à se libérer d'une addiction comportementale ?",
    answer: "Oui. Les addictions comportementales — jeux d'argent, écrans, achats compulsifs, réseaux sociaux, pornographie — partagent le même mécanisme : un comportement qui procure un soulagement immédiat à une tension émotionnelle profonde. L'hypnose identifie cette tension sous-jacente et propose à l'inconscient d'autres façons de la gérer. Le comportement addictif perd alors sa raison d'être et son emprise se réduit."
  },
  {
    question: "L'hypnose traite-t-elle l'addiction aux jeux d'argent ?",
    answer: "Oui. L'addiction aux jeux d'argent est l'une des addictions comportementales que je traite au cabinet. Elle combine souvent plusieurs mécanismes : recherche de sensations fortes, régulation émotionnelle, sentiment d'avoir du contrôle, ou encore des schémas de croyances sur l'argent. L'hypnose travaille sur ces mécanismes spécifiques en identifiant ce que le jeu satisfait au niveau inconscient et en proposant des alternatives."
  },
  {
    question: "Quelle différence entre addiction comportementale et addiction aux substances ?",
    answer: "Les addictions comportementales n'impliquent pas de substance, mais leur mécanisme cérébral est similaire : le comportement active le circuit de la récompense, crée une dépendance psychologique, et la personne perd progressivement le contrôle malgré des conséquences négatives. L'hypnose est particulièrement bien adaptée aux addictions comportementales car elle agit sur la dimension psychologique et émotionnelle qui est au cœur du problème."
  },
  {
    question: "Combien de séances d'hypnose pour traiter une addiction comportementale ?",
    answer: "En général, 4 à 6 séances permettent d'obtenir des résultats significatifs. Le nombre dépend de l'ancienneté de l'addiction, de son intensité et de la complexité des mécanismes émotionnels sous-jacents. Les premières séances identifient la fonction de l'addiction. Les séances suivantes travaillent à reprogrammer ces mécanismes et à ancrer de nouvelles stratégies de régulation. Un suivi peut être recommandé selon les cas."
  },
  {
    question: "L'hypnose peut-elle aider avec l'addiction aux écrans et aux réseaux sociaux ?",
    answer: "Oui. L'addiction aux écrans et aux réseaux sociaux est une problématique croissante que l'hypnose accompagne efficacement. Elle fonctionne souvent comme un régulateur émotionnel — on consulte son téléphone pour éviter l'ennui, l'anxiété, la solitude. L'hypnose travaille sur ces états émotionnels sous-jacents pour que le comportement de fuite sur les écrans perde son emprise."
  }
];

const HypnoseAddictionsComportementalesParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose addictions comportementales Paris",
    "description": "Libérez-vous de vos addictions comportementales (jeux d'argent, écrans, achats compulsifs) par l'hypnose ericksonienne à Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-addictions-comportementales-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie addictions comportementales",
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
      { "@type": "ListItem", "position": 3, "name": "Addictions comportementales", "item": "https://novahypnose.fr/hypnose-addictions-comportementales-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": addictionsFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Jeux d'argent", desc: "Casinos, paris sportifs, machines à sous — vous jouez au-delà de vos moyens et ne pouvez pas vous arrêter" },
    { title: "Addiction aux écrans", desc: "Vidéos, réseaux sociaux, streaming — des heures s'écoulent sans que vous vous en rendiez compte" },
    { title: "Achats compulsifs", desc: "Vous achetez pour combler un vide ou soulager une tension, avec culpabilité et regrets immédiats" },
    { title: "Jeux vidéo compulsifs", desc: "Incapacité à décrocher, nuits raccourcies, négligence des priorités de vie" },
    { title: "Addiction au travail", desc: "Incapacité à décrocher, hyperactivité professionnelle qui masque une fuite de soi" },
    { title: "Comportements sexuels compulsifs", desc: "Pornographie, hypersexualité — comportements dont vous voulez vous défaire mais qui reprennent le dessus" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose addictions comportementales Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de vos addictions comportementales (jeux d'argent, écrans, achats compulsifs) par l'hypnose à Paris 4ème ou en visio. L'hypnose agit sur la cause émotionnelle. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose addiction comportementale paris, hypnose jeux argent paris, hypnose addiction écrans paris, achats compulsifs hypnose, addiction travail hypnose paris, comportement compulsif traitement hypnose, hypnose addiction comportementale en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-addictions-comportementales-paris" />
        <meta property="og:title" content="Hypnose addictions comportementales Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de vos addictions comportementales par l'hypnose à Paris 4ème ou en visio. Jeux d'argent, écrans, achats compulsifs — l'hypnose agit sur la cause émotionnelle." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-addictions-comportementales-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose addictions comportementales" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose addictions comportementales Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de vos addictions comportementales par l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Addictions comportementales — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous des comportements<br/><em>dont vous n'arrivez pas à vous défaire</em>
          </h1>
          <p className="sp-hero__lead">
            Jeux d'argent, écrans, achats compulsifs, jeux vidéo — ces comportements ne sont pas des
            défauts de caractère. Ils répondent à un <strong>besoin émotionnel profond</strong> que l'hypnose
            peut adresser à sa source, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Addictions comportementales — comprendre</div>
              <h2 className="section-title">Un besoin légitime,<br/><em>une réponse inadaptée.</em></h2>
              <p>
                Vous voulez arrêter. Vous avez essayé. Et vous recommencez. Pas parce que vous êtes
                faible — mais parce que ce comportement satisfait quelque chose que rien d'autre ne
                satisfait encore.
              </p>
              <p>
                Derrière chaque addiction comportementale, il y a un besoin légitime : se sentir vivant,
                réduire l'anxiété, trouver du réconfort, avoir du contrôle, fuir une douleur. L'addiction
                est une réponse efficace — mais inadaptée — à ce besoin. C'est pour ça que la volonté
                seule ne suffit pas à arrêter.
              </p>
              <p>
                L'hypnose identifie le besoin réel derrière le comportement et aide votre inconscient
                à trouver des réponses plus saines. Le comportement addictif perd alors son emprise.
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
          <h2 className="sp-h2">Les addictions comportementales que j'accompagne</h2>
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
              <div className="section-tag">Mécanisme — répondre au besoin autrement</div>
              <h2 className="section-title">L'hypnose libère<br/><em>le besoin, pas juste le comportement.</em></h2>
              <p>
                L'hypnose ericksonienne ne supprime pas le comportement — elle le rend inutile. En état
                de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier le besoin émotionnel réel que satisfait l'addiction",
                  "Comprendre les déclencheurs émotionnels et les contextes à risque",
                  "Réduire l'intensité de l'envie compulsive (craving) à sa source inconsciente",
                  "Installer de nouvelles stratégies de régulation émotionnelle",
                  "Renforcer la capacité à tolérer la frustration et l'inconfort sans fuir",
                  "Ancrer une vision de soi libre du comportement addictif"
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
              <div className="sp-case__title">Jeux d'argent — reprendre le contrôle</div>
              <p>
                Un client jouait aux paris sportifs en ligne depuis plusieurs années. Ce qu'il cherchait
                dans le jeu : des sensations fortes, un sentiment de contrôle sur quelque chose dans une
                vie où il se sentait impuissant. Les dettes s'accumulaient.
              </p>
              <p>
                En 5 séances d'hypnose, nous avons travaillé sur le besoin de contrôle et les émotions
                sous-jacentes. L'attrait du jeu s'est progressivement éteint à mesure qu'il trouvait
                d'autres façons de répondre à ce besoin.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Achats compulsifs — combler le vide</div>
              <p>
                Claire*, 38 ans, achetait compulsivement en ligne — vêtements, objets, abonnements.
                Chaque achat procurait un soulagement immédiat suivi d'une culpabilité intense.
                Sa carte de crédit était à saturation.
              </p>
              <p>
                En hypnose, nous avons identifié que les achats comblaient un sentiment de vide et
                de manque affectif. Après 4 séances, l'impulsion d'achat s'était considérablement
                réduite et elle gérait différemment ces moments de vide.
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
              { value: '4-6', label: 'séances pour réduire l\'emprise du comportement addictif' },
              { value: '100%', label: 'personnalisé selon votre addiction et ses mécanismes spécifiques' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et les addictions comportementales</h2>
          <div>
            {addictionsFaqItems.map((item, i) => (
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
          keywords={["addiction", "jeux d'argent", "comportement compulsif", "dépendance comportementale"]}
          title="Articles sur les addictions comportementales"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-addictions-comportementales-paris"
          pageTitle="Hypnose pour les addictions comportementales à Paris"
          pageDescription="Hypnose ericksonienne pour accompagner les addictions comportementales (jeux, écrans, achats) au cabinet Paris 4ème ou en visio."
          topic="les addictions comportementales"
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
          <h2 className="sp-h2">Prêt à reprendre le contrôle ?</h2>
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
            <Link to="/hypnose-gestion-emotions-paris">Gestion des émotions →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseAddictionsComportementalesParis;
