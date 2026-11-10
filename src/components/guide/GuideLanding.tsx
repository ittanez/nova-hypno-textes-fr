import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { safeJSONStringify } from '@/lib/seo-utils';
import Lock from 'lucide-react/dist/esm/icons/lock';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Star from 'lucide-react/dist/esm/icons/star';
import LazyYouTube from '@/components/LazyYouTube';
import type { GuideLandingConfig, GuideSubmit } from '@/data/guideLandings';
import '@/styles/preview-charte.css';

/* ─────────────────────────────────────────────
   Gabarit unique des pages de téléchargement des guides.
   Même structure pour les 7 guides (le contenu vient de
   src/data/guideLandings.tsx) :
   1. Hero (titre, accroche, formulaire, couverture)
   2. Vidéo de 30 secondes
   3. « Vous vous reconnaissez ? »
   4. « Ce que vous allez découvrir » (sommaire réel du PDF)
   5. Témoignages (facultatif)
   6. Auteur + mention de prudence
   7. Mini pied de page
   Charte ZENatti / risographie — ambre · cobalt · lin
   ───────────────────────────────────────────── */

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid rgba(43,75,160,.2)',
  background: 'rgba(255,255,255,.85)',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
  color: '#1C2B4A',
};

const radioLabelStyle = (selected: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '11px 16px',
  borderRadius: '10px',
  border: `1px solid ${selected ? '#2B4BA0' : 'rgba(43,75,160,.2)'}`,
  background: selected ? 'rgba(43,75,160,.06)' : 'rgba(255,255,255,.85)',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#1C2B4A',
  fontWeight: selected ? 500 : 400,
  transition: 'border-color 0.2s, background 0.2s',
});

const LOCATIONS = ['Paris Île-de-France', 'Autre, étranger'];

