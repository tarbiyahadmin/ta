import type { ComponentProps } from "react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { getFinancialAidPage, type FinancialAidPage } from "@/lib/sanityQueries";
import { urlForSized } from "@/lib/sanity";
import { resolveCtaButtonTarget } from "@/lib/ctaDestinations";
import { PageSeo } from "@/components/PageSeo";
import { PageTitle } from "@/components/layout/PageTitle";
import { CtaBandHeading } from "@/components/layout/CtaBandHeading";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { CtaLink } from "@/components/CtaLink";
import { ctaBandPhoto, galleryPhotos } from "@/lib/siteAssets";
import { SEO_TITLE_SUFFIX } from "@/lib/brand";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FALLBACK_IMAGES = [...galleryPhotos, galleryPhotos[galleryPhotos.length - 1]];

const DEFAULT_PAGE_TITLE = "Financial Aid";

const DEFAULT_OVERVIEW_TITLE = "Scholarship overview";
const DEFAULT_OVERVIEW_BODY = `The Zayd ibn Thābit Scholarship reflects our belief that financial circumstances should not stand between a sincere learner and sound Qur'anic education. Awards are funded through community generosity and administered with care, discretion, and fairness.

Whether your family is enrolling in weekend enrichment or a structured full-time track, we invite you to explore this pathway and speak with us early in your planning.`;

const DEFAULT_HOW_TITLE = "How it works";
const DEFAULT_STEPS = [
  {
    title: "Request information",
    description: "Reach out to our team with your program interest and timeline.",
  },
  {
    title: "Submit your application",
    description: "Complete the financial assistance application during the published enrollment window. Supporting details are kept confidential.",
  },
  {
    title: "Holistic review",
    description: "A small committee reviews each request with attention to both household circumstances and the student's readiness and commitment.",
  },
  {
    title: "Decision & enrollment",
    description: "You will receive a clear, private response. Awards align with academy policy and may be reviewed periodically.",
  },
];

const DEFAULT_MERIT_TITLE = "Merit and need";
const DEFAULT_MERIT_INTRO =
  "We do not treat financial aid as a single score or checkbox. Need is understood in context—family size, obligations, and seasonal changes—while merit acknowledges effort, character, and steady engagement with learning.";
const DEFAULT_MERIT_BULLETS = [
  "Need is assessed through the confidential materials families provide; only designated staff review this information.",
  "Merit includes attendance, attitude, and progression appropriate to the student's level—not competition with peers.",
  "Awards aim to complement family commitment; we may suggest a personalized contribution plan when helpful.",
  "Previous support does not guarantee the same award in a new term; circumstances and enrollment may change.",
];

const DEFAULT_QUOTE_EYEBROW = "Sadaqah Jariyah";
const DEFAULT_QUOTE = {
  english:
    "When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.",
  reference: "Sahih Muslim",
};

const DEFAULT_CLOSING_TITLE = "Fuel lasting reward";
const DEFAULT_CLOSING_SUBTITLE =
  "Your zakāh and general donations help keep tuition accessible for neighbors who long to learn but face genuine hardship. Supporting this fund is an investment in Qur'anic literacy across generations.";

function resolveImg(
  img: FinancialAidPage["scholarshipOverviewImage"],
  w: number,
  h: number,
  fallbackUrl: string,
): string {
  if (img && typeof img === "object" && "asset" in img && img.asset) {
    return urlForSized(img as never, w, h, 72, "max");
  }
  return fallbackUrl;
}

