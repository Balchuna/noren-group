"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { asset } from "@/lib/asset";
import { RevealLines } from "@/components/motion/RevealLines";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NorenButton } from "@/components/ui/Button";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { onIntroDone } from "@/lib/intro";

type Action = { label: string; href: string };

type Props = {
  label: string;
  lines: string[];
  lede?: string;
  image: string;
  primary?: Action;
  secondary?: Action;
  sideNote?: string;
  bottomNote?: string;
  scrollCue?: boolean;
  /** altura: "full" para 100vh, "mid" para heróis internos mais baixos */
  size?: "full" | "mid";
  headlineClassName?: string;
  children?: React.ReactNode;
};

export function Hero({
  label,
  lines,
  lede,
  image,
  primary,
  secondary,
  sideNote,
  bottomNote = "Construindo marcas. Protegendo margens.",
  scrollCue = false,
  size = "full",
  headlineClassName = "",
  children,
}: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const ledeRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(imgRef.current, { scale: 1.075 }, { scale: 1, duration: 2.1, ease: "power2.out" }, 0)
        .fromTo(labelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
        .fromTo(ledeRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.42)
        .fromTo(actionsRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 }, 0.54);

      const unsubscribe = onIntroDone(() => tl.play(0));
      return () => unsubscribe();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className={
        "relative flex flex-col justify-end overflow-hidden " +
        (size === "full" ? "min-h-[100svh]" : "min-h-[86svh]")
      }
    >
      <img
        ref={imgRef}
        src={asset(image)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <span
        className="veil"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.96) 2%, rgba(10,10,10,0.72) 32%, rgba(10,10,10,0.36) 68%, rgba(10,10,10,0.52) 100%)",
        }}
      />
      <span
        className="veil"
        style={{ background: "linear-gradient(to right, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.25) 55%, transparent 100%)" }}
      />

      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-[clamp(28px,5vh,64px)] pt-[26vh]">
        {label ? (
          <div ref={labelRef} className="mb-7">
            <SectionLabel>{label}</SectionLabel>
          </div>
        ) : null}

        <RevealLines
          as="h1"
          lines={lines}
          immediate
          delay={0.16}
          className={"display display-hero max-w-[19ch] text-balance text-cream " + headlineClassName}
        />

        {lede ? (
          <p ref={ledeRef} className="lede mt-7 max-w-[42ch] text-cream/70 lg:mt-9">
            {lede}
          </p>
        ) : null}

        {children}

        {primary || secondary ? (
          <div ref={actionsRef} className="mt-9 flex flex-wrap items-center gap-3 lg:mt-11">
            {primary ? <NorenButton href={primary.href}>{primary.label}</NorenButton> : null}
            {secondary ? (
              <NorenButton href={secondary.href} variant="outline">
                {secondary.label}
              </NorenButton>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="shell relative z-10 flex items-end justify-between gap-8 pb-7">
        <span className="micro hidden text-cream/40 sm:block">{bottomNote}</span>
        {scrollCue ? <ScrollCue /> : <span className="hidden sm:block" />}
      </div>

      {sideNote ? (
        <div className="absolute right-[calc(var(--shell-x)*0.62)] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
          <span className="block h-16 w-px bg-gold/45" />
          <span className="micro rotate-180 text-right text-[10px] text-cream/55 [writing-mode:vertical-rl]">
            {sideNote}
          </span>
        </div>
      ) : null}
    </section>
  );
}
