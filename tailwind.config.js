/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1A1363",
        "secondary": "#ECE9E9",
        "table": "#77749B",
        "title": "#DEBA3B"
      }
    },
  },
  plugins: [],
}

