import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  "/",
  "/bodas-y-eventos",
  "/projects/in-the-mix",
  "/projects/deep-roots",
  "/projects/poesia",
  "/projects/colaboraciones",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
