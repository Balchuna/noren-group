import { RevealLines } from "@/components/motion/RevealLines";
import { RevealStagger } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionLabel";
import { IconChart, IconDoc, IconGear, IconSearch } from "@/components/brand/Icons";

const STEPS = [
  { n: "01", name: "Read", text: "Análise profunda do negócio, do mercado e das oportunidades.", icon: IconSearch },
  { n: "02", name: "Decide", text: "Priorização estratégica com base em dados e vivência.", icon: IconDoc },
  { n: "03", name: "Build", text: "Execução com foco, disciplina e excelência.", icon: IconGear },
  { n: "04", name: "Compound", text: "Crescimento contínuo e construção de valor no tempo.", icon: IconChart },
];

/** NOREN SYSTEM — do diagnóstico ao legado. */
export function NorenSystem({ className = "" }: { className?: string }) {
  return (
    <div className={"shell py-[clamp(56px,9vw,128px)] " + className}>
      <SectionHead label="Noren System" aside="Um método. Resultados reais." className="mb-8 lg:mb-10" />
      <RevealLines
        as="h2"
        lines={["Do diagnóstico ao legado."]}
        className="display display-xl max-w-[16ch] text-cream"
      />

      <RevealStagger as="ol" className="mt-12 grid grid-cols-1 gap-y-11 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-0">
        {STEPS.map(({ n, name, text, icon: Icon }, index) => (
          <li
            key={name}
            data-reveal-item
            className={
              "relative flex gap-5 border-cream/10 lg:px-8 " +
              (index > 0 ? "lg:border-l " : "lg:pl-0") +
              (index === STEPS.length - 1 ? " lg:pr-0" : "")
            }
          >
            <span className="mt-1 flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold">
              <Icon className="h-[21px] w-[21px]" />
            </span>
            <span className="flex flex-col">
              <span className="micro text-[10px] text-gold/85">{n}</span>
              <span className="mt-2 text-[15px] uppercase tracking-[0.16em] text-cream">{name}</span>
              <span className="body-sm mt-3 max-w-[26ch] text-[13px]">{text}</span>
            </span>
            {index < STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -right-[7px] top-[26px] hidden text-cream/22 lg:block"
              >
                <svg viewBox="0 0 12 20" className="h-4 w-3" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M2 2l6 8-6 8" />
                </svg>
              </span>
            ) : null}
          </li>
        ))}
      </RevealStagger>
    </div>
  );
}
