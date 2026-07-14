import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CtaBandHeadingProps {
  children: ReactNode;
  className?: string;
}

/** CTA band title — soft vertical fill on letterforms, no decorative streak. */
export function CtaBandHeading({ children, className }: CtaBandHeadingProps) {
  return <h2 className={cn("heading-cta-band", className)}>{children}</h2>;
}
