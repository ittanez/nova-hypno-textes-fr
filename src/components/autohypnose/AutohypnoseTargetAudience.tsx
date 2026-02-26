import { Card, CardContent } from '@/components/ui/card';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';

const AutohypnoseTargetAudience = () => {
  const profiles = [
    {
      title: 'Cadre ou manager sous pression constante',
      description: 'qui veut reprendre le contrôle de son stress',
      icon: '💼',
    },
    {
      title: 'Entrepreneur anxieux',
      description: 'cherchant à clarifier son mental et sa confiance',
      icon: '🚀',
    },
    {
      title: 'Soignant ou enseignant épuisé',
      description: 'en quête de ressources intérieures durables',
      icon: '🏥',
    },
    {
      title: 'Parent en transition de vie',
      description: 'souhaitant retrouver du calme et de la sérénité',
      icon: '👨‍👩‍👧‍👦',
    },
    {
      title: 'Quiconque veut gérer l\'anxiété et l\'insomnie',
      description: 'sans médicament',
      icon: '🌙',
    },
  ];

  return (
    <section id="target-audience" className="py-20 bg-gradient-to-b from-white to-nova-blue-light">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nova-blue-dark font-serif">
              Cette formation est pour vous si vous êtes...
            </h2>
            <p className="text-lg text-gray-700">
              Des profils variés, un objectif commun : retrouver le calme et la sérénité
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {profiles.map((profile, index) => (
              <Card
                key={index}
                className="shadow-lg hover:shadow-xl transition-shadow border-nova-blue/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">
                      {profile.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-nova-green mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-bold text-nova-blue-dark mb-1">
                            {profile.title}
                          </h3>
                          <p className="text-gray-600">
                            {profile.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-br from-nova-green/10 to-nova-blue-light border-nova-green/30">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 mb-6">
                  <strong>Quelle que soit votre situation,</strong> si vous ressentez le besoin de retrouver votre calme intérieur
                  et de développer des outils concrets pour gérer votre stress au quotidien, cette formation est faite pour vous.
                </p>
                <a
                  href="#pricing"
                  className="inline-block px-8 py-4 bg-nova-orange text-white rounded-full shadow-lg hover:bg-nova-orange-dark transition-colors text-lg font-semibold"
                >
                  Je réserve ma place - 180€*
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutohypnoseTargetAudience;
