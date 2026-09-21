export type EcosystemIcon =
  | "estrategia"
  | "marca"
  | "crescimento"
  | "experiencia"
  | "inteligencia"
  | "retencao";

export type EcosystemNode = {
  id: string;
  name: string;
  sub: string;
  description: string;
  orbit: number;
  angle: number;
  speed: number;
  depth: number;
  icon: EcosystemIcon;
};

/**
 * Nós do Ecossistema Noren. Órbitas lentas, velocidades dessincronizadas e
 * profundidades diferentes — o sistema precisa parecer vivo, não um carrossel.
 */
export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: "estrategia",
    name: "Estratégia",
    sub: "Posicionamento",
    description: "Clareza para escolher onde competir e como crescer.",
    orbit: 1,
    angle: 148,
    speed: 0.021,
    depth: 1,
    icon: "estrategia",
  },
  {
    id: "marca",
    name: "Marca",
    sub: "Valor percebido",
    description: "Transformamos percepção em valor percebido.",
    orbit: 0,
    angle: 200,
    speed: -0.0305,
    depth: 0,
    icon: "marca",
  },
  {
    id: "crescimento",
    name: "Crescimento",
    sub: "Aquisição",
    description: "Aquisição, retenção e eficiência trabalhando juntas.",
    orbit: 1,
    angle: 328,
    speed: 0.0182,
    depth: 1,
    icon: "crescimento",
  },
  {
    id: "experiencia",
    name: "Experiência",
    sub: "Encaixe",
    description: "Cada ponto de contato reforça ou enfraquece a marca.",
    orbit: 0,
    angle: 20,
    speed: 0.0272,
    depth: 0,
    icon: "experiencia",
  },
  {
    id: "inteligencia",
    name: "Inteligência",
    sub: "Diagnóstico",
    description: "Dados transformados em decisões melhores.",
    orbit: 2,
    angle: 252,
    speed: -0.0124,
    depth: 2,
    icon: "inteligencia",
  },
  {
    id: "retencao",
    name: "Retenção",
    sub: "Recorrência",
    description: "Relacionamentos que aumentam recorrência e valor.",
    orbit: 2,
    angle: 72,
    speed: 0.0138,
    depth: 2,
    icon: "retencao",
  },
];

/** Raios em % do container — elipses, não círculos perfeitos. */
export const ORBIT_GEOMETRY = [
  { rx: 14.2, ry: 9.8 },
  { rx: 27.4, ry: 18.6 },
  { rx: 40.2, ry: 27.2 },
];

export const ECOSYSTEM_AREAS = [
  { name: "Estratégia", note: "Diagnóstico, direção e estrutura para um crescimento sustentável." },
  { name: "Marca", note: "Percepção, narrativa e experiência em cada ponto de contato." },
  { name: "Crescimento", note: "Aquisição, retenção e eficiência operando como um só sistema." },
];
