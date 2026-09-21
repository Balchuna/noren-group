"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && !(gsap as unknown as { _norenReady?: boolean })._norenReady) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  (gsap as unknown as { _norenReady?: boolean })._norenReady = true;
}

export const EASE_OUT = "power3.out";
export const EASE_INOUT = "power2.inOut";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export { gsap, ScrollTrigger };
