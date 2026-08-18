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
    },
  },
  plugins: [],
};

export default config;
