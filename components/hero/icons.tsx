// Monoline outline icons — currentColor, 1.6px stroke, square caps/joins.
// Paths match the DS Icon set used in Machin Hero 2A Live.

type IconProps = { size?: number; className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

export function ArrowRight({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 12h14" {...base} />
      <path d="m12 5 7 7-7 7" {...base} />
    </svg>
  );
}

export function ChevronDown({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="m6 9 6 6 6-6" {...base} />
    </svg>
  );
}

export function ChevronUp({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="m18 15-6-6-6 6" {...base} />
    </svg>
  );
}
