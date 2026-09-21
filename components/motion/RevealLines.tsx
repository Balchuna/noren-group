"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

type RevealLinesProps = {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div" | "blockquote";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** true = anima no mount (herói). false = anima ao entrar na viewport. */
  immediate?: boolean;
};

/**
 * Revelação por máscara, uma linha por vez. As quebras de linha são
 * declaradas à mão — nada de split automático, o ritmo tipográfico é decisão
 * de design, não de algoritmo.
 */
export function RevealLines({
  lines,
  as = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.085,
  immediate = false,
}: RevealLinesProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as React.ElementType;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = Array.from(el.querySelectorAll<HTMLElement>(".mask > span"));
    if (!inners.length) return;

    if (prefersReducedMotion()) {
      gsap.set(inners, { yPercent: 0, clearProps: "transform" });
      gsap.set(el, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 1 });
      // y: 0 explícito: o CSS de fallback aplica translate3d(0,112%,0) na mesma
      // propriedade e o GSAP leria esse deslocamento como um "y" em pixels.
      gsap.fromTo(
        inners,
        { yPercent: 112, y: 0 },
        {
          yPercent: 0,
          y: 0,
          duration: 1.15,
          ease: "power4.out",
          stagger,
          delay,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start: "top 84%", once: true } }),
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, immediate, lines.length]);

  return (
    <Tag ref={ref} className={className} data-reveal-lines style={{ opacity: 0 }}>
      {lines.map((line, i) => (
        <span className={"mask " + lineClassName} key={i}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
