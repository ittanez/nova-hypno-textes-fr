import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { submitAutohypnoseLead } from '@/lib/services/autohypnoseLeadService';
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
   Landing page isolée — Guide "L'Autohypnose au Quotidien"
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
  color: selected ? '#1C2B4A' : '#1C2B4A',
  fontWeight: selected ? 500 : 400,
  transition: 'border-color 0.2s, background 0.2s',
});

interface LeadFormProps {
  id: string;
  onSuccess: (prenom: string) => void;
  buttonLabel?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({
  id,
  onSuccess,
  buttonLabel = 'Recevoir le guide gratuitement',
}) => {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) { setErrorMsg('Veuillez sélectionner votre localisation.'); return; }
    setLoading(true);
    setErrorMsg('');
    const result = await submitAutohypnoseLead(prenom, email, location);
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
  { icon: Target, title: '9 protocoles complets', desc: "Prêts à utiliser dès ce soir. Du sas de décompression 5 min au protocole de confiance approfondi." },
  { icon: CheckCircle, title: '100% pratique', desc: "Pas de théorie abstraite. Chaque technique est expliquée étape par étape, testée sur 1000+ clients." },
  { icon: Briefcase, title: 'Spécial professionnels', desc: "Conçu pour cadres/employés. Techniques utilisables au bureau, adaptées aux contraintes pro." },
  { icon: Brain, title: 'Méthode NovaHypnose', desc: "Aperçu exclusif de mes protocoles propriétaires, utilisés en cabinet depuis 5 ans." },
  { icon: BarChart3, title: 'Base scientifique', desc: "Neuroplasticité, méta-analyses, validation clinique. Efficacité prouvée, pas effet placebo." },
  { icon: Wrench, title: 'Totalement autonome', desc: "Devenez indépendant dans votre pratique. Guide complet d'installation et troubleshooting." },
];

const chapters = [
  { title: 'Introduction', desc: "Pourquoi l'autohypnose fonctionne (base scientifique)" },
  { title: 'Chapitre 1', desc: "Comprendre l'hypnose : 5 phases + 3 fusibles de sécurité" },
  { title: 'Chapitre 2', desc: 'Stress & anxiété : Sas décompression + Ancre anti-stress' },
  { title: 'Chapitre 3', desc: 'Confiance en soi : La forêt enchantée + affirmations efficaces' },
  { title: 'Chapitre 4', desc: 'Sommeil : Décompte descendant + gestion réveils nocturnes' },
  { title: 'Chapitre 5', desc: 'Phobies : Double dissociation (technique PNL adaptée)' },
  { title: 'Chapitre 6', desc: "Gestion émotions : Changement d'état + protocole colère" },
  { title: 'Chapitre 7', desc: 'Performance pro : Rayon de focus + préparation enjeux' },
  { title: 'Chapitre 8', desc: 'Votre protocole personnel en 6 étapes' },
  { title: 'Bonus', desc: '2 protocoles NovaHypnose détaillés (Socle inébranlable + Étincelle)' },
];

const testimonials = [
  { text: "Enfin un guide sans blabla ! J'ai installé l'ancre anti-stress en 1 semaine, elle fonctionne en réunion difficile.", author: 'Sarah M.', role: 'Directrice Marketing' },
  { text: "Le protocole sommeil a changé ma vie. Plus de ruminations à 2h du matin. Merci pour ce guide gratuit de qualité.", author: 'Thomas R.', role: 'Consultant IT' },
  { text: "J'étais sceptique sur l'autohypnose. La base scientifique m'a convaincu, les résultats m'ont bluffé.", author: 'Marie L.', role: 'Contrôleuse de gestion' },
];

