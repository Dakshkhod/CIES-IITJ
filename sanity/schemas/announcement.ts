import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'datetime',
      description: 'Leave blank for no expiry',
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
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishDate',
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
})

