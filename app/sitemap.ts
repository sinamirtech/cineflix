import type { MetadataRoute } from "next";
import { getPopularMovies, getPopularTV } from "@/lib/tmdb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    { url: "/", changeFrequency: "daily", priority: 1 },
    { url: "/category/movie", changeFrequency: "daily", priority: 0.9 },
    { url: "/category/tv", changeFrequency: "daily", priority: 0.9 }
  ];
  try {
    const [m, t] = await Promise.all([getPopularMovies(), getPopularTV()]);
    return [
      ...base,
      ...m.slice(0, 20).map(x => ({ url: `/movie/${x.id}`, changeFrequency: "weekly" as const, priority: 0.7 })),
      ...t.slice(0, 20).map(x => ({ url: `/tv/${x.id}`, changeFrequency: "weekly" as const, priority: 0.7 }))
    ];
  } catch { return base; }
}
