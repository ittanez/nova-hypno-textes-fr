export type QuestionTest = {
  id: string;
  text: string;
  canal: 'V' | 'A' | 'K' | 'O' | 'G';
};

// 30 questions VAKOG, affichées en ordre intercalé (V1, A1, K1, O1, G1, V2, ...)
export const receptiviteQuestionsTest: QuestionTest[] = [
  {
    id: 'V1',
    canal: 'V',
    text: "Je suis capable de visualiser des scènes ou des objets avec beaucoup de détails dans mon esprit."
  },
  {
    id: 'A1',
    canal: 'A',
    text: "Je me laisse souvent emporter par la musique que j'écoute."
  },
  {
    id: 'K1',
    canal: 'K',
    text: "Dans certaines situations, je perds la notion du temps."
  },
  {
    id: 'O1',
    canal: 'O',
    text: "Une odeur peut immédiatement me rappeler un souvenir précis."
  },
  {
    id: 'G1',
    canal: 'G',
    text: "Un goût peut me transporter instantanément dans un souvenir."
  },
  {
    id: 'V2',
    canal: 'V',
    text: "J'ai souvent des rêves très vivaces et détaillés."
  },
  {
    id: 'A2',
    canal: 'A',
    text: "Je ressens souvent profondément les émotions suggérées par un film ou une histoire."
  },
  {
    id: 'K2',
    canal: 'K',
    text: "Je peux facilement modifier mon état d'esprit selon la situation."
  },
  {
    id: 'O2',
    canal: 'O',
    text: "Je suis sensible aux odeurs de mon environnement (parfums, nature, cuisine)."
  },
  {
    id: 'G2',
    canal: 'G',
    text: "Je suis attentif(ve) aux saveurs et aux textures de ce que je mange."
  },
  {
    id: 'V3',
    canal: 'V',
    text: "Je peux facilement me perdre dans un bon livre ou un film."
  },
  {
    id: 'A3',
    canal: 'A',
    text: "Les sons de mon environnement (voix, musique, bruits) influencent facilement mon humeur."
  },
  {
    id: 'K3',
    canal: 'K',
    text: "Je fais confiance facilement aux autres lorsqu'ils me guident."
  },
  {
    id: 'O3',
    canal: 'O',
    text: "Certaines odeurs modifient immédiatement mon humeur ou mon état intérieur."
  },
  {
    id: 'G3',
    canal: 'G',
    text: "Ce que je mange influence directement mon humeur et mon niveau d'énergie."
  },
  {
    id: 'V4',
    canal: 'V',
    text: "Je remarque facilement les détails visuels dans mon environnement (couleurs, formes, lumières)."
  },
  {
    id: 'A4',
    canal: 'A',
    text: "Je mémorise facilement des mélodies ou des voix."
  },
  {
    id: 'K4',
    canal: 'K',
    text: "Je ressens physiquement les émotions de manière intense (tensions, chaleur, frissons)."
  },
  {
    id: 'O4',
    canal: 'O',
    text: "Les odeurs jouent un rôle important dans mon confort ou mon inconfort."
  },
  {
    id: 'G4',
    canal: 'G',
    text: "Je remarque facilement les nuances de goût dans ce que je consomme."
  },
  {
    id: 'V5',
    canal: 'V',
    text: "Lorsque je me souviens d'un événement passé, je revois les images clairement dans ma tête."
  },
  {
    id: 'A5',
    canal: 'A',
    text: "Je peux facilement entendre mentalement une musique ou une voix que je connais."
  },
  {
    id: 'K5',
    canal: 'K',
    text: "Je peux rester concentré(e) sur une seule chose pendant une longue période sans effort particulier."
  },
  {
    id: 'O5',
    canal: 'O',
    text: "Je perçois des odeurs que d'autres personnes ne remarquent pas."
  },
  {
    id: 'G5',
    canal: 'G',
    text: "La saveur d'un aliment peut me faire revivre un moment passé avec précision."
  },
  {
    id: 'V6',
    canal: 'V',
    text: "Je peux aisément imaginer un endroit que l'on me décrit sans l'avoir vu."
  },
  {
    id: 'A6',
    canal: 'A',
    text: "Le silence ou le bruit de fond dans un lieu influence fortement mon état intérieur."
  },
  {
    id: 'K6',
    canal: 'K',
    text: "Mon corps réagit rapidement aux suggestions ou aux ambiances (chaleur, détente, légèreté)."
  },
  {
    id: 'O6',
    canal: 'O',
    text: "Une odeur agréable suffit à me mettre dans un état de bien-être."
  },
  {
    id: 'G6',
    canal: 'G',
    text: "Je suis sensible aux changements subtils de texture ou de goût dans mes aliments."
  }
];
