import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CaseHighlight } from "@/components/sections/CaseHighlight";
import { CaseResults } from "@/components/sections/CaseResults";
import { CaseCard, CaseCardGridHeader } from "@/components/sections/CaseCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger } from "@/components/motion/Reveal";
import { CASE_RESULT_ROWS, OTHER_CASES } from "@/data/cases";

export const metadata: Metadata = {
  title: "Cases — Noren Group",
};

export default function CasesPage() {
  return (
    <>
      <Hero
        label="Cases reais"
        lines={["Quando a marca cresce,", "a margem também", "pode crescer."]}
        lede="Ajudamos restaurantes a crescer de forma sustentável através de posicionamento, experiência, descoberta e retenção."
        image="/images/hero-cases.jpg"
        sideNote="Mais que restaurantes. Legados."
        bottomNote="Marcas reais. Resultados reais."
        size="mid"
      />

      <section className="section">
        <CaseHighlight />
      </section>

      <section className="section">
        <CaseResults />

        <div className="shell rule-soft-t">
          <RevealStagger as="ul" className="flex flex-col py-4">
            {CASE_RESULT_ROWS.map((row) => (
              <li
                key={row.label}
                data-reveal-item
                className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/8 py-6 last:border-b-0"
              >
                <span className="text-[13.5px] text-cream/70">{row.label}</span>
                <span className="flex items-center gap-5">
                  <span className="text-[13.5px] tabular-nums text-cream/35 line-through">{row.before}</span>
                  <span className="h-px w-7 bg-gold/60" />
                  <span className="display text-[22px] tabular-nums text-cream">{row.after}</span>
                </span>
              </li>
            ))}
          </RevealStagger>
          <Reveal>
            <p className="pb-10 pt-2 text-[11.5px] text-cream/30">
              Valores ilustrativos. Este visualizer não apresenta resultados reais da Noren.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell py-[clamp(56px,9vw,124px)]">
          <CaseCardGridHeader aside="Ver todos os cases" />
          <RevealStagger as="div" className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {OTHER_CASES.map((item, index) => (
              <CaseCard key={item.slug} item={item} index={index} />
            ))}
          </RevealStagger>
        </div>
      </section>

      <CtaBand
        label="O próximo case pode ser o seu"
        lines={["Boas decisões constroem", "marcas duradouras."]}
        lede="Vamos avaliar o potencial do seu restaurante, sem compromisso."
        action={{ label: "Solicitar diagnóstico", href: "/contato" }}
        image="/images/banda-jantar.jpg"
      />
    </>
  );
}
