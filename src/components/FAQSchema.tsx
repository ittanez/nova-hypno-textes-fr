import React from 'react';
import { Helmet } from 'react-helmet';

const FAQSchema = () => {
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "À quelle vitesse va-t-on remarquer des changements avec l'hypnose ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Certaines personnes remarquent des changements après une seule séance d'hypnose, tandis que d'autres auront besoin de quelques séances pour observer des transformations significatives. Cela dépend de la problématique, de votre réceptivité à l'hypnose et de votre engagement dans le processus."
        }
      },
      {
        "@type": "Question", 
        "name": "L'hypnose peut-elle remplacer un traitement médical ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Non, l'hypnothérapie est une approche complémentaire qui ne remplace pas un traitement médical prescrit. Elle peut cependant s'intégrer dans une approche globale de soin et parfois permettre de réduire certains médicaments, toujours en accord avec votre médecin traitant."
        }
      },
      {
        "@type": "Question",
        "name": "Combien de temps dure une séance d'hypnose ?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Une séance d'hypnose standard dure généralement entre 1h et 1h30. La première séance peut être un peu plus longue (jusqu'à 2h) car elle comprend l'anamnèse détaillée de votre situation."
        }
      },
      {
        "@type": "Question",
        "name": "L'hypnothérapie est-elle dangereuse ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Non, l'hypnothérapie pratiquée par un professionnel formé est une méthode sûre et naturelle. Vous restez conscient pendant toute la séance et ne ferez jamais quelque chose contre votre volonté. C'est un état modifié de conscience que vous expérimentez naturellement plusieurs fois par jour."
        }
      },
      {
        "@type": "Question",
        "name": "Qui peut être hypnotisé ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pratiquement tout le monde peut bénéficier de l'hypnose. La capacité d'être hypnotisé dépend principalement de votre volonté et de votre ouverture au processus, plutôt que d'une prédisposition particulière."
        }
      },
      {
        "@type": "Question",
        "name": "Est-ce que je fais les choses contre ma volonté en hypnose ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolument pas. Contrairement aux idées reçues ou aux spectacles d'hypnose de divertissement, en hypnothérapie vous gardez toujours le contrôle. Votre inconscient ne vous permettra jamais d'agir contre vos valeurs ou votre volonté."
        }
      },
      {
        "@type": "Question",
        "name": "Est-ce que je dors pendant l'hypnose ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Non, vous ne dormez pas. L'hypnose est un état de conscience modifié où vous restez parfaitement éveillé et attentif. Vous entendez tout ce qui se dit et vous vous souvenez généralement de la majorité des suggestions données pendant la séance."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchemaData, null, 2)}
      </script>
    </Helmet>
  );
};

export default FAQSchema;