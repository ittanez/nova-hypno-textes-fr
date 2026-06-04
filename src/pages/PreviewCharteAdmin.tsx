/**
 * PreviewCharteAdmin — charte graphique (palette + typographies).
 * Page isolée, accès privé (PrivateRoute dans App.tsx).
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '@/styles/preview-charte.css';

const PreviewCharteAdmin: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
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
        <title>Charte graphique — NovaHypnose (admin)</title>
        <meta name="robots" content="noindex, nofollow" />
        {/* Polices Cormorant Garamond + DM Sans auto-hébergées via @fontsource (voir index.css) */}
      </Helmet>

      <div className="cz" ref={rootRef}>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-full">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={3} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={8} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
            <filter id="paperGrain" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves={4} seed={1} />
              <feColorMatrix values="0 0 0 0 .15  0 0 0 0 .12  0 0 0 0 .08  0 0 0 .15 0" />
            </filter>
          </defs>
        </svg>

        {/* Simple nav admin */}
        <nav className="nav">
          <div className="container nav__row">
            <a className="brand" href="/">
              <span className="alain">Alain</span><span className="zen">Zen</span><span className="atti">atti</span>
            </a>
            <div className="nav__links">
              <Link to="/">← Retour accueil</Link>
              <Link to="/autohypnose">Auto-hypnose ↗</Link>
              <Link to="/blog">Blog ↗</Link>
            </div>
          </div>
        </nav>

        {/* ── CHARTE — palette & typographie ── */}
        <section className="charte" id="charte" style={{ paddingTop: '8rem' }}>
          <div className="container">
            <div className="reveal">
              <div className="section-tag">Charte graphique</div>
              <h2 className="section-title">Le langage <em>de la marque.</em></h2>
            </div>

            <div className="charte__grid">
              <div className="reveal" style={{ transitionDelay: '.1s' }}>
                <div className="charte__block-label">① Palette risographie</div>
                <div className="swatches">
                  <div className="swatch swatch--filtered" style={{ background: '#F2A12E', color: '#1C2B4A' }}>
                    <div><div className="swatch__name">Ambre</div><div className="swatch__hex">#F2A12E</div></div>
                    <div className="swatch__role">Chaleur, éveil</div>
                  </div>
                  <div className="swatch swatch--filtered" style={{ background: '#2B4BA0', color: '#F0ECE3' }}>
                    <div><div className="swatch__name">Cobalt</div><div className="swatch__hex">#2B4BA0</div></div>
                    <div className="swatch__role">Profondeur, calme</div>
                  </div>
                  <div className="swatch swatch--filtered" style={{ background: '#8A9BB8', color: '#1C2B4A' }}>
                    <div><div className="swatch__name">Brume</div><div className="swatch__hex">#8A9BB8</div></div>
                    <div className="swatch__role">Intersection riso</div>
                  </div>
                  <div className="swatch" style={{ background: '#F0ECE3', color: '#1C2B4A', border: '1px solid rgba(28,43,74,.1)' }}>
                    <div><div className="swatch__name">Lin</div><div className="swatch__hex">#F0ECE3</div></div>
                    <div className="swatch__role">Papier, espace</div>
                  </div>
                  <div className="swatch" style={{ background: '#1C2B4A', color: '#F0ECE3' }}>
                    <div><div className="swatch__name">Profond</div><div className="swatch__hex">#1C2B4A</div></div>
                    <div className="swatch__role">Texte, nuit</div>
                  </div>
                </div>
                <p style={{ marginTop: 32, fontSize: 14, lineHeight: 1.7, maxWidth: 520, color: 'var(--corps)', opacity: .8 }}>
                  Deux encres principales — ambre et cobalt — qui, en se superposant, font apparaître
                  la brume. Le lin est le papier qui les accueille. Le grain n'est jamais retiré : il
                  dit que ce qu'on regarde a été <em>imprimé</em>.
                </p>
              </div>

              <div className="reveal" style={{ transitionDelay: '.2s' }}>
                <div className="charte__block-label">② Typographies</div>
                <div className="typo-row">
                  <div className="typo-row__label">— Cormorant Garamond · Light</div>
                  <div className="typo-row__sample-1">Un sas au milieu de la ville.</div>
                  <div className="typo-row__role">Titres · accroches · élégance, sérénité, légèreté.</div>
                </div>
                <div className="typo-row">
                  <div className="typo-row__label">— Cormorant Garamond · Italic · le fil ZEN</div>
                  <div className="typo-row__sample-2"><em>Zen</em><span className="at">atti</span></div>
                  <div className="typo-row__role">ZEN en italic cobalt — atti en romain ambre.</div>
                </div>
                <div className="typo-row">
                  <div className="typo-row__label">— DM Sans · Regular</div>
                  <div className="typo-row__sample-3">Body · Hypnose ericksonienne à Paris. Réservation en ligne.</div>
                  <div className="typo-row__role">Texte courant · modernité douce, lisibilité.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="foot">
          <div className="container">
            <div className="foot__copy">
              © NovaHypnose · Alain Zenatti — charte graphique · MMXXVI
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PreviewCharteAdmin;