interface LeadFormProps {
  id: string;
  askLocation: boolean;
  submit: GuideSubmit;
  onSuccess: (prenom: string) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ id, askLocation, submit, onSuccess }) => {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPrenom = prenom.trim();
    const trimmedEmail = email.trim();
    if (!trimmedPrenom || !trimmedEmail) { setErrorMsg('Veuillez remplir tous les champs requis.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) { setErrorMsg('Veuillez saisir une adresse email valide.'); return; }
    if (askLocation && !location) { setErrorMsg('Veuillez sélectionner votre localisation.'); return; }
    setLoading(true); setErrorMsg('');
    const result = await submit(trimmedPrenom, trimmedEmail, location);
    setLoading(false);
    if (result.success) { onSuccess(trimmedPrenom); }
    else { setErrorMsg(result.error || 'Une erreur est survenue. Veuillez réessayer.'); }
  };

  return (
    <form id={id} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input id={`${id}-prenom`} type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)}
        placeholder="Votre prénom" required style={inputStyle} />
      <input id={`${id}-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.fr" required style={inputStyle} />
      {askLocation && LOCATIONS.map((loc) => (
        <label key={loc} style={radioLabelStyle(location === loc)}>
          <input type="radio" name={`${id}-location`} value={loc}
            checked={location === loc} onChange={(e) => setLocation(e.target.value)}
            style={{ accentColor: '#2B4BA0' }} />
          {loc}
        </label>
      ))}
      <button type="submit" disabled={loading} className="btn btn--amber"
        style={{ width: '100%', justifyContent: 'center', marginTop: '6px', ...(loading ? { opacity: 0.6, cursor: 'wait' } : {}) }}>
        {loading ? 'Envoi en cours…' : <>Recevoir le guide <ArrowRight size={16} className="arrow" /></>}
      </button>
      <p style={{ fontSize: '11px', color: '#8A9BB8', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
        <Lock size={11} /> Aucun spam. Vos données restent confidentielles.
      </p>
      {errorMsg && <p style={{ fontSize: '12px', color: '#c0392b', textAlign: 'center' }}>{errorMsg}</p>}
    </form>
  );
};

const sectionStyle = (bg: 'var(--lin)' | 'var(--lin-2)', padding = '80px 0'): React.CSSProperties => ({ background: bg, padding });

interface Props {
  config: GuideLandingConfig;
  submit: GuideSubmit;
}

const GuideLanding: React.FC<Props> = ({ config, submit }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const url = `https://novahypnose.fr/${config.slug}`;

  const handleSuccess = useCallback((prenom: string) => {
    navigate(`/${config.slug}/merci`, { state: { prenom } });
  }, [navigate, config.slug]);

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

  const cardBase: React.CSSProperties = { background: 'var(--paper)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(28,43,74,.06)', borderTop: '3px solid var(--amber)' };

  return (
    <>
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />
        <script type="application/ld+json">{safeJSONStringify({
          "@context": "https://schema.org", "@type": "Book",
          "@id": `${url}#book`,
          "name": config.schemaName,
          "description": config.schemaDescription,
          "url": url, "inLanguage": "fr-FR",
          "bookFormat": "https://schema.org/EBook", "numberOfPages": config.pages, "isAccessibleForFree": true,
          "author": { "@id": "https://novahypnose.fr/#person" },
          "publisher": { "@id": "https://novahypnose.fr/#localbusiness" },
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
        })}</script>
      </Helmet>

      <div className="cz" ref={rootRef}>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-full-guide">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={14} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={19} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
            <filter id="paperGrain-guide" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves={4} seed={9} />
              <feColorMatrix values="0 0 0 0 .15  0 0 0 0 .12  0 0 0 0 .08  0 0 0 .15 0" />
            </filter>
          </defs>
        </svg>

        {/* ═══════════ 1. HERO ═══════════ */}
        <section className="hero" style={{ paddingTop: '80px' }}>
          <div className="hero__bg" aria-hidden="true">
            <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full-guide)">
                <path d="M 0 0 L 560 0 C 660 50, 720 120, 740 210 C 760 310, 680 390, 580 410 C 460 434, 300 400, 180 340 C 90 294, 30 220, 0 150 Z" fill="#2B4BA0" opacity="0.85" />
              </g>
              <g filter="url(#riso-full-guide)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 940 620 C 1060 540, 1220 520, 1340 580 C 1430 624, 1480 664, 1480 720 L 1480 1040 L 640 1040 C 720 960, 820 850, 940 620 Z" fill="#F2A12E" opacity="0.75" />
              </g>
              <rect width="1440" height="1000" filter="url(#paperGrain-guide)" opacity=".2" />
            </svg>
          </div>

          <div className="zen-mark" aria-hidden="true">{config.zenMark}</div>

          <div className="container hero__container">
            <div className="reveal hero__panel" style={{ transitionDelay: '.1s' }}>
              <div className="tag">{config.tag}</div>
              <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 300, lineHeight: 1.08, color: 'var(--texte)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                {config.titleTop}<br />
                <em style={{ fontStyle: 'italic', color: 'var(--cobalt)', fontWeight: 400 }}>{config.titleEm}</em>
              </h1>
              <div className="hero__rule" />
              <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 1.8vw, 21px)', color: 'var(--texte)', marginBottom: '28px', lineHeight: 1.55, maxWidth: '460px' }}>
                {config.hook}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--gris)', marginBottom: '18px', fontWeight: 400 }}>
                Recevez le PDF par email en quelques minutes : gratuit, sans engagement.
              </p>
              <LeadForm id="hero-form" askLocation={config.askLocation} submit={submit} onSuccess={handleSuccess} />
            </div>

            <div className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transitionDelay: '.3s' }}>
              <img
                src={config.cover.src}
                alt={config.cover.alt}
                style={{ width: 'clamp(220px, 28vw, 340px)', borderRadius: '16px', boxShadow: '12px 12px 0 rgba(28,43,74,.18)', transform: 'rotate(-2deg)', transition: 'transform 0.5s' }}
                loading="eager"
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(-2deg)')}
              />
            </div>
          </div>
        </section>

        {/* ═══════════ 2. VIDÉO ═══════════ */}
        <section style={sectionStyle('var(--lin)', '60px 0')}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <div className="section-tag">En vidéo — 30 secondes</div>
                <h2 className="section-title" style={{ fontSize: '28px' }}>{config.video.title}</h2>
                <p style={{ color: 'var(--corps)', fontSize: '15px', lineHeight: 1.7 }}>{config.video.text}</p>
              </div>
              <div style={{ width: '100%', maxWidth: '280px', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(28,43,74,.12)' }}>
                <LazyYouTube videoId={config.video.id} title={config.video.title} className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ 3. VOUS VOUS RECONNAISSEZ ? ═══════════ */}
        <section style={sectionStyle('var(--lin-2)')}>
          <div className="container">
            <div className="reveal" style={{ marginBottom: '40px' }}>
              <div className="section-tag">Vous vous reconnaissez ?</div>
              <h2 className="section-title">{config.recognition.heading}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {config.recognition.items.map((m, i) => (
                <div key={i} className="reveal" style={{ ...cardBase, transitionDelay: `${i * 0.06}s` }}>
                  {m.title && (
                    <h4 style={{ fontFamily: 'var(--f-serif)', fontSize: '18px', fontWeight: 400, color: 'var(--texte)', marginBottom: '8px', lineHeight: 1.2 }}>{m.title}</h4>
                  )}
                  <p style={m.title
                    ? { fontSize: '14px', lineHeight: 1.7, color: 'var(--corps)' }
                    : { fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '16px', lineHeight: 1.6, color: 'var(--texte)' }}>
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 4. CE QUE VOUS ALLEZ DÉCOUVRIR ═══════════ */}
        <section style={sectionStyle('var(--lin)')}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '40px' }}>
              <div className="section-tag">Ce que vous allez découvrir</div>
              <h2 className="section-title">{config.contents.heading}</h2>
              <div style={{ width: '48px', height: '2px', background: 'var(--amber)', marginTop: '24px', boxShadow: '3px 3px 0 rgba(242,161,46,.25)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {config.contents.items.map((ch, i) => (
                <div key={i} className="reveal" style={{ transitionDelay: `${Math.min(i, 8) * 0.05}s`, display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', borderRadius: '12px', background: 'var(--paper)', boxShadow: '0 2px 12px rgba(28,43,74,.04)' }}>
                  <span style={{ fontFamily: 'var(--f-serif)', fontSize: '32px', fontWeight: 300, color: 'rgba(43,75,160,.15)', lineHeight: 1, flexShrink: 0, width: '36px' }}>{i + 1}</span>
                  <div>
                    <p style={{ fontWeight: 500, color: 'var(--cobalt-2)', fontSize: '14px', marginBottom: ch.desc ? '4px' : 0 }}>{ch.title}</p>
                    {ch.desc && <p style={{ color: 'var(--gris)', fontSize: '13px', lineHeight: 1.55 }}>{ch.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 5. TÉMOIGNAGES (facultatif) ═══════════ */}
        {config.testimonials && config.testimonials.length > 0 && (
          <section style={sectionStyle('var(--lin-2)')}>
            <div className="container">
              <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div className="section-tag">Témoignages</div>
                <h2 className="section-title">Ce qu'en disent les <em>lecteurs.</em></h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {config.testimonials.map((t, i) => (
                  <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s`, background: 'var(--paper)', borderRadius: '16px', padding: '24px', borderTop: '4px solid var(--amber)', boxShadow: '0 4px 20px rgba(28,43,74,.05)' }}>
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                      {[...Array(5)].map((_, j) => <Star key={j} size={14} style={{ color: 'var(--amber)', fill: 'var(--amber)' }} />)}
                    </div>
                    <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '16px', lineHeight: 1.7, color: 'var(--texte)', marginBottom: '16px' }}>« {t.text} »</p>
                    <p style={{ fontWeight: 600, color: 'var(--cobalt)', fontSize: '14px' }}>{t.author}</p>
                    <p style={{ color: 'var(--gris)', fontSize: '12px' }}>{t.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ 6. AUTEUR ═══════════ */}
        <section style={sectionStyle(config.testimonials && config.testimonials.length > 0 ? 'var(--lin)' : 'var(--lin-2)')}>
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="section-tag">À propos</div>
              <h2 className="section-title">Qui suis-<em>je ?</em></h2>
            </div>
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '48px', alignItems: 'flex-start', maxWidth: '820px', margin: '0 auto' }}>
              <img
                src="/images/zenatti.webp"
                alt="Alain Zenatti, hypnothérapeute à Paris 4e"
                style={{ width: '112px', height: '112px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '8px 8px 0 rgba(242,161,46,.28)' }}
                loading="lazy"
              />
              <div>
                <h4 style={{ fontFamily: 'var(--f-serif)', fontSize: '26px', fontWeight: 400, color: 'var(--texte)', marginBottom: '4px' }}>Alain Zenatti</h4>
                <p style={{ color: 'var(--amber)', fontWeight: 500, fontSize: '13px', letterSpacing: '.05em', marginBottom: '20px' }}>
                  Hypnothérapeute
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {[
                    <><strong>Paris 4e</strong> et en visio, partout en France</>,
                    <><strong>6 ans</strong> d'expérience en cabinet</>,
                    <><strong>Hypnose ericksonienne</strong> et auto-hypnose</>,
                    ...(config.authorExtra ? [<>{config.authorExtra}</>] : []),
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--corps)', lineHeight: 1.6 }}>
                      <CheckCircle size={16} style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ color: 'var(--gris)', fontSize: '14px', lineHeight: 1.8 }}>
                  Mon approche repose sur l'écoute, la bienveillance et la précision. Ce guide propose des pistes de réflexion : il ne promet aucun résultat.
                </p>
              </div>
            </div>
            <p className="reveal" style={{ maxWidth: '820px', margin: '40px auto 0', padding: '16px 20px', borderRadius: '12px', background: 'var(--paper)', fontSize: '12px', lineHeight: 1.6, color: 'var(--gris)', borderLeft: '3px solid var(--amber)' }}>
              Ce guide ne remplace ni un avis médical ni un suivi psychologique ou psychiatrique. En cas de détresse, appelez le 3114 (numéro national de prévention du suicide).
            </p>
          </div>
        </section>

        {/* ═══════════ 7. MINI FOOTER ═══════════ */}
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

export default GuideLanding;
