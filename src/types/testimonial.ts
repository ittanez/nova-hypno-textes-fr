
export interface Testimonial {
  name: string;
  date: string;
  text: string;
  rating: number;
  image?: string;
  source?: 'Google' | 'Resalib';
}
