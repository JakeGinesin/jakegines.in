module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      // ...
      borderColor: ['focus-visible', 'first'],
      // ...
      textColor: ['visited'],
      scale: ['active', 'group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
