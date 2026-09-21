"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { NAV_ITEMS, CTA_LABEL, CTA_HREF } from "@/data/navigation";
import { Logotype } from "@/components/brand/Logotype";
import { NorenButton } from "@/components/ui/Button";
import { useTransition } from "@/components/transition/TransitionProvider";

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export function Navbar() {
  const pathname = usePathname();
  const { navigate, busy } = useTransition();
  const headerRef = useRef<HTMLElement | null>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Some ao descer, reaparece ao subir.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const yTo = gsap.quickTo(el, "yPercent", { duration: 0.55, ease: "power3.out" });
    let last = window.scrollY;
    let hidden = false;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      setSolid(y > 40);

      if (Math.abs(delta) > 4) {
        const shouldHide = delta > 0 && y > 170;
        if (shouldHide !== hidden) {
          hidden = shouldHide;
          yTo(hidden ? -108 : 0);
        }
        last = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao trocar de rota.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className={
          "fixed inset-x-0 top-0 z-[80] transition-[background-color,backdrop-filter,border-color] duration-500 " +
          (solid
            ? "border-b border-[color-mix(in_srgb,var(--color-cream)_9%,transparent)] bg-ink/62 backdrop-blur-xl"
            : "border-b border-transparent")
        }
      >
        <div className="shell flex h-[74px] items-center justify-between gap-8 lg:h-[92px]">
          <a
            href={CTA_HREF === pathname ? "/" : "/"}
            onClick={(event) => {
              event.preventDefault();
              navigate("/");
            }}
            aria-label="Noren Group — início"
            className="shrink-0"
            data-cursor="link"
          >
            <Logotype size="md" />
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-9 lg:flex xl:gap-11">
            {NAV_ITEMS.map((item) => {
              const active = normalize(pathname) === normalize(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  data-cursor="link"
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                    event.preventDefault();
                    navigate(item.href);
                  }}
                  className={
                    "group relative py-2 text-[12.5px] tracking-[0.02em] transition-colors duration-500 " +
                    (active ? "text-cream" : "text-cream/62 hover:text-cream")
                  }
                >
                  {item.label}
                  <span
                    className={
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] " +
                      (active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")
                    }
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden lg:block">
              <NorenButton href={CTA_HREF} variant="primary" className="!px-5 !py-[13px] !text-[11px]">
                {CTA_LABEL}
              </NorenButton>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              data-cursor="link"
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="relative block h-[9px] w-[22px]">
                <span
                  className={
                    "absolute left-0 block h-px w-full bg-cream transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                    (open ? "top-1/2 rotate-45" : "top-0")
                  }
                />
                <span
                  className={
                    "absolute left-0 block h-px w-full bg-cream transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                    (open ? "top-1/2 -rotate-45" : "top-full")
                  }
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} ativo={busy} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  ativo: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: open ? 1 : 0, pointerEvents: open ? "auto" : "none" });
      return;
    }

    if (open) {
      const links = el.querySelectorAll("[data-menu-item]");
      const tl = gsap.timeline();
      tl.set(el, { pointerEvents: "auto" })
        .to(el, { autoAlpha: 1, duration: 0.45, ease: "power2.out" })
        .fromTo(
          links,
          { yPercent: 118, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.055, ease: "power3.out" },
          0.08,
        );
      return () => {
        tl.kill();
      };
    }

    const tl = gsap.timeline();
    tl.to(el, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }).set(el, { pointerEvents: "none" });
    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[85] flex flex-col justify-center bg-coal px-[var(--shell-x)] lg:hidden"
      style={{ visibility: "hidden", opacity: 0 }}
    >
      <nav aria-label="Navegação principal (mobile)" className="flex flex-col gap-1 pt-16">
        {NAV_ITEMS.map((item) => {
          const active = normalize(pathname) === normalize(item.href);
          return (
            <span key={item.href} className="mask">
              <a
                data-menu-item
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  onClose();
                  window.setTimeout(() => {
                    window.location.assign(item.href);
                  }, 260);
                }}
                className={
                  "display display-lg flex items-baseline gap-4 py-2 " +
                  (active ? "text-gold" : "text-cream")
                }
              >
                <span className="micro text-[10px] text-gold/70">{item.index}</span>
                {item.label}
              </a>
            </span>
          );
        })}
      </nav>
      <div className="mt-10">
        <NorenButton href={CTA_HREF} variant="primary" fullWidth onClick={onClose}>
          {CTA_LABEL}
        </NorenButton>
      </div>
    </div>
  );
}
