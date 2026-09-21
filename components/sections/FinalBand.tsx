import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal } from "@/components/motion/Reveal";
import { asset } from "@/lib/asset";

/** Fecho da experiência: imagem, uma frase e silêncio visual. */
export function FinalBand({
  lines,
  note = "Construindo marcas. Protegendo margens.",
  image,
}: {
  lines: string[];
  note?: string;
  image: string;
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
        style={{ background: "linear-gradient(to top, rgba(8,8,8,0.94) 8%, rgba(10,10,10,0.7) 55%, rgba(10,10,10,0.82) 100%)" }}
      />
      <div className="shell relative z-10 flex flex-col items-center gap-8 py-[clamp(84px,14vw,196px)] text-center">
        <RevealLines
          as="h2"
          lines={lines}
          className="display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.06] tracking-[-0.02em] text-cream"
        />
        <Reveal delay={0.14}>
          <span className="micro block text-[10px] text-gold">{note}</span>
        </Reveal>
        <Reveal delay={0.2}>
          <span className="block h-14 w-px bg-gold/45" />
        </Reveal>
      </div>
    </section>
  );
}
