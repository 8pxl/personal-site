"use client"
import Link from "next/link";
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
        <Link href="/">about</Link>
        <Link href="/blog">blog</Link>
        <Link href="/photos">photos</Link>
      </nav>
    </div >
  )
}
