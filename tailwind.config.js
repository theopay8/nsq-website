/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nsq: {
          black: "#050505",
          dark: "#121212",
          red: "#DC143C",
          darkred: "#8B0000",
          gold: "#FFD700",
        },
      },
      fontFamily: {
        heading: ["Rajdhani", "sans-serif"],
        body: ["Inter", "sans-serif"],
        script: ["Racing Sans One", "cursive"],
      },
    },
  },
  plugins: [],
};
