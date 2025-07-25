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



export default function Starfield({height} : any) {
    const window = useWindowSize();
    const windowWidth = window.width ?? 0;
    const windowHeight = window.height ?? 0;
    const numStars= Math.floor((windowWidth * windowHeight) / 3000);
    // console.log(numStars);
    const stars = useMemo(
        () => {
            let arr: React.ReactElement[] = [];
            for (let i = 0; i < numStars; i++) {
                const size = getRandom(0,7)
                console.log(sizeToParallax(size))
                // const size = 15;
                const starStyle : CSSProperties = {
                    width: size,
                    height: size,
                    top: getRandom(0,height),
                    left: getRandom(0, windowWidth),
                    position: "absolute",
                }
                arr.push(
                    <div className="star" key={i} data-speed={sizeToParallax(size).toString()} style={starStyle}> </div>
                )
            }
            return arr;
        }, 
        [numStars]
    );
    return stars;
}