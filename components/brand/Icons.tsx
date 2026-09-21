/**
 * Ícones de linha fina desenhados à mão para o visualizer.
 * Traço 1.1 — nada de biblioteca de ícone com peso visual pesado.
 */
type IconProps = { className?: string };

const base = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

export const IconSearch = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="10.6" cy="10.6" r="6.1" />
    <line x1="15.2" y1="15.2" x2="20" y2="20" />
  </svg>
);

export const IconDoc = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M6.5 3.5h7.2l4.3 4.3v12.7H6.5z" />
    <path d="M13.7 3.5v4.3h4.3" />
    <line x1="9.4" y1="11.4" x2="15" y2="11.4" />
    <line x1="9.4" y1="14.6" x2="15" y2="14.6" />
  </svg>
);

export const IconGear = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.6v2.1M12 18.3v2.1M20.4 12h-2.1M5.7 12H3.6M18 6l-1.5 1.5M7.5 16.5 6 18M18 18l-1.5-1.5M7.5 7.5 6 6" />
  </svg>
);

export const IconChart = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <line x1="5.4" y1="19" x2="5.4" y2="13.4" />
    <line x1="12" y1="19" x2="12" y2="6.4" />
    <line x1="18.6" y1="19" x2="18.6" y2="10.2" />
  </svg>
);

export const IconArrowUp = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <line x1="12" y1="19" x2="12" y2="5.6" />
    <path d="M7 10.6 12 5.6l5 5" />
  </svg>
);

export const IconArrowDown = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <line x1="12" y1="5" x2="12" y2="18.4" />
    <path d="M7 13.4 12 18.4l5-5" />
  </svg>
);

export const IconMinus = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <line x1="5.6" y1="12" x2="18.4" y2="12" />
  </svg>
);

export const IconPin = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 21s6.4-5.5 6.4-10.3A6.4 6.4 0 0 0 5.6 10.7C5.6 15.5 12 21 12 21Z" />
    <circle cx="12" cy="10.4" r="2.2" />
  </svg>
);

export const IconStar = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="m12 4.4 2.35 4.9 5.25.72-3.85 3.66.94 5.24L12 16.44 7.31 18.92l.94-5.24L4.4 10.02l5.25-.72z" />
  </svg>
);

export const IconPulse = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M3.4 13.6h3.3l2.2-5.6 3 10.6 2.4-7.2 1.6 3.4h4.7" />
  </svg>
);

export const IconPeople = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="9.4" cy="9.6" r="3.1" />
    <path d="M3.8 19.2c0-3.1 2.5-5.2 5.6-5.2s5.6 2.1 5.6 5.2" />
    <path d="M16 7.2a3 3 0 0 1 0 5.8M17.2 14.4c2.1.5 3.4 2.2 3.4 4.4" />
  </svg>
);

export const IconChef = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M7.2 12.2a3.4 3.4 0 1 1 .5-6.7 4.2 4.2 0 0 1 8.6 0 3.4 3.4 0 1 1 .5 6.7z" />
    <path d="M7.2 12.2v6.1h9.6v-6.1" />
    <line x1="7.2" y1="15.2" x2="16.8" y2="15.2" />
  </svg>
);

export const IconTag = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12.6 3.6H20v7.4l-8.8 8.8a1.6 1.6 0 0 1-2.3 0l-5.1-5.1a1.6 1.6 0 0 1 0-2.3z" />
    <circle cx="16.4" cy="7.2" r="1.15" />
  </svg>
);

export const IconDiamond = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 3.6 20.4 12 12 20.4 3.6 12z" />
  </svg>
);

export const IconLeaf = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M20.4 3.6c0 9.1-5.3 14-11.9 14H5.6c0-8.7 5.4-14 14.8-14Z" />
    <path d="M4 20.4c1.9-4.2 5-7.1 9.1-8.9" />
  </svg>
);

export const IconQuote = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M9.4 5.6C6.3 6.9 4.6 9.4 4.6 12.6c0 3.1 1.6 5 4 5 1.9 0 3.3-1.3 3.3-3.2 0-1.8-1.2-3-2.9-3-.3 0-.6 0-.8.1.3-1.7 1.5-3.1 3.3-4z" />
    <path d="M18.6 5.6c-3.1 1.3-4.8 3.8-4.8 7 0 3.1 1.6 5 4 5 1.9 0 3.3-1.3 3.3-3.2 0-1.8-1.2-3-2.9-3-.3 0-.6 0-.8.1.3-1.7 1.5-3.1 3.3-4z" />
  </svg>
);

export const IconLock = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="5" y="10.4" width="14" height="9.6" rx="1.2" />
    <path d="M8.2 10.4V7.8a3.8 3.8 0 0 1 7.6 0v2.6" />
  </svg>
);

export const IconSend = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4.4 11.6 19.6 4.4 12.4 19.6l-1.8-6.2z" />
    <path d="M10.6 13.4 19.6 4.4" />
  </svg>
);

export const IconCalendar = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="4" y="5.6" width="16" height="14.4" rx="1.4" />
    <line x1="4" y1="10" x2="20" y2="10" />
    <line x1="8.4" y1="3.6" x2="8.4" y2="7" />
    <line x1="15.6" y1="3.6" x2="15.6" y2="7" />
  </svg>
);

export const IconChat = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M20.4 12.4c0 4-3.8 7.2-8.4 7.2a9.6 9.6 0 0 1-2.6-.35L5 20.6l1.1-3.4a6.9 6.9 0 0 1-2.5-4.8C3.6 8.4 7.4 5.2 12 5.2s8.4 3.2 8.4 7.2Z" />
  </svg>
);

export const ICON_BY_NAME = {
  estrategia: IconTag,
  marca: IconChef,
  crescimento: IconChart,
  experiencia: IconPeople,
  inteligencia: IconPulse,
  retencao: IconStar,
  pin: IconPin,
  star: IconStar,
  pulse: IconPulse,
  search: IconSearch,
  people: IconPeople,
  chart: IconChart,
} as const;

export type IconName = keyof typeof ICON_BY_NAME;
