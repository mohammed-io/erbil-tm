module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      colors: {
        tm: {
          '50': '#D57989',
          '100': '#D0697C',
          '200': '#C64A61',
          '300': '#B0384D',
          '400': '#912E40',
          '500': '#722432',
          '600': '#47171F',
          '700': '#1D090D',
          '800': '#000000',
          '900': '#000000',
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}
