"use client";

/**
 * Pequeno barramento para o loading inicial. Componentes que animam no mount
 * (heróis) esperam o preloader sair em vez de rodar atrás da cortina.
 */
let ready = false;
const subscribers = new Set<() => void>();

export function markIntroDone() {
  if (ready) return;
  ready = true;
  subscribers.forEach((fn) => fn());
  subscribers.clear();
}

export function isIntroDone() {
  return ready;
}

export function onIntroDone(fn: () => void) {
  if (ready) {
    fn();
    return () => {};
  }
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}
