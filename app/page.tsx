import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { IndicatorRow } from "@/components/sections/IndicatorRow";
import { SystemDiagram } from "@/components/sections/SystemDiagram";
import { NorenSystem } from "@/components/sections/NorenSystem";
import { Manifesto } from "@/components/sections/Manifesto";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { ArrowRight } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Noren Group — Os restaurantes mudaram. As agências, não.",
};

export default function Home() {
  return (
    <>
      <Hero
        label=""
        lines={["Os restaurantes", "mudaram.", "As agências, não."]}
        headlineClassName="uppercase tracking-[0.005em]"
        lede="Estratégia, marca e crescimento para restaurantes construídos para durar."
        image="/images/hero-home.jpg"
        primary={{ label: "Solicitar diagnóstico", href: "/contato" }}
        secondary={{ label: "Ver o método", href: "/metodo" }}
        sideNote="Mais que restaurantes. Legados."
        bottomNote="Construindo marcas. Protegendo margens."
        scrollCue
      />

      <section className="section">
        <IndicatorRow />
      </section>

      <section className="section">
        <div className="shell grid grid-cols-1 gap-y-14 py-[clamp(56px,9vw,128px)] lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <SectionLabel className="mb-8">Visão sistêmica</SectionLabel>
            <RevealLines
              as="h2"
              lines={["Um restaurante", "é um sistema."]}
              className="display display-xl text-cream"
            />
            <Reveal delay={0.12}>
              <p className="body-sm mt-6 max-w-[40ch] text-[14.5px]">
                Marca, cardápio, experiência e retenção não são partes isoladas. São engrenagens de um mesmo
                sistema, que precisa operar em harmonia para gerar resultado de longo prazo.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <TransitionLink
                href="/metodo"
                className="link-underline micro mt-8 inline-flex items-center gap-3 text-[10px] text-cream/70 transition-colors duration-500 hover:text-cream"
              >
                Ver como funciona
                <ArrowRight className="h-[8px] w-[16px]" />
              </TransitionLink>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-6">
            <SystemDiagram />
          </div>

          <div className="flex items-end lg:col-span-2">
            <Reveal delay={0.14}>
              <p className="italic-serif max-w-[18ch] text-[19px] leading-[1.35] text-cream/80 lg:text-[21px]">
                “Restaurantes grandes não têm sorte. Têm sistema.”
              </p>
              <span className="mt-5 block h-px w-9 bg-gold/60" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <NorenSystem />
      </section>

      <Manifesto />

      <CtaBand
        label="O próximo passo"
        lines={["Vamos descobrir onde o seu", "restaurante está deixando", "valor na mesa."]}
        action={{ label: "Solicitar diagnóstico", href: "/contato" }}
        image="/images/banda-prato.jpg"
        sideNote="Marcas que servem ao futuro maior."
      />
    </>
  );
}
