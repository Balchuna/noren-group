export type NavItem = { label: string; href: string; index: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "/", index: "01" },
  { label: "Método", href: "/metodo", index: "02" },
  { label: "Cases", href: "/cases", index: "03" },
  { label: "Inteligência", href: "/inteligencia", index: "04" },
  { label: "Sobre", href: "/sobre", index: "05" },
  { label: "Contato", href: "/contato", index: "06" },
];

export const CTA_LABEL = "Solicitar diagnóstico";
export const CTA_HREF = "/contato";

export const FOOTER_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", external: true },
  { label: "Instagram", href: "https://www.instagram.com/", external: true },
  { label: "Contato", href: "/contato", external: false },
];
