import { useEffect } from "react";
import { SITE_NAME } from "@/lib/brand";

interface PageSeoProps {
  title?: string | null;
  description?: string | null;
  fallbackTitle?: string;
}

export function PageSeo({ title, description, fallbackTitle = SITE_NAME }: PageSeoProps) {
  useEffect(() => {
    document.title = title?.trim() || fallbackTitle;

    let meta = document.querySelector('meta[name="description"]');
    if (description?.trim()) {
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description.trim());
    }
  }, [title, description, fallbackTitle]);

  return null;
}