const FinancialAid = () => {
  const { data: page } = useQuery({
    queryKey: ["financialAidPage"],
    queryFn: getFinancialAidPage,
  });

  const img = (cms: FinancialAidPage["scholarshipOverviewImage"], i: number, w: number, h: number) =>
    resolveImg(cms, w, h, FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]);

  const pageTitle = page?.title?.trim() || DEFAULT_PAGE_TITLE;
  const scholarshipOverviewTitle = page?.scholarshipOverviewTitle ?? DEFAULT_OVERVIEW_TITLE;
  const scholarshipOverviewBody = page?.scholarshipOverviewBody ?? DEFAULT_OVERVIEW_BODY;
  const howItWorksTitle = page?.howItWorksTitle ?? DEFAULT_HOW_TITLE;
  const howItWorksSteps = page?.howItWorksSteps?.length ? page.howItWorksSteps : DEFAULT_STEPS;
  const meritNeedTitle = page?.meritNeedTitle ?? DEFAULT_MERIT_TITLE;
  const meritNeedIntro = page?.meritNeedIntro ?? DEFAULT_MERIT_INTRO;
  const meritNeedBullets = page?.meritNeedBullets?.length ? page.meritNeedBullets : DEFAULT_MERIT_BULLETS;
  const quoteEyebrow = page?.quoteEyebrow ?? DEFAULT_QUOTE_EYEBROW;
  const quote =
    page?.quote && (page.quote.english?.trim() || page.quote.arabic?.trim()) ? page.quote : DEFAULT_QUOTE;
  const closingCtaTitle = page?.closingCtaTitle ?? DEFAULT_CLOSING_TITLE;
  const closingCtaSubtitle = page?.closingCtaSubtitle ?? DEFAULT_CLOSING_SUBTITLE;
  const meritNeedCta = page?.meritNeedCta;
  const applyCta = page?.closingApplyCta;
  const donateCta = page?.closingDonateCta;

  const seo = page?.seo;

  const closingFallbackPhoto = ctaBandPhoto;

  const meritNeedTarget = meritNeedCta ? resolveCtaButtonTarget(meritNeedCta) : null;
  const applyTarget = applyCta ? resolveCtaButtonTarget(applyCta) : null;
  const donateTarget = donateCta ? resolveCtaButtonTarget(donateCta) : null;

  return (
    <main className="relative overflow-hidden bg-background pb-0">
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle}${SEO_TITLE_SUFFIX}`} />

      <PageTitle visuallyHidden title={pageTitle} />

      <div className="section-y container relative z-10 space-y-20 md:space-y-28">
        {/* Overview */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <PageTitle
            headingLevel="h2"
            title={scholarshipOverviewTitle}
            subtitle="We partner with families to make meaningful Qur'anic learning accessible with dignity, clarity, and care."
          />
          <div className="grid min-w-0 gap-8 md:grid-cols-2 md:items-start md:gap-10">
            <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">{scholarshipOverviewBody}</p>
            <EditorialImage variant="feature" src={img(page?.scholarshipOverviewImage, 1, 960, 720)} alt="" loading="lazy" />
          </div>
          {applyCta && applyTarget && (
            <div className="mt-8 flex justify-start">
              <CtaLink label={applyCta.label} to={applyTarget} variant={applyCta.variant ?? "primary"} />
            </div>
          )}
        </motion.section>

        {/* How it works */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="heading-section-sm mb-8">{howItWorksTitle}</h2>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <ol className="space-y-6">
              {howItWorksSteps.map((step, i) => (
                <li key={step.title ?? i} className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    {step.description && (
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">{step.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <EditorialImage variant="feature" src={img(page?.howItWorksImage, 2, 960, 720)} alt="" loading="lazy" />
          </div>
          {donateCta && donateTarget && (
            <div className="mt-8 flex justify-start">
              <CtaLink label={donateCta.label} to={donateTarget} variant={donateCta.variant ?? "accent"} />
            </div>
          )}
        </motion.section>

        {/* Merit & need — larger image */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="heading-section-sm mb-8">{meritNeedTitle}</h2>
          <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <EditorialImage
              variant="inline"
              src={img(page?.meritNeedImage, 3, 1600, 1000)}
              alt=""
              loading="lazy"
              wrapperClassName="order-2 lg:order-1 lg:col-span-7"
            />
            <div className="order-1 lg:order-2 lg:col-span-5">
              <p className="mb-6 whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">{meritNeedIntro}</p>
              <ul className="space-y-3">
                {meritNeedBullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {meritNeedCta && meritNeedTarget && (
            <div className="mt-8 flex justify-start">
              <CtaLink label={meritNeedCta.label} to={meritNeedTarget} variant={meritNeedCta.variant ?? "primary"} />
            </div>
          )}
        </motion.section>

        {/* Hadith / quote */}
        {(quote.arabic || quote.english) && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="relative py-6 md:py-10">
              <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.22em] text-primary">{quoteEyebrow}</p>
              <blockquote className="mx-auto max-w-3xl space-y-4 text-center">
                {quote.arabic && (
                  <p
                    className="text-2xl font-arabic leading-loose md:text-3xl"
                    dir="rtl"
                    style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
                  >
                    {quote.arabic}
                  </p>
                )}
                {quote.english && <p className="text-lg italic leading-relaxed text-muted-foreground md:text-xl">&ldquo;{quote.english}&rdquo;</p>}
                {quote.reference && (
                  <footer className="text-sm text-muted-foreground/85 md:text-base">— {quote.reference}</footer>
                )}
              </blockquote>
            </div>
          </motion.section>
        )}

        {page?.additionalContent && page.additionalContent.length > 0 && (
          <section>
            <div className="prose prose-lg max-w-none prose-p:text-muted-foreground">
              <PortableText value={page.additionalContent as ComponentProps<typeof PortableText>["value"]} />
            </div>
          </section>
        )}
      </div>

      {/* Closing CTA — full viewport width (matches homepage closing band) */}
      <section className="section-y relative mt-16 min-h-[280px] w-full overflow-hidden bg-secondary text-secondary-foreground md:mt-20">
        <div className="pointer-events-none absolute inset-0 cta-band__scrim" aria-hidden />
        <DecorativeArabic variant="bandLeft" opacity={0.035} />
        <div className="cta-band__image-wrap">
          <EditorialImage
            variant="band"
            src={resolveImg(page?.closingCtaImage, 1600, 900, closingFallbackPhoto)}
            alt=""
            loading="lazy"
            wrapperClassName="h-full min-h-[320px]"
          />
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl space-y-8 text-center md:space-y-10 lg:mx-0 lg:max-w-xl lg:text-left">
            <CtaBandHeading>{closingCtaTitle}</CtaBandHeading>
            <p className="max-w-2xl text-lg leading-relaxed text-secondary-foreground/85 md:text-xl md:leading-relaxed">
              {closingCtaSubtitle}
            </p>
            {(applyCta && applyTarget) || (donateCta && donateTarget) ? (
              <div className="flex flex-wrap justify-center gap-5 pt-4 lg:justify-start">
                {applyCta && applyTarget && (
                  <CtaLink label={applyCta.label} to={applyTarget} variant={applyCta.variant ?? "primary"} />
                )}
                {donateCta && donateTarget && (
                  <CtaLink label={donateCta.label} to={donateTarget} variant={donateCta.variant ?? "accent"} />
                )}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FinancialAid;
