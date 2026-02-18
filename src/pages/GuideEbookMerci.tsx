import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Play from 'lucide-react/dist/esm/icons/play';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';

/* ─────────────────────────────────────────────
   Thank You page — après soumission du formulaire guide
   Inclut : confirmation, vidéo, widget Calendly
   Page isolée (pas de Header / Footer)
   ───────────────────────────────────────────── */

const GuideEbookMerci: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prenom = (location.state as { prenom?: string })?.prenom || '';

  // Redirect if accessed directly without form submission
  useEffect(() => {
    if (!location.state) {
      navigate('/guide-emotions-travail', { replace: true });
    }
  }, [location.state, navigate]);

  // Load Calendly script
  useEffect(() => {
    if (document.querySelector('script[src*="calendly"]')) return;
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!location.state) return null;

  return (
    <>
      <Helmet>
        <title>Merci ! Votre guide arrive — NovaHypnose</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ═══════════ CONFIRMATION HERO ═══════════ */}
      <section className="bg-gradient-to-br from-white via-nova-neutral to-nova-blue-light/30 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={44} />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-nova-blue-dark leading-snug mb-4">
            {prenom ? `Merci ${prenom} !` : 'Merci !'}
          </h1>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-lg mx-auto mb-6">
            <div className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0 w-10 h-10 bg-nova-blue-light/30 rounded-full flex items-center justify-center">
                <Mail className="text-nova-blue" size={20} />
              </div>
              <div>
                <p className="font-semibold text-nova-blue-dark text-lg mb-1">
                  Votre guide arrive par email
                </p>
                <p className="text-gray-500 text-[0.95rem] leading-relaxed">
                  Vérifiez votre boîte de réception (et vos spams) dans les prochaines minutes.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-400">
              <Clock size={14} />
              <span>Délai de réception : environ 7 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ VIDEO ═══════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3">
            En attendant votre guide
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-3">
            Découvrez mon approche en vidéo
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8 text-[0.95rem] leading-relaxed">
            Prenez 2 minutes pour comprendre comment l'hypnose ericksonienne peut vous aider à retrouver
            un rapport apaisé à vos émotions.
          </p>

          {/* Video player placeholder — replace src with actual video URL */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-nova-blue-dark aspect-video max-w-2xl mx-auto group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="text-nova-blue-dark ml-1" size={32} />
              </div>
            </div>
            <img
              src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp"
              alt="Alain Zenatti — Présentation"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Vidéo de présentation — Alain Zenatti, Hypnothérapeute Paris 4e
          </p>
        </div>
      </section>

      {/* ═══════════ TRANSITION VERS CALENDLY ═══════════ */}
      <section className="bg-gradient-to-br from-nova-blue-dark to-nova-blue py-14 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Calendar className="text-white/80 mx-auto mb-4" size={36} />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
            Envie d'aller plus loin ?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto text-[0.95rem] leading-relaxed mb-2">
            Réservez un échange gratuit de 30 minutes — sans engagement.
            <br />
            Un moment pour faire le point sur ce que vous traversez, en toute confidentialité.
          </p>
        </div>
      </section>

      {/* ═══════════ CALENDLY WIDGET ═══════════ */}
      <section className="py-16 px-6 bg-nova-neutral">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-serif text-xl font-bold text-nova-blue-dark mb-2">
              Choisissez un créneau qui vous convient
            </h3>
            <p className="text-gray-500 text-sm">
              Consultation gratuite &middot; 30 minutes &middot; En cabinet ou en visio
            </p>
          </div>

          {/* Calendly inline widget */}
          <div
            className="calendly-inline-widget rounded-2xl overflow-hidden shadow-lg bg-white"
            data-url="https://calendly.com/zenatti/consultationhypnose?hide_event_type_details=1&hide_gdpr_banner=1"
            style={{ minWidth: '320px', height: '700px' }}
          />
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

export default GuideEbookMerci;
