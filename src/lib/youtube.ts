/**
 * Extrait l'identifiant YouTube (11 caractères) d'un ID brut ou d'une URL :
 * watch?v=, youtu.be/, /embed/, /shorts/. Renvoie l'entrée telle quelle si rien ne correspond.
 */
export const extractYouTubeId = (input: string): string => {
  const value = input.trim();
  const match = value.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : value;
};
