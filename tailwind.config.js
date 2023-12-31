/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      sm: "330px",
      md: "768px",
      lg: "976px",
      xl: "1440px"
    },
    extend: {
      colors : {
        primary: {
          darkgray : "hsl(0, 0%, 17%)",
          gray : "hsl(0, 0%, 59%)"
        }
      },
      fontFamily: {
        cantrell: ['Cantrell', 'sans'],
      },
    },
  },
  plugins: [],
}
