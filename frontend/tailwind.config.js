/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
         barlow:['Barlow', 'sans-serif'],
         teko:['Teko', 'sans-serif'],
         outfit:['Outfit', 'sans-serif']
      },
      colors: {
        primary: '#ff1313', 
        'primary-hover': '#c20505',
      },
    },
  },
  plugins: [],
}

