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
      validation: Rule => Rule.required(),
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
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      description: 'Optional destination for the View More button.',
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publishDate: 'publishDate',
      isActive: 'isActive',
      isPinned: 'isPinned',
      media: 'image',
    },
    prepare({ title, publishDate, isActive, isPinned, media }) {
      const status = isActive ? 'Active' : 'Inactive';
      const pinned = isPinned ? ' · Pinned' : '';
      const date = publishDate
        ? new Date(publishDate).toLocaleDateString('en-IN')
        : 'No publish date';

      return {
        title,
        subtitle: `${status}${pinned} · ${date}`,
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
