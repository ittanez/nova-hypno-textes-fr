/**
 * PreviewCharteBlogArticle — page article dans la charte risographie.
 * Lit l'article sur Supabase via getArticleBySlug. Page autoportante, noindex.
 */

import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticleBySlug, getAllArticlesNoPagination } from '@/lib/services/blog/articleService';
import type { Article } from '@/lib/types/blog';
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

const PreviewCharteBlogArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const rootRef = useRef<HTMLDivElement>(null);

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
    queryKey: ['preview-charte-blog-articles-list'],
    queryFn: async () => {
      const result = await getAllArticlesNoPagination();
      return result.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const relatedArticles: Article[] = (related ?? [])
    .filter((a) => a.id !== article?.id)
    .slice(0, 3);

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
        <title>{article ? `${article.title} — aperçu charte` : 'Article — aperçu charte'} | NovaHypnose</title>
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
            <div className="nav__links">
              <Link to="/preview-charte-blog">← Le journal</Link>
              <Link to="/preview-charte">Accueil</Link>
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
              <Link to="/preview-charte-blog" className="btn btn--ghost" style={{ marginTop: 16 }}>← Retour au journal</Link>
            </div>
          </section>
        )}

        {!isLoading && !isError && !article && (
          <section className="article-loading">
            <div className="container">
              <p className="blog-empty">Article introuvable.</p>
              <Link to="/preview-charte-blog" className="btn btn--ghost" style={{ marginTop: 16 }}>← Retour au journal</Link>
            </div>
          </section>
        )}

        {article && (
          <>
            {/* ── HERO ARTICLE ── */}
            <section className="article-hero">
              <div className="container article-hero__inner reveal">
                <div className="section-tag">Le journal</div>
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

            {/* ── ARTICLES RELIÉS ── */}
            {relatedArticles.length > 0 && (
              <section className="blog-grid-sect" style={{ paddingTop: 40 }}>
                <div className="container">
                  <div className="reveal" style={{ marginBottom: 40, textAlign: 'center' }}>
                    <div className="section-tag" style={{ justifyContent: 'center' }}>Continuer</div>
                    <h2 className="section-title">D'autres <em>lectures.</em></h2>
                  </div>
                  <div className="blog-grid">
                    {relatedArticles.map((a, i) => (
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
          © NovaHypnose · Alain Zenatti <em>— le journal, en aperçu</em> · MMXXVI
        </footer>
      </div>
    </>
  );
};

export default PreviewCharteBlogArticle;
