/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['"Montserrat"', 'sans-serif'],
                noto: ['"Noto Sans"', 'sans-serif'],
                roboto: ['"Roboto"', 'sans-serif'],
            },
        },
    },
    plugins: [],
  }