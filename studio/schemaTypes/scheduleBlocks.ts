import { defineType, defineField } from 'sanity';

/** Generic label + value row — editors control both the name and the content. */
export const labeledValueRow = defineType({
  name: 'labeledValueRow',
  type: 'object',
  title: 'Detail row',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      description: 'Row heading (e.g. Format, Ages, Session length).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'value',
      type: 'string',
      title: 'Value',
      description: 'Content shown next to the label.',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { label: 'label', value: 'value' },
    prepare: ({ label, value }: { label?: string; value?: string }) => ({
      title: label || 'Row',
      subtitle: value,
    }),
  },
});

export const scheduleTableColumn = defineType({
  name: 'scheduleTableColumn',
  type: 'object',
  title: 'Column',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      description: 'Column header text.',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }: { title?: string }) => ({ title: title || 'Column' }),
  },
});

export const scheduleTableCell = defineType({
  name: 'scheduleTableCell',
  type: 'object',
  title: 'Cell',
  fields: [
    defineField({
      name: 'value',
      type: 'string',
      title: 'Value',
    }),
  ],
  preview: {
    select: { title: 'value' },
    prepare: ({ title }: { title?: string }) => ({ title: title?.trim() || '(empty)' }),
  },
});

export const scheduleTableDataRow = defineType({
  name: 'scheduleTableDataRow',
  type: 'object',
  title: 'Row',
  fields: [
    defineField({
      name: 'cells',
      type: 'array',
      title: 'Cells',
      description:
        'One cell per column, left → right, matching the Columns list above. Add/remove cells to match column count.',
      of: [{ type: 'scheduleTableCell' }],
    }),
  ],
  preview: {
    select: { cells: 'cells' },
    prepare: ({ cells }: { cells?: { value?: string }[] }) => ({
      title: Array.isArray(cells)
        ? cells
            .map((c) => c?.value)
            .filter(Boolean)
            .join(' · ') || 'Empty row'
        : 'Row',
    }),
  },
});

/**
 * Fully customizable schedule table — dynamic columns and rows (any size).
 * Editors control headings and every cell value from the CMS.
 */
export const scheduleTableSection = defineType({
  name: 'scheduleTableSection',
  type: 'object',
  title: 'Schedule table',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Table title',
      description: 'Optional heading above this table (e.g. Weekly schedule).',
    }),
    defineField({
      name: 'columns',
      type: 'array',
      title: 'Columns',
      description: 'Add, remove, reorder, and rename columns. Example: Day, Time, Room, Notes.',
      of: [{ type: 'scheduleTableColumn' }],
    }),
    defineField({
      name: 'dataRows',
      type: 'array',
      title: 'Rows',
      description: 'Add, remove, and reorder rows. Each row’s cells map to Columns in order.',
      of: [{ type: 'scheduleTableDataRow' }],
    }),
    // Legacy 2-column label/value rows — kept for existing content
    defineField({
      name: 'rows',
      type: 'array',
      title: 'Rows (legacy label/value)',
      of: [{ type: 'labeledValueRow' }],
      hidden: true,
    }),
  ],
  preview: {
    select: { title: 'title', columns: 'columns', dataRows: 'dataRows', rows: 'rows' },
    prepare: ({
      title,
      columns,
      dataRows,
      rows,
    }: {
      title?: string;
      columns?: unknown[];
      dataRows?: unknown[];
      rows?: unknown[];
    }) => {
      const cols = Array.isArray(columns) ? columns.length : 0;
      const r = Array.isArray(dataRows) ? dataRows.length : Array.isArray(rows) ? rows.length : 0;
      return {
        title: title || 'Schedule table',
        subtitle: cols ? `${cols}×${r}` : `${r} row(s)`,
      };
    },
  },
});

/**
 * Single enrollment plan — flexible detail rows + optional schedule tables.
 * Fee stays a dedicated field for distinct UI treatment.
 */
export const programOption = defineType({
  name: 'programOption',
  type: 'object',
  title: 'Enrollment Plan',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Plan title',
      description: 'Name of this plan (e.g. Weekday evenings, Full weekend).',
    }),
    defineField({
      name: 'fee',
      type: 'string',
      title: 'Fee',
      description: 'Dedicated fee display (e.g. $95/month). Shown with distinct emphasis on the site.',
    }),
    defineField({
      name: 'details',
      type: 'array',
      title: 'Plan details',
      description:
        'Flexible information rows. Add, remove, reorder, and set custom labels (Format, Frequency, Duration, Ages, etc.).',
      of: [{ type: 'labeledValueRow' }],
    }),
    defineField({
      name: 'scheduleTables',
      type: 'array',
      title: 'Schedule tables',
      description:
        'Fully customizable tables with dynamic columns and rows (any size, e.g. 5×5).',
      of: [{ type: 'scheduleTableSection' }],
    }),
    defineField({ name: 'label', type: 'string', title: 'Label (legacy)', hidden: true }),
    defineField({ name: 'format', type: 'string', title: 'Format (legacy)', hidden: true }),
    defineField({ name: 'frequency', type: 'string', title: 'Frequency (legacy)', hidden: true }),
    defineField({ name: 'duration', type: 'string', title: 'Duration (legacy)', hidden: true }),
    defineField({ name: 'note', type: 'string', title: 'Note (legacy)', hidden: true }),
    defineField({ name: 'monthlyFee', type: 'string', title: 'Monthly Fee (legacy)', hidden: true }),
    defineField({ name: 'price', type: 'string', title: 'Price (legacy)', hidden: true }),
  ],
  preview: {
    select: {
      title: 'title',
      label: 'label',
      fee: 'fee',
      monthlyFee: 'monthlyFee',
      price: 'price',
      details: 'details',
    },
    prepare: ({
      title,
      label,
      fee,
      monthlyFee,
      price,
      details,
    }: {
      title?: string;
      label?: string;
      fee?: string;
      monthlyFee?: string;
      price?: string;
      details?: unknown[];
    }) => ({
      title: title || label || 'Enrollment plan',
      subtitle: [fee || monthlyFee || price, Array.isArray(details) ? `${details.length} detail(s)` : null]
        .filter(Boolean)
        .join(' · '),
    }),
  },
  validation: (rule) =>
    rule.custom((value: { title?: string; label?: string } | undefined) => {
      if (!value) return true;
      if (value.title?.trim() || value.label?.trim()) return true;
      return 'Add a plan title.';
    }),
});

/** Container block: list of enrollment plans on a program. */
export const scheduleBlockProgramOptions = defineType({
  name: 'scheduleBlockProgramOptions',
  type: 'object',
  title: 'Enrollment Plans',
  preview: {
    select: { title: 'blockTitle', count: 'options' },
    prepare: ({ title, count }: { title?: string; count?: unknown[] }) => ({
      title: title || 'Enrollment Plans',
      subtitle: `${Array.isArray(count) ? count.length : 0} plan(s)`,
    }),
  },
  fields: [
    defineField({
      name: 'blockTitle',
      type: 'string',
      title: 'Section title',
      initialValue: 'Enrollment Plans',
      description: 'Heading shown on the program page above the plans.',
    }),
    defineField({
      name: 'intro',
      type: 'text',
      title: 'Intro',
      rows: 2,
      description: 'Optional short note above the plans.',
    }),
    defineField({
      name: 'options',
      type: 'array',
      title: 'Plans',
      description: 'Each plan can include custom detail rows, schedule tables, and a dedicated fee.',
      of: [{ type: 'programOption' }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'richText',
      type: 'array',
      title: 'Additional Content (legacy)',
      of: [{ type: 'block' }],
      hidden: true,
    }),
  ],
});
