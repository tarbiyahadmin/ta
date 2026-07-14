import type {
  LabeledValueRow,
  ProgramOption,
  ScheduleBlock,
  ScheduleTableSection,
} from "@/lib/sanityQueries";

interface EnrollmentPlansProps {
  blocks: ScheduleBlock[] | undefined;
}

function planTitle(opt: ProgramOption): string {
  return (opt.title || opt.label || "Plan").trim();
}

function planFee(opt: ProgramOption): string | undefined {
  const fee = (opt.fee || opt.monthlyFee || opt.price || "").trim();
  return fee || undefined;
}

/** Prefer CMS detail rows; fall back to legacy fixed fields. */
function planDetails(opt: ProgramOption): LabeledValueRow[] {
  if (opt.details?.length) {
    return opt.details.filter((row) => row.label?.trim() && row.value?.trim());
  }
  const legacy: LabeledValueRow[] = [];
  if (opt.format?.trim()) legacy.push({ label: "Format", value: opt.format });
  if (opt.frequency?.trim()) legacy.push({ label: "Frequency", value: opt.frequency });
  if (opt.duration?.trim()) legacy.push({ label: "Duration", value: opt.duration });
  if (opt.note?.trim()) legacy.push({ label: "Note", value: opt.note });
  return legacy;
}

type NormalizedTable = {
  title?: string;
  headings: string[];
  body: string[][];
};

/** Normalize multi-column CMS tables or legacy label/value rows. */
function normalizeScheduleTable(table: ScheduleTableSection): NormalizedTable | null {
  const headings = (table.columns ?? [])
    .map((c) => (c.heading || "").trim())
    .filter(Boolean);

  if (headings.length > 0) {
    const body = (table.dataRows ?? [])
      .map((row) => {
        const cells = row.cells ?? [];
        return headings.map((_, i) => (cells[i]?.value ?? "").trim());
      })
      .filter((row) => row.some((cell) => cell.length > 0));

    if (!body.length) return null;
    return { title: table.title?.trim() || undefined, headings, body };
  }

  // Legacy label / value pairs → 2-column table
  const legacy = (table.rows ?? []).filter((r) => r.label?.trim() && r.value?.trim());
  if (!legacy.length) return null;
  return {
    title: table.title?.trim() || undefined,
    headings: ["", ""],
    body: legacy.map((r) => [r.label!.trim(), r.value!.trim()]),
  };
}

function ScheduleTable({ table }: { table: ScheduleTableSection }) {
  const normalized = normalizeScheduleTable(table);
  if (!normalized) return null;

  const { title, headings, body } = normalized;
  const colCount = headings.length;
  const showHeadings = headings.some((h) => h.length > 0);

  return (
    <div className="overflow-x-auto rounded-xl border border-border/50">
      {title ? (
        <div className="border-b border-border/50 bg-muted/40 px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
        </div>
      ) : null}
      <table className="w-full min-w-[16rem] border-collapse text-sm">
        {showHeadings ? (
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              {headings.map((heading, i) => (
                <th
                  key={`h-${i}`}
                  scope="col"
                  className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-4"
                >
                  {heading || <span className="sr-only">Column {i + 1}</span>}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {body.map((row, ri) => (
            <tr key={`r-${ri}`} className={ri % 2 === 0 ? "bg-background/80" : "bg-muted/25"}>
              {Array.from({ length: colCount }, (_, ci) => (
                <td
                  key={`c-${ri}-${ci}`}
                  className={`px-3 py-2.5 align-top sm:px-4 ${
                    ci === 0 && !showHeadings
                      ? "font-medium text-muted-foreground"
                      : "font-medium text-foreground"
                  }`}
                >
                  {row[ci] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EnrollmentPlanCard({ plan }: { plan: ProgramOption }) {
  const title = planTitle(plan);
  const fee = planFee(plan);
  const details = planDetails(plan);
  const tables = (plan.scheduleTables ?? []).filter((t) => normalizeScheduleTable(t) !== null);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-sm">
      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
          {title}
        </h3>

        {details.length > 0 ? (
          <dl className="space-y-3">
            {details.map((row, i) => (
              <div key={`${row.label}-${i}`} className="grid gap-0.5 sm:grid-cols-[minmax(7rem,34%)_1fr] sm:gap-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm sm:normal-case sm:tracking-normal">
                  {row.label}
                </dt>
                <dd className="text-sm font-medium leading-relaxed text-foreground md:text-base">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {tables.length > 0 ? (
          <div className="space-y-4">
            {tables.map((table, i) => (
              <ScheduleTable key={`${table.title ?? "table"}-${i}`} table={table} />
            ))}
          </div>
        ) : null}
      </div>

      {fee ? (
        <div className="mt-auto border-t border-primary/15 bg-primary/[0.06] px-5 py-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">Fee</p>
          <p className="mt-1 text-xl font-bold tracking-tight text-primary md:text-2xl">{fee}</p>
        </div>
      ) : null}
    </article>
  );
}

/** CMS-driven enrollment plans with flexible details, schedule tables, and dedicated fee. */
export function ScheduleBlocks({ blocks }: EnrollmentPlansProps) {
  if (!blocks?.length) return null;

  return (
    <div className="space-y-10">
      {blocks.map((block, i) => {
        if (block._type !== "scheduleBlockProgramOptions") return null;
        const plans = block.options ?? [];
        if (!plans.length) return null;

        return (
          <div key={block._key ?? i}>
            {block.intro ? (
              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {block.intro}
              </p>
            ) : null}
            <div className="grid gap-5 lg:grid-cols-2">
              {plans.map((plan, j) => (
                <EnrollmentPlanCard key={`${planTitle(plan)}-${j}`} plan={plan} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Prefer CMS section title from the first enrollment-plans block. */
export function enrollmentPlansSectionTitle(blocks: ScheduleBlock[] | undefined): string {
  const block = blocks?.find((b) => b._type === "scheduleBlockProgramOptions");
  return block?.blockTitle?.trim() || "Enrollment Plans";
}
