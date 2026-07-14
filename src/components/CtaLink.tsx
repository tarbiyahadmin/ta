import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaLinkProps {
  label: string;
  to: string;
  isExternal?: boolean;
  variant?: "primary" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
  compact?: boolean;
  className?: string;
  disabled?: boolean;
}

export function CtaLink({
  label,
  to,
  isExternal = false,
  variant = "primary",
  size = "lg",
  compact = false,
  className = "",
  disabled = false,
}: CtaLinkProps) {
  const isMailOrTel = /^mailto:|^tel:/i.test(to);
  const isHttpUrl = /^https?:\/\//i.test(to);
  const isExternalUrl = isExternal || isHttpUrl;

  const baseCompact = "rounded-xl px-7 py-4 text-sm font-semibold min-h-[3rem]";
  const baseProminent =
    "rounded-xl px-10 py-6 md:px-12 md:py-7 text-sm md:text-[0.95rem] font-semibold min-h-[3.4rem]";

  const gradient =
    variant === "accent" ? "btn-brand-gradient-secondary" : "btn-brand-gradient";

  const buttonClass = cn(compact ? baseCompact : baseProminent, gradient, className);

  if (disabled) {
    return (
      <Button size={size} className={buttonClass} disabled aria-disabled>
        {label}
      </Button>
    );
  }

  if (isMailOrTel) {
    return (
      <a href={to}>
        <Button size={size} className={buttonClass}>
          {label}
        </Button>
      </a>
    );
  }

  if (isExternalUrl && isHttpUrl) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer">
        <Button size={size} className={buttonClass}>
          {label}
        </Button>
      </a>
    );
  }

  return (
    <Link to={to}>
      <Button size={size} className={buttonClass}>
        {label}
      </Button>
    </Link>
  );
}
