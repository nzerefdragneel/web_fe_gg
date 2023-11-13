/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //Add the paths to all of your template files
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#F2FFE9',
        'medium-green':'#A6CF98',
        'dark-green':'#557C55',
        'error-color':'#FA7070'
      },
    },
  },
  plugins: [],
}