import React from 'react';
import { Helmet } from 'react-helmet';
import { safeJSONStringify } from '@/lib/seo-utils';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Phone from 'lucide-react/dist/esm/icons/phone';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Brain from 'lucide-react/dist/esm/icons/brain';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Star from 'lucide-react/dist/esm/icons/star';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Users from 'lucide-react/dist/esm/icons/users';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Target from 'lucide-react/dist/esm/icons/target';
import Moon from 'lucide-react/dist/esm/icons/moon';
import Flame from 'lucide-react/dist/esm/icons/flame';
import Headphones from 'lucide-react/dist/esm/icons/headphones';
import MessagesSquare from 'lucide-react/dist/esm/icons/messages-square';
import Anchor from 'lucide-react/dist/esm/icons/anchor';

/* ─────────────────────────────────────────────
   Landing page — Offre accompagnement 6 séances
   Avatar : salariés & professionnels en souffrance au travail
   Hypnose Ericksonienne + Auto-hypnose + Communication Relationnelle (J. Salomé)
   ───────────────────────────────────────────── */

const RESALIB_URL = 'https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris';
const WHATSAPP_URL = 'https://wa.me/33649358089?text=Bonjour%20Alain%2C%20j%27ai%20une%20question%20';
const PHONE_URL = 'tel:0649358089';

