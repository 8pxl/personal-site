"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

type Props = {
  text: string;
  font: string;
  lineHeight: number;
  className?: string;
};

export default function PretextBlock({
  text,
  font,
  lineHeight,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect?.width ?? 0;
      setWidth(next);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const prepared = useMemo(() => {
    return prepareWithSegments(text, font, { whiteSpace: "pre-wrap" });
  }, [text, font]);

  const lines = useMemo(() => {
    const w = Math.max(0, Math.floor(width));
    if (w <= 0) return [] as { text: string }[];
    return layoutWithLines(prepared, w, lineHeight).lines;
  }, [prepared, width, lineHeight]);

  return (
    <div ref={containerRef} className={className}>
      <div style={{ font, lineHeight: `${lineHeight}px` }}>
        {lines.map((line: { text: string }, i: number) => (
          <div key={i}>{line.text}</div>
        ))}
      </div>
    </div>
  );
}
