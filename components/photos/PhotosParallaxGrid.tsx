"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
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

export default function PhotosParallaxGrid({ photos }: { photos: Photo[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  const columns = useMemo(() => distributePhotos(photos, 3), [photos]);

  // ScrollSmoother effects apply a translate to elements with data-speed.
  // That means columns can start at different visual Y positions. We want them
  // aligned at the very top initially, then let parallax diverge after.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const align = () => {
      const wraps = Array.from(
        root.querySelectorAll<HTMLElement>("[data-photo-col-wrap]")
      ).filter((el) => el.offsetParent !== null);

      const inners = wraps
        .map((wrap) => wrap.querySelector<HTMLElement>("[data-photo-col-inner]"))
        .filter((el): el is HTMLElement => el !== null && el.offsetParent !== null);

      if (inners.length <= 1) return;

      const tops = inners.map((el) => el.getBoundingClientRect().top);
      const refTop = Math.min(...tops);

      for (let i = 0; i < wraps.length; i++) {
        const inner = inners[i];
        if (!inner) continue;
        const delta = inner.getBoundingClientRect().top - refTop;
        wraps[i].style.transform = `translateY(${-Math.round(delta) + 240}px)`;
      }
    };

    // Wait a tick so ScrollSmoother can apply its initial transforms.
    const raf1 = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(align);
    });

    window.addEventListener("resize", align);
    return () => {
      window.cancelAnimationFrame(raf1);
      window.removeEventListener("resize", align);
    };
  }, [photos.length]);

  return (
    <div ref={rootRef} className="w-full">
      <div className="mx-auto w-[min(1200px,92vw)] pt-16 pb-24">
        <div className="mb-10 flex items-end justify-between gap-6 font-js text-white">
          <div className="text-3xl md:text-4xl lg:text-5xl italic">photos</div>
          <div className="text-sm md:text-base">a small collection</div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div data-photo-col-wrap className="will-change-transform">
            <div
              data-photo-col-inner
              data-speed="0.85"
              data-lag="0"
              suppressHydrationWarning
              className="flex flex-col gap-6"
            >
              {columns[0]?.map((p) => (
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

          <div data-photo-col-wrap className="hidden will-change-transform md:block">
            <div
              data-photo-col-inner
              data-speed="1.1"
              data-lag="0"
              suppressHydrationWarning
              className="flex flex-col gap-6"
            >
              {columns[1]?.map((p) => (
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

          <div data-photo-col-wrap className="hidden will-change-transform lg:block">
            <div
              data-photo-col-inner
              data-speed="1.35"
              data-lag="0"
              suppressHydrationWarning
              className="flex flex-col gap-6"
            >
              {columns[2]?.map((p) => (
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
