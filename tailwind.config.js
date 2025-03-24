/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tabletGothic: ['"Tablet Gothic Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}