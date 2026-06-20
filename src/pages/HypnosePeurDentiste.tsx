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

const peurDentisteFaqItems = [
  {
    question: "L'hypnose peut-elle vraiment m'aider à aller chez le dentiste ?",
    answer: "Oui. La peur du dentiste est un programme inconscient que l'hypnose permet de désactiver directement. Contrairement aux anxiolytiques qui masquent la peur le temps d'un soin, l'hypnose agit sur l'origine même de cette phobie pour un changement durable. La grande majorité des patients que j'accompagne retournent chez leur dentiste sans anxiété après 2 à 4 séances."
  },
  {
    question: "Combien de séances faut-il pour ne plus avoir peur du dentiste ?",
    answer: "En moyenne, 2 à 4 séances suffisent. La première séance identifie l'origine de la peur et travaille la désensibilisation. Les suivantes ancrent un état de calme associé au cabinet dentaire et vous transmettent des techniques d'auto-hypnose à utiliser directement sur le fauteuil."
  },
  {
    question: "Faut-il avoir un rendez-vous dentaire prévu pour commencer ?",
    answer: "Non. Il vaut même mieux commencer l'accompagnement bien avant un soin. Cela laisse le temps à votre inconscient d'intégrer les nouveaux schémas en profondeur. Si vous avez un rendez-vous urgent dans les deux semaines, un programme intensif avec séances rapprochées est possible."
  },
  {
    question: "L'hypnose peut-elle traiter aussi le réflexe nauséeux ?",
    answer: "Oui. Le réflexe nauséeux est souvent d'origine psychosomatique et répond très bien à l'hypnose. En travaillant sur la détente du système nerveux et en dissociant le réflexe de l'anxiété dentaire, beaucoup de patients voient leur réflexe nauséeux considérablement réduit dès les premières séances."
  },
  {
    question: "Mes enfants ont aussi peur du dentiste. L'hypnose peut-elle les aider ?",
    answer: "Oui, l'hypnose fonctionne très bien sur les enfants à partir de 8-10 ans, souvent même plus rapidement que sur les adultes. Les enfants ont un accès plus naturel aux états hypnotiques. L'accompagnement est adapté à leur âge, ludique, et ne nécessite pas d'introspection complexe."
  },
  {
    question: "Les résultats sont-ils durables ?",
    answer: "Oui. L'hypnose reprogramme en profondeur vos associations inconscientes liées au cabinet dentaire. Une fois que votre cerveau a intégré que les soins dentaires sont sûrs et gérables, ce changement devient permanent. La grande majorité des personnes accompagnées maintiennent des soins réguliers sans appréhension."
  }
];

