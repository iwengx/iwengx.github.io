/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.{js,ts,vue}'],
  darkMode: 'selector',
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      gray: {
        light: '#555',
        dark: '#bbb',
      },
    },
  },
  daisyui: {
    themes: ['light', 'dark'],
  },
  plugins: [require('daisyui')],
}
