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

const blocagesProfFaqItems = [
  {
    question: "L'hypnose peut-elle aider à surmonter les blocages professionnels ?",
    answer: "Oui, et c'est l'une de ses applications les plus concrètes. Les blocages professionnels — peur de demander une augmentation, incapacité à passer à l'action, auto-sabotage avant une promotion, syndrome de l'imposteur — sont pilotés par des croyances inconscientes. L'hypnose accède directement à ces programmes pour les transformer. Mes clients constatent souvent un changement notable dès les premières séances : une capacité à agir là où ils étaient bloqués."
  },
  {
    question: "Qu'est-ce que l'auto-sabotage professionnel et comment l'hypnose le traite-t-elle ?",
    answer: "L'auto-sabotage est un mécanisme inconscient qui vous pousse à compromettre vos propres succès : arriver en retard à un entretien clé, bâcler un travail important, provoquer un conflit au mauvais moment. L'hypnose identifie la croyance ou la peur sous-jacente qui maintient ce comportement — souvent la peur de réussir et d'assumer les responsabilités qui en découlent, ou une croyance profonde sur la légitimité. Elle reprogramme ce mécanisme pour que le succès devienne possible."
  },
  {
    question: "Comment l'hypnose aide-t-elle contre le syndrome de l'imposteur ?",
    answer: "Le syndrome de l'imposteur repose sur une dissonance entre vos compétences réelles et l'image que vous avez de vous-même. L'hypnose traite ce décalage en identifiant les expériences fondatrices qui ont créé le doute (critique parentale, échec scolaire, comparaison) et en les retraitant. En état d'hypnose, votre inconscient intègre une perception plus juste de vos capacités. Le résultat : vous vous sentez légitime dans vos réussites, sans avoir à vous convaincre."
  },
  {
    question: "Combien de séances d'hypnose pour lever des blocages professionnels ?",
    answer: "En général, 3 à 5 séances suffisent pour des résultats concrets. La nature du blocage détermine la durée : une peur spécifique comme la prise de parole ou la négociation peut être traitée en 2 à 3 séances, tandis qu'un syndrome de l'imposteur profond ou un schéma d'auto-sabotage récurrent peut nécessiter 4 à 6 séances. Dès la première séance, vous repartez avec des outils concrets à utiliser immédiatement."
  },
  {
    question: "L'hypnose peut-elle aider à oser se lancer en tant qu'entrepreneur ?",
    answer: "Absolument. La peur de se lancer, de quitter un emploi stable, d'assumer l'incertitude entrepreneuriale — ce sont des blocages que l'hypnose traite efficacement. Elle travaille sur la peur de l'échec, la peur du regard des autres, les croyances limitantes sur l'argent ou la réussite. Beaucoup de mes clients ont franchi le pas après quelques séances, avec une confiance ancrée plutôt qu'une résolution de surface."
  }
];

const HypnoseBlocagesProfessionnelsParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose blocages professionnels Paris",
    "description": "Levez vos blocages professionnels par l'hypnose ericksonienne à Paris 4ème ou en visio. Auto-sabotage, syndrome de l'imposteur, peurs irréelles, freins à la progression.",
    "url": "https://novahypnose.fr/hypnose-blocages-professionnels-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie blocages professionnels",
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
      { "@type": "ListItem", "position": 3, "name": "Blocages professionnels", "item": "https://novahypnose.fr/hypnose-blocages-professionnels-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blocagesProfFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Peurs irréelles qui freinent", desc: "Peur de demander une augmentation, peur d'un entretien, peur de prendre la parole — sans fondement rationnel" },
    { title: "Auto-sabotage récurrent", desc: "Vous compromettez vos propres succès au moment décisif : retard, oubli, conflit provoqué inconsciemment" },
    { title: "Syndrome de l'imposteur", desc: "Vous vous sentez illégitime malgré vos compétences, vous attendez d'être « démasqué »" },
    { title: "Blocage à la prise de décision", desc: "Vous analysez indéfiniment sans jamais trancher, paralysé par la peur de faire le mauvais choix" },
    { title: "Incapacité à progresser", desc: "Vous stagnez au même poste depuis des années alors que vous en avez les capacités" },
    { title: "Peur de l'autorité ou des conflits", desc: "Relations tendues avec les supérieurs, évitement des feedbacks, retrait systématique en cas de tension" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose blocages professionnels Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Levez vos blocages professionnels par l'hypnose à Paris 4ème ou en visio. Auto-sabotage, syndrome de l'imposteur, peur de réussir — l'hypnose agit sur les freins inconscients. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose blocages professionnels paris, auto-sabotage hypnose paris, syndrome imposteur hypnose paris, peur réussir hypnose, freins carrière hypnose paris, hypnose performance professionnelle paris, blocage entrepreneur hypnose, hypnose blocage professionnel en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-blocages-professionnels-paris" />
        <meta property="og:title" content="Hypnose blocages professionnels Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Levez vos blocages professionnels par l'hypnose à Paris 4ème ou en visio. Auto-sabotage, syndrome de l'imposteur, peur de réussir." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-blocages-professionnels-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose blocages professionnels" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose blocages professionnels Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Levez vos blocages professionnels par l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Blocages professionnels — Paris</div>
          <h1 className="sp-hero__h1">
            Levez les freins<br/><em>qui bloquent votre carrière</em>
          </h1>
          <p className="sp-hero__lead">
            Auto-sabotage, syndrome de l'imposteur, peur irréelle de progresser, incapacité à passer à
            l'action malgré vos compétences — ces freins ne sont pas rationnels. Ce sont des
            <strong> programmes inconscients</strong> que l'hypnose peut transformer, au cabinet à Paris 4ème
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
              <div className="section-tag">Blocages professionnels — comprendre</div>
              <h2 className="section-title">Des peurs irréelles<br/><em>aux conséquences bien réelles.</em></h2>
              <p>
                Vous avez les compétences, l'expérience, les idées. Vous savez ce que vous devriez faire
                pour avancer. Et pourtant, une résistance inexplicable vous empêche de franchir le pas.
              </p>
              <p>
                Ces blocages ne sont pas de la paresse ou du manque d'ambition. Ce sont des
                <strong> croyances inconscientes</strong> sur ce que vous méritez, ce que vous êtes capable
                d'accomplir, ce qui pourrait arriver si vous réussissez. Votre inconscient vous protège
                d'une menace imaginaire au prix de votre progression réelle.
              </p>
              <p>
                L'hypnose dialogue avec ces croyances pour les transformer. Vos compétences peuvent
                enfin s'exprimer sans que votre inconscient s'y oppose.
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
              <div className="section-tag">Mécanisme — transformer les croyances limitantes</div>
              <h2 className="section-title">L'hypnose installe<br/><em>la confiance profonde.</em></h2>
              <p>
                L'hypnose ericksonienne ne vous convainc pas d'aller de l'avant — elle rend le blocage inutile.
                En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier les croyances limitantes qui sabotent votre progression",
                  "Retraiter les expériences fondatrices (critique, échec, comparaison) à leur source",
                  "Installer une image de soi professionnelle réaliste et légitime",
                  "Neutraliser la peur de réussir et ses conséquences imaginaires",
                  "Ancrer un état de confiance et de capacité d'action naturel",
                  "Développer une réponse assertive aux situations de tension professionnelle"
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
              <div className="sp-case__title">Blocages levés — progression professionnelle retrouvée</div>
              <p>
                Une cliente, cadre dans le secteur juridique, stagnait depuis plusieurs années malgré
                d'excellentes évaluations. Chaque opportunité de promotion la paralysait : elle trouvait
                des raisons de ne pas postuler, de se mettre en retrait au moment décisif.
              </p>
              <p>
                Après 4 séances d'hypnose travaillant sur une croyance d'illégitimité héritée de son
                histoire familiale, elle a postulé et obtenu un poste de direction qu'elle occupe
                désormais avec assurance.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Syndrome de l'imposteur — entrepreneur</div>
              <p>
                Thomas*, 36 ans, avait créé son entreprise mais se sabotait constamment : il sous-facturait,
                acceptait des conditions inacceptables, ne se positionnait pas à sa juste valeur. La peur
                d'être « démasqué » dominait chaque négociation.
              </p>
              <p>
                En 3 séances, nous avons travaillé sur les croyances sous-jacentes à ce sentiment
                d'illégitimité. Thomas a progressivement augmenté ses tarifs et affirmé sa valeur
                avec une confiance naturelle.
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
              { value: '3-5', label: 'séances pour lever les freins inconscients à votre progression' },
              { value: '100%', label: 'personnalisé selon vos blocages et votre contexte professionnel' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et les blocages professionnels</h2>
          <div>
            {blocagesProfFaqItems.map((item, i) => (
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
          keywords={["blocage professionnel", "auto-sabotage", "syndrome imposteur", "confiance professionnelle"]}
          title="Articles sur les blocages professionnels"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-blocages-professionnels-paris"
          pageTitle="Hypnose pour les blocages professionnels à Paris"
          pageDescription="Hypnose ericksonienne pour lever les blocages professionnels, l'auto-sabotage et le syndrome de l'imposteur au cabinet Paris 4ème ou en visio."
          topic="les blocages professionnels et les croyances limitantes"
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
          <h2 className="sp-h2">Prêt à avancer enfin dans votre carrière ?</h2>
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
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/hypnose-schemas-repetitifs-paris">Schémas répétitifs →</Link>
            <Link to="/hypnose-procrastination-paris">Procrastination →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseBlocagesProfessionnelsParis;
