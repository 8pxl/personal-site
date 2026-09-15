"use client"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef, JSX } from "react";
import { AnimSelector } from "@/util/anims";
import { usePathname } from "next/navigation";
import { useTransitionState } from "next-transition-router";


interface scrollWrapperProps {
  fixed: JSX.Element;
  moving: JSX.Element;
}
export default function ScrollWrapper({ fixed, moving }: scrollWrapperProps) {
  const pathname = usePathname();
  // Mirrored into a ref so the per-path pass can read the stage at run time
  // without re-running when it changes.
  const { stage } = useTransitionState();
  const stageRef = useRef(stage);
  stageRef.current = stage;

  // The ScrollSmoother lives for the whole app session. It is NOT recreated on
  // navigation or resize: ScrollTrigger already refreshes itself on resize, and
  // the smooth value is adjusted in place via smoother.smooth() below.
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.get()?.kill();
    const smoother = ScrollSmoother.create({
      smooth: window.innerWidth < 650 ? 0 : 1,
      effects: false,
      normalizeScroll: true,
    });

    const mq = window.matchMedia("(max-width: 649px)");
    const applySmooth = () => smoother.smooth(mq.matches ? 0 : 1);
    applySmooth();
    mq.addEventListener("change", applySmooth);

    // Recalibrate whenever the content's real size changes. Page content can
    // land AFTER the per-route pass runs (Next streams it into the loading.tsx
    // Suspense boundary), and images/fonts settle later still — without this,
    // parallax effects calibrate against a zero-height page and stay dead.
    const content = document.getElementById("smooth-content");
    let recalTimer = 0;
    const recalibrate = () => {
      window.clearTimeout(recalTimer);
      recalTimer = window.setTimeout(() => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-speed]");
        if (targets.length > 0) {
          smoother.effects(targets);
        }
        ScrollTrigger.refresh();
      }, 150);
    };
    const ro = new ResizeObserver(recalibrate);
    if (content) ro.observe(content);

    return () => {
      ro.disconnect();
      window.clearTimeout(recalTimer);
      mq.removeEventListener("change", applySmooth);
      smoother.kill();
    };
  }, []);

  // Per-page pass, runs at DOM commit for every navigation (and once on load):
  // reset scroll -> unhide pre-hidden content -> build scroll triggers ->
  // (re)apply data-speed parallax effects -> single refresh.
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const smoother = ScrollSmoother.get();

    // Deterministic scroll position before anything measures the new page —
    // but only for wipe navigations (stage is "leaving" when this commit runs
    // mid-transition). Initial load, refresh, and browser back/forward all
    // arrive with stage "none" and keep the browser's scroll restoration.
    if (smoother && stageRef.current !== "none") {
      smoother.scrollTo(0, false);
    }

    // `[data-gsap] { visibility: hidden; }` in CSS prevents flashes before
    // hydration; un-hide everywhere (fixed chrome lives outside #smooth-content).
    const dataGsapTargets = gsap.utils.toArray<HTMLElement>("[data-gsap]");
    if (dataGsapTargets.length > 0) {
      gsap.set(dataGsapTargets, { visibility: "inherit" });
    }

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
    });

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

    const aboutImages = gsap.utils.toArray<HTMLElement>('.aboutImage');
    const aboutImageWrapper = document.querySelector<HTMLElement>('.about-image-wrapper');
    if (aboutImages.length > 0 && aboutImageWrapper) {
      gsap.from(aboutImages, {
        scrollTrigger: {
          trigger: aboutImageWrapper,
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
      });
    }

    // Rebuild parallax effects for whatever data-speed elements the new page
    // has. effects() replaces per-element, but killing first also drops
    // triggers whose elements left the DOM with the previous page. Deferred a
    // frame: at commit time the fresh DOM can still measure zero scrollHeight,
    // which would calibrate the clamp() ranges (and trigger positions) to
    // nothing. The rAF refresh recalibrates everything against real layout.
    const rafId = window.requestAnimationFrame(() => {
      if (smoother) {
        smoother.effects().forEach((st) => st.kill());
        const effectTargets = gsap.utils.toArray<HTMLElement>("[data-speed]");
        if (effectTargets.length > 0) {
          smoother.effects(effectTargets);
        }
      }
      ScrollTrigger.refresh();
    });
    return () => {
      window.cancelAnimationFrame(rafId);
      mm.revert();
    };
  }, { dependencies: [pathname], revertOnUpdate: true })

  // Intro for the fixed chrome (tabbar, socials, email, resume link). Those
  // elements persist across navigations, so this plays exactly once per
  // session instead of replaying behind the transition overlay on every route.
  useGSAP(() => {
    const introDir = 1.5;
    const delayDir = 0.7;

    gsap.utils.toArray<HTMLElement>(AnimSelector.Fade)
      .forEach((elem: HTMLElement) => {
        gsap.from(elem, {
          autoAlpha: 0,
          duration: introDir,
          ease: "power3.inOut",
          opacity: 0,
          delay: delayDir - 0.3,
        })
      });

    const slideDownTargets = gsap.utils.toArray<HTMLElement>(AnimSelector.SlideDown);
    if (slideDownTargets.length > 0) {
      gsap.from(slideDownTargets, {
        delay: delayDir,
        duration: introDir,
        ease: "power3.out",
        y: -150
      });
    }

    const slideUpTargets = gsap.utils.toArray<HTMLElement>(AnimSelector.SlideUp);
    if (slideUpTargets.length > 0) {
      gsap.from(slideUpTargets, {
        duration: introDir,
        delay: delayDir,
        ease: "power3.out",
        y: 150,
      });
    }
  }, [])

  return (
    <div id="smooth-wrapper">
      {fixed}
      <div id="smooth-content">
        {moving}
      </div>
    </div>
  )
}
