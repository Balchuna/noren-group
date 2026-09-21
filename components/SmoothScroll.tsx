"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

/** Scroll inercial com Lenis, sincronizado com o ScrollTrigger do GSAP. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      smoothWheel: true,
      syncTouch: false,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    setLenis(lenis);
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 260);
    window.addEventListener("load", () => ScrollTrigger.refresh());

    return () => {
      window.clearTimeout(refresh);
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
