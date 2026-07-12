import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { submitGuideLead } from '@/lib/services/guideLeadService';
import { safeJSONStringify } from '@/lib/seo-utils';
import Lock from 'lucide-react/dist/esm/icons/lock';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import '@/styles/preview-charte.css';

/* ─────────────────────────────────────────────
   Landing page isolée — Guide "Vous tenez. Mais jusqu'à quand ?"
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

interface LeadFormProps {
  id: string;
  onSuccess: (prenom: string) => void;
  buttonLabel?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ id, onSuccess, buttonLabel = 'Recevoir le guide →' }) => {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPrenom = prenom.trim();
    const trimmedEmail = email.trim();
    if (!trimmedPrenom || !trimmedEmail) { setErrorMsg('Veuillez remplir tous les champs requis.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) { setErrorMsg('Veuillez saisir une adresse email valide.'); return; }
    setLoading(true); setErrorMsg('');
    const result = await submitGuideLead(trimmedPrenom, trimmedEmail);
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
  { value: '19', label: 'pages concrètes' },
  { value: '20 min', label: 'de lecture' },
  { value: '3', label: 'pratiques applicables dès ce soir' },
];

const painPoints = [
  "« Je me sens épuisé même après avoir dormi. Je ne comprends plus pourquoi je fais ce travail. »",
  "« Je m'énerve pour rien — un email, une remarque — et je passe la journée à m'en vouloir. »",
  "« J'arrive à tenir en réunion, mais une fois seul, quelque chose lâche. Et je ne sais pas quoi. »",
  "« Mes collègues semblent gérer. Pourquoi moi, je n'y arrive plus comme avant ? »",
  "« Je n'ose pas en parler — ni à mon manager, ni à ma famille. Je dois tenir. »",
  "« Je dors mal, je rumine, je ne déconnecte plus. Mon corps envoie des signaux que j'ignore. »",
];

const chapters = [
  { title: "Non, vous n'êtes pas « trop sensible »", desc: 'Comprendre pourquoi cette étiquette efface la vraie cause de votre épuisement.' },
  { title: 'Ce que vos émotions signalent vraiment', desc: 'Irritabilité, larmes, colère froide, vide intérieur : décoder les 5 émotions les plus incomprises au travail.' },
  { title: 'Pourquoi les combattre aggrave tout', desc: "L'effet rebond de la suppression émotionnelle — et l'épuisement invisible de « tenir »." },
  { title: 'Les croyances qui vous maintiennent coincé', desc: '« Un pro ne craque pas », « les autres gèrent » — 4 croyances limitantes et leurs recadrages.' },
  { title: 'La communication relationnelle', desc: "La méthode ESPERE de Jacques Salomé : exprimer ce qu'on vit sans attaquer, sans se trahir." },
  { title: "Comment l'hypnose aide là où la volonté échoue", desc: "Ce que l'hypnose ericksonienne fait concrètement sur les émotions, le sommeil et les relations." },
  { title: '3 pratiques simples dès maintenant', desc: 'Respiration + scan corporel, phrase Salomé du soir, mini-visualisation de 5 minutes.' },
  { title: 'Et si vous alliez plus loin ?', desc: 'Un échange gratuit de 30 minutes pour faire le point — sans engagement.' },
];

const GuideEbook: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleSuccess = useCallback((prenom: string) => {
    navigate('/guide-emotions-travail/merci', { state: { prenom } });
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
        <title>Guide gratuit — Vous tenez. Mais jusqu'à quand ? | NovaHypnose</title>
        <meta name="description" content="Téléchargez gratuitement le guide de 19 pages pour comprendre vos émotions au travail. Pratiques concrètes basées sur l'hypnose ericksonienne." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/guide-emotions-travail" />
        <script type="application/ld+json">{safeJSONStringify({
          "@context": "https://schema.org", "@type": "Book",
          "@id": "https://novahypnose.fr/guide-emotions-travail#book",
          "name": "Vous tenez. Mais jusqu'à quand ?",
          "description": "Guide pratique de 19 pages pour comprendre ses émotions au travail, avec des pratiques basées sur l'hypnose ericksonienne, par Alain Zenatti.",
          "url": "https://novahypnose.fr/guide-emotions-travail", "inLanguage": "fr-FR",
          "bookFormat": "https://schema.org/EBook", "isAccessibleForFree": true,
          "author": { "@id": "https://novahypnose.fr/#person" },
          "publisher": { "@id": "https://novahypnose.fr/#localbusiness" },
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
        })}</script>
      </Helmet>

      <div className="cz" ref={rootRef}>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-full-e">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={5} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={10} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
            <filter id="paperGrain-e" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves={4} seed={2} />
              <feColorMatrix values="0 0 0 0 .15  0 0 0 0 .12  0 0 0 0 .08  0 0 0 .15 0" />
            </filter>
          </defs>
        </svg>

        {/* ═══════════ HERO ═══════════ */}
        <section className="hero" style={{ paddingTop: '80px' }}>
          <div className="hero__bg" aria-hidden="true">
            <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full-e)">
                <path d="M 1440 0 L 820 0 C 720 60, 680 150, 700 250 C 720 350, 820 410, 980 420 C 1140 428, 1320 380, 1440 280 Z" fill="#F2A12E" opacity="0.8" />
              </g>
              <g filter="url(#riso-full-e)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 0 640 C 120 560, 300 520, 480 560 C 620 590, 720 670, 780 760 C 840 850, 800 950, 720 1000 L 0 1000 Z" fill="#2B4BA0" opacity="0.85" />
              </g>
              <rect width="1440" height="1000" filter="url(#paperGrain-e)" opacity=".2" />
            </svg>
          </div>

          <div className="zen-mark" aria-hidden="true">tenir</div>

          <div className="container hero__container">
            <div className="reveal hero__panel" style={{ transitionDelay: '.1s' }}>
              <div className="tag">Guide gratuit · 19 pages</div>
              <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 300, lineHeight: 1.08, color: 'var(--texte)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Vous tenez.<br />
                <em style={{ fontStyle: 'italic', color: 'var(--amber)', fontWeight: 400 }}>Mais jusqu'à quand ?</em>
              </h1>
              <div className="hero__rule" />
              <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 1.8vw, 21px)', color: 'var(--texte)', marginBottom: '28px', lineHeight: 1.55, maxWidth: '460px' }}>
                Comprendre vos émotions au travail <em style={{ color: 'var(--cobalt)' }}>avant que votre corps décide à votre place.</em>
              </p>
              <p style={{ fontSize: '12px', color: 'var(--gris)', marginBottom: '18px', fontWeight: 400 }}>
                Recevez immédiatement le PDF — aucun engagement, aucun spam.
              </p>
              <LeadForm id="hero-form" onSuccess={handleSuccess} />
            </div>

            <div className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transitionDelay: '.3s' }}>
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/couverture-guide.webp"
                alt="Guide Vous tenez. Mais jusqu'à quand ?"
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

        {/* ═══════════ VOUS RECONNAISSEZ-VOUS ═══════════ */}
        <section style={{ background: 'var(--lin-2)', padding: '80px 0' }}>
          <div className="container">
            <div className="reveal" style={{ marginBottom: '40px' }}>
              <div className="section-tag">Vous reconnaissez-vous ?</div>
              <h2 className="section-title">Ces pensées qui <em>tournent en boucle…</em></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {painPoints.map((text, i) => (
                <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.06}s`, background: 'var(--paper)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(28,43,74,.06)', borderLeft: '3px solid var(--amber)' }}>
                  <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '15px', lineHeight: 1.65, color: 'var(--texte)' }}>{text}</p>
                </div>
              ))}
            </div>
            <p className="reveal" style={{ marginTop: '32px', fontSize: '15px', color: 'var(--corps)', lineHeight: 1.8, maxWidth: '640px' }}>
              Ce n'est pas de la faiblesse. Ce n'est pas de la sensibilité excessive. Ce sont des <strong style={{ color: 'var(--texte)' }}>signaux d'alarme</strong> — des messages de votre système nerveux qui vous indique qu'il est en état de surcharge depuis trop longtemps.
            </p>
          </div>
        </section>

        {/* ═══════════ CONTENU DU GUIDE ═══════════ */}
        <section style={{ background: 'var(--lin)', padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '40px' }}>
              <div className="section-tag">Ce que contient le guide</div>
              <h2 className="section-title">19 pages pour comprendre<br />ce qui se passe <em>en vous.</em></h2>
              <div style={{ width: '48px', height: '2px', background: 'var(--amber)', marginTop: '24px', boxShadow: '3px 3px 0 rgba(242,161,46,.25)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chapters.map((ch, i) => (
                <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.06}s`, display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', borderRadius: '12px', background: 'var(--paper)', boxShadow: '0 2px 12px rgba(28,43,74,.04)' }}>
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
                « Mon rôle n'est pas de vous faire changer.<br />
                C'est de vous aider à redevenir vous-même. »
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--cobalt-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-serif)', fontWeight: 500, color: 'var(--lin)', fontSize: '14px', flexShrink: 0 }}>AZ</div>
                <div>
                  <p style={{ fontFamily: 'var(--f-serif)', fontWeight: 500, color: 'var(--texte)', fontSize: '15px', marginBottom: '2px' }}>Alain Zenatti</p>
                  <p style={{ color: 'var(--gris)', fontSize: '12px', lineHeight: 1.5 }}>
                    Maître Praticien en Hypnose Ericksonienne et Auto-Hypnose<br />Praticien en Communication Relationnelle (approche Jacques Salomé) · NovaHypnose · Paris 4e
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

export default GuideEbook;
