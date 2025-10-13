const SEOContent = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-nova-blue-dark mb-6">
              Test d'hypnotisabilité gratuit à Paris : Comment révéler votre potentiel hypnotique ?
            </h2>

            <p className="text-lg text-nova-neutral-dark mb-6 leading-relaxed">
              Vous vous demandez "suis-je hypnotisable ?" Notre hypnothérapeute certifié à Paris a développé
              ce test gratuit pour révéler votre potentiel hypnotique. L'hypnotisabilité est un phénomène
              naturel que nous expérimentons tous quotidiennement.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Signs */}
            <div className="bg-nova-blue-light rounded-lg p-6">
              <h3 className="text-xl font-bold text-nova-blue-dark mb-4">
                Signes que vous êtes probablement hypnotisable :
              </h3>
              <ul className="space-y-3">
                {[
                  "Vous perdez la notion du temps en regardant un film captivant",
                  "Vous vous plongez facilement dans un livre",
                  "Vous rêvassez pendant les trajets en voiture",
                  "Vous arrivez à visualiser des images dans votre esprit",
                  "Vous vous laissez porter par la musique"
                ].map((sign, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                    <span className="text-nova-neutral-dark">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Factors */}
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-nova-blue-dark mb-3">
                  Facteurs favorables
                </h3>
                <ul className="space-y-2">
                  {[
                    "Capacité d'imagination développée",
                    "Facilité de concentration",
                    "Ouverture d'esprit",
                    "Confiance en soi"
                  ].map((factor, index) => (
                    <li key={index} className="flex items-center gap-2 text-nova-neutral-dark">
                      <span className="text-nova-blue">•</span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-nova-blue-dark mb-3">
                  Notre test évalue
                </h3>
                <ul className="space-y-2">
                  {[
                    "Votre suggestibilité naturelle",
                    "Vos canaux sensoriels dominants",
                    "Votre profil hypnotique",
                    "Vos points forts pour l'hypnose"
                  ].map((aspect, index) => (
                    <li key={index} className="flex items-center gap-2 text-nova-neutral-dark">
                      <span className="text-nova-blue">•</span>
                      {aspect}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-nova-blue-light to-purple-50 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-nova-blue-dark mb-6 text-center">
              Statistiques sur l'hypnotisabilité
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-green-600 mb-2">20%</div>
                <div className="font-semibold text-nova-blue-dark mb-2">Très réceptifs</div>
                <div className="text-sm text-nova-neutral-dark">Entrent rapidement en transe</div>
              </div>

              <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
                <div className="font-semibold text-nova-blue-dark mb-2">Réceptifs</div>
                <div className="text-sm text-nova-neutral-dark">Réponse normale à l'hypnose</div>
              </div>

              <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-orange-600 mb-2">30%</div>
                <div className="font-semibold text-nova-blue-dark mb-2">Résistance initiale</div>
                <div className="text-sm text-nova-neutral-dark">Nécessitent plus de temps</div>
              </div>
            </div>

            <p className="text-center text-nova-neutral-dark font-medium">
              <span className="text-green-600 font-bold">Bonne nouvelle :</span> Même avec une résistance
              initiale, l'hypnose reste efficace avec la bonne approche !
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContent;
