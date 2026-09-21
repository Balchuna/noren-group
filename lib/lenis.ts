"use client";

import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

/** Instância viva, ou null quando o scroll suave está desligado (reduced motion). */
export function lenisScrollTo(target: number | string, opts?: { immediate?: boolean; offset?: number }) {
  if (instance) {
    instance.scrollTo(target as never, { immediate: opts?.immediate, offset: opts?.offset ?? 0 });
    return;
  }
  if (typeof target === "number" && typeof window !== "undefined") {
    window.scrollTo({ top: target + (opts?.offset ?? 0), behavior: opts?.immediate ? "auto" : "smooth" });
  }
}

export function stopScroll() {
  instance?.stop();
  if (typeof document !== "undefined") document.documentElement.style.overflow = "hidden";
}

export function startScroll() {
  if (typeof document !== "undefined") document.documentElement.style.overflow = "";
  instance?.start();
}
