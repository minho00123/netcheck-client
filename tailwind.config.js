/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      blue: "#4B91F2",
      "blue-light": "#F5F7F9",
      "blue-dark": "#020659",
      gray: "#8C8C8C",
      "gray-light": "#F2F2F2",
      green: "#7BF277",
      "green-light": "#D7FBD6",
      "green-dark": "#174031",
      red: "#F20505",
      "red-light": "#FEE6E6",
      yellow: "#F2E205",
      black: "#0D0D0D",
      white: "#FFFFFF",
    },
    height: {
      "1px": "1px",
      1: "0.25rem",
      5: "1.25rem",
      7: "1.75rem",
      10: "2.5rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      full: "100%",
      "75vh": "75vh",
      "100vh": "100vh",
    },
    extend: {
      keyframes: {
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        fadeInDown: "fadeInDown 1.5s ease-out forwards",
        fadeIn: "fadeIn 1s ease-out forwards",
      },
    },
    screens: {
      sm: "640px",
      md: "780px",
      lg: "1125px",
    },
  },
  plugins: [],
};
