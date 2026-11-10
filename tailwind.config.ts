import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          950: "#1A0B2E",
          900: "#240F3F",
          800: "#3B1A7A",
          700: "#4B2499",
          600: "#5C2DB8",
          500: "#6B2FD6",
          400: "#8B5CF6",
        },
        accent: {
          DEFAULT: "#F59A1B",
          dark: "#D97706",
          light: "#FDBA4D",
        },
        background: "#0D0716",
        lavender: "#C9B8F0",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(245,154,27,0.35)",
        card: "0 8px 30px rgba(0,0,0,0.35)",
      },
      borderWidth: {
        3: "3px",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
