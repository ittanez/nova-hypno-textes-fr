import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import BookOpen from 'lucide-react/dist/esm/icons/book-open';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import Shield from 'lucide-react/dist/esm/icons/shield';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Lock from 'lucide-react/dist/esm/icons/lock';
import X from 'lucide-react/dist/esm/icons/x';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

/* ─────────────────────────────────────────────
   Landing page autonome — Lead magnet ebook
   « Vous tenez. Mais jusqu'à quand ? »
   Pas de Header / Footer — page isolée
   ───────────────────────────────────────────── */

// ── Inline form component ──
interface LeadFormProps {
  id: string;
  onSuccess: () => void;
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: connecter à votre service d'email (Mailchimp, ConvertKit, Supabase…)
    // Exemple : await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ prenom, email }) });
    await new Promise((r) => setTimeout(r, 1200));

    setLoading(false);
    onSuccess();
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
    </form>
  );
};

// ── Success message ──
const SuccessMessage: React.FC = () => (
  <div className="text-center py-8 animate-fade-in">
    <div className="w-16 h-16 bg-nova-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
      <CheckCircle className="text-nova-green" size={36} />
    </div>
    <h3 className="text-xl font-serif font-bold text-nova-blue-dark mb-2">
      C'est envoyé !
    </h3>
    <p className="text-gray-500 text-sm leading-relaxed">
      Vérifiez votre boîte email dans quelques instants.
      <br />À très bientôt.
    </p>
  </div>
);

// ── Pain-point card ──
const PainCard: React.FC<{ text: string }> = ({ text }) => (
  <div className="bg-white rounded-xl p-6 border-l-4 border-nova-orange shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
    <p className="text-gray-700 italic leading-relaxed text-[0.95rem]">{text}</p>
  </div>
);

// ── Chapter row ──
const ChapterRow: React.FC<{ num: number; title: string; desc: string }> = ({
  num,
  title,
  desc,
}) => (
  <div className="flex gap-4 items-start p-5 rounded-xl bg-nova-neutral hover:bg-nova-blue-light/20 transition-colors group">
    <span className="font-serif text-3xl font-bold text-nova-blue/15 leading-none flex-shrink-0 w-9 group-hover:text-nova-blue/25 transition-colors">
      {num}
    </span>
    <div>
      <p className="font-medium text-nova-blue-dark text-[0.92rem] mb-1">{title}</p>
      <p className="text-gray-500 text-[0.82rem] leading-snug mb-0">{desc}</p>
    </div>
  </div>
);