const LandingProfessionnels: React.FC = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Accompagnement hypnose pour professionnels en souffrance au travail — Paris",
    "description": "Programme de 6 séances d'hypnose ericksonienne, auto-hypnose et communication relationnelle pour les salariés et professionnels en souffrance au travail. Stress, burn-out, sommeil, émotions, relations. 997 € — Cabinet Paris 4ème.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie — accompagnement professionnel",
    "offers": {
      "@type": "Offer",
      "price": "997",
      "priceCurrency": "EUR",
      "description": "Programme complet de 6 séances individuelles sur 10 à 12 semaines"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://novahypnose.fr" },
      { "@type": "ListItem", "position": 2, "name": "Accompagnement professionnels", "item": "https://novahypnose.fr/hypnose-professionnels-paris" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Accompagnement hypnose professionnels Paris | Stress, burn-out — 6 séances — Alain Zenatti</title>
        <meta name="description" content="Programme de 6 séances pour les professionnels en souffrance au travail. Hypnose ericksonienne, auto-hypnose, communication relationnelle. Retrouvez énergie, sommeil et sérénité. 997 €. Paris 4ème." />
        <meta name="keywords" content="hypnose professionnels paris, burn-out hypnose, souffrance travail hypnose, stress cadres, syndrome imposteur, accompagnement hypnose paris, communication relationnelle Jacques Salomé" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-professionnels-paris" />
        <meta property="og:title" content="Accompagnement hypnose — 6 séances pour sortir de la souffrance au travail | NovaHypnose Paris" />
        <meta property="og:description" content="Programme complet pour les professionnels en souffrance au travail. Hypnose, auto-hypnose, communication relationnelle. 997 € — 6 séances sur 10-12 semaines." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-professionnels-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(serviceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* ═══════════ 1. HERO ═══════════ */}
      <section className="relative bg-gradient-to-br from-nova-blue-dark via-[#1e3a5f] to-nova-blue overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-nova-orange mb-5">
            Accompagnement en 6 séances — Paris 4e
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Transformez la souffrance au travail<br />
            <span className="text-teal-300">en une énergie plus sereine.</span>
          </h1>

          <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Un programme de <strong className="text-white">6 séances sur mesure</strong> qui combine
            hypnose ericksonienne, auto-hypnose et communication relationnelle
            pour vous aider à <strong className="text-white">retrouver sommeil, clarté et sérénité</strong> — durablement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href={RESALIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-nova-orange hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-lg shadow-lg shadow-orange-500/25"
            >
              Demander un appel gratuit
              <ArrowRight size={20} />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold rounded-xl transition-colors"
            >
              <MessageCircle size={18} />
              Discuter sur WhatsApp
            </a>
          </div>

          {/* Pour qui */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-white/60 text-sm">
            <span className="flex items-center gap-2 justify-center">
              <CheckCircle size={16} className="text-teal-400" />
              Cadres & managers sous pression
            </span>
            <span className="flex items-center gap-2 justify-center">
              <CheckCircle size={16} className="text-teal-400" />
              Indépendants & dirigeants en surchauffe
            </span>
            <span className="flex items-center gap-2 justify-center">
              <CheckCircle size={16} className="text-teal-400" />
              Salariés au bord du craquage
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════ 2. CE QUE VOUS VIVEZ — PROBLÈMES ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3 text-center">
            Ce que vous vivez en ce moment
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-4 text-center">
            Le masque tient. Mais derrière, quelque chose s'effrite.
          </h2>
          <p className="text-gray-500 text-[0.95rem] leading-relaxed text-center max-w-2xl mx-auto mb-10">
            Que vous soyez cadre, manager, employé, indépendant ou responsable d'équipe, vous jonglez chaque jour avec une surcharge : objectifs élevés, délais serrés, réorganisations, pression de résultats, tensions relationnelles, sentiment de ne jamais en faire assez.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: Brain,
                text: "Le stress chronique vous épuise mentalement. Ruminations, pensées en boucle, difficulté à se concentrer. Vous travaillez mentalement même au lit, sous la douche, en famille. Impossible de « couper ».",
              },
              {
                icon: Zap,
                text: "Vous êtes irritable, à fleur de peau. Un mail anodin vous agace, un retard vous met en colère. L'enthousiasme a disparu — remplacé par une fatigue persistante que même le week-end ne répare pas.",
              },
              {
                icon: Heart,
                text: "Votre corps parle à votre place. Oppression thoracique, mâchoire serrée, dos bloqué, maux de ventre. Le stress s'est installé physiquement. Votre sommeil est perturbé.",
              },
              {
                icon: Shield,
                text: "Vos relations en pâtissent — au travail comme à la maison. Vous n'osez plus poser de limites, ou vous explosez. Le syndrome de l'imposteur rôde. Vous pouvez vous sentir au bord du craquage.",
              },
              {
                icon: Clock,
                text: "Vous avez peut-être tout essayé — sport, méditation, coaching. Ça aide un temps, puis le mécanisme se réenclenche. Parce que le problème n'est pas à la surface.",
              },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mt-0.5">
                  <Icon className="text-red-400" size={20} />
                </div>
                <p className="text-gray-600 text-[0.95rem] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8 italic">
            Si vous avez hoché la tête en lisant, la suite est pour vous.
          </p>
        </div>
      </section>

      {/* ═══════════ 3. CE QUE VOUS SOUHAITEZ — TRANSFORMATION ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-teal-600 mb-3 text-center">
            Ce que vous souhaitez
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-8 text-center">
            Sortir du mode survie. Revenir à quelque chose de plus vivant.
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-4">
              Vous aspirez à vivre votre travail autrement. Pas à tout quitter — mais à <strong className="text-nova-blue-dark">retrouver une énergie stable</strong>, dormir mieux, vous réveiller plus clair et disponible. Poser des limites sans culpabilité. Améliorer vos relations au travail. Retrouver du sens dans ce que vous faites.
            </p>
            <p className="text-gray-600 text-[0.95rem] leading-relaxed">
              Vous voulez sortir du mode survie pour revenir à un mode <strong className="text-nova-blue-dark">plus aligné et plus respectueux de vous</strong>.
            </p>
          </div>

          <h3 className="font-serif text-lg font-bold text-nova-blue-dark mb-5 text-center">
            Ce que l'accompagnement change concrètement
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Votre niveau de stress et de tensions internes diminue nettement.",
              "Votre sommeil s'améliore — endormissement, qualité, récupération.",
              "Vous vivez mieux vos émotions : peur, colère, culpabilité, anxiété.",
              "Vous gagnez en autonomie grâce aux outils d'auto-hypnose au quotidien.",
              "Vous améliorez votre communication au travail — oser dire, poser des limites, clarifier vos besoins.",
              "Vous retrouvez une posture plus posée et alignée dans votre vie professionnelle.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4">
                <CheckCircle size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-nova-blue-dark text-[0.95rem] font-medium mt-8">
            Vous gagnez en clarté, en énergie, en qualité de relation — et vous sortez progressivement d'un fonctionnement d'épuisement.
          </p>
        </div>
      </section>

      {/* ═══════════ 4. L'ACCOMPAGNEMENT — 6 SÉANCES ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3 text-center">
            L'accompagnement
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-4 text-center">
            6 séances. 10 à 12 semaines. Un vrai parcours de transformation.
          </h2>

          <div className="bg-nova-neutral rounded-2xl p-6 sm:p-8 mb-10">
            <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-4">
              Ce n'est pas de la thérapie sans fin. C'est un <strong className="text-nova-blue-dark">programme structuré</strong> qui combine trois approches complémentaires, adaptées à votre réalité professionnelle :
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-white rounded-xl p-4 text-center">
                <Brain className="text-nova-blue mx-auto mb-2" size={24} />
                <p className="font-semibold text-nova-blue-dark text-sm">Hypnose Ericksonienne</p>
                <p className="text-gray-400 text-xs mt-1">Désactiver les automatismes de stress</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <Headphones className="text-nova-blue mx-auto mb-2" size={24} />
                <p className="font-semibold text-nova-blue-dark text-sm">Auto-Hypnose</p>
                <p className="text-gray-400 text-xs mt-1">Devenir autonome au quotidien</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <MessagesSquare className="text-nova-blue mx-auto mb-2" size={24} />
                <p className="font-semibold text-nova-blue-dark text-sm">Communication Relationnelle</p>
                <p className="text-gray-400 text-xs mt-1">Approche Jacques Salomé</p>
              </div>
            </div>
          </div>

          {/* Les 6 séances */}
          <div className="space-y-5">
            {[
              {
                num: 1,
                icon: Target,
                title: 'Libération du stress',
                subtitle: 'Mettre à plat et souffler — environ 1h30',
                desc: "Échange approfondi pour comprendre votre situation : sources de stress, impact sur le corps, le sommeil, les émotions, les relations. Clarification de vos objectifs prioritaires. Première séance d'hypnothérapie pour alléger les tensions. Installation d'un premier outil d'auto-hypnose + audio adapté.",
              },
              {
                num: 2,
                icon: Moon,
                title: 'Sommeil réparateur',
                subtitle: 'Couper avec le travail — retrouver le lâcher-prise',
                desc: "Hypnothérapie ciblée sur l'endormissement, la qualité du sommeil et le lâcher-prise mental. Mise en place d'un rituel du soir intégré à votre rythme. Audio spécifique pour le coucher.",
              },
              {
                num: 3,
                icon: Flame,
                title: 'Émotions et charge mentale',
                subtitle: 'Alléger le poids — transformer les ressentis',
                desc: "Hypnothérapie centrée sur vos ressentis et vos représentations (porter tout, ne pas avoir le droit de flancher...). Travail sur une ou deux situations particulièrement lourdes. Mise en place d'un outil de régulation émotionnelle dans la journée.",
              },
              {
                num: 4,
                icon: Headphones,
                title: 'Auto-hypnose — Autonomie au quotidien',
                subtitle: 'Vous rendre autonome dans la gestion de votre stress',
                desc: "Transmission de techniques d'auto-hypnose adaptées à votre terrain : visualisation, ancrages. Adaptation à vos contextes réels (réunions, mails, entretiens, déplacements). Construction de 2 ou 3 scénarios types d'utilisation.",
              },
              {
                num: 5,
                icon: MessagesSquare,
                title: 'Communication relationnelle au travail',
                subtitle: 'Approche Jacques Salomé — dire, poser des limites, clarifier',
                desc: "Travail sur une ou deux situations relationnelles sources de tension. Outils de Communication Relationnelle : parler à partir de soi, poser des demandes claires, dire non sans agressivité, différencier ce qui vous appartient de ce qui appartient à l'autre. Possibilité de rejouer des scènes en séance.",
              },
              {
                num: 6,
                icon: Anchor,
                title: 'Ancrage durable et nouvelle posture',
                subtitle: 'Consolider les changements — incarner votre nouvelle manière d\'être',
                desc: "Hypnothérapie orientée sur la posture intérieure que vous souhaitez incarner. Ancrage des ressources développées : calme, clarté, confiance, capacité à poser des limites. Plan de continuité : pratiques à garder, signaux d'alerte, quoi faire si les tensions remontent. Bilan global avant/après.",
              },
            ].map(({ num, icon: Icon, title, subtitle, desc }) => (
              <div key={num} className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-nova-blue to-nova-blue-dark rounded-xl flex items-center justify-center">
                    <Icon className="text-white" size={22} />
                  </div>
                  <p className="text-center text-[10px] font-bold text-nova-blue mt-1">S{num}</p>
                </div>
                <div>
                  <p className="font-semibold text-nova-blue-dark text-[0.95rem] mb-0.5">{title}</p>
                  <p className="text-nova-orange text-xs font-medium mb-2">{subtitle}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Suivi entre séances */}
          <div className="mt-8 bg-teal-50 border border-teal-200 rounded-xl p-5 flex items-start gap-4">
            <MessageCircle className="text-teal-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-nova-blue-dark text-sm mb-1">Suivi entre les séances</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Par messages si besoin, pour ajuster les pratiques ou vous soutenir dans un moment clé. Vous n'êtes pas seul entre les rendez-vous.
              </p>
            </div>
          </div>

          {/* Conditions de succès */}
          <div className="mt-8 bg-gray-50 rounded-xl p-5">
            <p className="font-semibold text-nova-blue-dark text-sm mb-3">Votre engagement fait la différence</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Pratique régulière de 10 à 15 minutes par jour des outils transmis (auto-hypnose, exercices de communication, petits rituels de régulation). Chaque séance a une intention claire et s'inscrit dans un parcours cohérent : <strong className="text-gray-700">soulager, stabiliser, rendre autonome, transformer</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ PRIX ═══════════ */}
      <section className="py-14 px-6 bg-gradient-to-br from-nova-blue-dark to-nova-blue">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
            Investissement
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6">
            <p className="text-teal-300 text-5xl sm:text-6xl font-bold mb-2">997 €</p>
            <p className="text-white/70 text-[0.95rem]">
              pour l'ensemble du parcours — 6 séances individuelles
            </p>
            <hr className="border-white/10 my-5" />
            <div className="grid sm:grid-cols-2 gap-3 text-left text-sm">
              <div className="flex items-start gap-2 text-white/70">
                <CheckCircle size={16} className="text-teal-400 flex-shrink-0 mt-0.5" />
                <span>6 séances individuelles (1h à 1h30)</span>
              </div>
              <div className="flex items-start gap-2 text-white/70">
                <CheckCircle size={16} className="text-teal-400 flex-shrink-0 mt-0.5" />
                <span>10 à 12 semaines d'accompagnement</span>
              </div>
              <div className="flex items-start gap-2 text-white/70">
                <CheckCircle size={16} className="text-teal-400 flex-shrink-0 mt-0.5" />
                <span>Audios d'auto-hypnose personnalisés</span>
              </div>
              <div className="flex items-start gap-2 text-white/70">
                <CheckCircle size={16} className="text-teal-400 flex-shrink-0 mt-0.5" />
                <span>Suivi par messages entre les séances</span>
              </div>
              <div className="flex items-start gap-2 text-white/70">
                <CheckCircle size={16} className="text-teal-400 flex-shrink-0 mt-0.5" />
                <span>En présentiel (Paris 4e) ou en visio</span>
              </div>
              <div className="flex items-start gap-2 text-white/70">
                <CheckCircle size={16} className="text-teal-400 flex-shrink-0 mt-0.5" />
                <span>Plan de continuité à la fin du parcours</span>
              </div>
            </div>
          </div>
          <p className="text-white/40 text-xs">
            Certaines mutuelles remboursent partiellement les séances d'hypnose — renseignez-vous auprès de la vôtre.
          </p>
        </div>
      </section>

      {/* ═══════════ 5. PREUVE / CRÉDIBILITÉ ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3 text-center">
            Pourquoi me faire confiance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-10 text-center">
            Ce n'est pas mon premier professionnel épuisé.
          </h2>

          {/* Alain card */}
          <div className="bg-nova-neutral rounded-2xl p-6 sm:p-8 mb-8">
            <div className="flex items-start gap-5 mb-6">
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp"
                alt="Alain Zenatti — Hypnothérapeute Paris"
                className="w-20 h-20 rounded-full object-cover flex-shrink-0 shadow-md"
                loading="lazy"
              />
              <div>
                <p className="font-serif font-bold text-nova-blue-dark text-lg">Alain Zenatti</p>
                <p className="text-gray-500 text-sm mb-1">Maître Praticien en Hypnose Ericksonienne & en Auto-Hypnose</p>
                <p className="text-gray-400 text-sm">Praticien en Communication Relationnelle (approche Jacques Salomé)</p>
              </div>
            </div>
            <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-4">
              Chaque semaine, je reçois à mon cabinet du Marais des professionnels comme vous : brillants, engagés — et épuisés. Mon objectif est de vous accompagner à <strong className="text-nova-blue-dark">transformer ce poids quotidien en une énergie plus sereine, stable et soutenante</strong>.
            </p>
            <p className="text-gray-600 text-[0.95rem] leading-relaxed">
              Je vous accompagne à chaque étape, avec bienveillance et clarté, pour que vous puissiez enfin vivre votre travail avec plus de sérénité et moins de souffrance.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '5/5', label: 'Note moyenne', icon: Star },
              { value: '40+', label: 'Avis vérifiés', icon: Users },
              { value: '6', label: 'Séances complètes', icon: Clock },
              { value: '90%', label: 'Amélioration S1', icon: Zap },
            ].map(({ value, label, icon: Icon }, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                <Icon className="text-nova-blue mx-auto mb-2" size={20} />
                <p className="text-nova-blue-dark font-bold text-xl">{value}</p>
                <p className="text-gray-400 text-xs">{label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic mb-2">
                « J'ai consulté pour un problème d'anxiété. Dès la première séance, j'ai ressenti un apaisement. En 3 séances, l'anxiété a complètement disparu. Je recommande vivement. »
              </p>
              <p className="text-gray-400 text-xs">Marie H. — Avis Google vérifié</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic mb-2">
                « M. Zenatti est posé et réfléchi. Son écoute attentive a permis de cibler les zones d'amélioration, les émotions limitantes. En quelques séances, je me suis libéré de mes blocages et j'ai amorcé des changements durables. »
              </p>
              <p className="text-gray-400 text-xs">Philippe A. — Avis Google vérifié</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic mb-2">
                « Alain m'a aidée à retrouver un sommeil réparateur en 2 séances. Je vous le recommande. »
              </p>
              <p className="text-gray-400 text-xs">Isabelle M. — Avis Google vérifié</p>
            </div>
          </div>

          {/* Future proof placeholders */}
          <div className="mt-6 bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs">
              Emplacements réservés : témoignages vidéo de professionnels accompagnés &middot; étude de cas détaillée avant/après &middot; chiffres de satisfaction post-parcours
            </p>
          </div>

          {/* Contexte chiffré */}
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
            <p className="text-nova-blue-dark text-sm font-semibold mb-2">Le constat est préoccupant</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Selon l'étude AESIO Mutuelle sur la santé des dirigeants et l'Observatoire MMA de la santé des dirigeants 2025, le stress chronique, l'épuisement et les troubles du sommeil touchent une majorité de professionnels — souvent dans le silence. Ce programme a été conçu pour répondre précisément à cette réalité.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ 6. CTA FINAL ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-4">
            Vous n'avez pas besoin de « tenir » plus longtemps.
          </h2>
          <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-4 max-w-lg mx-auto">
            Un premier échange — gratuit, sans engagement — pour faire le point sur votre situation et voir si cet accompagnement peut vous aider.
          </p>
          <p className="text-nova-blue-dark text-[0.95rem] font-medium mb-8 max-w-lg mx-auto">
            Même en 15 minutes, je peux vous donner une première clé.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={RESALIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-nova-orange hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-lg shadow-lg shadow-orange-500/25"
            >
              Demander un appel gratuit
              <ArrowRight size={20} />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold rounded-xl transition-colors"
            >
              <MessageCircle size={18} />
              Discuter sur WhatsApp
            </a>
          </div>

          <p className="text-gray-400 text-sm mb-2">
            ou appelez directement : <a href={PHONE_URL} className="text-nova-blue hover:underline font-medium">06 49 35 80 89</a>
          </p>
          <p className="text-gray-300 text-xs">
            Cabinet Paris 4e (Marais-Bastille) &middot; Visio disponible &middot; Je réponds personnellement
          </p>
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
        </p>
      </div>
    </>
  );
};

export default LandingProfessionnels;
