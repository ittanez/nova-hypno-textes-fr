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
      answer: 'L\'auto-hypnose est une technique qui vous permet d\'entrer par vous-même dans un état de relaxation profonde et de concentration focalisée, sans dépendre d\'une autre personne. C\'est un état naturel que votre cerveau connaît déjà (ex : quand vous êtes absorbé dans un livre ou une route familière). En auto-hypnose, vous utilisez cet état pour modifier vos habitudes, réduire l\'anxiété et installer de nouvelles pensées positives. Vous restez conscient et en contrôle à tout moment.',
    },
    {
      question: 'Faut-il avoir déjà pratiqué l\'hypnose pour suivre cette formation ?',
      answer: 'Non, absolument pas. Cette formation est conçue pour les débutants comme pour ceux ayant une expérience antérieure. Nous commençons par les bases et vous avancez à votre rythme. Même les personnes qui pensaient être "non-hypnotisables" découvrent qu\'elles sont tout à fait capables. L\'important c\'est l\'envie d\'apprendre.',
    },
    {
      question: 'Combien de temps faut-il pratiquer avant de voir des résultats ?',
      answer: 'Certains ressentent une différence dès la première séance (relaxation, légèreté). Pour les résultats durables sur le stress et l\'anxiété, comptez 2-4 semaines de pratique régulière (5-10 min par jour). Vous disposerez d\'un suivi téléphonique 1 mois après la formation pour vérifier votre progression et ajuster votre pratique si nécessaire.',
    },
    {
      question: 'L\'auto-hypnose peut-elle vraiment aider à gérer le stress et l\'anxiété ?',
      answer: 'Oui, de nombreuses études scientifiques le confirment. L\'hypnose réduit l\'activation du système nerveux sympathique (réaction "stress") et renforce le système parasympathique (relaxation). Dans notre formation, 95% des participants rapportent une amélioration dans la gestion de leur stress en sortant de la journée. Nos témoignages parlent d\'eux-mêmes.',
    },
    {
      question: 'Pourquoi une formation en petit groupe plutôt qu\'en ligne ?',
      answer: 'En petit groupe (max 6 participants), nous pouvons personnaliser chaque technique selon votre profil et vos défis spécifiques. Vous pratiquez ensemble, vous vous posez des questions en direct, et Alain peut ajuster son approche si vous bloquez sur quelque chose. Le contact humain est crucial pour construire la confiance. L\'expérience en présentiel permet aussi une mise en pratique immédiate et un ancrage plus profond des apprentissages.',
    },
    {
      question: 'Que contient le matériel pédagogique fourni ?',
      answer: '📚 Fascicule complet avec les techniques et scripts d\'auto-hypnose\n🎧 Audios guidés enregistrés (à télécharger après la formation)\n📋 Fiches pratiques pour chaque module (à imprimer ou garder en PDF)\n🔗 Accès à un espace client avec ressources bonus\n🎁 BONUS : 3 mois gratuits sur NovaRespire avec protocole stress personnalisé\nTout est conçu pour que vous puissiez continuer seul après la journée.',
    },
    {
      question: 'Y a-t-il un suivi après la formation ?',
      answer: 'Oui ! Vous bénéficiez d\'un entretien téléphonique de 30 minutes environ 1 mois après la formation. C\'est l\'occasion de faire le point sur votre progression, clarifier les points qui vous bloquent, et affiner votre pratique. Vous pouvez aussi nous joindre par email si vous avez une question.',
    },
    {
      question: 'Puis-je annuler ou reporter ma participation ?',
      answer: 'Bien sûr. Si vous annulez plus de 15 jours avant, vous êtes remboursé intégralement. Entre 7 et 15 jours, remboursement de 50%. Moins de 7 jours, aucun remboursement (mais vous pouvez reporter sur une autre date si vous préférez). Nos places sont limitées, donc un report rapide est toujours possible.',
    },
    {
      question: 'La formation est-elle adaptée aux personnes souffrant de troubles anxieux ?',
      answer: 'Oui. L\'auto-hypnose est une excellente approche complémentaire pour l\'anxiété. Cependant, si vous souffrez d\'un trouble psychiatrique sérieux (trouble bipolaire, psychose, dépression sévère), veuillez en discuter avec Alain avant l\'inscription. La formation fonctionne mieux en complément (pas en remplacement) d\'un suivi médical ou psychologique pour les cas complexes.',
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
                <AccordionContent className="px-6 py-4 text-gray-700 leading-relaxed border-t border-nova-blue/10 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 bg-white p-8 rounded-lg shadow-md border-2 border-nova-blue/20">
            <h3 className="text-2xl font-bold text-nova-blue-dark mb-4 text-center">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-gray-700 mb-6 text-center">
              N'hésitez pas à nous contacter, nous serons ravis de vous répondre
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="font-semibold">📧</span>
                <span>Contactez Alain directement :</span>
                <a
                  href="mailto:contact@novahypnose.fr"
                  className="text-nova-blue hover:underline font-semibold"
                >
                  contact@novahypnose.fr
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="font-semibold">📞</span>
                <span>ou appelez :</span>
                <a
                  href="tel:0649358089"
                  className="text-nova-blue hover:underline font-semibold"
                >
                  06 49 35 80 89
                </a>
              </div>
              <div className="text-center pt-4">
                <a
                  href="/#contact"
                  className="inline-block px-8 py-3 bg-nova-blue text-white rounded-full hover:bg-nova-blue-dark transition-colors font-semibold"
                >
                  💬 Prendre RDV pour une conversation de 15 min
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutohypnoseFAQ;
