"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Deslocamento total em % da altura da imagem. Mantenha entre 6 e 12. */
  amount?: number;
  priority?: boolean;
  overlay?: string;
  children?: React.ReactNode;
};

/**
 * Parallax leve (20–60px na prática). A imagem fica 8% maior que o quadro
 * para que o deslocamento nunca revele borda.
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  amount = 9,
  priority = false,
  overlay,
  children,
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    if (prefersReducedMotion() || window.innerWidth < 768) {
      gsap.set(img, { scale: 1, yPercent: 0 });
      return;
    }

    const half = amount / 2;
    const ctx = gsap.context(() => {
      gsap.set(img, { scale: 1 + amount / 100 + 0.02 });
      gsap.fromTo(
        img,
        { yPercent: -half },
        {
          yPercent: half,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [amount]);

  return (
    <figure ref={wrapRef} className={"photo " + className}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={imgClassName}
      />
      {overlay ? <span className="veil" style={{ background: overlay }} /> : null}
      {children}
    </figure>
  );
}
