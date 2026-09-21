"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { ECOSYSTEM_NODES, ORBIT_GEOMETRY, type EcosystemNode } from "@/data/ecosystem";
import { NorenMark } from "@/components/brand/NorenMark";
import { SectionHead } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/motion/RevealLines";
import { ICON_BY_NAME } from "@/components/brand/Icons";

const DEPTH_SHIFT = [5, 10, 17]; // px por camada — parallax espacial, não movimento de mouse
const RAD = Math.PI / 180;

/**
 * ECOSSISTEMA NOREN — sistema solar editorial.
 *
 * Órbita automática contínua (cada nó com raio, velocidade e fase próprios)
 * somada a uma influência de mouse com inércia, aplicada por profundidade.
 * Tudo em HTML + transform, sem canvas e sem WebGL.
 */
export function NorenEcosystem() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<EcosystemNode | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const size = { w: stage.clientWidth, h: stage.clientHeight };
    const reduce = prefersReducedMotion();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let start = performance.now();

    const ro = new ResizeObserver(() => {
      size.w = stage.clientWidth;
      size.h = stage.clientHeight;
    });
    ro.observe(stage);

    const onMove = (event: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };

    const render = (now: number) => {
      const t = (now - start) / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      ECOSYSTEM_NODES.forEach((node, index) => {
        const geo = ORBIT_GEOMETRY[node.orbit];
        // respiração lenta: o raio varia poucos por cento
        const breathe = 1 + Math.sin(t * 0.16 + index * 1.7) * 0.022;
        const angle = (node.angle + t * node.speed * 60) * RAD;
        const rx = (geo.rx * breathe * size.w) / 100;
        const ry = (geo.ry * breathe * size.h) / 100;

        const x = Math.cos(angle) * rx + pointer.x * DEPTH_SHIFT[node.depth];
        const y = Math.sin(angle) * ry + pointer.y * DEPTH_SHIFT[node.depth];

        const dot = dotRefs.current[index];
        if (dot) dot.style.transform = "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0) translate(-50%,-50%)";

        const label = labelRefs.current[index];
        if (label) {
          const right = Math.cos(angle) >= 0;
          label.style.transform =
            "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0) translate(" +
            (right ? "34px" : "calc(-34px - 100%)") +
            ",-50%)";
        }
      });

      raf = requestAnimationFrame(render);
    };

    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);

    if (reduce) {
      // posições estáticas: órbita parada, sem influência de mouse
      start = performance.now();
      size.w = stage.clientWidth;
      size.h = stage.clientHeight;
      ECOSYSTEM_NODES.forEach((node, index) => {
        const geo = ORBIT_GEOMETRY[node.orbit];
        const angle = node.angle * RAD;
        const x = Math.cos(angle) * ((geo.rx * size.w) / 100);
        const y = Math.sin(angle) * ((geo.ry * size.h) / 100);
        const dot = dotRefs.current[index];
        if (dot) dot.style.transform = "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%)";
        const label = labelRefs.current[index];
        if (label) {
          const right = Math.cos(angle) >= 0;
          label.style.transform =
            "translate3d(" + x + "px," + y + "px,0) translate(" +
            (right ? "34px" : "calc(-34px - 100%)") +
            ",-50%)";
        }
      });
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const shown = active ?? ECOSYSTEM_NODES[0];

  return (
    <div className="shell py-[clamp(56px,9vw,132px)]">
      <SectionHead label="Ecossistema Noren" aside="Um sistema. Não uma lista de serviços." className="mb-8 lg:mb-12" />

      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-4">
          <RevealLines
            as="h2"
            lines={["A Noren está no", "centro de um", "sistema."]}
            className="display display-xl max-w-[16ch] text-cream"
          />
          <p className="lede mt-7 max-w-[38ch]">
            Marca, cardápio, experiência, aquisição e retenção não são partes isoladas. São engrenagens de
            um mesmo sistema.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div
            ref={stageRef}
            data-hover={active ? "true" : "false"}
            className="relative mx-auto aspect-[1.5/1] w-full select-none"
          >
            {/* aura central, extremamente discreta */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(158,43,24,0.16) 0%, rgba(158,43,24,0.05) 42%, transparent 70%)",
              }}
            />

            {/* órbitas */}
            {ORBIT_GEOMETRY.map((geo, index) => (
              <span
                key={index}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border transition-colors duration-700"
                style={{
                  width: geo.rx * 2 + "%",
                  height: geo.ry * 2 + "%",
                  borderColor:
                    active && active.orbit === index ? "rgba(186,150,91,0.34)" : "rgba(186,150,91,0.13)",
                }}
              />
            ))}

            {/* centro: o símbolo nunca é encoberto */}
            <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
              <NorenMark className="h-[52px] w-[52px] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:h-[62px] lg:w-[62px]" />
            </div>

            {/* nós */}
            {ECOSYSTEM_NODES.map((node, index) => {
              const Icon = ICON_BY_NAME[node.icon];
              const isActive = active?.id === node.id;
              return (
                <div key={node.id}>
                  <div
                    ref={(el) => {
                      dotRefs.current[index] = el;
                    }}
                    onMouseEnter={() => setActive(node)}
                    onMouseLeave={() => setActive(null)}
                    data-cursor="link"
                    className={
                      "absolute left-1/2 top-1/2 z-30 flex h-[48px] w-[48px] items-center justify-center rounded-full border bg-coal/85 backdrop-blur-[2px] transition-[opacity,border-color,color,box-shadow] duration-700 " +
                      (active && !isActive
                        ? "border-gold/18 text-gold/35 opacity-35"
                        : isActive
                          ? "border-gold/75 text-gold opacity-100"
                          : "border-gold/32 text-gold/85 opacity-100")
                    }
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </div>

                  <div
                    ref={(el) => {
                      labelRefs.current[index] = el;
                    }}
                    className={
                      "pointer-events-none absolute left-1/2 top-1/2 z-30 w-max transition-opacity duration-700 " +
                      (active && !isActive ? "opacity-30" : "opacity-100")
                    }
                  >
                    <span className="flex flex-col gap-[5px]">
                      <span className="text-[13.5px] leading-none text-cream">{node.name}</span>
                      <span className="micro text-[8.5px] leading-none text-gold/70">{node.sub}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* painel contextual */}
          <div className="mt-6 flex min-h-[86px] items-start gap-6 border-t border-cream/10 pt-7 lg:mt-2">
            <span className="micro mt-[6px] hidden w-[92px] shrink-0 text-[9.5px] text-gold/70 sm:block">
              {shown.name}
            </span>
            <p
              key={shown.id}
              className="display display-md max-w-[34ch] text-cream/85"
              style={{ animation: "noren-fade 620ms cubic-bezier(0.22,1,0.36,1)" }}
            >
              {shown.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
