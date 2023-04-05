/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D'
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ["group-hover"]
    }
  }
}
