"use client";

import { useState } from "react";
import { RevealLines } from "@/components/motion/RevealLines";
import { SectionHead } from "@/components/ui/SectionLabel";
import { IconChef, IconChart, IconTag } from "@/components/brand/Icons";

const FRENTES = [
  {
    name: "Estratégia",
    icon: IconTag,
    caption: "Clareza para escolher onde competir e como crescer.",
    items: ["Diagnóstico estratégico", "Posicionamento", "Pricing e mix", "Inteligência competitiva", "Expansão"],
  },
  {
    name: "Marca",
    icon: IconChef,
    caption: "Percepção, narrativa e experiência em cada ponto de contato.",
    items: ["Identidade", "Narrativa", "Experiência", "Conteúdo", "Diferenciação"],
  },
  {
    name: "Crescimento",
    icon: IconChart,
    caption: "Aquisição, retenção e eficiência operando como um só sistema.",
    items: ["Aquisição", "Retenção", "Descoberta", "Eficiência", "Recorrência"],
  },
];

/** Três frentes integradas — detalhes revelados no hover, no foco e no toque. */
export function ThreeFrentes() {
  const [active, setActive] = useState(0);

  return (
    <div className="shell py-[clamp(56px,9vw,128px)]">
      <SectionHead label="Três frentes integradas" className="mb-8 lg:mb-12" />

      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-4">
          <RevealLines
            as="h2"
            lines={["Estratégia,", "marca e", "crescimento.", "Em sinergia."]}
            className="display display-xl text-cream"
          />
        </div>

        <ul className="grid grid-cols-1 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:gap-x-0">
          {FRENTES.map(({ name, icon: Icon, caption, items }, index) => (
            <li
              key={name}
              data-cursor="link"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={
                "group flex flex-col border-cream/10 pt-1 lg:px-8 " +
                (index > 0 ? "lg:border-l " : "lg:pl-0")
              }
            >
              <span
                className={
                  "flex h-[54px] w-[54px] items-center justify-center rounded-full border transition-colors duration-700 " +
                  (active === index ? "border-gold/70 text-gold" : "border-gold/30 text-gold/75")
                }
              >
                <Icon className="h-[21px] w-[21px]" />
              </span>

              <h3 className="display display-md mt-6 text-cream">{name}</h3>
              <p className="body-sm mt-3 max-w-[30ch] text-[13px]">{caption}</p>

              <ul
                className={
                  "mt-5 flex flex-col gap-[7px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                  (active === index ? "max-h-56 opacity-100" : "max-h-56 opacity-45")
                }
              >
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[13px] text-cream/72">
                    <span className="text-gold/70" aria-hidden="true">
                      ›
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
