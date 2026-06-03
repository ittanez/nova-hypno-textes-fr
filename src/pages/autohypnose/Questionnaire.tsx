import { useState } from "react";
import { Helmet } from "react-helmet";
import CzLayout from "@/components/charte/CzLayout";

const SUPABASE_FUNCTION_URL =
  "https://akrlyzmfszumibwgocae.supabase.co/functions/v1/formation-questionnaire";

const AutohypnoseQuestionnaire = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const emailFromUrl = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(emailFromUrl);
  const [region, setRegion] = useState("");
  const [jour, setJour] = useState("");
  const [theme, setTheme] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''}`,
        },
        body: JSON.stringify({
          email,
          region,
          jour_prefere: jour,
          theme_prioritaire: theme,
          commentaire_libre: commentaire,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? `Erreur ${res.status}`);
        setStatus("error");
      }
    } catch (err) {
      if (err instanceof Error) setErrorMsg(err.message);
      setStatus("error");
    }
  };

  const radioStyle = {
    accentColor: 'var(--cobalt)',
    width: 16,
    height: 16,
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
    fontSize: '.93rem',
    color: 'var(--corps, #2e3a50)',
  };

  return (
    <CzLayout>
      <Helmet>
        <title>Vos préférences — Formation Auto-hypnose | NovaHypnose</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <main style={{ minHeight: '100vh', background: 'var(--lin)' }}>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-q">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={5} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={9} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
          </defs>
        </svg>
        <div aria-hidden="true" style={{ position: 'fixed', top: 0, right: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
            <g filter="url(#riso-q)">
              <path d="M 1100 -50 C 1250 0, 1380 80, 1440 160 L 1440 0 L 800 0 Z" fill="#F2A12E" opacity="0.55" />
            </g>
            <g filter="url(#riso-q)" style={{ mixBlendMode: 'multiply' as const }}>
              <path d="M 0 780 C 150 720, 400 700, 650 740 L 650 900 L 0 900 Z" fill="#2B4BA0" opacity="0.5" />
            </g>
          </svg>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: 600, margin: '0 auto', padding: '60px 24px' }}>
          <div className="reveal">
            <div className="tag" style={{ display: 'inline-block', marginBottom: 16 }}>Formation Auto-hypnose</div>
            <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, color: 'var(--texte)', lineHeight: 1.2, marginBottom: 16 }}>
              Aidez-moi à construire<br/><em style={{ color: 'var(--cobalt)', fontStyle: 'italic' }}>la bonne session pour vous</em>
            </h1>
            <p style={{ fontSize: '.95rem', color: 'var(--corps, #2e3a50)', opacity: .8, marginBottom: 48 }}>
              Quelques secondes suffisent. Vos réponses me permettront de programmer une session vraiment adaptée.
            </p>
          </div>

          {status === "success" ? (
            <div style={{ background: 'var(--paper, #F5F2EB)', borderRadius: 16, padding: '48px 40px', textAlign: 'center', fontFamily: 'var(--f-serif)', fontSize: '1.2rem', color: 'var(--texte)' }}>
              Merci ! Vos préférences sont bien enregistrées.
              <br/>
              <span style={{ fontFamily: 'var(--f-sans)', fontSize: '.9rem', color: 'var(--gris)', fontStyle: 'normal' }}>
                Vous recevrez un email de confirmation dans quelques instants.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: 'var(--paper, #F5F2EB)', borderRadius: 16, padding: '40px', display: 'flex', flexDirection: 'column', gap: 40 }}>

              {/* Email — affiché si absent de l'URL */}
              {!emailFromUrl && (
                <div>
                  <label htmlFor="q-email" style={{ display: 'block', fontFamily: 'var(--f-serif)', fontSize: '1.05rem', color: 'var(--texte)', marginBottom: 12, fontWeight: 400 }}>
                    Votre email
                  </label>
                  <input
                    id="q-email"
                    type="email"
                    placeholder="votre@email.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      border: '1px solid rgba(43,75,160,.2)',
                      borderRadius: 8,
                      padding: '12px 16px',
                      fontSize: '.93rem',
                      color: 'var(--texte)',
                      background: 'var(--lin)',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              )}

              {/* Question 1 — Région */}
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontFamily: 'var(--f-serif)', fontSize: '1.05rem', color: 'var(--texte)', marginBottom: 16, display: 'block', fontWeight: 400 }}>
                  Vous êtes plutôt...
                </legend>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: "En Île-de-France", value: "IDF" },
                    { label: "Ailleurs en France", value: "Autre" },
                  ].map((opt) => (
                    <label key={opt.value} style={labelStyle}>
                      <input
                        type="radio"
                        name="region"
                        value={opt.value}
                        checked={region === opt.value}
                        onChange={() => setRegion(opt.value)}
                        required
                        style={radioStyle}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Question 2 — Jour */}
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontFamily: 'var(--f-serif)', fontSize: '1.05rem', color: 'var(--texte)', marginBottom: 16, display: 'block', fontWeight: 400 }}>
                  Vous préférez quel jour ?
                </legend>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {["Samedi", "Dimanche"].map((j) => (
                    <label key={j} style={labelStyle}>
                      <input
                        type="radio"
                        name="jour"
                        value={j}
                        checked={jour === j}
                        onChange={() => setJour(j)}
                        required
                        style={radioStyle}
                      />
                      {j}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Question 3 — Thème */}
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontFamily: 'var(--f-serif)', fontSize: '1.05rem', color: 'var(--texte)', marginBottom: 16, display: 'block', fontWeight: 400 }}>
                  Quel thème vous tient le plus à cœur ?
                </legend>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: "Gestion du stress", value: "Stress" },
                    { label: "Sommeil", value: "Sommeil" },
                    { label: "Confiance en soi", value: "Confiance" },
                    { label: "Autre", value: "Autre" },
                  ].map((opt) => (
                    <label key={opt.value} style={labelStyle}>
                      <input
                        type="radio"
                        name="theme"
                        value={opt.value}
                        checked={theme === opt.value}
                        onChange={() => setTheme(opt.value)}
                        required
                        style={radioStyle}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Question 4 — Commentaire */}
              <div>
                <label htmlFor="commentaire" style={{ fontFamily: 'var(--f-serif)', fontSize: '1.05rem', color: 'var(--texte)', marginBottom: 12, display: 'block', fontWeight: 400 }}>
                  Un mot à ajouter ? <span style={{ fontSize: '.85rem', color: 'var(--gris)', fontFamily: 'var(--f-sans)', fontWeight: 400 }}>(optionnel)</span>
                </label>
                <textarea
                  id="commentaire"
                  rows={4}
                  placeholder="Un contexte particulier, une question..."
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                  style={{
                    width: '100%',
                    border: '1px solid rgba(43,75,160,.2)',
                    borderRadius: 8,
                    padding: '12px 16px',
                    fontSize: '.93rem',
                    color: 'var(--texte)',
                    background: 'var(--lin)',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'var(--f-sans)',
                  }}
                />
              </div>

              {status === "error" && (
                <p style={{ color: '#c0392b', fontSize: '.88rem' }}>
                  {errorMsg || "Une erreur est survenue."}{" "}
                  <a href="mailto:contact@novahypnose.fr" style={{ textDecoration: 'underline' }}>
                    contact@novahypnose.fr
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn--primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              >
                {status === "loading" ? "Envoi en cours…" : "Envoyer mes préférences →"}
              </button>
            </form>
          )}
        </div>
        </div>
      </main>
    </CzLayout>
  );
};

export default AutohypnoseQuestionnaire;
