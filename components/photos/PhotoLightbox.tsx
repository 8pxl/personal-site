"use client";

import Image from "next/image";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useHover } from "@/context/HoverContext";
import type { Photo } from "./photosManifest";

const OPEN_DURATION = 0.3;
const CLOSE_DURATION = 0.25;
const FADE_DURATION = 0.2;

// Strong ease-out: full speed on the click, then a long settle. An ease-in
// phase made the photo feel slow to respond. Created lazily: CustomEase needs
// the browser.
const EASE = "lightbox-out";
let easeCreated = false;
function getEase() {
  if (!easeCreated) {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(EASE, "0.23,1,0.32,1");
    easeCreated = true;
  }
  return EASE;
}

type Rect = { left: number; top: number; width: number; height: number };

// The photo's final box: as large as fits in the viewport with a margin.
function fitRect(photo: Photo): Rect {
  const scale = Math.min(
    (window.innerWidth * 0.92) / photo.width,
    (window.innerHeight * 0.88) / photo.height
  );
  const width = photo.width * scale;
  const height = photo.height * scale;
  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
  };
}

// Transform that makes a frame laid out at `to` sit exactly over `from`. The
// figure shares the photo's aspect ratio, so one uniform scale is enough.
function coverTransform(from: DOMRect, to: Rect) {
  return {
    x: from.left - to.left,
    y: from.top - to.top,
    scale: from.width / to.width,
  };
}

type Props = {
  photo: Photo;
  // The grid figure the photo grows out of and shrinks back into.
  source: HTMLElement;
  // The grid's already-loaded rendition, shown instantly while the full-size
  // one loads.
  thumbSrc: string;
  onClosed: () => void;
};

export default function PhotoLightbox({ photo, source, thumbSrc, onClosed }: Props) {
  const { setHovered, setHoveredRect } = useHover();
  const dialogRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState(() => fitRect(photo));
  const rectRef = useRef(rect);
  const [loaded, setLoaded] = useState(false);
  const closingRef = useRef(false);
  const onClosedRef = useRef(onClosed);
  onClosedRef.current = onClosed;

  const close = useCallback(() => {
    const frame = frameRef.current;
    if (closingRef.current || !frame) return;
    closingRef.current = true;
    setHovered(false);
    const ease = getEase();
    const finish = () => {
      gsap.set(source, { opacity: 1 });
      onClosedRef.current();
    };
    // overwrite retargets from wherever the open animation currently is.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(frame, { opacity: 0, duration: FADE_DURATION, ease, overwrite: true, onComplete: finish });
    } else {
      gsap.to(frame, {
        ...coverTransform(source.getBoundingClientRect(), rectRef.current),
        duration: CLOSE_DURATION,
        ease,
        overwrite: true,
        onComplete: finish,
      });
    }
  }, [setHovered, source]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const ease = getEase();

    // A hover with no rect blurs the whole page (see HoverOverlay).
    setHoveredRect(null);
    setHovered(true);
    ScrollSmoother.get()?.paused(true);
    gsap.set(source, { opacity: 0 });
    dialogRef.current?.focus({ preventScroll: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(frame, { opacity: 0 }, { opacity: 1, duration: FADE_DURATION, ease });
    } else {
      gsap.fromTo(
        frame,
        coverTransform(source.getBoundingClientRect(), rectRef.current),
        { x: 0, y: 0, scale: 1, duration: OPEN_DURATION, ease }
      );
    }

    // Also covers unmounting mid-animation, e.g. navigating back while open.
    return () => {
      gsap.killTweensOf(frame);
      gsap.set(source, { opacity: 1 });
      ScrollSmoother.get()?.paused(false);
      setHovered(false);
    };
  }, [setHovered, setHoveredRect, source]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onResize = () => {
      rectRef.current = fitRect(photo);
      setRect(rectRef.current);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [close, photo]);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      tabIndex={-1}
      onClick={close}
      className="fixed inset-0 z-45 cursor-zoom-out outline-none"
    >
      <div
        ref={frameRef}
        className="absolute origin-top-left overflow-hidden rounded-2xl will-change-transform"
        style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- already in the browser cache from the grid; next/image would request a new size */}
        <img src={thumbSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="92vw"
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>,
    document.body
  );
}
