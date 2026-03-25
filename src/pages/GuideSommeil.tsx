import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { submitSommeilLead } from '@/lib/services/sommeilLeadService';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Lock from 'lucide-react/dist/esm/icons/lock';
import Mail from 'lucide-react/dist/esm/icons/mail';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

/* ─────────────────────────────────────────────
   Landing page isolée — Guide "Le Sommeil, Votre Allié Secret"
   Pas de Header / Footer — page isolée
   Formulaire prénom/email/localisation → Brevo liste 9 → page merci
   ───────────────────────────────────────────── */

// ── Inline lead form ──
interface LeadFormProps {
  id: string;
  onSuccess: (prenom: string) => void;
  buttonLabel?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({
  id,
  onSuccess,
  buttonLabel = 'Recevoir le guide →',
}) => {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      setErrorMsg('Veuillez sélectionner votre localisation.');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    const result = await submitSommeilLead(prenom, email, location);

    setLoading(false);
    if (result.success) {
      onSuccess(prenom);
    } else {
      setErrorMsg(result.error || 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-nova-neutral-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-nova-blue/40 focus:border-nova-blue transition-all text-[0.95rem]';

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-3">
      <input
        id={`${id}-prenom`}
        type="text"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        placeholder="Votre prénom"
        required
        className={inputClasses}
      />
      <input
        id={`${id}-email`}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.fr"
        required
        className={inputClasses}
      />
      <div className="flex flex-col gap-2">
        <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all text-[0.95rem] ${location === 'Paris Île-de-France' ? 'border-nova-blue bg-nova-blue/5 text-nova-blue-dark font-medium' : 'border-gray-200 bg-white text-nova-neutral-dark'}`}>
          <input
            type="radio"
            name={`${id}-location`}
            value="Paris Île-de-France"
            checked={location === 'Paris Île-de-France'}
            onChange={(e) => setLocation(e.target.value)}
            className="accent-nova-blue"
          />
          Paris Île-de-France
        </label>
        <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all text-[0.95rem] ${location === 'Autre, étranger' ? 'border-nova-blue bg-nova-blue/5 text-nova-blue-dark font-medium' : 'border-gray-200 bg-white text-nova-neutral-dark'}`}>
          <input
            type="radio"
            name={`${id}-location`}
            value="Autre, étranger"
            checked={location === 'Autre, étranger'}
            onChange={(e) => setLocation(e.target.value)}
            className="accent-nova-blue"
          />
          Autre, étranger
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg bg-nova-orange text-white font-semibold text-[0.95rem] hover:bg-nova-orange-dark active:scale-[0.98] transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2"
      >
        {loading ? 'Envoi en cours…' : (
          <>
            {buttonLabel}
            <ArrowRight size={18} />
          </>
        )}
      </button>
      <p className="text-xs text-gray-400 text-center pt-1 flex items-center justify-center gap-1">
        <Lock size={12} />
        Aucun spam. Vos données restent confidentielles.
      </p>
      {errorMsg && (
        <p className="text-xs text-red-500 text-center mt-2">{errorMsg}</p>
      )}
    </form>
  );
};

// ── Chapter row ──
const ChapterRow: React.FC<{ num: number; title: string; desc: string }> = ({ num, title, desc }) => (
  <div className="flex gap-4 items-start p-5 rounded-xl bg-nova-neutral hover:bg-nova-blue-light/20 transition-colors group">
    <span className="font-serif text-3xl font-bold text-nova-blue/15 leading-none flex-shrink-0 w-9 group-hover:text-nova-blue/25 transition-colors">
      {num}
    </span>
    <div>
      <p className="font-medium text-nova-blue-dark text-[0.92rem] mb-1">{title}</p>
      <p className="text-gray-500 text-[0.82rem] leading-snug">{desc}</p>
    </div>
  </div>
);

// ── Data ──
const stats = [
  { value: '1 / 5', label: 'Français souffre d\'insomnie chronique' },
  { value: '6h42', label: 'Durée moyenne de sommeil en semaine' },
  { value: '+81 %', label: 'De sommeil profond avec l\'hypnose (Sleep, 2014)' },
];

const chapters = [
  {
    title: 'Pourquoi votre corps a besoin de dormir',
    desc: 'Les deux mécanismes biologiques qui orchestrent votre sommeil — et comment les utiliser à votre avantage.',
  },
  {
    title: 'Ce qui se passe vraiment pendant la nuit',
    desc: 'Cycles, sommeil profond, REM : chaque stade a un rôle précis. Comprendre l\'architecture change tout.',
  },
  {
    title: 'Les 5 saboteurs silencieux de votre sommeil',
    desc: 'Caféine, alcool, écrans, température, rumination — et comment les neutraliser dès ce soir.',
  },
  {
    title: 'Ce que la science dit sur l\'hypnose',
    desc: 'Des études EEG publiées dans Sleep et Nature montrent un impact objectif et mesurable sur la qualité du sommeil.',
  },
  {
    title: 'Un programme pratique de 30 jours',
    desc: 'Rituel du coucher en 5 étapes, techniques anti-rumination, règles d\'hygiène du sommeil fondées sur la science.',
  },
];

// ── Main page component ──
const GuideSommeil: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = useCallback((prenom: string) => {
    navigate('/guide-sommeil/merci', { state: { prenom } });
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Guide gratuit — Le Sommeil, Votre Allié Secret | NovaHypnose</title>
        <meta
          name="description"
          content="Téléchargez gratuitement le guide de 17 pages sur le sommeil et l'hypnose. Programme pratique de 30 jours pour retrouver un sommeil profond — sans médicaments."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/guide-sommeil" />
      </Helmet>

      {/* ═══════════ HERO ═══════════ */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center bg-gradient-to-br from-white via-nova-neutral to-nova-blue-light/30 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-nova-blue/5 pointer-events-none" />

        {/* Left: content */}
        <div className="px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 order-2 lg:order-1 animate-fade-in">
          <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-5">
            Guide gratuit &middot; PDF &middot; 17 pages
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.8rem] font-bold leading-[1.15] text-nova-blue-dark mb-5">
            Le Sommeil,
            <br />
            <span className="text-nova-orange italic">Votre Allié Secret</span>
          </h1>

          <p className="text-gray-600 text-[1.05rem] leading-relaxed mb-8 max-w-lg">
            Près d'un Français sur cinq souffre d'insomnie chronique. Nuits blanches, réveils à 3h du matin,
            fatigue collée au réveil… Ce guide est fait pour vous —{' '}
            <span className="text-gray-500">sans médicaments, sans effets secondaires.</span>
          </p>

          {/* Inline form */}
          <div className="bg-white rounded-2xl p-7 shadow-lg max-w-md lg:max-w-lg">
            <p className="font-serif font-bold text-nova-blue-dark text-lg mb-1">
              Téléchargez le guide gratuitement
            </p>
            <p className="text-gray-400 text-sm mb-5">
              Recevez immédiatement le PDF — aucun engagement, aucun spam.
            </p>
            <LeadForm id="hero-form" onSuccess={handleSuccess} />
          </div>
        </div>

        {/* Right: ebook cover */}
        <div className="flex justify-center items-center px-6 md:px-12 py-10 md:py-20 order-1 lg:order-2 animate-fade-in">
          <img
            src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/EBOOKSOMMEIL.webp"
            alt="Guide Le Sommeil, Votre Allié Secret — 17 pages"
            className="w-[260px] sm:w-[300px] lg:w-[340px] rounded-xl shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500"
            loading="eager"
          />
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <div className="bg-nova-blue-dark text-white py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.value}>
              <p className="font-serif text-3xl font-bold text-nova-orange mb-1">{s.value}</p>
              <p className="text-white/70 text-sm leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ CONTENU DU GUIDE ═══════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3">
            Ce que vous allez découvrir
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-2">
            17 pages pour retrouver
            <br />
            un sommeil profond et réparateur
          </h2>
          <div className="w-12 h-0.5 bg-nova-orange mb-10" />

          <div className="space-y-3">
            {chapters.map((ch, i) => (
              <ChapterRow key={i} num={i + 1} title={ch.title} desc={ch.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ AUTEUR ═══════════ */}
      <section className="py-16 px-6 bg-nova-neutral">
        <div className="max-w-3xl mx-auto">
          <div className="w-10 h-0.5 bg-nova-orange mb-6" />
          <p className="font-serif italic text-nova-blue-dark text-[1.05rem] leading-relaxed mb-8">
            « Votre sommeil est là, quelque part en vous.
            <br />
            Parfois il a juste besoin d'un peu d'aide pour revenir. »
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-nova-blue-dark flex items-center justify-center font-serif font-bold text-white text-sm flex-shrink-0">
              AZ
            </div>
            <div>
              <p className="font-serif font-bold text-nova-blue-dark text-sm">Alain Zenatti</p>
              <p className="text-gray-500 text-xs leading-snug">
                Hypnothérapeute certifié · Maître Praticien en Hypnose Ericksonienne
                <br />
                NovaHypnose · Paris 4e
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA FINAL AVEC FORMULAIRE ═══════════ */}
      <section id="telecharger" className="py-20 px-6 bg-gradient-to-b from-nova-blue-light/20 to-white">
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 sm:p-10 shadow-xl text-center">
          <h2 className="font-serif text-2xl font-bold text-nova-blue-dark mb-2 leading-snug">
            Recevez votre guide
            <br />
            gratuitement
          </h2>
          <p className="text-gray-400 text-sm mb-7 leading-relaxed">
            Téléchargement immédiat après validation. Aucun spam, désabonnement en un clic.
          </p>
          <LeadForm id="final-form" onSuccess={handleSuccess} buttonLabel="Recevoir le guide" />

          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-gray-500 text-xs">
            <div className="flex flex-col items-center gap-1">
              <FileText size={16} className="text-nova-orange" />
              <span>PDF &middot; 17 pages</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Mail size={16} className="text-nova-orange" />
              <span>Envoi par email</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Clock size={16} className="text-nova-orange" />
              <span>Réception en ~7 min</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Shield size={16} className="text-nova-orange" />
              <span>0&euro; &middot; Sans engagement</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MINI FOOTER ═══════════ */}
      <div className="bg-nova-blue-dark text-white/50 text-xs text-center py-5 px-4">
        <p className="mb-1 flex items-center justify-center gap-1.5">
          <MapPin size={12} />
          16 rue Saint-Antoine, 75004 Paris
        </p>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} NovaHypnose &middot; Alain Zenatti &middot; Hypnothérapeute Paris 4e
          <br />
          Conformément au RGPD — Désabonnement libre à tout moment.
        </p>
      </div>
    </>
  );
};

export default GuideSommeil;
