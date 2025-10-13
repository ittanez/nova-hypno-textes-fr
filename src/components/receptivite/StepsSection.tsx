const StepsSection = () => {
  const steps = [
    {
      image: "/images/questionnaire-interactif.svg",
      title: "Répondez à quelques questions",
      description: "Un questionnaire rapide et scientifique qui révèle votre type de réceptivité unique."
    },
    {
      image: "/images/reception-email.svg",
      title: "Recevez vos résultats",
      description: "Entrez votre email et obtenez instantanément votre profil hypnotique personnel."
    },
    {
      image: "/images/potentiel-active.svg",
      title: "Exploitez votre potentiel",
      description: "Transformez votre connaissance en action pour des résultats concrets et durables."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-nova-blue-dark mb-12">
          3 étapes simples pour découvrir votre potentiel hypnotique
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">
                <img src={step.image} alt={step.title} className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-bold text-nova-blue-dark mb-3">{step.title}</h3>
              <p className="text-nova-neutral-dark leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
