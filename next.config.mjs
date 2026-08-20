/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // WebP по умолчанию, ленивая загрузка через next/image "из коробки".
    formats: ["image/webp"],
  },
  // Сайт стал одностраничным — старые отдельные страницы объединены в
  // секции на главной. Редиректы на случай, если старые ссылки где-то
  // уже расшарены (соцсети, старые закладки, поисковая выдача).
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/brands", destination: "/#brands", permanent: true },
      { source: "/brands/:slug", destination: "/#brands", permanent: true },
      { source: "/cases", destination: "/#cases", permanent: true },
      { source: "/reviews", destination: "/#reviews", permanent: true },
      { source: "/contacts", destination: "/#lead-form", permanent: true },
    ];
  },
};

export default nextConfig;
