"use client";

import { startTransition, useRef } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";
import TransitionLayer from "./transition";
import { HoverProvider } from "@/context/HoverContext";


export default function Providers({ children }: { children: React.ReactNode }) {
  // The router only blocks re-navigation during "leaving" — a click during the
  // enter wipe starts a new leave while the old enter timeline is still alive,
  // and its onComplete would fire a stray stage change mid-wipe. Track it so
  // leave() can kill it first.
  const enterTlRef = useRef<gsap.core.Timeline | null>(null);
  const numCircles = 3;
  const wipeDir = 0.7;
  const staggerOffset = 0.54;
  const ringColor = "#23223D";
  // Measured at call time — a hook-based size is null on the first render,
  // which made transitions invisible if triggered right after load.
  const getDiagonal = () =>
    Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
  return (
    <HoverProvider>
      <TransitionRouter
        auto={true}

        leave={(next) => {
          enterTlRef.current?.kill();
          enterTlRef.current = null;
          const diagonal = getDiagonal();
          const tl = gsap.timeline({});
          tl
            // A killed enter animation can leave the overlay mid-state;
            // snap everything back to its baseline before wiping.
            .set(["#transitionCircle1", "#transitionCircle2"], { width: "1px", height: "1px" })
            .set("#transitionRing", { width: "1px", height: "1px", outlineWidth: "0px", background: ringColor })
            .to("#transitionCircle1", { width: diagonal, height: diagonal, duration: wipeDir })
            .to("#transitionCircle2", { width: diagonal, height: diagonal, duration: wipeDir }, `-=${staggerOffset}`)
            .fromTo("#transitionRing",
              { outlineWidth: "0px" },
              { outlineWidth: `${diagonal / 2.0}px`, duration: wipeDir }, `-=${staggerOffset}`
            )
            .set("#transitionRing", { background: "none" })
            .call(() => {
              requestAnimationFrame(() => startTransition(next));
            }, undefined, wipeDir);
          // No cleanup here: the router runs it right after next() fires (at
          // 0.7s of the 1.02s wipe), which would kill the tail of the wipe on
          // every navigation. Stray state from interruptions is handled by the
          // baseline .set calls at the top of this timeline instead.
        }}
        enter={(next) => {
          const diagonal = getDiagonal();
          const tl = gsap.timeline({
            onComplete: () => {
              enterTlRef.current = null;
              next();
            },
          });
          enterTlRef.current = tl;
          tl
            .set("#transitionCircle1", {
              width: 0, height: 0, delay: (numCircles - 1) * (wipeDir - staggerOffset)
            })
            .set("#transitionCircle2", { width: 0, height: 0 })
            .to("#transitionRing", { width: diagonal, height: diagonal, duration: 0.7 })
            .to("#transitionRing", { outlineWidth: "0px", duration: 0.7 }, "-=0.35")
            .set("#transitionRing", { width: "1px", height: "1px", background: ringColor });
          return () => tl.kill();
        }}
      >
        <main>{children}</main>
        <TransitionLayer />

      </TransitionRouter >
    </HoverProvider>
  );
}
