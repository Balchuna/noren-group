import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionLabel";

export function SectionIntro({
  label,
  aside,
  lines,
  lede,
  className = "",
  width = "max-w-[20ch]",
  children,
}: {
  label?: string;
  aside?: string;
  lines: string[];
  lede?: string;
  className?: string;
  width?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={className}>
      {label ? <SectionHead label={label} aside={aside} className="mb-8 lg:mb-11" /> : null}
      <RevealLines as="h2" lines={lines} className={"display display-xl text-cream " + width} />
      {lede ? (
        <Reveal delay={0.15}>
          <p className="lede mt-7">{lede}</p>
        </Reveal>
      ) : null}
      {children}
    </div>
  );
}
