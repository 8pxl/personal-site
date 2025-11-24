"use client";

import { useHover } from "@/context/HoverContext";

export default function HoverOverlay() {
  const { isHovered, hoveredRect } = useHover();

  const clipPath = hoveredRect
    ? `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, ${hoveredRect.left + 1}px ${hoveredRect.top + 4}px, ${hoveredRect.right - 1}px ${hoveredRect.top + 4}px, ${hoveredRect.right - 1}px ${hoveredRect.bottom - 4}px, ${hoveredRect.left + 1}px ${hoveredRect.bottom - 4}px, ${hoveredRect.left + 1}px ${hoveredRect.top + 4}px)`
    : "none";

  return (
    <div
      style={{
        clipPath: isHovered ? clipPath : "none",
      }}
      className={`fixed inset-0 z-40 transition-opacity duration-300 pointer-events-none ${isHovered ? "backdrop-blur-sm bg-black/10 opacity-100" : "backdrop-blur-none bg-transparent opacity-0"
        }`}
    />
  );
}
