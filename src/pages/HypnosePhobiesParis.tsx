import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import SpecialtyReferences from '@/components/SpecialtyReferences';
import { phobiesFaqItems } from '@/data/specialtyFaqData';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const HypnosePhobiesParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour les phobies à Paris",
    "description": "Traitement des phobies et des peurs par l'hypnose ericksonienne. Cabinet Paris 4ème Marais-Bastille. Résultats rapides en 2 à 4 séances.",
    "url": "https://novahypnose.fr/hypnose-phobies-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie phobies",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose phobies Paris", "item": "https://novahypnose.fr/hypnose-phobies-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": phobiesFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const phobies = [
    { title: "Phobie de l'avion", desc: "Voyagez enfin sereinement, sans anxiété ni crise de panique" },
    { title: "Claustrophobie", desc: "Ascenseurs, métro, IRM… retrouvez votre liberté de mouvement" },
    { title: "Arachnophobie", desc: "Araignées, insectes… cessez de vivre dans l'appréhension" },
    { title: "Peur du vide (acrophobie)", desc: "Balcons, escaliers, hauteurs… reprenez le contrôle" },
    { title: "Peur de parler en public", desc: "Présentations, réunions, oral… exprimez-vous avec aisance" },
    { title: "Phobie sociale", desc: "Retrouvez le plaisir des interactions et de la vie en société" },
    { title: "Peur de conduire (amaxophobie)", desc: "Reprenez le volant en toute confiance" },
    { title: "Autres phobies", desc: "Peur du sang, des aiguilles, de l'eau, du dentiste…" }
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose phobies & peurs à Paris et en ligne | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de vos phobies par l'hypnose à Paris 4ème ou en visio partout en France. Phobie avion, claustrophobie, peur de parler en public. Résultats durables en 2 à 4 séances. Séance 90€." />
        <meta name="keywords" content="hypnose phobie paris, hypnose peur paris, phobie avion hypnose paris, claustrophobie hypnose, arachnophobie hypnose paris, peur parler public hypnose paris, traitement phobie paris, hypnose phobie en ligne, séance hypnose phobie visio France, hypnose peur à distance, téléconsultation hypnose phobie" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-phobies-paris" />
        <meta property="og:title" content="Hypnose phobies & peurs à Paris et en ligne | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de vos phobies par l'hypnose à Paris 4ème ou en visio partout en France. Phobie avion, claustrophobie, peur de parler en public. Résultats durables en 2 à 4 séances. Séance 90€." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-phobies-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose phobies et peurs" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose phobies & peurs à Paris et en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous de vos phobies par l'hypnose à Paris 4ème ou en visio partout en France. Phobie avion, claustrophobie, peur de parler en public. Résultats durables en 2 à 4 séances. Séance 90€." />
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
          <div className="tag">Phobies &amp; Peurs — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous de vos peurs<br/><em>par l'hypnose</em>
          </h1>
          <p className="sp-hero__lead">
            Peur de l'avion, des araignées, du vide, des espaces clos, de parler en public…
            Vos phobies limitent votre vie quotidienne ? L'hypnose est l'une des méthodes les plus
            efficaces pour s'en libérer. <strong>Résultats en 2 à 4 séances</strong>, au cabinet à
            Paris 4ème ou en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Phobies — comprendre</div>
              <h2 className="section-title">Une phobie<br/><em>vous gâche la vie ?</em></h2>
              <p>
                Vous évitez certaines situations par peur. Vous annulez des voyages, vous refusez des opportunités,
                vous arrangez votre vie entière autour de cette peur. Vous savez que c'est irrationnel — mais
                c'est plus fort que vous.
              </p>
              <p>
                La phobie est un mécanisme de protection que votre inconscient a mis en place, souvent à la suite
                d'une expérience marquante. La bonne nouvelle : <strong>ce qui a été appris peut être désappris</strong>.
              </p>
              <p>
                L'hypnose permet de reprogrammer cette réaction automatique rapidement, sans avoir à revivre
                l'événement traumatisant, et sans exposition forcée à l'objet de votre peur.
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

      {/* Types de phobies */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Les phobies que je traite par l'hypnose</h2>
          <div className="sp-grid-2">
            {phobies.map((p, i) => (
              <div key={i} className="sp-card reveal">
                <div className="sp-card__title">{p.title}</div>
                <div className="sp-card__desc">{p.desc}</div>
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
                L'hypnose ericksonienne agit sur la racine de la phobie : le programme inconscient qui déclenche
                la réaction de panique. Lors de la séance, vous restez conscient et en contrôle. Je vous guide
                dans un état de relaxation profonde pour :
              </p>
              <div className="sp-checklist">
                {[
                  "Identifier l'origine de la phobie et le déclencheur inconscient",
                  "Dissocier l'émotion de peur du stimulus (l'objet, la situation)",
                  "Créer de nouvelles associations positives et neutres",
                  "Renforcer votre sentiment de sécurité et de contrôle",
                  "Installer des automatismes de calme face à la situation redoutée"
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
              <div className="sp-case__title">Peur de l'avion</div>
              <p>
                Thomas*, consultant international, refusait systématiquement les missions nécessitant
                un vol. Sa phobie de l'avion, installée depuis un vol turbulent 10 ans plus tôt,
                menaçait désormais sa carrière.
              </p>
              <p>
                En 3 séances d'hypnose dans mon cabinet du Marais, nous avons neutralisé le souvenir
                traumatique initial et installé un état de calme associé au vol. Thomas a repris
                l'avion le mois suivant pour un déplacement à Londres — sereinement.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Arachnophobie sévère</div>
              <p>
                Claire*, 28 ans, ne pouvait pas entrer dans une pièce sans l'avoir inspectée
                minutieusement. La vue d'une simple toile d'araignée déclenchait une crise de panique.
              </p>
              <p>
                Après 2 séances d'hypnose ericksonienne, Claire a constaté que sa réaction face aux
                araignées avait radicalement changé. La peur intense s'était transformée en simple
                indifférence. Elle a pu partir en randonnée pour la première fois depuis des années.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Peur de parler en public</div>
              <p>
                Julien*, entrepreneur, perdait tous ses moyens dès qu'il devait pitcher devant des
                investisseurs. Voix tremblante, mains moites, trous de mémoire — sa phobie freinait le développement de sa startup.
              </p>
              <p>
                En 4 séances, nous avons travaillé sur l'origine de cette peur et ancré un état de
                confiance qu'il peut activer avant chaque présentation. Julien a levé des fonds
                avec succès trois mois plus tard.
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
              { value: '2-4', label: 'séances suffisent en moyenne pour traiter une phobie' },
              { value: '95%', label: 'des phobies simples peuvent être traitées par l\'hypnose' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et les phobies</h2>
          <div>
            {phobiesFaqItems.map((item, i) => (
              <div key={i} className={`faq__item${openFaq === i ? ' open' : ''}`}>
                <button className="faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.question}
                  <span className="faq__icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="faq__a">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sp-ext-section">
        <SpecialtyBlogArticles
          keywords={["phobie", "peur", "phobique"]}
          categories={["Troubles Anxieux"]}
          title="Articles sur les phobies"
          accentColor="text-purple-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-phobies-paris"
          pageTitle="Hypnose pour les phobies à Paris"
          pageDescription="Hypnose ericksonienne pour traiter les phobies (avion, animaux, foule, espaces clos, médical) au cabinet Paris 4ème."
          topic="les phobies et les peurs irrationnelles"
          dateModified="2026-05-06"
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
          <h2 className="sp-h2">Libérez-vous de vos phobies</h2>
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
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/hypnose-sommeil-paris">Hypnose et sommeil →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/hypnose-gestion-emotions-paris">Gestion des émotions →</Link>
            <Link to="/hypnose-blocages-paris">Blocages et comportements →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnosePhobiesParis;
