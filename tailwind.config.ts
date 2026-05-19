import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        charcoal: "#2D2D2D",
        bone: "#F9F7F2",
        clay: "#E8E4D9",
        primary: {
          DEFAULT: "#A68A64",
          foreground: "#F9F7F2",
        },
        card: {
          DEFAULT: "#F9F7F2",
          foreground: "#2D2D2D",
        },
      },
    },
  },
  plugins: [],
};

export default config;
