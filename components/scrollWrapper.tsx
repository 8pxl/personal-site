"use client"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { SplitText } from "gsap/SplitText";
import { AnimType, AnimSelector } from "@/util/anims"

export default function ScrollWrapper({ fixed, moving }: any) {
  // useGSAP(() => {
  //     gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  //     let smoother = ScrollSmoother.create({
  //         smooth: 1.4,
  //         effects: true,
  //         normalizeScroll: true
  //     });
  //     }
  // )
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    //opacity
    const introDir = 1.5;
    const delayDir = 0.2;

    gsap.utils.toArray<HTMLElement>(AnimSelector.Fade)
      .forEach((elem: HTMLElement) => {
        gsap.from(
          elem, {
          autoAlpha: 0,
          duration: introDir,
          ease: "power3.inOut",
          opacity: 0,
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
        y: 150
      }
    );
    let split = SplitText.create('[data-gsap="line3"], [data-gsap="line2"]', {
      type: "chars",
      autoSplit: true,
    });

    gsap.from(split.chars, {
      duration: introDir / 1.8,
      delay: delayDir,
      x: 190,
      // y: -30,
      autoAlpha: 0,
      opacity: 0,
      stagger: 0.03,
    });

    ScrollTrigger.matchMedia({
      // Mobile
      "(max-width: 767px)": function () {
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
            rotate:0,
            filter: "blur(2px)",
            y: 50,
            duration: 1.5,
          });
        });
      },
    
      // Desktop
      "(min-width: 768px)": function () {
        gsap.utils.toArray<HTMLElement>(AnimSelector.FadeUpScroll).forEach((elem) => {
          gsap.from(elem, {
            scrollTrigger: {
              trigger: elem,
              start: "top 75%",
              end: "+=480",
              scrub: true,
              invalidateOnRefresh: true,
            },
            autoAlpha: 0,
            opacity: 0,
            filter: "blur(2px)",
            y: 50,
            rotate:0,
            duration: 2,
          });
        });
      }
    });
    
    // Recalculate triggers after everything is loaded
    // window.addEventListener("load", () => {
    //   ScrollTrigger.refresh();
    // });
    

    const dividers = gsap.utils.toArray<HTMLElement>('.animLine')
    dividers.forEach((divider: HTMLElement, i) => {
      gsap.from(
        divider,
        {
          scrollTrigger: {
            trigger: divider,
            start: "top bottom",
            end: "+=380",
            scrub: true,
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


  })

  const window = useWindowSize()
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const existing = ScrollSmoother.get();
    if (existing) existing.kill();

    const smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      normalizeScroll: true,
    });

    return () => smoother.kill();
  }, [window]);
  return (
    <div id="smooth-wrapper">
      {fixed}
      <div id="smooth-content">
        {moving}
      </div>
    </div>
  )
}