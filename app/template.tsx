"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Template({ children }: { children: ReactNode }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  // const pathname = usePathname();

  console.log("remount")
  useEffect(() => {
    console.log("use effect triggered")
    // This effect now correctly detects a change in the actual page content
    if (children !== displayChildren) {

      console.log("children not the same")
      // Don't start a new animation if one is already running
      if (isAnimating) return;

      setIsAnimating(true);
      gsap.to(".transition-container", {
        opacity: 0,
        duration: 2.5,
        onComplete: () => {
          // After animating out, update the children and animate in
          setDisplayChildren(children);
          gsap.to("#transition-container", {
            opacity: 1,
            duration: 2.5,
            onComplete: () => {
              setIsAnimating(false);
            },
          });
        },
      });
    }
  }, [children]);

  return (
    <div id="transition-container">
      {displayChildren}
    </div>
  );
}
