import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { submitProcrastinationLead } from '@/lib/services/procrastinationLeadService';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Star from 'lucide-react/dist/esm/icons/star';
import Brain from 'lucide-react/dist/esm/icons/brain';
import Briefcase from 'lucide-react/dist/esm/icons/briefcase';
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3';
import Wrench from 'lucide-react/dist/esm/icons/wrench';
import Target from 'lucide-react/dist/esm/icons/target';
import Lock from 'lucide-react/dist/esm/icons/lock';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import '@/styles/preview-charte.css';

/* ─────────────────────────────────────────────
   Landing page isolée — Guide "Libérez-vous de la Procrastination"
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

const LeadForm: React.FC<LeadFormProps> = ({ id, onSuccess, buttonLabel = 'Recevoir le guide gratuitement' }) => {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) { setErrorMsg('Veuillez sélectionner votre localisation.'); return; }
    setLoading(true); setErrorMsg('');
    const result = await submitProcrastinationLead(prenom, email, location);
    setLoading(false);
    if (result.success) { onSuccess(prenom); }
    else { setErrorMsg(result.error || 'Une erreur est survenue. Veuillez réessayer.'); }
  };

  return (
    <form id={id} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label style={{ fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase', color: '#8A9BB8', fontWeight: 500 }}>Prénom</label>
      <input id={`${id}-prenom`} type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)}
        placeholder="Votre prénom" required style={inputStyle} />
      <label style={{ fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase', color: '#8A9BB8', fontWeight: 500, marginTop: '4px' }}>Email</label>
      <input id={`${id}-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.fr" required style={inputStyle} />
      <p style={{ fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase', color: '#8A9BB8', fontWeight: 500, margin: '4px 0 0' }}>
        Où êtes-vous situé(e) ?
      </p>
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

const benefits = [
  { icon: Target, title: 'Stratégies anti-procrastination', desc: "8 techniques éprouvées pour passer à l'action immédiatement, même quand la motivation manque." },
  { icon: CheckCircle, title: '100% pratique et testée', desc: "Pas de théorie abstraite. Chaque stratégie est expliquée étape par étape, validée auprès de 500+ clients." },
  { icon: Briefcase, title: 'Spécial professionnels', desc: "Conçu pour cadres/employés. Techniques adaptées aux contraintes professionnelles et aux délais serrés." },
  { icon: Brain, title: 'Méthode NovaHypnose', desc: "Protocoles d'hypnose propriétaires associés à la psychologie comportementale pour arrêter de remettre à demain." },
  { icon: BarChart3, title: 'Base scientifique', desc: "Procrastination, motivation, discipline. Fondée sur la neuropsychologie, validation clinique garantie." },
  { icon: Wrench, title: 'Outils immédiats', desc: "Guide complet avec exercices, checklist et protocoles hypnotiques à pratiquer dès ce soir." },
];

const chapters = [
  { title: 'Introduction', desc: "Comprendre la procrastination : causes réelles et mythes" },
  { title: 'Chapitre 1', desc: "Les 3 neurotransmetteurs de la motivation (et comment les optimiser)" },
  { title: 'Chapitre 2', desc: 'La peur sous-jacente : identifier vos patterns de blocage' },
  { title: 'Chapitre 3', desc: 'Technique 1 : Le Découpage Radical (Break It Down Method)' },
  { title: 'Chapitre 4', desc: "Technique 2 : L'Engagement Public et la Responsabilité" },
  { title: 'Chapitre 5', desc: "Technique 3 : L'Ancre de Motivation (hypnose + PNL)" },
  { title: 'Chapitre 6', desc: 'Technique 4 : La Restructuration Cognitive Anti-Perfectionnisme' },
  { title: 'Chapitre 7', desc: "Technique 5 : Les Rituels de Passage à l'Action" },
  { title: 'Chapitre 8', desc: 'Gestion des rechutes : revenir sur les rails rapidement' },
  { title: 'Bonus', desc: '2 protocoles hypnotiques guidés (MP3) + Kit de suivi 30 jours' },
];

const testimonials = [
  { text: "J'ai arrêté de remettre mes projets au lendemain. La technique du découpage radical a changé mon approche du travail.", author: 'Thomas D.', role: 'Chef de projet IT' },
  { text: "Enfin quelqu'un qui parle de la peur réelle derrière la procrastination. Les protocoles hypnotiques m'ont débloqué.", author: 'Sophie M.', role: 'Directrice RH' },
  { text: "Gratuit, complet, et vraiment efficace. En 2 semaines, je m'attaque aux tâches difficiles sans traîner.", author: 'Marc L.', role: 'Consultant en Management' },
];

const GuideProcrastination: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleSuccess = useCallback((prenom: string) => {
    navigate('/guide-procrastination/merci', { state: { prenom } });
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
        <title>Guide Gratuit : Vaincre la Procrastination par l'Hypnose | NovaHypnose</title>
        <meta name="description" content="Téléchargez gratuitement le guide d'Alain Zenatti pour arrêter de procrastiner par l'hypnose. 8 techniques concrètes et protocoles pratiques." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/guide-procrastination" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "Book",
          "@id": "https://novahypnose.fr/guide-procrastination#book",
          "name": "Vaincre la Procrastination par l'Hypnose",
          "description": "Guide pratique pour arrêter de procrastiner grâce à l'hypnose. 8 techniques concrètes et protocoles pratiques par Alain Zenatti.",
          "url": "https://novahypnose.fr/guide-procrastination", "inLanguage": "fr-FR",
          "bookFormat": "https://schema.org/EBook", "isAccessibleForFree": true,
          "author": { "@id": "https://novahypnose.fr/#person" },
          "publisher": { "@id": "https://novahypnose.fr/#localbusiness" },
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
        })}</script>
      </Helmet>

      <div className="cz" ref={rootRef}>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-full-p">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={7} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={12} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
            <filter id="paperGrain-p" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves={4} seed={3} />
              <feColorMatrix values="0 0 0 0 .15  0 0 0 0 .12  0 0 0 0 .08  0 0 0 .15 0" />
            </filter>
          </defs>
        </svg>

        {/* ═══════════ HERO ═══════════ */}
        <section className="hero" style={{ paddingTop: '80px' }}>
          <div className="hero__bg" aria-hidden="true">
            <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full-p)">
                <path d="M 1440 0 L 840 0 C 740 60, 700 140, 720 240 C 740 360, 820 420, 960 440 C 1100 460, 1280 400, 1400 320 C 1460 280, 1480 200, 1440 100 Z" fill="#F2A12E" opacity="0.8" />
              </g>
              <g filter="url(#riso-full-p)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 0 700 C 100 620, 280 580, 460 600 C 600 615, 720 680, 800 760 C 880 840, 860 940, 800 1000 L 0 1000 Z" fill="#2B4BA0" opacity="0.85" />
              </g>
              <rect width="1440" height="1000" filter="url(#paperGrain-p)" opacity=".2" />
            </svg>
          </div>

          <div className="zen-mark" aria-hidden="true">agir</div>

          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center', paddingBottom: '100px', position: 'relative', zIndex: 5, width: '100%' }}>
            <div className="reveal hero__panel" style={{ transitionDelay: '.1s' }}>
              <div className="tag">Guide gratuit · 32 pages · 8 techniques</div>
              <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 300, lineHeight: 1.08, color: 'var(--texte)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Libérez-vous de la<br />
                <em style={{ fontStyle: 'italic', color: 'var(--amber)', fontWeight: 400 }}>procrastination</em>
              </h1>
              <div className="hero__rule" />
              <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 1.8vw, 21px)', color: 'var(--texte)', marginBottom: '28px', lineHeight: 1.55, maxWidth: '460px' }}>
                Passez à l'action aujourd'hui. <em style={{ color: 'var(--cobalt)' }}>Arrêtez de remettre au lendemain.</em>
              </p>
              <p style={{ fontSize: '12px', color: 'var(--gris)', marginBottom: '18px', fontWeight: 400 }}>
                Remplissez le formulaire — le guide arrive par email en quelques minutes.
              </p>
              <LeadForm id="hero-form" onSuccess={handleSuccess} />
            </div>

            <div className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transitionDelay: '.3s' }}>
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/couverture-ebook-procrastination.webp"
                alt="Guide hypnose procrastination - Alain Zenatti"
                style={{ width: 'clamp(220px, 28vw, 340px)', borderRadius: '16px', boxShadow: '12px 12px 0 rgba(28,43,74,.18)', transform: 'rotate(-2deg)', transition: 'transform 0.5s' }}
                loading="eager"
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(-2deg)')}
              />
            </div>
          </div>
        </section>

        {/* ═══════════ BÉNÉFICES ═══════════ */}
        <section style={{ background: 'var(--lin-2)', padding: '80px 0' }}>
          <div className="container">
            <div className="reveal" style={{ marginBottom: '40px' }}>
              <div className="section-tag">Ce que vous allez découvrir</div>
              <h2 className="section-title">32 pages, 8 techniques <em>éprouvées.</em></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {benefits.map((b, i) => (
                <div key={b.title} className="reveal" style={{ transitionDelay: `${i * 0.08}s`, background: 'var(--paper)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(28,43,74,.06)', borderTop: '3px solid var(--amber)' }}>
                  <b.icon size={28} style={{ color: 'var(--amber)', marginBottom: '12px' }} />
                  <h4 style={{ fontFamily: 'var(--f-serif)', fontSize: '19px', fontWeight: 400, color: 'var(--texte)', marginBottom: '8px', lineHeight: 1.2 }}>{b.title}</h4>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--corps)' }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SOMMAIRE ═══════════ */}
        <section style={{ background: 'var(--lin)', padding: '80px 0' }}>
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="section-tag">Plan du guide</div>
              <h2 className="section-title">Sommaire <em>détaillé.</em></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
              {chapters.map((ch, i) => (
                <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.05}s`, display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', borderRadius: '12px', background: 'var(--paper)', boxShadow: '0 2px 12px rgba(28,43,74,.04)' }}>
                  <span style={{ fontFamily: 'var(--f-serif)', fontSize: '28px', fontWeight: 300, color: 'rgba(43,75,160,.2)', lineHeight: 1, flexShrink: 0, width: '32px' }}>{i + 1}</span>
                  <div>
                    <p style={{ fontWeight: 500, color: 'var(--cobalt-2)', fontSize: '13px', marginBottom: '4px' }}>{ch.title}</p>
                    <p style={{ color: 'var(--gris)', fontSize: '13px', lineHeight: 1.55 }}>{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ TÉMOIGNAGES ═══════════ */}
        <section style={{ background: 'var(--lin-2)', padding: '80px 0' }}>
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="section-tag">Témoignages</div>
              <h2 className="section-title">Ce qu'en disent les <em>lecteurs.</em></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {testimonials.map((t, i) => (
                <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s`, background: 'var(--paper)', borderRadius: '16px', padding: '24px', borderTop: '4px solid var(--amber)', boxShadow: '0 4px 20px rgba(28,43,74,.05)' }}>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} style={{ color: 'var(--amber)', fill: 'var(--amber)' }} />)}
                  </div>
                  <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '16px', lineHeight: 1.7, color: 'var(--texte)', marginBottom: '16px' }}>"{t.text}"</p>
                  <p style={{ fontWeight: 600, color: 'var(--cobalt)', fontSize: '14px' }}>{t.author}</p>
                  <p style={{ color: 'var(--gris)', fontSize: '12px' }}>{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ AUTEUR ═══════════ */}
        <section style={{ background: 'var(--lin)', padding: '80px 0' }}>
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="section-tag">À propos</div>
              <h2 className="section-title">Qui suis-<em>je ?</em></h2>
            </div>
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '48px', alignItems: 'flex-start', maxWidth: '820px', margin: '0 auto' }}>
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp"
                alt="Alain Zenatti — Hypnothérapeute Paris"
                style={{ width: '112px', height: '112px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '8px 8px 0 rgba(242,161,46,.28)' }}
                loading="lazy"
              />
              <div>
                <h4 style={{ fontFamily: 'var(--f-serif)', fontSize: '26px', fontWeight: 400, color: 'var(--texte)', marginBottom: '4px' }}>Alain Zenatti</h4>
                <p style={{ color: 'var(--amber)', fontWeight: 500, fontSize: '13px', letterSpacing: '.05em', marginBottom: '20px' }}>
                  Hypnothérapeute · Maître Praticien en Hypnose Ericksonienne
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {[
                    "<strong>5 ans</strong> d'expérience en cabinet (Paris 4e)",
                    "<strong>Formations entreprises</strong> : finance, santé, tech, industrie",
                    "<strong>Méthode NovaHypnose</strong> : 12-15 protocoles propriétaires",
                    "<strong>Approche scientifique</strong> : neuroplasticité + validation clinique",
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--corps)', lineHeight: 1.6 }}>
                      <CheckCircle size={16} style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px' }} />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
                <p style={{ color: 'var(--gris)', fontSize: '14px', lineHeight: 1.8 }}>
                  Mon objectif : aider les professionnels à dépasser la procrastination et accélérer leurs résultats grâce aux techniques concrètes de l'hypnose et de la psychologie comportementale.
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

export default GuideProcrastination;
