const StepsSection = () => {
  const steps = [
    {
      emoji: "📝",
      title: "Répondez aux questions",
      description: "30 questions rapides et simples"
    },
    {
      emoji: "📧",
      title: "Laissez votre email",
      description: "Recevez vos résultats instantanément"
    },
    {
      emoji: "🎯",
      title: "Découvrez vos résultats",
      description: "Profil VAKOG + conseils personnalisés"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-nova-blue-dark mb-4">
          3 étapes simples pour découvrir votre potentiel hypnotique
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Un parcours rapide et visuel pour comprendre votre réceptivité
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
              <div className="mb-4 text-6xl">
                {step.emoji}
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
