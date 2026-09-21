"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: "div" | "section" | "li" | "span" | "figure" | "p" | "header" | "article";
};

/** Fade-up pesado e discreto. Entra uma vez, quando o elemento alcança 88% da tela. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
  duration = 1.05,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as React.ElementType;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onComplete: () => gsap.set(el, { clearProps: "willChange" }),
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, duration]);

  return (
    <Tag ref={ref} className={className} data-reveal>
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  selector?: string;
  stagger?: number;
  y?: number;
  as?: "div" | "ul" | "ol" | "section" | "article" | "header";
};

/** Revela filhos em cascata — usado em grades de cards e listas. */
export function RevealStagger({
  children,
  className = "",
  selector = "[data-reveal-item]",
  stagger = 0.09,
  y = 30,
  as = "div",
}: StaggerProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as React.ElementType;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (!items.length) return;

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [selector, stagger, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
