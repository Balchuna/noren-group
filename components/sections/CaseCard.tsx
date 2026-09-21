import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import type { CaseStudy } from "@/data/cases";

/** Card de case: quase só imagem, nome e uma linha de contexto. */
export function CaseCard({ item, index }: { item: CaseStudy; index: number }) {
  return (
    <article
      data-reveal-item
      data-cursor="link"
      className="group relative flex flex-col"
      style={{ transitionDelay: index * 60 + "ms" }}
    >
      <div className="photo relative aspect-[4/3] w-full">
        <img
          src={asset(item.image)}
          alt={item.name + " — " + item.cuisine}
          loading="lazy"
          decoding="async"
          className="transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
        />
        <span
          className="veil transition-opacity duration-700 group-hover:opacity-80"
          style={{ background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.12) 55%, transparent 100%)" }}
        />
        <span className="absolute right-5 top-5 text-cream/0 transition-colors duration-700 group-hover:text-cream/85">
          <ArrowRight className="h-[9px] w-[19px]" />
        </span>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-6">
          <div className="flex flex-col gap-2">
            <h3 className="display display-md text-cream transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px]">
              {item.name}
            </h3>
            <span className="micro text-[9.5px] text-gold/85">
              {item.cuisine} <span className="text-cream/30">|</span> {item.city}
            </span>
          </div>
        </div>
      </div>
      <p className="body-sm mt-5 max-w-[36ch] text-[13px]">{item.summary}</p>
    </article>
  );
}

export function CaseCardGridHeader({ aside }: { aside?: string }) {
  return (
    <div className="mb-9 flex items-center justify-between gap-6 lg:mb-12">
      <SectionLabel>Outros cases</SectionLabel>
      {aside ? (
        <span className="micro flex items-center gap-3 text-[10px] text-cream/40">
          {aside}
          <ArrowRight className="h-[8px] w-[16px]" />
        </span>
      ) : null}
    </div>
  );
}
