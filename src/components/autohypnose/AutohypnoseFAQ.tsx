import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const AutohypnoseFAQ = () => {
  const faqs = [
    {
      question: 'Qu\'est-ce que l\'auto-hypnose exactement ?',
      answer: 'L\'auto-hypnose est une technique qui vous permet d\'entrer en état de relaxation profonde par vous-même, sans l\'aide d\'un thérapeute. C\'est un état naturel de concentration focalisée qui permet d\'accéder à votre inconscient pour créer des changements positifs et durables dans votre vie.',
    },
    {
      question: 'Faut-il avoir déjà pratiqué l\'hypnose pour suivre cette formation ?',
      answer: 'Non, aucune expérience préalable n\'est nécessaire. La formation est conçue pour les débutants complets. Nous commençons par les bases et progressons étape par étape jusqu\'aux techniques avancées.',
    },
    {
      question: 'Combien de temps faut-il pratiquer avant de voir des résultats ?',
      answer: 'Beaucoup de participants ressentent déjà des effets bénéfiques dès la première séance de pratique. Pour des résultats durables, nous recommandons une pratique quotidienne de 10-15 minutes pendant au moins 21 jours pour ancrer les nouvelles habitudes.',
    },
    {
      question: 'L\'auto-hypnose peut-elle vraiment aider à gérer le stress et l\'anxiété ?',
      answer: 'Oui, absolument. De nombreuses études scientifiques ont démontré l\'efficacité de l\'auto-hypnose pour la gestion du stress, de l\'anxiété, des troubles du sommeil et bien d\'autres problématiques. C\'est un outil puissant reconnu par la communauté médicale.',
    },
    {
      question: 'Pourquoi une formation en petit groupe plutôt qu\'en ligne ?',
      answer: 'La formation en présentiel en petit groupe (max 6 personnes) permet un apprentissage pratique immédiat avec des retours personnalisés. Vous bénéficiez de l\'expérience collective, des questions des autres participants, et d\'un accompagnement direct pour corriger votre pratique en temps réel.',
    },
    {
      question: 'Que contient le matériel pédagogique fourni ?',
      answer: 'Vous recevrez un support de cours complet avec toutes les techniques enseignées, des scripts d\'auto-hypnose adaptables à vos besoins, des exercices pratiques, et des ressources pour continuer votre apprentissage après la formation.',
    },
    {
      question: 'Y a-t-il un suivi après la formation ?',
      answer: 'Oui ! Un mois après la formation, vous bénéficiez d\'un entretien téléphonique personnalisé pour faire le point sur votre pratique, répondre à vos questions et ajuster les techniques si nécessaire.',
    },
    {
      question: 'Puis-je annuler ou reporter ma participation ?',
      answer: 'Oui, les annulations sont possibles avec remboursement selon notre politique : remboursement intégral si annulation plus de 15 jours avant, 50% entre 7 et 15 jours avant. Vous pouvez également reporter sur une autre date sous réserve de disponibilité.',
    },
    {
      question: 'La formation est-elle adaptée aux personnes souffrant de troubles anxieux ?',
      answer: 'L\'auto-hypnose est particulièrement efficace pour les troubles anxieux légers à modérés. Cependant, elle ne remplace pas un suivi médical ou psychothérapeutique en cas de troubles sévères. Si vous suivez un traitement, nous recommandons d\'en parler à votre médecin avant la formation.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-nova-blue-light to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nova-blue-dark font-serif">
              Questions fréquentes sur l'auto-hypnose
            </h2>
            <p className="text-xl text-gray-700">
              Toutes les réponses à vos questions sur la formation
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-md border border-nova-blue/10 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:bg-nova-blue-light/30 transition-colors">
                  <span className="text-lg font-semibold text-nova-blue-dark pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700 leading-relaxed border-t border-nova-blue/10">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-nova-blue-dark mb-4">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-gray-700 mb-6">
              N'hésitez pas à nous contacter, nous serons ravis de vous répondre
            </p>
            <a
              href="mailto:contact@novahypnose.fr"
              className="inline-block px-8 py-3 bg-nova-blue text-white rounded-full hover:bg-nova-blue-dark transition-colors font-semibold"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutohypnoseFAQ;
