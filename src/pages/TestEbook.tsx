import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';

const TestEbook: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [animal, setAnimal] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const { data, error } = await supabase.functions.invoke('send-ebook-brevo', {
        body: { firstName, email, animal },
      });

      if (error) {
        throw new Error(error.message || "Erreur lors de l'appel à la fonction");
      }

      if (data && !data.success) {
        throw new Error(data.error || "Erreur lors de l'envoi de l'email");
      }

      setSuccess(true);
      setFirstName('');
      setEmail('');
      setAnimal('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-nova-neutral-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-nova-blue/40 focus:border-nova-blue transition-all text-[0.95rem]';

  return (
    <>
      <Helmet>
        <title>Test Ebook | NovaHypnose</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-nova-neutral to-nova-blue-light/30 px-4 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl w-full max-w-md">
          <h1 className="font-serif text-2xl font-bold text-nova-blue-dark mb-2 text-center">
            Recevez votre ebook
          </h1>
          <p className="text-gray-400 text-sm mb-7 text-center leading-relaxed">
            Page de test — envoi via Brevo
          </p>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-green-700 font-medium text-lg mb-1">
                Email envoyé avec succès !
              </p>
              <p className="text-green-600 text-sm">
                Vérifiez votre boîte de réception (et vos spams).
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 text-sm text-nova-blue underline hover:no-underline"
              >
                Envoyer un autre test
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-nova-neutral-dark mb-1.5">
                  Prénom <span className="text-red-400">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Votre prénom"
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-nova-neutral-dark mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="animal" className="block text-sm font-medium text-nova-neutral-dark mb-1.5">
                  Animal préféré <span className="text-gray-300">(facultatif)</span>
                </label>
                <input
                  id="animal"
                  type="text"
                  value={animal}
                  onChange={(e) => setAnimal(e.target.value)}
                  placeholder="Ex : chat, dauphin, loup…"
                  className={inputClasses}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg bg-nova-orange text-white font-semibold text-[0.95rem] hover:bg-nova-orange-dark active:scale-[0.98] transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-wait"
              >
                {loading ? 'Envoi en cours…' : 'Recevoir mon ebook'}
              </button>

              {errorMsg && (
                <p className="text-sm text-red-500 text-center mt-2">{errorMsg}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default TestEbook;
