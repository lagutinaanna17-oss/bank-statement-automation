import type { MetadataRoute } from "next";
import { brands } from "@/lib/site-config";

// TODO: заменить на реальный домен перед запуском в production
const siteUrl = "https://example-cvt-service.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/services",
    "/brands",
    "/cases",
    "/reviews",
    "/contacts",
    "/privacy-policy",
    "/consent",
  ];

  const brandPages = brands.map((brand) => `/brands/${brand.slug}`);

  return [...staticPages, ...brandPages].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
