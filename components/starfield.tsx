"use client"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSProperties, useMemo, useRef, useState } from "react";
import { useGSAP } from '@gsap/react';
import { useWindowSize } from "@uidotdev/usehooks"

// const numStars = 400;

function getRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function sizeToParallax(x: number): number {
    const slope = 0.6;
    return Math.max(1,slope * (x - 7) + 4);
}

let windowWidth = 0;
let windowHeight = 0;
let prevStars = 0;
// let generated = [0,0];

export default function Starfield({height} : any) {
    const window = useWindowSize();
    windowWidth = Math.max(windowWidth, window.width ?? 0);
    windowHeight = Math.max(windowHeight, window.height ?? 0);
    const numStars = Math.floor((windowWidth * windowHeight) / 2000);
    useGSAP(() => {
        gsap.from(
            '.star',
            {
                duration: 1,
                delay: 0.2,
                ease: "power1.in",
                opacity: 0,
            }
        )
    }, [numStars])
    const stars = useMemo(
        () => {
            let arr: React.ReactElement[] = [];
            for (let i = prevStars; i < numStars; i++) {
                const size = getRandom(0,9)
                // console.log(sizeToParallax(size))
                // const size = 15;
                const starStyle : CSSProperties = {
                    width: size,
                    height: size,
                    top: getRandom(0,height),
                    left: getRandom(0, windowWidth),
                    position: "absolute",
                }
                arr.push(
                    <div className="star" key={i} data-speed={sizeToParallax(size).toString()} style={starStyle}></div>
                )
            }
            // prevStars = numStars;
            return arr;
        }, 
        [numStars]
    );
    return stars;
}