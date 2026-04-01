"use client"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link as TransitionLink } from "next-transition-router";
import { ReactNode, useRef } from "react";

export default function Tabbar() {
  const el = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  let isVisible = true;

  useGSAP(() => {
    const hide = gsap.to(el.current, {
      opacity: 0,
      filter: "blur(0px)",
      y: -20,
      pointerEvents: "none",
      paused: true,
      duration: 0.45,
    })
    const show = gsap.to(el.current, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      paused: true,
      pointerEvents: "auto",
      duration: 0.45,
    })

    const onScroll = () => {

      // console.log("is visible", isVisible)
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (isVisible) {
        isVisible = false
        show.pause();
        hide.restart();
      }

      timeoutRef.current = setTimeout(() => {
        // console.log("starting show anim")
        hide.pause();
        show.restart()
        isVisible = true
      }, 450);
    }

    // window.addEventListener("scroll", onScroll);
    // return () => window.removeEventListener("scroll", onScroll);
  }, [])
  return (
    <div >
      <nav ref={el} className="slide-down fixed z-4 left-[0.5vw] top-[calc(0.5vw-0.4rem)] flex flex-row border-white gap-4 text-white italic font-js">
        <TransitionLink href="/">about</TransitionLink>
        <TransitionLink href="/blog">blog</TransitionLink>
        <TransitionLink href="/photos">photos</TransitionLink>
      </nav>
    </div >
  )
}
