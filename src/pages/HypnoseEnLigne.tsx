import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema, personSchema, visioServiceSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const visioFaqItems = [
  {
    question: "L'hypnose en visio est-elle aussi efficace qu'au cabinet ?",
    answer: "Oui. L'hypnose ne repose pas sur le contact physique mais sur la voix, l'attention et la relation thérapeutique — qui passent parfaitement par la visioconférence. De nombreux clients suivis à distance obtiennent les mêmes résultats qu'en présentiel, en 3 à 5 séances. Vous restez pleinement conscient et acteur du processus, exactement comme au cabinet.",
  },
  {
    question: "Comment se déroule concrètement une séance d'hypnose en ligne ?",
    answer: "Vous recevez un lien de connexion sécurisé (Google Meet). La première séance dure environ 1h30 : entretien pour cerner votre objectif, séance d'hypnose guidée par la voix, puis debriefing. Les séances suivantes durent 1h. Vous avez simplement besoin d'un endroit calme, d'une connexion internet stable et d'un casque ou d'écouteurs.",
  },
  {
    question: "Depuis où peut-on consulter en visio ?",
    answer: "Depuis n'importe où dans le monde ! La séance en visio n'a pas de frontières : que vous soyez en France, à l'étranger ou en voyage, la seule condition est de disposer d'une connexion internet stable et d'un endroit calme et confortable.",
  },
  {
    question: "De quel matériel ai-je besoin pour une téléconsultation d'hypnose ?",
    answer: "Un ordinateur, une tablette ou un smartphone avec caméra et micro, une connexion internet stable, un casque ou des écouteurs (pour une meilleure immersion), et un endroit calme où vous ne serez pas dérangé pendant environ une heure. C'est tout.",
  },
  {
    question: "Comment payer une séance d'hypnose en visio ?",
    answer: "Le règlement s'effectue en ligne de façon simple et sécurisée, selon votre préférence : par carte bancaire via Stripe — le lien de paiement vous est transmis lors de la réservation — ou par Wero, en envoyant le paiement au 06 49 35 80 89. Une facture peut vous être fournie sur demande.",
  },
  {
    question: "Puis-je alterner séances en visio et séances au cabinet ?",
    answer: "Tout à fait. Vous pouvez commencer en visio puis venir au cabinet à Paris 4ème, ou inversement, selon votre situation et vos déplacements. L'accompagnement reste cohérent quel que soit le format choisi.",
  },
];

