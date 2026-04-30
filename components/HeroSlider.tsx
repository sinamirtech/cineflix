"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMG, MediaItem } from "@/lib/tmdb";

export default function HeroSlider({ items }: { items: MediaItem[] }) {
  const slides = items.slice(0, 5);
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);
  if (!slides.length) return null;
  const s = slides[i];
  const title = s.title || s.name || "";
  const type = s.media_type === "tv" || s.name ? "tv" : "movie";
  return (
    <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
      {slides.map((sl, idx) => (
        <div key={sl.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}>
          <Image src={IMG(sl.backdrop_path, "original")} alt={sl.title || sl.name || ""} fill priority={idx === 0} className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 hero-gradient" />
        </div>
      ))}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-16">
        <div className="max-w-2xl">
          <span className="inline-block bg-accent/90 text-white text-xs font-bold px-2 py-1 rounded mb-3 uppercase">Featured</span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">{title}</h1>
          <p className="mt-3 text-white/80 line-clamp-3 text-sm md:text-base">{s.overview}</p>
          <div className="mt-5 flex gap-3">
            <Link href={`/${type}/${s.id}`} className="bg-accent hover:bg-accent2 px-6 py-3 rounded-full font-semibold text-sm">▶ Watch Now</Link>
            <Link href={`/${type}/${s.id}`} className="bg-white/10 hover:bg-white/20 backdrop-blur px-6 py-3 rounded-full font-semibold text-sm">More Info</Link>
          </div>
        </div>
        <div className="absolute bottom-6 right-4 flex gap-2">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-accent" : "w-4 bg-white/40"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
