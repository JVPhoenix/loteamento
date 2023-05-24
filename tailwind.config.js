/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "black1": "#2b2b2b",
        "gray1": "#b4b4b4",
        "yellow1": "#ffcc29"
      },
      dropShadow: {
        'titles': [
          "0 0 5px rgba(180, 180, 180, 1)",
          "0 0 10px rgba(255, 204, 41, 0.25)",
          "0 0 15px rgba(255, 204, 41, 1)",
        ]
      },
    },
  },
  plugins: [],
}