// ── Main page component ──
const GuideEbook: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [heroSuccess, setHeroSuccess] = useState(false);
  const [finalSuccess, setFinalSuccess] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  // Scroll-reveal observer
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Modal helpers
  const openModal = useCallback(() => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalSuccess(false);
    document.body.style.overflow = '';
  }, []);

  const painPoints = [
    '« Je me sens épuisé même après avoir dormi. Je ne comprends plus pourquoi je fais ce travail. »',
    '« Je m\u2019énerve pour rien — un email, une remarque — et je passe la journée à m\u2019en vouloir. »',
    '« J\u2019arrive à tenir en réunion, mais une fois seul, quelque chose lâche. Et je ne sais pas quoi. »',
    '« Mes collègues semblent gérer. Pourquoi moi, je n\u2019y arrive plus comme avant ? »',
    '« Je n\u2019ose pas en parler — ni à mon manager, ni à ma famille. Je dois tenir. »',
    '« Je dors mal, je rumine, je ne déconnecte plus. Mon corps envoie des signaux que j\u2019ignore. »',
  ];

  const chapters = [
    { title: 'Non, vous n\u2019êtes pas « trop sensible »', desc: 'Comprendre pourquoi cette étiquette efface la vraie cause de votre épuisement.' },
    { title: 'Ce que vos émotions signalent vraiment', desc: 'Irritabilité, larmes, colère froide, vide intérieur : décoder les 5 émotions les plus incomprises au travail.' },
    { title: 'Pourquoi les combattre aggrave tout', desc: 'L\u2019effet rebond de la suppression émotionnelle — et l\u2019épuisement invisible de « tenir ».' },
    { title: 'Les croyances qui vous maintiennent coincé', desc: '« Un pro ne craque pas », « les autres gèrent » — 4 croyances limitantes et leurs recadrages.' },
    { title: 'La communication relationnelle', desc: 'La méthode ESPERE de Jacques Salomé : exprimer ce qu\u2019on vit sans attaquer, sans se trahir.' },
    { title: 'Comment l\u2019hypnose aide là où la volonté échoue', desc: 'Ce que l\u2019hypnose ericksonienne fait concrètement sur les émotions, le sommeil et les relations.' },
    { title: '3 pratiques simples dès maintenant', desc: 'Respiration + scan corporel, phrase Salomé du soir, mini-visualisation de 5 minutes.' },
    { title: 'Et si vous alliez plus loin ?', desc: 'Un échange gratuit de 30 minutes pour faire le point — sans engagement.' },
  ];

  return (
    <>
      <Helmet>
        <title>Guide gratuit — Vous tenez. Mais jusqu'à quand ? | NovaHypnose</title>
        <meta
          name="description"
          content="Téléchargez gratuitement le guide de 19 pages pour comprendre vos émotions au travail. Pratiques concrètes basées sur l'hypnose ericksonienne."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://novahypnose.fr/guide-emotions-travail" />
      </Helmet>

      {/* ═══════════ HERO ═══════════ */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center bg-gradient-to-br from-white via-nova-neutral to-nova-blue-light/30 relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-nova-blue/5 pointer-events-none" />

        {/* Left: content */}
        <div className="px-6 md:px-12 lg:px-16 py-16 md:py-20 order-2 md:order-1 animate-fade-in">
          <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-5">
            Guide gratuit &middot; Téléchargement immédiat
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.8rem] font-bold leading-[1.15] text-nova-blue-dark mb-5">
            Vous tenez.
            <br />
            <span className="text-nova-orange italic">Mais jusqu'à quand ?</span>
          </h1>

          <p className="text-gray-600 text-[1.05rem] leading-relaxed mb-8 max-w-lg">
            Comprendre vos émotions au travail avant que votre corps décide à votre place.
            <br />
            <span className="text-gray-500">Un guide pratique de 19 pages pour les cadres et professionnels épuisés.</span>
          </p>

          {/* Inline form */}
          <div className="bg-white rounded-2xl p-7 shadow-lg max-w-md">
            {heroSuccess ? (
              <SuccessMessage />
            ) : (
              <>
                <p className="font-serif font-bold text-nova-blue-dark text-lg mb-1">
                  Recevez votre guide gratuitement
                </p>
                <p className="text-gray-400 text-sm mb-5">
                  Remplissez le formulaire — accès immédiat par email
                </p>
                <LeadForm id="hero-form" onSuccess={() => setHeroSuccess(true)} />
              </>
            )}
          </div>
        </div>

        {/* Right: ebook cover */}
        <div className="flex justify-center items-center px-6 md:px-12 py-10 md:py-20 order-1 md:order-2 animate-fade-in">
          <img
            src="/images/couverture-guide.webp"
            alt="Guide gratuit — Vous tenez. Mais jusqu'à quand ?"
            className="max-w-[280px] md:max-w-[340px] w-full rounded shadow-2xl -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-transform duration-500"
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.background = 'linear-gradient(135deg, #233C67, #4470AD)';
              target.style.width = '280px';
              target.style.height = '400px';
              target.style.borderRadius = '8px';
            }}
          />
        </div>
      </section>

      {/* ═══════════ SOCIAL PROOF BAND ═══════════ */}
      <div className="bg-nova-blue-dark text-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-3">
          {[
            { icon: <BookOpen size={18} className="opacity-70" />, text: '19 pages concrètes' },
            { icon: <Clock size={18} className="opacity-70" />, text: 'Lecture en 20 minutes' },
            { icon: <Sparkles size={18} className="opacity-70" />, text: '3 pratiques applicables dès ce soir' },
            { icon: <Shield size={18} className="opacity-70" />, text: 'Basé sur l\u2019hypnose ericksonienne' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-sm">
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ SECTION MIROIR — PAIN POINTS ═══════════ */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3">
          Vous reconnaissez-vous ?
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-10">
          Ces pensées qui tournent en boucle…
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {painPoints.map((text, i) => (
            <div key={i} className="reveal-on-scroll opacity-0 translate-y-4 transition-all duration-500">
              <PainCard text={text} />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-10 bg-nova-blue-light/20 border-l-4 border-nova-blue rounded-r-xl p-6">
          <p className="font-serif italic text-nova-blue-dark text-[1.05rem] leading-relaxed mb-0">
            « Ce guide est pour vous si vous vous êtes déjà dit :
            <br />
            <strong>je ne me comprends plus moi-même.</strong> »
          </p>
        </div>

        <p className="mt-8 text-gray-600 leading-relaxed">
          Ce n'est pas de la faiblesse. Ce n'est pas de la sensibilité excessive. Ce sont des <strong className="text-nova-blue-dark">signaux d'alarme</strong> — des messages de votre système nerveux qui vous indique qu'il est en état de surcharge depuis trop longtemps.
        </p>
      </section>

      {/* ═══════════ CONTENU DU GUIDE ═══════════ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3">
            Ce que contient le guide
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-2">
            19 pages pour comprendre
            <br />
            ce qui se passe en vous
          </h2>
          <div className="w-12 h-0.5 bg-nova-orange mb-6" />
          <p className="text-gray-500 max-w-xl leading-relaxed mb-10">
            Pas de théorie abstraite. Pas de conseils génériques. Ce guide va droit au cœur de ce que vous vivez — avec des mots qui résonnent, des exemples que vous reconnaîtrez, et des pratiques que vous pouvez tester dès ce soir.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {chapters.map((ch, i) => (
              <div key={i} className="reveal-on-scroll opacity-0 translate-y-4 transition-all duration-500">
                <ChapterRow num={i + 1} title={ch.title} desc={ch.desc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA INTERMÉDIAIRE ═══════════ */}
      <section className="relative bg-gradient-to-br from-nova-blue-dark to-nova-blue py-20 px-6 text-center overflow-hidden">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug mb-4 relative z-10">
          Prêt à comprendre ce que
          <br />
          votre corps essaie de vous dire ?
        </h2>
        <p className="text-white/70 max-w-md mx-auto text-[0.95rem] leading-relaxed mb-8 relative z-10">
          Ce guide est gratuit. Il ne vous engage à rien. Il peut changer la façon dont vous regardez ce que vous traversez.
        </p>
        <button
          onClick={openModal}
          className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-white text-nova-blue-dark font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
        >
          Télécharger le guide gratuitement
          <ChevronDown size={18} />
        </button>
      </section>

      {/* ═══════════ AUTEUR ═══════════ */}
      <section className="py-20 px-6 bg-nova-neutral">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
          {/* Photo placeholder */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-nova-blue to-nova-blue-dark flex items-center justify-center text-white text-2xl font-serif font-bold mx-auto md:mx-0 flex-shrink-0 shadow-lg">
            AZ
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-nova-blue-dark mb-1">
              Alain Zenatti
            </h3>
            <p className="text-nova-orange font-medium text-sm tracking-wide mb-4">
              Maître Praticien en Hypnose Ericksonienne &middot; Paris 4e
            </p>
            <div className="w-10 h-0.5 bg-nova-orange mb-4 mx-auto md:mx-0" />
            <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-3">
              Je suis hypnothérapeute spécialisé dans l'accompagnement des personnes en souffrance au travail. Maître Praticien en Hypnose Ericksonienne et Auto-Hypnose, Praticien en Communication Relationnelle selon l'approche de Jacques Salomé.
            </p>
            <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-4">
              Mon approche repose sur l'écoute, la bienveillance et la précision thérapeutique. L'objectif n'est pas de vous faire changer — c'est de vous aider à redevenir vous-même.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1.5 justify-center md:justify-start">
              <MapPin size={14} />
              16 rue Saint-Antoine, 75004 Paris
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ FORM FINAL ═══════════ */}
      <section className="py-20 px-6 bg-gradient-to-b from-nova-blue-light/20 to-white">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 sm:p-10 shadow-xl text-center">
          {finalSuccess ? (
            <SuccessMessage />
          ) : (
            <>
              <h2 className="font-serif text-2xl font-bold text-nova-blue-dark mb-2 leading-snug">
                Recevez votre guide
                <br />
                gratuitement
              </h2>
              <p className="text-gray-400 text-sm mb-7 leading-relaxed">
                Téléchargement immédiat après validation. Aucun spam, désabonnement en un clic.
              </p>
              <LeadForm
                id="final-form"
                onSuccess={() => setFinalSuccess(true)}
                buttonLabel="Recevoir le guide"
              />
            </>
          )}
        </div>
      </section>

      {/* ═══════════ MINI FOOTER ═══════════ */}
      <div className="bg-nova-blue-dark text-white/50 text-xs text-center py-5 px-4">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} NovaHypnose &middot; Alain Zenatti &middot; Hypnothérapeute Paris 4e
          <br />
          Conformément au RGPD — Désabonnement libre à tout moment.
        </p>
      </div>

      {/* ═══════════ MODAL ═══════════ */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-nova-neutral-dark/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-2xl p-8 sm:p-10 w-[90%] max-w-md relative shadow-2xl animate-fade-in">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fermer"
            >
              <X size={22} />
            </button>

            {modalSuccess ? (
              <SuccessMessage />
            ) : (
              <>
                <h3 className="font-serif text-xl font-bold text-nova-blue-dark mb-1">
                  Télécharger le guide
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Entrez vos coordonnées pour recevoir votre guide immédiatement par email.
                </p>
                <LeadForm
                  id="modal-form"
                  onSuccess={() => setModalSuccess(true)}
                  buttonLabel="Recevoir le guide"
                  compact
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GuideEbook;
