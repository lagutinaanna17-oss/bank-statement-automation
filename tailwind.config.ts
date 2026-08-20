import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Светлая база: мягкий фон → белые карточки → тёмный текст.
        // ink.deep — единственный тёмный тон, используется для заголовков
        // и для тёмных "бэндов" (подвал, cookie-баннер).
        ink: {
          950: "#F3F6FB", // фон страницы
          900: "#FFFFFF", // карточки/панели
          800: "#F7F9FC", // альтернативная светлая панель
          700: "#E4E9F2", // границы
          600: "#5B6472", // приглушённый текст на светлом фоне
          deep: "#0B1424", // тёмный текст на светлом фоне / фон тёмных бэндов
        },
        // Фирменный цвет бренда COOLiNAUTO — тёмно-синий (из логотипа)
        accent: {
          DEFAULT: "#00477A",
          hover: "#00365E",
          light: "#DCEAF4",
        },
        // Фирменная бирюза COOLiNAUTO — вторичный акцент, ссылки, бейджи, CTA
        electric: {
          DEFAULT: "#0BBEDB",
          hover: "#0AA5BF",
        },
        // Более тёмный синий — третий акцент для градиентов и "вау"-пятен на фоне
        violet: {
          DEFAULT: "#0A3A63",
          hover: "#082C4C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        // Объёмные тени для карточек в 3D-стиле (мягче — под светлую тему)
        depth: "0 1px 0 0 rgba(255,255,255,0.7) inset, 0 20px 40px -14px rgba(15,23,42,0.16)",
        "depth-lg": "0 1px 0 0 rgba(255,255,255,0.8) inset, 0 30px 60px -15px rgba(15,23,42,0.22)",
        glow: "0 0 40px -8px rgba(0,71,122,0.4)",
        "glow-electric": "0 0 40px -8px rgba(11,190,219,0.45)",
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
