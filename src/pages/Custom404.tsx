import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import Search from 'lucide-react/dist/esm/icons/search';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import '@/styles/preview-charte.css';

/* ─────────────────────────────────────────────
   Page 404 — charte ZENatti / risographie
   ambre · cobalt · lin
   ───────────────────────────────────────────── */

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const searchInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px 14px 44px',
  borderRadius: '10px 0 0 10px',
  border: '1px solid rgba(43,75,160,.2)',
  borderRight: 'none',
  background: 'rgba(255,255,255,.9)',
  fontSize: '14px',
  outline: 'none',
  color: '#1C2B4A',
};

const pages = [
  { title: 'Accueil', desc: "Retour à la page d'accueil du cabinet.", href: '/' },
  { title: 'Blog', desc: 'Articles et ressources sur l’hypnothérapie.', href: '/blog' },
  { title: 'Auto-hypnose', desc: "Apprendre les bases de l'auto-hypnose.", href: '/autohypnose' },
  { title: 'Tarifs', desc: 'Le détail de mes tarifs de consultation.', href: '/tarifs' },
  { title: 'Le cabinet', desc: 'Présentation et localisation, Paris 4e.', href: '/#cabinet' },
  { title: 'Contact', desc: 'Me contacter directement.', href: '/#contact' },
];

const accompagnements = [
  { title: 'Stress et anxiété', desc: 'Retrouver calme et sérénité au quotidien.', href: '/hypnose-stress-anxiete-paris' },
  { title: 'Troubles du sommeil', desc: 'Retrouver un sommeil profond et réparateur.', href: '/hypnose-sommeil-paris' },
  { title: 'Phobies', desc: 'Dépasser les peurs qui limitent votre quotidien.', href: '/hypnose-phobies-paris' },
  { title: "Peur de l'avion", desc: 'Voyager à nouveau sereinement.', href: '/peurdelavion' },
  { title: 'Arrêt du tabac', desc: 'Arrêter de fumer durablement, sans stress.', href: '/hypnose-arret-tabac-paris' },
  { title: 'Confiance en soi', desc: "Renforcer l'estime et l'affirmation de soi.", href: '/hypnose-confiance-en-soi-paris' },
];

