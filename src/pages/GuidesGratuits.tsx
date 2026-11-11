import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { safeJSONStringify } from '@/lib/seo-utils';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import { GUIDE_LANDINGS, GUIDE_LANDINGS_ORDER } from '@/data/guideLandings';
import '@/styles/preview-charte.css';

/* ─────────────────────────────────────────────
   Page qui regroupe les 7 guides gratuits.
   Les données (titre, couverture, nombre de pages, phrase) viennent de
   src/data/guideLandings.tsx : un guide ajouté ou modifié là-bas
   est mis à jour ici automatiquement.
   Charte ZENatti / risographie — ambre · cobalt · lin
   ───────────────────────────────────────────── */

const URL = 'https://novahypnose.fr/guides-gratuits';
const DECRYPTAGE =
  'https://novahypnose.fr/decryptage?utm_source=guides-gratuits&utm_medium=page&utm_content=choisir-un-guide';

const guides = GUIDE_LANDINGS_ORDER.map((key) => GUIDE_LANDINGS[key]);

const GuidesGratuits: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Guides gratuits d'hypnose : sommeil, tabac, stress, colère</title>
        <meta
          name="description"
          content="7 guides gratuits d'Alain Zenatti, hypnothérapeute à Paris 4e et en visio : sommeil, tabac, procrastination, colère, carrière, émotions, autohypnose."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={URL} />
        <script type="application/ld+json">{safeJSONStringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${URL}#page`,
          "name": "Guides gratuits d'hypnose",
          "url": URL,
          "inLanguage": "fr-FR",
          "author": { "@id": "https://novahypnose.fr/#person" },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": guides.map((g, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "url": `https://novahypnose.fr/${g.slug}`,
              "name": g.schemaName,
            })),
          },
        })}</script>
      </Helmet>

      <div className="cz" ref={rootRef}>
        {/* ═══════════ EN-TÊTE ═══════════ */}
        <section style={{ background: 'var(--lin-2)', padding: '88px 0 56px' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ marginBottom: '28px', fontSize: '13px' }}>
              <a href="/" style={{ color: 'var(--cobalt)', textDecoration: 'none' }}>← NovaHypnose</a>
            </p>
            <div className="reveal">
              <div className="section-tag">Guides gratuits · PDF</div>
              <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(34px, 5vw, 58px)', fontWeight: 300, lineHeight: 1.08, color: 'var(--texte)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Sept guides pour <em style={{ fontStyle: 'italic', color: 'var(--cobalt)', fontWeight: 400 }}>comprendre ce qui vous pèse.</em>
              </h1>
              <div className="hero__rule" />
              <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 1.8vw, 21px)', color: 'var(--texte)', lineHeight: 1.55, maxWidth: '640px', marginBottom: '14px' }}>
                Chaque guide est écrit par Alain Zenatti, hypnothérapeute à Paris 4e et en visio, partout en France. Gratuit, sans engagement : vous recevez le PDF par email en quelques minutes.
              </p>
              <p style={{ fontSize: '13px', color: 'var(--gris)', maxWidth: '640px', lineHeight: 1.6 }}>
                Ces guides proposent des pistes de réflexion et d'entraînement. Ils ne promettent aucun résultat et ne remplacent ni un avis médical ni un suivi psychologique.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ LES GUIDES ═══════════ */}
        <section style={{ background: 'var(--lin)', padding: '64px 0 80px' }}>
          <div className="container">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '28px' }}>
              {guides.map((g, i) => (
                <li key={g.slug} className="reveal" style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                  <Link
                    to={`/${g.slug}`}
                    style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', background: 'var(--paper)', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 20px rgba(28,43,74,.06)', borderTop: '3px solid var(--amber)' }}
                  >
                    <img
                      src={g.cover.src}
                      alt={g.cover.alt}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      style={{ width: '100%', maxWidth: '190px', alignSelf: 'center', borderRadius: '10px', boxShadow: '8px 8px 0 rgba(28,43,74,.14)', marginBottom: '22px' }}
                    />
                    <p style={{ fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--amber-text)', marginBottom: '6px' }}>
                      {g.pages} pages
                    </p>
                    <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: '22px', fontWeight: 400, lineHeight: 1.2, color: 'var(--texte)', margin: '0 0 8px' }}>
                      {g.titleTop} <em style={{ color: 'var(--cobalt)' }}>{g.titleEm}</em>
                    </h2>
                    <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--corps)', margin: '0 0 18px', flexGrow: 1 }}>{g.blurb}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, color: 'var(--cobalt)' }}>
                      Recevoir ce guide <ArrowRight size={15} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ═══════════ CHOISIR ═══════════ */}
        <section style={{ background: 'var(--lin-2)', padding: '72px 0' }}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div className="reveal" style={{ background: 'var(--cobalt)', color: '#fff', borderRadius: '20px', padding: '36px 32px' }}>
              <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400, margin: '0 0 12px', color: '#fff' }}>
                Vous ne savez pas par lequel commencer ?
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.7, margin: '0 0 20px', color: 'rgba(255,255,255,.88)' }}>
                Répondez à 5 questions (2 minutes). Vous obtenez tout de suite un décryptage personnalisé : ce qui ressort de vos réponses, et quelques pistes pour la suite. Gratuit, sans engagement, et vos réponses restent confidentielles.
              </p>
              <a
                href={DECRYPTAGE}
                style={{ display: 'inline-block', background: '#fff', color: 'var(--texte)', borderRadius: '999px', padding: '12px 28px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}
              >
                Faire mon décryptage
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════ PIED DE PAGE ═══════════ */}
        <footer style={{ background: 'var(--cobalt-2)', color: 'rgba(240,236,227,.5)', fontSize: '12px', textAlign: 'center', padding: '20px 16px' }}>
          <p style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <MapPin size={11} /> 16 rue Saint-Antoine, 75004 Paris
          </p>
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} NovaHypnose · Alain Zenatti · Hypnothérapeute Paris 4e et visio, partout en France
            <br />Conformément au RGPD — Désabonnement libre à tout moment.
          </p>
        </footer>
      </div>
    </>
  );
};

export default GuidesGratuits;
