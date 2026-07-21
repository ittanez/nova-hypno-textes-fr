/**
 * PreviewCharteBlogArticle — page article dans la charte risographie.
 * Lit l'article sur Supabase via getArticleBySlug.
 */

import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticleBySlug, getRelatedArticles } from '@/lib/services/blog/articleService';
import type { Article } from '@/lib/types/blog';
import { safeJSONStringify } from '@/lib/seo-utils';
import { findSpecialtyMatch } from '@/data/specialtyLinks';
import '@/styles/preview-charte.css';
import '@/styles/charte-secondary.css';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';
const HYPNO_BALADE_URL = 'https://hypno-balade.novahypnose.fr/';
const NOVARESPIRE_URL = 'https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share';

const formatDate = (iso?: string): string => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
};

const PreviewCharteBlogArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const rootRef = useRef<HTMLDivElement>(null);
  const [navOpen, setNavOpen] = React.useState<boolean>(false);

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['preview-charte-blog-article', slug],
    queryFn: async () => {
      const result = await getArticleBySlug(slug!);
      return result.data ?? null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  const { data: related } = useQuery({
    queryKey: ['preview-charte-blog-related-articles', article?.id],
    queryFn: async () => {
      const result = await getRelatedArticles(article!.id, 3);
      return result.data ?? [];
    },
    enabled: !!article?.id,
    staleTime: 5 * 60 * 1000,
  });

  const relatedArticles: Article[] = related ?? [];

  const specialtyMatch = article ? findSpecialtyMatch(article) : null;

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
  }, [article?.id]);

  return (
    <>
      <Helmet>
        <title>{article ? `${article.title} | NovaHypnose` : 'Article | NovaHypnose'}</title>
        {article && <meta name="description" content={article.seo_description || article.excerpt || `Article sur l'hypnose ericksonienne par Alain Zenatti — NovaHypnose`} />}
        <meta name="robots" content="index, follow" />
        {article && <link rel="canonical" href={`https://novahypnose.fr/blog/article/${article.slug}`} />}
        {article && <meta property="og:title" content={article.title} />}
        {article && <meta property="og:description" content={article.seo_description || article.excerpt || `Article sur l'hypnose ericksonienne par Alain Zenatti — NovaHypnose`} />}
        <meta property="og:type" content="article" />
        {article && <meta property="og:url" content={`https://novahypnose.fr/blog/article/${article.slug}`} />}
        {article?.storage_image_url && <meta property="og:image" content={article.storage_image_url} />}
        {!article?.storage_image_url && article?.image_url && <meta property="og:image" content={article.image_url} />}
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta name="twitter:card" content="summary_large_image" />
        {article?.storage_image_url && <meta name="twitter:image" content={article.storage_image_url} />}
        {!article?.storage_image_url && article?.image_url && <meta name="twitter:image" content={article.image_url} />}
        {article && (
          <script type="application/ld+json">{safeJSONStringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.seo_description || article.excerpt || "",
            "image": article.image_url || "",
            "datePublished": article.published_at || article.created_at,
            "dateModified": article.updated_at || article.published_at || article.created_at,
            "author": { "@type": "Person", "name": "Alain Zenatti", "@id": "https://novahypnose.fr/#person" },
            "publisher": { "@type": "Organization", "name": "NovaHypnose", "@id": "https://novahypnose.fr/#localbusiness" },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://novahypnose.fr/blog/article/${article.slug}` },
            "keywords": Array.isArray(article.keywords) ? article.keywords.join(", ") : "",
            "url": `https://novahypnose.fr/blog/article/${article.slug}`,
          })}</script>
        )}
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

        {/* ── NAV ── */}
        <nav className="nav">
          <div className="container nav__row">
            <Link className="brand" to="/">
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
              <Link to="/blog">← Blog</Link>
              <Link to="/">Accueil</Link>
            </div>
            <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
          </div>
        </nav>

        {isLoading && (
          <section className="article-loading">
            <div className="container">
              <p className="blog-empty">Chargement de l'article…</p>
            </div>
          </section>
        )}

        {isError && (
          <section className="article-loading">
            <div className="container">
              <p className="blog-empty">Impossible de charger cet article pour le moment.</p>
              <Link to="/blog" className="btn btn--ghost" style={{ marginTop: 16 }}>← Retour au blog</Link>
            </div>
          </section>
        )}

        {!isLoading && !isError && !article && (
          <section className="article-loading">
            <div className="container">
              <p className="blog-empty">Article introuvable.</p>
              <Link to="/blog" className="btn btn--ghost" style={{ marginTop: 16 }}>← Retour au blog</Link>
            </div>
          </section>
        )}

        {article && (
          <>
            {/* ── HERO ARTICLE ── */}
            <section className="article-hero">
              <div className="container article-hero__inner reveal">
                <div className="section-tag">Blog</div>
                <h1 className="article-hero__title">{article.title}</h1>
                <div className="article-meta">
                  <span>{formatDate(article.published_at || article.created_at)}</span>
                  {article.read_time ? <span>· {article.read_time} min de lecture</span> : null}
                  {article.author ? <span>· {article.author}</span> : null}
                </div>
              </div>
              {(article.storage_image_url || article.image_url) && (
                <div className="container">
                  <div className="article-hero__image reveal">
                    <img
                      src={article.storage_image_url || article.image_url}
                      alt={article.title}
                      loading="eager"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* ── CORPS DE L'ARTICLE ── */}
            <section className="article-body-sect">
              <div className="container">
                <article
                  className="article-body reveal"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                {Array.isArray(article.faq) && article.faq.length > 0 && (
                  <section className="article-faq reveal">
                    <h2>Questions fréquentes</h2>
                    {article.faq.map((item, i) => (
                      <details key={i}>
                        <summary>{item.question}</summary>
                        <p>{item.answer}</p>
                      </details>
                    ))}
                  </section>
                )}
              </div>
            </section>

            {/* ── POUR ALLER PLUS LOIN ── */}
            <section className="article-body-sect" style={{ paddingTop: 0 }}>
              <div className="container">
                <div className="reveal" style={{ borderTop: '1px solid rgba(28,43,74,.12)', paddingTop: 40, textAlign: 'center' }}>
                  <div className="section-tag" style={{ justifyContent: 'center' }}>Poursuivre</div>
                  <h2 className="section-title">Pour aller <em>plus loin.</em></h2>
                  <p style={{ maxWidth: 560, margin: '0 auto 24px', color: 'var(--corps)' }}>
                    Prolongez cette lecture par un accompagnement ciblé, une pratique quotidienne
                    ou une expérience immersive en pleine nature.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
                    {specialtyMatch && (
                      <Link className="btn btn--ghost" to={specialtyMatch.path}>
                        {specialtyMatch.label} <span className="arrow">→</span>
                      </Link>
                    )}
                    <a className="btn btn--ghost" href={NOVARESPIRE_URL} target="_blank" rel="noopener noreferrer nofollow">
                      L'app NovaRespire, entre les séances <span className="arrow">→</span>
                    </a>
                    <a className="btn btn--ghost" href={HYPNO_BALADE_URL} target="_blank" rel="noopener noreferrer">
                      Une Hypno-Balade en pleine nature <span className="arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* ── ARTICLES RELIÉS ── */}
            {relatedArticles.length > 0 && (
              <section className="blog-grid-sect" style={{ paddingTop: 40 }}>
                <div className="container">
                  <div className="reveal" style={{ marginBottom: 40, textAlign: 'center' }}>
                    <div className="section-tag" style={{ justifyContent: 'center' }}>Continuer</div>
                    <h2 className="section-title">D'autres <em>lectures.</em></h2>
                  </div>
                  <div className="blog-grid">
                    {relatedArticles?.map((a, i) => (
                      <Link
                        to={`/blog/article/${a.slug}`}
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
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

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

export default PreviewCharteBlogArticle;
