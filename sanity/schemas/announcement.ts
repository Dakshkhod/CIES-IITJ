import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required().min(5).max(1200),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isPinned',
      title: 'Is Pinned',
      type: 'boolean',
      description: 'Pinned announcements appear first',
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
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'datetime',
      description: 'Leave blank for no expiry',
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
      title: 'Target Audience',
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
      description: 'Optional destination for the announcement action',
      validation: Rule =>
        Rule.uri({ scheme: ['http', 'https'] }).custom((linkUrl, context) => {
          return !context.document?.linkText || linkUrl
            ? true
            : 'Add a URL when link text is provided';
        }),
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      description: 'For example: Register now or Read more',
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
    },
    prepare({ title, publishDate, isActive, isPinned, targetAudience }) {
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
