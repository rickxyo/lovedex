import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fffaf0",
          100: "#fff1d6",
          200: "#f8ddb0"
        },
        rosebit: {
          100: "#ffe4ea",
          300: "#ff9bb4",
          500: "#f0527d",
          700: "#b82955"
        },
        violetbit: {
          100: "#eee7ff",
          300: "#b99cff",
          500: "#7c4dff",
          700: "#4d2c9c"
        },
        midnight: {
          700: "#1b2440",
          800: "#11172b",
          900: "#080d1c"
        }
      },
      boxShadow: {
        pixel: "4px 4px 0 #1b2440",
        "pixel-soft": "3px 3px 0 rgba(27, 36, 64, 0.22)",
        "pixel-rose": "4px 4px 0 #b82955",
        "pixel-purple": "4px 4px 0 #4d2c9c"
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
