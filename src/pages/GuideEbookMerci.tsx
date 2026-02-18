import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Clock from 'lucide-react/dist/esm/icons/clock';

import Calendar from 'lucide-react/dist/esm/icons/calendar';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';

/* ─────────────────────────────────────────────
   Thank You page — après soumission du formulaire guide
   Inclut : confirmation, widget Calendly
   Page isolée (pas de Header / Footer)
   ───────────────────────────────────────────── */

const CALENDLY_URL = 'https://calendly.com/zenatti/rdvtelephonique?hide_event_type_details=1&hide_gdpr_banner=1';

const GuideEbookMerci: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prenom = (location.state as { prenom?: string })?.prenom || '';
  const calendlyRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  // Redirect if accessed directly without form submission
  useEffect(() => {
    if (!location.state) {
      navigate('/guide-emotions-travail', { replace: true });
    }
  }, [location.state, navigate]);

  // 1. Load Calendly CSS + JS
  useEffect(() => {
    if (!location.state) return;

    // CSS
    if (!document.querySelector('link[href*="assets.calendly.com"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    // JS
    const win = window as unknown as Record<string, unknown>;
    if (win.Calendly) {
      setScriptReady(true);
      return;
    }

    const existing = document.querySelector('script[src*="assets.calendly.com"]');
    if (existing) {
      existing.addEventListener('load', () => setScriptReady(true));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setScriptReady(true);
    document.head.appendChild(script);
  }, [location.state]);

  // 2. Init widget once script is ready AND container is mounted
  useEffect(() => {
    if (!scriptReady || !calendlyRef.current) return;

    const win = window as unknown as Record<string, { initInlineWidget: (o: unknown) => void }>;
    if (win.Calendly) {
      // Clear any previous content
      calendlyRef.current.innerHTML = '';
      win.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: calendlyRef.current,
      });
    }
  }, [scriptReady]);

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

      {/* ═══════════ TEXTE D'ACCOMPAGNEMENT ═══════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <span className="block text-[11px] font-medium tracking-widest uppercase text-nova-orange mb-3 text-center">
            En attendant votre guide
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nova-blue-dark leading-snug mb-6 text-center">
            Pourquoi je vous ai préparé ce guide
          </h2>

          <div className="space-y-4 text-gray-600 text-[0.95rem] leading-relaxed">
            <p>
              {prenom ? `${prenom}, c` : 'C'}haque semaine, je reçois à mon cabinet des personnes qui me disent la même chose :
              <strong className="text-nova-blue-dark"> « Je ne comprends plus ce qui m'arrive. »</strong>
            </p>
            <p>
              Des cadres, des managers, des indépendants. Des gens brillants, compétents, engagés.
              Mais qui, un matin, se réveillent avec cette sensation que quelque chose a lâché à l'intérieur
              — sans savoir quoi, ni pourquoi.
            </p>
            <p>
              Ce guide, je l'ai écrit pour eux. Et pour vous, si vous vous reconnaissez.
            </p>
            <p>
              Il ne remplace pas un accompagnement. Mais il pose les <strong className="text-nova-blue-dark">bons mots sur ce que vous vivez</strong>.
              Et parfois, c'est exactement ce qu'il faut pour que les choses commencent à bouger.
            </p>
          </div>

          {/* Photo + signature */}
          <div className="mt-10 flex items-center gap-5 bg-nova-neutral rounded-xl p-5">
            <img
              src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp"
              alt="Alain Zenatti — Hypnothérapeute Paris"
              className="w-20 h-20 rounded-full object-cover flex-shrink-0 shadow-md"
              loading="lazy"
            />
            <div>
              <p className="font-serif font-bold text-nova-blue-dark mb-0.5">Alain Zenatti</p>
              <p className="text-sm text-gray-500 mb-1">
                Maître Praticien en Hypnose Ericksonienne
              </p>
              <p className="text-sm text-gray-400 italic">
                « Mon rôle n'est pas de vous faire changer — c'est de vous aider à redevenir vous-même. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TRANSITION VERS CALENDLY ═══════════ */}
      <section className="bg-gradient-to-br from-nova-blue-dark to-nova-blue py-14 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Calendar className="text-white/80 mx-auto mb-4" size={36} />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
            Envie d'aller plus loin ?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto text-[0.95rem] leading-relaxed">
            Un premier échange téléphonique — gratuit, sans engagement.
            <br />
            Pour faire le point sur votre situation, poser vos questions,
            et voir si un accompagnement a du sens pour vous.
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
              Appel téléphonique gratuit &middot; Sans engagement
            </p>
          </div>

          {/* Calendly widget — initialisé via initInlineWidget */}
          <div
            ref={calendlyRef}
            className="rounded-2xl overflow-hidden shadow-lg bg-white"
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
