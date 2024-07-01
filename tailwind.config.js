/** @type {import('tailwindcss').Config} */
//eslint-disabe-next-line
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      fontFamily: {
        sans: 'Roboto Mono, monospace',
      },
      colors: {
        pizza: '#123F4F'
      },
      height: {
        screen: '100dvh'
      }
    },
  },
  plugins: [],
}

