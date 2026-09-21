import { RevealLines } from "@/components/motion/RevealLines";
import { RevealStagger } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconArrowDown, IconArrowUp, IconMinus } from "@/components/brand/Icons";

const INDICATORS = [
  { label: "Receita", note: "Crescimento sustentável", icon: IconArrowUp },
  { label: "CAC", note: "Menor custo de aquisição", icon: IconArrowDown },
  { label: "Margem", note: "Mais lucro por operação", icon: IconArrowUp },
  { label: "Dependência de mídia", note: "Menos risco, mais controle", icon: IconMinus },
];

/** “Crescer não basta.” — indicadores sem cards, só número, ícone e divisor. */
export function IndicatorRow() {
  return (
    <div className="shell grid grid-cols-1 gap-y-12 py-[clamp(56px,9vw,128px)] lg:grid-cols-12 lg:gap-x-10">
      <div className="lg:col-span-5 xl:col-span-4">
        <SectionLabel className="mb-8">Resultados reais</SectionLabel>
        <RevealLines
          as="h2"
          lines={["Crescer não basta."]}
          className="display display-xl text-cream"
        />
        <p className="lede mt-6 max-w-[38ch]">
          Restaurantes saudáveis crescem com rentabilidade, marca forte e previsibilidade. Olhamos o que
          realmente importa.
        </p>
      </div>

      <RevealStagger
        as="ul"
        className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-4 lg:gap-x-0 xl:col-span-8"
      >
        {INDICATORS.map(({ label, note, icon: Icon }, index) => (
          <li
            key={label}
            data-reveal-item
            className={
              "flex flex-col gap-5 border-cream/10 py-2 lg:px-7 " +
              (index > 0 ? "lg:border-l " : "") +
              (index === 0 ? "lg:pl-0" : "")
            }
          >
            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gold/38 text-gold">
              <Icon className="h-[19px] w-[19px]" />
            </span>
            <span className="flex flex-col gap-2">
              <span className="text-[15px] text-cream">{label}</span>
              <span className="body-sm max-w-[20ch] text-[13px]">{note}</span>
            </span>
          </li>
        ))}
      </RevealStagger>
    </div>
  );
}
