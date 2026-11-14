"use client"
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useEffect, useRef } from "react";

// Drawn on a single fixed canvas instead of ~150 data-speed divs: each div was
// its own ScrollSmoother effect, so every scroll frame moved 150 layers and
// every ScrollTrigger.refresh() measured 150 extra elements.

type Star = { x: number; y: number; size: number; speed: number };

function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function sizeToParallax(x: number): number {
  const slope = 0.4;
  return Math.max(1.1, slope * (x - 7) + 4);
}

function makeStars(width: number, height: number): Star[] {
  const count = Math.floor((width * height) / 9000);
  return Array.from({ length: count }, () => {
    const size = getRandom(0, 9);
    return { x: getRandom(0, width), y: getRandom(0, height), size, speed: sizeToParallax(size) };
  });
}

interface StarfieldProps {
  height: number;
}

export default function Starfield({ height }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const color = getComputedStyle(document.documentElement).getPropertyValue("--color-white").trim() || "#f4ebd9";
    const state = { alpha: 0 };
    let stars: Star[] = [];
    let starsWidth = 0;
    let vw = 0;
    let vh = 0;
    let dpr = 1;
    let lastScroll = NaN;
    let dirty = true;

    const resize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      // Generated for the widest viewport seen, so widening never leaves a
      // bare strip and narrowing keeps the existing sky.
      if (vw > starsWidth) {
        starsWidth = vw;
        stars = makeStars(vw, height);
      }
      dirty = true;
    };

    const draw = () => {
      const scroll = ScrollSmoother.get()?.scrollTop() ?? window.scrollY;
      if (!dirty && scroll === lastScroll) return;
      dirty = false;
      lastScroll = scroll;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);
      if (state.alpha <= 0) return;
      ctx.globalAlpha = state.alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (const star of stars) {
        // Same motion ScrollSmoother gave a data-speed element: it shifts by
        // (1 - speed) x scroll distance from the midpoint of its "top bottom"
        // to "bottom top" range, and holds still outside that range.
        const start = star.y - vh;
        const end = star.y + star.size;
        const travel = Math.min(Math.max(scroll, start), end) - (start + end) / 2;
        const top = star.y + (1 - star.speed) * travel - scroll;
        if (top > vh || top < -star.size) continue;
        const r = star.size / 2;
        ctx.moveTo(star.x + star.size, top + r);
        ctx.arc(star.x + r, top + r, r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    resize();
    window.addEventListener("resize", resize);
    // Added after ScrollSmoother's own ticker callback, so it reads this
    // frame's smoothed scroll position.
    gsap.ticker.add(draw);
    const fadeIn = gsap.to(state, {
      alpha: 1,
      duration: 1,
      delay: 0.2,
      ease: "power1.in",
      onUpdate: () => { dirty = true; },
    });

    return () => {
      fadeIn.kill();
      gsap.ticker.remove(draw);
      window.removeEventListener("resize", resize);
    };
  }, [height]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-1"
    />
  );
}
