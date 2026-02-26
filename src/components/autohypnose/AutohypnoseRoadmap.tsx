import { Card, CardContent } from '@/components/ui/card';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';

const AutohypnoseRoadmap = () => {
  const steps = [
    {
      number: '1',
      title: 'Inscription à la formation',
      description: 'Réservez votre place pour la journée du 12 avril 2026 à Paris Bastille (max 6 participants) - Tarif : 180€*',
      duration: '2 min',
    },
    {
      number: '2',
      title: 'Formation intensive',
      description: 'Journée complète d\'apprentissage des techniques d\'auto-hypnose et de gestion du stress',
      duration: '1 jour',
    },
    {
      number: '3',
      title: 'Pratique quotidienne',
      description: 'Application des techniques apprises dans votre vie quotidienne avec le support de cours fourni',
      duration: 'Continu',
    },
    {
      number: '4',
      title: 'Suivi personnalisé',
      description: 'Entretien téléphonique un mois après la formation pour faire le point sur votre progression',
      duration: '30 min',
    },
    {
      number: '5',
      title: 'Autonomie et sérénité',
      description: 'Maîtrise complète de l\'auto-hypnose pour gérer votre stress de manière autonome',
      duration: 'À vie',
    },
  ];

  return (
    <section id="roadmap" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nova-blue-dark font-serif">
              Le plan de route le plus complet pour retrouver votre sérénité intérieure
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Un parcours structuré et progressif pour transformer durablement votre relation au stress
            </p>
          </div>

          <div className="relative">
            {/* Ligne verticale centrale sur desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-nova-blue via-nova-green to-nova-blue-light transform -translate-x-1/2"></div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Numéro de l'étape */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-nova-blue to-nova-green rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10">
                    <span className="absolute inset-0 flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  {/* Carte */}
                  <Card
                    className={`w-full md:w-5/12 shadow-lg hover:shadow-xl transition-shadow ${
                      index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="md:hidden w-12 h-12 bg-gradient-to-br from-nova-blue to-nova-green rounded-full flex items-center justify-center text-white text-xl font-bold mr-4 flex-shrink-0">
                          {step.number}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-nova-blue-dark">
                              {step.title}
                            </h3>
                            <span className="text-sm text-nova-green font-semibold bg-nova-green/10 px-3 py-1 rounded-full">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-nova-green text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Étape validée
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-br from-nova-blue-light to-blue-50 border-nova-blue/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-nova-blue-dark mb-4">
                  Prêt à commencer votre parcours ?
                </h3>
                <p className="text-gray-700 mb-6">
                  Rejoignez les participants qui ont déjà transformé leur vie avec l'auto-hypnose
                </p>
                <a
                  href="#pricing"
                  className="inline-block px-8 py-4 bg-nova-green text-white rounded-full shadow-lg hover:bg-nova-green-dark transition-colors text-lg font-semibold"
                >
                  Réserver ma place - 180€*
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutohypnoseRoadmap;
