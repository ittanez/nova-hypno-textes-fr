
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  {
    question: "À quelle vitesse va-t-on remarquer des changements ?",
    answer: "Certaines personnes remarquent des changements après une seule séance, tandis que d'autres auront besoin de quelques séances pour observer des transformations significatives. Cela dépend de la problématique, de votre réceptivité à l'hypnose et de votre engagement dans le processus."
  },
  {
    question: "L'hypnose peut-elle remplacer un traitement médical ?",
    answer: "Non, l'hypnothérapie est une approche complémentaire qui ne remplace pas un traitement médical prescrit. Elle peut cependant s'intégrer dans une approche globale de soin et parfois permettre de réduire certains médicaments, toujours en accord avec votre médecin traitant."
  },
  {
    question: "Combien de temps dure une séance ?",
    answer: "Une séance standard dure généralement entre 1h et 1h30. La première séance peut être un peu plus longue (jusqu'à 2h) car elle comprend l'anamnèse détaillée de votre situation."
  },
  {
    question: "L'hypnothérapie est-elle dangereuse ?",
    answer: "Non, l'hypnothérapie pratiquée par un professionnel formé est une méthode sûre et naturelle. Vous restez conscient pendant toute la séance et ne ferez jamais quelque chose contre votre volonté. C'est un état modifié de conscience que vous expérimentez naturellement plusieurs fois par jour (comme lorsque vous êtes absorbé dans un livre ou un film)."
  },
  {
    question: "Un praticien en hypnose thérapeutique peut-il diagnostiquer des maladies ?",
    answer: "Non, en tant qu'hypnothérapeute, je ne pose pas de diagnostic médical. Si vous présentez des symptômes physiques, il est important de consulter d'abord un médecin pour un diagnostic approprié."
  },
  {
    question: "Qui peut être hypnotisé ?",
    answer: "Pratiquement tout le monde peut bénéficier de l'hypnose. La capacité d'être hypnotisé dépend principalement de votre volonté et de votre ouverture au processus, plutôt que d'une prédisposition particulière."
  },
  {
    question: "Est-ce que je fais les choses contre ma volonté en hypnose ?",
    answer: "Absolument pas. Contrairement aux idées reçues ou aux spectacles d'hypnose de divertissement, en hypnothérapie vous gardez toujours le contrôle. Votre subconscient ne vous permettra jamais d'agir contre vos valeurs ou votre volonté."
  },
  {
    question: "Est-ce que je révèle des secrets intimes grâce à l'hypnose ?",
    answer: "Non, vous ne révélerez que ce que vous souhaitez partager. L'hypnose n'est pas un sérum de vérité et vous gardez votre libre arbitre pendant toute la séance."
  },
  {
    question: "Et si je ne me réveille pas de l'hypnose ?",
    answer: "Cela n'arrive jamais. L'état d'hypnose est un état naturel dont on sort spontanément, même si l'hypnothérapeute cessait de parler. Il s'agit d'un état de concentration focalisée, pas d'un sommeil ou d'un coma."
  },
  {
    question: "Est-ce que je dors pendant l'hypnose ? Est-ce que j'entends quelque chose sous hypnose ?",
    answer: "Non, vous ne dormez pas. L'hypnose est un état de conscience modifié où vous restez parfaitement éveillé et attentif. Vous entendez tout ce qui se dit et vous vous souvenez généralement de la majorité des suggestions données pendant la séance."
  },
  {
    question: "Qu'est-ce qui empêche quelqu'un d'entrer en hypnose ?",
    answer: "Les principaux obstacles sont la peur, la méfiance ou une résistance volontaire au processus. Une personne très analytique qui cherche constamment à \"contrôler\" l'expérience peut parfois avoir plus de difficultés à se laisser aller, mais avec une bonne communication et la confiance, ces obstacles peuvent être surmontés."
  },
  {
    question: "Les séances d'hypnose sont-elles remboursées par les mutuelles ?",
    answer: "En France, l'hypnothérapie est remboursée par certaines mutuelles. Les remboursements varient en fonction des mutuelles et des contrats souscrits. Pour savoir si votre mutuelle rembourse l'hypnothérapie, il est recommandé de contacter votre mutuelle directement."
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-16">Questions fréquentes sur l'hypnothérapie</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleItem(index)}
                >
                  <span className="font-medium text-nova-blue-dark">{item.question}</span>
                  {openIndex === index ? 
                    <ChevronUp className="text-nova-blue flex-shrink-0" size={20} /> : 
                    <ChevronDown className="text-nova-blue flex-shrink-0" size={20} />
                  }
                </button>
                <div 
                  className={`px-4 overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
