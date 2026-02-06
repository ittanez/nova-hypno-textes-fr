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
      time: "🌅 Matin",
      period: "9h30 - 11h00",
      title: "Module 1 : Fondamentaux de l'auto-hypnose",
      learnings: [
        "Accueil et présentation du parcours",
        "Définition : qu'est-ce que l'hypnose et l'auto-hypnose exactement ?",
        "Les mécanismes neurophysiologiques derrière l'hypnose",
        "Mythes et réalités : démystifier les croyances",
        "Les différents états de conscience et l'état hypnotique",
        "Exercice pratique : votre première expérience modifiée de conscience"
      ],
      outcomes: [
        "Comprendre ce qui se passe dans votre cerveau en hypnose",
        "Identifier vos ressources personnelles pour l'auto-hypnose",
        "Entrer dans un état de relaxation profonde"
      ]
    },
    {
      time: "🌅 Matin",
      period: "11h15 - 12h30",
      title: "Module 2 : Techniques d'induction hypnotique",
      learnings: [
        "Les techniques ericksonniennes pour accéder à l'inconscient",
        "Les ancres sensorielles et comment les utiliser",
        "L'entrée progressive dans l'état hypnotique",
        "Les signaux du corps qui indiquent que vous êtes en hypnose",
        "Pratique guidée : induction simple et efficace à domicile",
        "Les erreurs courantes et comment les éviter"
      ],
      outcomes: [
        "Utiliser 2-3 techniques d'induction selon votre profil",
        "Reconnaître quand vous êtes en état hypnotique",
        "Installer une routine de relaxation rapide (5-10 min)"
      ]
    },
    {
      time: "☀️ Après-midi",
      period: "14h00 - 15h15",
      title: "Module 3 : Approfondissement de l'état hypnotique",
      learnings: [
        "Aller plus profond : les niveaux d'hypnose",
        "La méthode ESPERE de Jacques Salomé appliquée à l'hypnose",
        "Comment explorer et transformer vos croyances limitantes",
        "Créer des suggestions positives personnalisées",
        "La notion de métaphores thérapeutiques",
        "Exercice : construire votre script d'auto-hypnose personnel"
      ],
      outcomes: [
        "Rédiger votre propre script d'auto-hypnose sur mesure",
        "Identifier vos ancrages positifs (visuels, auditifs, kinesthésiques)",
        "Approfondir votre pratique pour des résultats plus durables"
      ]
    },
    {
      time: "☀️ Après-midi",
      period: "15h30 - 17h00",
      title: "Module 4 : Applications pratiques pour la gestion du stress",
      learnings: [
        "Adapter l'auto-hypnose à VOS défis spécifiques : stress pro, anxiété, sommeil",
        "Techniques \"flash\" : calmer un pic d'anxiété en 2 minutes",
        "Protocoles pour dormir sans ruminations",
        "Gérer la pression en réunion / avant un événement",
        "Intégrer l'auto-hypnose à votre quotidien (routine du matin, du soir)",
        "Les erreurs de pratique et comment les corriger",
        "Suivi post-formation : comment progresser seul"
      ],
      outcomes: [
        "Utiliser 3-4 techniques de gestion rapide du stress",
        "Créer votre routine personnelle d'auto-hypnose",
        "Continuer à progresser seul avec les outils et le support fourni"
      ]
    },
    {
      time: "🌆 Fin de journée",
      period: "17h00 - 17h30",
      title: "Module 5 : Conclusion et perspectives",
      learnings: [
        "Résumé des points clés et de votre progression",
        "Vos prochaines étapes pour consolider votre pratique",
        "Accès aux ressources bonus : audios guidés, fiches pratiques",
        "Présentation du suivi téléphonique (1 mois après)",
        "Questions-réponses finales",
        "Moment symbolique : valider vos ancrages avant de partir"
      ],
      outcomes: [
        "Un script d'auto-hypnose enregistré (si vous le souhaitez)",
        "Fiches récapitulatives des techniques apprises",
        "Accès 3 mois gratuit à NovaRespire avec protocole stress personnalisé",
        "Garantie satisfait ou remboursé 14 jours"
      ]
    }
  ];

  const practicalInfo = [
    { label: "Date", value: "Dimanche 12 avril 2026" },
    { label: "Horaires", value: "9h30 - 17h30 (accueil à partir de 9h00)" },
    { label: "Lieu", value: "Paris Bastille" },
    { label: "Adresse", value: "16 rue Saint Antoine, 75004 Paris" },
    { label: "Accès", value: "Métro Bastille (lignes 1, 5, 8) ou Saint-Paul (ligne 1)" }
  ];

  const trainerInfo = {
    name: "Alain Zenatti",
    role: "Hypnothérapeute certifié",
    experience: "Plus de 5 ans d'expérience",
    description: "J'accompagne depuis plus de 5 ans des personnes souhaitant retrouver calme, sérénité et confiance face aux défis du quotidien.",
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-nova-blue-dark font-serif">
          Formation auto-hypnose Paris Harmonia : programme détaillé
        </h2>

        <p className="text-center text-lg text-gray-700 mb-16 max-w-3xl mx-auto">
          Un jour intensif pour maîtriser l'auto-hypnose et transformer votre gestion du stress
        </p>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
          {/* Colonne 1: Programme */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-nova-blue text-center lg:text-left">
              Programme détaillé
            </h3>

            <Accordion type="single" collapsible className="mb-10">
              {schedule.map((module, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    <div className="flex flex-col items-start text-left">
                      <span className="text-nova-blue font-bold">{module.time} - {module.period}</span>
                      <span>{module.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-nova-blue-dark mb-2">Ce que vous apprendrez :</h4>
                        <ul className="list-disc pl-6 space-y-1 text-gray-600">
                          {module.learnings.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-nova-green/10 p-4 rounded-lg">
                        <h4 className="font-bold text-nova-blue-dark mb-2">Ce que vous saurez faire à la fin :</h4>
                        <ul className="space-y-1 text-gray-700">
                          {module.outcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-nova-green mr-2">✓</span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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

            <h3 className="text-2xl font-bold mb-6 text-nova-blue text-center lg:text-left">
              Votre formateur
            </h3>
            <Card className="shadow-md border-nova-blue/20">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-nova-blue-dark">{trainerInfo.name}</h4>
                  <p className="text-nova-blue">{trainerInfo.role}</p>
                  <p className="text-sm text-gray-500">{trainerInfo.experience}</p>
                </div>
                <p className="text-gray-600 mb-4">{trainerInfo.description}</p>
                <p className="text-gray-600 mb-4">{trainerInfo.approach}</p>
                <div>
                  <p className="font-medium text-gray-700 mb-2">Formations :</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {trainerInfo.formations.map((formation, index) => (
                      <li key={index}>{formation}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;
