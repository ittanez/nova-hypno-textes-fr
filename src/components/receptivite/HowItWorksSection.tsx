const HowItWorksSection = () => {
  const steps = [
    {
      image: "/images/test-receptivite.svg",
      title: "Répondez au test",
      description: "Complétez les 30 questions conçues pour évaluer votre réceptivité naturelle à l'hypnose. Le test mesure votre profil VAKOG (Visuel, Auditif, Kinesthésique, Olfactif, Gustatif) et analyse vos canaux sensoriels dominants pour déterminer votre potentiel hypnotique.",
      number: "1"
    },
    {
      image: "/images/envoi-securise.svg",
      title: "Laissez votre email",
      description: "Recevez vos résultats personnalisés directement dans votre boîte de réception. Vos données sont sécurisées et conformes RGPD. Je ne partage jamais vos informations avec des tiers et vous pouvez vous désinscrire à tout moment.",
      number: "2"
    },
    {
      image: "/images/analyse-personnalisee.svg",
      title: "Découvrez vos résultats",
      description: "Obtenez votre score de réceptivité détaillé, votre profil VAKOG complet, et des conseils personnalisés adaptés à votre type de réceptivité. Découvrez comment optimiser vos séances d'hypnose et maximiser votre potentiel de changement.",
      number: "3"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nova-blue-dark mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-nova-neutral-dark max-w-2xl mx-auto">
            Un processus détaillé et scientifique en trois étapes pour découvrir votre potentiel hypnotique
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 flex justify-center">
                <img src={step.image} alt={step.title} className="w-20 h-20" loading="lazy" width={80} height={80} />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl font-bold text-nova-blue bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-nova-blue-dark">{step.title}</h3>
              </div>
              <p className="text-nova-neutral-dark leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
