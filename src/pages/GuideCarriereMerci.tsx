import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Clock from 'lucide-react/dist/esm/icons/clock';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { getPopularArticles } from '@/lib/services/blog/articleService';
import { Article } from '@/lib/types/blog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import '@/styles/preview-charte.css';

/* ─────────────────────────────────────────────
   Thank You page — guide "Ma Carrière, Enfin Débloquée"
   Charte ZENatti / risographie — ambre · cobalt · lin
   ───────────────────────────────────────────── */

const GuideCarriereMerci: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prenom = (location.state as { prenom?: string })?.prenom || '';
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    let active = true;
    getPopularArticles(3).then(({ data }) => { if (active && data) setArticles(data); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!location.state) { navigate('/guide-carriere', { replace: true }); }
  }, [location.state, navigate]);

  if (!location.state) return null;

  return (
    <>
      <Helmet>
        <title>Merci ! Guide Carrière envoyé — NovaHypnose</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://novahypnose.fr/guide-carriere/merci" />
      </Helmet>

      <div className="cz">
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-full-crm">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={15} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={20} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
            <filter id="paperGrain-crm" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves={4} seed={10} />
              <feColorMatrix values="0 0 0 0 .15  0 0 0 0 .12  0 0 0 0 .08  0 0 0 .15 0" />
            </filter>
          </defs>
        </svg>

        {/* ═══════════ CONFIRMATION HERO ═══════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 0 80px', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <svg width="100%" height="100%" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full-crm)">
                <path d="M 240 0 L 660 0 C 740 70, 740 170, 670 230 C 580 310, 390 310, 260 250 C 130 190, 100 80, 240 0 Z" fill="#2B4BA0" opacity="0.55" />
              </g>
              <g filter="url(#riso-full-crm)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 1200 400 C 1300 320, 1420 300, 1480 340 L 1480 600 L 800 600 C 840 520, 960 460, 1200 400 Z" fill="#F2A12E" opacity="0.5" />
              </g>
              <rect width="1440" height="600" filter="url(#paperGrain-crm)" opacity=".15" />
            </svg>
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 5 }}>
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(43,75,160,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', border: '2px solid rgba(43,75,160,.25)' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2B4BA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--texte)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                {prenom ? `Merci ${prenom} !` : 'Merci !'}
              </h1>

              <div style={{ background: 'rgba(240,236,227,.85)', backdropFilter: 'blur(14px)', borderRadius: '20px', padding: '28px 32px', boxShadow: '0 20px 60px rgba(28,43,74,.08)', border: '1px solid rgba(255,255,255,.5)', textAlign: 'left', maxWidth: '520px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(43,75,160,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} style={{ color: 'var(--cobalt)' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--f-serif)', fontSize: '18px', fontWeight: 400, color: 'var(--texte)', marginBottom: '6px' }}>
                      Votre guide « Ma Carrière, Enfin Débloquée » arrive par email
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--gris)', lineHeight: 1.6 }}>
                      Vérifiez votre boîte de réception (et vos spams) dans les prochaines minutes.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(28,43,74,.08)', fontSize: '13px', color: 'var(--gris)' }}>
                  <Clock size={14} />
                  <span>Délai de réception : environ 7 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ ARTICLES DU BLOG ═══════════ */}
        {articles.length > 0 && (
          <section style={{ background: 'var(--lin-2)', padding: '60px 0' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div className="section-tag">En attendant</div>
                <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: 'var(--texte)', margin: 0, letterSpacing: '-0.01em' }}>
                  Découvrez notre <em style={{ fontStyle: 'italic', color: 'var(--cobalt)' }}>blog</em>
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                {articles.map((article) => (
                  <Link key={article.id} to={`/blog/article/${article.slug}`}
                    style={{ background: 'var(--paper)', borderRadius: '16px', overflow: 'hidden', textDecoration: 'none', boxShadow: '0 4px 20px rgba(28,43,74,.06)', display: 'block', transition: 'box-shadow 0.2s, transform 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(28,43,74,.12)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(28,43,74,.06)'; }}
                  >
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'rgba(43,75,160,.08)' }}>
                      <img src={article.image_url || article.storage_image_url || '/placeholder.svg'} alt={article.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    </div>
                    <div style={{ padding: '16px 20px' }}>
                      <p style={{ fontSize: '11px', color: 'var(--gris)', marginBottom: '6px' }}>
                        {(() => {
                          const dateStr = article.published_at || article.created_at;
                          if (!dateStr) return '';
                          const date = new Date(dateStr);
                          return isNaN(date.getTime()) ? '' : format(date, 'd MMMM yyyy', { locale: fr });
                        })()}
                      </p>
                      <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: '16px', fontWeight: 400, color: 'var(--texte)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <Link to="/blog" className="btn btn--ghost" style={{ textDecoration: 'none' }}>
                  Voir tous les articles <ChevronRight size={16} className="arrow" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ MINI FOOTER ═══════════ */}
        <footer style={{ background: 'var(--cobalt-2)', color: 'rgba(240,236,227,.5)', fontSize: '12px', textAlign: 'center', padding: '20px 16px' }}>
          <p style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <MapPin size={11} /> 16 rue Saint-Antoine, 75004 Paris
          </p>
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} NovaHypnose · Alain Zenatti · Hypnothérapeute Paris 4e
            <br />Conformément au RGPD — Désabonnement libre à tout moment.
          </p>
        </footer>
      </div>
    </>
  );
};

export default GuideCarriereMerci;
