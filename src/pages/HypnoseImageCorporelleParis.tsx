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

const imageCorporelleFaqItems = [
  {
    question: "L'hypnose peut-elle aider avec une image corporelle négative ?",
    answer: "Oui. L'image corporelle douloureuse est souvent le résultat d'un regard intérieur déformé par des expériences passées — remarques blessantes, comparaisons, honte corporelle. Ce regard n'est pas objectif : il a été construit. L'hypnose permet de remonter à l'origine de ces perceptions, de les déconstruire et d'installer un regard plus juste et plus bienveillant sur son propre corps. Ce n'est pas de la pensée positive forcée — c'est un travail réel de transformation intérieure."
  },
  {
    question: "Mon rapport douloureux au corps influence-t-il mon alimentation ?",
    answer: "Très fréquemment, oui. Une image corporelle négative peut entraîner des comportements alimentaires chaotiques — restriction, compensation, compulsions — dans une tentative de « corriger » le corps. Tant que l'image du corps n'est pas travaillée, les comportements alimentaires restent sous son emprise. L'hypnose aborde les deux dimensions de façon intégrée : la perception du corps et la relation à l'alimentation."
  },
  {
    question: "Combien de séances pour améliorer son image corporelle ?",
    answer: "L'image corporelle est souvent enracinée dans des expériences anciennes et peut nécessiter 5 à 8 séances pour un travail en profondeur. Les premières séances commencent à identifier et déconstruire les perceptions négatives. Les suivantes travaillent à installer un regard différent, plus neutre ou plus bienveillant. Beaucoup de personnes rapportent une amélioration significative dès les 3 premières séances."
  },
  {
    question: "Est-ce que je dois être prêt·e à regarder mon corps différemment ?",
    answer: "Je vous accompagne exactement là où vous en êtes. Il n'est pas nécessaire d'avoir une « bonne volonté » particulière ni d'être convaincu·e que c'est possible. L'hypnose travaille avec votre inconscient, qui peut évoluer même quand le conscient résiste. Vous avez juste besoin d'être prêt·e à explorer, pas à changer sur commande."
  },
  {
    question: "L'image corporelle douloureuse est-elle liée à des expériences passées ?",
    answer: "Presque toujours. Une remarque d'un parent, des moqueries d'enfants à l'école, une comparaison répétée avec un frère ou une sœur, un regard médical maladroit — ces expériences s'inscrivent dans l'inconscient et façonnent durablement la façon dont on perçoit son corps. L'hypnose permet de revisiter ces expériences pour les intégrer différemment, sans les nier, mais sans qu'elles continuent à définir votre regard sur vous-même."
  }
];

const HypnoseImageCorporelleParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose image corporelle Paris",
    "description": "Transformez votre rapport à votre corps par l'hypnose ericksonienne à Paris 4ème ou en visio. Image corporelle douloureuse, regard négatif sur son corps — changer de l'intérieur.",
    "url": "https://novahypnose.fr/hypnose-image-corporelle-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie image corporelle",
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
      { "@type": "ListItem", "position": 3, "name": "Image corporelle douloureuse", "item": "https://novahypnose.fr/hypnose-image-corporelle-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": imageCorporelleFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Regard sévère et déformé sur son corps", desc: "Vous vous voyez différemment des autres — souvent plus large, moins bien, imparfait. Même après avoir maigri, le regard ne change pas" },
    { title: "Évitement des miroirs ou obsession", desc: "Vous fuyez les miroirs — ou au contraire, vous ne pouvez pas vous empêcher de vous examiner et de chercher les défauts" },
    { title: "Honte corporelle sociale", desc: "Vous évitez la piscine, les vêtements moulants, les situations où votre corps est visible — la peur du regard des autres est permanente" },
    { title: "Rapport au corps influencé par l'alimentation", desc: "Ce que vous mangez, et comment vous mangez, est dicté par l'image que vous voulez avoir de votre corps — pas par vos besoins réels" },
    { title: "Comparaisons constantes et douloureuses", desc: "Vous comparez votre corps à celui des autres — en rue, dans les médias — et en sortez toujours dévalorisé·e" },
    { title: "Ancrage dans des remarques passées", desc: "Une remarque entendue il y a 10 ou 20 ans continue de définir votre regard sur vous — comme si elle était encore vraie aujourd'hui" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose image corporelle Paris & en ligne | Alain Zenatti</title>
        <meta name="description" content="Transformez votre rapport à votre corps par l'hypnose à Paris 4ème ou en visio. Image corporelle négative, honte corporelle — l'hypnose change le regard intérieur. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose image corporelle paris, dysmorphophobie légère hypnose, honte corporelle hypnose paris, image du corps traitement hypnose, rapport au corps hypnose paris, image corporelle négative hypnose" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-image-corporelle-paris" />
        <meta property="og:title" content="Hypnose image corporelle Paris & en ligne | Alain Zenatti" />
        <meta property="og:description" content="Transformez votre rapport à votre corps par l'hypnose à Paris 4ème ou en visio. L'hypnose change le regard intérieur." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-image-corporelle-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose image corporelle" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose image corporelle Paris & en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Transformez votre rapport à votre corps par l'hypnose à Paris 4ème ou en visio." />
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
          <div className="tag">Image corporelle — Paris</div>
          <h1 className="sp-hero__h1">
            Réconcilier avec son corps —<br/><em>changer le regard intérieur</em>
          </h1>
          <p className="sp-hero__lead">
            Vous ne vous voyez pas comme vous êtes. Le regard que vous portez sur votre corps
            a été construit par des expériences douloureuses, des mots entendus, des comparaisons
            répétées. L'hypnose permet de <strong>déconstruire ce regard et d'en installer un
            nouveau</strong>, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Image corporelle — comprendre</div>
              <h2 className="section-title">L'image du corps<br/><em>n'est pas un miroir fidèle.</em></h2>
              <p>
                L'image corporelle n'est pas ce que vous voyez dans le miroir — c'est ce que vous
                croyez voir. Cette perception est façonnée par des années d'expériences : un parent
                qui commentait votre poids, des enfants qui se moquaient, un médecin qui vous a fait
                honte, des images de corps « parfaits » ingurgitées depuis l'adolescence.
              </p>
              <p>
                Cette construction est inconsciente — c'est pourquoi « se dire qu'on est bien » ne
                change rien. Le regard que vous portez sur vous est ancré profondément, et c'est en
                profondeur qu'il faut le travailler.
              </p>
              <p>
                L'hypnose accède à ces couches profondes. Elle permet de revisiter les expériences
                fondatrices de votre image du corps et de les intégrer différemment — pour que vous
                puissiez vous voir plus justement, et vous habiter plus librement.
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
              <div className="section-tag">Mécanisme — reconstruire le regard</div>
              <h2 className="section-title">L'hypnose transforme<br/><em>la perception de son corps.</em></h2>
              <p>
                En état de relaxation profonde, je vous guide pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier les expériences fondatrices de l'image corporelle négative",
                  "Revisiter ces souvenirs pour les intégrer différemment, sans les nier",
                  "Déconditionner les associations entre regard extérieur et valeur personnelle",
                  "Installer une perception plus neutre et bienveillante de son propre corps",
                  "Réduire la charge émotionnelle des situations d'exposition corporelle",
                  "Rétablir un sentiment d'habiter son corps plutôt que de le subir"
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

      {/* Témoignage — 1 seul pour cette page */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Témoignage au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Déconstruire le regard de l'enfance</div>
              <p>
                Nadia*, 41 ans, était obsédée par son ventre depuis ses 14 ans — date à laquelle
                un adulte de confiance avait fait une remarque sur son poids, en public. Depuis,
                elle portait des vêtements amples, évitait la plage, et ne se regardait jamais
                dans un miroir en pied. Elle avait un poids tout à fait ordinaire. Mais ce qu'elle
                voyait ne correspondait pas à la réalité.
              </p>
              <p>
                En 6 séances, nous avons travaillé sur cette expérience fondatrice. L'hypnose a permis
                de revisiter ce moment avec les ressources de l'adulte qu'elle était devenue — et de
                comprendre que ce regard n'avait jamais été le sien. Aujourd'hui, elle dit qu'elle
                « occupe son corps » d'une façon qu'elle n'avait pas connue depuis l'enfance.
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
              { value: '5-8', label: 'séances pour transformer en profondeur le regard sur son corps' },
              { value: '100%', label: 'bienveillance et confidentialité absolues au cabinet' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et l'image corporelle</h2>
          <div>
            {imageCorporelleFaqItems.map((item, i) => (
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
          keywords={["image corporelle", "rapport au corps", "honte corporelle", "confiance en soi corps"]}
          title="Articles sur l'image corporelle et le rapport au corps"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-image-corporelle-paris"
          pageTitle="Hypnose pour l'image corporelle à Paris"
          pageDescription="Hypnose ericksonienne pour transformer le rapport au corps et l'image corporelle au cabinet Paris 4ème ou en visio."
          topic="l'image corporelle et la perception du corps"
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
              authors: "Cash TF, Pruzinsky T",
              title: "Body Image: A Handbook of Theory, Research, and Clinical Practice",
              source: "Guilford Press",
              year: 2002,
              url: "https://www.guilford.com/books/Body-Image/Cash-Pruzinsky/9781572307650",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt·e à vous voir différemment ?</h2>
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
            <Link to="/hypnose-boulimie-paris">Boulimie →</Link>
            <Link to="/hypnose-alimentation-emotionnelle-paris">Alimentation émotionnelle →</Link>
            <Link to="/hypnose-compulsions-alimentaires-paris">Compulsions alimentaires →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseImageCorporelleParis;
