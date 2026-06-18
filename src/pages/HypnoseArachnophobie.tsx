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

const arachnophobieFaqItems = [
  {
    question: "L'hypnose peut-elle vraiment faire disparaître la peur des araignées ?",
    answer: "Oui. L'arachnophobie est un programme inconscient appris — et ce qui a été appris peut être désappris. L'hypnose ericksonienne accède directement à ce programme pour le reconfigurer. La grande majorité des arachnophobes traités par hypnose constatent une transformation radicale : de la panique à l'indifférence totale, souvent en 2 à 3 séances."
  },
  {
    question: "Est-ce que je vais devoir toucher des araignées pendant les séances ?",
    answer: "Absolument pas. L'hypnose n'est pas de la thérapie par exposition. Vous restez dans votre fauteuil, en état de relaxation profonde, et nous travaillons uniquement sur votre représentation mentale. Aucune araignée ni image d'araignée n'est présente dans le cabinet."
  },
  {
    question: "Ma peur est héritée de ma mère — est-ce que ça change quelque chose ?",
    answer: "Non. Que votre arachnophobie soit héritée, apprise par imitation ou née d'un événement traumatique, le mécanisme inconscient est identique. L'hypnose peut travailler sur toutes ces origines. Souvent, une seule session suffit à identifier et neutraliser le programme transmis."
  },
  {
    question: "Combien de temps durent les résultats ?",
    answer: "Les résultats sont durables. Une fois que votre inconscient a reconfiguré sa réponse face aux araignées, ce changement s'inscrit dans votre système nerveux. La grande majorité des patients ne ressentent plus jamais de réaction phobique après leur accompagnement."
  },
  {
    question: "L'hypnose fonctionne-t-elle pour les insectes en général ?",
    answer: "Oui. Si votre peur s'est étendue à d'autres arthropodes (guêpes, mouches, moustiques, cafards), l'hypnose peut travailler sur l'ensemble du spectre. Nous identifions le programme original, qui est souvent à l'origine de toutes ces peurs, et le neutralisons à la source."
  },
  {
    question: "Puis-je faire mes séances en visio si je vis en dehors de Paris ?",
    answer: "Oui. Les séances d'hypnose en visioconférence (Google Meet) sont aussi efficaces qu'en cabinet. L'état hypnotique s'atteint parfaitement à distance. Je reçois des patients de toute la France pour des phobies traitées intégralement en visio."
  }
];

