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

const colereFaqItems = [
  {
    question: "Comment l'hypnose agit-elle sur la colère et l'irritabilité ?",
    answer: "La colère chronique est rarement une émotion isolée — elle est souvent le signal d'une blessure ancienne, d'un besoin non satisfait ou d'un apprentissage familial qui s'est ancré dans l'inconscient. L'hypnose remonte à ces sources, libère la charge émotionnelle qui les alimente, et reprogramme la réponse automatique. Vous ne devenez pas insensible — vous récupérez simplement le choix de votre réaction."
  },
  {
    question: "Est-ce que l'hypnose peut vraiment aider à contrôler les explosions de colère ?",
    answer: "Oui. Les explosions de colère sont souvent des réponses automatiques déclenchées par l'inconscient avant même que la conscience intervienne. En travaillant directement avec l'inconscient, l'hypnose reprogramme ce mécanisme : le déclencheur reste, mais la réponse change. Beaucoup de patients décrivent un espace de recul qui s'installe naturellement là où avant la colère explosait immédiatement."
  },
  {
    question: "La colère n'est-elle pas une émotion saine à ne pas supprimer ?",
    answer: "Absolument. La colère est une émotion naturelle et utile — elle signale une violation de nos limites ou de nos valeurs. L'objectif de l'hypnose n'est pas de supprimer la colère, mais de transformer les réactions disproportionnées ou destructrices en expressions adaptées. Vous continuez à ressentir votre colère, mais vous choisissez comment et quand l'exprimer."
  },
  {
    question: "Combien de séances faut-il pour réduire l'irritabilité chronique ?",
    answer: "En général, 3 à 5 séances permettent une amélioration significative de la gestion de la colère. La première séance identifie les déclencheurs et les racines inconscientes. Les séances suivantes travaillent sur la libération des anciennes charges et l'installation de nouvelles réponses automatiques. Les résultats sont souvent perceptibles dès la deuxième ou troisième séance."
  },
  {
    question: "L'hypnose aide-t-elle quand la colère abîme les relations proches ?",
    answer: "C'est précisément l'une des indications les plus fréquentes. La colère chronique crée souvent un cercle vicieux : les explosions endommagent les relations, ce qui génère de la culpabilité et de la honte, qui alimentent à leur tour la tension intérieure et les réactions disproportionnées. L'hypnose travaille sur l'ensemble de ce cycle, en libérant la pression inconsciente et en restaurant une relation plus apaisée avec les proches."
  }
];

const HypnoseColereParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose colère et irritabilité Paris",
    "description": "Accompagnement de la colère chronique et de l'irritabilité par l'hypnose ericksonienne à Paris 4ème ou en visio. Explosions incontrôlées, réactions disproportionnées, impatience.",
    "url": "https://novahypnose.fr/hypnose-colere-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie colère et irritabilité",
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
      { "@type": "ListItem", "position": 2, "name": "Troubles émotionnels", "item": "https://novahypnose.fr/hypnose-troubles-emotionnels-paris" },
      { "@type": "ListItem", "position": 3, "name": "Colère et irritabilité", "item": "https://novahypnose.fr/hypnose-colere-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": colereFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Explosions soudaines", desc: "Vous vous emportez pour des raisons qui semblent dérisoires, et regrettez immédiatement votre réaction" },
    { title: "Irritabilité chronique", desc: "Tout vous agace, vous êtes à fleur de peau en permanence, le moindre imprévu vous exaspère" },
    { title: "Réactions disproportionnées", desc: "Votre colère est bien plus forte que la situation ne le justifie, vous le savez mais ne pouvez pas l'arrêter" },
    { title: "Impatience permanente", desc: "Vous supportez mal les délais, les lenteurs, les erreurs des autres — la frustration monte immédiatement" },
    { title: "Tension relationnelle", desc: "Vos proches marchent sur des œufs, vos relations souffrent de cette colère qui s'exprime sans filtre" },
    { title: "Culpabilité après-coup", desc: "Après l'explosion, la honte et la culpabilité s'installent — sans que cela empêche la prochaine" }
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose colère et irritabilité Paris | Alain Zenatti</title>
        <meta name="description" content="Accompagnement de la colère chronique par l'hypnose à Paris 4ème ou en visio. Explosions incontrôlées, irritabilité, réactions disproportionnées. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose colère paris, hypnose irritabilité paris, gestion colère hypnose, explosions colère traitement, hypnose réactions disproportionnées paris, hypnose colère en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-colere-paris" />
        <meta property="og:title" content="Hypnose colère et irritabilité Paris | Alain Zenatti" />
        <meta property="og:description" content="Accompagnement de la colère chronique par l'hypnose à Paris 4ème ou en visio. Explosions incontrôlées, irritabilité, réactions disproportionnées." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-colere-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose colère" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose colère et irritabilité Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Accompagnement de la colère chronique par l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Colère — Paris</div>
          <h1 className="sp-hero__h1">
            Retrouvez le calme<br/><em>sans perdre votre énergie</em>
          </h1>
          <p className="sp-hero__lead">
            Explosions incontrôlées, irritabilité permanente, réactions disproportionnées — la colère
            chronique n'est pas un défaut de caractère. C'est un <strong>mécanisme inconscient</strong> que
            l'hypnose peut transformer, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Colère — comprendre</div>
              <h2 className="section-title">La colère ne vient pas<br/><em>de nulle part.</em></h2>
              <p>
                Quand la colère explose de façon disproportionnée ou répétitive, elle dit quelque chose
                d'important : un besoin non satisfait, une blessure ancienne jamais digérée, un apprentissage
                familial qui s'est gravé dans l'inconscient.
              </p>
              <p>
                Le problème, c'est que la colère chronique ne s'exprime pas — elle réagit. Elle court-circuite
                la réflexion et déclenche une réponse automatique avant même que vous ayez le temps d'y penser.
              </p>
              <p>
                L'hypnose ericksonienne dialogue directement avec ce système automatique pour transformer
                la réponse à la source — pas seulement gérer les symptômes en surface.
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
          <h2 className="sp-h2">Reconnaissez-vous ces manifestations ?</h2>
          <div className="sp-grid-2">
            {manifestations.map((m) => (
              <div key={m.title} className="sp-card reveal">
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
              <div className="section-tag">Mécanisme — transformer à la source</div>
              <h2 className="section-title">L'hypnose reprogramme<br/><em>votre réponse automatique.</em></h2>
              <p>
                En état de relaxation profonde, l'inconscient devient accessible. Je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier les déclencheurs inconscients et leur origine",
                  "Remonter aux blessures ou apprentissages qui alimentent la colère",
                  "Libérer la charge émotionnelle accumulée",
                  "Installer un espace de recul naturel avant la réaction",
                  "Transformer les réponses automatiques disproportionnées",
                  "Retrouver des relations plus sereines avec vos proches"
                ].map((item) => (
                  <div key={item} className="sp-check-item">
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
          <h2 className="sp-h2">Exemples de parcours au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Explosions au travail — retrouver la maîtrise</div>
              <p>
                Marc*, 41 ans, manager, explosait régulièrement en réunion pour des raisons qui semblaient
                dérisoires. Il savait que ses réactions étaient disproportionnées mais ne pouvait pas
                s'arrêter. Sa carrière et son autorité commençaient à en pâtir.
              </p>
              <p>
                En hypnose, nous avons retracé ces explosions à une période où, enfant, il ne se sentait
                jamais entendu. Après 4 séances, il décrivait une sensation de recul naturel qui s'installait
                là où avant la colère prenait le dessus immédiatement.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Irritabilité familiale — quand la maison devient un champ de mines</div>
              <p>
                Sophie*, 38 ans, rentrait du travail épuisée et s'emportait pour tout — un jouet mal rangé,
                une question de trop. Ses enfants marchaient sur des œufs et son couple souffrait. Elle
                se sentait coupable mais ne trouvait pas comment changer.
              </p>
              <p>
                En 3 séances, nous avons travaillé sur la charge accumulée et les déclencheurs spécifiques.
                La tension qui s'installait le soir avant de rentrer a progressivement disparu.
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
              { value: '3-5', label: 'séances pour transformer durablement les réactions de colère' },
              { value: '100%', label: 'personnalisé — on remonte aux sources spécifiques de votre colère' },
              { value: '5/5', label: 'note moyenne sur Resalib et Google' },
            ].map((s) => (
              <div key={s.value} className="sp-stat reveal">
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la colère</h2>
          <div>
            {colereFaqItems.map((item, i) => (
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
          keywords={["colère", "irritabilité", "émotions", "gestion émotionnelle"]}
          title="Articles sur la colère et l'irritabilité"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-colere-paris"
          pageTitle="Hypnose pour la colère et l'irritabilité à Paris"
          pageDescription="Hypnose ericksonienne pour accompagner la colère chronique, les explosions incontrôlées et l'irritabilité — au cabinet Paris 4ème ou en visio."
          topic="la gestion de la colère et des émotions"
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
              authors: "Gross JJ",
              title: "Emotion Regulation: Current Status and Future Prospects",
              source: "Psychological Inquiry",
              year: 2015,
              url: "https://pubmed.ncbi.nlm.nih.gov/26170952/",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt à transformer votre rapport à la colère ?</h2>
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
            <Link to="/hypnose-troubles-emotionnels-paris">Troubles émotionnels →</Link>
            <Link to="/hypnose-hypersensibilite-paris">Hypersensibilité →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Stress & Anxiété →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseColereParis;
