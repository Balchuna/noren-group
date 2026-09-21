"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const STATEMENTS = [
  ["Marcas fortes", "protegem margens."],
  ["Boas decisões", "constroem legado."],
  ["O crescimento", "não acontece por acaso."],
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Manifesto — um statement por vez, muito preto e muito espaço.
 * O progresso do scroll escolhe qual frase está viva; as outras se dissolvem.
 * Com reduced motion as três ficam empilhadas, sem movimento.
 */
export function Manifesto() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const blocks = Array.from(el.querySelectorAll<HTMLElement>("[data-manifesto]"));
    const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-manifesto-line]"));
    const setters = blocks.map((block) => ({
      opacity: gsap.quickSetter(block, "opacity"),
      y: gsap.quickSetter(block, "y", "px"),
    }));

    const slot = 1 / blocks.length;

    const apply = (progress: number) => {
      blocks.forEach((_, index) => {
        const center = (index + 0.5) * slot;
        const distance = (progress - center) / (slot * 0.92);
        const closeness = clamp01(1 - Math.abs(distance));
        const eased = closeness * closeness * (3 - 2 * closeness);
        setters[index].opacity(eased);
        setters[index].y(distance * 46);
      });
    };

    apply(0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { yPercent: 108, y: 0 },
        {
          yPercent: 0,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        },
      );

      const trigger = gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => apply(self.progress),
          },
        },
      );
      return () => trigger.kill();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative bg-ink" style={{ height: STATEMENTS.length * 98 + "vh" }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="shell relative w-full">
          {STATEMENTS.map((pair, index) => (
            <div
              key={index}
              data-manifesto
              className={
                "flex flex-col " +
                (index === 0
                  ? "relative"
                  : "absolute inset-x-0 top-1/2 -translate-y-1/2 px-[var(--shell-x)]")
              }
            >
              <span className="display display-hero text-cream">
                {pair.map((line) => (
                  <span className="mask block" key={line}>
                    <span data-manifesto-line>{line}</span>
                  </span>
                ))}
              </span>
              <span className="mt-8 flex items-center gap-4 text-gold">
                <span className="h-px w-12 bg-current opacity-50" />
                <span className="micro text-[10px]">
                  {String(index + 1).padStart(2, "0")} / {String(STATEMENTS.length).padStart(2, "0")}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
