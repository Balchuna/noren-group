import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { NorenSystem } from "@/components/sections/NorenSystem";
import { Storytelling } from "@/components/sections/Storytelling";
import { ThreeFrentes } from "@/components/sections/ThreeFrentes";
import { Principles } from "@/components/sections/Principles";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Método — Noren Group",
};

export default function MetodoPage() {
  return (
    <>
      <Hero
        label="Nosso método"
        lines={["Estratégia sem", "clareza vira ruído."]}
        lede="A Noren organiza leitura, decisão e execução para transformar restaurantes em ativos mais fortes."
        image="/images/hero-metodo.jpg"
        primary={{ label: "Falar com a Noren", href: "/contato" }}
        secondary={{ label: "Conheça o método", href: "/metodo" }}
        sideNote="Restaurantes extraordinários começam com clareza."
        bottomNote="Conhecimento. Direção. Resultados reais."
        size="mid"
      />

      <section className="section">
        <NorenSystem />
      </section>

      <section className="section">
        <Storytelling />
      </section>

      <section className="section">
        <ThreeFrentes />
      </section>

      <section className="section">
        <Principles />
      </section>

      <CtaBand
        label="Vamos construir o próximo capítulo"
        lines={["Seu restaurante não precisa", "de mais uma agência.", "Precisa de direção."]}
        action={{ label: "Falar com a Noren", href: "/contato" }}
        image="/images/banda-jantar.jpg"
        sideNote="Marcas que servem ao futuro maior."
        italicLastLine
      />
    </>
  );
}
