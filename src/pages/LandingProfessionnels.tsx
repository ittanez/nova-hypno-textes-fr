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

/* ─────────────────────────────────────────────
   Landing page — avatar prioritaire :
   le professionnel performant qui s'épuise
   ───────────────────────────────────────────── */

const RESALIB_URL = 'https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris';
const WHATSAPP_URL = 'https://wa.me/33649358089?text=Bonjour%20Alain%2C%20j%27ai%20une%20question%20';
const PHONE_URL = 'tel:0649358089';

const LandingProfessionnels: React.FC = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour les professionnels — stress, burn-out, performance — Paris",
    "description": "Accompagnement en hypnose ericksonienne pour les cadres, managers et indépendants. Stress chronique, burn-out, syndrome de l'imposteur, insomnie. Résultats en 3 à 5 séances. Cabinet Paris 4ème.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie pour professionnels",
    "offers": {
      "@type": "Offer",
      "price": "90",
      "priceCurrency": "EUR"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://novahypnose.fr" },
      { "@type": "ListItem", "position": 2, "name": "Hypnose professionnels Paris", "item": "https://novahypnose.fr/hypnose-professionnels-paris" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Hypnose pour professionnels Paris | Stress, burn-out, performance — Alain Zenatti</title>
        <meta name="description" content="Vous êtes performant mais épuisé ? L'hypnose ericksonienne aide les cadres et managers à retrouver énergie, sommeil et clarté. Résultats en 3-5 séances. Paris 4ème." />
        <meta name="keywords" content="hypnose professionnels paris, burn-out hypnose, stress cadres hypnose, syndrome imposteur hypnose, hypnose manager paris, performance hypnose paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-professionnels-paris" />
        <meta property="og:title" content="Hypnose pour professionnels — Retrouvez votre énergie | NovaHypnose Paris" />
        <meta property="og:description" content="Vous êtes performant mais épuisé ? L'hypnose aide les cadres et managers à retrouver énergie et clarté en 3-5 séances." />
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
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-nova-orange mb-5">
            Cabinet Paris 4e — Marais-Bastille
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Vous êtes performant.<br />
            <span className="text-teal-300">Mais à quel prix ?</span>
          </h1>

          <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            L'hypnose ericksonienne aide les cadres, managers et indépendants
            à <strong className="text-white">retrouver énergie, sommeil et clarté mentale</strong>
            — sans médicament, en 3 à 5 séances.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href={RESALIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-nova-orange hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-lg shadow-lg shadow-orange-500/25"
            >
              Réserver un appel gratuit
              <ArrowRight size={20} />
            </a>
            <a
              href={PHONE_URL}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-medium rounded-xl transition-colors"
            >
              <Phone size={18} />
              06 49 35 80 89
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
              Indépendants en surchauffe
            </span>
            <span className="flex items-center gap-2 justify-center">
              <CheckCircle size={16} className="text-teal-400" />
              Dirigeants qui ne décrochent plus
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════ 2. PROBLÈMES / FRUSTRATIONS ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3 text-center">
            Vous vous reconnaissez ?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-10 text-center">
            Le masque tient. Mais derrière, quelque chose s'effrite.
          </h2>

          <div className="space-y-5">
            {[
              {
                icon: Brain,
                text: "Vos pensées tournent en boucle la nuit. Vous travaillez mentalement même quand vous êtes au lit — ou sous la douche, ou en famille.",
              },
              {
                icon: Zap,
                text: "Vous êtes irritable, à fleur de peau. Un mail anodin vous agace, un retard de 5 minutes vous met en colère. Ce n'est pas vous — mais vous ne savez plus qui vous êtes.",
              },
              {
                icon: Shield,
                text: "Vous avez le syndrome de l'imposteur. Malgré vos résultats, vous avez la sensation constante que quelqu'un va « découvrir » que vous n'êtes pas à la hauteur.",
              },
              {
                icon: Heart,
                text: "Votre corps parle à votre place. Oppression thoracique, mâchoire serrée, dos bloqué, maux de ventre. Le stress s'est installé physiquement.",
              },
              {
                icon: Clock,
                text: "Vous avez tout essayé — sport, méditation, coaching. Ça aide un temps, puis le mécanisme se réenclenche. Parce que le problème n'est pas à la surface.",
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

      {/* ═══════════ 3. RÉSULTAT & TRANSFORMATION ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-teal-600 mb-3 text-center">
            Ce qui change après l'hypnose
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-8 text-center">
            Imaginez vous réveiller un matin… et que le bruit s'est arrêté.
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-4">
              Pas de miracle. Pas de pensée positive forcée. Juste un <strong className="text-nova-blue-dark">recalibrage profond</strong> de votre système nerveux. Votre inconscient cesse de tourner en mode urgence — et votre corps suit.
            </p>
            <p className="text-gray-600 text-[0.95rem] leading-relaxed">
              L'hypnose ericksonienne agit là où la volonté échoue : elle <strong className="text-nova-blue-dark">désactive les automatismes de stress</strong> installés depuis des années, et restaure votre capacité naturelle à lâcher prise, dormir, vous concentrer.
            </p>
          </div>

          <h3 className="font-serif text-lg font-bold text-nova-blue-dark mb-5 text-center">
            Ce que ça change concrètement
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Vous dormez enfin — vraiment. Et vous vous réveillez reposé.",
              "Les pensées en boucle se taisent. Vous retrouvez le silence mental.",
              "Vous prenez du recul face à la pression, sans perdre en performance.",
              "Votre corps se relâche : mâchoire décrispée, respiration fluide, ventre dénoué.",
              "Vous retrouvez le plaisir de travailler — sans l'urgence permanente.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4">
                <CheckCircle size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 4. CE QUE JE PROPOSE ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3 text-center">
            Comment je vous accompagne
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-8 text-center">
            Un protocole court, ciblé, qui va à l'essentiel.
          </h2>

          <div className="bg-nova-neutral rounded-2xl p-6 sm:p-8 mb-8">
            <p className="text-gray-600 text-[0.95rem] leading-relaxed">
              Je ne fais pas de la thérapie qui dure des mois. Mon approche combine l'<strong className="text-nova-blue-dark">hypnose ericksonienne</strong> et la <strong className="text-nova-blue-dark">PNL</strong> pour aller directement à la racine du problème — les automatismes inconscients qui maintiennent votre stress actif. En <strong className="text-nova-blue-dark">3 à 5 séances</strong>, votre système nerveux se recalibre et les changements s'installent durablement.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Séance 1 : Diagnostic profond (1h30)",
                desc: "Nous identifions ensemble la source réelle du stress — pas les symptômes, la racine. Première séance d'hypnose pour amorcer le changement.",
              },
              {
                title: "Séances 2-3 : Reprogrammation",
                desc: "Travail en hypnose sur les automatismes de stress, les croyances limitantes, les schémas de surcontrôle. Votre inconscient apprend de nouvelles réponses.",
              },
              {
                title: "Séance 4-5 : Ancrage & autonomie",
                desc: "Consolidation des résultats. Vous apprenez des techniques d'auto-hypnose pour maintenir votre équilibre en toute autonomie.",
              },
              {
                title: "90 € par séance — sans surprise",
                desc: "Cabinet Paris 4e (Marais-Bastille), téléconsultation ou domicile (140 €). Pas d'abonnement, pas d'engagement au-delà de ce qui est nécessaire.",
              },
            ].map(({ title, desc }, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
                <div className="flex-shrink-0 w-8 h-8 bg-nova-blue-light/20 rounded-full flex items-center justify-center text-nova-blue font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-nova-blue-dark text-[0.95rem] mb-1">{title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5. PREUVE / CRÉDIBILITÉ ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-gradient-to-br from-nova-blue-dark to-nova-blue">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-teal-300 mb-3 text-center">
            Pourquoi me faire confiance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug mb-10 text-center">
            Ce n'est pas mon premier cadre surmené.
          </h2>

          {/* Alain card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8">
            <div className="flex items-start gap-5 mb-6">
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp"
                alt="Alain Zenatti — Hypnothérapeute Paris"
                className="w-20 h-20 rounded-full object-cover flex-shrink-0 shadow-md"
                loading="lazy"
              />
              <div>
                <p className="font-serif font-bold text-white text-lg">Alain Zenatti</p>
                <p className="text-white/60 text-sm mb-2">Maître Praticien en Hypnose Ericksonienne</p>
              </div>
            </div>
            <p className="text-white/80 text-[0.95rem] leading-relaxed mb-4">
              Chaque semaine, je reçois à mon cabinet du Marais des professionnels comme vous : brillants, engagés — et épuisés. Avant d'être hypnothérapeute, j'ai connu le monde de l'entreprise. Je comprends la pression que vous vivez, le langage que vous utilisez, et les contraintes qui sont les vôtres.
            </p>
            <p className="text-white/80 text-[0.95rem] leading-relaxed">
              Je suis certifié <strong className="text-white">Maître Hypnologue</strong> avec 9 certifications professionnelles en hypnose ericksonienne et PNL. Mon approche est directe, sans jargon, orientée résultats.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '5/5', label: 'Note moyenne', icon: Star },
              { value: '40+', label: 'Avis vérifiés', icon: Users },
              { value: '3-5', label: 'Séances suffisent', icon: Clock },
              { value: '90%', label: 'Amélioration S1', icon: Zap },
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
                « M. Zenatti est posé et réfléchi. Son écoute attentive a permis de cibler les zones d'amélioration. En quelques séances, je me suis libéré de mes blocages et j'ai amorcé des changements durables. »
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

          {/* Future proof placeholders */}
          <p className="text-white/30 text-xs text-center mt-6">
            Emplacements réservés : témoignages vidéo de professionnels · étude de cas détaillée · chiffres de satisfaction
          </p>
        </div>
      </section>

      {/* ═══════════ 6. CTA FINAL ═══════════ */}
      <section className="py-16 sm:py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-4">
            Vous n'avez pas besoin de « tenir » plus longtemps.
          </h2>
          <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-8 max-w-lg mx-auto">
            Un premier échange — gratuit, sans engagement — pour faire le point
            sur votre situation et voir si l'hypnose peut vous aider.
            <br /><br />
            <strong className="text-nova-blue-dark">Vous ne repartirez pas les mains vides.</strong> Même en 15 minutes, je peux vous donner une première clé.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={RESALIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-nova-orange hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-lg shadow-lg shadow-orange-500/25"
            >
              Réserver un appel gratuit
              <ArrowRight size={20} />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold rounded-xl transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>

          <p className="text-gray-400 text-sm mb-2">
            ou appelez directement : <a href={PHONE_URL} className="text-nova-blue hover:underline font-medium">06 49 35 80 89</a>
          </p>
          <p className="text-gray-300 text-xs">
            Cabinet Paris 4e (Marais-Bastille) · Téléconsultation disponible · Je réponds personnellement
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
