module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-light': '#F7F8FC',
        'secondary-light': '#FFFFFF',
        'ternary-light': '#f6f7f8',

        // 'primary-dark': '#0D2438',
        'primary-dark': '#000014',
        'secondary-dark': '#102D44',
        'ternary-dark': '#1E3851',

        purple: {
          400: '#9B51F4',

          500: '#9242F3',

          600: '#872FF2'
        }
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '5rem',
          xl: '6rem',
          '2xl': '8rem'
        }
      }
    }
  },
  variants: {
    extend: { opacity: ['disabled'] }
  },
  plugins: []
}
