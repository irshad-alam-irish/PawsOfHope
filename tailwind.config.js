/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fefbf3',
          100: '#fef7e0',
          200: '#fcefc1',
          300: '#f9e39b',
          400: '#f4c94b',
          500: '#e5a11c',
          600: '#c4880d',
          700: '#a36c0a',
          800: '#7d5308',
          900: '#5c3d06',
        },
        brown: {
          50: '#faf7f5',
          100: '#f0e8e3',
          200: '#e1d1c7',
          300: '#c8b4a4',
          400: '#a8907a',
          500: '#8b7260',
          600: '#6b574a',
          700: '#4d3f36',
          800: '#3d2e1e',
          900: '#2a1f14',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
