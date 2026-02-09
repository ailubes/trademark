import type { MetadataRoute } from "next";

const BASE_URL = "https://trademark.com.ua";

const routes = [
  "/",
  "/services",
  "/services/trademark-registration/ukraine",
  "/services/trademark-registration/eu",
  "/services/trademark-registration/international",
  "/services/patents",
  "/services/copyright",
  "/pricing",
  "/contact",
  "/nice-classes",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: (() => {
      if (route === "/") return 1;
      if (route === "/services") return 0.9;
      if (route.startsWith("/services/")) return 0.8;
      if (route === "/pricing") return 0.7;
      if (route === "/contact") return 0.7;
      if (route === "/nice-classes") return 0.6;
      return 0.5;
    })(),
  }));
}
