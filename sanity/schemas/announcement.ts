import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  description: 'Controls the Recent Activities carousel on the homepage.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'content',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required().min(5).max(1200),
    }),
    defineField({
      name: 'image',
      title: 'Carousel Image',
      type: 'image',
      description: 'Displayed beside this item in the homepage Recent Activities carousel.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Show this item in the homepage Recent Activities carousel.',
      initialValue: true,
    }),
    defineField({
      name: 'isPinned',
      title: 'Is Pinned',
      type: 'boolean',
      description: 'Pinned items appear first in the carousel.',
      initialValue: false,
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher priority appears first',
      initialValue: 0,
      validation: Rule => Rule.integer().min(0).max(100),
    }),
    defineField({
      name: 'publishDate',
      title: 'Activity Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Legacy Expiry Date',
      type: 'datetime',
      description: 'Kept for existing records; it does not hide historical carousel items.',
      validation: Rule =>
        Rule.custom((expiryDate, context) => {
          const publishDate = context.document?.publishDate;
          if (!expiryDate || typeof publishDate !== 'string') return true;
          return new Date(expiryDate) > new Date(publishDate)
            ? true
            : 'Expiry date must be later than the publish date';
        }),
    }),
    defineField({
      name: 'targetAudience',
      title: 'Legacy Target Audience',
      type: 'string',
      options: {
        list: [
          { title: 'All', value: 'all' },
          { title: 'Students Only', value: 'students' },
          { title: 'Faculty Only', value: 'faculty' },
          { title: 'Undergraduate Students', value: 'ug' },
          { title: 'Postgraduate Students', value: 'pg' },
        ],
      },
      initialValue: 'all',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      description: 'Optional destination for the View More button.',
      validation: Rule =>
        Rule.uri({ scheme: ['http', 'https'] }).custom((linkUrl, context) => {
          return !context.document?.linkText || linkUrl
            ? true
            : 'Add a URL when link text is provided';
        }),
    }),
    defineField({
      name: 'linkText',
      title: 'Legacy Link Text',
      type: 'string',
      description: 'Kept for existing records; the carousel button is labelled View More.',
      validation: Rule =>
        Rule.max(50).custom((linkText, context) => {
          return !context.document?.linkUrl || linkText
            ? true
            : 'Add link text when a URL is provided';
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publishDate: 'publishDate',
      isActive: 'isActive',
      isPinned: 'isPinned',
      targetAudience: 'targetAudience',
      media: 'image',
    },
    prepare({ title, publishDate, isActive, isPinned, targetAudience, media }) {
      const status = isActive ? 'Active' : 'Inactive';
      const pinned = isPinned ? ' · Pinned' : '';
      const audience =
        targetAudience && targetAudience !== 'all'
          ? ` · ${String(targetAudience).toUpperCase()}`
          : '';
      const date = publishDate
        ? new Date(publishDate).toLocaleDateString('en-IN')
        : 'No publish date';

      return {
        title,
        subtitle: `${status}${pinned}${audience} · ${date}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Pinned & Priority',
      name: 'pinnedPriority',
      by: [
        { field: 'isPinned', direction: 'desc' },
        { field: 'priority', direction: 'desc' },
        { field: 'publishDate', direction: 'desc' },
      ],
    },
  ],
});
