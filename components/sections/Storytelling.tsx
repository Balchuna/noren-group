"use client";

import { useState } from "react";
import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { asset } from "@/lib/asset";

const STEPS = [
  {
    n: "01",
    name: "Read",
    headline: "Diagnóstico profundo.",
    text: "Lemos a casa por dentro e por fora: produto, operação, margem, presença digital, concorrência e percepção de quem já senta à mesa.",
    bullets: ["Imersão no negócio", "Leitura de mercado", "Mapa de oportunidades"],
    image: "/images/metodo-read.jpg",
  },
  {
    n: "02",
    name: "Decide",
    headline: "Priorizar o que realmente importa.",
    text: "Nem tudo pode ser feito ao mesmo tempo. Definimos a ordem que gera mais valor com o recurso disponível.",
    bullets: ["Priorização estratégica", "Metas e indicadores", "Decisões com contexto"],
    image: "/images/metodo-decide.jpg",
  },
  {
    n: "03",
    name: "Build",
    headline: "Transformar estratégia em execução.",
    text: "Marca, comunicação, experiência e jornada de aquisição construídas com foco, disciplina e excelência.",
    bullets: ["Identidade e narrativa", "Experiência digital", "Jornada de reservas"],
    image: "/images/metodo-build.jpg",
  },
  {
    n: "04",
    name: "Compound",
    headline: "Construir crescimento contínuo e valor de longo prazo.",
    text: "O que foi construído passa a trabalhar sozinho: marca mais forte, aquisição mais eficiente e margem protegida.",
    bullets: ["Retenção e recorrência", "Eficiência de mídia", "Valor de longo prazo"],
    image: "/images/metodo-compound.jpg",
  },
];

/** Scroll storytelling do método — cada etapa tem seu próprio tempo de leitura. */
export function Storytelling() {
  const [active, setActive] = useState(0);

  return (
    <div className="shell grid grid-cols-1 gap-y-12 py-[clamp(56px,9vw,124px)] lg:grid-cols-12 lg:gap-x-14">
      <aside className="hidden lg:col-span-2 lg:block">
        <div className="sticky top-[140px] flex flex-col gap-7">
          <SectionLabel>O método</SectionLabel>
          <ol className="flex flex-col gap-5">
            {STEPS.map((step, index) => (
              <li key={step.n} className="flex items-center gap-4">
                <span
                  className={
                    "h-px transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                    (active === index ? "w-8 bg-gold" : "w-4 bg-cream/25")
                  }
                />
                <span
                  className={
                    "text-[11.5px] uppercase tracking-[0.2em] transition-colors duration-700 " +
                    (active === index ? "text-cream" : "text-cream/35")
                  }
                >
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <div className="flex flex-col gap-[clamp(56px,9vw,132px)] lg:col-span-10">
        {STEPS.map((step, index) => (
          <article
            key={step.n}
            data-step={index}
            onMouseEnter={() => setActive(index)}
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <ParallaxImage
                src={asset(step.image)}
                alt={step.name + " — " + step.headline}
                className="aspect-[5/4] w-full"
                amount={8}
              />
            </div>

            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <Reveal>
                <span className="micro flex items-center gap-4 text-[10px] text-gold">
                  {step.n}
                  <span className="h-px w-8 bg-current opacity-50" />
                  <span className="text-cream/40">Etapa</span>
                </span>
              </Reveal>

              <RevealLines
                as="h3"
                lines={[step.name]}
                className="display mt-6 text-[clamp(2.6rem,4.6vw,4.2rem)] uppercase leading-[0.92] tracking-[0.02em] text-cream"
              />

              <Reveal delay={0.1}>
                <p className="display display-md mt-5 max-w-[24ch] text-cream/85">{step.headline}</p>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="body-sm mt-5 max-w-[42ch] text-[14.5px]">{step.text}</p>
              </Reveal>

              <Reveal delay={0.22}>
                <ul className="mt-7 flex flex-col gap-3 border-t border-cream/10 pt-6">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-[13.5px] text-cream/70">
                      <span className="h-px w-4 bg-gold/70" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
