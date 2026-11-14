"use client";

import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTransitionState } from "next-transition-router";
import type { Photo } from "./photosManifest";
import PhotoLightbox from "./PhotoLightbox";

type Expanded = {
  photo: Photo;
  source: HTMLElement;
  thumbSrc: string;
  trigger: HTMLButtonElement;
};

type Column = {
  items: Photo[];
  // Column height in units of column width (sum of height / width).
  height: number;
};

// Greedy masonry: each photo goes to the currently shortest column. A photo's
// rendered height scales with height / width, so that's what gets summed.
function distributePhotos(photos: Photo[], columnsCount: number): Photo[][] {
  const cols: Column[] = Array.from({ length: columnsCount }, () => ({
    items: [],
    height: 0,
  }));

  for (const p of photos) {
    let bestIndex = 0;
    for (let i = 1; i < cols.length; i++) {
      if (cols[i].height < cols[bestIndex].height) bestIndex = i;
    }
    cols[bestIndex].items.push(p);
    cols[bestIndex].height += p.height / p.width;
  }

  return cols.map((c) => c.items);
}

// clamp() speeds make ScrollSmoother start in-viewport elements at their
// natural position at scroll 0, so the columns are aligned on load with no
// manual compensation; parallax diverges as you scroll.
const COLUMN_SPEEDS = ["clamp(0.85)", "clamp(1.1)", "clamp(1.35)"];

// Tailwind's md / lg breakpoints.
function getColumnCount() {
  if (window.matchMedia("(min-width: 64rem)").matches) return 3;
  if (window.matchMedia("(min-width: 48rem)").matches) return 2;
  return 1;
}

