const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#7FCEFF",
        secondary: "#307BA9",
        muted: "#F3F4F6",
        "muted-foreground": "#6B7280",
        foreground: "#F9FAFB",
      },
    },
  },
  plugins: [nextui()],
};
