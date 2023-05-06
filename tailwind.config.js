/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'trainer': "url('src/assets/img/background-trainer.png')",
        'about': "url('src/assets/img/bg-about-us.jpg')",
        'about-content': "url('src/assets/img/bg-black-about.jpg')",
      },
      backgroundColor: {
        'white-train-me': '#FFFFFF',
        'black-train-me': '#171717',
        'gray1-train-me': '#F5F5F5',
        'gray2-train-me': '#F0F0F0',
        'red-train-me': '#FF0000',
        'dark-train-me': '#424147',
      },
      textColor: {
        'white-train-me': '#FFFFFF',
        'black-train-me': '#171717',
        'gray1-train-me': '#F5F5F5',
        'gray2-train-me': '#F0F0F0',
        'red-train-me': '#FF0000',
        'dark-train-me': '#424147',
      },
      fontFamily: {
        'primary': 'Lobster',
        'secondary': 'Varela Round',
        'serif-train-me': 'Varela Round',
      },
      screens: {
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled', 'range'],
      borderColor: ['responsive', 'hover', 'focus', 'active', 'disabled', 'range'],
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],

}

