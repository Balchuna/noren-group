import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { asset } from "@/lib/asset";
import { FEATURED_CASE } from "@/data/cases";

/** Case em destaque — texto, imagem e a leitura do trabalho em quatro blocos. */
export function CaseHighlight() {
  return (
    <div className="shell grid grid-cols-1 gap-y-12 py-[clamp(56px,9vw,124px)] lg:grid-cols-12 lg:gap-x-12">
      <div className="lg:col-span-4">
        <SectionLabel className="mb-8">{FEATURED_CASE.label}</SectionLabel>
        <RevealLines as="h2" lines={[FEATURED_CASE.name]} className="display display-xl text-cream" />
        <Reveal delay={0.1}>
          <p className="micro mt-5 text-[10px] text-gold/85">
            {FEATURED_CASE.cuisine} <span className="text-cream/30">|</span> {FEATURED_CASE.city}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="body-sm mt-8 max-w-[40ch] text-[14.5px]">{FEATURED_CASE.summary}</p>
        </Reveal>
      </div>

      <div className="lg:col-span-5">
        <ParallaxImage
          src={asset(FEATURED_CASE.image)}
          alt={FEATURED_CASE.name}
          className="aspect-[4/5] w-full lg:aspect-[4/5]"
          amount={7}
        />
      </div>

      <div className="flex flex-col lg:col-span-3">
        {FEATURED_CASE.blocks.map((block, index) => (
          <Reveal
            key={block.label}
            delay={index * 0.06}
            className={
              "flex flex-col gap-3 py-6 first:pt-0 " + (index > 0 ? "border-t border-cream/10" : "")
            }
          >
            <span className="micro text-[9.5px] text-gold">{block.label}</span>
            <span className="body-sm max-w-[30ch] text-[13px]">{block.text}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
