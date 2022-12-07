const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      BlackOpsOne: ['Black Ops One', 'system-ui'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      orange: colors.orange,
      myIndigo: 'rgb(42, 52, 76)',
      myWhite: 'rgb(245, 245, 245)',
      myGray: 'rgb(187, 187, 187)',
      myBlack: 'rgb(45, 45, 45)',
    },
    extend: {
      spacing: {
        30: '7.5rem',
        88: '22rem',
        104: '26rem',
        112: '28rem',
        128: '32rem',
      },
    },
  },
  plugins: [],
};
