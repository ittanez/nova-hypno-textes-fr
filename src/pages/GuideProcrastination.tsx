import React, { useState, useCallback } from 'react';
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

/* ─────────────────────────────────────────────
   Landing page isolée — Guide "Libérez-vous de la Procrastination"
   Pas de Header / Footer — page isolée
   Formulaire prénom/email → envoi par email → page merci
   ───────────────────────────────────────────── */

// ── Inline lead form ──
interface LeadFormProps {
  id: string;
  onSuccess: (prenom: string) => void;
  buttonLabel?: string;
  compact?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({
  id,
  onSuccess,
  buttonLabel = 'Recevoir le guide gratuitement',
  compact = false,
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

    const result = await submitProcrastinationLead(prenom, email, location);

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
      <div>
        {!compact && (
          <label htmlFor={`${id}-prenom`} className="block text-sm font-medium text-nova-neutral-dark mb-1.5">
            Prénom
          </label>
        )}
        <input
          id={`${id}-prenom`}
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          placeholder="Votre prénom"
          required
          className={inputClasses}
        />
      </div>
      <div>
        {!compact && (
          <label htmlFor={`${id}-email`} className="block text-sm font-medium text-nova-neutral-dark mb-1.5">
            Email
          </label>
        )}
        <input
          id={`${id}-email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          required
          className={inputClasses}
        />
      </div>
      <div>
        {!compact && (
          <p className="block text-sm font-medium text-nova-neutral-dark mb-1.5">
            Où êtes-vous situé(e) ?
          </p>
        )}
        {compact && (
          <p className="block text-sm font-medium text-nova-neutral-dark mb-1.5">
            Où êtes-vous situé(e) ?
          </p>
        )}
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
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg bg-nova-orange text-white font-semibold text-[0.95rem] hover:bg-nova-orange-dark active:scale-[0.98] transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2"
      >
        {loading ? (
          'Envoi en cours…'
        ) : (
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

// ── Data ──
const benefits = [
  {
    icon: Target,
    title: 'Stratégies anti-procrastination',
    desc: "8 techniques éprouvées pour passer à l'action immédiatement, même quand la motivation manque.",
  },
  {
    icon: CheckCircle,
    title: '100% pratique et testée',
    desc: "Pas de théorie abstraite. Chaque stratégie est expliquée étape par étape, validée auprès de 500+ clients.",
  },
  {
    icon: Briefcase,
    title: 'Spécial professionnels',
    desc: "Conçu pour cadres/employés. Techniques adaptées aux contraintes professionnelles et aux délais serrés.",
  },
  {
    icon: Brain,
    title: 'Méthode NovaHypnose',
    desc: "Protocoles d'hypnose propriétaires associés à la psychologie comportementale pour arrêter de remettre à demain.",
  },
  {
    icon: BarChart3,
    title: 'Base scientifique',
    desc: "Procrastination, motivation, discipline. Fondée sur la neuropsychologie, validation clinique garantie.",
  },
  {
    icon: Wrench,
    title: 'Outils immédiats',
    desc: "Guide complet avec exercices, checklist et protocoles hypnotiques à pratiquer dès ce soir.",
  },
];

const chapters = [
  { title: 'Introduction', desc: "Comprendre la procrastination : causes réelles et mythes" },
  { title: 'Chapitre 1', desc: "Les 3 neurotransmetteurs de la motivation (et comment les optimiser)" },
  { title: 'Chapitre 2', desc: 'La peur sous-jacente : identifier vos patterns de blocage' },
  { title: 'Chapitre 3', desc: 'Technique 1 : Le Découpage Radical (Break It Down Method)' },
  { title: 'Chapitre 4', desc: 'Technique 2 : L\'Engagement Public et la Responsabilité' },
  { title: 'Chapitre 5', desc: 'Technique 3 : L\'Ancre de Motivation (hypnose + PNL)' },
  { title: 'Chapitre 6', desc: 'Technique 4 : La Restructuration Cognitive Anti-Perfectionnisme' },
  { title: 'Chapitre 7', desc: 'Technique 5 : Les Rituels de Passage a l\'Action' },
  { title: 'Chapitre 8', desc: 'Gestion des rechutes : revenir sur les rails rapidement' },
  { title: 'Bonus', desc: '2 protocoles hypnotiques guidés (MP3) + Kit de suivi 30 jours' },
];

const testimonials = [
  {
    text: "J'ai arrêté de remettre mes projets au lendemain. La technique du découpage radical a changé mon approche du travail.",
    author: 'Thomas D.',
    role: 'Chef de projet IT',
  },
  {
    text: "Enfin quelqu'un qui parle de la peur réelle derrière la procrastination. Les protocoles hypnotiques m'ont débloqué.",
    author: 'Sophie M.',
    role: 'Directrice RH',
  },
  {
    text: "Gratuit, complet, et vraiment efficace. En 2 semaines, je m'attaque aux tâches difficiles sans traîner.",
    author: 'Marc L.',
    role: 'Consultant en Management',
  },
];

// ── Main page component ──
const GuideProcrastination: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = useCallback((prenom: string) => {
    navigate('/guide-procrastination/merci', { state: { prenom } });
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Guide Gratuit : Vaincre la Procrastination par l'Hypnose | NovaHypnose</title>
        <meta
          name="description"
          content="Téléchargez gratuitement le guide d'Alain Zenatti pour arrêter de procrastiner grâce à l'hypnose. 8 techniques concrètes, protocoles hypnotiques guidés et exercices pratiques."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/guide-procrastination" />
      </Helmet>

      {/* ═══════════ HERO ═══════════ */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center bg-gradient-to-br from-nova-blue-dark via-nova-blue to-nova-blue-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

        {/* Left: content */}
        <div className="px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 order-2 lg:order-1 relative z-10">
          <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-5">
            Guide gratuit &middot; 32 pages &middot; 8 techniques
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.8rem] xl:text-5xl font-bold leading-[1.15] text-white mb-5">
            Libérez-vous de la<br />
            <span className="text-nova-orange italic">procrastination</span>
          </h1>

          <h2 className="text-lg sm:text-xl font-medium text-white/90 mb-4">
            Passez à l'action aujourd'hui. Arrêtez de remettre au lendemain.
          </h2>

          <p className="text-white/60 text-[1.05rem] leading-relaxed mb-8 max-w-lg">
            32 pages, 8 techniques testées, 2 protocoles hypnotiques — recevez-le gratuitement par email.
          </p>

          {/* Inline form */}
          <div className="bg-white rounded-2xl p-7 shadow-lg max-w-md lg:max-w-lg">
            <p className="font-serif font-bold text-nova-blue-dark text-lg mb-1">
              Recevez votre guide gratuitement
            </p>
            <p className="text-gray-400 text-sm mb-5">
              Remplissez le formulaire — le guide arrive par email en quelques minutes
            </p>
            <LeadForm id="hero-form" onSuccess={handleSuccess} />
          </div>
        </div>

        {/* Right: ebook cover */}
        <div className="flex justify-center items-center px-6 md:px-12 py-10 md:py-20 order-1 lg:order-2 relative z-10">
          <img
            src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/couverture-ebook-procrastination.webp"
            alt="Guide hypnose procrastination - Alain Zenatti"
            className="w-[260px] sm:w-[300px] lg:w-[340px] rounded-xl shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500"
            loading="eager"
          />
        </div>
      </section>

      {/* ═══════════ BÉNÉFICES ═══════════ */}
      <section className="py-20 px-6 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark text-center mb-12">
            Ce que vous allez découvrir en 32 pages
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-nova-neutral rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <b.icon size={28} className="text-nova-orange mb-3" />
                <h4 className="font-semibold text-nova-blue-dark mb-2">{b.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SOMMAIRE ═══════════ */}
      <section className="py-20 px-6 lg:py-24 bg-nova-neutral">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark text-center mb-10">
            Sommaire détaillé
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {chapters.map((ch, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-5 rounded-xl bg-white hover:shadow-sm transition-all"
              >
                <span className="font-serif text-2xl font-bold text-nova-blue/20 leading-none flex-shrink-0 w-8">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-nova-blue-dark text-sm mb-0.5">{ch.title}</p>
                  <p className="text-gray-500 text-sm leading-snug">{ch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TÉMOIGNAGES ═══════════ */}
      <section className="py-20 px-6 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark text-center mb-12">
            Ce qu'en disent les lecteurs
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-nova-neutral rounded-xl p-6 border-t-4 border-nova-orange"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-nova-orange fill-nova-orange" />
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-nova-blue-dark font-semibold text-sm">{t.author}</p>
                <p className="text-gray-400 text-xs">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ AUTEUR ═══════════ */}
      <section className="py-20 px-6 lg:py-24 bg-nova-neutral">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark text-center mb-10">
            Qui suis-je ?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
            <img
              src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp"
              alt="Alain Zenatti — Hypnothérapeute Paris"
              className="w-28 h-28 rounded-full object-cover mx-auto md:mx-0 flex-shrink-0 shadow-lg"
              loading="lazy"
            />

            <div className="text-center md:text-left">
              <h4 className="font-serif text-xl font-bold text-nova-blue-dark mb-1">
                Alain Zenatti
              </h4>
              <p className="text-nova-orange font-medium text-sm tracking-wide mb-4">
                Hypnothérapeute &middot; Maître Praticien en Hypnose Ericksonienne
              </p>

              <ul className="space-y-2 text-gray-600 text-sm leading-relaxed mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-nova-green flex-shrink-0 mt-0.5" />
                  <span><strong>5 ans</strong> d'expérience en cabinet (Paris 4e)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-nova-green flex-shrink-0 mt-0.5" />
                  <span><strong>Formations entreprises</strong> : finance, santé, tech, industrie</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-nova-green flex-shrink-0 mt-0.5" />
                  <span><strong>Méthode NovaHypnose</strong> : 12-15 protocoles propriétaires</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-nova-green flex-shrink-0 mt-0.5" />
                  <span><strong>Approche scientifique</strong> : neuroplasticité + validation clinique</span>
                </li>
              </ul>

              <p className="text-gray-500 text-sm leading-relaxed">
                Mon objectif : aider les professionnels à dépasser la procrastination et accélérer leurs résultats grâce aux techniques concrètes de l'hypnose et de la psychologie comportementale.
              </p>
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

export default GuideProcrastination;
