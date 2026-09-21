import { NorenMark } from "./NorenMark";

/**
 * Logotipo NOREN GROUP - serifada em caixa alta com tracking largo,
 * "GROUP" em sans minusculo entre dois tracos dourados.
 */
export function Logotype({
  className = "",
  size = "md",
  showGroup = true,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  showGroup?: boolean;
}) {
  const word = {
    sm: "text-[13px] tracking-[0.34em]",
    md: "text-[19px] tracking-[0.36em] sm:text-[21px]",
    lg: "text-[26px] tracking-[0.38em] sm:text-[30px]",
  }[size];

  const group = {
    sm: "text-[6.5px] tracking-[0.3em]",
    md: "text-[8px] tracking-[0.32em]",
    lg: "text-[9px] tracking-[0.34em]",
  }[size];

  return (
    <span className={"inline-flex flex-col items-center gap-[5px] " + className}>
      <span className={"display leading-none text-cream " + word} style={{ paddingLeft: "0.36em" }}>
        NOREN
      </span>
      {showGroup ? (
        <span className="flex w-full items-center gap-2 text-gold">
          <span className="h-px flex-1 bg-current opacity-70" />
          <span className={"font-sans font-medium uppercase " + group}>Group</span>
          <span className="h-px flex-1 bg-current opacity-70" />
        </span>
      ) : null}
    </span>
  );
}

export function LogotypeInline({ className = "" }: { className?: string }) {
  return (
    <span className={"inline-flex items-center gap-3 " + className}>
      <NorenMark className="h-5 w-auto shrink-0" />
      <Logotype size="sm" />
    </span>
  );
}
