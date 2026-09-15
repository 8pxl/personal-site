"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef } from "react";
import { useTransitionState } from "next-transition-router";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const { stage } = useTransitionState();
  // Remember whether this mount happened behind a route transition: the enter
  // wipe already spends ~1.7s revealing the page, so the intro shouldn't add
  // its full hard-load delay on top of that.
  const arrivedViaTransitionRef = useRef<boolean | null>(null);
  if (arrivedViaTransitionRef.current === null) {
    arrivedViaTransitionRef.current = stage !== "none";
  }

  const { contextSafe } = useGSAP(() => {
    gsap.registerPlugin(SplitText);
    gsap.set(
      [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current],
      { autoAlpha: 0 }
    );
  }, { scope: rootRef });

  useLayoutEffect(() => {
    // Play during "entering" too: the enter wipe reveals the page over ~1.4s,
    // and waiting for it to fully finish ("none") left the hero sitting empty
    // long after the reveal started.
    if (stage === "leaving") return;
    // Guard on the element state rather than a ref: refs survive StrictMode's
    // simulated remount while the useGSAP hide above is re-applied, which
    // would strand the hero invisible in dev with a ref-based "played" flag.
    if (Number(gsap.getProperty(line1Ref.current, "opacity")) !== 0) return;

    contextSafe(() => {
      const introDuration = 1.5;
      const delay = arrivedViaTransitionRef.current ? 0.15 : 0.7;
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current];

      gsap.to(lines, {
        autoAlpha: 1,
        duration: introDuration,
        ease: "power3.inOut",
        delay: Math.max(0, delay - 0.3),
      });

      gsap.from(line1Ref.current, {
        delay,
        duration: introDuration,
        ease: "power3.out",
        y: -150,
      });

      gsap.from(line4Ref.current, {
        delay,
        duration: introDuration,
        ease: "power3.out",
        y: 150,
      });

      SplitText.create([line2Ref.current, line3Ref.current], {
        type: "chars",
        autoSplit: true,
        onSplit: (self) => gsap.from(self.chars, {
          duration: introDuration / 1.8,
          delay,
          x: 190,
          autoAlpha: 0,
          opacity: 0,
          stagger: 0.03,
        }),
      });
    })();
  }, [contextSafe, stage]);

  return (
    <div ref={rootRef} className="w-full h-[calc(100vh-15rem)] justify-center flex js-bold text-white mt-60 ">
      <div className="flex flex-col text-left w-[calc(84vw)] ease-in-out duration-600" >
        <div ref={line1Ref} suppressHydrationWarning data-gsap="" className="text-base md:text-lg lg:text-xl italic mb-4 ">
          Hello, my name is
        </div>
        <div ref={line2Ref} suppressHydrationWarning data-gsap="" className="text-5xl md:text-7xl lg:text-8xl font-hero">
          Keijay Huang.
        </div>
        <div ref={line3Ref} suppressHydrationWarning data-gsap="" className="text-xl md:text-2xl lg:text-3xl font-hero">
          I design and program robots.
        </div>
        <div ref={line4Ref} suppressHydrationWarning data-gsap="" className="mt-4 mr-20 italic">
          I am a computer engineer at Georgia Tech, passionate about combining hardware and software to create exciting robots!
        </div>
      </div>
    </div>
  );
}
