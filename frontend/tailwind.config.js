module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Bungee', 'cursive'],
        'sans': ['Montserrat']
      },
      keyframes: {
        fadeRiseIn: {
          '0%': { opacity: 0, transform: 'translate3d(0,10%,0)' },
          '100%': { opacity: 1, transform: 'translate3d(0,0,0)' },
        },
      },
      animation: {
        fadeRiseIn: 'fadeRiseIn .2s ease-in-out',
      },
      width: {
        '450': '450px',
        '576': '576px'
      },
      height: {
        '576': '576px',
        '95': '95%'
      },
      colors: {
        'sand': '#ffebcd',
        'sandMedium': '#ffdead',
        'sandMedium50': '#EBCA99',
        'sandDark': '#C3A271',
        'secondaryGrey': '#1E1E1E',
        'midnight': '#3e54f7',
        'midnightMedium': '#041276',
        'paradise': '#191C1F',
        'paradiseMedium': '#2D3033',
        'paradiseLight': 'rgba(255, 255, 255, 0.04)',
        'paradiseHover': 'rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}
