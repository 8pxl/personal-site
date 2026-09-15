"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { Photo } from "./photosManifest";

type Column = {
  items: Photo[];
  totalAspect: number;
};

function distributePhotos(photos: Photo[], columnsCount: number): Photo[][] {
  const cols: Column[] = Array.from({ length: columnsCount }, () => ({
    items: [],
    totalAspect: 0,
  }));

  for (const p of photos) {
    const aspect = p.width / p.height;
    let bestIndex = 0;
    for (let i = 1; i < cols.length; i++) {
      if (cols[i].totalAspect < cols[bestIndex].totalAspect) bestIndex = i;
    }
    cols[bestIndex].items.push(p);
    cols[bestIndex].totalAspect += aspect;
  }

  return cols.map((c) => c.items);
}

// clamp() speeds make ScrollSmoother start in-viewport elements at their
// natural position at scroll 0, so the columns are aligned on load with no
// manual compensation; parallax diverges as you scroll.
const COLUMN_SPEEDS = ["clamp(0.85)", "clamp(1.1)", "clamp(1.35)"];
const COLUMN_VISIBILITY = ["", "hidden md:block", "hidden lg:block"];

export default function PhotosParallaxGrid({ photos }: { photos: Photo[] }) {
  const columns = useMemo(() => distributePhotos(photos, 3), [photos]);

  return (
    <div className="w-full">
      <div className="mx-auto w-[min(1200px,92vw)] pt-16 pb-24">
        <div className="mb-10 flex items-end justify-between gap-6 font-js text-white">
          <div className="text-3xl md:text-4xl lg:text-5xl italic">photos</div>
          <div className="text-sm md:text-base">a small collection</div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((column, i) => (
            <div key={i} className={COLUMN_VISIBILITY[i]}>
              <div
                data-speed={COLUMN_SPEEDS[i]}
                data-lag="0"
                suppressHydrationWarning
                className="flex flex-col gap-6 will-change-transform"
              >
                {column.map((p) => (
                  <figure
                    key={p.src}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                    style={{ aspectRatio: `${p.width}/${p.height}` }}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 92vw"
                      className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-white/10 bg-black/20 p-6 font-js text-white/80">
            Drop images into <span className="text-white">public/photos</span> and run
            <span className="text-white"> npm run photos:manifest</span>.
          </div>
        ) : null}
      </div>
    </div>
  );
}
