import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { PageSeo } from "@/components/PageSeo";
import { PageTitle } from "@/components/layout/PageTitle";
import { JotformEmbed } from "@/components/forms/JotformEmbed";
import { getJotformEmbedUrl } from "@/lib/jotform";
import type { SeoData } from "@/lib/sanityQueries";
import { SEO_TITLE_SUFFIX } from "@/lib/brand";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export interface FormPageShellProps {
  title: string;
  intro?: unknown[];
  /** Raw Jotform URL or ID from CMS */
  embedSource?: string;
  seo?: SeoData | null;
  missingEmbedMessage?: string;
}

/**
 * Shared layout for dedicated form routes: page title stack, optional intro, embedded iframe.
 */
export function FormPageShell({
  title,
  intro,
  embedSource,
  seo,
  missingEmbedMessage = "This form is not available right now. Please try again later or contact us.",
}: FormPageShellProps) {
  const embedUrl = getJotformEmbedUrl(embedSource);

  return (
    <main className="relative overflow-hidden bg-background py-12 md:py-16 lg:py-20">
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${title}${SEO_TITLE_SUFFIX}`} />
      <div className="container relative z-10 w-full max-w-none px-3 sm:px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8 md:mb-10">
          <PageTitle title={title} />
        </motion.div>

        {intro && intro.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="prose prose-lg prose-editorial mb-8 max-w-none text-center prose-p:text-muted-foreground md:text-left"
          >
            <PortableText value={intro} />
          </motion.div>
        ) : null}

        {embedUrl ? (
          <div className="w-full overflow-hidden">
            <JotformEmbed src={embedUrl} title={title} />
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">{missingEmbedMessage}</p>
        )}
      </div>
    </main>
  );
}
