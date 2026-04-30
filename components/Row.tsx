import PosterCard from "./PosterCard";
import { MediaItem, MediaType } from "@/lib/tmdb";

export default function Row({ title, items, type }: { title: string; items: MediaItem[]; type?: MediaType }) {
  return (
    <section className="my-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4 px-4 max-w-7xl mx-auto">{title}</h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x">
          {items.slice(0, 18).map(it => (
            <div key={`${it.id}-${it.media_type || type}`} className="flex-none w-36 sm:w-44 md:w-48 snap-start">
              <PosterCard item={it} type={type} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