const HypnosePeurDentiste = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose peur du dentiste à Paris",
    "description": "Traitement de la peur du dentiste (odontophobie) par l'hypnose ericksonienne. Cabinet Paris 4ème Marais-Bastille ou en visio. Résultats en 2 à 4 séances.",
    "url": "https://novahypnose.fr/hypnose-peur-dentiste-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie odontophobie",
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
      { "@type": "ListItem", "position": 3, "name": "Peur du dentiste", "item": "https://novahypnose.fr/hypnose-peur-dentiste-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": peurDentisteFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const manifestations = [
    { title: "Annulations répétées", desc: "Vous reportez ou annulez vos rendez-vous dentaires depuis des années" },
    { title: "Nuits d'angoisse", desc: "La veille d'un soin, impossible de dormir — votre esprit anticipe la douleur" },
    { title: "Bruit de la fraise", desc: "Le son seul du matériel dentaire déclenche une montée d'anxiété immédiate" },
    { title: "Douleur anticipée", desc: "Vous imaginez la douleur bien pire qu'elle ne sera — avant même de vous asseoir" },
    { title: "Réflexe nauséeux", desc: "La simple ouverture de bouche ou les instruments déclenchent un haut-le-cœur" },
    { title: "Conséquences médicales", desc: "Des caries non traitées, des douleurs ignorées, pour éviter le cabinet" },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose peur du dentiste (odontophobie) Paris | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de la peur du dentiste par l'hypnose à Paris 4ème ou en visio. Odontophobie, angoisse du fauteuil, réflexe nauséeux. Résultats durables en 2 à 4 séances." />
        <meta name="keywords" content="hypnose peur dentiste paris, odontophobie hypnose paris, peur dentiste hypnose, vaincre peur dentiste, hypnothérapeute peur dentiste paris, réflexe nauséeux hypnose, peur dentiste hypnose en ligne, séance hypnose odontophobie visio france" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-peur-dentiste-paris" />
        <meta property="og:title" content="Hypnose peur du dentiste (odontophobie) Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de la peur du dentiste par l'hypnose à Paris 4ème ou en visio. Odontophobie, angoisse du fauteuil, réflexe nauséeux. Résultats durables en 2 à 4 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-peur-dentiste-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose peur du dentiste" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose peur du dentiste (odontophobie) Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de la peur du dentiste par l'hypnose à Paris 4ème ou en visio. Odontophobie, angoisse du fauteuil, réflexe nauséeux. Résultats durables en 2 à 4 séances." />
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
          <div className="tag">Peur du dentiste — Paris</div>
          <h1 className="sp-hero__h1">
            Soignez vos dents<br/><em>sans angoisse</em>
          </h1>
          <p className="sp-hero__lead">
            Des années de soins reportés, des douleurs ignorées, une angoisse qui monte dès la salle
            d'attente… La peur du dentiste (odontophobie) touche près d'<strong>une personne sur cinq</strong>.
            L'hypnose ericksonienne agit à la racine de cette peur pour vous permettre de vous soigner
            sereinement. <strong>Résultats en 2 à 4 séances</strong>, au cabinet à Paris 4ème ou en
            <strong> visio partout en France</strong>.
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
              <div className="section-tag">Odontophobie — comprendre</div>
              <h2 className="section-title">La peur du dentiste<br/><em>nuit à votre santé ?</em></h2>
              <p>
                Vous repoussez vos soins depuis des années. Une douleur s'installe, vous la tolérez
                plutôt que d'appeler votre dentiste. Vous savez que cela empire les choses — mais
                l'angoisse est plus forte que la raison.
              </p>
              <p>
                L'odontophobie est un mécanisme de protection installé par votre inconscient, souvent
                à partir d'une expérience douloureuse passée ou d'un praticien peu attentif. La bonne
                nouvelle : <strong>ce qui a été appris peut être désappris</strong>.
              </p>
              <p>
                L'hypnose permet de reprogrammer cette réaction automatique rapidement, sans avoir
                à revivre l'expérience traumatisante, et sans devoir s'exposer forcément au fauteuil
                dès la première séance.
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
                d'angoisse face au cabinet dentaire. Vous restez conscient et en contrôle pendant
                toute la séance. Je vous guide dans un état de relaxation profonde pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier l'expérience fondatrice qui a installé la peur (douleur, praticien, trauma)",
                  "Désensibiliser les déclencheurs — bruit de la fraise, odeur, position inclinée",
                  "Créer de nouvelles associations de calme et de sécurité liées aux soins dentaires",
                  "Ancrer un état de relaxation profonde que vous pouvez activer sur le fauteuil",
                  "Vous enseigner des techniques d'auto-hypnose pour chaque rendez-vous futur"
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
              <div className="sp-case__title">15 ans sans soins dentaires</div>
              <p>
                Marie*, 43 ans, n'avait pas mis les pieds chez un dentiste depuis 15 ans. Plusieurs
                caries non traitées, une douleur chronique qu'elle gérait aux antalgiques — mais
                l'angoisse du cabinet était insurmontable depuis une extraction douloureuse dans
                sa jeunesse.
              </p>
              <p>
                En 3 séances d'hypnose, nous avons neutralisé le souvenir traumatique initial et
                installé un état de sécurité associé aux soins dentaires. Marie a pris rendez-vous
                chez son dentiste deux semaines après notre dernière séance — et y est allée.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Réflexe nauséeux et panique</div>
              <p>
                Thomas*, 38 ans, ne pouvait plus ouvrir la bouche chez le dentiste sans déclencher
                un violent réflexe nauséeux. Même un simple détartrage nécessitait trois interruptions.
                Son dentiste lui avait suggéré une sédation consciente — coûteuse et contraignante.
              </p>
              <p>
                En 2 séances d'hypnose ericksonienne, nous avons dissocié le réflexe nauséeux de
                l'anxiété dentaire et ancré une détente musculaire profonde des mâchoires. Thomas
                a pu terminer un détartrage complet sans interruption lors de sa séance suivante.
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
              { value: '2-4', label: 'séances suffisent en moyenne pour vaincre la peur du dentiste' },
              { value: '1 sur 5', label: 'adultes souffrent d\'odontophobie en France' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la peur du dentiste</h2>
          <div>
            {peurDentisteFaqItems.map((item, i) => (
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
          keywords={["dentiste", "phobie", "peur", "médical"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur la peur du dentiste et les phobies"
          accentColor="text-purple-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-peur-dentiste-paris"
          pageTitle="Hypnose pour la peur du dentiste à Paris"
          pageDescription="Hypnose ericksonienne pour traiter la peur du dentiste (odontophobie) au cabinet Paris 4ème ou en visio."
          topic="la peur du dentiste et l'odontophobie"
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
          <h2 className="sp-h2">Libérez-vous de la peur du dentiste</h2>
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
            <Link to="/hypnose-peur-aiguilles-paris">Peur des aiguilles →</Link>
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

export default HypnosePeurDentiste;
