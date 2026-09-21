import { CountUp } from "@/components/motion/CountUp";
import { RevealStagger } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FEATURED_RESULTS } from "@/data/cases";

/** Resultados do case em destaque — MOCK DATA, declarado em tela. */
export function CaseResults() {
  return (
    <div className="shell py-[clamp(52px,8vw,110px)]">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 lg:mb-14">
        <SectionLabel>Resultados do período</SectionLabel>
        <span className="micro text-[10px] text-cream/35">Dados fictícios deste visualizer</span>
      </div>

      <RevealStagger as="ul" className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-x-0">
        {FEATURED_RESULTS.map((item, index) => (
          <li
            key={item.label}
            data-reveal-item
            className={
              "flex flex-col gap-4 border-cream/10 px-0 lg:px-9 " +
              (index > 0 ? "lg:border-l " : "lg:pl-0") +
              (index === FEATURED_RESULTS.length - 1 ? " lg:pr-0" : "") +
              (index % 2 === 1 ? " border-l pl-6 lg:pl-9" : "")
            }
          >
            <CountUp
              value={item.value}
              prefix={item.prefix}
              suffix={item.suffix}
              className="display display-lg tabular-nums text-cream"
            />
            <span className="flex flex-col gap-2">
              <span className="micro text-[10.5px] text-gold">{item.label}</span>
              <span className="body-sm max-w-[24ch] text-[13px]">{item.note}</span>
            </span>
          </li>
        ))}
      </RevealStagger>
    </div>
  );
}
