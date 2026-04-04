import { useState } from "react";

const SUPABASE_FUNCTION_URL =
  "https://akrlyzmfszumibwgocae.supabase.co/functions/v1/formation-liste-attente";

const AutohypnoseWaitlist = () => {
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, email }),
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
    <section id="pricing" className="py-20 bg-gradient-to-b from-nova-blue-light to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nova-blue-dark font-serif">
            Prochaine session en préparation
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            La prochaine date sera annoncée prochainement.
            Laissez vos coordonnées pour être informé(e) en priorité — les places sont limitées.
          </p>

          {status === "success" ? (
            <div className="bg-nova-blue-light rounded-xl px-8 py-10 text-nova-blue-dark font-semibold text-lg">
              C'est noté ! Vous serez parmi les premiers informés.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-4 text-left">
              <div>
                <label htmlFor="waitlist-prenom" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  id="waitlist-prenom"
                  type="text"
                  placeholder="Votre prénom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-nova-blue"
                />
              </div>
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-nova-blue"
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
                {status === "loading" ? "Envoi en cours…" : "Rejoindre la liste d'attente"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default AutohypnoseWaitlist;
