"use client"
import { getPosts } from "@/util/postLoader";
import { ReactNode, useRef } from "react";
import { useHover } from "@/context/HoverContext";



interface CardProps {
  children: ReactNode
  title: String
}

export function Card({ children, title }: CardProps) {
  const { setHovered, setHoveredRect } = useHover();
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    const updateRect = () => {
      if (cardRef.current) {
        setHoveredRect(cardRef.current.getBoundingClientRect());
      }
      rafRef.current = requestAnimationFrame(updateRect);
    };
    updateRect();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setHoveredRect(null);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col p-4 border-t-1 hover:border-0 overflow-clip hover:scale-110 hover:border-solid border-white border-dashed w-[80vw] md:w-[50vw] aspect-[7/3] gap-4 hover:z-50 hover:bg-[#23223D]"
      style={{
        transition: "scale 0.3s ease-in-out, background 0.3s ease-in-out"
      }}
    >


      <h1 className="text-2xl ">
        {title}
      </h1>
      {children}
    </div >
  )
}

export default function Posts() {
  const posts = getPosts();
  return (
    <div className="w-[100vw] flex flex-col items-center justify-center gap-0 text-white font-js">
      {posts.map(post => (
        < Card key={post.slug} title="hello" >
          {post.slug}
        </Card>
      ))}

    </div >
  )
}
