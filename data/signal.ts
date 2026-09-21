/**
 * DADOS FICTÍCIOS — simulação visual do Noren Signal.
 * Nenhuma consulta é feita. O resultado é fixo e serve só para demonstrar
 * como a leitura seria apresentada ao restaurante.
 */

export const SIGNAL_STEPS = [
  "Mapeando presença local...",
  "Analisando reputação...",
  "Comparando posicionamento...",
  "Identificando oportunidades...",
];

export type SignalMetric = {
  label: string;
  value: string;
  suffix?: string;
  note: string;
  icon: "pin" | "star" | "pulse" | "search" | "people" | "chart";
  trend?: "up" | "down" | "flat";
};

export const SIGNAL_METRICS: SignalMetric[] = [
  { label: "Presença local", value: "72", suffix: "/100", note: "Visibilidade nas buscas e mapas", icon: "pin", trend: "up" },
  { label: "Reputação", value: "68", suffix: "/100", note: "Avaliações e sentimento do público", icon: "star", trend: "up" },
  { label: "Posicionamento", value: "Consistente", note: "Coerência de marca e proposta de valor", icon: "pulse", trend: "flat" },
  { label: "Descoberta", value: "+36", suffix: "%", note: "Crescimento potencial de novos clientes", icon: "search", trend: "up" },
  { label: "Retenção", value: "54", suffix: "/100", note: "Frequência e lealdade de clientes", icon: "people", trend: "up" },
  { label: "Margem potencial", value: "+22", suffix: "%", note: "Oportunidade de aumento na rentabilidade", icon: "chart", trend: "up" },
];

export const SIGNAL_INSIGHTS = [
  {
    title: "O que seu público realmente vê.",
    text: "Construímos com você a leitura de como a casa aparece hoje, além da percepção de quem já senta à mesa.",
  },
  {
    title: "O que está limitando seu crescimento.",
    text: "Gargalos e oportunidades com base no que os números mostram — não em suposição.",
  },
  {
    title: "Onde estão as maiores oportunidades.",
    text: "Ações prioritárias para gerar mais valor, com impacto claro na margem.",
  },
  {
    title: "Como transformar insight em resultado.",
    text: "Direcionamento prático, com começo, meio e prioridade definida.",
  },
];

export const SIGNAL_JOURNEYS = [
  { title: "Restaurantes independentes", text: "Mais visibilidade, mais movimento, mais resultado." },
  { title: "Grupos em expansão", text: "Estrutura para crescer com consistência e controle." },
  { title: "Marcas em reposicionamento", text: "Clareza para evoluir e reconquistar o público certo." },
  { title: "Novos conceitos", text: "Inteligência para lançar com mais margem e tração." },
];
