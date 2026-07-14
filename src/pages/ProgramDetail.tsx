import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { getProgramBySlug } from "@/lib/sanityQueries";
import { formPagePath } from "@/lib/routes";
import { CtaLink } from "@/components/CtaLink";
import { PageSeo } from "@/components/PageSeo";
import { PageTitle } from "@/components/layout/PageTitle";
import { ScheduleBlocks, enrollmentPlansSectionTitle } from "@/components/ScheduleBlocks";
import { SEO_TITLE_SUFFIX } from "@/lib/brand";
import { EditorialImage } from "@/components/ui/EditorialImage";
import {
  programCardFallbackIndex,
  resolveProgramCardImage,
} from "@/lib/programCardImage";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

function ProgramCtas({
  registrationPath,
  bookMeetPath,
}: {
  registrationPath: string | null;
  bookMeetPath: string | null;
}) {
  if (registrationPath) {
    return (
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <CtaLink label="Register Now" to={registrationPath} variant="accent" />
        {bookMeetPath ? <CtaLink label="Book a Meet" to={bookMeetPath} variant="primary" /> : null}
      </div>
    );
  }

  return (
    <Button asChild variant="outline" size="lg" className="rounded-xl px-8">
      <Link to="/programs">View Programs</Link>
    </Button>
  );
}

const ProgramDetail = () => {
  const { programSlug } = useParams();
  const { data: program, isLoading } = useQuery({
    queryKey: ["program", programSlug],
    queryFn: () => getProgramBySlug(programSlug ?? ""),
    enabled: !!programSlug,
  });

  const registrationPath = useMemo(() => {
    const slug = program?.registrationFormPage?.slug;
    return slug ? formPagePath(slug) : null;
  }, [program?.registrationFormPage?.slug]);

  const bookMeetPath = useMemo(() => {
    const slug = program?.bookMeetFormPage?.slug;
    return slug ? formPagePath(slug) : null;
  }, [program?.bookMeetFormPage?.slug]);

  const imageUrl = useMemo(() => {
    if (!program) return null;
    if (program.mainImage?.asset) {
      return resolveProgramCardImage(program, programCardFallbackIndex(program), 1200, 675);
    }
    return null;
  }, [program]);

  const imageAlt =
    (program?.mainImage && "alt" in program.mainImage && program.mainImage.alt) ||
    program?.title ||
    "";

  const locationStr = useMemo(() => {
    const location = program?.location;
    if (!location?.address) return "";
    return [location.address, [location.city, location.province].filter(Boolean).join(", "), location.postalCode]
      .filter(Boolean)
      .join("\n");
  }, [program?.location]);

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <main className="section-y bg-background">
        <div className="container max-w-4xl">
          <PageTitle title="Program not found" subtitle="This program may have been moved or removed." />
          <div className="mt-10 flex justify-center">
            <Button asChild className="btn-brand-gradient rounded-xl px-8">
              <Link to="/programs">Back to Programs</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const categoryTitle = program.category?.title ?? "";
  const infoCards = program.infoCards ?? [];
  const scheduleBlocks = program.scheduleBlocks ?? [];

  return (
    <main className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-28">
      <PageSeo
        title={program.seo?.seoTitle}
        description={program.seo?.metaDescription}
        fallbackTitle={`${program.title}${SEO_TITLE_SUFFIX}`}
      />
      <div className="container relative z-10 max-w-4xl">
        <Link
          to="/programs"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <span aria-hidden>←</span> Back to Programs
        </Link>

        <motion.div {...fadeIn}>
          <section className="mb-12 md:mb-14">
            <PageTitle
              eyebrow={
                categoryTitle ? (
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{categoryTitle}</span>
                ) : undefined
              }
              title={program.title}
              subtitle={program.heroText ?? undefined}
            />
          </section>

          {imageUrl ? (
            <EditorialImage
              variant="inline"
              src={imageUrl}
              alt={imageAlt}
              loading="eager"
              decoding="async"
              wrapperClassName="mb-12 md:mb-14"
            />
          ) : null}

          <section className="mb-12 md:mb-14">
            {program.overview ? (
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
                {program.overview}
              </p>
            ) : null}
            <ProgramCtas registrationPath={registrationPath} bookMeetPath={bookMeetPath} />
          </section>

          {infoCards.length > 0 ? (
            <section className="mb-12 md:mb-14">
              <div className="grid gap-4 sm:grid-cols-2">
                {infoCards.map((card, i) => (
                  <Card key={`${card.title}-${i}`} className="border-border/50 bg-card/80 shadow-sm">
                    <CardContent className="space-y-1.5 p-5 md:p-6">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{card.title}</p>
                      <p className="text-sm font-medium leading-relaxed text-foreground md:text-base">{card.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          {(program.curriculum?.length ?? 0) > 0 ? (
            <section className="mb-12 md:mb-14">
              <h2 className="heading-section-sm mb-6">Curriculum</h2>
              <ul className="space-y-3">
                {program.curriculum!.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {locationStr ? (
            <section className="mb-12 md:mb-14">
              <h2 className="heading-section-sm mb-4">Location</h2>
              <div className="rounded-2xl border border-border/50 bg-card/80 p-5 shadow-sm md:p-6">
                <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{locationStr}</p>
              </div>
            </section>
          ) : null}

          {scheduleBlocks.length > 0 ? (
            <section className="mb-12 md:mb-14">
              <h2 className="heading-section-sm mb-6">{enrollmentPlansSectionTitle(scheduleBlocks)}</h2>
              <ScheduleBlocks blocks={scheduleBlocks} />
              <div className="mt-8">
                <ProgramCtas registrationPath={registrationPath} bookMeetPath={bookMeetPath} />
              </div>
            </section>
          ) : null}

          {program.specialOffers && program.specialOffers.length > 0 ? (
            <section className="mb-12 md:mb-14">
              <h2 className="heading-section-sm mb-4">Special Offers</h2>
              <div className="space-y-4">
                {program.specialOffers.map((offer, i) => (
                  <Card key={i} className="border-primary/20 bg-primary/[0.04]">
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-semibold text-foreground">{offer.title}</h3>
                      {offer.description ? (
                        <p className="text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mb-12 rounded-2xl border border-border/40 bg-muted/30 px-6 py-10 md:mb-14 md:px-10">
            <h2 className="heading-section-sm mb-2">Ready to Enroll?</h2>
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {registrationPath
                ? "Complete the registration form to secure your spot."
                : "View our programs to get started."}
            </p>
            <ProgramCtas registrationPath={registrationPath} bookMeetPath={bookMeetPath} />
          </section>

          {program.faqs && program.faqs.length > 0 ? (
            <section>
              <h2 className="heading-section-sm mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {program.faqs.map((faq, i) =>
                  faq?.q ? (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger>{faq.q}</AccordionTrigger>
                      <AccordionContent>{faq.a ?? ""}</AccordionContent>
                    </AccordionItem>
                  ) : null,
                )}
              </Accordion>
            </section>
          ) : null}
        </motion.div>
      </div>
    </main>
  );
};

export default ProgramDetail;
