import type { Config } from "tailwindcss";
const { mauve, violet } = require("@radix-ui/colors");

const config: Config = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/elements/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      poppin: ["var(--font-poppins)"],
    },
    colors: {
      tableCellBorder: "#d2cdcd",
      tableCellBorderDark: "#373a3b",
      tableCellBackgroundDark: "#2a2d30",
      disabledGray: "#adb1bd",
      transparent: "transparent",
      white: "#FFFFFF",
      lightgray: "#F0EFED",
      borderLightgrey: "#F0F0F0",
      black: "#212427",
      primary: "#D6E6F7",
      secondary: "#314F8F",
      intermediate: "#388AEB",
      success: "#54CA6E",
      successLight: "#EEFAF0",
      danger: "#E1654A",
      dangerLight: "#FCF0ED",
      warning: "#E7C200",
      warningLight: "#FDF9E5",
    },
    boxShadow: {
      card: "0px 1px 3px rgba(0, 0, 0, 0.12)",
      // default:"0px 0px 4px 0px #c0c",
    },

    extend: {
      minHeight: {
        "80": "80%", // Adds a `min-h-80` class with a min-height of 60%
      },
      colors: {
        ...mauve,
        ...violet,
      },
      keyframes: {
        slideDown: {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
