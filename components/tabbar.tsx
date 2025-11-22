"use client"
import { Link as TransitionLink } from "next-transition-router";
import { ReactNode } from "react";

interface TabProps {
  children: ReactNode
}
function Tab({ children }: TabProps) {
  return (
    <div>
      {children}
    </div>
  )
}

export default function Tabbar() {
  return (
    <div >
      <nav className="absolute z-4 left-[0.5vw] top-[calc(0.5vw-0.4rem)] flex flex-row border-white gap-4 text-white font-js">
        <TransitionLink href="/">about</TransitionLink>
        <TransitionLink href="/blog">blog</TransitionLink>
        <TransitionLink href="/photos">photos</TransitionLink>
      </nav>
    </div >
  )
}
