module.exports = {
  content: ["index.html", "src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        verdePrtk: {
          100: "rgb(187,227,103)",
          200: "rgb(155,205,74)",
          300: "rgb(124,183,54)",
        },
        amarilloPrtk: {
          100: "rgb(237,204,62)"
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
