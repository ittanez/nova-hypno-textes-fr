/**
 * Decryptage — tunnel « Décryptage » : 5 questions → décryptage personnalisé
 * → échange gratuit de 15 min (Calendly) ou première séance (Resalib).
 *
 * Page autonome (sans menu ni pied de page), direction visuelle « calme et
 * épuré » validée le 2026-11-08. Textes : src/data/decryptage.ts.
 *
 * Données de santé : aucune réponse n'est envoyée à GA4 (seulement le numéro
 * de l'étape). Les réponses ne quittent le navigateur que si la personne
 * saisit un email ET coche le consentement (fonction `decryptage-submit`).
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';
import { trackConversion, trackCTAClick, trackQuizStep } from '@/lib/analytics';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import {
  BANDEAU_PRUDENCE,
  BLOC_D,
  CALENDLY_URL,
  CONSENT_VERSION,
  MAX_AUTRE,
  MAX_MESSAGE,
  MAX_PRENOM,
  QUESTIONS,
  RESALIB_URL,
  SMS_NUMERO_AFFICHE,
  SMS_TEXTE,
  buildDecryptage,
  buildSmsHref,
  type DecryptageAnswers,
  type QuestionId,
} from '@/data/decryptage';
import './Decryptage.css';

type Step = 'intro' | 'questions' | 'form' | 'result';
type Partial5 = Partial<Record<QuestionId, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Extraits exacts d'avis Google réels (src/data/testimonials.ts), nom abrégé.
const AVIS = [
  {
    texte:
      "À l'écoute et très professionnel. Un entretien approfondi lui a permis de faire une analyse précise de ma demande et de mon mal être.",
    auteur: 'Sylvie K.',
  },
  {
    texte:
      "Un praticien calme et réfléchi. Son écoute attentive lui a permis de déterminer les axes de travail.",
    auteur: 'Philippe A.',
  },
];

/**
 * Réponse à la question 1 transmise par l'encart du blog, via l'état de
 * navigation (jamais dans l'URL : GA4 enregistre l'adresse des pages).
 */
function q1FromEncart(state: unknown): string | null {
  const v = (state as { q1?: unknown } | null)?.q1;
  if (typeof v !== 'string' || v === 'autre') return null;
  return QUESTIONS[0].options.some((o) => o.value === v) ? v : null;
}

