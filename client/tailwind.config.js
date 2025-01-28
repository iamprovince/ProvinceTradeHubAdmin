/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          mild: '#616161',   // Lightest gray
          light: '#a3a3a3',   // Light gray
          default: '#424242', // Mid-gray for input fields and text
          dark: '#262626',    // Darker background gray
        },
        text: {
          dark: '#262626',
          light: '#d8d8d8'
        },
        accent: '#7B1FA2',
        warning: {
          light: '#fff9c4',
          dark: '#fbc02d',
        },
        success: {
          light: '#c8e6c9',
          dark: '#388e3c',
        },
        error: {
          light: '#ffcdd2',
          dark: '#d32f2f',
        },
      },
    },
  },
  plugins: [],
});