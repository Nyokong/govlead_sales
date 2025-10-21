import { plugin } from "postcss";
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      ...defaultTheme.screens,
      sm: "375px",
      xmd: "414px",
      // => @media (min-width: 375px) { ... }
      // => @media (min-width: 414px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
