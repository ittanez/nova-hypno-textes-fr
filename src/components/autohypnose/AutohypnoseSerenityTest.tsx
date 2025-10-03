import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const AutohypnoseSerenityTest = () => {
  return (
    <section id="serenity-test" className="py-20 bg-gradient-to-b from-white to-nova-blue-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nova-blue-dark font-serif">
              Évaluez votre niveau de sérénité
            </h2>

            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Découvrez votre profil de stress et recevez un code promo de <strong>50% de réduction</strong> pour la formation
            </p>
          </div>

          <Card className="shadow-xl border-nova-blue/20 mb-8">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <div className="flex items-center mb-4">
                    <Sparkles className="w-8 h-8 text-nova-green mr-3" />
                    <h3 className="text-2xl font-bold text-nova-blue-dark">Test gratuit et personnalisé</h3>
                  </div>

                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-nova-green mr-2">✓</span>
                      <span>Analyse de votre niveau de stress actuel</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-nova-green mr-2">✓</span>
                      <span>Recommandations personnalisées</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-nova-green mr-2">✓</span>
                      <span>Code promo de 50% envoyé par email</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-nova-green mr-2">✓</span>
                      <span>5 minutes seulement</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-nova-blue to-nova-green p-6 rounded-2xl text-white mb-6">
                    <p className="text-5xl font-bold mb-2">50%</p>
                    <p className="text-xl">de réduction</p>
                  </div>

                  <a
                    href="/autohypnose/quiz"
                    className="inline-block px-8 py-4 bg-nova-green text-white rounded-full shadow-lg hover:bg-nova-green-dark transition-colors text-lg font-semibold"
                  >
                    Commencer le test
                  </a>

                  <p className="text-sm text-gray-500 mt-4">
                    Sans engagement • Résultats immédiats
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AutohypnoseSerenityTest;
