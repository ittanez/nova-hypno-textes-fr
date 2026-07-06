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

const addictionSucreFaqItems = [
  {
    question: "L'hypnose peut-elle vraiment réduire l'addiction au sucre ?",
    answer: "Oui, et c'est une problématique que j'accompagne régulièrement au cabinet. L'addiction au sucre n'est pas qu'une question de goût — le sucre agit sur le circuit de la récompense du cerveau et répond souvent à des besoins émotionnels (réconfort, stimulation, soulagement du stress). L'hypnose identifie ces besoins sous-jacents et aide votre inconscient à les satisfaire autrement. L'attrait pour le sucre diminue naturellement, sans restriction volontaire forcée."
  },
  {
    question: "Pourquoi est-il si difficile de réduire sa consommation de sucre malgré la volonté ?",
    answer: "Parce que le sucre crée une dépendance physiologique et psychologique. Physiologiquement, il provoque des pics de dopamine et d'insuline qui créent un cycle de manque. Psychologiquement, il est souvent associé à des émotions positives (récompense, réconfort) depuis l'enfance. La volonté seule se heurte à ces mécanismes profonds. L'hypnose agit sur la dimension psychologique et émotionnelle, qui est souvent le principal maintien de l'addiction."
  },
  {
    question: "L'hypnose peut-elle aider à réduire les envies de sucre même après les repas ?",
    answer: "Oui. Les envies de sucre après les repas sont souvent liées à des associations conditionnées (« je mange toujours quelque chose de sucré après manger ») ou à un besoin de clôturer le repas. L'hypnose peut travailler sur ces associations spécifiques pour les neutraliser. Beaucoup de clients constatent que ces envies systématiques disparaissent après 2 à 3 séances."
  },
  {
    question: "Combien de séances d'hypnose pour se libérer de l'addiction au sucre ?",
    answer: "En général, 3 à 5 séances permettent une transformation durable. Certains clients constatent une réduction significative des envies dès la première ou deuxième séance. L'addiction au sucre peut avoir plusieurs dimensions (émotionnelle, comportementale, conditionnée) que les séances traitent progressivement. Le résultat est durable parce qu'il vient d'un changement intérieur, pas d'une restriction."
  },
  {
    question: "L'hypnose peut-elle remplacer un suivi nutritionnel pour l'addiction au sucre ?",
    answer: "L'hypnose et le suivi nutritionnel sont complémentaires, pas en concurrence. Le suivi nutritionnel vous donne les connaissances et les outils alimentaires. L'hypnose travaille sur la dimension émotionnelle et comportementale qui empêche d'appliquer ces outils durablement. Beaucoup de clients qui n'arrivaient pas à maintenir leurs changements alimentaires y parviennent grâce à l'hypnose, qui lève les freins inconscients."
  }
];

const HypnoseAddictionSucreParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose addiction au sucre Paris",
    "description": "Libérez-vous de l'addiction au sucre par l'hypnose ericksonienne à Paris 4ème ou en visio. Envies incontrôlables de sucré, dépendance sucrée — agir sur les causes émotionnelles.",
    "url": "https://novahypnose.fr/hypnose-addiction-sucre-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie addiction au sucre",
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
      { "@type": "ListItem", "position": 3, "name": "Addiction au sucre", "item": "https://novahypnose.fr/hypnose-addiction-sucre-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": addictionSucreFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Envies de sucré incontrôlables", desc: "Après les repas, en cas de stress, de fatigue ou d'ennui — le sucré s'impose comme une nécessité" },
    { title: "Incapacité à résister au chocolat", desc: "Vous achetez des stocks « pour ne pas en manquer », et ils disparaissent en quelques jours" },
    { title: "Sucre comme récompense systématique", desc: "Chaque petite victoire, chaque tâche accomplie appelle automatiquement une récompense sucrée" },
    { title: "Baisse d'énergie sans sucre", desc: "Vous avez besoin d'un apport sucré régulier pour fonctionner — et vous vous sentez irritable sans lui" },
    { title: "Manger sucré pour gérer le stress", desc: "Dès que la pression monte, le sucre est votre premier réflexe de décompression" },
    { title: "Échecs répétés des cures sans sucre", desc: "Vous avez essayé le régime sans sucre plusieurs fois — vous rechutez à chaque fois" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose addiction au sucre Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de l'addiction au sucre par l'hypnose à Paris 4ème ou en visio. L'hypnose agit sur les causes émotionnelles de la dépendance sucrée. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose addiction sucre paris, dépendance sucre hypnose, arrêter sucre hypnose paris, envies sucré hypnose, sucre compulsif traitement hypnose, hypnose addiction sucre en ligne, réduire sucre hypnose paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-addiction-sucre-paris" />
        <meta property="og:title" content="Hypnose addiction au sucre Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de l'addiction au sucre par l'hypnose à Paris 4ème ou en visio. L'hypnose agit sur les causes émotionnelles." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-addiction-sucre-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose addiction sucre" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose addiction au sucre Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de l'addiction au sucre par l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Addiction au sucre — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous de<br/><em>l'addiction au sucre</em>
          </h1>
          <p className="sp-hero__lead">
            Envies irrésistibles de sucré, incapacité à résister au chocolat, sucre comme récompense
            ou réconfort systématique — votre relation au sucre n'est pas qu'une question de goût.
            C'est une <strong>dépendance avec des racines émotionnelles</strong> que l'hypnose peut
            traiter, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Addiction au sucre — comprendre</div>
              <h2 className="section-title">Le sucre répond<br/><em>à un besoin émotionnel.</em></h2>
              <p>
                Vous avez essayé de réduire le sucre. Vous avez tenu quelques jours, peut-être quelques
                semaines. Et vous avez rechargé. Pas parce que vous manquez de volonté — mais parce que
                quelque chose en vous cherche dans le sucre quelque chose que rien d'autre ne remplace encore.
              </p>
              <p>
                Le sucre active le circuit de la récompense dans le cerveau. Il procure un soulagement
                rapide au stress, un réconfort instantané, un pic d'énergie. L'inconscient a appris que
                c'est la réponse la plus accessible à plusieurs états émotionnels.
              </p>
              <p>
                L'hypnose travaille sur ces associations inconscientes pour proposer d'autres réponses
                à ces besoins — sans restriction, sans privation, avec un résultat durable.
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
              <div className="section-tag">Mécanisme — dissocier sucre et émotions</div>
              <h2 className="section-title">L'hypnose transforme<br/><em>la relation au sucré.</em></h2>
              <p>
                L'hypnose ericksonienne ne vous dit pas de ne plus manger de sucre. Elle rend la compulsion
                inutile en traitant ce qu'elle cherchait à soulager. En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier les émotions et contextes qui déclenchent les envies de sucré",
                  "Dissocier le sucre des états émotionnels auxquels il est associé",
                  "Neutraliser l'association sucre = récompense ou réconfort dans l'inconscient",
                  "Installer de nouvelles stratégies de satisfaction émotionnelle",
                  "Réduire l'intensité du craving sucré à sa source inconsciente",
                  "Ancrer un rapport plus libre et détendu aux aliments sucrés"
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

      {/* Cas concrets — 2 témoignages pour ce sujet très traité */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Témoignages au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Sucre comme réconfort — libérer le besoin réel</div>
              <p>
                Une cliente consommait du chocolat chaque soir, après une journée stressante. Elle avait
                essayé de l'éliminer de son alimentation plusieurs fois, sans succès. Le sucre était son
                seul moment de « pause » dans des journées épuisantes.
              </p>
              <p>
                En 3 séances, nous avons travaillé sur son besoin de décompression. Une fois qu'elle
                avait d'autres façons de prendre soin d'elle le soir, l'attrait compulsif pour le chocolat
                s'est considérablement réduit — sans qu'elle ait à « résister ».
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Sucre et anxiété — couper le circuit</div>
              <p>
                Antoine*, 29 ans, mangeait du sucré à chaque montée d'anxiété — bonbons, sodas, pâtisseries.
                Il avait conscience du lien entre son anxiété et sa consommation, mais ne pouvait pas le
                contrôler. Sa santé dentaire et son énergie en souffraient.
              </p>
              <p>
                En 4 séances d'hypnose combinant travail sur l'anxiété et sur le lien sucre-soulagement,
                Antoine a réduit drastiquement sa consommation. L'anxiété, traitée à sa source, cherchait
                moins à se soulager par le sucre.
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
              { value: '3-5', label: 'séances pour transformer durablement la relation au sucré' },
              { value: '100%', label: 'personnalisé selon votre histoire avec le sucre et ses déclencheurs' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et l'addiction au sucre</h2>
          <div>
            {addictionSucreFaqItems.map((item, i) => (
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
          keywords={["addiction sucre", "envies sucrées", "sucre émotionnel", "dépendance sucrée"]}
          title="Articles sur l'addiction au sucre"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-addiction-sucre-paris"
          pageTitle="Hypnose pour l'addiction au sucre à Paris"
          pageDescription="Hypnose ericksonienne pour se libérer de l'addiction au sucre au cabinet Paris 4ème ou en visio."
          topic="l'addiction au sucre et les dépendances alimentaires"
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
          <h2 className="sp-h2">Prêt à vous libérer du sucre enfin ?</h2>
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
            <Link to="/hypnose-grignotage-paris">Grignotage chronique →</Link>
            <Link to="/hypnose-alimentation-emotionnelle-paris">Alimentation émotionnelle →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseAddictionSucreParis;
