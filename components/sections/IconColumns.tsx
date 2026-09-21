import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal, RevealStagger } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionLabel";

export type IconColumnItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
};

/** Bloco recorrente: título editorial à esquerda, colunas com ícone à direita. */
export function IconColumns({
  label,
  aside,
  lines,
  lede,
  items,
  columns = 4,
  italicNote,
}: {
  label: string;
  aside?: string;
  lines: string[];
  lede?: string;
  items: IconColumnItem[];
  columns?: 3 | 4;
  italicNote?: string;
}) {
  return (
    <div className="shell py-[clamp(56px,9vw,128px)]">
      <SectionHead label={label} aside={aside} className="mb-9 lg:mb-14" />

      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-4">
          <RevealLines as="h2" lines={lines} className="display display-xl max-w-[15ch] text-cream" />
          {lede ? (
            <Reveal delay={0.12}>
              <p className="lede mt-6 max-w-[36ch]">{lede}</p>
            </Reveal>
          ) : null}
          {italicNote ? (
            <Reveal delay={0.2}>
              <p className="italic-serif mt-8 max-w-[20ch] text-[19px] leading-[1.35] text-cream/80 lg:text-[21px]">
                {italicNote}
              </p>
              <span className="mt-5 block h-px w-10 bg-gold/60" />
            </Reveal>
          ) : null}
        </div>

        <RevealStagger
          as="ul"
          className={
            "grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:gap-x-0 " +
            (columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")
          }
        >
          {items.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              data-reveal-item
              className={
                "flex flex-col border-cream/10 lg:px-7 " +
                (index > 0 ? "lg:border-l " : "lg:pl-0") +
                (index === items.length - 1 ? " lg:pr-0" : "")
              }
            >
              <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-gold/32 text-gold">
                <Icon className="h-[19px] w-[19px]" />
              </span>
              <h3 className="mt-5 max-w-[22ch] text-[14.5px] leading-[1.45] text-cream">{title}</h3>
              <p className="body-sm mt-3 max-w-[26ch] text-[13px]">{text}</p>
            </li>
          ))}
        </RevealStagger>
      </div>
    </div>
  );
}
