import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { submitSommeilLead } from '@/lib/services/sommeilLeadService';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Star from 'lucide-react/dist/esm/icons/star';
import Moon from 'lucide-react/dist/esm/icons/moon';
import Brain from 'lucide-react/dist/esm/icons/brain';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Target from 'lucide-react/dist/esm/icons/target';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Lock from 'lucide-react/dist/esm/icons/lock';
import Mail from 'lucide-react/dist/esm/icons/mail';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

/* ─────────────────────────────────────────────
   Landing page isolée — Guide "Le Sommeil, mon allié secret"
   Pas de Header / Footer — page isolée
   Formulaire prénom/email/localisation → Brevo liste 9 → page merci
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
    icon: Moon,
    title: 'Retrouver un sommeil profond',
    desc: 'Techniques hypnotiques éprouvées pour s\'endormir facilement et rester endormi toute la nuit.',
  },
  {
    icon: Brain,
    title: 'Comprendre votre sommeil',
    desc: 'Les cycles du sommeil, le rôle des rêves et les mécanismes neurologiques expliqués simplement.',
  },
  {
    icon: Zap,
    title: 'Arrêter les ruminations nocturnes',
    desc: 'Protocoles spécifiques pour calmer le mental et éteindre le flux de pensées à 2h du matin.',
  },
  {
    icon: Heart,
    title: 'Gérer le stress pré-sommeil',
    desc: 'Rituels de décompression et inductions hypnotiques pour préparer corps et esprit au repos.',
  },
  {
    icon: Target,
    title: 'Méthode NovaHypnose',
    desc: 'Protocoles propriétaires développés et testés sur 5 ans de pratique clinique en cabinet.',
  },
  {
    icon: CheckCircle,
    title: 'Résultats durables',
    desc: 'Pas de somnifères, pas de dépendance. Une méthode naturelle pour un sommeil récupérateur à vie.',
  },
];

const chapters = [
  { title: 'Introduction', desc: 'Pourquoi l\'hypnose révolutionne l\'approche du sommeil' },
  { title: 'Chapitre 1', desc: 'Les cycles du sommeil et la fenêtre hypnotique naturelle' },
  { title: 'Chapitre 2', desc: 'Insomnie d\'endormissement : protocole de décompression 5 min' },
  { title: 'Chapitre 3', desc: 'Réveils nocturnes : technique de retour au sommeil rapide' },
  { title: 'Chapitre 4', desc: 'Ruminations et anxiété nocturne : l\'ancre de sérénité' },
  { title: 'Chapitre 5', desc: 'Rituel du soir : programmation hypnotique pré-sommeil' },
  { title: 'Chapitre 6', desc: 'Stress chronique et hygiène de sommeil : le protocole complet' },
  { title: 'Bonus', desc: 'Script d\'autohypnose guidé pour l\'endormissement (à lire ou enregistrer)' },
];

const testimonials = [
  {
    text: "Après 3 ans d'insomnie, j'ai enfin trouvé une méthode qui fonctionne. Le protocole du chapitre 3 m'a sauvé la vie.",
    author: 'Isabelle M.',
    role: 'Directrice RH',
  },
  {
    text: "Je prenais des somnifères depuis 2 ans. En 3 semaines avec ce guide, j'ai arrêté complètement. Incroyable.",
    author: 'Laurent P.',
    role: 'Ingénieur Informatique',
  },
  {
    text: "Le rituel du soir décrit dans ce guide est devenu indispensable. Je dors 8h d'un trait maintenant.",
    author: 'Sophie D.',
    role: 'Médecin généraliste',
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
        <title>Télécharger "Le Sommeil, mon allié secret" - Guide Gratuit | NovaHypnose</title>
        <meta
          name="description"
          content="Recevez gratuitement le guide sommeil d'Alain Zenatti. Techniques d'hypnose pour retrouver un sommeil profond, arrêter les insomnies et les ruminations nocturnes."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/guide-sommeil" />
      </Helmet>

      {/* ═══════════ HERO ═══════════ */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center bg-gradient-to-br from-nova-blue-dark via-nova-blue to-nova-blue-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

        {/* Left: content */}
        <div className="px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 order-2 lg:order-1 relative z-10">
          <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-5">
            Guide gratuit &middot; Hypnose &amp; Sommeil
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.8rem] xl:text-5xl font-bold leading-[1.15] text-white mb-5">
            Retrouvez enfin<br />un sommeil{' '}
            <span className="text-nova-orange italic">profond et réparateur</span>
          </h1>

          <h2 className="text-lg sm:text-xl font-medium text-white/90 mb-4">
            Le Sommeil, mon allié secret — par Alain Zenatti
          </h2>

          <p className="text-white/60 text-[1.05rem] leading-relaxed mb-8 max-w-lg">
            Découvrez les protocoles d'hypnose pour en finir avec l'insomnie, les réveils nocturnes et les ruminations — recevez-le gratuitement par email.
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
            src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/ebook-sommeil.webp"
            alt="Guide Le Sommeil mon allié secret — Alain Zenatti NovaHypnose"
            className="w-[260px] sm:w-[300px] lg:w-[340px] rounded-xl shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </section>

      {/* ═══════════ BÉNÉFICES ═══════════ */}
      <section className="py-20 px-6 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark text-center mb-12">
            Ce que vous allez découvrir dans ce guide
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
                  <span><strong>1000+ clients</strong> accompagnés individuellement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-nova-green flex-shrink-0 mt-0.5" />
                  <span><strong>Spécialiste sommeil</strong> : insomnies, réveils nocturnes, anxiété nocturne</span>
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
                Le sommeil est au cœur de ma pratique. Après avoir accompagné des centaines de patients souffrant d'insomnie, j'ai voulu mettre à disposition mes protocoles les plus efficaces dans ce guide accessible à tous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA FINAL AVEC FORMULAIRE ═══════════ */}
      <section id="telecharger" className="py-20 px-6 lg:py-24 bg-gradient-to-b from-nova-blue-light/20 to-white">
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl text-center">
          <h3 className="font-serif text-2xl font-bold text-nova-blue-dark mb-2 leading-snug">
            Prêt à retrouver<br />un sommeil réparateur ?
          </h3>
          <p className="text-gray-400 text-sm mb-7 leading-relaxed">
            Recevez le guide directement dans votre boîte mail. Aucun spam, vos données restent confidentielles.
          </p>
          <LeadForm
            id="final-form"
            onSuccess={handleSuccess}
            buttonLabel="Recevoir le guide"
          />

          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-gray-500 text-xs">
            <div className="flex flex-col items-center gap-1">
              <FileText size={16} className="text-nova-orange" />
              <span>PDF &middot; Guide complet</span>
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
