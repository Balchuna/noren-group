import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionLabel";

const BELIEFS = [
  {
    n: "01",
    lines: ["Crescimento", "sem clareza", "gera ruído."],
    text: "Direção é mais importante que velocidade.",
  },
  {
    n: "02",
    lines: ["Marcas fortes", "protegem", "margens."],
    text: "Valor percebido sustenta negócios mais saudáveis.",
  },
  {
    n: "03",
    lines: ["Boas decisões", "constroem", "legado."],
    text: "O hoje importa, mas o amanhã é o destino.",
  },
];

export function Beliefs({ aside = "Princípios que guiam o nosso trabalho." }: { aside?: string }) {
  return (
    <div className="shell py-[clamp(56px,9vw,128px)]">
      <SectionHead label="Nossas crenças" aside={aside} className="mb-10 lg:mb-16" />

      <div className="grid grid-cols-1 gap-y-14 md:grid-cols-3 md:gap-x-0">
        {BELIEFS.map(({ n, lines, text }, index) => (
          <div
            key={n}
            className={
              "flex flex-col md:px-9 " + (index > 0 ? "md:border-l md:border-cream/10 " : "md:pl-0")
            }
          >
            <Reveal>
              <span className="micro flex items-center gap-4 text-[10px] text-gold">
                {n}
                <span className="h-px w-8 bg-current opacity-55" />
              </span>
            </Reveal>
            <RevealLines as="h3" lines={lines} className="display display-lg mt-6 max-w-[14ch] text-cream" delay={0.08} />
            <Reveal delay={0.18}>
              <p className="body-sm mt-5 max-w-[30ch]">{text}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}
