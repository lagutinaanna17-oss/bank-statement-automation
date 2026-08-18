/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // WebP по умолчанию, ленивая загрузка через next/image "из коробки".
    formats: ["image/webp"],
  },
};

export default nextConfig;