const GuideAutohypnose: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleSuccess = useCallback((prenom: string) => {
    navigate('/guide-autohypnose/merci', { state: { prenom } });
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
        <title>Télécharger "L'Autohypnose au Quotidien" - Guide Gratuit | NovaHypnose</title>
        <meta name="description" content="Recevez gratuitement le guide d'autohypnose d'Alain Zenatti. 37 pages, 9 protocoles pour gérer le stress, retrouver confiance et améliorer votre bien-être." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/guide-autohypnose" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "Book",
          "@id": "https://novahypnose.fr/guide-autohypnose#book",
          "name": "L'Autohypnose au Quotidien",
          "description": "Guide pratique d'auto-hypnose en 37 pages : 9 protocoles pour gérer le stress, retrouver confiance et améliorer son bien-être au quotidien.",
          "url": "https://novahypnose.fr/guide-autohypnose", "inLanguage": "fr-FR",
          "bookFormat": "https://schema.org/EBook", "numberOfPages": 37, "isAccessibleForFree": true,
          "author": { "@id": "https://novahypnose.fr/#person" },
          "publisher": { "@id": "https://novahypnose.fr/#localbusiness" },
          "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
        })}</script>
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

        {/* ═══════════ HERO ═══════════ */}
        <section className="hero" style={{ paddingTop: '80px' }}>
          <div className="hero__bg" aria-hidden="true">
            <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full)">
                <path d="M 160 60 C 340 10, 600 60, 780 160 C 880 220, 960 250, 1060 200 C 1200 140, 1360 180, 1440 280 L 1440 0 L 0 0 Z" fill="#F2A12E" opacity="0.85" />
              </g>
              <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 380 700 C 500 590, 680 570, 820 630 C 960 690, 1100 690, 1260 650 C 1360 625, 1440 640, 1480 690 L 1480 1040 L 0 1040 L 0 920 C 100 840, 220 780, 380 700 Z" fill="#2B4BA0" opacity="0.9" />
              </g>
              <rect width="1440" height="1000" filter="url(#paperGrain)" opacity=".2" />
            </svg>
          </div>

          <div className="zen-mark" aria-hidden="true">soi</div>

          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center', paddingBottom: '100px', position: 'relative', zIndex: 5, width: '100%' }}>
            <div className="reveal hero__panel" style={{ transitionDelay: '.1s' }}>
              <div className="tag">Guide gratuit · 37 pages · 9 protocoles</div>
              <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 300, lineHeight: 1.08, color: 'var(--texte)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Reprenez la main<br />
                sur votre <em style={{ fontStyle: 'italic', color: 'var(--cobalt)', fontWeight: 400 }}>bien-être</em>
              </h1>
              <div className="hero__rule" />
              <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px, 1.8vw, 22px)', color: 'var(--texte)', marginBottom: '28px', lineHeight: 1.5, maxWidth: '460px' }}>
                Le guide d'autohypnose pour les <em style={{ color: 'var(--cobalt)' }}>professionnels sous pression.</em>
              </p>
              <p style={{ fontSize: '12px', color: 'var(--gris)', marginBottom: '18px', fontWeight: 400 }}>
                Remplissez le formulaire — le guide arrive par email en quelques minutes.
              </p>
              <LeadForm id="hero-form" onSuccess={handleSuccess} />
            </div>

            <div className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transitionDelay: '.3s' }}>
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/ebookautohypnose.webp"
                alt="Guide L'Autohypnose au Quotidien — 37 pages, 9 protocoles"
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
              <h2 className="section-title">37 pages, 9 protocoles <em>prêts à l'emploi.</em></h2>
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
                    '<strong>5 ans</strong> d'expérience en cabinet (Paris 4e)',
                    '<strong>Formations entreprises</strong> : finance, santé, tech, industrie',
                    '<strong>Méthode NovaHypnose</strong> : 12-15 protocoles propriétaires',
                    '<strong>Approche scientifique</strong> : neuroplasticité + validation clinique',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--corps)', lineHeight: 1.6 }}>
                      <CheckCircle size={16} style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px' }} />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
                <p style={{ color: 'var(--gris)', fontSize: '14px', lineHeight: 1.8 }}>
                  Mon objectif : démocratiser l'autohypnose auprès des professionnels qui n'ont pas le temps pour du développement personnel classique, mais qui ont besoin d'outils concrets, efficaces, et immédiatement applicables.
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

export default GuideAutohypnose;
