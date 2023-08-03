module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    height: {
      "120": "30rem",
      "60": "15rem"
    },
    extend: {}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
