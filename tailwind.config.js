/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      blue: "#4B91F2",
      "blue-light": "#FBFCFF",
      gray: "#8C8C8C",
      "gray-light": "#F2F2F2",
      green: "#7BF277",
      "green-light": "#D7FBD6",
      red: "#F20505",
      "red-light": "#FEE6E6",
      black: "#0D0D0D",
      white: "#FFFFFF",
    },
    height: {
      1: "0.25rem",
      5: "1.25rem",
      10: "2.5rem",
      20: "5rem",
      full: "100%",
      "75vh": "75vh",
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
  },
  plugins: [],
};
