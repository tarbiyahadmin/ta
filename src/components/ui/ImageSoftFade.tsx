import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EditorialVariant = "hero" | "feature" | "inline" | "band";

/** @deprecated Prefer EditorialImage — kept for gradual migration; renders borderless editorial treatment. */
export function ImageSoftFade({
  className,
  children,
  variant = "feature",
}: {
  className?: string;
  children: ReactNode;
  variant?: EditorialVariant;
}) {
  const variantClass =
    variant === "hero"
      ? "editorial-image--hero"
      : variant === "inline"
        ? "editorial-image--inline"
        : variant === "band"
          ? "editorial-image--band"
          : "editorial-image--feature";

  return <div className={cn("editorial-image", variantClass, className)}>{children}</div>;
}
