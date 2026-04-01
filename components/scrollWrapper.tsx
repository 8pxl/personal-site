"use client"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, JSX } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { SplitText } from "gsap/SplitText";
import { AnimSelector } from "@/util/anims";
import { usePathname } from "next/navigation";


interface scrollWrapperProps {
  fixed: JSX.Element;
  moving: JSX.Element;
}
export default function ScrollWrapper({ fixed, moving }: scrollWrapperProps) {
  const pathname = usePathname();
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Ensure newly navigated content isn't stuck hidden.
    // We keep `[data-gsap] { visibility: hidden; }` in CSS to prevent flashes,
    // but on route transitions the animation pass can miss elements.
    gsap.set("#smooth-content [data-gsap]", { visibility: "inherit" });

    //opacity
    const introDir = 1.5;
    const delayDir = 0.7;

    gsap.utils.toArray<HTMLElement>(AnimSelector.Fade)
      .forEach((elem: HTMLElement) => {
        gsap.from(
          elem, {
          autoAlpha: 0,
          duration: introDir,
          ease: "power3.inOut",
          opacity: 0,
          delay: delayDir - 0.3,

        }
        )
      });
    gsap.from(
      AnimSelector.SlideDown,
      {
        delay: delayDir,
        duration: introDir,
        ease: "power3.out",
        y: -150
      }
    )
    gsap.from(
      AnimSelector.SlideUp,
      {
        duration: introDir,
        delay: delayDir,
        ease: "power3.out",
        y: 150,
      }
    );
    let split: SplitText | null = null;
    let rafId = 0;
    let tries = 0;

    const initSplit = () => {
      const targets = gsap.utils.toArray<HTMLElement>(
        '[data-gsap="line3"], [data-gsap="line2"]'
      );
      if (targets.length === 0) return false;

      // Revert any previous split before re-splitting.
      split?.revert();
      split = SplitText.create(targets, {
        type: "chars",
        autoSplit: true,
      });

      if (!split.chars || split.chars.length === 0) {
        split.revert();
        split = null;
        return false;
      }

      gsap.from(split.chars, {
        duration: introDir / 1.8,
        delay: delayDir,
        x: 190,
        autoAlpha: 0,
        opacity: 0,
        stagger: 0.03,
      });

      return true;
    };

    // On initial load + transition navigations, the hero DOM can land a tick later.
    // Retry a few frames so SplitText sees the real nodes.
    const attempt = () => {
      if (initSplit()) return;
      tries += 1;
      if (tries >= 12) {
        gsap.set('[data-gsap="line2"], [data-gsap="line3"]', { autoAlpha: 1, opacity: 1 });
        return;
      }
      rafId = requestAnimationFrame(attempt);
    };
    rafId = requestAnimationFrame(attempt);
    const mm = gsap.matchMedia();

    // Browser detection for performance optimization
    const isSafariOrFirefox = /^((?!chrome|android).)*safari|firefox/i.test(navigator.userAgent);

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>(AnimSelector.FadeUpScroll).forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 70%",       // slightly later start on mobile
            end: "+=300",           // shorter distance for smaller screens
            scrub: true,
            invalidateOnRefresh: true,
          },
          autoAlpha: 0,
          opacity: 0,
          rotate: 0,
          ...(isSafariOrFirefox ? {} : { filter: "blur(2px)" }),
          y: 50,
          duration: 1.5,
        });
      });
      ScrollTrigger.refresh();
    });
    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray<HTMLElement>(AnimSelector.FadeUpScroll).forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 75%",
            end: "+=450",
            scrub: true,
            invalidateOnRefresh: true,
          },
          autoAlpha: 0,
          opacity: 0,
          ...(isSafariOrFirefox ? {} : { filter: "blur(2px)" }),
          y: 50,
          rotate: 0,
          duration: 2,
        });
      });
      ScrollTrigger.refresh();
    }
    );

    const dividers = gsap.utils.toArray<HTMLElement>('.animLine')
    dividers.forEach((divider: HTMLElement) => {
      gsap.from(
        divider,
        {
          scrollTrigger: {
            trigger: divider,
            start: "top bottom",
            end: "+=380",
            scrub: true,
            invalidateOnRefresh: true,
            // markers: true
          },
          width: 0,
        }
      )
    });

    gsap.from(
      '.aboutImage',
      {
        scrollTrigger: {
          trigger: '.about-image-wrapper',
          start: "top 85%",
          end: "+=380",
          // markers: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
        delay: 1,
        // duration:3,
        opacity: 0,
        autoAlpha: 0,
        top: 0,
        // left:0,
        rotateX: 90,
      }
    )

    return () => {
      mm.revert();
      if (rafId) cancelAnimationFrame(rafId);
      split?.revert();
    };
  }, [pathname])

  const windowSize = useWindowSize()
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const existing = ScrollSmoother.get();
    if (existing) existing.kill();
    // console.log(windowSize.width)
    const smoother = ScrollSmoother.create({
      smooth: (windowSize.width ? windowSize.width : 900) < 650 ? 0 : 1,
      effects: true,
      normalizeScroll: true,
    });

    // Enable data-speed / data-lag parallax effects (used by Starfield, Photos).
    smoother.effects("[data-speed]");

    return () => smoother.kill();
  }, [windowSize, pathname]);
  return (
    <div id="smooth-wrapper">
      {fixed}
      <div id="smooth-content">
        {moving}
      </div>
    </div>
  )
}
