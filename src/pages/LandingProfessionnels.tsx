import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { safeJSONStringify } from '@/lib/seo-utils';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Brain from 'lucide-react/dist/esm/icons/brain';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Star from 'lucide-react/dist/esm/icons/star';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Users from 'lucide-react/dist/esm/icons/users';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';

import Headphones from 'lucide-react/dist/esm/icons/headphones';
import MessagesSquare from 'lucide-react/dist/esm/icons/messages-square';

/* ─────────────────────────────────────────────
   Landing page — Offre accompagnement professionnels
   Objectif unique : réserver un appel découverte (Calendly)
   Secondaire : télécharger le guide ebook
   PAS de prix affiché (donné à l'oral après l'appel)
   PAS de protocole détaillé séance par séance
   ───────────────────────────────────────────── */

const CALENDLY_URL = 'https://calendly.com/zenatti/rdvtelephonique?hide_event_type_details=1&hide_gdpr_banner=1';
const WHATSAPP_URL = 'https://wa.me/33649358089?text=Bonjour%20Alain%2C%20j%27ai%20une%20question%20';
const PHONE_URL = 'tel:0649358089';

const LandingProfessionnels: React.FC = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Accompagnement hypnose pour professionnels en souffrance au travail — Paris",
    "description": "Accompagnement individuel en hypnose ericksonienne, auto-hypnose et communication relationnelle pour les salariés et professionnels en souffrance au travail. Stress, burn-out, sommeil, émotions, relations. Cabinet Paris 4ème.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie — accompagnement professionnel"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "L'hypnose est-elle efficace pour le stress et le burn-out ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Oui. L'hypnose ericksonienne agit directement sur les mécanismes inconscients du stress. Elle permet de relâcher les tensions accumulées, d'améliorer le sommeil et de modifier durablement les schémas émotionnels — là où la volonté seule ne suffit pas. La plupart des personnes accompagnées ressentent un mieux-être dès les premières séances." }
      },
      {
        "@type": "Question",
        "name": "Combien de séances sont nécessaires ?",
        "acceptedAnswer": { "@type": "Answer", "text": "L'accompagnement comprend 6 séances individuelles, réparties sur 10 à 12 semaines. Ce rythme permet de travailler en profondeur tout en laissant le temps d'intégrer chaque étape entre les rendez-vous." }
      },
      {
        "@type": "Question",
        "name": "Les séances sont-elles disponibles en visio ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Oui. Vous pouvez suivre l'accompagnement en présentiel au cabinet Paris 4e (Marais-Bastille) ou en visioconférence. Les deux formats sont tout aussi efficaces." }
      },
      {
        "@type": "Question",
        "name": "Comment savoir si cet accompagnement est fait pour moi ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Un appel découverte gratuit et sans engagement permet de faire le point sur votre situation en 15 à 20 minutes. Alain Zenatti vous explique comment l'accompagnement fonctionne et vous donne une première orientation concrète." }
      }
    ]
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
        <title>Hypnose stress au travail Paris | Alain Zenatti</title>
        <meta name="description" content="Hypnose pour professionnels en burn-out ou stress au travail. Accompagnement individuel — Paris 4e & visio. Appel découverte gratuit, sans engagement." />
        <meta name="keywords" content="hypnose professionnels paris, burn-out hypnose, souffrance travail hypnose, stress cadres, accompagnement hypnose paris, communication relationnelle Jacques Salomé, auto-hypnose stress" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-professionnels-paris" />
        <meta property="og:title" content="Hypnose stress au travail Paris | Alain Zenatti" />
        <meta property="og:description" content="Accompagnement individuel en hypnose pour professionnels. Stress, burn-out, sommeil, émotions. Appel découverte gratuit." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-professionnels-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose stress au travail Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Accompagnement individuel en hypnose pour professionnels. Stress, burn-out, sommeil. Appel découverte gratuit." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(serviceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(faqSchema)}</script>
      </Helmet>

      {/* ═══════════ 1. HERO ═══════════ */}
      <section className="relative bg-gradient-to-br from-nova-blue-dark via-[#1e3a5f] to-nova-blue overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-nova-orange mb-5">
            Accompagnement individuel — Paris 4e & visio
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Hypnose pour professionnels à Paris<br />
            <span className="text-teal-300">Vous tenez. Mais à quel prix ?</span>
          </h1>

          <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-4">
            Je propose un accompagnement individuel sur plusieurs séances, spécifiquement dédié aux personnes en souffrance au travail (stress, épuisement, troubles du sommeil).
          </p>
          <p className="text-white/55 text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Hypnose, auto-hypnose et communication relationnelle pour vous aider à <strong className="text-white">retrouver énergie, sommeil et sérénité</strong> — durablement.
          </p>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-nova-orange hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-lg shadow-lg shadow-orange-500/25 mb-10"
          >
            Réserver un appel découverte gratuit
            <ArrowRight size={20} />
          </a>

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
              Salariés en souffrance au travail
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════ 2. CE QUE VOUS VIVEZ — PROBLÈMES ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3 text-center">
            Vous vous reconnaissez ?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-4 text-center">
            Le masque tient. Mais derrière, quelque chose s'effrite.
          </h2>
          <p className="text-gray-500 text-[0.95rem] leading-relaxed text-center max-w-2xl mx-auto mb-10">
            Que vous soyez cadre, manager, employé, indépendant ou responsable d'équipe — vous jonglez chaque jour avec une surcharge : objectifs élevés, délais serrés, pression de résultats, tensions relationnelles, sentiment de ne jamais en faire assez.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: Brain,
                text: "Impossible de « couper ». Vos pensées tournent en boucle — au lit, sous la douche, en famille. Vous travaillez mentalement même quand vous n'êtes plus au bureau.",
              },
              {
                icon: Zap,
                text: "La fatigue ne passe plus. Vous êtes irritable, à fleur de peau. L'enthousiasme a disparu — remplacé par un épuisement que même le week-end ne répare pas.",
              },
              {
                icon: Heart,
                text: "Votre corps parle à votre place. Oppression thoracique, mâchoire serrée, dos bloqué, sommeil perturbé. Le stress s'est installé physiquement.",
              },
              {
                icon: Shield,
                text: "Vos relations en pâtissent — au travail comme à la maison. Vous n'osez plus poser de limites, ou vous explosez. Vous pouvez vous sentir au bord du craquage.",
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
            Ce que vous voulez vraiment
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-8 text-center">
            Sortir du mode survie. Revenir à quelque chose de plus vivant.
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-4">
              Vous aspirez à vivre votre travail autrement. Pas à tout quitter — mais à <strong className="text-nova-blue-dark">retrouver une énergie stable</strong>, dormir mieux, vous réveiller plus clair et disponible.
            </p>
            <p className="text-gray-600 text-[0.95rem] leading-relaxed">
              Poser des limites sans culpabilité. Améliorer vos relations au travail. Retrouver du sens dans ce que vous faites. Revenir à un mode <strong className="text-nova-blue-dark">plus aligné et plus respectueux de vous</strong>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Moins de stress, moins de tensions internes.",
              "Un sommeil qui redevient réparateur.",
              "Des émotions que vous traversez sans en être submergé.",
              "Plus d'énergie, plus de clarté au quotidien.",
              "Des relations plus apaisées — au travail comme à la maison.",
              "Une posture professionnelle plus posée, plus juste pour vous.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4">
                <CheckCircle size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 4. COMMENT JE VOUS ACCOMPAGNE (sans détailler chaque séance) ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3 text-center">
            L'accompagnement
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-8 text-center">
            Un accompagnement individuel sur 10 à 12 semaines
          </h2>

          <div className="bg-nova-neutral rounded-2xl p-6 sm:p-8 mb-8">
            <p className="text-gray-600 text-[0.95rem] leading-relaxed">
              Ce n'est pas de la thérapie sans fin. C'est un <strong className="text-nova-blue-dark">accompagnement structuré, individuel, sur mesure</strong> — conçu pour les professionnels qui veulent des résultats concrets. En quelques semaines, vous passez du mode « tenir » au mode « avancer ».
            </p>
          </div>

          {/* Les 3 piliers */}
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-md transition-shadow">
              <Brain className="text-nova-blue mx-auto mb-3" size={28} />
              <p className="font-semibold text-nova-blue-dark text-[0.95rem] mb-2">Hypnose Ericksonienne</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Apaiser le stress, améliorer le sommeil, alléger la charge mentale — en agissant là où la volonté seule ne suffit pas.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-md transition-shadow">
              <Headphones className="text-nova-blue mx-auto mb-3" size={28} />
              <p className="font-semibold text-nova-blue-dark text-[0.95rem] mb-2">Auto-Hypnose</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Des outils simples que vous utilisez au quotidien pour devenir autonome dans la gestion de votre stress et de vos émotions.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-md transition-shadow">
              <MessagesSquare className="text-nova-blue mx-auto mb-3" size={28} />
              <p className="font-semibold text-nova-blue-dark text-[0.95rem] mb-2">Communication Relationnelle</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Oser dire, poser des limites, clarifier vos besoins — avec l'approche de Jacques Salomé.
              </p>
            </div>
          </div>

          {/* Le cadre concret */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h3 className="font-serif text-lg font-bold text-nova-blue-dark mb-4">Le cadre</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Séances individuelles, adaptées à votre réalité",
                "Un parcours structuré sur quelques semaines",
                "En présentiel (Paris 4e) ou en visio",
                "Des pratiques simples entre les séances (10-15 min/jour)",
                "Un suivi par messages si besoin entre les rendez-vous",
                "Un programme cohérent : soulager, stabiliser, rendre autonome",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-nova-blue flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Appel découverte */}
          <div className="mt-8 bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
            <p className="text-nova-blue-dark text-[0.95rem] font-medium mb-2">
              Comment savoir si c'est fait pour vous ?
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-lg mx-auto">
              Un appel découverte gratuit, sans engagement. On fait le point sur votre situation, je vous explique comment l'accompagnement fonctionne, et on voit ensemble si c'est le bon chemin pour vous.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nova-orange hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-md"
            >
              Réserver mon appel découverte
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ 4b. CE QUE N'EST PAS / CE QUE C'EST ═══════════ */}
      <section className="py-12 sm:py-16 px-6 bg-nova-neutral">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="font-serif font-bold text-nova-blue-dark text-lg mb-3">Ce que n'est pas cet accompagnement</p>
            <p className="text-gray-500 text-[0.95rem] leading-relaxed">
              Il ne s'agit pas d'un coaching de performance pour « tenir plus » ou « faire encore plus avec moins de ressources ». C'est un accompagnement thérapeutique par l'hypnose, centré sur la souffrance que vous vivez (stress, épuisement, troubles du sommeil, surcharge émotionnelle) et sur la manière dont votre corps et vos émotions tirent la sonnette d'alarme.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-teal-200">
            <p className="font-serif font-bold text-nova-blue-dark text-lg mb-3">Ce que c'est</p>
            <p className="text-gray-500 text-[0.95rem] leading-relaxed">
              Un parcours de 6 séances sur 10 à 12 semaines pour apaiser les symptômes, retrouver de l'espace intérieur, remettre du sens et poser un cadre plus respectueux de vous dans votre vie professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ 4c. EBOOK MID-PAGE ═══════════ */}
      <section className="py-12 sm:py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3 text-center">
            Avant de décider
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-8 text-center">
            Pas encore prêt pour un appel ? Commencez ici.
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
            <img
              src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/couverture-guide.webp"
              alt="Guide gratuit — Vous tenez. Mais jusqu'à quand ?"
              className="w-[180px] sm:w-[200px] rounded-lg shadow-xl flex-shrink-0 -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.background = 'linear-gradient(135deg, #233C67, #4470AD)';
                target.style.width = '200px';
                target.style.height = '280px';
                target.style.borderRadius = '8px';
              }}
            />
            <div className="text-center sm:text-left flex-1">
              <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-3">
                J'ai écrit un guide de 19 pages pour les professionnels qui sentent que quelque chose ne va plus — mais qui ne savent pas encore exactement ce qui se passe en eux.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Vous y trouverez des repères concrets pour comprendre vos émotions au travail, identifier ce que votre corps essaie de vous dire, et trois pratiques simples applicables dès ce soir.
              </p>
              <p className="text-gray-400 text-sm italic mb-5">
                C'est gratuit. C'est sans engagement. Et ça peut déjà changer quelque chose.
              </p>
              <Link
                to="/guide-emotions-travail"
                className="inline-flex items-center gap-2 px-6 py-3 bg-nova-blue-dark hover:bg-nova-blue text-white font-semibold rounded-xl transition-colors"
              >
                Recevoir le guide gratuit
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 5. PREUVE / CRÉDIBILITÉ ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-gradient-to-br from-nova-blue-dark to-nova-blue">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-teal-300 mb-3 text-center">
            Qui vous accompagne
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug mb-10 text-center">
            Ce n'est pas mon premier professionnel épuisé.
          </h2>

          {/* Alain card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp"
                alt="Alain Zenatti — Hypnothérapeute Paris"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover flex-shrink-0 shadow-lg ring-2 ring-white/20"
                loading="lazy"
              />
              <div className="text-center sm:text-left">
                <p className="font-serif font-bold text-white text-lg">Alain Zenatti</p>
                <p className="text-white/60 text-sm mb-1">Maître Praticien en Hypnose Ericksonienne & en Auto-Hypnose</p>
                <p className="text-white/50 text-sm">Praticien en Communication Relationnelle (approche Jacques Salomé)</p>
              </div>
            </div>
            <p className="text-white/80 text-[0.95rem] leading-relaxed mb-4">
              Chaque semaine, je reçois à mon cabinet du Marais des professionnels comme vous : brillants, engagés — et épuisés. Mon objectif est de vous accompagner à <strong className="text-white">transformer ce poids quotidien en une énergie plus sereine, stable et soutenante</strong>.
            </p>
            <p className="text-white/80 text-[0.95rem] leading-relaxed">
              Je vous accompagne à chaque étape, avec bienveillance et clarté, pour que vous puissiez enfin vivre votre travail avec plus de sérénité et moins de souffrance.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '5/5', label: 'Note moyenne', icon: Star },
              { value: '40+', label: 'Avis vérifiés', icon: Users },
              { value: '85%', label: 'Clients soulagés', icon: Zap },
              { value: '9', label: 'Certifications', icon: Shield },
            ].map(({ value, label, icon: Icon }, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                <Icon className="text-teal-300 mx-auto mb-2" size={20} />
                <p className="text-white font-bold text-xl">{value}</p>
                <p className="text-white/50 text-xs">{label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            <div className="bg-white/10 rounded-xl p-5">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic mb-2">
                « J'ai consulté pour un problème d'anxiété. Dès la première séance, j'ai ressenti un apaisement. En 3 séances, l'anxiété a complètement disparu. Je recommande vivement. »
              </p>
              <p className="text-white/50 text-xs">Marie H. — Avis Google vérifié</p>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic mb-2">
                « M. Zenatti est posé et réfléchi. Son écoute attentive a permis de cibler les zones d'amélioration, les émotions limitantes. En quelques séances, je me suis libéré de mes blocages et j'ai amorcé des changements durables. »
              </p>
              <p className="text-white/50 text-xs">Philippe A. — Avis Google vérifié</p>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic mb-2">
                « Alain m'a aidée à retrouver un sommeil réparateur en 2 séances. Je vous le recommande. »
              </p>
              <p className="text-white/50 text-xs">Isabelle M. — Avis Google vérifié</p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3 text-center">
            Questions fréquentes
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-10 text-center">
            Vos questions, mes réponses
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "L'hypnose est-elle efficace pour le stress et le burn-out ?",
                a: "Oui. L'hypnose ericksonienne agit directement sur les mécanismes inconscients du stress. Elle permet de relâcher les tensions accumulées, d'améliorer le sommeil et de modifier durablement les schémas émotionnels — là où la volonté seule ne suffit pas. La plupart des personnes accompagnées ressentent un mieux-être dès les premières séances.",
              },
              {
                q: "Combien de séances sont nécessaires ?",
                a: "L'accompagnement comprend 6 séances individuelles, réparties sur 10 à 12 semaines. Ce rythme permet de travailler en profondeur tout en laissant le temps d'intégrer chaque étape entre les rendez-vous.",
              },
              {
                q: "Les séances sont-elles disponibles en visio ?",
                a: "Oui. Vous pouvez suivre l'accompagnement en présentiel au cabinet Paris 4e (Marais-Bastille) ou en visioconférence. Les deux formats sont tout aussi efficaces.",
              },
              {
                q: "Comment savoir si cet accompagnement est fait pour moi ?",
                a: "Un appel découverte gratuit et sans engagement permet de faire le point sur votre situation en 15 à 20 minutes. Alain Zenatti vous explique comment l'accompagnement fonctionne et vous donne une première orientation concrète.",
              },
            ].map(({ q, a }, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-100 group open:shadow-sm">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-semibold text-nova-blue-dark text-[0.95rem] select-none">
                  {q}
                  <ChevronDown size={18} className="flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <p className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. CTA FINAL — Appel découverte ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-4">
            Vous n'avez pas besoin de « tenir » plus longtemps.
          </h2>
          <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-4 max-w-lg mx-auto">
            Un appel découverte — gratuit, sans engagement — pour faire le point sur votre situation, répondre à vos questions, et voir ensemble si cet accompagnement est le bon chemin pour vous.
          </p>
          <p className="text-nova-blue-dark text-[0.95rem] font-medium mb-8 max-w-lg mx-auto">
            Même en 15 minutes, je peux vous donner une première clé.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-nova-orange hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-lg shadow-lg shadow-orange-500/25"
            >
              Réserver mon appel découverte
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
            Je réponds personnellement &middot; Cabinet Paris 4e (Marais-Bastille) &middot; Visio disponible
          </p>
        </div>
      </section>

      {/* ═══════════ 7. TEASING EBOOK ═══════════ */}
      <section className="py-14 px-6 bg-nova-neutral">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
            <img
              src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/couverture-guide.webp"
              alt="Guide gratuit — Vous tenez. Mais jusqu'à quand ?"
              className="w-[120px] sm:w-[140px] rounded-lg shadow-md flex-shrink-0"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.background = 'linear-gradient(135deg, #233C67, #4470AD)';
                target.style.width = '140px';
                target.style.height = '196px';
                target.style.borderRadius = '8px';
              }}
            />
            <div className="text-center sm:text-left flex-1">
              <p className="font-serif font-bold text-nova-blue-dark text-lg mb-1">
                Vous tenez. Mais jusqu'à quand ?
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Un guide gratuit de 19 pages pour comprendre vos émotions au travail — avant que votre corps décide à votre place. 3 pratiques simples applicables dès ce soir.
              </p>
              <Link
                to="/guide-emotions-travail"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-nova-blue-dark hover:bg-nova-blue text-white font-medium rounded-lg transition-colors text-sm"
              >
                Recevoir le guide gratuit
                <ArrowRight size={16} />
              </Link>
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
        </p>
      </div>
    </>
  );
};

export default LandingProfessionnels;
