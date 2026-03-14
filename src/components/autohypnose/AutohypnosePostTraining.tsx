import { Card, CardContent } from '@/components/ui/card';

const AutohypnosePostTraining = () => {
  const postTrainingItems = [
    {
      icon: '📞',
      title: 'Suivi téléphonique (1 mois après)',
      description: 'Entretien de 30 min avec Alain pour faire le point, ajuster votre pratique, clarifier les blocages.',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      icon: '📚',
      title: 'Ressources à vie',
      description: 'Fiches, audios, scripts d\'auto-hypnose à télécharger et utiliser quand vous en avez besoin.',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      icon: '🎧',
      title: 'Audios guidés personnalisés',
      description: 'Option pour enregistrer votre propre script hypnotique (voix d\'Alain) à écouter à domicile.',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      icon: '💬',
      title: 'Communauté discrète',
      description: 'Accès email pour poser des questions après la formation.',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  return (
    <section id="post-training" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nova-blue-dark font-serif">
              Ce qui se passe après la journée
            </h2>
            <p className="text-xl text-gray-700">
              Vous n'êtes pas seul. Voici comment je vous accompagne :
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {postTrainingItems.map((item, index) => (
              <Card
                key={index}
                className={`shadow-lg hover:shadow-xl transition-shadow border-2 ${item.borderColor}`}
              >
                <CardContent className={`p-6 ${item.bgColor}`}>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-nova-blue-dark mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-nova-blue-light to-blue-50 border-nova-blue/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-nova-blue-dark mb-4">
                Un accompagnement qui dure dans le temps
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Mon objectif n'est pas seulement de vous former pendant une journée, mais de vous donner
                les outils et le soutien nécessaires pour que vous puissiez continuer à progresser de manière
                autonome dans votre pratique de l'auto-hypnose.
              </p>
              <a
                href="#pricing"
                className="inline-block px-8 py-4 bg-nova-orange text-white rounded-full shadow-lg hover:bg-nova-orange-dark transition-colors text-lg font-semibold"
              >
                Je commence mon parcours - 240€
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AutohypnosePostTraining;
