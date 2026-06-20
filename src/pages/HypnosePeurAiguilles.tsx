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

const peurAiguillesFaqItems = [
  {
    question: "L'hypnose peut-elle m'aider à supporter les prises de sang ?",
    answer: "Oui. La peur des aiguilles est un programme inconscient que l'hypnose permet de désactiver directement. Beaucoup de patients qui faisaient des malaises vagaux lors des prises de sang arrivent à se faire prélever sereinement après 2 à 3 séances. Je vous transmets également des techniques d'auto-hypnose à activer au moment du soin."
  },
  {
    question: "Combien de séances pour ne plus avoir peur des aiguilles ?",
    answer: "En moyenne, 2 à 3 séances permettent d'obtenir des résultats significatifs. Certaines personnes ressentent un changement dès la première séance. La première séance identifie l'origine de la peur et désensibilise la réaction phobique. Les suivantes ancrent un état de calme associé aux soins par injection."
  },
  {
    question: "Faut-il avoir un soin médical prévu pour commencer l'hypnose ?",
    answer: "Non. Vous pouvez commencer l'accompagnement à n'importe quel moment, même sans soin immédiatement prévu. Cela laisse le temps à votre inconscient d'intégrer les changements en profondeur. Si vous avez une prise de sang ou une vaccination urgente dans les deux semaines, un programme intensif avec séances rapprochées est possible."
  },
  {
    question: "L'hypnose peut-elle aussi traiter le malaise vagal ?",
    answer: "Oui. Le malaise vagal déclenché par la vue d'une aiguille ou d'une seringue est souvent lié à une réaction phobique. En désensibilisant cette réaction au niveau inconscient et en inhibant la réponse vasovagale, l'hypnose permet dans beaucoup de cas d'éliminer le malaise vagal associé."
  },
  {
    question: "J'évite les médecins à cause de cette peur. L'hypnose peut-elle m'aider à y retourner ?",
    answer: "Oui. Beaucoup de personnes souffrant de bélonéphobie évitent tout soin médical par anticipation des aiguilles — repoussant des bilans importants, refusant des vaccinations nécessaires. L'accompagnement en hypnose traite à la fois la peur de l'aiguille elle-même et l'anxiété anticipatoire qui pousse à l'évitement médical."
  },
  {
    question: "Les résultats sont-ils durables ?",
    answer: "Oui. L'hypnose reprogramme en profondeur vos associations inconscientes liées aux aiguilles. Une fois que votre cerveau a intégré que ces soins sont sûrs et gérables, ce changement devient permanent. La grande majorité des personnes accompagnées maintiennent leur neutralité face aux injections sans rechute."
  }
];

