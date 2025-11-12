import React from 'react';
import Brain from 'lucide-react/dist/esm/icons/brain';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Target from 'lucide-react/dist/esm/icons/target';
import Users from 'lucide-react/dist/esm/icons/users';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-nova-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-nova-blue-dark mb-6">
            Comment fonctionne l'hypnose ? Les faits scientifiques
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Vous méritez de comprendre exactement ce qui va se passer. L'hypnose n'est ni magique ni mystérieuse : 
            c'est un état naturel que votre cerveau connaît déjà.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Brain className="mx-auto mb-4 text-nova-blue" size={48} />
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-3">État naturel</h3>
            <p className="text-gray-600">
              L'hypnose est un état de conscience modifié que vous expérimentez naturellement (rêverie, absorption dans un livre).
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Shield className="mx-auto mb-4 text-nova-green" size={48} />
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-3">Vous gardez le contrôle</h3>
            <p className="text-gray-600">
              Contrairement aux idées reçues, vous restez conscient et pouvez refuser toute suggestion qui ne vous convient pas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Target className="mx-auto mb-4 text-nova-blue" size={48} />
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-3">Accès aux ressources</h3>
            <p className="text-gray-600">
              Cet état permet d'accéder à vos ressources inconscientes et de créer de nouveaux apprentissages positifs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Users className="mx-auto mb-4 text-nova-green" size={48} />
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-3">Collaboration active</h3>
            <p className="text-gray-600">
              Vous êtes acteur de votre changement. Le thérapeute guide, vous créez les solutions avec vos propres ressources.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-nova-blue-dark mb-6 text-center">
            Pourquoi l'expertise du thérapeute est cruciale
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-nova-blue-dark mb-3">❌ Signes d'alarme à éviter :</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Promesses de guérison miraculeuse</li>
                <li>• Refus d'expliquer la méthode</li>
                <li>• Formation insuffisante ou floue</li>
                <li>• Approche directive sans respect du client</li>
                <li>• Tarifs anormalement bas ou élevés</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-nova-blue-dark mb-3">✅ Garanties d'un expert qualifié :</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Formation certifiée et continue</li>
                <li>• Transparence sur la méthode</li>
                <li>• Approche personnalisée et respectueuse</li>
                <li>• Explication claire du processus</li>
                <li>• Déontologie professionnelle stricte</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-nova-blue-light bg-opacity-10 rounded-lg">
            <p className="text-center text-nova-blue-dark font-semibold mb-2">
              Ma promesse de transparence
            </p>
            <p className="text-center text-gray-700">
              Je m'engage à vous expliquer chaque étape, à répondre à toutes vos questions et à respecter 
              votre rythme. Aucune séance ne commence sans que vous compreniez exactement ce qui va se passer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;