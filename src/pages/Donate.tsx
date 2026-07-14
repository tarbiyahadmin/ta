import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { getDonatePage } from "@/lib/sanityQueries";
import { CtaLink } from "@/components/CtaLink";
import { PageSeo } from "@/components/PageSeo";
import { PageTitle } from "@/components/layout/PageTitle";
import { CtaBandHeading } from "@/components/layout/CtaBandHeading";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { resolveCtaButtonTarget } from "@/lib/ctaDestinations";
import { urlForSized } from "@/lib/sanity";
import { SEO_TITLE_SUFFIX } from "@/lib/brand";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function cmsImageUrl(image: unknown, width: number, height: number): string | null {
  if (image && typeof image === "object" && "asset" in image && image.asset) {
    return urlForSized(image as never, width, height);
  }
  return null;
}

const Donate = () => {
  const { data: donatePageData } = useQuery({
    queryKey: ["donatePage"],
    queryFn: getDonatePage,
  });

  const pageTitle = donatePageData?.title ?? "Support Our Mission";
  const pageSubtitle = donatePageData?.subtitle;
  const introContent = donatePageData?.introContent;
  const introImageUrl = cmsImageUrl(donatePageData?.introImage, 1400, 1000);
  const introCtas = donatePageData?.introCtaButtons ?? [];

  const waysTitle = donatePageData?.waysToSupportTitle;
  const waysItems = donatePageData?.waysToSupportItems ?? [];

  const scholarshipTitle = donatePageData?.scholarshipTitle;
  const scholarshipSubtitle = donatePageData?.scholarshipSubtitle;
  const scholarshipContent = donatePageData?.scholarshipContent;
  const scholarshipImages = donatePageData?.scholarshipImages ?? [];
  const scholarshipCtas = donatePageData?.scholarshipCtaButtons ?? [];

  const trustTitle = donatePageData?.trustTitle;
  const trustBullets = donatePageData?.trustBullets ?? [];
  const trustCtas = donatePageData?.trustCtaButtons ?? [];

  const hadith = donatePageData?.hadith;
  const hadithTitle = donatePageData?.hadithTitle;
  const hadithCtas = donatePageData?.hadithCtaButtons ?? [];

  const closingCtaTitle = donatePageData?.closingCtaTitle;
  const closingCtaSubtitle = donatePageData?.closingCtaSubtitle;
  const closingCtaButtons = donatePageData?.closingCtaButtons ?? [];
  const closingCtaImageUrl = cmsImageUrl(donatePageData?.closingCtaImage, 1600, 900);

  const seo = donatePageData?.seo;

  return (
    <main className="section-soft-radial relative overflow-hidden pb-0">
      <DecorativeArabic variant="full" opacity={0.034} />
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle}${SEO_TITLE_SUFFIX}`} />
      <div className="container relative z-10 space-y-20 pb-20 pt-16 md:space-y-24 md:pb-24 md:pt-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <PageTitle title={pageTitle} subtitle={pageSubtitle} />
        </motion.div>

        {/* Intro section: left text + right image */}
        {(introContent?.length || introImageUrl) && (
          <section className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div className="space-y-6">
              {introContent && introContent.length > 0 && (
                <div className="prose prose-lg prose-editorial max-w-none prose-p:text-muted-foreground">
                  <PortableText value={introContent} />
                </div>
              )}
              {introCtas.length > 0 && (
                <div className="flex flex-wrap justify-start gap-4">
                  {introCtas.map((btn, i) => {
                    const target = resolveCtaButtonTarget(btn);
                    if (!target) return null;
                    return (
                      <CtaLink
                        key={`${target}-${i}`}
                        label={btn.label}
                        to={target}
                        variant={btn.variant ?? "primary"}
                      />
                    );
                  })}
                </div>
              )}
            </div>
            {introImageUrl && (
              <EditorialImage variant="feature" src={introImageUrl} alt="" loading="lazy" />
            )}
          </section>
        )}

        {/* Ways to support */}
        {(waysTitle || waysItems.length > 0) && (
          <section>
            {waysTitle && <h2 className="heading-section-sm mb-8">{waysTitle}</h2>}
            <div className="space-y-12">
              {waysItems.map((item, i) => {
                const imgUrl = cmsImageUrl(item.image, 1200, 900);
                const ctaTarget = item.cta ? resolveCtaButtonTarget(item.cta) : null;
                return (
                  <article key={item.title ?? i} className="grid gap-6 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-8">
                      <div className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">0{i + 1}</div>
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                      {item.description && <p className="mt-2 text-muted-foreground">{item.description}</p>}
                      {ctaTarget && item.cta && (
                        <div className="mt-5 flex justify-start">
                          <CtaLink
                            label={item.cta.label}
                            to={ctaTarget}
                            variant={item.cta.variant ?? "primary"}
                          />
                        </div>
                      )}
                    </div>
                    {imgUrl && (
                      <EditorialImage variant="feature" src={imgUrl} alt="" loading="lazy" wrapperClassName="md:col-span-4" />
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Scholarship section */}
        {(scholarshipTitle || scholarshipSubtitle || scholarshipContent?.length || scholarshipImages.length > 0) && (
          <section>
            {scholarshipTitle && <h2 className="heading-section-sm mb-6 text-left">{scholarshipTitle}</h2>}
            <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
              <div className="space-y-6 lg:col-span-7">
                {scholarshipSubtitle && <p className="whitespace-pre-line text-base text-muted-foreground md:text-lg">{scholarshipSubtitle}</p>}
                {scholarshipContent && scholarshipContent.length > 0 && (
                  <div className="prose prose-lg prose-editorial max-w-none prose-p:text-muted-foreground">
                    <PortableText value={scholarshipContent} />
                  </div>
                )}
                {scholarshipCtas.length > 0 && (
                  <div className="flex flex-wrap justify-start gap-4">
                    {scholarshipCtas.map((btn, i) => {
                      const target = resolveCtaButtonTarget(btn);
                    if (!target) return null;
                      return (
                        <CtaLink
                        key={`${target}-${i}`}
                          label={btn.label}
                        to={target}
                          variant={btn.variant ?? "accent"}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
              {scholarshipImages.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
                  {scholarshipImages.slice(0, 2).map((image, i) => {
                    const imgUrl = cmsImageUrl(image, 1100, 900);
                    if (!imgUrl) return null;
                    return (
                      <EditorialImage key={i} variant="feature" src={imgUrl} alt="" loading="lazy" />
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Trust section matching About "Our Values" visual style */}
        {(trustTitle || trustBullets.length > 0) && (
          <section>
            {trustTitle && <h2 className="heading-section-sm mb-8">{trustTitle}</h2>}
            <div className="content-max mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {trustBullets.map((item, i) => (
                <div key={item.title ?? i} className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  {item.desc && <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>}
                </div>
              ))}
            </div>
            {trustCtas.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-start gap-4">
                {trustCtas.map((btn, i) => {
                  const target = resolveCtaButtonTarget(btn);
                  if (!target) return null;
                  return (
                    <CtaLink
                      key={`${target}-${i}`}
                      label={btn.label}
                      to={target}
                      variant={btn.variant ?? "primary"}
                    />
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Hadith section */}
        {(hadithTitle || hadith?.arabic || hadith?.english) && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {hadithTitle && <h2 className="heading-section-sm mb-8">{hadithTitle}</h2>}
            <div className="py-4 md:py-6">
              <blockquote className="space-y-3">
                {hadith?.arabic && (
                  <p className="text-2xl leading-loose md:text-3xl font-arabic" dir="rtl" style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}>
                    {hadith.arabic}
                  </p>
                )}
                {hadith?.english && <p className="italic text-muted-foreground">&ldquo;{hadith.english}&rdquo;</p>}
                {hadith?.reference && <footer className="text-sm text-muted-foreground/80">— {hadith.reference}</footer>}
              </blockquote>
              {hadithCtas.length > 0 && (
                <div className="mt-6 flex flex-wrap justify-start gap-4">
                  {hadithCtas.map((btn, i) => {
                    const target = resolveCtaButtonTarget(btn);
                    if (!target) return null;
                    return (
                      <CtaLink
                        key={`${target}-${i}`}
                        label={btn.label}
                        to={target}
                        variant={btn.variant ?? "accent"}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </motion.section>
        )}
      </div>

      {/* Full closing CTA section */}
      {(closingCtaTitle || closingCtaSubtitle || closingCtaButtons.length > 0) && (
        <section className="section-y relative min-h-[280px] w-full overflow-hidden bg-secondary text-secondary-foreground">
          <div className="pointer-events-none absolute inset-0 cta-band__scrim" aria-hidden />
          <DecorativeArabic variant="bandLeft" opacity={0.035} />
          {closingCtaImageUrl && (
            <div className="cta-band__image-wrap">
              <EditorialImage variant="band" src={closingCtaImageUrl} alt="" loading="lazy" wrapperClassName="h-full min-h-[320px]" />
            </div>
          )}

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl space-y-8 text-left md:space-y-10 lg:mx-0 lg:max-w-xl">
            {closingCtaTitle && <CtaBandHeading>{closingCtaTitle}</CtaBandHeading>}
            {closingCtaSubtitle && (
              <p className="max-w-2xl text-lg leading-relaxed text-secondary-foreground/85 md:text-xl md:leading-relaxed">{closingCtaSubtitle}</p>
            )}
            {closingCtaButtons.length > 0 && (
              <div className="flex flex-wrap justify-start gap-4 pt-2">
                {closingCtaButtons.map((btn, i) => {
                  const target = resolveCtaButtonTarget(btn);
                  if (!target) return null;
                  return (
                    <CtaLink
                      key={`${target}-${i}`}
                      label={btn.label}
                      to={target}
                      variant={btn.variant ?? "primary"}
                    />
                  );
                })}
              </div>
            )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Donate;
