/**
 * PreviewCharteBlog — index blog dans la charte risographie.
 * Lit les mêmes articles que /blog (Supabase), juste relayé dans le style charté.
 * Page autoportante, noindex.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllArticlesNoPagination, getAllCategories } from '@/lib/services/blog/articleService';
import type { Article, Category } from '@/lib/types/blog';
import '@/styles/preview-charte.css';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const formatDate = (iso?: string): string => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
};

const PreviewCharteBlog: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [navOpen, setNavOpen] = useState<boolean>(false);

  const { data: articlesData } = useQuery({
    queryKey: ['preview-charte-blog-articles'],
    queryFn: async () => {
      const result = await getAllArticlesNoPagination();
      return result.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['preview-charte-blog-categories'],
    queryFn: async () => {
      const result = await getAllCategories();
      return result.data ?? [];
    },
    staleTime: 10 * 60 * 1000,
  });

  const articles: Article[] = articlesData ?? [];
  const categories: Category[] = categoriesData ?? [];

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return articles;
    return articles.filter((a) => Array.isArray(a.categories) && a.categories.includes(activeCategory));
  }, [articles, activeCategory]);

  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filteredArticles.length]);

  return (
    <>
      <Helmet>
        <title>Blog — aperçu charte | NovaHypnose</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
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

        {/* ── NAV ── */}
        <nav className="nav">
          <div className="container nav__row">
            <Link className="brand" to="/preview-charte">
              <span className="alain">Alain</span><span className="zen">Zen</span><span className="atti">atti</span>
            </Link>
            <button
              className={`nav__burger${navOpen ? ' open' : ''}`}
              aria-label={navOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={navOpen}
              onClick={() => setNavOpen((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
            <div className={`nav__links${navOpen ? ' open' : ''}`} onClick={() => setNavOpen(false)}>
              <Link to="/preview-charte">← Retour</Link>
              <a href="#articles">Articles</a>
              <Link to="/preview-charte-autohypnose">Auto-hypnose ↗</Link>
            </div>
            <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
          </div>
        </nav>

        {/* ── HERO BLOG ── */}
        <section className="blog-hero">
          <div className="blog-hero__bg" aria-hidden="true">
            <svg viewBox="0 0 1440 480" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full)">
                <path d="M 100 280 C 280 220, 520 240, 760 280 C 1000 320, 1240 280, 1400 240 L 1440 480 L 0 480 Z" fill="#F2A12E" opacity="0.85" />
              </g>
              <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 0 360 C 240 320, 480 340, 720 360 C 960 380, 1200 360, 1440 340 L 1440 480 L 0 480 Z" fill="#2B4BA0" opacity="0.85" />
              </g>
              <rect width="1440" height="480" filter="url(#paperGrain)" opacity=".22" />
            </svg>
          </div>
          <div className="container blog-hero__inner reveal">
            <div className="section-tag">Blog</div>
            <h1 className="blog-hero__title">
              Des mots, <em>pour avancer.</em>
            </h1>
            <p className="blog-hero__lead">
              Quelques lectures pour comprendre, prendre du recul, ou simplement faire un pas.
              L'hypnose ericksonienne, l'auto-hypnose et la vie qui va avec.
            </p>
          </div>
        </section>

        {/* ── FILTRES CATÉGORIES ── */}
        {categories.length > 0 && (
          <section className="blog-filters">
            <div className="container">
              <div className="blog-filters__row reveal">
                <button
                  className={`blog-chip${activeCategory === 'all' ? ' active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  Tout
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    className={`blog-chip${activeCategory === c.slug ? ' active' : ''}`}
                    onClick={() => setActiveCategory(c.slug)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── ARTICLE EN VEDETTE ── */}
        {featured && (
          <section className="blog-featured" id="articles">
            <div className="container">
              <Link to={`/preview-charte-blog/article/${featured.slug}`} className="blog-featured__link reveal">
                <article className="blog-featured__card">
                  <div className="blog-featured__image">
                    {(featured.storage_image_url || featured.image_url) ? (
                      <img
                        src={featured.storage_image_url || featured.image_url}
                        alt={featured.title}
                        loading="eager"
                      />
                    ) : (
                      <div className="blog-featured__placeholder" aria-hidden="true" />
                    )}
                  </div>
                  <div className="blog-featured__body">
                    <div className="section-tag">À la une</div>
                    <h2 className="blog-featured__title">{featured.title}</h2>
                    <p className="blog-featured__excerpt">{featured.excerpt}</p>
                    <div className="blog-meta">
                      <span>{formatDate(featured.published_at || featured.created_at)}</span>
                      {featured.read_time ? <span>· {featured.read_time} min de lecture</span> : null}
                    </div>
                    <span className="blog-featured__read">Lire l'article <span className="arrow">→</span></span>
                  </div>
                </article>
              </Link>
            </div>
          </section>
        )}

        {/* ── GRILLE D'ARTICLES ── */}
        <section className="blog-grid-sect">
          <div className="container">
            {rest.length === 0 && articles.length === 0 && (
              <p className="blog-empty reveal">Les articles se chargent…</p>
            )}
            {rest.length === 0 && articles.length > 0 && (
              <p className="blog-empty reveal">Pas d'autre article dans cette rubrique pour le moment.</p>
            )}
            <div className="blog-grid">
              {rest.map((a, i) => (
                <Link
                  to={`/preview-charte-blog/article/${a.slug}`}
                  key={a.id}
                  className="blog-card reveal"
                  style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
                >
                  <div className="blog-card__image">
                    {(a.storage_image_url || a.image_url) ? (
                      <img src={a.storage_image_url || a.image_url} alt={a.title} loading="lazy" />
                    ) : (
                      <div className="blog-card__placeholder" aria-hidden="true" />
                    )}
                  </div>
                  <div className="blog-card__body">
                    <h3 className="blog-card__title">{a.title}</h3>
                    <p className="blog-card__excerpt">{a.excerpt}</p>
                    <div className="blog-meta">
                      <span>{formatDate(a.published_at || a.created_at)}</span>
                      {a.read_time ? <span>· {a.read_time} min</span> : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <footer className="foot">
          <div className="container">
            <nav className="foot__links" aria-label="Pieds de page">
              <a href="/mentions-legales">Mentions légales</a>
              <span className="foot__sep">·</span>
              <a href="/mentions-legales#confidentialite">Politique de confidentialité</a>
              <span className="foot__sep">·</span>
              <a href="/mentions-legales#cgv">CGV</a>
              <span className="foot__sep">·</span>
              <a href="tel:+33649358089">06 49 35 80 89</a>
            </nav>
            <div className="foot__copy">
              © NovaHypnose · Alain Zenatti <em>— le blog, en aperçu</em> · MMXXVI
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

export default PreviewCharteBlog;
