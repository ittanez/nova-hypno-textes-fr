import React from 'react';
import { Helmet } from 'react-helmet';
import ContentLayout from '@/components/layout/ContentLayout';
import BookOpen from 'lucide-react/dist/esm/icons/book-open';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Star from 'lucide-react/dist/esm/icons/star';
import Brain from 'lucide-react/dist/esm/icons/brain';
import Briefcase from 'lucide-react/dist/esm/icons/briefcase';
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3';
import Wrench from 'lucide-react/dist/esm/icons/wrench';
import Target from 'lucide-react/dist/esm/icons/target';
import Download from 'lucide-react/dist/esm/icons/download';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Shield from 'lucide-react/dist/esm/icons/shield';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Mail from 'lucide-react/dist/esm/icons/mail';

const benefits = [
  {
    icon: Target,
    title: '9 protocoles complets',
    desc: "Prêts à utiliser dès ce soir. Du sas de décompression 5 min au protocole de confiance approfondi.",
  },
  {
    icon: CheckCircle,
    title: '100% pratique',
    desc: "Pas de théorie abstraite. Chaque technique est expliquée étape par étape, testée sur 1000+ clients.",
  },
  {
    icon: Briefcase,
    title: 'Spécial professionnels',
    desc: "Conçu pour cadres/employés. Techniques utilisables au bureau, adaptées aux contraintes pro.",
  },
  {
    icon: Brain,
    title: 'Méthode NovaHypnose',
    desc: "Aperçu exclusif de mes protocoles propriétaires, utilisés en cabinet depuis 15 ans.",
  },
  {
    icon: BarChart3,
    title: 'Base scientifique',
    desc: "Neuroplasticité, méta-analyses, validation clinique. Efficacité prouvée, pas effet placebo.",
  },
  {
    icon: Wrench,
    title: 'Totalement autonome',
    desc: "Devenez indépendant dans votre pratique. Guide complet d'installation et troubleshooting.",
  },
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
  {
    text: "Enfin un guide sans blabla ! J'ai installé l'ancre anti-stress en 1 semaine, elle fonctionne en réunion difficile.",
    author: 'Sarah M.',
    role: 'Directrice Marketing',
  },
  {
    text: "Le protocole sommeil a changé ma vie. Plus de ruminations à 2h du matin. Merci pour ce guide gratuit de qualité.",
    author: 'Thomas R.',
    role: 'Consultant IT',
  },
  {
    text: "J'étais sceptique sur l'autohypnose. La base scientifique m'a convaincu, les résultats m'ont bluffé.",
    author: 'Marie L.',
    role: 'Contrôleuse de gestion',
  },
];

