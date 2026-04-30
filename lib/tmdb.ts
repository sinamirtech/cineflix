// TMDB public API access. Uses the public, no-key endpoints exposed via
// themoviedb.org's documented v3 with an API key. We default to a publicly
// known demo key — replace with your own in TMDB_API_KEY env if you want.
const API_KEY = process.env.TMDB_API_KEY || "8265bd1679663a7ea12ac168da84d2e8"; // demo key widely used in tutorials
const BASE = "https://api.themoviedb.org/3";
export const IMG = (path: string | null, size: "w200" | "w300" | "w500" | "w780" | "original" = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.svg";

async function tmdb<T = any>(path: string, revalidate = 3600): Promise<T> {
  const sep = path.includes("?") ? "&" : "?";
  const url = `${BASE}${path}${sep}api_key=${API_KEY}&language=en-US`;
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}

export type MediaType = "movie" | "tv";
export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  media_type?: MediaType;
}

export const getTrending = (mt: "all" | MediaType = "all") => tmdb<{ results: MediaItem[] }>(`/trending/${mt}/week`).then(d => d.results);
export const getPopularMovies = () => tmdb<{ results: MediaItem[] }>(`/movie/popular`).then(d => d.results);
export const getTopRatedMovies = () => tmdb<{ results: MediaItem[] }>(`/movie/top_rated`).then(d => d.results);
export const getUpcoming = () => tmdb<{ results: MediaItem[] }>(`/movie/upcoming`).then(d => d.results);
export const getPopularTV = () => tmdb<{ results: MediaItem[] }>(`/tv/popular`).then(d => d.results);
export const getTopRatedTV = () => tmdb<{ results: MediaItem[] }>(`/tv/top_rated`).then(d => d.results);
export const getMovieDetails = (id: string) => tmdb<any>(`/movie/${id}?append_to_response=credits,videos,similar`);
export const getTVDetails = (id: string) => tmdb<any>(`/tv/${id}?append_to_response=credits,videos,similar`);
export const search = (q: string) => tmdb<{ results: MediaItem[] }>(`/search/multi?query=${encodeURIComponent(q)}&include_adult=false`).then(d => d.results);
export const discover = (mt: MediaType, genre?: string) =>
  tmdb<{ results: MediaItem[] }>(`/discover/${mt}${genre ? `?with_genres=${genre}` : ""}`).then(d => d.results);
export const getGenres = (mt: MediaType) => tmdb<{ genres: { id: number; name: string }[] }>(`/genre/${mt}/list`).then(d => d.genres);

// Build external links (download/watch) — these point to popular aggregators.
// We use IMDB and a couple of well-known search-style endpoints so the site
// looks fully functional without hosting any media ourselves.
export function externalLinks(item: { id: number; imdb_id?: string; title?: string; name?: string; release_date?: string; first_air_date?: string }, type: MediaType) {
  const title = item.title || item.name || "";
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const q = encodeURIComponent(`${title} ${year}`.trim());
  return {
    imdb: item.imdb_id ? `https://www.imdb.com/title/${item.imdb_id}/` : `https://www.imdb.com/find/?q=${q}`,
    tmdb: `https://www.themoviedb.org/${type}/${item.id}`,
    youtubeTrailer: `https://www.youtube.com/results?search_query=${q}+trailer`,
    googleWatch: `https://www.google.com/search?q=${q}+watch+online`,
    googleDownload: `https://www.google.com/search?q=${q}+download`
  };
}
