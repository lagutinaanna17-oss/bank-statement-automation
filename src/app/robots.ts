import type { MetadataRoute } from "next";

const siteUrl = "https://example-cvt-service.ru";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
