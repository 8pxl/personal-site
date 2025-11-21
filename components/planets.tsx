"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

interface PlanetData {
  label: string;
  href: string;
  color: string;
  size: number; // relative size
  orbitRadius: number; // percentage of container width/height
  speed: number; // seconds per orbit
  startAngle?: number; // degrees
}

const PLANETS: PlanetData[] = [
  {
    label: "About",
    href: "#about",
    color: "from-blue-500 to-indigo-700",
    size: 4,
    orbitRadius: 35,
    speed: 20,
    startAngle: 0,
  },
  {
    label: "Blog",
    href: "/blog",
    color: "from-purple-500 to-fuchsia-700",
    size: 5,
    orbitRadius: 50,
    speed: 35,
    startAngle: 120,
  },
  {
    label: "Photos",
    href: "/photos",
    color: "from-teal-500 to-emerald-700",
    size: 3.5,
    orbitRadius: 65,
    speed: 45,
    startAngle: 240,
  },
  {
    label: "Works",
    href: "#works",
    color: "from-orange-500 to-red-700",
    size: 6,
    orbitRadius: 80,
    speed: 60,
    startAngle: 180,
  },
];

export default function Planets() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const planets = gsap.utils.toArray(".planet-container", containerRef.current) as HTMLElement[];

    planets.forEach((planet, i) => {
      const data = PLANETS[i];

      // Set initial position
      gsap.set(planet, {
        rotation: data.startAngle,
      });

      // Orbit animation
      gsap.to(planet, {
        rotation: `+=${360}`,
        duration: data.speed,
        repeat: -1,
        ease: "none",
      });

      // Counter-rotate the planet itself so the text/icon stays upright
      const planetBody = planet.querySelector(".planet-body");
      if (planetBody) {
        gsap.to(planetBody, {
          rotation: `-=${360}`,
          duration: data.speed,
          repeat: -1,
          ease: "none",
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Central Star / Sun */}
      <div className="absolute w-24 h-24 bg-amber-100 rounded-full blur-xl opacity-20 z-0" />
      <div className="absolute w-12 h-12 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full shadow-[0_0_40px_rgba(251,191,36,0.4)] z-10 animate-pulse" />

      {PLANETS.map((planet, i) => (
        <div
          key={planet.label}
          className="planet-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto"
          style={{
            width: `${planet.orbitRadius * 2}vmin`,
            height: `${planet.orbitRadius * 2}vmin`,
          }}
        >
          {/* Orbit Path (Visual only) */}
          <div className="absolute inset-0 rounded-full border border-white/5" />

          {/* Planet Body Wrapper - Positioned on the orbit */}
          <div
            className="planet-body absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          >
            <Link href={planet.href} className="block relative">
              {/* Planet Visual */}
              <div
                className={`rounded-full bg-gradient-to-br ${planet.color} shadow-lg transition-transform duration-300 group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]`}
                style={{
                  width: `${planet.size}vmin`,
                  height: `${planet.size}vmin`,
                }}
              />

              {/* Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium tracking-widest uppercase bg-black/50 px-2 py-1 rounded backdrop-blur-sm whitespace-nowrap">
                  {planet.label}
                </span>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

