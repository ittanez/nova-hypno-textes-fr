/**
 * CzLayout — Reusable charte risographie layout wrapper.
 * Provides: SVG defs, fixed nav, mobile burger, IntersectionObserver reveals, footer.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// Styles des pages secondaires (sp-*) — non inclus dans le CSS global du home.
import '@/styles/charte-secondary.css';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface CzLayoutProps {
  children: React.ReactNode;
  navLinks?: NavLink[];
  ctaHref?: string;
  ctaLabel?: string;
  floatingCtaHref?: string;
  floatingCtaLabel?: string;
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Auto-hypnose', href: '/autohypnose' },
  { label: 'Articles', href: '/blog' },
  { label: 'Hypno-balade', href: 'https://hypno-balade.novahypnose.fr/', external: true },
  { label: 'Contact', href: '/#contact' },
];

const ACCOMPAGNEMENTS_LINKS = [
  { label: 'Stress & Anxiété', href: '/hypnose-stress-anxiete-paris' },
  { label: 'Sommeil', href: '/hypnose-sommeil-paris' },
  { label: 'Gestion des émotions', href: '/hypnose-gestion-emotions-paris' },
  { label: 'Deuil et séparation', href: '/hypnose-deuil-paris' },
  { label: 'Traumatismes psychologiques', href: '/hypnose-traumatismes-paris' },
  { label: 'Blocages & comportements', href: '/hypnose-blocages-paris' },
  { label: 'Confiance en soi', href: '/hypnose-confiance-en-soi-paris' },
  { label: 'Phobies', href: '/hypnose-phobies-paris' },
  { label: 'Poids', href: '/hypnose-troubles-alimentaires-paris' },
  { label: 'Arrêt du tabac', href: '/hypnose-arret-tabac-paris' },
  { label: 'Test de réceptivité', href: '/test-receptivite' },
];

const DEFAULT_CTA_HREF = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';
const DEFAULT_CTA_LABEL = 'Prendre rendez-vous';

const CzLayout: React.FC<CzLayoutProps> = ({
  children,
  navLinks = DEFAULT_NAV_LINKS,
  ctaHref = DEFAULT_CTA_HREF,
  ctaLabel = DEFAULT_CTA_LABEL,
  floatingCtaHref,
  floatingCtaLabel,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [specialitesOpen, setSpecialitesOpen] = useState(false);

  useEffect(() => {
    if (!specialitesOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSpecialitesOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSpecialitesOpen(false);
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [specialitesOpen]);

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
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="cz" ref={rootRef}>
      {/* ── SVG defs (filtres risographie) ── */}
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

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="container nav__row">
          <a className="brand" href="/">
            <span className="alain">Alain</span><span className="zen">Zen</span><span className="atti">atti</span>
          </a>
          <button
            className={`nav__burger${navOpen ? ' open' : ''}`}
            aria-label={navOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
          <div className={`nav__links${navOpen ? ' open' : ''}`} onClick={() => setNavOpen(false)}>
            <div ref={dropdownRef} className={`nav__dropdown${specialitesOpen ? ' open' : ''}`} onClick={(e) => e.stopPropagation()}>
              <button
                className="nav__dropdown-toggle"
                onClick={() => setSpecialitesOpen((v) => !v)}
                aria-expanded={specialitesOpen}
                aria-haspopup="true"
              >
                Applications <span className="nav__dropdown-arrow" aria-hidden="true">▾</span>
              </button>
              <div className="nav__dropdown-menu">
                {ACCOMPAGNEMENTS_LINKS.map((link) => (
                  <Link key={link.href} to={link.href} onClick={() => { setNavOpen(false); setSpecialitesOpen(false); }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.map((link) =>
              link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
              ) : link.href.startsWith('/#') || link.href.startsWith('#') ? (
                <a key={link.href} href={link.href}>{link.label}</a>
              ) : (
                <Link key={link.href} to={link.href}>{link.label}</Link>
              )
            )}
          </div>
          {ctaLabel === DEFAULT_CTA_LABEL ? (
            <div className="nav__cta" onClick={(e) => e.stopPropagation()}>
              <a className="btn btn--ghost" href={ctaHref} target="_blank" rel="noopener noreferrer">RDV Paris</a>
              <a className="btn btn--visio" href={ctaHref} target="_blank" rel="noopener noreferrer">RDV visio <span className="arrow">→</span></a>
            </div>
          ) : (
            <a className="btn btn--primary" href={ctaHref} target="_blank" rel="noopener noreferrer">
              {ctaLabel} <span className="arrow">→</span>
            </a>
          )}
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="sp-main">
        {children}
      </main>

      {/* ── FLOATING CTA (optional) ── */}
      {floatingCtaHref && floatingCtaLabel && (
        <a
          className="btn btn--primary"
          href={floatingCtaHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200, boxShadow: '0 4px 24px rgba(43,75,160,.35)' }}
        >
          {floatingCtaLabel} <span className="arrow">→</span>
        </a>
      )}

      {/* ── FOOTER ── */}
      <footer className="foot">
        <div className="container">
          <nav className="foot__links" aria-label="Pied de page">
            <Link to="/">Accueil</Link>
            <span className="foot__sep">·</span>
            <Link to="/tarifs">Tarifs</Link>
            <span className="foot__sep">·</span>
            <Link to="/avis">Avis</Link>
            <span className="foot__sep">·</span>
            <Link to="/contact">Contact</Link>
            <span className="foot__sep">·</span>
            <Link to="/faq">FAQ</Link>
            <span className="foot__sep">·</span>
            <Link to="/mentions-legales">Mentions légales</Link>
            <span className="foot__sep">·</span>
            <Link to="/politique-de-confidentialite">Confidentialité</Link>
            <span className="foot__sep">·</span>
            <a href="tel:+33649358089">06 49 35 80 89</a>
            <span className="foot__sep">·</span>
            <Link to="/hypnose-en-ligne">Hypnose en ligne</Link>
            <span className="foot__sep">·</span>
            <Link to="/hypnose-professionnels-paris">Professionnels</Link>
          </nav>
          <div className="foot__copy">
            © NovaHypnose · Alain Zenatti <em>— hypnothérapeute Paris 4e</em> · {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CzLayout;
