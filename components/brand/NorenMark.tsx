/**
 * Simbolo Noren - duas cortinas vermelhas com uma fresta central por onde
 * passa a luz. SVG puro, sem dependencia externa.
 */
export function NorenMark({
  className = "",
  title = "Noren",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="8" width="19.5" height="48" fill="#9e2b18" />
      <rect x="38.5" y="8" width="19.5" height="48" fill="#9e2b18" />
      <g stroke="#ba965b" strokeWidth="1.5" strokeLinecap="round" opacity="0.92">
        <line x1="32" y1="55" x2="32" y2="24" />
        <line x1="32" y1="55" x2="25.4" y2="27.6" />
        <line x1="32" y1="55" x2="38.6" y2="27.6" />
        <line x1="32" y1="55" x2="20.6" y2="36" />
        <line x1="32" y1="55" x2="43.4" y2="36" />
      </g>
    </svg>
  );
}
