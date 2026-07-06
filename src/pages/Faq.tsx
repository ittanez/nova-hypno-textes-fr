import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema, personSchema, createBreadcrumbSchema } from '@/data/schemaOrg';
import { faqItems } from '@/data/faqData';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const Faq = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'FAQ', url: 'https://novahypnose.fr/faq' },
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://novahypnose.fr/faq#faq",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer.replace(/\n/g, ' ') },
    })),
  };

  return (
    <CzLayout>
      <Helmet>
        <title>FAQ — Questions sur l'hypnose et le cabinet | NovaHypnose</title>
        <meta name="description" content="Toutes les réponses sur l'hypnose ericksonienne : déroulement d'une séance, sécurité, remboursement, accès au cabinet Paris 4ème, hypnose en visio. Par Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="faq hypnose, questions hypnose paris, hypnose danger, hypnose remboursement mutuelle, comment se déroule une séance hypnose, hypnose visio faq" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/faq" />
        <meta property="og:title" content="FAQ — Questions sur l'hypnose et le cabinet | NovaHypnose" />
        <meta property="og:description" content="Déroulement d'une séance, sécurité, remboursement, accès au cabinet, hypnose en visio : toutes les réponses avant de prendre rendez-vous." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/faq" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ — Questions sur l'hypnose et le cabinet | NovaHypnose" />
        <meta name="twitter:description" content="Déroulement d'une séance, sécurité, remboursement, accès au cabinet, hypnose en visio." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
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
          <div className="tag">Avant de réserver — Questions fréquentes</div>
          <h1 className="sp-hero__h1">
            Questions fréquentes<br/><em>sur l'hypnose</em>
          </h1>
          <p className="sp-hero__lead">
            Déroulement d'une séance, sécurité, remboursement, accès au cabinet, hypnose en
            visio : les réponses aux questions les plus posées avant de prendre rendez-vous.
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

      {/* FAQ */}
      <section className="sp-section">
        <div className="container sp-narrow">
          <div>
            {faqItems.map((item, i) => (
              <div key={i} className={`faq__item${openFaq === i ? ' open' : ''}`}>
                <button className="faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.question}
                  <span className="faq__icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="faq__a" style={{whiteSpace: 'pre-line'}}>{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions spécifiques */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Une question plus spécifique ?</h2>
          <div className="sp-prose">
            <p>
              Chaque page spécialité a sa propre FAQ ciblée : <Link to="/hypnose-en-ligne">hypnose en visio</Link>,{' '}
              <Link to="/hypnose-stress-anxiete-paris">stress et anxiété</Link>,{' '}
              <Link to="/hypnose-phobies-paris">phobies</Link>,{' '}
              <Link to="/hypnose-sommeil-paris">sommeil</Link>. Pour les tarifs et l'annulation,
              consultez la page <Link to="/tarifs">tarifs des séances</Link>. Pour nous écrire
              directement, voir la page <Link to="/contact">contact</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Une autre question ?</h2>
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
            <Link to="/contact">Nous contacter →</Link>
            <Link to="/tarifs">Tarifs des séances →</Link>
            <Link to="/avis">Avis des clients →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default Faq;
