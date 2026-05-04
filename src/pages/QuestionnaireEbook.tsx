import { useState, useEffect } from "react";
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
  utilisation_ebook: string;
  progression: string;
  deja_consulte_hypnotherapeute: string;
  freins_consultation: string;
  besoin_si_consultation: string;
  prochain_ebook_souhaite: string;
  zone_geographique: string;
  genre: string;
  tranche_age: string;
  email: string;
}

const INITIAL_STATE: FormState = {
  ebook_telecharge: "",
  utilisation_ebook: "",
  progression: "",
  deja_consulte_hypnotherapeute: "",
  freins_consultation: "",
  besoin_si_consultation: "",
  prochain_ebook_souhaite: "",
  zone_geographique: "",
  genre: "",
  tranche_age: "",
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

  // Étapes du carrousel — chaque step est une "slide"
  const steps = [
    {
      key: "ebook_telecharge",
      title: "Quel ebook avez-vous téléchargé ?",
      required: true,
      render: () => (
        <RadioGroup
          name="ebook"
          value={form.ebook_telecharge}
          onChange={(v) => update("ebook_telecharge", v as EbookKey)}
          options={[
            { label: "L'auto-hypnose", value: "autohypnose" },
            { label: "Le sommeil", value: "sommeil" },
            { label: "La procrastination", value: "procrastination" },
          ]}
        />
      ),
      isValid: () => form.ebook_telecharge !== "",
    },
    {
      key: "utilisation_ebook",
      title: "Comment l'avez-vous utilisé ?",
      required: false,
      render: () => (
        <RadioGroup
          name="utilisation"
          value={form.utilisation_ebook}
          onChange={(v) => update("utilisation_ebook", v)}
          options={[
            { label: "Je l'ai lu en entier et appliqué les exercices", value: "lu_applique" },
            { label: "Je l'ai lu mais peu pratiqué les exercices", value: "lu_peu_pratique" },
            { label: "Je l'ai survolé", value: "survole" },
            { label: "Je ne l'ai pas encore ouvert", value: "pas_ouvert" },
          ]}
        />
      ),
      isValid: () => true,
    },
    {
      key: "progression",
      title: "Où en êtes-vous aujourd'hui ?",
      required: false,
      render: () => (
        <RadioGroup
          name="progression"
          value={form.progression}
          onChange={(v) => update("progression", v)}
          options={[
            { label: "J'ai vu de vrais changements", value: "changements" },
            { label: "J'ai des progrès partiels", value: "progres_partiels" },
            { label: "Je n'ai pas encore vu de différence", value: "aucun_changement" },
            { label: "Je n'ai pas commencé", value: "pas_commence" },
          ]}
        />
      ),
      isValid: () => true,
    },
    {
      key: "deja_consulte_hypnotherapeute",
      title: "Avez-vous déjà consulté un hypnothérapeute ?",
      required: false,
      render: () => (
        <RadioGroup
          name="consulte"
          value={form.deja_consulte_hypnotherapeute}
          onChange={(v) => update("deja_consulte_hypnotherapeute", v)}
          options={[
            { label: "Oui, plusieurs fois", value: "oui_plusieurs" },
            { label: "Oui, une fois", value: "oui_une" },
            { label: "Non, jamais", value: "non" },
            { label: "Non, mais j'y pense", value: "non_y_pense" },
          ]}
        />
      ),
      isValid: () => true,
    },
    {
      key: "freins_consultation",
      title: "Qu'est-ce qui vous freine à consulter un hypnothérapeute ?",
      subtitle: "Plusieurs choix possibles",
      required: false,
      render: () => (
        <CheckboxGroup
          value={form.freins_consultation}
          onChange={(v) => update("freins_consultation", v)}
          options={[
            "Le prix",
            "La distance / pas de praticien proche",
            "Je ne sais pas comment choisir",
            "J'ai peur que ça ne marche pas",
            "J'ai peur de perdre le contrôle",
            "Le manque de temps",
            "Je préfère gérer seul·e",
            "Aucun frein particulier",
          ]}
        />
      ),
      isValid: () => true,
    },
    {
      key: "besoin_si_consultation",
      title: "Si vous deviez consulter, ce serait pour quel besoin ?",
      subtitle: "Plusieurs choix possibles",
      required: false,
      render: () => (
        <CheckboxGroup
          value={form.besoin_si_consultation}
          onChange={(v) => update("besoin_si_consultation", v)}
          options={[
            "Stress / anxiété",
            "Sommeil",
            "Confiance en soi",
            "Phobie",
            "Douleur",
            "Procrastination",
            "Émotions difficiles",
            "Comportement alimentaire",
            "Arrêt du tabac",
            "Autre",
          ]}
        />
      ),
      isValid: () => true,
    },
    {
      key: "prochain_ebook_souhaite",
      title: "Si je sortais un nouvel ebook, sur quel sujet le voudriez-vous ?",
      subtitle: "Réponse libre — exemples : douleur, confiance en soi, phobie…",
      required: false,
      render: () => (
        <textarea
          rows={4}
          value={form.prochain_ebook_souhaite}
          onChange={(e) => update("prochain_ebook_souhaite", e.target.value)}
          placeholder="Votre suggestion…"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-nova-blue resize-none"
        />
      ),
      isValid: () => true,
    },
    {
      key: "zone_geographique",
      title: "Où habitez-vous ?",
      required: false,
      render: () => (
        <RadioGroup
          name="zone"
          value={form.zone_geographique}
          onChange={(v) => update("zone_geographique", v)}
          options={[
            { label: "Paris / Île-de-France", value: "Paris-IDF" },
            { label: "Ailleurs en France", value: "Hors-IDF" },
            { label: "À l'étranger", value: "Etranger" },
          ]}
        />
      ),
      isValid: () => true,
    },
    {
      key: "genre",
      title: "Vous êtes…",
      required: false,
      render: () => (
        <RadioGroup
          name="genre"
          value={form.genre}
          onChange={(v) => update("genre", v)}
          options={[
            { label: "Une femme", value: "femme" },
            { label: "Un homme", value: "homme" },
            { label: "Autre / Préfère ne pas dire", value: "autre" },
          ]}
        />
      ),
      isValid: () => true,
    },
    {
      key: "tranche_age",
      title: "Votre tranche d'âge",
      required: false,
      render: () => (
        <RadioGroup
          name="age"
          value={form.tranche_age}
          onChange={(v) => update("tranche_age", v)}
          options={[
            { label: "Moins de 25 ans", value: "<25" },
            { label: "25 – 34 ans", value: "25-34" },
            { label: "35 – 44 ans", value: "35-44" },
            { label: "45 – 54 ans", value: "45-54" },
            { label: "55 – 64 ans", value: "55-64" },
            { label: "65 ans et plus", value: "65+" },
          ]}
        />
      ),
      isValid: () => true,
    },
    {
      key: "email",
      title: "Recevez votre bon de 10€",
      subtitle:
        "Laissez-moi votre email pour recevoir un bon de 10€ valable sur votre première séance d'hypnothérapie (en cabinet à Paris ou en visio). Email facultatif.",
      required: false,
      render: () => (
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="votre@email.fr"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-nova-blue"
        />
      ),
      isValid: () => form.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    },
  ];

  const totalSteps = steps.length;
  const current = steps[step];
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  // Permet de valider avec Entrée (sauf textarea)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
        if (status === "idle" && current.isValid()) {
          if (step < totalSteps - 1) {
            setStep((s) => s + 1);
          } else {
            handleSubmit();
          }
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

  if (status === "success") {
    return (
      <>
        <Helmet>
          <title>Merci ! — Questionnaire NovaHypnose</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <main className="min-h-screen bg-gradient-to-b from-nova-blue-light to-white flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl w-full text-center">
            <div className="text-5xl mb-4">🎁</div>
            <h1 className="text-3xl font-serif font-bold text-nova-blue-dark mb-3">
              Merci pour vos réponses !
            </h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Vos retours sont précieux et m'aideront à concevoir de meilleurs contenus.
            </p>
            {result?.code_promo ? (
              <div className="bg-orange-50 border-2 border-dashed border-nova-orange rounded-xl p-6 mb-6">
                <div className="text-sm text-gray-600 uppercase tracking-wider mb-1">
                  Votre bon de 10€
                </div>
                <div className="text-3xl font-bold text-nova-blue-dark font-mono mb-2">
                  {result.code_promo}
                </div>
                <div className="text-sm text-gray-600">
                  Valable jusqu'au <strong>{result.bon_valide_jusqu_au}</strong>
                </div>
                <p className="text-sm text-gray-700 mt-4">
                  Un email de confirmation avec ce code vient de vous être envoyé.
                </p>
              </div>
            ) : (
              <p className="text-gray-700 mb-6">
                Vos réponses ont bien été enregistrées.
              </p>
            )}
            <a
              href="https://novahypnose.fr"
              className="inline-block px-8 py-3 bg-nova-blue text-white rounded-full hover:bg-nova-blue-dark transition-colors font-semibold"
            >
              Retour sur novahypnose.fr
            </a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Questionnaire — NovaHypnose</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="min-h-screen bg-gradient-to-b from-nova-blue-light to-white flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Barre de progression */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>
                Question {step + 1} / {totalSteps}
              </span>
              <span className="text-nova-orange font-semibold">🎁 10€ offerts à la fin</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-nova-blue to-nova-orange transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Carte question */}
          <div
            key={step}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-10 animate-fadeIn"
          >
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-nova-blue-dark mb-3 leading-tight">
              {current.title}
            </h1>
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

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 0 || status === "loading"}
                className="px-5 py-2 text-gray-600 hover:text-nova-blue-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Précédent
              </button>

              <div className="flex items-center gap-3">
                {!current.required && step < totalSteps - 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={status === "loading"}
                    className="px-5 py-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
                  >
                    Passer
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!current.isValid() || status === "loading"}
                  className="px-8 py-3 bg-nova-orange text-white rounded-full shadow-lg hover:bg-nova-orange-dark transition-colors font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "loading"
                    ? "Envoi…"
                    : step === totalSteps - 1
                    ? "Recevoir mon bon de 10€"
                    : "Suivant →"}
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Vos réponses sont anonymes et utilisées uniquement pour améliorer mes contenus.
          </p>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out;
        }
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
  <div className="space-y-3">
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
