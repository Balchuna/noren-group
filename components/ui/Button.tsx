"use client";

import { useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { useTransition } from "@/components/transition/TransitionProvider";

export type ButtonVariant = "primary" | "outline" | "ghost" | "light";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  icon?: React.ReactNode;
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  magnetic?: boolean;
  fullWidth?: boolean;
};

export const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 20 10"
    aria-hidden="true"
    className={"h-[9px] w-[18px] " + className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M0.6 5h17.4" />
    <path d="M13.6 1.2 17.8 5l-4.2 3.8" />
  </svg>
);

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-noren text-cream",
  outline: "border border-cream/22 text-cream",
  ghost: "text-cream/80 hover:text-cream",
  light: "bg-cream text-coal",
};

const FILL: Record<ButtonVariant, string> = {
  primary: "bg-[#b2351c]",
  outline: "bg-cream/6",
  ghost: "bg-transparent",
  light: "bg-white",
};

/**
 * Botão da Noren. Magnético no máximo alguns pixels, seta que desliza,
 * preenchimento suave — microinteração, não espetáculo.
 */
export function NorenButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  icon,
  arrow = true,
  type = "button",
  disabled = false,
  magnetic = true,
  fullWidth = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const { navigate } = useTransition();
  const isExternal = href ? /^(https?:|mailto:|tel:)/.test(href) : false;

  const bindMagnet = (el: HTMLElement | null) => {
    if (!el || !magnetic || !isFinePointer() || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      xTo(relX * 7);
      yTo(relY * 5);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    (el as HTMLElement & { __magnet?: () => void }).__magnet = () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  };

  const setRef = (el: HTMLElement | null) => {
    const previous = ref.current as (HTMLElement & { __magnet?: () => void }) | null;
    previous?.__magnet?.();
    ref.current = el;
    bindMagnet(el);
  };

  const classes = [
    "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden",
    "px-6 py-[15px] text-[12px] font-medium uppercase tracking-[0.14em] leading-none",
    "transition-[color,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "disabled:cursor-not-allowed disabled:opacity-40",
    fullWidth ? "w-full" : "",
    VARIANTS[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={
          "absolute inset-0 origin-left scale-x-0 transition-transform duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-x-100 " +
          FILL[variant]
        }
      />
      {icon ? <span className="relative z-10 flex items-center">{icon}</span> : null}
      <span className="relative z-10">{children}</span>
      {arrow ? (
        <ArrowRight className="relative z-10 transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-[5px]" />
      ) : null}
    </>
  );

  const cursor = variant === "primary" ? "cta" : "link";

  if (href && isExternal) {
    return (
      <a
        ref={setRef as never}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-cursor={cursor}
      >
        {inner}
      </a>
    );
  }

  if (href) {
    return (
      <a
        ref={setRef as never}
        href={href}
        className={classes}
        data-cursor={cursor}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
          event.preventDefault();
          navigate(href);
        }}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={setRef as never}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      data-cursor={cursor}
    >
      {inner}
    </button>
  );
}
