const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      main: 'rgb(45, 45, 45)',
    },
    extend: {
      spacing: {
        88: '22rem',
        104: '26rem',
        112: '28rem',
        128: '32rem',
      },
    },
  },
  plugins: [],
};
