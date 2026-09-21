import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Beliefs } from "@/components/sections/Beliefs";
import { NorenEcosystem } from "@/components/sections/NorenEcosystem";
import { IconColumns } from "@/components/sections/IconColumns";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { IconChart, IconDiamond, IconLeaf, IconPeople, IconSearch } from "@/components/brand/Icons";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Sobre — Noren Group",
};

const COMO_PENSAMOS = [
  { icon: IconLeaf, title: "Longo prazo", text: "Tomamos decisões pensando em valor, não em movimento." },
  { icon: IconChart, title: "Dados com contexto", text: "Analisamos sempre com uma leitura do negócio." },
  { icon: IconSearch, title: "Foco em resultados", text: "Estratégia só faz sentido quando gera valor real." },
  { icon: IconPeople, title: "Parceria verdadeira", text: "Crescemos junto com quem senta à mesa." },
];

export default function SobrePage() {
  return (
    <>
      <Hero
        label="Sobre Noren Group"
        lines={["Empresas duradouras", "não nascem prontas.", "Evoluem."]}
        lede="Estratégia, clareza e construção de valor para restaurantes que pensam no longo prazo."
        image="/images/hero-sobre.jpg"
        primary={{ label: "Solicitar diagnóstico", href: "/contato" }}
        secondary={{ label: "Nossa história", href: "/sobre" }}
        sideNote="Mais que restaurantes. Legados."
        size="mid"
      />

      <section className="section">
        <Beliefs />
      </section>

      <section className="section">
        <div className="shell grid grid-cols-1 gap-y-12 py-[clamp(56px,9vw,124px)] lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-5">
            <ParallaxImage
              src={asset("/images/noren-cortina.jpg")}
              alt="Cortina noren na entrada de um estabelecimento"
              className="aspect-[4/3] w-full"
              amount={7}
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel className="mb-8">O significado de Noren</SectionLabel>
            <RevealLines
              as="h2"
              lines={["Uma entrada", "é um convite."]}
              className="display display-xl max-w-[16ch] text-cream"
            />
            <Reveal delay={0.12}>
              <p className="body-sm mt-7 max-w-[46ch] text-[14.5px]">
                No Japão, o noren marca a entrada de um estabelecimento e simboliza identidade, confiança e
                reputação. Mais que uma cortina, é um convite: representa a passagem para algo maior, o lugar
                onde tradição e futuro se encontram.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="body-sm mt-5 max-w-[46ch] text-[14.5px]">
                É essa a nossa inspiração — e é isso que construímos para cada restaurante que entra no
                nosso sistema.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <span className="mt-9 flex items-center gap-4 text-gold">
                <IconDiamond className="h-[13px] w-[13px]" />
                <span className="micro text-[9.5px]">Tradição que inspira um futuro maior</span>
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-ink">
        <NorenEcosystem />
      </section>

      <section className="section">
        <IconColumns
          label="Como pensamos"
          aside="Um método. Resultados reais."
          lines={["Princípios que", "não mudam."]}
          items={COMO_PENSAMOS}
        />
      </section>

      <CtaBand
        label="O próximo capítulo"
        lines={["Vamos construir", "algo duradouro."]}
        lede="Estratégia. Marca. Crescimento. Legado."
        action={{ label: "Solicitar diagnóstico", href: "/contato" }}
        image="/images/banda-jardim.jpg"
      />
    </>
  );
}
