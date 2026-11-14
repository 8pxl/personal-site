"use client";

import { useHover } from "@/context/HoverContext";
import { useRef } from "react";


export default function HoverOverlay() {
  const { isHovered, hoveredRect } = useHover();
  const lastClipPath = useRef<string | undefined>(undefined);

  // Without a rect (e.g. the photo lightbox) the whole page blurs. The last
  // path is kept otherwise so the hole doesn't vanish while fading out.
  if (isHovered && !hoveredRect) {
    lastClipPath.current = undefined;
  } else if (hoveredRect) {
    lastClipPath.current = `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, ${hoveredRect.left + 1}px ${hoveredRect.top + 4}px, ${hoveredRect.right - 1}px ${hoveredRect.top + 4}px, ${hoveredRect.right - 1}px ${hoveredRect.bottom - 4}px, ${hoveredRect.left + 1}px ${hoveredRect.bottom - 4}px, ${hoveredRect.left + 1}px ${hoveredRect.top + 4}px)`;
  }

  return (
    <div
      style={{
        clipPath: lastClipPath.current,
        transitionProperty: "opacity, backdrop-filter"
      }}
      className={`fixed inset-0 z-40 duration-300 pointer-events-none ${isHovered ? "backdrop-blur-sm bg-black/10 opacity-100" : "backdrop-blur-none bg-transparent opacity-0"
        }`}
    />
  );
}
