import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const Program = () => {
  const schedule = [
    {
      time: "Matin",
      title: "Module 1: Fondamentaux de l'auto-hypnose",
      items: [
        "Accueil et présentation du programme",
        "Qu'est-ce que l'hypnose et l'auto-hypnose?",
        "Les mécanismes neurophysiologiques de l'hypnose",
        "Mythes et réalités sur l'hypnose",
        "Les différents états de conscience et l'état hypnotique",
        "Exercice pratique: Première expérience d'état modifié de conscience"
      ]
    },
    {
      time: "Matin",
      title: "Module 2: Techniques d'induction hypnotique",
      items: [
        "Les différentes méthodes d'induction en auto-hypnose",
        "Technique de la respiration consciente",
        "Technique de la focalisation sensorielle",
        "Technique de la relaxation progressive",
        "Exercices pratiques: S'initier aux inductions hypnotiques",
        "Questions et partage d'expériences"
      ]
    },
    {
      time: "Après-midi",
      title: "Module 3: Approfondissement de l'état hypnotique",
      items: [
        "Techniques d'approfondissement de la transe",
        "Le lieu sûr et les ancrages",
        "La communication avec l'inconscient",
        "Exercices pratiques: Créer son lieu sûr et ses ancrages",
        "Personnalisation des techniques selon vos besoins spécifiques"
      ]
    },
    {
      time: "Après-midi",
      title: "Module 4: Applications pratiques pour la gestion du stress",
      items: [
        "Techniques spécifiques pour la gestion du stress",
        "Scripts d'auto-hypnose pour l'anxiété",
        "Techniques de visualisation positive",
        "Méthodes d'auto-suggestion",
        "Exercices pratiques: Créer ses propres séances d'auto-hypnose",
        "Plan d'action personnalisé pour l'intégration dans la vie quotidienne"
      ]
    },
    {
      time: "Fin de journée",
      title: "Conclusion et perspectives",
      items: [
        "Synthèse des apprentissages",
        "Questions et réponses",
        "Présentation des ressources complémentaires",
        "Planification du suivi individuel",
        "Témoignages et partages d'expériences"
      ]
    }
  ];

  const practicalInfo = [
    { label: "Date", value: "Dimanche 25 janvier 2026" },
    { label: "Horaires", value: "9h30 - 17h30 (accueil à partir de 9h00)" },
    { label: "Lieu", value: "Paris Bastille" },
    { label: "Adresse", value: "16 rue Saint Antoine, 75004 Paris" },
    { label: "Accès", value: "Métro Bastille (lignes 1, 5, 8) ou Saint-Paul (ligne 1)" }
  ];

  const trainerInfo = {
    name: "Alain Zenatti",
    role: "Hypnothérapeute certifié",
    experience: "4 ans d'expérience",
    description: "J'accompagne depuis 4 ans des personnes souhaitant retrouver calme, sérénité et confiance face aux défis du quotidien.",
    approach: "Mon approche combine différentes techniques pour vous permettre de développer des ressources intérieures durables et cultiver un état de bien-être au quotidien.",
    formations: [
      "Hypnose Ericksonienne",
      "Techniques de pleine conscience",
      "Méthode ESPERE de Jacques Salomé"
    ]
  };

  return (
    <section id="program" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-nova-blue-dark font-serif">
          Formation auto-hypnose Paris Harmonia : programme détaillé
        </h2>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
          {/* Colonne 1: Programme */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-nova-blue text-center lg:text-left">
              Contenu de la formation
            </h3>

            <Accordion type="single" collapsible className="mb-10">
              {schedule.map((module, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    <span className="text-nova-blue mr-2">{module.time}</span> - {module.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      {module.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
          </div>
          
          {/* Colonne 2: Infos pratiques */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-nova-blue text-center lg:text-left">
              Informations pratiques
            </h3>
            <Card className="mb-8 shadow-md border-nova-blue/20">
              <CardContent className="p-6">
                <dl className="space-y-3">
                  {practicalInfo.map((info, index) => (
                    <div key={index}>
                      <dt className="font-medium text-gray-700">{info.label}</dt>
                      <dd className="text-gray-600">{info.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;
