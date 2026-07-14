import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PageTitleProps {
  title: string;
  eyebrow?: ReactNode;
  subtitle?: ReactNode;
  visuallyHidden?: boolean;
  headingLevel?: "h1" | "h2";
  className?: string;
  wrapperClassName?: string;
}

/** Centered page title stack — headings sit flush in the layout without decorative frames. */
export function PageTitle({
  title,
  eyebrow,
  subtitle,
  visuallyHidden,
  headingLevel = "h1",
  className,
  wrapperClassName,
}: PageTitleProps) {
  if (visuallyHidden) {
    return <h1 className="sr-only">{title}</h1>;
  }

  const HeadingTag = headingLevel;

  return (
    <header className={cn("page-title-block", wrapperClassName)}>
      {eyebrow ? <div className="mb-3 flex justify-center md:mb-4">{eyebrow}</div> : null}
      <HeadingTag className={cn("heading-section", className)}>{title}</HeadingTag>
      {subtitle ? <div className="page-title-subtitle">{subtitle}</div> : null}
    </header>
  );
}
