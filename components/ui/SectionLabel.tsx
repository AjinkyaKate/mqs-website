type SectionLabelProps = {
  children: React.ReactNode;
  detail?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionLabel({ children, detail, tone = "light", className = "" }: SectionLabelProps) {
  const primary = tone === "dark" ? "rgba(255,255,255,.94)" : "#0B2A3A";
  const secondary = tone === "dark" ? "rgba(255,255,255,.66)" : "#5F7688";

  return (
    <div className={`inline-flex items-center self-start whitespace-nowrap ${className}`} style={{ gap: "clamp(6px,.7vw,9px)" }}>
      <span className="text-[10px] font-medium uppercase leading-none tracking-[.12em] md:text-[11px] lg:text-[12px]" style={{ color: primary }}>
        {children}
      </span>
      {detail && (
        <>
          <span aria-hidden="true" className="text-[10px] leading-none md:text-[11px] lg:text-[12px]" style={{ color: secondary }}>·</span>
          <span className="text-[10px] font-medium uppercase leading-none tracking-[.12em] md:text-[11px] lg:text-[12px]" style={{ color: secondary }}>
            {detail}
          </span>
        </>
      )}
    </div>
  );
}