const Decryptage = () => {
  const location = useLocation();
  const [q1Initial] = useState(() => q1FromEncart(location.state));
  const [step, setStep] = useState<Step>(q1Initial ? 'questions' : 'intro');
  const [index, setIndex] = useState(q1Initial ? 1 : 0);
  const [answers, setAnswers] = useState<Partial5>(q1Initial ? { q1: q1Initial } : {});
  const [autreTexte, setAutreTexte] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [formError, setFormError] = useState('');
  const [sending, setSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'none' | 'sent' | 'failed'>('none');
  const [showCalendly, setShowCalendly] = useState(false);
  const calendlyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { openResalibPopup } = useResalibPopup();

  const question = QUESTIONS[index];
  const emailSaisi = email.trim().length > 0;

  // Focus sur le titre à chaque changement d'écran (lecteurs d'écran, clavier).
  useEffect(() => {
    window.scrollTo({ top: 0 });
    headingRef.current?.focus();
  }, [step, index]);

  // Arrivée depuis l'encart du blog : la question 1 est déjà répondue.
  useEffect(() => {
    if (q1Initial) trackQuizStep('decryptage_q2_depuis_blog');
  }, [q1Initial]);

  // Calendly signale une réservation par postMessage.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      const data = e.data as { event?: string } | null;
      if (data?.event === 'calendly.event_scheduled') {
        trackConversion({ type: 'decryptage_appel_reserve' });
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const result = useMemo(() => {
    if (step !== 'result') return null;
    return buildDecryptage(answers as DecryptageAnswers, prenom, autreTexte);
  }, [step, answers, prenom, autreTexte]);

  const start = () => {
    trackQuizStep('decryptage_debut');
    setStep('questions');
    setIndex(0);
  };

  const next = () => {
    if (index < QUESTIONS.length - 1) {
      trackQuizStep(`decryptage_q${index + 2}`);
      setIndex(index + 1);
    } else {
      trackQuizStep('decryptage_formulaire');
      setStep('form');
    }
  };

  const choose = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    // « Autre chose » demande d'abord quelques mots, puis « Continuer ».
    if (question.id === 'q1' && value === 'autre') return;
    next();
  };

  const back = () => {
    if (step === 'form') {
      setStep('questions');
      setIndex(QUESTIONS.length - 1);
    } else if (index > 0) {
      setIndex(index - 1);
    } else {
      setStep('intro');
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const nom = prenom.trim();
    const mail = email.trim().toLowerCase();
    if (!nom) {
      setFormError('Indiquez votre prénom pour personnaliser le décryptage.');
      return;
    }
    if (mail && !EMAIL_RE.test(mail)) {
      setFormError("L'adresse email ne semble pas valide. Corrigez-la, ou laissez le champ vide.");
      return;
    }
    if (mail && !consent) {
      setFormError("Pour recevoir la copie par email, cochez la case d'accord. Sinon, laissez l'email vide.");
      return;
    }

    if (mail) {
      setSending(true);
      try {
        const { error } = await supabase.functions.invoke('decryptage-submit', {
          body: {
            prenom: nom,
            email: mail,
            answers,
            autreTexte: answers.q1 === 'autre' ? autreTexte.trim() : '',
            message: message.trim(),
            consentVersion: CONSENT_VERSION,
          },
        });
        if (error) throw error;
        setEmailStatus('sent');
        trackConversion({ type: 'decryptage_email' });
      } catch (err) {
        logger.error('decryptage-submit:', err);
        setEmailStatus('failed');
      } finally {
        setSending(false);
      }
    }
    trackQuizStep('decryptage_resultat');
    setStep('result');
  };

  const openCalendly = () => {
    trackCTAClick('decryptage_calendly', 'decryptage');
    setShowCalendly(true);
    requestAnimationFrame(() => calendlyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const calendlySrc = useMemo(() => {
    const params = new URLSearchParams({
      embed_type: 'Inline',
      embed_domain: typeof window !== 'undefined' ? window.location.hostname : 'novahypnose.fr',
      hide_gdpr_banner: '1',
      hide_event_type_details: '1',
    });
    if (prenom.trim()) params.set('name', prenom.trim());
    if (email.trim()) params.set('email', email.trim());
    return `${CALENDLY_URL}?${params.toString()}`;
  }, [prenom, email]);

  return (
    <div className="dx">
      <Helmet>
        <html lang="fr" />
        <title>Décryptage : 5 questions pour faire le point | NovaHypnose</title>
        <meta
          name="description"
          content="5 questions pour mettre des mots sur ce qui vous pèse, et un décryptage personnalisé. Gratuit, confidentiel, par Alain Zenatti, hypnothérapeute à Paris."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://novahypnose.fr/decryptage" />
      </Helmet>

      <main className="dx__wrap">
        <Link to="/" className="dx__logo" aria-label="NovaHypnose, retour à l'accueil">
          <span className="zen">Zen</span>
          <span className="atti">atti</span>
        </Link>

        {step === 'intro' && (
          <section className="dx__step dx__step--intro">
            <div className="dx__accent" aria-hidden="true" />
            <p className="dx__kicker">Décryptage · 2 minutes</p>
            <h1 ref={headingRef} tabIndex={-1} className="dx__h1">
              5 questions pour mettre des mots sur ce qui vous pèse
            </h1>
            <p className="dx__lead">
              Vous obtenez tout de suite un décryptage personnalisé : ce qui ressort de vos réponses, et des pistes
              concrètes.
            </p>
            <ul className="dx__points">
              <li>Gratuit et sans engagement</li>
              <li>Vos réponses restent confidentielles</li>
              <li>Des pistes, jamais un diagnostic</li>
            </ul>
            <div className="dx__bottom">
              <button type="button" className="dx__btn" onClick={start}>
                Commencer les 5 questions
              </button>
              <p className="dx__trust">
                Alain Zenatti, hypnothérapeute à Paris 4e et en visio
                <br />
                <span className="dx__stars" aria-hidden="true">
                  ★★★★★
                </span>{' '}
                5/5 sur Google
              </p>
            </div>
          </section>
        )}

        {step === 'questions' && (
          <section className="dx__step" key={question.id}>
            <div className="dx__top">
              <button type="button" className="dx__back" onClick={back}>
                ← Retour
              </button>
              <div className="dx__dots" role="img" aria-label={`Question ${index + 1} sur ${QUESTIONS.length}`}>
                {QUESTIONS.map((q, i) => (
                  <span key={q.id} className={`dx__dot${i <= index ? ' dx__dot--on' : ''}`} />
                ))}
              </div>
            </div>
            <h1 ref={headingRef} tabIndex={-1} className="dx__q">
              {question.title}
            </h1>
            <div className="dx__opts">
              {question.options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className="dx__opt"
                  aria-pressed={answers[question.id] === o.value}
                  onClick={() => choose(o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
            {question.id === 'q1' && answers.q1 === 'autre' && (
              <div className="dx__field">
                <label className="dx__label" htmlFor="dx-autre">
                  En quelques mots ? <small>(facultatif)</small>
                </label>
                <input
                  id="dx-autre"
                  className="dx__input"
                  value={autreTexte}
                  maxLength={MAX_AUTRE}
                  onChange={(e) => setAutreTexte(e.target.value)}
                  autoFocus
                />
                <button type="button" className="dx__btn" onClick={next} style={{ marginTop: 8 }}>
                  Continuer
                </button>
              </div>
            )}
            <p className="dx__hint">
              Question {index + 1} sur {QUESTIONS.length} · un clic suffit pour avancer
            </p>
          </section>
        )}

        {step === 'form' && (
          <form className="dx__step" onSubmit={submit} noValidate>
            <div className="dx__top">
              <button type="button" className="dx__back" onClick={back}>
                ← Retour
              </button>
            </div>
            <div className="dx__accent" aria-hidden="true" />
            <h1 ref={headingRef} tabIndex={-1} className="dx__q">
              Votre décryptage est prêt
            </h1>
            <div className="dx__field">
              <label className="dx__label" htmlFor="dx-prenom">
                Votre prénom
              </label>
              <input
                id="dx-prenom"
                className="dx__input"
                value={prenom}
                maxLength={MAX_PRENOM}
                autoComplete="given-name"
                required
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
            <div className="dx__field">
              <label className="dx__label" htmlFor="dx-email">
                Votre email <small>(facultatif, pour en recevoir une copie)</small>
              </label>
              <input
                id="dx-email"
                type="email"
                className="dx__input"
                value={email}
                autoComplete="email"
                inputMode="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailSaisi && (
              <label className="dx__check">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>
                  J'accepte que mes réponses soient enregistrées et transmises à Alain Zenatti pour préparer un
                  éventuel échange. Elles ne sont jamais partagées et sont supprimées au bout de 12 mois.{' '}
                  <Link to="/politique-de-confidentialite" target="_blank" rel="noopener">
                    Politique de confidentialité
                  </Link>
                </span>
              </label>
            )}
            <div className="dx__field">
              <label className="dx__label" htmlFor="dx-message">
                En une phrase, que voudriez-vous que je sache ? <small>(facultatif)</small>
              </label>
              <textarea
                id="dx-message"
                className="dx__input"
                value={message}
                maxLength={MAX_MESSAGE}
                onChange={(e) => setMessage(e.target.value)}
              />
              {!emailSaisi && message.trim() && (
                <p className="dx__note">Votre message ne me parvient que si vous indiquez un email.</p>
              )}
            </div>
            {formError && (
              <p className="dx__error" role="alert">
                {formError}
              </p>
            )}
            <div className="dx__bottom">
              <button type="submit" className="dx__btn" disabled={sending}>
                {sending ? 'Un instant…' : 'Voir mon décryptage'}
              </button>
              {!emailSaisi && (
                <p className="dx__note" style={{ textAlign: 'center' }}>
                  Sans email, vos réponses ne sont pas enregistrées.
                </p>
              )}
            </div>
          </form>
        )}

        {step === 'result' && result && (
          <article className="dx__step">
            <div className="dx__accent" aria-hidden="true" style={{ marginTop: 28 }} />
            <p className="dx__kicker">Votre décryptage</p>
            <h1 ref={headingRef} tabIndex={-1} className="dx__h1">
              {result.titre}
            </h1>
            <p className="dx__text">{result.blocA}</p>

            <div className="dx__card">
              <div>
                <h2 className="dx__sub">Votre parcours</h2>
                <p>{result.blocB}</p>
              </div>
              <hr />
              <div className={result.blocCEncadre ? 'dx__encadre' : undefined}>
                <h2 className="dx__sub">Une piste pour la suite</h2>
                <p>{result.blocC}</p>
              </div>
            </div>

            {emailStatus === 'sent' && (
              <p className="dx__note" role="status">
                Une copie vient de vous être envoyée à {email.trim()}.
              </p>
            )}
            {emailStatus === 'failed' && (
              <p className="dx__note" role="status">
                La copie par email n'a pas pu partir. Votre décryptage reste affiché ici.
              </p>
            )}

            <section className="dx__cta" aria-labelledby="dx-suite">
              <h2 id="dx-suite">{BLOC_D.titre}</h2>
              <p>{BLOC_D.texte}</p>
              <p className="dx__engagement">
                <strong>Mon engagement :</strong> {BLOC_D.engagement}
              </p>
              <button type="button" className="dx__btn dx__btn--light" onClick={openCalendly}>
                Choisir un créneau d'appel (15 min, gratuit)
              </button>
              <p className="dx__sms">
                {SMS_TEXTE}{' '}
                <a href={buildSmsHref(prenom)} onClick={() => trackCTAClick('sms', 'decryptage_result')}>
                  Envoyer un SMS au {SMS_NUMERO_AFFICHE}
                </a>
              </p>
            </section>

            {showCalendly && (
              <div className="dx__calendly" ref={calendlyRef}>
                <iframe src={calendlySrc} title="Choisir un créneau d'appel de 15 minutes" loading="lazy" />
              </div>
            )}

            <button type="button" className="dx__link" onClick={() => openResalibPopup(RESALIB_URL)}>
              Déjà décidé(e) ? Réserver directement une première séance (1h30, 90 €)
            </button>

            <section className="dx__avis" aria-label="Avis Google">
              <p className="dx__kicker">Ils en parlent sur Google</p>
              {AVIS.map((a) => (
                <figure key={a.auteur}>
                  <blockquote>« {a.texte} »</blockquote>
                  <figcaption>
                    <span className="dx__stars" aria-hidden="true">
                      ★★★★★
                    </span>
                    <span className="dx__sr">5 étoiles sur 5, </span> {a.auteur}
                  </figcaption>
                </figure>
              ))}
            </section>

            <p className="dx__prudence">{BANDEAU_PRUDENCE}</p>
          </article>
        )}
      </main>
    </div>
  );
};

export default Decryptage;
