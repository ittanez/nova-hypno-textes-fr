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

const peurSangFaqItems = [
  {
    question: "L'hypnose peut-elle m'aider à ne plus faire de malaise face au sang ?",
    answer: "Oui. La peur du sang déclenche une réaction dite vasovagale — une chute brusque de la pression artérielle qui provoque le malaise ou l'évanouissement. Cette réaction est un programme inconscient que l'hypnose peut désactiver en agissant directement sur le système nerveux autonome."
  },
  {
    question: "Combien de séances pour ne plus avoir peur du sang ?",
    answer: "En moyenne, 2 à 3 séances permettent d'obtenir des résultats significatifs. La première séance identifie l'origine et désensibilise la réaction phobique. Les suivantes ancrent un nouvel état de neutralité face au sang et vous transmettent des techniques d'auto-régulation pour les situations imprévues."
  },
  {
    question: "Faut-il avoir un événement médical prévu pour commencer ?",
    answer: "Non. Vous pouvez commencer l'accompagnement à n'importe quel moment. L'hypnose agit sur le programme inconscient lui-même, pas sur une situation spécifique. Si vous avez un soin urgent dans les deux semaines, un programme intensif avec séances rapprochées est possible."
  },
  {
    question: "Ma peur du sang m'empêche d'exercer certains métiers. L'hypnose peut-elle aider ?",
    answer: "Oui, c'est un cas que je traite régulièrement. Étudiants en médecine, aides-soignants, infirmiers, sapeurs-pompiers — certains professionnels développent une peur du sang qui menace leur carrière. L'hypnose permet de désensibiliser cette réaction spécifiquement, sans toucher aux autres aspects de votre pratique professionnelle."
  },
  {
    question: "Je fais des malaises même à la télévision face à des scènes de blessures. L'hypnose peut-elle traiter ça aussi ?",
    answer: "Oui. L'hypnose travaille sur la réaction phobique globale à l'image du sang, pas uniquement au sang réel. Les patients que j'accompagne retrouvent généralement la capacité de regarder des films, des informations et des séries médicales sans réaction phobique."
  },
  {
    question: "Les résultats sont-ils durables ?",
    answer: "Oui. L'hypnose reprogramme en profondeur vos associations inconscientes liées au sang. Une fois que votre système nerveux autonome a intégré une réponse de neutralité face au sang, ce changement devient permanent. La grande majorité des personnes accompagnées ne rechutent pas."
  }
];

