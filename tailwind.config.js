/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#e17055',
        secondary: '#CBFF9D',
        lightgray: '#f5f5f5',
        darkgray: '#1a1a2e',
        darkbg: '#0f0f1a',
        darkcard: '#1a1a2e',
        darkborder: '#2a2a4a'
      },
      fontFamily: {
        sans: ['Geologica', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
