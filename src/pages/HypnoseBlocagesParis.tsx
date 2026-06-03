import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import SpecialtyReferences from '@/components/SpecialtyReferences';
import { blocagesFaqItems } from '@/data/specialtyFaqData';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const HypnoseBlocagesParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour les blocages et troubles du comportement à Paris",
    "description": "Libérez-vous de vos blocages et troubles du comportement grâce à l'hypnose ericksonienne à Paris. Procrastination, TOC, addictions, schémas répétitifs. Cabinet Paris 4ème.",
    "url": "https://novahypnose.fr/hypnose-blocages-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie blocages comportementaux",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose blocages Paris", "item": "https://novahypnose.fr/hypnose-blocages-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blocagesFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  const blocages = [
    { title: "Procrastination", desc: "Vous repoussez constamment les tâches importantes, même quand vous en connaissez les conséquences" },
    { title: "Schémas répétitifs", desc: "Vous reproduisez toujours les mêmes erreurs dans vos relations, votre travail ou vos choix de vie" },
    { title: "Onychophagie", desc: "Vous vous rongez les ongles compulsivement, souvent sans même vous en rendre compte" },
    { title: "TOC et rituels", desc: "Comportements répétitifs, vérifications excessives, pensées obsessionnelles envahissantes" },
    { title: "Blocages professionnels", desc: "Incapacité à passer à l'action, peur de réussir ou de l'échec, auto-sabotage" },
    { title: "Addictions comportementales", desc: "Écrans, jeux, achats compulsifs… des comportements dont vous ne parvenez pas à vous défaire" }
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose blocages & comportements à Paris et en ligne | Alain Zenatti</title>
        <meta name="description" content="Libérez vos blocages par l'hypnose à Paris 4ème ou en visio partout en France. Procrastination, schémas répétitifs, TOC, addictions. Alain Zenatti, Maître Hypnologue. 3 à 5 séances." />
        <meta name="keywords" content="hypnose blocage paris, troubles comportement hypnose paris, procrastination hypnose paris, TOC hypnose paris, onychophagie hypnose paris, schémas répétitifs hypnose, hypnose addictions paris, blocage psychologique hypnose, hypnose blocage en ligne, séance hypnose procrastination visio France, hypnose blocages à distance, téléconsultation hypnose blocages" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-blocages-paris" />
        <meta property="og:title" content="Hypnose blocages & comportements à Paris et en ligne | Alain Zenatti" />
        <meta property="og:description" content="Libérez vos blocages par l'hypnose à Paris 4ème ou en visio partout en France. Procrastination, schémas répétitifs, TOC, addictions. Alain Zenatti, Maître Hypnologue. 3 à 5 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-blocages-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose blocages et comportements" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose blocages & comportements à Paris et en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez vos blocages par l'hypnose à Paris 4ème ou en visio partout en France. Procrastination, schémas répétitifs, TOC, addictions. Alain Zenatti, Maître Hypnologue. 3 à 5 séances." />
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
          <div className="tag">Blocages &amp; Comportements — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous de vos blocages<br/><em>par l'hypnose</em>
          </h1>
          <p className="sp-hero__lead">
            Vous procrastinez, vous répétez les mêmes erreurs, vous n'arrivez pas à changer
            malgré votre volonté ? Ces comportements ne sont pas un choix — ce sont des
            <strong> programmes inconscients</strong> que l'hypnose peut débloquer, au cabinet à
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
      <section className="sp-section sp-deco-wrap">
        <svg className="sp-deco-blob sp-deco-blob--right" width="400" height="360" viewBox="0 0 400 360" aria-hidden="true">
          <g filter="url(#riso-full)">
            <path d="M 20 60 C 100 20, 200 40, 210 130 C 220 215, 150 270, 80 260 C 15 250, -20 185, 5 115 C 18 70, 20 60, 20 60 Z" fill="#F2A12E" opacity="0.55" />
          </g>
          <g filter="url(#riso-full)">
            <path d="M 220 50 C 310 10, 400 50, 395 150 C 390 240, 310 295, 230 280 C 155 265, 130 195, 155 120 C 172 68, 200 68, 220 50 Z" fill="#2B4BA0" opacity="0.42" />
          </g>
          <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
            <path d="M 110 120 C 220 90, 310 130, 300 215 C 290 295, 200 340, 120 325 C 45 310, 20 245, 45 170 C 62 120, 90 135, 110 120 Z" fill="#F2A12E" opacity="0.2" />
          </g>
          <rect width="400" height="360" filter="url(#paperGrain)" opacity=".15" />
        </svg>
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Vous êtes bloqué(e) malgré votre volonté ?</h2>
          <div className="sp-prose">
            <p>
              Vous savez exactement ce que vous devriez faire, mais vous n'y arrivez pas. Vous repoussez
              sans cesse ce qui est important. Vous répétez les mêmes schémas relationnels ou professionnels.
            </p>
            <p>
              Ce n'est ni de la paresse, ni un manque de volonté. Ces comportements sont <strong>pilotés
              par votre inconscient</strong>. Ils répondent à un besoin profond — souvent de protection
              ou de réconfort — que votre conscient ne perçoit pas. C'est pour ça que la volonté seule
              ne suffit pas.
            </p>
            <p>
              L'hypnose va directement à la source : elle dialogue avec l'inconscient pour comprendre
              le besoin caché derrière le comportement et proposer une alternative plus adaptée.
            </p>
          </div>
        </div>
      </section>

      {/* Types de blocages */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Les blocages et troubles que je traite</h2>
          <div className="sp-grid-2">
            {blocages.map((b, i) => (
              <div key={i} className="sp-card reveal">
                <div className="sp-card__title">{b.title}</div>
                <div className="sp-card__desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment l'hypnose débloque */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Comment l'hypnose débloque vos comportements</h2>
          <div className="sp-prose">
            <p>
              L'hypnose ericksonienne ne combat pas le comportement — elle le rend inutile en traitant
              sa cause. En état d'hypnose, je vous guide pour :
            </p>
          </div>
          <div className="sp-checklist">
            {[
              "Identifier le besoin inconscient qui maintient le comportement",
              "Retraiter les expériences à l'origine du blocage",
              "Remplacer les automatismes dysfonctionnels par de nouvelles réponses",
              "Briser les schémas répétitifs en créant de nouveaux circuits mentaux",
              "Retrouver la capacité d'agir et de passer à l'action",
              "Ancrer de nouveaux comportements qui deviennent naturels"
            ].map((item, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cas concrets */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Exemples de parcours au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Procrastination chronique</div>
              <p>
                Mathieu*, 38 ans, repoussait systématiquement ses projets importants. Entrepreneur, il n'arrivait
                pas à finaliser son business plan depuis 2 ans. La culpabilité s'accumulait, paralysant encore davantage son action.
              </p>
              <p>
                En 3 séances d'hypnose, nous avons identifié la peur de l'échec qui masquait la procrastination.
                Mathieu a finalisé son projet le mois suivant et lancé son activité.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Schémas relationnels répétitifs</div>
              <p>
                Lucie*, 34 ans, reproduisait toujours le même type de relation toxique. Consciente du
                schéma, elle ne parvenait pas à s'en défaire — quelque chose en elle cherchait à recréer
                ce qu'elle connaissait.
              </p>
              <p>
                En 5 séances d'hypnose ericksonienne, nous avons travaillé sur le modèle relationnel installé
                dans l'enfance. Lucie a pu s'ouvrir à une relation équilibrée et saine.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Onychophagie sévère</div>
              <p>
                Clément*, 28 ans, se rongeait les ongles jusqu'au sang depuis l'adolescence. Ce comportement
                compulsif lui causait de la honte et l'empêchait dans sa vie professionnelle.
              </p>
              <p>
                En 2 séances, nous avons remplacé le geste automatique par une réponse plus adaptée. Clément
                a cessé de se ronger les ongles dès la première semaine après la séance.
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
              { value: '3-5', label: 'séances pour briser les schémas répétitifs et libérer vos blocages' },
              { value: '100%', label: 'personnalisé selon votre blocage spécifique et son histoire' },
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
      <section className="sp-section sp-section--alt sp-deco-wrap">
        <svg className="sp-deco-blob sp-deco-blob--left" width="280" height="440" viewBox="0 0 280 440" aria-hidden="true">
          <g filter="url(#riso-full)">
            <path d="M 70 40 C 170 0, 265 55, 270 155 C 275 255, 205 360, 120 400 C 45 435, -20 395, 5 295 C 25 205, 35 100, 70 40 Z" fill="#F2A12E" opacity="0.45" />
          </g>
          <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
            <path d="M 95 110 C 180 75, 245 125, 238 215 C 232 305, 165 360, 100 345 C 38 330, 15 263, 38 180 C 54 122, 78 130, 95 110 Z" fill="#2B4BA0" opacity="0.3" />
          </g>
          <rect width="280" height="440" filter="url(#paperGrain)" opacity=".15" />
        </svg>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et les blocages</h2>
          <div>
            {blocagesFaqItems.map((item, i) => (
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
          keywords={["blocage", "procrastination", "comportement"]}
          title="Articles sur les blocages et comportements"
          accentColor="text-teal-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-blocages-paris"
          pageTitle="Hypnose pour les blocages à Paris"
          pageDescription="Hypnose ericksonienne pour traiter les blocages, la procrastination et les troubles du comportement au cabinet Paris 4ème."
          topic="les blocages et troubles du comportement"
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
          <h2 className="sp-h2">Prêt à vous libérer de vos blocages ?</h2>
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
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseBlocagesParis;
