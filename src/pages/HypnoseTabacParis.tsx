import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import SpecialtyReferences from '@/components/SpecialtyReferences';
import { tabacFaqItems } from '@/data/specialtyFaqData';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const HypnoseTabacParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose arrêt du tabac à Paris",
    "description": "Arrêtez de fumer par l'hypnose ericksonienne en 1 à 3 séances. Cabinet Paris 4ème ou visio partout en France. Alain Zenatti, Maître Praticien en Hypnose Ericksonienne.",
    "url": "https://novahypnose.fr/hypnose-arret-tabac-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie arrêt tabac",
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
      { "@type": "ListItem", "position": 2, "name": "Spécialités", "item": "https://novahypnose.fr/#specialites" },
      { "@type": "ListItem", "position": 3, "name": "Arrêt du tabac", "item": "https://novahypnose.fr/hypnose-arret-tabac-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tabacFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose arrêt du tabac à Paris et en ligne | Alain Zenatti</title>
        <meta name="description" content="Arrêtez de fumer par l'hypnose à Paris 4ème ou en visio partout en France. L'hypnose ericksonienne neutralise les automatismes liés à la cigarette en 1 à 3 séances. Alain Zenatti, Maître Praticien." />
        <meta name="keywords" content="hypnose arrêt tabac paris, hypnose pour arrêter de fumer paris, hypnothérapeute tabac paris, arrêter de fumer hypnose, hypnose cigarette paris, hypnose tabac en ligne, arrêt tabac hypnose visio France, sevrage tabac hypnose, hypnose cigarette électronique paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-arret-tabac-paris" />
        <meta property="og:title" content="Hypnose arrêt du tabac à Paris et en ligne | Alain Zenatti" />
        <meta property="og:description" content="Arrêtez de fumer par l'hypnose à Paris 4ème ou en visio partout en France. L'hypnose ericksonienne neutralise les automatismes liés à la cigarette en 1 à 3 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-arret-tabac-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Praticien en Hypnose Ericksonienne – Cabinet NovaHypnose Paris 4ème – Hypnose arrêt du tabac" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose arrêt du tabac à Paris et en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Arrêtez de fumer par l'hypnose à Paris 4ème ou en visio partout en France. En 1 à 3 séances, sans manque excessif." />
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
          <div className="tag">Arrêt du tabac — Paris</div>
          <h1 className="sp-hero__h1">
            Libérez-vous de la cigarette<br/><em>durablement</em>
          </h1>
          <p className="sp-hero__lead">
            L'hypnose ericksonienne agit directement sur les automatismes liés au tabac.
            Arrêtez de fumer en <strong>1 à 3 séances</strong>, au cabinet à Paris ou
            en <strong>visio partout en France</strong>.
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
              <div className="section-tag">Tabac — le problème</div>
              <h2 className="section-title">La cigarette vous a mis<br/><em>sous pilote automatique ?</em></h2>
              <p>
                Le tabac ne crée pas seulement une dépendance physique à la nicotine. Il s'inscrit dans des
                rituels profondément ancrés : le café du matin, la pause au travail, le stress d'une réunion,
                la fin d'un repas. Ces associations se construisent au fil des années et fonctionnent comme
                des <strong>automatismes indépendants de la volonté</strong>.
              </p>
              <p>
                C'est pourquoi les substituts nicotiniques (patch, gomme, vape) ont un taux d'échec élevé :
                ils traitent la dépendance physique, mais laissent intacts les réflexes inconscients qui
                maintiennent le comportement.
              </p>
              <p>
                <strong>L'hypnose ericksonienne</strong> agit là où les substituts ne vont pas —
                directement dans l'inconscient, là où vivent ces automatismes.
              </p>
            </div>
            <div className="cabinet__visual" aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 260 30 C 380 20, 490 80, 500 180 C 510 270, 440 310, 380 360 C 460 370, 510 420, 490 490 C 470 540, 380 560, 280 540 C 160 516, 40 480, 20 380 C 0 280, 80 220, 60 130 C 40 50, 150 40, 260 30 Z" fill="#F2A12E" opacity="0.93" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 200 100 C 320 60, 440 130, 430 250 C 420 355, 320 420, 210 400 C 105 380, 65 295, 95 200 C 118 128, 155 128, 200 100 Z" fill="#2B4BA0" opacity="0.88" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Comment l'hypnose agit */}
      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="cabinet__grid cabinet__grid--reverse reveal">
            <div className="cabinet__visual" aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 260 40 C 360 40, 460 140, 455 270 C 450 395, 355 480, 255 478 C 150 476, 62 388, 65 265 C 68 142, 162 40, 260 40 Z" fill="#2B4BA0" opacity="0.92" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
                  <path d="M 165 195 C 225 135, 345 158, 362 248 C 378 330, 316 408, 228 406 C 146 404, 98 342, 112 258 C 124 191, 132 238, 165 195 Z" fill="#F2A12E" opacity="0.88" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
            </div>
            <div className="cabinet__copy">
              <div className="section-tag">Au mécanisme — comment ça marche</div>
              <h2 className="section-title">L'hypnose agit<br/><em>là où ça bloque.</em></h2>
              <p>
                En accédant à votre inconscient, l'hypnose ericksonienne peut modifier durablement les
                programmes qui maintiennent la dépendance au tabac — là où la volonté seule ne peut pas aller.
              </p>
              <div className="sp-checklist">
                {[
                  "Neutraliser les déclencheurs automatiques liés à la cigarette",
                  "Dissoudre les associations plaisir / geste / cigarette",
                  "Renforcer le sentiment de contrôle et la motivation",
                  "Réduire les envies sans sensation de manque excessive",
                  "Éviter les compensations alimentaires ou l'irritabilité"
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

      {/* Comment se passe une séance */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Comment se passe une séance d'arrêt du tabac ?</h2>
          <p className="sp-lead" style={{marginBottom:'2rem'}}>
            La séance dure environ 1h15 à 1h30, au cabinet à Paris ou en visio.
            Elle se déroule en deux temps complémentaires, adaptés à votre histoire avec le tabac.
          </p>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Temps 1 — Comprendre votre relation au tabac</div>
              <p>
                La première partie de la séance est un échange approfondi. Nous explorons vos rituels
                spécifiques, les situations qui déclenchent l'envie de fumer, et ce que la cigarette
                représente pour vous : pause, gestion du stress, automatisme social, soutien émotionnel.
              </p>
              <p>
                Ce travail est indispensable : les mécanismes inconscients ne sont pas les mêmes d'un
                fumeur à l'autre. Cet échange permet d'adapter précisément le travail hypnotique qui suit.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Temps 2 — Le travail en hypnose</div>
              <p>
                La seconde partie se déroule en état d'hypnose. Nous travaillons en profondeur sur les
                automatismes liés à la cigarette et sur les associations que votre cerveau a construites
                entre certaines situations et l'envie de fumer.
              </p>
              <p>
                L'objectif est de rendre l'arrêt fluide et stable : réduire les envies, renforcer votre
                sentiment de contrôle, éviter les compensations. Cet état de focalisation est tout aussi
                puissant en visio que dans mon cabinet de Paris.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Préparez votre arrêt */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow">
          <h2 className="sp-h2 reveal">Préparez votre arrêt du tabac</h2>
          <p className="reveal">
            Quelques gestes simples avant la séance pour mettre toutes les chances de votre côté :
          </p>
          <div className="sp-checklist reveal">
            {[
              "Fixez une date — votre rendez-vous est votre point de départ. Il n'existe pas de moment parfait, le plus important est de décider.",
              "Prévenez vos proches — annoncer que vous arrêtez crée un engagement positif et vous protège des sollicitations sociales.",
              "Fumez votre dernière cigarette avant la séance — puis jetez votre paquet. Ne gardez pas de cigarettes « au cas où » après.",
              "Prévoyez 1h30 libres — sans réunion ni obligation juste après, pour laisser le travail s'installer.",
              "Après la séance, félicitez-vous — vous avez enclenché un vrai changement."
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
              <div className="sp-case__title">Fumeur depuis 20 ans, un paquet par jour</div>
              <p>
                Christophe*, 48 ans, fumait depuis l'adolescence. Il avait essayé les patchs, les
                gommes, même une première tentative d'hypnose ailleurs, sans résultat durable.
              </p>
              <p>
                En une séance au cabinet à Paris, nous avons neutralisé les rituels les plus
                ancrés — la cigarette du café, la pause déjeuner, le trajet retour. Depuis
                4 mois, il n'a plus touché une cigarette.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Arrêt de la cigarette électronique</div>
              <p>
                Julie*, 34 ans, avait arrêté la cigarette grâce à la vape — mais les
                préoccupations avaient simplement changé de forme : &laquo;&nbsp;est-ce que
                ma batterie est chargée ?&nbsp;&raquo;, &laquo;&nbsp;est-ce que j'ai assez
                de liquide ?&nbsp;&raquo;. La dépendance, elle, était restée intacte.
              </p>
              <p>
                Une séance a suffi à lui permettre de se libérer du besoin constant de vapoter.
                Elle décrit l'expérience comme &laquo;&nbsp;étonnamment calme&nbsp;&raquo; et
                le résultat comme &laquo;&nbsp;presque surprenant&nbsp;&raquo;.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Double dépendance tabac + stress</div>
              <p>
                Isabelle*, 41 ans, fumait systématiquement pour gérer ses pics d'anxiété.
                Arrêter la cigarette sans traiter le stress lui semblait impossible.
              </p>
              <p>
                En 2 séances, nous avons travaillé simultanément sur la dépendance au tabac
                et sur les ressources intérieures pour gérer le stress. Elle a arrêté de
                fumer ET retrouvé des outils concrets pour l'anxiété.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Séance en ligne depuis la province</div>
              <p>
                Marc*, installé à Lyon, avait des doutes sur l'efficacité d'une séance
                d'hypnose à distance. La commodité l'a convaincu d'essayer.
              </p>
              <p>
                Résultat identique à une séance en cabinet, depuis son salon, en moins de
                deux heures. Il recommande la visio à ses amis fumeurs qui n'ont pas
                de praticien qualifié près de chez eux.
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
              J'avais fumé pendant 15 ans. Après une séance avec Alain, je n'ai plus eu
              envie de cigarettes. Pas de manque, pas d'irritabilité — juste une liberté
              retrouvée que je n'espérais plus vraiment.
            </p>
            <footer>— Sophie R., avis Google vérifié</footer>
          </blockquote>
        </div>
      </section>

      {/* Stats */}
      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <div className="sp-stats">
            {[
              { value: '1-3', label: 'séances en moyenne pour arrêter de fumer durablement' },
              { value: '0', label: 'substitut nicotinique nécessaire — une libération naturelle' },
              { value: '5/5', label: 'satisfaction cabinet et visio sur avis vérifiés' },
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
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et le tabac</h2>
          <div>
            {tabacFaqItems.map((item, i) => (
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
          keywords={["tabac", "fumer", "cigarette", "sevrage"]}
          categories={["Addictions", "Arrêt du tabac"]}
          title="Articles sur l'arrêt du tabac"
          accentColor="text-amber-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-arret-tabac-paris"
          pageTitle="Hypnose arrêt du tabac à Paris"
          pageDescription="Hypnose ericksonienne pour arrêter de fumer au cabinet Paris 4ème ou en visio partout en France."
          topic="l'arrêt du tabac"
          dateModified="2026-07-01"
          references={[
            {
              authors: "Barnes J, Dong CY, McRobbie H, Walker N, Mehta M, Stead LF",
              title: "Hypnotherapy for smoking cessation",
              source: "Cochrane Database of Systematic Reviews",
              year: 2010,
              url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001008.pub2/full",
            },
            {
              authors: "Carmody TP, Duncan C, Simon JA et al.",
              title: "Hypnosis for smoking cessation: a randomized trial",
              source: "Nicotine & Tobacco Research",
              year: 2008,
              url: "https://pubmed.ncbi.nlm.nih.gov/18661386/",
            },
            {
              authors: "Inserm",
              title: "Évaluation de l'efficacité de la pratique de l'hypnose",
              source: "Rapport d'expertise collective",
              year: 2015,
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt à vous libérer du tabac ?</h2>
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
            <Link to="/hypnose-phobies-paris">Hypnose et phobies →</Link>
            <Link to="/hypnose-gestion-emotions-paris">Gestion des émotions →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseTabacParis;
