import { defineType, defineField } from 'sanity';

export const navLink = defineType({
  name: 'navLink',
  type: 'object',
  title: 'Nav Link',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
    defineField({
      name: 'to',
      type: 'string',
      title: 'Internal page or URL',
      description:
        'Navbar CTA buttons should link to an internal site page (e.g. /programs, /donate, /about) — not /forms/…. External https:// URLs are allowed.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'displayAsButton',
      type: 'boolean',
      title: 'Display as button (Navbar CTA)',
      description: 'Shows as a primary CTA button in the header; a compact pill in footer link lists.',
      initialValue: false,
    }),
    defineField({
      name: 'openInNewTab',
      type: 'boolean',
      title: 'Open in new tab',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'label', to: 'to', button: 'displayAsButton' },
    prepare: ({ title, to, button }: { title?: string; to?: string; button?: boolean }) => ({
      title: title || 'Link',
      subtitle: `${button ? 'CTA · ' : ''}${to || '/'}`,
    }),
  },
});
