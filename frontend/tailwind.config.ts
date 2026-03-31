import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a3a52",
        secondary: "#2c5282",
        accent: "#d4a574",
        "accent-yellow": "#f4c430",
      },
      fontFamily: {
        heading: ["var(--font-lexend)", "sans-serif"],
        body: ["var(--font-source-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
