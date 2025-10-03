import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'buy-button-id'?: string;
        'publishable-key'?: string;
      };
    }
  }
}

const Pricing = () => {
  const features = [
    "✨ Journée complète de formation en petit groupe (max 6 participants)",
    "📚 Matériel pédagogique et support de cours complet",
    "☕ Pauses café incluses",
    "📞 Entretien téléphonique de suivi personnalisé (1 mois après)",
    "💯 Garantie satisfait ou remboursé 14 jours"
  ];

  const cancellationPolicy = [
    { condition: "Annulation plus de 15 jours avant", policy: "Remboursement intégral" },
    { condition: "Annulation entre 7 et 15 jours avant", policy: "Remboursement de 50%" },
    { condition: "Annulation moins de 7 jours avant", policy: "Aucun remboursement" },
    { condition: "Report", policy: "Possibilité de reporter sur une autre date (sous réserve de disponibilité)" }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-nova-blue-light to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-nova-blue-dark font-serif">
          Formation Auto-hypnose : Votre Parcours Sérénité
        </h2>
        <p className="text-center text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Un programme complet pour maîtriser l'auto-hypnose et transformer durablement votre relation au stress.
        </p>

        <div className="bg-nova-blue-light rounded-xl p-6 mb-12 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-nova-blue-dark mb-2">95%</div>
              <div className="text-nova-blue-dark text-sm">Taux de satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-nova-blue-dark mb-2">1 jour</div>
              <div className="text-nova-blue-dark text-sm">Formation complète</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-nova-blue-dark mb-2">8h</div>
              <div className="text-nova-blue-dark text-sm">Programme intensif</div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-nova-blue">
            <CardHeader className="text-center p-6 bg-nova-blue-light rounded-t-xl">
              <CardTitle className="text-3xl font-bold text-nova-blue-dark">Formation Auto-hypnose Harmonia - Parcours Sérénité</CardTitle>
              <CardDescription className="text-lg text-nova-blue-dark">
                Dimanche 25 janvier 2026 - Paris Bastille
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="bg-nova-blue text-white p-4 rounded-lg mb-6">
                    <p className="text-4xl font-bold mb-2 flex items-baseline">
                      300€ <span className="text-sm ml-2">TTC</span>
                    </p>
                    <p className="text-sm">
                      🎉 Obtenez votre code promo de 50% de réduction en complétant le test de sérénité
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-bold text-gray-700 mb-3">🎯 Votre formation inclut :</h4>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-nova-green mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <stripe-buy-button
                      buy-button-id="buy_btn_1RD8bAANRwaqPj2NLAMafpVx"
                      publishable-key="pk_live_51RCQyrANRwaqPj2NZIKGZiadw33A3msp4preGmKVLNV258KoGe0eadZL65pKs74NOA0TxnKdEY2KqshyYnBWeO9H00DIad5mNU"
                      data-href="https://buy.stripe.com/28og292uN30p3XW3cc"
                    >
                    </stripe-buy-button>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Places limitées à 6 participants. Réservez rapidement pour garantir votre place.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-700 mb-3">Politique d'annulation et de remboursement</h4>
                  <dl className="space-y-3 mb-6">
                    {cancellationPolicy.map((item, index) => (
                      <div key={index}>
                        <dt className="font-medium text-gray-700">{item.condition}</dt>
                        <dd className="text-gray-600">{item.policy}</dd>
                      </div>
                    ))}
                  </dl>
                  
                  <div className="bg-nova-blue-light p-4 rounded-lg">
                    <h4 className="font-bold text-nova-blue-dark mb-2">Garantie de satisfaction</h4>
                    <p className="text-nova-blue-dark text-sm">
                      Nous sommes tellement convaincus des bénéfices de la formation que nous vous proposons une garantie "Satisfait ou remboursé" de 14 jours après la formation. Si vous n'êtes pas satisfait, nous vous remboursons intégralement.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-6 rounded-b-xl">
              <p className="text-gray-500 text-sm text-center w-full">
                Pour toute question ou besoin d'information supplémentaire, n'hésitez pas à nous contacter à <a href="mailto:contact@novahypnose.fr" className="text-nova-blue hover:underline">contact@novahypnose.fr</a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
