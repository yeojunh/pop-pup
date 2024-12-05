const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    colors: {
      "campfire-teal": {
        light: "#babba4",
        default: "#7f9a8b",
        dark: "#638a7e",
      },
      "campfire-emerald": {
        light: "#c1c1a6",
        default: "#8ba38d",
        dark: "#719382",
      },
      "campfire-lime": {
        light: "#dcd8af",
        default: "#bdc499",
        dark: "#aebb8f",
      },
      "campfire-yellow": {
        light: "#f3e4b0",
        default: "#ebd79c",
        dark: "#e7d192",
      },
      "campfire-amber": {
        light: "#2fd5a3",
        default: "#ebc08a",
        dark: "#e8b57f",
      },
      garden: {
        lightshade: "#f9faf6",
        lightaccent: "#cad5b6",
        main: "#bdc88d",
        darkaccent: "#cd9397",
        darkshade: "#547369",
        evendarkershade: "#41514c",
        info: "#547168",
        success: "#6eb762",
        warning: "#eba62a",
        danger: "#f44336",
      },
      zinc: colors.zinc,
      amber: colors.amber,
    },
  },
};
