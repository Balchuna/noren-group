"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

/**
 * Contador que só existe para dar peso ao número quando ele entra na tela.
 * Sem JavaScript ou com reduced motion, o valor final já está no HTML.
 */
export function CountUp({ value, prefix = "", suffix = "", className = "", duration = 1.5 }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const target = Math.abs(value);
    if (prefersReducedMotion()) {
      el.textContent = String(target);
      return;
    }

    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.n));
        },
        onComplete: () => {
          el.textContent = String(target);
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
