import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";

const SUPABASE_FUNCTION_URL =
  "https://akrlyzmfszumibwgocae.supabase.co/functions/v1/questionnaire-ebook";

type EbookKey = "autohypnose" | "sommeil" | "procrastination";

const EBOOK_LABELS: Record<EbookKey, string> = {
  autohypnose: "Auto-hypnose",
  sommeil: "Sommeil",
  procrastination: "Procrastination",
};

interface FormState {
  ebook_telecharge: EbookKey | "";
  sujet_principal: string;       // Q1 multi-choix
  pepite_ebook: string;          // Q2 libre court
  pratique_ressenti: string;     // Q3 libre
  interrogation_principale: string; // Q4 multi-choix
  deja_seance: string;           // Q5 oui/non
  prochain_guide: string;        // Q6 libre
  localisation: string;          // Q7
  email: string;                 // Q8
}

const INITIAL_STATE: FormState = {
  ebook_telecharge: "",
  sujet_principal: "",
  pepite_ebook: "",
  pratique_ressenti: "",
  interrogation_principale: "",
  deja_seance: "",
  prochain_guide: "",
  localisation: "",
  email: "",
};

const QuestionnaireEbook = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const ebookFromUrl = searchParams.get("ebook") as EbookKey | null;
  const emailFromUrl = searchParams.get("email") ?? "";

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    ...INITIAL_STATE,
    ebook_telecharge: ebookFromUrl && EBOOK_LABELS[ebookFromUrl] ? ebookFromUrl : "",
    email: emailFromUrl,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<{ code_promo: string | null; bon_valide_jusqu_au: string } | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ── Méthode "Entonnoir inversé" : besoins → utilité → frein → admin ──
  const steps = useMemo(
    () => [
      // Q1 — Le crochet : besoin actuel
      {
        title: "Aujourd'hui, quel est le sujet qui vous occupe le plus ?",
        subtitle: "Plusieurs choix possibles — il n'y a pas de mauvaise réponse.",
        render: () => (
          <CheckboxGroup
            value={form.sujet_principal}
            onChange={(v) => update("sujet_principal", v)}
            options={[
              "Stress / anxiété",
              "Sommeil",
              "Confiance en soi",
              "Phobie",
              "Douleur",
              "Procrastination",
              "Émotions difficiles",
              "Autre",
            ]}
          />
        ),
        isValid: () => form.sujet_principal.length > 0,
      },
      // Q2 — L'utilité : la pépite
      {
        title: "Concernant l'ebook que vous avez téléchargé,\nquelle est la « pépite » que vous avez trouvée la plus utile ?",
        subtitle: "Le conseil, l'exercice ou la phrase qui vous a parlé.",
        render: () => (
          <input
            type="text"
            value={form.pepite_ebook}
            onChange={(e) => update("pepite_ebook", e.target.value)}
            placeholder="Ex. l'exercice du lieu sûr, l'idée que…"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-nova-blue"
          />
        ),
        isValid: () => true,
      },
      // Q3 — Le progrès
      {
        title: "Avez-vous réussi à mettre en pratique un exercice ?",
        subtitle: "Si oui, qu'avez-vous ressenti ? Sinon, qu'est-ce qui vous a freiné·e ?",
        render: () => (
          <textarea
            rows={5}
            value={form.pratique_ressenti}
            onChange={(e) => update("pratique_ressenti", e.target.value)}
            placeholder="Quelques mots suffisent…"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-nova-blue resize-none"
          />
        ),
        isValid: () => true,
      },
      // Q4 — Le frein
      {
        title: "Si vous deviez consulter un hypnothérapeute demain,\nquelle serait votre principale interrogation ?",
        subtitle: "Plusieurs choix possibles.",
        render: () => (
          <CheckboxGroup
            value={form.interrogation_principale}
            onChange={(v) => update("interrogation_principale", v)}
            options={[
              "Le prix",
              "La peur de perdre le contrôle",
              "La distance",
              "Le manque de temps",
              "Comment choisir le bon praticien",
              "Est-ce que ça va vraiment marcher pour moi",
              "Autre",
            ]}
          />
        ),
        isValid: () => true,
      },
      // Q5 — L'antécédent
      {
        title: "Avez-vous déjà vécu une séance d'hypnose auparavant ?",
        render: () => (
          <RadioGroup
            name="deja_seance"
            value={form.deja_seance}
            onChange={(v) => update("deja_seance", v)}
            options={[
              { label: "Oui", value: "oui" },
              { label: "Non, ce serait une première", value: "non" },
            ]}
          />
        ),
        isValid: () => form.deja_seance !== "",
      },
      // Q6 — Le futur
      {
        title: "Quel sujet aimeriez-vous que je traite\ndans mon prochain guide ?",
        subtitle: "Votre suggestion guidera mes prochains contenus.",
        render: () => (
          <textarea
            rows={4}
            value={form.prochain_guide}
            onChange={(e) => update("prochain_guide", e.target.value)}
            placeholder="Ex. la confiance en soi, la douleur chronique…"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-nova-blue resize-none"
          />
        ),
        isValid: () => true,
      },
      // Q7 — Profil ultra-simplifié
      {
        title: "Où êtes-vous situé·e ?",
        subtitle: "Pour adapter mes propositions (cabinet à Paris ou visio).",
        render: () => (
          <RadioGroup
            name="localisation"
            value={form.localisation}
            onChange={(v) => update("localisation", v)}
            options={[
              { label: "Paris / Île-de-France", value: "Paris" },
              { label: "Province", value: "Province" },
              { label: "Étranger", value: "Etranger" },
            ]}
          />
        ),
        isValid: () => form.localisation !== "",
      },
      // Q8 — La récompense
      {
        title: "À quelle adresse souhaitez-vous recevoir\nvotre chèque cadeau de 10€ ?",
        subtitle: "Valable 6 mois sur votre première consultation. Vos données restent confidentielles.",
        render: () => (
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="votre@email.fr"
            autoFocus
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-nova-blue"
          />
        ),
        isValid: () =>
          form.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
      },
    ],
    [form]
  );

  const totalSteps = steps.length;
  const current = steps[step];
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  // Estimation du temps restant (~10s par question)
  const minutesRemaining = Math.max(1, Math.ceil(((totalSteps - step - 1) * 12) / 60));
  const reassuringTime =
    step === 0
      ? "Cela vous prendra moins de 2 minutes."
      : step >= totalSteps - 2
      ? "Vous y êtes presque !"
      : `Encore ${minutesRemaining} minute${minutesRemaining > 1 ? "s" : ""}…`;

  // Validation par Entrée (sauf textarea)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
        if (status === "idle" && current.isValid()) {
          if (step < totalSteps - 1) setStep((s) => s + 1);
          else handleSubmit();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, form, status]);

  const handleNext = () => {
    if (!current.isValid()) return;
    if (step < totalSteps - 1) setStep((s) => s + 1);
    else handleSubmit();
  };

  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setResult({
          code_promo: data.code_promo ?? null,
          bon_valide_jusqu_au: data.bon_valide_jusqu_au ?? "",
        });
        setStatus("success");
      } else {
        setErrorMsg(data.error ?? `Erreur ${res.status}`);
        setStatus("error");
      }
    } catch {
      setErrorMsg("Impossible de contacter le serveur. Réessayez dans un instant.");
      setStatus("error");
    }
  };

  // ── Écran de remerciement ──
  if (status === "success") {
    return (
      <>
        <Helmet>
          <title>Merci ! — Votre crédit de bienvenue NovaHypnose</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <main className="min-h-screen bg-gradient-to-b from-nova-blue-light to-white flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl w-full text-center">
            <div className="text-5xl mb-4">🎁</div>
            <h1 className="text-3xl font-serif font-bold text-nova-blue-dark mb-3">
              Merci pour votre temps.
            </h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Vos retours sont précieux et m'aideront à concevoir de meilleurs contenus.
            </p>
            {result?.code_promo ? (
              <>
                <div className="bg-orange-50 border-2 border-dashed border-nova-orange rounded-xl p-6 mb-6">
                  <div className="text-sm text-gray-600 uppercase tracking-wider mb-1">
                    Votre crédit de bienvenue
                  </div>
                  <div className="text-3xl font-bold text-nova-blue-dark font-mono mb-2">
                    {result.code_promo}
                  </div>
                  <div className="text-sm text-gray-600">
                    Valable jusqu'au <strong>{result.bon_valide_jusqu_au}</strong>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-6">
                  Un email vient de vous être envoyé avec votre code et un lien
                  pour réserver votre séance.
                </p>
                <a
                  href={`https://novahypnose.fr/#contact?code=${result.code_promo}`}
                  className="inline-block px-8 py-3 bg-nova-orange text-white rounded-full hover:bg-nova-orange-dark transition-colors font-semibold shadow-lg"
                >
                  Réserver ma séance avec mon crédit
                </a>
              </>
            ) : (
              <>
                <p className="text-gray-700 mb-6">
                  Vos réponses ont bien été enregistrées.
                </p>
                <a
                  href="https://novahypnose.fr"
                  className="inline-block px-8 py-3 bg-nova-blue text-white rounded-full hover:bg-nova-blue-dark transition-colors font-semibold"
                >
                  Retour sur novahypnose.fr
                </a>
              </>
            )}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Votre avis m'est précieux — NovaHypnose</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="min-h-screen bg-gradient-to-b from-nova-blue-light to-white flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* ── Hero / Accroche ── */}
          <div className="text-center mb-8 px-2">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-nova-blue-dark leading-tight mb-3">
              Votre avis m'est précieux.
            </h1>
            <p className="text-gray-700 leading-relaxed max-w-xl mx-auto">
              Pour vous remercier de votre aide, je crédite{" "}
              <strong className="text-nova-orange">10€ sur votre compte</strong>{" "}
              pour votre première séance d'hypnose à la fin de ce court formulaire.
            </p>
          </div>

          {/* ── Barre de progression rassurante ── */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span className="font-medium">
                Étape {step + 1} / {totalSteps}
              </span>
              <span className="text-nova-blue-dark italic">{reassuringTime}</span>
            </div>
            <div
              className="h-2 bg-gray-200 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-gradient-to-r from-nova-blue to-nova-orange transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* ── Carte question ── */}
          <div key={step} className="bg-white rounded-2xl shadow-xl p-8 md:p-10 animate-fadeIn">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-nova-blue-dark mb-3 leading-snug whitespace-pre-line">
              {current.title}
            </h2>
            {current.subtitle && (
              <p className="text-gray-600 mb-6 leading-relaxed">{current.subtitle}</p>
            )}

            <div className="mt-6">{current.render()}</div>

            {status === "error" && (
              <p className="text-red-600 text-sm mt-6">
                {errorMsg}{" "}
                <a href="mailto:contact@novahypnose.fr" className="underline">
                  contact@novahypnose.fr
                </a>
              </p>
            )}

            {/* ── Navigation ── */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 0 || status === "loading"}
                className="px-5 py-2 text-gray-600 hover:text-nova-blue-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Précédent
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!current.isValid() || status === "loading"}
                className="px-8 py-3 bg-nova-orange text-white rounded-full shadow-lg hover:bg-nova-orange-dark transition-colors font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "loading"
                  ? "Envoi…"
                  : step === totalSteps - 1
                  ? "Recevoir mon crédit de 10€"
                  : "Suivant →"}
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Vos réponses restent confidentielles et servent uniquement à
            améliorer mes contenus.
          </p>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.35s ease-out; }
      `}</style>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants
// ─────────────────────────────────────────────────────────────────────────────

interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}

const RadioGroup = ({ name, value, onChange, options }: RadioGroupProps) => (
  <div className="space-y-3" role="radiogroup" aria-label={name}>
    {options.map((opt) => {
      const selected = value === opt.value;
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
            selected
              ? "border-nova-orange bg-orange-50 text-nova-blue-dark font-semibold"
              : "border-gray-200 hover:border-nova-blue hover:bg-gray-50 text-gray-700"
          }`}
          aria-pressed={selected}
        >
          <span className="flex items-center gap-3">
            <span
              className={`inline-flex items-center justify-center w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                selected ? "border-nova-orange bg-nova-orange" : "border-gray-300"
              }`}
            >
              {selected && <span className="w-2 h-2 bg-white rounded-full" />}
            </span>
            <span>{opt.label}</span>
          </span>
        </button>
      );
    })}
  </div>
);

interface CheckboxGroupProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

const CheckboxGroup = ({ value, onChange, options }: CheckboxGroupProps) => {
  const selected = value ? value.split("|").filter(Boolean) : [];

  const toggle = (opt: string) => {
    const next = selected.includes(opt)
      ? selected.filter((v) => v !== opt)
      : [...selected, opt];
    onChange(next.join("|"));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`text-left px-4 py-3 rounded-xl border-2 transition-all ${
              isSelected
                ? "border-nova-orange bg-orange-50 text-nova-blue-dark font-semibold"
                : "border-gray-200 hover:border-nova-blue hover:bg-gray-50 text-gray-700"
            }`}
            aria-pressed={isSelected}
          >
            <span className="flex items-center gap-2">
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded border-2 flex-shrink-0 ${
                  isSelected ? "border-nova-orange bg-nova-orange" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
              <span>{opt}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default QuestionnaireEbook;
