
import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';

const SelfHypnosis = () => {
  return (
    <section id="self-hypnosis" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-12">L'auto-hypnose : devenez votre propre thérapeute</h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-nova-blue mb-4">Pourquoi apprendre l'auto-hypnose ?</h3>
            <p className="mb-4">L'auto-hypnose est une compétence précieuse qui vous permettra de prolonger et d'approfondir les bienfaits des séances avec votre hypnothérapeute.</p>
            <p className="mb-4">Une fois maîtrisée, cette technique devient un outil puissant pour gérer votre stress, améliorer votre sommeil, renforcer votre confiance et cultiver un état de bien-être au quotidien.</p>
            <p className="mb-8">Je vous propose d'apprendre des techniques simples et efficaces, adaptées à vos besoins spécifiques, que vous pourrez pratiquer en toute autonomie.</p>
            
            <div className="flex justify-center md:justify-start">
              <a 
                href="https://harmonia.novahypnose.fr" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-nova-green text-white rounded-lg hover:bg-nova-green-dark transition-colors"
              >
                <BookOpen className="mr-2" size={20} />
                <span>Découvrez la formation Harmonia : réduire le stress avec l'auto-hypnose</span>
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773" 
                alt="Pratique de l'auto-hypnose pour la relaxation et le bien-être" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-nova-blue p-6 rounded-full shadow-lg">
              <Sparkles className="text-white" size={32} />
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-nova-neutral p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-nova-blue-dark mb-3">Auto-hypnose pour le stress</h4>
            <p>Apprenez à entrer rapidement dans un état de calme profond, même au milieu des situations les plus stressantes.</p>
          </div>
          
          <div className="bg-nova-neutral p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-nova-blue-dark mb-3">Auto-hypnose pour le sommeil</h4>
            <p>Découvrez des techniques puissantes pour améliorer la qualité de votre sommeil et installer un rituel apaisant avant de vous coucher.</p>
          </div>
          
          <div className="bg-nova-neutral p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-nova-blue-dark mb-3">Auto-hypnose pour la confiance</h4>
            <p>Renforcez votre estime personnelle et accédez à vos ressources intérieures grâce à des exercices d'ancrage et de visualisation positive.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfHypnosis;
