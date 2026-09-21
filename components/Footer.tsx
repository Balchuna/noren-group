import { FOOTER_LINKS } from "@/data/navigation";
import { Logotype } from "@/components/brand/Logotype";

export function Footer() {
  return (
    <footer className="section bg-ink">
      <div className="shell flex flex-col gap-10 py-14 md:flex-row md:items-center md:justify-between lg:py-16">
        <Logotype size="sm" className="self-start" />

        <p className="micro text-cream/45">Construindo marcas. Protegendo margens.</p>

        <ul className="flex items-center gap-7">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                data-cursor="link"
                className="link-underline text-[12.5px] text-cream/62 transition-colors duration-500 hover:text-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="rule-soft-t">
        <div className="shell flex flex-col gap-2 py-5 text-[11px] text-cream/28 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Noren Group — visualizer conceitual</span>
          <span>Projeto demonstrativo. Cases e números são fictícios.</span>
        </div>
      </div>
    </footer>
  );
}
