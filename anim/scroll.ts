"use client"
import { useGSAP } from "@gsap/react"

export function intro() {
    useGSAP(() => {
        gsap.from(
          '[data-gsap="line1"',
          {opacity:0}
        )
      })
}