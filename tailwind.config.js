/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      blue: "#4B91F2",
      gray: "#8C8C8C",
      "gray-light": "#F2F2F2",
      green: "#7BF277",
      red: "#F20505",
      black: "#0D0D0D",
      white: "#FFFFFF",
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
      },
      animation: {
        fadeInDown: "fadeInDown 1.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
