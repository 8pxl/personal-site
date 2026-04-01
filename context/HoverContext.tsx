"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HoverContextType {
    isHovered: boolean;
    setHovered: (hovered: boolean) => void;
    hoveredRect: DOMRect | null;
    setHoveredRect: (rect: DOMRect | null) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export function HoverProvider({ children }: { children: ReactNode }) {
    const [isHovered, setHovered] = useState(false);
    const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

    return (
        <HoverContext.Provider value={{ isHovered, setHovered, hoveredRect, setHoveredRect }}>
            {children}
        </HoverContext.Provider>
    );
}

export function useHover() {
    const context = useContext(HoverContext);
    if (context === undefined) {
        throw new Error("useHover must be used within a HoverProvider");
    }
    return context;
}
