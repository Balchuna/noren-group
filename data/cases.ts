/**
 * ATENÇÃO — DADOS FICTÍCIOS.
 * Todos os cases, nomes de restaurantes, cidades e números deste arquivo foram
 * criados exclusivamente para o visualizer. Nada aqui representa resultado real
 * da Noren nem cliente real.
 */

export type CaseStudy = {
  slug: string;
  name: string;
  cuisine: string;
  city: string;
  image: string;
  summary: string;
};

export const FEATURED_CASE = {
  slug: "casa-nami",
  label: "Case em destaque",
  name: "Casa Nami",
  cuisine: "Cozinha japonesa contemporânea",
  city: "São Paulo, SP",
  image: "/images/case-nami.jpg",
  summary:
    "Da excelência na cozinha a uma marca ainda mais desejada. A Casa Nami já tinha um produto extraordinário. Nosso trabalho foi transformar essa qualidade em uma marca mais conhecida, mais desejada e mais lucrativa.",
  blocks: [
    { label: "Desafio", text: "Alta qualidade, mas baixa visibilidade e dependência de indicações." },
    { label: "Descoberta", text: "Uma proposta única, pouco explorada na comunicação e no ambiente digital." },
    {
      label: "O que foi feito",
      text: "Reposicionamento de marca, nova experiência digital, estratégia de conteúdo e jornada de reservas.",
    },
    {
      label: "Resultado",
      text: "Mais clientes qualificados, marca fortalecida e crescimento consistente da receita.",
    },
  ],
};

/** Números fictícios, usados apenas para demonstrar o count-up. */
export const FEATURED_RESULTS = [
  { value: 18, prefix: "+", suffix: "%", label: "Ticket médio", note: "Maior valor percebido, maior rentabilidade." },
  { value: 27, prefix: "+", suffix: "%", label: "Reservas orgânicas", note: "Mais demanda sem dependência de mídia paga." },
  { value: 41, prefix: "+", suffix: "%", label: "Busca da marca", note: "Mais pessoas procurando pela Casa Nami." },
  { value: -22, prefix: "−", suffix: "%", label: "Dependência de mídia", note: "Crescimento com menos investimento em ads." },
];

export const OTHER_CASES: CaseStudy[] = [
  {
    slug: "bistro-lume",
    name: "Bistrô Lume",
    cuisine: "Culinária autoral",
    city: "Rio de Janeiro, RJ",
    image: "/images/case-lume.jpg",
    summary: "Casa de bairro com cozinha forte e identidade difusa.",
  },
  {
    slug: "terra-brasa",
    name: "Terra Brasa",
    cuisine: "Parrilla contemporânea",
    city: "Belo Horizonte, MG",
    image: "/images/case-terra.jpg",
    summary: "Alta demanda, margem comprimida por operação e mix.",
  },
  {
    slug: "veluto",
    name: "Veluto",
    cuisine: "Cozinha mediterrânea",
    city: "São Paulo, SP",
    image: "/images/case-veluto.jpg",
    summary: "Produto consistente, descoberta dependente de plataformas.",
  },
];

export const CASE_RESULT_ROWS = [
  { label: "Ticket médio", before: "R$ 186", after: "R$ 219" },
  { label: "Reservas em canais próprios", before: "38%", after: "61%" },
  { label: "Custo de aquisição", before: "R$ 74", after: "R$ 58" },
];