const HypnoseArachnophobie = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose arachnophobie Paris",
    "description": "Traitement de l'arachnophobie (peur des araignées et insectes) par l'hypnose ericksonienne. Cabinet Paris 4ème ou en visio.",
    "url": "https://novahypnose.fr/hypnose-arachnophobie-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie arachnophobie",
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
      { "@type": "ListItem", "position": 2, "name": "Phobies et peurs", "item": "https://novahypnose.fr/hypnose-phobies-paris" },
      { "@type": "ListItem", "position": 3, "name": "Arachnophobie", "item": "https://novahypnose.fr/hypnose-arachnophobie-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": arachnophobieFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Réaction de panique immédiate", desc: "Cris, fuite ou paralysie totale à la vue d'une araignée, même minuscule" },
    { title: "Anticipation permanente", desc: "Vous inspectez chaque pièce, chaque coin, vous ne pouvez pas vous endormir sans vérifier votre lit" },
    { title: "Évitement des espaces naturels", desc: "Randonnées, jardins, caves, greniers… des pans entiers de votre vie sont compromis" },
    { title: "Propagation aux insectes", desc: "Mouches, guêpes, moustiques… votre peur s'est étendue à tout ce qui rampe ou vole" },
    { title: "Tension constante en été", desc: "La saison chaude est une source d'anxiété permanente, vous ne pouvez pas vous détendre" },
    { title: "Impact sur votre entourage", desc: "Votre peur perturbe votre famille, vos colocataires, votre vie sociale" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose arachnophobie (peur des araignées) Paris | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de l'arachnophobie (peur des araignées) par l'hypnose à Paris 4ème ou en visio. Araignées, insectes, vermines — résultats durables en 2 à 3 séances." />
        <meta name="keywords" content="hypnose arachnophobie paris, peur araignées hypnose, traitement arachnophobie, vaincre peur araignées hypnose, hypnothérapeute arachnophobie paris, hypnose insectes, peur araignées hypnose en ligne" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-arachnophobie-paris" />
        <meta property="og:title" content="Hypnose arachnophobie (peur des araignées) Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de l'arachnophobie (peur des araignées) par l'hypnose à Paris 4ème ou en visio. Araignées, insectes, vermines — résultats durables en 2 à 3 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-arachnophobie-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose arachnophobie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose arachnophobie (peur des araignées) Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de l'arachnophobie (peur des araignées) par l'hypnose à Paris 4ème ou en visio. Araignées, insectes, vermines — résultats durables en 2 à 3 séances." />
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
            <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
              <path d="M 0 720 C 200 660, 500 640, 800 680 C 1100 720, 1280 700, 1440 740 L 1440 900 L 0 900 Z" fill="#2B4BA0" opacity="0.88" />
            </g>
            <rect width="1440" height="900" filter="url(#paperGrain)" opacity=".2" />
          </svg>
        </div>
        <div className="container sp-hero__inner reveal">
          <div className="tag">Arachnophobie — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous de la peur des araignées
          </h1>
          <p className="sp-hero__lead" dangerouslySetInnerHTML={{ __html: "La simple vue d'une araignée vous glace d'effroi ? Cri, fuite, paralysie, incapacité à entrer dans une pièce… L'arachnophobie touche environ <strong>une personne sur quatre</strong>. L'hypnose ericksonienne neutralise cette peur à sa racine. <strong>Résultats en 2 à 3 séances</strong>, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>." }} />
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
              <div className="section-tag">Arachnophobie — comprendre</div>
              <h2 className="section-title">L'arachnophobie,<br/><em>plus qu'une simple peur ?</em></h2>
              <p>
                L'arachnophobie est la peur phobique des araignées et, par extension, de nombreux autres arthropodes. C'est l'une des phobies les plus répandues dans le monde occidental. Pourtant, dans la grande majorité des cas, les araignées auxquelles vous êtes exposé sont parfaitement inoffensives.
              </p>
              <p>
                Votre peur ne correspond donc pas à un danger réel — elle est le résultat d'un programme inconscient installé à un moment de votre vie. Ce programme peut avoir été déclenché par un événement marquant (une araignée tombée sur vous enfant, une réaction de peur d'un parent) ou s'être installé progressivement, sans cause apparente.
              </p>
              <p>
                La bonne nouvelle : votre inconscient peut apprendre à réagir différemment — et l'hypnose est l'un des outils les plus efficaces pour cela.
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
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 240 220 C 295 200, 345 235, 338 290 C 331 340, 285 368, 240 355 C 198 342, 180 305, 198 263 C 210 238, 225 228, 240 220 Z" fill="#F2A12E" opacity="0.7" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Manifestations / Vous reconnaissez-vous ? */}
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

      {/* Comment ça marche */}
      <section className="sp-section">
        <div className="container">
          <div className="cabinet__grid cabinet__grid--reverse reveal">
            <div className="cabinet__visual" aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 260 60 C 320 60, 480 140, 490 260 C 498 360, 430 460, 320 490 C 220 518, 100 485, 50 395 C 5 313, 30 195, 100 135 C 158 87, 210 60, 260 60 Z" fill="#2B4BA0" opacity="0.88" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 260 30 L 350 140 L 490 130 L 410 240 L 460 380 L 320 310 L 200 420 L 190 270 L 50 210 L 185 185 Z" fill="#F2A12E" opacity="0.75" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
            </div>
            <div className="cabinet__copy">
              <div className="section-tag">Mécanisme — désensibilisation</div>
              <h2 className="section-title">L'hypnose désactive<br/><em>la peur à la racine.</em></h2>
              <p>
                L'hypnose ericksonienne agit sur le programme inconscient qui déclenche la réaction de panique face aux araignées. Vous restez conscient et en contrôle pendant toute la séance. Je vous guide dans un état de relaxation profonde pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier le déclencheur initial (événement fondateur, transmission familiale, exposition médiatique)",
                  "Dissocier l'émotion de panique du stimulus visuel (l'araignée, l'insecte)",
                  "Reconfigurer la réponse automatique : de la panique à la neutralité ou l'indifférence",
                  "Ancrer un état de calme que vous pouvez activer face à un arthropode",
                  "Vous donner des outils d'auto-hypnose pour consolider les changements"
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
              <div className="sp-case__title">Arachnophobie depuis l'enfance</div>
              <p>
                Marie*, 32 ans, ne pouvait pas entrer dans une pièce sans l'avoir minutieusement inspectée. La peur lui avait été transmise par sa mère. En 2 séances d'hypnose, nous avons retracé l'origine de ce programme inconscient et l'avons neutralisé. Marie peut désormais attraper une araignée avec un verre sans le moindre tremblement.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Peur paralysante le soir</div>
              <p>
                Karim*, 41 ans, ne pouvait pas s'endormir sans avoir vérifié sa chambre. Sa femme devait inspecter les murs chaque soir avant qu'il éteigne la lumière. En 3 séances, sa réaction de panique a disparu. Il dort maintenant sans rituel d'inspection.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Peur généralisée aux insectes</div>
              <p>
                Lucie*, 26 ans, avait une arachnophobie qui s'était étendue à tous les insectes. Elle ne pouvait pas profiter de son jardin ni partir en camping. Après 3 séances, elle a passé ses vacances en pleine nature sans anxiété.
              </p>
            </div>
          </div>
          <p className="sp-footnote">* Prénoms modifiés pour préserver la confidentialité</p>
        </div>
      </section>

      {/* Témoignage */}
      <section className="sp-section">
        <div className="container sp-narrow">
          <blockquote className="sp-quote reveal">
            <p>
              Mr Zenatti est un praticien calme et réfléchi. Son écoute attentive lui a permis de
              déterminer les axes de travail, les points d'amélioration, les émotions limitantes.
              En quelques séances, j'ai pu me libérer de certains blocages et entamer des
              changements pérennes.
            </p>
            <footer>— Philippe A., avis Google vérifié</footer>
          </blockquote>
        </div>
      </section>

      {/* Stats */}
      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <div className="sp-stats">
            {[
              { value: '2-3', label: 'séances suffisent en moyenne pour traiter l\'arachnophobie' },
              { value: '90%', label: 'des personnes accompagnées retrouvent une réaction neutre face aux araignées' },
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
          <h2 className="sp-h2">Questions fréquentes sur la peur des araignées</h2>
          <div>
            {arachnophobieFaqItems.map((item, i) => (
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
          keywords={["araignées", "arachnophobie", "phobie", "peur", "phobique"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur l'arachnophobie et les phobies"
          accentColor="text-purple-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-arachnophobie-paris"
          pageTitle="Hypnose pour l'arachnophobie à Paris"
          pageDescription="Hypnose ericksonienne pour l'arachnophobie (peur des araignées) au cabinet Paris 4ème ou en visio."
          topic="l'arachnophobie et les phobies animales"
          dateModified="2026-06-18"
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
          <h2 className="sp-h2">Libérez-vous de la peur des araignées</h2>
          <p className="sp-lead">Cabinet Paris 4ème – Marais-Bastille (Métro Bastille, lignes 1, 5, 8) • Séances au cabinet ou en visio partout en France</p>
          <div className="hero__cta" style={{justifyContent:'center'}}>
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
               style={{background:'var(--lin)', color:'var(--cobalt)'}}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089" style={{borderColor:'rgba(240,236,227,.4)', color:'var(--lin)'}}>06 49 35 80 89</a>
          </div>
          <div className="sp-links">
            <Link to="/hypnose-phobies-paris">Toutes les phobies →</Link>
            <Link to="/peurdelavion">Peur de l'avion →</Link>
            <Link to="/hypnose-claustrophobie-paris">Claustrophobie →</Link>
            <Link to="/hypnose-acrophobie-paris">Peur du vide →</Link>
            <Link to="/hypnose-peur-parler-public-paris">Peur de parler en public →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseArachnophobie;
