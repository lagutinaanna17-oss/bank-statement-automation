import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Тёмно-синий/графит — базовая палитра "технично-надёжного" стиля
        ink: {
          950: "#070B14",
          900: "#0B1424",
          800: "#111D33",
          700: "#1B2A44",
          600: "#2A3B58",
        },
        // Акцентный оранжевый — кнопки, CTA
        accent: {
          DEFAULT: "#FF6B35",
          hover: "#E85A28",
          light: "#FFE4D6",
        },
        // Электрик-синий — вторичный акцент, ссылки, бейджи
        electric: {
          DEFAULT: "#2F80ED",
          hover: "#1F6FDB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        // Объёмные тени для карточек в 3D-стиле
        depth: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 20px 40px -12px rgba(0,0,0,0.55)",
        "depth-lg": "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 30px 60px -15px rgba(0,0,0,0.6)",
        glow: "0 0 40px -8px rgba(255,107,53,0.45)",
        "glow-electric": "0 0 40px -8px rgba(47,128,237,0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(14px) translateX(-10px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "spin-slow": "spin-slow 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
