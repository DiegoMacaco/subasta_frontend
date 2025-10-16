/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  theme: {
    extend: {
      colors: {
        qhatu: {
          base: '#89C9B8',
          dark: '#2E594E',
          accent: '#EFD780',
          light: '#F8F9F8',
          text: '#333333',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
