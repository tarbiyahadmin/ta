import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { LocalPhoto } from "@/lib/localPhoto";

type EditorialVariant = "hero" | "feature" | "inline" | "band";

interface EditorialImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | LocalPhoto;
  variant?: EditorialVariant;
  wrapperClassName?: string;
}

const variantWrapper: Record<EditorialVariant, string> = {
  hero: "editorial-image editorial-image--hero",
  feature: "editorial-image editorial-image--feature",
  inline: "editorial-image editorial-image--inline",
  band: "editorial-image editorial-image--band",
};

function resolveLocal(src: string | LocalPhoto | undefined) {
  if (!src) return {};
  if (typeof src === "string") return { src };
  return {
    src: src.src,
    srcSet: src.srcSet,
    width: src.width,
    height: src.height,
  };
}

/**
 * Borderless photography integrated via masks, gradients, and soft edge fades.
 * Hero images load eagerly; others default to lazy + async decode.
 */
export function EditorialImage({
  variant = "feature",
  wrapperClassName,
  className,
  alt = "",
  src,
  loading,
  decoding,
  sizes,
  srcSet,
  width,
  height,
  fetchPriority,
  ...imgProps
}: EditorialImageProps) {
  const isHero = variant === "hero";
  const resolved = resolveLocal(src);
  return (
    <div className={cn(variantWrapper[variant], wrapperClassName)}>
      <img
        alt={alt}
        src={resolved.src}
        srcSet={srcSet ?? resolved.srcSet}
        sizes={
          sizes ??
          (variant === "band"
            ? "(max-width: 1024px) 100vw, 50vw"
            : "(max-width: 768px) 100vw, min(40rem, 50vw)")
        }
        width={width ?? resolved.width}
        height={height ?? resolved.height}
        loading={loading ?? (isHero ? "eager" : "lazy")}
        decoding={decoding ?? "async"}
        fetchPriority={fetchPriority ?? (isHero ? "high" : undefined)}
        className={cn("editorial-image__photo", className)}
        {...imgProps}
      />
    </div>
  );
}
