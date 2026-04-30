"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };
  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-6">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-accent">Cine</span>Flix
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm text-white/80">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/category/movie" className="hover:text-white">Movies</Link>
          <Link href="/category/tv" className="hover:text-white">TV Shows</Link>
        </nav>
        <form onSubmit={submit} className="ml-auto flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <input
              value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search movies, TV shows..."
              className="w-full bg-panel border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent"
            />
            <button className="absolute right-1 top-1 bottom-1 px-3 rounded-full bg-accent text-white text-xs font-semibold hover:bg-accent2">Search</button>
          </div>
        </form>
        <button onClick={() => setOpen(!open)} className="md:hidden ml-auto text-white/80">☰</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 px-4 py-3 space-y-2">
          <Link href="/" className="block py-1">Home</Link>
          <Link href="/category/movie" className="block py-1">Movies</Link>
          <Link href="/category/tv" className="block py-1">TV Shows</Link>
          <form onSubmit={submit}>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="w-full bg-panel border border-white/10 rounded-full px-4 py-2 text-sm" />
          </form>
        </div>
      )}
    </header>
  );
}