export default function PhotosParallaxGrid({ photos }: { photos: Photo[] }) {
  // Photos are distributed across the columns that are actually visible, so
  // the count has to come from the client. null until measured: the server
  // renders three columns, which stay hidden (data-gsap) until the intro.
  const [columnCount, setColumnCount] = useState<number | null>(null);
  const columns = useMemo(
    () => distributePhotos(photos, columnCount ?? 3),
    [photos, columnCount]
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<Expanded | null>(null);
  const { stage } = useTransitionState();
  // Same intro pattern as the hero: shorter delay when arriving behind the
  // enter wipe, full delay on a hard load.
  const arrivedViaTransitionRef = useRef<boolean | null>(null);
  if (arrivedViaTransitionRef.current === null) {
    arrivedViaTransitionRef.current = stage !== "none";
  }

  const { contextSafe } = useGSAP(() => {
    gsap.registerPlugin(SplitText);
    const targets = gsap.utils.toArray<HTMLElement>(
      "[data-photos-title], [data-photos-subtitle], figure",
      rootRef.current
    );
    if (targets.length > 0) {
      gsap.set(targets, { autoAlpha: 0 });
    }
  }, { scope: rootRef });

  // Measured in a layout effect so the corrected layout commits before the
  // first paint.
  useLayoutEffect(() => {
    const queries = ["(min-width: 64rem)", "(min-width: 48rem)"].map((q) => window.matchMedia(q));
    const update = () => setColumnCount(getColumnCount());
    update();
    queries.forEach((mq) => mq.addEventListener("change", update));
    return () => queries.forEach((mq) => mq.removeEventListener("change", update));
  }, []);

  // A breakpoint change after the intro moves figures into other columns,
  // which remounts them CSS-hidden ([data-gsap]); reveal those.
  const prevColumnCountRef = useRef(columnCount);
  useLayoutEffect(() => {
    const prev = prevColumnCountRef.current;
    prevColumnCountRef.current = columnCount;
    if (prev === null || prev === columnCount) return;
    const root = rootRef.current;
    const title = root?.querySelector<HTMLElement>("[data-photos-title]");
    // Intro hasn't played yet; it reveals everything itself.
    if (!root || !title || Number(gsap.getProperty(title, "opacity")) === 0) return;
    const hidden = gsap.utils
      .toArray<HTMLElement>("figure", root)
      .filter((fig) => getComputedStyle(fig).visibility === "hidden");
    if (hidden.length > 0) gsap.set(hidden, { autoAlpha: 1 });
  }, [columnCount]);

  useLayoutEffect(() => {
    if (stage === "leaving" || columnCount === null) return;
    const root = rootRef.current;
    if (!root) return;
    const title = root.querySelector<HTMLElement>("[data-photos-title]");
    // Element-state guard (not a ref): survives StrictMode's simulated remount.
    if (!title || Number(gsap.getProperty(title, "opacity")) !== 0) return;

    contextSafe(() => {
      const introDuration = 1.2;
      const delay = arrivedViaTransitionRef.current ? 0.15 : 0.7;
      const subtitle = root.querySelector<HTMLElement>("[data-photos-subtitle]");

      gsap.to([title, subtitle], {
        autoAlpha: 1,
        duration: introDuration,
        ease: "power3.inOut",
        delay: Math.max(0, delay - 0.3),
      });
      gsap.from(subtitle, {
        y: 40,
        duration: introDuration,
        ease: "power3.out",
        delay,
      });
      SplitText.create(title, {
        type: "chars",
        autoSplit: true,
        onSplit: (self) => gsap.from(self.chars, {
          duration: introDuration / 1.8,
          delay,
          x: 190,
          autoAlpha: 0,
          stagger: 0.03,
        }),
      });

      // Slide the photos in per column with a small column offset. Figures are
      // animated (not the parallax wrappers) so the intro transform never
      // collides with ScrollSmoother's parallax transform.
      const cols = gsap.utils.toArray<HTMLElement>("[data-photos-column]", root);
      cols.forEach((col, i) => {
        const figs = gsap.utils.toArray<HTMLElement>("figure", col);
        if (figs.length === 0) return;
        gsap.fromTo(figs,
          { y: 150 },
          {
            y: 0,
            autoAlpha: 1,
            duration: introDuration,
            ease: "power3.out",
            delay: delay + i * 0.12,
            stagger: 0.06,
          }
        );
      });
    })();
  }, [contextSafe, stage, columnCount]);

  return (
    <div ref={rootRef} className="w-full">
      <div className="mx-auto w-[min(1200px,92vw)] pt-16 pb-24">
        <div className="mb-10 flex items-end justify-between gap-6 font-js text-white">
          <div data-photos-title data-gsap="" suppressHydrationWarning className="text-3xl md:text-4xl lg:text-5xl italic">photos</div>
          <div data-photos-subtitle data-gsap="" suppressHydrationWarning className="text-sm md:text-base">a small collection</div>
        </div>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
        >
          {columns.map((column, i) => (
            <div key={i}>
              <div
                data-photos-column=""
                // A lone column has nothing to drift against, and a slowed
                // single column overruns the end of the page on mobile.
                data-speed={columns.length > 1 ? COLUMN_SPEEDS[i] : undefined}
                data-lag="0"
                suppressHydrationWarning
                className="flex flex-col gap-6 will-change-transform"
              >
                {column.map((p) => (
                  <figure
                    key={p.src}
                    data-gsap=""
                    suppressHydrationWarning
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
                    <button
                      type="button"
                      aria-label={`Expand ${p.alt}`}
                      className="absolute inset-0 cursor-zoom-in rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      onClick={(e) => {
                        const trigger = e.currentTarget;
                        const figure = trigger.closest("figure");
                        if (!figure) return;
                        setExpanded({
                          photo: p,
                          source: figure,
                          thumbSrc: figure.querySelector("img")?.currentSrc || p.src,
                          trigger,
                        });
                      }}
                    />
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>

        {expanded ? (
          <PhotoLightbox
            key={expanded.photo.src}
            photo={expanded.photo}
            source={expanded.source}
            thumbSrc={expanded.thumbSrc}
            onClosed={() => {
              setExpanded(null);
              expanded.trigger.focus({ preventScroll: true });
            }}
          />
        ) : null}

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