const HypnosePeurAiguilles = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose peur des aiguilles à Paris",
    "description": "Traitement de la peur des aiguilles (bélonéphobie) par l'hypnose ericksonienne. Cabinet Paris 4ème Marais-Bastille ou en visio. Résultats en 2 à 3 séances.",
    "url": "https://novahypnose.fr/hypnose-peur-aiguilles-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie bélonéphobie",
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
      { "@type": "ListItem", "position": 3, "name": "Peur des aiguilles", "item": "https://novahypnose.fr/hypnose-peur-aiguilles-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": peurAiguillesFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Malaise vagal", desc: "La vue d'une seringue provoque une chute de tension et une pré-syncope" },
    { title: "Évitement médical", desc: "Vous reportez bilans sanguins, vaccins, et tout soin impliquant une injection" },
    { title: "Panique anticipatoire", desc: "L'angoisse monte des jours avant le soin, bien avant l'aiguille" },
    { title: "Vaccination refusée", desc: "Vous ne vous faites pas vacciner — même pour des voyages importants" },
    { title: "Crispation et hyperventilation", desc: "À la vue de l'aiguille, votre corps se fige et votre respiration s'emballe" },
    { title: "Conséquences médicales", desc: "Des bilans importants non faits, des diagnostics retardés par évitement" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose peur des aiguilles (bélonéphobie) Paris | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de la peur des aiguilles par l'hypnose à Paris 4ème ou en visio. Bélonéphobie, prises de sang, vaccins, malaise vagal. Résultats durables en 2 à 3 séances." />
        <meta name="keywords" content="hypnose peur aiguilles paris, bélonéphobie hypnose paris, peur injections hypnose, vaincre peur prise de sang, hypnothérapeute peur aiguilles paris, malaise vagal hypnose, peur aiguilles hypnose en ligne, séance hypnose bélonéphobie visio france" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-peur-aiguilles-paris" />
        <meta property="og:title" content="Hypnose peur des aiguilles (bélonéphobie) Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de la peur des aiguilles par l'hypnose à Paris 4ème ou en visio. Bélonéphobie, prises de sang, vaccins, malaise vagal. Résultats durables en 2 à 3 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-peur-aiguilles-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose peur des aiguilles" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose peur des aiguilles (bélonéphobie) Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de la peur des aiguilles par l'hypnose à Paris 4ème ou en visio. Bélonéphobie, prises de sang, vaccins, malaise vagal. Résultats durables en 2 à 3 séances." />
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
          <div className="tag">Peur des aiguilles — Paris</div>
          <h1 className="sp-hero__h1">
            Prises de sang et vaccins<br/><em>sans angoisse</em>
          </h1>
          <p className="sp-hero__lead">
            Malaise à la vue d'une seringue, vaccins refusés, bilans sanguins repoussés depuis des
            années… La peur des aiguilles (bélonéphobie) touche environ <strong>10% de la
            population</strong>. L'hypnose ericksonienne agit à la racine de cette peur pour vous
            permettre de vous faire soigner sans angoisse. <strong>Résultats en 2 à 3 séances</strong>,
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
              <div className="section-tag">Bélonéphobie — comprendre</div>
              <h2 className="section-title">La peur des aiguilles<br/><em>nuit à votre santé ?</em></h2>
              <p>
                Vous repoussez vos bilans sanguins, vous refusez certains vaccins, vous vivez dans
                l'angoisse d'un soin qui nécessiterait une injection. Parfois, vous faites même un
                malaise à la simple vue d'une seringue — avant même le soin.
              </p>
              <p>
                La bélonéphobie est un mécanisme de protection installé par votre inconscient, souvent
                à partir d'une douleur passée ou d'un malaise traumatisant. La bonne nouvelle :
                <strong> ce qui a été appris peut être désappris</strong>.
              </p>
              <p>
                L'hypnose permet de reprogrammer cette réaction automatique rapidement, sans avoir
                à vous exposer à des aiguilles en séance, et sans revivre l'expérience déclencheuse.
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
                L'hypnose ericksonienne agit sur le programme inconscient qui déclenche la réaction
                de panique ou de malaise face aux aiguilles. Vous restez conscient et en contrôle
                pendant toute la séance. Je vous guide dans un état de relaxation profonde pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier l'origine de la peur (mauvaise expérience, malaise, transmission familiale)",
                  "Désensibiliser la réaction phobique à la vue d'une seringue ou d'une aiguille",
                  "Inhiber la réponse vasovagale inconsciente déclenchant le malaise",
                  "Ancrer un état de calme et de neutralité associé aux soins par injection",
                  "Vous enseigner des techniques d'auto-hypnose pour les soins futurs"
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
              <div className="sp-case__title">Grossesse et terreur des prises de sang</div>
              <p>
                Claire*, 32 ans, enceinte de 3 mois, redoutait les nombreuses prises de sang
                obligatoires du suivi prénatal. À chaque précédent soin, elle avait fait un malaise
                vagal. Elle venait de reporter une deuxième prise de sang indispensable depuis
                trois semaines.
              </p>
              <p>
                En 2 séances d'hypnose, nous avons désensibilisé la réaction vasovagale et ancré
                un état de calme associé aux prélèvements. Claire a pu faire tous ses bilans de
                grossesse sans incident, en activant la technique d'auto-hypnose apprise en séance.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Bilans évités depuis 8 ans</div>
              <p>
                Marc*, 45 ans, n'avait fait aucune prise de sang depuis 8 ans. Son médecin lui
                demandait régulièrement un bilan de santé — diabète, cholestérol, thyroïde — mais
                la seule idée d'une aiguille déclenchait une panique incontrôlable. Il avait fini
                par changer de médecin pour éviter le sujet.
              </p>
              <p>
                En 3 séances d'hypnose ericksonienne, nous avons travaillé sur l'origine de cette
                peur et installé un nouveau rapport aux soins médicaux. Marc a fait son bilan complet
                le mois suivant — pour la première fois depuis une décennie.
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
              { value: '2-3', label: 'séances suffisent en moyenne pour vaincre la peur des aiguilles' },
              { value: '10%', label: 'de la population souffre de bélonéphobie' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la peur des aiguilles</h2>
          <div>
            {peurAiguillesFaqItems.map((item, i) => (
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
          keywords={["aiguilles", "phobie", "peur", "médical", "injections"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur la peur des aiguilles et les phobies"
          accentColor="text-purple-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-peur-aiguilles-paris"
          pageTitle="Hypnose pour la peur des aiguilles à Paris"
          pageDescription="Hypnose ericksonienne pour traiter la peur des aiguilles (bélonéphobie) au cabinet Paris 4ème ou en visio."
          topic="la peur des aiguilles et la bélonéphobie"
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
          <h2 className="sp-h2">Libérez-vous de la peur des aiguilles</h2>
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
            <Link to="/hypnose-phobies-paris">Hypnose et phobies →</Link>
            <Link to="/hypnose-peur-dentiste-paris">Peur du dentiste →</Link>
            <Link to="/hypnose-peur-sang-paris">Peur du sang →</Link>
            <Link to="/peurdelavion">Peur de l'avion →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnosePeurAiguilles;
