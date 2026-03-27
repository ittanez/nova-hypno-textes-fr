import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Download from 'lucide-react/dist/esm/icons/download';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import BookOpen from 'lucide-react/dist/esm/icons/book-open';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import BlogArticlesSlider from '@/components/BlogArticlesSlider';

/* ─────────────────────────────────────────────
   Page isolée — Script d'autohypnose Gratitude
   Pas de Header / Footer — page isolée
   Téléchargement direct du script PDF
   ───────────────────────────────────────────── */

const PDF_URL =
  'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/pdf/Autohypnose-Vivre-dans-une-etat-de-gratitude.pdf';

const IMAGE_URL =
  'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/autohypnosegratitude.webp';

const benefits = [
  {
    icon: Heart,
    title: 'Ancrer la gratitude au quotidien',
    desc: 'Un protocole guidé pour cultiver un état de reconnaissance profonde, même dans les journées chargées.',
  },
  {
    icon: Sparkles,
    title: 'Reprogrammer votre regard',
    desc: "Entraînez votre cerveau à percevoir l'abondance plutôt que le manque — en 15 minutes par séance.",
  },
  {
    icon: BookOpen,
    title: 'Script complet prêt à lire',
    desc: 'Un texte structuré en phases hypnotiques : induction, approfondissement, suggestions, réveil.',
  },
  {
    icon: CheckCircle,
    title: 'Méthode NovaHypnose',
    desc: "Issu de la pratique clinique d'Alain Zenatti — hypnothérapeute ericksonien à Paris 4e depuis 5 ans.",
  },
];

const AutohypnoseGratitude: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Script d'autohypnose Gratitude — Téléchargement gratuit | NovaHypnose</title>
        <meta
          name="description"
          content="Téléchargez gratuitement le script d'autohypnose « Vivre dans un état de gratitude » d'Alain Zenatti. Un protocole hypnotique complet pour cultiver la reconnaissance et le mieux-être au quotidien."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/autohypnose-gratitude" />
        <meta property="og:title" content="Script d'autohypnose Gratitude — Téléchargement gratuit" />
        <meta
          property="og:description"
          content="Un script d'autohypnose complet pour vivre dans un état de gratitude. Téléchargez-le gratuitement."
        />
        <meta property="og:image" content={IMAGE_URL} />
        <meta property="og:url" content="https://novahypnose.fr/autohypnose-gratitude" />
      </Helmet>

      {/* ═══════════ HERO ═══════════ */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center bg-gradient-to-br from-nova-blue-dark via-nova-blue to-nova-blue-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

        {/* Left: content */}
        <div className="px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 order-2 lg:order-1 relative z-10">
          <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-5">
            Script gratuit &middot; Autohypnose &middot; Gratitude
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.8rem] xl:text-5xl font-bold leading-[1.15] text-white mb-5">
            Vivre dans un état<br />
            de <span className="text-nova-orange italic">gratitude</span>
          </h1>

          <h2 className="text-lg sm:text-xl font-medium text-white/90 mb-4">
            Un script d'autohypnose complet pour cultiver la reconnaissance au quotidien
          </h2>

          <p className="text-white/60 text-[1.05rem] leading-relaxed mb-8 max-w-lg">
            Téléchargez gratuitement ce protocole hypnotique guidé — à lire seul(e) ou à enregistrer
            pour vos séances personnelles.
          </p>

          <a
            href={PDF_URL}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-nova-orange hover:bg-nova-orange-dark text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
          >
            <Download size={22} />
            Télécharger le script gratuitement
          </a>

          <p className="text-white/40 text-xs mt-4 flex items-center gap-1.5">
            <CheckCircle size={12} />
            Format PDF · Accès immédiat · Aucune inscription requise
          </p>
        </div>

        {/* Right: script cover image */}
        <div className="flex justify-center items-center px-6 md:px-12 py-10 md:py-20 order-1 lg:order-2 relative z-10">
          <img
            src={IMAGE_URL}
            alt="Script d'autohypnose — Vivre dans un état de gratitude"
            className="w-[280px] sm:w-[340px] lg:w-[400px] rounded-2xl shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 object-cover"
            loading="eager"
          />
        </div>
      </section>

      {/* ═══════════ BÉNÉFICES ═══════════ */}
      <section className="py-20 px-6 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark text-center mb-4">
            Ce que vous allez pratiquer
          </h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12 text-[1.05rem]">
            Ce script d'autohypnose vous guide pas à pas pour ancrer un état intérieur de gratitude durable.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-nova-neutral rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <b.icon size={28} className="text-nova-orange mb-3" />
                <h3 className="font-semibold text-nova-blue-dark mb-2 text-[0.95rem]">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA de téléchargement intermédiaire */}
          <div className="text-center mt-12">
            <a
              href={PDF_URL}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-nova-orange hover:bg-nova-orange-dark text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
            >
              <Download size={18} />
              Télécharger le script PDF
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ EBOOK AUTOHYPNOSE ═══════════ */}
      <section className="py-20 px-6 lg:py-24 bg-nova-neutral">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-nova-blue-dark to-nova-blue rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-0">
              <div className="p-8 md:p-12">
                <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-4">
                  Ebook gratuit &middot; 37 pages &middot; 9 protocoles
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  Allez plus loin avec le guide<br />
                  <span className="text-nova-orange italic">L'Autohypnose au Quotidien</span>
                </h2>

                <p className="text-white/75 text-[1rem] leading-relaxed mb-6">
                  Ce script n'est qu'un aperçu. Le guide complet contient 9 protocoles testés — stress,
                  confiance, sommeil, phobies, gestion des émotions — expliqués étape par étape.
                </p>

                <ul className="space-y-2 mb-8">
                  {[
                    '37 pages de contenu pratique immédiatement applicable',
                    'Méthode NovaHypnose, testée sur 1 000+ clients',
                    'Reçu gratuitement par email en quelques minutes',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-white/80 text-sm">
                      <CheckCircle size={16} className="text-nova-green flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/guide-autohypnose"
                  className="inline-flex items-center gap-2 bg-white text-nova-blue-dark font-semibold px-7 py-3.5 rounded-xl hover:bg-nova-neutral active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
                >
                  Obtenir l'ebook gratuitement
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="hidden md:flex items-center justify-center px-8 py-8">
                <img
                  src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/ebookautohypnose.webp"
                  alt="Guide L'Autohypnose au Quotidien — 37 pages, 9 protocoles"
                  className="w-[180px] rounded-xl shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CAROUSEL BLOG ═══════════ */}
      <BlogArticlesSlider />

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

export default AutohypnoseGratitude;
