import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SignalDemo } from "@/components/sections/SignalDemo";
import { IconColumns } from "@/components/sections/IconColumns";
import { CtaBand } from "@/components/sections/CtaBand";
import { IconChart, IconChef, IconLeaf, IconPeople, IconPin, IconPulse, IconSearch, IconStar } from "@/components/brand/Icons";
import { SIGNAL_INSIGHTS, SIGNAL_JOURNEYS } from "@/data/signal";

export const metadata: Metadata = {
  title: "Inteligência — Noren Group",
};

const INSIGHT_ICONS = [IconStar, IconChart, IconSearch, IconPulse];
const JOURNEY_ICONS = [IconLeaf, IconPeople, IconChef, IconPin];

export default function InteligenciaPage() {
  return (
    <>
      <Hero
        label="Inteligência"
        lines={["Veja seu restaurante", "como um sistema."]}
        lede="Entenda sua presença, percepção, descoberta e potencial de margem com dados, contexto e visão estratégica."
        image="/images/hero-inteligencia.jpg"
        primary={{ label: "Iniciar diagnóstico", href: "/contato" }}
        sideNote="Inteligência para restaurantes que querem mais."
        bottomNote="Dados reais. Decisões mais claras."
        size="mid"
      />

      <section className="section">
        <SignalDemo />
      </section>

      <section className="section">
        <IconColumns
          label="Insights que abrem caminhos"
          aside="Da leitura à decisão"
          lines={["Da análise", "à ação."]}
          lede="Transformamos dados em insights práticos para você tomar melhores decisões e acelerar o crescimento do seu restaurante."
          items={SIGNAL_INSIGHTS.map((item, index) => ({
            icon: INSIGHT_ICONS[index % INSIGHT_ICONS.length],
            title: item.title,
            text: item.text,
          }))}
        />
      </section>

      <section className="section">
        <IconColumns
          label="Diferentes jornadas. O mesmo objetivo."
          lines={["Soluções para", "cada momento."]}
          lede="Metodologia adaptada à sua realidade, com o mesmo foco: resultados."
          items={SIGNAL_JOURNEYS.map((item, index) => ({
            icon: JOURNEY_ICONS[index % JOURNEY_ICONS.length],
            title: item.title,
            text: item.text,
          }))}
        />
      </section>

      <CtaBand
        label="Próximo passo"
        lines={["Comece com clareza."]}
        lede="Um diagnóstico estratégico, gratuito e sem compromisso, para entender o momento do seu restaurante e os próximos passos."
        action={{ label: "Iniciar diagnóstico", href: "/contato" }}
        image="/images/banda-prato-escuro.jpg"
        sideNote="Restaurantes extraordinários começam com boas perguntas."
      />
    </>
  );
}
