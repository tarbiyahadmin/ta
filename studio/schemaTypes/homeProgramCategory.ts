import { defineType, defineField } from 'sanity';

export const homeProgramCategory = defineType({
  name: 'homeProgramCategory',
  type: 'object',
  title: 'Home Program Category',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description', validation: (r) => r.required() }),
    defineField({ name: 'to', type: 'string', title: 'Link (path)', initialValue: '/programs' }),
    defineField({
      name: 'programCategory',
      type: 'reference',
      title: 'Program Category',
      to: [{ type: 'programCategory' }],
      description: 'Link to a program category. When set, routes to filtered Programs view. Overrides Link path when both exist.',
    }),
  ],
});

export const whyChooseUsItem = defineType({
  name: 'whyChooseUsItem',
  type: 'object',
  title: 'Why Choose Us Item',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'string', title: 'Description', validation: (r) => r.required() }),
  ],
});

export const ctaButton = defineType({
  name: 'ctaButton',
  type: 'object',
  title: 'CTA Button',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
    defineField({
      name: 'to',
      type: 'string',
      title: 'Internal page',
      description:
        'Preferred destination for Navbar, Homepage hero, and closing CTA buttons. Use a site path such as /programs, /donate, /about, /financial-aid, /careers, or /blog.',
    }),
    defineField({
      name: 'formPage',
      type: 'reference',
      title: 'Form page (legacy / specialty)',
      to: [{ type: 'formPage' }],
      description:
        'Optional. Use only when the button must open an embedded form (/forms/…). Prefer Internal page for marketing CTAs.',
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Variant',
      options: { list: ['primary', 'accent'] },
      initialValue: 'primary',
    }),
  ],
  validation: (rule) =>
    rule.custom((value: { to?: string; formPage?: { _ref?: string } } | undefined) => {
      if (!value) return true;
      if (value.to?.trim() || value.formPage?._ref) return true;
      return 'Set an Internal page or a Form page.';
    }),
});
