import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Clock from 'lucide-react/dist/esm/icons/clock';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import '@/styles/preview-charte.css';

/* ─────────────────────────────────────────────
   Thank You page — guide Émotions au Travail
   Charte ZENatti / risographie — ambre · cobalt · lin
   ───────────────────────────────────────────── */

const GuideEbookMerci: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prenom = (location.state as { prenom?: string })?.prenom || '';

  useEffect(() => {
    if (!location.state) { navigate('/guide-emotions-travail', { replace: true }); }
  }, [location.state, navigate]);

  if (!location.state) return null;

  return (
    <>
      <Helmet>
        <title>Merci ! Guide Émotions au Travail envoyé — NovaHypnose</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="cz">
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-full-em">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={9} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={14} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
            <filter id="paperGrain-em" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves={4} seed={7} />
              <feColorMatrix values="0 0 0 0 .15  0 0 0 0 .12  0 0 0 0 .08  0 0 0 .15 0" />
            </filter>
          </defs>
        </svg>

        {/* ═══════════ CONFIRMATION HERO ═══════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 0 80px', minHeight: '55vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <svg width="100%" height="100%" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full-em)">
                <path d="M 700 0 L 1100 0 C 1160 70, 1140 160, 1080 220 C 1000 300, 840 300, 720 240 C 600 180, 580 60, 700 0 Z" fill="#F2A12E" opacity="0.5" />
              </g>
              <g filter="url(#riso-full-em)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 0 300 C 80 220, 200 200, 360 240 C 480 270, 560 360, 540 460 C 520 540, 380 580, 200 560 C 60 540, -20 440, 0 300 Z" fill="#2B4BA0" opacity="0.5" />
              </g>
              <rect width="1440" height="600" filter="url(#paperGrain-em)" opacity=".15" />
            </svg>
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 5 }}>
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(242,161,46,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', border: '2px solid rgba(242,161,46,.35)' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#F2A12E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      Votre guide arrive par email
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

        {/* ═══════════ TEXTE D'ACCOMPAGNEMENT ═══════════ */}
        <section style={{ background: 'var(--lin-2)', padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '740px', margin: '0 auto' }}>
            <div className="reveal">
              <div className="section-tag">En attendant votre guide</div>
              <h2 className="section-title">Pourquoi je vous ai <em>préparé ce guide</em></h2>
            </div>

            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '15px', color: 'var(--corps)', lineHeight: 1.8, marginBottom: '40px' }}>
              <p>
                {prenom ? `${prenom}, c` : 'C'}haque semaine, je reçois à mon cabinet des personnes qui me disent la même chose :
                <strong style={{ color: 'var(--texte)' }}> « Je ne comprends plus ce qui m'arrive. »</strong>
              </p>
              <p>
                Des cadres, des managers, des indépendants. Des gens brillants, compétents, engagés.
                Mais qui, un matin, se réveillent avec cette sensation que quelque chose a lâché à l'intérieur — sans savoir quoi, ni pourquoi.
              </p>
              <p>Ce guide, je l'ai écrit pour eux. Et pour vous, si vous vous reconnaissez.</p>
              <p>
                Il ne remplace pas un accompagnement. Mais il pose les <strong style={{ color: 'var(--texte)' }}>bons mots sur ce que vous vivez</strong>.
                Et parfois, c'est exactement ce qu'il faut pour que les choses commencent à bouger.
              </p>
            </div>

            {/* Signature */}
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'var(--paper)', borderRadius: '16px', padding: '20px 24px', boxShadow: '0 4px 20px rgba(28,43,74,.06)', borderLeft: '3px solid var(--amber)' }}>
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp"
                alt="Alain Zenatti — Hypnothérapeute Paris"
                style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '6px 6px 0 rgba(242,161,46,.22)' }}
                loading="lazy"
              />
              <div>
                <p style={{ fontFamily: 'var(--f-serif)', fontWeight: 500, color: 'var(--texte)', fontSize: '16px', marginBottom: '2px' }}>Alain Zenatti</p>
                <p style={{ fontSize: '13px', color: 'var(--gris)', marginBottom: '6px' }}>Maître Praticien en Hypnose Ericksonienne</p>
                <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '14px', color: 'var(--cobalt)' }}>
                  « Mon rôle n'est pas de vous faire changer — c'est de vous aider à redevenir vous-même. »
                </p>
              </div>
            </div>
          </div>
        </section>

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

export default GuideEbookMerci;
