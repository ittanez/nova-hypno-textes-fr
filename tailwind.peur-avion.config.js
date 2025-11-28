/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/peur-avion-maquette.html",
    "./public/peurdelavion.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4470AD', // Blue Yonder - Palette "Confiance Sereine"
        'primary-dark': '#233C67', // Rainbow Indigo
        'primary-light': '#CCDBEE', // Columbia Blue
        'cta-orange': '#F37336', // CTA accent orange
        'cta-orange-dark': '#D85A1F', // Orange hover
        'secondary': '#10B981',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Poppins', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
