export type VAKOGQuestion = {
  id: string;
  text: string;
  type: 'V' | 'A' | 'K' | 'O' | 'G';
};

export const vakogQuestions: VAKOGQuestion[] = [
  {
    id: "v1",
    text: "Les images et les schémas facilitent mon apprentissage",
    type: "V"
  },
  {
    id: "a1",
    text: "J'apprends mieux en écoutant des explications",
    type: "A"
  },
  {
    id: "k1",
    text: "Je comprends mieux en faisant les choses moi-même",
    type: "K"
  },
  {
    id: "o1",
    text: "Les odeurs évoquent facilement des souvenirs chez moi",
    type: "O"
  },
  {
    id: "g1",
    text: "Les saveurs me marquent particulièrement",
    type: "G"
  },
  {
    id: "v2",
    text: "Je mémorise mieux quand je peux visualiser l'information",
    type: "V"
  },
  {
    id: "a2",
    text: "Les sons et la musique captent facilement mon attention",
    type: "A"
  },
  {
    id: "k2",
    text: "J'apprécie particulièrement les sensations physiques comme le toucher",
    type: "K"
  },
  {
    id: "o2",
    text: "Je suis très sensible aux parfums et aux odeurs",
    type: "O"
  },
  {
    id: "g2",
    text: "Je me souviens facilement des goûts et des expériences gustatives",
    type: "G"
  }
];
