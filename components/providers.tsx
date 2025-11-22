"use client";

import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionRouter
      auto={true}
      leave={(next) => {
        const tween = gsap.fromTo("main", { autoAlpha: 1 }, { autoAlpha: 0, onComplete: next });
        return () => tween.kill();
      }}
      enter={(next) => {
        const tween = gsap.fromTo("main", { autoAlpha: 0 }, { autoAlpha: 1, onComplete: next });
        return () => tween.kill();
      }}
    >
      {children}
    </TransitionRouter>
  );
}
