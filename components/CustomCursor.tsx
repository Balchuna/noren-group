"use client";

import { useEffect, useRef } from "react";
import { isFinePointer, prefersReducedMotion } from "@/lib/gsap";

/**
 * Cursor próprio: ponto dourado que cresce em elementos interativos e assume
 * o vermelho Noren sobre o CTA principal. Somente desktop.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { ...target };
    const ringPos = { ...target };
    let scale = 1;
    let scaleTarget = 1;
    let mode = "default";
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      const el = (event.target as HTMLElement | null)?.closest?.(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      ) as HTMLElement | null;

      const nextMode = el?.dataset?.cursor ?? (el ? "link" : "default");
      if (nextMode !== mode) {
        mode = nextMode;
        scaleTarget = mode === "default" ? 1 : mode === "cta" ? 2.15 : 1.75;
        ring.dataset.mode = mode;
      }
    };

    const onLeave = () => {
      target.x = -100;
      target.y = -100;
    };

    const loop = () => {
      dotPos.x += (target.x - dotPos.x) * 0.34;
      dotPos.y += (target.y - dotPos.y) * 0.34;
      ringPos.x += (target.x - ringPos.x) * 0.14;
      ringPos.y += (target.y - ringPos.y) * 0.14;
      scale += (scaleTarget - scale) * 0.12;

      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[120] hidden lg:block">
      <div
        ref={ringRef}
        data-mode="default"
        className="absolute left-0 top-0 h-[26px] w-[26px] rounded-full border border-gold/60 transition-[border-color,background-color] duration-500 data-[mode=cta]:border-noren/80 data-[mode=link]:border-gold/80 data-[mode=link]:bg-gold/5"
      />
      <div ref={dotRef} className="absolute left-0 top-0 h-[5px] w-[5px] rounded-full bg-gold" />
    </div>
  );
}
