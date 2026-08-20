import type { MetadataRoute } from "next";

// TODO: заменить на реальный домен перед запуском в production
const siteUrl = "https://example-cvt-service.ru";

// Сайт одностраничный — услуги/марки/кейсы/отзывы/контакты живут как
// секции на главной, отдельных URL для них больше нет.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/privacy-policy", "/consent"];

  return staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
