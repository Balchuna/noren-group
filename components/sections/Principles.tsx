import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionLabel";

const ITEMS = [
  { n: "01", title: "Menos achismo.", text: "Decisões baseadas em contexto, dados e realidade operacional." },
  { n: "02", title: "Mais sistema.", text: "Processos que geram consistência e escala." },
  { n: "03", title: "Valor antes de volume.", text: "Crescimento sustentável antes de números vazios." },
];

/** O que nos guia — princípios em tipografia grande, sem caixas. */
export function Principles() {
  return (
    <div className="shell py-[clamp(56px,9vw,128px)]">
      <SectionHead label="Princípios" className="mb-10 lg:mb-16" />

      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-4">
          <RevealLines as="h2" lines={["O que nos guia."]} className="display display-xl text-cream" />
          <Reveal delay={0.12}>
            <p className="lede mt-6 max-w-[30ch]">
              Mais que um método, uma forma de pensar e construir o futuro da gastronomia.
            </p>
          </Reveal>
        </div>

        <RevealStagger as="ul" className="grid grid-cols-1 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:gap-x-0">
          {ITEMS.map(({ n, title, text }, index) => (
            <li
              key={n}
              data-reveal-item
              className={"flex flex-col border-cream/10 lg:px-8 " + (index > 0 ? "lg:border-l " : "lg:pl-0")}
            >
              <span className="micro flex items-center gap-4 text-[10px] text-gold">
                {n}
                <span className="h-px w-7 bg-current opacity-50" />
              </span>
              <h3 className="display display-md mt-5 max-w-[14ch] text-cream">{title}</h3>
              <p className="body-sm mt-4 max-w-[26ch] text-[13px]">{text}</p>
            </li>
          ))}
        </RevealStagger>
      </div>
    </div>
  );
}
