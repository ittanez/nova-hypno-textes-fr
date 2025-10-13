const HowItWorksSection = () => {
  const steps = [
    {
      image: "/images/test-receptivite.svg",
      title: "Répondez au test",
      description: "Complétez les 24 questions conçues pour évaluer votre réceptivité naturelle à l'hypnose.",
      number: "1"
    },
    {
      image: "/images/envoi-securise.svg",
      title: "Laissez votre email",
      description: "Recevez vos résultats personnalisés directement dans votre boîte de réception.",
      number: "2"
    },
    {
      image: "/images/analyse-personnalisee.svg",
      title: "Découvrez vos résultats",
      description: "Obtenez votre score de réceptivité et des conseils adaptés à votre profil.",
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
            Un processus simple en trois étapes pour découvrir votre potentiel hypnotique
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 flex justify-center">
                <img src={step.image} alt={step.title} className="w-20 h-20" />
              </div>
              <h3 className="text-xl font-bold text-nova-blue-dark mb-3">{step.title}</h3>
              <p className="text-nova-neutral-dark mb-4">{step.description}</p>
              <div className="text-2xl font-bold text-nova-blue">{step.number}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
