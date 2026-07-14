import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type EditorialVariant = "hero" | "feature" | "inline" | "band";

interface EditorialImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  variant?: EditorialVariant;
  wrapperClassName?: string;
}

const variantWrapper: Record<EditorialVariant, string> = {
  hero: "editorial-image editorial-image--hero",
  feature: "editorial-image editorial-image--feature",
  inline: "editorial-image editorial-image--inline",
  band: "editorial-image editorial-image--band",
};

/**
 * Borderless photography integrated via masks, gradients, and soft edge fades.
 * Hero images load eagerly; others default to lazy + async decode.
 */
export function EditorialImage({
  variant = "feature",
  wrapperClassName,
  className,
  alt = "",
  loading,
  decoding,
  ...imgProps
}: EditorialImageProps) {
  const isHero = variant === "hero";
  return (
    <div className={cn(variantWrapper[variant], wrapperClassName)}>
      <img
        alt={alt}
        loading={loading ?? (isHero ? "eager" : "lazy")}
        decoding={decoding ?? "async"}
        fetchPriority={isHero ? "high" : undefined}
        className={cn("editorial-image__photo", className)}
        {...imgProps}
      />
    </div>
  );
}
