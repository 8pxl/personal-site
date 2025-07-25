"use client"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

export default function ScrollWrapper({fixed, moving} : any) {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        let smoother = ScrollSmoother.create({
            smooth: 1.4,
            effects: true,
            normalizeScroll: true
        });
        }
    )
    return (
        <div id = "smooth-wrapper">
            {fixed}
            <div id="smooth-content">
                {moving}
            </div>
        </div>
    )
}