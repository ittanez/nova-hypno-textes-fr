import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { submitSommeilLead } from '@/lib/services/sommeilLeadService';
import { safeJSONStringify } from '@/lib/seo-utils';
import Lock from 'lucide-react/dist/esm/icons/lock';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import '@/styles/preview-charte.css';

/* ─────────────────────────────────────────────
   Landing page isolée — Guide "Le Sommeil, Votre Allié Secret"
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

interface LeadFormProps {
  id: string;
  onSuccess: (prenom: string) => void;
  buttonLabel?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ id, onSuccess, buttonLabel = 'Recevoir le guide →' }) => {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) { setErrorMsg('Veuillez sélectionner votre localisation.'); return; }
    setLoading(true); setErrorMsg('');
    const result = await submitSommeilLead(prenom, email, location);
    setLoading(false);
    if (result.success) { onSuccess(prenom); }
    else { setErrorMsg(result.error || 'Une erreur est survenue. Veuillez réessayer.'); }
  };

  return (
    <form id={id} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input id={`${id}-prenom`} type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)}
        placeholder="Votre prénom" required style={inputStyle} />
      <input id={`${id}-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.fr" required style={inputStyle} />
      <label style={radioLabelStyle(location === 'Paris Île-de-France')}>
        <input type="radio" name={`${id}-location`} value="Paris Île-de-France"
          checked={location === 'Paris Île-de-France'} onChange={(e) => setLocation(e.target.value)}
          style={{ accentColor: '#2B4BA0' }} />
        Paris Île-de-France
      </label>
      <label style={radioLabelStyle(location === 'Autre, étranger')}>
        <input type="radio" name={`${id}-location`} value="Autre, étranger"
          checked={location === 'Autre, étranger'} onChange={(e) => setLocation(e.target.value)}
          style={{ accentColor: '#2B4BA0' }} />
        Autre, étranger
      </label>
      <button type="submit" disabled={loading} className="btn btn--amber"
        style={{ width: '100%', justifyContent: 'center', marginTop: '6px', ...(loading ? { opacity: 0.6, cursor: 'wait' } : {}) }}>
        {loading ? 'Envoi en cours…' : <>{buttonLabel} <ArrowRight size={16} className="arrow" /></>}
      </button>
      <p style={{ fontSize: '11px', color: '#8A9BB8', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
        <Lock size={11} /> Aucun spam. Vos données restent confidentielles.
      </p>
      {errorMsg && <p style={{ fontSize: '12px', color: '#c0392b', textAlign: 'center' }}>{errorMsg}</p>}
    </form>
  );
};

const stats = [
  { value: '1 / 5', label: "des Français souffrent d'insomnie chronique" },
  { value: '6h42', label: 'Durée moyenne de sommeil en semaine' },
  { value: '+81 %', label: "De sommeil profond avec l'hypnose (Sleep, 2014)" },
];

const chapters = [
  { title: 'Pourquoi votre corps a besoin de dormir', desc: "Les deux mécanismes biologiques qui orchestrent votre sommeil — et comment les utiliser à votre avantage." },
  { title: 'Ce qui se passe vraiment pendant la nuit', desc: "Cycles, sommeil profond, REM : chaque stade a un rôle précis. Comprendre l'architecture change tout." },
  { title: 'Les 5 saboteurs silencieux de votre sommeil', desc: "Caféine, alcool, écrans, température, rumination — et comment les neutraliser dès ce soir." },
  { title: "Ce que la science dit sur l'hypnose", desc: "Des études EEG publiées dans Sleep et Nature montrent un impact objectif et mesurable sur la qualité du sommeil." },
  { title: 'Un programme pratique de 30 jours', desc: "Rituel du coucher en 5 étapes, techniques anti-rumination, règles d'hygiène du sommeil fondées sur la science." },
];

const GuideSommeil: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleSuccess = useCallback((prenom: string) => {
    navigate('/guide-sommeil/merci', { state: { prenom } });
  }, [navigate]);

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

  return (
    <>
      <Helmet>
        <title>Guide gratuit — Le Sommeil, Votre Allié Secret | NovaHypnose</title>
        <meta name="description" content="Téléchargez gratuitement le guide de 17 pages sur le sommeil et l'hypnose. Programme pratique de 30 jours pour retrouver un sommeil profond — sans médicaments." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/guide-sommeil" />
        <script type="application/ld+json">{safeJSONStringify({
          "@context": "https://schema.org", "@type": "Book",
          "@id": "https://novahypnose.fr/guide-sommeil#book",
          "name": "Le Sommeil, Votre Allié Secret",
          "description": "Guide de 17 pages sur le sommeil et l'hypnose. Programme pratique de 30 jours pour retrouver un sommeil profond et réparateur, sans médicaments.",
          "url": "https://novahypnose.fr/guide-sommeil", "inLanguage": "fr-FR",
          "bookFormat": "https://schema.org/EBook", "numberOfPages": 17, "isAccessibleForFree": true,
          "author": { "@id": "https://novahypnose.fr/#person" },
          "publisher": { "@id": "https://novahypnose.fr/#localbusiness" },
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
        })}</script>
      </Helmet>

      <div className="cz" ref={rootRef}>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-full-s">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={5} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={10} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
            <filter id="paperGrain-s" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves={4} seed={2} />
              <feColorMatrix values="0 0 0 0 .15  0 0 0 0 .12  0 0 0 0 .08  0 0 0 .15 0" />
            </filter>
          </defs>
        </svg>

        {/* ═══════════ HERO ═══════════ */}
        <section className="hero" style={{ paddingTop: '80px' }}>
          <div className="hero__bg" aria-hidden="true">
            <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full-s)">
                <path d="M 0 0 L 600 0 C 700 40, 760 100, 780 180 C 800 280, 720 360, 640 380 C 540 400, 380 360, 260 300 C 140 240, 40 180, 0 120 Z" fill="#2B4BA0" opacity="0.85" />
              </g>
              <g filter="url(#riso-full-s)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 900 600 C 1020 520, 1180 500, 1320 560 C 1420 600, 1480 640, 1480 700 L 1480 1040 L 600 1040 C 680 960, 780 840, 900 600 Z" fill="#F2A12E" opacity="0.75" />
              </g>
              <rect width="1440" height="1000" filter="url(#paperGrain-s)" opacity=".2" />
            </svg>
          </div>

          <div className="zen-mark" aria-hidden="true">nuit</div>

          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center', paddingBottom: '100px', position: 'relative', zIndex: 5, width: '100%' }}>
            <div className="reveal hero__panel" style={{ transitionDelay: '.1s' }}>
              <div className="tag">Guide gratuit · PDF · 17 pages</div>
              <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 300, lineHeight: 1.08, color: 'var(--texte)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Le Sommeil,<br />
                <em style={{ fontStyle: 'italic', color: 'var(--cobalt)', fontWeight: 400 }}>Votre Allié Secret</em>
              </h1>
              <div className="hero__rule" />
              <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 1.8vw, 21px)', color: 'var(--texte)', marginBottom: '28px', lineHeight: 1.55, maxWidth: '460px' }}>
                Près d'un Français sur cinq souffre d'insomnie chronique. Ce guide est fait pour vous — <em style={{ color: 'var(--cobalt)' }}>sans médicaments.</em>
              </p>
              <p style={{ fontSize: '12px', color: 'var(--gris)', marginBottom: '18px', fontWeight: 400 }}>
                Recevez immédiatement le PDF — aucun engagement, aucun spam.
              </p>
              <LeadForm id="hero-form" onSuccess={handleSuccess} />
            </div>

            <div className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transitionDelay: '.3s' }}>
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/EBOOKSOMMEIL.webp"
                alt="Guide Le Sommeil, Votre Allié Secret — 17 pages"
                style={{ width: 'clamp(220px, 28vw, 340px)', borderRadius: '16px', boxShadow: '12px 12px 0 rgba(28,43,74,.18)', transform: 'rotate(-2deg)', transition: 'transform 0.5s' }}
                loading="eager"
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(-2deg)')}
              />
            </div>
          </div>
        </section>

        {/* ═══════════ STATS ═══════════ */}
        <section style={{ background: 'var(--cobalt-2)', padding: '40px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
              {stats.map((s) => (
                <div key={s.value} className="reveal">
                  <p style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 400, color: 'var(--amber)', marginBottom: '6px', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ color: 'rgba(240,236,227,.65)', fontSize: '13px', lineHeight: 1.4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CONTENU DU GUIDE ═══════════ */}
        <section style={{ background: 'var(--lin)', padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '40px' }}>
              <div className="section-tag">Ce que vous allez découvrir</div>
              <h2 className="section-title">17 pages pour retrouver<br />un sommeil <em>profond et réparateur.</em></h2>
              <div style={{ width: '48px', height: '2px', background: 'var(--amber)', marginTop: '24px', boxShadow: '3px 3px 0 rgba(242,161,46,.25)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chapters.map((ch, i) => (
                <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.07}s`, display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', borderRadius: '12px', background: 'var(--paper)', boxShadow: '0 2px 12px rgba(28,43,74,.04)' }}>
                  <span style={{ fontFamily: 'var(--f-serif)', fontSize: '32px', fontWeight: 300, color: 'rgba(43,75,160,.15)', lineHeight: 1, flexShrink: 0, width: '36px' }}>{i + 1}</span>
                  <div>
                    <p style={{ fontWeight: 500, color: 'var(--cobalt-2)', fontSize: '14px', marginBottom: '4px' }}>{ch.title}</p>
                    <p style={{ color: 'var(--gris)', fontSize: '13px', lineHeight: 1.55 }}>{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ AUTEUR ═══════════ */}
        <section style={{ background: 'var(--lin-2)', padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div className="reveal">
              <div style={{ width: '40px', height: '2px', background: 'var(--amber)', marginBottom: '24px', boxShadow: '3px 3px 0 rgba(242,161,46,.25)' }} />
              <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', color: 'var(--texte)', fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.5, marginBottom: '32px' }}>
                « Votre sommeil est là, quelque part en vous.<br />
                Parfois il a juste besoin d'un peu d'aide pour revenir. »
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--cobalt-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-serif)', fontWeight: 500, color: 'var(--lin)', fontSize: '14px', flexShrink: 0 }}>AZ</div>
                <div>
                  <p style={{ fontFamily: 'var(--f-serif)', fontWeight: 500, color: 'var(--texte)', fontSize: '15px', marginBottom: '2px' }}>Alain Zenatti</p>
                  <p style={{ color: 'var(--gris)', fontSize: '12px', lineHeight: 1.5 }}>
                    Hypnothérapeute certifié · Maître Praticien en Hypnose Ericksonienne<br />NovaHypnose · Paris 4e
                  </p>
                </div>
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

export default GuideSommeil;
