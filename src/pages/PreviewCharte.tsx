/**
 * PreviewCharte — aperçu de la charte « ZENatti / risographie ».
 * Palette risographie : ambre #F2A12E · cobalt #2B4BA0 · lin #F0ECE3 · encre #1C2B4A.
 * Contenu au ton apaisé, aéré, orienté états recherchés (et non listes de symptômes).
 * Styles scopés .cz (classe racine).
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '@/styles/preview-charte.css';
import { testimonials } from '@/data/testimonials';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema, personSchema, faqSchema, breadcrumbSchema, websiteSchema, visioServiceSchema } from '@/data/schemaOrg';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';
const CONTACT_URL = 'https://akrlyzmfszumibwgocae.supabase.co/functions/v1/send-contact-preview';

// 3 groupes de témoignages (longueurs variées dans chaque groupe), pour la rotation automatique.
const TESTIMONIAL_SETS = [
  [0, 3, 8],
  [7, 6, 4],
  [2, 1, 5],
];

const domaines = [
  { t: "Gérer le stress — retrouver le calme", d: "Desserrer la pression intérieure, retrouver une respiration ample et un esprit plus posé, au quotidien.", href: "/hypnose-stress-anxiete-paris" },
  { t: "Troubles du sommeil — retrouver le repos", d: "Laisser le mental se déposer le soir, et renouer avec un sommeil simple et réparateur.", href: "/hypnose-sommeil-paris" },
  { t: "Confiance en soi — l'habiter pleinement", d: "Reprendre votre juste place, avec une assurance tranquille qui vient de l'intérieur.", href: "/hypnose-confiance-en-soi-paris" },
  { t: "Phobies & blocages — se sentir plus libre", d: "Alléger ce qui retient, dépasser une appréhension, avancer avec plus d'aisance.", href: "/hypnose-phobies-paris" },
  { t: "Régulation émotionnelle — apprivoiser ses émotions", d: "Accueillir ce qui vous traverse sans être débordé, et retrouver de la stabilité.", href: "/hypnose-gestion-emotions-paris" },
  { t: "Prise de parole — aborder l'instant clé", d: "Prise de parole, échéance, changement : mobiliser votre calme au bon moment.", href: "/hypnose-blocages-paris" },
  { t: "Rapport au corps — renouer avec soi", d: "Apaiser le rapport à la nourriture, retrouver des repères justes, habiter son corps avec plus de douceur.", href: "/hypnose-troubles-alimentaires-paris" },
  { t: "Procrastination — reprendre l'élan", d: "Sortir de l'inertie qui pèse, retrouver le goût d'agir et avancer vers ce qui compte pour vous.", href: "/hypnose-blocages-paris" },
  { t: "Arrêter une habitude — reprendre le contrôle", d: "Desserrer un automatisme qui vous échappe, redonner de la place au choix, dans le quotidien.", href: "/hypnose-blocages-paris" },
];

const faq = [
  { q: 'Comment fonctionne l\'hypnose ?', a: "L'hypnose ericksonienne s'appuie sur un état naturel que votre cerveau connaît déjà — une forme de concentration absorbée, proche de ce qu'on ressent lorsqu'on est plongé dans un livre ou dans ses pensées. Dans cet état, le mental critique s'apaise et l'inconscient devient plus accessible. Ce n'est pas un état de transe mystérieux : vous restez présent, conscient, en dialogue. Le thérapeute vous guide avec des suggestions douces, adaptées à votre vécu, pour que vos propres ressources se mobilisent." },
  { q: 'Comment se déroule une séance ?', a: "Un échange pour comprendre ce qui vous amène, puis un temps d'hypnose dans un état de profonde détente. Vous restez présent, à chaque instant." },
  { q: 'Vais-je garder le contrôle ?', a: "Toujours. L'hypnose ericksonienne est un dialogue permissif : vous ne ferez jamais rien qui aille contre vos valeurs. Vous gardez le contrôle du début à la fin." },
  { q: 'En combien de séances ?', a: "L'hypnose est une thérapie brève : la plupart des accompagnements trouvent leur aboutissement en 3 à 5 séances. Des changements concrets, sans exploration sans fin." },
  { q: 'Est-ce que cela fonctionne en visio ?', a: "Oui, tout aussi bien qu'au cabinet. Depuis chez vous, où que vous soyez — en France comme à l'étranger —, il suffit d'un endroit calme et d'une connexion stable." },
  { q: 'À qui s\'adressent les séances ?', a: "Aux adultes, pour un travail thérapeutique complet et personnalisé, dans un cadre confidentiel et sécurisant." },
];

const anonymizeName = (full: string): string => {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return parts[0] ?? '';
  const last = parts[parts.length - 1];
  return `${parts.slice(0, -1).join(' ')} ${last[0]}.`;
};

const ACCOMPAGNEMENT_THEMES_LINKS = [
  { label: 'Stress & anxiété', href: '/hypnose-stress-anxiete-paris' },
  { label: 'Sommeil', href: '/hypnose-sommeil-paris' },
  { label: 'Gestion des émotions', href: '/hypnose-gestion-emotions-paris' },
  { label: 'Deuil et séparation', href: '/hypnose-deuil-paris' },
  { label: 'Traumatismes', href: '/hypnose-traumatismes-paris' },
  { label: 'Blocages & comportements', href: '/hypnose-blocages-paris' },
  { label: 'Confiance en soi', href: '/hypnose-confiance-en-soi-paris' },
  { label: 'Phobies', href: '/hypnose-phobies-paris' },
  { label: 'Poids', href: '/hypnose-troubles-alimentaires-paris' },
  { label: 'Arrêt du tabac', href: '/hypnose-arret-tabac-paris' },
];

const NAV_MOBILE_BREAKPOINT = 760;
const isDesktopViewport = (): boolean =>
  typeof window !== 'undefined' && window.innerWidth > NAV_MOBILE_BREAKPOINT;

// Anime un nombre de 0 à target une fois que `trigger` passe à true (ex. entrée dans le viewport).
function useCountUp(target: number, trigger: boolean, duration = 1200): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);
  return value;
}

const PreviewCharte: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  const statYears = useCountUp(5, statsInView);
  const [testimonialSet, setTestimonialSet] = useState(0);
  const statCertifs = useCountUp(9, statsInView);
  const statRating = useCountUp(5, statsInView);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'decouvrir' | 'accompagnement' | 'ressources' | null>(null);

  // Contact form
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [message, setMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !email || !message) return;
    setContactStatus('loading');
    try {
      const res = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, tel, message }),
      });
      setContactStatus(res.ok ? 'success' : 'error');
    } catch {
      setContactStatus('error');
    }
  };

  useEffect(() => {
    if (!openDropdown) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest?.('.nav__dropdown')) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const activeDropdown = document.querySelector('.nav__dropdown.open');
        activeDropdown?.querySelector<HTMLButtonElement>('.nav__dropdown-toggle')?.focus();
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdown]);

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

  // Déclenche le compteur animé (5+ / 9 / 5/5) une seule fois, à l'entrée dans le viewport.
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setStatsInView(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fait défiler automatiquement les groupes de témoignages toutes les 7s.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setTestimonialSet((i) => (i + 1) % TESTIMONIAL_SETS.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  // Parallax léger sur les formes du hero au scroll. Manipulation directe du DOM
  // (pas de className/attribut ajouté au JSX) pour ne pas dévier du markup statique
  // pré-rendu de index.html, dont dépend le LCP du hero.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const svg = rootRef.current?.querySelector('.hero__bg svg');
    if (!svg) return;
    const layers = Array.from(svg.querySelectorAll<SVGGElement>(':scope > g'));
    const rates = [0.06, 0.12, 0.04];
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        layers.forEach((layer, i) => {
          layer.style.transform = `translateY(${y * (rates[i] ?? 0.05)}px)`;
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll vers l'ancre quand on arrive depuis une autre page (ex. /#about)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const scrollToHash = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const t = window.setTimeout(scrollToHash, 120);
    return () => window.clearTimeout(t);
  }, []);

  // Injection différée des schémas JSON-LD pour ne pas bloquer le thread principal (TBT).
  // data-schema permet au cleanup de retrouver et supprimer les balises au démontage,
  // évitant les doublons en StrictMode ou lors d'une navigation aller-retour.
  useEffect(() => {
    const schemas = [websiteSchema, localBusinessSchema, visioServiceSchema, personSchema, faqSchema, breadcrumbSchema];
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const injectSchemas = () => {
      const frag = document.createDocumentFragment();
      schemas.forEach(schema => {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-schema', 'preview-charte');
        s.text = safeJSONStringify(schema);
        frag.appendChild(s);
      });
      document.head.appendChild(frag);
    };

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(injectSchemas, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(injectSchemas, 0);
    }

    return () => {
      if (idleId !== null) window.cancelIdleCallback(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
      document.querySelectorAll('script[data-schema="preview-charte"]').forEach(el => el.remove());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Hypnothérapeute Paris 4 & en visio France | Alain Zenatti</title>
        <meta name="description" content="Alain Zenatti, hypnothérapeute à Paris 4 (Marais-Bastille) et en visio. Hypnose ericksonienne pour stress, anxiété, phobies et troubles du sommeil." />
        <meta name="keywords" content="hypnothérapeute paris, hypnothérapeute paris 4, hypnose paris, hypnose ericksonienne paris, cabinet hypnose paris, hypnothérapie paris, séance hypnose paris, hypnothérapeute bastille, hypnothérapeute marais, hypnose stress paris, hypnose anxiété paris, hypnose phobies paris, hypnose sommeil paris, auto-hypnose paris, hypnose en ligne, hypnose visio" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Hypnothérapeute Paris 4 & en visio France | Alain Zenatti" />
        <meta property="og:description" content="Alain Zenatti, hypnothérapeute à Paris 4 (Marais-Bastille) et en visio. Hypnose ericksonienne pour stress, anxiété, phobies et troubles du sommeil." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, hypnothérapeute – Cabinet NovaHypnose Paris 4ème" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnothérapeute Paris 4 & en visio France | Alain Zenatti" />
        <meta name="twitter:description" content="Alain Zenatti, hypnothérapeute à Paris 4 (Marais-Bastille) et en visio. Hypnose ericksonienne pour stress, anxiété, phobies et troubles du sommeil." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />

        <link rel="canonical" href="https://novahypnose.fr" />
        <link rel="alternate" hreflang="fr" href="https://novahypnose.fr" />
        <link rel="alternate" hreflang="x-default" href="https://novahypnose.fr" />

        {/* Polices Cormorant Garamond + DM Sans auto-hébergées via @fontsource (voir index.css) */}
        {/* JSON-LD injecté via useEffect + requestIdleCallback (hors rendu synchrone) */}
      </Helmet>

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
            <a className="brand" href="#hero">
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
              {/* Découvrir */}
              <div
                className={`nav__dropdown${openDropdown === 'decouvrir' ? ' open' : ''}`}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => isDesktopViewport() && setOpenDropdown('decouvrir')}
                onMouseLeave={() => isDesktopViewport() && setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="nav__dropdown-toggle"
                  onClick={() => setOpenDropdown((d) => (d === 'decouvrir' ? null : 'decouvrir'))}
                  aria-expanded={openDropdown === 'decouvrir'}
                  aria-haspopup="true"
                >
                  Découvrir <span className="nav__dropdown-arrow" aria-hidden="true">▾</span>
                </button>
                <div className="nav__dropdown-menu">
                  <a href="#about" onClick={() => { setNavOpen(false); setOpenDropdown(null); }}>À propos</a>
                  <span className="nav__dropdown-sep" role="separator" aria-hidden="true"></span>
                  <a href="#visio" className="nav__dropdown-link--accent" onClick={() => { setNavOpen(false); setOpenDropdown(null); }}>En visio — partout en France</a>
                  <a href="#cabinet" onClick={() => { setNavOpen(false); setOpenDropdown(null); }}>Le cabinet — Paris</a>
                </div>
              </div>

              {/* Accompagnement */}
              <div
                className={`nav__dropdown${openDropdown === 'accompagnement' ? ' open' : ''}`}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => isDesktopViewport() && setOpenDropdown('accompagnement')}
                onMouseLeave={() => isDesktopViewport() && setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="nav__dropdown-toggle"
                  onClick={() => setOpenDropdown((d) => (d === 'accompagnement' ? null : 'accompagnement'))}
                  aria-expanded={openDropdown === 'accompagnement'}
                  aria-haspopup="true"
                >
                  Accompagnement <span className="nav__dropdown-arrow" aria-hidden="true">▾</span>
                </button>
                <div className="nav__dropdown-menu">
                  <a href="#sessions" onClick={() => { setNavOpen(false); setOpenDropdown(null); }}>Séance</a>
                  <span className="nav__dropdown-sep" role="separator" aria-hidden="true"></span>
                  {ACCOMPAGNEMENT_THEMES_LINKS.map((link) => (
                    <Link key={link.href} to={link.href} onClick={() => { setNavOpen(false); setOpenDropdown(null); }}>
                      {link.label}
                    </Link>
                  ))}
                  <span className="nav__dropdown-sep" role="separator" aria-hidden="true"></span>
                  <Link to="/test-receptivite" onClick={() => { setNavOpen(false); setOpenDropdown(null); }}>Test de réceptivité</Link>
                </div>
              </div>

              {/* Ressources */}
              <div
                className={`nav__dropdown${openDropdown === 'ressources' ? ' open' : ''}`}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => isDesktopViewport() && setOpenDropdown('ressources')}
                onMouseLeave={() => isDesktopViewport() && setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="nav__dropdown-toggle"
                  onClick={() => setOpenDropdown((d) => (d === 'ressources' ? null : 'ressources'))}
                  aria-expanded={openDropdown === 'ressources'}
                  aria-haspopup="true"
                >
                  Ressources <span className="nav__dropdown-arrow" aria-hidden="true">▾</span>
                </button>
                <div className="nav__dropdown-menu">
                  <a href="/blog" target="_blank" rel="noopener noreferrer" onClick={() => { setNavOpen(false); setOpenDropdown(null); }}>Blog ↗</a>
                  <a href="/autohypnose" target="_blank" rel="noopener noreferrer" onClick={() => { setNavOpen(false); setOpenDropdown(null); }}>Auto-hypnose ↗</a>
                  <a href="https://hypno-balade.novahypnose.fr/" target="_blank" rel="noopener noreferrer" onClick={() => { setNavOpen(false); setOpenDropdown(null); }}>Hypno-balade ↗</a>
                  <a href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share" target="_blank" rel="noopener noreferrer nofollow" onClick={() => { setNavOpen(false); setOpenDropdown(null); }}>NovaRespire ↗</a>
                </div>
              </div>

              <a href="#temoignages">Avis</a>
              <a href="#contact">Contact</a>

              <div className="nav__cta" onClick={(e) => e.stopPropagation()}>
                <a className="btn btn--ghost" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">RDV Paris</a>
                <a className="btn btn--visio" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  RDV visio <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hero" id="hero">
          <div className="hero__bg" aria-hidden="true">
            <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full)">
                <path d="M 180 80 C 380 30, 660 80, 820 180 C 920 240, 990 260, 1100 220 C 1240 170, 1380 200, 1440 290 C 1500 380, 1420 470, 1280 500 C 1140 530, 980 490, 880 440 C 740 380, 620 410, 540 480 C 450 560, 320 580, 220 540 C 100 490, 60 380, 80 280 C 95 200, 130 130, 180 80 Z" fill="#F2A12E" opacity="0.95" />
              </g>
              <g filter="url(#riso-full)">
                <path d="M 280 480 C 400 460, 500 510, 510 600 C 520 690, 460 750, 360 750 C 260 750, 180 690, 180 600 C 180 530, 220 490, 280 480 Z" fill="#F2A12E" opacity="0.95" />
              </g>
              <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 360 540 C 480 430, 660 420, 800 480 C 940 540, 1080 540, 1240 500 C 1340 475, 1420 490, 1480 540 L 1480 1040 L 360 1040 C 280 1000, 260 900, 280 800 C 300 700, 320 620, 360 540 Z" fill="#2B4BA0" opacity="0.92" />
              </g>
              <rect width="1440" height="1000" filter="url(#paperGrain)" opacity=".25" />
            </svg>
          </div>

          <div className="zen-mark" aria-hidden="true">zen</div>

          {/* Pas d'animation reveal sur le hero : il est au-dessus de la ligne de
              flottaison et son fondu (opacity 0 → 1 en 0,9 s) retardait le LCP.
              Le markup doit rester identique au pré-rendu statique de index.html. */}
          <div className="container hero__container">
            <div className="hero__panel">
              <div className="tag">Hypnose Ericksonienne — Paris · Le Marais</div>
              <h1 className="hero__name">
                <span className="alain">Alain</span>
                <span className="full"><span className="zen">Zen</span><span className="atti">atti</span></span>
              </h1>
              <div className="hero__rule"></div>
              <p className="hero__lead">
                Un espace pour ralentir.<br />
                Un accompagnement pour avancer <em>plus léger</em>.
              </p>
              <div className="hero__sub">
                Hypnothérapeute en hypnose ericksonienne et auto-hypnose · Adultes
              </div>
              <div className="hero__cta">
                <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Prendre rendez-vous <span className="arrow">→</span>
                </a>
                <a className="btn btn--ghost" href="#about">Découvrir l'approche</a>
              </div>
            </div>

            <aside className="hero__card">
              <div className="hero__card-label">La première séance</div>
              <p className="hero__card-quote">« Un temps complet, pour entrer dans un véritable travail — sans précipitation. »</p>
              <div className="hero__card-row"><span>Durée</span><span>1h30</span></div>
              <div className="hero__card-row"><span>Tarif</span><span>90 €</span></div>
              <div className="hero__card-row"><span>Au cabinet</span><span>16 rue Saint-Antoine, Paris 4e</span></div>
              <div className="hero__card-row"><span>Ou en visio</span><span>Partout, depuis chez vous</span></div>
            </aside>
          </div>
        </section>

        {/* ── SLOGAN ── */}
        <section className="slogan reveal" id="slogan">
          <div className="container">
            <p className="slogan__text">
              {"L'hypnose : un chemin de transformation, en douceur.".split(' ').map((word, i, arr) => (
                <React.Fragment key={i}>
                  <span
                    className={`slogan__word${word.startsWith('transformation') ? ' slogan__word--accent' : ''}`}
                    style={{ transitionDelay: `${0.15 + i * 0.08}s` }}
                  >
                    {word}
                  </span>
                  {i < arr.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
            </p>
            <svg className="slogan__flourish" viewBox="0 0 300 40" aria-hidden="true">
              <path d="M5 25 C 40 5, 70 35, 110 15 C 140 0, 170 30, 200 12 C 220 0, 245 20, 260 10 C 270 5, 280 12, 275 18" />
            </svg>
          </div>
        </section>

        {/* ── À PROPOS ── */}
        <section className="about" id="about">
          <div className="about__bg" aria-hidden="true"></div>
          <div className="container about__grid">
            <div className="about__photo reveal">
              <img
                src="/zenatti.webp"
                alt="Portrait d'Alain Zenatti, hypnothérapeute à Paris — cabinet NovaHypnose"
                width="380"
                height="380"
                loading="lazy"
              />
            </div>
            <div className="about__copy reveal d-15">
              <div className="section-tag">À propos</div>
              <h2 className="section-title">
                Alain Zenatti, hypnothérapeute —<br /><em>vous accueillir simplement.</em>
              </h2>
              <p>
                Je suis Alain Zenatti, Hypnothérapeute en hypnose ericksonienne et auto-hypnose. Je reçois les
                adultes dans un cadre confidentiel et bienveillant, au cœur de Paris.
              </p>
              <p>
                Mon approche est douce et permissive : vous n'êtes pas dirigé, vous êtes accompagné,
                à votre rythme. Vous gardez le contrôle du premier instant au dernier — l'hypnose
                ne fait qu'ouvrir l'accès à vos propres ressources.
              </p>
              <p>
                C'est une thérapie brève : la plupart des accompagnements trouvent leur aboutissement
                en <strong>3 à 5 séances</strong>. Des changements concrets et durables, sans
                exploration sans fin.
              </p>

              <div className="about__approche">
                <div className="about__approche-label">Mon approche</div>
                <h3 className="about__approche-title">L'hypnose ericksonienne, <em>concrètement.</em></h3>
                <p>
                  Je pratique l'hypnose ericksonienne, dans la lignée du psychiatre américain Milton H. Erickson.
                  Loin de l'hypnose de scène et des injonctions, c'est une approche <strong>respectueuse,
                  indirecte et permissive</strong> — qui parle à votre inconscient par métaphores et suggestions
                  ouvertes, plutôt qu'en imposant un récit.
                </p>
                <p>
                  Concrètement : pas de transe spectaculaire, pas de perte de contrôle. Vous restez présent,
                  vous entendez tout, vous pouvez ouvrir les yeux quand vous voulez. Ce qui change, c'est
                  votre rapport à ce qui vous encombre — parce que vos propres ressources, déjà là, retrouvent
                  un chemin d'expression.
                </p>
                <img
                  src="/images/comment-ca-marche-diagramme.png"
                  alt="Schéma : sous hypnose, le conscient se détend et l'inconscient peut travailler sur ce qui empêche d'être bien"
                  className="about__diagram"
                  loading="lazy"
                  width="1024"
                  height="1024"
                />
              </div>

              <div className="about__stat" ref={statsRef}>
                <div><div className="about__stat-n">{statYears}+</div><div className="about__stat-l">années d'expérience</div></div>
                <div><div className="about__stat-n">{statCertifs}</div><div className="about__stat-l">certifications</div></div>
                <div><div className="about__stat-n">{statRating}/5</div><div className="about__stat-l">sur Resalib &amp; Google</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LE CABINET — sas / cocon urbain ── */}
        <section className="cabinet" id="cabinet">
          <div className="container cabinet__grid">
            <div className="cabinet__copy reveal">
              <div className="section-tag">Le cabinet</div>
              <h2 className="section-title">Cabinet d'hypnothérapie Paris 4 —<br /><em>un sas au cœur du Marais.</em></h2>
              <p>
                16 rue Saint-Antoine. Vous poussez la porte, et l'agitation de Paris reste dehors.
              </p>
              <p>
                Un lieu feutré, pensé comme un cocon : lumière douce, silence, confort. Le temps
                d'une séance, vous n'avez nulle part où aller, rien à prouver. Juste un espace à vous.
              </p>
              <ul className="cabinet__list">
                <li><strong>Feutré &amp; confidentiel</strong> — une vraie parenthèse, loin du bruit.</li>
                <li><strong>À deux pas de Bastille</strong> — Paris 4e, métro Bastille &amp; Saint-Paul.</li>
                <li><strong>Un rythme qui ralentit</strong> — séances complètes, jamais expédiées.</li>
              </ul>
            </div>
            <div className="cabinet__visual reveal d-2">
              <img
                src="/images/cabinet-silhouette-fauteuil.png"
                alt="Illustration d'une personne détendue, installée dans un fauteuil, pendant une séance d'hypnothérapie"
                loading="lazy"
                width="896"
                height="1152"
              />
              <div className="cabinet__addr" aria-hidden="true">16 rue Saint-Antoine · 75004 Paris</div>
            </div>
          </div>
        </section>

        {/* ── EN VISIO — pendant exact du cabinet ── */}
        <section className="visio" id="visio">
          <div className="container cabinet__grid cabinet__grid--reverse">
            <div className="cabinet__visual reveal d-2" aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g className="blob-morph-1" filter="url(#riso-full)">
                  <path d="M 90 130 C 220 80, 380 100, 440 220 C 480 310, 460 400, 430 470 C 410 520, 340 540, 240 530 C 140 520, 80 470, 70 380 C 60 290, 70 200, 90 130 Z" fill="#2B4BA0" opacity="0.92" />
                </g>
                <g className="blob-morph-2" filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                  <path d="M 160 200 C 280 160, 380 200, 400 300 C 415 380, 360 450, 260 450 C 160 450, 110 380, 120 290 C 126 240, 140 214, 160 200 Z" fill="#F2A12E" opacity="0.9" />
                </g>
                <rect x="170" y="240" width="180" height="120" rx="10" fill="#F0ECE3" opacity="0.95" />
                <circle cx="260" cy="285" r="14" fill="#2B4BA0" opacity="0.85" />
                <rect x="220" y="310" width="80" height="6" rx="3" fill="#2B4BA0" opacity="0.6" />
                <rect x="200" y="324" width="120" height="6" rx="3" fill="#2B4BA0" opacity="0.4" />
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
              <div className="cabinet__addr">En visio · depuis chez vous</div>
            </div>
            <div className="cabinet__copy reveal">
              <div className="section-tag">En visio</div>
              <h2 className="section-title">Hypnose en visio —<br /><em>le même accompagnement, depuis chez vous.</em></h2>
              <p>
                Une séance en visio, c'est <strong>exactement</strong> une séance — la même profondeur,
                la même qualité de travail, le même temps pris. Simplement, le cabinet vient à vous.
              </p>
              <p>
                Beaucoup le découvrent avec surprise : depuis son canapé, dans son propre cocon, on entre
                souvent encore plus vite dans la détente. Et l'hypnose ericksonienne — qui passe par
                la voix, l'écoute, la métaphore — s'y prête remarquablement.
              </p>
              <ul className="cabinet__list">
                <li><strong>Depuis chez vous, sans frontière</strong> — en France comme à l'étranger ; je reçois des client·es jusqu'au Portugal.</li>
                <li><strong>Un endroit à vous</strong> — calme, casque audio, connexion stable. Rien d'autre.</li>
                <li><strong>Même tarif qu'au cabinet</strong> — 90 €, 1h30 la première séance.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── DOMAINES D'ACCOMPAGNEMENT (états recherchés) ── */}
        <section className="seances" id="domaines">
          <div className="container">
            <div className="seances__head reveal">
              <div>
                <div className="section-tag">Accompagnement</div>
                <h2 className="section-title">Hypnothérapie ericksonienne —<br /><em>là où l'hypnose vous porte.</em></h2>
              </div>
              <p>
                Non pas une liste de problèmes, mais les états vers lesquels nous cheminons ensemble,
                à votre mesure.
              </p>
            </div>

            <div className="cards">
              {domaines.map((d, i) => {
                const inner = (
                  <>
                    <span className="card__num">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="card__title">{d.t}</h3>
                    <p className="card__desc">{d.d}</p>
                    {d.href && <span className="card__cta">Découvrir →</span>}
                  </>
                );
                return d.href ? (
                  <Link key={d.t} to={d.href} className="card card--link reveal" style={{ transitionDelay: `${(i % 3) * 0.12}s` }}>
                    {inner}
                  </Link>
                ) : (
                  <article className="card reveal" key={d.t} style={{ transitionDelay: `${(i % 3) * 0.12}s` }}>
                    {inner}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DÉROULÉ D'UNE SÉANCE ── */}
        <section className="seances-sect" id="sessions">
          <div className="container">
            <div className="reveal section-head--sessions">
              <div className="section-tag section-tag--center">Transparence</div>
              <h2 className="section-title">Déroulé <em>d'une séance.</em></h2>
              <p className="sessions-lead">
                Vous méritez de savoir exactement ce qui va se passer. Chaque séance suit un protocole
                clair, expliqué pas à pas — aucune surprise.
              </p>

              <div className="sessions-flow" role="list">
                {[
                  { label: 'Accueil & échange', icon: 'bubbles' },
                  { label: 'Induction', icon: 'ripples' },
                  { label: 'Travail thérapeutique', icon: 'depth' },
                  { label: 'Retour & ancrage', icon: 'sunrise' },
                ].map((step, i, arr) => (
                  <React.Fragment key={step.label}>
                    <div className="sessions-flow__step" role="listitem">
                      <svg className="sessions-flow__icon" viewBox="0 0 100 100" aria-hidden="true">
                        {step.icon === 'bubbles' && (
                          <g filter="url(#riso-full)">
                            <circle cx="38" cy="46" r="26" fill="#2B4BA0" opacity="0.9" />
                            <circle cx="62" cy="54" r="22" fill="#F2A12E" opacity="0.9" style={{ mixBlendMode: 'multiply' as const }} />
                          </g>
                        )}
                        {step.icon === 'ripples' && (
                          <g filter="url(#riso-full)">
                            <circle cx="50" cy="50" r="38" fill="none" stroke="#2B4BA0" strokeWidth="6" opacity="0.85" />
                            <circle cx="50" cy="50" r="24" fill="none" stroke="#F2A12E" strokeWidth="6" opacity="0.9" />
                            <circle cx="50" cy="50" r="10" fill="#2B4BA0" opacity="0.85" />
                          </g>
                        )}
                        {step.icon === 'depth' && (
                          <g filter="url(#riso-full)">
                            <path d="M 50 12 C 74 12, 90 30, 88 52 C 86 74, 68 88, 46 86 C 24 84, 12 66, 15 46 C 18 26, 30 12, 50 12 Z" fill="#2B4BA0" opacity="0.9" />
                            <ellipse cx="50" cy="50" rx="18" ry="14" fill="#F2A12E" opacity="0.9" style={{ mixBlendMode: 'multiply' as const }} />
                          </g>
                        )}
                        {step.icon === 'sunrise' && (
                          <g filter="url(#riso-full)">
                            {Array.from({ length: 7 }).map((_, r) => {
                              const angle = (Math.PI / 8) * (r + 1);
                              const x1 = 50 + 34 * Math.cos(Math.PI - angle);
                              const y1 = 62 - 34 * Math.sin(angle);
                              const x2 = 50 + 44 * Math.cos(Math.PI - angle);
                              const y2 = 62 - 44 * Math.sin(angle);
                              return <line key={r} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F2A12E" strokeWidth="5" strokeLinecap="round" opacity="0.9" />;
                            })}
                            <path d="M 18 62 A 32 32 0 0 1 82 62 Z" fill="#2B4BA0" opacity="0.9" />
                          </g>
                        )}
                      </svg>
                      <span className="sessions-flow__label">{step.label}</span>
                    </div>
                    {i < arr.length - 1 && <span className="sessions-flow__arrow" aria-hidden="true">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="seances__steps reveal d-1">
              {[
                {
                  num: '01',
                  title: 'Échange et cadrage',
                  desc: "Le processus vous est expliqué, vos questions trouvent leurs réponses et vous définissez ensemble l'objectif de la séance. C'est le moment de lever toutes vos interrogations.",
                },
                {
                  num: '02',
                  title: 'Induction guidée',
                  desc: "Vous êtes guidé pas à pas vers un état de relaxation profonde. Vous gardez le contrôle et la conscience. Ensemble, vos ressources intérieures sont mobilisées grâce à des techniques adaptées.",
                },
                {
                  num: '03',
                  title: 'Retour et débriefing',
                  desc: "Retour en douceur à l'état de veille. J'échange avec vous sur vos ressentis, je réponds à vos questions et j'ancre les bénéfices. Vous repartez avec une compréhension claire de ce qui s'est passé.",
                },
              ].map((step) => (
                <div key={step.num} className="seance-step">
                  <div className="seance-step__num">{step.num}</div>
                  <div className="seance-step__body">
                    <div className="seance-step__head">
                      <strong className="seance-step__title">{step.title}</strong>
                    </div>
                    <p className="seance-step__desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal seance-promesse d-2">
              <em>Ma promesse :</em> vous ne vivrez jamais quelque chose que vous ne comprenez pas.
              Le temps est pris pour vous expliquer, vous rassurer et s'adapter à votre rythme.
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGES ── */}
        <section className="temoignages" id="temoignages">
          <div className="container">
            <div className="reveal u-center">
              <div className="section-tag section-tag--center">Ils en parlent</div>
              <h2 className="section-title">Des mots, <em>après.</em></h2>
            </div>

            <div className="temoignages__list">
              {TESTIMONIAL_SETS[testimonialSet].map((idx, i) => {
                const t = testimonials[idx];
                return (
                  <React.Fragment key={t.name}>
                    <div className="temoignage temoignage--rotating" style={{ animationDelay: `${i * 0.12}s` }}>
                      <p className="temoignage__quote">« {t.text} »</p>
                      <div className="temoignage__author">
                        <span className="temoignage__stars" aria-label="5 sur 5">
                          {[0, 1, 2, 3, 4].map((s) => (
                            <span key={s} className="temoignage__star">★</span>
                          ))}
                        </span>
                        <strong>{anonymizeName(t.name)}</strong> · Google
                      </div>
                    </div>
                    {i < 2 && <div className="wave" aria-hidden="true"></div>}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="temoignages__dots" role="tablist" aria-label="Choisir un groupe de témoignages">
              {TESTIMONIAL_SETS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`temoignages__dot${i === testimonialSet ? ' active' : ''}`}
                  onClick={() => setTestimonialSet(i)}
                  role="tab"
                  aria-selected={i === testimonialSet}
                  aria-label={`Groupe de témoignages ${i + 1}`}
                />
              ))}
            </div>

            <p className="tarifs-note reveal">
              <Link to="/avis" className="link-underline">Lire tous les avis et témoignages →</Link>
            </p>
          </div>
        </section>

        {/* ── TARIFS ── */}
        <section className="tarifs-sect" id="tarifs">
          <div className="container">
            <div className="reveal section-head">
              <div className="section-tag section-tag--center">Séances</div>
              <h2 className="section-title">Un cadre clair, <em>posé d'emblée.</em></h2>
              <p className="tarifs-sect__intro">
                Des séances complètes, réservées aux adultes. Au cabinet, en visio, ou à domicile.
              </p>
            </div>

            <div className="tarifs-grid">
              <article className="tarif-card tarif-card--featured reveal">
                <h3>Au cabinet</h3>
                <div className="tarif-price">90<sup>€</sup></div>
                <p className="tarif-desc">Au cœur du Marais</p>
                <ul>
                  <li>1h30 — première séance</li>
                  <li>1h — séances suivantes</li>
                  <li>Métro Bastille &amp; Saint-Paul</li>
                </ul>
                <a className="btn btn--amber" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Réserver <span className="arrow">→</span>
                </a>
              </article>

              <article className="tarif-card reveal d-15">
                <h3>En visio</h3>
                <div className="tarif-price">90<sup>€</sup></div>
                <p className="tarif-desc">Depuis chez vous</p>
                <ul>
                  <li>1h30 — première séance</li>
                  <li>1h — séances suivantes</li>
                  <li>Partout, France ou étranger</li>
                </ul>
                <a className="btn btn--ghost" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Réserver <span className="arrow">→</span>
                </a>
              </article>

              <article className="tarif-card reveal d-3">
                <h3>À domicile</h3>
                <div className="tarif-price">140<sup>€</sup></div>
                <p className="tarif-desc">Paris Centre</p>
                <ul>
                  <li>1h30 — première séance</li>
                  <li>1h — séances suivantes</li>
                  <li>Arrondissements 1–4, 9–11</li>
                </ul>
                <a className="btn btn--ghost" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Réserver <span className="arrow">→</span>
                </a>
              </article>
            </div>

            <p className="tarifs-note reveal">
              Règlement par carte bancaire, Wero ou en ligne via Stripe. Certaines mutuelles
              participent au remboursement. Annulation sans frais jusqu'à 48 h avant le rendez-vous.{' '}
              <Link to="/tarifs" className="link-underline">Tout savoir sur les tarifs →</Link>
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-sect" id="faq">
          <div className="container">
            <div className="reveal section-head--faq">
              <div className="section-tag section-tag--center">Bon à savoir</div>
              <h2 className="section-title">Vos questions sur l'hypnose ericksonienne —<br /><em>quelques repères.</em></h2>
            </div>

            <div className="faq-list">
              {faq.map((item, i) => (
                <div className="faq-item reveal" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <button
                    className={`faq-q${openFaq === i ? ' open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {item.q}
                    <span className="faq-chevron">+</span>
                  </button>
                  {openFaq === i && <div className="faq-a">{item.a}</div>}
                </div>
              ))}
            </div>

            <p className="tarifs-note reveal">
              <Link to="/faq" className="link-underline">Voir toutes les questions fréquentes →</Link>
            </p>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="contact" id="contact">
          <div className="contact__blob" aria-hidden="true"></div>
          <div className="container contact__grid">
            <div className="reveal">
              <div className="section-tag">Contact</div>
              <h2 className="section-title">Faire le <em>premier pas.</em></h2>
              <p className="contact__lead">
                Un message ou un appel suffit. Nous échangeons quelques minutes, et nous fixons une
                première séance si vous le souhaitez.
              </p>
              <dl className="contact__dl">
                <div className="contact__row"><dt>Tél.</dt><dd>06 49 35 80 89</dd></div>
                <div className="contact__row"><dt>Site</dt><dd>novahypnose.fr</dd></div>
                <div className="contact__row"><dt>Adresse</dt><dd>16 rue Saint-Antoine, 75004 Paris</dd></div>
                <div className="contact__row"><dt>Horaires</dt><dd>Lun. — Ven. · 11h — 20h30</dd></div>
              </dl>
            </div>

            <form
              className="contact__form reveal d-2"
              onSubmit={handleContact}
            >
              <div className="field">
                <label htmlFor="cz-nom">Votre nom <span aria-hidden="true" className="req">*</span></label>
                <input
                  id="cz-nom" type="text" placeholder="Marie Dupont" required
                  value={nom} onChange={(e) => setNom(e.target.value)}
                  disabled={contactStatus === 'loading' || contactStatus === 'success'}
                />
              </div>
              <div className="field">
                <label htmlFor="cz-email">Email <span aria-hidden="true" className="req">*</span></label>
                <input
                  id="cz-email" type="email" placeholder="marie@exemple.fr" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  disabled={contactStatus === 'loading' || contactStatus === 'success'}
                />
              </div>
              <div className="field">
                <label htmlFor="cz-tel">Téléphone</label>
                <input
                  id="cz-tel" type="tel" placeholder="06 12 34 56 78"
                  value={tel} onChange={(e) => setTel(e.target.value)}
                  disabled={contactStatus === 'loading' || contactStatus === 'success'}
                />
              </div>
              <div className="field">
                <label htmlFor="cz-msg">Message <span aria-hidden="true" className="req">*</span></label>
                <textarea
                  id="cz-msg" placeholder="Quelques mots sur ce qui vous amène…" rows={3}
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  disabled={contactStatus === 'loading' || contactStatus === 'success'}
                ></textarea>
              </div>
              <button className="btn btn--amber" type="submit" disabled={contactStatus === 'loading' || contactStatus === 'success'}>
                {contactStatus === 'loading' ? 'Envoi…' : 'Envoyer'} <span className="arrow">→</span>
              </button>
              {contactStatus === 'success' && (
                <p className="contact__success">Merci — je vous recontacte sous 24 h.</p>
              )}
              {contactStatus === 'error' && (
                <p className="contact__error">
                  Une erreur s'est produite. Écrivez-moi directement à contact@novahypnose.fr ou appelez le 06 49 35 80 89.
                </p>
              )}
            </form>
          </div>
        </section>

        <footer className="foot">
          <div className="container">
            <nav className="foot__links" aria-label="Pieds de page">
              <Link to="/tarifs">Tarifs</Link>
              <span className="foot__sep">·</span>
              <Link to="/avis">Avis</Link>
              <span className="foot__sep">·</span>
              <Link to="/contact">Contact</Link>
              <span className="foot__sep">·</span>
              <Link to="/faq">FAQ</Link>
              <span className="foot__sep">·</span>
              <a href="/mentions-legales">Mentions légales</a>
              <span className="foot__sep">·</span>
              <a href="/politique-de-confidentialite">Confidentialité</a>
              <span className="foot__sep">·</span>
              <a href="tel:+33649358089">06 49 35 80 89</a>
              <span className="foot__sep">·</span>
              <address className="foot__addr">16 rue Saint-Antoine, 75004 Paris</address>
              <span className="foot__sep">·</span>
              <a href="https://hypno-balade.novahypnose.fr/" target="_blank" rel="noopener noreferrer">Hypno-Balade</a>
              <span className="foot__sep">·</span>
              <a href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share" target="_blank" rel="noopener noreferrer nofollow">NovaRespire</a>
            </nav>
            <div className="foot__copy">
              © NovaHypnose · Alain Zenatti <em>— pour aller à votre rythme</em> · MMXXVI
            </div>
          </div>
        </footer>

        <a
          className="floating-cta"
          href={RESALIB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Prendre rendez-vous"
        >
          Prendre rendez-vous <span className="arrow">→</span>
        </a>
      </div>
    </>
  );
};

export default PreviewCharte;
