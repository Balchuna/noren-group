"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Indicador de scroll muito discreto no rodapé do herói. */
export function ScrollCue({ label = "Scroll", className = "" }: { label?: string; className?: string }) {
  const lineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      el,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        transformOrigin: "top center",
        duration: 1.6,
        repeat: -1,
        repeatDelay: 0.35,
        ease: "power2.inOut",
        yoyo: false,
        onRepeat: () => gsap.set(el, { transformOrigin: "bottom center" }),
      },
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <span className={"inline-flex items-center gap-3 text-cream/45 " + className}>
      <span className="micro text-[10px] tracking-[0.3em]">{label}</span>
      <span className="relative block h-10 w-px overflow-hidden bg-cream/12">
        <span ref={lineRef} className="absolute inset-0 block bg-gold/80" />
      </span>
    </span>
  );
}
