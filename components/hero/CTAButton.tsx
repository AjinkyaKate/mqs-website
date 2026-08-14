import { ArrowRight } from "./icons";

type Props = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "md" | "sm";
  children: React.ReactNode;
  href?: string;
  withArrow?: boolean;
  fullWidth?: boolean;
};

// Ported verbatim from the DS Button (components/core/Button.jsx).
const sizes = {
  md: "h-12 px-6", // control-height 48px, control-pad-x 24px
  sm: "h-10 px-4 text-[13px]",
};
const variants = {
  primary: "bg-[#16C1F3] text-[#08283A] hover:bg-[#0FA5D2]",
  secondary: "bg-white text-[#16C1F3] hover:bg-[#ECECEC]",
  outline:
    "bg-transparent text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] hover:bg-white/10",
  ghost: "bg-transparent text-[#16C1F3] !p-0 !h-auto hover:text-[#0FA5D2]",
};

export default function CTAButton({
  variant = "primary",
  size = "md",
  children,
  href = "#",
  withArrow = false,
  fullWidth = false,
}: Props) {
  return (
    <a
      href={href}
      className={`t-button inline-flex items-center justify-center gap-[10px] rounded-none whitespace-nowrap no-underline transition-colors duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${sizes[size]} ${variants[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
      {withArrow && <ArrowRight size={18} />}
    </a>
  );
}
