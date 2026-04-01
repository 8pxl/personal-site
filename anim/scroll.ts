"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useIntro() {
  useGSAP(() => {
    gsap.from('[data-gsap="line1"', { opacity: 0 });
  });
}
