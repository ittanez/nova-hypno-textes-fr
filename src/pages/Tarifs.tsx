import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema, personSchema, createBreadcrumbSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const tarifsFaqItems = [
  {
    question: "Combien coûte une séance d'hypnose chez NovaHypnose ?",
    answer: "La séance coûte 90 € au cabinet (Paris 4ème, Marais-Bastille) comme en visioconférence. La séance à domicile, disponible dans Paris Centre (arrondissements 1 à 4 et 9 à 11), est à 140 €. La première séance dure environ 1h30, les suivantes 1 heure — le tarif reste identique.",
  },
  {
    question: "Les séances d'hypnose sont-elles remboursées par la Sécurité sociale ou les mutuelles ?",
    answer: "L'hypnothérapie n'est pas prise en charge par la Sécurité sociale. En revanche, de plus en plus de mutuelles proposent un forfait « médecines douces » qui couvre tout ou partie des séances. Renseignez-vous auprès de votre complémentaire santé ; une facture vous est fournie sur simple demande.",
  },
  {
    question: "Quels moyens de paiement sont acceptés ?",
    answer: "Au cabinet : carte bancaire ou Wero. En visio : paiement en ligne sécurisé par carte bancaire via Stripe (le lien vous est transmis lors de la réservation) ou par Wero au 06 49 35 80 89.",
  },
  {
    question: "Combien de séances faut-il prévoir ?",
    answer: "L'hypnose ericksonienne est une thérapie brève : la plupart des accompagnements aboutissent en 3 à 5 séances. Certaines problématiques ciblées (phobie simple, préparation à un événement) peuvent évoluer dès 1 à 2 séances. Le nombre estimé est discuté dès le premier rendez-vous — sans engagement sur un « forfait ».",
  },
  {
    question: "Puis-je annuler ou reporter un rendez-vous ?",
    answer: "Oui, l'annulation ou le report est sans frais jusqu'à 48 h avant le rendez-vous. Au-delà, la séance est due — ce cadre protège les créneaux des autres patients.",
  },
  {
    question: "Le tarif est-il le même en visio qu'au cabinet ?",
    answer: "Oui : 90 € dans les deux cas, pour une séance de même durée et de même contenu. L'hypnose passe par la voix et la relation thérapeutique — la visioconférence n'enlève rien à la profondeur du travail.",
  },
];

const formules = [
  {
    t: 'Au cabinet — 90 €',
    d: "Au cœur du Marais, 16 rue Saint-Antoine, Paris 4ème. Métro Bastille (lignes 1, 5, 8) ou Saint-Paul (ligne 1). 1h30 la première séance, 1h les suivantes.",
  },
  {
    t: 'En visio — 90 €',
    d: "Depuis chez vous, partout en France ou à l'étranger, via Google Meet. Même durée, même déroulé, même efficacité qu'au cabinet.",
  },
  {
    t: 'À domicile — 140 €',
    d: "Dans Paris Centre (arrondissements 1 à 4 et 9 à 11). Pour les personnes à mobilité réduite ou qui préfèrent être accompagnées chez elles.",
  },
  {
    t: 'Formation auto-hypnose — 240 €',
    d: "Une journée en petit groupe (6 participants maximum) pour apprendre à reproduire seul les états de ressource de vos séances. Voir la page auto-hypnose.",
  },
];

