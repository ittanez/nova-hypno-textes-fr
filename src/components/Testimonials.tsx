
import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-12 bg-nova-blue-light bg-opacity-30">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-12">Témoignages clients</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg relative">
            <Quote className="text-nova-blue-light absolute -top-6 left-8" size={48} />
            <div className="pt-4">
              <p className="italic text-gray-700 mb-6">
                "J'ai été surprise par l'efficacité de la séance avec monsieur Zenatti. J'avais déjà testé l'hypnose auprès d'une autre praticienne sans que cela ne m'ait convaincue. J'avais besoin d'aide pour travailler sur des peurs et préparer un accouchement mais je manquais de temps. En une seule séance il a su identifier des besoins que je ne soupçonnais pas moi-même et repositionner ma demande grâce à des questions fines et pertinentes. Très professionnel, rassurant. J'ai ressenti les bienfaits instantanément mais également sur le long terme. Et la séance a été une aide précieuse pour faire face au stress, à l'urgence et aux imprévus d'une naissance! Je retournerai sans hésitation poursuivre le travail avec Mr Zenatti et le recommande vivement."
              </p>
              <p className="text-right font-semibold text-nova-blue">Caroline Z.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
