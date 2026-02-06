const FAQSection = () => {
  const faqItems = [
    {
      question: "Comment cette connaissance va m'aider concrètement ?",
      answer: "Imaginez avoir un GPS mental personnalisé ! Connaître votre profil permet à tout hypnothérapeute d'utiliser exactement les techniques qui fonctionnent pour VOUS. Résultat : des séances plus efficaces et des changements plus rapides."
    },
    {
      question: "Est-ce vraiment gratuit ou y a-t-il des frais cachés ?",
      answer: "100% gratuit, zéro engagement. Ce test est mon cadeau pour vous aider à faire le premier pas vers une vie plus épanouie."
    },
    {
      question: "Pourquoi demandez-vous mon email ?",
      answer: "Uniquement pour vous envoyer vos résultats personnalisés et quelques conseils adaptés à votre profil. Pas de spam, promis !"
    },
    {
      question: "Ce test est-il scientifiquement valide ?",
      answer: "Absolument ! Créé avec des experts en hypnothérapie clinique, ce test mesure avec précision votre potentiel hypnotique réel."
    },
    {
      question: "Est-ce que le test fonctionne aussi pour les enfants/adolescents ?",
      answer: "Le test est conçu pour les adultes (18 ans et plus). Pour les enfants et adolescents, je recommande une évaluation personnalisée avec un hypnothérapeute spécialisé dans l'accompagnement des jeunes."
    },
    {
      question: "Puis-je refaire le test pour vérifier si mes réponses changent ?",
      answer: "Absolument ! Vous pouvez refaire le test à tout moment. Votre profil VAKOG peut évoluer avec le temps, selon vos expériences et votre développement personnel. C'est même recommandé de le refaire après quelques mois."
    },
    {
      question: "Mes résultats resteront-ils confidentiels ?",
      answer: "Oui, totalement ! Vos résultats sont strictement confidentiels et conformes au RGPD. Je ne partage jamais vos données avec des tiers. Vous êtes le seul à recevoir vos résultats par email."
    },
    {
      question: "Comment utiliser mes résultats pour ma première séance ?",
      answer: "Apportez vos résultats lors de votre première consultation. Ils permettront à votre hypnothérapeute d'adapter immédiatement son approche à votre profil sensoriel, rendant la séance plus efficace dès le départ."
    },
    {
      question: "Quels hypnothérapeutes utilisent cette méthode VAKOG ?",
      answer: "La méthode VAKOG est une approche reconnue en PNL (Programmation Neuro-Linguistique) et en hypnose ericksonienne. La plupart des hypnothérapeutes certifiés sont formés à cette approche et pourront utiliser vos résultats."
    },
    {
      question: "Que signifie un score élevé ou faible ?",
      answer: "Un score élevé indique une forte réceptivité naturelle à l'hypnose, ce qui facilite l'entrée en état hypnotique. Un score plus faible ne signifie pas que l'hypnose ne fonctionnera pas, mais qu'il faudra peut-être adapter les techniques. Tout le monde peut bénéficier de l'hypnose !"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-nova-blue-dark mb-12">
          Ce que vous vous demandez peut-être...
        </h2>
        <div className="grid gap-6 max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-nova-blue-dark mb-3">{item.question}</h3>
              <p className="text-nova-neutral-dark leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
