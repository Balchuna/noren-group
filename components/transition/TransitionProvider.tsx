"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { getLenis, startScroll, stopScroll } from "@/lib/lenis";

type Ctx = { navigate: (href: string) => void; busy: boolean };

const TransitionContext = createContext<Ctx>({ navigate: () => {}, busy: false });

export const useTransition = () => useContext(TransitionContext);

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

/**
 * NOREN PORTAL — assinatura de transição entre rotas.
 *
 * Duas formas verticais entram pelas laterais, encontram-se no centro,
 * a tela escurece, atravessamos o portal e as formas seguem para o lado
 * oposto revelando a próxima página. ~900ms no total.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);

  const pending = useRef<string | null>(null);
  const phase = useRef<"idle" | "covering" | "covered">("idle");
  const busyRef = useRef(false);

  const pageRoot = () => document.getElementById("noren-page");

  const cover = useCallback(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    const line = lineRef.current;
    const mark = markRef.current;
    const root = rootRef.current;
    if (!left || !right || !line || !mark || !root) return;

    root.style.visibility = "visible";
    stopScroll();

    const tl = gsap.timeline();
    tl.set([left, right], { xPercent: (i: number) => (i === 0 ? -101 : 101) })
      .set(line, { scaleY: 0, opacity: 0 })
      .set(mark, { opacity: 0, scale: 0.9 })
      .to(root, { autoAlpha: 1, duration: 0.01 }, 0)
      .to(left, { xPercent: 0, duration: 0.52, ease: "power3.inOut" }, 0)
      .to(right, { xPercent: 0, duration: 0.52, ease: "power3.inOut" }, 0.045)
      .to(line, { scaleY: 1, opacity: 1, duration: 0.34, ease: "power2.out" }, 0.22)
      .to(mark, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0.24)
      .to(pageRoot(), { opacity: 0, duration: 0.3, ease: "power1.out" }, 0.28);
  }, []);

  const reveal = useCallback(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    const line = lineRef.current;
    const mark = markRef.current;
    const root = rootRef.current;
    if (!left || !right || !line || !mark || !root) return;

    const tl = gsap.timeline({
      onComplete: () => {
        root.style.visibility = "hidden";
        gsap.set(root, { autoAlpha: 0 });
        startScroll();
        phase.current = "idle";
        busyRef.current = false;
        setBusy(false);
      },
    });

    tl.to(mark, { opacity: 0, duration: 0.22, ease: "power1.out" }, 0)
      .to(line, { opacity: 0, duration: 0.22 }, 0)
      .to(left, { xPercent: 101, duration: 0.6, ease: "power3.inOut" }, 0.05)
      .to(right, { xPercent: -101, duration: 0.6, ease: "power3.inOut" }, 0.05)
      .to(pageRoot(), { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.22);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (busyRef.current) return;
      if (normalize(href) === normalize(pathname)) {
        getLenis()?.scrollTo(0, { duration: 0.9 });
        if (!getLenis()) window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      busyRef.current = true;
      setBusy(true);
      phase.current = "covering";
      pending.current = normalize(href);
      cover();
      window.setTimeout(() => {
        router.push(href);
      }, 470);
    },
    [cover, pathname, router],
  );

  // A nova rota terminou de montar: revela.
  useEffect(() => {
    const current = normalize(pathname);

    if (pending.current && pending.current === current) {
      pending.current = null;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      phase.current = "covered";
      window.setTimeout(() => reveal(), 120);
      return;
    }

    // Navegação não interceptada (voltar/avançar do navegador, link direto).
    if (phase.current === "idle" && !busyRef.current) {
      const el = pageRoot();
      if (el) {
        gsap.fromTo(el, { opacity: 0.35 }, { opacity: 1, duration: 0.42, ease: "power2.out" });
      }
    }
  }, [pathname, reveal]);

  useEffect(() => {
    const el = pageRoot();
    if (el) gsap.set(el, { opacity: 1 });
  }, []);

  return (
    <TransitionContext.Provider value={{ navigate, busy }}>
      {children}

      <div
        ref={rootRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <div ref={leftRef} className="absolute inset-y-0 left-0 w-[50.6%] bg-ink will-change-transform">
          <span className="absolute inset-y-0 right-0 w-px bg-[linear-gradient(to_bottom,transparent,rgba(158,43,24,0.55),transparent)]" />
        </div>
        <div ref={rightRef} className="absolute inset-y-0 right-0 w-[50.6%] bg-ink will-change-transform">
          <span className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(to_bottom,transparent,rgba(158,43,24,0.55),transparent)]" />
        </div>
        <span
          ref={lineRef}
          className="absolute left-1/2 top-0 h-full w-px origin-top bg-gold/70"
        />
        <div
          ref={markRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="display block text-[15px] tracking-[0.5em] text-cream/85">NOREN</span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
