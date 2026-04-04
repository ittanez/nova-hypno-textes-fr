import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SUPABASE_FUNCTION_URL =
  "https://akrlyzmfszumibwgocae.supabase.co/functions/v1/formation-questionnaire";

const AutohypnoseQuestionnaire = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const emailFromUrl = searchParams.get("email") ?? "";

  const [region, setRegion] = useState("");
  const [jour, setJour] = useState("");
  const [theme, setTheme] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailFromUrl,
          region,
          jour_prefere: jour,
          theme_prioritaire: theme,
          commentaire_libre: commentaire,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Vos préférences — Formation Auto-hypnose | NovaHypnose</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Header />
      <main className="min-h-screen bg-gradient-to-b from-nova-blue-light to-white py-20">
        <div className="container mx-auto px-4 max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-nova-blue-dark font-serif mb-4 text-center">
            Aidez-moi à construire la bonne session pour vous
          </h1>
          <p className="text-lg text-gray-700 mb-10 text-center leading-relaxed">
            Quelques secondes suffisent. Vos réponses me permettront de programmer
            une session vraiment adaptée.
          </p>

          {status === "success" ? (
            <div className="bg-white rounded-xl shadow-md px-8 py-10 text-center text-nova-blue-dark font-semibold text-lg leading-relaxed">
              Merci ! Vos préférences sont bien enregistrées.
              <br />
              <span className="font-normal text-gray-600 text-base">
                Vous recevrez un email de confirmation dans quelques instants.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-8">

              {/* Question 1 — Région */}
              <fieldset>
                <legend className="block text-base font-semibold text-gray-800 mb-3">
                  Vous êtes plutôt...
                </legend>
                <div className="space-y-2">
                  {[
                    { label: "En Île-de-France", value: "IDF" },
                    { label: "Ailleurs en France", value: "Autre" },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="region"
                        value={opt.value}
                        checked={region === opt.value}
                        onChange={() => setRegion(opt.value)}
                        required
                        className="accent-nova-blue w-4 h-4"
                      />
                      <span className="text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Question 2 — Jour */}
              <fieldset>
                <legend className="block text-base font-semibold text-gray-800 mb-3">
                  Vous préférez quel jour ?
                </legend>
                <div className="space-y-2">
                  {["Samedi", "Dimanche"].map((j) => (
                    <label key={j} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="jour"
                        value={j}
                        checked={jour === j}
                        onChange={() => setJour(j)}
                        required
                        className="accent-nova-blue w-4 h-4"
                      />
                      <span className="text-gray-700">{j}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Question 3 — Thème */}
              <fieldset>
                <legend className="block text-base font-semibold text-gray-800 mb-3">
                  Quel thème vous tient le plus à cœur ?
                </legend>
                <div className="space-y-2">
                  {[
                    { label: "Gestion du stress", value: "Stress" },
                    { label: "Sommeil", value: "Sommeil" },
                    { label: "Confiance en soi", value: "Confiance" },
                    { label: "Autre", value: "Autre" },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value={opt.value}
                        checked={theme === opt.value}
                        onChange={() => setTheme(opt.value)}
                        required
                        className="accent-nova-blue w-4 h-4"
                      />
                      <span className="text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Question 4 — Commentaire */}
              <div>
                <label htmlFor="commentaire" className="block text-base font-semibold text-gray-800 mb-3">
                  Un mot à ajouter ? <span className="font-normal text-gray-500">(optionnel)</span>
                </label>
                <textarea
                  id="commentaire"
                  rows={4}
                  placeholder="Un contexte particulier, une question..."
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-nova-blue resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-600 text-sm">
                  Une erreur est survenue. Écrivez-moi à{" "}
                  <a href="mailto:contact@novahypnose.fr" className="underline">
                    contact@novahypnose.fr
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-8 py-4 bg-nova-orange text-white rounded-full shadow-lg hover:bg-nova-orange-dark transition-colors text-lg font-semibold disabled:opacity-60"
              >
                {status === "loading" ? "Envoi en cours…" : "Envoyer mes préférences"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AutohypnoseQuestionnaire;
