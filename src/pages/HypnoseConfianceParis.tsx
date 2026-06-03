import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import SpecialtyReferences from '@/components/SpecialtyReferences';
import { confianceFaqItems } from '@/data/specialtyFaqData';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const HypnoseConfianceParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour la confiance en soi à Paris",
    "description": "Développez votre confiance en soi grâce à l'hypnose ericksonienne à Paris. Prise de parole, estime de soi, syndrome de l'imposteur. Cabinet Paris 4ème Marais-Bastille.",
    "url": "https://novahypnose.fr/hypnose-confiance-en-soi-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie confiance en soi",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose confiance en soi Paris", "item": "https://novahypnose.fr/hypnose-confiance-en-soi-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": confianceFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose confiance en soi à Paris et en ligne | Alain Zenatti</title>
        <meta name="description" content="Développez votre confiance en soi par l'hypnose à Paris 4ème ou en visio partout en France. Syndrome de l'imposteur, prise de parole, estime de soi. Résultats en 3 à 5 séances." />
        <meta name="keywords" content="hypnose confiance en soi paris, estime de soi hypnose paris, syndrome imposteur hypnose paris, prise de parole hypnose paris, hypnothérapeute confiance paris, timidité hypnose paris, hypnose confiance en soi en ligne, séance hypnose confiance visio France, hypnose estime de soi à distance, téléconsultation hypnose confiance" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-confiance-en-soi-paris" />
        <meta property="og:title" content="Hypnose confiance en soi à Paris et en ligne | Alain Zenatti" />
        <meta property="og:description" content="Développez votre confiance en soi par l'hypnose à Paris 4ème ou en visio partout en France. Syndrome de l'imposteur, prise de parole, estime de soi. Résultats en 3 à 5 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-confiance-en-soi-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose confiance en soi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose confiance en soi à Paris et en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Développez votre confiance en soi par l'hypnose à Paris 4ème ou en visio partout en France. Syndrome de l'imposteur, prise de parole, estime de soi. Résultats en 3 à 5 séances." />
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
          <div className="tag">Confiance en Soi — Paris</div>
          <h1 className="sp-hero__h1">
            Révélez votre potentiel<br/><em>par l'hypnose</em>
          </h1>
          <p className="sp-hero__lead">
            Vous doutez de vous, vous n'osez pas prendre la parole, vous vous sentez illégitime ?
            L'hypnose reprogramme les croyances limitantes qui sabotent votre confiance.
            <strong> Résultats visibles en 3 à 5 séances</strong>, au cabinet à Paris 4ème ou en
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
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Le manque de confiance vous freine ?</h2>
          <div className="sp-prose">
            <p>
              Vous avez les compétences, mais vous n'arrivez pas à les montrer. En réunion, vous
              n'osez pas prendre la parole. Devant une opportunité, vous hésitez, vous vous dites
              que vous n'êtes pas à la hauteur.
            </p>
            <p>
              Le <strong>syndrome de l'imposteur</strong>, la timidité, la peur du jugement, le
              perfectionnisme paralysant — ce ne sont pas des traits de caractère. Ce sont des
              <strong> programmes inconscients</strong> installés depuis l'enfance.
            </p>
            <p>
              Ces programmes peuvent être modifiés. L'hypnose accède directement à ces croyances
              profondes pour les transformer.
            </p>
          </div>
        </div>
      </section>

      {/* Comment l'hypnose renforce la confiance */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Comment l'hypnose renforce la confiance en soi</h2>
          <div className="sp-prose">
            <p>
              L'hypnose ericksonienne travaille sur les fondations de votre confiance : l'image de soi,
              les croyances, les expériences formatrices. En état d'hypnose, je vous aide à :
            </p>
          </div>
          <div className="sp-checklist">
            {[
              "Identifier et transformer les croyances limitantes",
              "Neutraliser le syndrome de l'imposteur",
              "Développer une image de soi positive et réaliste",
              "Prendre la parole en public avec aisance",
              "Oser dire non et poser ses limites",
              "Aborder les situations sociales avec sérénité"
            ].map((item, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mon approche */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Mon approche pour développer votre confiance</h2>
          <div className="sp-prose">
            <p>
              Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème.
              Le manque de confiance en soi est l'un des motifs les plus fréquents dans mon cabinet.
            </p>
            <p>
              Mon approche combine l'hypnose ericksonienne avec des techniques de PNL. Lors des séances,
              nous travaillons sur les <strong>expériences fondatrices</strong> qui ont installé le doute,
              nous les retraitons, puis nous ancrons de nouvelles ressources de confiance.
            </p>
            <p>
              Je vous transmets également des <strong>techniques d'auto-hypnose</strong> pour
              renforcer votre confiance au quotidien, avant une présentation, un entretien ou
              toute situation importante.
            </p>
          </div>
        </div>
      </section>

      {/* Cas concrets */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Exemples de parcours au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Syndrome de l'imposteur</div>
              <p>
                Camille*, directrice marketing, avait le sentiment permanent de ne pas mériter sa
                place malgré 15 ans de succès professionnels. Chaque réunion avec sa direction
                déclenchait une peur d'être &laquo;&nbsp;démasquée&nbsp;&raquo;.
              </p>
              <p>
                En 4 séances d'hypnose dans mon cabinet du Marais, nous avons identifié et
                transformé les croyances installées dans l'enfance. Camille assume désormais ses compétences avec assurance et a obtenu la promotion
                qu'elle n'osait pas demander.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Timidité sociale paralysante</div>
              <p>
                Romain*, 30 ans, évitait toutes les situations sociales : dîners, fêtes,
                networking professionnel. Sa timidité l'isolait et freinait sa carrière.
              </p>
              <p>
                En 3 séances d'hypnose ericksonienne, nous avons travaillé sur les expériences
                de moquerie fondatrices, puis ancré un état d'aisance
                sociale. Romain participe désormais activement aux réunions.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Estime de soi après une rupture</div>
              <p>
                Inès*, 34 ans, avait perdu toute confiance en elle après une rupture difficile.
                Les paroles dévalorisantes de son ex continuaient à résonner dans sa tête.
              </p>
              <p>
                En 4 séances, nous avons neutralisé l'impact émotionnel de ces paroles toxiques
                et reconstruit une image de soi positive. Inès a retrouvé confiance en sa valeur
                et s'est ouverte à de nouvelles rencontres avec sérénité.
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
              Alain propose de véritables parcours de transformation conçus pour libérer l'esprit
              et dépasser les freins invisibles. J'ai laissé derrière moi certaines croyances figées
              et ouvert un espace intérieur plus souple, plus libre.
            </p>
            <footer>— Edward, avis Google vérifié</footer>
          </blockquote>
        </div>
      </section>

      {/* Stats */}
      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <div className="sp-stats">
            {[
              { value: '3-5', label: 'séances pour une confiance durable et authentique' },
              { value: '100%', label: 'personnalisé selon vos croyances et votre histoire' },
              { value: '5/5', label: 'note moyenne sur Resalib et Google — plus de 40 avis vérifiés' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et la confiance en soi</h2>
          <div>
            {confianceFaqItems.map((item, i) => (
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
          keywords={["confiance", "estime", "imposteur"]}
          title="Articles sur la confiance en soi"
          accentColor="text-amber-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-confiance-en-soi-paris"
          pageTitle="Hypnose confiance en soi à Paris"
          pageDescription="Hypnose ericksonienne pour développer la confiance en soi, l'estime de soi et traiter le syndrome de l'imposteur. Cabinet Paris 4ème."
          topic="la confiance en soi et l'estime de soi"
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
          <h2 className="sp-h2">Prêt à révéler votre plein potentiel ?</h2>
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
            <Link to="/hypnose-phobies-paris">Hypnose et phobies →</Link>
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

export default HypnoseConfianceParis;
