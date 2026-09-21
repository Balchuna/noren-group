import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactForm } from "@/components/sections/ContactForm";
import { FinalBand } from "@/components/sections/FinalBand";

export const metadata: Metadata = {
  title: "Contato — Noren Group",
};

export default function ContatoPage() {
  return (
    <>
      <Hero
        label="Contato"
        lines={["Vamos descobrir onde", "existe valor sendo", "deixado na mesa."]}
        lede="Inicie uma conversa com o nosso time. Entenda como podemos ajudar o seu restaurante a crescer de forma sustentável, com mais lucro e previsibilidade."
        image="/images/hero-contato.jpg"
        sideNote="Restaurantes mais fortes constroem um futuro maior."
        size="mid"
      />

      <section className="section">
        <ContactForm />
      </section>

      <FinalBand
        lines={["Construindo marcas.", "Protegendo margens."]}
        note="Noren Group — estratégia, marca e crescimento para restaurantes"
        image="/images/banda-jantar.jpg"
      />
    </>
  );
}
