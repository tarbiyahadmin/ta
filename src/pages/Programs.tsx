import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getProgramCategories, getProgramsPage, getProgramsForListing } from "@/lib/sanityQueries";
import { PageSeo } from "@/components/PageSeo";
import { PageTitle } from "@/components/layout/PageTitle";
import { ProgramCardImage } from "@/components/ui/ProgramCardImage";
import { SEO_TITLE_SUFFIX } from "@/lib/brand";
import type { ProgramForListing } from "@/lib/sanityQueries";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const filterChipBase =
  "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

const badgeBase = "rounded-full px-3 py-1 text-xs font-medium";

const Programs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategorySlug = searchParams.get("category") ?? null;

  const { data: programsPageData } = useQuery({
    queryKey: ["programsPage"],
    queryFn: getProgramsPage,
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["programCategories"],
    queryFn: getProgramCategories,
  });
  const { data: programs = [] } = useQuery({
    queryKey: ["programsForListing"],
    queryFn: getProgramsForListing,
  });

  const pageTitle = programsPageData?.title ?? "Our Programs";
  const pageSubtitle =
    programsPageData?.subtitle ??
    "Weekend programs in Qur'an, Arabic, and Islamic studies—structured for youth at every stage.";
  const introContent = programsPageData?.introContent;

  const programsByCategoryId = useMemo(() => {
    return (programs as ProgramForListing[]).reduce<Record<string, ProgramForListing[]>>((acc, prog) => {
      const id = prog.category?._id ?? "_none";
      if (!acc[id]) acc[id] = [];
      acc[id].push(prog);
      return acc;
    }, {});
  }, [programs]);

  const filteredCategories = useMemo(
    () => (activeCategorySlug ? categories.filter((c) => c.slug === activeCategorySlug) : categories),
    [activeCategorySlug, categories],
  );

  const seo = programsPageData?.seo;

  return (
    <main className="section-y relative overflow-hidden bg-background">
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle}${SEO_TITLE_SUFFIX}`} />
      <div className="container relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto mb-16 max-w-5xl md:mb-20">
          <PageTitle title={pageTitle} subtitle={pageSubtitle} />
          {introContent && introContent.length > 0 ? (
            <div className="prose prose-lg prose-editorial mx-auto mt-8 max-w-3xl text-center prose-p:text-muted-foreground md:text-left">
              <PortableText value={introContent} />
            </div>
          ) : null}
        </motion.div>

        {categories.length > 0 ? (
          <div className="mx-auto mb-12 flex max-w-5xl flex-wrap gap-2" role="tablist" aria-label="Program categories">
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className={cn(
                filterChipBase,
                !activeCategorySlug
                  ? "border-transparent btn-brand-gradient shadow-sm"
                  : "border-transparent bg-muted/70 text-muted-foreground hover:bg-muted",
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                type="button"
                onClick={() => setSearchParams({ category: cat.slug })}
                className={cn(
                  filterChipBase,
                  activeCategorySlug === cat.slug
                    ? "border-transparent btn-brand-gradient shadow-sm"
                    : "border-transparent bg-muted/70 text-muted-foreground hover:bg-muted",
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>
        ) : null}

        <div className="space-y-20 md:space-y-24">
          {filteredCategories.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              {activeCategorySlug ? "No programs found in this category." : "No programs available."}
            </p>
          ) : (
            filteredCategories.map((cat) => {
              const categoryPrograms = programsByCategoryId[cat._id] ?? [];
              if (categoryPrograms.length === 0) return null;
              return (
                <section key={cat._id} className="mx-auto max-w-5xl">
                  <div className="mb-8">
                    <h2 className="heading-section-sm">{cat.title}</h2>
                    {cat.description ? (
                      <p className="mt-2 text-sm text-muted-foreground md:text-base">{cat.description}</p>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
                    {categoryPrograms.map((prog) => {
                      const categorySlug = prog.category?.slug ?? cat.slug;
                      return (
                        <Link key={prog._id} to={`/programs/${categorySlug}/${prog.slug}`} className="min-w-0">
                          <Card className="group relative flex h-full flex-col overflow-hidden border-border/50 shadow-md transition-shadow hover:shadow-lg">
                            <ProgramCardImage
                              program={prog}
                              className="aspect-[16/10] w-full"
                              size="listing"
                            />
                            <CardContent className="relative z-[1] flex flex-1 flex-col space-y-3 p-5 md:space-y-4 md:p-6">
                              <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
                                {prog.title}
                              </h3>
                              {prog.format || prog.ages ? (
                                <div className="flex flex-wrap gap-2">
                                  {prog.format ? (
                                    <span className={cn(badgeBase, "bg-primary/10 text-primary")}>{prog.format}</span>
                                  ) : null}
                                  {prog.ages ? (
                                    <span className={cn(badgeBase, "bg-accent/10 text-accent")}>{prog.ages}</span>
                                  ) : null}
                                </div>
                              ) : null}
                              {prog.shortDescription ? (
                                <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                                  {prog.shortDescription}
                                </p>
                              ) : null}
                              <span className="inline-flex items-center pt-1 text-sm font-semibold text-primary transition-colors group-hover:text-secondary md:text-base">
                                Learn more →
                              </span>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
};

export default Programs;
