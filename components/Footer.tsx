export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-16 py-10 text-center text-sm text-muted">
      <div className="max-w-7xl mx-auto px-4">
        <p><span className="text-accent font-bold">Cine</span>Flix — Discover movies & series.</p>
        <p className="mt-2 text-xs">Movie data provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        <p className="mt-2 text-xs">© {new Date().getFullYear()} CineFlix. All rights reserved.</p>
      </div>
    </footer>
  );
}
