"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { markIntroDone } from "@/lib/intro";
import { stopScroll, startScroll } from "@/lib/lenis";

const KEY = "noren:intro";

/** Loading inicial muito curto: NOREN, uma linha dourada cresce, a tela revela. */
export function Preloader() {
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const wordRef = useRef<HTMLSpanElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    if (alreadySeen || prefersReducedMotion()) {
      markIntroDone();
      return;
    }

    stopScroll();
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const root = rootRef.current;
    const word = wordRef.current;
    const line = lineRef.current;
    if (!root || !word || !line) return;

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          window.sessionStorage.setItem(KEY, "1");
        } catch {
          /* modo privado: sem problema */
        }
        setActive(false);
        startScroll();
      },
    });

    tl.fromTo(word, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.72, ease: "power2.inOut" }, 0.16)
      .add(() => markIntroDone(), 0.86)
      .to(word, { opacity: 0, y: -8, duration: 0.45, ease: "power2.in" }, 0.98)
      .to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.45, ease: "power2.inOut" }, 0.98)
      .to(root, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, 1.02);

    return () => {
      tl.kill();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-coal"
    >
      <span ref={wordRef} className="display text-[22px] tracking-[0.5em] text-cream sm:text-[26px]">
        NOREN
      </span>
      <span className="mt-6 block h-px w-[132px] bg-cream/12">
        <span ref={lineRef} className="block h-px w-full origin-left bg-gold" />
      </span>
    </div>
  );
}
