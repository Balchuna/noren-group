"use client";

import { useEffect, useRef } from "react";
import { NorenMark } from "@/components/brand/NorenMark";
import { IconChart, IconChef, IconPeople, IconTag } from "@/components/brand/Icons";
import { prefersReducedMotion } from "@/lib/gsap";

type Layout = "column" | "row" | "row-reverse";

const NODES: Array<{
  name: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  layout: Layout;
}> = [
  { name: "Cardápio", sub: "Valor real", icon: IconChef, x: 50, y: 12, layout: "column" },
  { name: "Marca", sub: "Posicionamento", icon: IconTag, x: 18, y: 52, layout: "row" },
  { name: "Experiência", sub: "Encantamento", icon: IconPeople, x: 82, y: 52, layout: "row-reverse" },
  { name: "Retenção", sub: "Crescimento contínuo", icon: IconChart, x: 50, y: 88, layout: "column" },
];

/** Diagrama estático com deriva lentíssima — a leitura sistêmica da casa. */
export function SystemDiagram() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-drift]"));
    let raf = 0;
    const start = performance.now();

    const loop = (now: number) => {
      const t = (now - start) / 1000;
      items.forEach((item, index) => {
        const ax = Math.sin(t * 0.13 + index * 1.9) * 5;
        const ay = Math.cos(t * 0.11 + index * 1.3) * 5;
        item.style.transform = "translate(-50%,-50%) translate3d(" + ax.toFixed(2) + "px," + ay.toFixed(2) + "px,0)";
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} className="relative mx-auto aspect-[1.5/1] w-full max-w-[760px] select-none">
      {[0, 1].map((index) => (
        <span
          key={index}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-gold/14"
          style={{
            width: index === 0 ? "48%" : "78%",
            height: index === 0 ? "40%" : "68%",
          }}
        />
      ))}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(158,43,24,0.16) 0%, rgba(158,43,24,0.04) 45%, transparent 72%)",
        }}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <NorenMark className="h-[52px] w-[52px]" />
      </div>

      {NODES.map(({ name, sub, icon: Icon, x, y, layout }) => (
        <div
          key={name}
          data-drift
          className={
            "absolute flex items-center gap-4 " +
            (layout === "column" ? "flex-col gap-3" : layout === "row-reverse" ? "flex-row-reverse" : "")
          }
          style={{ left: x + "%", top: y + "%", transform: "translate(-50%,-50%)" }}
        >
          <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border border-gold/32 text-gold">
            <Icon className="h-[19px] w-[19px]" />
          </span>
          <span className="flex flex-col gap-[5px]">
            <span className="whitespace-nowrap text-[14px] leading-none text-cream">{name}</span>
            <span className="micro whitespace-nowrap text-[9px] leading-none text-gold/70">{sub}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
