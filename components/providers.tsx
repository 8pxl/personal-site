"use client";

import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";
import TransitionLayer from "./transition";
import Tabbar from "./tabbar";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowSize();
  const diagonal = Math.sqrt((width ?? 0) ** 2 + (height ?? 0) ** 2)
  console.log(diagonal);
  return (
    <TransitionRouter
      auto={true}
      leave={(next) => {
        const tween = gsap.fromTo("#transitionRing",
          { outlineWidth: "0px" },
          { outlineWidth: `${diagonal}px`, duration: 0.7, onComplete: next }
        );
        gsap.set("#transitionRing", { background: "none" })
        return () => tween.kill();
      }}
      enter={(next) => {
        const tl = gsap.timeline({ onComplete: next });
        tl.to("#transitionRing", { width: diagonal, height: diagonal, duration: 0.7 })
          .to("#transitionRing", { outlineWidth: "0px", duration: 0.7 })
          .set("#transitionRing", { width: "1px", height: 1 });
        return () => tl.kill();
      }}
    >
      <main>{children}</main>
      <TransitionLayer />

    </TransitionRouter>
  );
}
