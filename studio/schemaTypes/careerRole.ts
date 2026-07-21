import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';

export const careerRole = defineType({
  name: 'careerRole',
  type: 'document',
  title: 'Career / Volunteer Role',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'schedule', title: 'Schedule' },
    { name: 'application', title: 'Application' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      group: 'content',
      options: { list: ['Teaching', 'Admin', 'Volunteer'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'location', type: 'string', title: 'Location', group: 'content' }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'infoCards',
      type: 'array',
      title: 'Information Cards',
      group: 'content',
      description: 'Role-level facts (e.g. Hours, Commitment, Compensation). Same card structure as Programs.',
      of: [{ type: 'programInfoCard' }],
    }),
    defineField({
      name: 'responsibilities',
      type: 'array',
      title: 'Responsibilities',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'list' },
    }),
    defineField({
      name: 'requirements',
      type: 'array',
      title: 'Requirements',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'list' },
    }),
    defineField({
      name: 'scheduleBlocks',
      type: 'array',
      title: 'Schedule',
      group: 'schedule',
      description:
        'Same enrollment-plan structure as Programs: flexible detail rows, schedule tables, and an optional Fee field.',
      of: [{ type: 'scheduleBlockProgramOptions' }],
      validation: (r) => r.max(1),
    }),
    defineField({
      name: 'applicationFormPage',
      type: 'reference',
      title: 'Application form page',
      group: 'application',
      to: [{ type: 'formPage' }],
      description: 'Dedicated on-site application form (/forms/…).',
    }),
  ],
});

export const careersPage = defineType({
  name: 'careersPage',
  type: 'document',
  title: 'Careers Page',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', group: 'content', initialValue: 'Career & Volunteer Opportunities' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Page Subtitle', group: 'content' }),
    defineField({
      name: 'whyWorkAtAcademy',
      type: 'text',
      title: 'Why Work at Tarbiyah Academy?',
      group: 'content',
      rows: 8,
      description: 'Content for the "Why Work at Tarbiyah Academy?" section.',
    }),
    defineField({
      name: 'applyFormTitle',
      type: 'string',
      title: 'Apply Form Section Title',
      group: 'content',
      initialValue: 'Apply for this Position',
    }),
    defineField({
      name: 'introContent',
      type: 'array',
      title: 'Intro / Additional Content',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    ...seoFields,
  ],
});