const HypnosePeurSang = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose peur du sang à Paris",
    "description": "Traitement de la peur du sang (hématophobie) par l'hypnose ericksonienne. Cabinet Paris 4ème Marais-Bastille ou en visio. Résultats en 2 à 3 séances.",
    "url": "https://novahypnose.fr/hypnose-peur-sang-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie hématophobie",
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
      { "@type": "ListItem", "position": 3, "name": "Peur du sang", "item": "https://novahypnose.fr/hypnose-peur-sang-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": peurSangFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Malaise ou évanouissement", desc: "La vue du sang provoque une chute de tension et une perte de connaissance" },
    { title: "Évitement médical", desc: "Vous refusez des soins, des opérations, tout ce qui implique un risque de voir du sang" },
    { title: "Restrictions au quotidien", desc: "Certains films, émissions, actualités sont impossibles à regarder" },
    { title: "Angoisse des blessures banales", desc: "Une coupure ordinaire devient une catastrophe émotionnelle à gérer" },
    { title: "Limitation professionnelle", desc: "Métiers médicaux, secourisme, ambulancier — cette peur bloque des vocations entières" },
    { title: "Peur de voir saigner ses proches", desc: "Vous craignez de ne pas pouvoir réagir si un enfant ou proche se blesse" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose peur du sang (hématophobie) Paris | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de la peur du sang par l'hypnose à Paris 4ème ou en visio. Hématophobie, malaises, évanouissements, réaction vasovagale. Résultats durables en 2 à 3 séances." />
        <meta name="keywords" content="hypnose peur sang paris, hématophobie hypnose paris, peur du sang hypnose, malaise vagal sang hypnose, vaincre peur sang, hypnothérapeute hématophobie paris, peur sang hypnose en ligne, séance hypnose hématophobie visio france" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-peur-sang-paris" />
        <meta property="og:title" content="Hypnose peur du sang (hématophobie) Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de la peur du sang par l'hypnose à Paris 4ème ou en visio. Hématophobie, malaises, évanouissements, réaction vasovagale. Résultats durables en 2 à 3 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-peur-sang-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose peur du sang" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose peur du sang (hématophobie) Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de la peur du sang par l'hypnose à Paris 4ème ou en visio. Hématophobie, malaises, évanouissements, réaction vasovagale. Résultats durables en 2 à 3 séances." />
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
          <div className="tag">Peur du sang — Paris</div>
          <h1 className="sp-hero__h1">
            Reprenez le contrôle<br/><em>face au sang</em>
          </h1>
          <p className="sp-hero__lead">
            Malaise ou évanouissement à la vue du sang, impossibilité de regarder certaines scènes,
            soins médicaux vécus comme une épreuve… La peur du sang (hématophobie) touche environ
            <strong> 3 à 4% de la population</strong>. L'hypnose ericksonienne agit à la racine
            de cette peur pour que vous repreniez le contrôle. <strong>Résultats en 2 à 3
            séances</strong>, au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Hématophobie — comprendre</div>
              <h2 className="section-title">La peur du sang<br/><em>vous limite au quotidien ?</em></h2>
              <p>
                Vous évitez certains films, certaines émissions, certaines situations médicales.
                Vous redoutez que vos proches se blessent. Parfois, vous-même faites un malaise
                à la simple vue de sang — même en quantité infime.
              </p>
              <p>
                L'hématophobie est particulière : contrairement à la plupart des phobies qui
                déclenchent une montée d'adrénaline, la peur du sang peut provoquer une chute
                brusque de pression artérielle (réflexe vasovagal) menant à l'évanouissement.
                La bonne nouvelle : <strong>ce programme inconscient peut être désactivé</strong>.
              </p>
              <p>
                L'hypnose permet de reprogrammer cette réaction automatique rapidement, sans avoir
                à vous exposer au sang en séance.
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
                vasovagale face au sang. Vous restez conscient et en contrôle pendant toute la séance.
                Je vous guide dans un état de relaxation profonde pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier l'origine de la phobie (choc visuel, malaise passé, expérience traumatique)",
                  "Inhiber la réponse vasovagale inconsciente au niveau du système nerveux autonome",
                  "Désensibiliser progressivement les stimuli déclencheurs — vue du sang, scènes médicales",
                  "Ancrer un état de neutralité et de contrôle face à ces situations",
                  "Vous enseigner des techniques d'auto-régulation pour les situations imprévues"
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
              <div className="sp-case__title">Aide-soignante et malaises répétés</div>
              <p>
                Nathalie*, 34 ans, aide-soignante depuis 6 ans, avait développé progressivement une
                peur du sang après un incident marquant en service. Elle faisait des malaises lors
                de certains soins et craignait pour son poste — et pour ses patients.
              </p>
              <p>
                En 3 séances d'hypnose ericksonienne, nous avons désensibilisé la réaction
                vasovagale et inhibé la réponse d'évanouissement au niveau inconscient. Nathalie a
                pu reprendre ses soins sans incident dans les deux semaines suivant notre dernière
                séance.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Parent incapable de soigner son enfant</div>
              <p>
                Benoît*, 40 ans, père de deux enfants, ne pouvait pas gérer une blessure banale
                de ses enfants sans faire un pré-malaise. La vue du moindre saignement le forçait
                à s'asseoir, la tête entre les genoux, pendant que son enfant attendait. Il se
                sentait défaillant dans son rôle de parent.
              </p>
              <p>
                En 2 séances, nous avons travaillé sur le mécanisme vasovagal et ancré un état
                de calme fonctionnel face au sang. Benoît a pu gérer les petites blessures de ses
                enfants sereinement dès la semaine suivante.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Voyage impossible — soins d'urgence redoutés</div>
              <p>
                Isabelle*, 31 ans, rêvait de voyager dans des pays éloignés mais repoussait chaque
                projet. Sa peur du sang rendait l'idée d'un accident ou d'une urgence médicale en
                voyage insoutenable. Elle ne voulait pas se retrouver à l'étranger sans pouvoir
                réagir face à du sang.
              </p>
              <p>
                En 2 séances, nous avons dissocié la peur du sang de la situation de voyage et
                installé un état de gestion des urgences. Isabelle est partie voyager en Amérique
                du Sud deux mois plus tard — et a géré sereinement une petite blessure de son
                compagnon sur place.
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
              { value: '2-3', label: 'séances suffisent en moyenne pour vaincre la peur du sang' },
              { value: '3-4%', label: 'de la population souffre d\'hématophobie' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la peur du sang</h2>
          <div>
            {peurSangFaqItems.map((item, i) => (
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
          keywords={["sang", "phobie", "peur", "médical", "hématophobie"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur la peur du sang et les phobies"
          accentColor="text-purple-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-peur-sang-paris"
          pageTitle="Hypnose pour la peur du sang à Paris"
          pageDescription="Hypnose ericksonienne pour traiter la peur du sang (hématophobie) au cabinet Paris 4ème ou en visio."
          topic="la peur du sang et l'hématophobie"
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
          <h2 className="sp-h2">Libérez-vous de la peur du sang</h2>
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
            <Link to="/hypnose-peur-aiguilles-paris">Peur des aiguilles →</Link>
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

export default HypnosePeurSang;
