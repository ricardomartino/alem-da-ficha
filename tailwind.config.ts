/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./alem-da-ficha-frontend/index.html",
    "./alem-da-ficha-frontend/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'serif'],
      },
    },
  },
  plugins: [],
}