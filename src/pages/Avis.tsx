import React from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema, personSchema, createBreadcrumbSchema } from '@/data/schemaOrg';
import { testimonials } from '@/data/testimonials';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';
const GOOGLE_REVIEWS_URL = 'https://maps.google.com/?cid=11956530853003446067';

// Même règle d'anonymisation que la homepage : prénom + initiale du nom.
const anonymizeName = (full: string): string => {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return parts[0] ?? '';
  const last = parts[parts.length - 1];
  return `${parts.slice(0, -1).join(' ')} ${last[0]}.`;
};

const Avis = () => {
  const { openResalibPopup } = useResalibPopup();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Avis & témoignages', url: 'https://novahypnose.fr/avis' },
  ]);

  return (
    <CzLayout>
      <Helmet>
        <title>Avis & témoignages patients — NovaHypnose | Alain Zenatti</title>
        <meta name="description" content="Les avis des patients d'Alain Zenatti, hypnothérapeute à Paris 4ème : 5/5 sur Google et 5/5 sur Resalib. Témoignages vérifiés sur le stress, l'anxiété, les phobies, le sommeil et la confiance en soi." />
        <meta name="keywords" content="avis novahypnose, avis alain zenatti, avis hypnothérapeute paris, témoignage hypnose paris, hypnose paris avis, avis hypnose ericksonienne" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/avis" />
        <meta property="og:title" content="Avis & témoignages patients — NovaHypnose | Alain Zenatti" />
        <meta property="og:description" content="5/5 sur Google et 5/5 sur Resalib. Témoignages vérifiés de patients accompagnés en hypnose à Paris et en visio." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/avis" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Avis & témoignages patients — NovaHypnose | Alain Zenatti" />
        <meta name="twitter:description" content="5/5 sur Google et 5/5 sur Resalib. Témoignages vérifiés." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
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
          <div className="tag">Ils en parlent — Avis vérifiés</div>
          <h1 className="sp-hero__h1">
            Avis & témoignages<br/><em>des patients</em>
          </h1>
          <p className="sp-hero__lead">
            <strong>5/5 sur Google</strong> et <strong>5/5 sur Resalib</strong>.
            Voici, avec leur accord, ce que disent les personnes accompagnées au cabinet
            Paris 4ème ou en visio — sur le stress, l'anxiété, les phobies, le sommeil,
            la confiance en soi.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
              Voir les avis Google <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}>
              Prendre rendez-vous
            </a>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="sp-section">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Ce qu'ils écrivent, après</h2>
          {testimonials.map((t) => (
            <blockquote key={t.name} className="sp-quote reveal">
              <p>{t.text}</p>
              <footer>
                <span aria-label={`${t.rating} sur 5`}>{'★'.repeat(t.rating)}</span>{' '}
                — {anonymizeName(t.name)}, avis Google vérifié
              </footer>
            </blockquote>
          ))}
          <div className="sp-prose" style={{marginTop: 24}}>
            <p>
              Tous ces témoignages proviennent d'avis publics laissés sur{' '}
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Google</a> ;
              les noms sont abrégés par discrétion. Vous trouverez d'autres avis vérifiés
              sur la fiche Resalib d'Alain Zenatti.
            </p>
            <p>
              Chaque parcours est unique : ces retours illustrent des accompagnements
              individuels et ne constituent pas une promesse de résultat. La plupart des
              accompagnements aboutissent en 3 à 5 séances —{' '}
              voir les <Link to="/tarifs">tarifs et le déroulé des séances</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Et si le prochain avis était le vôtre ?</h2>
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
            <Link to="/tarifs">Tarifs des séances →</Link>
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/hypnose-sommeil-paris">Hypnose et sommeil →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default Avis;
