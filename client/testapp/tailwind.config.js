/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      'sans':['Avenir','Arial','sans-serif','Helvetica','Noto color Emoji'],
      'serif':['Georgia','Cambria', '"Times New Roman"', 'Times', 'serif'],
      'mono': ['Menlo']
    }
  },
  plugins: [],
}

