import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CtaLink } from "@/components/CtaLink";
import { PageSeo } from "@/components/PageSeo";
import { HeroCollage } from "@/components/layout/HeroCollage";
import { HeroBackground } from "@/components/layout/HeroBackground";
import { SectionBackdrop } from "@/components/layout/SectionBackdrop";
import { CtaBandHeading } from "@/components/layout/CtaBandHeading";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ProgramCardImage } from "@/components/ui/ProgramCardImage";
import { editorialPhotos, ctaBandPhoto } from "@/lib/siteAssets";
import { SITE_NAME } from "@/lib/brand";
import { getHomepage, getAboutPage, type AboutTeacher } from "@/lib/sanityQueries";
import { resolveCtaButtonTarget } from "@/lib/ctaDestinations";
import { urlForSized } from "@/lib/sanity";

const [photoEditorialA, photoEditorialB, photoEditorialC, photoEditorialD] = editorialPhotos;
const defaultProgramCategories = [
  { title: "Weekend Qur'an", description: "Tajweed, memorization, and recitation tracks designed for youth learners on Saturdays and Sundays.", to: "/programs" },
  { title: "Arabic Language", description: "Foundational and intermediate Arabic to strengthen understanding of the Qur'an and Islamic texts.", to: "/programs" },
  { title: "Islamic Studies", description: "Age-appropriate lessons in adab, seerah, and everyday practice for growing Muslim youth.", to: "/programs" },
];

