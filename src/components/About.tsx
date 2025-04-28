
import React from 'react';
import { Quote } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-nova-blue-dark">À propos d'Alain Zenatti</h2>
            <p>
              En tant que praticien en hypnose thérapeutique, j'utilise mes méthodes et mes connaissances pour activer la conscience du soi et les pouvoirs d'auto-guérison du client.
            </p>
            <p>
              Il est important de noter que mon hypnothérapie n'a pas pour but de remplacer une visite chez le médecin ni son travail de diagnostic ou son traitement.
            </p>
            <p>
              Ceci s'applique également à l'invitation ou à l'arrêt de médicaments ou de thérapies prescrits et recommandés par votre médecin.
            </p>
            <p>
              En cas de doute, il est conseillé de consulter votre médecin.
            </p>
          </div>
          <div className="bg-nova-neutral p-6 rounded-lg shadow-lg">
            <h3 className="text-nova-blue mb-4 flex items-center">
              <Quote size={24} className="mr-2" />
              Portrait chinois de l'hypnose
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Si l'hypnose était un personnage, qui serait-il ?</p>
                <p className="italic ml-4">Merlin l'enchanteur et un sage, un magicien proche de la nature. Tout comme l'hypnose qui nous fait voyager dans nos ressources comme par magie.</p>
              </div>
              <div>
                <p className="font-semibold">Si l'hypnose était un lieu, quel serait-il ?</p>
                <p className="italic ml-4">Un lac au bleu azur dans une montagne en Suisse entouré de végétation luxuriante.</p>
              </div>
              <div>
                <p className="font-semibold">Si l'hypnose était un animal, quel serait-il ?</p>
                <p className="italic ml-4">Le panda. Il a la particularité de dégager des capacités intellectuelles étonnantes.</p>
              </div>
              <div>
                <p className="font-semibold">Si l'hypnose était un élément de la nature, quel serait-il ?</p>
                <p className="italic ml-4">Les racines d'un arbre. Elles nourrissent la partie visible, liées à la vie et l'énergie nécessaire.</p>
              </div>
              <div>
                <p className="font-semibold">Si l'hypnose était une plante ?</p>
                <p className="italic ml-4">Le pissenlit... sa beauté et ses bienfaits sur la santé et serait un symbole ? -Une étoile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
