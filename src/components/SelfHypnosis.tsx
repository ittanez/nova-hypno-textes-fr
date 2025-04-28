
import React from 'react';
import { Heart, Brain, Activity, Check } from 'lucide-react';

const SelfHypnosis = () => {
  const benefits = [
    {
      title: "Une meilleure santé",
      items: ["Gestion de la douleur", "Amélioration du sommeil", "Gestion du stress, relaxation"],
      icon: Heart
    },
    {
      title: "Transformer vos comportements",
      items: ["Arrêt des addictions", "Changement d'habitudes alimentaires", "Motivation pour le sport"],
      icon: Brain
    },
    {
      title: "Traverser les étapes de la vie",
      items: ["Deuil, séparation, changement de travail", "Gestion des peurs et des phases de transition"],
      icon: Activity
    },
    {
      title: "Une vie émotionnelle épanouie",
      items: ["Confiance et estime de soi", "Gestion des émotions (colère, anxiété, tristesse)", "Développement de l'intuition et de la sensibilité"],
      icon: Heart
    }
  ];

  return (
    <section id="self-hypnosis" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-nova-blue-dark mb-8">L'Auto-Hypnose</h2>
          <h3 className="text-center text-nova-green-dark mb-12">Un voyage intérieur vers le changement</h3>
          
          <div className="mb-12">
            <p>L'auto-hypnose est une technique d'hypnose personnelle permettant d'explorer votre inconscient pour effectuer des changements positifs dans votre vie.</p>
            <p>Contrairement aux idées reçues, l'auto-hypnose ne vous fait pas perdre le contrôle. Au contraire, elle vous offre un plus grand contrôle sur vos pensées, vos émotions et vos comportements. En pratiquant régulièrement, vous pouvez améliorer votre confiance en vous, gérer le stress, renforcer votre motivation ou même soulager certaines douleurs.</p>
            <p>Le processus implique généralement une relaxation pour entrer dans un état de relaxation profonde, suivie d'une phase de travail où vous concentrez sur vos objectifs spécifiques. Vous utilisez la visualisation, les affirmations positives et d'autres techniques pour communiquer directement avec votre subconscient.</p>
            <p>C'est est un outil flexible que vous pouvez adapter à vos besoins personnels. Que vous cherchiez à surmonter une phobie, à améliorer vos performances ou simplement à vous détendre, cette pratique peut devenir une ressource précieuse dans votre quête de bien-être et d'épanouissement personnel.</p>
          </div>
          
          <h4 className="text-nova-blue text-2xl font-semibold mb-8 text-center">À quoi peut vous servir l'auto-hypnose au quotidien ?</h4>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-nova-neutral p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-nova-blue-light p-2 rounded-full mr-3">
                    {React.createElement(benefit.icon, { size: 20, className: "text-nova-blue" })}
                  </div>
                  <h5 className="text-xl font-semibold text-nova-blue-dark">{benefit.title}</h5>
                </div>
                <ul className="space-y-2">
                  {benefit.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={18} className="text-nova-green mt-0.5 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfHypnosis;