const defaultWhyChooseUs = [
  { title: "Qualified Instructors", description: "Certified scholars with Ijazah in Qur'anic recitation" },
  { title: "Small Class Sizes", description: "Personalized attention for every student" },
  { title: "Structured Curriculum", description: "Progressive learning paths tailored to each level" },
  { title: "Supportive Community", description: "A welcoming environment for families" },
  { title: "Flexible Scheduling", description: "Weekend, evening, and full-time options" },
  { title: "Safe Environment", description: "Background-checked staff and secure facilities" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Index = () => {
  const { data: homepage } = useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepage,
  });
  const { data: aboutPage } = useQuery({
    queryKey: ["aboutPageForHome"],
    queryFn: getAboutPage,
  });

  const heroEyebrow = homepage?.heroEyebrow ?? `— ${SITE_NAME} —`;
  const heroTitle = homepage?.heroTitle ?? "Weekend Islamic Education for Youth";
  const heroSubtitle =
    homepage?.heroSubtitle ??
    "A welcoming weekend school where young Muslims build strong foundations in Qur'an, Arabic, and authentic Islamic studies.";
  const heroCtaButtons = homepage?.heroCtaButtons?.length ? homepage.heroCtaButtons : [];
  const programsSectionTitle = homepage?.programsSectionTitle ?? "Our Programs";
  const programsSectionSubtitle =
    homepage?.programsSectionSubtitle ??
    "Explore weekend tracks in Qur'an, Arabic, and Islamic studies—structured for youth and taught with care.";
  const featuredPrograms = homepage?.featuredPrograms ?? [];
  const programCategories = homepage?.programCategories?.length ? homepage.programCategories : defaultProgramCategories;
  const viewAllProgramsLabel = homepage?.viewAllProgramsLabel ?? "View All Programs";

  const allCategories = [...new Set((featuredPrograms as { category?: { slug?: string; title?: string } }[])
    .map((p) => p.category?.slug)
    .filter(Boolean))] as string[];
  const [programFilter, setProgramFilter] = useState<string | null>(null);
  const programsScrollRef = useRef<HTMLDivElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const editorialPhotoUrls = useMemo(() => {
    const fromCms = (homepage?.editorialPhotos ?? [])
      .map((img) => {
        if (img && typeof img === "object" && "asset" in img && img.asset) {
          return urlForSized(img as never, 960, 720, 72, "max");
        }
        return null;
      })
      .filter((u): u is string => !!u);
    const defaults = [photoEditorialA, photoEditorialB, photoEditorialC, photoEditorialD];
    const base = fromCms.length >= 2 ? fromCms : defaults;
    return [0, 1, 2, 3].map((i) => base[i] ?? defaults[i]);
  }, [homepage?.editorialPhotos]);
  const filteredPrograms = programFilter
    ? featuredPrograms.filter((p: { category?: { slug?: string } }) => p.category?.slug === programFilter)
    : featuredPrograms;
  const whyChooseUsSectionTitle = homepage?.whyChooseUsSectionTitle ?? "Why Choose Us";
  const whyChooseUsSectionSubtitle =
    homepage?.whyChooseUsSectionSubtitle ??
    "We are committed to meaningful weekend learning in a safe, nurturing environment for every student.";
  const whyChooseUsItems = homepage?.whyChooseUsItems?.length ? homepage.whyChooseUsItems : defaultWhyChooseUs;
  const ctaTitle = homepage?.ctaTitle ?? "Register for the Weekend Program";
  const ctaSubtitle =
    homepage?.ctaSubtitle ??
    "Enroll your child in a weekend track and join a community focused on faith, character, and lifelong learning.";
  const footerNote = homepage?.footerNote;
  const ctaButtons = homepage?.ctaButtons?.length ? homepage.ctaButtons : [];
  const seo = homepage?.seo;

  const testimonialsSectionTitle = homepage?.testimonialsSectionTitle ?? "What Families Say";
  const testimonials = homepage?.testimonials ?? [];

  useEffect(() => {
    setTestimonialIndex(0);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 10000);
    return () => window.clearInterval(id);
  }, [testimonials.length]);
  const aboutSectionTitle = aboutPage?.title ?? "About Us";
  const aboutSectionSubtitle = aboutPage?.subtitle ?? "";
  const aboutTextFull = aboutPage?.instituteText ?? aboutPage?.ourStory ?? "";
  const homeTeachers = (aboutPage?.teachers ?? []) as AboutTeacher[];
  const showAboutSection = !!aboutPage;
  const aboutFeaturedImage =
    editorialPhotoUrls.find((url): url is string => !!url) ?? photoEditorialC;

  return (
    <main className="relative">
      <div className="editorial-grid pointer-events-none fixed inset-0 z-0 opacity-[0.72]" aria-hidden />
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} />
      {/* Hero — atmospheric gradients + integrated photo composition */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-background">
        <HeroBackground />
        <div className="hero-editorial-grid pointer-events-none absolute inset-0 z-[1] opacity-70" />

        <div className="container relative z-10 py-16 md:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 xl:gap-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="relative z-20 order-1 max-w-xl space-y-7 text-left lg:max-w-[42rem]"
            >
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary md:text-sm">
                {heroEyebrow}
              </p>
              <h1 className="hero-headline-gradient">{heroTitle}</h1>
              <p className="max-w-xl text-lg leading-[1.85] text-muted-foreground md:text-xl md:leading-[1.9]">
                {heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-3.5 pt-2">
                {heroCtaButtons.map((btn, i) => {
                  const to = resolveCtaButtonTarget(btn);
                  if (!to) return null;
                  return (
                    <CtaLink
                      key={`${to}-${i}`}
                      label={btn.label}
                      to={to}
                      variant={btn.variant ?? "primary"}
                      compact
                    />
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 order-2 flex justify-center lg:order-2 lg:justify-end lg:pr-0"
            >
              <HeroCollage className="lg:mr-[-6%] xl:mr-[-10%]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="section-y relative overflow-hidden bg-background">
        <SectionBackdrop depth="programs" arabic arabicTint="red" arabicOpacity={0.028} />
        <div className="container relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center md:mb-20">
            <h2 className="heading-section">{programsSectionTitle}</h2>
            <p className="heading-section-sub mt-6">{programsSectionSubtitle}</p>
          </motion.div>

          {featuredPrograms.length > 0 ? (
            <>
              {allCategories.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <button
                    type="button"
                    onClick={() => setProgramFilter(null)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      !programFilter
                        ? "border-primary/80 bg-primary text-primary-foreground shadow-sm"
                        : "border-transparent bg-muted/70 text-muted-foreground hover:border-primary/75 hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    All
                  </button>
                  {allCategories.map((slug) => {
                    const cat = (featuredPrograms as { category?: { slug?: string; title?: string } }[]).find((p) => p.category?.slug === slug);
                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => setProgramFilter(slug)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                          programFilter === slug
                            ? "border-primary/80 bg-primary text-primary-foreground shadow-sm"
                            : "border-transparent bg-muted/70 text-muted-foreground hover:border-primary/75 hover:bg-primary hover:text-primary-foreground"
                        }`}
                      >
                        {cat?.category?.title ?? slug}
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="relative">
              <div
                ref={programsScrollRef}
                className="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2 md:mx-0 md:gap-6 md:px-0 scrollbar-thin hide-scrollbar snap-x snap-mandatory"
              >
                  {filteredPrograms.map((prog: { _id: string; slug?: string; title?: string; category?: { slug?: string }; shortDescription?: string; mainImage?: unknown }) => {
                    const catSlug = prog.category?.slug ?? "programs";
                    return (
                      <Link
                        key={prog._id}
                        to={`/programs/${catSlug}/${prog.slug ?? ""}`}
                        className="w-[min(86vw,300px)] shrink-0 snap-start sm:w-[min(72vw,320px)] md:w-[340px]"
                      >
                        <Card className="group relative h-full min-h-[200px] overflow-hidden border-border/50 shadow-md transition-shadow duration-300 hover:shadow-lg">
                          <ProgramCardImage program={prog} className="aspect-[16/10] w-full" size="compact" />
                          <CardContent className="relative z-[1] flex h-full flex-col space-y-4 p-8">
                            <h3 className="text-xl font-semibold leading-snug text-foreground md:text-2xl">{prog.title}</h3>
                            <p className="line-clamp-3 flex-1 text-base leading-relaxed text-muted-foreground">{prog.shortDescription}</p>
                            <span className="inline-block pt-1 text-base font-semibold text-primary transition-colors group-hover:text-secondary">
                              Learn more →
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
                {filteredPrograms.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => programsScrollRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-background/90 shadow-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors z-10"
                      aria-label="Scroll left"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => programsScrollRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-background/90 shadow-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors z-10"
                      aria-label="Scroll right"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
              <div className="mt-12 flex justify-center">
                <Link to="/programs">
                  <Button variant="secondary" size="lg" className="px-12 py-7">
                    {viewAllProgramsLabel}
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {programCategories.map((cat) => {
                return (
                  <div key={cat.title}>
                    <Link to={cat.categorySlug ? `/programs?category=${cat.categorySlug}` : (cat.to ?? "/programs")}>
                      <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                        <CardContent className="p-8 text-center space-y-4">
                          <h3 className="text-xl font-semibold text-foreground">{cat.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{cat.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* About Us */}
      {showAboutSection && (
        <section className="relative overflow-hidden bg-background/80 py-20 md:py-28">
          <SectionBackdrop depth="about" arabic arabicTint="neutral" arabicOpacity={0.03} />
          <div className="container relative z-10">
            <div className="content-max mx-auto grid w-full items-start gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="order-1 text-center lg:col-span-6 lg:self-center lg:text-left"
              >
                <h2 className="heading-section">{aboutSectionTitle}</h2>
                {aboutSectionSubtitle && (
                  <p className="heading-section-sub !mx-0 mt-5 max-w-2xl text-center lg:text-left">
                    {aboutSectionSubtitle}
                  </p>
                )}
                {aboutTextFull && (
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg md:leading-relaxed whitespace-pre-line">
                    {aboutTextFull}
                  </p>
                )}
                <div className="mt-8 flex justify-center lg:justify-start">
                  <Link to="/about">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-2xl border-secondary/20 px-10 py-7 text-base font-medium hover:bg-muted"
                    >
                      Learn more about us
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-2 lg:col-span-6 lg:self-center"
              >
                <EditorialImage
                  variant="feature"
                  src={aboutFeaturedImage}
                  alt="Students and families at Tarbiyah Academy"
                  loading="lazy"
                  wrapperClassName="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none lg:min-h-[min(440px,44vh)]"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Our Teachers - separate section */}
      {showAboutSection && homeTeachers.length > 0 && (
        <section className="section-y relative overflow-hidden bg-background/80">
          <SectionBackdrop depth="teachers" arabic arabicTint="blue" arabicOpacity={0.026} />
            <div className="container relative z-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center md:mb-16">
                <h2 className="heading-section">Our Teachers</h2>
              </motion.div>
              <div className="flex flex-wrap justify-center gap-8 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-thin md:flex-nowrap">
                {homeTeachers.map((t) => {
                  const photoUrl = t.photo?.asset?.url
                    ? urlForSized(t.photo, 280, 280)
                    : null;
                  return (
                    <Card
                      key={t.name}
                      className="min-w-[260px] max-w-[280px] flex-shrink-0 border-border/50 bg-card/90 shadow-sm backdrop-blur-sm"
                    >
                      <CardContent className="flex flex-col items-center gap-4 p-7 text-center">
                        {photoUrl && (
                          <div className="h-24 w-24 overflow-hidden rounded-2xl border border-border/50 shadow-inner ring-2 ring-background">
                            <img src={photoUrl} alt={t.name} loading="lazy" className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground">{t.name}</p>
                          {t.role && <p className="text-xs text-primary mt-0.5">{t.role}</p>}
                          {t.oneLineDescription && <p className="text-sm text-muted-foreground mt-1">{t.oneLineDescription}</p>}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
      )}

      {/* Testimonials — centered editorial, one at a time */}
      {testimonials.length > 0 && (
        <section className="section-y relative overflow-hidden bg-background/80">
          <SectionBackdrop depth="testimonials" arabic arabicTint="red" arabicOpacity={0.027} />
          <div className="container relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-16 text-center md:mb-20"
            >
              <h2 className="heading-section">{testimonialsSectionTitle}</h2>
            </motion.div>

            <div className="content-max relative mx-auto max-w-4xl px-4 md:px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="text-center"
                >
                  <blockquote className="font-sans text-2xl font-normal leading-snug tracking-tight text-foreground md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight">
                    <span className="text-primary/55">&ldquo;</span>
                    {testimonials[testimonialIndex]?.quote}
                    <span className="text-primary/55">&rdquo;</span>
                  </blockquote>
                  <footer className="mt-12 space-y-2 border-t border-border/40 pt-10">
                    <p className="text-lg font-semibold text-foreground md:text-xl">
                      {testimonials[testimonialIndex]?.name}
                    </p>
                    {testimonials[testimonialIndex]?.role && (
                      <p className="text-base text-muted-foreground md:text-lg">{testimonials[testimonialIndex]?.role}</p>
                    )}
                  </footer>
                </motion.div>
              </AnimatePresence>

              {testimonials.length > 1 && (
                <div className="mt-14 flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-border/60 shadow-sm"
                      aria-label="Previous testimonial"
                      onClick={() =>
                        setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
                      }
                    >
                      <span aria-hidden>‹</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-border/60 shadow-sm"
                      aria-label="Next testimonial"
                      onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
                    >
                      <span aria-hidden>›</span>
                    </Button>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to testimonial ${i + 1}`}
                        aria-current={i === testimonialIndex}
                        onClick={() => setTestimonialIndex(i)}
                        className={`h-2.5 rounded-full transition-all ${
                          i === testimonialIndex
                            ? "w-10 bg-gradient-to-r from-primary/50 to-accent/45"
                            : "w-2.5 bg-border/90 hover:bg-primary/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="section-y relative overflow-hidden bg-background/80">
        <SectionBackdrop depth="why" arabic arabicTint="neutral" arabicOpacity={0.029} />
        <div className="container relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center md:mb-20">
            <h2 className="heading-section relative">{whyChooseUsSectionTitle}</h2>
            <p className="heading-section-sub mt-6">{whyChooseUsSectionSubtitle}</p>
          </motion.div>
          <div className="content-max mx-auto grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
            {whyChooseUsItems.map((item) => {
              return (
                <div key={item.title}>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner — navy band with seamlessly blended photo */}
      <section className="section-y relative min-h-[280px] overflow-hidden bg-secondary text-secondary-foreground">
        <div className="pointer-events-none absolute inset-0 cta-band__scrim" aria-hidden />
        <DecorativeArabic variant="bandLeft" opacity={0.035} />
        <div className="cta-band__image-wrap">
          <EditorialImage
            variant="band"
            src={ctaBandPhoto}
            alt=""
            loading="lazy"
            wrapperClassName="h-full min-h-[320px]"
          />
        </div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl space-y-8 text-center md:space-y-10 lg:mx-0 lg:max-w-xl lg:text-left">
            {footerNote && (
              <p className="max-w-xl text-base leading-relaxed text-secondary-foreground/90">{footerNote}</p>
            )}
            <CtaBandHeading>{ctaTitle}</CtaBandHeading>
            <p className="max-w-2xl text-lg leading-relaxed text-secondary-foreground/85 md:text-xl md:leading-relaxed">
              {ctaSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-5 pt-4 lg:justify-start">
              {ctaButtons.map((btn, i) => {
                const to = resolveCtaButtonTarget(btn);
                if (!to) return null;
                return (
                  <CtaLink
                    key={`${to}-${i}`}
                    label={btn.label}
                    to={to}
                    variant={btn.variant ?? "primary"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
