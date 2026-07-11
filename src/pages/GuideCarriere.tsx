import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { submitCarriereLead } from '@/lib/services/carriereLeadService';
import { safeJSONStringify } from '@/lib/seo-utils';
import Lock from 'lucide-react/dist/esm/icons/lock';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import '@/styles/preview-charte.css';

/* ─────────────────────────────────────────────
   Landing page isolée — Guide "Ma Carrière, Enfin Débloquée"
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
    const trimmedPrenom = prenom.trim();
    const trimmedEmail = email.trim();
    if (!trimmedPrenom || !trimmedEmail) { setErrorMsg('Veuillez remplir tous les champs requis.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) { setErrorMsg('Veuillez saisir une adresse email valide.'); return; }
    if (!location) { setErrorMsg('Veuillez sélectionner votre localisation.'); return; }
    setLoading(true); setErrorMsg('');
    const result = await submitCarriereLead(trimmedPrenom, trimmedEmail, location);
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

const manifestations = [
  { title: "Syndrome de l'imposteur", desc: 'Vous doutez de votre légitimité malgré vos compétences, vous craignez que vos réussites soient découvertes comme un « coup de chance ».' },
  { title: 'Auto-sabotage récurrent', desc: 'Vous compromettez vos propres succès au moment décisif — retard, oubli, conflit provoqué inconsciemment.' },
  { title: 'Stagnation professionnelle', desc: 'Vous restez au même poste depuis des années alors que vous en avez largement les capacités.' },
  { title: 'Blocage à la décision', desc: "Vous analysez indéfiniment sans jamais trancher, paralysé par la peur de faire le mauvais choix." },
];

const chapters = [
  { title: 'Pourquoi vous restez bloqué malgré vos compétences', desc: "Comprendre le rôle des croyances inconscientes dans la stagnation professionnelle." },
  { title: "Le syndrome de l'imposteur : d'où il vient vraiment", desc: "Identifier les expériences fondatrices qui ont créé le doute, pour cesser de vous juger à travers elles." },
  { title: "Reconnaître l'auto-sabotage avant qu'il n'agisse", desc: "Repérer les signaux précoces du mécanisme pour l'interrompre avant qu'il ne compromette une opportunité." },
  { title: "La technique de l'ancrage de légitimité", desc: "Un protocole d'auto-hypnose pour installer une perception plus juste de vos capacités, avant un entretien ou une prise de parole clé." },
  { title: 'Oser la prochaine étape', desc: "Passer de l'intention à l'action : demander, postuler, négocier, se lancer — sans attendre de se sentir totalement prêt." },
];

const GuideCarriere: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleSuccess = useCallback((prenom: string) => {
    navigate('/guide-carriere/merci', { state: { prenom } });
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
        <title>Guide gratuit — Ma Carrière, Enfin Débloquée | NovaHypnose</title>
        <meta name="description" content="Téléchargez gratuitement le guide d'Alain Zenatti pour lever vos blocages professionnels par l'hypnose. Syndrome de l'imposteur, auto-sabotage, stagnation — et un protocole pratique." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/guide-carriere" />
        <script type="application/ld+json">{safeJSONStringify({
          "@context": "https://schema.org", "@type": "Book",
          "@id": "https://novahypnose.fr/guide-carriere#book",
          "name": "Ma Carrière, Enfin Débloquée",
          "description": "Guide pratique pour lever les blocages professionnels grâce à l'hypnose. Syndrome de l'imposteur, auto-sabotage, stagnation, et un protocole pour passer à l'action, par Alain Zenatti.",
          "url": "https://novahypnose.fr/guide-carriere", "inLanguage": "fr-FR",
          "bookFormat": "https://schema.org/EBook", "isAccessibleForFree": true,
          "author": { "@id": "https://novahypnose.fr/#person" },
          "publisher": { "@id": "https://novahypnose.fr/#localbusiness" },
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
        })}</script>
      </Helmet>

      <div className="cz" ref={rootRef}>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-full-cr">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={14} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={19} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
            <filter id="paperGrain-cr" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves={4} seed={9} />
              <feColorMatrix values="0 0 0 0 .15  0 0 0 0 .12  0 0 0 0 .08  0 0 0 .15 0" />
            </filter>
          </defs>
        </svg>

        {/* ═══════════ HERO ═══════════ */}
        <section className="hero" style={{ paddingTop: '80px' }}>
          <div className="hero__bg" aria-hidden="true">
            <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full-cr)">
                <path d="M 0 0 L 560 0 C 660 50, 720 120, 740 210 C 760 310, 680 390, 580 410 C 460 434, 300 400, 180 340 C 90 294, 30 220, 0 150 Z" fill="#2B4BA0" opacity="0.85" />
              </g>
              <g filter="url(#riso-full-cr)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 940 620 C 1060 540, 1220 520, 1340 580 C 1430 624, 1480 664, 1480 720 L 1480 1040 L 640 1040 C 720 960, 820 850, 940 620 Z" fill="#F2A12E" opacity="0.75" />
              </g>
              <rect width="1440" height="1000" filter="url(#paperGrain-cr)" opacity=".2" />
            </svg>
          </div>

          <div className="zen-mark" aria-hidden="true">élan</div>

          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center', paddingBottom: '100px', position: 'relative', zIndex: 5, width: '100%' }}>
            <div className="reveal hero__panel" style={{ transitionDelay: '.1s' }}>
              <div className="tag">Guide gratuit · PDF</div>
              <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 300, lineHeight: 1.08, color: 'var(--texte)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Ma Carrière,<br />
                <em style={{ fontStyle: 'italic', color: 'var(--cobalt)', fontWeight: 400 }}>Enfin Débloquée</em>
              </h1>
              <div className="hero__rule" />
              <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 1.8vw, 21px)', color: 'var(--texte)', marginBottom: '28px', lineHeight: 1.55, maxWidth: '460px' }}>
                Vos compétences sont là. Ce qui manque, c'est <em style={{ color: 'var(--cobalt)' }}>l'autorisation intérieure d'avancer.</em>
              </p>
              <p style={{ fontSize: '12px', color: 'var(--gris)', marginBottom: '18px', fontWeight: 400 }}>
                Recevez immédiatement le PDF — aucun engagement, aucun spam.
              </p>
              <LeadForm id="hero-form" onSuccess={handleSuccess} />
            </div>

            <div className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transitionDelay: '.3s' }}>
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/carriere.png"
                alt="Guide Ma Carrière, Enfin Débloquée"
                style={{ width: 'clamp(220px, 28vw, 340px)', borderRadius: '16px', boxShadow: '12px 12px 0 rgba(28,43,74,.18)', transform: 'rotate(-2deg)', transition: 'transform 0.5s' }}
                loading="eager"
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(-2deg)')}
              />
            </div>
          </div>
        </section>

        {/* ═══════════ MANIFESTATIONS ═══════════ */}
        <section style={{ background: 'var(--lin-2)', padding: '80px 0' }}>
          <div className="container">
            <div className="reveal" style={{ marginBottom: '40px' }}>
              <div className="section-tag">Vous vous reconnaissez ?</div>
              <h2 className="section-title">Ce que vit une carrière<br /><em>freinée de l'intérieur.</em></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {manifestations.map((m) => (
                <div key={m.title} className="reveal" style={{ background: 'var(--paper)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(28,43,74,.06)', borderTop: '3px solid var(--amber)' }}>
                  <h4 style={{ fontFamily: 'var(--f-serif)', fontSize: '18px', fontWeight: 400, color: 'var(--texte)', marginBottom: '8px', lineHeight: 1.2 }}>{m.title}</h4>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--corps)' }}>{m.desc}</p>
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
              <h2 className="section-title">Un guide pour débloquer votre carrière,<br /><em>sans forcer.</em></h2>
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
                « Ce n'est pas la compétence qui manque.<br />
                C'est la permission que vous ne vous êtes pas encore donnée. »
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

export default GuideCarriere;
