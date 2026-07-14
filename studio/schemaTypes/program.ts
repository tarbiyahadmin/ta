import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';

export const program = defineType({
  name: 'program',
  type: 'document',
  title: 'Program',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'schedule', title: 'Enrollment Plans' },
    { name: 'registration', title: 'Registration' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'slug', type: 'slug', title: 'Slug', group: 'content', validation: (r) => r.required(), options: { source: 'title' } }),
    defineField({ name: 'title', type: 'string', title: 'Title', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'heroText',
      type: 'text',
      title: 'Hero Text',
      group: 'content',
      rows: 2,
      description: 'Short text displayed beneath the program name on the program detail page.',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      group: 'content',
      to: [{ type: 'programCategory' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Card & detail image',
      group: 'content',
      description:
        'Shown on homepage/program cards and the program detail page. Upload and crop with hotspot. If empty, a library photo from /src/assets/mqi-images is used.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Describe the image for accessibility and SEO.',
        }),
      ],
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description (for cards)',
      group: 'content',
      description: 'Brief summary shown on the Programs listing and homepage cards.',
      rows: 2,
    }),
    defineField({
      name: 'format',
      type: 'string',
      title: 'Format (card badge)',
      group: 'content',
      description: 'Short label shown as a pill under the program title on listing cards (e.g. In-person, In-person & online).',
    }),
    defineField({
      name: 'ages',
      type: 'string',
      title: 'Ages (card badge)',
      group: 'content',
      description: 'Short age range shown as a pill under the program title on listing cards (e.g. Ages 4–18, Ages 6–16).',
    }),
    defineField({ name: 'overview', type: 'text', title: 'Overview', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'infoCards',
      type: 'array',
      title: 'Program Information Cards',
      group: 'content',
      description: 'Program-level facts (Audience, Registration fee, Terms). Use Enrollment Plans for tuition tiers and schedules.',
      of: [{ type: 'programInfoCard' }],
    }),
    defineField({
      name: 'location',
      type: 'object',
      title: 'Location',
      group: 'content',
      description: 'Address-based location display (no map).',
      fields: [
        defineField({ name: 'address', type: 'text', title: 'Address', rows: 2 }),
        defineField({ name: 'city', type: 'string', title: 'City' }),
        defineField({ name: 'province', type: 'string', title: 'Province' }),
        defineField({ name: 'postalCode', type: 'string', title: 'Postal Code' }),
      ],
    }),
    defineField({
      name: 'scheduleBlocks',
      type: 'array',
      title: 'Enrollment Plans',
      group: 'schedule',
      description:
        'Add enrollment plans with flexible detail rows, customizable schedule tables, and a dedicated Fee field.',
      of: [{ type: 'scheduleBlockProgramOptions' }],
      validation: (r) => r.max(1),
    }),
    defineField({
      name: 'curriculum',
      type: 'array',
      title: 'Curriculum',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'list' },
      description: 'Bullet list of curriculum items.',
    }),
    defineField({
      name: 'specialOffers',
      type: 'array',
      title: 'Special Offers',
      group: 'content',
      description: 'Promotions such as discounts or referral bonuses.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
            defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
          ],
          preview: { select: { title: 'title' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Offer' }) },
        },
      ],
    }),
    defineField({
      name: 'registrationFormPage',
      type: 'reference',
      title: 'Registration form page',
      group: 'registration',
      to: [{ type: 'formPage' }],
      description: 'Dedicated on-site form page (/forms/…).',
    }),
    defineField({
      name: 'bookMeetFormPage',
      type: 'reference',
      title: 'Book a Meet form page',
      group: 'registration',
      to: [{ type: 'formPage' }],
      description: 'Dedicated on-site meeting/consultation form page (/forms/…).',
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'q', type: 'string', title: 'Question' }),
            defineField({ name: 'a', type: 'text', title: 'Answer' }),
          ],
          preview: { select: { title: 'q' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'FAQ' }) },
        },
      ],
    }),
    ...seoFields,
  ],
});

export const programCategory = defineType({
  name: 'programCategory',
  type: 'document',
  title: 'Program Category',
  fields: [
    defineField({ name: 'slug', type: 'slug', title: 'Slug', validation: (r) => r.required(), options: { source: 'title' } }),
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({
      name: 'sortOrder',
      type: 'number',
      title: 'Sort order',
      description: 'Lower numbers appear first on the Programs page (e.g. 1 = Islamic Studies, 2 = Quran, 3 = Islamic Camps).',
      validation: (r) => r.integer().min(0),
    }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'sortOrderAsc',
      by: [
        { field: 'sortOrder', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', sortOrder: 'sortOrder' },
    prepare: ({ title, sortOrder }: { title?: string; sortOrder?: number }) => ({
      title: title || 'Category',
      subtitle: typeof sortOrder === 'number' ? `Order: ${sortOrder}` : undefined,
    }),
  },
});
