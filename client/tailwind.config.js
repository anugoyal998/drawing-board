module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        hoverColor: '#edf2f7'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
