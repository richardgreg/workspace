module.exports = {
  purge: [
    './pages/*.{js,ts,jsx,tsx}',
    './container/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1380px',
      // => @media (min-width: 1380px) { ... }

      'xl': '1840px',
      // => @media (min-width: 1840px) { ... }

      '2xl': '2560px',
    },
    extend: {
      spacing: {
        18: '4.5rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
        100: '25.5rem',
        104: '27rem',
        112: '30rem',
        128: '40rem',
        129: '52rem',
      },
      lineHeight: {
        button: '32px',
      },
      scale: {
        101: '1.01',
        102: '1.02',
      },
      rotate: {
        '-30': '-30deg',
      },
      colors: {
        primary: '#FDEAA7',
        primaryLight: '#FFF5CF',

        secondary: '#73B7EA',
        secondaryLight: '#DBEAFE',
        secondaryDark: '#25283D',

        ctaYellow: '#F6CB22',
        ctaYellowLight: '#FFD324',
      },
      backgroundImage: (theme) => ({
        'index-upper-pattern': "url('/images/bgLbpIndexUpper.svg')",
        'upper-pattern': "url('/images/upper.svg')",
        'lower-pattern': "url('/images/lower.svg')",
        'upper-faq-pattern': "url('/images/bgUpperFaq.svg')",
      }),
      fontFamily: {
        landing: ['Avenir Next LT Pro', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: { opacity: ['disabled'] },
  },
  plugins: [],
};
