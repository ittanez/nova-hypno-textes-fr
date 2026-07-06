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

const tocFaqItems = [
  {
    question: "L'hypnose peut-elle aider avec les TOC et les rituels compulsifs ?",
    answer: "L'hypnose accompagne efficacement les TOC légers à modérés en travaillant sur le mécanisme d'anxiété sous-jacent. Les rituels compulsifs — vérifications, lavages, comptage, arrachage de cheveux — sont des stratégies que l'inconscient a mises en place pour gérer une anxiété profonde. L'hypnose réduit cette anxiété à sa source et propose à l'inconscient des alternatives plus adaptées. Pour les TOC sévères, l'hypnose constitue un complément précieux à un suivi psychiatrique ou psychothérapeutique."
  },
  {
    question: "Quelle est la différence entre un TOC et un rituel habituel ?",
    answer: "Un rituel habituel est un comportement qui aide à structurer la journée ou à se sentir bien (prendre son café avant d'ouvrir les mails, vérifier sa porte en partant). Un TOC se distingue par son caractère anxiogène : si le rituel est interrompu ou non accompli, l'anxiété devient insupportable. Le comportement n'est plus un choix — il s'impose pour neutraliser une peur ou une pensée intrusive. C'est ce mécanisme automatique que l'hypnose peut modifier."
  },
  {
    question: "L'hypnose peut-elle traiter la trichotillomanie (arrachage de cheveux) ?",
    answer: "Oui. La trichotillomanie est un comportement répétitif centré sur le corps (BFRB), apparenté aux TOC, souvent lié à une tension interne ou à un mécanisme de régulation émotionnelle. L'hypnose agit sur le même principe que pour l'onychophagie : elle identifie la fonction du comportement et propose une alternative inconsciente. Certains clients constatent une réduction significative dès les premières séances."
  },
  {
    question: "Combien de séances d'hypnose pour traiter les TOC ?",
    answer: "Pour des comportements ritualisés ou compulsifs légers à modérés, 4 à 6 séances permettent généralement d'observer une amélioration significative. Les TOC plus complexes peuvent nécessiter un accompagnement plus long, idéalement en parallèle d'un suivi spécialisé. L'hypnose ne remplace pas un suivi psychiatrique pour les TOC sévères, mais elle est un outil complémentaire reconnu qui accélère les progrès."
  },
  {
    question: "Puis-je faire ces séances en visio depuis chez moi ?",
    answer: "Oui. Les séances en visioconférence sont aussi efficaces qu'en cabinet. Pour les personnes aux prises avec des rituels et des TOC, la séance depuis son propre espace peut même être bénéfique : vous êtes dans l'environnement où les comportements se déroulent, ce qui facilite parfois l'identification des déclencheurs et le travail hypnotique."
  }
];

const HypnoseTocRituelsParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose TOC et rituels compulsifs Paris",
    "description": "Traitement des TOC, rituels compulsifs et comportements répétitifs (trichotillomanie, vérifications) par l'hypnose ericksonienne à Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-toc-rituels-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie TOC et comportements compulsifs",
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
      { "@type": "ListItem", "position": 3, "name": "TOC & Rituels", "item": "https://novahypnose.fr/hypnose-toc-rituels-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tocFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Vérifications compulsives", desc: "Vous vérifiez plusieurs fois la porte, le gaz, les fenêtres — même après être certain que tout est fermé" },
    { title: "Rituels de lavage", desc: "Lavage des mains répété, peur de la contamination, nettoyage excessif des surfaces" },
    { title: "Pensées intrusives", desc: "Des pensées obsessionnelles s'imposent à vous contre votre gré et reviennent en boucle" },
    { title: "Trichotillomanie", desc: "Arrachage compulsif de cheveux, cils ou sourcils, souvent pour soulager une tension interne" },
    { title: "Rituels de rangement", desc: "Symétrie, ordre parfait, comptage obsessionnel — impossible de partir si quelque chose n'est pas exact" },
    { title: "Anxiété si le rituel est interrompu", desc: "Toute interruption du rituel déclenche une tension insupportable qui vous oblige à recommencer" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose TOC & rituels compulsifs Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous des TOC, rituels compulsifs et comportements répétitifs (trichotillomanie) par l'hypnose à Paris 4ème ou en visio. L'hypnose agit sur l'anxiété sous-jacente. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose TOC paris, traitement TOC hypnose, rituels compulsifs hypnose paris, trichotillomanie hypnose paris, comportements répétitifs hypnose, vérifications compulsives traitement, hypnose TOC en ligne, séance TOC visio france" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-toc-rituels-paris" />
        <meta property="og:title" content="Hypnose TOC & rituels compulsifs Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous des TOC et rituels compulsifs par l'hypnose à Paris 4ème ou en visio. L'hypnose agit sur l'anxiété sous-jacente qui maintient ces comportements." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-toc-rituels-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose TOC rituels" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose TOC & rituels compulsifs Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous des TOC et rituels compulsifs par l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">TOC & Rituels — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous des TOC<br/><em>et des rituels compulsifs</em>
          </h1>
          <p className="sp-hero__lead">
            Vérifications répétées, rituels envahissants, pensées obsessionnelles, arrachage de cheveux…
            Ces comportements sont pilotés par une anxiété inconsciente. L'hypnose agit à la source,
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

      {/* Le problème */}
      <section className="sp-section">
        <div className="container">
          <div className="cabinet__grid reveal">
            <div className="cabinet__copy">
              <div className="section-tag">TOC — comprendre</div>
              <h2 className="section-title">Des rituels qui<br/><em>asservissent.</em></h2>
              <p>
                Vous savez que vérifier une troisième fois ne sert à rien. Vous savez que vos mains sont
                propres. Vous savez que ces pensées ne correspondent à rien de réel. Et pourtant, vous ne
                pouvez pas résister à l'impulsion.
              </p>
              <p>
                Les TOC et rituels compulsifs sont une réponse de l'inconscient à une anxiété profonde.
                Le rituel réduit temporairement cette anxiété — ce qui renforce le comportement. C'est
                un <strong>cercle vicieux</strong> piloté entièrement par l'inconscient.
              </p>
              <p>
                L'hypnose ne combat pas les rituels — elle s'attaque à l'anxiété qui les alimente.
                Quand la source se tarit, les comportements perdent leur raison d'être.
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
              <div className="section-tag">Mécanisme — agir sur l'anxiété sous-jacente</div>
              <h2 className="section-title">L'hypnose désactive<br/><em>l'anxiété qui alimente les rituels.</em></h2>
              <p>
                L'hypnose ericksonienne ne s'attaque pas directement au rituel — elle agit sur ce qui le
                maintient. En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier l'anxiété spécifique qui déclenche le rituel ou la pensée obsessionnelle",
                  "Retraiter l'expérience fondatrice qui a installé ce mécanisme de protection",
                  "Réduire le niveau d'anxiété de base qui alimente les comportements compulsifs",
                  "Proposer à l'inconscient des réponses plus adaptées à la tension ressentie",
                  "Installer une capacité à tolérer l'incertitude sans passer par le rituel",
                  "Vous transmettre des outils d'auto-hypnose pour les moments de montée anxieuse"
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
              <div className="sp-case__title">Trichotillomanie — arrachage de cheveux</div>
              <p>
                Une cliente s'arrachait les cheveux depuis plusieurs années, principalement lors de moments
                de tension intense. La honte l'empêchait d'en parler à son entourage. Le comportement avait
                commencé à provoquer des zones de calvitie visibles.
              </p>
              <p>
                En hypnose, nous avons identifié la fonction du comportement : une façon de soulager une
                surcharge émotionnelle que rien d'autre ne permettait d'évacuer. Après 4 séances, l'arrachage
                avait cessé et elle avait retrouvé d'autres façons de gérer les pics de tension.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Vérifications compulsives — porte et gaz</div>
              <p>
                Marc*, 45 ans, vérifiait sa porte de sortie et ses plaques de gaz jusqu'à 8 fois avant de
                pouvoir partir au travail. Ce rituel lui prenait 30 minutes chaque matin et lui causait une
                anxiété permanente.
              </p>
              <p>
                En 5 séances d'hypnose, nous avons travaillé sur l'anxiété d'anticipation sous-jacente.
                Marc peut désormais partir sans vérification excessive, avec une confiance naturelle que
                tout est en ordre.
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
              { value: '4-6', label: 'séances pour réduire significativement l\'intensité des TOC et rituels' },
              { value: '100%', label: 'personnalisé selon vos rituels spécifiques et leur histoire' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et les TOC</h2>
          <div>
            {tocFaqItems.map((item, i) => (
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
          keywords={["TOC", "rituels compulsifs", "obsession", "trichotillomanie", "comportement répétitif"]}
          title="Articles sur les TOC et les comportements compulsifs"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-toc-rituels-paris"
          pageTitle="Hypnose pour les TOC et rituels à Paris"
          pageDescription="Hypnose ericksonienne pour accompagner les TOC, rituels compulsifs et comportements répétitifs au cabinet Paris 4ème ou en visio."
          topic="les TOC et les comportements obsessionnels compulsifs"
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
          <h2 className="sp-h2">Libérez-vous des rituels qui vous asservissent</h2>
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
            <Link to="/hypnose-onychophagie-paris">Onychophagie →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et anxiété →</Link>
            <Link to="/hypnose-gestion-emotions-paris">Gestion des émotions →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseTocRituelsParis;