const HypnoseEnLigne = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://novahypnose.fr" },
      { "@type": "ListItem", "position": 2, "name": "Hypnose en ligne (visio)", "item": "https://novahypnose.fr/hypnose-en-ligne" }
    ]
  };

  const avantages = [
    { t: "Aucun déplacement", d: "Pas de transport, pas de temps perdu : vous gagnez en énergie et en sérénité avant la séance." },
    { t: "Partout en France", d: "Le même accompagnement, que vous soyez à Lyon, Marseille, Lille, Bordeaux, en campagne ou à l'étranger." },
    { t: "Dans votre environnement", d: "Être chez soi favorise le lâcher-prise. Les apprentissages s'ancrent dans votre cadre de vie réel." },
    { t: "Flexibilité des horaires", d: "Des créneaux plus faciles à caler dans un emploi du temps chargé, sans contrainte de trajet." },
    { t: "Même efficacité", d: "L'hypnose passe par la voix et la relation : la visio n'enlève rien à la profondeur du travail." },
    { t: "Continuité assurée", d: "Vous pouvez alterner visio et cabinet Paris 4ème selon vos besoins et vos déplacements." },
  ];

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose en ligne & visio — Spécialiste France | Alain Zenatti</title>
        <meta name="description" content="Spécialiste de l'hypnose en visioconférence partout en France. Alain Zenatti, Maître Hypnologue certifié, propose des téléconsultations d'hypnose aussi efficaces qu'au cabinet. 90 € — Résultats en 3 à 5 séances." />
        <meta name="keywords" content="hypnose en ligne, hypnothérapeute en ligne, hypnose visio, spécialiste hypnose visio France, hypnose à distance, téléconsultation hypnose, hypnothérapeute visio certifié, hypnose en ligne France, hypnothérapeute distance France, hypnose ericksonienne en ligne, séance hypnose visio Google Meet, hypnose Lyon, hypnose Marseille, hypnose Bordeaux, hypnose Toulouse, hypnose Nice, hypnose Strasbourg, hypnose Nantes" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-en-ligne" />
        <meta property="og:title" content="Hypnose en ligne & visioconférence partout en France | NovaHypnose" />
        <meta property="og:description" content="Consultez un hypnothérapeute certifié en visio, partout en France. Séances d'hypnose en ligne aussi efficaces qu'au cabinet. Alain Zenatti, Maître Hypnologue." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-en-ligne" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Hypnose en visioconférence partout en France" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose en ligne & visioconférence partout en France | NovaHypnose" />
        <meta name="twitter:description" content="Consultez un hypnothérapeute certifié en visio, partout en France. Séances aussi efficaces qu'au cabinet." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(visioServiceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(personSchema)}</script>
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
          <div className="tag">Hypnose en visio — Partout en France</div>
          <h1 className="sp-hero__h1">
            Séances d'hypnose en ligne<br/><em>aussi efficaces qu'au cabinet</em>
          </h1>
          <p className="sp-hero__lead">
            Où que vous soyez en France, consultez un hypnothérapeute certifié depuis chez vous.
            Les séances d'hypnose en ligne sont <strong>aussi efficaces qu'au cabinet</strong>, sans
            aucun déplacement. <strong>Résultats en 3 à 5 séances</strong>.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}>
              Réserver ma séance en visio <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089">06 49 35 80 89</a>
          </div>
        </div>
      </section>

      {/* Comment ça se passe */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Comment se passe une séance d'hypnose en ligne ?</h2>
          <div className="sp-prose">
            <p>
              Une séance d'hypnose en visio se déroule exactement comme au cabinet — la seule
              différence est que vous restez dans le confort de votre domicile. Vous recevez un
              <strong> lien de connexion sécurisé</strong> (Google Meet) et nous
              échangeons en face à face, par vidéo.
            </p>
            <p>
              La <strong>première séance dure environ 1h30</strong> : un entretien approfondi pour
              cerner votre problématique, puis la séance d'hypnose ericksonienne guidée par la voix,
              et enfin un debriefing pour ancrer les changements.
              Les séances suivantes durent <strong>1 heure</strong>.
            </p>
            <p>Il vous faut simplement :</p>
          </div>
          <div className="sp-checklist">
            {[
              "Un ordinateur, une tablette ou un smartphone avec caméra",
              "Une connexion internet stable",
              "Un casque ou des écouteurs pour une meilleure immersion",
              "Un endroit calme où vous ne serez pas dérangé(e)",
            ].map((item, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">La visio, pour qui ?</h2>
          <div className="sp-prose">
            <p>
              La téléconsultation d'hypnose s'adresse à toute personne qui souhaite être
              accompagnée sans contrainte géographique :
            </p>
          </div>
          <div className="sp-checklist">
            {[
              "Vous habitez en région, en zone rurale, ou loin de Paris",
              "Vous vivez à l'étranger et cherchez un accompagnement en français",
              "Votre emploi du temps ou vos déplacements rendent le présentiel difficile",
              "Vous êtes à mobilité réduite ou préférez le confort de chez vous",
              "Vous voyagez souvent et avez besoin de souplesse dans vos rendez-vous",
            ].map((item, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="sp-prose" style={{marginTop: 24}}>
            <p>
              La visio convient à la plupart des accompagnements :{' '}
              <Link to="/hypnose-stress-anxiete-paris">stress et anxiété</Link>,{' '}
              <Link to="/hypnose-sommeil-paris">troubles du sommeil</Link>,{' '}
              <Link to="/hypnose-confiance-en-soi-paris">confiance en soi</Link>,{' '}
              <Link to="/hypnose-gestion-emotions-paris">gestion des émotions</Link>,{' '}
              <Link to="/hypnose-blocages-paris">blocages</Link>{' '}
              et préparation mentale.
            </p>
          </div>
        </div>
      </section>

      {/* Les avantages */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Les avantages de l'hypnose en visio</h2>
          <div className="sp-grid-2">
            {avantages.map((a, i) => (
              <div key={i} className="sp-card reveal">
                <div className="sp-card__title">{a.t}</div>
                <div className="sp-card__desc">{a.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignage */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow">
          <blockquote className="sp-quote reveal">
            <p>
              J'habite en province et je ne pouvais pas me déplacer à Paris. Les séances en visio
              avec Alain ont été aussi profondes qu'au cabinet. J'ai retrouvé un sommeil normal en
              3 séances, depuis chez moi.
            </p>
            <footer>— Laurence D., avis Google vérifié</footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-section">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose en ligne</h2>
          <div>
            {visioFaqItems.map((item, i) => (
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

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt à commencer, où que vous soyez ?</h2>
          <p className="sp-lead">Séances en visioconférence partout en France • ou au cabinet Paris 4ème Marais-Bastille • 90&nbsp;€ la séance</p>
          <div className="hero__cta" style={{justifyContent:'center'}}>
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
               style={{background:'var(--lin)', color:'var(--cobalt)'}}>
              Réserver ma séance en visio <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089" style={{borderColor:'rgba(240,236,227,.4)', color:'var(--lin)'}}>06 49 35 80 89</a>
          </div>
          <div className="sp-links">
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/hypnose-sommeil-paris">Hypnose et sommeil →</Link>
            <Link to="/hypnose-phobies-paris">Hypnose et phobies →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseEnLigne;