const Tarifs = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Tarifs', url: 'https://novahypnose.fr/tarifs' },
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://novahypnose.fr/tarifs#faq",
    "mainEntity": tarifsFaqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer },
    })),
  };

  const offersSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": "https://novahypnose.fr/tarifs#offres",
    "name": "Tarifs des séances d'hypnose — NovaHypnose Paris",
    "url": "https://novahypnose.fr/tarifs",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Séance d'hypnose au cabinet (Paris 4ème)",
        "price": "90",
        "priceCurrency": "EUR",
        "offeredBy": { "@id": "https://novahypnose.fr/#localbusiness" },
      },
      {
        "@type": "Offer",
        "name": "Séance d'hypnose en visioconférence",
        "price": "90",
        "priceCurrency": "EUR",
        "offeredBy": { "@id": "https://novahypnose.fr/#localbusiness" },
      },
      {
        "@type": "Offer",
        "name": "Séance d'hypnose à domicile (Paris Centre)",
        "price": "140",
        "priceCurrency": "EUR",
        "offeredBy": { "@id": "https://novahypnose.fr/#localbusiness" },
      },
      {
        "@type": "Offer",
        "name": "Formation auto-hypnose en groupe (1 journée)",
        "price": "240",
        "priceCurrency": "EUR",
        "offeredBy": { "@id": "https://novahypnose.fr/#localbusiness" },
      },
    ],
  };

  return (
    <CzLayout>
      <Helmet>
        <title>Tarifs hypnose Paris & visio — 90 € la séance | NovaHypnose</title>
        <meta name="description" content="Tarifs des séances d'hypnose avec Alain Zenatti : 90 € au cabinet Paris 4ème ou en visio, 140 € à domicile Paris Centre. 1h30 la première séance. Paiement CB, Stripe, Wero. Annulation sans frais jusqu'à 48 h." />
        <meta name="keywords" content="tarif hypnose paris, prix séance hypnose, tarif hypnothérapeute paris, prix hypnose visio, hypnose paris tarif, séance hypnose prix, remboursement hypnose mutuelle" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/tarifs" />
        <meta property="og:title" content="Tarifs hypnose Paris & visio — 90 € la séance | NovaHypnose" />
        <meta property="og:description" content="90 € au cabinet Paris 4ème ou en visio, 140 € à domicile. 1h30 la première séance, 1h les suivantes. Annulation sans frais jusqu'à 48 h." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/tarifs" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tarifs hypnose Paris & visio — 90 € la séance | NovaHypnose" />
        <meta name="twitter:description" content="90 € au cabinet Paris 4ème ou en visio, 140 € à domicile. Annulation sans frais jusqu'à 48 h." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(offersSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(faqSchema)}</script>
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
          <div className="tag">Séances — Un cadre clair, posé d'emblée</div>
          <h1 className="sp-hero__h1">
            Tarifs des séances<br/><em>d'hypnose à Paris & en visio</em>
          </h1>
          <p className="sp-hero__lead">
            <strong>90 € la séance</strong>, au cabinet Paris 4ème comme en visioconférence.
            La première séance dure <strong>1h30</strong>, les suivantes 1 heure. Séances
            réservées aux adultes — la plupart des accompagnements aboutissent
            en <strong>3 à 5 séances</strong>.
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

      {/* Formules */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Les formules</h2>
          <div className="sp-grid-2">
            {formules.map((f, i) => (
              <div key={i} className="sp-card reveal">
                <div className="sp-card__title">{f.t}</div>
                <div className="sp-card__desc">{f.d}</div>
              </div>
            ))}
          </div>
          <div className="sp-prose" style={{marginTop: 24}}>
            <p>
              Le tarif est identique pour la première séance (1h30) et les séances de
              suivi (1h). Aucun forfait imposé, aucun engagement de durée : chaque séance
              se réserve librement, en fonction de votre avancée. Pour la formation en
              groupe, voir la page <Link to="/autohypnose">auto-hypnose</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Ce que comprend chaque séance</h2>
          <div className="sp-checklist">
            {[
              "Un entretien pour faire le point sur votre objectif et votre avancée",
              "Une séance d'hypnose ericksonienne personnalisée, guidée par la voix",
              "Un debriefing pour ancrer les changements et répondre à vos questions",
              "Des exercices d'auto-hypnose simples à refaire chez vous entre les séances",
            ].map((item, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paiement et remboursement */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Paiement, remboursement, annulation</h2>
          <div className="sp-prose">
            <p>
              Le règlement s'effectue par <strong>carte bancaire</strong>, par <strong>Wero</strong> ou
              en ligne via <strong>Stripe</strong> pour les séances en visio. Une facture peut vous
              être fournie sur simple demande.
            </p>
            <p>
              L'hypnothérapie n'est pas remboursée par la Sécurité sociale, mais de
              nombreuses <strong>mutuelles</strong> participent au remboursement via leur forfait
              « médecines douces » — renseignez-vous auprès de votre complémentaire santé.
            </p>
            <p>
              L'<strong>annulation est sans frais jusqu'à 48 h</strong> avant le rendez-vous, par
              téléphone ou directement depuis votre espace Resalib.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Questions fréquentes sur les tarifs</h2>
          <div>
            {tarifsFaqItems.map((item, i) => (
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
          <h2 className="sp-h2">Prêt à commencer ?</h2>
          <p className="sp-lead">Cabinet Paris 4ème Marais-Bastille • ou en visio partout en France • 90&nbsp;€ la séance</p>
          <div className="hero__cta" style={{justifyContent:'center'}}>
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
               style={{background:'var(--lin)', color:'var(--cobalt)'}}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089" style={{borderColor:'rgba(240,236,227,.4)', color:'var(--lin)'}}>06 49 35 80 89</a>
          </div>
          <div className="sp-links">
            <Link to="/avis">Avis des patients →</Link>
            <Link to="/hypnose-en-ligne">Hypnose en visio →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default Tarifs;