const Custom404: React.FC = () => {
  const { openResalibPopup } = useResalibPopup();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) navigate(`/blog?search=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <Helmet>
        <title>Page non trouvée | NovaHypnose - Cabinet d'hypnothérapie Paris 4</title>
        <meta name="description" content="Cette page est introuvable, mais mon cabinet d'hypnothérapie à Paris 4 est bien actif. Retrouvez mes services d'hypnose pour stress, sommeil, phobies." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="cz" ref={rootRef}>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-full-404">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={15} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={16} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
            <filter id="paperGrain-404" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves={4} seed={7} />
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
              <a href="/#about">À propos</a>
              <a href="/#cabinet">Le cabinet</a>
              <a href="/#domaines">Accompagnement</a>
              <Link to="/autohypnose">Auto-hypnose ↗</Link>
              <Link to="/blog">Blog ↗</Link>
              <a href="/#contact">Contact</a>
            </div>
            <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
          </div>
        </nav>

        {/* ── HERO 404 ── */}
        <section className="hero" style={{ minHeight: '44vh', paddingTop: '8rem', paddingBottom: '3rem' }}>
          <div className="hero__bg" aria-hidden="true">
            <svg viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full-404)">
                <path d="M 0 0 C 300 60, 700 40, 1100 80 C 1250 95, 1380 120, 1440 180 L 1440 500 L 0 500 Z" fill="#2B4BA0" opacity="0.85" />
              </g>
              <g filter="url(#riso-full-404)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 0 260 C 200 220, 500 200, 800 240 C 1000 265, 1200 230, 1440 260 L 1440 500 L 0 500 Z" fill="#F2A12E" opacity="0.55" />
              </g>
              <rect width="1440" height="500" filter="url(#paperGrain-404)" opacity=".2" />
            </svg>
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 5 }}>
            <div className="reveal hero__panel" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <div className="tag" style={{ justifyContent: 'center' }}>Erreur 404</div>
              <h1 className="hero__name" style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)', marginTop: '1rem' }}>
                Cette page s'est <em style={{ fontStyle: 'italic', color: 'var(--cobalt)' }}>égarée.</em>
              </h1>
              <p className="hero__sub" style={{ marginTop: '1.2rem', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', textTransform: 'none', letterSpacing: 'normal', fontSize: '15px', fontWeight: 400, lineHeight: 1.7 }}>
                Pas de panique, respirez. La page que vous cherchez n'existe plus ou a changé d'adresse — mais mon cabinet, lui, est bien là.
              </p>

              <form onSubmit={handleSearch} style={{ marginTop: '2.2rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', maxWidth: '420px', width: '100%' }}>
                  <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gris)' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher sur le site…"
                    style={searchInputStyle}
                  />
                </div>
                <button type="submit" className="btn btn--primary" style={{ borderRadius: '0 10px 10px 0', boxShadow: 'none' }}>
                  Rechercher
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ── PAGES PRINCIPALES ── */}
        <section style={{ background: 'var(--lin-2)', padding: '90px 0' }}>
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div className="section-tag" style={{ justifyContent: 'center' }}>Retrouvez votre chemin</div>
              <h2 className="section-title">Pages <em>principales.</em></h2>
            </div>
            <div className="cards">
              {pages.map((p, i) => (
                <Link key={p.title} to={p.href} className="card card--link reveal" style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
                  <span className="card__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="card__title">{p.title}</h3>
                  <p className="card__desc">{p.desc}</p>
                  <span className="card__cta">Découvrir →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── ACCOMPAGNEMENTS ── */}
        <section style={{ background: 'var(--lin)', padding: '90px 0' }}>
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div className="section-tag" style={{ justifyContent: 'center' }}>Ce que je peux vous aider à surmonter</div>
              <h2 className="section-title">Mes <em>accompagnements.</em></h2>
            </div>
            <div className="cards">
              {accompagnements.map((a, i) => (
                <Link key={a.title} to={a.href} className="card card--link reveal" style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
                  <span className="card__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="card__title">{a.title}</h3>
                  <p className="card__desc">{a.desc}</p>
                  <span className="card__cta">Découvrir →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA CONTACT ── */}
        <section style={{ background: 'var(--cobalt)', padding: '90px 0', textAlign: 'center' }}>
          <div className="container">
            <div className="reveal" style={{ maxWidth: '560px', margin: '0 auto' }}>
              <div className="section-tag" style={{ justifyContent: 'center', color: 'var(--amber)' }}>Besoin d'aide ?</div>
              <h2 className="section-title" style={{ color: 'var(--lin)' }}>Prenons <em style={{ color: 'var(--amber)' }}>rendez-vous.</em></h2>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(240,236,227,.8)', margin: '0 0 32px' }}>
                Une question, une envie de consulter ? Contactez-moi directement.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
                <a href="tel:0649358089" className="btn btn--ghost" style={{ borderColor: 'rgba(240,236,227,.3)', color: 'var(--lin)' }}>
                  <Phone size={16} /> 06 49 35 80 89
                </a>
                <a href="mailto:contact@novahypnose.fr" className="btn btn--ghost" style={{ borderColor: 'rgba(240,236,227,.3)', color: 'var(--lin)' }}>
                  <Mail size={16} /> contact@novahypnose.fr
                </a>
              </div>
              <a
                href={RESALIB_URL}
                onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
                className="btn btn--amber"
              >
                <Calendar size={16} /> Prendre rendez-vous <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="foot">
          <div className="container">
            <nav className="foot__links" aria-label="Pieds de page">
              <Link to="/">← Accueil</Link>
              <span className="foot__sep">·</span>
              <Link to="/blog">Blog</Link>
              <span className="foot__sep">·</span>
              <Link to="/mentions-legales">Mentions légales</Link>
              <span className="foot__sep">·</span>
              <a href="tel:+33649358089">06 49 35 80 89</a>
            </nav>
            <div className="foot__copy">
              © NovaHypnose · Alain Zenatti <em>— pour aller à votre rythme</em> · MMXXVI
            </div>
          </div>
        </footer>

        <a
          className="floating-cta"
          href={RESALIB_URL}
          onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
          aria-label="Prendre rendez-vous"
        >
          Prendre rendez-vous <span className="arrow">→</span>
        </a>
      </div>
    </>
  );
};

export default Custom404;
