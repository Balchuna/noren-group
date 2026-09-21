export function SectionLabel({
  children,
  dash = "after",
  className = "",
}: {
  children: React.ReactNode;
  dash?: "after" | "before" | "none";
  className?: string;
}) {
  return (
    <span className={"inline-flex items-center gap-4 text-gold " + className}>
      {dash === "before" ? <span className="h-px w-9 shrink-0 bg-current opacity-55" /> : null}
      <span className="label whitespace-nowrap">{children}</span>
      {dash === "after" ? <span className="h-px w-9 shrink-0 bg-current opacity-55" /> : null}
    </span>
  );
}

/** Cabeçalho de seção: rótulo dourado à esquerda, contraponto à direita. */
export function SectionHead({
  label,
  aside,
  className = "",
}: {
  label: string;
  aside?: string;
  className?: string;
}) {
  return (
    <div className={"flex items-baseline justify-between gap-6 " + className}>
      <SectionLabel>{label}</SectionLabel>
      {aside ? (
        <span className="hidden text-right sm:block">
          <SectionLabel dash="before">{aside}</SectionLabel>
        </span>
      ) : null}
    </div>
  );
}