const GuideAutohypnose: React.FC = () => {
  return (
    <ContentLayout>
      <Helmet>
        <title>Télécharger "L'Autohypnose au Quotidien" - Guide Gratuit | NovaHypnose</title>
        <meta
          name="description"
          content="Téléchargez gratuitement le guide complet d'autohypnose d'Alain Zenatti. 30 pages, 9 protocoles testés pour gérer le stress, retrouver confiance et améliorer votre bien-être professionnel."
        />
        <link rel="canonical" href="https://novahypnose.fr/guide-autohypnose" />
      </Helmet>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative bg-gradient-to-br from-nova-blue-dark via-nova-blue to-nova-blue-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: content */}
          <div className="text-center md:text-left">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white mb-6">
              Reprenez la main sur votre{' '}
              <span className="text-nova-orange">bien-être intérieur</span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-medium text-white/90 mb-4">
              Téléchargez gratuitement<br />
              "L'Autohypnose au Quotidien"
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
              Le guide pratique qui a déjà aidé des centaines de professionnels à transformer leur relation au stress.
            </p>

            <a
              href="#telecharger"
              className="inline-flex items-center gap-2 px-8 py-4 bg-nova-orange text-white font-semibold rounded-lg text-lg hover:bg-nova-orange-dark hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              <Download size={20} />
              Téléchargement gratuit immédiat
            </a>
            <p className="mt-4 text-white/50 text-sm flex flex-wrap justify-center md:justify-start gap-4">
              <span className="flex items-center gap-1"><CheckCircle size={14} /> Aucune inscription</span>
              <span className="flex items-center gap-1"><CheckCircle size={14} /> Pas de newsletter</span>
              <span className="flex items-center gap-1"><CheckCircle size={14} /> Accès direct au PDF</span>
            </p>
          </div>

          {/* Right: ebook cover placeholder */}
          <div className="flex justify-center">
            <div className="w-[260px] sm:w-[300px] h-[370px] sm:h-[420px] rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl flex items-center justify-center -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="text-center px-6">
                <BookOpen size={48} className="text-nova-orange mx-auto mb-4" />
                <p className="font-serif text-white font-bold text-lg leading-snug mb-2">L'Autohypnose<br />au Quotidien</p>
                <p className="text-white/50 text-sm">Alain Zenatti</p>
                <p className="text-white/40 text-xs mt-2">30 pages &middot; 9 protocoles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ BÉNÉFICES ═══════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark text-center mb-12">
            Ce que vous allez découvrir en 30 pages
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
      <section className="py-20 px-6 bg-nova-neutral">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark text-center mb-10">
            Sommaire détaillé
          </h3>

          <div className="space-y-3">
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
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
      <section className="py-20 px-6 bg-nova-neutral">
        <div className="max-w-3xl mx-auto">
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
                  <span><strong>15 ans</strong> d'expérience en cabinet (Paris 4e)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-nova-green flex-shrink-0 mt-0.5" />
                  <span><strong>1000+ clients</strong> accompagnés individuellement</span>
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
                Mon objectif : démocratiser l'autohypnose auprès des professionnels qui n'ont pas le temps pour du développement personnel classique, mais qui ont besoin d'outils concrets, efficaces, et immédiatement applicables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA FINAL ═══════════ */}
      <section id="telecharger" className="py-20 px-6 bg-gradient-to-br from-nova-blue-dark to-nova-blue text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
            Prêt à transformer votre quotidien ?
          </h3>
          <p className="text-white/70 text-lg mb-8">
            Ce guide vous donne tout ce qu'il faut pour commencer <strong className="text-white">dès ce soir</strong>.
          </p>

          <a
            href="/autohypnose-au-quotidien.pdf"
            download
            className="inline-flex items-center gap-2 px-10 py-5 bg-nova-orange text-white font-bold rounded-lg text-lg hover:bg-nova-orange-dark hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            <Download size={22} />
            Oui, je télécharge le guide gratuit
          </a>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white/70 text-sm">
            <div className="flex flex-col items-center gap-1.5">
              <FileText size={20} className="text-nova-orange" />
              <span>PDF haute qualité</span>
              <span className="text-white/40 text-xs">30 pages</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Clock size={20} className="text-nova-orange" />
              <span>Téléchargement</span>
              <span className="text-white/40 text-xs">Immédiat</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Download size={20} className="text-nova-orange" />
              <span>Prix</span>
              <span className="text-white/40 text-xs">0&euro; (valeur 27&euro;)</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Shield size={20} className="text-nova-orange" />
              <span>Confidentialité</span>
              <span className="text-white/40 text-xs">Aucune donnée</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MINI FOOTER CONTACT ═══════════ */}
      <section className="py-10 px-6 bg-nova-neutral text-center">
        <p className="text-gray-500 text-sm flex flex-wrap justify-center gap-4">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            16 rue Saint-Antoine, 75004 Paris
          </span>
          <span className="flex items-center gap-1.5">
            <Phone size={14} />
            06 49 35 80 89
          </span>
          <span className="flex items-center gap-1.5">
            <Mail size={14} />
            <a href="mailto:alain.zenatti@novahypnose.fr" className="text-nova-blue hover:underline">
              alain.zenatti@novahypnose.fr
            </a>
          </span>
        </p>
      </section>
    </ContentLayout>
  );
};

export default GuideAutohypnose;
