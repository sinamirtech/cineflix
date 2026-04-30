import Link from "next/link";
import Image from "next/image";
import { IMG, MediaItem, MediaType } from "@/lib/tmdb";

export default function PosterCard({ item, type }: { item: MediaItem; type?: MediaType }) {
  const mt = (type || item.media_type || (item.title ? "movie" : "tv")) as MediaType;
  const title = item.title || item.name || "Untitled";
  const date = (item.release_date || item.first_air_date || "").slice(0, 4);
  return (
    <Link href={`/${mt}/${item.id}`} className="group block card-hover">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-panel">
        <Image
          src={IMG(item.poster_path, "w500")}
          alt={title}
          fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 200px"
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded">
          ★ {item.vote_average?.toFixed(1) || "—"}
        </div>
      </div>
      <div className="mt-2 px-1">
        <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-accent">{title}</h3>
        <p className="text-xs text-muted">{date}</p>
      </div>
    </Link>
  );
}
