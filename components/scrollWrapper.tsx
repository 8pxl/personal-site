"use client"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { SplitText } from "gsap/SplitText";

export default function ScrollWrapper({fixed, moving} : any) {
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
        gsap.from(
          '[data-gsap="line1"], [data-gsap="line4"], [data-gsap="line2"], [data-gsap="line3"], [data-gsap="fade"]',
          {
            autoAlpha: 0,
            delay: delayDir,
            duration: introDir,
            ease: "power3.inOut",
            opacity: 0,
          }
        )
        gsap.from(
            '[data-gsap="line1"]',
            {
            delay: delayDir,
              duration: introDir,
              ease: "power3.out",
              y: -150
            }
          )
          gsap.from(
            '[data-gsap="line4"]',
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
          gsap.from(
            "[data-gsap='aboutFade']",
            {
                scrollTrigger: {
                    trigger: '.about-text',
                    end: "+=380",
                    // markers: true,
                    scrub: true,
                },
                autoAlpha: 0,
                opacity:0,
                duration: 2,
            }
          );

          gsap.from(
            '.animLine',
            {
                scrollTrigger: {
                    trigger: '.animLine',
                    start: "top bottom",
                    end: "+=380",
                    scrub:true,
                    // markers: true
                },
                width: 0,
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
        <div id = "smooth-wrapper">
            {fixed}
            <div id="smooth-content">
                {moving}
            </div>
        </div>
    )
}