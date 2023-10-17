/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black1: "#2b2b2b",
        gray1: "#b4b4b4",
        yellow1: "#ffcc29",
      },
      dropShadow: {
        titles: [
          "0 0 5px rgba(180, 180, 180, 1)",
          "0 0 10px rgba(255, 204, 41, 0.25)",
          "0 0 15px rgba(255, 204, 41, 1)",
        ],
        errors: [
          "0 0 5px rgba(255, 0, 0, 0.5)",
          "0 0 10px rgba(255, 0, 0, 1)",
          "0 0 15px rgba(150, 0, 0, 1)",
        ],
      },
      screens: {
        response: "1080px",
        response1: "1366px"
      },
      animation: {
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
