import HeroSlider from "@/components/HeroSlider";
import Row from "@/components/Row";
import { getTrending, getPopularMovies, getTopRatedMovies, getUpcoming, getPopularTV, getTopRatedTV } from "@/lib/tmdb";

export const revalidate = 3600;

export default async function Home() {
  const [trending, popular, top, upcoming, tvPop, tvTop] = await Promise.all([
    getTrending("all").catch(() => []),
    getPopularMovies().catch(() => []),
    getTopRatedMovies().catch(() => []),
    getUpcoming().catch(() => []),
    getPopularTV().catch(() => []),
    getTopRatedTV().catch(() => [])
  ]);
  return (
    <>
      <HeroSlider items={trending} />
      <Row title="🔥 Trending This Week" items={trending} />
      <Row title="🎬 Popular Movies" items={popular} type="movie" />
      <Row title="📺 Popular TV Shows" items={tvPop} type="tv" />
      <Row title="⭐ Top Rated Movies" items={top} type="movie" />
      <Row title="🏆 Top Rated TV Shows" items={tvTop} type="tv" />
      <Row title="🎟️ Upcoming Movies" items={upcoming} type="movie" />
    </>
  );
}
