import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NorenButton } from "@/components/ui/Button";
import { asset } from "@/lib/asset";

/** Faixa full-bleed de fechamento — imagem, frase e um único CTA. */
export function CtaBand({
  label,
  lines,
  lede,
  action,
  image,
  sideNote,
  italicLastLine = false,
}: {
  label: string;
  lines: string[];
  lede?: string;
  action: { label: string; href: string };
  image: string;
  sideNote?: string;
  italicLastLine?: boolean;
}) {
  return (
    <section className="relative overflow-hidden">
      <img
        src={asset(image)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span
        className="veil"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.8) 45%, rgba(10,10,10,0.45) 100%)",
        }}
      />
      <span className="veil" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9), transparent 60%)" }} />

      <div className="shell relative z-10 grid grid-cols-1 items-end gap-10 py-[clamp(72px,12vw,168px)] lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionLabel className="mb-7">{label}</SectionLabel>
          <RevealLines
            as="h2"
            lines={lines}
            className="display display-xl max-w-[22ch] text-cream"
            lineClassName={italicLastLine ? "last:italic last:[font-style:italic]" : ""}
          />
          {lede ? (
            <Reveal delay={0.12}>
              <p className="lede mt-6 max-w-[46ch]">{lede}</p>
            </Reveal>
          ) : null}
        </div>

        <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:items-end">
          <NorenButton href={action.href}>{action.label}</NorenButton>
          {sideNote ? (
            <span className="micro max-w-[22ch] text-left text-[10px] text-cream/45 lg:text-right">{sideNote}</span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
