/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/peur-avion-maquette.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0EA5E9',
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
