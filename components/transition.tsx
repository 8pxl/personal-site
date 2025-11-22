"use client"

import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { ReactElement, ReactNode, useEffect, useState } from "react";

interface TransitionProps {
  children: ReactNode;
}
export default function TransitionOverlay({ children }: TransitionProps) {
  const [displayChildren, setDisplayChildren] = useState(children);
  console.log("save me")
  const pathname = usePathname();
  // useEffect(
  //   () => {
  //     console.log("hello world")
  //   }, [displayChildren]
  // )

  return (
    <div>
      {displayChildren}
    </div>
  )
}

// useGSAP(
//   () => {
//
//     console.log("hello from outside");
//     // if (children.key !== displayChildren.key) {
//     //   console.log("hellooo");
//     //   setDisplayChildren(children);
//     // }
//   }, [children]
// )
